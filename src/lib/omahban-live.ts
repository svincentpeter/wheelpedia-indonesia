import { getShopStock, type ShopStockItem } from "@/lib/shop-stock";
import {
  mapPosProductToShopItem,
  type PosProductRaw,
} from "@/lib/omahban-map";

export type StockSource = "snapshot" | "live";

export type StockResolveResult = {
  source: StockSource;
  items: ShopStockItem[];
  error?: string;
};

function stockSourceFlag(): StockSource {
  const v = (process.env.STOCK_SOURCE || "snapshot").toLowerCase().trim();
  return v === "live" ? "live" : "snapshot";
}

function apiBase(): string {
  return (process.env.OMAHBAN_API_URL || "").replace(/\/$/, "");
}

function apiToken(): string {
  return (process.env.OMAHBAN_API_TOKEN || "").trim();
}

type ProductsPage = {
  success?: boolean;
  data?: PosProductRaw[];
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
};

async function fetchProductsPage(
  base: string,
  token: string,
  page: number,
  perPage: number,
  signal?: AbortSignal,
): Promise<ProductsPage> {
  const url = new URL(`${base}/api/products`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("is_active", "1");

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`POS ${res.status}${text ? `: ${text.slice(0, 120)}` : ""}`);
  }

  return (await res.json()) as ProductsPage;
}

/** Server-only: pull live products (paginated) and map to ShopStockItem[]. */
export async function fetchLiveShopStock(
  opts: { maxPages?: number; perPage?: number; signal?: AbortSignal } = {},
): Promise<ShopStockItem[]> {
  const base = apiBase();
  const token = apiToken();
  if (!base || !token) {
    throw new Error("OMAHBAN_API_URL / OMAHBAN_API_TOKEN belum di-set");
  }

  const perPage = opts.perPage ?? 100;
  const maxPages = opts.maxPages ?? 50;
  const items: ShopStockItem[] = [];
  let page = 1;
  let lastPage = 1;

  while (page <= lastPage && page <= maxPages) {
    const body = await fetchProductsPage(base, token, page, perPage, opts.signal);
    const rows = Array.isArray(body.data) ? body.data : [];
    for (const row of rows) {
      const mapped = mapPosProductToShopItem(row);
      if (mapped) items.push(mapped);
    }
    lastPage = Number(body.meta?.last_page) || 1;
    page += 1;
  }

  return items;
}

/**
 * Resolve stock for server use.
 * STOCK_SOURCE=live → try POS, fallback snapshot on error.
 * default snapshot → JSON only.
 */
export async function resolveShopStock(
  signal?: AbortSignal,
): Promise<StockResolveResult> {
  const mode = stockSourceFlag();
  if (mode !== "live") {
    return { source: "snapshot", items: getShopStock() };
  }

  try {
    const items = await fetchLiveShopStock({ signal });
    if (items.length === 0) {
      return {
        source: "snapshot",
        items: getShopStock(),
        error: "Live API kosong — fallback snapshot",
      };
    }
    return { source: "live", items };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "live fetch failed";
    return {
      source: "snapshot",
      items: getShopStock(),
      error: msg,
    };
  }
}

export function isLiveStockConfigured(): boolean {
  return stockSourceFlag() === "live" && Boolean(apiBase() && apiToken());
}
