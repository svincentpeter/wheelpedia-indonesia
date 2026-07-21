"use client";

import React, { useState } from "react";
import { BookOpen } from "lucide-react";

const WEAR_CARDS = [
  {
    id: "inner",
    title: "Makan Dalam (Inner)",
    symptom: "Sisi dalam tapak ban habis lebih dulu.",
    cause: "Camber negatif terlalu besar / setelan toe-out berlebih.",
    pitch:
      "Rekomendasikan layanan SPOORING roda harian OmahBan agar beban tapak ban kembali rata.",
    detailTitle: "Makan Dalam (Inner Edge Wear)",
    detailSymptom: "Tapak sisi dalam aus ekstrem.",
    detailCause:
      "Camber negatif terlalu miring ke dalam atau setelan toe-out (roda membuka keluar). Menyeret ban saat melaju.",
    detailPitch:
      "Meskipun ban baru dipasang, ban akan habis lagi dalam < 3 bulan jika tidak diselaraskan. Mari sekalian kami jadwalkan Spooring komputer seharga Rp 150.000 agar awet bertahun-tahun!",
  },
  {
    id: "outer",
    title: "Makan Luar (Outer)",
    symptom: "Sisi luar tapak ban habis lebih dulu.",
    cause: "Camber positif terlalu besar / setelan toe-in berlebih.",
    pitch:
      "Rekomendasikan SPOORING roda + periksa kondisi bushing/karet tie-rod suspensi depan.",
    detailTitle: "Makan Luar (Outer Edge Wear)",
    detailSymptom: "Tapak sisi luar aus ekstrem.",
    detailCause:
      "Camber positif terlalu tegak/miring keluar atau setelan toe-in terlalu kuncup ke dalam. Sering terjadi akibat sering menghantam lubang.",
    detailPitch:
      "Kondisi suspensi sudah bergeser, Kak. Kami sarankan Spooring + cek kelonggaran komponen kemudi. Tenang, pengecekan kaki-kaki di OmahBan gratis saat Spooring!",
  },
  {
    id: "sides",
    title: "Makan Samping Kiri-Kanan",
    symptom: "Bagian kiri & kanan habis, tengah masih tebal.",
    cause: "Tekanan angin ban kurang (underinflation) terlalu lama.",
    pitch:
      "Ingatkan customer isi angin bulanan ideal (32-34 psi) & sarankan kuras/isi Nitrogen Baru di OmahBan.",
    detailTitle: "Makan Samping (Underinflation Wear)",
    detailSymptom: "Kedua bahu ban aus merata, bagian tengah masih tebal.",
    detailCause:
      "Ban kekurangan angin sehingga bertumpu hanya pada dinding samping ban (bahu). Membuat ban cepat panas dan boros bensin.",
    detailPitch:
      "Ingatkan pelanggan bahwa ban harian menyusut 1-2 psi per bulan. Tawarkan kuras angin biasa dan ganti Nitrogen Baru seharga Rp 10.000/roda untuk kestabilan suhu ban.",
  },
  {
    id: "center",
    title: "Makan Tengah (Center)",
    symptom: "Bagian tengah tapak botak, sisi samping utuh.",
    cause: "Tekanan angin terlalu tinggi (overinflation) terus-menerus.",
    pitch:
      "Sarankan penyesuaian tekanan psi agar sesuai standar pabrik demi kenyamanan suspensi.",
    detailTitle: "Makan Tengah (Overinflation Wear)",
    detailSymptom: "Tapak tengah aus botak licin, sisi samping masih tebal.",
    detailCause:
      "Tekanan angin terlalu keras, ban menggelembung di tengah dan tumpuan beban menumpuk di area sempit tersebut. Bantingan mobil jadi sangat keras.",
    detailPitch:
      "Kurangi tekanan ban ke angka standar (misal 32 psi). Jelaskan bahwa ban terlalu keras juga mengurangi daya cengkeram rem saat hujan.",
  },
  {
    id: "bubbles",
    title: "Benjol Samping (Bubbles)",
    symptom: "Timbul benjolan telur di dinding samping ban.",
    cause: "Konstruksi benang kawat putus akibat hantaman lubang keras.",
    pitch:
      "SANGAT BERBAHAYA! Ban rawan pecah seketika. WAJIB tawarkan ganti ban baru OmahBan demi keselamatan.",
    detailTitle: "Benjol Samping (Impact Break Damage)",
    detailSymptom: "Dinding samping ban menonjol seperti telur atau balon.",
    detailCause:
      "Benang nilon/baja penahan tekanan udara di dalam ban putus akibat terjepit antara pelek dan lubang jalan dengan kecepatan tinggi.",
    detailPitch:
      "Kondisi ini tidak bisa diperbaiki, Kak. Jika terkena tekanan jalan tol, ban bisa meledak seketika. Demi keselamatan keluarga di dalam mobil, mari kita ganti dengan ban baru di rak kita harganya mulai dari Rp 500 ribuan saja.",
  },
] as const;

export default function TireWearDiagnostic() {
  const [activeWear, setActiveWear] = useState<string | null>(null);
  const matched = WEAR_CARDS.find((w) => w.id === activeWear);

  return (
    <div className="bg-white rounded-xl border border-tokocream p-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-tokocream pb-4">
        <div>
          <h3 className="font-display font-bold text-base text-tokonavy flex items-center gap-2">
            <BookOpen size={18} className="text-tokoterracotta" />
            Asisten Diagnosa Fisik Kondisi Ban & Pitching Layanan
          </h3>
          <p className="text-xs text-tokonavy/60">
            Panduan visual saat cek ban lama customer di depan bengkel — untuk
            rekomendasikan Spooring / ganti ban.
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-tokobg border border-tokocream text-tokonavy/60 px-2 py-0.5 rounded-md font-mono">
          Referensi Counter
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {WEAR_CARDS.map((wear) => (
          <button
            key={wear.id}
            type="button"
            onClick={() =>
              setActiveWear(activeWear === wear.id ? null : wear.id)
            }
            className={`text-left p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between h-full ${
              activeWear === wear.id
                ? "ring-2 ring-tokoterracotta border-tokoterracotta bg-tokobg/50 font-bold"
                : "border-tokocream hover:border-tokoterracotta hover:bg-tokobg/20 font-medium"
            }`}
          >
            <div>
              <h4 className="font-bold text-tokonavy">{wear.title}</h4>
              <p className="text-[11px] text-tokonavy/60 mt-1 line-clamp-2">
                {wear.symptom}
              </p>
            </div>
            <span className="text-[10px] text-tokoterracotta font-bold mt-3 block">
              {activeWear === wear.id ? "Tutup Detail ▲" : "Lihat Solusi ▼"}
            </span>
          </button>
        ))}
      </div>

      {matched && (
        <div className="bg-tokobg rounded-xl p-4 border border-tokocream space-y-3 animate-fade-in">
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-display font-bold text-sm text-tokonavy">
              Detail Diagnosa: {matched.detailTitle}
            </h4>
            <button
              type="button"
              onClick={() => setActiveWear(null)}
              className="text-xs text-tokonavy/50 hover:text-tokoterracotta font-bold shrink-0"
            >
              Tutup
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="font-bold text-tokonavy/50 uppercase block text-[10px]">
                Gejala & Tanda
              </span>
              <p className="text-tokonavy mt-1 leading-relaxed">
                {matched.detailSymptom}
              </p>
            </div>
            <div>
              <span className="font-bold text-tokonavy/50 uppercase block text-[10px]">
                Penyebab Mekanis
              </span>
              <p className="text-tokonavy mt-1 leading-relaxed">
                {matched.detailCause}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-tokocream">
              <span className="font-bold text-tokoterracotta uppercase block text-[10px]">
                Naskah Tawarkan (Pitching Script)
              </span>
              <p className="text-tokonavy mt-1 font-sans italic leading-relaxed">
                &quot;{matched.detailPitch}&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
