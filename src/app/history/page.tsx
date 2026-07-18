"use client";

import dynamic from "next/dynamic";
import { History, Clock, Trash2 } from "lucide-react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

export default function HistoryPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Riwayat</h1>
          <button className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1">
            <Trash2 size={14} /> Hapus Semua
          </button>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-12 border border-gray-200 dark:border-gray-800 text-center">
          <History className="mx-auto mb-4 text-gray-300" size={40} />
          <p className="text-gray-500">Belum ada riwayat</p>
          <p className="text-sm text-gray-400 mt-1">Riwayat belajar dan pencarian Anda akan muncul di sini</p>
        </div>
      </div>
    </AppShell>
  );
}
