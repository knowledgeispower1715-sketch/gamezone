// ================================================================
// GAME DATABASE — 25 Embeddable HTML5 Games via GameDistribution CDN
// ================================================================
//
// ALL URLs use GameDistribution's free iframe-safe CDN.
// FORMAT: https://html5.gamedistribution.com/{GAME_HASH}/
//
// THUMBNAILS use GameDistribution's image CDN:
// FORMAT: https://img.gamedistribution.com/{GAME_HASH}-512x384.jpeg
//
// HOW TO ADD MORE GAMES:
// 1. Go to https://gamedistribution.com/games
// 2. Click any game -> copy the embed link
// 3. Grab the hash from the iframe src URL
// 4. Add a new entry below with that hash
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

// Helper — GameDistribution embed URL builder
const gd = (hash: string) =>
  `https://html5.gamedistribution.com/${hash}/`;

// Helper — GameDistribution thumbnail CDN
const gdThumb = (hash: string) =>
  `https://img.gamedistribution.com/${hash}-512x384.jpeg`;

// ──────────────────────────────────────────────────────────
// 25 GAMES — GameDistribution CDN (iframe-safe, mobile-ready)
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
    id: "knight-arena-io",
    title: "Knight Arena.io",
    category: "Multiplayer",
    thumb: gdThumb("9fcd52e69f0c4b9da545f4d5e8ad723b"),
    url: gd("9fcd52e69f0c4b9da545f4d5e8ad723b"),
    description:
      "Enter a medieval battle arena as a knight. Fight other players in real-time multiplayer combat, upgrade your gear, and dominate.",
  },
  {
    id: "battleship-war",
    title: "Battleship War Multiplayer",
    category: "Multiplayer",
    thumb: gdThumb("85dcb4270a524c31810cdeeeaf311bec"),
    url: gd("85dcb4270a524c31810cdeeeaf311bec"),
    description:
      "The classic Battleship board game brought online. Place your fleet, guess enemy positions, and sink all their ships before they sink yours.",
  },
  {
    id: "stickman-kombat",
    title: "Stickman Kombat 2D",
    category: "Multiplayer",
    thumb: gdThumb("6d3928f393774157a7aed692f08ee011"),
    url: gd("6d3928f393774157a7aed692f08ee011"),
    description:
      "Fast-paced stickman fighting game. Choose your fighter, master combos, and battle opponents in 2D arena combat.",
  },

  // ═══════════════════════════════════════════
  // RACING (5)
  // ═══════════════════════════════════════════
  {
    id: "moto-x3m",
    title: "Moto X3M",
    category: "Racing",
    thumb: gdThumb("5b0abd4c0faa4f5eb190a9a16d5a1b4c"),
    url: gd("5b0abd4c0faa4f5eb190a9a16d5a1b4c"),
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
    id: "f1-racing",
    title: "F1 Racing",
    category: "Racing",
    thumb: gdThumb("97f2eff444fd411aa5b5b73ce6d4926e"),
    url: gd("97f2eff444fd411aa5b5b73ce6d4926e"),
    description:
      "High-octane Formula 1 racing with different modes and tournaments. Race on professional circuits and compete for the championship.",
  },
  {
    id: "drag-racing",
    title: "Drag Racing",
    category: "Racing",
    thumb: gdThumb("ad8fa388ce234b03b598c347e4fac8fa"),
    url: gd("ad8fa388ce234b03b598c347e4fac8fa"),
    description:
      "Beat rivals in straight-line speed battles. Buy cars, upgrade engines, and fine-tune your ride to become the fastest drag racer.",
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
    id: "army-combat",
    title: "Army Combat",
    category: "Shooting",
    thumb: gdThumb("8f48d982f0394ff4acf7140e7d02bffa"),
    url: gd("8f48d982f0394ff4acf7140e7d02bffa"),
    description:
      "Tactical army shooter with 2 game modes and multiple weapons. Engage in intense combat scenarios with polished graphics and smooth controls.",
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
    id: "bubble-shooter-extreme",
    title: "Bubble Shooter Extreme",
    category: "Shooting",
    thumb: gdThumb("c3f0f0c6731a4d908d978fb7906a0b17"),
    url: gd("c3f0f0c6731a4d908d978fb7906a0b17"),
    description:
      "HD bubble-shooting action with precision aiming. Match 3 or more same-colored bubbles to pop them and clear all levels.",
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
    id: "merge-fruit",
    title: "Merge Fruit",
    category: "Puzzle",
    thumb: gdThumb("2dee9d404697435aa76111eb4015e1d5"),
    url: gd("2dee9d404697435aa76111eb4015e1d5"),
    description:
      "Suika-style merging puzzle. Drop fruits and merge matching ones into higher-level fruit. A worldwide viral hit — how high can you score?",
  },
  {
    id: "bubble-shooter-hd",
    title: "Bubble Shooter HD",
    category: "Puzzle",
    thumb: gdThumb("79a7db22af5f420eb9d56e28fffca87b"),
    url: gd("79a7db22af5f420eb9d56e28fffca87b"),
    description:
      "Precision bubble puzzle with HD graphics. Aim, shoot, and match 3 or more bubbles of the same color to clear hundreds of levels.",
  },
  {
    id: "bubble-hit",
    title: "Bubble Hit",
    category: "Puzzle",
    thumb: gdThumb("502af82350a44582b6e51d467285a8c0"),
    url: gd("502af82350a44582b6e51d467285a8c0"),
    description:
      "Classic bubble-popping puzzle with colorful visuals. Create groups of 3+ matching bubbles and clear the screen before they reach the bottom.",
  },

  // ═══════════════════════════════════════════
  // ENDLESS / RUNNER (5)
  // ═══════════════════════════════════════════
  {
    id: "eg-subway-surfer",
    title: "EG Subway Surfer",
    category: "Endless",
    thumb: gdThumb("8baa45aabd504c1ab7a6c4ee9b1a336f"),
    url: gd("8baa45aabd504c1ab7a6c4ee9b1a336f"),
    description:
      "Endless subway runner. Dash through tracks, dodge trains, collect coins, and see how far you can go in this thrilling runner.",
  },
  {
    id: "endless-runner-3d",
    title: "Endless Runner 3D",
    category: "Endless",
    thumb: gdThumb("06be3a6f9a984ac3b83db72147f5cbc4"),
    url: gd("06be3a6f9a984ac3b83db72147f5cbc4"),
    description:
      "3D endless running filled with fun obstacles and power-ups. Swipe to turn, jump, and slide past deadly hazards in this fast-paced runner.",
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
    id: "tunnel-rush",
    title: "Tunnel Rush",
    category: "Endless",
    thumb: gdThumb("59bbba689dce41ddb2a4fbcbeb855cee"),
    url: gd("59bbba689dce41ddb2a4fbcbeb855cee"),
    description:
      "Race through a neon-lit 3D tunnel at blazing speed. Dodge obstacles, walls, and barriers with quick reflexes. How far can you survive?",
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
