"use client";

import { navItems } from "./config";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col bg-[#d2e2ff]">
      {/* Container Principal do Footer */}
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 border-t border-[#8eb1ff]/60 px-4 pb-8 pt-6 text-xs sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12">
        <div className="flex flex-wrap items-center gap-2 text-[#0b1d4d] sm:gap-3">
        </div>ESPAÇO DAS PROFISSÕES
        <nav className="flex flex-wrap items-center gap-3 font-bold tracking-wide sm:gap-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#0b1d4d] transition-colors hover:text-[#16367f]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

        {/* Main grid */}
        <div className="grid gap-10 border-b border-white/10 py-12 sm:grid-cols-2 md:py-14 lg:grid-cols-[1.6fr_1fr_1fr]">

          {/* Col 1 — Branding */}
          <div className="space-y-5">
            <Image
              src="/logoespaco.png"
              alt="Espaço das Profissões UFG"
              width={220}
              height={110}
              className="h-16 w-auto brightness-0 invert opacity-85"
            />
            <div className="space-y-1 text-sm text-white/45">
              <p>Instituto de Informática · UFG</p>
              <p>Campus Samambaia — Goiânia, GO</p>
            </div>
            <a
              href="https://inf.ufg.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold tracking-wide text-[#60a5fa]/70 transition-colors hover:text-[#60a5fa]"
            >
              inf.ufg.br ↗
            </a>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Navegação
            </p>
            <nav className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white/55 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Projeto */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Sobre o Projeto
            </p>
            <div className="space-y-2.5 text-sm text-white/55">
              <p>Computação e Sociedade</p>
              <p>Instituto de Informática</p>
              <p>Universidade Federal de Goiás</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 py-5 text-xs text-white/30 sm:flex-row sm:justify-between">
          <p>© {year} Espaço das Profissões — UFG · INF</p>
          <a
            href="https://www.linkedin.com/in/duebrits-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-white/60"
          >
            desenvolvido por outz.dev
          </a>
        </div>

      </div>
    </footer>
  );
}
