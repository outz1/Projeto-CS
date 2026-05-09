'use client'

import { useState } from 'react'
import NameForm from './NameForm'
import SnakeGame from './SnakeGame'
import Scoreboard from './Scoreboard'

type Screen = 'name' | 'game' | 'scores'

interface Props {
  onClose: () => void
  onGameOver?: (score: number) => void
}

export default function GameModal({ onClose, onGameOver }: Props) {
  const [screen, setScreen] = useState<Screen>('name')
  const [playerName, setPlayerName] = useState('')
  const [playerId, setPlayerId] = useState('')
  const [lastScore, setLastScore] = useState(0)

  function handleStart(name: string, id: string) {
    setPlayerName(name)
    setPlayerId(id)
    setScreen('game')
  }

  function handleGameOver(score: number) {
    setLastScore(score)
    onGameOver?.(score)
    setScreen('scores')
  }

  return (
    // fundo escuro semi-transparente — fecha ao clicar fora
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm bg-[#0d1117] border border-blue-900 rounded-xl p-6 shadow-xl">
        {/* botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-zinc-600 hover:text-zinc-400
                    font-mono text-lg leading-none transition-colors"
          aria-label="Fechar"
        >
          ✕
        </button>

        {screen === 'name' && (
          <NameForm
            onStart={handleStart}
            onViewScores={() => setScreen('scores')}
          />
        )}

        {screen === 'game' && (
          <SnakeGame
            player={playerName}
            playerId={playerId}
            onGameOver={handleGameOver}
          />
        )}

        {screen === 'scores' && (
          <Scoreboard
            lastScore={lastScore}
            playerName={playerName}
            playerId={playerId}
            onReplay={() => setScreen('game')}
            onBack={() => setScreen('name')}
          />
        )}
      </div>
    </div>
  )
}