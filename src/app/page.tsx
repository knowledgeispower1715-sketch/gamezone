"use client";

import { useState, useMemo, useCallback } from "react";
import {
  games,
  getPopularGames,
  getNewGames,
  getRecommendedGames,
  getGamesForPlatform,
  getGamesByCategory,
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

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.02]">
      <div className="skeleton aspect-video w-full" />
      <div className="p-3">
        <div className="skeleton h-3.5 w-3/4 mb-2" />
        <div className="skeleton h-2.5 w-1/2" />
      </div>
    </div>
  );
}

/* ── Mini game card (for horizontal scrollers) ── */
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
      <div className="game-card overflow-hidden rounded-xl active:scale-[.97]">
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
        <div className="px-2.5 py-2">
          <p className="truncate text-[11px] sm:text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
            {game.title}
          </p>
          <p className="text-[9px] sm:text-[10px] text-gray-500">
            {game.category}
          </p>
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
  const platformLabel: Record<string, string> = {
    mobile: "Mobile",
    desktop: "PC",
    both: "All",
  };

  return (
    <button onClick={() => onPlay(game)} className="group block w-full text-left">
      <div className="game-card relative overflow-hidden rounded-xl active:scale-[.97]">
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

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-purple-600/80 backdrop-blur-sm border border-purple-400/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-lg shadow-purple-500/25">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Fav button */}
          <div className="absolute right-1.5 top-1.5 z-10">
            <FavoriteButton isFav={isFav} onToggle={onToggleFav} />
          </div>

          {/* Platform badge */}
          <div className="absolute left-1.5 bottom-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-gray-300 backdrop-blur-sm border border-white/10">
            {platformLabel[game.platform]}
          </div>

          {/* Play count */}
          {playCount !== undefined && playCount > 0 && (
            <div className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-purple-300 backdrop-blur-sm border border-white/10">
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
            <span className="text-[9px] sm:text-[10px] text-gray-500">
              {game.category}
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
              PLAY NOW
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ── Section Header ── */
function SectionHeader({
  title,
  badge,
  badgeClass,
}: {
  title: string;
  badge?: string;
  badgeClass?: string;
}) {
  return (
    <div className="mb-3 sm:mb-4 flex items-center gap-2">
      <h2 className="section-title text-sm sm:text-base font-bold text-gray-100">
        {title}
      </h2>
      {badge && (
        <span
          className={`rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide ${badgeClass}`}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════
   HOME PAGE
   ═════════════════════════════════════════════════════ */
export default function HomePage() {
  const { isMobile, ready: deviceReady } = useDevice();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">(
    "all"
  );
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

  /* ── Continue playing ── */
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
        .filter(Boolean) as Game[],
    [recentIds, compatibleGames]
  );

  /* ── Favorites ── */
  const favoriteGames = useMemo(
    () =>
      favIds
        .map((id) => games.find((g) => g.id === id))
        .filter(Boolean) as Game[],
    [favIds]
  );

  /* ── Trending ── */
  const trendingGames = useMemo(() => {
    if (topIds.length >= 3) {
      return topIds
        .slice(0, 8)
        .map((id) => compatibleGames.find((g) => g.id === id))
        .filter(Boolean) as Game[];
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

  /* ── Mobile-only & PC-only games ── */
  const mobileGames = useMemo(
    () => games.filter((g) => g.platform === "mobile" || g.platform === "both").slice(0, 8),
    []
  );
  const pcGames = useMemo(
    () => games.filter((g) => g.platform === "desktop" || g.platform === "both").slice(0, 8),
    []
  );

  /* ── Category showcase ── */
  const categoryShowcase = useMemo(() => {
    const cats: Category[] = ["Action", "Racing", "Puzzle", "Shooter", "Casual"];
    return cats.map((cat) => ({
      category: cat,
      games: getGamesByCategory(cat).slice(0, 4),
    }));
  }, []);

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
        {/* ═══ HERO SECTION ═══ */}
        <section className="relative mb-6 sm:mb-10 overflow-hidden rounded-2xl hero-glow">
          <div
            className="hero-gradient px-5 py-8 sm:px-10 sm:py-16 lg:py-20"
            style={{
              border: "1px solid rgba(124, 58, 237, 0.15)",
              borderRadius: "16px",
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold text-purple-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 pulse-live" />
                {games.length}+ Free Games Online
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight">
                Play Instantly.{" "}
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  No Downloads.
                </span>
              </h1>
              <p className="mt-3 max-w-lg text-sm text-gray-400 sm:text-base leading-relaxed">
                Jump into {games.length}+ browser games — action, racing,
                puzzles and more. No sign-ups, no installs. Just play.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                <a
                  href="#games"
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Browse Games
                </a>
                <a
                  href="#favorites"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-white/[0.06] hover:text-white active:scale-[.97]"
                >
                  My Favorites
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── AD ── */}
        <AdBanner slot="top-banner" className="mb-5 sm:mb-8" />

        {/* ── CONTINUE PLAYING ── */}
        {continueGame && (
          <section className="mb-6 sm:mb-8 animate-fade-in">
            <SectionHeader title="Continue Playing" />
            <button
              onClick={() => playGame(continueGame)}
              className="group block w-full text-left"
            >
              <div className="game-card flex items-center gap-3 sm:gap-4 rounded-xl p-2.5 sm:p-3 active:scale-[.99]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={continueGame.thumb}
                  alt={continueGame.title}
                  className="h-14 w-24 shrink-0 rounded-lg object-cover sm:h-20 sm:w-36"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate sm:text-base">
                    {continueGame.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs text-gray-400 truncate">
                    {continueGame.category} &middot;{" "}
                    {continueGame.platform === "mobile"
                      ? "Mobile"
                      : continueGame.platform === "desktop"
                        ? "PC"
                        : "All Devices"}
                  </p>
                </div>
                <div className="shrink-0 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-500/25 transition-transform group-hover:scale-110">
                  <svg
                    className="h-5 w-5 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          </section>
        )}

        {/* ── TRENDING ── */}
        {trendingGames.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <SectionHeader title="Trending Now" badge="HOT" badgeClass="badge-hot" />
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
            <SectionHeader title="Popular Games" />
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
            <SectionHeader title="Recommended For You" />
            <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {recommendedGames.map((game) => (
                <MiniCard key={game.id} game={game} onPlay={playGame} />
              ))}
            </div>
          </section>
        )}

        {/* ── MOBILE GAMES ── */}
        <section className="mb-6 sm:mb-8">
          <SectionHeader title="Mobile Games" badge="TOUCH" badgeClass="badge-live" />
          <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mobileGames.map((game) => (
              <MiniCard key={game.id} game={game} onPlay={playGame} />
            ))}
          </div>
        </section>

        {/* ── PC GAMES ── */}
        <section className="mb-6 sm:mb-8">
          <SectionHeader title="PC Games" badge="DESKTOP" badgeClass="badge-live" />
          <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {pcGames.map((game) => (
              <MiniCard key={game.id} game={game} onPlay={playGame} />
            ))}
          </div>
        </section>

        {/* ── NEW GAMES ── */}
        {newGames.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <SectionHeader title="New Games" badge="NEW" badgeClass="badge-new" />
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
            <SectionHeader title="Recently Played" />
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
            <SectionHeader
              title={`Favorites (${favIds.length})`}
            />
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

        {/* ── CATEGORIES SHOWCASE ── */}
        <section className="mb-6 sm:mb-8">
          <SectionHeader title="Browse by Category" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryShowcase.map(({ category: cat, games: catGames }) => (
              <div
                key={cat}
                className="game-card rounded-xl p-3 sm:p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white">{cat}</h3>
                  <span className="text-[10px] text-gray-500">{catGames.length} games</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {catGames.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => playGame(g)}
                      className="group relative overflow-hidden rounded-lg aspect-video"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.thumb}
                        alt={g.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (!t.dataset.fb) {
                            t.dataset.fb = "1";
                            t.src = `https://picsum.photos/seed/${g.id}/480/270`;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                        <span className="text-[9px] font-medium text-white truncate">
                          {g.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── AD ── */}
        <AdBanner slot="mid-page" className="mb-5 sm:mb-8" />

        {/* ═══ ALL GAMES ═══ */}
        <section id="games">
          <SectionHeader title="All Games" />

          <div className="mb-4 sm:mb-5 flex flex-col gap-3">
            <CategoryFilter
              activeCategory={category}
              activePlatform={platformFilter}
              onCategoryChange={handleCategoryChange}
              onPlatformChange={handlePlatformChange}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setSortBy(sortBy === "default" ? "most-played" : "default")
                }
                className={`shrink-0 rounded-xl px-3 py-2.5 text-[11px] font-medium transition-all active:scale-95 ${
                  sortBy === "most-played"
                    ? "btn-primary text-white"
                    : "border border-white/[0.06] bg-white/[0.02] text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                }`}
              >
                Most Played
              </button>
              <div className="flex-1 min-w-0">
                <SearchBar value={search} onChange={handleSearchChange} />
              </div>
            </div>
          </div>

          {!deviceReady ? (
            /* Skeleton while detecting device */
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : visibleGames.length > 0 ? (
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
                    onClick={() =>
                      setShowCount((c) => c + LOAD_MORE_COUNT)
                    }
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-8 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-white/[0.06] hover:text-white hover:border-purple-500/20 active:scale-[.97]"
                  >
                    Load More ({filtered.length - showCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] py-16 text-gray-500">
              <svg
                className="mb-3 h-12 w-12 text-gray-600"
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
              <p className="text-sm font-medium text-gray-400">
                No games found
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Try a different search or filter.
              </p>
            </div>
          )}
        </section>

        {/* ── Footer ── */}
        <footer className="mt-12 border-t border-white/[0.04] pt-6 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-800">
                <svg
                  className="h-3 w-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 6H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM7 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm2-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-400">
                Game<span className="text-purple-400">Zone</span>
              </span>
            </div>
            <p className="text-[11px] text-gray-600">
              &copy; {new Date().getFullYear()} GameZone. All games are
              property of their respective developers.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
