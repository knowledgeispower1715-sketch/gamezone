"use client";

interface FavoriteButtonProps {
  isFav: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}

export default function FavoriteButton({
  isFav,
  onToggle,
  size = "sm",
}: FavoriteButtonProps) {
  const px = size === "md" ? "h-10 w-10" : "h-7 w-7";
  const icon = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // prevent Link navigation when inside a card
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      className={`flex items-center justify-center rounded-full transition-all duration-200 ${px} ${
        isFav
          ? "bg-red-500/20 text-red-400 shadow-lg shadow-red-500/10 hover:bg-red-500/30"
          : "bg-black/40 text-gray-400 backdrop-blur-sm hover:bg-black/60 hover:text-red-400"
      }`}
    >
      <svg
        className={icon}
        fill={isFav ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
}
