"use client";

/**
 * ════════════════════════════════════════════════════════════
 * 💰 AD PLACEHOLDER — 3 slots: top-banner, below-game, grid-mid
 * ════════════════════════════════════════════════════════════
 *
 * TO ACTIVATE GOOGLE ADSENSE:
 *
 * STEP 1 — Add script to layout.tsx <head>:
 *   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" />
 *
 * STEP 2 — Replace the placeholder <div> below with:
 *   <ins className="adsbygoogle"
 *     style={{ display: "block" }}
 *     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *     data-ad-slot="YYYYYYYYYY"
 *     data-ad-format="auto"
 *     data-full-width-responsive="true" />
 *
 * STEP 3 — Create 3 ad units in AdSense (one per slot).
 * ════════════════════════════════════════════════════════════
 */

interface AdBannerProps {
  slot: "top-banner" | "below-game" | "grid-mid";
  className?: string;
}

const labels: Record<string, { text: string; size: string; responsive: string }> = {
  "top-banner": {
    text: "Leaderboard Ad (728×90)",
    size: "h-[70px] sm:h-[90px]",
    responsive: "max-w-full",
  },
  "below-game": {
    text: "Below-Game Ad (468×60)",
    size: "h-[50px] sm:h-[60px]",
    responsive: "max-w-2xl mx-auto",
  },
  "grid-mid": {
    text: "Grid Ad (336×280)",
    size: "h-[200px] sm:h-[280px]",
    responsive: "max-w-sm mx-auto",
  },
};

export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  const config = labels[slot] ?? labels["top-banner"];

  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-gray-700/40 bg-gray-900/20 ${config.size} ${config.responsive} ${className}`}
    >
      {/* ─── REPLACE THIS DIV WITH YOUR ADSENSE <ins> TAG ─── */}
      <div className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-600">
          Ad
        </p>
        <p className="mt-0.5 text-[10px] text-gray-700 hidden sm:block">{config.text}</p>
      </div>
    </div>
  );
}
