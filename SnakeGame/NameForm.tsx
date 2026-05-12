"use client";

import { useState } from "react";
import { generateId } from "@/utils/generateId";
import {
  isValidPlayerId,
  leaderboardSecurityConfig,
  normalizePlayerName,
  sanitizePlayerId,
  sanitizePlayerNameInput,
} from "@/lib/leaderboardSecurity";

interface Props {
  onStart: (name: string, id: string) => void;
  onViewScores: () => void;
}

export default function NameForm({ onStart, onViewScores }: Props) {
  const [name, setName] = useState("");
  const [id] = useState(() => generateId());

  function handleStart() {
    const safeName = normalizePlayerName(name);
    const safeId = sanitizePlayerId(id);

    if (!isValidPlayerId(safeId)) {
      alert("Não foi possível iniciar agora. Gere um novo identificador.");
      return;
    }

    onStart(safeName, safeId);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-widest text-blue-400 font-mono">
          JOGO DA COBRINHA
        </h2>
        <p className="text-xs text-zinc-500 tracking-widest mt-1 font-mono">
          PLACAR MENSAL · {new Date().toLocaleString("pt-BR", { month: "long", year: "numeric" }).toUpperCase()}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500 tracking-widest font-mono uppercase">
          Seu nome
        </label>
        <input
          type="text"
          maxLength={leaderboardSecurityConfig.NAME_MAX_LENGTH}
          value={name}
          onChange={(e) => setName(sanitizePlayerNameInput(e.target.value))}
          onBlur={() => setName((current) => sanitizePlayerNameInput(current))}
          onKeyDown={(e) => e.key === "Enter" && handleStart()}
          placeholder="Como te chamam?"
          className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2.5
                    text-zinc-100 font-mono text-base outline-none
                    focus:border-green-500 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500 tracking-widest font-mono uppercase">
          Seu ID
        </label>
        <div
          className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2.5
                        flex items-center justify-between"
        >
          <span className="text-blue-400 font-mono tracking-widest text-sm">
            {id}
          </span>
          <span className="text-xs text-zinc-600 font-mono">
            gerado automaticamente
          </span>
        </div>
        <p className="text-xs text-zinc-600 font-mono">
          Guarde seu ID para identificar sua pontuação no placar.
        </p>
      </div>

      <button
        onClick={handleStart}
        className="w-full bg-blue-700 hover:bg-blue-600 active:scale-95
                  text-white font-mono font-bold text-sm tracking-widest
                  py-3 rounded-md transition-all"
      >
        JOGAR
      </button>

      <button
        onClick={onViewScores}
        className="w-full border border-blue-800 text-blue-400 hover:bg-zinc-900
                  font-mono text-xs tracking-widest py-2.5 rounded-md transition-colors"
      >
        🏆 VER PLACAR DO MÊS
      </button>
    </div>
  );
}
