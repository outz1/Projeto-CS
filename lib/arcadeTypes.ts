export type ArcadeEnemyType = "basic" | "kamikaze" | "tank" | "shooter" | "elite";

export type ArcadeUpgradeId =
  | "double-shot"
  | "triple-shot"
  | "piercing"
  | "ricochet"
  | "laser"
  | "aoe-blast"
  | "shield"
  | "regen"
  | "damage-reduction"
  | "move-speed"
  | "dash"
  | "slow-motion"
  | "score-multiplier"
  | "crit-chance"
  | "xp-bonus";

export interface ArcadeUpgrade {
  id: ArcadeUpgradeId;
  title: string;
  description: string;
  category: "offense" | "defense" | "mobility" | "passive";
}

export interface ArcadeScorePayload {
  name: string;
  id: string;
  score: number;
  durationMs: number;
  kills: number;
  wave: number;
  upgrades: string[];
  game: "arcade";
}

export interface ArcadeRunStats {
  score: number;
  kills: number;
  eliteKills: number;
  wave: number;
  durationMs: number;
  upgrades: ArcadeUpgradeId[];
  combo: number;
  level: number;
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface ArcadePlayerState extends Vec2 {
  hp: number;
  maxHp: number;
  speed: number;
  fireRateMs: number;
  bulletDamage: number;
  bulletSpeed: number;
  bulletCount: number;
  shield: number;
  damageReduction: number;
  regenPerSecond: number;
  critChance: number;
  scoreMultiplier: number;
  xpBonus: number;
  hasRicochet: boolean;
  hasPiercing: boolean;
  hasLaser: boolean;
  hasAoeBlast: boolean;
  canDash: boolean;
  hasSlowMotion: boolean;
  slowMotionUntil: number;
  dashFlameUntil: number;
  dashDirX: number;
  dashDirY: number;
  lastFireAt: number;
  lastDamageAt: number;
}

export interface ArcadeEnemyState extends Vec2 {
  id: string;
  type: ArcadeEnemyType;
  hp: number;
  maxHp: number;
  speed: number;
  radius: number;
  damage: number;
  scoreValue: number;
  xpValue: number;
  shootCooldownMs?: number;
  lastShotAt?: number;
  vx: number;
  vy: number;
}

export interface ArcadeBulletState extends Vec2 {
  id: string;
  radius: number;
  damage: number;
  speed: number;
  vx: number;
  vy: number;
  from: "player" | "enemy";
  lifeMs: number;
  bornAt: number;
  canPierce?: boolean;
  canRicochet?: boolean;
  ricochetCount?: number;
}

export interface ArcadeParticleState extends Vec2 {
  id: string;
  vx: number;
  vy: number;
  lifeMs: number;
  bornAt: number;
  size: number;
  color: string;
}

export interface ArcadeHudSnapshot {
  hp: number;
  maxHp: number;
  score: number;
  kills: number;
  wave: number;
  level: number;
  xp: number;
  xpToNext: number;
  combo: number;
  isPaused: boolean;
}
