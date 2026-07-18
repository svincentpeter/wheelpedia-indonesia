"use client";

import dynamic from "next/dynamic";
import { TIRE_SIZES, TIRE_PRODUCTS, getTiresBySize } from "@/data/tires";
import { useState } from "react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

export default function TiresPage() {
  const [selectedSize, setSelectedSize] = useState("");
  const products = selectedSize ? getTiresBySize(selectedSize) : TIRE_PRODUCTS;

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Database Ukuran Ban</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{TIRE_SIZES.length} ukuran ban tercatat</p>

        {/* Size Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {TIRE_SIZES.map((t) => (
            <button key={t.id} onClick={() => setSelectedSize(t.size === selectedSize ? "" : t.size)} className={`p-3 rounded-xl border text-left transition-all ${t.size === selectedSize ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-800 hover:border-blue-300"}`}>
              <div className="font-bold font-mono text-lg">{t.size}</div>
              <div className="text-xs text-gray-500 mt-1">OD: {t.overallDiameter.toFixed(1)}mm</div>
              <div className="text-xs text-gray-500">Dipakai: {t.commonVehicles.slice(0, 3).join(", ")}</div>
            </button>
          ))}
        </div>

        {/* Products */}
        <h2 className="text-lg font-semibold mb-4">{selectedSize ? `Ban ukuran ${selectedSize}` : "Semua Produk Ban"}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{p.type}</span>
                <span className="text-xs text-gray-500 font-mono">{p.size}</span>
              </div>
              <h3 className="font-semibold">{p.brand} {p.model}</h3>
              <p className="text-sm text-gray-500 mb-2">{p.loadIndex}{p.speedRating}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-600">Rp {(p.priceMin / 1000).toFixed(0)}rb - {(p.priceMax / 1000).toFixed(0)}rb</span>
                <span className="text-xs text-gray-500">⭐ {p.rating} ({p.reviewCount})</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Size Details */}
        {selectedSize && (() => {
          const info = TIRE_SIZES.find((t) => t.size === selectedSize);
          if (!info) return null;
          return (
            <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold text-lg mb-4">Detail Ukuran {selectedSize}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[["Lebar", `${info.width}mm`], ["Profil", `${info.profile}%`], ["Rim", `${info.rim} inch`], ["Diameter Luar", `${info.overallDiameter.toFixed(1)}mm`], ["Sidewall", `${info.sidewallHeight.toFixed(1)}mm`], ["Keliling", `${info.circumference.toFixed(1)}mm`]].map(([k, v]) => (
                  <div key={k} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-xs text-gray-500">{k}</div>
                    <div className="font-bold">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Upgrade Path</h3>
                <div className="flex gap-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">-1: {info.minusOne}</span>
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">+1: {info.plusOne}</span>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">+2: {info.plusTwo}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </AppShell>
  );
}
