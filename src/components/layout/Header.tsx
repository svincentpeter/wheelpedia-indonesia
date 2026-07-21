"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Bell, Moon, Sun, User } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  toggleDark: () => void;
  onMenuClick: () => void;
  sidebarOpen?: boolean;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export function Header({
  isDark,
  toggleDark,
  onMenuClick,
  searchQuery = "",
  setSearchQuery,
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Generate breadcrumbs or header title based on current pathname
  const getHeaderTitle = () => {
    if (pathname === "/dashboard") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Home</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Dashboard</span>
        </div>
      );
    } else if (pathname.startsWith("/learning/velg")) {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Edukasi</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Belajar Velg</span>
        </div>
      );
    } else if (pathname.startsWith("/learning")) {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Edukasi</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Belajar Ban</span>
        </div>
      );
    } else if (pathname === "/vehicles") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Database</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Database Mobil</span>
        </div>
      );
    } else if (pathname === "/tires") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Database</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Database Ban</span>
        </div>
      );
    } else if (pathname === "/wheels") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Database</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Database Velg</span>
        </div>
      );
    } else if (pathname === "/brands") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Database</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Brand Library</span>
        </div>
      );
    } else if (pathname === "/catalog") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Katalog</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Katalog Saya</span>
        </div>
      );
    } else if (pathname === "/ai-assistant") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>AI Assistant</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Rekomendasi Ban &amp; Velg</span>
        </div>
      );
    } else if (pathname === "/calculators") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Alat Bantu</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Calculators</span>
        </div>
      );
    } else if (pathname === "/comparison") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Alat Bantu</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Comparison</span>
        </div>
      );
    } else if (pathname === "/bookmarks") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Personal</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Bookmark</span>
        </div>
      );
    } else if (pathname === "/history") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Personal</span>
          <span>/</span>
          <span className="text-[#3B82F6]">History</span>
        </div>
      );
    } else if (pathname === "/glossary") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Edukasi</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Glossary</span>
        </div>
      );
    } else if (pathname === "/settings") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Setting</span>
          <span>/</span>
          <span className="text-[#3B82F6]">General Configuration</span>
        </div>
      );
    } else if (pathname === "/support") {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Support</span>
          <span>/</span>
          <span className="text-[#3B82F6]">Contact &amp; Feedback</span>
        </div>
      );
    } else {
      return <span className="font-bold text-gray-800 dark:text-white uppercase tracking-wider text-xs">Wheelpedia ID</span>;
    }
  };

  const handleCompare = () => {
    router.push("/comparison");
  };

  const handleUploadCatalogClick = () => {
    router.push("/catalog?tab=upload");
  };

  const showSearch = pathname === "/vehicles" || pathname === "/dashboard" || pathname === "/glossary" || pathname === "/tires";

  return (
    <header className="sticky top-0 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md border-b border-gray-100 dark:border-gray-850 h-16 px-6 flex justify-between items-center z-20 w-full flex-shrink-0">
      {/* Left side: Hamburger on mobile, Breadcrumbs on desktop */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:block">
          {getHeaderTitle()}
        </div>

        {/* Mobile Applet Title */}
        <div className="md:hidden font-black text-sm text-[#3B82F6] tracking-tight uppercase">
          Wheelpedia
        </div>
      </div>

      {/* Center: Search (hidden on mobile) */}
      <div className="hidden sm:flex items-center gap-6 flex-1 max-w-xs md:max-w-md mx-4">
        {showSearch && setSearchQuery && (
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              placeholder={
                pathname === "/vehicles"
                  ? "Cari mobil (e.g. Innova)..."
                  : pathname === "/glossary"
                  ? "Cari istilah (e.g. PCD)..."
                  : pathname === "/tires"
                  ? "Cari ukuran ban (e.g. 185/65)..."
                  : "Cari topik..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-250 dark:border-gray-700 focus:border-[#3B82F6] focus:bg-white dark:focus:bg-gray-900 rounded-full text-xs font-semibold transition-all focus:outline-none dark:text-white"
            />
          </div>
        )}
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Actions (Desktop only) */}
        <div className="hidden lg:flex items-center gap-2 border-r border-gray-150 dark:border-gray-800 pr-4">
          <button
            onClick={handleUploadCatalogClick}
            className="text-gray-500 dark:text-gray-400 hover:text-[#3B82F6] dark:hover:text-[#3B82F6] font-bold text-xs py-2 px-3 transition-colors"
          >
            Upload Catalog
          </button>
          <button
            onClick={handleCompare}
            className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs py-2 px-3.5 rounded-lg transition-colors shadow-sm"
          >
            Compare
          </button>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleDark}
            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-850 hover:text-[#3B82F6] rounded-full transition-colors"
            title="Toggle Dark Mode"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-850 hover:text-[#3B82F6] rounded-full transition-colors relative"
            title="Notifications"
          >
            <Bell size={17} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="ml-2 pl-2 border-l border-gray-150 dark:border-gray-800 flex items-center">
          <div className="w-8 h-8 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm hover:border-[#3B82F6] transition-colors cursor-pointer flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            <User size={15} aria-label="Profil" />
          </div>
        </div>
      </div>
    </header>
  );
}
