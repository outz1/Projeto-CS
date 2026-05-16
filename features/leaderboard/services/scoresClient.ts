import {
  parseScoresApiResponse,
  type GameType,
  type ScoreEntry,
} from "@/features/leaderboard/domain";

type FetchTopScoresInput = {
  game?: GameType;
  limit?: number;
  signal?: AbortSignal;
};

export async function fetchTopScores({
  game = "snake",
  limit = 5,
  signal,
}: FetchTopScoresInput = {}): Promise<ScoreEntry[]> {
  const query = game === "snake" ? "" : `?game=${encodeURIComponent(game)}`;
  const response = await fetch(`/api/scores${query}`, { signal });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) return [];

  return parseScoresApiResponse(payload).slice(0, limit);
}
