# Wheelpedia Indonesia — Full Product Completion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Wheelpedia Indonesia fully usable as a personal multi-device learning app: real vehicle images, working AI + random quiz, polished catalog/data surfaces, deploy-ready — without auth.

**Architecture:** Keep static TypeScript data (`src/data/*`) as content source of truth; local files under `public/` for media; AI only via `POST /api/chat` server proxy with env/BYOK; client state (bookmarks, quiz scores, chat) in `localStorage`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, Lucide, existing Prisma/Supabase left unwired until optional Phase E.

**Spec:** `docs/superpowers/specs/2026-07-21-full-product-design.md`  
**Prior fixes:** `docs/HOWTO-FIXES.md`  
**Project root:** `C:\Projects\wheelpedia-indonesia`

## Global Constraints

- No auth (personal single-user).
- Never put API keys in client source; use `.env.local` / Vercel env + optional BYOK localStorage.
- Image paths must match `Vehicle.id`: `public/vehicles/{id}.jpg`.
- Prefer free-license images; document in `public/ATTRIBUTION.md`.
- Indonesian user-facing copy.
- After each phase: `npm run lint` (0 errors) and `npx tsc --noEmit` (exit 0).
- Do not commit `.env.local`.
- Windows PowerShell; use `;` not `&&` when chaining dependent success carefully.

## Handoff for NEW SESSION (read this first)

```
Repo: C:\Projects\wheelpedia-indonesia
Spec: docs/superpowers/specs/2026-07-21-full-product-design.md
Plan: docs/superpowers/plans/2026-07-21-full-product-completion.md  ← this file
Already done (2026-07-21 earlier session):
  - Clone + npm install
  - AI server proxy src/app/api/chat/route.ts
  - Client src/lib/ai.ts (no hardcoded keys)
  - catalog-context.ts inject
  - Settings BYOK honest
  - Admin loads real data
  - Catalog upload metadata-only
  - Lint set-state fixes (0 errors, 4 <img> warnings)
Progress 2026-07-21 inline execution:
  DONE Phase A: 50/50 vehicle jpgs, SafeImage, download scripts
  DONE Phase B: quiz-bank 33, /quiz, sidebar, AI chips
  DONE Phase C partial: vehicles from @/data/vehicles, bookmarks+history real
  TODO optional: more Wikimedia-specific model photos, LearningView quiz unify, Vercel deploy
User intent: full develop AI + data + catalog + real images, personal use multi-device
```

**Progress tracking:** Check off `- [ ]` → `- [x]` in this file as you complete steps. Commit after each Task when git is initialized.

## File map (create / modify)

| Path | Responsibility |
|------|----------------|
| `scripts/download-vehicle-images.mjs` | Fetch images from URL map → `public/vehicles/` |
| `scripts/vehicle-image-sources.json` | id → source URL + license note |
| `public/vehicles/{id}.jpg` | Real or placeholder images |
| `public/brands/{id}.png` | Optional brand logos |
| `public/placeholders/vehicle.svg` | Fallback art |
| `public/ATTRIBUTION.md` | Source URLs |
| `src/components/SafeImage.tsx` | next/image wrapper with fallback |
| `src/data/quiz.ts` | Random question bank + types |
| `src/lib/quiz-score.ts` | localStorage score helpers |
| `src/app/api/chat/route.ts` | Harden if needed |
| `src/lib/catalog-context.ts` | Enrich context |
| `src/components/AiAssistantView.tsx` | Random Q chips + better errors |
| `src/components/LearningView.tsx` | Wire quiz scoring |
| `src/app/quiz/page.tsx` | Dedicated random quiz page (new) |
| `src/components/layout/Sidebar.tsx` | Link to quiz |
| `src/app/history/page.tsx` | Show chat history from localStorage |
| `src/app/bookmarks/page.tsx` | Show bookmarked vehicles |
| `next.config.ts` | remotePatterns if any remote images remain |
| `README.md` | Runbook for images + AI + deploy |

---

## Phase A — Real images

### Task A1: Inventory vehicle IDs and image paths

**Files:**
- Create: `scripts/list-vehicle-images.mjs`
- Read: `src/data/vehicles.ts`

**Interfaces:**
- Produces: stdout list of `{ id, image }` and count of missing files under `public/`

- [ ] **Step 1: Create inventory script**

```js
// scripts/list-vehicle-images.mjs
import fs from "node:fs";
import path from "node:path";

const vehiclesPath = path.resolve("src/data/vehicles.ts");
const src = fs.readFileSync(vehiclesPath, "utf8");
const ids = [...src.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
// Vehicle entries only: ids appear before other exports; take unique in order
const unique = [...new Set(ids)];
const publicDir = path.resolve("public/vehicles");
const missing = [];
const present = [];
for (const id of unique) {
  const file = path.join(publicDir, `${id}.jpg`);
  if (fs.existsSync(file)) present.push(id);
  else missing.push(id);
}
console.log(JSON.stringify({ total: unique.length, present: present.length, missing }, null, 2));
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(
  path.resolve("scripts/vehicle-ids.json"),
  JSON.stringify(unique, null, 2),
);
```

- [ ] **Step 2: Run inventory**

```powershell
cd C:\Projects\wheelpedia-indonesia
node scripts/list-vehicle-images.mjs
```

Expected: `total` ~50, `present` 0, `missing` array of all ids; file `scripts/vehicle-ids.json` created.

- [ ] **Step 3: Commit (if git repo)**

```powershell
git add scripts/list-vehicle-images.mjs scripts/vehicle-ids.json
git commit -m "chore: inventory vehicle image ids"
```

---

### Task A2: Placeholder SVG + download script skeleton

**Files:**
- Create: `public/placeholders/vehicle.svg`
- Create: `scripts/download-vehicle-images.mjs`
- Create: `scripts/vehicle-image-sources.json` (start empty map `{}` then fill)

**Interfaces:**
- Consumes: `scripts/vehicle-ids.json`
- Produces: for each id, either download from sources map or copy placeholder to `public/vehicles/{id}.jpg` (or `.svg` — prefer always `.jpg` via sharp if available, else write SVG as `{id}.svg` and update data paths later)

**Decision (locked):** Keep data paths as `/vehicles/{id}.jpg`. If only SVG available, convert/copy using a solid-color JPEG is hard without sharp CLI — instead:

1. Use `public/placeholders/vehicle.svg`
2. For missing downloads, write a minimal valid JPEG using a pre-baked tiny JPEG base64 in the script OR download a single generic free car stock once and copy for missing.

- [ ] **Step 1: Write placeholder SVG**

Create `public/placeholders/vehicle.svg` — simple gray car silhouette + text "Wheelpedia" (inline SVG, ~1–2KB).

- [ ] **Step 2: Create sources JSON template**

```json
{
  "avanza-gen3": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/....jpg",
    "attribution": "Wikimedia Commons, Author, License"
  }
}
```

Fill as many free URLs as practical in Task A3. Empty entries → fallback image.

- [ ] **Step 3: Write downloader**

```js
// scripts/download-vehicle-images.mjs
import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";

const ids = JSON.parse(fs.readFileSync("scripts/vehicle-ids.json", "utf8"));
const sources = JSON.parse(fs.readFileSync("scripts/vehicle-image-sources.json", "utf8"));
const outDir = path.resolve("public/vehicles");
const fallback = path.resolve("public/placeholders/fallback-vehicle.jpg");
fs.mkdirSync(outDir, { recursive: true });

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(url, { headers: { "User-Agent": "WheelpediaImageBot/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchBuffer(res.headers.location).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });
    req.on("error", reject);
  });
}

// Ensure fallback exists: copy from a known free URL once if missing
async function ensureFallback() {
  if (fs.existsSync(fallback)) return;
  fs.mkdirSync(path.dirname(fallback), { recursive: true });
  // Generic free stock (replace URL if broken):
  const url =
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80";
  const buf = await fetchBuffer(url);
  fs.writeFileSync(fallback, buf);
}

async function main() {
  await ensureFallback();
  const attribution = ["# Image attribution", ""];
  for (const id of ids) {
    const dest = path.join(outDir, `${id}.jpg`);
    const src = sources[id];
    try {
      if (src?.url) {
        const buf = await fetchBuffer(src.url);
        fs.writeFileSync(dest, buf);
        attribution.push(`- \`${id}.jpg\`: ${src.attribution || src.url}`);
        console.log("OK", id);
      } else {
        fs.copyFileSync(fallback, dest);
        attribution.push(`- \`${id}.jpg\`: fallback placeholder`);
        console.log("FALLBACK", id);
      }
    } catch (e) {
      fs.copyFileSync(fallback, dest);
      console.log("ERR→FALLBACK", id, e.message);
      attribution.push(`- \`${id}.jpg\`: fallback (error: ${e.message})`);
    }
  }
  fs.writeFileSync("public/ATTRIBUTION.md", attribution.join("\n") + "\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

- [ ] **Step 4: Smoke-run (may use all fallbacks)**

```powershell
# create empty sources if missing
if (-not (Test-Path scripts\vehicle-image-sources.json)) { '{}' | Set-Content scripts\vehicle-image-sources.json }
node scripts/download-vehicle-images.mjs
```

Expected: `public/vehicles/*.jpg` count equals vehicle ids; `public/ATTRIBUTION.md` exists.

---

### Task A3: Fill free image URLs (research)

**Files:**
- Modify: `scripts/vehicle-image-sources.json`
- Modify: `public/ATTRIBUTION.md` (regenerated by script)

**Interfaces:**
- Produces: as many real model-matching URLs as possible (priority: popular ID models — Avanza, Innova, Fortuner, Brio, Jazz, HR-V, Xpander, Pajero, Brio, Raize, etc.)

- [ ] **Step 1: Research Wikimedia / Unsplash / Pexels** for top 20 Indonesian models; add to JSON with attribution strings.

- [ ] **Step 2: Re-run downloader**

```powershell
node scripts/download-vehicle-images.mjs
```

- [ ] **Step 3: Spot-check 5 files open in image viewer / browser `http://localhost:3000/vehicles/avanza-gen3.jpg` after `npm run dev`.**

- [ ] **Step 4: Commit media + sources**

```powershell
git add public/vehicles public/ATTRIBUTION.md public/placeholders scripts/
git commit -m "feat: add vehicle images and download pipeline"
```

**Note:** Large binaries — if repo too big, document LFS or keep images local only; for personal project committing ~50 JPGs is usually fine.

---

### Task A4: SafeImage component + replace raw `<img>`

**Files:**
- Create: `src/components/SafeImage.tsx`
- Modify: `src/components/VehicleDatabaseView.tsx`, `MyCatalogView.tsx`, `LearningView.tsx`, `layout/Header.tsx` (any `<img>`)
- Modify: `next.config.ts` only if remote URLs remain

**Interfaces:**
- Produces: `SafeImage({ src, alt, className, fill?, width?, height? })`

- [ ] **Step 1: Implement SafeImage**

```tsx
// src/components/SafeImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
};

const FALLBACK = "/placeholders/fallback-vehicle.jpg";

export function SafeImage({ src, alt, className, width, height, fill, sizes }: Props) {
  const [current, setCurrent] = useState(src || FALLBACK);

  if (fill) {
    return (
      <Image
        src={current}
        alt={alt}
        fill
        className={className}
        sizes={sizes ?? "100vw"}
        onError={() => setCurrent(FALLBACK)}
      />
    );
  }

  return (
    <Image
      src={current}
      alt={alt}
      width={width ?? 400}
      height={height ?? 300}
      className={className}
      onError={() => setCurrent(FALLBACK)}
    />
  );
}
```

- [ ] **Step 2: Replace `<img` in vehicle/catalog/header/learning with `SafeImage`.**

- [ ] **Step 3: Lint + tsc**

```powershell
npm run lint
npx tsc --noEmit
```

Expected: 0 errors; previous `@next/next/no-img-element` warnings gone for those files.

- [ ] **Step 4: Commit**

```powershell
git add src/components/SafeImage.tsx src/components next.config.ts
git commit -m "feat: SafeImage with next/image and fallback"
```

---

## Phase B — AI + Random questions

### Task B1: Quiz data bank

**Files:**
- Create: `src/data/quiz.ts`
- Create: `src/lib/quiz-score.ts`
- Create: `src/data/quiz.test.ts` OR `scripts/selfcheck-quiz.mjs` (assert bank length + unique ids) — use Node assert self-check if no vitest installed

**Interfaces:**
- Produces:
  - `export type QuizQuestion = { id: string; category: string; prompt: string; choices: string[]; correctIndex: number; explanation: string }`
  - `export const QUIZ_BANK: QuizQuestion[]` (≥ 30 questions from glossary/vehicles/tires)
  - `export function pickRandomQuestions(n: number, seed?: number): QuizQuestion[]`
  - `readQuizStats()` / `recordQuizResult(score, total)` in `quiz-score.ts`

- [ ] **Step 1: Write self-check script first (TDD-ish)**

```js
// scripts/selfcheck-quiz.mjs
import assert from "node:assert/strict";
// After implementation, dynamic import won't work on TS without tsx —
// Instead assert by parsing or run via npx tsx if available.
// Prefer: export bank as quiz.json generated, OR use node --experimental-strip-types if Node 22+.
```

**Locked approach for Windows without extra deps:** keep `src/data/quiz.ts` pure data; self-check duplicates minimal validation in `scripts/selfcheck-quiz.mjs` that imports compiled output OR validates a `src/data/quiz-bank.json` that quiz.ts re-exports.

Simpler path:

1. Create `src/data/quiz-bank.json` with ≥30 questions.
2. `src/data/quiz.ts` imports JSON.
3. Self-check reads JSON.

- [ ] **Step 2: Author ≥30 questions** covering PCD, offset, load index, speed rating, Avanza PCD change gen3, plus-sizing 3% rule, DOT code, center bore.

- [ ] **Step 3: Implement `pickRandomQuestions`**

```ts
// src/data/quiz.ts
import bank from "./quiz-bank.json";

export type QuizQuestion = {
  id: string;
  category: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export const QUIZ_BANK = bank as QuizQuestion[];

export function pickRandomQuestions(n: number): QuizQuestion[] {
  const copy = [...QUIZ_BANK];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}
```

- [ ] **Step 4: quiz-score localStorage**

```ts
// src/lib/quiz-score.ts
const KEY = "wheelpedia_quiz_stats";

export type QuizStats = {
  attempts: number;
  bestScore: number;
  lastScore: number;
  lastTotal: number;
  history: { date: string; score: number; total: number }[];
};

export function readQuizStats(): QuizStats {
  if (typeof window === "undefined") {
    return { attempts: 0, bestScore: 0, lastScore: 0, lastTotal: 0, history: [] };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as QuizStats;
  } catch { /* ignore */ }
  return { attempts: 0, bestScore: 0, lastScore: 0, lastTotal: 0, history: [] };
}

export function recordQuizResult(score: number, total: number): QuizStats {
  const prev = readQuizStats();
  const next: QuizStats = {
    attempts: prev.attempts + 1,
    bestScore: Math.max(prev.bestScore, score),
    lastScore: score,
    lastTotal: total,
    history: [
      { date: new Date().toISOString(), score, total },
      ...prev.history,
    ].slice(0, 20),
  };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
```

- [ ] **Step 5: Run self-check**

```powershell
node -e "const b=require('./src/data/quiz-bank.json'); if(b.length<30) process.exit(1); console.log('quiz ok', b.length)"
```

- [ ] **Step 6: Commit**

```powershell
git add src/data/quiz.ts src/data/quiz-bank.json src/lib/quiz-score.ts
git commit -m "feat: quiz bank and local score storage"
```

---

### Task B2: Quiz page + sidebar link

**Files:**
- Create: `src/app/quiz/page.tsx`
- Create: `src/components/QuizView.tsx`
- Modify: `src/components/layout/Sidebar.tsx` — add nav item "Quiz Acak"
- Modify: `src/components/DashboardView.tsx` — CTA to `/quiz`

**Interfaces:**
- QuizView: 10 random questions, one at a time or list; submit → score; show explanations

- [ ] **Step 1: Implement QuizView** (client component): start → answer → next → finish → `recordQuizResult` → show best/last.

- [ ] **Step 2: Page wrapper with AppShell dynamic ssr:false (match existing pages).**

- [ ] **Step 3: Sidebar entry** `{ href: "/quiz", label: "Quiz Acak", icon: ... }`

- [ ] **Step 4: Manual test** `npm run dev` → `/quiz` complete one run; refresh → stats persist.

- [ ] **Step 5: Commit**

```powershell
git add src/app/quiz src/components/QuizView.tsx src/components/layout/Sidebar.tsx src/components/DashboardView.tsx
git commit -m "feat: random quiz page with scoring"
```

---

### Task B3: AI assistant — random prompts + catalog context verify

**Files:**
- Modify: `src/components/AiAssistantView.tsx` — suggestion chips from quiz + vehicle prompts
- Modify: `src/lib/catalog-context.ts` — ensure size OK (< ~30k chars); trim products if needed
- Modify: `src/app/api/chat/route.ts` — clear 503/502 messages already OK
- Modify: `.env.example` — already present; double-check README

**Interfaces:**
- Chips call `handleSendPrompt` with Indonesian learning prompts
- Optional: button "Soal acak" sends one quiz prompt to AI for explanation (not scored)

- [ ] **Step 1: Add chips** e.g. "PCD Avanza Gen 3 berapa?", "Jelaskan offset ET", "Plus size aman max berapa %?"

- [ ] **Step 2: Wire "Tanya soal acak"** picking from QUIZ_BANK.prompt

- [ ] **Step 3: Manual AI test** with `.env.local` filled and 9router/OpenAI-compatible up:

```powershell
# .env.local must have AI_API_KEY
npm run dev
# Open /ai-assistant, send "PCD Innova Zenix?"
```

Expected: streaming answer mentioning 5x114.3 from catalog context.

- [ ] **Step 4: Commit**

```powershell
git add src/components/AiAssistantView.tsx src/lib/catalog-context.ts
git commit -m "feat: AI learning chips and catalog-aware prompts"
```

---

### Task B4: LearningView quiz integration

**Files:**
- Modify: `src/components/LearningView.tsx` — replace any mock quiz with QUIZ_BANK subset
- Read: existing `QUIZ_DATA` in `src/data.ts` — migrate or re-export from quiz-bank to avoid dual sources

- [ ] **Step 1: Grep for QUIZ_DATA / quiz usage**

```powershell
Select-String -Path src\**\*.tsx,src\**\*.ts -Pattern "QUIZ_"
```

- [ ] **Step 2: Single source of truth — LearningView imports from `@/data/quiz`.**

- [ ] **Step 3: On complete, call `recordQuizResult`.**

- [ ] **Step 4: Lint + commit**

```powershell
npm run lint
git add src/components/LearningView.tsx src/data.ts
git commit -m "feat: unify learning quiz with quiz bank"
```

---

## Phase C — Catalog & data polish

### Task C1: Unify vehicle data consumers

**Files:**
- Grep: imports from `../data` vs `@/data/vehicles`
- Modify components still using legacy `src/data.ts` VEHICLES shape (`name` vs `model`) to use `@/data/vehicles` + adapters if needed

**Problem:** Two vehicle models exist (`src/data.ts` vs `src/data/vehicles.ts`). Causes image/field bugs.

- [ ] **Step 1: List importers of `from "../data"` and `from "@/data"`**

```powershell
Select-String -Path src\**\*.tsx -Pattern 'from ["''].*data'
```

- [ ] **Step 2: Prefer `@/data/vehicles` everywhere for vehicle DB.** Keep `src/data.ts` only for DEFAULT_CHAT_HISTORIES / legacy quiz until deleted.

- [ ] **Step 3: Fix VehicleDatabaseView / MyCatalogView field access** (`model`+`generation` display name instead of `name`).

- [ ] **Step 4: tsc + manual /vehicles page**

- [ ] **Step 5: Commit**

```powershell
git commit -am "refactor: single vehicle data source"
```

---

### Task C2: Bookmarks + History pages real

**Files:**
- Modify: `src/app/bookmarks/page.tsx`
- Modify: `src/app/history/page.tsx`
- Possibly: helpers in `src/lib/browser-storage.ts`

**Interfaces:**
- Bookmarks: read `savedVehicles` from localStorage; list cards with SafeImage; empty state CTA to /vehicles
- History: read `chatHistories` from localStorage; list titles; click → `/ai-assistant` set active id

- [ ] **Step 1: Implement bookmarks page** (client + AppShell).

- [ ] **Step 2: Implement history page.**

- [ ] **Step 3: Manual test save vehicle → bookmarks shows it.**

- [ ] **Step 4: Commit**

```powershell
git commit -am "feat: working bookmarks and chat history pages"
```

---

### Task C3: Comparison + calculators QA pass

**Files:**
- Modify: `src/app/comparison/page.tsx` if needed
- Modify: `src/components/UtilitiesView.tsx` if bugs found
- Read: `src/lib/calculators.ts`

- [ ] **Step 1: Manual matrix**

| Test | Expected |
|------|----------|
| 185/65 R15 vs 195/55 R16 | diameter diff + speed error % shown |
| |abs(error)| ≤ 3% green |
| Wheel tab ET change | poke/inset numbers update |

- [ ] **Step 2: Fix any NaN / divide-by-zero.**

- [ ] **Step 3: Commit if changes.**

---

### Task C4: Brands / tires / wheels pages visual pass

**Files:**
- `src/app/brands/*`, `tires/page.tsx`, `wheels/page.tsx`
- Optional brand images under `public/brands/`

- [ ] **Step 1: Ensure each page lists data without crash.**

- [ ] **Step 2: Add brand logo field optional; fallback initial letter avatar.**

- [ ] **Step 3: Commit.**

---

## Phase D — Polish + deploy prep

### Task D1: Lint/tsc zero errors; kill remaining warnings if cheap

```powershell
npm run lint
npx tsc --noEmit
```

- [ ] **Step 1: Fix any new errors from Phases A–C.**

- [ ] **Step 2: Commit.**

---

### Task D2: README runbook

**Files:**
- Modify: `README.md`
- Modify: `docs/HOWTO-FIXES.md` (link to this plan)

Sections to include:

1. `npm install` / `npm run dev`
2. AI `.env.local`
3. `node scripts/list-vehicle-images.mjs` + `download-vehicle-images.mjs`
4. Quiz at `/quiz`
5. Deploy Vercel: set `AI_ENDPOINT`, `AI_API_KEY`, `AI_MODEL`; no auth
6. Note: Prisma optional

- [ ] **Step 1: Write sections.**

- [ ] **Step 2: Commit.**

---

### Task D3: Production smoke checklist (manual)

- [ ] Home → dashboard loads
- [ ] /vehicles shows images
- [ ] /ai-assistant streams (with env)
- [ ] /quiz scores
- [ ] /calculators tire+wheel
- [ ] /glossary search
- [ ] /bookmarks /history
- [ ] Mobile width sidebar works

Mark results in plan or `docs/superpowers/plans/SMOKE-RESULTS.md`.

---

### Task D4: Vercel deploy notes (no auth)

- [ ] Document: connect GitHub repo OR `npx vercel`
- [ ] Env vars in Vercel dashboard
- [ ] If AI endpoint is localhost 9router — **won't work on Vercel**; must use public HTTPS OpenAI-compatible URL for production AI
- [ ] Personal option: keep AI local-only; deploy static learning without AI, or use cloud API key

**Locked decision for personal multi-device AI:** use a cloud OpenAI-compatible API key in Vercel env (not localhost).

---

## Phase E — Optional (do NOT start unless user asks)

1. Real file upload → extract text → chunk → embed → search (RAG)
2. Wire Prisma + Supabase Postgres as content CMS
3. Password protect entire Vercel deployment
4. Expand tire product images

---

## Self-review (plan author)

| Spec requirement | Task |
|------------------|------|
| Real images | A1–A4 |
| AI functional | B3 + existing proxy |
| Random questions | B1–B2, B4 |
| Catalog usable | C1–C4 |
| Multi-device / deploy | D2–D4 |
| No auth | Global constraints |
| Honest upload | Already done (HOWTO); no fake OCR in plan |
| Attribution | A2–A3 ATTRIBUTION.md |

**Placeholder scan:** No TBD steps; image URLs filled during A3 research (fallback guaranteed).  
**Type consistency:** `QuizQuestion`, `QuizStats`, `SafeImage` props defined above.

---

## Execution handoff

**Plan complete and saved to:**

`docs/superpowers/plans/2026-07-21-full-product-completion.md`

**Spec:**

`docs/superpowers/specs/2026-07-21-full-product-design.md`

### Two execution options

**1. Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  

**2. Inline Execution** — same session, `executing-plans`, batch with checkpoints  

### New session prompt (copy-paste)

```
Lanjut Wheelpedia full product plan.
Repo: C:\Projects\wheelpedia-indonesia
Baca dulu:
- docs/superpowers/plans/2026-07-21-full-product-completion.md
- docs/superpowers/specs/2026-07-21-full-product-design.md
- docs/HOWTO-FIXES.md
Mulai dari Task A1. Centang step selesai di plan file. Jangan auth.
```

**Which approach for execution?** (1 / 2 / later)
