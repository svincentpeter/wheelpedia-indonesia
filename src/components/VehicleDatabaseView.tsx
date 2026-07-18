import React, { useState } from "react";
import { Sparkles, Search, ArrowLeft, ArrowRight, ShieldAlert, BadgeInfo } from "lucide-react";
import { VEHICLES } from "../data";
import { Vehicle } from "../types";

interface VehicleDatabaseViewProps {
  onNavigateToAssistant: (initialPrompt?: string) => void;
  searchQuery: string;
  selectedVehicleId: string | null;
  setSelectedVehicleId: (id: string | null) => void;
}

export default function VehicleDatabaseView({
  onNavigateToAssistant,
  searchQuery,
  selectedVehicleId,
  setSelectedVehicleId,
}: VehicleDatabaseViewProps) {
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("All");

  // Get active vehicle object if any
  const selectedVehicle = VEHICLES.find((v) => v.id === selectedVehicleId);

  // Filter vehicles based on search and brand
  const filteredVehicles = VEHICLES.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrandFilter === "All" || vehicle.brand === selectedBrandFilter;

    return matchesSearch && matchesBrand;
  });

  const handleAskAggressive = (vehicle: Vehicle) => {
    onNavigateToAssistant(
      `Bagaimana rekomendasi setup velg lebar (agresif fitment) dan offset (ET) yang pas untuk ${vehicle.brand} ${vehicle.name} agar kelihatan padat/rata bodi tanpa gosrok fender?`
    );
  };

  const brands = ["All", ...Array.from(new Set(VEHICLES.map((v) => v.brand)))];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* 1. LIST VIEW (Vehicle Gallery) */}
      {!selectedVehicle ? (
        <div className="space-y-6">
          {/* Header & Sub */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Vehicle Specs Database</h2>
            <p className="text-gray-500 mt-1 font-medium">Database PCD, Center Bore, dan spesifikasi ban OEM mobil Indonesia.</p>
          </div>

          {/* Brands Filter */}
          <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-none">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrandFilter(brand)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                  selectedBrandFilter === brand
                    ? "bg-[#3B82F6] text-white shadow-md shadow-blue-500/10"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Vehicle Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.brand} ${vehicle.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md">
                        {vehicle.type}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-5 space-y-2">
                      <h4 className="text-lg font-extrabold text-gray-900 dark:text-white group-hover:text-[#3B82F6] transition-colors">
                        {vehicle.brand} {vehicle.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">Years: {vehicle.years}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {vehicle.description}
                      </p>
                    </div>
                  </div>

                  {/* Specs Quick Summary Footer */}
                  <div className="p-5 border-t border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-semibold">PCD: <strong className="text-gray-700 dark:text-gray-300">{vehicle.pcd}</strong></span>
                    <span className="text-[#3B82F6] font-bold flex items-center gap-1 group-hover:underline">
                      View Specs <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 p-12 text-center rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-gray-400 font-semibold">
              <BadgeInfo className="mx-auto text-gray-300 mb-4" size={48} />
              Tidak ada hasil untuk filter atau pencarian Anda.
            </div>
          )}
        </div>
      ) : (
        
        // 2. DETAILED VIEW (Screen 3 specs sheet)
        <div className="space-y-6">
          {/* Back Trigger & Breadcrumbs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={() => setSelectedVehicleId(null)}
              className="text-xs font-bold text-[#3B82F6] hover:underline flex items-center gap-1.5 self-start"
            >
              ← Back to Database Gallery
            </button>
            <div className="text-xs text-gray-400 font-semibold">
              Vehicle Database / {selectedVehicle.brand} / <span className="text-gray-750 dark:text-gray-300 font-bold">{selectedVehicle.name}</span>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-sm group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url('${selectedVehicle.image}')` }}
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/35 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-left space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-xs border border-white/30">
                  {selectedVehicle.type}
                </span>
                <span className="px-3 py-1 bg-[#3B82F6] backdrop-blur-md rounded-full text-white font-bold text-xs">
                  {selectedVehicle.years}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                {selectedVehicle.brand} {selectedVehicle.name}
              </h2>
              <p className="text-gray-200 text-sm max-w-2xl leading-relaxed">
                {selectedVehicle.description}
              </p>
            </div>
          </div>

          {/* Main Specifications Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Spec Cards Column */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex items-center justify-center font-bold">
                  <BadgeInfo size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Factory Wheel Specifications</h3>
              </div>

              {/* 4-Column Bento Spec Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center border border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">PCD</p>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">{selectedVehicle.pcd}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center border border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Center Bore</p>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {selectedVehicle.cb}
                    <span className="text-xs font-normal text-gray-400 ml-0.5">mm</span>
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center border border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Nut Size</p>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">{selectedVehicle.nutSize}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center border border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Engine</p>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white truncate" title={selectedVehicle.engine}>
                    {selectedVehicle.engine.split(" ")[0]}
                  </p>
                </div>
              </div>

              {/* Trim and OEM Tire sizes */}
              <div className="space-y-3 pt-4">
                <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  OEM Tire Sizes by Trim
                </h4>
                <div className="space-y-2.5">
                  {selectedVehicle.tireSizes.map((trim, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                    >
                      <span className="text-xs text-gray-700 dark:text-gray-300 font-bold">{trim.trim}</span>
                      <span className="font-mono text-xs font-bold bg-white dark:bg-gray-900 text-[#3B82F6] border border-blue-100 dark:border-blue-900/50 px-3 py-1.5 rounded-lg shadow-sm">
                        {trim.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Fitment Insight Column */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#3B82F6] to-blue-700 rounded-3xl shadow-md p-6 text-white flex flex-col justify-between text-left relative overflow-hidden min-h-[300px]">
              {/* Backglow sparkles */}
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Sparkles size={120} />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-extrabold text-base">
                  <Sparkles size={20} />
                  AI Fitment Insight
                </div>
                <p className="text-xs leading-relaxed text-blue-50/90 font-medium relative z-10">
                  {selectedVehicle.aiInsight}
                </p>
              </div>

              <button
                onClick={() => handleAskAggressive(selectedVehicle)}
                className="mt-8 w-full py-3 bg-white text-[#3B82F6] hover:bg-blue-50 transition-colors rounded-xl text-xs font-bold shadow-md relative z-10"
              >
                Ask about aggressive fitment
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
