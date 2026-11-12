# 🎡 DLSO Benin Region — "Daniel on the Wheels"

A DLSO game on the Book of Daniel.

> **Interactive Christian Bible Quiz & Spinning Wheel Game Show Web Application**  
> Built for **DLSO (Deeper Life Student Outreach) Benin Region** • Powered by **Supabase PostgreSQL** & **Netlify**

---

## 📖 Overview

**Daniel on the Wheels** is a broadcast-style, projector-ready Christian Quiz Game Show application designed for student outreaches, regional Bible competitions, youth camps, and fellowship quiz events across the **DLSO Benin Region**.

The Game Show Host spins an interactive wheel loaded with **up to 50+ Bible questions** (plus special game show wedges). When the wheel lands on a slice, the **Question Stage Box** directly beneath the wheel opens with a countdown timer, interactive **Multiple Choice (`A–D`)** or **Short Answer** display, official KJV Scripture verification, and one-click scoring controls for the contenders.

---

## ✨ Key Features

### 1. 🎡 High-Capacity Spinning Question Wheel
- **Supports 50+ Questions Simultaneously:** Adaptive high-DPI HTML5 `<canvas>` (`760×760`) scales typography, gold rim pegs, and wedge dividers cleanly whether 5 or 53 slices are on the wheel.
- **Physics & Audio Engine:** Quartic ease-out deceleration with Web Audio API synthesized peg ticks, fanfare chimes, urgent countdown beeps, and buzzers (zero external MP3 dependencies).
- **Special Game Show Wedges:**
  - `🔥 2× MARKS` — Doubles the point value of the next question drawn.
  - `🎁 +5 BONUS` — Awards +5 free marks to the contender on the Hot Seat and grants another spin.
  - `🎡 FREE SPIN` — Grants an immediate extra spin.
- **Smart Filtering:** Spin across all 50 questions at once, or filter the wheel by specific chapter (`Daniel Ch. 1` through `Daniel Ch. 10–12`) or format (`Multiple Choice Only` / `Short Answer Only`).
- **Auto-Removal of Answered Questions:** Answered questions are automatically removed from the wheel so the pointer only lands on fresh questions (can be restored with one click).

### 2. 📦 Dynamic Question Box (Directly Under the Wheel)
- **Multiple Choice Mode (`MCQ`):** Displays 4 interactive option cards (`A`, `B`, `C`, `D`). Clicking an option locks in the contender's choice in gold; clicking **👁 Reveal Answer (`R`)** highlights the correct option in emerald green (and wrong choice in crimson) alongside the KJV Scripture reference.
- **Short Answer Mode:** Displays the question prompt with an optional live host scratchpad to project the contender's spoken response, plus a one-click **👁 Reveal Answer (`R`)** card showing the expected official answer and KJV verse quote.
- **Countdown Timer:** Visual progress bar + digital countdown (`25s`–`40s` per question) with `Start/Pause (T)` and `Reset` controls.
- **Host Scoring Action Bar:**
  - `✅ Correct! (+Full Marks)` — Awards full marks (or `2×` if Double Marks active), launches celebration confetti, marks the question complete, and rotates to the next contender.
  - `➗ Half Marks` — Awards 50% of the question's marks for partially correct short answers.
  - `❌ Incorrect (0 Marks)` — Records a missed attempt and advances the turn.
  - `↪ Pass / Bonus Attempt` — Passes the open question to the next contender with a 15-second bonus timer.

### 3. 🏆 Contenders Scoreboard & Championship Podium
- Track individual contenders, houses (*Daniel House*, *Hananiah House*, *Mishael House*, *Azariah House*), or school/district teams.
- Highlights who is currently on the **🎯 Hot Seat**.
- Includes quick `+5` / `−5` score adjustment buttons, sorting by **Turn Order** or **Highest Score**, and a **🏆 Podium** modal with 1st, 2nd, and 3rd place pillars and full-screen confetti.

### 4. ⚙️ Full Admin Portal (Cloud-Synced with Supabase)
- **Admin access password:** `JOSHUA`.
- The password prompt is a client-side convenience gate; it is visible in this public repository and does not provide secure authentication for sensitive data.
- **Question Management (CRUD):** Add, edit, search, or delete questions; choose Multiple Choice or Short Answer; customize **Score Marks** (`5`–`500`) and **Timer Seconds** per question; Export/Import `.json` packs; or reset to the 50-question Book of Daniel pack.
- **Contenders & Teams Management:** Add/remove contenders, edit scores, customize badge colors, reorder turn sequence, or reset all scores to `0`.
- **Wheel & Branding Settings:** Customize the Organization Name, Event Title, Subtitle, custom logo upload, spin duration, and Supabase connection settings. Reset game progress to clear scores and restore all questions to unanswered while keeping the question bank and settings.

---

## 📚 Pre-Loaded 50 Book of Daniel Questions (`Q1`–`Q50`)

All **50 questions** are KJV-aligned and cover the entire **Book of Daniel (Chapters 1 to 12)**:

| Question Range | Chapter / Theme | Formats Included |
| :--- | :--- | :--- |
| **Q1 – Q6** | **Daniel Ch. 1** — Faithfulness in Babylon, Pulse & Water Test | 3 MCQ, 3 Short Answer |
| **Q7 – Q12** | **Daniel Ch. 2** — Nebuchadnezzar's Dream & The Great Image | 3 MCQ, 3 Short Answer |
| **Q13 – Q17** | **Daniel Ch. 3** — The Golden Image & Burning Fiery Furnace | 3 MCQ, 2 Short Answer |
| **Q18 – Q21** | **Daniel Ch. 4** — Vision of the Great Tree & Humbling of the King | 2 MCQ, 2 Short Answer |
| **Q22 – Q26** | **Daniel Ch. 5** — Belshazzar's Feast & Handwriting on the Wall | 3 MCQ, 2 Short Answer |
| **Q27 – Q31** | **Daniel Ch. 6** — Daniel in the Den of Lions | 3 MCQ, 2 Short Answer |
| **Q32 – Q36** | **Daniel Ch. 7** — The Four Beasts & The Ancient of Days | 3 MCQ, 2 Short Answer |
| **Q37 – Q40** | **Daniel Ch. 8** — Vision of the Ram and the Rough He-Goat | 2 MCQ, 2 Short Answer |
| **Q41 – Q44** | **Daniel Ch. 9** — Daniel's Prayer & The Seventy Weeks Prophecy | 2 MCQ, 2 Short Answer |
| **Q45 – Q50** | **Daniel Ch. 10–12** — Spiritual Warfare, Exploits & End-Time Visions | 2 MCQ, 4 Short Answer |

---

## 🏗️ System Architecture

```mermaid
flowchart LR
  subgraph Client["Browser (Projector / Host & Admin UI)"]
    UI["index.html + styles.css + app.js"]
    LS["Browser localStorage (Instant Offline Cache)"]
  end

  subgraph Netlify["Netlify Hosting & Serverless"]
    FN["Netlify Function (/api/state)"]
  end

  subgraph Supabase["Supabase PostgreSQL Cloud"]
    REST["Supabase PostgREST API"]
    DB[("PostgreSQL Tables:\n• dlso_questions\n• dlso_contenders\n• dlso_game_state")]
  end

  UI <--> LS
  UI <-->|"HTTPS /api/state"| FN
  FN <-->|"Supavisor Pooler (pg)"| DB
  UI -.->|"Optional Direct REST (Anon Key)"| REST
  REST <--> DB
```

---

## 🗄️ Supabase PostgreSQL Schema

The database seeder (`seed-supabase.js`) automatically creates and populates three tables in your Supabase `public` schema:

1. **`public.dlso_questions`** — `id`, `q_order`, `type`, `category`, `points`, `timer`, `prompt`, `options` (`JSONB`), `correct_index`, `answer`, `reference`, `answered`, `updated_at`
2. **`public.dlso_contenders`** — `id`, `c_order`, `name`, `group_name`, `score`, `answered_count`, `color`, `updated_at`
3. **`public.dlso_game_state`** — `id` (`'main'`), `settings` (`JSONB`), `active_contender_id`, `updated_at`

---

## 🚀 Deployment Guide (Netlify)

### Option A: Deploy via GitHub to Netlify (Recommended — Full Auto-Sync)
Because this repository includes `netlify.toml` and `netlify/functions/api.js`, connecting this GitHub repository to Netlify automatically deploys **both** the frontend and the serverless PostgreSQL API (`/api/state`):
1. Log in to [app.netlify.com](https://app.netlify.com) and click **Add new project → Import an existing project → GitHub**.
2. Select **`midlexllp01/Daniel-on-wheels`**.
3. Leave the build settings as configured in `netlify.toml` (`publish = "."`, `functions = "netlify/functions"`).
4. *(Optional)* In **Site configuration → Environment variables**, set `DATABASE_URL` or `SUPABASE_DB_PASSWORD`.
5. Click **Deploy site** — your free `.netlify.app` link will be live with automatic Supabase PostgreSQL syncing!

### Option B: Manual Drag-and-Drop to Netlify
If you prefer to drag and drop without connecting GitHub:
1. Open [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the **`netlify-drag-and-drop`** folder into the browser.
3. To enable live browser-to-Supabase syncing on a drag-and-drop site, open **⚙️ Admin Portal → Wheel & Branding Settings** and paste your **Supabase Anon Public Key**.

---

## 💻 Local Setup & Development

```bash
# 1. Install dependencies (pg driver)
npm install

# 2. Seed / Reset the 50 Book of Daniel questions into Supabase PostgreSQL
npm run seed

# 3. Start the local server at http://localhost:3000
npm start
```

You can also open `index.html` directly in any browser for 100% offline use during live events.

---

## ⌨️ Host Keyboard Shortcuts

| Key | Action |
| :---: | :--- |
| **`Spacebar`** | Spin the Wheel |
| **`R`** | Reveal Official Answer & KJV Scripture Reference |
| **`T`** | Start / Pause Question Countdown Timer |
| **`N`** | Advance to the Next Contender on the Hot Seat |

---

*Built to the glory of God for **DLSO Benin Region** — "And they that be wise shall shine as the brightness of the firmament..." (Daniel 12:3).*
