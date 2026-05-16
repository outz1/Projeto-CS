import {
  ARCADE_MAX_KILLS,
  ARCADE_MAX_SCORE,
  ARCADE_MAX_UPGRADES_RECORDED,
  ARCADE_MAX_WAVE,
  ARCADE_UPGRADE_IDS,
} from "./arcadeBalance";
import { estimatedArcadeScoreCeiling } from "./arcadeScore";
import {
  isValidDurationMs,
  isValidPlayerId,
  normalizePlayerName,
  sanitizePlayerId,
} from "@/features/leaderboard/domain";
import type { ArcadeScorePayload } from "./arcadeTypes";

function asObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function isValidUpgrades(raw: unknown): raw is string[] {
  if (!Array.isArray(raw)) return false;
  if (raw.length > ARCADE_MAX_UPGRADES_RECORDED) return false;
  return raw.every((item) => typeof item === "string" && ARCADE_UPGRADE_IDS.includes(item as (typeof ARCADE_UPGRADE_IDS)[number]));
}

export function parseArcadeScorePayload(value: unknown): ArcadeScorePayload | null {
  const obj = asObject(value);
  if (!obj) return null;

  const name = normalizePlayerName(obj.name);
  const id = sanitizePlayerId(obj.id);
  const score = obj.score;
  const durationMs = obj.durationMs;
  const kills = obj.kills;
  const wave = obj.wave;
  const upgrades = obj.upgrades;
  const game = obj.game;

  if (!name || !isValidPlayerId(id)) return null;
  if (game !== "arcade") return null;
  if (typeof score !== "number" || !Number.isInteger(score) || score < 0 || score > ARCADE_MAX_SCORE) return null;
  if (!isValidDurationMs(durationMs)) return null;
  if (typeof kills !== "number" || !Number.isInteger(kills) || kills < 0 || kills > ARCADE_MAX_KILLS) return null;
  if (typeof wave !== "number" || !Number.isInteger(wave) || wave < 1 || wave > ARCADE_MAX_WAVE) return null;
  if (!isValidUpgrades(upgrades)) return null;

  // Anti-cheat por coerência temporal
  const seconds = Math.max(1, Math.floor(durationMs / 1000));
  const maxWaveByTime = Math.floor(seconds / 8) + 3;
  if (wave > maxWaveByTime) return null;

  const maxKillsByTime = seconds * 20;
  if (kills > maxKillsByTime) return null;

  const scoreCeiling = estimatedArcadeScoreCeiling(durationMs, kills, wave);
  if (score > scoreCeiling) return null;

  return {
    name,
    id,
    score,
    durationMs,
    kills,
    wave,
    upgrades,
    game: "arcade",
  };
}
