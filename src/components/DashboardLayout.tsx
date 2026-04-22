"use client";

import { useState, useCallback, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDevice } from "@/hooks/useDevice";

/* ── Sidebar context ── */
interface SidebarCtx {
  open: boolean;
  toggle: () => void;
  close: () => void;
}
const SidebarContext = createContext<SidebarCtx>({
  open: false,
  toggle: () => {},
  close: () => {},
});
export const useSidebar = () => useContext(SidebarContext);

/* ── Nav items ── */
const navItems = [
  {
    label: "Home",
    href: "/",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    ),
    mobileIcon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    ),
  },
  {
    label: "Mobile",
    href: "/?platform=mobile",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    ),
    mobileIcon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    ),
  },
  {
    label: "PC",
    href: "/?platform=desktop",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z"
      />
    ),
    mobileIcon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z"
      />
    ),
  },
  {
    label: "Categories",
    href: "/#games",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
      />
    ),
    mobileIcon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
      />
    ),
  },
  {
    label: "Favorites",
    href: "/#favorites",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    ),
    mobileIcon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    ),
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { isMobile } = useDevice();

  const toggle = useCallback(() => setSidebarOpen((v) => !v), []);
  const close = useCallback(() => setSidebarOpen(false), []);

  const isActive = (href: string) => {
    if (href === "/") {
      return (
        pathname === "/" &&
        (typeof window === "undefined" || !window.location.search)
      );
    }
    return (
      pathname +
        (typeof window !== "undefined" ? window.location.search : "") ===
      href
    );
  };

  return (
    <SidebarContext.Provider value={{ open: sidebarOpen, toggle, close }}>
      <div className="flex h-screen overflow-hidden" style={{ background: "#0f0f1a" }}>
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
        )}

        {/* ── Desktop Sidebar ── */}
        <aside
          className={`fixed z-50 top-0 left-0 h-full w-[260px] flex flex-col transition-transform duration-300 ease-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            background: "rgba(15, 15, 26, 0.95)",
            backdropFilter: "blur(20px)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Sidebar Header */}
          <div
            className="flex h-16 items-center gap-3 px-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/20">
              <svg
                className="h-4.5 w-4.5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 6H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM7 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm2-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Game<span className="text-purple-400">Zone</span>
            </span>
            <button
              onClick={close}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={close}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                    active
                      ? "bg-purple-600/15 text-white shadow-sm shadow-purple-500/5"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
                  }`}
                >
                  <svg
                    className={`h-[18px] w-[18px] shrink-0 ${active ? "text-purple-400" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                  {item.label}
                  {active && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div
            className="px-5 py-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="rounded-xl bg-gradient-to-br from-purple-600/10 to-transparent p-3 border border-purple-500/10">
              <p className="text-[11px] font-medium text-purple-300">
                Free to Play
              </p>
              <p className="mt-0.5 text-[10px] text-gray-500">
                No downloads required
              </p>
            </div>
            <p className="mt-3 text-[10px] text-gray-600 text-center">
              &copy; {new Date().getFullYear()} GameZone
            </p>
          </div>
        </aside>

        {/* ── Main Area ── */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          {/* ── Top Bar ── */}
          <header
            className="sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-3 px-3 sm:px-5"
            style={{
              background: "rgba(15, 15, 26, 0.85)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Menu button */}
            <button
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-white/5 hover:text-white active:scale-95"
              aria-label="Menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/15">
                <svg
                  className="h-4 w-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 6H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM7 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm2-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white tracking-tight hidden sm:inline">
                Game<span className="text-purple-400">Zone</span>
              </span>
            </Link>

            <div className="flex-1" />

            {/* Live badge */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 border border-green-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 pulse-live" />
              <span className="text-[10px] font-medium text-green-400">
                LIVE
              </span>
            </div>

            {/* Profile */}
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/80 to-purple-800/80 text-[10px] font-bold text-white shadow-sm">
              G
            </div>
          </header>

          {/* ── Content ── */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth main-content-area">
            {children}
          </main>

          {/* ── Mobile Bottom Nav ── */}
          {isMobile && (
            <nav className="fixed bottom-0 left-0 right-0 z-30 bottom-nav safe-area-bottom">
              <div className="flex items-center justify-around px-2 py-1.5">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all ${
                        active
                          ? "text-purple-400"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={active ? 2 : 1.5}
                        viewBox="0 0 24 24"
                      >
                        {item.mobileIcon}
                      </svg>
                      <span
                        className={`text-[9px] font-medium ${active ? "text-purple-400" : "text-gray-600"}`}
                      >
                        {item.label}
                      </span>
                      {active && (
                        <div className="absolute -top-0.5 h-0.5 w-6 rounded-full bg-purple-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
