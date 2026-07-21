import { VEHICLES } from "@/data/vehicles";
import { TIRE_PRODUCTS } from "@/data/tires";
import { TIRE_BRANDS, WHEEL_BRANDS } from "@/data/brands";
import { getShopStock } from "@/lib/shop-stock";
import { BRAND_RANKS } from "@/lib/brand-ranking";

const STOCK_CONTEXT_CAP = 80;

function buildStockSummary(): string {
  const items = getShopStock()
    .filter((i) => i.qty > 0)
    .sort((a, b) => b.qty - a.qty || a.sellPrice - b.sellPrice)
    .slice(0, STOCK_CONTEXT_CAP);

  if (items.length === 0) {
    return "(snapshot kosong atau semua qty 0 — sarankan cek rak / refresh import)";
  }

  return items
    .map(
      (i) =>
        `- ${i.brand} ${i.productName} ${i.sizeNormalized} | Rp ${i.sellPrice} | sisa ${i.qty}`,
    )
    .join("\n");
}

/** Compact catalog dump for AI system context (server-only use). */
export function buildCatalogContext(): string {
  const vehicles = VEHICLES.map(
    (v) =>
      `- ${v.brand} ${v.model} ${v.generation} (${v.yearStart}${v.yearEnd ? `-${v.yearEnd}` : "+"}): PCD ${v.pcd}, CB ${v.centerBore}, ET ${v.stockOffset}, OEM ban ${v.oemTire}, OEM velg ${v.oemWheel}, tekanan ${v.tirePressure}`,
  ).join("\n");

  const products = TIRE_PRODUCTS.slice(0, 20)
    .map(
      (p) =>
        `- ${p.brand} ${p.model} ${p.size} (${p.type}) load ${p.loadIndex}${p.speedRating} ~Rp ${p.priceMin / 1000}-${p.priceMax / 1000}rb`,
    )
    .join("\n");

  const tireBrands = TIRE_BRANDS.map(
    (b) => `- ${b.name} (${b.category}, ${b.country}): ${b.priceRange}`,
  ).join("\n");

  const wheelBrands = WHEEL_BRANDS.map(
    (b) => `- ${b.name} (${b.category}, ${b.country}): ${b.priceRange}`,
  ).join("\n");

  const ranks = BRAND_RANKS.map(
    (b) => `- [${b.tier}] ${b.brand}: ${b.oneLiner}`,
  ).join("\n");

  const stock = buildStockSummary();

  return `DATA KATALOG WHEELPEDIA + OMAHBAN (sumber internal, prioritaskan):

## Mobil Indonesia (${VEHICLES.length})
${vehicles}

## Stok OmahBan (snapshot, qty & harga jual — max ${STOCK_CONTEXT_CAP} baris qty>0)
${stock}

## Ranking merk counter (bahasa toko)
${ranks}

## Produk ban (sampel katalog edukasi)
${products}

## Brand ban
${tireBrands}

## Brand velg
${wheelBrands}`;
}
