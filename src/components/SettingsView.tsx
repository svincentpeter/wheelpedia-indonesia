import React from "react";
import { Settings, ShieldCheck, KeyRound } from "lucide-react";

export default function SettingsView() {
  return (
    <div className="space-y-8 animate-fade-in text-left max-w-4xl">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Settings</h2>
        <p className="text-gray-500 mt-1 font-medium">Configure preferences and API parameters safely.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex items-center justify-center">
            <KeyRound size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Gemini AI API Configuration</h3>
            <p className="text-xs text-gray-400 mt-0.5">Integration secrets are managed securely server-side.</p>
          </div>
        </div>

        <div className="p-4 bg-[#3B82F6]/5 dark:bg-[#3B82F6]/10 border border-blue-100 dark:border-blue-900/20 rounded-xl space-y-2.5 text-xs text-gray-600 dark:text-gray-450 font-medium leading-relaxed">
          <p className="font-bold text-gray-800 dark:text-gray-250 flex items-center gap-1.5 text-sm">
            <ShieldCheck className="text-blue-600" size={16} /> Key Security Standard
          </p>
          <p>
            Wheelpedia Indonesia uses full-stack encapsulation (server-side proxy) to prevent credentials exposure. Your Gemini API Key is never transmitted or exposed to the browser.
          </p>
          <p className="font-semibold text-gray-750 dark:text-gray-350">
            Cara Mengatur API Key Anda:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-500 dark:text-gray-400">
            <li>Buka menu panel <strong>Secrets</strong> di pojok kanan bawah editor AI Studio UI.</li>
            <li>Tambahkan kunci rahasia bernama <code className="font-mono bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] px-1.5 py-0.5 rounded font-bold">GEMINI_API_KEY</code>.</li>
            <li>Isi nilainya dengan API Key Gemini Anda yang valid.</li>
            <li>Aplikasi akan secara otomatis menghubungkan chat interaktif Anda secara real-time!</li>
          </ol>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">Application Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-850/50 rounded-xl border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 font-semibold block">Version</span>
              <span className="text-gray-900 dark:text-white font-extrabold mt-0.5 block">v1.2.0 (Indonesia Edition)</span>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-850/50 rounded-xl border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 font-semibold block">Runtime Ingress</span>
              <span className="text-gray-900 dark:text-white font-extrabold mt-0.5 block">Port 3000 (Secure Server)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
