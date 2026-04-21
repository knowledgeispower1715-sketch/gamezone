"use client";

import { useState, useMemo } from "react";
import {
  games,
  getPopularGames,
  getNewGames,
  getRecommendedGames,
  getGamesForPlatform,
  type Category,
  type Platform,
} from "@/data/games";
import { useDevice } from "@/hooks/useDevice";
import GameCard from "@/components/GameCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AdBanner from "@/components/AdBanner";
import Footer from "@/components/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyPlayed } from "@/hooks/useRecentlyPlayed";
import { useMostPlayed } from "@/hooks/useMostPlayed";
import Link from "next/link";

const INITIAL_SHOW = 12;
const LOAD_MORE_COUNT = 12;

export default function HomePage() {
  const { isMobile, ready: deviceReady } = useDevice();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"default" | "most-played">("default");
  const [showCount, setShowCount] = useState(INITIAL_SHOW);
  const { favIds, isFavorite, toggleFavorite } = useFavorites();
  const { recentIds } = useRecentlyPlayed();
  const { topIds, getCount } = useMostPlayed();

  const effectivePlatformFilter = platformFilter;

  /* ── Filter games by platform + category + search ── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = games.filter((g) => {
      let matchPlatform = true;
      if (effectivePlatformFilter === "all") {
        if (deviceReady) {
          matchPlatform =
            g.platform === "both" ||
            (isMobile ? g.platform === "mobile" : g.platform === "desktop");
        }
      } else if (effectivePlatformFilter === "mobile") {
        matchPlatform = g.platform === "mobile" || g.platform === "both";
      } else if (effectivePlatformFilter === "desktop") {
        matchPlatform = g.platform === "desktop" || g.platform === "both";
      }

      const matchCat = category === "All" || g.category === category;
      const matchSearch = !q || g.title.toLowerCase().includes(q);
      return matchPlatform && matchCat && matchSearch;
    });

    if (sortBy === "most-played") {
      result = [...result].sort((a, b) => getCount(b.id) - getCount(a.id));
    }
    return result;
  }, [
    search,
    category,
    effectivePlatformFilter,
    sortBy,
    getCount,
    deviceReady,
    isMobile,
  ]);

  const visibleGames = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  /* ── Device-compatible games for curated sections ── */
  const compatibleGames = useMemo(
    () => (deviceReady ? getGamesForPlatform(isMobile) : games),
    [deviceReady, isMobile]
  );

  /* ── Continue Playing ── */
  const continueGame = useMemo(
    () =>
      recentIds.length > 0
        ? compatibleGames.find((g) => g.id === recentIds[0]) ?? null
        : null,
    [recentIds, compatibleGames]
  );

  /* ── Recently played ── */
  const recentGames = useMemo(
    () =>
      recentIds
        .slice(1)
        .map((id) => compatibleGames.find((g) => g.id === id))
        .filter(Boolean),
    [recentIds, compatibleGames]
  );

  /* ── Favorites ── */
  const favoriteGames = useMemo(
    () =>
      favIds.map((id) => games.find((g) => g.id === id)).filter(Boolean),
    [favIds]
  );

  /* ── Trending ── */
  const trendingGames = useMemo(() => {
    if (topIds.length >= 3) {
      return topIds
        .slice(0, 6)
        .map((id) => compatibleGames.find((g) => g.id === id))
        .filter(Boolean);
    }
    const picked: typeof games = [];
    const cats: Category[] = ["Action", "Racing", "Puzzle", "Shooter", "Casual"];
    for (const cat of cats) {
      const g = compatibleGames.find((g) => g.category === cat);
      if (g) picked.push(g);
    }
    if (compatibleGames.length > 0) {
      picked.push(compatibleGames[Math.floor(compatibleGames.length / 2)]);
    }
    return picked.slice(0, 6);
  }, [topIds, compatibleGames]);

  /* ── Tag-based sections ── */
  const popularGames = useMemo(() => {
    const tagged = getPopularGames();
    return deviceReady
      ? getGamesForPlatform(isMobile, tagged).slice(0, 8)
      : tagged.slice(0, 8);
  }, [deviceReady, isMobile]);

  const newGames = useMemo(() => {
    const tagged = getNewGames();
    return deviceReady
      ? getGamesForPlatform(isMobile, tagged).slice(0, 8)
      : tagged.slice(0, 8);
  }, [deviceReady, isMobile]);

  const recommendedGames = useMemo(() => {
    const tagged = getRecommendedGames();
    return deviceReady
      ? getGamesForPlatform(isMobile, tagged).slice(0, 8)
      : tagged.slice(0, 8);
  }, [deviceReady, isMobile]);

  /* ── Handlers ── */
  const handleCategoryChange = (c: Category | "All") => {
    setCategory(c);
    setShowCount(INITIAL_SHOW);
  };
  const handlePlatformChange = (p: Platform | "all") => {
    setPlatformFilter(p);
    setShowCount(INITIAL_SHOW);
  };
  const handleSearchChange = (v: string) => {
    setSearch(v);
    setShowCount(INITIAL_SHOW);
  };

  return (
    <>
      <div className="px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
        {/* ═══ HERO SECTION ═══ */}
        <section className="relative mb-6 sm:mb-10 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-purple-900/20 via-black/40 to-blue-900/20 px-4 py-8 text-center sm:px-8 sm:py-16">
          {/* Animated glow orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-purple-600/15 blur-[100px] sm:blur-[140px] animate-glow-pulse" />
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-600/10 blur-[80px] animate-float" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-violet-600/10 blur-[80px] animate-float" style={{ animationDelay: "3s" }} />
            <div className="absolute top-1/4 right-1/4 h-2 w-2 rounded-full bg-purple-400/60 animate-float" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-1/3 left-1/3 h-1.5 w-1.5 rounded-full bg-blue-400/50 animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/3 left-1/5 h-1 w-1 rounded-full bg-violet-300/40 animate-float" style={{ animationDelay: "4s" }} />
          </div>

          <div className="relative animate-fade-in-up">
            <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[10px] sm:text-xs font-semibold text-purple-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {games.length}+ Free Games Available
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent neon-text">
                GameZone
              </span>
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-xs text-gray-400 sm:mt-3 sm:text-base">
              {isMobile
                ? "Touch-optimized games for your phone. Play instantly."
                : "Action, racing, puzzles, shooters — all instant, all free, all in your browser."}
            </p>
            <div className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#games"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 neon-glow transition-all hover:shadow-purple-500/40 hover:-translate-y-0.5 active:scale-95"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Browse Games
              </a>
              {favIds.length > 0 && (
                <a
                  href="#favorites"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-gray-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  Favorites ({favIds.length})
                </a>
              )}
            </div>

            {/* Quick stats */}
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-8 text-center">
              <div>
                <p className="text-lg sm:text-2xl font-bold text-white">{games.length}+</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Games</p>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <p className="text-lg sm:text-2xl font-bold text-white">5</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Categories</p>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <p className="text-lg sm:text-2xl font-bold text-white">Free</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Forever</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOP AD BANNER ── */}
        <AdBanner slot="top-banner" className="mb-5 sm:mb-8" />

        {/* ── CONTINUE PLAYING ── */}
        {continueGame && (
          <section className="mb-5 sm:mb-8 animate-fade-in-up">
            <h2 className="section-heading mb-3 text-sm sm:text-base font-bold text-gray-200">
              Continue Playing
            </h2>
            <Link href={`/game/${continueGame.id}`} className="group block">
              <div className="flex items-center gap-3 sm:gap-4 rounded-xl glass-card neon-glow-hover p-2.5 sm:p-3 transition-all active:scale-[.98]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={continueGame.thumb}
                  alt={continueGame.title}
                  className="h-14 w-24 shrink-0 rounded-lg object-cover sm:h-20 sm:w-36"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate sm:text-base">
                    {continueGame.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs text-gray-400 truncate">
                    {continueGame.category} — {continueGame.description.slice(0, 50)}...
                  </p>
                </div>
                <div className="shrink-0 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-110">
                  <svg className="h-4 w-4 ml-0.5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── TRENDING GAMES ── */}
        {trendingGames.length > 0 && (
          <section className="mb-6 sm:mb-10">
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              <h2 className="section-heading text-sm sm:text-base font-bold text-gray-200">
                Trending Now
              </h2>
              <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-orange-400 border border-orange-500/30">
                HOT
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-6">
              {trendingGames.map(
                (game) =>
                  game && (
                    <Link
                      key={game.id}
                      href={`/game/${game.id}`}
                      className="group"
                    >
                      <div className="overflow-hidden rounded-xl glass-card neon-glow-hover transition-all hover:-translate-y-0.5 active:scale-[.97]">
                        <div className="relative aspect-video overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={game.thumb}
                            alt={game.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-purple-600/80 text-white opacity-0 transition-all group-hover:opacity-100 group-hover:scale-110">
                              <svg className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          {getCount(game.id) > 0 && (
                            <div className="absolute left-1 top-1 flex items-center gap-0.5 rounded-full bg-orange-500/80 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-white">
                              {getCount(game.id)}
                            </div>
                          )}
                        </div>
                        <p className="truncate px-2 py-1.5 text-[10px] sm:text-[11px] font-medium text-gray-300 group-hover:text-white">
                          {game.title}
                        </p>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </section>
        )}

        {/* ── POPULAR GAMES ── */}
        {popularGames.length > 0 && (
          <section className="mb-6 sm:mb-10">
            <h2 className="section-heading mb-3 sm:mb-4 text-sm sm:text-base font-bold text-gray-200">
              Popular Games
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
              {popularGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFav={isFavorite(game.id)}
                  onToggleFav={() => toggleFavorite(game.id)}
                  playCount={getCount(game.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── RECOMMENDED ── */}
        {recommendedGames.length > 0 && (
          <section className="mb-6 sm:mb-10">
            <h2 className="section-heading mb-3 sm:mb-4 text-sm sm:text-base font-bold text-gray-200">
              Recommended For You
            </h2>
            <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {recommendedGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/game/${game.id}`}
                  className="group flex-shrink-0"
                >
                  <div className="w-36 sm:w-44 overflow-hidden rounded-xl glass-card neon-glow-hover transition-all hover:-translate-y-0.5 active:scale-[.97]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={game.thumb}
                      alt={game.title}
                      className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="px-2 py-1.5">
                      <p className="truncate text-[11px] sm:text-xs font-medium text-gray-300 group-hover:text-white">
                        {game.title}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-gray-500">
                        {game.category}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── NEW GAMES ── */}
        {newGames.length > 0 && (
          <section className="mb-6 sm:mb-10">
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              <h2 className="section-heading text-sm sm:text-base font-bold text-gray-200">
                New Games
              </h2>
              <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-green-400 border border-green-500/30">
                FRESH
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
              {newGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFav={isFavorite(game.id)}
                  onToggleFav={() => toggleFavorite(game.id)}
                  playCount={getCount(game.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── RECENTLY PLAYED ── */}
        {recentGames.length > 0 && (
          <section className="mb-6 sm:mb-10 animate-fade-in-up">
            <h2 className="section-heading mb-3 sm:mb-4 text-sm sm:text-base font-bold text-gray-200">
              Recently Played
            </h2>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {recentGames.map(
                (game) =>
                  game && (
                    <Link
                      key={game.id}
                      href={`/game/${game.id}`}
                      className="group flex-shrink-0"
                    >
                      <div className="w-32 sm:w-36 overflow-hidden rounded-xl glass-card transition-all hover:-translate-y-0.5 active:scale-[.97]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={game.thumb}
                          alt={game.title}
                          className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                        <p className="truncate px-2 py-1.5 text-[10px] sm:text-xs font-medium text-gray-400 group-hover:text-white">
                          {game.title}
                        </p>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </section>
        )}

        {/* ── FAVORITES ── */}
        {favoriteGames.length > 0 && (
          <section id="favorites" className="mb-6 sm:mb-10 animate-fade-in-up">
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              <h2 className="section-heading text-sm sm:text-base font-bold text-gray-200">
                Your Favorites
              </h2>
              <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-red-400 border border-red-500/30">
                {favIds.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
              {favoriteGames.map(
                (game) =>
                  game && (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFav={true}
                      onToggleFav={() => toggleFavorite(game.id)}
                      playCount={getCount(game.id)}
                    />
                  )
              )}
            </div>
          </section>
        )}

        {/* ── MID-PAGE AD ── */}
        <AdBanner slot="mid-page" className="mb-5 sm:mb-8" />

        {/* ═══ GAME BROWSER — Platform + Category filters ═══ */}
        <section id="games">
          <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4">
            <CategoryFilter
              activeCategory={category}
              activePlatform={platformFilter}
              onCategoryChange={handleCategoryChange}
              onPlatformChange={handlePlatformChange}
            />

            {/* Search + Sort row */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setSortBy(sortBy === "default" ? "most-played" : "default")
                }
                className={`shrink-0 rounded-lg px-3 py-2.5 text-[11px] font-semibold transition-all active:scale-95 ${
                  sortBy === "most-played"
                    ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/25"
                    : "glass-card text-gray-400 hover:text-gray-200"
                }`}
              >
                Most Played
              </button>
              <div className="flex-1 min-w-0">
                <SearchBar value={search} onChange={handleSearchChange} />
              </div>
            </div>
          </div>

          {/* Game Grid */}
          {visibleGames.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
                {visibleGames.map((game, i) => (
                  <div key={game.id}>
                    <GameCard
                      game={game}
                      isFav={isFavorite(game.id)}
                      onToggleFav={() => toggleFavorite(game.id)}
                      playCount={getCount(game.id)}
                    />
                    {i === 11 && filtered.length > 12 && (
                      <div className="col-span-full mt-3 mb-3 sm:mt-4 sm:mb-4">
                        <AdBanner slot="grid-mid" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <button
                    onClick={() => setShowCount((c) => c + LOAD_MORE_COUNT)}
                    className="rounded-xl glass-card neon-glow-hover px-6 sm:px-8 py-3 text-sm font-semibold text-gray-300 transition-all hover:text-white hover:-translate-y-0.5 active:scale-95"
                  >
                    Load More ({filtered.length - showCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl glass-card py-16 sm:py-20 text-gray-500">
              <svg
                className="mb-3 h-12 w-12 sm:mb-4 sm:h-16 sm:w-16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <p className="text-base sm:text-lg font-medium">No games found</p>
              <p className="mt-1 text-xs sm:text-sm">
                Try a different search, category, or platform filter.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Footer inside scrollable area */}
      <Footer />
    </>
  );
}
