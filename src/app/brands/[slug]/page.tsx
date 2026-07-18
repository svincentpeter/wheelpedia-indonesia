"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { getBrandById } from "@/data/brands";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

export default function BrandDetailPage() {
  const params = useParams();
  const brand = getBrandById(params.slug as string);

  if (!brand) {
    return (
      <AppShell>
        <div className="text-center py-20">
          <p className="text-gray-500">Brand tidak ditemukan</p>
          <Link href="/brands" className="text-blue-600 hover:underline mt-2 block">← Kembali</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <Link href="/brands" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-6">
          <h1 className="text-3xl font-bold mb-1">{brand.name}</h1>
          <p className="text-gray-500">{brand.country} • Est. {brand.founded} • {brand.category}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">{brand.description}</p>
          <p className="text-sm font-medium mt-2">Harga: {brand.priceRange}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="font-semibold mb-3">Kelebihan</h2>
            <ul className="space-y-1">{brand.strengths.map((s, i) => <li key={i} className="text-sm flex items-center gap-2">✅ {s}</li>)}</ul>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="font-semibold mb-3">Kekurangan</h2>
            <ul className="space-y-1">{brand.weaknesses.map((w, i) => <li key={i} className="text-sm flex items-center gap-2">⚠️ {w}</li>)}</ul>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mt-6">
          <h2 className="font-semibold mb-3">Produk Populer</h2>
          <div className="flex flex-wrap gap-2">{brand.popularTires.map((t, i) => <span key={i} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">{t}</span>)}</div>
        </div>
      </div>
    </AppShell>
  );
}
