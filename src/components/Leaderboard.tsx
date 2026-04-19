"use client";

import { useState } from "react";
import { useLeaderboard } from "@/hooks/useLeaderboard";

interface LeaderboardProps {
  gameId: string;
  gameTitle: string;
}

export default function Leaderboard({ gameId, gameTitle }: LeaderboardProps) {
  const { addScore, getScores } = useLeaderboard();
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [showForm, setShowForm] = useState(false);

  const scores = getScores(gameId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const s = parseInt(score, 10);
    if (!n || isNaN(s) || s < 0) return;
    addScore(gameId, n, s);
    setName("");
    setScore("");
    setShowForm(false);
  };

  return (
    <div className="rounded-xl border border-gray-800/60 bg-gray-900/40 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-200">
          🏆 Leaderboard
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-purple-600/20 px-3 py-1 text-xs font-medium text-purple-300 transition-colors hover:bg-purple-600/30"
        >
          + Add Score
        </button>
      </div>

      {/* Score submission form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-200 outline-none focus:border-purple-500"
            maxLength={20}
          />
          <input
            type="number"
            placeholder="Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-24 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-200 outline-none focus:border-purple-500"
            min={0}
          />
          <button
            type="submit"
            className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-purple-500"
          >
            Save
          </button>
        </form>
      )}

      {/* Score list */}
      {scores.length > 0 ? (
        <div className="mt-3 space-y-1.5">
          {scores.map((entry, i) => (
            <div
              key={`${entry.playerName}-${entry.score}-${i}`}
              className="flex items-center rounded-lg bg-gray-800/40 px-3 py-2 text-xs"
            >
              <span
                className={`mr-3 font-bold ${
                  i === 0
                    ? "text-yellow-400"
                    : i === 1
                      ? "text-gray-300"
                      : i === 2
                        ? "text-amber-600"
                        : "text-gray-500"
                }`}
              >
                #{i + 1}
              </span>
              <span className="flex-1 text-gray-300">{entry.playerName}</span>
              <span className="font-mono font-semibold text-purple-300">
                {entry.score.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-center text-xs text-gray-600">
          No scores yet for {gameTitle}. Be the first!
        </p>
      )}
    </div>
  );
}
