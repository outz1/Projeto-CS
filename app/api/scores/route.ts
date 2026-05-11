/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { redis, monthKey } from '@/lib/redis'

const TTL_SECONDS = 60 * 60 * 24 * 35  // 35 dias
const RATE_LIMIT  = 5                   // máximo de partidas salvas por janela
const RATE_WINDOW = 60 * 10            // janela de 10 minutos (em segundos)

export async function GET() {
  try {
    const prefix = monthKey()
    const keys = await redis.keys(`${prefix}:*`)

    if (!keys.length) return NextResponse.json([])

    const entries = await Promise.all(keys.map((k) => redis.get(k)))

    const scores = entries
      .filter(Boolean)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 10)

    return NextResponse.json(scores)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar scores' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, id, score } = await req.json()

    if (!name || !id || typeof score !== 'number') {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    // --- Rate limiting por ID ---
    const rateLimitKey = `ratelimit:${id}`
    const plays = await redis.incr(rateLimitKey)

    // TTL só é definido na primeira jogada da janela
    if (plays === 1) {
      await redis.expire(rateLimitKey, RATE_WINDOW)
    }

    if (plays > RATE_LIMIT) {
      const retryAfter = await redis.ttl(rateLimitKey) // segundos restantes
      return NextResponse.json(
        { error: 'rate_limited', retryAfter },
        { status: 429 }
      )
    }
    // ----------------------------

    const key = `${monthKey()}:${Date.now()}:${id}`
    await redis.set(key, { name, id, score }, { ex: TTL_SECONDS })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao salvar score' }, { status: 500 })
  }
}