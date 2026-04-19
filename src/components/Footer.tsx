import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800/50 bg-black/40">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold">
              <span className="text-white">Game</span>
              <span className="text-purple-400">Zone</span>
            </span>
            <p className="mt-2 text-sm text-gray-500">
              Play free online games directly in your browser. No downloads, no
              installs — just pure fun.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Categories
            </h4>
            <div className="space-y-1.5 text-sm text-gray-500">
              <Link href="/?category=Multiplayer" className="block hover:text-white transition-colors">Multiplayer Games</Link>
              <Link href="/?category=Racing" className="block hover:text-white transition-colors">Racing Games</Link>
              <Link href="/?category=Shooting" className="block hover:text-white transition-colors">Shooting Games</Link>
              <Link href="/?category=Puzzle" className="block hover:text-white transition-colors">Puzzle Games</Link>
              <Link href="/?category=Endless" className="block hover:text-white transition-colors">Endless Runner Games</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              About
            </h4>
            <p className="text-sm text-gray-500">
              All games are free and legal HTML5/WebGL titles. We respect game
              developers and only embed games with proper permissions.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800/50 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} GameZone. All games are property of their
          respective developers.
        </div>
      </div>
    </footer>
  );
}
