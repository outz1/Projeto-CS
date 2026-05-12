"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { generateId } from "@/utils/generateId";
import { isValidPlayerId, leaderboardSecurityConfig, normalizePlayerName, sanitizePlayerId, sanitizePlayerNameInput } from "@/lib/leaderboardSecurity";

const ArcadeGame = dynamic(() => import("@/components/arcade/ArcadeGame"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-violet-400/40 bg-[#130a26]/70 p-5 text-center font-mono text-sm tracking-widest text-violet-200">
      Carregando módulos do Arcade...
    </div>
  ),
});

export default function ArcadePage() {
  const [started, setStarted] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayerId(generateId());
  }, []);

  const safeId = sanitizePlayerId(playerId);

  return (
    <div className="arcade-mobile-no-select min-h-screen bg-radial-[at_20%_20%] from-violet-950 via-[#090513] to-indigo-950 px-4 py-6 text-violet-100">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="font-mono text-xs tracking-widest text-violet-300 hover:text-violet-100">
            &larr; VOLTAR AO SITE
          </Link>
          <p className="font-mono text-[10px] tracking-widest text-violet-300/70">ARCADE · COMPETITIVO</p>
        </div>

        {!started && (
          <div className="mx-auto w-full max-w-md rounded-2xl border border-violet-400/40 bg-[#130a26]/90 p-6 shadow-[0_0_24px_rgba(139,92,246,0.25)]">
            <h1 className="text-center font-mono text-3xl font-black tracking-widest text-fuchsia-300">SPACE ARCADE</h1>
            <p className="mt-2 text-center text-sm text-violet-200/80">
              Shooter roguelike leve com leaderboard competitivo.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-violet-300/70">Seu nome</label>
                <input
                  type="text"
                  maxLength={leaderboardSecurityConfig.NAME_MAX_LENGTH}
                  value={nameInput}
                  onChange={(e) => setNameInput(sanitizePlayerNameInput(e.target.value))}
                  className="mt-1 w-full rounded-md border border-violet-300/30 bg-violet-950/40 px-3 py-2 font-mono text-violet-100 outline-none focus:border-fuchsia-400"
                  placeholder="Piloto"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-violet-300/70">Seu ID</label>
                <div className="mt-1 flex items-center justify-between rounded-md border border-violet-300/30 bg-violet-950/40 px-3 py-2">
                  <span className="font-mono text-sm tracking-widest text-cyan-300">{safeId}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-violet-300/60">auto</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!isValidPlayerId(safeId)) return;
                  setPlayerName(normalizePlayerName(nameInput));
                  setStarted(true);
                }}
                className="w-full rounded-md bg-fuchsia-600 py-3 font-mono text-sm font-bold tracking-widest text-white hover:bg-fuchsia-500"
              >
                INICIAR ARCADE
              </button>
            </div>
          </div>
        )}

        {started && <ArcadeGame playerName={playerName} playerId={safeId} onQuit={() => setStarted(false)} />}
      </div>
    </div>
  );
}
