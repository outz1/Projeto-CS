"use client";

import { navItems } from "./config";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#071333] pt-16 text-white sm:pt-20">
      {/* Faixa decorativa com as cores institucionais (Gov/UFG) */}
      <div className="absolute inset-x-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#005b9f] via-[#60a5fa] to-[#005b9f]"></div>

      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Main Grid Institucional */}
        <div className="grid gap-12 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1.5fr]">
          
          {/* Brand/Localização */}
          <div className="flex flex-col items-start">
            <Image
              src="/INF_INT_ART_PRETA2.png"
              alt="Universidade Federal de Goiás - Instituto de Informática"
              width={400}
              height={140}
              className="-mb-6 w-56 sm:w-64 h-auto brightness-0 invert opacity-90 drop-shadow-sm"
              priority
            />
            <div className="flex flex-col space-y-3 px-1 mt-2 text-sm leading-relaxed text-slate-300">
              <div>
                <p className="font-semibold text-slate-200">Instituto de Informática · UFG</p>
                <p>Campus Samambaia — Goiânia, GO</p>
              </div>
              <a
                href="https://inf.ufg.br"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-[#60a5fa] outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071333] rounded-sm"
              >
                <span>inf.ufg.br</span>
                <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
          </div>

          {/* Navegação Institucional */}
          <div className="flex flex-col">
            <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              <span className="h-px w-4 bg-[#60a5fa]"></span>
              Navegação
            </h3>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm font-medium text-slate-300 outline-none transition-all duration-200 hover:text-white hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071333] rounded-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Informações do Projeto */}
          <div className="flex flex-col">
            <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              <span className="h-px w-4 bg-[#60a5fa]"></span>
              Sobre o Projeto
            </h3>
            <div className="flex flex-col space-y-2 text-sm text-slate-300">
              <p className="font-medium text-slate-200">Computação e Sociedade</p>
              <p>Instituto de Informática</p>
              <p className="border-l-2 border-[#005b9f] pl-3 mt-1 py-1">Universidade Federal de Goiás</p>
            </div>
          </div>

        </div>

        {/* Linha de Separação e Base do Rodapé */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-slate-400 sm:flex-row">
          <p className="text-center sm:text-left">
            © {year} Espaço das Profissões — UFG · INF
          </p>
          <a
            href="https://www.linkedin.com/in/duebrits-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm outline-none transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071333]"
          >
            desenvolvido por <span className="font-semibold text-slate-300 hover:text-white">outz.dev</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
