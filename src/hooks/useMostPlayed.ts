"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

/**
 * Most Played tracking — counts how many times each game is opened.
 * Used for "Trending" and "Most Played" sorting on homepage.
 */
export function useMostPlayed() {
  const [counts, setCounts] = useLocalStorage<Record<string, number>>(
    "gz_play_counts",
    {}
  );

  const increment = useCallback(
    (id: string) => {
      setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    },
    [setCounts]
  );

  const getCount = useCallback((id: string) => counts[id] ?? 0, [counts]);

  /** Return game IDs sorted by play count descending */
  const topIds = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => id);

  return { increment, getCount, topIds, counts };
}
