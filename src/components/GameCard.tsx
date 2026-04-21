"use client";

import { memo } from "react";
import Link from "next/link";
import type { Game } from "@/data/games";
import FavoriteButton from "./FavoriteButton";

interface GameCardProps {
  game: Game;
  isFav: boolean;
  onToggleFav: () => void;
  playCount?: number;
}

const accentGradient: Record<string, string> = {
  Action: "from-blue-500/50 to-indigo-600/50",
  Racing: "from-emerald-500/50 to-green-600/50",
  Puzzle: "from-cyan-500/50 to-teal-600/50",
  Shooter: "from-red-500/50 to-rose-600/50",
  Casual: "from-amber-500/50 to-orange-600/50",
};

const badgeStyle: Record<string, string> = {
  Action: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Racing: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Puzzle: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Shooter: "bg-red-500/20 text-red-300 border-red-500/30",
  Casual: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const platformIcon: Record<string, string> = {
  mobile: "📱",
  desktop: "🖥️",
  both: "🌐",
};

function GameCardInner({ game, isFav, onToggleFav, playCount }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl glass-card neon-glow-hover transition-all duration-300 hover:-translate-y-1 active:scale-[.97]">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={game.thumb}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.dataset.fallback) {
                target.dataset.fallback = "1";
                target.src = `https://picsum.photos/seed/${game.id}/480/270`;
              }
            }}
          />

          {/* Hover gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${accentGradient[game.category] ?? "from-gray-700/50 to-gray-900/50"} opacity-0 transition-opacity duration-300 group-hover:opacity-70`}
          />

          {/* Play button — always visible on mobile, hover on desktop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 transition-all duration-300 sm:group-hover:opacity-100">
            <div className="flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-purple-600/80 sm:bg-white/15 backdrop-blur-md border border-white/20 shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Favorite button */}
          <div className="absolute right-1.5 top-1.5 z-10 sm:right-2 sm:top-2">
            <FavoriteButton isFav={isFav} onToggle={onToggleFav} />
          </div>

          {/* Platform icon */}
          <div className="absolute left-1.5 bottom-1.5 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] backdrop-blur-sm">
            {platformIcon[game.platform]}
          </div>

          {/* Play count badge */}
          {playCount !== undefined && playCount > 0 && (
            <div className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-gray-300 backdrop-blur-sm">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              {playCount}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-2.5 sm:p-3">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-200 truncate transition-colors group-hover:text-white">
            {game.title}
          </h3>
          <div className="mt-1 sm:mt-1.5 flex items-center justify-between">
            <span
              className={`inline-block rounded-full border px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider ${badgeStyle[game.category] ?? "bg-gray-700 text-gray-300 border-gray-600"}`}
            >
              {game.category}
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-purple-400 transition-colors group-hover:text-purple-300">
              Play &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const GameCard = memo(GameCardInner);
export default GameCard;
