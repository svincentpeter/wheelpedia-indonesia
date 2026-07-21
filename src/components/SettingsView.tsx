"use client";

import React, { useState } from "react";
import { ShieldCheck, KeyRound, Save, Trash2, Check } from "lucide-react";
import {
  clearAiOverridesFromStorage,
  readAiOverridesFromStorage,
  writeAiOverridesToStorage,
} from "@/lib/ai";

export default function SettingsView() {
  const saved = readAiOverridesFromStorage();
  const [endpoint, setEndpoint] = useState(saved.endpoint ?? "");
  const [apiKey, setApiKey] = useState(saved.apiKey ?? "");
  const [model, setModel] = useState(saved.model ?? "");
  const [msg, setMsg] = useState("");

  const flash = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    writeAiOverridesToStorage({
      endpoint: endpoint.trim() || undefined,
      apiKey: apiKey.trim() || undefined,
      model: model.trim() || undefined,
    });
    flash("BYOK tersimpan di browser (localStorage).");
  };

  const handleClear = () => {
    clearAiOverridesFromStorage();
    setEndpoint("");
    setApiKey("");
    setModel("");
    flash("BYOK dihapus. Server pakai AI_API_KEY dari .env.local.");
  };

  return (
    <div className="space-y-8 animate-fade-in text-left max-w-4xl">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Settings
        </h2>
        <p className="text-gray-500 mt-1 font-medium">
          Konfigurasi AI (server proxy + BYOK opsional).
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex items-center justify-center">
            <KeyRound size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">
              AI Configuration (OpenAI-compatible)
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Chat selalu lewat <code className="font-mono">/api/chat</code> di
              server. Key default dari env server; BYOK di bawah opsional.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#3B82F6]/5 dark:bg-[#3B82F6]/10 border border-blue-100 dark:border-blue-900/20 rounded-xl space-y-2.5 text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
          <p className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5 text-sm">
            <ShieldCheck className="text-blue-600" size={16} /> Cara kerja
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <strong>Server default:</strong> set{" "}
              <code className="font-mono bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] px-1.5 py-0.5 rounded">
                AI_ENDPOINT
              </code>
              ,{" "}
              <code className="font-mono bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] px-1.5 py-0.5 rounded">
                AI_API_KEY
              </code>
              ,{" "}
              <code className="font-mono bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] px-1.5 py-0.5 rounded">
                AI_MODEL
              </code>{" "}
              di file <code className="font-mono">.env.local</code> (lihat{" "}
              <code className="font-mono">.env.example</code>).
            </li>
            <li>
              <strong>BYOK (opsional):</strong> isi form di bawah. Disimpan di{" "}
              <em>browser localStorage</em> saja, dikirim ke server proxy saat
              chat (tidak di-commit ke git).
            </li>
            <li>
              Default lokal: endpoint{" "}
              <code className="font-mono">http://127.0.0.1:20128/v1</code>{" "}
              (9router).
            </li>
          </ol>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Endpoint
            <input
              type="url"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="http://127.0.0.1:20128/v1"
              className="mt-1 w-full px-3 py-2 text-sm border rounded-xl dark:bg-gray-800 dark:border-gray-700"
            />
          </label>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            API Key (BYOK)
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-... (kosongkan = pakai server env)"
              autoComplete="off"
              className="mt-1 w-full px-3 py-2 text-sm border rounded-xl dark:bg-gray-800 dark:border-gray-700"
            />
          </label>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Model
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="XM/mimo-v2.5-pro"
              className="mt-1 w-full px-3 py-2 text-sm border rounded-xl dark:bg-gray-800 dark:border-gray-700"
            />
          </label>
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3B82F6] text-white text-sm font-bold rounded-xl"
            >
              <Save size={14} /> Simpan BYOK
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-4 py-2 border text-sm font-semibold rounded-xl text-gray-600 dark:text-gray-300 dark:border-gray-700"
            >
              <Trash2 size={14} /> Hapus BYOK
            </button>
            {msg && (
              <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                <Check size={14} /> {msg}
              </span>
            )}
          </div>
        </form>

        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">
            Application Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 font-semibold block">Version</span>
              <span className="text-gray-900 dark:text-white font-extrabold mt-0.5 block">
                v1.2.1 (security patch)
              </span>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 font-semibold block">
                AI ingress
              </span>
              <span className="text-gray-900 dark:text-white font-extrabold mt-0.5 block">
                /api/chat (server proxy)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
