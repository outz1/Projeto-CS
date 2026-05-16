import type { ArcadeParticleState, Vec2 } from "@/features/arcade/domain";

function id() {
  return `pt-${Math.random().toString(36).slice(2, 10)}`;
}

export function createBurst(origin: Vec2, color: string, amount = 8): ArcadeParticleState[] {
  const particles: ArcadeParticleState[] = [];
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 50 + Math.random() * 180;
    particles.push({
      id: id(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      lifeMs: 320 + Math.random() * 360,
      bornAt: performance.now(),
      size: 1 + Math.random() * 3,
      color,
    });
  }
  return particles;
}

export function updateParticles(particles: ArcadeParticleState[], dt: number, now: number): ArcadeParticleState[] {
  return particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx * dt,
      y: p.y + p.vy * dt,
      vy: p.vy + 180 * dt,
    }))
    .filter((p) => now - p.bornAt <= p.lifeMs);
}
