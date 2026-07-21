"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  HelpCircle,
  BookMarked,
  Search,
  Clock,
  ArrowRight,
} from "lucide-react";
import QuizView from "@/components/QuizView";
import { GLOSSARY, searchGlossary } from "@/data/glossary";

interface LearningViewProps {
  onNavigateToAssistant: (initialPrompt?: string) => void;
  onBackToDashboard: () => void;
}

type Section = "modules" | "quiz" | "glossary";

const modules = [
  {
    id: "ban",
    title: "Belajar Ban",
    href: "/learning/ban",
    desc: "Anatomi, kode DOT, load/speed index, tekanan, rotasi.",
    time: "15 mnt",
  },
  {
    id: "velg",
    title: "Belajar Velg",
    href: "/learning/velg",
    desc: "PCD, CB, offset/ET, nut size, fitment aman.",
    time: "12 mnt",
  },
];

export default function LearningView({
  onNavigateToAssistant,
  onBackToDashboard,
}: LearningViewProps) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<Section>("modules");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "quiz" || tab === "glossary" || tab === "modules") {
      setActive(tab);
    }
  }, [searchParams]);

  const filteredGlossary = glossarySearch
    ? searchGlossary(glossarySearch)
    : selectedCat
      ? GLOSSARY.filter((g) => g.category === selectedCat)
      : GLOSSARY;

  const categories = ["Ban", "Velg", "Fitment", "Umum"] as const;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl p-5 border border-tokocream flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-display font-bold text-lg text-tokoteal">
            Pusat Belajar Mandiri Karyawan
          </h2>
          <p className="text-xs text-tokonavy/60 mt-1">
            Tingkatkan pengetahuan ban & velg agar makin dipercaya pelanggan di
            counter OmahBan.
          </p>
        </div>
        <div className="flex bg-tokobg p-1 rounded-lg w-full md:w-auto">
          {(
            [
              ["modules", "Modul", BookOpen],
              ["quiz", "Quiz Mandiri", HelpCircle],
              ["glossary", "Glossary", BookMarked],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-md transition-all ${
                active === id
                  ? "bg-tokoteal text-white"
                  : "text-tokonavy/60 hover:text-tokonavy"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {active === "modules" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((m) => (
              <Link
                key={m.id}
                href={m.href}
                className="group bg-white rounded-xl border border-tokocream p-5 hover:border-tokoterracotta transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-base text-tokonavy group-hover:text-tokoterracotta">
                      {m.title}
                    </h3>
                    <p className="text-xs text-tokonavy/60 leading-relaxed">
                      {m.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-tokoterracotta">
                      <Clock size={12} /> {m.time}
                    </span>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-tokonavy/30 group-hover:text-tokoterracotta shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="bg-tokowarmbg/50 rounded-xl border border-tokocream p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-display font-bold text-sm text-tokoteal">
                Bingung istilah teknis?
              </p>
              <p className="text-xs text-tokonavy/60 mt-1">
                Tanya Asisten AI dengan bahasa toko — tanpa jargons berlebihan.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  onNavigateToAssistant(
                    "Jelaskan PCD, offset/ET, dan center bore dengan bahasa awam untuk customer.",
                  )
                }
                className="px-4 py-2 rounded-lg bg-tokoterracotta text-white text-xs font-bold"
              >
                Tanya AI
              </button>
              <button
                type="button"
                onClick={onBackToDashboard}
                className="px-4 py-2 rounded-lg border border-tokocream text-xs font-bold text-tokonavy"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {active === "quiz" && (
        <div className="bg-white rounded-xl border border-tokocream p-4 md:p-6">
          <QuizView />
        </div>
      )}

      {active === "glossary" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-tokocream p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-tokonavy/40"
              />
              <input
                value={glossarySearch}
                onChange={(e) => {
                  setGlossarySearch(e.target.value);
                  setSelectedCat("");
                }}
                placeholder="Cari istilah (PCD, DOT, ET...)"
                className="w-full pl-9 pr-3 py-2 text-sm bg-tokobg border border-tokocream rounded-lg"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCat("")}
                className={`px-3 py-2 rounded-lg text-xs font-bold ${
                  !selectedCat
                    ? "bg-tokoteal text-white"
                    : "bg-tokobg text-tokonavy/70"
                }`}
              >
                Semua
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setSelectedCat(c === selectedCat ? "" : c);
                    setGlossarySearch("");
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold ${
                    c === selectedCat
                      ? "bg-tokoteal text-white"
                      : "bg-tokobg text-tokonavy/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filteredGlossary.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-xl p-5 border border-tokocream"
              >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-display font-bold text-tokonavy">
                    {g.term}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-tokobg text-tokoteal font-bold uppercase">
                    {g.category}
                  </span>
                </div>
                <p className="text-sm text-tokonavy/70 leading-relaxed">
                  {g.definition}
                </p>
                {g.example && (
                  <p className="text-xs text-tokoterracotta mt-1.5 font-medium">
                    Contoh: {g.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
