"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Game } from "@/data/games";
import { useDevice } from "@/hooks/useDevice";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyPlayed } from "@/hooks/useRecentlyPlayed";
import { useMostPlayed } from "@/hooks/useMostPlayed";
import FavoriteButton from "./FavoriteButton";

interface InlineGamePlayerProps {
  game: Game;
  onClose: () => void;
}

export default function InlineGamePlayer({
  game,
  onClose,
}: InlineGamePlayerProps) {
  const { isMobile } = useDevice();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecent } = useRecentlyPlayed();
  const { increment } = useMostPlayed();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const loadedRef = useRef(false);

  /* ── Track play on mount ── */
  useEffect(() => {
    addRecent(game.id);
    increment(game.id);
  }, [game.id, addRecent, increment]);

  /* ── Lock body scroll when player is open ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* ── Close on Escape key ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isFullscreen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, isFullscreen]);

  /* ── 25s load timeout ── */
  useEffect(() => {
    loadedRef.current = false;
    setLoaded(false);
    setFailed(false);
    const timeout = setTimeout(() => {
      if (!loadedRef.current) setFailed(true);
    }, 25_000);
    return () => clearTimeout(timeout);
  }, [game.id]);

  const handleLoad = useCallback(() => {
    loadedRef.current = true;
    setLoaded(true);
    setFailed(false);
    setTimeout(() => iframeRef.current?.focus(), 100);
  }, []);

  const handleError = useCallback(() => {
    setFailed(true);
    setLoaded(false);
  }, []);

  const retryLoad = useCallback(() => {
    loadedRef.current = false;
    setFailed(false);
    setLoaded(false);
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = "";
      requestAnimationFrame(() => {
        if (iframeRef.current) iframeRef.current.src = src;
      });
    }
    setTimeout(() => {
      if (!loadedRef.current) setFailed(true);
    }, 25_000);
  }, []);

  /* ── Fullscreen ── */
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
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

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const platformBadge: Record<string, string> = {
    mobile: "bg-green-500/15 text-green-400 border-green-500/25",
    desktop: "bg-sky-500/15 text-sky-400 border-sky-500/25",
    both: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  };
  const platformLabel: Record<string, string> = {
    mobile: "Mobile",
    desktop: "PC",
    both: "All Devices",
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0f] animate-fade-in">
      {/* ── Top bar ── */}
      <div className="flex h-12 sm:h-14 shrink-0 items-center gap-2 sm:gap-3 border-b border-white/5 bg-[#0d0d14] px-3 sm:px-5">
        {/* Close button */}
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/5 hover:text-white active:scale-95"
          aria-label="Close game"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>

        {/* Game title */}
        <h2 className="flex-1 truncate text-sm sm:text-base font-semibold text-white">
          {game.title}
        </h2>

        {/* Badges */}
        <span className={`hidden sm:inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${platformBadge[game.platform]}`}>
          {platformLabel[game.platform]}
        </span>

        {/* Favorite */}
        <FavoriteButton
          isFav={isFavorite(game.id)}
          onToggle={() => toggleFavorite(game.id)}
          size="md"
        />

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/5 hover:text-white active:scale-95"
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

      {/* ── Game iframe area ── */}
      <div ref={containerRef} className="relative flex-1 min-h-0 bg-black">
        {/* Loading state */}
        {!loaded && !failed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0a0a0f]">
            <div className="game-spinner" />
            <p className="text-sm text-gray-400">Loading {game.title}...</p>
            <p className="text-[11px] text-gray-600">This may take a few seconds</p>
          </div>
        )}

        {/* Error state */}
        {failed && !loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0a0a0f] p-6 text-center">
            <svg className="h-12 w-12 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p className="text-sm font-medium text-gray-300">Game failed to load</p>
            <p className="text-xs text-gray-500 max-w-sm">
              The game server might be slow or temporarily unavailable.
            </p>
            <div className="flex gap-3">
              <button
                onClick={retryLoad}
                className="rounded-lg bg-purple-600 px-5 py-2 text-xs font-semibold text-white hover:bg-purple-500 transition-colors active:scale-95"
              >
                Retry
              </button>
              <button
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors active:scale-95"
              >
                Back to Games
              </button>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={game.url}
          title={`Play ${game.title}`}
          className="h-full w-full border-0"
          allow="fullscreen; autoplay; gamepad; accelerometer; gyroscope"
          sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
          onLoad={handleLoad}
          onError={handleError}
          referrerPolicy="no-referrer"
          style={{ touchAction: "manipulation", colorScheme: "normal" }}
        />
      </div>

      {/* ── Bottom info bar ── */}
      <div className="flex h-10 shrink-0 items-center gap-3 border-t border-white/5 bg-[#0d0d14] px-3 sm:px-5">
        <span className="text-[10px] sm:text-[11px] text-gray-500 truncate">
          {game.category} — {game.description.slice(0, 80)}...
        </span>
        <span className="ml-auto text-[10px] text-gray-600 shrink-0">
          {isMobile ? "Tap to play" : "Click to interact"}
        </span>
      </div>
    </div>
  );
}
