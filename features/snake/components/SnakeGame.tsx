'use client'

import { useEffect, useRef, useCallback } from 'react'
import {
  normalizePlayerName,
  sanitizePlayerId,
} from '@/features/leaderboard/domain'
import { getScoreCooldownSeconds, setScoreCooldown } from '@/features/leaderboard/services/cooldownStorage'
import { getOrCreateDeviceId, initializeGameSession, submitScore } from '@/features/leaderboard/services/scoreSubmissionClient'

const GRID = 20
const TICK_MS = 130

interface Point { x: number; y: number }

interface Props {
  player: string
  playerId: string
  onGameOver: (score: number) => void
}

export default function SnakeGame({ player, playerId, onGameOver }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStartedAtRef = useRef<number>(0)
  const sessionIdRef = useRef<string | null>(null)

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

  const saveScore = useCallback(async (score: number, durationMs: number) => {
    const safeId = sanitizePlayerId(playerId)
    const safeName = normalizePlayerName(player)
    const remaining = getScoreCooldownSeconds('snake', safeId)
    if (remaining > 0) {
      console.info(`[snake] cooldown ativo: ${remaining}s restantes`)
      return 
    }

    try {
      let sessionId = sessionIdRef.current
      if (!sessionId) {
        sessionId = await initializeGameSession('snake')
        sessionIdRef.current = sessionId
      }

      if (!sessionId) {
        console.warn('[snake] não foi possível iniciar sessão segura para envio do score')
        return
      }

      const result = await submitScore({
        sessionId,
        deviceId: getOrCreateDeviceId(),
        name: safeName,
        id: safeId,
        score,
        durationMs,
        game: 'snake',
      })

      if (result.ok) {
        sessionIdRef.current = null
        return
      }

      if (result.status === 429) {
        const retryAfter = result.retryAfter ?? 600
        setScoreCooldown('snake', safeId, retryAfter)
        console.warn(`[snake] rate limited pelo servidor: ${retryAfter}s`)
        return
      }

      if (result.status === 401) {
        sessionIdRef.current = null
      }

      if (!result.ok) {
        console.warn('[snake] score rejeitado pelo servidor')
      }
    } catch (e) {
      console.error('Erro ao salvar score:', e)
    }
  }, [player, playerId])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parentWidth = canvas.parentElement?.clientWidth ?? 400
    const viewportLimit = window.innerWidth < 640 ? 280 : 400
    const size = Math.min(parentWidth, viewportLimit, 400)
    canvas.width = size
    canvas.height = size

    const s = stateRef.current
    const half = Math.floor(GRID / 2)
    s.snake = [{ x: half, y: half }, { x: half - 1, y: half }, { x: half - 2, y: half }]
    s.dir = { x: 1, y: 0 }
    s.nextDir = { x: 1, y: 0 }
    s.score = 0
    s.running = true
    gameStartedAtRef.current = Date.now()
    sessionIdRef.current = null
    void initializeGameSession('snake').then((sessionId) => {
      if (s.running) sessionIdRef.current = sessionId
    })
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
        const durationMs = Date.now() - gameStartedAtRef.current
        void saveScore(s.score, durationMs)
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
      sessionIdRef.current = null
    }
  }, [draw, placeFood, saveScore, onGameOver])

  function handleDpad(direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') {
    const s = stateRef.current
    if (!s.running) return
    const map = {
      UP:    { x: 0,  y: -1 },
      DOWN:  { x: 0,  y:  1 },
      LEFT:  { x: -1, y:  0 },
      RIGHT: { x: 1,  y:  0 },
    }
    const nd = map[direction]
    if (!(nd.x === -s.dir.x && nd.y === -s.dir.y)) {
      s.nextDir = nd
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between gap-2 font-mono text-[11px] sm:text-xs tracking-widest text-zinc-500">
        <span>SCORE <span ref={scoreDisplayRef} className="text-blue-400 font-bold">0</span></span>
        <span className="min-w-0 truncate text-right text-zinc-600">{player} · #{playerId}</span>
      </div>

      <canvas
        ref={canvasRef}
        className="block w-full max-w-[280px] touch-none rounded-lg border border-blue-900 sm:max-w-[400px]"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* D-pad */}
      <div className="grid grid-cols-3 gap-1.5 mt-1" style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
        {/* linha 1: só o botão cima no centro */}
        <div />
        <DpadBtn onPress={() => handleDpad('UP')}>↑</DpadBtn>
        <div />
        {/* linha 2: esquerda, baixo, direita */}
        <DpadBtn onPress={() => handleDpad('LEFT')}>←</DpadBtn>
        <DpadBtn onPress={() => handleDpad('DOWN')}>↓</DpadBtn>
        <DpadBtn onPress={() => handleDpad('RIGHT')}>→</DpadBtn>
      </div>
    </div>
  )
}

function DpadBtn({ onPress, children }: { onPress: () => void; children: React.ReactNode }) {
  return (
    <button
      onPointerDown={(e) => {
        e.preventDefault()
        onPress()
      }}
      className="w-14 h-14 flex items-center justify-center
                bg-zinc-900 border border-zinc-700 rounded-xl
                text-zinc-400 text-xl font-bold font-sans leading-none
                active:bg-blue-900 active:border-blue-700 active:text-white
                select-none touch-none transition-colors"
    >
      {children}
    </button>
  )
}
