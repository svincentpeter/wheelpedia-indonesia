import { getShopStock, type ShopStockItem } from "@/lib/shop-stock";

export type StockAnalytics = {
  totalProducts: number;
  totalStockPcs: number;
  totalValueModal: number;
  totalValueJual: number;
  avgMargin: number;
  topBrands: { brand: string; count: number; stock: number }[];
  lowStock: ShopStockItem[];
  zeroStock: ShopStockItem[];
  sizeDistribution: Record<string, number>;
  brandStockSummary: Record<string, { count: number; stock: number; value: number }>;
};

export function computeStockAnalytics(): StockAnalytics {
  const items = getShopStock();
  const inStock = items.filter((i) => i.qty > 0);

  let totalStockPcs = 0;
  let totalValueModal = 0;
  let totalValueJual = 0;
  let marginSum = 0;
  let marginCount = 0;

  const brandMap: Record<string, { count: number; stock: number; value: number }> = {};
  const sizeMap: Record<string, number> = {};
  const lowStock: ShopStockItem[] = [];
  const zeroStock: ShopStockItem[] = [];

  for (const item of items) {
    if (item.qty > 0) {
      totalStockPcs += item.qty;
      // We don't store modal in client data, use sellPrice as proxy
      totalValueJual += item.sellPrice * item.qty;
    }

    const b = item.brand;
    if (!brandMap[b]) brandMap[b] = { count: 0, stock: 0, value: 0 };
    brandMap[b].count++;
    brandMap[b].stock += item.qty;
    brandMap[b].value += item.sellPrice * item.qty;

    // Size distribution
    const sizeKey = item.sizeNormalized || "unknown";
    sizeMap[sizeKey] = (sizeMap[sizeKey] || 0) + item.qty;

    // Track low stock (1-3 pcs)
    if (item.qty > 0 && item.qty <= 3) lowStock.push(item);
    if (item.qty === 0) zeroStock.push(item);
  }

  const topBrands = Object.entries(brandMap)
    .map(([brand, data]) => ({ brand, ...data }))
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 10);

  return {
    totalProducts: items.length,
    totalStockPcs,
    totalValueModal,
    totalValueJual,
    avgMargin: marginCount > 0 ? marginSum / marginCount : 0,
    topBrands,
    lowStock: lowStock.slice(0, 20),
    zeroStock: zeroStock.slice(0, 20),
    sizeDistribution: sizeMap,
    brandStockSummary: brandMap,
  };
}

export function buildStockReport(): string {
  const a = computeStockAnalytics();
  const lines: string[] = [];

  lines.push("## LAPORAN STOK OMAHBAN");
  lines.push(`Total produk: ${a.totalProducts} jenis`);
  lines.push(`Total stok: ${a.totalStockPcs} pcs`);
  lines.push(`Total nilai jual: Rp ${a.totalValueJual.toLocaleString("id-ID")}`);
  lines.push("");

  lines.push("### Stok per Brand:");
  for (const b of a.topBrands) {
    lines.push(`- ${b.brand}: ${b.count} produk, ${b.stock} pcs, Rp ${b.value.toLocaleString("id-ID")}`);
  }

  if (a.lowStock.length > 0) {
    lines.push("");
    lines.push("### Stok Rendah (1-3 pcs) — Perlu Restock:");
    for (const item of a.lowStock.slice(0, 10)) {
      lines.push(`- ${item.brand} ${item.productName} ${item.sizeNormalized}: ${item.qty} pcs`);
    }
  }

  return lines.join("\n");
}
