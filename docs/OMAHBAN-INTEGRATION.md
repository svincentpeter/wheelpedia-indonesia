# OmahBan × Wheelpedia Integration

## Two apps, one job

| System | Owns | Does **not** own |
|--------|------|------------------|
| **ProjectOmahBan** (Laravel POS) | Live stock, cost/modal, sales, purchases, nota, multi-cabang | Fitment education, quiz, counter AI script |
| **Wheelpedia** (this repo) | Vehicle fitment, learning, brand ranking copy, AI counter, **read-only stock snapshot** | Checkout, stock edit, print nota |

**Do not rebuild POS inside Wheelpedia.**

```
Excel / POS ETL
      ↓  python scripts/import_shop_stock.py
src/data/shop-stock.json   (sellPrice + qty only)
      ↓
/counter  /stok  AI catalog context
```

## Refresh stock snapshot

Source Excel (same family as POS `scripts/etl_stock_juli_2026.py`):

```powershell
cd C:\Projects\wheelpedia-indonesia
python scripts/import_shop_stock.py "C:\Users\cthrn\Downloads\STOCK JULI 2026.xlsx"
# or
npm run import-stock -- "C:\Users\cthrn\Downloads\STOCK JULI 2026.xlsx"
```

Then verify:

```powershell
node scripts/selfcheck-shop-stock.mjs
node -e "const j=require('./src/data/shop-stock.json'); console.log(j.length, Object.keys(j[0]));"
```

**Rules**

- Client JSON must **not** contain `costPrice` / `modal`.
- Snapshot can lag real shelves — staff should still cek rak fisik.
- Never put POS `.env` secrets into Wheelpedia.

## Counter Kit routes (Wheelpedia)

| Route | Purpose |
|-------|---------|
| `/counter` | Mobile-first: cari mobil → OEM → stok cocok → ranking merk → AI script |
| `/stok` | Browse snapshot (filter brand/ring/query) |
| `/ai-assistant` | System prompt asisten karyawan OmahBan + stock context |

Vehicle detail (`/vehicles`) also shows **Siap di OmahBan** strip from the same snapshot.

## Live stock API (optional)

ProjectOmahBan: `GET /api/products` (Sanctum). Wheelpedia proxies **server-side only**.

| Env | Role |
|-----|------|
| `STOCK_SOURCE` | `snapshot` (default) or `live` |
| `OMAHBAN_API_URL` | POS base URL, e.g. `http://127.0.0.1:8000` |
| `OMAHBAN_API_TOKEN` | Sanctum personal access token (Bearer) |

```powershell
# .env.local (never commit)
STOCK_SOURCE=live
OMAHBAN_API_URL=http://127.0.0.1:8000
OMAHBAN_API_TOKEN=your-sanctum-token
```

Wheelpedia endpoint:

```
GET /api/omahban-products
→ { success, source: "live"|"snapshot", count, items: ShopStockItem[], warning? }
```

- Token never sent to browser.
- Response strips cost/modal/hpp.
- Live fail / empty → fallback `src/data/shop-stock.json`.
- `/counter`, `/stok`, vehicle strip, AI catalog all use this resolver.

Do not put POS DB credentials into Wheelpedia.

## Selfcheck

```powershell
node scripts/selfcheck-shop-stock.mjs
node scripts/selfcheck-brand-ranking.mjs
```
