# OmahBan Counter Kit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Wheelpedia into a mobile+desktop **counter assistant** for OmahBan staff: vehicle fitment → shop stock matches → brand ranking → AI customer script — without rebuilding the Laravel POS.

**Architecture:** Keep ProjectOmahBan as source of truth for inventory/sales. Wheelpedia holds education + fitment + a **read-only stock snapshot** (`shop-stock.json`) produced by an import script compatible with `STOCK JULI 2026.xlsx` / POS ETL. Counter UI is a dedicated `/counter` flow; AI system prompt is OmahBan-staff oriented and injects stock summary.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind 4, existing `/api/chat` proxy; Python optional for import (openpyxl) or Node openpyxl alternative via converting to JSON offline.

## Global Constraints

- Devices: **HP + laptop** — mobile-first CSS (min touch 44px, no hover-only actions).
- **No POS** in this repo: no cart, checkout, stock decrement, nota.
- **No modal/cost** in client-visible JSON by default.
- No auth v1 (personal/staff devices); Phase 2 may use Sanctum from ProjectOmahBan.
- Indonesian UI copy, toko language.
- Repo root: `C:\Projects\wheelpedia-indonesia`
- Spec: `docs/superpowers/specs/2026-07-21-omahban-counter-kit-design.md`
- POS reference clone (read-only): `C:\Users\cthrn\AppData\Local\Temp\opencode\ProjectOmahBan` (Laravel 12; `scripts/etl_stock_juli_2026.py`; API `GET /api/products` Sanctum).
- Stock Excel sample: `C:\Users\cthrn\Downloads\STOCK JULI 2026.xlsx`
- After each task: `npm run lint` (0 errors), `npx tsc --noEmit` (0).

## Handoff for NEW SESSION

```
Wheelpedia = counter learning kit for OmahBan staff
POS = github.com/svincentpeter/ProjectOmahBan (Laravel) — do not duplicate
User: staff, awam ban/velg, needs customer answers + stock awareness
Devices: phone + laptop
Start Task 1 of this plan
```

## File map

| Path | Responsibility |
|------|----------------|
| `scripts/import-shop-stock.mjs` | Excel → `src/data/shop-stock.json` |
| `src/data/shop-stock.json` | Public sell price + qty snapshot |
| `src/lib/shop-stock.ts` | Types, normalize size, search, match vehicle |
| `src/lib/brand-ranking.ts` | Budget/mid/premium ranking for counter |
| `src/app/counter/page.tsx` | Counter flow page |
| `src/components/CounterView.tsx` | Mobile-first counter UI |
| `src/components/ShopStockView.tsx` | Browse stock filters |
| `src/app/stok/page.tsx` | Stock browse route |
| `src/lib/catalog-context.ts` | Append stock summary for AI |
| `src/lib/ai.ts` | SYSTEM_PROMPT OmahBan counter |
| `src/components/layout/Sidebar.tsx` | Nav: Counter, Stok |
| `docs/OMAHBAN-INTEGRATION.md` | How POS vs Wheelpedia + refresh stock |

---

### Task 1: Shop stock types + pure match helpers (TDD via Node assert)

**Files:**
- Create: `src/lib/shop-stock.ts`
- Create: `scripts/selfcheck-shop-stock.mjs`
- Create: `src/data/shop-stock.json` (minimal fixture 3 rows first)

**Interfaces:**
- Produces:
  - `export type ShopStockItem = { id: string; brand: string; productName: string; sizeRaw: string; rim: number; sizeNormalized: string; sellPrice: number; qty: number; sheet: string; yearHint?: string }`
  - `normalizeTireSize(sizeRaw: string, rim: number): string`
  - `matchStockForOem(oemTire: string, items: ShopStockItem[], opts?: { inStockOnly?: boolean }): ShopStockItem[]`
  - `searchStock(query: string, items: ShopStockItem[]): ShopStockItem[]`
  - `loadShopStock(): ShopStockItem[]` imports JSON

- [ ] **Step 1: Write selfcheck that fails before implementation**

```js
// scripts/selfcheck-shop-stock.mjs
import assert from "node:assert/strict";
// Will import from built logic — for TS without tsx, duplicate pure functions in .mjs
// OR use node --experimental-strip-types if available.
```

**Locked approach:** implement pure functions in `scripts/lib/shop-stock-core.mjs` and re-export/wrap from `src/lib/shop-stock.ts` that imports JSON — **OR** keep all pure logic in `src/lib/shop-stock.ts` and selfcheck only JSON schema + a small duplicated normalize in mjs.

**Preferred (one source):** `src/lib/shop-stock.ts` only; selfcheck:

```powershell
node -e "const j=require('./src/data/shop-stock.json'); assert(Array.isArray(j)&&j.length>=1); assert(!('costPrice' in j[0])); console.log('ok', j.length)"
```

Plus unit-like checks by exporting normalize in a `.mjs` copy generated — **simplest path for this codebase:** put normalize + match in `src/lib/shop-stock.ts` and test match with a tiny `scripts/selfcheck-shop-stock.mjs` that **duplicates** normalize formula (document “keep in sync”) OR use:

```powershell
npx --yes tsx scripts/selfcheck-shop-stock.ts
```

if network allows. Prefer **no new dep**: pure mjs core.

- [ ] **Step 2: Create `scripts/lib/tire-size.mjs`**

```js
export function normalizeTireSize(sizeRaw, rim) {
  if (sizeRaw == null || rim == null || Number.isNaN(Number(rim))) return "";
  const s = String(sizeRaw).trim().replace(/\s+/g, "");
  const rimN = Number(rim);
  // "175/65" + 14 → "175/65 R14"
  if (/^\d{3}\/\d{2}$/.test(s)) return `${s} R${rimN}`;
  // "175" + 13 → "175 R13" (commercial/bias style in sheet)
  if (/^\d{3}$/.test(s) || /^\d{2,3}$/.test(s)) return `${s} R${rimN}`;
  // already full
  if (/R\d{2}$/i.test(s)) return s.replace(/r/i, " R").replace(/\s+/g, " ").toUpperCase().replace(" R", " R");
  return `${s} R${rimN}`;
}

export function sizesLooselyEqual(a, b) {
  const na = a.toUpperCase().replace(/\s+/g, "");
  const nb = b.toUpperCase().replace(/\s+/g, "");
  return na === nb || na.includes(nb) || nb.includes(na);
}
```

- [ ] **Step 3: Selfcheck normalize**

```js
// scripts/selfcheck-shop-stock.mjs
import assert from "node:assert/strict";
import { normalizeTireSize, sizesLooselyEqual } from "./lib/tire-size.mjs";
assert.equal(normalizeTireSize("175/65", 14), "175/65 R14");
assert.equal(normalizeTireSize("175", 13), "175 R13");
assert.ok(sizesLooselyEqual("185/65 R15", "185/65R15"));
console.log("selfcheck-shop-stock OK");
```

Run: `node scripts/selfcheck-shop-stock.mjs` → PASS

- [ ] **Step 4: Implement `src/lib/shop-stock.ts`** importing JSON + reusing same rules (copy normalize functions into TS identically).

```ts
import stock from "@/data/shop-stock.json";
import type { ShopStockItem } from "./shop-stock-types"; // or inline type

export function normalizeTireSize(sizeRaw: string, rim: number): string { /* same as mjs */ }

export function matchStockForOem(
  oemTire: string,
  items: ShopStockItem[] = stock as ShopStockItem[],
  opts: { inStockOnly?: boolean } = { inStockOnly: true },
): ShopStockItem[] {
  const target = oemTire.toUpperCase().replace(/\s+/g, "");
  return items.filter((it) => {
    if (opts.inStockOnly && it.qty <= 0) return false;
    const n = it.sizeNormalized.toUpperCase().replace(/\s+/g, "");
    return n === target || n.includes(target) || target.includes(n);
  });
}

export function getShopStock(): ShopStockItem[] {
  return stock as ShopStockItem[];
}
```

- [ ] **Step 5: Fixture JSON** `src/data/shop-stock.json`:

```json
[
  {
    "id": "fixture-1",
    "brand": "Bridgestone",
    "productName": "Bs Ecopia",
    "sizeRaw": "175/65",
    "rim": 14,
    "sizeNormalized": "175/65 R14",
    "sellPrice": 685000,
    "qty": 2,
    "sheet": "Bridgestone"
  }
]
```

- [ ] **Step 6: Commit**

```powershell
git add scripts/lib/tire-size.mjs scripts/selfcheck-shop-stock.mjs src/lib/shop-stock.ts src/data/shop-stock.json
git commit -m "feat: shop stock types and tire size matching"
```

---

### Task 2: Excel import script → full shop-stock.json

**Files:**
- Create: `scripts/import-shop-stock.mjs`
- Modify: `src/data/shop-stock.json` (generated)
- Create: `docs/OMAHBAN-INTEGRATION.md` (start section “Refresh stock”)

**Interfaces:**
- CLI: `node scripts/import-shop-stock.mjs "C:\Users\cthrn\Downloads\STOCK JULI 2026.xlsx"`
- Produces: overwrites `src/data/shop-stock.json` with rows; strips cost
- Reuse sheet list: Bridgestone, Dunlop, GT ( Gajah Tunggal ), Acellera, Delium, Campur, Truck Diesel, Ban Dalam
- Columns: Merk Ban, Ukuran, Ring, Harga Jual, Sisa (fallback Stock)

- [ ] **Step 1: Implement import using ExcelJS or python openpyxl**

**Locked:** Python already available with openpyxl on user machine:

```python
# scripts/import_shop_stock.py
# Read excel, emit src/data/shop-stock.json
# Fields only: id, brand, productName, sizeRaw, rim, sizeNormalized, sellPrice, qty, sheet, yearHint?
# Skip rows without productName and size
# brand from sheet map like POS etl
```

Also add npm script: `"import-stock": "python scripts/import_shop_stock.py"`

- [ ] **Step 2: Run import on real file**

```powershell
python scripts/import_shop_stock.py "C:\Users\cthrn\Downloads\STOCK JULI 2026.xlsx"
node -e "const j=require('./src/data/shop-stock.json'); console.log(j.length); console.log(j[0]);"
```

Expected: hundreds of rows; no `costPrice` / `modal` keys.

- [ ] **Step 3: Document in `docs/OMAHBAN-INTEGRATION.md`**

Explain: POS = transaksi; Wheelpedia = snapshot; refresh command; do not commit secrets.

- [ ] **Step 4: Commit JSON + script** (if JSON large, still OK for personal)

```powershell
git add scripts/import_shop_stock.py src/data/shop-stock.json docs/OMAHBAN-INTEGRATION.md package.json
git commit -m "feat: import OmahBan stock excel to shop-stock snapshot"
```

---

### Task 3: Brand ranking for counter language

**Files:**
- Create: `src/lib/brand-ranking.ts`
- Optionally extend `src/data/brands.ts` — prefer separate ranking file to avoid breaking Brand type

**Interfaces:**
- `export type RankTier = "budget" | "mid" | "premium"`
- `export type BrandRank = { brand: string; tier: RankTier; oneLiner: string; bestFor: string }`
- `export const BRAND_RANKS: BrandRank[]` covering Bridgestone, Dunlop, GT, Accelera, Delium, Hankook, Goodyear, Achilles, Sailun, Swallow
- `getRanksByTier(): Record<RankTier, BrandRank[]>`

- [ ] **Step 1: Author ranking copy in Indonesian toko style** (honest, short).

- [ ] **Step 2: Export helpers.**

- [ ] **Step 3: Selfcheck length ≥ 8 brands.**

- [ ] **Step 4: Commit**

```powershell
git commit -am "feat: counter brand ranking copy"
```

---

### Task 4: CounterView + `/counter` page (mobile-first)

**Files:**
- Create: `src/components/CounterView.tsx`
- Create: `src/app/counter/page.tsx`
- Modify: `src/components/layout/Sidebar.tsx` — item “Counter” top of Main Menu
- Modify: `src/app/page.tsx` or dashboard CTA → `/counter`

**Interfaces:**
- CounterView state: search string, selected vehicle id
- Uses `VEHICLES` from `@/data/vehicles`, `matchStockForOem`, `BRAND_RANKS`
- Button navigates to `/ai-assistant?prompt=...` with encoded Indonesian brief

**UI requirements:**
- Search input full width, text-base (16px) to avoid iOS zoom
- Vehicle results: large tap rows
- Selected: sections OEM | Stok OmahBan | Rekomendasi merk
- Stock row: productName, sizeNormalized, sellPrice formatted `Rp x.xxx`, qty
- Empty stock: “Belum ada di snapshot stok — cek rak / refresh import”

- [ ] **Step 1: Implement CounterView** (client component).

- [ ] **Step 2: Page wrapper AppShell dynamic ssr:false (match existing).**

- [ ] **Step 3: Sidebar + dashboard link.**

- [ ] **Step 4: Manual test** `npm run dev` → phone width DevTools → Jazz search → stock for OEM size.

- [ ] **Step 5: Commit**

```powershell
git commit -am "feat: OmahBan counter flow page"
```

---

### Task 5: Stok browse page `/stok`

**Files:**
- Create: `src/components/ShopStockView.tsx`
- Create: `src/app/stok/page.tsx`
- Modify: Sidebar

**Interfaces:**
- Filters: query, brand select, rim select, inStockOnly checkbox
- List from `getShopStock()`

- [ ] **Step 1: Implement filters + list.**

- [ ] **Step 2: Wire route + nav.**

- [ ] **Step 3: Lint/tsc.**

- [ ] **Step 4: Commit**

```powershell
git commit -am "feat: shop stock browse page"
```

---

### Task 6: AI system prompt + catalog stock injection

**Files:**
- Modify: `src/lib/ai.ts` — SYSTEM_PROMPT
- Modify: `src/lib/catalog-context.ts` — append top stock summary (cap size)
- Modify: `src/app/api/chat/route.ts` if needed (already injects catalog)

**Interfaces:**
- SYSTEM_PROMPT must state: role = asisten karyawan OmahBan; bahasa awam; jangan sebut modal; stok hanya dari data yang diberikan; jika qty 0 bilang kosong; sarankan cek rak fisik.

- [ ] **Step 1: Rewrite SYSTEM_PROMPT** (Indonesian).

- [ ] **Step 2: `buildCatalogContext`** add section:

```
## Stok OmahBan (snapshot, qty & harga jual)
- Bridgestone Bs Ecopia 175/65 R14 | Rp 685000 | sisa 2
...
```

Limit ~80 lines; prefer qty>0; group by size if needed.

- [ ] **Step 3: Manual AI test** with `.env.local` + 9router: “Ban Jazz GK yang ada di stok?”

- [ ] **Step 4: Commit**

```powershell
git commit -am "feat: OmahBan counter AI prompt and stock context"
```

---

### Task 7: Vehicle detail “Siap di OmahBan” strip

**Files:**
- Modify: `src/components/VehicleDatabaseView.tsx` detail panel
- Optional: `src/app/vehicles/[id]/page.tsx`

**Interfaces:**
- When vehicle selected, call `matchStockForOem(vehicle.oemTire)` and also try `compatibleTires`
- Show compact list + link to `/stok?q=`

- [ ] **Step 1: Add section under OEM specs.**

- [ ] **Step 2: Manual verify Avanza OEM size hits stock.**

- [ ] **Step 3: Commit**

```powershell
git commit -am "feat: show matching shop stock on vehicle detail"
```

---

### Task 8: Integration docs + README pointer

**Files:**
- Finish: `docs/OMAHBAN-INTEGRATION.md`
- Modify: `README.md` — OmahBan section

**Content must include:**
1. Two-app diagram (POS vs Wheelpedia)
2. Refresh stock command
3. Future Sanctum live API outline (do not implement unless Task 9)
4. Never put POS `.env` secrets into Wheelpedia

- [ ] **Step 1: Write docs.**

- [ ] **Step 2: Commit**

```powershell
git commit -am "docs: OmahBan POS vs Wheelpedia integration"
```

---

### Task 9 (Optional later): Live stock from ProjectOmahBan API

**Only if user asks.**

**Files:**
- Create: `src/app/api/omahban-products/route.ts` server proxy
- Env: `OMAHBAN_API_URL`, `OMAHBAN_API_TOKEN` (Sanctum)

**Interfaces:**
- Server fetches `GET {OMAHBAN_API_URL}/api/products` with Bearer token
- Maps to `ShopStockItem[]`
- Fallback to JSON snapshot if API down

- [ ] **Step 1: Spec token storage server-only.**

- [ ] **Step 2: Implement proxy + feature flag `STOCK_SOURCE=snapshot|live`.**

- [ ] **Step 3: Test against local Laravel.**

---

## Self-review

| Spec requirement | Task |
|------------------|------|
| Counter flow mobil→stok→merk | 4, 3, 1 |
| Brand ranking | 3 |
| Stock from Excel snapshot | 2 |
| No POS duplication | Global + docs Task 8 |
| No modal in client | Task 2 strip cost |
| AI OmahBan role | 6 |
| HP + laptop | Task 4 mobile-first |
| Vehicle page stock | 7 |
| Optional live API | 9 |

**Placeholder scan:** no TBD.  
**Type consistency:** `ShopStockItem` single definition in Task 1.

---

## Execution handoff

**Plan complete and saved to:**

`docs/superpowers/plans/2026-07-21-omahban-counter-kit.md`

**Spec:**

`docs/superpowers/specs/2026-07-21-omahban-counter-kit-design.md`

### Two execution options

**1. Subagent-Driven (recommended)** — fresh subagent per task  

**2. Inline Execution** — this session, `executing-plans`

### New session prompt

```
Lanjut OmahBan Counter Kit.
Repo: C:\Projects\wheelpedia-indonesia
Baca:
- docs/superpowers/plans/2026-07-21-omahban-counter-kit.md
- docs/superpowers/specs/2026-07-21-omahban-counter-kit-design.md
POS ref: ProjectOmahBan (Laravel) — jangan rebuild POS
Mulai Task 1. HP+laptop. Snapshot stok dulu.
```

**Which approach?** (1 / 2)
