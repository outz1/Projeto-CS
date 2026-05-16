import { ARCADE_HEIGHT, ARCADE_WIDTH } from "@/lib/arcadeBalance";
import type { ArcadeBulletState, ArcadeEnemyState, ArcadeEnemyType, Vec2 } from "@/lib/arcadeTypes";

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function chooseEnemyType(wave: number): ArcadeEnemyType {
  const roll = Math.random();
  if (wave > 10 && roll < 0.1) return "elite";
  if (wave > 6 && roll < 0.2) return "shooter";
  if (wave > 4 && roll < 0.34) return "tank";
  if (wave > 2 && roll < 0.52) return "kamikaze";
  return "basic";
}

export function createEnemy(wave: number): ArcadeEnemyState {
  const type = chooseEnemyType(wave);
  const side = Math.floor(Math.random() * 4);
  const margin = 20;
  let x = 0;
  let y = 0;
  if (side === 0) {
    x = Math.random() * ARCADE_WIDTH;
    y = -margin;
  } else if (side === 1) {
    x = ARCADE_WIDTH + margin;
    y = Math.random() * ARCADE_HEIGHT;
  } else if (side === 2) {
    x = Math.random() * ARCADE_WIDTH;
    y = ARCADE_HEIGHT + margin;
  } else {
    x = -margin;
    y = Math.random() * ARCADE_HEIGHT;
  }

  const baseByType: Record<ArcadeEnemyType, Omit<ArcadeEnemyState, "id" | "x" | "y" | "vx" | "vy">> = {
    basic: { type: "basic", hp: 26, maxHp: 26, speed: 90, radius: 12, damage: 10, scoreValue: 10, xpValue: 12 },
    kamikaze: { type: "kamikaze", hp: 18, maxHp: 18, speed: 135, radius: 10, damage: 14, scoreValue: 14, xpValue: 10 },
    tank: { type: "tank", hp: 72, maxHp: 72, speed: 55, radius: 16, damage: 18, scoreValue: 24, xpValue: 24 },
    shooter: {
      type: "shooter",
      hp: 34,
      maxHp: 34,
      speed: 62,
      radius: 12,
      damage: 12,
      scoreValue: 18,
      xpValue: 16,
      shootCooldownMs: 1300,
      lastShotAt: 0,
    },
    elite: {
      type: "elite",
      hp: 120,
      maxHp: 120,
      speed: 75,
      radius: 18,
      damage: 22,
      scoreValue: 90,
      xpValue: 60,
      shootCooldownMs: 850,
      lastShotAt: 0,
    },
  };

  const chosen = baseByType[type];
  const hpScale = 1 + wave * 0.08;
  const speedScale = 1 + wave * 0.015;

  return {
    id: id("enemy"),
    x,
    y,
    vx: 0,
    vy: 0,
    ...chosen,
    hp: Math.floor(chosen.hp * hpScale),
    maxHp: Math.floor(chosen.maxHp * hpScale),
    speed: chosen.speed * speedScale,
    scoreValue: Math.floor(chosen.scoreValue * (1 + wave * 0.06)),
    xpValue: Math.floor(chosen.xpValue * (1 + wave * 0.04)),
  };
}

function normalize(vx: number, vy: number) {
  const len = Math.hypot(vx, vy) || 1;
  return { x: vx / len, y: vy / len };
}

export function updateEnemies(
  enemies: ArcadeEnemyState[],
  dt: number,
  target: Vec2,
  slowFactor: number,
  now: number,
): { enemies: ArcadeEnemyState[]; enemyBullets: ArcadeBulletState[] } {
  const enemyBullets: ArcadeBulletState[] = [];

  const updated = enemies.map((enemy) => {
    const dir = normalize(target.x - enemy.x, target.y - enemy.y);
    const speed = enemy.speed * slowFactor;
    const vx = dir.x * speed;
    const vy = dir.y * speed;
    const next = {
      ...enemy,
      vx,
      vy,
      x: enemy.x + vx * dt,
      y: enemy.y + vy * dt,
    };

    if ((enemy.type === "shooter" || enemy.type === "elite") && enemy.shootCooldownMs) {
      const last = enemy.lastShotAt ?? 0;
      if (now - last >= enemy.shootCooldownMs) {
        enemyBullets.push({
          id: id("eb"),
          x: next.x,
          y: next.y,
          radius: enemy.type === "elite" ? 6 : 5,
          damage: enemy.type === "elite" ? 14 : 9,
          speed: enemy.type === "elite" ? 260 : 220,
          vx: dir.x,
          vy: dir.y,
          from: "enemy",
          lifeMs: 2600,
          bornAt: now,
        });
        next.lastShotAt = now;
      }
    }

    return next;
  });

  return { enemies: updated, enemyBullets };
}
