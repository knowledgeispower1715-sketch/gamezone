"use client";

import type { Category, Platform } from "@/data/games";

const categoryTabs: Array<{ label: string; value: Category | "All" }> = [
  { label: "All", value: "All" },
  { label: "Action", value: "Action" },
  { label: "Racing", value: "Racing" },
  { label: "Puzzle", value: "Puzzle" },
  { label: "Shooter", value: "Shooter" },
  { label: "Casual", value: "Casual" },
];

const platformTabs: Array<{ label: string; value: Platform | "all" }> = [
  { label: "All", value: "all" },
  { label: "Mobile", value: "mobile" },
  { label: "PC", value: "desktop" },
];

export default function CategoryFilter({
  activeCategory,
  activePlatform,
  onCategoryChange,
  onPlatformChange,
}: {
  activeCategory: Category | "All";
  activePlatform: Platform | "all";
  onCategoryChange: (c: Category | "All") => void;
  onPlatformChange: (p: Platform | "all") => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Platform */}
      <div className="flex gap-1.5">
        {platformTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onPlatformChange(tab.value)}
            className={`rounded-xl px-3 py-2 text-[11px] sm:text-xs font-medium transition-all active:scale-95 ${
              activePlatform === tab.value
                ? "btn-primary text-white shadow-sm"
                : "border border-white/[0.06] bg-white/[0.02] text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category */}
      <div className="flex flex-wrap gap-1.5">
        {categoryTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onCategoryChange(tab.value)}
            className={`rounded-xl px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-medium transition-all active:scale-95 ${
              activeCategory === tab.value
                ? "bg-white/10 text-white border border-white/15"
                : "border border-white/[0.06] bg-white/[0.02] text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
