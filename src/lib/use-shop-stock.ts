"use client";

import { useEffect, useState } from "react";
import { getShopStock, type ShopStockItem } from "@/lib/shop-stock";

export type StockSourceLabel = "snapshot" | "live" | "loading";

export type UseShopStockState = {
  items: ShopStockItem[];
  source: StockSourceLabel;
  warning?: string;
  loading: boolean;
};

/** Client: load stock via server proxy (live or snapshot). Falls back to bundled JSON. */
export function useShopStock(): UseShopStockState {
  const [state, setState] = useState<UseShopStockState>({
    items: getShopStock(),
    source: "loading",
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();

    (async () => {
      try {
        const res = await fetch("/api/omahban-products", {
          signal: ac.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = (await res.json()) as {
          items?: ShopStockItem[];
          source?: "snapshot" | "live";
          warning?: string;
        };
        if (cancelled) return;
        const items = Array.isArray(body.items) ? body.items : getShopStock();
        setState({
          items: items.length > 0 ? items : getShopStock(),
          source: body.source === "live" ? "live" : "snapshot",
          warning: body.warning,
          loading: false,
        });
      } catch {
        if (cancelled) return;
        setState({
          items: getShopStock(),
          source: "snapshot",
          warning: "Gagal load API — pakai snapshot lokal",
          loading: false,
        });
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, []);

  return state;
}
