# OmahBan Counter Kit — Design Spec

**Date:** 2026-07-21  
**Product:** Wheelpedia Indonesia (this repo) as **counter assistant + learning tool** for OmahBan staff  
**Related system:** [ProjectOmahBan](https://github.com/svincentpeter/ProjectOmahBan) — Laravel 12 multi-branch **POS + inventory** (source of truth for stock, sales, purchases)

## User & job

- **Who:** Karyawan toko keluarga OmahBan (jual beli ban & velg), masih awam teknis.
- **Devices:** HP **dan** laptop/tablet (responsive; HP first for thumb use at counter).
- **Job:** Jawab customer dengan yakin — ukuran ban/velg per mobil, urutan merk, keunggulan, opsi yang **ada di toko**.

## System boundary (non-negotiable)

| System | Owns | Does NOT own |
|--------|------|----------------|
| **ProjectOmahBan (POS)** | Stok live, harga jual/modal, transaksi, nota, multi-cabang, user/role | Edukasi fitment, quiz, AI script customer |
| **Wheelpedia (this app)** | Spec mobil Indonesia, learning, quiz, brand ranking copy, AI asisten counter, **read-only** stok snapshot for recommendation | Kasir, ubah stok, hutang, pembelian, print nota |

**Do not rebuild POS inside Wheelpedia.**  
If stock must be live later: **read-only API** from ProjectOmahBan (`GET /api/products` already exists behind Sanctum) — Phase 2.  
Phase 1: **snapshot JSON** from the same Excel/ETL family already in ProjectOmahBan (`scripts/etl_stock_juli_2026.py`).

## Goals (v1 Counter Kit)

1. **Counter flow (P0):** Cari mobil → kartu jawaban (OEM ban/velg, PCD/CB/ET) → stok OmahBan yang cocok (ukuran) → 2–3 alternatif merk dengan keunggulan sederhana.
2. **Brand ranking (P0):** Per kategori (budget / mid / premium) dalam bahasa toko, bukan brosur pabrik.
3. **AI counter (P1):** System prompt “asisten karyawan OmahBan”; jawab awam; sebut stok hanya dari data snapshot; jujur jika kosong.
4. **Learning (P1):** Quiz/glossary tetap; tautkan ke merk/ukuran yang sering dijual.
5. **Responsive (P0):** Layout usable on phone width (~375px) and desktop.

## Non-goals (v1)

- Checkout, cart, nota, print LX310
- Edit stok / modal di UI publik
- Multi-user auth (unless linking to POS Sanctum later)
- Replacing ProjectOmahBan

## Data sources

| Data | Source |
|------|--------|
| Vehicle fitment | `src/data/vehicles.ts` (Wheelpedia) |
| Brand profiles (marketing/education) | `src/data/brands.ts` + new ranking fields |
| Shop stock snapshot | Import from Excel **or** cleaned JSON from POS ETL shape |
| Live stock (later) | ProjectOmahBan `ProductApiController` + Sanctum |

### Stock row model (Phase 1)

```ts
type ShopStockItem = {
  id: string;
  brand: string;          // Bridgestone, Dunlop, GT, ...
  productName: string;    // Bs Ecopia, Dunlop LT5, ...
  sizeRaw: string;        // "175/65" or "175" or "750"
  rim: number;            // 14
  sizeNormalized: string; // "175/65 R14" when possible
  sellPrice: number;      // Harga Jual
  qty: number;            // Sisa (prefer) or Stock
  sheet: string;          // source sheet name
  yearHint?: string;      // from "(24)" in name if present
  // costPrice intentionally omitted from client bundle by default
};
```

**Modal/cost:** never ship to client by default. Import script may keep cost only in a gitignored file for internal tools.

## UX flows

### A. Counter (default home shortcut)

1. Search vehicle (brand/model) — large touch targets.
2. Vehicle card: OEM tire, OEM wheel, PCD, CB, ET, pressure, upgrade notes.
3. Section **“Siap di OmahBan”**: stock rows matching OEM size or compatible sizes; show sell price + qty; badge “Habis” if qty=0.
4. Section **“Rekomendasi merk”**: 3 tiers with one-line why.
5. Button **“Bantu jelaskan ke customer”** → AI with context (vehicle + stock hits).

### B. Stok browse

- Filter brand, rim, text search, “hanya ada stok”.
- Mobile: list cards; desktop: denser table optional.

### C. Belajar

- Existing learning/quiz; add link “lihat stok ukuran ini”.

## Architecture

```
Excel / POS ETL JSON
       ↓ (script import, manual refresh)
src/data/shop-stock.json  (public sell+qty only)
       ↓
src/lib/shop-stock.ts     (search, match size)
       ↓
/counter page + AI catalog-context includes stock summary
```

Optional Phase 2:

```
Wheelpedia server  --Sanctum token-->  ProjectOmahBan GET /api/products
```

## Success criteria

- [ ] From phone: find Jazz → see OEM size → see matching OmahBan SKUs with price/qty in < 30s
- [ ] AI mentions only stock present in snapshot; never invents qty
- [ ] No cost/modal in browser Network tab for normal pages
- [ ] Zero POS features duplicated (no sale create)
- [ ] Document how to refresh stock from Excel or POS export
- [ ] Works alongside ProjectOmahBan without sharing DB in v1

## Relationship to existing full-product plan

Continue images/quiz polish from `2026-07-21-full-product-completion.md` as needed.  
**This spec is the new product north star** for OmahBan staff use; prioritize Counter Kit over generic “catalog upload theater”.
