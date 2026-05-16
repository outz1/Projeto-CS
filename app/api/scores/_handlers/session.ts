import { NextRequest } from "next/server";
import { getClientIp, isRecord, jsonError, jsonSuccess } from "@/lib/api/http";
import { generateGameSession } from "@/lib/scoreSecurity";

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
