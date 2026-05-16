import type { ScoreEntry } from "@/lib/leaderboardSecurity";
import { ArcadeHero } from "./ArcadeHero";
import { ArcadeLaunchPanel } from "./ArcadeLaunchPanel";
import { ArcadeLeaderboardPanel } from "./ArcadeLeaderboardPanel";
import { ArcadeLearningCards } from "./ArcadeLearningCards";

type ArcadeLobbyProps = {
  nameInput: string;
  safeId: string;
  previewName: string;
  canStart: boolean;
  maxNameLength: number;
  scores: ScoreEntry[];
  loadingScores: boolean;
  onNameChange: (value: string) => void;
  onStart: () => void;
};

export function ArcadeLobby({ nameInput, safeId, previewName, canStart, maxNameLength, scores, loadingScores, onNameChange, onStart }: ArcadeLobbyProps) {
  return (
    <div className="space-y-8">
      <section className="grid min-h-[calc(100vh-8rem)] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <ArcadeHero />
        <ArcadeLaunchPanel
          nameInput={nameInput}
          safeId={safeId}
          previewName={previewName}
          canStart={canStart}
          maxNameLength={maxNameLength}
          onNameChange={onNameChange}
          onStart={onStart}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <ArcadeLearningCards />
        <ArcadeLeaderboardPanel scores={scores} loadingScores={loadingScores} />
      </section>
    </div>
  );
}
