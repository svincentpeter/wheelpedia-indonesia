import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Wheelpedia Indonesia - Belajar Ban & Velg Mobil",
  description: "Platform pembelajaran ban dan velg mobil Indonesia berbasis AI. Database lengkap mobil Indonesia, katalog ban, velg, dan AI assistant.",
  keywords: ["ban mobil", "velg mobil", "otomotif", "Indonesia", "PCD", "offset", "tire size"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="h-full font-sans antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
