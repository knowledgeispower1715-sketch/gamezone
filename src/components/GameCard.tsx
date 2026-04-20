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
  Puzzle: "from-cyan-500/60 to-teal-600/60",
  Arcade: "from-blue-500/60 to-indigo-600/60",
  Racing: "from-emerald-500/60 to-green-600/60",
  Shooter: "from-red-500/60 to-rose-600/60",
  Casual: "from-amber-500/60 to-orange-600/60",
};

const badgeStyle: Record<string, string> = {
  Puzzle: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  Arcade: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Racing: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Shooter: "bg-red-500/15 text-red-300 border-red-500/30",
  Casual: "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

function GameCardInner({ game, isFav, onToggleFav, playCount }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-gray-800/60 bg-gray-900/50 transition-all duration-300 hover:border-gray-600/60 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={game.thumb}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // Fallback if CDN thumbnail fails
              const target = e.target as HTMLImageElement;
              if (!target.dataset.fallback) {
                target.dataset.fallback = "1";
                target.src = `https://picsum.photos/seed/${game.id}/480/270`;
              }
            }}
          />

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${accentGradient[game.category] ?? "from-gray-700/60 to-gray-900/60"} opacity-0 transition-opacity duration-300 group-hover:opacity-70`}
          />

          {/* Play button — always visible on mobile, hover on desktop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 transition-all duration-300 sm:group-hover:opacity-100">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-purple-600/80 sm:bg-white/15 backdrop-blur-md border border-white/20 shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Favorite button — always visible */}
          <div className="absolute right-2 top-2 z-10">
            <FavoriteButton isFav={isFav} onToggle={onToggleFav} />
          </div>

          {/* Play count badge */}
          {playCount !== undefined && playCount > 0 && (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-gray-300 backdrop-blur-sm">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              {playCount}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-200 truncate transition-colors group-hover:text-white">
            {game.title}
          </h3>
          <div className="mt-1.5 flex items-center justify-between">
            <span
              className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${badgeStyle[game.category] ?? "bg-gray-700 text-gray-300 border-gray-600"}`}
            >
              {game.category}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 transition-colors group-hover:text-purple-300">
              Play Now &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Memoize to prevent re-renders when parent state changes
const GameCard = memo(GameCardInner);
export default GameCard;
