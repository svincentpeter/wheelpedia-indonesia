import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Paperclip, Copy, RefreshCw, ThumbsUp, ThumbsDown, MessageSquare, History, Check, AlertCircle } from "lucide-react";
import { ChatHistory, ChatMessage } from "../types";
import { DEFAULT_CHAT_HISTORIES } from "../data";
import { sendChatMessage, SYSTEM_PROMPT } from "@/lib/ai";
import { renderMarkdown } from "@/lib/utils";

interface AiAssistantViewProps {
  chatHistories: ChatHistory[];
  setChatHistories: (value: ChatHistory[] | ((prev: ChatHistory[]) => ChatHistory[])) => void;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  initialPromptToSend?: string | null;
  onClearInitialPrompt?: () => void;
}

export default function AiAssistantView({
  chatHistories,
  setChatHistories,
  activeChatId,
  setActiveChatId,
  initialPromptToSend,
  onClearInitialPrompt,
}: AiAssistantViewProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackIds, setFeedbackIds] = useState<{ [key: string]: "up" | "down" }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chatHistories.find((c) => c.id === activeChatId) || chatHistories[0];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isLoading]);

  // Handle deep-link prompts from dashboard/database/specs
  useEffect(() => {
    if (initialPromptToSend) {
      handleSendPrompt(initialPromptToSend);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPromptToSend]);

  const handleSendPrompt = async (text: string) => {
    if (!text.trim()) return;
    setErrorMessage(null);

    // Create user message
    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: text,
      date: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    // Pre-populate histories state with user message and an empty model message for streaming
    const modelMsgId = "msg-" + (Date.now() + 1);
    const modelMsg: ChatMessage = {
      id: modelMsgId,
      role: "model",
      content: "",
      date: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedHistories = chatHistories.map((chat) => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, userMsg, modelMsg],
        };
      }
      return chat;
    });

    setChatHistories(updatedHistories);
    setInputText("");
    setIsLoading(true);

    try {
      // Get all messages from active chat for context, including the new user message
      const chatContext = updatedHistories.find((c) => c.id === activeChat.id)?.messages || [];
      // Remove the last empty model message from context
      const contextWithoutLast = chatContext.slice(0, -1);
      
      const messagesPayload = contextWithoutLast.map((m) => ({
        role: (m.role === "model" ? "assistant" : "user") as "user" | "assistant" | "system",
        content: m.content,
      }));

      const chatMessages = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...messagesPayload,
      ];

      await sendChatMessage(chatMessages, (chunk) => {
        setChatHistories((prev) =>
          prev.map((chat) => {
            if (chat.id === activeChat.id) {
              return {
                ...chat,
                messages: chat.messages.map((m) => {
                  if (m.id === modelMsgId) {
                    return { ...m, content: m.content + chunk };
                  }
                  return m;
                }),
              };
            }
            return chat;
          })
        );
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Gagal menghubungkan ke AI server.");
      
      // Update the empty model message with fallback/error text
      setChatHistories((prev) =>
        prev.map((chat) => {
          if (chat.id === activeChat.id) {
            return {
              ...chat,
              messages: chat.messages.map((m) => {
                if (m.id === modelMsgId) {
                  return {
                    ...m,
                    content: `Maaf, terjadi kesalahan saat menghubungkan ke AI. Pastikan API server berjalan di localhost:20128.\n\n[Detail Error]: ${err.message || "Unknown error"}`,
                  };
                }
                return m;
              }),
            };
          }
          return chat;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(inputText);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: "up" | "down") => {
    setFeedbackIds((prev) => ({ ...prev, [id]: type }));
  };

  const handleNewChat = () => {
    const newId = "chat-" + Date.now();
    const newChat: ChatHistory = {
      id: newId,
      title: "New Consultations",
      category: "Tires",
      dateLabel: "Today",
      messages: [
        {
          id: "initial-" + Date.now(),
          role: "model",
          content: "Halo! Saya Wheelpedia AI, asisten spesialis velg dan ban mobil Indonesia. Tanyakan kepada saya tentang PCD, offset ideal, atau rekomendasi ban terbaik untuk mobil harian Anda.",
        },
      ],
    };

    setChatHistories([newChat, ...chatHistories]);
    setActiveChatId(newId);
  };

  const handleHistorySelect = (id: string) => {
    setActiveChatId(id);
    setErrorMessage(null);
  };

  // Quick Chips
  const suggestionChips = [
    "Berapa harga Michelin Primacy 4?",
    "Perbandingan dengan Yokohama Advan dB",
    "Rekomendasi toko ban di Jakarta Selatan",
  ];

  return (
    <div className="flex h-[calc(100vh-100px)] border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm">
      
      {/* 1. History Sidebar (Left Panel) */}
      <div className="hidden md:flex flex-col w-[260px] border-r border-gray-100 dark:border-gray-800 flex-shrink-0 bg-gray-50/50 dark:bg-gray-850/20">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
          <span className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
            <History size={16} className="text-gray-400" />
            Chat History
          </span>
          <button
            onClick={handleNewChat}
            className="text-xs font-bold text-[#3B82F6] hover:underline"
          >
            + New
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-left">
          {/* Today section */}
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-3 mb-2">Today</p>
            <div className="space-y-1">
              {chatHistories
                .filter((c) => c.dateLabel === "Today")
                .map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleHistorySelect(chat.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold truncate flex items-center gap-2.5 transition-all ${
                      activeChat.id === chat.id
                        ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-150 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <MessageSquare size={14} className="flex-shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Previous 7 days */}
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-3 mb-2">Previous 7 Days</p>
            <div className="space-y-1">
              {chatHistories
                .filter((c) => c.dateLabel === "Previous 7 Days")
                .map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleHistorySelect(chat.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold truncate flex items-center gap-2.5 transition-all ${
                      activeChat.id === chat.id
                        ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-150 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <MessageSquare size={14} className="flex-shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Active Chat Panel (Right/Main Panel) */}
      <div className="flex-1 flex flex-col justify-between h-full relative bg-white dark:bg-gray-900">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/20 dark:bg-gray-850/10 text-left">
          <div>
            <h3 className="font-extrabold text-gray-900 dark:text-white text-sm leading-snug">{activeChat?.title || "Assistant AI"}</h3>
            <p className="text-[10px] text-gray-400 mt-0.5 font-semibold">Tanya teknis, ukuran PCD, offset, dan model kustom ban</p>
          </div>
          <div className="md:hidden">
            <button
              onClick={handleNewChat}
              className="px-3 py-1.5 bg-[#3B82F6] text-white font-bold text-xs rounded-lg shadow-sm"
            >
              + New Chat
            </button>
          </div>
        </div>

        {/* Chat Messages container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-left">
          {activeChat?.messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div key={msg.id} className={`flex gap-4 ${isUser ? "justify-end" : "justify-start animate-fade-in"}`}>
                
                {/* AI Avatar */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex-shrink-0 flex items-center justify-center shadow-sm font-bold">
                    <Sparkles size={16} />
                  </div>
                )}

                <div className={`flex flex-col max-w-[85%] md:max-w-[75%] space-y-1.5`}>
                  <div className={`p-4 rounded-2xl relative ${
                    isUser
                      ? "bg-[#3B82F6] text-white rounded-tr-sm shadow-md shadow-blue-500/5"
                      : "bg-[#F3F4F6] dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm border border-gray-100 dark:border-gray-700"
                  }`}>
                    {/* Render message formatting */}
                    <div className="text-sm leading-relaxed space-y-2">
                      {renderMarkdown(msg.content)}
                    </div>

                    {/* Citations block */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3.5 pt-2.5 border-t border-gray-200/50 dark:border-gray-700 flex flex-wrap items-center gap-1.5 text-[10px] text-gray-400">
                        <span className="font-bold uppercase tracking-wider">Citations:</span>
                        {msg.citations.map((cite, index) => (
                          <span key={index} className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-gray-650 dark:text-gray-300 font-semibold">
                            {cite}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message Actions (Copy / Rate) - model only */}
                  {!isUser && (
                    <div className="flex items-center gap-3.5 pl-1.5 text-gray-400 text-xs font-semibold">
                      <span className="text-[10px] text-gray-300 dark:text-gray-600 font-medium">{msg.date}</span>
                      <button
                        onClick={() => handleCopyText(msg.content, msg.id)}
                        className="hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check size={12} className="text-green-500" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleSendPrompt(activeChat.messages[activeChat.messages.length - 2]?.content || "")}
                        className="hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw size={12} /> Retry
                      </button>
                      <div className="flex items-center gap-1.5 border-l border-gray-100 dark:border-gray-800 pl-3">
                        <button
                          onClick={() => handleFeedback(msg.id, "up")}
                          className={`hover:text-[#3B82F6] transition-colors ${feedbackIds[msg.id] === "up" ? "text-[#3B82F6]" : ""}`}
                        >
                          <ThumbsUp size={12} />
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, "down")}
                          className={`hover:text-red-500 transition-colors ${feedbackIds[msg.id] === "down" ? "text-red-500" : ""}`}
                        >
                          <ThumbsDown size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}

          {/* AI is thinking loading display */}
          {isLoading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex-shrink-0 flex items-center justify-center font-bold">
                <Sparkles size={16} />
              </div>
              <div className="flex-1 max-w-[70%] space-y-2">
                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded-lg w-[40%]"></div>
                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded-lg w-[85%]"></div>
                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded-lg w-[60%]"></div>
              </div>
            </div>
          )}

          {/* API Key missing or other error display */}
          {errorMessage && (
            <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 p-4 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-350 font-medium">
              <AlertCircle size={16} className="text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Chat API Error</p>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips and Chat Form Input area */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          {/* Suggestion Chips (Desktop only, or if input is empty) */}
          {inputText === "" && !isLoading && (
            <div className="flex gap-2 mb-3.5 overflow-x-auto pb-1 scrollbar-none">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(chip)}
                  className="px-3.5 py-1.5 bg-gray-50 dark:bg-gray-800 hover:bg-[#3B82F6]/5 hover:border-[#3B82F6]/20 text-gray-500 hover:text-[#3B82F6] border border-gray-100 dark:border-gray-800 rounded-full text-xs font-bold transition-all flex-shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="relative flex items-center">
            <button
              type="button"
              className="absolute left-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              title="Attach File"
            >
              <Paperclip size={16} />
            </button>
            
            <input
              type="text"
              required
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tanya rekomendasi ban, offset, atau kalkulator..."
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:border-[#3B82F6] focus:bg-white dark:focus:bg-gray-900 rounded-full pl-11 pr-14 py-3.5 text-sm focus:outline-none transition-all focus:ring-0 font-medium dark:text-white"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="absolute right-2 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/10"
            >
              <Send size={15} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
