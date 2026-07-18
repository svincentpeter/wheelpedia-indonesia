"use client";

import dynamic from "next/dynamic";
import { GLOSSARY, searchGlossary } from "@/data/glossary";
import { useState } from "react";
import { Search, BookMarked } from "lucide-react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

const categories = ["Ban", "Velg", "Fitment", "Umum"] as const;
const catColor: Record<string, string> = {
  Ban: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Velg: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Fitment: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Umum: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const filtered = query ? searchGlossary(query) : selectedCat ? GLOSSARY.filter((g) => g.category === selectedCat) : GLOSSARY;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2"><BookMarked size={24} /> Glossary</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{GLOSSARY.length} istilah tercatat</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => { setQuery(e.target.value); setSelectedCat(""); }} placeholder="Cari istilah..." className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setSelectedCat("")} className={`px-3 py-2 rounded-lg text-sm ${!selectedCat ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>Semua</button>
            {categories.map((c) => (
              <button key={c} onClick={() => { setSelectedCat(c === selectedCat ? "" : c); setQuery(""); }} className={`px-3 py-2 rounded-lg text-sm ${c === selectedCat ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map((g) => (
            <div key={g.id} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{g.term}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${catColor[g.category]}`}>{g.category}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{g.definition}</p>
              {g.example && <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Contoh: {g.example}</p>}
              {g.relatedTerms && g.relatedTerms.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {g.relatedTerms.map((rt, i) => <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">→ {rt}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
