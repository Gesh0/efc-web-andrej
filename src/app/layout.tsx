import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/motion/RevealObserver";
import { cn } from "@/lib/utils";
import { MATERIAL_SYMBOLS_HREF } from "@/components/MaterialIcon";

// One typeface for everything: copy, headings, numerals and the wordmark
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EFC — Еко Фулфилмент Центар | Складирање, процесирање и достава",
  description:
    "EFC е логистички центар во Скопје: складирање, процесирање на нарачки и достава следниот ден низ цела Македонија — без сопствен магацин и без почетна инвестиција.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mk"
      className={cn(geist.variable, "font-sans")}
    >
      <head>
        {/* Material Symbols icon font, trimmed to the glyphs we use */}
        <link rel="stylesheet" href={MATERIAL_SYMBOLS_HREF} />
      </head>
      <body>
        {/* without JS the reveal-on-view content must still be visible */}
        <noscript>
          <style>{`.efc-rise,.efc-w>span,.efc-draw{opacity:1!important;transform:none!important}.efc-pre{visibility:visible!important}`}</style>
        </noscript>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
