"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type CompanySlot = {
  id: string;
  name: string;
  logo: string;
  color: string;
  category: string;
  desktopPosition: string;
  lineEnd: { x: number; y: number };
};

const companySlots: CompanySlot[] = [
  {
    id: "01",
    name: "Nubank",
    logo: "/empresas/nubank2.png",
    color: "#8B5CF6",
    category: "Fintech",
    desktopPosition: "left-[9%] top-[6%]",
    lineEnd: { x: 16, y: 16 },
  },
  {
    id: "02",
    name: "Meta",
    logo: "/empresas/meta.png",
    color: "#1877F2",
    category: "Social Media",
    desktopPosition: "right-[9%] top-[6%]",
    lineEnd: { x: 84, y: 16 },
  },
  {
    id: "03",
    name: "Microsoft",
    logo: "/empresas/microsoft.png",
    color: "#00A4EF",
    category: "Big Tech",
    desktopPosition: "left-[1%] top-[40%]",
    lineEnd: { x: 8, y: 50 },
  },
  {
    id: "04",
    name: "Huawei",
    logo: "/empresas/huawei.png",
    color: "#CF0A2C",
    category: "Telecom",
    desktopPosition: "right-[1%] top-[40%]",
    lineEnd: { x: 92, y: 50 },
  },
  {
    id: "05",
    name: "Google",
    logo: "/empresas/google.png",
    color: "#34A853",
    category: "Big Tech",
    desktopPosition: "left-[9%] bottom-[6%]",
    lineEnd: { x: 16, y: 84 },
  },
  {
    id: "06",
    name: "Amazon",
    logo: "/empresas/amazon.png",
    color: "#FF9900",
    category: "Cloud & E-commerce",
    desktopPosition: "right-[9%] bottom-[6%]",
    lineEnd: { x: 84, y: 84 },
  },
];

/* ── Pulse ring (Framer Motion) ─────────────────────────────────── */
function PulseRing({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-[1.75rem] border border-[#60a5fa]/35"
      initial={{ scale: 1, opacity: 0.55 }}
      animate={{ scale: 1.38, opacity: 0 }}
      transition={{ duration: 2.6, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

/* ── Company card ────────────────────────────────────────────────── */
function CompanyCard({
  name,
  logo,
  color,
  category,
  isHighlighted,
  onHover,
}: {
  name: string;
  logo: string;
  color: string;
  category: string;
  isHighlighted: boolean;
  onHover: (name: string | null) => void;
}) {
  return (
    <motion.article
      className="group relative cursor-default overflow-hidden rounded-2xl bg-white"
      style={{
        borderTop: `3px solid ${color}`,
        boxShadow: isHighlighted
          ? `0 10px 36px ${color}40, 0 2px 10px rgba(11,29,77,0.14)`
          : "0 2px 10px rgba(11,29,77,0.09)",
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Logo */}
      <div className="relative h-24 w-full sm:h-28">
        <Image
          src={logo}
          alt={`Logo ${name}`}
          fill
          className="object-contain object-center p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 45vw, 216px"
        />
      </div>

      {/* Footer strip */}
      <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2.5">
        <span className="text-xs font-bold uppercase tracking-wide text-[#0b1d4d]">
          {name}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ backgroundColor: `${color}18`, color }}
        >
          {category}
        </span>
      </div>
    </motion.article>
  );
}

/* ── Main section ────────────────────────────────────────────────── */
export function CareerMindMapSection() {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-14 sm:px-6 md:px-8 lg:px-12">
      <div>

        {/* Header */}
        <div className="space-y-2">
          <p className="section-label">Mercado de Trabalho</p>
          <h2 className="text-3xl font-black uppercase tracking-wide text-[#0b1d4d] sm:text-4xl">
            Mapa de <span className="text-[#005b9f]">Carreiras</span>
          </h2>
          <p className="max-w-3xl text-sm font-medium leading-relaxed text-[#0b1d4d]/70 sm:text-base">
            Conheça as empresas onde os profissionais formados em Ciência da
            Computação atuam, desde gigantes da tecnologia até startups
            inovadoras, e descubra as diversas oportunidades de carreira que o
            curso pode oferecer.
          </p>
        </div>

        {/* ── MOBILE ── */}
        <div className="mt-8 flex flex-col items-center gap-4 md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#005b9f]/40 bg-[#0b2a67] px-4 py-5 text-center text-white shadow-xl shadow-[#0b1d4d]/20"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                CURSO
              </p>
              <p className="mt-1 text-lg font-black uppercase tracking-wide">
                Ciência da Computação
              </p>
              <div className="mx-auto mt-2.5 h-px w-10 bg-[#60a5fa]/60" />
            </div>
          </motion.div>

          <div className="grid w-full max-w-sm grid-cols-2 gap-3">
            {companySlots.map((slot, i) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
              >
                <CompanyCard
                  name={slot.name}
                  logo={slot.logo}
                  color={slot.color}
                  category={slot.category}
                  isHighlighted={false}
                  onHover={() => {}}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP mind map ── */}
        <div className="relative mt-10 hidden min-h-[42rem] md:block">

          {/* SVG connection lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              {companySlots.map((slot) => (
                <linearGradient
                  key={slot.id}
                  id={`cm-grad-${slot.id}`}
                  x1="50"
                  y1="50"
                  x2={slot.lineEnd.x}
                  y2={slot.lineEnd.y}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#005b9f" stopOpacity="0.85" />
                  <stop
                    offset="100%"
                    stopColor={slot.color}
                    stopOpacity="0.65"
                  />
                </linearGradient>
              ))}
              <filter id="cm-line-glow">
                <feGaussianBlur stdDeviation="0.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {companySlots.map((slot) => {
              const isH = hoveredName === slot.name;
              return (
                <line
                  key={slot.id}
                  x1="50"
                  y1="50"
                  x2={slot.lineEnd.x}
                  y2={slot.lineEnd.y}
                  stroke={isH ? slot.color : `url(#cm-grad-${slot.id})`}
                  strokeWidth={isH ? "0.9" : "0.5"}
                  strokeOpacity={isH ? 1 : 0.5}
                  strokeDasharray={isH ? undefined : "2.5 1.8"}
                  filter={isH ? "url(#cm-line-glow)" : undefined}
                  style={{ transition: "stroke-width 0.22s, stroke-opacity 0.22s" }}
                />
              );
            })}
          </svg>

          {/* Center node */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            {/* Pulse rings */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-72 -translate-x-1/2 -translate-y-1/2">
              <PulseRing delay={0} />
              <PulseRing delay={0.87} />
              <PulseRing delay={1.74} />
            </div>

            <div className="relative flex h-44 w-72 items-center justify-center overflow-hidden rounded-[1.75rem] border border-[#005b9f]/50 bg-[#0b2a67] p-6 text-center text-white shadow-2xl shadow-[#0b1d4d]/40">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
                  CURSO
                </p>
                <h3 className="text-xl font-black uppercase leading-tight tracking-wide">
                  Ciência da Computação
                </h3>
                <div className="mx-auto mt-3 h-px w-12 bg-[#60a5fa]/60" />
              </div>
            </div>
          </div>

          {/* Company cards */}
          {companySlots.map((slot, i) => (
            <motion.div
              key={slot.id}
              className={`absolute z-20 w-[13.5rem] ${slot.desktopPosition}`}
              initial={{ opacity: 0, scale: 0.82 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
            >
              <CompanyCard
                name={slot.name}
                logo={slot.logo}
                color={slot.color}
                category={slot.category}
                isHighlighted={hoveredName === slot.name}
                onHover={setHoveredName}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
