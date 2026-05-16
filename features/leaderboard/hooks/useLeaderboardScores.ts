"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GameType, ScoreEntry } from "@/lib/leaderboardSecurity";
import { fetchTopScores } from "@/features/leaderboard/services/scoresClient";

type UseLeaderboardScoresResult = {
  scores: ScoreEntry[];
  loading: boolean;
  refresh: () => Promise<void>;
};

export function useLeaderboardScores(game: GameType = "snake", limit = 5): UseLeaderboardScoresResult {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(false);

  const loadScores = useCallback(
    async (signal?: AbortSignal) => {
      const topScores = await fetchTopScores({ game, limit, signal });
      if (!isMountedRef.current || signal?.aborted) return;
      setScores(topScores);
    },
    [game, limit],
  );

  useEffect(() => {
    isMountedRef.current = true;
    const controller = new AbortController();

    void (async () => {
      try {
        await loadScores(controller.signal);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Erro ao buscar ranking:", error);
      } finally {
        if (!isMountedRef.current || controller.signal.aborted) return;
        setLoading(false);
      }
    })();

    return () => {
      isMountedRef.current = false;
      controller.abort();
    };
  }, [loadScores]);

  const refresh = useCallback(async () => {
    try {
      await loadScores();
    } catch (error) {
      console.error("Erro ao atualizar ranking:", error);
    }
  }, [loadScores]);

  return { scores, loading, refresh };
}
