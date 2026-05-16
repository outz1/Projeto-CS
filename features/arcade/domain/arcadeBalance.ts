import type { ArcadeUpgrade, ArcadeUpgradeId } from "./arcadeTypes";

export const ARCADE_WIDTH = 960;
export const ARCADE_HEIGHT = 540;

export const ARCADE_MAX_SCORE = 500_000;
export const ARCADE_MAX_KILLS = 8_000;
export const ARCADE_MAX_WAVE = 300;
export const ARCADE_MAX_UPGRADES_RECORDED = 64;

export const ARCADE_WAVE_DURATION_MS = 20_000;
export const ARCADE_START_XP_TO_NEXT = 100;
export const ARCADE_XP_GROWTH = 1.2;

export const ARCADE_PLAYER_BASE = {
  maxHp: 100,
  speed: 260,
  fireRateMs: 230,
  bulletDamage: 14,
  bulletSpeed: 560,
  bulletCount: 1,
} as const;

export const ARCADE_UPGRADES: Record<ArcadeUpgradeId, ArcadeUpgrade> = {
  "double-shot": {
    id: "double-shot",
    title: "Tiro Duplo",
    description: "+1 projétil por disparo.",
    category: "offense",
  },
  "triple-shot": {
    id: "triple-shot",
    title: "Tiro Triplo",
    description: "+2 projéteis por disparo.",
    category: "offense",
  },
  piercing: {
    id: "piercing",
    title: "Piercing",
    description: "Projéteis atravessam inimigos.",
    category: "offense",
  },
  ricochet: {
    id: "ricochet",
    title: "Ricochete",
    description: "Projéteis quicam nas bordas.",
    category: "offense",
  },
  laser: {
    id: "laser",
    title: "Laser",
    description: "Aumenta dano e velocidade de projétil.",
    category: "offense",
  },
  "aoe-blast": {
    id: "aoe-blast",
    title: "Explosão AOE",
    description: "Elimina inimigos próximos em abates.",
    category: "offense",
  },
  shield: {
    id: "shield",
    title: "Escudo",
    description: "+20 de escudo temporário.",
    category: "defense",
  },
  regen: {
    id: "regen",
    title: "Regeneração",
    description: "Recupera vida continuamente.",
    category: "defense",
  },
  "damage-reduction": {
    id: "damage-reduction",
    title: "Blindagem",
    description: "Reduz dano recebido.",
    category: "defense",
  },
  "move-speed": {
    id: "move-speed",
    title: "Propulsão",
    description: "Aumenta velocidade da nave.",
    category: "mobility",
  },
  dash: {
    id: "dash",
    title: "Dash",
    description: "Ativa dash com tecla Shift.",
    category: "mobility",
  },
  "slow-motion": {
    id: "slow-motion",
    title: "Tempo Lento",
    description: "Ative para reduzir velocidade inimiga.",
    category: "mobility",
  },
  "score-multiplier": {
    id: "score-multiplier",
    title: "Multiplicador",
    description: "Aumenta score por eliminação.",
    category: "passive",
  },
  "crit-chance": {
    id: "crit-chance",
    title: "Crítico",
    description: "Chance de dano crítico.",
    category: "passive",
  },
  "xp-bonus": {
    id: "xp-bonus",
    title: "XP Bônus",
    description: "Aumenta XP recebido.",
    category: "passive",
  },
};

export const ARCADE_UPGRADE_IDS = Object.keys(ARCADE_UPGRADES) as ArcadeUpgradeId[];
