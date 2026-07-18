"use client";

import dynamic from "next/dynamic";
import { Heart, BookOpen, Car, Tag } from "lucide-react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

export default function BookmarksPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Bookmark</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: BookOpen, label: "Materi", count: 0 },
            { icon: Car, label: "Mobil", count: 0 },
            { icon: Tag, label: "Brand", count: 0 },
          ].map((item) => (
            <div key={item.label} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 text-center">
              <item.icon className="mx-auto mb-2 text-gray-400" size={24} />
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-gray-500">{item.count} tersimpan</div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-12 border border-gray-200 dark:border-gray-800 text-center">
          <Heart className="mx-auto mb-4 text-gray-300" size={40} />
          <p className="text-gray-500">Belum ada bookmark</p>
          <p className="text-sm text-gray-400 mt-1">Simankan materi, mobil, atau brand favorit Anda</p>
        </div>
      </div>
    </AppShell>
  );
}
