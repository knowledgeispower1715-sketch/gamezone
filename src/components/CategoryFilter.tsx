"use client";

import type { Category } from "@/data/games";

const tabs: Array<{ label: string; value: Category | "All"; icon: string }> = [
  { label: "All Games", value: "All", icon: "🎮" },
  { label: "Multiplayer", value: "Multiplayer", icon: "🌐" },
  { label: "Racing", value: "Racing", icon: "🏎️" },
  { label: "Shooting", value: "Shooting", icon: "🎯" },
  { label: "Puzzle", value: "Puzzle", icon: "🧩" },
  { label: "Endless", value: "Endless", icon: "🏃" },
];

const activeColors: Record<string, string> = {
  All: "from-purple-600 to-violet-600 shadow-purple-500/25",
  Multiplayer: "from-blue-600 to-indigo-600 shadow-blue-500/25",
  Racing: "from-emerald-600 to-green-600 shadow-emerald-500/25",
  Shooting: "from-red-600 to-rose-600 shadow-red-500/25",
  Puzzle: "from-cyan-600 to-teal-600 shadow-cyan-500/25",
  Endless: "from-amber-600 to-orange-600 shadow-amber-500/25",
};

export default function CategoryFilter({
  active,
  onChange,
}: {
  active: Category | "All";
  onChange: (c: Category | "All") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
              isActive
                ? `bg-gradient-to-r ${activeColors[tab.value]} text-white shadow-lg`
                : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-gray-200"
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
