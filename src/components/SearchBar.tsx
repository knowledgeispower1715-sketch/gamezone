"use client";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        placeholder="Search games…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-700/60 bg-gray-900/60 py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none backdrop-blur-sm transition-all focus:border-purple-500/60 focus:bg-gray-900/80 focus:ring-2 focus:ring-purple-500/20"
      />
    </div>
  );
}
