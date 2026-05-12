'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const scrollY = window.scrollY
    const body = document.body
    const html = document.documentElement

    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
    }
    const previousHtmlStyles = {
      overflow: html.style.overflow,
      overscrollBehavior: html.style.overscrollBehavior,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'
    html.style.overflow = 'hidden'
    html.style.overscrollBehavior = 'none'

    return () => {
      body.style.position = previousBodyStyles.position
      body.style.top = previousBodyStyles.top
      body.style.left = previousBodyStyles.left
      body.style.right = previousBodyStyles.right
      body.style.width = previousBodyStyles.width
      body.style.overflow = previousBodyStyles.overflow
      body.style.overscrollBehavior = previousBodyStyles.overscrollBehavior
      html.style.overflow = previousHtmlStyles.overflow
      html.style.overscrollBehavior = previousHtmlStyles.overscrollBehavior
      window.scrollTo(0, scrollY)
    }
  }, [])

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

  const isGameScreen = screen === 'game'

  return (
    // fundo escuro semi-transparente — fecha ao clicar fora
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative w-full overflow-y-auto rounded-xl border border-blue-900 bg-[#0d1117] px-4 pb-4 pt-10 shadow-xl sm:px-6 sm:pt-11 ${
          isGameScreen ? 'max-w-[min(92vw,22rem)] max-h-[85dvh]' : 'max-w-[min(92vw,24rem)] max-h-[90dvh]'
        }`}
      >
        {/* botão fechar */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-md bg-[#0d1117]/90 px-2 text-zinc-500 hover:text-zinc-300
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
