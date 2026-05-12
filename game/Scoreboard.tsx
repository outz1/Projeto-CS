'use client'

import { useEffect, useState } from 'react'
import {
  parseScoresApiResponse,
  type ScoreEntry,
  normalizePlayerName,
  sanitizePlayerId,
} from '@/lib/leaderboardSecurity'

interface Props {
  lastScore: number
  playerName: string
  playerId: string
  onReplay: () => void
  onBack: () => void
}

const MEDALS = ['🥇', '🥈', '🥉']
const MONTHS = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
]

function getCooldownSeconds(id: string): number {
  try {
    const val = localStorage.getItem(`snake:cooldown:${id}`)
    if (!val) return 0
    const endsAt = parseInt(val, 10)
    const remaining = Math.ceil((endsAt - Date.now()) / 1000)
    if (remaining <= 0) {
      localStorage.removeItem(`snake:cooldown:${id}`)
      return 0
    }
    return remaining
  } catch {
    return 0
  }
}

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function Scoreboard({ lastScore, playerName, playerId, onReplay, onBack }: Props) {
  const safePlayerName = normalizePlayerName(playerName)
  const safePlayerId = sanitizePlayerId(playerId)
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [loading, setLoading] = useState(true)

  // Lazy initializer — lê o localStorage só no cliente, sem chamar setState no corpo do efeito
  const [cooldown, setCooldown] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    return getCooldownSeconds(safePlayerId)
  })

  const now = new Date()
  const monthLabel = `${MONTHS[now.getMonth()].toUpperCase()} ${now.getFullYear()}`

  // Busca o placar
  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/scores', { signal: controller.signal })
      .then(async (response) => {
        const payload: unknown = await response.json().catch(() => null)
        return parseScoresApiResponse(payload)
      })
      .then((parsedScores) => setScores(parsedScores))
      .catch(() => {})
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  // Countdown — setCooldown só é chamado dentro do setInterval (callback), não sincronamente
  useEffect(() => {
    const initial = getCooldownSeconds(safePlayerId)
    if (initial <= 0) return

    const interval = setInterval(() => {
      const remaining = getCooldownSeconds(safePlayerId)
      setCooldown(remaining)
      if (remaining <= 0) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [safePlayerId])

  const isBlocked = cooldown > 0

  return (
    <div className="flex flex-col gap-4">
      {/* Score */}
      <div className="text-center">
        <p className="text-xs text-zinc-500 tracking-widest font-mono uppercase">Game Over</p>
        <p className="text-4xl font-bold text-blue-400 font-mono mt-1">{lastScore}</p>
        <p className="text-xs text-zinc-500 font-mono tracking-widest">
          PONTOS · {safePlayerName} · <span className="text-blue-400">#{safePlayerId}</span>
        </p>

        {/* Aviso de cooldown */}
        {isBlocked && (
          <div className="mt-3 rounded-lg bg-yellow-950/50 border border-yellow-800/50 px-4 py-2.5">
            <p className="text-yellow-400 font-mono text-xs tracking-widest">
              ⏳ LIMITE ATINGIDO
            </p>
            <p className="text-yellow-600 font-mono text-xs mt-1">
              Próxima pontuação salva em{' '}
              <span className="text-yellow-400 font-bold">{formatCountdown(cooldown)}</span>
            </p>
          </div>
        )}

        {!isBlocked && lastScore > 0 && (
          <p className="text-blue-700 font-mono text-xs mt-2 tracking-widest">
            ✓ PONTUAÇÃO SALVA
          </p>
        )}
      </div>

      {/* Placar */}
      <div>
        <p className="text-xs text-zinc-600 font-mono tracking-widest text-center mb-3">
          🏆 PLACAR · {monthLabel}
        </p>

        {loading && (
          <p className="text-xs text-zinc-600 font-mono text-center py-4">Carregando...</p>
        )}

        {!loading && scores.length === 0 && (
          <p className="text-xs text-zinc-600 font-mono text-center py-4">
            Nenhuma pontuação ainda!
          </p>
        )}

        {!loading && scores.map((entry, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-2 rounded-md mb-1.5 bg-zinc-900 font-mono text-sm
              ${i === 0 ? 'border-l-2 border-yellow-500' : ''}
              ${i === 1 ? 'border-l-2 border-zinc-400' : ''}
              ${i === 2 ? 'border-l-2 border-orange-700' : ''}
              ${i > 2 ? 'border-l-2 border-transparent' : ''}
              ${entry.id === safePlayerId ? 'ring-1 ring-blue-800' : ''}
            `}
          >
            <span className="text-zinc-600 w-6 text-xs">{MEDALS[i] ?? `#${i + 1}`}</span>
            <span className="flex-1 text-zinc-200 truncate">
              {entry.name}
              <span className="text-zinc-700 text-xs ml-1">#{entry.id}</span>
            </span>
            <span className="text-blue-400 font-bold">{entry.score}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onReplay}
        className="w-full bg-blue-700 hover:bg-blue-600 active:scale-95
                  text-white font-mono font-bold text-sm tracking-widest
                  py-3 rounded-md transition-all"
      >
        {isBlocked ? '↺ JOGAR (sem salvar)' : '↺ JOGAR NOVAMENTE'}
      </button>

      <button
        onClick={onBack}
        className="w-full border border-zinc-800 text-zinc-500 hover:bg-zinc-900
                  font-mono text-xs tracking-widest py-2.5 rounded-md transition-colors"
      >
        ← VOLTAR
      </button>
    </div>
  )
}
