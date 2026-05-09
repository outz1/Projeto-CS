/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { redis, monthKey } from '@/lib/redis'

const TTL_SECONDS = 60 * 60 * 24 * 35 // 35 dias — expira automaticamente no mês seguinte

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
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao buscar scores' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, id, score } = await req.json()

    if (!name || !id || typeof score !== 'number') {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const key = `${monthKey()}:${Date.now()}:${id}`
    await redis.set(key, { name, id, score }, { ex: TTL_SECONDS })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao salvar score' }, { status: 500 })
  }
}