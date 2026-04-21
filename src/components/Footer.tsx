import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 border-t border-white/5 bg-black/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-10">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold">
              <span className="text-white">Game</span>
              <span className="text-purple-400">Zone</span>
            </span>
            <p className="mt-2 text-sm text-gray-500">
              Play free online games directly in your browser. No downloads, no
              installs — just pure fun on any device.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Categories
            </h4>
            <div className="space-y-1.5 text-sm text-gray-500">
              <Link href="/#games" className="block hover:text-white transition-colors">
                Action Games
              </Link>
              <Link href="/#games" className="block hover:text-white transition-colors">
                Racing Games
              </Link>
              <Link href="/#games" className="block hover:text-white transition-colors">
                Puzzle Games
              </Link>
              <Link href="/#games" className="block hover:text-white transition-colors">
                Shooter Games
              </Link>
              <Link href="/#games" className="block hover:text-white transition-colors">
                Casual Games
              </Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              About
            </h4>
            <p className="text-sm text-gray-500">
              All games are free and legal HTML5/WebGL titles. We respect game
              developers and only embed games with proper permissions. Optimized
              for both mobile and desktop.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-white/5 pt-5 sm:pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} GameZone. All games are property of
          their respective developers.
        </div>
      </div>
    </footer>
  );
}
