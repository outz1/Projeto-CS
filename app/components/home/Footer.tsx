"use client";

import { navItems } from "./config";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#091530] text-white">
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-12">

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
