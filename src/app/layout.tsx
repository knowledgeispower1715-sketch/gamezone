import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

// ── Viewport — prevents zoom issues on mobile ──
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#030712",
};

// ── SEO Metadata ──
export const metadata: Metadata = {
  title: {
    default: "GameZone — Play Free Online Games | No Download Required",
    template: "%s | GameZone",
  },
  description:
    "Play 40+ free online games instantly in your browser. No downloads needed. Action, Racing, Puzzle, Shooter and Casual games — all free to play on mobile and desktop!",
  keywords: [
    "play games online free",
    "browser games no download",
    "free online games",
    "HTML5 games",
    "mobile games online",
    "action games online",
    "racing games online",
    "shooting games free",
    "puzzle games online",
    "casual games free",
    "no download games",
  ],
  openGraph: {
    title: "GameZone — Play Free Online Games",
    description:
      "Play 40+ free browser games instantly. No download required.",
    type: "website",
    siteName: "GameZone",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameZone — Play Free Online Games",
    description:
      "Play 40+ free browser games instantly. No download required.",
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
        {/* Preconnect to game hosting domains for faster loading */}
        <link rel="preconnect" href="https://playpager.com" />
        <link rel="dns-prefetch" href="https://playpager.com" />
        <link rel="dns-prefetch" href="https://html5.gamedistribution.com" />
        <link rel="dns-prefetch" href="https://itch.io" />
        <link rel="dns-prefetch" href="https://picsum.photos" />

        {/*
          GOOGLE ADSENSE — Paste your AdSense script here:

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossOrigin="anonymous"
          />
        */}
      </head>
      <body
        className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)] min-h-screen text-gray-100 antialiased`}
      >
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
