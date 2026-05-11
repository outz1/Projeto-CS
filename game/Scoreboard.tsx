'use client'

import { useEffect, useState } from 'react'

interface ScoreEntry {
  name: string
  id: string
  score: number
}

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

export default function Scoreboard({ lastScore, playerName, playerId, onReplay, onBack }: Props) {
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [loading, setLoading] = useState(true)

  const now = new Date()
  const monthLabel = `${MONTHS[now.getMonth()].toUpperCase()} ${now.getFullYear()}`

  useEffect(() => {
    fetch('/api/scores')
      .then((r) => r.json())
      .then((data) => {
        setScores(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="flex min-h-[60vh] sm:min-h-0 flex-col gap-4 sm:gap-3">
      {/* Game over + score */}
      <div className="text-center">
        <p className="text-xs leading-5 text-zinc-500 tracking-widest font-mono uppercase">Game Over</p>
        <p className="text-4xl font-bold text-blue-400 font-mono mt-1">{lastScore}</p>
        <p className="px-2 text-xs leading-5 text-zinc-500 font-mono tracking-widest break-words">
          PONTOS · {playerName} · <span className="text-blue-400">#{playerId}</span>
        </p>
      </div>

      {/* Placar */}
      <div className="flex-1">
        <p className="mb-3 text-xs leading-5 text-zinc-600 font-mono tracking-widest text-center">
          🏆 PLACAR · {monthLabel}
        </p>

        {loading && (
          <p className="px-3 py-4 text-xs leading-5 text-zinc-600 font-mono text-center">Carregando...</p>
        )}

        {!loading && scores.length === 0 && (
          <p className="px-3 py-4 text-xs leading-5 text-zinc-600 font-mono text-center">
            Nenhuma pontuação ainda. Seja o primeiro!
          </p>
        )}

        {!loading && (
          <div className="max-h-[42vh] overflow-y-auto pr-1 sm:max-h-[32vh]">
            {scores.map((entry, i) => (
              <div
                key={i}
                className={`mb-1.5 flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-3 sm:py-2.5 font-mono text-sm
                  ${i === 0 ? 'border-l-2 border-yellow-500' : ''}
                  ${i === 1 ? 'border-l-2 border-zinc-400' : ''}
                  ${i === 2 ? 'border-l-2 border-orange-700' : ''}
                  ${i > 2 ? 'border-l-2 border-transparent' : ''}
                  ${entry.id === playerId ? 'ring-1 ring-blue-800' : ''}
                `}
              >
                <span className="w-6 text-xs leading-5 text-zinc-600">
                  {MEDALS[i] ?? `#${i + 1}`}
                </span>
                <span className="min-w-0 flex-1 truncate text-zinc-200 leading-5">
                  {entry.name}
                  <span className="ml-1 text-xs leading-5 text-zinc-700">#{entry.id}</span>
                </span>
                <span className="font-bold leading-5 text-blue-400">{entry.score}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onReplay}
        className="w-full bg-blue-700 hover:bg-blue-600 active:scale-95
                  text-white font-mono font-bold text-sm tracking-widest
                  leading-5 py-3.5 sm:py-3 rounded-md transition-all"
      >
        ↺ JOGAR NOVAMENTE
      </button>

      <button
        onClick={onBack}
        className="w-full border border-zinc-800 text-zinc-500 hover:bg-zinc-900
                  font-mono text-xs tracking-widest leading-5 py-3 sm:py-2.5 rounded-md transition-colors"
      >
        ← VOLTAR
      </button>
    </div>
  )
}
