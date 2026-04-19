"use client";

/**
 * AD PLACEHOLDER — 3 slots: top-banner, below-game, grid-mid
 *
 * TO ACTIVATE GOOGLE ADSENSE:
 *
 * STEP 1 — Add script to layout.tsx <head>:
 *   <Script
 *     async
 *     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
 *     crossOrigin="anonymous"
 *     strategy="lazyOnload"
 *   />
 *
 * STEP 2 — Replace the placeholder <div> below with:
 *   <ins className="adsbygoogle"
 *     style={{ display: "block" }}
 *     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *     data-ad-slot="YYYYYYYYYY"
 *     data-ad-format="auto"
 *     data-full-width-responsive="true" />
 *   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
 *
 * STEP 3 — Create 3 ad units in AdSense dashboard (one per slot):
 *   - "top-banner" = Leaderboard (728x90) or Responsive
 *   - "below-game" = Banner (468x60) or Responsive
 *   - "grid-mid"   = Rectangle (336x280) or Responsive
 *
 * TIPS:
 *   - Use data-ad-format="auto" for responsive sizing
 *   - Add data-full-width-responsive="true" for mobile
 *   - Use Next.js <Script strategy="lazyOnload"> for performance
 */

interface AdBannerProps {
  slot: "top-banner" | "below-game" | "grid-mid";
  className?: string;
}

const config: Record<
  string,
  { label: string; height: string; maxWidth: string }
> = {
  "top-banner": {
    label: "Leaderboard Ad (728x90)",
    height: "h-[60px] sm:h-[90px]",
    maxWidth: "max-w-full",
  },
  "below-game": {
    label: "Banner Ad (468x60)",
    height: "h-[50px] sm:h-[60px]",
    maxWidth: "max-w-2xl mx-auto",
  },
  "grid-mid": {
    label: "Rectangle Ad (336x280)",
    height: "h-[200px] sm:h-[280px]",
    maxWidth: "max-w-sm mx-auto",
  },
};

export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  const c = config[slot] ?? config["top-banner"];

  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-gray-700/30 bg-gray-900/15 ${c.height} ${c.maxWidth} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* REPLACE THIS WITH YOUR ADSENSE <ins> TAG */}
      <div className="text-center select-none">
        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-600/80">
          Ad
        </p>
        <p className="mt-0.5 text-[9px] text-gray-700/60 hidden sm:block">
          {c.label}
        </p>
      </div>
    </div>
  );
}
