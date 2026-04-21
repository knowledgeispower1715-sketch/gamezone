"use client";

import { useState, useMemo, useCallback } from "react";
import {
  games,
  getPopularGames,
  getNewGames,
  getRecommendedGames,
  getGamesForPlatform,
  type Game,
  type Category,
  type Platform,
} from "@/data/games";
import { useDevice } from "@/hooks/useDevice";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AdBanner from "@/components/AdBanner";
import InlineGamePlayer from "@/components/InlineGamePlayer";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyPlayed } from "@/hooks/useRecentlyPlayed";
import { useMostPlayed } from "@/hooks/useMostPlayed";
import FavoriteButton from "@/components/FavoriteButton";

const INITIAL_SHOW = 16;
const LOAD_MORE_COUNT = 16;

/* ── Tiny game card (for horizontal scrollers) ── */
function MiniCard({
  game,
  onPlay,
}: {
  game: Game;
  onPlay: (g: Game) => void;
}) {
  return (
    <button
      onClick={() => onPlay(game)}
      className="group flex-shrink-0 w-36 sm:w-44 text-left"
    >
      <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.02] transition-all duration-200 hover:border-white/10 hover:bg-white/[0.04] active:scale-[.98]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={game.thumb}
          alt={game.title}
          className="aspect-video w-full object-cover"
          loading="lazy"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            if (!t.dataset.fb) {
              t.dataset.fb = "1";
              t.src = `https://picsum.photos/seed/${game.id}/480/270`;
            }
          }}
        />
        <div className="px-2.5 py-2">
          <p className="truncate text-[11px] sm:text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
            {game.title}
          </p>
          <p className="text-[9px] sm:text-[10px] text-gray-500">{game.category}</p>
        </div>
      </div>
    </button>
  );
}

/* ── Main game card (for grids) ── */
function GameCard({
  game,
  isFav,
  onToggleFav,
  playCount,
  onPlay,
}: {
  game: Game;
  isFav: boolean;
  onToggleFav: () => void;
  playCount?: number;
  onPlay: (g: Game) => void;
}) {
  const platformIcon: Record<string, string> = {
    mobile: "Mobile",
    desktop: "PC",
    both: "All",
  };

  return (
    <button
      onClick={() => onPlay(game)}
      className="group block w-full text-left"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.02] transition-all duration-200 hover:border-white/10 hover:bg-white/[0.04] active:scale-[.98]">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={game.thumb}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (!t.dataset.fb) {
                t.dataset.fb = "1";
                t.src = `https://picsum.photos/seed/${game.id}/480/270`;
              }
            }}
          />

          {/* Hover play icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Fav button */}
          <div className="absolute right-1.5 top-1.5 z-10">
            <FavoriteButton isFav={isFav} onToggle={onToggleFav} />
          </div>

          {/* Platform */}
          <div className="absolute left-1.5 bottom-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-gray-300 backdrop-blur-sm">
            {platformIcon[game.platform]}
          </div>

          {/* Play count */}
          {playCount !== undefined && playCount > 0 && (
            <div className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-gray-300 backdrop-blur-sm">
              <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              {playCount}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-2.5">
          <h3 className="text-xs sm:text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
            {game.title}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] text-gray-500">{game.category}</span>
            <span className="text-[9px] sm:text-[10px] font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
              PLAY
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ═════════════════════════════════════════════════════
   HOME PAGE
   ═════════════════════════════════════════════════════ */
export default function HomePage() {
  const { isMobile, ready: deviceReady } = useDevice();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [sortBy, setSortBy] = useState<"default" | "most-played">("default");
  const [showCount, setShowCount] = useState(INITIAL_SHOW);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const { favIds, isFavorite, toggleFavorite } = useFavorites();
  const { recentIds } = useRecentlyPlayed();
  const { topIds, getCount } = useMostPlayed();

  const playGame = useCallback((game: Game) => setActiveGame(game), []);
  const closeGame = useCallback(() => setActiveGame(null), []);

  /* ── Filtered games ── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = games.filter((g) => {
      let matchPlatform = true;
      if (platformFilter === "all") {
        if (deviceReady) {
          matchPlatform =
            g.platform === "both" ||
            (isMobile ? g.platform === "mobile" : g.platform === "desktop");
        }
      } else if (platformFilter === "mobile") {
        matchPlatform = g.platform === "mobile" || g.platform === "both";
      } else if (platformFilter === "desktop") {
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
  }, [search, category, platformFilter, sortBy, getCount, deviceReady, isMobile]);

  const visibleGames = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  /* ── Device-compatible for curated sections ── */
  const compatibleGames = useMemo(
    () => (deviceReady ? getGamesForPlatform(isMobile) : games),
    [deviceReady, isMobile]
  );

  /* ── Continue playing (most recent) ── */
  const continueGame = useMemo(
    () => (recentIds.length > 0 ? compatibleGames.find((g) => g.id === recentIds[0]) ?? null : null),
    [recentIds, compatibleGames]
  );

  /* ── Recently played (skip first, it's "continue") ── */
  const recentGames = useMemo(
    () => recentIds.slice(1).map((id) => compatibleGames.find((g) => g.id === id)).filter(Boolean) as Game[],
    [recentIds, compatibleGames]
  );

  /* ── Favorites ── */
  const favoriteGames = useMemo(
    () => favIds.map((id) => games.find((g) => g.id === id)).filter(Boolean) as Game[],
    [favIds]
  );

  /* ── Trending ── */
  const trendingGames = useMemo(() => {
    if (topIds.length >= 3) {
      return topIds.slice(0, 8).map((id) => compatibleGames.find((g) => g.id === id)).filter(Boolean) as Game[];
    }
    const picked: Game[] = [];
    const cats: Category[] = ["Action", "Racing", "Puzzle", "Shooter", "Casual"];
    for (const cat of cats) {
      const g = compatibleGames.find((g) => g.category === cat);
      if (g) picked.push(g);
    }
    return picked.slice(0, 6);
  }, [topIds, compatibleGames]);

  /* ── Tag sections ── */
  const popularGames = useMemo(() => {
    const tagged = getPopularGames();
    return deviceReady ? getGamesForPlatform(isMobile, tagged).slice(0, 8) : tagged.slice(0, 8);
  }, [deviceReady, isMobile]);

  const newGames = useMemo(() => {
    const tagged = getNewGames();
    return deviceReady ? getGamesForPlatform(isMobile, tagged).slice(0, 8) : tagged.slice(0, 8);
  }, [deviceReady, isMobile]);

  const recommendedGames = useMemo(() => {
    const tagged = getRecommendedGames();
    return deviceReady ? getGamesForPlatform(isMobile, tagged).slice(0, 8) : tagged.slice(0, 8);
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
      {/* ── Inline game player overlay ── */}
      {activeGame && (
        <InlineGamePlayer game={activeGame} onClose={closeGame} />
      )}

      <div className="px-3 py-4 sm:px-5 sm:py-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* ═══ HERO ═══ */}
        <section className="relative mb-6 sm:mb-10 overflow-hidden rounded-2xl border border-white/[0.04] bg-gradient-to-br from-[#12111a] to-[#0e0d16] px-5 py-8 sm:px-10 sm:py-14">
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/15 bg-purple-500/5 px-3 py-1 text-[10px] sm:text-xs font-medium text-purple-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              {games.length} Free Games
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Play Free Games{" "}
              <span className="text-purple-400">Instantly</span>
            </h1>
            <p className="mt-2 max-w-lg text-sm text-gray-400 sm:text-base">
              No downloads, no sign-ups. Just pick a game and play right here.
            </p>
            <div className="mt-5 sm:mt-7 flex gap-3">
              <a
                href="#games"
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-500 active:scale-[.97]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Browse Games
              </a>
            </div>
          </div>
        </section>

        {/* ── AD ── */}
        <AdBanner slot="top-banner" className="mb-5 sm:mb-8" />

        {/* ── CONTINUE PLAYING ── */}
        {continueGame && (
          <section className="mb-6 sm:mb-8">
            <h2 className="mb-3 text-sm sm:text-base font-semibold text-gray-200">Continue Playing</h2>
            <button onClick={() => playGame(continueGame)} className="group block w-full text-left">
              <div className="flex items-center gap-3 sm:gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-2.5 sm:p-3 transition-all hover:border-white/10 hover:bg-white/[0.04] active:scale-[.99]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={continueGame.thumb} alt={continueGame.title} className="h-14 w-24 shrink-0 rounded-lg object-cover sm:h-20 sm:w-36" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate sm:text-base">{continueGame.title}</h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs text-gray-400 truncate">{continueGame.category}</p>
                </div>
                <div className="shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-purple-600 text-white transition-transform group-hover:scale-110">
                  <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </button>
          </section>
        )}

        {/* ── TRENDING ── */}
        {trendingGames.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-semibold text-gray-200">Trending</h2>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[9px] font-semibold text-orange-400 border border-orange-500/20">HOT</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
              {trendingGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFav={isFavorite(game.id)}
                  onToggleFav={() => toggleFavorite(game.id)}
                  playCount={getCount(game.id)}
                  onPlay={playGame}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── POPULAR ── */}
        {popularGames.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <h2 className="mb-3 text-sm sm:text-base font-semibold text-gray-200">Popular Games</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
              {popularGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFav={isFavorite(game.id)}
                  onToggleFav={() => toggleFavorite(game.id)}
                  playCount={getCount(game.id)}
                  onPlay={playGame}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── RECOMMENDED ── */}
        {recommendedGames.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <h2 className="mb-3 text-sm sm:text-base font-semibold text-gray-200">Recommended</h2>
            <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {recommendedGames.map((game) => (
                <MiniCard key={game.id} game={game} onPlay={playGame} />
              ))}
            </div>
          </section>
        )}

        {/* ── NEW ── */}
        {newGames.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-semibold text-gray-200">New Games</h2>
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[9px] font-semibold text-green-400 border border-green-500/20">NEW</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
              {newGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFav={isFavorite(game.id)}
                  onToggleFav={() => toggleFavorite(game.id)}
                  playCount={getCount(game.id)}
                  onPlay={playGame}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── RECENTLY PLAYED ── */}
        {recentGames.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <h2 className="mb-3 text-sm sm:text-base font-semibold text-gray-200">Recently Played</h2>
            <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {recentGames.map((game) => (
                <MiniCard key={game.id} game={game} onPlay={playGame} />
              ))}
            </div>
          </section>
        )}

        {/* ── FAVORITES ── */}
        {favoriteGames.length > 0 && (
          <section id="favorites" className="mb-6 sm:mb-8">
            <h2 className="mb-3 text-sm sm:text-base font-semibold text-gray-200">
              Favorites <span className="text-xs text-gray-500 font-normal">({favIds.length})</span>
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
              {favoriteGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFav={true}
                  onToggleFav={() => toggleFavorite(game.id)}
                  playCount={getCount(game.id)}
                  onPlay={playGame}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── AD ── */}
        <AdBanner slot="mid-page" className="mb-5 sm:mb-8" />

        {/* ═══ ALL GAMES ═══ */}
        <section id="games">
          <div className="mb-4 sm:mb-5 flex flex-col gap-3">
            <CategoryFilter
              activeCategory={category}
              activePlatform={platformFilter}
              onCategoryChange={handleCategoryChange}
              onPlatformChange={handlePlatformChange}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortBy(sortBy === "default" ? "most-played" : "default")}
                className={`shrink-0 rounded-lg px-3 py-2.5 text-[11px] font-medium transition-all active:scale-95 ${
                  sortBy === "most-played"
                    ? "bg-purple-600 text-white"
                    : "border border-white/[0.06] bg-white/[0.02] text-gray-400 hover:text-gray-200"
                }`}
              >
                Most Played
              </button>
              <div className="flex-1 min-w-0">
                <SearchBar value={search} onChange={handleSearchChange} />
              </div>
            </div>
          </div>

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
                      onPlay={playGame}
                    />
                    {i === 11 && filtered.length > 12 && (
                      <div className="col-span-full mt-3 mb-3">
                        <AdBanner slot="grid-mid" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setShowCount((c) => c + LOAD_MORE_COUNT)}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-6 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/[0.05] hover:text-white active:scale-[.97]"
                  >
                    Load More ({filtered.length - showCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] py-16 text-gray-500">
              <svg className="mb-3 h-12 w-12" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <p className="text-sm font-medium">No games found</p>
              <p className="mt-1 text-xs">Try a different search or filter.</p>
            </div>
          )}
        </section>

        {/* ── Footer ── */}
        <footer className="mt-12 border-t border-white/[0.04] pt-6 pb-4 text-center">
          <p className="text-[11px] text-gray-600">
            &copy; {new Date().getFullYear()} GameZone. All games are property of their respective developers.
          </p>
        </footer>
      </div>
    </>
  );
}
