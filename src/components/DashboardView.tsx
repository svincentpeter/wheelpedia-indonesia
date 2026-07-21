"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Layers,
  Sparkles,
  BookOpen,
  Database,
  Award,
  Clock,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { useShopStock } from "@/lib/use-shop-stock";

interface DashboardViewProps {
  onModuleClick: (moduleId: string) => void;
  onVehicleClick: (vehicleId: string) => void;
  onNavigateToAssistant: (initialPrompt?: string) => void;
}

const shortcuts = [
  {
    title: "Buka Counter",
    description:
      "Cari mobil pelanggan, temukan ukuran standar pabrik & stok langsung di rak dalam <30 detik.",
    icon: Search,
    href: "/counter",
    bgColor: "bg-tokoterracotta/10",
    iconColor: "text-tokoterracotta",
  },
  {
    title: "Cek Stok Ban",
    description:
      "Lihat ketersediaan ban harian OmahBan, urutkan berdasarkan ukuran atau tier merk.",
    icon: Layers,
    href: "/stok",
    bgColor: "bg-emerald-50",
    iconColor: "text-tokogreen",
  },
  {
    title: "Diskusi AI OmahBan",
    description:
      "Minta panduan penjelasan ramah untuk meyakinkan pelanggan di tempat.",
    icon: Sparkles,
    href: "/ai-assistant",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-700",
  },
  {
    title: "Belajar & Quiz Mandiri",
    description:
      "Asah pemahaman PCD, Offset, dan Center Bore agar makin jago menjelaskan ke customer.",
    icon: BookOpen,
    href: "/learning",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-700",
  },
];

export default function DashboardView({
  onModuleClick,
  onVehicleClick,
  onNavigateToAssistant,
}: DashboardViewProps) {
  void onModuleClick;
  void onVehicleClick;
  void onNavigateToAssistant;

  const { items, source, loading } = useShopStock();
  const stats = useMemo(() => {
    const inStock = items.filter((i) => i.qty > 0).length;
    const out = items.filter((i) => i.qty === 0).length;
    return {
      vehicles: VEHICLES.length,
      inStock,
      out,
      totalStock: items.length,
    };
  }, [items]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-tokocream shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-tokoterracotta/5 rounded-full -mr-10 -mt-10" />
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-tokoterracotta/10 text-tokoterracotta">
            <span className="h-1.5 w-1.5 rounded-full bg-tokoterracotta animate-pulse" />
            Asisten Counter Aktif
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-tokoteal tracking-tight">
            Selamat Datang, Rekan OmahBan!
          </h2>
          <p className="text-sm md:text-base text-tokonavy/70 max-w-2xl leading-relaxed">
            Aplikasi ini mempermudah penjelasan yang{" "}
            <strong>jujur, berpengetahuan, dan meyakinkan</strong> tanpa membuat
            pelanggan menunggu lama. Bukan kasir — stok baca-saja, cek rak fisik.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-tokocream flex flex-col justify-between">
          <div className="flex items-center justify-between text-tokonavy/60">
            <span className="text-xs font-medium">Database Mobil</span>
            <Database size={16} className="text-tokonavy/40" />
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold tracking-tight text-tokonavy">
              {stats.vehicles}
            </p>
            <p className="text-[10px] text-tokonavy/50 mt-0.5">
              Model terdata lengkap
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-tokocream flex flex-col justify-between">
          <div className="flex items-center justify-between text-tokogreen">
            <span className="text-xs font-medium text-tokonavy/60">
              Tipe Ban Tersedia
            </span>
            <Layers size={16} className="text-tokogreen/80" />
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold tracking-tight text-tokogreen">
              {loading ? "…" : stats.inStock}
            </p>
            <p className="text-[10px] text-tokonavy/50 mt-0.5">
              Siap pasang di rak
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-tokocream flex flex-col justify-between">
          <div className="flex items-center justify-between text-tokored">
            <span className="text-xs font-medium text-tokonavy/60">
              Stok Kosong
            </span>
            <HelpCircle size={16} className="text-tokored/80" />
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold tracking-tight text-tokored">
              {loading ? "…" : stats.out}
            </p>
            <p className="text-[10px] text-tokonavy/50 mt-0.5">
              Butuh order / kosong
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-tokocream flex flex-col justify-between">
          <div className="flex items-center justify-between text-tokoterracotta">
            <span className="text-xs font-medium text-tokonavy/60">
              Tier Panduan
            </span>
            <Award size={16} className="text-tokoterracotta/80" />
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold tracking-tight text-tokonavy">
              3 Tier
            </p>
            <p className="text-[10px] text-tokonavy/50 mt-0.5">
              Budget · Mid · Premium
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-tokoteal">
          Aksi Cepat Counter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shortcuts.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group text-left bg-white p-5 rounded-xl border border-tokocream hover:border-tokoterracotta hover:shadow-xs transition-all duration-200 flex gap-4"
              >
                <div
                  className={`p-3 rounded-xl ${s.bgColor} ${s.iconColor} shrink-0 group-hover:scale-105 transition-transform`}
                >
                  <Icon size={24} />
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="font-display font-bold text-base text-tokonavy flex items-center gap-1.5">
                    {s.title}
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-tokoterracotta font-bold">
                      Buka →
                    </span>
                  </h4>
                  <p className="text-xs text-tokonavy/60 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 bg-tokowarmbg/40 rounded-xl p-5 border border-tokocream space-y-3">
          <h4 className="font-display font-bold text-base text-tokoteal flex items-center gap-2">
            <Clock size={16} className="text-tokoterracotta" />
            Tips Edukasi Customer Hari Ini
          </h4>
          <div className="bg-white p-4 rounded-lg border border-tokocream/50 space-y-2">
            <p className="text-xs font-bold text-tokoterracotta uppercase tracking-wider">
              Topik: PCD vs Offset (ET)
            </p>
            <p className="text-sm text-tokonavy/80 leading-relaxed">
              Jika customer bingung offset:{" "}
              <em>
                &quot;Offset (ET) itu seperti jempol kaki. ET terlalu kecil,
                velg mekar keluar spakbor — keliatan gagah tapi rawan mentok
                bodi saat muatan penuh.&quot;
              </em>
            </p>
          </div>
          <p className="text-[10px] text-tokonavy/50">
            Selengkapnya di tab{" "}
            <Link href="/learning" className="font-bold text-tokoterracotta">
              Belajar & Quiz
            </Link>
            .
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-tokocream space-y-3">
          <h4 className="font-display font-bold text-base text-tokoteal flex items-center gap-2">
            <TrendingUp size={16} className="text-tokoterracotta" />
            Status Sistem Data
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-tokobg">
              <span className="text-tokonavy/60">Stok POS</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-tokowarmbg text-tokoolive font-medium">
                {loading
                  ? "Loading…"
                  : source === "live"
                    ? "Live POS"
                    : "Snapshot"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-tokobg">
              <span className="text-tokonavy/60">Database Mobil</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-tokowarmbg text-tokoteal font-medium">
                Siap ({stats.vehicles})
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-tokonavy/60">SKU stok</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-tokowarmbg text-tokoteal font-medium">
                {loading ? "…" : stats.totalStock}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href="/vehicles"
              className="text-[11px] font-bold text-tokoterracotta hover:underline"
            >
              Database mobil
            </Link>
            <span className="text-tokocream">·</span>
            <Link
              href="/brands"
              className="text-[11px] font-bold text-tokoterracotta hover:underline"
            >
              Panduan merk
            </Link>
            <span className="text-tokocream">·</span>
            <Link
              href="/calculators"
              className="text-[11px] font-bold text-tokoterracotta hover:underline"
            >
              Kalkulator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
