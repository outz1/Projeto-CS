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
    <div className="flex flex-col gap-4">
      {/* Game over + score */}
      <div className="text-center">
        <p className="text-xs text-zinc-500 tracking-widest font-mono uppercase">Game Over</p>
        <p className="text-4xl font-bold text-blue-400 font-mono mt-1">{lastScore}</p>
        <p className="text-xs text-zinc-500 font-mono tracking-widest">
          PONTOS · {playerName} · <span className="text-blue-400">#{playerId}</span>
        </p>
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
            Nenhuma pontuação ainda. Seja o primeiro!
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
              ${entry.id === playerId ? 'ring-1 ring-blue-800' : ''}
            `}
          >
            <span className="text-zinc-600 w-6 text-xs">
              {MEDALS[i] ?? `#${i + 1}`}
            </span>
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
        ↺ JOGAR NOVAMENTE
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