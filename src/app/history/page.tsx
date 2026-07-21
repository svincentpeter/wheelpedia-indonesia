"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { History, Trash2, MessageSquare } from "lucide-react";
import type { ChatHistory } from "@/types";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

function readHistories(): ChatHistory[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("chatHistories");
    if (raw) return JSON.parse(raw) as ChatHistory[];
  } catch {
    // ignore
  }
  return [];
}

export default function HistoryPage() {
  const [histories, setHistories] = useState<ChatHistory[]>(() =>
    readHistories(),
  );

  const clearAll = () => {
    localStorage.removeItem("chatHistories");
    localStorage.removeItem("activeChatId");
    setHistories([]);
  };

  const openChat = (id: string) => {
    localStorage.setItem("activeChatId", id);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <History size={24} /> Riwayat Chat AI
          </h1>
          {histories.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 size={14} /> Hapus Semua
            </button>
          )}
        </div>

        {histories.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-12 border border-gray-200 dark:border-gray-800 text-center">
            <History className="mx-auto mb-4 text-gray-300" size={40} />
            <p className="text-gray-500">Belum ada riwayat chat</p>
            <Link
              href="/ai-assistant"
              className="inline-block mt-3 text-sm font-bold text-[#3B82F6]"
            >
              Mulai chat AI
            </Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {histories.map((h) => (
              <li key={h.id}>
                <Link
                  href="/ai-assistant"
                  onClick={() => openChat(h.id)}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-[#3B82F6] transition-colors"
                >
                  <MessageSquare size={18} className="text-[#3B82F6] shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="font-semibold text-sm truncate">{h.title}</p>
                    <p className="text-xs text-gray-400">
                      {h.dateLabel} · {h.messages?.length ?? 0} pesan
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
