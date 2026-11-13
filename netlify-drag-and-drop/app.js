/**
 * DLSO BENIN REGION — "DANIEL ON THE WHEELS"
 * Christian Bible Quiz & Wheel Game Show Engine (20 Youth Discussion Questions Edition)
 */

const STORAGE_KEY = 'dlso_benin_wheel_game_v2_50q';
const ADMIN_ACCESS_PASSWORD = 'JOSHUA';
let adminAccessGranted = false;
let pendingAdminTab = 'tabQuestions';
let wheelAnimationFrameId = null;

function cloneData(value) {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

// 20 open-ended youth discussion questions based on the Book of Daniel
const DEFAULT_QUESTIONS = [
  {
    "id": "q1",
    "type": "short",
    "category": "Daniel Chapter 1",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 1:8: Daniel purposed in his heart not to defile himself with the king's delicacies. What does Daniel's decision teach young people about conviction, self-discipline and refusing to compromise their values in a society that celebrates ungodliness?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 1:8",
    "answered": false
  },
  {
    "id": "q2",
    "type": "short",
    "category": "Daniel Chapter 1",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 1:3–4: What qualities did the king desire in the young men selected for royal service, and how can today's youths cultivate these qualities to become relevant and outstanding in their generation?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 1:3–4",
    "answered": false
  },
  {
    "id": "q3",
    "type": "short",
    "category": "Daniel Chapter 1",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 1:17: God gave Daniel and his friends knowledge, skill and wisdom. What is the relationship between spiritual devotion, academic development and excellence?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 1:17",
    "answered": false
  },
  {
    "id": "q4",
    "type": "short",
    "category": "Daniel Chapter 1",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 1:20: Daniel and his friends were found ten times better than all the magicians and astrologers. What practical habits can help young Christians distinguish themselves in their studies, careers and chosen fields?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 1:20",
    "answered": false
  },
  {
    "id": "q5",
    "type": "short",
    "category": "Daniel Chapter 6",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 6:4: Daniel's enemies could find no fault in him because he was faithful and neither corrupt nor negligent. What does this teach young people about building a reputation of integrity?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 6:4",
    "answered": false
  },
  {
    "id": "q6",
    "type": "short",
    "category": "Daniel Chapter 2",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 2:14–19: How did Daniel demonstrate wisdom and discretion when confronted with a life-threatening crisis, and what can youths learn about responding to pressure rather than reacting emotionally?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 2:14–19",
    "answered": false
  },
  {
    "id": "q7",
    "type": "short",
    "category": "Daniel Chapter 2",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 2:20–23: Daniel acknowledged God as the source of wisdom and understanding. How can young people balance dependence on God with personal preparation, learning and intellectual development?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 2:20–23",
    "answered": false
  },
  {
    "id": "q8",
    "type": "short",
    "category": "Daniel Chapter 2",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 2:46–49: What lessons can youths learn from Daniel's ability to use his God-given gifts to influence leadership and earn promotion?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 2:46–49",
    "answered": false
  },
  {
    "id": "q9",
    "type": "short",
    "category": "Daniel Chapter 5",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 5:11–12: Daniel was described as a man with an excellent spirit, knowledge, understanding and the ability to interpret difficult matters. What does an excellent spirit look like in the life of a young person today?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 5:11–12",
    "answered": false
  },
  {
    "id": "q10",
    "type": "short",
    "category": "Daniel Chapter 5",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 5:22–23: Belshazzar knew the history of Nebuchadnezzar but failed to learn from it. What dangers do young people face when they ignore the lessons of those who have gone ahead of them?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 5:22–23",
    "answered": false
  },
  {
    "id": "q11",
    "type": "short",
    "category": "Daniel Chapter 3",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 3:16–18: Shadrach, Meshach and Abednego refused to bow to Nebuchadnezzar's golden image, even when threatened with death. What does their response teach youths about standing firm in their faith despite peer pressure and societal expectations?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 3:16–18",
    "answered": false
  },
  {
    "id": "q12",
    "type": "short",
    "category": "Daniel Chapter 3",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 3:25–27: The three Hebrew young men came out of the fiery furnace without harm. What does this account teach about God's presence, preservation and faithfulness during difficult seasons?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 3:25–27",
    "answered": false
  },
  {
    "id": "q13",
    "type": "short",
    "category": "Daniel Chapter 6",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 6:6–10: Daniel continued to pray despite the king's decree. What can young people learn about maintaining spiritual disciplines when obedience to God becomes unpopular or costly?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 6:6–10",
    "answered": false
  },
  {
    "id": "q14",
    "type": "short",
    "category": "Daniel Chapter 6",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 6:16–23: Daniel's commitment to God brought him into the lions' den, yet God delivered him. How can youths develop courage to remain faithful when their convictions expose them to ridicule, rejection or persecution?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 6:16–23",
    "answered": false
  },
  {
    "id": "q15",
    "type": "short",
    "category": "Daniel Chapters 1 & 6",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 1:8 and Daniel 6:10: What connection exists between Daniel's private convictions and his public victories? Why is it important for young people to develop character when nobody is watching?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 1:8 and Daniel 6:10",
    "answered": false
  },
  {
    "id": "q16",
    "type": "short",
    "category": "Daniel Chapter 1",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 1:6–7: Daniel and his friends were given new names in Babylon. What does this teach about protecting one's identity, values and godly heritage while adapting to a different culture or environment?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 1:6–7",
    "answered": false
  },
  {
    "id": "q17",
    "type": "short",
    "category": "Daniel Chapter 2",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 2:48–49: Daniel used his position to secure opportunities for his friends. What does this teach young people about servant leadership, friendship and using influence to lift others?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 2:48–49",
    "answered": false
  },
  {
    "id": "q18",
    "type": "short",
    "category": "Daniel Chapter 9",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 9:2–3: Daniel studied the Scriptures and responded to his discoveries with prayer and fasting. What does this teach about the importance of studying God's Word and allowing knowledge to produce spiritual action?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 9:2–3",
    "answered": false
  },
  {
    "id": "q19",
    "type": "short",
    "category": "Daniel Chapter 9",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 9:4–19: Daniel identified with the sins of his people and interceded for them. What can today's youths learn about responsibility, compassion and becoming part of the solution to societal problems?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 9:4–19",
    "answered": false
  },
  {
    "id": "q20",
    "type": "short",
    "category": "Daniel Chapter 12",
    "points": 10,
    "timer": 90,
    "prompt": "Daniel 12:3: The Bible declares that those who turn many to righteousness will shine like the stars forever. What kind of legacy should young people desire to leave, and how can they use their gifts, education, influence and opportunities to make an eternal impact?",
    "options": [],
    "correctIndex": 0,
    "answer": "Open-ended discussion. Award marks for a clear, relevant, scripture-based response.",
    "reference": "Daniel 12:3",
    "answered": false
  }
];

const DEFAULT_CONTENDERS = [
  { id: 'c1', name: 'Daniel House', group: 'Group A • Benin Region', score: 0, answeredCount: 0, color: '#e61919' },
  { id: 'c2', name: 'Hananiah House', group: 'Group B • Benin Region', score: 0, answeredCount: 0, color: '#f59e0b' },
  { id: 'c3', name: 'Mishael House', group: 'Group C • Benin Region', score: 0, answeredCount: 0, color: '#10b981' },
  { id: 'c4', name: 'Azariah House', group: 'Group D • Benin Region', score: 0, answeredCount: 0, color: '#8b5cf6' }
];

const DEFAULT_SETTINGS = {
  orgName: 'DLSO BENIN REGION',
  gameTitle: 'DANIEL ON THE WHEELS',
  gameSubtitle: '20 Youth Discussion Questions from the Book of Daniel',
  customLogoDataUrl: '',
  removeAnsweredFromWheel: true,
  includeSpecialWedges: true,
  autoStartTimer: true,
  spinDuration: 5,
  soundEnabled: true,
  sortContendersByScore: false,
  supabaseUrl: 'https://mrubxczyfxhgfvkpzaxq.supabase.co',
  supabaseAnonKey: ''
};

const LEGACY_DEFAULT_SUBTITLE = '50-Question Book of Daniel Quiz & Wheel Challenge';
const LEGACY_FIRST_QUESTION_PROMPT = 'In the third year of the reign of which king of Judah did Nebuchadnezzar king of Babylon come unto Jerusalem and besiege it?';
const DEFAULT_QUESTION_SUBTITLE = '20 Youth Discussion Questions from the Book of Daniel';

function isLegacyDefaultQuestionBank(questions) {
  return Array.isArray(questions) && questions.length === 50 &&
    questions[0]?.id === 'q1' && questions[0]?.prompt === LEGACY_FIRST_QUESTION_PROMPT;
}

function replaceLegacyDefaultQuestionBank() {
  if (!isLegacyDefaultQuestionBank(state.questions)) return false;
  state.questions = cloneData(DEFAULT_QUESTIONS);
  if (state.settings.gameSubtitle === LEGACY_DEFAULT_SUBTITLE) {
    state.settings.gameSubtitle = DEFAULT_QUESTION_SUBTITLE;
  }
  return true;
}

// Wheel Color Palette (DLSO Royal Theme — 6 rich alternating colors)
const SLICE_PALETTE = [
  { bg: '#c81414', text: '#ffffff', accent: '#fde047' }, // DLSO Crimson
  { bg: '#1b0f3e', text: '#ffffff', accent: '#fbbf24' }, // Royal Indigo
  { bg: '#d97706', text: '#090418', accent: '#ffffff' }, // Championship Gold
  { bg: '#0f766e', text: '#ffffff', accent: '#a7f3d0' }, // Emerald Teal
  { bg: '#5b21b6', text: '#ffffff', accent: '#ddd6fe' }, // Deep Purple
  { bg: '#0369a1', text: '#ffffff', accent: '#bae6fd' }  // Broadcast Sapphire
];

// ==========================================
// WEB AUDIO SYNTHESIZER (Zero External MP3s)
// ==========================================
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTick() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(920, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.028);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  playQuestionLand() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });
  }

  playCorrect() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [587.33, 739.99, 880, 1174.66]; // D5 major arpeggio
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.09;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  playWrong() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const tones = [220, 185];
    tones.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.18;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    });
  }

  playTimerBeep(urgent = false) {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(urgent ? 880 : 660, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playFanfare() {
    if (!state.settings.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const melody = [
      { f: 523.25, t: 0, d: 0.14 },
      { f: 523.25, t: 0.15, d: 0.14 },
      { f: 523.25, t: 0.30, d: 0.14 },
      { f: 659.25, t: 0.45, d: 0.35 },
      { f: 587.33, t: 0.82, d: 0.25 },
      { f: 659.25, t: 1.10, d: 0.25 },
      { f: 783.99, t: 1.38, d: 0.65 }
    ];
    melody.forEach((n) => {
      const now = this.ctx.currentTime + n.t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now);
      gain.gain.setValueAtTime(0.26, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + n.d + 0.02);
    });
  }
}

const sound = new SoundEngine();

// ==========================================
// APPLICATION STATE
// ==========================================
let state = {
  questions: [],
  contenders: [],
  settings: { ...DEFAULT_SETTINGS },
  activeContenderId: null,
  activeQuestionId: null,
  selectedMcqIndex: null,
  isAnswerRevealed: false,
  activeMultiplier: 1,
  categoryFilter: 'ALL',
  typeFilter: 'ALL',
  wheelAngle: 0,
  isSpinning: false,
  timerSecondsLeft: 30,
  timerTotalSeconds: 30,
  timerRunning: false,
  timerIntervalId: null
};

function setCloudBadge(text, color = '#34d399') {
  const badge = document.getElementById('cloudSyncStatusPill');
  if (!badge) return;
  badge.textContent = text;
  badge.style.borderColor = color;
  badge.style.color = color;
}

// Load state from localStorage first, then sync from Supabase PostgreSQL (/api/state)
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.questions = Array.isArray(parsed.questions) && parsed.questions.length
        ? parsed.questions
        : cloneData(DEFAULT_QUESTIONS);
      state.contenders = Array.isArray(parsed.contenders) && parsed.contenders.length
        ? parsed.contenders
        : cloneData(DEFAULT_CONTENDERS);
      state.settings = { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) };
      state.activeContenderId = parsed.activeContenderId || state.contenders[0]?.id || null;
    } else {
      state.questions = cloneData(DEFAULT_QUESTIONS);
      state.contenders = cloneData(DEFAULT_CONTENDERS);
      state.settings = { ...DEFAULT_SETTINGS };
      state.activeContenderId = state.contenders[0]?.id || null;
    }
  } catch (err) {
    console.error('Failed to load state from localStorage, using defaults:', err);
    state.questions = cloneData(DEFAULT_QUESTIONS);
    state.contenders = cloneData(DEFAULT_CONTENDERS);
    state.settings = { ...DEFAULT_SETTINGS };
    state.activeContenderId = state.contenders[0]?.id || null;
  }

  if (replaceLegacyDefaultQuestionBank()) saveState();

  // Pull live data from Supabase PostgreSQL backend if running on Netlify or local Node server
  syncFromSupabaseCloud();
}

async function syncFromSupabaseCloud() {
  const sbUrl = (state.settings.supabaseUrl || 'https://mrubxczyfxhgfvkpzaxq.supabase.co').replace(/\/$/, '');
  const sbKey = (state.settings.supabaseAnonKey || '').trim();
  let migratedQuestionBank = false;

  // 1. Direct Browser-to-Supabase PostgREST sync (Works on Netlify Drag-and-Drop & file://)
  if (sbKey) {
    try {
      setCloudBadge('☁️ Supabase: Syncing...', '#fbbf24');
      const headers = {
        apikey: sbKey,
        'Content-Type': 'application/json'
      };
      if (sbKey.startsWith('eyJ')) {
        headers.Authorization = `Bearer ${sbKey}`;
      }
      const [qRes, cRes, sRes] = await Promise.all([
        fetch(`${sbUrl}/rest/v1/dlso_questions?select=*&order=q_order.asc,id.asc`, { headers }),
        fetch(`${sbUrl}/rest/v1/dlso_contenders?select=*&order=c_order.asc,id.asc`, { headers }),
        fetch(`${sbUrl}/rest/v1/dlso_game_state?id=eq.main&select=*`, { headers })
      ]);

      if (!qRes.ok) throw new Error(`Supabase REST HTTP ${qRes.status}`);
      const [qRows, cRows, sRows] = await Promise.all([qRes.json(), cRes.json(), sRes.json()]);

      if (Array.isArray(qRows) && qRows.length > 0) {
        state.questions = qRows.map((r) => ({
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
        migratedQuestionBank = replaceLegacyDefaultQuestionBank();
      }

      if (Array.isArray(cRows) && cRows.length > 0) {
        state.contenders = cRows.map((r) => ({
          id: r.id,
          name: r.name,
          group: r.group_name || '',
          score: Number(r.score || 0),
          answeredCount: Number(r.answered_count || 0),
          color: r.color || '#e61919'
        }));
      }

      if (Array.isArray(sRows) && sRows[0]) {
        const savedSettings = sRows[0].settings || {};
        state.settings = {
          ...DEFAULT_SETTINGS,
          ...savedSettings,
          supabaseUrl: sbUrl,
          supabaseAnonKey: sbKey
        };
        if (migratedQuestionBank && state.settings.gameSubtitle === LEGACY_DEFAULT_SUBTITLE) {
          state.settings.gameSubtitle = DEFAULT_QUESTION_SUBTITLE;
        }
        state.activeContenderId = sRows[0].active_contender_id || state.contenders[0]?.id || null;
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          questions: state.questions,
          contenders: state.contenders,
          settings: state.settings,
          activeContenderId: state.activeContenderId
        })
      );
      renderAll();
      setCloudBadge(`☁️ Supabase Live (${state.questions.length} Qs)`, '#34d399');
      if (migratedQuestionBank) saveState();
      return;
    } catch (err) {
      console.warn('Direct Supabase REST sync error:', err.message);
    }
  }

  // 2. Serverless / Node API endpoint (/api/state)
  if (window.location.protocol === 'file:') {
    setCloudBadge(`💾 ${state.questions.length} Qs Ready (Add Anon Key in Admin for Cloud)`, '#fbbf24');
    return;
  }
  try {
    setCloudBadge('☁️ Supabase: Syncing...', '#fbbf24');
    const res = await fetch('/api/state', { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && data.ok && Array.isArray(data.questions) && data.questions.length > 0) {
      migratedQuestionBank = isLegacyDefaultQuestionBank(data.questions);
      state.questions = migratedQuestionBank ? cloneData(DEFAULT_QUESTIONS) : data.questions;
      if (Array.isArray(data.contenders) && data.contenders.length > 0) {
        state.contenders = data.contenders;
      }
      if (data.settings && Object.keys(data.settings).length > 0) {
        state.settings = { ...DEFAULT_SETTINGS, ...data.settings };
      }
      if (migratedQuestionBank && state.settings.gameSubtitle === LEGACY_DEFAULT_SUBTITLE) {
        state.settings.gameSubtitle = DEFAULT_QUESTION_SUBTITLE;
      }
      state.activeContenderId = data.activeContenderId || state.contenders[0]?.id || null;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          questions: state.questions,
          contenders: state.contenders,
          settings: state.settings,
          activeContenderId: state.activeContenderId
        })
      );
      renderAll();
      setCloudBadge(`☁️ Supabase Connected (${state.questions.length} Qs)`, '#34d399');
      if (migratedQuestionBank) saveState();
    }
  } catch (err) {
    console.warn('Supabase cloud fetch fallback to localStorage:', err.message);
    setCloudBadge(`💾 ${state.questions.length} Qs Ready (Add Anon Key in Admin for Cloud)`, '#fbbf24');
  }
}

let cloudSaveTimer = null;

function saveState() {
  const payload = {
    questions: state.questions,
    contenders: state.contenders,
    settings: state.settings,
    activeContenderId: state.activeContenderId
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to save state locally:', err);
  }

  const sbUrl = (state.settings.supabaseUrl || 'https://mrubxczyfxhgfvkpzaxq.supabase.co').replace(/\/$/, '');
  const sbKey = (state.settings.supabaseAnonKey || '').trim();

  // Debounced sync to Supabase
  if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(async () => {
    // 1. Direct Browser-to-Supabase REST save (works on Netlify Drag-and-Drop!)
    if (sbKey) {
      try {
        setCloudBadge('☁️ Supabase: Saving...', '#fbbf24');
        const headers = {
          apikey: sbKey,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates'
        };
        if (sbKey.startsWith('eyJ')) {
          headers.Authorization = `Bearer ${sbKey}`;
        }

        const qRows = state.questions.map((q, idx) => ({
          id: q.id,
          q_order: idx + 1,
          type: q.type || 'mcq',
          category: q.category || 'Book of Daniel',
          points: Number(q.points || 10),
          timer: Number(q.timer || 30),
          prompt: q.prompt || '',
          options: q.options || [],
          correct_index: Number(q.correctIndex || 0),
          answer: q.answer || '',
          reference: q.reference || '',
          answered: Boolean(q.answered),
          updated_at: new Date().toISOString()
        }));

        const cRows = state.contenders.map((c, idx) => ({
          id: c.id,
          c_order: idx + 1,
          name: c.name || 'Contender',
          group_name: c.group || '',
          score: Number(c.score || 0),
          answered_count: Number(c.answeredCount || 0),
          color: c.color || '#e61919',
          updated_at: new Date().toISOString()
        }));
        const keepQuestionIds = qRows
          .map((q) => `"${String(q.id).replace(/"/g, '\\"')}"`)
          .join(',');
        const staleQuestionFilter = qRows.length
          ? `not.in.(${keepQuestionIds})`
          : 'not.is.null';

        const responses = await Promise.all([
          fetch(`${sbUrl}/rest/v1/dlso_questions`, {
            method: 'POST',
            headers,
            body: JSON.stringify(qRows)
          }),
          fetch(`${sbUrl}/rest/v1/dlso_questions?id=${encodeURIComponent(staleQuestionFilter)}`, {
            method: 'DELETE',
            headers
          }),
          fetch(`${sbUrl}/rest/v1/dlso_contenders`, {
            method: 'POST',
            headers,
            body: JSON.stringify(cRows)
          }),
          fetch(`${sbUrl}/rest/v1/dlso_game_state`, {
            method: 'POST',
            headers,
            body: JSON.stringify([
              {
                id: 'main',
                settings: state.settings,
                active_contender_id: state.activeContenderId,
                updated_at: new Date().toISOString()
              }
            ])
          })
        ]);

        const failedResponse = responses.find((response) => !response.ok);
        if (failedResponse) throw new Error(`Supabase REST save failed (HTTP ${failedResponse.status})`);

        setCloudBadge(`☁️ Supabase Saved ✓ (${state.questions.length} Qs)`, '#34d399');
        return;
      } catch (err) {
        console.warn('Direct Supabase REST save error:', err.message);
      }
    }

    if (window.location.protocol === 'file:') return;

    // 2. Fallback to /api/state (Node server or Netlify Function)
    try {
      setCloudBadge('☁️ Supabase: Saving...', '#fbbf24');
      const res = await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setCloudBadge(`☁️ Supabase Saved ✓ (${state.questions.length} Qs)`, '#34d399');
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (err) {
      setCloudBadge(`💾 Saved Locally (${state.questions.length} Qs)`, '#fbbf24');
    }
  }, 350);
}

// ==========================================
// TOAST NOTIFICATION HELPER
// ==========================================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.25s ease';
    setTimeout(() => el.remove(), 250);
  }, 3200);
}

// ==========================================
// WHEEL SLICES COMPUTATION & HIGH-CAPACITY CANVAS RENDERER (Supports 50+ Slices)
// ==========================================
function getWheelSlices() {
  const filteredQuestions = state.questions.filter((q) => {
    if (state.settings.removeAnsweredFromWheel && q.answered) return false;
    if (state.categoryFilter !== 'ALL' && q.category !== state.categoryFilter) return false;
    if (state.typeFilter !== 'ALL' && q.type !== state.typeFilter) return false;
    return true;
  });

  const slices = filteredQuestions.map((q) => {
    const globalIndex = state.questions.findIndex((item) => item.id === q.id) + 1;
    return {
      kind: 'question',
      questionId: q.id,
      qNumber: globalIndex,
      label: `Q${globalIndex}`,
      subLabel: `${q.points}m`,
      fullTitle: `Question #${globalIndex} (${q.points} Marks)`,
      points: q.points,
      category: q.category
    };
  });

  // Add special game show slices distributed evenly around the wheel if enabled
  if (state.settings.includeSpecialWedges && slices.length >= 2) {
    const specials = [
      {
        kind: 'special',
        specialType: 'DOUBLE',
        label: '2×',
        longLabel: '🔥 2× MARKS',
        subLabel: 'Double Next',
        fullTitle: 'DOUBLE MARKS (2× Next Question!)',
        customColor: { bg: '#b45309', text: '#fef08a', accent: '#ffffff' }
      },
      {
        kind: 'special',
        specialType: 'BONUS5',
        label: '+5m',
        longLabel: '🎁 +5 BONUS',
        subLabel: 'Free Marks',
        fullTitle: '+5 BONUS MARKS & Spin Again!',
        customColor: { bg: '#047857', text: '#ffffff', accent: '#fde047' }
      },
      {
        kind: 'special',
        specialType: 'SPIN_AGAIN',
        label: 'SPIN',
        longLabel: '🎡 FREE SPIN',
        subLabel: 'Spin Again',
        fullTitle: 'FREE SPIN — Spin the Wheel Again!',
        customColor: { bg: '#6d28d9', text: '#ffffff', accent: '#fde047' }
      }
    ];

    // Interleave special wedges evenly around the wheel instead of clumping at the end
    const step = Math.max(1, Math.floor(slices.length / specials.length));
    specials.forEach((sp, idx) => {
      const insertPos = Math.min(slices.length, (idx + 1) * step + idx);
      slices.splice(insertPos, 0, sp);
    });
  }

  return slices;
}

function drawWheel() {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const cx = width / 2;
  const cy = height / 2;
  const outerRadius = Math.min(cx, cy) - 10;
  const rimWidth = 20;
  const wheelRadius = outerRadius - rimWidth;

  ctx.clearRect(0, 0, width, height);

  const slices = getWheelSlices();

  // Draw metallic outer rim
  const rimGrad = ctx.createRadialGradient(cx, cy, wheelRadius, cx, cy, outerRadius);
  rimGrad.addColorStop(0, '#78350f');
  rimGrad.addColorStop(0.35, '#fbbf24');
  rimGrad.addColorStop(0.7, '#fef08a');
  rimGrad.addColorStop(1, '#92400e');

  ctx.beginPath();
  ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
  ctx.fillStyle = rimGrad;
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#e61919';
  ctx.stroke();

  // Studio bulb lights around the outer rim
  const bulbCount = 32;
  for (let i = 0; i < bulbCount; i++) {
    const angle = (i * (Math.PI * 2)) / bulbCount + state.wheelAngle * 0.25;
    const bx = cx + Math.cos(angle) * (outerRadius - rimWidth / 2);
    const by = cy + Math.sin(angle) * (outerRadius - rimWidth / 2);
    ctx.beginPath();
    ctx.arc(bx, by, 4.2, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#fef08a' : '#ff4d4d';
    ctx.fill();
  }

  if (slices.length === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, wheelRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#1b0f3e';
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.font = '800 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ALL QUESTIONS COMPLETED!', cx, cy - 70);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 16px Inter, sans-serif';
    ctx.fillText('Click "Restore Taken Questions" or change filter', cx, cy + 85);
    return;
  }

  const count = slices.length;
  const arcSize = (Math.PI * 2) / count;

  // Dynamic sizing for 1 to 60+ slices on the wheel
  let fontSize = 20;
  let pegRadius = 5;
  let dividerWidth = 2;

  if (count > 45) {
    fontSize = 11.5;
    pegRadius = 2.6;
    dividerWidth = 1;
  } else if (count > 32) {
    fontSize = 13;
    pegRadius = 3.2;
    dividerWidth = 1.2;
  } else if (count > 22) {
    fontSize = 15;
    pegRadius = 3.8;
    dividerWidth = 1.5;
  } else if (count > 14) {
    fontSize = 17;
    pegRadius = 4.4;
    dividerWidth = 1.8;
  }

  slices.forEach((slice, i) => {
    const startAngle = state.wheelAngle + i * arcSize;
    const endAngle = startAngle + arcSize;
    const palette = slice.customColor || SLICE_PALETTE[i % SLICE_PALETTE.length];

    // Wedge fill
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, wheelRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = palette.bg;
    ctx.fill();

    // Wedge divider line
    ctx.lineWidth = dividerWidth;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.stroke();

    // Draw text inside slice near outer rim for maximum separation even with 50+ slices
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle + arcSize / 2);

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = palette.text;
    ctx.font = `900 ${fontSize}px Inter, sans-serif`;

    if (count > 30) {
      // Compact single-line radial label near outer rim (e.g. "Q42 • 15m" or "Q42")
      const compactText =
        slice.kind === 'special'
          ? `${slice.label}`
          : count > 44
          ? `${slice.label}·${slice.points}`
          : `${slice.label} (${slice.subLabel})`;
      ctx.fillText(compactText, wheelRadius - 14, 0);
    } else {
      const displayLabel = slice.kind === 'special' && slice.longLabel ? slice.longLabel : slice.label;
      ctx.fillText(displayLabel, wheelRadius - 20, -4);
      if (slice.subLabel) {
        ctx.fillStyle = palette.accent;
        ctx.font = `700 ${Math.max(10, fontSize - 4)}px Inter, sans-serif`;
        ctx.fillText(slice.subLabel, wheelRadius - 20, 12);
      }
    }

    ctx.restore();

    // Draw metallic peg at slice boundary
    const pegX = cx + Math.cos(startAngle) * (wheelRadius - 5);
    const pegY = cy + Math.sin(startAngle) * (wheelRadius - 5);
    ctx.beginPath();
    ctx.arc(pegX, pegY, pegRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fef08a';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#090418';
    ctx.stroke();
  });
}

// Determine which slice is currently under the right-hand pointer (angle 0 rad)
function getSliceIndexAtPointer(angle, sliceCount) {
  if (sliceCount === 0) return -1;
  const twoPi = Math.PI * 2;
  const arcSize = twoPi / sliceCount;
  // Pointer is at 0 radians (3 o'clock right side)
  const normalizedAngle = ((twoPi - (angle % twoPi)) + twoPi) % twoPi;
  return Math.floor(normalizedAngle / arcSize) % sliceCount;
}

// Spin the Wheel with smooth physics easing
function spinWheel() {
  if (state.isSpinning) return;
  const slices = getWheelSlices();
  if (slices.length === 0) {
    showToast('No unanswered questions on the wheel! Click "Restore Taken Questions" or adjust the filter.');
    return;
  }

  state.isSpinning = true;
  const container = document.getElementById('wheelContainer');
  const spinBtnMain = document.getElementById('btnSpinMain');
  const spinBtnCenter = document.getElementById('wheelCenterSpinBtn');
  const pointerEl = document.getElementById('wheelPointer');

  if (container) container.classList.add('spinning');
  if (spinBtnMain) spinBtnMain.disabled = true;
  if (spinBtnCenter) spinBtnCenter.disabled = true;

  updateWheelBanner('SPINNING...', 'The Wheel of the Word is spinning!', 'Watch the pointer on the right...');

  const durationMs = Math.max(2000, (Number(state.settings.spinDuration) || 5) * 1000);
  const startAngle = state.wheelAngle;
  // Spin between 6 and 9 full rotations + random offset
  const extraSpins = (6 + Math.random() * 3.5) * Math.PI * 2;
  const targetAngle = startAngle + extraSpins;
  const startTime = performance.now();
  let lastSliceIndex = getSliceIndexAtPointer(startAngle, slices.length);
  let lastTickTime = 0;

  function animateFrame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    // Quartic ease-out for realistic game show wheel deceleration
    const eased = 1 - Math.pow(1 - progress, 4);

    state.wheelAngle = startAngle + (targetAngle - startAngle) * eased;
    drawWheel();

    const currentSliceIndex = getSliceIndexAtPointer(state.wheelAngle, slices.length);
    if (currentSliceIndex !== lastSliceIndex) {
      lastSliceIndex = currentSliceIndex;
      // Throttle audio ticks slightly at ultra-high speed when 50 slices are on the wheel
      if (now - lastTickTime > 22) {
        lastTickTime = now;
        sound.playTick();
        if (pointerEl) {
          pointerEl.classList.add('tick-bounce');
          setTimeout(() => pointerEl.classList.remove('tick-bounce'), 42);
        }
      }
    }

    if (progress < 1) {
      wheelAnimationFrameId = requestAnimationFrame(animateFrame);
    } else {
      wheelAnimationFrameId = null;
      state.isSpinning = false;
      if (container) container.classList.remove('spinning');
      if (spinBtnMain) spinBtnMain.disabled = false;
      if (spinBtnCenter) spinBtnCenter.disabled = false;

      const winningSlice = slices[currentSliceIndex];
      handleWheelLanded(winningSlice);
    }
  }

  wheelAnimationFrameId = requestAnimationFrame(animateFrame);
}

function handleWheelLanded(slice) {
  if (!slice) return;
  sound.playQuestionLand();

  if (slice.kind === 'special') {
    if (slice.specialType === 'DOUBLE') {
      state.activeMultiplier = 2;
      renderMultiplierBanner();
      updateWheelBanner(
        '🔥 2× DOUBLE MARKS ACTIVATED!',
        'Spin again! The next question is worth DOUBLE MARKS!',
        'Click SPIN THE WHEEL to draw the 2× question.'
      );
      showToast('🔥 DOUBLE MARKS! Spin again for a 2× points question!');
    } else if (slice.specialType === 'BONUS5') {
      const contender = getActiveContender();
      if (contender) {
        contender.score += 5;
        saveState();
        renderContenders();
        showToast(`🎁 +5 Bonus Marks awarded to ${contender.name}! Spin again!`);
        updateWheelBanner(
          '🎁 +5 BONUS MARKS!',
          `${contender.name} receives +5 Free Bonus Marks!`,
          'Now spin the wheel again to draw their Bible question!'
        );
      } else {
        updateWheelBanner('🎁 +5 BONUS SLICE!', 'Select a contender and spin again!', '');
      }
    } else if (slice.specialType === 'SPIN_AGAIN') {
      updateWheelBanner(
        '🎡 FREE SPIN!',
        'Landed on Free Spin — Spin the Wheel Again!',
        'Press Spacebar or click SPIN THE WHEEL.'
      );
      showToast('🎡 Landed on Free Spin! Spin again!');
    }
    return;
  }

  // Landed on a Question Slice
  updateWheelBanner(
    '🎯 QUESTION SELECTED!',
    `${slice.fullTitle} — ${slice.category}`,
    'Look at the Question Box directly below to answer and award marks.'
  );

  openQuestionInStage(slice.questionId);
}

function updateWheelBanner(tag, headline, sub) {
  const tagEl = document.getElementById('wheelStatusTag');
  const headEl = document.getElementById('wheelStatusHeadline');
  const subEl = document.getElementById('wheelStatusSub');
  if (tagEl) tagEl.textContent = tag;
  if (headEl) headEl.textContent = headline;
  if (subEl) subEl.innerHTML = sub;
}

function renderMultiplierBanner() {
  const banner = document.getElementById('multiplierBanner');
  if (!banner) return;
  if (state.activeMultiplier > 1) {
    banner.classList.add('active');
  } else {
    banner.classList.remove('active');
  }
}

// ==========================================
// QUESTION STAGE BOX (UNDER THE WHEEL)
// ==========================================
function openQuestionInStage(questionId) {
  const q = state.questions.find((item) => item.id === questionId);
  if (!q) return;

  state.activeQuestionId = q.id;
  state.selectedMcqIndex = null;
  state.isAnswerRevealed = false;

  const qNumber = state.questions.findIndex((item) => item.id === q.id) + 1;
  const effectivePoints = q.points * state.activeMultiplier;

  const emptyState = document.getElementById('questionEmptyState');
  const activeContent = document.getElementById('questionActiveContent');
  const stageCard = document.getElementById('questionStageCard');

  if (emptyState) emptyState.style.display = 'none';
  if (activeContent) activeContent.style.display = 'block';
  if (stageCard) stageCard.classList.add('active-question');

  // Badges
  document.getElementById('qDisplayNumber').textContent = `QUESTION #${qNumber} OF ${state.questions.length}`;
  document.getElementById('qDisplayCategory').textContent = q.category;
  document.getElementById('qDisplayType').textContent =
    q.type === 'mcq' ? 'Multiple Choice' : 'Short Answer';
  document.getElementById('qDisplayMarks').textContent =
    state.activeMultiplier > 1
      ? `🔥 ${effectivePoints} MARKS (2×)`
      : `⭐ ${effectivePoints} MARKS`;

  // Question Prompt
  document.getElementById('qDisplayPrompt').textContent = q.prompt;

  // Hide Answer Reveal Box initially
  const revealBox = document.getElementById('answerRevealBox');
  if (revealBox) revealBox.style.display = 'none';

  // Render MCQ vs Short Answer
  const mcqContainer = document.getElementById('mcqOptionsContainer');
  const shortContainer = document.getElementById('shortAnswerContainer');
  const shortInput = document.getElementById('shortAnswerHostInput');
  if (shortInput) shortInput.value = '';

  if (q.type === 'mcq') {
    mcqContainer.style.display = 'grid';
    shortContainer.style.display = 'none';
    renderMcqOptions(q);
  } else {
    mcqContainer.style.display = 'none';
    shortContainer.style.display = 'flex';
  }

  // Update Scoring Buttons labels with effective marks
  const halfPoints = Math.round((effectivePoints / 2) * 10) / 10;
  document.getElementById('btnScoreFull').textContent = `✅ Correct! (+${effectivePoints} Marks)`;
  document.getElementById('btnScoreHalf').textContent = `➗ Half Marks (+${halfPoints} Marks)`;

  // Populate Scoring Contender Select
  populateScoringContenderDropdown();

  // Setup Timer
  resetQuestionTimer(q.timer || 30, state.settings.autoStartTimer);

  // Update Question Grid Tracker highlight
  renderQuestionTrackerGrid();

  // Smooth scroll Question Box into comfortable view
  stageCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderMcqOptions(q) {
  const container = document.getElementById('mcqOptionsContainer');
  if (!container) return;
  container.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  (q.options || []).forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mcq-option-btn';
    if (state.selectedMcqIndex === idx) {
      btn.classList.add('selected');
    }
    if (state.isAnswerRevealed) {
      if (idx === Number(q.correctIndex)) {
        btn.classList.add('correct-reveal');
      } else if (state.selectedMcqIndex === idx) {
        btn.classList.add('wrong-reveal');
      }
    }

    btn.innerHTML = `
      <span class="mcq-letter">${letters[idx] || idx + 1}</span>
      <span>${escapeHtml(optText)}</span>
    `;

    btn.addEventListener('click', () => {
      if (state.isAnswerRevealed) return;
      state.selectedMcqIndex = idx;
      sound.playTick();
      renderMcqOptions(q);
    });

    container.appendChild(btn);
  });
}

function revealCurrentAnswer() {
  const q = state.questions.find((item) => item.id === state.activeQuestionId);
  if (!q) return;

  stopQuestionTimer();
  state.isAnswerRevealed = true;

  if (q.type === 'mcq') {
    renderMcqOptions(q);
    const letters = ['A', 'B', 'C', 'D'];
    const correctLetter = letters[q.correctIndex] || '';
    const correctText = (q.options && q.options[q.correctIndex]) || q.answer || '';
    document.getElementById('answerRevealText').textContent = `${correctLetter}. ${correctText}`;

    if (state.selectedMcqIndex !== null) {
      if (state.selectedMcqIndex === Number(q.correctIndex)) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    } else {
      sound.playQuestionLand();
    }
  } else {
    document.getElementById('answerRevealText').textContent = q.answer || 'See Scripture Reference';
    sound.playQuestionLand();
  }

  document.getElementById('answerRevealRef').textContent = q.reference || '';
  document.getElementById('answerRevealBox').style.display = 'flex';
}

function closeQuestionBox() {
  stopQuestionTimer();
  state.activeQuestionId = null;
  state.selectedMcqIndex = null;
  state.isAnswerRevealed = false;

  document.getElementById('questionEmptyState').style.display = 'flex';
  document.getElementById('questionActiveContent').style.display = 'none';
  document.getElementById('questionStageCard').classList.remove('active-question');
  renderQuestionTrackerGrid();
}

// ==========================================
// QUESTION TIMER ENGINE
// ==========================================
function resetQuestionTimer(seconds = 30, autoStart = false) {
  stopQuestionTimer();
  state.timerTotalSeconds = seconds;
  state.timerSecondsLeft = seconds;
  updateTimerDisplay();
  if (autoStart) {
    startQuestionTimer();
  }
}

function startQuestionTimer() {
  if (state.timerRunning) return;
  if (state.timerSecondsLeft <= 0) {
    state.timerSecondsLeft = state.timerTotalSeconds;
  }
  state.timerRunning = true;
  document.getElementById('btnTimerToggle').textContent = '⏸ Pause';

  state.timerIntervalId = setInterval(() => {
    state.timerSecondsLeft = Math.max(0, state.timerSecondsLeft - 1);
    updateTimerDisplay();

    if (state.timerSecondsLeft > 0 && state.timerSecondsLeft <= 5) {
      sound.playTimerBeep(true);
    } else if (state.timerSecondsLeft === 0) {
      stopQuestionTimer();
      sound.playWrong();
      showToast('⏰ Time is up!');
    }
  }, 1000);
}

function stopQuestionTimer() {
  state.timerRunning = false;
  if (state.timerIntervalId) {
    clearInterval(state.timerIntervalId);
    state.timerIntervalId = null;
  }
  const btn = document.getElementById('btnTimerToggle');
  if (btn) btn.textContent = '▶ Start';
}

function toggleQuestionTimer() {
  if (!state.activeQuestionId) return;
  if (state.timerRunning) {
    stopQuestionTimer();
  } else {
    startQuestionTimer();
  }
}

function updateTimerDisplay() {
  const readout = document.getElementById('timerReadout');
  const fill = document.getElementById('timerProgressFill');
  if (readout) {
    readout.textContent = `${state.timerSecondsLeft}s`;
    if (state.timerSecondsLeft <= 5 && state.timerSecondsLeft > 0) {
      readout.classList.add('urgent');
    } else {
      readout.classList.remove('urgent');
    }
  }
  if (fill) {
    const pct = state.timerTotalSeconds > 0
      ? (state.timerSecondsLeft / state.timerTotalSeconds) * 100
      : 0;
    fill.style.width = `${pct}%`;
  }
}

// ==========================================
// HOST SCORING & CONTENDER TURN MANAGEMENT
// ==========================================
function getActiveContender() {
  return state.contenders.find((c) => c.id === state.activeContenderId) || state.contenders[0] || null;
}

function populateScoringContenderDropdown() {
  const select = document.getElementById('scoringContenderSelect');
  if (!select) return;
  select.innerHTML = '';
  state.contenders.forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.score} Marks)`;
    if (c.id === state.activeContenderId) opt.selected = true;
    select.appendChild(opt);
  });
}

function awardPointsForCurrentQuestion(multiplierFraction = 1) {
  const q = state.questions.find((item) => item.id === state.activeQuestionId);
  if (!q) return;

  const targetContenderId = document.getElementById('scoringContenderSelect').value || state.activeContenderId;
  const contender = state.contenders.find((c) => c.id === targetContenderId);

  const effectiveBase = q.points * state.activeMultiplier;
  const pointsEarned = Math.round(effectiveBase * multiplierFraction * 10) / 10;

  if (contender && pointsEarned > 0) {
    contender.score = Math.round((contender.score + pointsEarned) * 10) / 10;
    contender.answeredCount = (contender.answeredCount || 0) + 1;
    sound.playCorrect();
    launchConfetti(45);
    showToast(`✅ +${pointsEarned} Marks awarded to ${contender.name}!`);
  } else {
    sound.playWrong();
    showToast(`❌ 0 Marks recorded for ${contender ? contender.name : 'Contender'}.`);
  }

  // Mark question answered & reset any 2X multiplier
  q.answered = true;
  state.activeMultiplier = 1;
  renderMultiplierBanner();

  saveState();
  closeQuestionBox();
  advanceToNextContender();
  renderAll();
}

function passQuestionToBonus() {
  if (!state.activeQuestionId) return;
  advanceToNextContender();
  populateScoringContenderDropdown();
  const c = getActiveContender();
  resetQuestionTimer(15, true); // 15s bonus timer
  showToast(`↪ Passed for Bonus Attempt to ${c ? c.name : 'Next Contender'} (15s)!`);
}

function markCompleteAndNext() {
  const q = state.questions.find((item) => item.id === state.activeQuestionId);
  if (q) q.answered = true;
  state.activeMultiplier = 1;
  renderMultiplierBanner();
  saveState();
  closeQuestionBox();
  advanceToNextContender();
  renderAll();
}

function advanceToNextContender() {
  if (state.contenders.length === 0) return;
  const idx = state.contenders.findIndex((c) => c.id === state.activeContenderId);
  const nextIdx = (idx + 1) % state.contenders.length;
  state.activeContenderId = state.contenders[nextIdx].id;
  saveState();
  renderContenders();
}

// ==========================================
// RENDER UI: HEADER, CONTENDERS, TRACKER, FILTERS
// ==========================================
function renderBrandingAndHeader() {
  document.getElementById('orgTitleDisplay').textContent = state.settings.orgName || 'DLSO BENIN REGION';
  document.getElementById('gameTitleDisplay').textContent = state.settings.gameTitle || 'DANIEL ON THE WHEELS';
  document.getElementById('gameSubtitleDisplay').textContent =
    state.settings.gameSubtitle || DEFAULT_QUESTION_SUBTITLE;

  const soundBtn = document.getElementById('btnToggleSound');
  if (soundBtn) {
    soundBtn.textContent = state.settings.soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
  }

  const headerLogoImg = document.getElementById('headerLogoImg');
  const wheelLogoImg = document.getElementById('wheelCenterLogoImg');
  const headerFallback = document.getElementById('headerFallbackSvg');
  const wheelFallback = document.getElementById('wheelFallbackSvg');

  if (state.settings.customLogoDataUrl) {
    if (headerLogoImg) {
      headerLogoImg.src = state.settings.customLogoDataUrl;
      headerLogoImg.style.display = 'block';
    }
    if (wheelLogoImg) {
      wheelLogoImg.src = state.settings.customLogoDataUrl;
      wheelLogoImg.style.display = 'block';
    }
    if (headerFallback) headerFallback.style.display = 'none';
    if (wheelFallback) wheelFallback.style.display = 'none';
  }
}

function renderContenders() {
  const container = document.getElementById('contendersListContainer');
  if (!container) return;

  if (!state.contenders.some((c) => c.id === state.activeContenderId) && state.contenders.length > 0) {
    state.activeContenderId = state.contenders[0].id;
  }

  const activeContender = getActiveContender();
  document.getElementById('activeContenderBannerName').textContent =
    activeContender ? activeContender.name : 'No Contender';
  document.getElementById('activeContenderBannerScore').textContent =
    activeContender ? `${activeContender.score} Marks` : '0 Marks';

  const rankedIds = [...state.contenders]
    .sort((a, b) => b.score - a.score)
    .map((c) => c.id);

  const displayList = state.settings.sortContendersByScore
    ? [...state.contenders].sort((a, b) => b.score - a.score)
    : [...state.contenders];

  container.innerHTML = '';

  displayList.forEach((c) => {
    const rankPos = rankedIds.indexOf(c.id) + 1;
    const isTurn = c.id === state.activeContenderId;

    const item = document.createElement('div');
    item.className = `contender-item ${isTurn ? 'active-turn' : ''}`;

    const rankClass = rankPos <= 3 ? `rank-${rankPos}` : '';

    item.innerHTML = `
      <div class="contender-left">
        <div class="rank-badge ${rankClass}" style="border-bottom: 3px solid ${c.color || '#e61919'};">
          #${rankPos}
        </div>
        <div class="contender-info">
          <div class="contender-name-row">
            <span class="contender-name">${escapeHtml(c.name)}</span>
            ${isTurn ? '<span class="turn-pill">HOT SEAT</span>' : ''}
          </div>
          <div class="contender-meta">${escapeHtml(c.group || 'Contender')} • ${c.answeredCount || 0} solved</div>
        </div>
      </div>
      <div class="contender-right">
        <div class="contender-score">${c.score}</div>
        <div class="score-nudge-btns">
          <button class="nudge-btn" data-action="plus" title="Add +5 Marks">+</button>
          <button class="nudge-btn" data-action="minus" title="Subtract 5 Marks">−</button>
        </div>
      </div>
    `;

    item.addEventListener('click', (e) => {
      const btn = e.target.closest('.nudge-btn');
      if (btn) {
        e.stopPropagation();
        const delta = btn.dataset.action === 'plus' ? 5 : -5;
        c.score = Math.max(0, c.score + delta);
        saveState();
        renderContenders();
        if (state.activeQuestionId) populateScoringContenderDropdown();
        return;
      }
      state.activeContenderId = c.id;
      saveState();
      renderContenders();
      if (state.activeQuestionId) populateScoringContenderDropdown();
    });

    container.appendChild(item);
  });

  const sortBtn = document.getElementById('btnSortContenders');
  if (sortBtn) {
    sortBtn.textContent = state.settings.sortContendersByScore ? '⇅ Sort: Score' : '⇅ Sort: Turn';
  }
}

function renderCategoryFilterOptions() {
  const select = document.getElementById('categoryFilterSelect');
  if (!select) return;
  const categories = Array.from(new Set(state.questions.map((q) => q.category).filter(Boolean)));
  const current = state.categoryFilter;

  select.innerHTML = `<option value="ALL">All Chapters (${state.questions.length} Questions)</option>`;
  categories.forEach((cat) => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    if (cat === current) opt.selected = true;
    select.appendChild(opt);
  });
}

function renderWheelStatsAndTracker() {
  const total = state.questions.length;
  const answered = state.questions.filter((q) => q.answered).length;
  const onWheel = getWheelSlices().filter((s) => s.kind === 'question').length;

  document.getElementById('statOnWheelCount').textContent = onWheel;
  document.getElementById('statAnsweredCount').textContent = answered;
  document.getElementById('statTotalBankCount').textContent = total;
  document.getElementById('trackerSummaryText').textContent = `${total - answered} / ${total} available`;

  renderQuestionTrackerGrid();
}

function renderQuestionTrackerGrid() {
  const grid = document.getElementById('questionPillsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  state.questions.forEach((q, idx) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `q-grid-pill ${q.answered ? 'answered' : ''} ${state.activeQuestionId === q.id ? 'active-now' : ''}`;
    pill.title = q.answered
      ? `Q${idx + 1}: Taken — tap to reopen or retake this question. Use Restore Taken Questions to put it back on the wheel.`
      : `Q${idx + 1}: ${q.category} (${q.points} Marks) — tap to open this question.`;
    pill.innerHTML = `
      <div>Q${idx + 1}${q.answered ? ' ✓' : ''}</div>
      <span>${q.points}m</span>
    `;

    pill.addEventListener('click', () => {
      openQuestionInStage(q.id);
    });

    pill.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      q.answered = !q.answered;
      saveState();
      renderAll();
      showToast(`Question #${idx + 1} marked as ${q.answered ? 'Answered' : 'Unanswered'}.`);
    });

    grid.appendChild(pill);
  });
}

// ==========================================
// ADMIN PORTAL LOGIC (CRUD FOR QUESTIONS & CONTENDERS)
// ==========================================
function renderAdminPortal() {
  document.getElementById('adminQCountBadge').textContent = state.questions.length;
  document.getElementById('adminCCountBadge').textContent = state.contenders.length;

  const searchVal = (document.getElementById('adminSearchQuestions')?.value || '').toLowerCase().trim();
  const qListEl = document.getElementById('adminQuestionsList');
  if (qListEl) {
    qListEl.innerHTML = '';
    state.questions.forEach((q, idx) => {
      const hay = `q${idx + 1} ${q.prompt} ${q.category} ${q.answer} ${q.reference}`.toLowerCase();
      if (searchVal && !hay.includes(searchVal)) return;

      const card = document.createElement('div');
      card.className = 'admin-q-item';
      card.innerHTML = `
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:0.45rem; flex-wrap:wrap; margin-bottom:0.35rem;">
            <span class="q-badge q-badge-number" style="font-size:0.7rem; padding:0.15rem 0.55rem;">Q${idx + 1}</span>
            <span class="q-badge q-badge-category" style="font-size:0.7rem; padding:0.15rem 0.55rem;">${escapeHtml(q.category)}</span>
            <span class="q-badge q-badge-type" style="font-size:0.7rem; padding:0.15rem 0.55rem;">${q.type === 'mcq' ? 'MCQ' : 'Short Answer'}</span>
            <span class="q-badge q-badge-marks" style="font-size:0.7rem; padding:0.15rem 0.55rem;">${q.points} Marks • ${q.timer}s</span>
            ${q.answered ? '<span style="font-size:0.7rem; color:#34d399; font-weight:800;">✔ Answered</span>' : ''}
          </div>
          <div style="font-weight:700; font-size:0.93rem; margin-bottom:0.25rem;">${escapeHtml(q.prompt)}</div>
          <div style="font-size:0.8rem; color:var(--gold-light);">
            <strong>Answer:</strong> ${escapeHtml(
              q.type === 'mcq' ? `${['A', 'B', 'C', 'D'][q.correctIndex]}. ${q.options?.[q.correctIndex] || ''}` : q.answer
            )}
            ${q.reference ? `<span style="color:var(--text-dim);"> — ${escapeHtml(q.reference)}</span>` : ''}
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.35rem; flex-shrink:0;">
          <button class="btn btn-sm" data-action="edit">✏ Edit</button>
          <button class="btn btn-sm" data-action="toggle">${q.answered ? '↺ Restore' : '✔ Mark Done'}</button>
          <button class="btn btn-sm btn-danger" data-action="delete">🗑 Delete</button>
        </div>
      `;

      card.querySelector('[data-action="edit"]').addEventListener('click', () => loadQuestionIntoForm(q));
      card.querySelector('[data-action="toggle"]').addEventListener('click', () => {
        q.answered = !q.answered;
        saveState();
        renderAll();
        renderAdminPortal();
      });
      card.querySelector('[data-action="delete"]').addEventListener('click', () => {
        state.questions = state.questions.filter((item) => item.id !== q.id);
        saveState();
        renderAll();
        renderAdminPortal();
        showToast('Question deleted.');
      });

      qListEl.appendChild(card);
    });
  }

  // Render Admin Contenders List
  const cListEl = document.getElementById('adminContendersList');
  if (cListEl) {
    cListEl.innerHTML = '';
    state.contenders.forEach((c, idx) => {
      const row = document.createElement('div');
      row.className = 'admin-q-item';
      row.style.alignItems = 'center';
      row.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:18px; height:18px; border-radius:50%; background:${c.color || '#e61919'};"></div>
          <div>
            <div style="font-weight:800; font-size:0.96rem;">${escapeHtml(c.name)}</div>
            <div style="font-size:0.78rem; color:var(--text-dim);">${escapeHtml(c.group || '')} • Score: <strong style="color:var(--gold-bright);">${c.score} Marks</strong></div>
          </div>
        </div>
        <div style="display:flex; gap:0.4rem;">
          <button class="btn btn-sm" data-action="up" ${idx === 0 ? 'disabled' : ''}>↑</button>
          <button class="btn btn-sm" data-action="down" ${idx === state.contenders.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="btn btn-sm" data-action="edit">✏ Edit</button>
          <button class="btn btn-sm btn-danger" data-action="delete">🗑</button>
        </div>
      `;

      row.querySelector('[data-action="up"]').addEventListener('click', () => {
        if (idx === 0) return;
        const temp = state.contenders[idx - 1];
        state.contenders[idx - 1] = state.contenders[idx];
        state.contenders[idx] = temp;
        saveState();
        renderAll();
        renderAdminPortal();
      });

      row.querySelector('[data-action="down"]').addEventListener('click', () => {
        if (idx >= state.contenders.length - 1) return;
        const temp = state.contenders[idx + 1];
        state.contenders[idx + 1] = state.contenders[idx];
        state.contenders[idx] = temp;
        saveState();
        renderAll();
        renderAdminPortal();
      });

      row.querySelector('[data-action="edit"]').addEventListener('click', () => loadContenderIntoForm(c));
      row.querySelector('[data-action="delete"]').addEventListener('click', () => {
        state.contenders = state.contenders.filter((item) => item.id !== c.id);
        saveState();
        renderAll();
        renderAdminPortal();
        showToast('Contender removed.');
      });

      cListEl.appendChild(row);
    });
  }

  // Sync Settings Form
  document.getElementById('setOrgName').value = state.settings.orgName || '';
  document.getElementById('setGameTitle').value = state.settings.gameTitle || '';
  document.getElementById('setGameSubtitle').value = state.settings.gameSubtitle || '';
  document.getElementById('setRemoveAnswered').checked = !!state.settings.removeAnsweredFromWheel;
  document.getElementById('setIncludeSpecialWedges').checked = !!state.settings.includeSpecialWedges;
  document.getElementById('setAutoStartTimer').checked = !!state.settings.autoStartTimer;
  document.getElementById('setSpinDuration').value = state.settings.spinDuration || 5;
  const sbUrlEl = document.getElementById('setSupabaseUrl');
  const sbKeyEl = document.getElementById('setSupabaseAnonKey');
  if (sbUrlEl) sbUrlEl.value = state.settings.supabaseUrl || 'https://mrubxczyfxhgfvkpzaxq.supabase.co';
  if (sbKeyEl) sbKeyEl.value = state.settings.supabaseAnonKey || '';
}

function loadQuestionIntoForm(q) {
  document.getElementById('questionFormHeading').textContent = '✏ Edit Question';
  document.getElementById('editQuestionId').value = q.id;
  document.getElementById('qFormType').value = q.type;
  document.getElementById('qFormCategory').value = q.category;
  document.getElementById('qFormPoints').value = q.points;
  document.getElementById('qFormTimer').value = q.timer || 30;
  document.getElementById('qFormPrompt').value = q.prompt;
  document.getElementById('qFormReference').value = q.reference || '';

  toggleQuestionFormTypeFields();

  if (q.type === 'mcq') {
    for (let i = 0; i < 4; i++) {
      document.getElementById(`qFormOpt${i}`).value = (q.options && q.options[i]) || '';
    }
    const radio = document.querySelector(`input[name="qFormCorrectIndex"][value="${q.correctIndex || 0}"]`);
    if (radio) radio.checked = true;
  } else {
    document.getElementById('qFormShortAnswer').value = q.answer || '';
  }

  document.getElementById('btnCancelEditQuestion').style.display = 'inline-flex';
}

function resetQuestionForm() {
  document.getElementById('questionFormHeading').textContent = '➕ Add New Question';
  document.getElementById('editQuestionId').value = '';
  document.getElementById('qFormPrompt').value = '';
  document.getElementById('qFormReference').value = '';
  document.getElementById('qFormShortAnswer').value = '';
  for (let i = 0; i < 4; i++) {
    document.getElementById(`qFormOpt${i}`).value = '';
  }
  const radio0 = document.querySelector('input[name="qFormCorrectIndex"][value="0"]');
  if (radio0) radio0.checked = true;
  document.getElementById('btnCancelEditQuestion').style.display = 'none';
  toggleQuestionFormTypeFields();
}

function toggleQuestionFormTypeFields() {
  const type = document.getElementById('qFormType').value;
  document.getElementById('qFormMcqFields').style.display = type === 'mcq' ? 'flex' : 'none';
  document.getElementById('qFormShortFields').style.display = type === 'short' ? 'flex' : 'none';
}

function loadContenderIntoForm(c) {
  document.getElementById('contenderFormHeading').textContent = '✏ Edit Contender / Team';
  document.getElementById('editContenderId').value = c.id;
  document.getElementById('cFormName').value = c.name;
  document.getElementById('cFormGroup').value = c.group || '';
  document.getElementById('cFormScore').value = c.score || 0;
  document.getElementById('cFormColor').value = c.color || '#e61919';
  document.getElementById('btnCancelEditContender').style.display = 'inline-flex';
}

function resetContenderForm() {
  document.getElementById('contenderFormHeading').textContent = '👤 Add Contender / Team';
  document.getElementById('editContenderId').value = '';
  document.getElementById('cFormName').value = '';
  document.getElementById('cFormGroup').value = '';
  document.getElementById('cFormScore').value = 0;
  document.getElementById('btnCancelEditContender').style.display = 'none';
}

// ==========================================
// PODIUM MODAL & CONFETTI ENGINE
// ==========================================
function openPodiumModal() {
  const modal = document.getElementById('podiumModalBackdrop');
  if (!modal) return;
  modal.classList.add('open');

  const sorted = [...state.contenders].sort((a, b) => b.score - a.score);
  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  const stageEl = document.getElementById('podiumStageContainer');
  stageEl.innerHTML = '';

  const buildPillar = (c, place, trophy) => {
    if (!c) return '';
    return `
      <div class="podium-column podium-${place}">
        <div class="podium-avatar">${trophy}</div>
        <div class="podium-name">${escapeHtml(c.name)}</div>
        <div class="podium-score">${c.score} Marks</div>
        <div class="podium-pillar">${place}${place === 1 ? 'st' : place === 2 ? 'nd' : 'rd'}</div>
      </div>
    `;
  };

  stageEl.innerHTML =
    buildPillar(second, 2, '🥈') +
    buildPillar(first, 1, '👑') +
    buildPillar(third, 3, '🥉');

  const fullEl = document.getElementById('podiumFullStandings');
  fullEl.innerHTML = '';
  sorted.slice(3).forEach((c, idx) => {
    const row = document.createElement('div');
    row.style.cssText =
      'display:flex; justify-content:space-between; padding:0.5rem 0.85rem; background:rgba(255,255,255,0.06); border-radius:8px; font-weight:700;';
    row.innerHTML = `<span>#${idx + 4} ${escapeHtml(c.name)}</span><span style="color:var(--gold-bright);">${c.score} Marks</span>`;
    fullEl.appendChild(row);
  });

  sound.playFanfare();
  launchConfetti(130);
}

// Canvas Confetti Celebration
let confettiParticles = [];
let confettiAnimId = null;

function launchConfetti(count = 90) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#e61919', '#fbbf24', '#fef08a', '#10b981', '#ffffff', '#8b5cf6'];

  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: window.innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 16,
      vy: -(Math.random() * 14 + 6),
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.25,
      alpha: 1
    });
  }

  if (!confettiAnimId) {
    animateConfetti();
  }
}

function animateConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.38;
    p.rot += p.vRot;
    p.alpha -= 0.008;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });

  confettiParticles = confettiParticles.filter((p) => p.alpha > 0 && p.y < canvas.height + 30);

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiAnimId = null;
  }
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderAll() {
  renderBrandingAndHeader();
  renderCategoryFilterOptions();
  renderContenders();
  renderWheelStatsAndTracker();
  renderMultiplierBanner();
  drawWheel();
}

// ==========================================
// WIRE UP EVENT LISTENERS
// ==========================================
function initEvents() {
  const spinControls = ['btnSpinMain', 'wheelCenterSpinBtn', 'wheelCanvas'];
  spinControls.forEach((id) => {
    const control = document.getElementById(id);
    if (!control) return;
    control.addEventListener('click', spinWheel);
  });

  // Some mobile browsers/webviews omit the compatibility click after touch.
  // Forward a short, stationary touch to the normal click handlers and suppress
  // the browser's follow-up click when it does emit one.
  let touchStart = null;
  let lastForwardedTouch = null;
  let lastForwardedTouchAt = 0;
  document.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch) return;
    touchStart = { x: touch.clientX, y: touch.clientY, target: event.target };
  }, { capture: true, passive: true });
  document.addEventListener('touchend', (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch || !touchStart) return;
    const start = touchStart;
    touchStart = null;
    if (Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 12) return;

    const target = start.target instanceof Element
      ? start.target.closest('button, a, label, summary, canvas, [role="button"]')
      : null;
    if (!target || target.matches(':disabled') || target.getAttribute('aria-disabled') === 'true') return;

    lastForwardedTouch = target;
    lastForwardedTouchAt = Date.now();
    target.click();
    setTimeout(() => {
      if (Date.now() - lastForwardedTouchAt >= 900) lastForwardedTouch = null;
    }, 950);
  }, { capture: true, passive: true });
  document.addEventListener('click', (event) => {
    if (!event.isTrusted || !lastForwardedTouch) return;
    const clicked = event.target;
    if (Date.now() - lastForwardedTouchAt < 900 &&
        (clicked === lastForwardedTouch || lastForwardedTouch.contains(clicked))) {
      event.preventDefault();
      event.stopImmediatePropagation();
      lastForwardedTouch = null;
    }
  }, true);

  document.getElementById('btnCancelMultiplier').addEventListener('click', () => {
    state.activeMultiplier = 1;
    renderMultiplierBanner();
  });

  document.getElementById('btnNextTurnHeader').addEventListener('click', () => {
    advanceToNextContender();
    const c = getActiveContender();
    if (c) showToast(`🎯 Now on the Hot Seat: ${c.name}`);
  });

  document.getElementById('btnToggleSound').addEventListener('click', () => {
    state.settings.soundEnabled = !state.settings.soundEnabled;
    saveState();
    renderBrandingAndHeader();
  });

  document.getElementById('btnFullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  });

  document.getElementById('categoryFilterSelect').addEventListener('change', (e) => {
    state.categoryFilter = e.target.value;
    renderWheelStatsAndTracker();
    drawWheel();
  });

  document.getElementById('typeFilterSelect').addEventListener('change', (e) => {
    state.typeFilter = e.target.value;
    renderWheelStatsAndTracker();
    drawWheel();
  });

  document.getElementById('btnResetAnsweredQuestions').addEventListener('click', () => {
    state.questions.forEach((q) => {
      q.answered = false;
    });
    saveState();
    renderAll();
    showToast('All taken questions restored onto the wheel!');
  });

  document.getElementById('btnTimerToggle').addEventListener('click', toggleQuestionTimer);
  document.getElementById('btnTimerReset').addEventListener('click', () => {
    const q = state.questions.find((item) => item.id === state.activeQuestionId);
    resetQuestionTimer(q?.timer || 30, false);
  });

  document.getElementById('btnRevealAnswer').addEventListener('click', revealCurrentAnswer);
  document.getElementById('btnCloseQuestionBox').addEventListener('click', closeQuestionBox);

  document.getElementById('btnScoreFull').addEventListener('click', () => awardPointsForCurrentQuestion(1));
  document.getElementById('btnScoreHalf').addEventListener('click', () => awardPointsForCurrentQuestion(0.5));
  document.getElementById('btnScoreWrong').addEventListener('click', () => awardPointsForCurrentQuestion(0));
  document.getElementById('btnPassBonus').addEventListener('click', passQuestionToBonus);
  document.getElementById('btnMarkCompleteNext').addEventListener('click', markCompleteAndNext);

  document.getElementById('btnSortContenders').addEventListener('click', () => {
    state.settings.sortContendersByScore = !state.settings.sortContendersByScore;
    saveState();
    renderContenders();
  });

  document.getElementById('btnQuickAddContender').addEventListener('click', () => {
    requestAdminAccess('tabContenders');
  });

  document.getElementById('btnOpenPodium').addEventListener('click', openPodiumModal);
  document.getElementById('btnClosePodium').addEventListener('click', () => {
    document.getElementById('podiumModalBackdrop').classList.remove('open');
  });
  document.getElementById('btnFireConfettiAgain').addEventListener('click', () => {
    sound.playFanfare();
    launchConfetti(130);
  });

  document.getElementById('btnOpenAdmin').addEventListener('click', () => requestAdminAccess('tabQuestions'));
  document.getElementById('btnCloseAdmin').addEventListener('click', () => {
    document.getElementById('adminModalBackdrop').classList.remove('open');
    adminAccessGranted = false;
  });
  document.getElementById('btnCancelAdminAccess').addEventListener('click', closeAdminPasswordModal);
  document.getElementById('adminPasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById('adminPasswordInput');
    if (passwordInput.value !== ADMIN_ACCESS_PASSWORD) {
      document.getElementById('adminPasswordError').textContent = 'That password is not correct. Try again.';
      passwordInput.select();
      return;
    }
    adminAccessGranted = true;
    closeAdminPasswordModal();
    openAdminModal(pendingAdminTab);
  });

  document.querySelectorAll('.admin-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchAdminTab(btn.dataset.tab);
    });
  });

  document.getElementById('qFormType').addEventListener('change', toggleQuestionFormTypeFields);
  document.getElementById('btnCancelEditQuestion').addEventListener('click', resetQuestionForm);
  document.getElementById('adminSearchQuestions').addEventListener('input', renderAdminPortal);

  document.getElementById('questionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editQuestionId').value;
    const type = document.getElementById('qFormType').value;
    const category = document.getElementById('qFormCategory').value.trim() || 'Book of Daniel';
    const points = Math.max(1, Number(document.getElementById('qFormPoints').value) || 10);
    const timer = Math.max(5, Number(document.getElementById('qFormTimer').value) || 30);
    const prompt = document.getElementById('qFormPrompt').value.trim();
    const reference = document.getElementById('qFormReference').value.trim();

    if (!prompt) return;

    let options = [];
    let correctIndex = 0;
    let answer = '';

    if (type === 'mcq') {
      options = [
        document.getElementById('qFormOpt0').value.trim() || 'Option A',
        document.getElementById('qFormOpt1').value.trim() || 'Option B',
        document.getElementById('qFormOpt2').value.trim() || 'Option C',
        document.getElementById('qFormOpt3').value.trim() || 'Option D'
      ];
      const checkedRadio = document.querySelector('input[name="qFormCorrectIndex"]:checked');
      correctIndex = checkedRadio ? Number(checkedRadio.value) : 0;
      answer = options[correctIndex];
    } else {
      answer = document.getElementById('qFormShortAnswer').value.trim() || 'Host Verified Answer';
    }

    if (editId) {
      const existing = state.questions.find((q) => q.id === editId);
      if (existing) {
        existing.type = type;
        existing.category = category;
        existing.points = points;
        existing.timer = timer;
        existing.prompt = prompt;
        existing.options = options;
        existing.correctIndex = correctIndex;
        existing.answer = answer;
        existing.reference = reference;
        showToast('Question updated!');
      }
    } else {
      state.questions.push({
        id: 'q_' + Date.now(),
        type,
        category,
        points,
        timer,
        prompt,
        options,
        correctIndex,
        answer,
        reference,
        answered: false
      });
      showToast('New question added to the wheel!');
    }

    saveState();
    resetQuestionForm();
    renderAll();
    renderAdminPortal();
  });

  document.getElementById('btnExportQuestions').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state.questions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dlso-benin-20-youth-discussion-questions.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('inputImportQuestions').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (Array.isArray(imported) && imported.length > 0) {
          state.questions = imported;
          saveState();
          renderAll();
          renderAdminPortal();
          showToast(`Imported ${imported.length} questions successfully!`);
        } else {
          showToast('Invalid JSON question array.');
        }
      } catch (err) {
        showToast('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('btnResetDefaultQuestions').addEventListener('click', () => {
    state.questions = cloneData(DEFAULT_QUESTIONS);
    saveState();
    renderAll();
    renderAdminPortal();
    showToast(`Loaded all ${state.questions.length} default discussion questions!`);
  });

  document.getElementById('btnCancelEditContender').addEventListener('click', resetContenderForm);
  document.getElementById('contenderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editContenderId').value;
    const name = document.getElementById('cFormName').value.trim();
    const group = document.getElementById('cFormGroup').value.trim();
    const score = Number(document.getElementById('cFormScore').value) || 0;
    const color = document.getElementById('cFormColor').value || '#e61919';

    if (!name) return;

    if (editId) {
      const existing = state.contenders.find((c) => c.id === editId);
      if (existing) {
        existing.name = name;
        existing.group = group;
        existing.score = score;
        existing.color = color;
        showToast('Contender updated!');
      }
    } else {
      const newC = {
        id: 'c_' + Date.now(),
        name,
        group,
        score,
        answeredCount: 0,
        color
      };
      state.contenders.push(newC);
      if (!state.activeContenderId) state.activeContenderId = newC.id;
      showToast(`Added contender: ${name}`);
    }

    saveState();
    resetContenderForm();
    renderAll();
    renderAdminPortal();
  });

  document.getElementById('btnResetAllScores').addEventListener('click', () => {
    state.contenders.forEach((c) => {
      c.score = 0;
      c.answeredCount = 0;
    });
    saveState();
    renderAll();
    renderAdminPortal();
    showToast('All contender scores reset to 0.');
  });

  document.getElementById('btnResetGameProgress').addEventListener('click', resetGameProgress);

  document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.settings.orgName = document.getElementById('setOrgName').value.trim() || 'DLSO BENIN REGION';
    state.settings.gameTitle = document.getElementById('setGameTitle').value.trim() || 'DANIEL ON THE WHEELS';
    state.settings.gameSubtitle = document.getElementById('setGameSubtitle').value.trim();
    saveState();
    renderAll();
    showToast('Branding & event details saved!');
  });

  ['setRemoveAnswered', 'setIncludeSpecialWedges', 'setAutoStartTimer', 'setSpinDuration'].forEach((id) => {
    document.getElementById(id).addEventListener('change', () => {
      state.settings.removeAnsweredFromWheel = document.getElementById('setRemoveAnswered').checked;
      state.settings.includeSpecialWedges = document.getElementById('setIncludeSpecialWedges').checked;
      state.settings.autoStartTimer = document.getElementById('setAutoStartTimer').checked;
      state.settings.spinDuration = Math.max(2, Number(document.getElementById('setSpinDuration').value) || 5);
      saveState();
      renderAll();
    });
  });

  document.getElementById('setLogoUpload').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.settings.customLogoDataUrl = reader.result;
      saveState();
      renderBrandingAndHeader();
      showToast('Custom logo uploaded!');
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('btnResetLogoDefault').addEventListener('click', () => {
    state.settings.customLogoDataUrl = '';
    saveState();
    location.reload();
  });

  const btnSaveSb = document.getElementById('btnSaveSupabaseKey');
  if (btnSaveSb) {
    btnSaveSb.addEventListener('click', async () => {
      state.settings.supabaseUrl =
        document.getElementById('setSupabaseUrl').value.trim() || 'https://mrubxczyfxhgfvkpzaxq.supabase.co';
      state.settings.supabaseAnonKey = document.getElementById('setSupabaseAnonKey').value.trim();
      saveState();
      await syncFromSupabaseCloud();
      showToast('☁️ Supabase cloud connection updated!');
    });
  }

  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (document.getElementById('adminModalBackdrop').classList.contains('open')) return;

    if (e.code === 'Space') {
      e.preventDefault();
      spinWheel();
    } else if (e.key === 'r' || e.key === 'R') {
      if (state.activeQuestionId) revealCurrentAnswer();
    } else if (e.key === 't' || e.key === 'T') {
      if (state.activeQuestionId) toggleQuestionTimer();
    } else if (e.key === 'n' || e.key === 'N') {
      advanceToNextContender();
      const c = getActiveContender();
      if (c) showToast(`🎯 Now on the Hot Seat: ${c.name}`);
    }
  });
}

function requestAdminAccess(tabId = 'tabQuestions') {
  pendingAdminTab = tabId;
  if (adminAccessGranted) {
    openAdminModal(tabId);
    return;
  }
  document.getElementById('adminPasswordInput').value = '';
  document.getElementById('adminPasswordError').textContent = '';
  document.getElementById('adminPasswordBackdrop').classList.add('open');
  document.getElementById('adminPasswordInput').focus();
}

function closeAdminPasswordModal() {
  document.getElementById('adminPasswordBackdrop').classList.remove('open');
  document.getElementById('adminPasswordInput').value = '';
  document.getElementById('adminPasswordError').textContent = '';
}

function resetGameProgress() {
  const confirmed = window.confirm(
    'Reset all scores to 0 and restore every question to unanswered? This also closes the current question and clears the active bonus.'
  );
  if (!confirmed) return;

  if (wheelAnimationFrameId !== null) {
    cancelAnimationFrame(wheelAnimationFrameId);
    wheelAnimationFrameId = null;
  }
  state.isSpinning = false;
  state.questions.forEach((question) => { question.answered = false; });
  state.contenders.forEach((contender) => {
    contender.score = 0;
    contender.answeredCount = 0;
  });
  state.activeContenderId = state.contenders[0]?.id || null;
  state.activeMultiplier = 1;
  state.categoryFilter = 'ALL';
  state.typeFilter = 'ALL';
  state.wheelAngle = 0;

  closeQuestionBox();
  resetQuestionTimer(30, false);
  document.getElementById('categoryFilterSelect').value = 'ALL';
  document.getElementById('typeFilterSelect').value = 'ALL';
  document.getElementById('wheelContainer').classList.remove('spinning');
  document.getElementById('wheelCenterSpinBtn').disabled = false;
  document.getElementById('btnSpinMain').disabled = false;
  document.getElementById('wheelPointer').classList.remove('tick-bounce');

  saveState();
  renderAll();
  renderAdminPortal();
  showToast('Game progress reset: scores are 0 and all questions are available.');
}

function openAdminModal(tabId = 'tabQuestions') {
  renderAdminPortal();
  switchAdminTab(tabId);
  document.getElementById('adminModalBackdrop').classList.add('open');
}

function switchAdminTab(tabId) {
  document.querySelectorAll('.admin-tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.admin-tab-pane').forEach((pane) => {
    pane.classList.toggle('active', pane.id === tabId);
  });
}

// Initialize App on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initEvents();
  renderAll();
});
