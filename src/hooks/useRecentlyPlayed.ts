"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

interface RecentEntry {
  id: string;
  timestamp: number;
}

const MAX_RECENT = 10;

/**
 * Recently Played system backed by localStorage.
 * Stores the last 10 games the user opened, newest first.
 */
export function useRecentlyPlayed() {
  const [recent, setRecent] = useLocalStorage<RecentEntry[]>(
    "gz_recently_played",
    []
  );

  const addRecent = useCallback(
    (id: string) => {
      setRecent((prev) => {
        const filtered = prev.filter((r) => r.id !== id);
        return [{ id, timestamp: Date.now() }, ...filtered].slice(
          0,
          MAX_RECENT
        );
      });
    },
    [setRecent]
  );

  const recentIds = recent.map((r) => r.id);

  return { recentIds, addRecent };
}
