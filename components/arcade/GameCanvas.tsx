"use client";

import { useEffect, useMemo, useRef } from "react";
import { ARCADE_HEIGHT, ARCADE_PLAYER_BASE, ARCADE_WIDTH } from "@/lib/arcadeBalance";
import { computeArcadeScore } from "@/lib/arcadeScore";
import type { ArcadeEnemyState, ArcadeHudSnapshot, ArcadeRunStats, ArcadeUpgradeId, Vec2 } from "@/lib/arcadeTypes";
import { updateBullets, createPlayerBullets } from "@/systems/BulletSystem";
import { resolveCollisions } from "@/systems/CollisionSystem";
import { createEnemy, updateEnemies } from "@/systems/EnemySystem";
import { createBurst, updateParticles } from "@/systems/ParticleSystem";
import { getSpawnBatchSize, getSpawnIntervalMs } from "@/systems/SpawnSystem";
import { applyUpgrade, getUpgradeChoices } from "@/systems/UpgradeSystem";
import { getWave, xpToNextLevel } from "@/systems/WaveSystem";

interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  shoot: boolean;
  slow: boolean;
  dashRequested: boolean;
}

interface Props {
  paused: boolean;
  restartSignal: number;
  selectedUpgradeId: ArcadeUpgradeId | null;
  mobileInput: {
    moveX: number;
    moveY: number;
    aimX: number;
    aimY: number;
    aiming: boolean;
    autoShoot: boolean;
  };
  dashSignal: number;
  onUpgradeConsumed: () => void;
  onHudUpdate: (snapshot: ArcadeHudSnapshot) => void;
  onLevelUp: (options: ArcadeUpgradeId[]) => void;
  onGameOver: (stats: ArcadeRunStats) => void;
}

interface EngineState {
  player: {
    x: number;
    y: number;
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
  };
  input: InputState;
  pointer: Vec2;
  enemies: ArcadeEnemyState[];
  bullets: ReturnType<typeof updateBullets>;
  particles: ReturnType<typeof updateParticles>;
  xp: number;
  xpToNext: number;
  level: number;
  wave: number;
  kills: number;
  eliteKills: number;
  combo: number;
  comboExpiresAt: number;
  upgrades: ArcadeUpgradeId[];
  isDead: boolean;
  awaitingUpgrade: boolean;
  startedAt: number;
  lastTick: number;
  lastSpawnAt: number;
  lastDashAt: number;
  score: number;
}

function clearDirectionalInput(input: InputState) {
  input.up = false;
  input.down = false;
  input.left = false;
  input.right = false;
  input.shoot = false;
  input.slow = false;
  input.dashRequested = false;
}

function createInitialState(): EngineState {
  const now = performance.now();
  return {
    player: {
      x: ARCADE_WIDTH / 2,
      y: ARCADE_HEIGHT / 2,
      hp: ARCADE_PLAYER_BASE.maxHp,
      maxHp: ARCADE_PLAYER_BASE.maxHp,
      speed: ARCADE_PLAYER_BASE.speed,
      fireRateMs: ARCADE_PLAYER_BASE.fireRateMs,
      bulletDamage: ARCADE_PLAYER_BASE.bulletDamage,
      bulletSpeed: ARCADE_PLAYER_BASE.bulletSpeed,
      bulletCount: ARCADE_PLAYER_BASE.bulletCount,
      shield: 0,
      damageReduction: 0,
      regenPerSecond: 0,
      critChance: 0.04,
      scoreMultiplier: 1,
      xpBonus: 0,
      hasRicochet: false,
      hasPiercing: false,
      hasLaser: false,
      hasAoeBlast: false,
      canDash: false,
      hasSlowMotion: false,
      slowMotionUntil: 0,
      dashFlameUntil: 0,
      dashDirX: 0,
      dashDirY: -1,
      lastFireAt: 0,
      lastDamageAt: 0,
    },
    input: {
      up: false,
      down: false,
      left: false,
      right: false,
      shoot: false,
      slow: false,
      dashRequested: false,
    },
    pointer: { x: ARCADE_WIDTH / 2, y: ARCADE_HEIGHT / 2 - 120 },
    enemies: [],
    bullets: [],
    particles: [],
    xp: 0,
    xpToNext: xpToNextLevel(1),
    level: 1,
    wave: 1,
    kills: 0,
    eliteKills: 0,
    combo: 1,
    comboExpiresAt: 0,
    upgrades: [],
    isDead: false,
    awaitingUpgrade: false,
    startedAt: now,
    lastTick: now,
    lastSpawnAt: now,
    lastDashAt: 0,
    score: 0,
  };
}

export default function GameCanvas({
  paused,
  restartSignal,
  selectedUpgradeId,
  mobileInput,
  dashSignal,
  onUpgradeConsumed,
  onHudUpdate,
  onLevelUp,
  onGameOver,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<EngineState | null>(null);
  const gameOverSentRef = useRef(false);
  const prevDashSignalRef = useRef(0);

  const aspectStyle = useMemo(
    () => ({
      aspectRatio: `${ARCADE_WIDTH} / ${ARCADE_HEIGHT}`,
    }),
    [],
  );

  useEffect(() => {
    stateRef.current = createInitialState();
    gameOverSentRef.current = false;
  }, [restartSignal]);

  useEffect(() => {
    const state = stateRef.current;
    if (!state || !selectedUpgradeId || !state.awaitingUpgrade) return;
    state.player = applyUpgrade(state.player, selectedUpgradeId);
    state.upgrades.push(selectedUpgradeId);
    state.awaitingUpgrade = false;
    onUpgradeConsumed();
  }, [selectedUpgradeId, onUpgradeConsumed]);

  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;
    const moveDeadzone = 0.2;
    state.input.up = mobileInput.moveY < -moveDeadzone;
    state.input.down = mobileInput.moveY > moveDeadzone;
    state.input.left = mobileInput.moveX < -moveDeadzone;
    state.input.right = mobileInput.moveX > moveDeadzone;
    state.input.shoot = mobileInput.autoShoot;
    if (mobileInput.aiming) {
      const len = Math.hypot(mobileInput.aimX, mobileInput.aimY) || 1;
      const aimDistance = 220;
      state.pointer.x = state.player.x + (mobileInput.aimX / len) * aimDistance;
      state.pointer.y = state.player.y + (mobileInput.aimY / len) * aimDistance;
    }
  }, [mobileInput]);

  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;
    if (dashSignal !== prevDashSignalRef.current) {
      state.input.dashRequested = true;
      prevDashSignalRef.current = dashSignal;
    }
  }, [dashSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const state = stateRef.current;
      if (!state) return;
      const key = e.key.toLowerCase();
      let handled = false;

      if (key === "w" || key === "arrowup") {
        state.input.up = true;
        handled = true;
      }
      if (key === "s" || key === "arrowdown") {
        state.input.down = true;
        handled = true;
      }
      if (key === "a" || key === "arrowleft") {
        state.input.left = true;
        handled = true;
      }
      if (key === "d" || key === "arrowright") {
        state.input.right = true;
        handled = true;
      }
      if (key === " ") {
        state.input.shoot = true;
        handled = true;
      }
      if (key === "q") {
        state.input.slow = true;
        handled = true;
      }
      if (key === "shift" && !e.repeat) {
        state.input.dashRequested = true;
        handled = true;
      }

      if (handled) e.preventDefault();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const state = stateRef.current;
      if (!state) return;
      const key = e.key.toLowerCase();
      let handled = false;

      if (key === "w" || key === "arrowup") {
        state.input.up = false;
        handled = true;
      }
      if (key === "s" || key === "arrowdown") {
        state.input.down = false;
        handled = true;
      }
      if (key === "a" || key === "arrowleft") {
        state.input.left = false;
        handled = true;
      }
      if (key === "d" || key === "arrowright") {
        state.input.right = false;
        handled = true;
      }
      if (key === " ") {
        state.input.shoot = false;
        handled = true;
      }
      if (key === "q") {
        state.input.slow = false;
        handled = true;
      }

      if (handled) e.preventDefault();
    };

    const handleBlur = () => {
      const state = stateRef.current;
      if (!state) return;
      clearDirectionalInput(state.input);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const state = stateRef.current;
      if (!state || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      state.pointer.x = ((e.clientX - rect.left) / rect.width) * ARCADE_WIDTH;
      state.pointer.y = ((e.clientY - rect.top) / rect.height) * ARCADE_HEIGHT;
    };

    const handleMouseDown = () => {
      const state = stateRef.current;
      if (!state) return;
      state.input.shoot = true;
    };
    const handleMouseUp = () => {
      const state = stateRef.current;
      if (!state) return;
      state.input.shoot = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const loop = () => {
      const state = stateRef.current;
      if (!state) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      const now = performance.now();
      const dt = Math.min(0.033, (now - state.lastTick) / 1000);
      state.lastTick = now;

      if (!paused && !state.isDead && !state.awaitingUpgrade) {
        const elapsed = now - state.startedAt;
        state.wave = getWave(elapsed);

        if (state.comboExpiresAt && now > state.comboExpiresAt) {
          state.combo = 1;
        }

        const slowFactor = state.player.hasSlowMotion && state.input.slow ? 0.7 : 1;
        const moveX = (Number(state.input.right) - Number(state.input.left)) * state.player.speed * dt;
        const moveY = (Number(state.input.down) - Number(state.input.up)) * state.player.speed * dt;
        state.player.x = Math.max(14, Math.min(ARCADE_WIDTH - 14, state.player.x + moveX));
        state.player.y = Math.max(14, Math.min(ARCADE_HEIGHT - 14, state.player.y + moveY));

        if (state.input.dashRequested && state.player.canDash && now - state.lastDashAt > 800) {
          const dx = state.pointer.x - state.player.x;
          const dy = state.pointer.y - state.player.y;
          const len = Math.hypot(dx, dy) || 1;
          const dirX = dx / len;
          const dirY = dy / len;
          state.player.dashDirX = dirX;
          state.player.dashDirY = dirY;
          state.player.dashFlameUntil = now + 190;
          state.player.x = Math.max(14, Math.min(ARCADE_WIDTH - 14, state.player.x + (dx / len) * 80));
          state.player.y = Math.max(14, Math.min(ARCADE_HEIGHT - 14, state.player.y + (dy / len) * 80));
          state.particles.push(
            ...createBurst(
              {
                x: state.player.x - dirX * 12,
                y: state.player.y - dirY * 12,
              },
              "rgba(251, 146, 60, 0.7)",
              14,
            ),
          );
          state.lastDashAt = now;
        }
        state.input.dashRequested = false;

        if (state.player.regenPerSecond > 0 && now - state.player.lastDamageAt > 1200) {
          state.player.hp = Math.min(state.player.maxHp, state.player.hp + state.player.regenPerSecond * dt);
        }

        if (state.input.shoot && now - state.player.lastFireAt >= state.player.fireRateMs) {
          state.player.lastFireAt = now;
          const bullets = createPlayerBullets(state.player, state.pointer, now);
          state.bullets.push(...bullets);
        }

        if (now - state.lastSpawnAt >= getSpawnIntervalMs(state.wave)) {
          state.lastSpawnAt = now;
          const batch = getSpawnBatchSize(state.wave);
          for (let i = 0; i < batch; i++) {
            state.enemies.push(createEnemy(state.wave));
          }
        }

        const enemyUpdate = updateEnemies(state.enemies, dt, state.player, slowFactor, now);
        state.enemies = enemyUpdate.enemies;
        state.bullets.push(...enemyUpdate.enemyBullets);

        state.bullets = updateBullets(state.bullets, dt, ARCADE_WIDTH, ARCADE_HEIGHT, now);
        state.particles = updateParticles(state.particles, dt, now);

        const collision = resolveCollisions(state.enemies, state.bullets, state.player);
        state.enemies = collision.enemies;
        state.bullets = collision.bullets;
        state.player = collision.player;
        state.particles.push(...collision.particles);

        if (collision.killsGained > 0) {
          state.kills += collision.killsGained;
          state.eliteKills += collision.eliteKillsGained;
          state.combo = Math.min(5, state.combo + collision.killsGained);
          state.comboExpiresAt = now + 2500;
          state.xp += Math.floor(collision.xpGained * (1 + state.player.xpBonus));
        }
        if (collision.playerDamaged) {
          state.combo = 1;
          state.comboExpiresAt = 0;
        }

        while (state.xp >= state.xpToNext) {
          state.xp -= state.xpToNext;
          state.level += 1;
          state.xpToNext = xpToNextLevel(state.level);
          state.awaitingUpgrade = true;
          onLevelUp(getUpgradeChoices(state.upgrades, 3));
        }

        state.score = computeArcadeScore({
          kills: state.kills,
          eliteKills: state.eliteKills,
          wave: state.wave,
          durationMs: elapsed,
          combo: state.combo,
          scoreMultiplier: state.player.scoreMultiplier,
        });

        if (state.player.hp <= 0) {
          state.isDead = true;
        }
      }

      draw(ctx, state);
      onHudUpdate({
        hp: Math.max(0, Math.floor(state.player.hp)),
        maxHp: state.player.maxHp,
        score: state.score,
        kills: state.kills,
        wave: state.wave,
        level: state.level,
        xp: Math.floor(state.xp),
        xpToNext: state.xpToNext,
        combo: state.combo,
        isPaused: paused,
      });

      if (state.isDead && !gameOverSentRef.current) {
        gameOverSentRef.current = true;
        onGameOver({
          score: state.score,
          kills: state.kills,
          eliteKills: state.eliteKills,
          wave: state.wave,
          durationMs: Math.floor(performance.now() - state.startedAt),
          upgrades: [...state.upgrades],
          combo: state.combo,
          level: state.level,
        });
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [onGameOver, onHudUpdate, onLevelUp, paused]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-violet-400/40 bg-[#090513]">
      <canvas ref={canvasRef} width={ARCADE_WIDTH} height={ARCADE_HEIGHT} className="block h-auto w-full" style={aspectStyle} />
    </div>
  );
}

function draw(ctx: CanvasRenderingContext2D, state: EngineState) {
  ctx.clearRect(0, 0, ARCADE_WIDTH, ARCADE_HEIGHT);

  ctx.fillStyle = "#090513";
  ctx.fillRect(0, 0, ARCADE_WIDTH, ARCADE_HEIGHT);

  ctx.strokeStyle = "rgba(139,92,246,0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < ARCADE_WIDTH; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ARCADE_HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y < ARCADE_HEIGHT; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ARCADE_WIDTH, y);
    ctx.stroke();
  }

  for (const p of state.particles) {
    const life = Math.max(0, 1 - (performance.now() - p.bornAt) / p.lifeMs);
    ctx.fillStyle = p.color.replace("0.7", `${life}`);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const enemy of state.enemies) {
    const colorByType = {
      basic: "#c084fc",
      kamikaze: "#f472b6",
      tank: "#818cf8",
      shooter: "#22d3ee",
      elite: "#fb7185",
    } as const;
    ctx.fillStyle = colorByType[enemy.type];
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const bullet of state.bullets) {
    ctx.fillStyle = bullet.from === "player" ? "#67e8f9" : "#fca5a5";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const angle = Math.atan2(state.pointer.y - state.player.y, state.pointer.x - state.player.x);
  const now = performance.now();
  ctx.save();
  ctx.translate(state.player.x, state.player.y);
  ctx.rotate(angle);

  if (now < state.player.dashFlameUntil) {
    const flameSize = 8 + Math.random() * 4;
    ctx.fillStyle = "rgba(251, 146, 60, 0.85)";
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-18 - flameSize, -4);
    ctx.lineTo(-18 - flameSize, 4);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(250, 204, 21, 0.85)";
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-15 - flameSize * 0.6, -2.5);
    ctx.lineTo(-15 - flameSize * 0.6, 2.5);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = "#f5d0fe";
  ctx.beginPath();
  ctx.moveTo(14, 0);
  ctx.lineTo(-10, -8);
  ctx.lineTo(-8, 0);
  ctx.lineTo(-10, 8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
