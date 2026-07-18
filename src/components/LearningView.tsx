import React, { useState } from "react";
import { Sparkles, Clock, HelpCircle, Check, AlertTriangle, ArrowRight, Table, GraduationCap } from "lucide-react";
import { QUIZ_DATA as QUIZ_QUESTIONS } from "../data";

interface LearningViewProps {
  onNavigateToAssistant: (initialPrompt?: string) => void;
  onBackToDashboard: () => void;
}

export default function LearningView({ onNavigateToAssistant, onBackToDashboard }: LearningViewProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const quiz = QUIZ_QUESTIONS[currentQuizIndex];

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setIsAnswerCorrect(selectedOption === quiz.answerIndex);
    setIsQuizSubmitted(true);
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsQuizSubmitted(false);
    setCurrentQuizIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const handleTanyaLebihLanjut = () => {
    onNavigateToAssistant("Bisa jelaskan lebih detail mengenai arti kode ban 185/65 R15 88H dan rekomendasinya untuk jalanan Indonesia?");
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Breadcrumb and Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="text-xs font-bold text-[#3B82F6] hover:underline flex items-center gap-1.5"
        >
          ← Back to Dashboard
        </button>
        <div className="text-xs text-gray-400 font-medium">
          Belajar Ban / <span className="text-[#3B82F6]">Dasar Ban</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Main Learning Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Hero Section */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4 text-left">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                  Dasar-Dasar Ban Mobil
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Pelajari anatomi dasar, spesifikasi, dan cara membaca kode pada ban mobil untuk memastikan keselamatan dan performa kendaraan yang optimal.
                </p>
                <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <Clock size={14} />
                  15 Min Read
                </div>
              </div>
              <div className="w-full md:w-[280px] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm flex-shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAna-gJ-PuUsnrWB3WUYc1-4pARFtEq6kSpj0X14N0lO0AxgMmg6C_edsc3r3LzcRe_J-zLqX8Gday1BTuQruhNeZMTvm8Zd-ux7d5wN9yv1yOVI8CKxcNfyJgmZBOo8h--L2ibrVHiZap4agd9Irc_OmRsrOyEjCw0wu0UNsi8yi2VrVJRG62LHOlALYnn33lJbdc1TDbRde1iGiTu87pDosYRbtU99BYDszAMr_ynVi5mruGmxI1NQ0cfWBXnSZMB9ji0N6jDnCE"
                  alt="Anatomi Ban"
                  className="w-full h-auto object-cover aspect-video md:aspect-square"
                />
              </div>
            </div>
          </section>

          {/* Interactive Code Reading Diagram */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex items-center justify-center font-bold">
                #
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Memahami Kode Ban</h3>
            </div>

            {/* Code Highlight Display */}
            <div className="bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-center shadow-inner">
              <div className="flex justify-center items-center gap-3 font-mono text-4xl font-extrabold tracking-widest relative">
                
                {/* 185 segment */}
                <span
                  onMouseEnter={() => setHoveredPart("width")}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => setSelectedPart("width")}
                  className={`cursor-pointer transition-all duration-200 px-1 rounded-lg ${
                    hoveredPart === "width" || selectedPart === "width"
                      ? "text-[#3B82F6] scale-110 bg-blue-50/50 dark:bg-blue-900/30"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  185
                </span>

                <span className="text-gray-300 dark:text-gray-700">/</span>

                {/* 65 segment */}
                <span
                  onMouseEnter={() => setHoveredPart("aspect")}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => setSelectedPart("aspect")}
                  className={`cursor-pointer transition-all duration-200 px-1 rounded-lg ${
                    hoveredPart === "aspect" || selectedPart === "aspect"
                      ? "text-emerald-500 scale-110 bg-emerald-50/50 dark:bg-emerald-900/30"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  65
                </span>

                {/* R segment */}
                <span
                  onMouseEnter={() => setHoveredPart("radial")}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => setSelectedPart("radial")}
                  className={`cursor-pointer transition-all duration-200 px-2 rounded-lg ${
                    hoveredPart === "radial" || selectedPart === "radial"
                      ? "text-purple-500 scale-110 bg-purple-50/50 dark:bg-purple-900/30"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  R
                </span>

                {/* 15 segment */}
                <span
                  onMouseEnter={() => setHoveredPart("rim")}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => setSelectedPart("rim")}
                  className={`cursor-pointer transition-all duration-200 px-1 rounded-lg ${
                    hoveredPart === "rim" || selectedPart === "rim"
                      ? "text-amber-500 scale-110 bg-amber-50/50 dark:bg-amber-900/30"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  15
                </span>
              </div>

              {/* Tooltip hint under active parts */}
              <p className="text-xs text-[#3B82F6] mt-4 font-bold h-4">
                {hoveredPart === "width" && "Lebar Ban (dalam milimeter)"}
                {hoveredPart === "aspect" && "Aspect Ratio (tinggi profil %)"}
                {hoveredPart === "radial" && "Konstruksi Radial (benang kawat)"}
                {hoveredPart === "rim" && "Diameter Velg (dalam inci)"}
                {!hoveredPart && "Arahkan kursor atau klik segmen kode di atas"}
              </p>
            </div>

            {/* Bento Grid Explanations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Width Card */}
              <div
                onClick={() => setSelectedPart("width")}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  selectedPart === "width"
                    ? "border-[#3B82F6] bg-blue-50/10 dark:bg-blue-900/10 shadow-sm"
                    : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                }`}
              >
                <h4 className="font-bold text-[#3B82F6] flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-blue-100 dark:bg-blue-900/50 text-[#3B82F6] text-xs flex items-center justify-center font-bold">185</span>
                  Lebar Telapak (Width)
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  Menunjukkan lebar telapak ban dalam satuan milimeter. Semakin besar angkanya, semakin lebar permukaan ban yang menyentuh jalan, memberikan cengkeraman lebih baik.
                </p>
              </div>

              {/* Aspect Ratio Card */}
              <div
                onClick={() => setSelectedPart("aspect")}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  selectedPart === "aspect"
                    ? "border-emerald-500 bg-emerald-50/10 dark:bg-emerald-900/10 shadow-sm"
                    : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                }`}
              >
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-center font-bold">65</span>
                  Aspect Ratio (%)
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  Rasio tinggi dinding samping ban terhadap lebar telapaknya dalam persentase. 65% dari 185mm = 120.25mm tinggi profil ban. Profil lebih rendah biasanya untuk performa.
                </p>
              </div>

              {/* Radial Card */}
              <div
                onClick={() => setSelectedPart("radial")}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  selectedPart === "radial"
                    ? "border-purple-500 bg-purple-50/10 dark:bg-purple-900/10 shadow-sm"
                    : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                }`}
              >
                <h4 className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-xs flex items-center justify-center font-bold">R</span>
                  Konstruksi Radial
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  Huruf R menandakan konstruksi internal ban adalah Radial (benang serat kawat menyilang lurus 90 derajat). Hampir semua mobil penumpang modern menggunakan ban radial.
                </p>
              </div>

              {/* Rim Card */}
              <div
                onClick={() => setSelectedPart("rim")}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  selectedPart === "rim"
                    ? "border-amber-500 bg-amber-50/10 dark:bg-amber-900/10 shadow-sm"
                    : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                }`}
              >
                <h4 className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 text-xs flex items-center justify-center font-bold">15</span>
                  Diameter Velg (Rim)
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  Diameter bagian dalam ban yang cocok dipasang pada velg, diukur dalam satuan inci. Ban berkode ring 15 ini mutlak dipasang pada velg berukuran 15 inci.
                </p>
              </div>

            </div>
          </section>

          {/* Load Index & Speed Rating Tables */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Load Index &amp; Speed Rating</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Dua digit terakhir dan satu huruf (contoh: 88H) menunjukkan kapasitas beban maksimal per ban dan batas kecepatan amannya.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Load Index Table */}
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-850 border-b border-gray-100 dark:border-gray-800 text-gray-500 font-bold">
                    <tr>
                      <th className="p-3 text-xs uppercase tracking-wider">Load Index</th>
                      <th className="p-3 text-xs uppercase tracking-wider">Max Load (kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium text-gray-700 dark:text-gray-300">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">82</td><td className="p-3">475</td></tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">84</td><td className="p-3">500</td></tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">86</td><td className="p-3">530</td></tr>
                    {/* Highlighted Row */}
                    <tr className="bg-blue-50/50 dark:bg-blue-900/30 text-[#3B82F6] font-bold">
                      <td className="p-3">88</td>
                      <td className="p-3">560</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">90</td><td className="p-3">600</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Speed Rating Table */}
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-850 border-b border-gray-100 dark:border-gray-800 text-gray-500 font-bold">
                    <tr>
                      <th className="p-3 text-xs uppercase tracking-wider">Speed Rating</th>
                      <th className="p-3 text-xs uppercase tracking-wider">Max Speed (km/h)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium text-gray-700 dark:text-gray-300">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">S</td><td className="p-3">180</td></tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">T</td><td className="p-3">190</td></tr>
                    {/* Highlighted Row */}
                    <tr className="bg-blue-50/50 dark:bg-blue-900/30 text-[#3B82F6] font-bold">
                      <td className="p-3">H</td>
                      <td className="p-3">210</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">V</td><td className="p-3">240</td></tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">W</td><td className="p-3">270</td></tr>
                  </tbody>
                </table>
              </div>

            </div>
          </section>

        </div>

        {/* Right Column: AI Summary & Quick Quiz */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Glassmorphic AI Summary */}
          <div className="bg-white/85 dark:bg-gray-900/85 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm border-l-4 border-l-[#3B82F6] space-y-4">
            <div className="flex items-center gap-2 text-[#3B82F6] font-bold">
              <Sparkles size={18} />
              AI Summary
            </div>
            <div className="bg-blue-50/10 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-50 dark:border-blue-900/20 text-xs text-gray-500 dark:text-gray-450 leading-relaxed font-medium">
              Kode ban seperti <strong className="text-gray-800 dark:text-white">185/65 R15 88H</strong> menyimpan informasi krusial: lebar (185mm), profil/ketebalan (65%), konstruksi radial (R), diameter velg (15"), kapasitas beban 560kg (88), dan batas kecepatan 210km/h (H). Memilih ban yang tepat sesuai spesifikasi pabrikan memastikan traksi dan efisiensi bahan bakar yang ideal.
            </div>
            <button
              onClick={handleTanyaLebihLanjut}
              className="w-full text-center py-2.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-[#3B82F6] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              Tanyakan lebih lanjut <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick Quiz Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 relative overflow-hidden space-y-6">
            <div className="flex justify-between items-start">
              <div className="bg-[#3B82F6]/10 text-[#3B82F6] px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                Quick Quiz
              </div>
              <span className="text-gray-300 dark:text-gray-700 font-bold text-xs">
                Question {currentQuizIndex + 1}/{QUIZ_QUESTIONS.length}
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="font-extrabold text-gray-900 dark:text-white text-sm leading-snug">
                {quiz.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {quiz.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  let optionStyle = "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-850";
                  
                  if (isSelected) {
                    optionStyle = "border-[#3B82F6] bg-blue-50/20 dark:bg-blue-900/20";
                  }

                  if (isQuizSubmitted) {
                    if (index === quiz.answerIndex) {
                      optionStyle = "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-900/20";
                    } else if (isSelected) {
                      optionStyle = "border-rose-500 bg-rose-50/20 dark:bg-rose-900/20";
                    }
                  }

                  return (
                    <label
                      key={index}
                      className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${optionStyle}`}
                    >
                      <input
                        type="radio"
                        name="quiz-options"
                        checked={isSelected}
                        disabled={isQuizSubmitted}
                        onChange={() => setSelectedOption(index)}
                        className="text-[#3B82F6] focus:ring-[#3B82F6] w-4 h-4 mt-0.5 border-gray-300 dark:border-gray-700"
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300 leading-normal font-medium">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Quiz Result Feedback */}
            {isQuizSubmitted && (
              <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                isAnswerCorrect ? "bg-emerald-50/50 border-emerald-100 dark:border-emerald-900/20 text-emerald-800 dark:text-emerald-300" : "bg-rose-50/50 border-rose-100 dark:border-rose-900/20 text-rose-800 dark:text-rose-300"
              }`}>
                <div className="flex items-center gap-1.5 font-bold">
                  {isAnswerCorrect ? (
                    <>
                      <Check size={16} /> Benar!
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} /> Kurang Tepat
                    </>
                  )}
                </div>
                <p className="leading-relaxed text-gray-500 dark:text-gray-400">{quiz.explanation}</p>
              </div>
            )}

            {/* Submit or Next Button */}
            <div>
              {!isQuizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedOption === null}
                  className="w-full bg-[#3B82F6] text-white py-3 rounded-xl text-xs font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-colors"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuiz}
                  className="w-full bg-gray-900 dark:bg-gray-800 text-white py-3 rounded-xl text-xs font-bold hover:bg-gray-800 dark:hover:bg-gray-705 shadow-md transition-colors"
                >
                  Pertanyaan Berikutnya
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
