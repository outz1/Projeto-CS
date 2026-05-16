export interface ArcadeAudioController {
  fire: () => void;
  explosion: () => void;
  levelUp: () => void;
  dispose: () => void;
}

export function createArcadeAudioController(): ArcadeAudioController {
  // Placeholder intencional para manter a arquitetura pronta para efeitos futuros.
  return {
    fire: () => {},
    explosion: () => {},
    levelUp: () => {},
    dispose: () => {},
  };
}
