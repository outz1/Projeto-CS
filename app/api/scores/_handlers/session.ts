import { NextRequest, NextResponse } from "next/server";
import { generateGameSession } from "@/lib/scoreSecurity";

const CACHE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

function isValidIp(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const num = parseInt(p, 10);
    return num >= 0 && num <= 255;
  });
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",");
    const first = ips[0]?.trim();
    if (first && isValidIp(first)) return first;
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp && isValidIp(realIp)) return realIp;

  return "unknown";
}

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function jsonError(status: number, error: { code: string; message: string }) {
  return NextResponse.json({ ok: false, error }, { status, headers: CACHE_HEADERS });
}

function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status, headers: CACHE_HEADERS });
}

export function isSessionInitPayload(value: unknown): boolean {
  return isRecord(value) && value.action === "session";
}

export async function handleInitializeSession(req: NextRequest, parsedBody?: unknown) {
  try {
    const ip = getClientIp(req);
    const rawBody = parsedBody ?? (await req.json());
    const body = isRecord(rawBody) ? rawBody : {};
    const { deviceId, gameType } = body as { deviceId?: unknown; gameType?: unknown };

    if (!deviceId || typeof deviceId !== "string" || deviceId.length < 10) {
      return jsonError(400, {
        code: "invalid_payload",
        message: "deviceId inválido",
      });
    }

    if (gameType !== "snake" && gameType !== "arcade") {
      return jsonError(400, {
        code: "invalid_payload",
        message: "gameType deve ser 'snake' ou 'arcade'",
      });
    }

    const playerId = `temp_${generateRandomId()}`;
    const session = await generateGameSession(playerId, deviceId, ip, gameType);

    console.log("[scores:session] Nova sessão criada", {
      sessionId: session.sessionId.substring(0, 8) + "...",
      playerId,
      gameType,
      deviceId: deviceId.substring(0, 8) + "...",
      ip,
    });

    return jsonSuccess({
      sessionId: session.sessionId,
      expiresIn: Math.floor((session.expiresAt - Date.now()) / 1000),
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError(400, {
        code: "invalid_json",
        message: "JSON inválido.",
      });
    }

    console.error("[scores:session] error", error);
    return jsonError(500, {
      code: "storage_error",
      message: "Erro ao criar sessão",
    });
  }
}
