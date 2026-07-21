import type { ShopStockItem } from "@/lib/shop-stock";
import { getBrandRank, type RankTier } from "@/lib/brand-ranking";

export type CounterTier = "Budget" | "Mid" | "Premium";

export type CounterStockItem = {
  id: string;
  brand: string;
  productName: string;
  size: string;
  price: number;
  qty: number;
  tier: CounterTier;
  description?: string;
};

export type ParsedTire = {
  width: number;
  aspect: number;
  rim: number;
};

const tierLabel: Record<RankTier, CounterTier> = {
  budget: "Budget",
  mid: "Mid",
  premium: "Premium",
};

export function parseTireSize(sizeStr: string): ParsedTire | null {
  try {
    const clean = sizeStr.replace(/\s+/g, "").toUpperCase();
    const match = clean.match(/^(\d{3})\/(\d{2})R?(\d{2})/);
    if (!match) return null;
    return {
      width: Number(match[1]),
      aspect: Number(match[2]),
      rim: Number(match[3]),
    };
  } catch {
    return null;
  }
}

export function diameterMm(width: number, aspect: number, rim: number): number {
  return width * (aspect / 100) * 2 + rim * 25.4;
}

export function formatRp(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function toCounterStock(item: ShopStockItem): CounterStockItem {
  const rank = getBrandRank(item.brand);
  return {
    id: item.id,
    brand: item.brand,
    productName: item.productName,
    size: item.sizeNormalized || item.sizeRaw,
    price: item.sellPrice,
    qty: item.qty,
    tier: rank ? tierLabel[rank.tier] : "Mid",
    description: rank?.oneLiner,
  };
}

export function matchCounterStock(
  sizeQuery: string,
  items: ShopStockItem[],
): CounterStockItem[] {
  const target = sizeQuery.trim().toUpperCase().replace(/\s+/g, "");
  return items
    .filter((it) => {
      const n = it.sizeNormalized.toUpperCase().replace(/\s+/g, "");
      return n === target || n.includes(target) || target.includes(n);
    })
    .map(toCounterStock)
    .sort((a, b) => {
      if (b.qty !== a.qty) return b.qty - a.qty;
      return a.price - b.price;
    });
}

export function tierBadgeClass(tier: CounterTier): string {
  if (tier === "Premium")
    return "bg-amber-50 text-amber-800 border border-amber-200";
  if (tier === "Mid") return "bg-blue-50 text-blue-800 border border-blue-200";
  return "bg-emerald-50 text-emerald-800 border border-emerald-200";
}

export async function requestExplainScript(payload: {
  vehicle: {
    brand: string;
    model: string;
    oemTireSize: string;
    pcd: string;
    cb: string;
    et: string;
    notes?: string;
  };
  stockItem: CounterStockItem;
  tierInfo?: unknown;
}): Promise<string> {
  const overrides =
    typeof window !== "undefined"
      ? {
          endpoint: localStorage.getItem("wheelpedia_ai_endpoint") || undefined,
          apiKey: localStorage.getItem("wheelpedia_ai_api_key") || undefined,
          model: localStorage.getItem("wheelpedia_ai_model") || undefined,
        }
      : {};

  const res = await fetch("/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, ...overrides }),
  });
  if (!res.ok) {
    let detail = "Layanan AI gagal merespons.";
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) detail = body.error;
    } catch {
      // ignore
    }
    throw new Error(detail);
  }
  const data = (await res.json()) as { text?: string };
  if (!data.text) throw new Error("Skrip kosong dari AI.");
  return data.text;
}
