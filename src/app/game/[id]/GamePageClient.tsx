"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import Link from "next/link";
import type { Game } from "@/data/games";
import { useDevice } from "@/hooks/useDevice";
import AdBanner from "@/components/AdBanner";
import FavoriteButton from "@/components/FavoriteButton";
import Leaderboard from "@/components/Leaderboard";
import Footer from "@/components/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyPlayed } from "@/hooks/useRecentlyPlayed";
import { useMostPlayed } from "@/hooks/useMostPlayed";

/* ── badge colors per category ── */
const badgeStyle: Record<string, string> = {
  Action: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Racing: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Puzzle: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Shooter: "bg-red-500/20 text-red-300 border-red-500/30",
  Casual: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const platformLabel: Record<string, string> = {
  mobile: "Mobile",
  desktop: "PC",
  both: "All Devices",
};

const platformBadge: Record<string, string> = {
  mobile: "bg-green-500/20 text-green-300 border-green-500/30",
  desktop: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  both: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

interface Props {
  game: Game;
  related: Game[];
  alsoLike: Game[];
}

/* ── Related-game thumbnail card ── */
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
      className="group overflow-hidden rounded-xl glass-card transition-all hover:border-white/20 hover:-translate-y-0.5 active:scale-[.98]"
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

/* ═══════════════════════════════════════════════════════════
   MAIN GAME PAGE CLIENT
   ═══════════════════════════════════════════════════════════ */
export default function GamePageClient({ game, related, alsoLike }: Props) {
  const { isMobile, ready: deviceReady } = useDevice();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecent } = useRecentlyPlayed();
  const { increment } = useMostPlayed();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const [showIframe, setShowIframe] = useState(false);
  const loadedRef = useRef(false);

  /* ── Platform mismatch check ── */
  const platformMismatch =
    deviceReady &&
    ((isMobile && game.platform === "desktop") ||
      (!isMobile && game.platform === "mobile"));

  /* ── Track play + auto-scroll ── */
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

  /* ── Lazy load iframe when near viewport ── */
  useEffect(() => {
    const el = gameAreaRef.current;
    if (!el) {
      setShowIframe(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [game.id]);

  /* ── Iframe load timeout — 25 s then fallback ── */
  useEffect(() => {
    loadedRef.current = false;
    setIframeLoaded(false);
    setIframeFailed(false);
    setShowAudioPrompt(true);
    setShowIframe(false);

    const timeout = setTimeout(() => {
      if (!loadedRef.current) setIframeFailed(true);
    }, 25_000);

    return () => clearTimeout(timeout);
  }, [game.id]);

  const handleIframeLoad = useCallback(() => {
    loadedRef.current = true;
    setIframeLoaded(true);
    setIframeFailed(false);
  }, []);

  const handleIframeError = useCallback(() => {
    setIframeFailed(true);
    setIframeLoaded(false);
  }, []);

  const enableAudio = useCallback(() => {
    setShowAudioPrompt(false);
    setTimeout(() => iframeRef.current?.focus(), 100);
  }, []);

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
    }, 25_000);
  }, []);

  /* ── Fullscreen toggle (immersive on mobile) ── */
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

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <>
    <div className="mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      {/* ── Nav bar ── */}
      <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          All Games
        </Link>
        <div className="flex-1" />
        {/* Platform badge */}
        <span
          className={`rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider ${platformBadge[game.platform] ?? ""}`}
        >
          {platformLabel[game.platform]}
        </span>
        {/* Category badge */}
        <span
          className={`rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider ${badgeStyle[game.category] ?? "bg-gray-700 text-gray-300 border-gray-600"}`}
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
      <h1 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-3xl">
        {game.title}
      </h1>

      {/* ── Platform mismatch warning ── */}
      {platformMismatch && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 sm:p-4">
          <svg
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-amber-300">
              Game not optimized for this device
            </p>
            <p className="mt-0.5 text-xs text-amber-200/70">
              This game is designed for{" "}
              <strong>{game.platform === "desktop" ? "PC" : "Mobile"}</strong>.
              It may not display correctly. Try one of the suggested games below.
            </p>
          </div>
        </div>
      )}

      {/* ═══ GAME IFRAME CONTAINER ═══ */}
      <div
        ref={gameAreaRef}
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-purple-500/10 scroll-mt-4 ${
          isFullscreen ? "rounded-none" : ""
        }`}
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
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gray-950 p-4 sm:p-6 text-center">
            <svg
              className="h-10 w-10 sm:h-12 sm:w-12 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-300">
              {platformMismatch
                ? "Game not supported on this device"
                : "Game failed to load"}
            </p>
            <p className="text-xs text-gray-500 max-w-sm">
              {platformMismatch
                ? `This game is designed for ${game.platform === "desktop" ? "PC" : "mobile"}. Try a compatible game below.`
                : "The game server might be slow or temporarily unavailable. Try again or pick another game below."}
            </p>
            {!platformMismatch && (
              <button
                onClick={retryLoad}
                className="rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition-colors active:scale-95"
              >
                Retry
              </button>
            )}

            {related.length > 0 && (
              <div className="mt-3 w-full max-w-lg">
                <p className="mb-2 text-xs font-medium text-gray-400">
                  Try another game:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {related.slice(0, 3).map((r) => (
                    <Link
                      key={r.id}
                      href={`/game/${r.id}`}
                      className="group overflow-hidden rounded-lg glass-card transition-all hover:border-white/20 active:scale-95"
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
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-purple-500/30 bg-gray-900/90 px-6 py-5 sm:px-8 sm:py-6 shadow-2xl shadow-purple-500/20">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/40 audio-pulse">
                <svg
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
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

        {/* ═══ RESPONSIVE IFRAME ═══
             Desktop → 16:9 full width
             Mobile  → constrained height, 4:3 adaptive  */}
        <div
          className={`w-full ${
            isMobile
              ? "aspect-[4/3] max-h-[70vh]"
              : "aspect-video"
          }`}
        >
          {showIframe && (
            <iframe
              ref={iframeRef}
              data-game={game.id}
              src={game.url}
              title={`Play ${game.title}`}
              className="h-full w-full border-0"
              allow="fullscreen; autoplay; gamepad; accelerometer; gyroscope"
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups"
              loading="lazy"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              referrerPolicy="no-referrer"
              style={{
                touchAction: "manipulation",
                colorScheme: "normal",
              }}
            />
          )}
        </div>

        {/* Bottom controls bar */}
        <div className="absolute bottom-2 right-2 z-20 flex gap-2 sm:bottom-3 sm:right-3">
          <button
            onClick={toggleFullscreen}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-black/60 text-gray-300 backdrop-blur-sm border border-white/10 transition-all hover:bg-black/80 hover:text-white active:scale-90"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Below-game ad ── */}
      <AdBanner slot="below-game" className="mt-4" />

      {/* ── Game info + Leaderboard ── */}
      <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2">
        <div className="glass-card rounded-xl p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-200">
            About This Game
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            {game.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${platformBadge[game.platform]}`}
            >
              {platformLabel[game.platform]}
            </span>
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${badgeStyle[game.category]}`}
            >
              {game.category}
            </span>
          </div>
          <div className="mt-3 rounded-lg bg-white/5 p-3">
            <p className="text-xs text-gray-500">
              <strong className="text-gray-300">Controls:</strong>{" "}
              {isMobile
                ? "Tap and swipe to play. "
                : "Use keyboard and mouse. "}
              <button
                onClick={toggleFullscreen}
                className="mx-1 inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-purple-300 hover:bg-white/10 transition-colors active:scale-95"
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
        <section className="mt-8 sm:mt-10">
          <h2 className="section-heading mb-3 text-base font-semibold text-gray-200 sm:mb-4 sm:text-lg">
            More {game.category} Games
          </h2>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
            {related.map((r) => (
              <RelatedCard key={r.id} game={r} />
            ))}
          </div>
        </section>
      )}

      {/* ── You May Also Like ── */}
      {alsoLike.length > 0 && (
        <section className="mt-8 sm:mt-10">
          <h2 className="section-heading mb-3 text-base font-semibold text-gray-200 sm:mb-4 sm:text-lg">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
            {alsoLike.map((r) => (
              <RelatedCard key={r.id} game={r} showBadge />
            ))}
          </div>
        </section>
      )}
    </div>
    <Footer />
    </>
  );
}
