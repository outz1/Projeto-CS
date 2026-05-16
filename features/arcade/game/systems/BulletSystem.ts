import type { ArcadeBulletState, ArcadePlayerState, Vec2 } from "@/features/arcade/domain";

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function vectorTo(target: Vec2, from: Vec2) {
  const dx = target.x - from.x;
  const dy = target.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

export function createPlayerBullets(player: ArcadePlayerState, target: Vec2, now: number): ArcadeBulletState[] {
  const bullets: ArcadeBulletState[] = [];
  const forward = vectorTo(target, player);

  const count = Math.max(1, player.bulletCount);
  const spreadStep = Math.PI / 26;
  const baseAngle = Math.atan2(forward.y, forward.x);

  for (let i = 0; i < count; i++) {
    const offset = (i - (count - 1) / 2) * spreadStep;
    const angle = baseAngle + offset;
    const vx = Math.cos(angle);
    const vy = Math.sin(angle);
    const crit = Math.random() < player.critChance;
    const damage = crit ? Math.floor(player.bulletDamage * 1.8) : player.bulletDamage;

    bullets.push({
      id: id("pb"),
      x: player.x,
      y: player.y,
      radius: player.hasLaser ? 5 : 4,
      damage,
      speed: player.bulletSpeed,
      vx,
      vy,
      from: "player",
      lifeMs: player.hasLaser ? 1400 : 1800,
      bornAt: now,
      canPierce: player.hasPiercing,
      canRicochet: player.hasRicochet,
      ricochetCount: 0,
    });
  }

  return bullets;
}

export function updateBullets(
  bullets: ArcadeBulletState[],
  dt: number,
  width: number,
  height: number,
  now: number,
): ArcadeBulletState[] {
  const alive: ArcadeBulletState[] = [];

  for (const b of bullets) {
    if (now - b.bornAt > b.lifeMs) continue;

    let x = b.x + b.vx * b.speed * dt;
    let y = b.y + b.vy * b.speed * dt;
    let vx = b.vx;
    let vy = b.vy;
    let ricochetCount = b.ricochetCount ?? 0;

    if (b.canRicochet) {
      if ((x < 0 || x > width) && ricochetCount < 2) {
        vx *= -1;
        ricochetCount += 1;
      }
      if ((y < 0 || y > height) && ricochetCount < 2) {
        vy *= -1;
        ricochetCount += 1;
      }
      x = Math.max(0, Math.min(width, x));
      y = Math.max(0, Math.min(height, y));
    } else if (x < -20 || x > width + 20 || y < -20 || y > height + 20) {
      continue;
    }

    alive.push({
      ...b,
      x,
      y,
      vx,
      vy,
      ricochetCount,
    });
  }

  return alive;
}
