"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

interface LeaderboardEntry {
  gameId: string;
  playerName: string;
  score: number;
  date: string;
}

/**
 * Local leaderboard backed by localStorage.
 * Stores top 5 scores per game.
 */
export function useLeaderboard() {
  const [entries, setEntries] = useLocalStorage<LeaderboardEntry[]>(
    "gz_leaderboard",
    []
  );

  const addScore = useCallback(
    (gameId: string, playerName: string, score: number) => {
      setEntries((prev) => {
        const next = [
          ...prev,
          { gameId, playerName, score, date: new Date().toLocaleDateString() },
        ];
        // Keep top 5 per game
        const grouped: Record<string, LeaderboardEntry[]> = {};
        for (const e of next) {
          if (!grouped[e.gameId]) grouped[e.gameId] = [];
          grouped[e.gameId].push(e);
        }
        const result: LeaderboardEntry[] = [];
        for (const key of Object.keys(grouped)) {
          grouped[key].sort((a, b) => b.score - a.score);
          result.push(...grouped[key].slice(0, 5));
        }
        return result;
      });
    },
    [setEntries]
  );

  const getScores = useCallback(
    (gameId: string) =>
      entries
        .filter((e) => e.gameId === gameId)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5),
    [entries]
  );

  return { addScore, getScores };
}
