// ================================================================
// GAME DATABASE — 40 Production-Ready Iframe-Safe HTML5 Games
// ================================================================

export type Category = "Action" | "Racing" | "Puzzle" | "Shooter" | "Casual";
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

// Real thumbnails from GameDistribution CDN
const gdThumb = (hash: string) =>
  `https://img.gamedistribution.com/${hash}-512x384.jpeg`;

// ──────────────────────────────────────────────────────────
// 40 GAMES — 8 per category
// ──────────────────────────────────────────────────────────

export const games: Game[] = [
  // ═══ ACTION (8) ═══
  {
    id: "stickman-kombat",
    title: "Stickman Kombat",
    category: "Action",
    platform: "both",
    thumb: gdThumb("6d3928f393774157a7aed692f08ee011"),
    url: "https://html5.gamedistribution.com/6d3928f393774157a7aed692f08ee011/",
    description: "Intense stickman fighting with combos and special moves.",
    tags: ["popular", "recommended"],
  },
  {
    id: "knight-arena",
    title: "Knight Arena",
    category: "Action",
    platform: "desktop",
    thumb: gdThumb("9fcd52e69f0c4b9da545f4d5e8ad723b"),
    url: "https://html5.gamedistribution.com/9fcd52e69f0c4b9da545f4d5e8ad723b/",
    description: "Battle opponents in real-time arena combat as a knight.",
    tags: ["popular"],
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    category: "Action",
    platform: "both",
    thumb: gdThumb("59bbba689dce41ddb2a4fbcbeb855cee"),
    url: "https://html5.gamedistribution.com/59bbba689dce41ddb2a4fbcbeb855cee/",
    description: "Blast through a 3D tunnel at breakneck speed dodging obstacles.",
    tags: ["popular", "new"],
  },
  {
    id: "helix-stack",
    title: "Helix Stack 3D",
    category: "Action",
    platform: "mobile",
    thumb: gdThumb("e825195ef8274b1cb326bf5362780424"),
    url: "https://html5.gamedistribution.com/e825195ef8274b1cb326bf5362780424/",
    description: "Drop the ball through the helix tower smashing platforms.",
    tags: ["recommended"],
  },
  {
    id: "geometry-rush",
    title: "Geometry Rush",
    category: "Action",
    platform: "both",
    thumb: gdThumb("563a3f252c6e4ef8a7fa4a59b9f47c5c"),
    url: "https://html5.gamedistribution.com/563a3f252c6e4ef8a7fa4a59b9f47c5c/",
    description: "Navigate geometric obstacles at increasing speed.",
    tags: ["new"],
  },
  {
    id: "dragon-blaze",
    title: "Dragon Blaze",
    category: "Action",
    platform: "desktop",
    thumb: "https://img.itch.zone/aW1nLzE3MDk4NTQ0LnBuZw==/315x250%23c/preview.png",
    url: "https://itch.io/embed-upload/10842144?color=1a1a2e",
    description: "Thrilling 2D platformer with pixel art and responsive controls.",
    tags: ["new", "recommended"],
  },
  {
    id: "paper-snakes",
    title: "Paper Snakes",
    category: "Action",
    platform: "both",
    thumb: gdThumb("62014c3dd1dc4b13b8fb3013a8949639"),
    url: "https://html5.gamedistribution.com/62014c3dd1dc4b13b8fb3013a8949639/",
    description: "Grow your snake and outmaneuver opponents in this arena game.",
    tags: ["popular"],
  },
  {
    id: "bubble-game",
    title: "Bubble Game 3",
    category: "Action",
    platform: "mobile",
    thumb: gdThumb("27673bc45d2e4b27b7cd24e422f7c257"),
    url: "https://html5.gamedistribution.com/27673bc45d2e4b27b7cd24e422f7c257/",
    description: "Fast-paced bubble popping — aim, shoot, and match colors.",
  },

  // ═══ RACING (8) ═══
  {
    id: "moto-x3m",
    title: "Moto X3M",
    category: "Racing",
    platform: "both",
    thumb: gdThumb("5b0abd4c0faa4f5eb190a9a16d5a1b4c"),
    url: "https://html5.gamedistribution.com/5b0abd4c0faa4f5eb190a9a16d5a1b4c/",
    description: "Race your motorcycle through insane obstacle courses.",
    tags: ["popular", "recommended"],
  },
  {
    id: "drift-boss",
    title: "Drift Boss",
    category: "Racing",
    platform: "mobile",
    thumb: gdThumb("0a8b51e5eaee42e7b4db83ca00afc92e"),
    url: "https://html5.gamedistribution.com/0a8b51e5eaee42e7b4db83ca00afc92e/",
    description: "Master drifting — one wrong move and you fall off the edge.",
    tags: ["popular"],
  },
  {
    id: "top-speed-3d",
    title: "Top Speed Racing 3D",
    category: "Racing",
    platform: "desktop",
    thumb: gdThumb("e1704c5264514b4d8a1ab33308269250"),
    url: "https://html5.gamedistribution.com/e1704c5264514b4d8a1ab33308269250/",
    description: "High-speed 3D racing with stunning graphics.",
    tags: ["new", "recommended"],
  },
  {
    id: "f1-racing",
    title: "F1 Racing",
    category: "Racing",
    platform: "desktop",
    thumb: gdThumb("97f2eff444fd411aa5b5b73ce6d4926e"),
    url: "https://html5.gamedistribution.com/97f2eff444fd411aa5b5b73ce6d4926e/",
    description: "Experience the thrill of Formula 1 racing.",
    tags: ["recommended"],
  },
  {
    id: "drag-racing",
    title: "Drag Racing",
    category: "Racing",
    platform: "both",
    thumb: gdThumb("ad8fa388ce234b03b598c347e4fac8fa"),
    url: "https://html5.gamedistribution.com/ad8fa388ce234b03b598c347e4fac8fa/",
    description: "Shift gears at the perfect moment and burn rubber.",
    tags: ["new"],
  },
  {
    id: "subway-surfer",
    title: "Subway Surfer",
    category: "Racing",
    platform: "mobile",
    thumb: gdThumb("8baa45aabd504c1ab7a6c4ee9b1a336f"),
    url: "https://html5.gamedistribution.com/8baa45aabd504c1ab7a6c4ee9b1a336f/",
    description: "Run, dodge, and surf through subway tracks.",
    tags: ["popular"],
  },
  {
    id: "endless-runner",
    title: "Endless Runner 3D",
    category: "Racing",
    platform: "mobile",
    thumb: gdThumb("06be3a6f9a984ac3b83db72147f5cbc4"),
    url: "https://html5.gamedistribution.com/06be3a6f9a984ac3b83db72147f5cbc4/",
    description: "Sprint through a 3D world dodging obstacles.",
    tags: ["new"],
  },
  {
    id: "superspeed-xd",
    title: "SuperSpeed XD",
    category: "Racing",
    platform: "desktop",
    thumb: "https://img.itch.zone/aW1nLzE3MDk4NTQ0LnBuZw==/315x250%23c/preview.png",
    url: "https://itch.io/embed-upload/2176008?color=333333",
    description: "Retro pseudo-3D racing on neon-lit highways.",
    tags: ["recommended"],
  },

  // ═══ PUZZLE (8) ═══
  {
    id: "chess",
    title: "Chess",
    category: "Puzzle",
    platform: "both",
    thumb: "https://playpager.com/embed/chess/img/icon.png",
    url: "https://playpager.com/embed/chess/index.html",
    description: "The timeless game of strategy against computer AI.",
    tags: ["popular", "recommended"],
  },
  {
    id: "checkers",
    title: "Checkers",
    category: "Puzzle",
    platform: "both",
    thumb: "https://playpager.com/embed/checkers/img/icon.png",
    url: "https://playpager.com/embed/checkers/index.html",
    description: "Classic board game — jump and capture to win.",
    tags: ["popular"],
  },
  {
    id: "sudoku",
    title: "Sudoku",
    category: "Puzzle",
    platform: "both",
    thumb: "https://playpager.com/embed/sudoku/img/icon.png",
    url: "https://playpager.com/embed/sudoku/index.html",
    description: "Fill the 9x9 grid — every row, column, box has 1-9.",
    tags: ["popular", "recommended"],
  },
  {
    id: "reversi",
    title: "Reversi",
    category: "Puzzle",
    platform: "both",
    thumb: "https://playpager.com/embed/reversi/img/icon.png",
    url: "https://playpager.com/embed/reversi/index.html",
    description: "Place discs to flip your opponent's pieces.",
    tags: ["recommended"],
  },
  {
    id: "word-puzzle",
    title: "Word Puzzle",
    category: "Puzzle",
    platform: "mobile",
    thumb: "https://playpager.com/embed/wordpuzzle/img/icon.png",
    url: "https://playpager.com/embed/wordpuzzle/index.html",
    description: "Find hidden words in the letter grid.",
    tags: ["new"],
  },
  {
    id: "mahjong-connect",
    title: "Mahjong Connect",
    category: "Puzzle",
    platform: "desktop",
    thumb: gdThumb("a7f5393b417346268657f3bd67eac24e"),
    url: "https://html5.gamedistribution.com/a7f5393b417346268657f3bd67eac24e/",
    description: "Connect matching tiles to clear the board.",
    tags: ["popular"],
  },
  {
    id: "block-puzzle",
    title: "Block Puzzle Jewel",
    category: "Puzzle",
    platform: "mobile",
    thumb: gdThumb("415961cf27fb44759c184d150b301f54"),
    url: "https://html5.gamedistribution.com/415961cf27fb44759c184d150b301f54/",
    description: "Drag jewel blocks onto the grid to clear rows.",
    tags: ["new"],
  },
  {
    id: "merge-fruit",
    title: "Merge Fruit",
    category: "Puzzle",
    platform: "mobile",
    thumb: gdThumb("2dee9d404697435aa76111eb4015e1d5"),
    url: "https://html5.gamedistribution.com/2dee9d404697435aa76111eb4015e1d5/",
    description: "Drop and merge matching fruits — don't overflow!",
    tags: ["new", "recommended"],
  },

  // ═══ SHOOTER (8) ═══
  {
    id: "zombie-killer",
    title: "Zombie Killer",
    category: "Shooter",
    platform: "desktop",
    thumb: gdThumb("58123f23619347ec868bf2892a0b7ec5"),
    url: "https://html5.gamedistribution.com/58123f23619347ec868bf2892a0b7ec5/",
    description: "Survive the zombie apocalypse — aim and shoot hordes.",
    tags: ["popular", "recommended"],
  },
  {
    id: "battle-tank",
    title: "Battle Tank",
    category: "Shooter",
    platform: "desktop",
    thumb: gdThumb("a6c29f69d4414cada11ee4e3f3dc4f1a"),
    url: "https://html5.gamedistribution.com/a6c29f69d4414cada11ee4e3f3dc4f1a/",
    description: "Command your tank on the battlefield.",
    tags: ["popular"],
  },
  {
    id: "army-combat",
    title: "Army Combat",
    category: "Shooter",
    platform: "desktop",
    thumb: gdThumb("8f48d982f0394ff4acf7140e7d02bffa"),
    url: "https://html5.gamedistribution.com/8f48d982f0394ff4acf7140e7d02bffa/",
    description: "Lead your army into combat with rifles and grenades.",
    tags: ["new", "recommended"],
  },
  {
    id: "stickman-sniper",
    title: "Stickman Sniper",
    category: "Shooter",
    platform: "both",
    thumb: gdThumb("5f64d55ddf874545a9cc1fdc37fcf4f6"),
    url: "https://html5.gamedistribution.com/5f64d55ddf874545a9cc1fdc37fcf4f6/",
    description: "Line up shots and eliminate targets with precision.",
    tags: ["recommended"],
  },
  {
    id: "battleship-war",
    title: "Battleship War",
    category: "Shooter",
    platform: "both",
    thumb: gdThumb("85dcb4270a524c31810cdeeeaf311bec"),
    url: "https://html5.gamedistribution.com/85dcb4270a524c31810cdeeeaf311bec/",
    description: "Classic naval strategy — sink the enemy fleet.",
    tags: ["popular"],
  },
  {
    id: "bubble-shooter-extreme",
    title: "Bubble Shooter Extreme",
    category: "Shooter",
    platform: "mobile",
    thumb: gdThumb("c3f0f0c6731a4d908d978fb7906a0b17"),
    url: "https://html5.gamedistribution.com/c3f0f0c6731a4d908d978fb7906a0b17/",
    description: "Match 3+ bubbles of the same color to pop them.",
    tags: ["new"],
  },
  {
    id: "bubble-shooter-hd",
    title: "Bubble Shooter HD",
    category: "Shooter",
    platform: "mobile",
    thumb: gdThumb("79a7db22af5f420eb9d56e28fffca87b"),
    url: "https://html5.gamedistribution.com/79a7db22af5f420eb9d56e28fffca87b/",
    description: "HD bubble shooting with smooth physics.",
    tags: ["popular"],
  },
  {
    id: "bubble-hit",
    title: "Bubble Hit",
    category: "Shooter",
    platform: "both",
    thumb: gdThumb("502af82350a44582b6e51d467285a8c0"),
    url: "https://html5.gamedistribution.com/502af82350a44582b6e51d467285a8c0/",
    description: "Pop clusters and trigger chain reactions.",
    tags: ["new"],
  },

  // ═══ CASUAL (8) ═══
  {
    id: "solitaire",
    title: "Solitaire",
    category: "Casual",
    platform: "both",
    thumb: "https://playpager.com/embed/solitaire/img/icon.png",
    url: "https://playpager.com/embed/solitaire/index.html",
    description: "Classic Klondike solitaire card game.",
    tags: ["popular", "recommended"],
  },
  {
    id: "falling-cubes",
    title: "Falling Cubes",
    category: "Casual",
    platform: "mobile",
    thumb: "https://playpager.com/embed/cubes/img/icon.png",
    url: "https://playpager.com/embed/cubes/index.html",
    description: "Match colors and clear rows in this falling-block puzzle.",
    tags: ["popular"],
  },
  {
    id: "mini-chess",
    title: "Mini Chess",
    category: "Casual",
    platform: "both",
    thumb: "https://playpager.com/embed/minichess/img/icon.png",
    url: "https://playpager.com/embed/minichess/index.html",
    description: "Compact chess on a smaller board — quick matches.",
    tags: ["recommended"],
  },
  {
    id: "mini-checkers",
    title: "Mini Checkers",
    category: "Casual",
    platform: "both",
    thumb: "https://playpager.com/embed/minicheckers/img/icon.png",
    url: "https://playpager.com/embed/minicheckers/index.html",
    description: "Fast-paced checkers on a smaller board.",
    tags: ["new"],
  },
  {
    id: "mini-reversi",
    title: "Mini Reversi",
    category: "Casual",
    platform: "both",
    thumb: "https://playpager.com/embed/minireversi/img/icon.png",
    url: "https://playpager.com/embed/minireversi/index.html",
    description: "Compact Reversi for quick strategic matches.",
    tags: ["new"],
  },
  {
    id: "2048",
    title: "2048",
    category: "Casual",
    platform: "mobile",
    thumb: "https://play-lh.googleusercontent.com/sVxnFBFMJkIVuBlDiArpNMFBx9KD7GN2LNngGrefYRCMmLMI9r3bKhTklRcGgvFJVEQ=w240-h480-rw",
    url: "https://gabrielecirulli.github.io/2048/",
    description: "Slide tiles to combine them and reach 2048.",
    tags: ["popular", "recommended"],
  },
  {
    id: "dog-surfer",
    title: "Dog Surfer",
    category: "Casual",
    platform: "mobile",
    thumb: "https://img.itch.zone/aW1nLzE3MDk4NTQ0LnBuZw==/315x250%23c/preview.png",
    url: "https://itch.io/embed-upload/730559?color=333333",
    description: "Surf waves as an adorable dog — collect treats!",
    tags: ["new", "recommended"],
  },
  {
    id: "snake",
    title: "Snake",
    category: "Casual",
    platform: "both",
    thumb: "https://play-lh.googleusercontent.com/9eBJHOaGkU8VvHBoGMh-7_UKzb1v1rQhB5mCFGSBL8kpGQa1-VsNu7z77AXfkLUoXQ=w240-h480-rw",
    url: "https://patorjk.github.io/snake.io/",
    description: "Classic snake — eat, grow, don't crash.",
    tags: ["popular"],
  },
];

// ──────────────────────────────────────────────────────────
// Helper functions
// ──────────────────────────────────────────────────────────

export function getGameById(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function getGamesByCategory(category: Category): Game[] {
  return games.filter((g) => g.category === category);
}

export function getGamesByTag(tag: GameTag): Game[] {
  return games.filter((g) => g.tags?.includes(tag));
}

export function getGamesForPlatform(
  isMobile: boolean,
  gameList: Game[] = games
): Game[] {
  return gameList.filter((g) => {
    if (g.platform === "both") return true;
    return isMobile ? g.platform === "mobile" : g.platform === "desktop";
  });
}

export function getPopularGames(): Game[] {
  return getGamesByTag("popular");
}

export function getNewGames(): Game[] {
  return getGamesByTag("new");
}

export function getRecommendedGames(): Game[] {
  return getGamesByTag("recommended");
}
