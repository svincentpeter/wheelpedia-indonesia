import assert from "node:assert/strict";

// Pure logic mirrored for no-tsx selfcheck (keep in sync with src/lib/omahban-map.ts)
function mapLike(raw) {
  const productName = String(raw.product_name ?? "").trim();
  if (!productName) return null;
  const sizeRaw = raw.product_size ? String(raw.product_size).trim() : "";
  const rim = raw.ring != null ? Number(raw.ring) : 0;
  const sizeNormalized =
    sizeRaw && rim
      ? /^\d{3}\/\d{2}$/.test(sizeRaw.replace(/\s+/g, ""))
        ? `${sizeRaw.replace(/\s+/g, "")} R${rim}`
        : `${sizeRaw} R${rim}`
      : "";
  return {
    id: `live-${raw.id}`,
    brand: raw.brand?.name || "Unknown",
    productName,
    sizeRaw,
    rim: rim || 0,
    sizeNormalized,
    sellPrice: Number(raw.product_price) || 0,
    qty: Number(raw.product_quantity) || 0,
    sheet: "POS live",
  };
}

const sample = mapLike({
  id: 1,
  product_name: "Bs Ecopia",
  product_size: "175/65",
  ring: 14,
  product_price: 685000,
  product_quantity: 2,
  product_cost: 999999,
  brand: { name: "Bridgestone" },
});

assert.ok(sample);
assert.equal(sample.sizeNormalized, "175/65 R14");
assert.equal(sample.sellPrice, 685000);
assert.equal(sample.qty, 2);
assert.ok(!("product_cost" in sample));
assert.ok(!("costPrice" in sample));
assert.equal(mapLike({ product_name: "" }), null);

console.log("selfcheck-omahban-map OK");
