import { extractRetryAfterSeconds } from "@/features/leaderboard/domain";

const DEVICE_ID_KEY = "device_fingerprint";

type GameTypeWithSession = "snake" | "arcade";

export type SubmitScorePayload = {
  sessionId: string;
  deviceId: string;
  name: string;
  id: string;
  score: number;
  durationMs: number;
  game: GameTypeWithSession;
  kills?: number;
  wave?: number;
  upgrades?: string[];
};

type GameSessionResponse = {
  sessionId: string;
  expiresIn: number;
};

type SubmitScoreResponse = {
  accepted: boolean;
  bestScore: number;
  rankingUpdated: boolean;
  anomalies?: string[];
};

export type SubmitScoreResult =
  | { ok: true; data: SubmitScoreResponse }
  | { ok: false; status: number; payload: unknown; retryAfter?: number };

function generateDeviceFingerprint(): string {
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const entropy = crypto.randomUUID?.() ?? String(Date.now());
  const combined = `${userAgent}|${language}|${timezone}|${entropy}`;

  try {
    return btoa(unescape(encodeURIComponent(combined))).replace(/[^A-Za-z0-9]/g, "").substring(0, 64);
  } catch {
    return `${Date.now()}${Math.random().toString(36).slice(2)}`.substring(0, 64);
  }
}

export function getOrCreateDeviceId(): string {
  const existingDeviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (existingDeviceId) return existingDeviceId;

  const deviceId = generateDeviceFingerprint();
  localStorage.setItem(DEVICE_ID_KEY, deviceId);
  return deviceId;
}

export async function initializeGameSession(gameType: GameTypeWithSession): Promise<string | null> {
  try {
    const deviceId = getOrCreateDeviceId();

    const response = await fetch("/api/scores/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId, gameType }),
    });

    const payload = (await response.json().catch(() => null)) as { ok?: boolean; data?: GameSessionResponse } | null;
    if (!response.ok || payload?.ok !== true || !payload.data?.sessionId) return null;

    return payload.data.sessionId;
  } catch (error) {
    console.error("Erro ao inicializar sessão de jogo:", error);
    return null;
  }
}

export async function submitScore(payload: SubmitScorePayload): Promise<SubmitScoreResult> {
  const response = await fetch("/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const responsePayload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      payload: responsePayload,
      retryAfter: extractRetryAfterSeconds(responsePayload) ?? undefined,
    };
  }

  const data = responsePayload as { ok?: boolean; data?: SubmitScoreResponse };
  if (data.ok !== true || !data.data) {
    return { ok: false, status: response.status, payload: responsePayload };
  }

  return { ok: true, data: data.data };
}
