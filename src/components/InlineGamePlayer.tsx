"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Game } from "@/data/games";
import { useDevice } from "@/hooks/useDevice";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyPlayed } from "@/hooks/useRecentlyPlayed";
import { useMostPlayed } from "@/hooks/useMostPlayed";

interface Props {
  game: Game;
  onClose: () => void;
}

export default function InlineGamePlayer({ game, onClose }: Props) {
  const { isMobile } = useDevice();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecent } = useRecentlyPlayed();
  const { increment } = useMostPlayed();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const loadedRef = useRef(false);

  // Track play
  useEffect(() => {
    addRecent(game.id);
    increment(game.id);
  }, [game.id, addRecent, increment]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC to close (only if not fullscreen)
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // Load timeout — 30s
  useEffect(() => {
    loadedRef.current = false;
    setLoaded(false);
    setFailed(false);
    const t = setTimeout(() => {
      if (!loadedRef.current) setFailed(true);
    }, 30_000);
    return () => clearTimeout(t);
  }, [game.id]);

  const onLoad = useCallback(() => {
    loadedRef.current = true;
    setLoaded(true);
    setFailed(false);
    // Focus iframe so game can receive keyboard input
    setTimeout(() => iframeRef.current?.focus(), 150);
  }, []);

  const onError = useCallback(() => {
    setFailed(true);
    setLoaded(false);
  }, []);

  const retry = useCallback(() => {
    loadedRef.current = false;
    setFailed(false);
    setLoaded(false);
    if (iframeRef.current) {
      const s = iframeRef.current.src;
      iframeRef.current.src = "";
      requestAnimationFrame(() => {
        if (iframeRef.current) iframeRef.current.src = s;
      });
    }
    setTimeout(() => {
      if (!loadedRef.current) setFailed(true);
    }, 30_000);
  }, []);

  // Fullscreen
  const toggleFs = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFs(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFs(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const h = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  const fav = isFavorite(game.id);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: "#0a0a10" }}>
      {/* ── Top bar ── */}
      <div className="flex h-11 sm:h-12 shrink-0 items-center gap-2 px-2 sm:px-4" style={{ background: "#0e0e16", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Back */}
        <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors" aria-label="Close">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="flex-1 truncate text-xs sm:text-sm font-semibold text-white">{game.title}</h2>

        {/* Platform tag */}
        <span className="hidden sm:block text-[10px] text-gray-500 font-medium">
          {game.platform === "mobile" ? "Mobile" : game.platform === "desktop" ? "PC" : "All Devices"}
        </span>

        {/* Fav */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(game.id); }}
          className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${fav ? "text-red-400 bg-red-500/10" : "text-gray-500 hover:text-red-400 hover:bg-white/5"}`}
          aria-label={fav ? "Unfavorite" : "Favorite"}
        >
          <svg className="h-4 w-4" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        {/* Fullscreen */}
        <button onClick={toggleFs} className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors" aria-label="Fullscreen">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {isFs ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            )}
          </svg>
        </button>
      </div>

      {/* ── Game area ── */}
      <div ref={wrapRef} className="relative flex-1 min-h-0 bg-black">
        {/* Loading */}
        {!loaded && !failed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3" style={{ background: "#0a0a10" }}>
            <div className="h-10 w-10 border-[3px] border-white/5 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading {game.title}...</p>
          </div>
        )}

        {/* Failed */}
        {failed && !loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center" style={{ background: "#0a0a10" }}>
            <p className="text-sm font-medium text-gray-300">Failed to load game</p>
            <p className="text-xs text-gray-500 max-w-xs">The game server may be slow. Try again or go back.</p>
            <div className="flex gap-2">
              <button onClick={retry} className="rounded-lg bg-purple-600 px-4 py-2 text-xs font-medium text-white hover:bg-purple-500 active:scale-95">Retry</button>
              <button onClick={onClose} className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 active:scale-95">Back</button>
            </div>
          </div>
        )}

        {/* THE IFRAME — sandbox includes allow-popups for GameDistribution SDK */}
        <iframe
          ref={iframeRef}
          src={game.url}
          title={`Play ${game.title}`}
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen; autoplay; gamepad; accelerometer; gyroscope; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-pointer-lock allow-presentation"
          onLoad={onLoad}
          onError={onError}
          referrerPolicy="no-referrer"
          style={{ touchAction: "manipulation", colorScheme: "normal" }}
        />
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex h-8 shrink-0 items-center px-3 sm:px-4 text-[10px] text-gray-600" style={{ background: "#0e0e16", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="truncate">{game.category} &middot; {game.description.slice(0, 60)}</span>
        <span className="ml-auto shrink-0">{isMobile ? "Tap to play" : "Press ESC to close"}</span>
      </div>
    </div>
  );
}
