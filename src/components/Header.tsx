"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/60 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-violet-700 shadow-lg shadow-purple-500/20 transition-shadow group-hover:shadow-purple-500/40">
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 6H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM7 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm2-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Game</span>
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Zone
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/#games"
            className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            All Games
          </Link>
          <Link
            href="/#favorites"
            className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            ❤ Favorites
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-800 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-gray-800/60 bg-black/90 px-4 pb-4 pt-2 md:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/#games" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white">
            All Games
          </Link>
          <Link href="/#favorites" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white">
            ❤ Favorites
          </Link>
        </nav>
      )}
    </header>
  );
}
