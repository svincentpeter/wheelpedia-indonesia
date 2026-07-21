# Wheelpedia Indonesia — Full Product Design (Personal Learning)

**Date:** 2026-07-21  
**Owner use-case:** Single user, multi-device learning about Indonesian tires/wheels. **No auth.**  
**Repo:** `C:\Projects\wheelpedia-indonesia`

## Goals

1. Every major surface works end-to-end (AI, catalog, quiz, calculators, vehicles/tires/wheels/brands/learning/glossary).
2. Real local images for vehicles (and where practical brands/tires), stored under `public/`.
3. AI chat usable with server env + optional BYOK; catalog-aware answers.
4. Random questions / quiz that score and feel complete.
5. Honest UX (no fake OCR/RAG until implemented).
6. Deployable to Vercel for multi-device access without login.

## Non-goals (v1 personal)

- Multi-user auth, billing, e-commerce
- Real OCR pipeline / pgvector RAG (document as Phase 5 optional)
- Native mobile app
- Perfect legal clearance of every image (prefer Wikimedia/Unsplash/Pexels free licenses; keep attribution file)

## Current baseline (as of 2026-07-21)

| Area | Status |
|------|--------|
| Next 16 + React 19 + Tailwind 4 | Installed |
| Static data | ~50 vehicles, 34 tire products, 22 brands, 65 glossary, 16 learning ids |
| AI | Server proxy `POST /api/chat`, no hardcoded client keys |
| Images | Paths like `/vehicles/avanza-gen1.jpg` but **files missing** in `public/` |
| Admin | Dev localStorage overlay, no auth (OK for personal) |
| Catalog upload | Metadata-only (honest) |
| Prisma/Supabase | Scaffold only; app uses `src/data/*` |

## Architecture (keep)

```
Browser (client components)
  → static imports from src/data/*
  → POST /api/chat → AI_ENDPOINT + AI_API_KEY (env) or BYOK
  → public/* images
```

**Source of truth for content:** TypeScript files under `src/data/`.  
**Source of truth for media:** `public/vehicles/`, `public/brands/`, `public/tires/`.  
Do **not** wire Prisma until Phase 5 optional.

## Success criteria

- [ ] `npm run lint` = 0 errors; `npx tsc --noEmit` = 0
- [ ] Every vehicle image path resolves to a real file (or intentional SVG placeholder)
- [ ] AI chat streams when `.env.local` has valid key + endpoint up
- [ ] Random question / quiz records score in localStorage
- [ ] Dashboard, vehicles, tires, wheels, brands, learning, glossary, calculators, comparison, AI all usable
- [ ] README + HOWTO describe run + image pipeline + AI setup
- [ ] Plan phases A–D done; Phase E optional

## Phases (execution order)

| Phase | Name | Outcome |
|-------|------|---------|
| A | Real images | Local JPGs for all vehicles; UI uses `next/image` |
| B | AI + Random Q | Chat solid; random quiz bank + scoring |
| C | Catalog & data polish | Consistent data, comparison, empty states, history/bookmarks |
| D | UX polish + deploy prep | Lint clean, env docs, Vercel notes |
| E | Optional later | Real RAG upload, Prisma, auth if needed |

## Image policy

1. Prefer free licenses: Wikimedia Commons, Unsplash, Pexels.
2. Download into `public/vehicles/{id}.jpg` matching `Vehicle.id`.
3. Maintain `public/ATTRIBUTION.md` with source URL per file.
4. If no free photo found for a model: use brand-neutral placeholder SVG generated once, still under that path.
5. Never commit secrets; never scrape paywalled OEM assets with broken ToS if avoidable — use free stock of same model generation when possible.

## AI policy

- Keep server proxy; inject compact catalog context (already started in `catalog-context.ts`).
- Random questions: static bank in `src/data/quiz.ts` + optional AI-generated daily set stored localStorage.
- No auth; rate limit soft (optional max messages/session in client) for personal deploy.

## Constraints

- No auth unless user revisits requirement
- Prefer stdlib / existing deps; avoid new deps unless necessary (`sharp` already via Next)
- Indonesian UI copy where user-facing
- Windows PowerShell environment
