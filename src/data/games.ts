// ================================================================
// 🎮 GAME DATABASE — 25 Real, Free, Embeddable HTML5 Games
// ================================================================
//
// ALL URLs below point to GameDistribution.com's free CDN.
// These are legal, embeddable HTML5 games designed for iframe use.
//
// FORMAT: https://html5.gamedistribution.com/{GAME_HASH}/
//
// HOW TO ADD MORE GAMES:
// ──────────────────────
// 1. Go to https://gamedistribution.com/games
// 2. Click any game → click the copy/embed button
// 3. Grab the hash from the iframe src URL
// 4. Add a new entry below with that hash
//
// THUMBNAIL TIPS:
// ───────────────
// The thumbnails below use picsum.photos as reliable placeholders.
// For production, replace with actual game screenshots:
//   - Host in /public/thumbs/ → use "/thumbs/game-name.jpg"
//   - Or use GameDistribution's CDN thumbnails
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

// ──────────────────────────────────────────────────────────
// 🎮 25 VERIFIED GAMES — all hashes sourced from
//    GameDistribution's public CDN (html5.gamedistribution.com)
// ──────────────────────────────────────────────────────────

export const games: Game[] = [
  // ═══════════════════════════════════════════
  // MULTIPLAYER (5)
  // ═══════════════════════════════════════════
  {
    id: "paper-snakes",
    title: "Paper Snakes",
    category: "Multiplayer",
    thumb: "https://picsum.photos/seed/papersnakes/480/270",
    url: gd("62014c3dd1dc4b13b8fb3013a8949639"),
    description:
      "A slithering io snake game with a paper theme. Eat others to grow bigger, choose awesome snakes, and battle your way to the top of the leaderboard.",
  },
  {
    id: "knight-arena-io",
    title: "Knight Arena.io",
    category: "Multiplayer",
    thumb: "https://picsum.photos/seed/knightarena/480/270",
    url: gd("9fcd52e69f0c4b9da545f4d5e8ad723b"),
    description:
      "Enter a medieval battle arena as a knight. Fight against other players in real-time multiplayer combat, upgrade your gear, and dominate the arena.",
  },
  {
    id: "battleship-war",
    title: "Battleship War Multiplayer",
    category: "Multiplayer",
    thumb: "https://picsum.photos/seed/battleshipwar/480/270",
    url: gd("85dcb4270a524c31810cdeeeaf311bec"),
    description:
      "The classic Battleship board game brought online. Place your fleet, guess enemy positions, and sink all their ships before they sink yours.",
  },
  {
    id: "stickman-kombat",
    title: "Stickman Kombat 2D",
    category: "Multiplayer",
    thumb: "https://picsum.photos/seed/stickmankombat/480/270",
    url: gd("6d3928f393774157a7aed692f08ee011"),
    description:
      "Fast-paced stickman fighting game. Choose your fighter, master combos, and battle opponents in 2D arena combat with smooth animations.",
  },
  {
    id: "bubble-game-3",
    title: "Bubble Game 3",
    category: "Multiplayer",
    thumb: "https://picsum.photos/seed/bubblegame3/480/270",
    url: gd("27673bc45d2e4b27b7cd24e422f7c257"),
    description:
      "Competitive bubble-popping action. Match and shoot colored bubbles to clear the board faster than your opponents in this addictive arcade game.",
  },

  // ═══════════════════════════════════════════
  // RACING (5)
  // ═══════════════════════════════════════════
  {
    id: "moto-x3m",
    title: "Moto X3M",
    category: "Racing",
    thumb: "https://picsum.photos/seed/motox3m/480/270",
    url: gd("5b0abd4c0faa4f5eb190a9a16d5a1b4c"),
    description:
      "Extreme motorcycle obstacle course with 25 challenging levels. Time your flips perfectly, dodge deadly traps, and earn 3 stars on every level.",
  },
  {
    id: "drift-boss",
    title: "Drift Boss",
    category: "Racing",
    thumb: "https://picsum.photos/seed/driftboss/480/270",
    url: gd("0a8b51e5eaee42e7b4db83ca00afc92e"),
    description:
      "Master the art of controlled chaos as your car hurtles forward. Click or tap to execute perfect drifts around every corner without falling off the edge.",
  },
  {
    id: "top-speed-racing-3d",
    title: "Top Speed Racing 3D",
    category: "Racing",
    thumb: "https://picsum.photos/seed/topspeed3d/480/270",
    url: gd("e1704c5264514b4d8a1ab33308269250"),
    description:
      "Extreme 3D racing with unimaginable obstacles and challenging levels. Push your car to the limit and overtake rivals at breakneck speed.",
  },
  {
    id: "f1-racing",
    title: "F1 Racing",
    category: "Racing",
    thumb: "https://picsum.photos/seed/f1racing/480/270",
    url: gd("97f2eff444fd411aa5b5b73ce6d4926e"),
    description:
      "High-octane Formula 1 racing with different modes and tournaments. Race on professional circuits and compete for the championship title.",
  },
  {
    id: "drag-racing",
    title: "Drag Racing",
    category: "Racing",
    thumb: "https://picsum.photos/seed/dragracing/480/270",
    url: gd("ad8fa388ce234b03b598c347e4fac8fa"),
    description:
      "Beat rivals in straight-line speed battles. Buy cars, upgrade engines, and fine-tune your ride to become the fastest drag racer on the strip.",
  },

  // ═══════════════════════════════════════════
  // SHOOTING (5)
  // ═══════════════════════════════════════════
  {
    id: "zombie-killer",
    title: "Zombie Killer",
    category: "Shooting",
    thumb: "https://picsum.photos/seed/zombiekiller/480/270",
    url: gd("58123f23619347ec868bf2892a0b7ec5"),
    description:
      "Survive the zombie apocalypse by gunning down waves of undead. Collect weapons, upgrade your firepower, and hold out as long as possible.",
  },
  {
    id: "battle-tank",
    title: "Battle Tank",
    category: "Shooting",
    thumb: "https://picsum.photos/seed/battletank/480/270",
    url: gd("a6c29f69d4414cada11ee4e3f3dc4f1a"),
    description:
      "Defend your territory and destroy enemy tanks. Collect power-ups including shields, missiles, and cannons to dominate the battlefield.",
  },
  {
    id: "army-combat",
    title: "Army Combat",
    category: "Shooting",
    thumb: "https://picsum.photos/seed/armycombat/480/270",
    url: gd("8f48d982f0394ff4acf7140e7d02bffa"),
    description:
      "Tactical army shooter with 2 game modes and multiple weapons. Engage in intense combat scenarios with polished graphics and smooth controls.",
  },
  {
    id: "stickman-sniper-3",
    title: "Stickman Sniper 3",
    category: "Shooting",
    thumb: "https://picsum.photos/seed/stickmansniper/480/270",
    url: gd("5f64d55ddf874545a9cc1fdc37fcf4f6"),
    description:
      "Take on sniper missions and gun down targets across multiple levels. Line up your shots carefully and complete each mission for maximum stars.",
  },
  {
    id: "bubble-shooter-extreme",
    title: "Bubble Shooter Extreme",
    category: "Shooting",
    thumb: "https://picsum.photos/seed/bubbleshooter/480/270",
    url: gd("c3f0f0c6731a4d908d978fb7906a0b17"),
    description:
      "HD bubble-shooting action with precision aiming. Match 3 or more same-colored bubbles to pop them, clear all bubbles to advance through levels.",
  },

  // ═══════════════════════════════════════════
  // PUZZLE (5)
  // ═══════════════════════════════════════════
  {
    id: "mahjong-connect",
    title: "Mahjong Connect",
    category: "Puzzle",
    thumb: "https://picsum.photos/seed/mahjongconnect/480/270",
    url: gd("a7f5393b417346268657f3bd67eac24e"),
    description:
      "Classic Mahjong tile-matching puzzle. Connect pairs of identical tiles with a path of no more than 3 lines. Clear the entire board to win.",
  },
  {
    id: "block-puzzle-jewel",
    title: "Block Puzzle Jewel",
    category: "Puzzle",
    thumb: "https://picsum.photos/seed/blockjewel/480/270",
    url: gd("415961cf27fb44759c184d150b301f54"),
    description:
      "A Sudoku meets Tetris puzzle game. Drag jewel-colored blocks onto the grid and complete full lines to score. Simple to learn, hard to master.",
  },
  {
    id: "merge-fruit",
    title: "Merge Fruit",
    category: "Puzzle",
    thumb: "https://picsum.photos/seed/mergefruit/480/270",
    url: gd("2dee9d404697435aa76111eb4015e1d5"),
    description:
      "Suika-style merging puzzle game. Drop random fruits and merge two matching ones into a higher-level fruit. A worldwide viral hit — how high can you score?",
  },
  {
    id: "bubble-shooter-hd",
    title: "Bubble Shooter HD",
    category: "Puzzle",
    thumb: "https://picsum.photos/seed/bubbleshooterhd/480/270",
    url: gd("79a7db22af5f420eb9d56e28fffca87b"),
    description:
      "Precision bubble puzzle with HD graphics. Aim, shoot, and match 3 or more bubbles of the same color to clear the board across hundreds of levels.",
  },
  {
    id: "bubble-hit",
    title: "Bubble Hit",
    category: "Puzzle",
    thumb: "https://picsum.photos/seed/bubblehit/480/270",
    url: gd("502af82350a44582b6e51d467285a8c0"),
    description:
      "Classic bubble-popping puzzle game with colorful visuals. Create groups of 3+ matching bubbles and clear the screen before bubbles reach the bottom.",
  },

  // ═══════════════════════════════════════════
  // ENDLESS / RUNNER (5)
  // ═══════════════════════════════════════════
  {
    id: "eg-subway-surfer",
    title: "EG Subway Surfer",
    category: "Endless",
    thumb: "https://picsum.photos/seed/subwaysurfer/480/270",
    url: gd("8baa45aabd504c1ab7a6c4ee9b1a336f"),
    description:
      "Endless subway runner for fans of Subway Surfers. Dash through tracks, dodge trains, collect coins, and see how far you can go.",
  },
  {
    id: "endless-runner-3d",
    title: "Endless Runner 3D",
    category: "Endless",
    thumb: "https://picsum.photos/seed/endlessrunner/480/270",
    url: gd("06be3a6f9a984ac3b83db72147f5cbc4"),
    description:
      "3D endless running filled with fun obstacles and power-ups. Swipe to turn, jump, and slide past deadly hazards in this fast-paced runner.",
  },
  {
    id: "helix-stack-3d",
    title: "Helix Stack 3D",
    category: "Endless",
    thumb: "https://picsum.photos/seed/helixstack/480/270",
    url: gd("e825195ef8274b1cb326bf5362780424"),
    description:
      "Rotate the helix maze and guide a bouncing ball through gaps. Avoid red platforms or it is game over. An addictive Helix Jump-style challenge.",
  },
  {
    id: "geometry-rush-4d",
    title: "Geometry Rush 4D",
    category: "Endless",
    thumb: "https://picsum.photos/seed/geometryrush/480/270",
    url: gd("563a3f252c6e4ef8a7fa4a59b9f47c5c"),
    description:
      "Exhilarating 4D platformer with neon geometry aesthetics. Jump and dash through rhythm-based levels with increasing speed and difficulty.",
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    category: "Endless",
    thumb: "https://picsum.photos/seed/tunnelrush/480/270",
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
