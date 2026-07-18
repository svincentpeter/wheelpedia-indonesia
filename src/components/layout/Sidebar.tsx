"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Car,
  Bookmark,
  Sparkles,
  Calculator,
  Settings,
  HelpCircle,
  MessageSquare,
  X,
  LayoutDashboard,
  BookMarked,
  Disc,
  Tag,
  Scale,
  Heart,
  History,
  FolderOpen,
  Wrench
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

export function Sidebar({ isOpen, setIsOpen, isMobile }: SidebarProps) {
  const pathname = usePathname();

  // Categorized Menu Groups
  const menuGroups = [
    {
      title: "Main Menu",
      items: [
        { id: "dashboard", name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { id: "assistant", name: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
        { id: "catalog", name: "Katalog Saya", href: "/catalog", icon: FolderOpen },
      ],
    },
    {
      title: "Edukasi & Istilah",
      items: [
        { id: "learning", name: "Belajar Ban", href: "/learning", icon: BookOpen },
        { id: "learning-velg", name: "Belajar Velg", href: "/learning/velg", icon: Wrench },
        { id: "glossary", name: "Glossary", href: "/glossary", icon: BookMarked },
      ],
    },
    {
      title: "Database Otomotif",
      items: [
        { id: "vehicles", name: "Database Mobil", href: "/vehicles", icon: Car },
        { id: "tires", name: "Database Ban", href: "/tires", icon: Disc },
        { id: "wheels", name: "Database Velg", href: "/wheels", icon: Disc },
        { id: "brands", name: "Brand Library", href: "/brands", icon: Tag },
      ],
    },
    {
      title: "Alat Bantu",
      items: [
        { id: "calculators", name: "Tire Calculator", href: "/calculators", icon: Calculator },
        { id: "wheel-calculator", name: "Wheel Calculator", href: "/calculators?tab=wheel", icon: Calculator },
        { id: "comparison", name: "Comparison", href: "/comparison", icon: Scale },
      ],
    },
    {
      title: "Personal",
      items: [
        { id: "bookmarks", name: "Bookmark", href: "/bookmarks", icon: Heart },
        { id: "history", name: "History", href: "/history", icon: History },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#111827] text-white p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#3B82F6] flex items-center justify-center font-extrabold text-xl text-white shadow-lg shadow-blue-500/20">
            W
          </div>
          <div className="text-left">
            <h1 className="font-bold text-lg leading-tight tracking-tight">Wheelpedia</h1>
            <p className="text-xs text-gray-400 font-medium">Indonesia Edition</p>
          </div>
        </div>
        {/* Close button on mobile */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Scrollable Navigation Groups */}
      <nav className="flex-1 overflow-y-auto space-y-5 pr-1 -mr-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1.5 text-left">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-1">
              {group.title}
            </h3>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                // Perfect matching for subpages
                const isActive = pathname === item.href || 
                  (item.id === "learning" && pathname.startsWith("/learning/ban")) ||
                  (item.id === "learning-velg" && pathname === "/learning/velg");
                
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => isMobile && setIsOpen(false)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-[#3B82F6] text-white shadow-md shadow-blue-500/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <IconComponent size={15} className={isActive ? "text-white" : "text-gray-400"} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Navigation (Static) */}
      <div className="border-t border-gray-800 pt-4 mt-4 space-y-0.5 flex-shrink-0">
        <Link
          href="/settings"
          onClick={() => isMobile && setIsOpen(false)}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
            pathname === "/settings" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Settings size={15} />
          <span>Setting</span>
        </Link>
        <Link
          href="/support"
          onClick={() => isMobile && setIsOpen(false)}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
            pathname === "/support" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <HelpCircle size={15} />
          <span>Support</span>
        </Link>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
            onClick={() => setIsOpen(false)}
          />
        )}
        <aside
          className={`fixed top-0 bottom-0 left-0 h-screen w-[260px] z-50 transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  return (
    <aside className="sticky top-0 left-0 h-screen w-[260px] flex-shrink-0 z-30 hidden md:block">
      {sidebarContent}
    </aside>
  );
}
