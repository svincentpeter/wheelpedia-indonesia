# Prompt siap-paste → Google AI Studio

Salin **seluruh blok di bawah** (mulai dari “=== START PROMPT ===” sampai “=== END PROMPT ===”) ke AI Studio.  
Mode disarankan: model multimodal / image-capable jika tersedia; minta gambar + teks.

---

=== START PROMPT ===

# ROLE
You are a senior product designer + UX researcher specializing in:
- Indonesian retail / family-owned shops (toko keluarga)
- Tools used by non-technical staff on phone + laptop at a physical counter
- Clear information hierarchy under time pressure (customer is waiting)
- Warm, trustworthy local product design (NOT cold Silicon Valley SaaS, NOT gaming neon, NOT enterprise ERP chrome)

You design for **Wheelpedia Indonesia** — a learning + counter assistant for **OmahBan** tire & wheel shop staff.

Work in **Bahasa Indonesia** for all UI labels, microcopy, empty states, and error text.  
You may explain design rationale in Indonesian or bilingual (ID primary).

---

# PRODUCT (WHAT IT IS / IS NOT)

## What Wheelpedia IS
- Counter assistant: search vehicle → show OEM tire/wheel specs (PCD, CB, ET, pressure) → show matching shop stock (sell price + qty) → simple brand ranking (budget / mid / premium) → AI helps staff explain to customers in plain language
- Learning tool: quiz, glossary, brand library, tire/wheel education
- Read-only stock awareness: snapshot or live **read-only** feed from POS (display only)
- Devices: **HP first** (thumb, ~375px width) AND laptop/desktop

## What Wheelpedia is NOT (hard boundary — never design these)
- NOT a POS / kasir
- NO shopping cart, checkout, payment, print nota, stock edit, purchase orders, debt ledger
- NEVER show modal / HPP / cost / margin in any UI
- Do NOT look like “another cash register app” competing with ProjectOmahBan (Laravel POS)

Visual and IA must constantly signal: **“bantu jelasin ke customer & belajar”**, not **“input transaksi”**.

---

# PRIMARY USERS & JOBS

## User
- Karyawan toko keluarga OmahBan (ban & velg)
- Often **awam teknis** (PCD/ET still confusing)
- Works while customer stands at the counter
- Uses **phone in hand** more than mouse

## Jobs to be done (priority order)
1. **P0 Counter:** In <30s find car model → OEM size → what we have in stock with price/qty → 2–3 brand options in plain language → optional AI script for customer talk
2. **P0 Stock browse:** Filter brand / rim / text / in-stock only; honest empty states
3. **P1 Learn:** Quiz, glossary, learning modules linked back to sizes/brands sold
4. **P1 AI chat:** Staff-oriented assistant; never invent stock qty; never mention cost
5. **P2** Vehicle database, brand library, calculators, bookmarks/history

## Success metrics for your designs
- Counter path scannable at arm’s length on a phone
- Touch targets ≥ 44×44 px; search input text ≥ 16px (no iOS zoom trap)
- Staff can answer “ukuran Jazz?” without opening POS
- Zero accidental “kasir” patterns (no floating cart, no “Bayar”, no barcode checkout chrome)

---

# VISUAL DIRECTION (LOCKED MOOD)

**Mood: “Ramah toko keluarga”**

- Warm, approachable, local Indonesian shop energy
- Feels like a helpful notebook / assistant for staff — not a bank app, not a dark garage tuner theme, not generic purple AI SaaS
- High readability under shop fluorescent light
- Friendly but professional (customer can glance at the phone and still trust the shop)
- Indonesian typography friendly (no ultra-thin fonts; good letter-spacing for Latin)

### Palette intent (you may refine, keep spirit)
- Base: warm off-white / soft cream paper backgrounds (light mode primary for counter)
- Accent: trustworthy blue OR warm teal-blue (not neon)
- Success stock: calm green; out-of-stock: neutral gray (not aggressive red for every empty)
- Optional soft terracotta / warm accent for “OmahBan / Counter” identity chip
- Dark mode allowed as secondary, but **design light mode first** for counter use

### Avoid
- Heavy glassmorphism, 3D skeuomorphism, stock photo car wallpaper behind critical numbers
- Dense tables as the only mobile pattern
- Hover-only actions
- English-only UI

---

# SCREEN INVENTORY (MUST COVER ALL)

Design a coherent system across these screens (phone + desktop variants where layout differs):

1. **Home / Dashboard** — greeting staff, shortcut “Buka Counter”, quick stats optional, learning CTA (not vanity metrics)
2. **Counter (hero flow)** — search vehicle → list → detail: OEM card | Siap di OmahBan stock list | rekomendasi merk | CTA “Bantu jelaskan ke customer”
3. **Stok OmahBan** — filters (query, brand, rim, in-stock), list cards mobile / denser desktop
4. **AI Assistant** — chat UI for staff; show context chips (vehicle, stock source snapshot/live); safety notes
5. **Database Mobil** — search + detail with OEM specs + “Siap di OmahBan” strip
6. **Belajar + Quiz + Glossary** — approachable learning; link “lihat stok ukuran ini” where relevant
7. **Brand ranking / library** — budget/mid/premium in toko language
8. **Navigation shell** — sidebar desktop + bottom or drawer mobile; Counter & Stok near top of main menu
9. **Empty / error / offline / stock lag states** — honest copy: “Belum ada di snapshot — cek rak / refresh import”; live fail → fallback snapshot

Also produce **one system overview** (sitemap or app map) showing relationships.

---

# MULTI-MODE DELIVERABLES (DO ALL OF THESE IN ORDER)

## Mode 1 — Strategy (short)
- 5 design principles for this product
- Information architecture (nav groups)
- Primary user flow: Counter journey (step diagram in text or visual)

## Mode 2 — Wireframes (structure first)
Low/mid fidelity wireframes for:
- Counter (empty search, results, selected vehicle with stock)
- Stok browse
- Dashboard
- AI chat
- Mobile nav pattern

Annotate: hierarchy, thumb zones, what is primary CTA per screen.

## Mode 3 — High-fidelity visual UI
Polished mockups for the same screens in the **ramah toko keluarga** mood.
Show:
- Phone 375px
- Desktop ~1280px for shell + counter

Use realistic Indonesian sample content:
- Vehicles: Jazz, Avanza, Innova
- Stock rows: Bridgestone Bs Ecopia 175/65 R14 · Rp 685.000 · sisa 2; GT Champiro; Dunlop; “Habis” badge
- Brand tiers: Budget GT · Mid Dunlop · Premium Bridgestone
- Microcopy in Indonesian

## Mode 4 — Design system tokens
Deliver a compact design system:
- Color tokens (name + hex)
- Type scale (display, title, body, caption) with sizes
- Spacing scale (4/8 base)
- Radius, elevation/shadow rules
- Component inventory: SearchField, VehicleRow, SpecChip, StockCard, TierCard, PrimaryButton, Badge Habis/Sisa, NavItem, EmptyState, WarningBanner (snapshot lag / live fallback)
- Do / Don’t list (10 bullets)

## Mode 5 — UX evaluation & “best UI” decision
- Heuristic review of your own proposal (Nielsen-style, short)
- Accessibility notes (contrast, focus, touch)
- Compare **3 micro-variants** for the Counter selected state only (A/B/C layout of OEM vs stock vs brands) and **recommend one** with reasons
- Prioritized improvement backlog (P0/P1/P2) if this were to replace current blue SaaS-ish UI

## Mode 6 — Handoff notes for engineers (Next.js / React / Tailwind)
- Component tree suggestion matching screens
- What stays server-only (API tokens) vs client
- Explicit: stock is display-only; never design cost fields

---

# CONTENT & DATA RULES FOR MOCKS

Always show stock as:
`Brand · ProductName · sizeNormalized · Rp x.xxx · sisa N` or badge **Habis**

Never invent:
- Cost, modal, margin
- Fake “checkout success”
- Fake multi-branch cashier roles in v1

Stock source labels allowed:
- “Snapshot stok”
- “Live POS (baca saja)”
- Warning: “Gagal live — pakai snapshot”

AI panel rules in UI:
- Role chip: “Asisten karyawan OmahBan”
- Disclaimer small: “Stok dari data yang diberikan; cek rak fisik”

---

# QUALITY BAR (HOW YOU JUDGE “BEST”)

Score your final recommendation 1–5 on each; aim ≥4 average:
1. Speed-to-answer at counter  
2. Clarity for non-technical staff  
3. Mobile thumb ergonomics  
4. Trust / honesty (stock empty, lag)  
5. Distinct from POS kasir  
6. Warm local brand fit  
7. Consistency of system across screens  
8. Accessibility basics  

End with a **Final Recommendation** section: which overall direction wins and why (10–15 sentences max).

---

# OUTPUT FORMAT (STRICT)

Respond in this order, with clear markdown headings:

1. `## 1. Principles & IA`
2. `## 2. Wireframes` (describe + generate images if the model can; else detailed ASCII/layout blocks)
3. `## 3. High-fidelity UI` (images preferred)
4. `## 4. Design tokens & components`
5. `## 5. Evaluation, A/B/C counter layouts, backlog`
6. `## 6. Eng handoff`
7. `## 7. Final recommendation`

If image generation is limited, prioritize Counter + Stok + Dashboard + Mobile nav as images first, then describe the rest in precise layout specs (grid, spacing, type).

If you must shorten due to length limits: complete Modes 1–3 fully for Counter+Stok+Dashboard, then summarize remaining screens in a consistent component language.

---

# START NOW
Begin with Mode 1, then proceed through all modes without waiting for confirmation.  
Be concrete, visual, and opinionated. Prefer one strong system over many vague options — except the required A/B/C for Counter selected state.

=== END PROMPT ===

---

## Cara pakai di AI Studio (tips)

1. Paste prompt di atas sebagai **user message** utama.  
2. Jika model mendukung gambar: tambahkan di akhir “Generate images for each key screen.”  
3. Follow-up bagus setelah hasil pertama:
   - “Perbaiki Counter variant C jadi primary; naikkan kontras badge Habis.”
   - “Buat versi dark mode hanya untuk AI chat, counter tetap light.”
   - “Tambah state loading live POS 300ms skeleton.”
4. Untuk iterasi per layar, reply: “Deep-dive only Counter phone 375px, 3 more visual directions still within ramah toko keluarga.”

## Follow-up prompts (opsional, pendek)

**Polish Counter only**
```
Gunakan design system yang baru kamu usulkan. Fokus hanya layar Counter HP 375px:
state (1) search kosong (2) hasil Jazz (3) Jazz terpilih + stok + ranking + CTA AI.
Optimalkan zona ibu jari dan hierarki angka harga/qty. Output 3 mockup final.
```

**Audit vs POS**
```
Audit desainmu: tandai elemen yang masih terasa seperti aplikasi kasir/POS.
Ganti semuanya agar terasa asisten counter + belajar. Tunjukkan before/after list.
```

**Design tokens export**
```
Export token warna/type/spacing ke format yang mudah disalin ke Tailwind
(CSS variables + contoh className).
```
