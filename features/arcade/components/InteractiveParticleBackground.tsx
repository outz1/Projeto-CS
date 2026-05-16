"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
  phase: number;
  color: string;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
  lastMoveAt: number;
};

const PARTICLE_COLORS = ["96, 165, 250", "34, 211, 238", "217, 70, 239", "168, 85, 247"];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticles(width: number, height: number): Particle[] {
  const isCompact = width < 768;
  const particleCount = isCompact ? 72 : 128;

  return Array.from({ length: particleCount }, (_, index) => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const depth = randomBetween(0.45, 1.15);

    return {
      x,
      y,
      baseX: x,
      baseY: y,
      vx: randomBetween(-0.25, 0.25),
      vy: randomBetween(-0.25, 0.25),
      radius: randomBetween(1.25, isCompact ? 2.6 : 3.4),
      depth,
      phase: index * 0.37 + Math.random() * Math.PI,
      color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
    };
  });
}

export function InteractiveParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false, lastMoveAt: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(width, height);
    };

    const drawConnections = () => {
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.hypot(dx, dy);
          const maxDistance = width < 768 ? 92 : 128;

          if (distance > maxDistance) continue;

          const opacity = (1 - distance / maxDistance) * 0.16;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle = `rgba(125, 211, 252, ${opacity})`;
          context.lineWidth = 0.8;
          context.stroke();
        }
      }
    };

    const drawParticle = (particle: Particle, pointer: PointerState) => {
      const pointerDistance = pointer.active ? Math.hypot(pointer.x - particle.x, pointer.y - particle.y) : Number.POSITIVE_INFINITY;
      const glow = Math.max(0, 1 - pointerDistance / 220);
      const radius = particle.radius + glow * 3.1;

      context.beginPath();
      context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${particle.color}, ${0.58 + glow * 0.34})`;
      context.shadowBlur = 16 + glow * 30;
      context.shadowColor = `rgba(${particle.color}, ${0.48 + glow * 0.34})`;
      context.fill();
      context.shadowBlur = 0;
    };

    const drawPointerAura = (pointer: PointerState) => {
      if (!pointer.active) return;

      const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 190);
      gradient.addColorStop(0, "rgba(34, 211, 238, 0.18)");
      gradient.addColorStop(0.45, "rgba(168, 85, 247, 0.08)");
      gradient.addColorStop(1, "rgba(7, 19, 51, 0)");

      context.beginPath();
      context.arc(pointer.x, pointer.y, 190, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();

      context.beginPath();
      context.arc(pointer.x, pointer.y, 18, 0, Math.PI * 2);
      context.strokeStyle = "rgba(191, 219, 254, 0.55)";
      context.lineWidth = 1;
      context.stroke();
    };

    const renderStaticFrame = () => {
      context.clearRect(0, 0, width, height);
      drawConnections();
      particlesRef.current.forEach((particle) => drawParticle(particle, pointerRef.current));
    };

    const animate = (time: number) => {
      context.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      if (pointer.active && time - pointer.lastMoveAt > 1700) {
        pointer.active = false;
      }

      drawPointerAura(pointer);

      particlesRef.current.forEach((particle) => {
        const driftX = Math.sin(time * 0.00035 + particle.phase) * 0.025 * particle.depth;
        const driftY = Math.cos(time * 0.00042 + particle.phase) * 0.025 * particle.depth;
        const homeForceX = (particle.baseX - particle.x) * 0.0025;
        const homeForceY = (particle.baseY - particle.y) * 0.0025;

        particle.vx += homeForceX + driftX;
        particle.vy += homeForceY + driftY;

        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.max(Math.hypot(dx, dy), 1);
          const interactionRadius = width < 768 ? 190 : 285;
          const influence = Math.max(0, 1 - distance / interactionRadius);

          if (influence > 0) {
            const attraction = influence * 0.072 * particle.depth;
            const orbit = influence * 0.82 * particle.depth;
            particle.vx += (dx / distance) * attraction + (-dy / distance) * orbit;
            particle.vy += (dy / distance) * attraction + (dx / distance) * orbit;
          }
        }

        particle.vx *= 0.91;
        particle.vy *= 0.91;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -40 || particle.x > width + 40 || particle.y < -40 || particle.y > height + 40) {
          particle.x = particle.baseX;
          particle.y = particle.baseY;
          particle.vx = 0;
          particle.vy = 0;
        }
      });

      drawConnections();
      particlesRef.current.forEach((particle) => drawParticle(particle, pointer));
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
        lastMoveAt: performance.now(),
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    resize();

    if (reducedMotionQuery.matches) {
      renderStaticFrame();
    } else {
      animationFrameId = window.requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-95 mix-blend-screen [mask-image:radial-gradient(circle_at_center,black_0%,black_70%,transparent_100%)]"
    />
  );
}
