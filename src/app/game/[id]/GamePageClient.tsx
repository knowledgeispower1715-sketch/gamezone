"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import type { Game } from "@/data/games";
import AdBanner from "@/components/AdBanner";
import FavoriteButton from "@/components/FavoriteButton";
import Leaderboard from "@/components/Leaderboard";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyPlayed } from "@/hooks/useRecentlyPlayed";
import { useMostPlayed } from "@/hooks/useMostPlayed";

const badgeStyle: Record<string, string> = {
  Multiplayer: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Racing: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Shooting: "bg-red-500/15 text-red-300 border-red-500/30",
  Puzzle: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  Endless: "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

interface Props {
  game: Game;
  related: Game[];
  alsoLike: Game[];
}

export default function GamePageClient({ game, related, alsoLike }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecent } = useRecentlyPlayed();
  const { increment } = useMostPlayed();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Track play + auto-scroll to game area
  useEffect(() => {
    addRecent(game.id);
    increment(game.id);
    // Auto-scroll to game with a small delay for layout
    const t = setTimeout(() => {
      gameAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => clearTimeout(t);
  }, [game.id, addRecent, increment]);

  // Iframe load timeout — if not loaded in 15s, show fallback
  useEffect(() => {
    setIframeLoaded(false);
    setIframeFailed(false);
    const timeout = setTimeout(() => {
      if (!iframeLoaded) setIframeFailed(true);
    }, 15000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.id]);

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
    setIframeFailed(false);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    const el = gameAreaRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // Listen for fullscreen changes (e.g., user presses Esc)
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* ── Nav bar ── */}
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-xl bg-gray-800/60 px-3.5 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          All Games
        </Link>

        <div className="flex-1" />

        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${badgeStyle[game.category] ?? "bg-gray-700 text-gray-300 border-gray-600"}`}
        >
          {game.category}
        </span>

        <FavoriteButton
          isFav={isFavorite(game.id)}
          onToggle={() => toggleFavorite(game.id)}
          size="md"
        />
      </div>

      {/* ── Game title ── */}
      <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
        {game.title}
      </h1>

      {/* ── GAME IFRAME CONTAINER ── */}
      <div
        ref={gameAreaRef}
        className={`relative overflow-hidden rounded-2xl border border-gray-800/60 bg-black shadow-2xl shadow-purple-500/5 scroll-mt-20 ${isFullscreen ? "rounded-none" : ""}`}
      >
        {/* Loading spinner */}
        {!iframeLoaded && !iframeFailed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-950">
            <div className="game-spinner mb-4" />
            <p className="text-sm text-gray-400 animate-pulse">Loading {game.title}...</p>
          </div>
        )}

        {/* Error fallback */}
        {iframeFailed && !iframeLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gray-950 p-8 text-center">
            <svg className="h-12 w-12 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p className="text-sm font-medium text-gray-300">Game is taking too long to load</p>
            <p className="text-xs text-gray-500 max-w-sm">
              This can happen if the game server is slow or blocks iframe embedding.
              Try refreshing or opening the game directly.
            </p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => { setIframeFailed(false); setIframeLoaded(false); }}
                className="rounded-lg bg-purple-600 px-4 py-2 text-xs font-medium text-white hover:bg-purple-500 transition-colors"
              >
                Retry
              </button>
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gray-800 px-4 py-2 text-xs font-medium text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Open Directly
              </a>
            </div>
          </div>
        )}

        <div className="aspect-video w-full">
          <iframe
            ref={iframeRef}
            src={game.url}
            title={`Play ${game.title}`}
            className="h-full w-full"
            allow="autoplay; fullscreen; gamepad; microphone"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
            onLoad={handleIframeLoad}
          />
        </div>

        {/* Fullscreen button */}
        <button
          onClick={toggleFullscreen}
          className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-lg bg-black/60 text-gray-300 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Below-game ad ── */}
      <AdBanner slot="below-game" className="mt-4" />

      {/* ── Game info + Leaderboard ── */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-800/60 bg-gray-900/40 p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-200">
            About This Game
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            {game.description}
          </p>
          <div className="mt-4 rounded-lg bg-gray-800/40 p-3">
            <p className="text-xs text-gray-500">
              <strong className="text-gray-300">Controls:</strong> Use keyboard
              and mouse. Click the game area to focus. Use the
              <button onClick={toggleFullscreen} className="mx-1 inline-flex items-center rounded border border-gray-600 bg-gray-700 px-1.5 py-0.5 text-[10px] text-purple-300 hover:bg-gray-600 transition-colors">
                ⛶ Fullscreen
              </button>
              button for the best experience.
            </p>
          </div>
        </div>
        <Leaderboard gameId={game.id} gameTitle={game.title} />
      </div>

      {/* ── Related games (same category) ── */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-gray-200">
            More {game.category} Games
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/game/${r.id}`}
                className="group overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/40 transition-all hover:border-gray-600/50 hover:-translate-y-0.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.thumb} alt={r.title} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div className="p-2 flex items-center justify-between">
                  <p className="truncate text-xs font-medium text-gray-300 group-hover:text-white">{r.title}</p>
                  <span className="text-[9px] font-semibold text-purple-400 shrink-0 ml-1">PLAY</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── You May Also Like (different categories) ── */}
      {alsoLike.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-gray-200">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {alsoLike.map((r) => (
              <Link
                key={r.id}
                href={`/game/${r.id}`}
                className="group overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/40 transition-all hover:border-gray-600/50 hover:-translate-y-0.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.thumb} alt={r.title} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div className="p-2 flex items-center justify-between">
                  <p className="truncate text-xs font-medium text-gray-300 group-hover:text-white">{r.title}</p>
                  <span className={`shrink-0 ml-1 rounded-full border px-1.5 py-0.5 text-[8px] font-medium uppercase ${badgeStyle[r.category] ?? ""}`}>
                    {r.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
