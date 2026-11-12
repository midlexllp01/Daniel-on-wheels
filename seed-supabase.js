/**
 * DLSO Benin Region — Supabase PostgreSQL Schema & 50 Book of Daniel Questions Seeder
 */
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const PROJECT_REF = 'mrubxczyfxhgfvkpzaxq';
const DB_PASS = 'M5kkMf+-cRV4_BT';
const encodedPass = encodeURIComponent(DB_PASS);

// Candidate connection configs (Direct IPv6 host + IPv4 Supavisor Pooler regions)
const CANDIDATE_HOSTS = [
  {
    label: 'Supavisor Pooler (aws-1-eu-west-1.pooler.supabase.com:6543)',
    connectionString: `postgresql://postgres.${PROJECT_REF}:${encodedPass}@aws-1-eu-west-1.pooler.supabase.com:6543/postgres`
  },
  {
    label: 'Direct Host (db.mrubxczyfxhgfvkpzaxq.supabase.co:5432)',
    connectionString: `postgresql://postgres:${encodedPass}@db.${PROJECT_REF}.supabase.co:5432/postgres`
  }
];

// Extract DEFAULT_QUESTIONS, DEFAULT_CONTENDERS, DEFAULT_SETTINGS from app.js
function loadDefaultsFromAppJs() {
  const appJsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  const qMatch = appJsContent.match(/const DEFAULT_QUESTIONS = (\[[\s\S]*?\n\]);/);
  const cMatch = appJsContent.match(/const DEFAULT_CONTENDERS = (\[[\s\S]*?\n\]);/);
  const sMatch = appJsContent.match(/const DEFAULT_SETTINGS = (\{[\s\S]*?\n\});/);

  if (!qMatch || !cMatch || !sMatch) {
    throw new Error('Could not parse DEFAULT_QUESTIONS / CONTENDERS / SETTINGS from app.js');
  }

  const questions = eval(qMatch[1]);
  const contenders = eval(cMatch[1]);
  const settings = eval('(' + sMatch[1] + ')');
  return { questions, contenders, settings };
}

async function connectWorkingClient() {
  for (const candidate of CANDIDATE_HOSTS) {
    const client = new Client({
      connectionString: candidate.connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 6000
    });
    try {
      await client.connect();
      await client.query('SELECT 1');
      console.log(`✅ Connected via: ${candidate.label}`);
      return { client, connectionString: candidate.connectionString };
    } catch (err) {
      // If tenant/user not found on a pooler region, continue trying next region
      try {
        await client.end();
      } catch (_) {}
    }
  }
  throw new Error('Could not connect to Supabase Postgres via direct host or pooler regions.');
}

async function main() {
  const { questions, contenders, settings } = loadDefaultsFromAppJs();
  console.log(`Loaded ${questions.length} questions and ${contenders.length} contenders from app.js...`);

  const { client, connectionString } = await connectWorkingClient();

  try {
    // Save the working connection string into .env so local server & Netlify function can use it
    fs.writeFileSync(
      path.join(__dirname, '.env'),
      `DATABASE_URL=${connectionString}\n`,
      'utf8'
    );

    console.log('Creating tables in Supabase PostgreSQL...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.dlso_questions (
        id TEXT PRIMARY KEY,
        q_order INT NOT NULL DEFAULT 0,
        type TEXT NOT NULL DEFAULT 'mcq',
        category TEXT NOT NULL DEFAULT 'Book of Daniel',
        points INT NOT NULL DEFAULT 10,
        timer INT NOT NULL DEFAULT 30,
        prompt TEXT NOT NULL,
        options JSONB NOT NULL DEFAULT '[]'::jsonb,
        correct_index INT NOT NULL DEFAULT 0,
        answer TEXT NOT NULL DEFAULT '',
        reference TEXT NOT NULL DEFAULT '',
        answered BOOLEAN NOT NULL DEFAULT FALSE,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS public.dlso_contenders (
        id TEXT PRIMARY KEY,
        c_order INT NOT NULL DEFAULT 0,
        name TEXT NOT NULL,
        group_name TEXT NOT NULL DEFAULT '',
        score NUMERIC NOT NULL DEFAULT 0,
        answered_count INT NOT NULL DEFAULT 0,
        color TEXT NOT NULL DEFAULT '#e61919',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS public.dlso_game_state (
        id TEXT PRIMARY KEY,
        settings JSONB NOT NULL DEFAULT '{}'::jsonb,
        active_contender_id TEXT,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Configure RLS & permissions so public REST or serverless functions work cleanly
    await client.query(`
      ALTER TABLE public.dlso_questions ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.dlso_contenders ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.dlso_game_state ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Allow full public access to dlso_questions" ON public.dlso_questions;
      CREATE POLICY "Allow full public access to dlso_questions"
        ON public.dlso_questions FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow full public access to dlso_contenders" ON public.dlso_contenders;
      CREATE POLICY "Allow full public access to dlso_contenders"
        ON public.dlso_contenders FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow full public access to dlso_game_state" ON public.dlso_game_state;
      CREATE POLICY "Allow full public access to dlso_game_state"
        ON public.dlso_game_state FOR ALL USING (true) WITH CHECK (true);

      GRANT ALL ON public.dlso_questions TO anon, authenticated, service_role;
      GRANT ALL ON public.dlso_contenders TO anon, authenticated, service_role;
      GRANT ALL ON public.dlso_game_state TO anon, authenticated, service_role;
    `);

    console.log(`Uploading all ${questions.length} Book of Daniel questions to Supabase...`);
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      await client.query(
        `
        INSERT INTO public.dlso_questions
          (id, q_order, type, category, points, timer, prompt, options, correct_index, answer, reference, answered, updated_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11, $12, NOW())
        ON CONFLICT (id) DO UPDATE SET
          q_order = EXCLUDED.q_order,
          type = EXCLUDED.type,
          category = EXCLUDED.category,
          points = EXCLUDED.points,
          timer = EXCLUDED.timer,
          prompt = EXCLUDED.prompt,
          options = EXCLUDED.options,
          correct_index = EXCLUDED.correct_index,
          answer = EXCLUDED.answer,
          reference = EXCLUDED.reference,
          answered = EXCLUDED.answered,
          updated_at = NOW();
        `,
        [
          q.id,
          i + 1,
          q.type,
          q.category,
          q.points,
          q.timer || 30,
          q.prompt,
          JSON.stringify(q.options || []),
          q.correctIndex || 0,
          q.answer || '',
          q.reference || '',
          Boolean(q.answered)
        ]
      );
    }

    console.log(`Uploading ${contenders.length} default contenders to Supabase...`);
    for (let i = 0; i < contenders.length; i++) {
      const c = contenders[i];
      await client.query(
        `
        INSERT INTO public.dlso_contenders
          (id, c_order, name, group_name, score, answered_count, color, updated_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, NOW())
        ON CONFLICT (id) DO UPDATE SET
          c_order = EXCLUDED.c_order,
          name = EXCLUDED.name,
          group_name = EXCLUDED.group_name,
          score = EXCLUDED.score,
          answered_count = EXCLUDED.answered_count,
          color = EXCLUDED.color,
          updated_at = NOW();
        `,
        [
          c.id,
          i + 1,
          c.name,
          c.group || '',
          c.score || 0,
          c.answeredCount || 0,
          c.color || '#e61919'
        ]
      );
    }

    console.log('Uploading default game state & settings to Supabase...');
    await client.query(
      `
      INSERT INTO public.dlso_game_state (id, settings, active_contender_id, updated_at)
      VALUES ('main', $1::jsonb, $2, NOW())
      ON CONFLICT (id) DO UPDATE SET
        settings = EXCLUDED.settings,
        active_contender_id = EXCLUDED.active_contender_id,
        updated_at = NOW();
      `,
      [JSON.stringify(settings), contenders[0]?.id || 'c1']
    );

    const countRes = await client.query('SELECT COUNT(*)::int AS total FROM public.dlso_questions;');
    const cCountRes = await client.query('SELECT COUNT(*)::int AS total FROM public.dlso_contenders;');
    console.log(`🎉 SUCCESS! Total questions in Supabase Postgres: ${countRes.rows[0].total}`);
    console.log(`🎉 SUCCESS! Total contenders in Supabase Postgres: ${cCountRes.rows[0].total}`);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('❌ Error seeding Supabase:', err);
  process.exit(1);
});
