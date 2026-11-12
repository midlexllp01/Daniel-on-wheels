/**
 * Netlify Serverless Function: /api/state (and /.netlify/functions/api)
 * Connects to Supabase PostgreSQL to load and save DLSO Benin Region questions, contenders, and settings.
 */
const { Pool } = require('pg');

const PROJECT_REF = 'mrubxczyfxhgfvkpzaxq';
const DB_PASS = process.env.SUPABASE_DB_PASSWORD || 'M5kkMf+-cRV4_BT';
const encodedPass = encodeURIComponent(DB_PASS);

const DEFAULT_DB_URL =
  process.env.DATABASE_URL ||
  `postgresql://postgres.${PROJECT_REF}:${encodedPass}@aws-1-eu-west-1.pooler.supabase.com:6543/postgres`;

let cachedPool = null;

async function getPool() {
  if (cachedPool) return cachedPool;

  const candidates = [
    DEFAULT_DB_URL,
    `postgresql://postgres:${encodedPass}@db.${PROJECT_REF}.supabase.co:5432/postgres`
  ];

  for (const connStr of candidates) {
    const pool = new Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
      max: 3,
      connectionTimeoutMillis: 5000
    });
    try {
      await pool.query('SELECT 1');
      cachedPool = pool;
      return cachedPool;
    } catch (_) {
      try {
        await pool.end();
      } catch (__) {}
    }
  }

  throw new Error('Unable to connect to Supabase PostgreSQL database.');
}

async function fetchFullState(pool) {
  const [qRes, cRes, sRes] = await Promise.all([
    pool.query('SELECT * FROM public.dlso_questions ORDER BY q_order ASC, id ASC'),
    pool.query('SELECT * FROM public.dlso_contenders ORDER BY c_order ASC, id ASC'),
    pool.query("SELECT * FROM public.dlso_game_state WHERE id = 'main' LIMIT 1")
  ]);

  const questions = qRes.rows.map((r) => ({
    id: r.id,
    type: r.type,
    category: r.category,
    points: Number(r.points),
    timer: Number(r.timer || 30),
    prompt: r.prompt,
    options: Array.isArray(r.options) ? r.options : [],
    correctIndex: Number(r.correct_index || 0),
    answer: r.answer || '',
    reference: r.reference || '',
    answered: Boolean(r.answered)
  }));

  const contenders = cRes.rows.map((r) => ({
    id: r.id,
    name: r.name,
    group: r.group_name || '',
    score: Number(r.score || 0),
    answeredCount: Number(r.answered_count || 0),
    color: r.color || '#e61919'
  }));

  const stateRow = sRes.rows[0] || {};
  return {
    questions,
    contenders,
    settings: stateRow.settings || {},
    activeContenderId: stateRow.active_contender_id || contenders[0]?.id || null
  };
}

async function saveFullState(pool, payload) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (Array.isArray(payload.questions)) {
      const keepIds = payload.questions.map((q) => q.id);
      if (keepIds.length > 0) {
        await client.query(
          'DELETE FROM public.dlso_questions WHERE NOT (id = ANY($1::text[]))',
          [keepIds]
        );
      } else {
        await client.query('DELETE FROM public.dlso_questions');
      }

      for (let i = 0; i < payload.questions.length; i++) {
        const q = payload.questions[i];
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
            updated_at = NOW()
          `,
          [
            q.id,
            i + 1,
            q.type || 'mcq',
            q.category || 'Book of Daniel',
            Number(q.points || 10),
            Number(q.timer || 30),
            q.prompt || '',
            JSON.stringify(q.options || []),
            Number(q.correctIndex || 0),
            q.answer || '',
            q.reference || '',
            Boolean(q.answered)
          ]
        );
      }
    }

    if (Array.isArray(payload.contenders)) {
      const keepCIds = payload.contenders.map((c) => c.id);
      if (keepCIds.length > 0) {
        await client.query(
          'DELETE FROM public.dlso_contenders WHERE NOT (id = ANY($1::text[]))',
          [keepCIds]
        );
      } else {
        await client.query('DELETE FROM public.dlso_contenders');
      }

      for (let i = 0; i < payload.contenders.length; i++) {
        const c = payload.contenders[i];
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
            updated_at = NOW()
          `,
          [
            c.id,
            i + 1,
            c.name || 'Contender',
            c.group || '',
            Number(c.score || 0),
            Number(c.answeredCount || 0),
            c.color || '#e61919'
          ]
        );
      }
    }

    if (payload.settings || payload.activeContenderId) {
      await client.query(
        `
        INSERT INTO public.dlso_game_state (id, settings, active_contender_id, updated_at)
        VALUES ('main', $1::jsonb, $2, NOW())
        ON CONFLICT (id) DO UPDATE SET
          settings = EXCLUDED.settings,
          active_contender_id = EXCLUDED.active_contender_id,
          updated_at = NOW()
        `,
        [JSON.stringify(payload.settings || {}), payload.activeContenderId || null]
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

exports.handler = async function (event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    const pool = await getPool();

    if (event.httpMethod === 'GET') {
      const data = await fetchFullState(pool);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, ...data })
      };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      await saveFullState(pool, body);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, syncedAt: new Date().toISOString() })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method Not Allowed' })
    };
  } catch (err) {
    console.error('Supabase DB function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};

exports.getPool = getPool;
exports.fetchFullState = fetchFullState;
exports.saveFullState = saveFullState;
