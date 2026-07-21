import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeTireSize, sizesLooselyEqual } from "./lib/tire-size.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const stockPath = join(root, "src", "data", "shop-stock.json");
const stock = JSON.parse(readFileSync(stockPath, "utf8"));

assert.equal(normalizeTireSize("175/65", 14), "175/65 R14");
assert.equal(normalizeTireSize("175", 13), "175 R13");
assert.ok(sizesLooselyEqual("185/65 R15", "185/65R15"));
assert.equal(normalizeTireSize("185/65R15", 15), "185/65 R15");
assert.equal(normalizeTireSize(null, 14), "");
assert.equal(normalizeTireSize("175/65", NaN), "");

assert.ok(Array.isArray(stock), "shop-stock.json must be array");
assert.ok(stock.length >= 1, "shop-stock.json needs ≥1 row");
for (const row of stock) {
  assert.ok(row.id, "row needs id");
  assert.ok(row.brand, "row needs brand");
  assert.ok(row.productName, "row needs productName");
  assert.ok(typeof row.rim === "number", "row needs numeric rim");
  assert.ok(row.sizeNormalized, "row needs sizeNormalized");
  assert.ok(typeof row.sellPrice === "number", "row needs sellPrice");
  assert.ok(typeof row.qty === "number", "row needs qty");
  assert.ok(!("costPrice" in row), "costPrice must not ship to client");
  assert.ok(!("modal" in row), "modal must not ship to client");
}

// match logic (mirrors src/lib/shop-stock.ts)
function matchStockForOem(oemTire, items, opts = { inStockOnly: true }) {
  const target = oemTire.toUpperCase().replace(/\s+/g, "");
  return items.filter((it) => {
    if (opts.inStockOnly && it.qty <= 0) return false;
    const n = it.sizeNormalized.toUpperCase().replace(/\s+/g, "");
    return n === target || n.includes(target) || target.includes(n);
  });
}

const hits = matchStockForOem("175/65 R14", stock, { inStockOnly: true });
assert.ok(hits.length >= 1, "fixture must match 175/65 R14 in stock");
assert.ok(hits.every((h) => h.qty > 0));

const zeroHits = matchStockForOem("999/99 R99", stock);
assert.equal(zeroHits.length, 0);

console.log("selfcheck-shop-stock OK", { rows: stock.length, sampleMatch: hits.length });
