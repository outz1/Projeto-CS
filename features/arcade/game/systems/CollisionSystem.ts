import type {
  ArcadeBulletState,
  ArcadeEnemyState,
  ArcadeParticleState,
  ArcadePlayerState,
} from "@/lib/arcadeTypes";
} from "@/features/arcade/domain";
import { createBurst } from "./ParticleSystem";

export interface CollisionResult {
  enemies: ArcadeEnemyState[];
  bullets: ArcadeBulletState[];
  player: ArcadePlayerState;
  particles: ArcadeParticleState[];
  killsGained: number;
  eliteKillsGained: number;
  xpGained: number;
  scoreGained: number;
  playerDamaged: boolean;
}

function distanceSquared(ax: number, ay: number, bx: number, by: number): number {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

export function resolveCollisions(
  enemies: ArcadeEnemyState[],
  bullets: ArcadeBulletState[],
  player: ArcadePlayerState,
): CollisionResult {
  const nextEnemies = [...enemies];
  const nextBullets: ArcadeBulletState[] = [];
  const particles: ArcadeParticleState[] = [];
  const nextPlayer = { ...player };

  let killsGained = 0;
  let eliteKillsGained = 0;
  let xpGained = 0;
  let scoreGained = 0;
  let playerDamaged = false;

  for (const bullet of bullets) {
    let consumed = false;

    if (bullet.from === "player") {
      for (let i = 0; i < nextEnemies.length; i++) {
        const enemy = nextEnemies[i];
        const hitRadius = bullet.radius + enemy.radius;
        if (distanceSquared(bullet.x, bullet.y, enemy.x, enemy.y) <= hitRadius * hitRadius) {
          enemy.hp -= bullet.damage;
          particles.push(...createBurst({ x: bullet.x, y: bullet.y }, "rgba(196, 181, 253, 0.7)", 5));
          if (enemy.hp <= 0) {
            killsGained += 1;
            if (enemy.type === "elite") eliteKillsGained += 1;
            xpGained += enemy.xpValue;
            scoreGained += enemy.scoreValue;
            particles.push(...createBurst({ x: enemy.x, y: enemy.y }, "rgba(244, 114, 182, 0.85)", 12));

            if (player.hasAoeBlast) {
              for (const other of nextEnemies) {
                if (other.id === enemy.id) continue;
                const d2 = distanceSquared(enemy.x, enemy.y, other.x, other.y);
                if (d2 < 90 * 90) {
                  other.hp -= Math.floor(bullet.damage * 0.75);
                }
              }
            }
          }

          if (!bullet.canPierce) {
            consumed = true;
            break;
          }
        }
      }
    } else {
      const hitRadius = bullet.radius + 11;
      if (distanceSquared(bullet.x, bullet.y, nextPlayer.x, nextPlayer.y) <= hitRadius * hitRadius) {
        const reduced = Math.max(1, Math.floor(bullet.damage * (1 - nextPlayer.damageReduction)));
        if (nextPlayer.shield > 0) {
          const shieldAbsorb = Math.min(nextPlayer.shield, reduced);
          nextPlayer.shield -= shieldAbsorb;
          nextPlayer.hp -= reduced - shieldAbsorb;
        } else {
          nextPlayer.hp -= reduced;
        }
        nextPlayer.lastDamageAt = performance.now();
        playerDamaged = true;
        consumed = true;
      }
    }

    if (!consumed) nextBullets.push(bullet);
  }

  for (const enemy of nextEnemies) {
    const hitRadius = enemy.radius + 11;
    if (distanceSquared(enemy.x, enemy.y, nextPlayer.x, nextPlayer.y) <= hitRadius * hitRadius) {
      const reduced = Math.max(1, Math.floor(enemy.damage * (1 - nextPlayer.damageReduction)));
      if (nextPlayer.shield > 0) {
        const shieldAbsorb = Math.min(nextPlayer.shield, reduced);
        nextPlayer.shield -= shieldAbsorb;
        nextPlayer.hp -= reduced - shieldAbsorb;
      } else {
        nextPlayer.hp -= reduced;
      }
      enemy.hp = 0;
      nextPlayer.lastDamageAt = performance.now();
      playerDamaged = true;
      particles.push(...createBurst({ x: enemy.x, y: enemy.y }, "rgba(251, 113, 133, 0.8)", 10));
    }
  }

  return {
    enemies: nextEnemies.filter((enemy) => enemy.hp > 0),
    bullets: nextBullets,
    player: nextPlayer,
    particles,
    killsGained,
    eliteKillsGained,
    xpGained,
    scoreGained,
    playerDamaged,
  };
}
