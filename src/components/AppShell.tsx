"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  MobileTopBar,
  MobileBottomNav,
} from "@/components/layout/Sidebar";
import { useShopStock } from "@/lib/use-shop-stock";

interface AppShellProps {
  children: React.ReactNode;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { source, warning, loading } = useShopStock();
  const snapshotLag = !loading && source !== "live";

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
    else if (saved === "light") document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="min-h-screen bg-tokobg flex flex-col md:flex-row font-sans">
      {snapshotLag && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-amber-50 border-b border-amber-200 text-amber-800 px-4 py-2 text-xs md:text-sm flex items-center justify-between font-sans md:pl-64">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="truncate">
              <strong>Snapshot Mode:</strong>{" "}
              {warning ||
                "Menampilkan data stok offline. Live POS baca-saja tidak aktif."}
            </span>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-amber-800 hover:underline font-medium ml-2 shrink-0"
          >
            Refresh
          </button>
        </div>
      )}

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isMobile={isMobile}
      />

      <div
        className={`flex-1 md:pl-64 flex flex-col min-h-screen ${
          snapshotLag ? "pt-10 md:pt-10" : ""
        }`}
      >
        <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 py-6 md:p-8 w-full max-w-6xl mx-auto pb-24 md:pb-8">
          {children}
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
