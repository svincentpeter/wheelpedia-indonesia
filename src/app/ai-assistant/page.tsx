"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { ChatHistory } from "@/types";
import { DEFAULT_CHAT_HISTORIES } from "@/data";
import { writeJson } from "@/lib/browser-storage";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const AiAssistantView = dynamic(() => import("@/components/AiAssistantView"), {
  ssr: false,
});

function AIAssistantPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promptParam = searchParams.get("prompt");

  const [chatHistories, setChatHistoriesState] = useState<ChatHistory[]>(() => {
    if (typeof window === "undefined") return DEFAULT_CHAT_HISTORIES;
    try {
      const raw = localStorage.getItem("chatHistories");
      if (raw) return JSON.parse(raw) as ChatHistory[];
    } catch {
      // ignore
    }
    return DEFAULT_CHAT_HISTORIES;
  });

  const [activeChatId, setActiveChatIdState] = useState<string | null>(() => {
    if (typeof window === "undefined") return "hist-1";
    return localStorage.getItem("activeChatId") || "hist-1";
  });

  const setChatHistories = (
    value: ChatHistory[] | ((prev: ChatHistory[]) => ChatHistory[]),
  ) => {
    setChatHistoriesState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      writeJson("chatHistories", next);
      return next;
    });
  };

  const setActiveChatId = (id: string | null) => {
    setActiveChatIdState(id);
    if (typeof window === "undefined") return;
    if (id) localStorage.setItem("activeChatId", id);
    else localStorage.removeItem("activeChatId");
  };

  const handleClearInitialPrompt = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("prompt");
    const qs = params.toString();
    router.replace(qs ? `/ai-assistant?${qs}` : "/ai-assistant");
  };

  return (
    <AppShell>
      <AiAssistantView
        chatHistories={chatHistories}
        setChatHistories={setChatHistories}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        initialPromptToSend={promptParam}
        onClearInitialPrompt={handleClearInitialPrompt}
      />
    </AppShell>
  );
}

export default function AIAssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-400 font-medium animate-pulse">
          Loading AI Assistant...
        </div>
      }
    >
      <AIAssistantPageContent />
    </Suspense>
  );
}
