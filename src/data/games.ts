// ================================================================
// GAME DATABASE — 25 Embeddable HTML5 Games
// ================================================================
//
// SOURCES:
//   1. GameDistribution (embed wrapper — most reliable)
//      FORMAT: https://embed.gamedistribution.com/?url=https://html5.gamedistribution.com/{HASH}/
//   2. CrazyGames (older games that allow iframe)
//      FORMAT: https://games.crazygames.com/en_US/{slug}/index.html
//   3. PlayPager (simple HTML5 games, always work)
//      FORMAT: https://playpager.com/embed/{slug}/index.html
//
// HOW TO ADD MORE GAMES:
//   GameDistribution: Go to gamedistribution.com/games → click any game →
//   copy the embed link → paste as url below
//
// IF A GAME DOESN'T LOAD:
//   The GamePageClient has automatic error detection + retry + fallback.
//   Replace the broken URL with a new one from any of the sources above.
// ================================================================

export type Category =
  | "Multiplayer"
  | "Racing"
  | "Shooting"
  | "Puzzle"
  | "Endless";

export interface Game {
  id: string;
  title: string;
  category: Category;
  thumb: string;
  url: string;
  description: string;
}

export const categories: Category[] = [
  "Multiplayer",
  "Racing",
  "Shooting",
  "Puzzle",
  "Endless",
];

// Helpers
const gd = (hash: string) =>
  `https://html5.gamedistribution.com/${hash}/`;

const gdThumb = (hash: string) =>
  `https://img.gamedistribution.com/${hash}-512x384.jpeg`;

const cgThumb = (slug: string) =>
  `https://images.crazygames.com/games/${slug}/cover-1695813599784.png?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=480`;

// ──────────────────────────────────────────────────────────
// 25 GAMES — Multi-source for maximum reliability
// ──────────────────────────────────────────────────────────

export const games: Game[] = [
  // ═══════════════════════════════════════════
  // MULTIPLAYER (5)
  // ═══════════════════════════════════════════
  {
    id: "bubble-game-3",
    title: "Bubble Game 3",
    category: "Multiplayer",
    thumb: gdThumb("27673bc45d2e4b27b7cd24e422f7c257"),
    url: gd("27673bc45d2e4b27b7cd24e422f7c257"),
    description:
      "Competitive bubble-popping action. Match and shoot colored bubbles to clear the board faster than your opponents in this addictive arcade classic.",
  },
  {
    id: "paper-snakes",
    title: "Paper Snakes",
    category: "Multiplayer",
    thumb: gdThumb("62014c3dd1dc4b13b8fb3013a8949639"),
    url: gd("62014c3dd1dc4b13b8fb3013a8949639"),
    description:
      "A slithering io snake game with a paper theme. Eat others to grow bigger, choose awesome snakes, and dominate the leaderboard.",
  },
  {
    id: "basketball-stars",
    title: "Basketball Stars",
    category: "Multiplayer",
    thumb: cgThumb("basketball-stars-2019"),
    url: "https://games.crazygames.com/en_US/basketball-stars/index.html",
    description:
      "Play basketball 1v1 against real opponents! Show off your dribbling, shooting, and dunking skills to become the champion.",
  },
  {
    id: "stickman-hook",
    title: "Stickman Hook",
    category: "Multiplayer",
    thumb: cgThumb("stickman-hook"),
    url: "https://games.crazygames.com/en_US/stickman-hook/index.html",
    description:
      "Swing from hook to hook like a spider. Time your grabs perfectly, build momentum, and race to the finish in this addictive physics game.",
  },
  {
    id: "chess-online",
    title: "Chess",
    category: "Multiplayer",
    thumb: "https://playpager.com/embed/chess/img/icon.png",
    url: "https://playpager.com/embed/chess/index.html",
    description:
      "The classic game of chess. Play against the computer AI with multiple difficulty levels. Sharpen your strategy and checkmate your opponent.",
  },

  // ═══════════════════════════════════════════
  // RACING (5)
  // ═══════════════════════════════════════════
  {
    id: "moto-x3m",
    title: "Moto X3M",
    category: "Racing",
    thumb: cgThumb("moto-x3m"),
    url: "https://games.crazygames.com/en_US/moto-x3m/index.html",
    description:
      "Extreme motorcycle obstacle course with 25 challenging levels. Time your flips perfectly, dodge deadly traps, and earn 3 stars on every level.",
  },
  {
    id: "drift-boss",
    title: "Drift Boss",
    category: "Racing",
    thumb: gdThumb("0a8b51e5eaee42e7b4db83ca00afc92e"),
    url: gd("0a8b51e5eaee42e7b4db83ca00afc92e"),
    description:
      "Master controlled chaos as your car hurtles forward. Click or tap to execute perfect drifts around every corner without falling off the edge.",
  },
  {
    id: "top-speed-racing-3d",
    title: "Top Speed Racing 3D",
    category: "Racing",
    thumb: gdThumb("e1704c5264514b4d8a1ab33308269250"),
    url: gd("e1704c5264514b4d8a1ab33308269250"),
    description:
      "Extreme 3D racing with impossible obstacles and challenging tracks. Push your car to the limit and overtake rivals at breakneck speed.",
  },
  {
    id: "snow-rider-3d",
    title: "Snow Rider 3D",
    category: "Racing",
    thumb: "https://images.crazygames.com/snow-rider-3d/20231215082031/snow-rider-3d-cover?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=480",
    url: "https://games.mathpapers.org/snowrider3d/index.html",
    description:
      "Ride your sled down a snowy mountain dodging trees and obstacles. Collect gifts and see how far you can go in this thrilling winter ride.",
  },
  {
    id: "smash-karts",
    title: "Smash Karts",
    category: "Racing",
    thumb: cgThumb("smash-karts"),
    url: "https://games.crazygames.com/en_US/smash-karts/index.html",
    description:
      "3D multiplayer kart racing with weapons and power-ups. Battle other players in arenas, collect weapon crates, and blast your way to victory.",
  },

  // ═══════════════════════════════════════════
  // SHOOTING (5)
  // ═══════════════════════════════════════════
  {
    id: "zombie-killer",
    title: "Zombie Killer",
    category: "Shooting",
    thumb: gdThumb("58123f23619347ec868bf2892a0b7ec5"),
    url: gd("58123f23619347ec868bf2892a0b7ec5"),
    description:
      "Survive the zombie apocalypse by gunning down waves of undead. Collect weapons, upgrade your firepower, and hold out as long as possible.",
  },
  {
    id: "battle-tank",
    title: "Battle Tank",
    category: "Shooting",
    thumb: gdThumb("a6c29f69d4414cada11ee4e3f3dc4f1a"),
    url: gd("a6c29f69d4414cada11ee4e3f3dc4f1a"),
    description:
      "Defend your territory and destroy enemy tanks. Collect power-ups including shields, missiles, and cannons to dominate the battlefield.",
  },
  {
    id: "bullet-force",
    title: "Bullet Force",
    category: "Shooting",
    thumb: cgThumb("bullet-force-multiplayer"),
    url: "https://games.crazygames.com/en_US/bullet-force-multiplayer/index.html",
    description:
      "Online multiplayer FPS with fast-paced action. Battle on tactical maps using assault rifles, shotguns, snipers, and more.",
  },
  {
    id: "stickman-sniper-3",
    title: "Stickman Sniper 3",
    category: "Shooting",
    thumb: gdThumb("5f64d55ddf874545a9cc1fdc37fcf4f6"),
    url: gd("5f64d55ddf874545a9cc1fdc37fcf4f6"),
    description:
      "Take on sniper missions and gun down targets across multiple levels. Line up your shots carefully and complete each mission for max stars.",
  },
  {
    id: "getaway-shootout",
    title: "Getaway Shootout",
    category: "Shooting",
    thumb: cgThumb("getaway-shootout"),
    url: "https://games.crazygames.com/en_US/getaway-shootout/index.html",
    description:
      "Race to the getaway vehicle in this hilarious physics-based shootout. Grab weapons, use power-ups, and outsmart your opponents.",
  },

  // ═══════════════════════════════════════════
  // PUZZLE (5)
  // ═══════════════════════════════════════════
  {
    id: "mahjong-connect",
    title: "Mahjong Connect",
    category: "Puzzle",
    thumb: gdThumb("a7f5393b417346268657f3bd67eac24e"),
    url: gd("a7f5393b417346268657f3bd67eac24e"),
    description:
      "Classic Mahjong tile-matching puzzle. Connect pairs of identical tiles with a path of no more than 3 lines. Clear the entire board to win.",
  },
  {
    id: "block-puzzle-jewel",
    title: "Block Puzzle Jewel",
    category: "Puzzle",
    thumb: gdThumb("415961cf27fb44759c184d150b301f54"),
    url: gd("415961cf27fb44759c184d150b301f54"),
    description:
      "A Sudoku meets Tetris puzzle game. Drag jewel-colored blocks onto the grid and complete full lines to score. Simple to learn, hard to master.",
  },
  {
    id: "sudoku-classic",
    title: "Sudoku",
    category: "Puzzle",
    thumb: "https://playpager.com/embed/sudoku/img/icon.png",
    url: "https://playpager.com/embed/sudoku/index.html",
    description:
      "The classic number puzzle. Fill in the 9x9 grid so that every row, column, and 3x3 box contains the digits 1-9. Multiple difficulty levels.",
  },
  {
    id: "checkers-classic",
    title: "Checkers",
    category: "Puzzle",
    thumb: "https://playpager.com/embed/checkers/img/icon.png",
    url: "https://playpager.com/embed/checkers/index.html",
    description:
      "Play the classic board game of checkers against the computer. Jump and capture opponent pieces to win. Simple rules, deep strategy.",
  },
  {
    id: "merge-fruit",
    title: "Merge Fruit",
    category: "Puzzle",
    thumb: gdThumb("2dee9d404697435aa76111eb4015e1d5"),
    url: gd("2dee9d404697435aa76111eb4015e1d5"),
    description:
      "Suika-style merging puzzle. Drop fruits and merge matching ones into higher-level fruit. A worldwide viral hit — how high can you score?",
  },

  // ═══════════════════════════════════════════
  // ENDLESS / RUNNER (5)
  // ═══════════════════════════════════════════
  {
    id: "slope",
    title: "Slope",
    category: "Endless",
    thumb: cgThumb("slope"),
    url: "https://games.crazygames.com/en_US/slope/index.html",
    description:
      "Roll a ball down a steep slope at breakneck speed. Dodge obstacles, avoid red walls, and survive as long as possible. Incredibly addictive.",
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    category: "Endless",
    thumb: gdThumb("59bbba689dce41ddb2a4fbcbeb855cee"),
    url: gd("59bbba689dce41ddb2a4fbcbeb855cee"),
    description:
      "Race through a neon-lit 3D tunnel at blazing speed. Dodge obstacles, walls, and barriers with quick reflexes. How far can you survive?",
  },
  {
    id: "helix-stack-3d",
    title: "Helix Stack 3D",
    category: "Endless",
    thumb: gdThumb("e825195ef8274b1cb326bf5362780424"),
    url: gd("e825195ef8274b1cb326bf5362780424"),
    description:
      "Rotate the helix maze and guide a bouncing ball through gaps. Avoid red platforms or it's game over. An addictive Helix Jump-style challenge.",
  },
  {
    id: "geometry-rush-4d",
    title: "Geometry Rush 4D",
    category: "Endless",
    thumb: gdThumb("563a3f252c6e4ef8a7fa4a59b9f47c5c"),
    url: gd("563a3f252c6e4ef8a7fa4a59b9f47c5c"),
    description:
      "Exhilarating 4D platformer with neon geometry aesthetics. Jump and dash through rhythm-based levels with increasing speed and difficulty.",
  },
  {
    id: "eg-subway-surfer",
    title: "EG Subway Surfer",
    category: "Endless",
    thumb: gdThumb("8baa45aabd504c1ab7a6c4ee9b1a336f"),
    url: gd("8baa45aabd504c1ab7a6c4ee9b1a336f"),
    description:
      "Endless subway runner. Dash through tracks, dodge trains, collect coins, and see how far you can go in this thrilling runner.",
  },
];

// Helper to find a game by ID
export function getGameById(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

// Helper to get games by category
export function getGamesByCategory(category: Category): Game[] {
  return games.filter((g) => g.category === category);
}
