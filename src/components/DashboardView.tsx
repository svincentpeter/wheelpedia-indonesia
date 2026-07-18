import React, { useState, useEffect } from "react";
import { Award, Car, Ruler, Bookmark, ChevronRight, Send, Sparkles } from "lucide-react";
import { TIRE_BRANDS, WHEEL_BRANDS } from "@/data/brands";
import { VEHICLES } from "@/data/vehicles";
import { TIRE_SIZES } from "@/data/tires";

interface DashboardViewProps {
  onModuleClick: (moduleId: string) => void;
  onVehicleClick: (vehicleId: string) => void;
  onNavigateToAssistant: (initialPrompt?: string) => void;
}

export default function DashboardView({
  onModuleClick,
  onVehicleClick,
  onNavigateToAssistant,
}: DashboardViewProps) {
  const [miniPrompt, setMiniPrompt] = useState("");
  const [catalogCount, setCatalogCount] = useState(0);

  useEffect(() => {
    const specs = localStorage.getItem("savedSpecs");
    if (specs) {
      setCatalogCount(JSON.parse(specs).length);
    } else {
      setCatalogCount(2); // fallback seed specs
    }
  }, []);

  const handleMiniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!miniPrompt.trim()) return;
    onNavigateToAssistant(miniPrompt);
    setMiniPrompt("");
  };

  const recentStudies = [
    {
      id: "dot-code",
      title: "Kode DOT Ban",
      subtitle: "Module: Dasar Ban • Last viewed 2h ago",
      icon: "hash",
      onClick: () => onModuleClick("dasar-ban"),
    },
    {
      id: "zenix-specs",
      title: "Toyota Innova OEM Specs",
      subtitle: "Database • Last viewed yesterday",
      icon: "car",
      onClick: () => onVehicleClick("innova-zenix"),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Greeting */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Selamat Datang, Budi!</h2>
        <p className="text-gray-500 mt-1 font-medium">Here's your learning overview for today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Stats, Progress, Recent) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Stats Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
              <Award className="text-[#3B82F6]" size={24} />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Jumlah Brand</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                  {(TIRE_BRANDS.length + WHEEL_BRANDS.length).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
              <Car className="text-[#3B82F6]" size={24} />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mobil Indonesia</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                  {VEHICLES.length.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
              <Ruler className="text-[#3B82F6]" size={24} />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tire Sizes</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                  {TIRE_SIZES.length.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
              <Bookmark className="text-[#3B82F6]" size={24} />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Catalog Saya</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                  {catalogCount.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          {/* Learning Progress Section */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Learning Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Progress 1: Dasar Ban */}
              <div className="flex items-center gap-5 bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="4.5" fill="transparent" />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#3B82F6"
                      strokeWidth="4.5"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * (1 - 0.85)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-base text-gray-900 dark:text-white">
                    85%
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Dasar Ban</h4>
                  <p className="text-xs text-gray-400 mt-1">Fundamental tire construction and specs.</p>
                  <button
                    onClick={() => onModuleClick("dasar-ban")}
                    className="mt-3 text-xs font-semibold text-[#3B82F6] hover:underline flex items-center gap-1.5"
                  >
                    Continue <span className="text-sm">→</span>
                  </button>
                </div>
              </div>

              {/* Progress 2: Offset & PCD */}
              <div className="flex items-center gap-5 bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="4.5" fill="transparent" />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#4B5563"
                      strokeWidth="4.5"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * (1 - 0.40)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-base text-gray-900 dark:text-white">
                    40%
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Offset &amp; PCD</h4>
                  <p className="text-xs text-gray-400 mt-1">Wheel fitment and geometry specifications.</p>
                  <button
                    onClick={() => onNavigateToAssistant("Jelaskan apa itu Offset dan PCD velg mobil?")}
                    className="mt-3 text-xs font-semibold text-[#3B82F6] hover:underline flex items-center gap-1.5"
                  >
                    Resume <span className="text-sm">→</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Recent Study Section */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Study</h3>
              <button
                onClick={() => onModuleClick("dasar-ban")}
                className="text-xs font-bold text-[#3B82F6] hover:underline"
              >
                View All
              </button>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentStudies.map((study) => (
                <li
                  key={study.id}
                  onClick={study.onClick}
                  className="py-4 flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 -mx-6 px-6 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex items-center justify-center font-bold">
                      {study.icon === "hash" ? "#" : <Car size={18} />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white group-hover:text-[#3B82F6] transition-colors">{study.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{study.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all" />
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Column (Wheelpedia AI Compact Chat Panel) */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-[calc(100vh-180px)] min-h-[500px] sticky top-24">
            {/* AI Panel Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 bg-blue-50/20 dark:bg-blue-900/10 rounded-t-2xl">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white relative shadow-sm">
                <Sparkles size={14} />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-950" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Wheelpedia AI</h3>
                <p className="text-[10px] text-gray-400 font-medium">Online • Ask me anything</p>
              </div>
            </div>

            {/* AI Panel Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30 dark:bg-gray-950/30">
              {/* Message 1 (AI) */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex-shrink-0 flex items-center justify-center shadow-sm">
                  <Sparkles size={12} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3.5 rounded-2xl rounded-tl-sm text-sm text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700 max-w-[85%]">
                  <p className="leading-relaxed">
                    Halo Budi! Ada pertanyaan tentang ukuran ban atau spesifikasi mobil hari ini?
                  </p>
                </div>
              </div>

              {/* Message 2 (User) */}
              <div className="flex gap-3 justify-end">
                <div className="bg-[#3B82F6] text-white p-3.5 rounded-2xl rounded-tr-sm text-sm shadow-sm max-w-[85%]">
                  <p className="leading-relaxed">Berapa tekanan angin ideal untuk ring 17?</p>
                </div>
              </div>

              {/* Message 3 (AI) */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex-shrink-0 flex items-center justify-center shadow-sm">
                  <Sparkles size={12} />
                </div>
                <div className="bg-[#3B82F6]/5 dark:bg-[#3B82F6]/10 p-3.5 rounded-2xl rounded-tl-sm text-sm text-gray-800 dark:text-gray-200 shadow-sm border border-[#3B82F6]/10 dark:border-blue-900/20 max-w-[85%] space-y-2">
                  <p className="leading-relaxed">
                    Tekanan angin ideal untuk Ring 17 umumnya berkisar antara <strong>32 - 35 PSI</strong>, tergantung pada profil ban dan muatan kendaraan. Untuk Innova, disarankan 33 PSI (depan) dan 35 PSI (belakang) jika muatan penuh.
                  </p>
                  <button
                    onClick={() => onVehicleClick("innova-zenix")}
                    className="text-xs font-bold text-[#3B82F6] bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-lg border border-blue-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors w-full text-center"
                  >
                    Lihat detail di database
                  </button>
                </div>
              </div>
            </div>

            {/* AI Panel Input Footer */}
            <form onSubmit={handleMiniSubmit} className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-2xl">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Tanya sesuatu..."
                  value={miniPrompt}
                  onChange={(e) => setMiniPrompt(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full pl-4 pr-12 py-3 text-sm focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] focus:outline-none transition-all focus:ring-0"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 w-8 h-8 bg-[#3B82F6] text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
