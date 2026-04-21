"use client";

import type { Category, Platform } from "@/data/games";

/* ── Category tabs ── */
const categoryTabs: Array<{
  label: string;
  value: Category | "All";
  icon: string;
}> = [
  { label: "All", value: "All", icon: "🎮" },
  { label: "Action", value: "Action", icon: "⚡" },
  { label: "Racing", value: "Racing", icon: "🏎️" },
  { label: "Puzzle", value: "Puzzle", icon: "🧩" },
  { label: "Shooter", value: "Shooter", icon: "🎯" },
  { label: "Arcade", value: "Casual", icon: "🎲" },
];

const categoryColors: Record<string, string> = {
  All: "from-purple-600 to-violet-600 shadow-purple-500/30",
  Action: "from-blue-600 to-indigo-600 shadow-blue-500/30",
  Racing: "from-emerald-600 to-green-600 shadow-emerald-500/30",
  Puzzle: "from-cyan-600 to-teal-600 shadow-cyan-500/30",
  Shooter: "from-red-600 to-rose-600 shadow-red-500/30",
  Casual: "from-amber-600 to-orange-600 shadow-amber-500/30",
};

/* ── Platform tabs ── */
const platformTabs: Array<{
  label: string;
  value: Platform | "all";
  icon: string;
}> = [
  { label: "All", value: "all", icon: "🌐" },
  { label: "Mobile", value: "mobile", icon: "📱" },
  { label: "PC", value: "desktop", icon: "🖥️" },
];

/* ═══════════════════════════════════════════════
   Combined filter component: Platform + Category
   ═══════════════════════════════════════════════ */
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
    <div className="flex flex-col gap-3">
      {/* Platform filter row */}
      <div className="flex gap-1.5 sm:gap-2">
        {platformTabs.map((tab) => {
          const isActive = activePlatform === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onPlatformChange(tab.value)}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[11px] sm:text-xs font-semibold transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/30 neon-glow"
                  : "glass-card text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="text-xs sm:text-sm">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Category filter row */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {categoryTabs.map((tab) => {
          const isActive = activeCategory === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onCategoryChange(tab.value)}
              className={`flex items-center gap-1 rounded-lg px-2.5 sm:px-3.5 py-2 text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                isActive
                  ? `bg-gradient-to-r ${categoryColors[tab.value]} text-white shadow-lg`
                  : "glass-card text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="text-xs sm:text-sm">{tab.icon}</span>
              <span className="hidden xs:inline sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
