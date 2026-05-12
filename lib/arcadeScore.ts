import { ARCADE_MAX_SCORE } from "@/lib/arcadeBalance";

interface ScoreParams {
  kills: number;
  eliteKills: number;
  wave: number;
  durationMs: number;
  combo: number;
  scoreMultiplier?: number;
}

export function getSurvivalBonus(durationMs: number): number {
  return Math.floor(durationMs / 1000) * 2;
}

export function getComboBonus(combo: number): number {
  if (combo <= 1) return 0;
  return Math.floor(combo * combo * 6);
}

export function computeArcadeScore({
  kills,
  eliteKills,
  wave,
  durationMs,
  combo,
  scoreMultiplier = 1,
}: ScoreParams): number {
  const survivalBonus = getSurvivalBonus(durationMs);
  const comboBonus = getComboBonus(combo);
  const base =
    kills * 10 +
    eliteKills * 100 +
    wave * 50 +
    survivalBonus +
    comboBonus;

  return Math.max(0, Math.min(ARCADE_MAX_SCORE, Math.floor(base * scoreMultiplier)));
}

export function estimatedArcadeScoreCeiling(durationMs: number, kills: number, wave: number): number {
  const seconds = Math.max(1, Math.floor(durationMs / 1000));
  const aggressiveCeiling = kills * 500 + wave * 1_000 + seconds * 200;
  return Math.min(ARCADE_MAX_SCORE, aggressiveCeiling);
}
