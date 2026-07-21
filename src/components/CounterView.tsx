"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Package, Car, ChevronRight } from "lucide-react";
import { VEHICLES, type Vehicle } from "@/data/vehicles";
import { matchStockForOem, type ShopStockItem } from "@/lib/shop-stock";
import { BRAND_RANKS, getRanksByTier } from "@/lib/brand-ranking";

function formatRp(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function vehicleLabel(v: Vehicle): string {
  const years =
    v.yearEnd == null
      ? `${v.yearStart}+`
      : `${v.yearStart}–${v.yearEnd}`;
  return `${v.brand} ${v.model} ${v.generation} (${years})`;
}

export default function CounterView() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return VEHICLES.slice(0, 12);
    return VEHICLES.filter((v) => {
      const hay = `${v.brand} ${v.model} ${v.generation} ${v.oemTire}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 40);
  }, [query]);

  const selected = useMemo(
    () => VEHICLES.find((v) => v.id === selectedId) ?? null,
    [selectedId],
  );

  const stockHits: ShopStockItem[] = useMemo(() => {
    if (!selected) return [];
    const oem = matchStockForOem(selected.oemTire, undefined, {
      inStockOnly: false,
    });
    const compat = selected.compatibleTires.flatMap((size) =>
      matchStockForOem(size, undefined, { inStockOnly: false }),
    );
    const byId = new Map<string, ShopStockItem>();
    for (const it of [...oem, ...compat]) byId.set(it.id, it);
    return Array.from(byId.values()).sort((a, b) => {
      if (b.qty !== a.qty) return b.qty - a.qty;
      return a.sellPrice - b.sellPrice;
    });
  }, [selected]);

  const tiers = getRanksByTier();

  const openAiBrief = () => {
    if (!selected) return;
    const inStock = stockHits.filter((s) => s.qty > 0).slice(0, 8);
    const stockLines =
      inStock.length === 0
        ? "Belum ada stok cocok di snapshot — sarankan cek rak."
        : inStock
            .map(
              (s) =>
                `- ${s.brand} ${s.productName} ${s.sizeNormalized} | ${formatRp(s.sellPrice)} | sisa ${s.qty}`,
            )
            .join("\n");
    const prompt = [
      `Bantu jelaskan ke customer (bahasa awam, singkat):`,
      `Mobil: ${vehicleLabel(selected)}`,
      `OEM ban: ${selected.oemTire}`,
      `OEM velg: ${selected.oemWheel}`,
      `PCD ${selected.pcd}, CB ${selected.centerBore}, ET ${selected.stockOffset}`,
      `Tekanan: ${selected.tirePressure}`,
      ``,
      `Stok OmahBan (snapshot):`,
      stockLines,
      ``,
      `Sebut opsi budget / mid / premium singkat. Jangan sebut modal. Jika stok kosong, jujur.`,
    ].join("\n");
    router.push(`/ai-assistant?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5 pb-24 text-left animate-fade-in">
      <header className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">
          OmahBan Counter
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Cari mobil → stok → jelasin
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Bantuan counter. Bukan kasir — stok dari snapshot, cek rak fisik.
        </p>
      </header>

      <label className="block">
        <span className="sr-only">Cari mobil</span>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari merek / model (contoh: Jazz, Avanza)"
            autoComplete="off"
            className="min-h-12 w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-base font-medium text-gray-900 shadow-sm outline-none ring-[#3B82F6] placeholder:text-gray-400 focus:ring-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </label>

      {!selected && (
        <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
          {results.length === 0 && (
            <li className="px-4 py-6 text-sm text-gray-500">
              Tidak ketemu. Coba kata lain.
            </li>
          )}
          {results.map((v) => (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => setSelectedId(v.id)}
                className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left transition-colors active:bg-blue-50 dark:active:bg-gray-800"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#3B82F6] dark:bg-blue-950">
                  <Car size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold text-gray-900 dark:text-white">
                    {v.brand} {v.model}
                  </span>
                  <span className="block truncate text-sm text-gray-500">
                    {v.generation} · OEM {v.oemTire}
                  </span>
                </span>
                <ChevronRight className="shrink-0 text-gray-300" size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="min-h-11 text-sm font-bold text-[#3B82F6]"
          >
            ← Ganti mobil
          </button>

          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
              {selected.brand} {selected.model}
            </h2>
            <p className="text-sm text-gray-500">{vehicleLabel(selected)}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  OEM Ban
                </dt>
                <dd className="font-bold text-gray-900 dark:text-white">
                  {selected.oemTire}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  OEM Velg
                </dt>
                <dd className="font-bold text-gray-900 dark:text-white">
                  {selected.oemWheel}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  PCD / CB / ET
                </dt>
                <dd className="font-bold text-gray-900 dark:text-white">
                  {selected.pcd} · {selected.centerBore} · ET
                  {selected.stockOffset}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Tekanan
                </dt>
                <dd className="font-bold text-gray-900 dark:text-white">
                  {selected.tirePressure}
                </dd>
              </div>
            </dl>
            {selected.upgradeNotes && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                {selected.upgradeNotes}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <Package size={18} className="text-[#3B82F6]" />
              <h3 className="font-extrabold text-gray-900 dark:text-white">
                Siap di OmahBan
              </h3>
            </div>
            {stockHits.length === 0 ? (
              <p className="text-sm text-gray-500">
                Belum ada di snapshot stok — cek rak / refresh import
              </p>
            ) : (
              <ul className="space-y-2">
                {stockHits.slice(0, 24).map((it) => (
                  <li
                    key={it.id}
                    className="flex min-h-14 flex-col gap-1 rounded-xl border border-gray-100 px-3 py-2.5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-bold text-gray-900 dark:text-white">
                        {it.brand} {it.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {it.sizeNormalized}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 sm:shrink-0">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {formatRp(it.sellPrice)}
                      </span>
                      {it.qty > 0 ? (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          sisa {it.qty}
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-500 dark:bg-gray-800">
                          Habis
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={`/stok?q=${encodeURIComponent(selected.oemTire)}`}
              className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-[#3B82F6]"
            >
              Buka browse stok →
            </Link>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5">
            <h3 className="mb-3 font-extrabold text-gray-900 dark:text-white">
              Rekomendasi merk
            </h3>
            <div className="space-y-4">
              {(
                [
                  ["budget", "Budget"],
                  ["mid", "Mid"],
                  ["premium", "Premium"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {label}
                  </p>
                  <ul className="space-y-2">
                    {tiers[key].slice(0, 2).map((b) => (
                      <li
                        key={b.brand}
                        className="rounded-xl bg-gray-50 px-3 py-2.5 dark:bg-gray-800/60"
                      >
                        <p className="font-bold text-gray-900 dark:text-white">
                          {b.brand}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {b.oneLiner}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-400">
              {BRAND_RANKS.length} merek di ranking toko · sesuaikan stok nyata
            </p>
          </section>

          <button
            type="button"
            onClick={openAiBrief}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#3B82F6] px-4 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/25 active:scale-[0.99]"
          >
            <Sparkles size={20} />
            Bantu jelaskan ke customer
          </button>
        </div>
      )}
    </div>
  );
}
