"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Save, Plus, Trash2, Edit3, Check, X, Database, RefreshCw } from "lucide-react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

interface DataItem { [key: string]: unknown; }

const DATA_SOURCES = [
  { key: "vehicles", label: "Mobil Indonesia", path: "src/data/vehicles.ts" },
  { key: "tireBrands", label: "Brand Ban", path: "src/data/brands.ts" },
  { key: "wheelBrands", label: "Brand Velg", path: "src/data/brands.ts" },
  { key: "glossary", label: "Glossary", path: "src/data/glossary.ts" },
];

function DataTable({ title, data, onSave }: { title: string; data: DataItem[]; onSave: (d: DataItem[]) => void }) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editData, setEditData] = useState<DataItem>({});
  const [items, setItems] = useState<DataItem[]>(data);

  useEffect(() => { setItems(data); }, [data]);

  const keys = items.length > 0 ? Object.keys(items[0]).filter((k) => k !== "id") : [];

  const handleSave = (idx: number) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], ...editData };
    setItems(updated);
    onSave(updated);
    setEditingIdx(null);
  };

  const handleDelete = (idx: number) => {
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    onSave(updated);
  };

  const handleAdd = () => {
    const newItem: DataItem = { id: `new-${Date.now()}` };
    keys.forEach((k) => (newItem[k] = ""));
    setItems([...items, newItem]);
    setEditingIdx(items.length);
    setEditData(newItem);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex gap-2">
          <span className="text-xs text-gray-400">{items.length} items</span>
          <button onClick={handleAdd} className="text-xs text-[#3B82F6] hover:underline flex items-center gap-1"><Plus size={12} /> Tambah</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {keys.slice(0, 6).map((k) => (
                <th key={k} className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">{k}</th>
              ))}
              <th className="px-3 py-2 text-right text-xs font-semibold text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {items.slice(0, 20).map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {keys.slice(0, 6).map((k) => (
                  <td key={k} className="px-3 py-2">
                    {editingIdx === idx ? (
                      <input
                        defaultValue={String(item[k] ?? "")}
                        onChange={(e) => setEditData((prev) => ({ ...prev, [k]: e.target.value }))}
                        className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-800 dark:border-gray-700"
                      />
                    ) : (
                      <span className="text-xs line-clamp-2">{String(item[k] ?? "").slice(0, 50)}</span>
                    )}
                  </td>
                ))}
                <td className="px-3 py-2 text-right">
                  {editingIdx === idx ? (
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => handleSave(idx)} className="p-1 text-green-600 hover:bg-green-50 rounded"><Check size={14} /></button>
                      <button onClick={() => setEditingIdx(null)} className="p-1 text-gray-400 hover:bg-gray-50 rounded"><X size={14} /></button>
                    </div>
                  ) : (
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => { setEditingIdx(idx); setEditData(item); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={14} /></button>
                      <button onClick={() => handleDelete(idx)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
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
          Menampilkan 20 dari {items.length} items. Edit file data untuk melihat semua.
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("vehicles");
  const [savedMsg, setSavedMsg] = useState("");

  const handleSave = (key: string, data: DataItem[]) => {
    localStorage.setItem(`wheelpedia_${key}`, JSON.stringify(data));
    setSavedMsg(`${key} tersimpan!`);
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const handleReset = (key: string) => {
    localStorage.removeItem(`wheelpedia_${key}`);
    setSavedMsg(`${key} direset ke default!`);
    setTimeout(() => setSavedMsg(""), 2000);
    window.location.reload();
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Database size={24} /> Admin Panel</h1>
            <p className="text-sm text-gray-500">Edit data aplikasi. Perubahan disimpan di browser (localStorage).</p>
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
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeTab === src.key ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"}`}
            >
              {src.label}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Cara Edit Data:</strong> Edit file <code className="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">{DATA_SOURCES.find((s) => s.key === activeTab)?.path}</code> langsung di code editor. Perubahan akan otomatis ter-refresh. Atau edit di tabel bawah (disimpan di browser).
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => handleReset(activeTab)} className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
            <RefreshCw size={12} /> Reset ke Default
          </button>
        </div>

        <DataTable
          title={DATA_SOURCES.find((s) => s.key === activeTab)?.label || ""}
          data={[]}
          onSave={(d) => handleSave(activeTab, d)}
        />
      </div>
    </AppShell>
  );
}
