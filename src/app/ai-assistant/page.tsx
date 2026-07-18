"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ChatHistory } from "@/types";
import { DEFAULT_CHAT_HISTORIES } from "@/data";

import { Suspense } from "react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const AiAssistantView = dynamic(() => import("@/components/AiAssistantView"), { ssr: false });

function AIAssistantPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const promptParam = searchParams.get("prompt");

  const [chatHistories, setChatHistoriesState] = useState<ChatHistory[]>([]);
  const [activeChatId, setActiveChatIdState] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const localHistories = localStorage.getItem("chatHistories");
    const localActiveChatId = localStorage.getItem("activeChatId");

    if (localHistories) {
      setChatHistoriesState(JSON.parse(localHistories));
    } else {
      setChatHistoriesState(DEFAULT_CHAT_HISTORIES);
    }

    if (localActiveChatId) {
      setActiveChatIdState(localActiveChatId);
    } else {
      setActiveChatIdState("hist-1");
    }

    setLoaded(true);
  }, []);

  const setChatHistories = (value: ChatHistory[] | ((prev: ChatHistory[]) => ChatHistory[])) => {
    setChatHistoriesState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      localStorage.setItem("chatHistories", JSON.stringify(next));
      return next;
    });
  };

  const setActiveChatId = (id: string | null) => {
    setActiveChatIdState(id);
    if (id) {
      localStorage.setItem("activeChatId", id);
    } else {
      localStorage.removeItem("activeChatId");
    }
  };

  const handleClearInitialPrompt = () => {
    // Remove the prompt param from the URL to avoid resending it on refresh
    const params = new URLSearchParams(searchParams.toString());
    params.delete("prompt");
    router.replace(`/ai-assistant?${params.toString()}`);
  };

  return (
    <AppShell>
      {loaded && (
        <AiAssistantView
          chatHistories={chatHistories}
          setChatHistories={setChatHistories}
          activeChatId={activeChatId}
          setActiveChatId={setActiveChatId}
          initialPromptToSend={promptParam}
          onClearInitialPrompt={handleClearInitialPrompt}
        />
      )}
    </AppShell>
  );
}

export default function AIAssistantPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-400 font-medium animate-pulse">
        Loading AI Assistant...
      </div>
    }>
      <AIAssistantPageContent />
    </Suspense>
  );
}
