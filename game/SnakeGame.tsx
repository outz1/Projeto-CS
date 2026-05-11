'use client'

import { useEffect, useRef, useCallback } from 'react'

const GRID = 20
const TICK_MS = 130

interface Point { x: number; y: number }

interface Props {
  player: string
  playerId: string
  onGameOver: (score: number) => void
}

// Chave do localStorage para guardar até quando o cooldown dura
function cooldownKey(id: string) {
  return `snake:cooldown:${id}`
}

// Retorna os segundos restantes de cooldown (0 se liberado)
function getCooldownSeconds(id: string): number {
  try {
    const val = localStorage.getItem(cooldownKey(id))
    if (!val) return 0
    const endsAt = parseInt(val, 10)
    const remaining = Math.ceil((endsAt - Date.now()) / 1000)
    if (remaining <= 0) {
      localStorage.removeItem(cooldownKey(id))
      return 0
    }
    return remaining
  } catch {
    return 0
  }
}

function setCooldown(id: string, seconds: number) {
  try {
    localStorage.setItem(cooldownKey(id), String(Date.now() + seconds * 1000))
  } catch {}
}

export default function SnakeGame({ player, playerId, onGameOver }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const stateRef = useRef({
    snake: [] as Point[],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 5, y: 5 },
    score: 0,
    running: false,
  })

  const scoreDisplayRef = useRef<HTMLSpanElement>(null)

  const cellSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return 20
    return canvas.width / GRID
  }, [])

  const placeFood = useCallback(() => {
    const s = stateRef.current
    let pos: Point
    do {
      pos = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      }
    } while (s.snake.some((seg) => seg.x === pos.x && seg.y === pos.y))
    s.food = pos
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const { snake, food, dir } = stateRef.current
    const C = cellSize()

    ctx.fillStyle = '#0d1117'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#161b22'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * C, 0); ctx.lineTo(i * C, canvas.height); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, i * C); ctx.lineTo(canvas.width, i * C); ctx.stroke()
    }

    snake.forEach((seg, i) => {
      const alpha = i === 0 ? 1 : Math.max(0.25, 1 - i * 0.05)
      ctx.fillStyle = i === 0 ? '#3fb950' : `rgba(35,134,54,${alpha})`
      ctx.fillRect(seg.x * C + 1, seg.y * C + 1, C - 2, C - 2)

      if (i === 0) {
        const ex = dir.x, ey = dir.y, ex2 = -ey, ey2 = ex
        const cx = seg.x * C + C / 2, cy = seg.y * C + C / 2
        ctx.fillStyle = '#0d1117'
        ctx.beginPath()
        ctx.arc(cx + ex * C * 0.22 + ex2 * C * 0.22, cy + ey * C * 0.22 + ey2 * C * 0.22, C * 0.12, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(cx + ex * C * 0.22 - ex2 * C * 0.22, cy + ey * C * 0.22 - ey2 * C * 0.22, C * 0.12, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    const fw = C * 0.6, fo = (C - fw) / 2
    ctx.fillStyle = '#f0b429'
    ctx.fillRect(food.x * C + fo, food.y * C + fo, fw, fw)
  }, [cellSize])

  const saveScore = useCallback(async (score: number) => {
    // --- Camada cliente: bloqueia antes de chamar a API ---
    const remaining = getCooldownSeconds(playerId)
    if (remaining > 0) {
      console.info(`[snake] cooldown ativo: ${remaining}s restantes`)
      return // não faz a requisição
    }
    // ------------------------------------------------------

    try {
      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: player, id: playerId, score }),
      })

      if (res.status === 429) {
        const data = await res.json()
        // Salva o cooldown no localStorage para as próximas partidas
        setCooldown(playerId, data.retryAfter ?? 600)
        console.warn(`[snake] rate limited pelo servidor: ${data.retryAfter}s`)
        return
      }
    } catch (e) {
      console.error('Erro ao salvar score:', e)
    }
  }, [player, playerId])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const size = Math.min(canvas.parentElement?.clientWidth ?? 400, 400)
    canvas.width = size
    canvas.height = size

    const s = stateRef.current
    const half = Math.floor(GRID / 2)
    s.snake = [{ x: half, y: half }, { x: half - 1, y: half }, { x: half - 2, y: half }]
    s.dir = { x: 1, y: 0 }
    s.nextDir = { x: 1, y: 0 }
    s.score = 0
    s.running = true
    placeFood()
    draw()

    const loop = setInterval(() => {
      s.dir = s.nextDir
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y }

      const hitWall = head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID
      const hitSelf = s.snake.some((seg) => seg.x === head.x && seg.y === head.y)

      if (hitWall || hitSelf) {
        clearInterval(loop)
        s.running = false
        saveScore(s.score)
        setTimeout(() => onGameOver(s.score), 250)
        return
      }

      s.snake.unshift(head)
      if (head.x === s.food.x && head.y === s.food.y) {
        s.score += 10
        if (scoreDisplayRef.current) scoreDisplayRef.current.textContent = String(s.score)
        placeFood()
      } else {
        s.snake.pop()
      }

      draw()
    }, TICK_MS)

    const handleKey = (e: KeyboardEvent) => {
      if (!s.running) return
      const map: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 }, s: { x: 0, y: 1 },
        a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
      }
      const nd = map[e.key]
      if (nd && !(nd.x === -s.dir.x && nd.y === -s.dir.y)) {
        s.nextDir = nd
        if (e.key.startsWith('Arrow')) e.preventDefault()
      }
    }
    window.addEventListener('keydown', handleKey)

    let touchX = 0, touchY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
      e.preventDefault()
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (!s.running) return
      const dx = e.changedTouches[0].clientX - touchX
      const dy = e.changedTouches[0].clientY - touchY
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return
      let nd: Point
      if (Math.abs(dx) > Math.abs(dy)) nd = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 }
      else nd = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 }
      if (!(nd.x === -s.dir.x && nd.y === -s.dir.y)) s.nextDir = nd
      e.preventDefault()
    }
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd, { passive: false })

    return () => {
      clearInterval(loop)
      window.removeEventListener('keydown', handleKey)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [draw, placeFood, saveScore, onGameOver])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-between w-full font-mono text-xs tracking-widest text-zinc-500">
        <span>SCORE <span ref={scoreDisplayRef} className="text-green-400 font-bold">0</span></span>
        <span className="text-zinc-600">{player} · #{playerId}</span>
      </div>
      <canvas
        ref={canvasRef}
        className="rounded-lg border border-green-900 touch-none block w-full max-w-[400px]"
        style={{ imageRendering: 'pixelated' }}
      />
      <p className="text-xs text-zinc-700 font-mono tracking-wide">
        ARRASTE · WASD · SETAS
      </p>
    </div>
  )
}