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

## Future (optional): live API

ProjectOmahBan already has `GET /api/products` (Sanctum). Phase 2 may add a server-only proxy with `OMAHBAN_API_URL` + `OMAHBAN_API_TOKEN`. Not implemented in v1.

## Selfcheck

```powershell
node scripts/selfcheck-shop-stock.mjs
```
