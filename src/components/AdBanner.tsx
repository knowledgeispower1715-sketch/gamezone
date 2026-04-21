"use client";

/**
 * AD PLACEHOLDER — 4 slots: top-banner, below-game, grid-mid, mid-page
 *
 * TO ACTIVATE GOOGLE ADSENSE:
 *
 * STEP 1 — Add script to layout.tsx <head>:
 *   <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
 *     crossOrigin="anonymous" strategy="lazyOnload" />
 *
 * STEP 2 — Replace the placeholder <div> below with your <ins> tag.
 *
 * STEP 3 — Create an ad unit in AdSense dashboard per slot:
 *   - "top-banner" = Leaderboard (728x90) or Responsive
 *   - "below-game" = Banner (468x60) or Responsive
 *   - "grid-mid"   = Rectangle (336x280) or Responsive
 *   - "mid-page"   = Leaderboard (728x90) or Responsive
 */

interface AdBannerProps {
  slot: "top-banner" | "below-game" | "grid-mid" | "mid-page";
  className?: string;
}

const config: Record<
  string,
  { label: string; height: string; maxWidth: string }
> = {
  "top-banner": {
    label: "Leaderboard Ad (728×90)",
    height: "h-[50px] sm:h-[90px]",
    maxWidth: "max-w-full",
  },
  "below-game": {
    label: "Banner Ad (468×60)",
    height: "h-[50px] sm:h-[60px]",
    maxWidth: "max-w-2xl mx-auto",
  },
  "grid-mid": {
    label: "Rectangle Ad (336×280)",
    height: "h-[180px] sm:h-[280px]",
    maxWidth: "max-w-sm mx-auto",
  },
  "mid-page": {
    label: "Mid-Page Ad (728×90)",
    height: "h-[50px] sm:h-[90px]",
    maxWidth: "max-w-full",
  },
};

export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  const c = config[slot] ?? config["top-banner"];

  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-white/5 bg-white/[0.02] ${c.height} ${c.maxWidth} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* REPLACE THIS WITH YOUR ADSENSE <ins> TAG */}
      <div className="text-center select-none">
        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-700">
          Ad
        </p>
        <p className="mt-0.5 text-[9px] text-gray-800 hidden sm:block">
          {c.label}
        </p>
      </div>
    </div>
  );
}
