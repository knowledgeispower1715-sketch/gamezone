"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
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

// Memoized related game card
const RelatedCard = memo(function RelatedCard({
  game,
  showBadge,
}: {
  game: Game;
  showBadge?: boolean;
}) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="group overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/40 transition-all hover:border-gray-600/50 hover:-translate-y-0.5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={game.thumb}
        alt={game.title}
        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
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
        {showBadge ? (
          <span
            className={`shrink-0 ml-1 rounded-full border px-1.5 py-0.5 text-[8px] font-medium uppercase ${badgeStyle[game.category] ?? ""}`}
          >
            {game.category}
          </span>
        ) : (
          <span className="text-[9px] font-semibold text-purple-400 shrink-0 ml-1">
            PLAY
          </span>
        )}
      </div>
    </Link>
  );
});

export default function GamePageClient({ game, related, alsoLike }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecent } = useRecentlyPlayed();
  const { increment } = useMostPlayed();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const loadedRef = useRef(false);

  // Track play + auto-scroll
  useEffect(() => {
    addRecent(game.id);
    increment(game.id);
    const t = setTimeout(() => {
      gameAreaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
    return () => clearTimeout(t);
  }, [game.id, addRecent, increment]);

  // Iframe load timeout — 15s then show fallback
  useEffect(() => {
    loadedRef.current = false;
    setIframeLoaded(false);
    setIframeFailed(false);
    setShowAudioPrompt(true);

    const timeout = setTimeout(() => {
      if (!loadedRef.current) {
        setIframeFailed(true);
      }
    }, 15000);

    return () => clearTimeout(timeout);
  }, [game.id]);

  const handleIframeLoad = useCallback(() => {
    loadedRef.current = true;
    setIframeLoaded(true);
    setIframeFailed(false);
  }, []);

  // Enable audio + focus iframe on user tap
  const enableAudio = useCallback(() => {
    setShowAudioPrompt(false);
    // Focus the iframe so game receives keyboard input
    setTimeout(() => {
      iframeRef.current?.focus();
    }, 100);
  }, []);

  // Retry loading
  const retryLoad = useCallback(() => {
    loadedRef.current = false;
    setIframeFailed(false);
    setIframeLoaded(false);
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = "";
      requestAnimationFrame(() => {
        if (iframeRef.current) iframeRef.current.src = src;
      });
    }
    setTimeout(() => {
      if (!loadedRef.current) setIframeFailed(true);
    }, 15000);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    const el = gameAreaRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  }, []);

  // Fullscreen change listener (handles Esc key)
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
        className={`relative overflow-hidden rounded-2xl border border-gray-800/60 bg-black shadow-2xl shadow-purple-500/5 scroll-mt-4 ${isFullscreen ? "rounded-none" : ""}`}
      >
        {/* Loading spinner */}
        {!iframeLoaded && !iframeFailed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-950">
            <div className="game-spinner mb-4" />
            <p className="text-sm text-gray-400 animate-pulse">
              Loading {game.title}...
            </p>
            <p className="mt-2 text-[11px] text-gray-600">
              This may take a few seconds
            </p>
          </div>
        )}

        {/* Error / timeout fallback */}
        {iframeFailed && !iframeLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gray-950 p-6 text-center">
            <svg className="h-12 w-12 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p className="text-sm font-medium text-gray-300">
              Game is taking too long to load
            </p>
            <p className="text-xs text-gray-500 max-w-sm">
              The game server might be slow, or this game may not support iframe
              embedding on this domain. Try the options below.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={retryLoad}
                className="rounded-lg bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition-colors"
              >
                Retry
              </button>
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gray-800 px-5 py-2.5 text-xs font-semibold text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Open Game Directly
              </a>
            </div>

            {/* Show alternative games on error */}
            {related.length > 0 && (
              <div className="mt-4 w-full max-w-lg">
                <p className="mb-2 text-xs font-medium text-gray-400">
                  Try these instead:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {related.slice(0, 3).map((r) => (
                    <Link
                      key={r.id}
                      href={`/game/${r.id}`}
                      className="group overflow-hidden rounded-lg border border-gray-800/50 bg-gray-900/60 transition-all hover:border-gray-600/50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.thumb}
                        alt={r.title}
                        className="aspect-video w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (!t.dataset.fb) {
                            t.dataset.fb = "1";
                            t.src = `https://picsum.photos/seed/${r.id}/240/135`;
                          }
                        }}
                      />
                      <p className="truncate px-2 py-1 text-[10px] font-medium text-gray-400 group-hover:text-white">
                        {r.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Audio enable overlay — tap to play */}
        {iframeLoaded && showAudioPrompt && !iframeFailed && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer animate-fade-in-up"
            onClick={enableAudio}
            onTouchEnd={(e) => {
              e.preventDefault();
              enableAudio();
            }}
          >
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-purple-500/30 bg-gray-900/90 px-8 py-6 shadow-2xl shadow-purple-500/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/40 audio-pulse">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-white">
                Tap to Play with Sound
              </p>
              <p className="text-[11px] text-gray-400">
                Click anywhere to start the game
              </p>
            </div>
          </div>
        )}

        {/* Responsive iframe */}
        <div className="aspect-video w-full">
          <iframe
            ref={iframeRef}
            data-game={game.id}
            src={game.url}
            title={`Play ${game.title}`}
            className="h-full w-full border-0"
            allow="autoplay; fullscreen; gamepad; microphone; camera"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
            loading="lazy"
            onLoad={handleIframeLoad}
            style={{ touchAction: "manipulation" }}
          />
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-3 right-3 z-20 flex gap-2">
          <button
            onClick={toggleFullscreen}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/60 text-gray-300 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white sm:h-10 sm:w-10"
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
              and mouse. Tap the game area on mobile to focus.{" "}
              <button
                onClick={toggleFullscreen}
                className="mx-1 inline-flex items-center rounded border border-gray-600 bg-gray-700 px-1.5 py-0.5 text-[10px] text-purple-300 hover:bg-gray-600 transition-colors"
              >
                Fullscreen
              </button>{" "}
              for the best experience.
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
              <RelatedCard key={r.id} game={r} />
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
              <RelatedCard key={r.id} game={r} showBadge />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
