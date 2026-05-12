export interface ScoreEntry {
  name: string;
  id: string;
  score: number;
}

export interface ScoreSubmitPayload extends ScoreEntry {
  durationMs: number;
}

const FALLBACK_PLAYER_NAME = "ANONIMO";
const NAME_MAX_LENGTH = 18;
const PLAYER_ID_LENGTH = 6;
const SCORE_MIN = 0;
const SCORE_MAX = 5000;
const SCORE_STEP = 10;
const MIN_MS_PER_FOOD = 70;
const MAX_GAME_DURATION_MS = 1000 * 60 * 60;

const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F-\u009F]/g;
const INVISIBLE_CHARS_REGEX = /[\u200B-\u200D\uFEFF\u2060]/g;
const BIDI_CHARS_REGEX = /[\u202A-\u202E\u2066-\u2069\u200E\u200F]/g;
const UNSAFE_NAME_CHARS_REGEX = /[^A-Za-zÀ-ÖØ-öø-ÿ0-9 _-]/g;
const MULTI_SPACE_REGEX = /\s+/g;
const PLAYER_ID_FORMAT = /^[A-HJ-NP-Z2-9]{6}$/;

function normalizeUnicode(value: string): string {
  try {
    return value.normalize("NFKC");
  } catch {
    return value;
  }
}

function stripUnsafeText(value: string): string {
  return value
    .replace(CONTROL_CHARS_REGEX, "")
    .replace(INVISIBLE_CHARS_REGEX, "")
    .replace(BIDI_CHARS_REGEX, "");
}

export function sanitizePlayerNameInput(raw: unknown): string {
  if (typeof raw !== "string") return "";

  const normalized = normalizeUnicode(raw);
  const safe = stripUnsafeText(normalized)
    .replace(UNSAFE_NAME_CHARS_REGEX, "")
    .replace(MULTI_SPACE_REGEX, " ")
    .trim();

  return safe.slice(0, NAME_MAX_LENGTH);
}

export function normalizePlayerName(raw: unknown): string {
  const safe = sanitizePlayerNameInput(raw);
  return (safe || FALLBACK_PLAYER_NAME).toUpperCase();
}

export function sanitizePlayerId(raw: unknown): string {
  if (typeof raw !== "string") return "";

  const normalized = normalizeUnicode(raw).toUpperCase();
  const safe = stripUnsafeText(normalized).replace(/[^A-HJ-NP-Z2-9]/g, "");
  return safe.slice(0, PLAYER_ID_LENGTH);
}

export function isValidPlayerId(raw: unknown): raw is string {
  return typeof raw === "string" && PLAYER_ID_FORMAT.test(raw);
}

export function isValidScore(raw: unknown): raw is number {
  return (
    typeof raw === "number" &&
    Number.isInteger(raw) &&
    raw >= SCORE_MIN &&
    raw <= SCORE_MAX &&
    raw % SCORE_STEP === 0
  );
}

export function isValidDurationMs(raw: unknown): raw is number {
  return (
    typeof raw === "number" &&
    Number.isInteger(raw) &&
    raw >= 0 &&
    raw <= MAX_GAME_DURATION_MS
  );
}

export function isSuspiciousDuration(score: number, durationMs: number): boolean {
  if (score <= 0) return false;
  const foodsEaten = score / SCORE_STEP;
  const minDurationMs = Math.max(900, foodsEaten * MIN_MS_PER_FOOD);
  return durationMs < minDurationMs;
}

function asObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export function parseScoreEntry(value: unknown): ScoreEntry | null {
  const obj = asObject(value);
  if (!obj) return null;

  const name = sanitizePlayerNameInput(obj.name);
  const id = sanitizePlayerId(obj.id);
  const score = obj.score;

  if (!name || !isValidPlayerId(id) || !isValidScore(score)) return null;

  return {
    name: name.toUpperCase(),
    id,
    score,
  };
}

export function parseScoreSubmitPayload(value: unknown): ScoreSubmitPayload | null {
  const obj = asObject(value);
  if (!obj) return null;

  const normalizedName = normalizePlayerName(obj.name);
  const id = sanitizePlayerId(obj.id);
  const score = obj.score;
  const durationMs = obj.durationMs;

  if (!normalizedName || !isValidPlayerId(id) || !isValidScore(score) || !isValidDurationMs(durationMs)) {
    return null;
  }

  if (isSuspiciousDuration(score, durationMs)) {
    return null;
  }

  return {
    name: normalizedName,
    id,
    score,
    durationMs,
  };
}

export function parseScoresApiResponse(payload: unknown): ScoreEntry[] {
  if (Array.isArray(payload)) {
    return payload
      .map(parseScoreEntry)
      .filter((entry): entry is ScoreEntry => entry !== null)
      .sort((a, b) => b.score - a.score);
  }

  const obj = asObject(payload);
  if (!obj || obj.ok !== true || !Array.isArray(obj.data)) return [];

  return obj.data
    .map(parseScoreEntry)
    .filter((entry): entry is ScoreEntry => entry !== null)
    .sort((a, b) => b.score - a.score);
}

export function extractRetryAfterSeconds(payload: unknown): number | null {
  const obj = asObject(payload);
  if (!obj) return null;

  if (typeof obj.retryAfter === "number" && Number.isFinite(obj.retryAfter) && obj.retryAfter > 0) {
    return Math.ceil(obj.retryAfter);
  }

  const error = asObject(obj.error);
  if (!error) return null;

  if (typeof error.retryAfter === "number" && Number.isFinite(error.retryAfter) && error.retryAfter > 0) {
    return Math.ceil(error.retryAfter);
  }

  return null;
}

export const leaderboardSecurityConfig = {
  NAME_MAX_LENGTH,
  PLAYER_ID_LENGTH,
  SCORE_MIN,
  SCORE_MAX,
  SCORE_STEP,
  MAX_GAME_DURATION_MS,
} as const;
