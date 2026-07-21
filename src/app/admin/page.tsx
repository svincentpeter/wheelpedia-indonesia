"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash2, Edit3, Check, X, Database, RefreshCw } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { TIRE_BRANDS, WHEEL_BRANDS } from "@/data/brands";
import { GLOSSARY } from "@/data/glossary";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

type DataItem = Record<string, unknown>;

const DATA_SOURCES = [
  { key: "vehicles", label: "Mobil Indonesia", path: "src/data/vehicles.ts" },
  { key: "tireBrands", label: "Brand Ban", path: "src/data/brands.ts" },
  { key: "wheelBrands", label: "Brand Velg", path: "src/data/brands.ts" },
  { key: "glossary", label: "Glossary", path: "src/data/glossary.ts" },
] as const;

type SourceKey = (typeof DATA_SOURCES)[number]["key"];

function defaultsFor(key: SourceKey): DataItem[] {
  switch (key) {
    case "vehicles":
      return VEHICLES as unknown as DataItem[];
    case "tireBrands":
      return TIRE_BRANDS as unknown as DataItem[];
    case "wheelBrands":
      return WHEEL_BRANDS as unknown as DataItem[];
    case "glossary":
      return GLOSSARY as unknown as DataItem[];
  }
}

function loadItems(key: SourceKey): DataItem[] {
  if (typeof window === "undefined") return defaultsFor(key);
  try {
    const raw = localStorage.getItem(`wheelpedia_${key}`);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as DataItem[];
    }
  } catch {
    // corrupt localStorage — fall through
  }
  return defaultsFor(key);
}

function DataTable({
  title,
  items,
  onChange,
}: {
  title: string;
  items: DataItem[];
  onChange: (next: DataItem[]) => void;
}) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editData, setEditData] = useState<DataItem>({});

  const keys =
    items.length > 0
      ? Object.keys(items[0]).filter((k) => k !== "id").slice(0, 6)
      : [];

  const handleSave = (idx: number) => {
    const updated = items.map((item, i) =>
      i === idx ? { ...item, ...editData } : item,
    );
    onChange(updated);
    setEditingIdx(null);
  };

  const handleDelete = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const handleAdd = () => {
    const newItem: DataItem = { id: `new-${Date.now()}` };
    keys.forEach((k) => {
      newItem[k] = "";
    });
    onChange([...items, newItem]);
    setEditingIdx(items.length);
    setEditData(newItem);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-400">{items.length} items</span>
          <button
            onClick={handleAdd}
            className="text-xs text-[#3B82F6] hover:underline flex items-center gap-1"
          >
            <Plus size={12} /> Tambah
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {keys.map((k) => (
                <th
                  key={k}
                  className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase"
                >
                  {k}
                </th>
              ))}
              <th className="px-3 py-2 text-right text-xs font-semibold text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:border-gray-800">
            {items.slice(0, 20).map((item, idx) => (
              <tr key={String(item.id ?? idx)} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {keys.map((k) => (
                  <td key={k} className="px-3 py-2">
                    {editingIdx === idx ? (
                      <input
                        defaultValue={String(item[k] ?? "")}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, [k]: e.target.value }))
                        }
                        className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-800 dark:border-gray-700"
                      />
                    ) : (
                      <span className="text-xs line-clamp-2">
                        {String(item[k] ?? "").slice(0, 50)}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-3 py-2 text-right">
                  {editingIdx === idx ? (
                    <div className="flex gap-1 justify-end">
                      <button
                        onClick={() => handleSave(idx)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => setEditingIdx(null)}
                        className="p-1 text-gray-400 hover:bg-gray-50 rounded"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-1 justify-end">
                      <button
                        onClick={() => {
                          setEditingIdx(idx);
                          setEditData(item);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length > 20 && (
        <div className="p-3 text-center text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800">
          Menampilkan 20 dari {items.length} items. Edit file data untuk sumber
          penuh.
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<SourceKey>("vehicles");
  const [savedMsg, setSavedMsg] = useState("");
  const [revision, setRevision] = useState(0);

  const items = useMemo(() => {
    void revision;
    return loadItems(activeTab);
  }, [activeTab, revision]);

  const handleSave = (key: SourceKey, data: DataItem[]) => {
    localStorage.setItem(`wheelpedia_${key}`, JSON.stringify(data));
    setSavedMsg(`${key} tersimpan di browser (localStorage)!`);
    setTimeout(() => setSavedMsg(""), 2000);
    setRevision((r) => r + 1);
  };

  const handleReset = (key: SourceKey) => {
    localStorage.removeItem(`wheelpedia_${key}`);
    setSavedMsg(`${key} direset ke default dari source code!`);
    setTimeout(() => setSavedMsg(""), 2000);
    setRevision((r) => r + 1);
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Database size={24} /> Admin Panel
            </h1>
            <p className="text-sm text-gray-500">
              Preview &amp; edit salinan data di browser. <strong>Tidak ada auth</strong>{" "}
              — jangan expose ke publik. Source of truth tetap file di{" "}
              <code className="text-xs">src/data/</code>.
            </p>
          </div>
          {savedMsg && (
            <div className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm rounded-lg flex items-center gap-2">
              <Check size={14} /> {savedMsg}
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {DATA_SOURCES.map((src) => (
            <button
              key={src.key}
              onClick={() => setActiveTab(src.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === src.key
                  ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {src.label}
            </button>
          ))}
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Dev tool only.</strong> Edit di tabel = localStorage browser.
            Untuk data production, edit{" "}
            <code className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">
              {DATA_SOURCES.find((s) => s.key === activeTab)?.path}
            </code>
            .
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handleReset(activeTab)}
            className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1"
          >
            <RefreshCw size={12} /> Reset ke Default
          </button>
        </div>

        <DataTable
          title={DATA_SOURCES.find((s) => s.key === activeTab)?.label || ""}
          items={items}
          onChange={(d) => handleSave(activeTab, d)}
        />
      </div>
    </AppShell>
  );
}
