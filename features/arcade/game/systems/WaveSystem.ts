import { ARCADE_START_XP_TO_NEXT, ARCADE_WAVE_DURATION_MS, ARCADE_XP_GROWTH } from "@/features/arcade/domain";

export function getWave(elapsedMs: number): number {
  return Math.max(1, Math.floor(elapsedMs / ARCADE_WAVE_DURATION_MS) + 1);
}

export function xpToNextLevel(level: number): number {
  return Math.floor(ARCADE_START_XP_TO_NEXT * Math.pow(ARCADE_XP_GROWTH, Math.max(0, level - 1)));
}
