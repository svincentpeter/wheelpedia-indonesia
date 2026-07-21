"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Layers,
  Sparkles,
  Database,
  BookOpen,
  Award,
  ChevronRight,
  Menu,
  X,
  Calculator,
  Scale,
  Heart,
  History,
  FolderOpen,
  Disc,
  Settings,
  HelpCircle,
  Package,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

const primaryNav = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home },
  {
    id: "counter",
    label: "Buka Counter",
    href: "/counter",
    icon: Search,
    badge: "P0",
  },
  { id: "stok", label: "Stok OmahBan", href: "/stok", icon: Layers },
  {
    id: "ai",
    label: "Tanya Asisten AI",
    href: "/ai-assistant",
    icon: Sparkles,
    highlight: true,
  },
  {
    id: "vehicles",
    label: "Database Mobil",
    href: "/vehicles",
    icon: Database,
  },
  {
    id: "learning",
    label: "Belajar & Quiz",
    href: "/learning",
    icon: BookOpen,
  },
  { id: "brands", label: "Panduan Merk", href: "/brands", icon: Award },
];

const secondaryGroups = [
  {
    title: "Database",
    items: [
      { id: "tires", label: "Database Ban", href: "/tires", icon: Disc },
      { id: "wheels", label: "Database Velg", href: "/wheels", icon: Package },
    ],
  },
  {
    title: "Alat Bantu",
    items: [
      {
        id: "calculators",
        label: "Kalkulator",
        href: "/calculators",
        icon: Calculator,
      },
      {
        id: "comparison",
        label: "Comparison",
        href: "/comparison",
        icon: Scale,
      },
    ],
  },
  {
    title: "Personal",
    items: [
      { id: "catalog", label: "Katalog Saya", href: "/catalog", icon: FolderOpen },
      { id: "bookmarks", label: "Bookmark", href: "/bookmarks", icon: Heart },
      { id: "history", label: "History", href: "/history", icon: History },
    ],
  },
];

function isActivePath(pathname: string, href: string, id: string): boolean {
  if (pathname === href) return true;
  if (id === "learning" && (pathname.startsWith("/learning") || pathname === "/quiz" || pathname === "/glossary"))
    return true;
  if (id === "vehicles" && pathname.startsWith("/vehicles")) return true;
  if (id === "brands" && pathname.startsWith("/brands")) return true;
  if (id === "ai" && pathname.startsWith("/ai-assistant")) return true;
  if (id === "stok" && pathname.startsWith("/stok")) return true;
  if (id === "counter" && pathname.startsWith("/counter")) return true;
  if (id === "calculators" && pathname.startsWith("/calculators")) return true;
  return false;
}

export function Sidebar({ isOpen, setIsOpen, isMobile }: SidebarProps) {
  const pathname = usePathname();

  const navButtonClass = (active: boolean, highlight?: boolean) =>
    `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
      active
        ? "bg-tokoterracotta text-white shadow-xs font-semibold"
        : highlight
          ? "bg-tokoterracotta/15 text-tokoterracotta border border-tokoterracotta/30 hover:bg-tokoterracotta/25"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  const sidebarBody = (
    <div className="flex flex-col h-full bg-tokosidebar text-white">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-tokoterracotta flex items-center justify-center text-white font-display font-bold text-xl shadow-md shrink-0">
            W
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-lg tracking-tight text-white leading-tight">
              Wheelpedia
            </h1>
            <p className="text-xs text-tokoterracotta font-bold tracking-wider uppercase">
              OmahBan Asisten
            </p>
          </div>
        </div>
        {isMobile && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800 text-white"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 custom-scrollbar">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const active = isActivePath(pathname, item.href, item.id);
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={navButtonClass(active, item.highlight)}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={active ? "text-white" : "text-slate-400"}
                />
                <span>{item.label}</span>
              </div>
              {item.badge ? (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    active
                      ? "bg-white text-tokonavy"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {item.badge}
                </span>
              ) : (
                <ChevronRight
                  size={14}
                  className={active ? "text-white" : "text-slate-500"}
                />
              )}
            </Link>
          );
        })}

        <div className="pt-4 mt-2 border-t border-slate-800 space-y-4">
          {secondaryGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3">
                {group.title}
              </h3>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(pathname, item.href, item.id);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => isMobile && setIsOpen(false)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    <Icon size={15} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center gap-3 p-2 bg-slate-800/40 rounded-xl border border-slate-800/60">
          <div className="w-8 h-8 rounded-full bg-tokoterracotta flex items-center justify-center font-bold text-xs text-white">
            B
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">Pak Budi</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Counter Staff
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Link
            href="/settings"
            onClick={() => isMobile && setIsOpen(false)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Settings size={12} /> Setting
          </Link>
          <Link
            href="/support"
            onClick={() => isMobile && setIsOpen(false)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <HelpCircle size={12} /> Support
          </Link>
        </div>
        <p className="text-[10px] text-slate-500 text-center font-mono">
          Wheelpedia ID · <span className="text-tokoterracotta">Mode Biru & Putih</span>
        </p>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <aside
          className={`fixed top-0 bottom-0 left-0 z-50 h-screen w-72 max-w-[80vw] transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          {sidebarBody}
        </aside>
      </>
    );
  }

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-tokosidebar border-r border-slate-800 fixed top-0 left-0 z-30 shrink-0">
      {sidebarBody}
    </aside>
  );
}

export function MobileTopBar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-tokosidebar border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-tokoterracotta flex items-center justify-center text-white font-display font-bold text-lg">
          W
        </div>
        <div>
          <h1 className="font-display font-bold text-sm tracking-tight text-white">
            Wheelpedia
          </h1>
          <p className="text-[10px] text-tokoterracotta font-semibold tracking-wider uppercase">
            OmahBan Asisten
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-slate-800 text-white"
        aria-label="Buka menu"
      >
        <Menu size={20} />
      </button>
    </header>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const items = [
    { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home },
    { id: "counter", label: "Counter", href: "/counter", icon: Search },
    { id: "stok", label: "Stok", href: "/stok", icon: Layers },
    { id: "ai", label: "Tanya AI", href: "/ai-assistant", icon: Sparkles },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-tokocream flex justify-around items-center py-2 px-2 shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href ||
          (item.id === "ai" && pathname.startsWith("/ai-assistant"));
        return (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center justify-center flex-1 h-12 select-none relative"
            aria-label={item.label}
          >
            <div
              className={`p-1 rounded-lg transition-all ${
                active
                  ? "text-tokoterracotta bg-tokoterracotta/10"
                  : "text-tokonavy/60"
              }`}
            >
              <Icon size={20} />
            </div>
            <span
              className={`text-[9px] font-medium tracking-tight mt-0.5 ${
                active
                  ? "text-tokoterracotta font-semibold"
                  : "text-tokonavy/70"
              }`}
            >
              {item.label}
            </span>
            {active && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-tokoterracotta rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

