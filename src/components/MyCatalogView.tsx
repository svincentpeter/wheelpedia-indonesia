import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Bookmark, Trash2, Plus, ArrowRight, Gauge, Check, FileCheck2, Tag, UploadCloud, File, Loader2, Info } from "lucide-react";
import { SavedTireSpec, Vehicle } from "../types";
import { VEHICLES } from "../data";

interface MyCatalogViewProps {
  savedVehicles: string[];
  setSavedVehicles: (v: string[]) => void;
  savedSpecs: SavedTireSpec[];
  setSavedSpecs: (s: SavedTireSpec[]) => void;
  onVehicleClick: (vehicleId: string) => void;
}

interface CatalogFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "uploading" | "ocr" | "embedding" | "indexing" | "ready";
  progress: number;
  dateAdded: string;
}

export default function MyCatalogView({
  savedVehicles,
  setSavedVehicles,
  savedSpecs,
  setSavedSpecs,
  onVehicleClick,
}: MyCatalogViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab state: "specs" or "upload"
  const [activeTab, setActiveTab] = useState<"specs" | "upload">("specs");

  // Read URL tab param
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "upload") {
      setActiveTab("upload");
    } else {
      setActiveTab("specs");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "specs" | "upload") => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "upload") {
      params.set("tab", "upload");
    } else {
      params.delete("tab");
    }
    router.replace(`/catalog?${params.toString()}`);
  };

  // Add Spec Form State
  const [name, setName] = useState("");
  const [width, setWidth] = useState(185);
  const [aspect, setAspect] = useState(65);
  const [rim, setRim] = useState(15);
  const [isAdding, setIsAdding] = useState(false);

  // Uploaded Files State
  const [uploadedFiles, setUploadedFiles] = useState<CatalogFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Load files from localStorage on mount
  useEffect(() => {
    const localFiles = localStorage.getItem("uploadedFiles");
    if (localFiles) {
      setUploadedFiles(JSON.parse(localFiles));
    } else {
      const defaultFiles: CatalogFile[] = [
        {
          id: "file-1",
          name: "Catalog_Omah_Ban_V1.pdf",
          size: "4.2 MB",
          type: "PDF",
          status: "ready",
          progress: 100,
          dateAdded: "18 Jul 2026",
        },
        {
          id: "file-2",
          name: "Spesifikasi_Velg_Aftermarket.xlsx",
          size: "1.8 MB",
          type: "Excel",
          status: "ready",
          progress: 100,
          dateAdded: "17 Jul 2026",
        },
      ];
      setUploadedFiles(defaultFiles);
      localStorage.setItem("uploadedFiles", JSON.stringify(defaultFiles));
    }
  }, []);

  // Sync uploaded files with localStorage
  const saveFiles = (files: CatalogFile[]) => {
    setUploadedFiles(files);
    localStorage.setItem("uploadedFiles", JSON.stringify(files));
  };

  // Simulated OCR & Indexing process for uploaded files
  const startFileProcessing = (fileId: string) => {
    let currentStep: "uploading" | "ocr" | "embedding" | "indexing" | "ready" = "uploading";
    let progressVal = 0;

    const interval = setInterval(() => {
      progressVal += 10;

      setUploadedFiles((prev) => {
        const next = prev.map((f) => {
          if (f.id === fileId) {
            // Update progress
            let nextStatus = currentStep;
            let currentProgress = progressVal;

            if (progressVal >= 100) {
              currentProgress = 0;
              progressVal = 0;
              if (currentStep === "uploading") {
                currentStep = "ocr";
                nextStatus = "ocr";
              } else if (currentStep === "ocr") {
                currentStep = "embedding";
                nextStatus = "embedding";
              } else if (currentStep === "embedding") {
                currentStep = "indexing";
                nextStatus = "indexing";
              } else if (currentStep === "indexing") {
                currentStep = "ready";
                nextStatus = "ready";
                currentProgress = 100;
                clearInterval(interval);
              }
            }

            return {
              ...f,
              status: nextStatus,
              progress: currentProgress,
            };
          }
          return f;
        });

        localStorage.setItem("uploadedFiles", JSON.stringify(next));
        return next;
      });
    }, 400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFilesList: CatalogFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newFile: CatalogFile = {
        id: "file-" + (Date.now() + i),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        type: file.name.split(".").pop()?.toUpperCase() || "TXT",
        status: "uploading",
        progress: 0,
        dateAdded: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
      newFilesList.push(newFile);
    }

    const updated = [...newFilesList, ...uploadedFiles];
    saveFiles(updated);

    // Trigger background process simulation for each newly added file
    newFilesList.forEach((file) => {
      startFileProcessing(file.id);
    });
  };

  const handleDeleteFile = (id: string) => {
    const updated = uploadedFiles.filter((f) => f.id !== id);
    saveFiles(updated);
  };

  // Filter saved vehicle objects
  const bookmarkedVehicles = VEHICLES.filter((v) => savedVehicles.includes(v.id));

  const handleAddSpec = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSpec: SavedTireSpec = {
      id: "spec-" + Date.now(),
      name: name.trim(),
      width,
      aspect,
      construction: "R",
      rim,
      dateSaved: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    setSavedSpecs([newSpec, ...savedSpecs]);
    setName("");
    setIsAdding(false);
  };

  const handleRemoveSpec = (id: string) => {
    setSavedSpecs(savedSpecs.filter((s) => s.id !== id));
  };

  const handleRemoveVehicle = (id: string) => {
    setSavedVehicles(savedVehicles.filter((vId) => vId !== id));
  };

  const calculateDiameter = (w: number, a: number, r: number) => {
    const sidewallHeight = w * (a / 100);
    const rimDiameterMm = r * 25.4;
    return (sidewallHeight * 2 + rimDiameterMm).toFixed(1);
  };

  const getProcessingLabel = (status: string) => {
    switch (status) {
      case "uploading": return "Uploading...";
      case "ocr": return "OCR Text Extraction...";
      case "embedding": return "Generating Vector Embeddings...";
      case "indexing": return "Indexing Catalog Database...";
      case "ready": return "Ready for AI Search";
      default: return "";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Header tab switch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Katalog Saya</h2>
          <p className="text-gray-500 mt-1 font-medium">Spesifikasi ban kustom dan database katalog knowledge internal Anda.</p>
        </div>

        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-250/20 font-bold text-xs self-start md:self-center">
          <button
            onClick={() => handleTabChange("specs")}
            className={`px-4.5 py-2.5 rounded-lg transition-all ${
              activeTab === "specs"
                ? "bg-white dark:bg-gray-900 text-[#3B82F6] shadow-sm"
                : "text-gray-500 hover:text-gray-850 dark:hover:text-gray-200"
            }`}
          >
            Spesifikasi Kustom
          </button>
          <button
            onClick={() => handleTabChange("upload")}
            className={`px-4.5 py-2.5 rounded-lg transition-all flex items-center gap-1 ${
              activeTab === "upload"
                ? "bg-white dark:bg-gray-900 text-[#3B82F6] shadow-sm"
                : "text-gray-500 hover:text-gray-850 dark:hover:text-gray-200"
            }`}
          >
            <UploadCloud size={14} />
            Upload Catalog
          </button>
        </div>
      </div>

      {activeTab === "specs" ? (
        // --- SPECS & BOOKMARKS VIEW ---
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Custom Tire Specs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Spesifikasi Kustom</h3>
                <p className="text-xs text-gray-400 mt-0.5">Daftar ukuran ban yang Anda simpan untuk referensi cepat.</p>
              </div>
              <button
                onClick={() => setIsAdding(!isAdding)}
                className="py-2.5 px-4 bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/10"
              >
                <Plus size={14} /> Add Spec
              </button>
            </div>

            {/* Add Custom Spec Form Block */}
            {isAdding && (
              <form onSubmit={handleAddSpec} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm space-y-4 animate-fade-in">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Buat Spesifikasi Ban Baru</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Nama Label</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ban Harian Avanza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs font-semibold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Lebar (mm)</label>
                    <input
                      type="number"
                      min="145"
                      max="335"
                      required
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full text-xs font-mono font-semibold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Aspect Ratio (%)</label>
                    <input
                      type="number"
                      min="30"
                      max="85"
                      required
                      value={aspect}
                      onChange={(e) => setAspect(Number(e.target.value))}
                      className="w-full text-xs font-mono font-semibold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Diameter Velg (inch)</label>
                    <input
                      type="number"
                      min="12"
                      max="22"
                      required
                      value={rim}
                      onChange={(e) => setRim(Number(e.target.value))}
                      className="w-full text-xs font-mono font-semibold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                </div>

                <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-50 dark:border-blue-900/20 rounded-xl text-xs text-gray-500 dark:text-gray-400 font-medium flex justify-between items-center">
                  <span>Rasio Dinding Samping: <strong>{(width * (aspect / 100)).toFixed(1)} mm</strong></span>
                  <span>Diameter Total Ban: <strong>{calculateDiameter(width, aspect, rim)} mm</strong></span>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="py-2.5 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Save Specification
                  </button>
                </div>
              </form>
            )}

            {/* Custom Spec Cards List */}
            {savedSpecs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedSpecs.map((spec) => (
                  <div key={spec.id} className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-[#3B82F6]">
                      <Gauge size={100} />
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-extrabold text-gray-900 dark:text-white text-sm leading-snug">{spec.name}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">Disimpan {spec.dateSaved}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveSpec(spec.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="font-mono text-xl font-black text-[#3B82F6]">
                          {spec.width} / {spec.aspect} {spec.construction}{spec.rim}
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Diameter</p>
                          <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{calculateDiameter(spec.width, spec.aspect, spec.rim)} mm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 p-12 text-center rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-gray-400 font-semibold">
                <FileCheck2 className="mx-auto text-gray-300 mb-4" size={48} />
                Belum ada spesifikasi ban kustom yang disimpan.
              </div>
            )}
          </div>

          {/* Right column: Bookmarked Vehicles */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Bookmark Mobil</h3>
              <p className="text-xs text-gray-400 mt-0.5">Mobil Indonesia yang Anda bookmark untuk referensi cepat fitment.</p>
            </div>

            {bookmarkedVehicles.length > 0 ? (
              <div className="space-y-4">
                {bookmarkedVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer relative"
                  >
                    <div className="h-28 overflow-hidden relative" onClick={() => onVehicleClick(vehicle.id)}>
                      <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-md text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded">
                        {vehicle.brand}
                      </div>
                    </div>

                    <div className="p-4 space-y-3 text-left">
                      <div className="flex justify-between items-center">
                        <h4
                          onClick={() => onVehicleClick(vehicle.id)}
                          className="font-bold text-gray-900 dark:text-white hover:text-[#3B82F6] transition-colors text-sm"
                        >
                          {vehicle.name}
                        </h4>
                        <button
                          onClick={() => handleRemoveVehicle(vehicle.id)}
                          className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          title="Remove Bookmark"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                        <span>PCD: <strong>{vehicle.pcd}</strong></span>
                        <span
                          onClick={() => onVehicleClick(vehicle.id)}
                          className="text-[#3B82F6] font-bold flex items-center gap-0.5 hover:underline"
                        >
                          Open specs <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 p-8 text-center rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-gray-400 text-sm font-semibold">
                <Bookmark className="mx-auto text-gray-300 mb-3" size={32} />
                <p>Bookmark mobil di tab Database untuk menyimpannya di sini.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // --- UPLOAD CATALOG ZONE & FILE LIST ---
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Knowledge Base Catalog Ingress</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl font-medium">
              Upload file katalog spesifikasi, brosur pabrik ban, daftar offset velg (PDF, Excel, CSV, TXT, Word, Image). AI Assistant akan mengekstrak data menggunakan OCR, menghasilkan vektor embedding, dan secara otomatis memasukkannya sebagai konteks RAG pencarian Anda.
            </p>

            {/* Drag & Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all relative ${
                isDragging
                  ? "border-[#3B82F6] bg-blue-50/30 dark:bg-blue-900/10"
                  : "border-gray-200 dark:border-gray-800 hover:border-blue-400"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            >
              <input
                type="file"
                multiple
                accept=".pdf,.xlsx,.csv,.docx,.doc,.png,.jpg,.jpeg,.txt,.md"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="space-y-3 pointer-events-none">
                <UploadCloud size={40} className="mx-auto text-[#3B82F6]" />
                <div className="text-xs font-bold text-gray-700 dark:text-white">
                  Drag and drop files here, or <span className="text-[#3B82F6] hover:underline">browse</span>
                </div>
                <p className="text-[10px] text-gray-400">PDF, Excel, CSV, PNG, JPG, Docx (Max 15MB)</p>
              </div>
            </div>
          </div>

          {/* Files List Table */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">Indexed Knowledge Files ({uploadedFiles.length})</h4>
            </div>

            {uploadedFiles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50/50 dark:bg-gray-800/30 text-gray-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">File Name</th>
                      <th className="p-4">Size</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Date Uploaded</th>
                      <th className="p-4">Indexing Status</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {uploadedFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50/20 dark:hover:bg-gray-850/10">
                        <td className="p-4 flex items-center gap-2.5 font-bold text-gray-900 dark:text-white">
                          <File size={16} className="text-[#3B82F6]" />
                          {file.name}
                        </td>
                        <td className="p-4 font-mono font-semibold text-gray-500">{file.size}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-bold text-[9px]">
                            {file.type}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-gray-500">{file.dateAdded}</td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1 max-w-[200px]">
                            <div className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-300">
                              {file.status !== "ready" && (
                                <Loader2 size={13} className="text-[#3B82F6] animate-spin" />
                              )}
                              <span>{getProcessingLabel(file.status)}</span>
                            </div>
                            {file.status !== "ready" && (
                              <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-[#3B82F6] h-full rounded-full transition-all duration-300"
                                  style={{ width: `${file.progress}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            title="Delete file knowledge"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400 font-semibold">
                <File size={36} className="mx-auto mb-3 text-gray-300" />
                Belum ada berkas katalog yang diunggah.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
