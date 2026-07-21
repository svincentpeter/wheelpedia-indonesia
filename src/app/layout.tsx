import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Wheelpedia Indonesia — OmahBan Asisten",
  description:
    "Asisten counter OmahBan: stok ban, database mobil, belajar ban/velg, dan AI penjelas customer.",
  keywords: [
    "ban mobil",
    "velg mobil",
    "OmahBan",
    "PCD",
    "offset",
    "tire size",
    "Wheelpedia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="h-full min-h-screen font-sans antialiased bg-tokobg text-tokonavy"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
