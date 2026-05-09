import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.SNAKEGAME_KV_REST_API_URL!,
  token: process.env.SNAKEGAME_KV_REST_API_TOKEN!,
})

export function monthKey() {
  const d = new Date()
  return `snake:${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}