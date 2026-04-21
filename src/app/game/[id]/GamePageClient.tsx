"use client";

import { useEffect, useState, useCallback, memo } from "react";
import Link from "next/link";
import type { Game } from "@/data/games";
import { useDevice } from "@/hooks/useDevice";
import AdBanner from "@/components/AdBanner";
import FavoriteButton from "@/components/FavoriteButton";
import InlineGamePlayer from "@/components/InlineGamePlayer";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyPlayed } from "@/hooks/useRecentlyPlayed";
import { useMostPlayed } from "@/hooks/useMostPlayed";

interface Props {
  game: Game;
  related: Game[];
  alsoLike: Game[];
}

/* ── Related game card ── */
const RelatedCard = memo(function RelatedCard({
  game,
  onPlay,
}: {
  game: Game;
  onPlay: (g: Game) => void;
}) {
  return (
    <button
      onClick={() => onPlay(game)}
      className="group block w-full text-left overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.02] transition-all hover:border-white/10 hover:bg-white/[0.04] active:scale-[.98]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={game.thumb}
        alt={game.title}
        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          if (!t.dataset.fb) {
            t.dataset.fb = "1";
            t.src = `https://picsum.photos/seed/${game.id}/480/270`;
          }
        }}
      />
      <div className="p-2 flex items-center justify-between">
        <p className="truncate text-xs font-medium text-gray-300 group-hover:text-white">
          {game.title}
        </p>
        <span className="text-[9px] font-medium text-purple-400 shrink-0 ml-1">PLAY</span>
      </div>
    </button>
  );
});

export default function GamePageClient({ game, related, alsoLike }: Props) {
  const { isMobile } = useDevice();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecent } = useRecentlyPlayed();
  const { increment } = useMostPlayed();

  // Auto-play the game inline on this page
  const [activeGame, setActiveGame] = useState<Game | null>(game);
  const playGame = useCallback((g: Game) => setActiveGame(g), []);
  const closeGame = useCallback(() => setActiveGame(null), []);

  /* Track play */
  useEffect(() => {
    addRecent(game.id);
    increment(game.id);
  }, [game.id, addRecent, increment]);

  return (
    <>
      {/* Inline player overlay */}
      {activeGame && (
        <InlineGamePlayer game={activeGame} onClose={closeGame} />
      )}

      <div className="mx-auto max-w-5xl px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
        {/* Nav */}
        <div className="mb-4 flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-white/[0.05] hover:text-white active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            All Games
          </Link>
          <div className="flex-1" />
          <span className="text-[10px] font-medium text-gray-500">{game.category}</span>
          <FavoriteButton isFav={isFavorite(game.id)} onToggle={() => toggleFavorite(game.id)} size="md" />
        </div>

        {/* Game info */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-white sm:text-2xl">{game.title}</h1>
          <p className="mt-1.5 text-sm text-gray-400">{game.description}</p>
        </div>

        {/* Play button — re-open the game if closed */}
        {!activeGame && (
          <button
            onClick={() => setActiveGame(game)}
            className="mb-6 flex items-center gap-3 w-full rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04] active:scale-[.99]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
              <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Play {game.title}</p>
              <p className="text-[11px] text-gray-400">
                {isMobile ? "Tap to start playing" : "Click to start playing"}
              </p>
            </div>
          </button>
        )}

        {/* Ad */}
        <AdBanner slot="below-game" className="mb-6" />

        {/* Related games */}
        {related.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-gray-200">More {game.category} Games</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
              {related.map((r) => (
                <RelatedCard key={r.id} game={r} onPlay={playGame} />
              ))}
            </div>
          </section>
        )}

        {alsoLike.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-gray-200">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
              {alsoLike.map((r) => (
                <RelatedCard key={r.id} game={r} onPlay={playGame} />
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-white/[0.04] pt-5 pb-3 text-center">
          <p className="text-[11px] text-gray-600">
            &copy; {new Date().getFullYear()} GameZone. All games are property of their respective developers.
          </p>
        </footer>
      </div>
    </>
  );
}
