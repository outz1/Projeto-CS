"use client";

import { useEffect, useMemo, useState } from "react";
import { useLeaderboardScores } from "@/features/leaderboard/hooks/useLeaderboardScores";
import { isValidPlayerId, leaderboardSecurityConfig, normalizePlayerName, sanitizePlayerId, sanitizePlayerNameInput } from "@/lib/leaderboardSecurity";
import { generateId } from "@/utils/generateId";
import { ArcadeBackground } from "./ArcadeBackground";
import { ArcadeHeader } from "./ArcadeHeader";
import { ArcadeLobby } from "./ArcadeLobby";
import { ArcadeSessionShell } from "./ArcadeSessionShell";

export function ArcadePageClient() {
  const [started, setStarted] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const { scores, loading: loadingScores } = useLeaderboardScores("arcade", 5);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayerId(generateId());
  }, []);

  const safeId = sanitizePlayerId(playerId);
  const previewName = useMemo(() => normalizePlayerName(nameInput), [nameInput]);
  const canStart = isValidPlayerId(safeId);

  const handleStart = () => {
    if (!canStart) return;
    setPlayerName(normalizePlayerName(nameInput));
    setStarted(true);
  };

  return (
    <div className="arcade-mobile-no-select relative min-h-screen overflow-hidden bg-[#040816] text-blue-50">
      <ArcadeBackground />
      <ArcadeHeader />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!started ? (
          <ArcadeLobby
            nameInput={nameInput}
            safeId={safeId}
            previewName={previewName}
            canStart={canStart}
            maxNameLength={leaderboardSecurityConfig.NAME_MAX_LENGTH}
            scores={scores}
            loadingScores={loadingScores}
            onNameChange={(value) => setNameInput(sanitizePlayerNameInput(value))}
            onStart={handleStart}
          />
        ) : (
          <ArcadeSessionShell playerName={playerName} safeId={safeId} onQuit={() => setStarted(false)} />
        )}
      </main>
    </div>
  );
}
