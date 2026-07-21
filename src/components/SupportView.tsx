import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function SupportView() {
  const [name, setName] = useState("Budi");
  const [email, setEmail] = useState("budi@wheelpedia.id");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-left max-w-4xl">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Support &amp; Feedback</h2>
        <p className="text-gray-500 mt-1 font-medium">Butuh bantuan teknis atau ingin memberikan masukan katalog?</p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="mx-auto text-emerald-500" size={48} />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Pesan Terkirim!</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
              Terima kasih atas masukannya, Budi. Tim Wheelpedia Indonesia akan meninjau pesan Anda dan membalas melalui email secepatnya.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-5 py-2 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 font-bold text-xs rounded-xl"
            >
              Kirim Pesan Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs font-semibold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-semibold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Pertanyaan atau Masukan</label>
              <textarea
                required
                rows={5}
                placeholder="Bagikan masalah teknis, saran brand ban baru, atau usulan penambahan mobil..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs font-semibold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none leading-relaxed dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-md shadow-blue-500/10"
            >
              <Send size={14} /> Kirim Masukan
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
