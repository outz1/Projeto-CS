import { NextRequest, NextResponse } from "next/server";

export const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

export type ApiErrorPayload = {
  code: string;
  message: string;
  retryAfter?: number;
  anomalies?: string[];
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function isValidIp(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;

  return parts.every((part) => {
    const number = Number.parseInt(part, 10);
    return number >= 0 && number <= 255;
  });
}

export function getClientIp(req: NextRequest): string {
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

export function jsonError(status: number, error: ApiErrorPayload) {
  return NextResponse.json({ ok: false, error }, { status, headers: NO_STORE_HEADERS });
}

export function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status, headers: NO_STORE_HEADERS });
}
