import Image from "next/image";
import Link from "next/link";

import { navItems } from "../../features/home/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#071333] pt-16 text-white sm:pt-20">
      <div className="absolute inset-x-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#005b9f] via-[#60a5fa] to-[#005b9f]" />

      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid gap-12 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1.5fr]">
          <div className="flex flex-col items-start">
            <Link
              href="/"
              aria-label="Voltar para a página inicial do Espaço das Profissões"
              className="mb-7 block w-full max-w-[20rem] rounded-2xl border border-white/15 bg-white/5 p-2 shadow-2xl shadow-black/20 outline-none transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071333] sm:max-w-[22rem]"
            >
              <Image
                src="/logoespaco.png"
                alt="Logo Espaço das Profissões UFG 2026"
                width={420}
                height={200}
                className="h-auto w-full rounded-xl object-contain"
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 320px, 90vw"
              />
            </Link>

            <div className="mt-0 flex flex-col space-y-3 px-1 text-sm leading-relaxed text-slate-300">
              <div>
                <p className="font-semibold text-slate-200">Instituto de Informática · UFG</p>
                <p>Campus Samambaia — Goiânia, GO</p>
              </div>
              <a
                href="https://inf.ufg.br"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex rounded-sm items-center gap-1.5 text-sm font-semibold tracking-wide text-[#60a5fa] outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071333]"
              >
                <span>inf.ufg.br</span>
                <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              <span className="h-px w-4 bg-[#60a5fa]" />
              Navegação
            </h3>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit rounded-sm text-sm font-medium text-slate-300 outline-none transition-all duration-200 hover:text-white hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071333]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              <span className="h-px w-4 bg-[#60a5fa]" />
              Sobre o Projeto
            </h3>
            <div className="flex flex-col space-y-2 text-sm text-slate-300">
              <p className="font-medium text-slate-200">Computação e Sociedade</p>
              <p>Instituto de Informática</p>
              <p className="mt-1 border-l-2 border-[#005b9f] py-1 pl-3">Universidade Federal de Goiás</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-slate-400 sm:flex-row">
          <p className="text-center sm:text-left">© {year} Espaço das Profissões — UFG · INF</p>
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
