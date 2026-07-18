"use client";

import dynamic from "next/dynamic";
import { TIRE_BRANDS, WHEEL_BRANDS } from "@/data/brands";
import { useState } from "react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

const catColor: Record<string, string> = {
  Premium: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Mid-Range": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Budget: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Ultra-Premium": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function BrandsPage() {
  const [tab, setTab] = useState<"tire" | "wheel">("tire");
  const brands = tab === "tire" ? TIRE_BRANDS : WHEEL_BRANDS;

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Brand Library</h1>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("tire")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "tire" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>Brand Ban ({TIRE_BRANDS.length})</button>
          <button onClick={() => setTab("wheel")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "wheel" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>Brand Velg ({WHEEL_BRANDS.length})</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {brands.map((b) => (
            <div key={b.id} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{b.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${catColor[b.category]}`}>{b.category}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{b.country} • Est. {b.founded}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{b.description}</p>
              <div className="flex gap-2 mb-3">
                <div className="text-xs"><span className="text-gray-400">Harga:</span> {b.priceRange}</div>
              </div>
              <div className="flex flex-wrap gap-1">
                {b.strengths.map((s, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{s}</span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {b.popularTires.slice(0, 4).map((t, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
