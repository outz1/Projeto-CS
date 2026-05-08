"use client";

import { forwardRef } from "react";

export type FloatingCardConfig = {
  id: string;
  index: string;
  title: string;
  caption: string;
  body: string;
  accent: string;
  width: string;
  height: string;
  inputRange: number[];
  x: string[];
  y: string[];
  rotate: number[];
  scale: number[];
  opacity: number[];
  zIndex: number[];
};

type FloatingCardProps = {
  card: FloatingCardConfig;
};

export const FloatingCard = forwardRef<HTMLElement, FloatingCardProps>(
  function FloatingCard({ card }, ref) {
    return (
      <article
        ref={ref}
        aria-hidden="true"
        className="floating-card pointer-events-none absolute left-1/2 top-1/2 h-[var(--card-height)] w-[var(--card-width)] overflow-hidden rounded-[28px] border border-cyan-200/25 bg-indigo-600/70 p-6 text-white shadow-[0_34px_120px_rgba(31,38,135,0.55)] backdrop-blur-xl sm:p-7"
        style={{
          "--card-width": card.width,
          "--card-height": card.height,
        } as React.CSSProperties}
      >
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `linear-gradient(135deg, ${card.accent}, rgba(79, 70, 229, 0.86) 52%, rgba(14, 165, 233, 0.72))`,
          }}
        />
        <div className="absolute inset-x-4 top-3 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <div className="card-glow absolute -right-10 -top-14 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-5 left-6 right-6 h-px bg-gradient-to-r from-white/50 via-transparent to-white/25" />

        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {card.index}
            </span>
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-sm">
              {card.title}
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {card.caption}
            </h3>
            <p className="mt-4 line-clamp-5 text-sm leading-6 text-white/76 sm:text-base sm:leading-7">
              {card.body}
            </p>
          </div>
        </div>
      </article>
    );
  },
);
