"use client";

import { useState, useMemo } from "react";
import { games, type Category } from "@/data/games";
import GameCard from "@/components/GameCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AdBanner from "@/components/AdBanner";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyPlayed } from "@/hooks/useRecentlyPlayed";
import { useMostPlayed } from "@/hooks/useMostPlayed";
import Link from "next/link";

const INITIAL_SHOW = 10;
const LOAD_MORE_COUNT = 10;

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [sortBy, setSortBy] = useState<"default" | "most-played">("default");
  const [showCount, setShowCount] = useState(INITIAL_SHOW);
  const { favIds, isFavorite, toggleFavorite } = useFavorites();
  const { recentIds } = useRecentlyPlayed();
  const { topIds, getCount } = useMostPlayed();

  // Filter games
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = games.filter((g) => {
      const matchCat = category === "All" || g.category === category;
      const matchSearch = !q || g.title.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
    // Sort by most played if selected
    if (sortBy === "most-played") {
      result = [...result].sort((a, b) => getCount(b.id) - getCount(a.id));
    }
    return result;
  }, [search, category, sortBy, getCount]);

  // Visible games (load more)
  const visibleGames = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  // Continue Playing — most recent game (first item)
  const continueGame = useMemo(
    () => (recentIds.length > 0 ? games.find((g) => g.id === recentIds[0]) : null),
    [recentIds]
  );

  // Recently played (skip the first one since it's in "Continue Playing")
  const recentGames = useMemo(
    () =>
      recentIds
        .slice(1)
        .map((id) => games.find((g) => g.id === id))
        .filter(Boolean),
    [recentIds]
  );

  // Favorite games
  const favoriteGames = useMemo(
    () => favIds.map((id) => games.find((g) => g.id === id)).filter(Boolean),
    [favIds]
  );

  // Trending — top 6 most played, or first 6 games if nothing played yet
  const trendingGames = useMemo(() => {
    if (topIds.length >= 3) {
      return topIds
        .slice(0, 6)
        .map((id) => games.find((g) => g.id === id))
        .filter(Boolean);
    }
    // Default trending = spread across categories
    const picked: typeof games = [];
    const cats = ["Puzzle", "Arcade", "Racing", "Shooter", "Casual"];
    for (const cat of cats) {
      const g = games.find((g) => g.category === cat);
      if (g) picked.push(g);
    }
    picked.push(games[Math.floor(games.length / 2)]);
    return picked.slice(0, 6);
  }, [topIds]);

  // Reset showCount when filter changes
  const handleCategoryChange = (c: Category | "All") => {
    setCategory(c);
    setShowCount(INITIAL_SHOW);
  };
  const handleSearchChange = (v: string) => {
    setSearch(v);
    setShowCount(INITIAL_SHOW);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* ── HERO ── */}
      <section className="relative mb-12 overflow-hidden rounded-2xl border border-gray-800/40 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-950/30 px-6 py-14 text-center sm:py-20">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-purple-600/20 blur-[120px] animate-glow-pulse" />
        </div>
        <div className="relative">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Play{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Free Games
            </span>{" "}
            Online
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:text-lg">
            Solve puzzles, blast through arcade classics, race at full speed,
            or chill with casual games — all instant, all free, all in your
            browser.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#games"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:-translate-y-0.5"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Start Playing
            </a>
          </div>
        </div>
      </section>

      {/* ── TOP AD BANNER ── */}
      <AdBanner slot="top-banner" className="mb-8" />

      {/* ── CONTINUE PLAYING ── */}
      {continueGame && (
        <section className="mb-8 animate-fade-in-up">
          <h2 className="mb-3 text-lg font-bold text-gray-200">
            ▶ Continue Playing
          </h2>
          <Link href={`/game/${continueGame.id}`} className="group block">
            <div className="flex items-center gap-4 rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 to-gray-900/50 p-3 transition-all hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={continueGame.thumb}
                alt={continueGame.title}
                className="h-16 w-28 shrink-0 rounded-lg object-cover sm:h-20 sm:w-36"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate sm:text-base">
                  {continueGame.title}
                </h3>
                <p className="mt-0.5 text-xs text-gray-400 truncate">
                  {continueGame.category} — {continueGame.description.slice(0, 60)}...
                </p>
              </div>
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                <svg className="h-5 w-5 ml-0.5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── TRENDING GAMES ── */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-gray-200">
          🔥 Trending Games
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {trendingGames.map(
            (game) =>
              game && (
                <Link key={game.id} href={`/game/${game.id}`} className="group">
                  <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/40 transition-all hover:border-gray-600/50 hover:-translate-y-0.5">
                    <div className="relative aspect-video overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={game.thumb}
                        alt={game.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/80 text-white opacity-0 transition-all group-hover:opacity-100 group-hover:scale-110">
                          <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      {getCount(game.id) > 0 && (
                        <div className="absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded-full bg-orange-500/80 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          🔥 {getCount(game.id)}
                        </div>
                      )}
                    </div>
                    <p className="truncate px-2 py-1.5 text-[11px] font-medium text-gray-300 group-hover:text-white">
                      {game.title}
                    </p>
                  </div>
                </Link>
              )
          )}
        </div>
      </section>

      {/* ── RECENTLY PLAYED ── */}
      {recentGames.length > 0 && (
        <section className="mb-10 animate-fade-in-up">
          <h2 className="mb-4 text-lg font-bold text-gray-200">
            🕐 Recently Played
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentGames.map(
              (game) =>
                game && (
                  <Link key={game.id} href={`/game/${game.id}`} className="group flex-shrink-0">
                    <div className="w-36 overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/40 transition-all hover:border-gray-600/50 hover:-translate-y-0.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={game.thumb}
                        alt={game.title}
                        className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                      <p className="truncate px-2 py-1.5 text-xs font-medium text-gray-400 group-hover:text-white">
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
        <section id="favorites" className="mb-10 animate-fade-in-up">
          <h2 className="mb-4 text-lg font-bold text-gray-200">
            ❤️ Your Favorites
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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

      {/* ── GAME BROWSER ── */}
      <section id="games">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter active={category} onChange={handleCategoryChange} />
          <div className="flex items-center gap-2">
            {/* Sort toggle */}
            <button
              onClick={() => setSortBy(sortBy === "default" ? "most-played" : "default")}
              className={`rounded-lg px-3 py-2.5 text-[11px] font-semibold transition-all ${
                sortBy === "most-played"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/25"
                  : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-gray-200"
              }`}
            >
              🏆 Most Played
            </button>
            <div className="w-full sm:w-60">
              <SearchBar value={search} onChange={handleSearchChange} />
            </div>
          </div>
        </div>

        {/* Game Grid with Load More */}
        {visibleGames.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {visibleGames.map((game, i) => (
                <div key={game.id}>
                  <GameCard
                    game={game}
                    isFav={isFavorite(game.id)}
                    onToggleFav={() => toggleFavorite(game.id)}
                    playCount={getCount(game.id)}
                  />
                  {/* Grid ad after 10th visible card */}
                  {i === 9 && filtered.length > 10 && (
                    <div className="col-span-full mt-4 mb-4">
                      <AdBanner slot="grid-mid" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More button */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowCount((c) => c + LOAD_MORE_COUNT)}
                  className="rounded-xl border border-gray-700 bg-gray-800/60 px-8 py-3 text-sm font-semibold text-gray-300 transition-all hover:border-gray-600 hover:bg-gray-700/60 hover:text-white hover:-translate-y-0.5"
                >
                  Load More Games ({filtered.length - showCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800/40 bg-gray-900/20 py-20 text-gray-500">
            <svg className="mb-4 h-16 w-16" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <p className="text-lg font-medium">No games found</p>
            <p className="mt-1 text-sm">Try a different search or category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
