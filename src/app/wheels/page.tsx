"use client";

import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

export default function WheelsPage() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Database Velg</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Database velg aftermarket Indonesia</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { brand: "Enkei", model: "RPF1", size: "15x7", pcd: "4x100", et: "+35", material: "Forged", price: "Rp 4.5jt/pc" },
            { brand: "OZ Racing", model: "Ultraleggera", size: "17x8", pcd: "5x114.3", et: "+40", material: "Alloy", price: "Rp 8jt/pc" },
            { brand: "SSR", model: "Type C", size: "15x7", pcd: "4x100", et: "+35", material: "Flow Formed", price: "Rp 3.5jt/pc" },
            { brand: "Sparco", model: "Assetto Gara", size: "15x7", pcd: "4x100", et: "+35", material: "Alloy", price: "Rp 2.5jt/pc" },
            { brand: "Lenso", model: "D1R", size: "15x7", pcd: "4x100", et: "+38", material: "Alloy", price: "Rp 1jt/pc" },
            { brand: "ART", model: "Berlin", size: "17x8", pcd: "5x114.3", et: "+40", material: "Alloy", price: "Rp 1.5jt/pc" },
          ].map((w, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">{w.material}</span>
              <h3 className="font-semibold text-lg mt-2">{w.brand} {w.model}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div><span className="text-gray-400">Ukuran:</span> {w.size}</div>
                <div><span className="text-gray-400">PCD:</span> {w.pcd}</div>
                <div><span className="text-gray-400">ET:</span> {w.et}</div>
                <div><span className="text-gray-400">Harga:</span> {w.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
