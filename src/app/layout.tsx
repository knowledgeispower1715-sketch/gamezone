import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

// ══════════════════════════════════════════════
// SEO METADATA — Edit these for your brand
// ══════════════════════════════════════════════
export const metadata: Metadata = {
  title: {
    default: "GameZone — Play Free Online Games | No Download Required",
    template: "%s | GameZone",
  },
  description:
    "Play free online games instantly in your browser. No downloads needed. Action, Racing, Puzzle, Shooting, Multiplayer and Endless Runner games — all free to play!",
  keywords: [
    "play games online free",
    "browser games no download",
    "free online games",
    "HTML5 games",
    "multiplayer browser games",
    "racing games online",
    "shooting games free",
    "puzzle games online",
    "io games",
    "endless runner games",
  ],
  openGraph: {
    title: "GameZone — Play Free Online Games",
    description:
      "Play 25+ free browser games instantly. No download required.",
    type: "website",
    siteName: "GameZone",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameZone — Play Free Online Games",
    description:
      "Play 25+ free browser games instantly. No download required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* ════════════════════════════════════════════
            GOOGLE ADSENSE — Paste your AdSense script here
            ════════════════════════════════════════════
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
              crossOrigin="anonymous"
            />
        */}
      </head>
      <body
        className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)] min-h-screen bg-gray-950 text-gray-100 antialiased`}
      >
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
