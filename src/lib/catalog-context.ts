import { VEHICLES } from "@/data/vehicles";
import { TIRE_PRODUCTS } from "@/data/tires";
import { TIRE_BRANDS, WHEEL_BRANDS } from "@/data/brands";
import { getShopStock, type ShopStockItem } from "@/lib/shop-stock";
import { BRAND_RANKS } from "@/lib/brand-ranking";
import { resolveShopStock } from "@/lib/omahban-live";

const STOCK_CONTEXT_CAP = 80;

function buildStockSummary(items: ShopStockItem[], sourceLabel: string): string {
  const lines = items
    .filter((i) => i.qty > 0)
    .sort((a, b) => b.qty - a.qty || a.sellPrice - b.sellPrice)
    .slice(0, STOCK_CONTEXT_CAP);

  if (lines.length === 0) {
    return `(${sourceLabel} kosong atau semua qty 0 — sarankan cek rak / refresh import)`;
  }

  return lines
    .map(
      (i) =>
        `- ${i.brand} ${i.productName} ${i.sizeNormalized} | Rp ${i.sellPrice} | sisa ${i.qty}`,
    )
    .join("\n");
}

function formatCatalog(stockBlock: string, stockTitle: string): string {
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

  return `DATA KATALOG WHEELPEDIA + OMAHBAN (sumber internal, prioritaskan):

## Mobil Indonesia (${VEHICLES.length})
${vehicles}

## ${stockTitle}
${stockBlock}

## Ranking merk counter (bahasa toko)
${ranks}

## Produk ban (sampel katalog edukasi)
${products}

## Brand ban
${tireBrands}

## Brand velg
${wheelBrands}`;
}

export function buildCatalogContext(): string {
  const stock = buildStockSummary(getShopStock(), "snapshot");
  return formatCatalog(
    stock,
    `Stok OmahBan (snapshot, qty & harga jual — max ${STOCK_CONTEXT_CAP} baris qty>0)`,
  );
}

export async function buildCatalogContextAsync(
  signal?: AbortSignal,
): Promise<string> {
  const resolved = await resolveShopStock(signal);
  const label = resolved.source === "live" ? "live POS" : "snapshot";
  const stock = buildStockSummary(resolved.items, label);
  const warn = resolved.error ? `\n(catatan: ${resolved.error})` : "";
  return formatCatalog(
    stock + warn,
    `Stok OmahBan (${label}, qty & harga jual — max ${STOCK_CONTEXT_CAP} baris qty>0)`,
  );
}
