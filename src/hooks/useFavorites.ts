"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

/**
 * Favorites system backed by localStorage.
 * Stores an array of game IDs the user has favorited.
 */
export function useFavorites() {
  const [favIds, setFavIds] = useLocalStorage<string[]>("gz_favorites", []);

  const isFavorite = useCallback(
    (id: string) => favIds.includes(id),
    [favIds]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavIds((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    },
    [setFavIds]
  );

  return { favIds, isFavorite, toggleFavorite };
}
