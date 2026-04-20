// ================================================================
// GAME DATABASE — 25 Iframe-Safe HTML5 Games
// ================================================================
//
// ALL URLs are iframe-compatible (no X-Frame-Options blocking):
//   1. GitHub Pages (*.github.io) — no restrictive headers
//   2. PlayPager (playpager.com/embed/) — designed for iframe embedding
//   3. Open-source game sites with permissive CORS
//
// EVERY game loads INSIDE the iframe — no external redirects.
// Tested for Vercel production deployment.
// ================================================================

export type Category =
  | "Puzzle"
  | "Arcade"
  | "Racing"
  | "Shooter"
  | "Casual";

export interface Game {
  id: string;
  title: string;
  category: Category;
  thumb: string;
  url: string;
  description: string;
}

export const categories: Category[] = [
  "Puzzle",
  "Arcade",
  "Racing",
  "Shooter",
  "Casual",
];

// Thumbnail helper — always-working placeholder per game
const thumb = (id: string) =>
  `https://picsum.photos/seed/${id}/512/384`;

// ──────────────────────────────────────────────────────────
// 25 GAMES — All iframe-safe, HTTPS, no login required
// ──────────────────────────────────────────────────────────

export const games: Game[] = [
  // ═══════════════════════════════════════════
  // PUZZLE (5)
  // ═══════════════════════════════════════════
  {
    id: "2048",
    title: "2048",
    category: "Puzzle",
    thumb: thumb("2048"),
    url: "https://gabrielecirulli.github.io/2048/",
    description:
      "The viral number puzzle. Slide tiles on a grid to combine them and reach the 2048 tile. Simple to learn, incredibly addictive — can you beat your high score?",
  },
  {
    id: "hextris",
    title: "Hextris",
    category: "Puzzle",
    thumb: thumb("hextris"),
    url: "https://hextris.github.io/hextris/",
    description:
      "A fast-paced puzzle game inspired by Tetris. Rotate the hexagon to catch falling blocks and match 3+ of the same color to clear them before they stack up.",
  },
  {
    id: "sudoku",
    title: "Sudoku",
    category: "Puzzle",
    thumb: "https://playpager.com/embed/sudoku/img/icon.png",
    url: "https://playpager.com/embed/sudoku/index.html",
    description:
      "The classic number puzzle. Fill the 9x9 grid so every row, column, and 3x3 box contains digits 1-9. Multiple difficulty levels to challenge your logic.",
  },
  {
    id: "chess",
    title: "Chess",
    category: "Puzzle",
    thumb: "https://playpager.com/embed/chess/img/icon.png",
    url: "https://playpager.com/embed/chess/index.html",
    description:
      "The timeless game of strategy. Play against a computer AI with adjustable difficulty. Plan your moves, protect your king, and aim for checkmate.",
  },
  {
    id: "checkers",
    title: "Checkers",
    category: "Puzzle",
    thumb: "https://playpager.com/embed/checkers/img/icon.png",
    url: "https://playpager.com/embed/checkers/index.html",
    description:
      "Classic board game of checkers against the computer. Jump and capture opponent pieces, get kinged, and outmaneuver your way to victory.",
  },

  // ═══════════════════════════════════════════
  // ARCADE (5)
  // ═══════════════════════════════════════════
  {
    id: "pacman",
    title: "Pac-Man",
    category: "Arcade",
    thumb: thumb("pacman"),
    url: "https://mumuy.github.io/pacman/",
    description:
      "The legendary arcade classic rebuilt in HTML5. Navigate the maze, eat all the dots, grab power pellets, and avoid the ghosts — or turn the tables and eat them!",
  },
  {
    id: "clumsy-bird",
    title: "Clumsy Bird",
    category: "Arcade",
    thumb: thumb("clumsy-bird"),
    url: "https://ellisonleao.github.io/clumsy-bird/",
    description:
      "A Flappy Bird-style game built with MelonJS. Tap to flap, dodge the pipes, and see how far you can fly. Simple controls, punishing difficulty — one more try!",
  },
  {
    id: "floppy-bird",
    title: "Floppy Bird",
    category: "Arcade",
    thumb: thumb("floppy-bird"),
    url: "https://nebez.github.io/floppybird/",
    description:
      "The iconic flappy bird experience recreated in pure HTML5. Click or tap to keep the bird airborne and navigate through the gaps. How high can you score?",
  },
  {
    id: "breakout",
    title: "Breakout",
    category: "Arcade",
    thumb: thumb("breakout"),
    url: "https://toivjon.github.io/html5-breakout/",
    description:
      "The classic brick-breaking arcade game. Bounce the ball off your paddle to destroy all the bricks. Don't let the ball fall past your paddle!",
  },
  {
    id: "pong",
    title: "Pong",
    category: "Arcade",
    thumb: thumb("pong"),
    url: "https://toivjon.github.io/html5-pong/",
    description:
      "The game that started it all. Move your paddle up and down to hit the ball past your opponent. First to the target score wins this retro classic.",
  },

  // ═══════════════════════════════════════════
  // RACING (5)
  // ═══════════════════════════════════════════
  {
    id: "hexgl",
    title: "HexGL",
    category: "Racing",
    thumb: thumb("hexgl"),
    url: "https://hexgl.bkcore.com/",
    description:
      "A futuristic racing game built with WebGL. Pilot your ship at incredible speed through neon-lit tracks. Stunning 3D graphics right in your browser!",
  },
  {
    id: "retro-racer",
    title: "Retro Racer",
    category: "Racing",
    thumb: thumb("retro-racer"),
    url: "https://lrq3000.github.io/javascript-racer/v5.game.html",
    description:
      "An outrun-style pseudo-3D racing game. Use arrow keys to steer, avoid traffic, and cross the finish line before time runs out. Pure retro speed!",
  },
  {
    id: "crazy-racing",
    title: "Crazy Racing",
    category: "Racing",
    thumb: thumb("crazy-racing"),
    url: "https://yuehaowang.github.io/games/crazy_racing/index.html",
    description:
      "A fast-paced HTML5 car racing game. Dodge obstacles, collect power-ups, and race to the finish in this action-packed driving challenge.",
  },
  {
    id: "gran-trak",
    title: "Gran Trak 2020",
    category: "Racing",
    thumb: thumb("gran-trak"),
    url: "https://pkubiak.github.io/gran-trak-2020/",
    description:
      "A modern HTML5 clone of the classic Atari racing game. Navigate the track, avoid walls, and complete laps as fast as you can in this retro racer.",
  },
  {
    id: "drift-racers",
    title: "Drift Racers",
    category: "Racing",
    thumb: thumb("drift-racers"),
    url: "https://ferrettmc.github.io/drift-racers/",
    description:
      "A 2D drifting car game with multiple racetracks. Master the art of drifting, hit checkpoints, and compete for the fastest lap time.",
  },

  // ═══════════════════════════════════════════
  // SHOOTER (5)
  // ═══════════════════════════════════════════
  {
    id: "space-invaders",
    title: "Space Invaders",
    category: "Shooter",
    thumb: thumb("space-invaders"),
    url: "https://toivjon.github.io/html5-space-invaders/",
    description:
      "The legendary arcade shooter in HTML5. Defend Earth from waves of descending alien invaders. Move, shoot, and survive the onslaught!",
  },
  {
    id: "space-shooter",
    title: "Space Shooter",
    category: "Shooter",
    thumb: thumb("space-shooter"),
    url: "https://abilityguy.github.io/Space-Shooter/space_shooter.html",
    description:
      "Pilot your spaceship through waves of enemies. Use arrow keys to move and spacebar to shoot. Destroy enemies and dodge incoming fire to survive.",
  },
  {
    id: "space-blaster",
    title: "Space Blaster",
    category: "Shooter",
    thumb: thumb("space-blaster"),
    url: "https://coryrylan.github.io/space-shooter/",
    description:
      "A canvas-based space shooting game. Dodge asteroids and blast them to pieces for points. Each game starts with three lives — how long can you survive?",
  },
  {
    id: "asteroids",
    title: "Asteroids",
    category: "Shooter",
    thumb: thumb("asteroids"),
    url: "https://vkomianos.github.io/p5-asteroids-game/",
    description:
      "A remake of the classic Asteroids arcade game built with p5.js. Navigate your ship, shoot asteroids, and survive as the difficulty ramps up.",
  },
  {
    id: "alien-defense",
    title: "Alien Defense",
    category: "Shooter",
    thumb: thumb("alien-defense"),
    url: "https://michalgoly.github.io/SpaceShooter/",
    description:
      "An HTML5 canvas space shooter with momentum physics. Blast alien ships, dodge projectiles, and rack up the highest score in this fast-paced action game.",
  },

  // ═══════════════════════════════════════════
  // CASUAL (5)
  // ═══════════════════════════════════════════
  {
    id: "solitaire",
    title: "Solitaire",
    category: "Casual",
    thumb: thumb("solitaire"),
    url: "https://playpager.com/embed/solitaire/index.html",
    description:
      "The classic card game of Solitaire (Klondike). Sort cards by suit from Ace to King. A relaxing yet strategic game that never gets old.",
  },
  {
    id: "word-puzzle",
    title: "Word Puzzle",
    category: "Casual",
    thumb: thumb("word-puzzle"),
    url: "https://playpager.com/embed/wordpuzzle/index.html",
    description:
      "Find hidden words in the letter grid. Swipe to connect letters and discover all the words. A great brain teaser for word game lovers.",
  },
  {
    id: "reversi",
    title: "Reversi",
    category: "Casual",
    thumb: thumb("reversi"),
    url: "https://playpager.com/embed/reversi/index.html",
    description:
      "The classic strategy board game also known as Othello. Place discs to flip your opponent's pieces. Control the most squares to win!",
  },
  {
    id: "falling-cubes",
    title: "Falling Cubes",
    category: "Casual",
    thumb: thumb("falling-cubes"),
    url: "https://playpager.com/embed/cubes/index.html",
    description:
      "A relaxing falling-block puzzle game. Match colors and clear rows before the cubes stack too high. Easy to pick up, hard to put down.",
  },
  {
    id: "slot-machine",
    title: "Slot Machine",
    category: "Casual",
    thumb: thumb("slot-machine"),
    url: "https://nicholaswmin.github.io/slotMachine/",
    description:
      "A fun HTML5 canvas slot machine. Pull the lever, watch the reels spin, and try your luck. No real money involved — just pure entertainment!",
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
