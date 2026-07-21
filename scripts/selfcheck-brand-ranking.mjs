import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src", "lib", "brand-ranking.ts"), "utf8");

const brands = [...src.matchAll(/brand:\s*"([^"]+)"/g)].map((m) => m[1]);
assert.ok(brands.length >= 8, `need ≥8 brands, got ${brands.length}`);

const tiers = [...src.matchAll(/tier:\s*"(budget|mid|premium)"/g)].map((m) => m[1]);
assert.ok(tiers.includes("budget") && tiers.includes("mid") && tiers.includes("premium"));

assert.ok(src.includes("getRanksByTier"));
assert.ok(src.includes("export type RankTier"));

console.log("selfcheck-brand-ranking OK", { brands: brands.length, sample: brands.slice(0, 3) });
