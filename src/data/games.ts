// ================================================================
// GAME DATABASE — 40 Production-Ready Iframe-Safe HTML5 Games
// ================================================================
//
// Sources (all iframe-compatible, no X-Frame-Options blocking):
//   1. PlayPager (playpager.com/embed/) — purpose-built for iframe embedding
//   2. itch.io (embed-upload) — official HTML5 game embeds
//   3. GameDistribution (html5.gamedistribution.com) — HTML5 game CDN
//
// EVERY game loads INSIDE the iframe — no external redirects.
// All games are English-only, modern, mobile + desktop compatible.
// Platform-aware: each game tagged for mobile, desktop, or both.
// ================================================================

export type Category =
  | "Action"
  | "Racing"
  | "Puzzle"
  | "Shooter"
  | "Casual";

export type Platform = "mobile" | "desktop" | "both";

export type GameTag = "popular" | "new" | "recommended";

export interface Game {
  id: string;
  title: string;
  category: Category;
  platform: Platform;
  thumb: string;
  url: string;
  description: string;
  tags?: GameTag[];
}

export const categories: Category[] = [
  "Action",
  "Racing",
  "Puzzle",
  "Shooter",
  "Casual",
];

// Thumbnail helper — always-working placeholder per game
const thumb = (id: string) =>
  `https://picsum.photos/seed/${id}/512/384`;

// ──────────────────────────────────────────────────────────
// 40 GAMES — 8 per category, platform-tagged
// ──────────────────────────────────────────────────────────

export const games: Game[] = [
  // ═══════════════════════════════════════════
  // ACTION (8)
  // ═══════════════════════════════════════════
  {
    id: "stickman-kombat",
    title: "Stickman Kombat",
    category: "Action",
    platform: "both",
    thumb: thumb("stickman-kombat"),
    url: "https://html5.gamedistribution.com/6d3928f393774157a7aed692f08ee011/",
    description:
      "Intense 2D stickman fighting with smooth combos and special moves. Battle through waves of enemies using kicks, punches, and devastating finishers!",
    tags: ["popular", "recommended"],
  },
  {
    id: "knight-arena",
    title: "Knight Arena",
    category: "Action",
    platform: "desktop",
    thumb: thumb("knight-arena"),
    url: "https://html5.gamedistribution.com/9fcd52e69f0c4b9da545f4d5e8ad723b/",
    description:
      "Enter the arena as a brave knight and battle opponents in real-time combat. Slash, dodge, and conquer the battlefield to become champion!",
    tags: ["popular"],
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    category: "Action",
    platform: "both",
    thumb: thumb("tunnel-rush"),
    url: "https://html5.gamedistribution.com/59bbba689dce41ddb2a4fbcbeb855cee/",
    description:
      "Blast through a colorful 3D tunnel at breakneck speed! Dodge obstacles, weave through barriers, and test your reflexes in this adrenaline-pumping runner.",
    tags: ["popular", "new"],
  },
  {
    id: "helix-stack",
    title: "Helix Stack 3D",
    category: "Action",
    platform: "mobile",
    thumb: thumb("helix-stack"),
    url: "https://html5.gamedistribution.com/e825195ef8274b1cb326bf5362780424/",
    description:
      "Drop the ball through the helix tower by smashing through colorful platforms. Avoid the dark ones or it's game over! Fast, satisfying, and addictive.",
    tags: ["recommended"],
  },
  {
    id: "geometry-rush",
    title: "Geometry Rush",
    category: "Action",
    platform: "both",
    thumb: thumb("geometry-rush"),
    url: "https://html5.gamedistribution.com/563a3f252c6e4ef8a7fa4a59b9f47c5c/",
    description:
      "Navigate through geometric obstacles at increasing speed. Time your jumps perfectly and ride the rhythm in this fast-paced action game!",
    tags: ["new"],
  },
  {
    id: "dragon-blaze",
    title: "Dragon Blaze",
    category: "Action",
    platform: "desktop",
    thumb: thumb("dragon-blaze"),
    url: "https://itch.io/embed-upload/10842144?color=1a1a2e",
    description:
      "A thrilling 2D platformer adventure with stunning pixel art. Jump, dodge, and battle your way through dangerous levels with responsive controls!",
    tags: ["new", "recommended"],
  },
  {
    id: "paper-snakes",
    title: "Paper Snakes",
    category: "Action",
    platform: "both",
    thumb: thumb("paper-snakes"),
    url: "https://html5.gamedistribution.com/62014c3dd1dc4b13b8fb3013a8949639/",
    description:
      "Grow your snake by eating pellets and outmaneuver opponents in this multiplayer-style snake game. Cut off other players and dominate the arena!",
    tags: ["popular"],
  },
  {
    id: "bubble-game",
    title: "Bubble Game 3",
    category: "Action",
    platform: "mobile",
    thumb: thumb("bubble-game"),
    url: "https://html5.gamedistribution.com/27673bc45d2e4b27b7cd24e422f7c257/",
    description:
      "Fast-paced bubble popping action! Aim, shoot, and match colors to clear the board before time runs out. Quick reflexes and sharp aim required!",
  },

  // ═══════════════════════════════════════════
  // RACING (8)
  // ═══════════════════════════════════════════
  {
    id: "moto-x3m",
    title: "Moto X3M",
    category: "Racing",
    platform: "both",
    thumb: thumb("moto-x3m"),
    url: "https://html5.gamedistribution.com/5b0abd4c0faa4f5eb190a9a16d5a1b4c/",
    description:
      "Race your motorcycle through insane obstacle courses! Perform flips, dodge traps, and reach the finish line in record time. One of the best moto racing games!",
    tags: ["popular", "recommended"],
  },
  {
    id: "drift-boss",
    title: "Drift Boss",
    category: "Racing",
    platform: "mobile",
    thumb: thumb("drift-boss"),
    url: "https://html5.gamedistribution.com/0a8b51e5eaee42e7b4db83ca00afc92e/",
    description:
      "Master the art of drifting! Tap to steer your car along a winding road. One wrong move and you fall off the edge. How far can you drift?",
    tags: ["popular"],
  },
  {
    id: "top-speed-3d",
    title: "Top Speed Racing 3D",
    category: "Racing",
    platform: "desktop",
    thumb: thumb("top-speed-3d"),
    url: "https://html5.gamedistribution.com/e1704c5264514b4d8a1ab33308269250/",
    description:
      "High-speed 3D racing with stunning graphics! Dodge traffic, collect nitro boosts, and race through city streets at top speed.",
    tags: ["new", "recommended"],
  },
  {
    id: "f1-racing",
    title: "F1 Racing",
    category: "Racing",
    platform: "desktop",
    thumb: thumb("f1-racing"),
    url: "https://html5.gamedistribution.com/97f2eff444fd411aa5b5b73ce6d4926e/",
    description:
      "Experience the thrill of Formula 1 racing! Navigate tight corners, overtake opponents, and cross the finish line first in this high-octane racing game.",
    tags: ["recommended"],
  },
  {
    id: "drag-racing",
    title: "Drag Racing",
    category: "Racing",
    platform: "both",
    thumb: thumb("drag-racing"),
    url: "https://html5.gamedistribution.com/ad8fa388ce234b03b598c347e4fac8fa/",
    description:
      "Shift gears at the perfect moment and burn rubber down the drag strip. Upgrade your car and compete against faster opponents!",
    tags: ["new"],
  },
  {
    id: "subway-surfer",
    title: "Subway Surfer",
    category: "Racing",
    platform: "mobile",
    thumb: thumb("subway-surfer"),
    url: "https://html5.gamedistribution.com/8baa45aabd504c1ab7a6c4ee9b1a336f/",
    description:
      "Run, dodge, and surf through subway tracks! Avoid trains, collect coins, and use power-ups to run as far as you can in this endless runner.",
    tags: ["popular"],
  },
  {
    id: "endless-runner",
    title: "Endless Runner 3D",
    category: "Racing",
    platform: "mobile",
    thumb: thumb("endless-runner"),
    url: "https://html5.gamedistribution.com/06be3a6f9a984ac3b83db72147f5cbc4/",
    description:
      "Sprint through a 3D world, dodging obstacles and collecting gems. The speed increases the longer you survive — how far can you go?",
    tags: ["new"],
  },
  {
    id: "superspeed-xd",
    title: "SuperSpeed XD",
    category: "Racing",
    platform: "desktop",
    thumb: thumb("superspeed-xd"),
    url: "https://itch.io/embed-upload/2176008?color=333333",
    description:
      "A retro-inspired pseudo-3D racing game. Weave through traffic at blistering speed on neon-lit highways. Pure arcade racing fun!",
    tags: ["recommended"],
  },

  // ═══════════════════════════════════════════
  // PUZZLE (8)
  // ═══════════════════════════════════════════
  {
    id: "chess",
    title: "Chess",
    category: "Puzzle",
    platform: "both",
    thumb: "https://playpager.com/embed/chess/img/icon.png",
    url: "https://playpager.com/embed/chess/index.html",
    description:
      "The timeless game of strategy. Play against a computer AI with adjustable difficulty. Plan your moves, protect your king, and aim for checkmate.",
    tags: ["popular", "recommended"],
  },
  {
    id: "checkers",
    title: "Checkers",
    category: "Puzzle",
    platform: "both",
    thumb: "https://playpager.com/embed/checkers/img/icon.png",
    url: "https://playpager.com/embed/checkers/index.html",
    description:
      "Classic board game against the computer. Jump and capture opponent pieces, get kinged, and outmaneuver your way to victory.",
    tags: ["popular"],
  },
  {
    id: "sudoku",
    title: "Sudoku",
    category: "Puzzle",
    platform: "both",
    thumb: "https://playpager.com/embed/sudoku/img/icon.png",
    url: "https://playpager.com/embed/sudoku/index.html",
    description:
      "The classic number puzzle. Fill the 9×9 grid so every row, column, and 3×3 box contains digits 1–9. Multiple difficulty levels to challenge your logic.",
    tags: ["popular", "recommended"],
  },
  {
    id: "reversi",
    title: "Reversi",
    category: "Puzzle",
    platform: "both",
    thumb: thumb("reversi"),
    url: "https://playpager.com/embed/reversi/index.html",
    description:
      "The classic strategy board game also known as Othello. Place discs to flip your opponent's pieces. Control the most squares to win!",
    tags: ["recommended"],
  },
  {
    id: "word-puzzle",
    title: "Word Puzzle",
    category: "Puzzle",
    platform: "mobile",
    thumb: thumb("word-puzzle"),
    url: "https://playpager.com/embed/wordpuzzle/index.html",
    description:
      "Find hidden words in the letter grid. Swipe to connect letters and discover all the words. A great brain teaser for word game lovers.",
    tags: ["new"],
  },
  {
    id: "mahjong-connect",
    title: "Mahjong Connect",
    category: "Puzzle",
    platform: "desktop",
    thumb: thumb("mahjong-connect"),
    url: "https://html5.gamedistribution.com/a7f5393b417346268657f3bd67eac24e/",
    description:
      "Connect matching Mahjong tiles to clear the board. Find pairs that can be linked with a path of no more than two turns. Relaxing yet challenging!",
    tags: ["popular"],
  },
  {
    id: "block-puzzle",
    title: "Block Puzzle Jewel",
    category: "Puzzle",
    platform: "mobile",
    thumb: thumb("block-puzzle"),
    url: "https://html5.gamedistribution.com/415961cf27fb44759c184d150b301f54/",
    description:
      "Drag and drop jewel-colored blocks onto the grid to form complete rows and columns. Strategic placement is key — don't run out of space!",
    tags: ["new"],
  },
  {
    id: "merge-fruit",
    title: "Merge Fruit",
    category: "Puzzle",
    platform: "mobile",
    thumb: thumb("merge-fruit"),
    url: "https://html5.gamedistribution.com/2dee9d404697435aa76111eb4015e1d5/",
    description:
      "Drop and merge matching fruits to create bigger ones. Plan your drops carefully — if the container overflows, it's game over! Addictive merge puzzle fun.",
    tags: ["new", "recommended"],
  },

  // ═══════════════════════════════════════════
  // SHOOTER (8)
  // ═══════════════════════════════════════════
  {
    id: "zombie-killer",
    title: "Zombie Killer",
    category: "Shooter",
    platform: "desktop",
    thumb: thumb("zombie-killer"),
    url: "https://html5.gamedistribution.com/58123f23619347ec868bf2892a0b7ec5/",
    description:
      "Survive the zombie apocalypse! Aim and shoot hordes of undead before they reach you. Upgrade weapons and hold your ground in this intense shooter.",
    tags: ["popular", "recommended"],
  },
  {
    id: "battle-tank",
    title: "Battle Tank",
    category: "Shooter",
    platform: "desktop",
    thumb: thumb("battle-tank"),
    url: "https://html5.gamedistribution.com/a6c29f69d4414cada11ee4e3f3dc4f1a/",
    description:
      "Command your tank on the battlefield! Aim, fire, and destroy enemy tanks. Navigate terrain and use cover to survive and dominate.",
    tags: ["popular"],
  },
  {
    id: "army-combat",
    title: "Army Combat",
    category: "Shooter",
    platform: "desktop",
    thumb: thumb("army-combat"),
    url: "https://html5.gamedistribution.com/8f48d982f0394ff4acf7140e7d02bffa/",
    description:
      "Lead your army into combat! Take on enemy forces with rifles, grenades, and tactical movements. Complete missions and rise through the ranks.",
    tags: ["new", "recommended"],
  },
  {
    id: "stickman-sniper",
    title: "Stickman Sniper",
    category: "Shooter",
    platform: "both",
    thumb: thumb("stickman-sniper"),
    url: "https://html5.gamedistribution.com/5f64d55ddf874545a9cc1fdc37fcf4f6/",
    description:
      "Take aim as a stickman sniper! Line up your shots carefully, account for distance, and eliminate targets with precision in this tactical shooter.",
    tags: ["recommended"],
  },
  {
    id: "battleship-war",
    title: "Battleship War",
    category: "Shooter",
    platform: "both",
    thumb: thumb("battleship-war"),
    url: "https://html5.gamedistribution.com/85dcb4270a524c31810cdeeeaf311bec/",
    description:
      "The classic naval strategy game! Place your ships, guess enemy positions, and sink their fleet before they sink yours. Fire at will!",
    tags: ["popular"],
  },
  {
    id: "bubble-shooter-extreme",
    title: "Bubble Shooter Extreme",
    category: "Shooter",
    platform: "mobile",
    thumb: thumb("bubble-shooter-extreme"),
    url: "https://html5.gamedistribution.com/c3f0f0c6731a4d908d978fb7906a0b17/",
    description:
      "The ultimate bubble shooting experience! Aim and match 3 or more bubbles of the same color to pop them. Clear the board to advance through levels.",
    tags: ["new"],
  },
  {
    id: "bubble-shooter-hd",
    title: "Bubble Shooter HD",
    category: "Shooter",
    platform: "mobile",
    thumb: thumb("bubble-shooter-hd"),
    url: "https://html5.gamedistribution.com/79a7db22af5f420eb9d56e28fffca87b/",
    description:
      "Beautiful HD bubble shooting with smooth physics. Pop colorful bubbles by matching colors, use bank shots off walls, and aim for combos!",
    tags: ["popular"],
  },
  {
    id: "bubble-hit",
    title: "Bubble Hit",
    category: "Shooter",
    platform: "both",
    thumb: thumb("bubble-hit"),
    url: "https://html5.gamedistribution.com/502af82350a44582b6e51d467285a8c0/",
    description:
      "Classic bubble shooter with a twist! Pop clusters of matching bubbles, trigger chain reactions, and rack up massive scores.",
    tags: ["new"],
  },

  // ═══════════════════════════════════════════
  // CASUAL (8)
  // ═══════════════════════════════════════════
  {
    id: "solitaire",
    title: "Solitaire",
    category: "Casual",
    platform: "both",
    thumb: thumb("solitaire"),
    url: "https://playpager.com/embed/solitaire/index.html",
    description:
      "The classic card game of Solitaire (Klondike). Sort cards by suit from Ace to King. A relaxing yet strategic game that never gets old.",
    tags: ["popular", "recommended"],
  },
  {
    id: "falling-cubes",
    title: "Falling Cubes",
    category: "Casual",
    platform: "mobile",
    thumb: thumb("falling-cubes"),
    url: "https://playpager.com/embed/cubes/index.html",
    description:
      "A relaxing falling-block puzzle game. Match colors and clear rows before the cubes stack too high. Easy to pick up, hard to put down!",
    tags: ["popular"],
  },
  {
    id: "mini-chess",
    title: "Mini Chess",
    category: "Casual",
    platform: "both",
    thumb: thumb("mini-chess"),
    url: "https://playpager.com/embed/minichess/index.html",
    description:
      "A compact version of chess on a smaller board. Quicker games, same deep strategy. Perfect for a quick brain workout between tasks!",
    tags: ["recommended"],
  },
  {
    id: "mini-checkers",
    title: "Mini Checkers",
    category: "Casual",
    platform: "both",
    thumb: thumb("mini-checkers"),
    url: "https://playpager.com/embed/minicheckers/index.html",
    description:
      "A streamlined version of checkers on a smaller board. Fast-paced matches with the same addictive capturing gameplay.",
    tags: ["new"],
  },
  {
    id: "mini-reversi",
    title: "Mini Reversi",
    category: "Casual",
    platform: "both",
    thumb: thumb("mini-reversi"),
    url: "https://playpager.com/embed/minireversi/index.html",
    description:
      "A compact version of Reversi for quick matches. Flip your opponent's pieces and control the board in this fast-paced strategy game.",
    tags: ["new"],
  },
  {
    id: "2048",
    title: "2048",
    category: "Casual",
    platform: "mobile",
    thumb: thumb("2048"),
    url: "https://gabrielecirulli.github.io/2048/",
    description:
      "The viral number puzzle! Slide tiles on a grid to combine them and reach the 2048 tile. Simple to learn, incredibly addictive — can you beat your high score?",
    tags: ["popular", "recommended"],
  },
  {
    id: "dog-surfer",
    title: "Dog Surfer",
    category: "Casual",
    platform: "mobile",
    thumb: thumb("dog-surfer"),
    url: "https://itch.io/embed-upload/730559?color=333333",
    description:
      "Surf the waves as an adorable dog! Dodge obstacles, collect treats, and ride the perfect wave in this charming casual game. Pure fun!",
    tags: ["new", "recommended"],
  },
  {
    id: "snake",
    title: "Snake",
    category: "Casual",
    platform: "both",
    thumb: thumb("snake"),
    url: "https://patorjk.github.io/snake.io/",
    description:
      "The classic snake game reimagined. Guide your snake to eat food and grow longer. Don't crash into yourself or the walls — how long can you survive?",
    tags: ["popular"],
  },
];

// ──────────────────────────────────────────────────────────
// Helper functions
// ──────────────────────────────────────────────────────────

/** Find a game by ID */
export function getGameById(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

/** Get games by category */
export function getGamesByCategory(category: Category): Game[] {
  return games.filter((g) => g.category === category);
}

/** Get games by tag */
export function getGamesByTag(tag: GameTag): Game[] {
  return games.filter((g) => g.tags?.includes(tag));
}

/** Get games filtered by platform compatibility */
export function getGamesForPlatform(
  isMobile: boolean,
  gameList: Game[] = games
): Game[] {
  return gameList.filter((g) => {
    if (g.platform === "both") return true;
    return isMobile ? g.platform === "mobile" : g.platform === "desktop";
  });
}

/** Get popular games */
export function getPopularGames(): Game[] {
  return getGamesByTag("popular");
}

/** Get new games */
export function getNewGames(): Game[] {
  return getGamesByTag("new");
}

/** Get recommended games */
export function getRecommendedGames(): Game[] {
  return getGamesByTag("recommended");
}
