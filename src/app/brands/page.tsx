"use client";

import dynamic from "next/dynamic";
import { TIRE_BRANDS, WHEEL_BRANDS } from "@/data/brands";
import { BRAND_RANKS, getRanksByTier } from "@/lib/brand-ranking";
import { useState } from "react";
import { Award, CheckCircle2, ThumbsUp } from "lucide-react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

const tierBadge: Record<string, string> = {
  budget: "bg-emerald-100 text-emerald-800",
  mid: "bg-blue-100 text-blue-800",
  premium: "bg-purple-100 text-purple-800",
  Budget: "bg-emerald-100 text-emerald-800",
  "Mid-Range": "bg-blue-100 text-blue-800",
  Premium: "bg-purple-100 text-purple-800",
  "Ultra-Premium": "bg-purple-100 text-purple-800",
};

export default function BrandsPage() {
  const [mode, setMode] = useState<"counter" | "tire" | "wheel">("counter");
  const tiers = getRanksByTier();
  const library = mode === "tire" ? TIRE_BRANDS : WHEEL_BRANDS;

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in">
        <div className="bg-white rounded-xl p-5 border border-tokocream">
          <h2 className="font-display font-bold text-lg text-tokoteal flex items-center gap-2">
            <Award size={20} className="text-tokoterracotta" />
            Panduan Reputasi Merk
          </h2>
          <p className="text-xs text-tokonavy/60 mt-1">
            Bahasa toko untuk counter + library brand ban/velg lengkap.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {(
              [
                ["counter", "Tier Counter"],
                ["tire", `Brand Ban (${TIRE_BRANDS.length})`],
                ["wheel", `Brand Velg (${WHEEL_BRANDS.length})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold ${
                  mode === id
                    ? "bg-tokoteal text-white"
                    : "bg-tokobg text-tokonavy/70 border border-tokocream"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {mode === "counter" && (
          <div className="space-y-5">
            {(
              [
                ["budget", "Budget"],
                ["mid", "Mid"],
                ["premium", "Premium"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="space-y-3">
                <h3 className="font-display font-bold text-sm text-tokoteal uppercase tracking-wider">
                  {label}
                </h3>
                {tiers[key].map((b) => (
                  <div
                    key={b.brand}
                    className="bg-white rounded-xl border border-tokocream p-5 border-l-4 border-l-tokoterracotta space-y-2"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${tierBadge[b.tier]}`}
                      >
                        {label}
                      </span>
                      <h4 className="font-display font-bold text-lg text-tokonavy">
                        {b.brand}
                      </h4>
                    </div>
                    <p className="text-sm text-tokonavy/80 flex items-start gap-2">
                      <ThumbsUp
                        size={14}
                        className="text-tokogreen shrink-0 mt-0.5"
                      />
                      {b.oneLiner}
                    </p>
                    <p className="text-xs text-tokonavy/50 flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="text-tokoterracotta shrink-0 mt-0.5"
                      />
                      Cocok untuk: {b.bestFor}
                    </p>
                  </div>
                ))}
              </div>
            ))}
            <p className="text-[11px] text-tokonavy/40">
              {BRAND_RANKS.length} merek ranking counter · sesuaikan stok nyata
            </p>
          </div>
        )}

        {mode !== "counter" && (
          <div className="grid md:grid-cols-2 gap-4">
            {library.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl p-5 border border-tokocream"
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-display font-bold text-lg text-tokonavy">
                    {b.name}
                  </h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      tierBadge[b.category] ?? "bg-tokobg text-tokoteal"
                    }`}
                  >
                    {b.category}
                  </span>
                </div>
                <p className="text-xs text-tokonavy/50 mb-2">
                  {b.country} · Est. {b.founded}
                </p>
                <p className="text-sm text-tokonavy/70 mb-3">{b.description}</p>
                <p className="text-xs text-tokonavy/50 mb-2">
                  Harga: {b.priceRange}
                </p>
                <div className="flex flex-wrap gap-1">
                  {b.strengths.map((s, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
