"use client";

import { Trophy, Gamepad2 } from "lucide-react";

export function SnakeSection() {
  return (
    <section className="w-full bg-[#d2e2ff]/40">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        
        <div className="flex flex-col gap-2">
          <h2 className="font-minecraft text-3xl uppercase tracking-wide text-[#0b1d4d] sm:text-4xl">
            DESAFIO <span className="text-[#005b9f]">SNAKE</span>
          </h2>
          <p className="text-sm font-medium text-[#0b1d4d]/70">
            Dê uma pausa nos estudos e teste seus reflexos!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px] md:items-stretch">
          {/* Painel do Botão de Jogo */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/60 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:bg-white/80">
            <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
              <div className="rounded-full bg-[#005b9f]/10 p-5 text-[#005b9f] transition-transform duration-500 group-hover:scale-110">
                <Gamepad2 size={48} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0b1d4d]">PRONTO PARA JOGAR?</h3>
                <p className="max-w-md text-[#0b1d4d]/80">
                  Ajude a cobrinha a comer os algoritmos e crescer sua pontuação no ranking do INF.
                </p>
              </div>

              <button className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-[#005b9f] px-10 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#16367f] hover:shadow-[#005b9f]/40 active:scale-95">
                <span className="relative z-10">INICIAR JOGO</span>
                <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </div>
          </div>

          {/* Painel de Scoreboard (Mock) */}
          <div className="flex flex-col rounded-3xl border border-white/50 bg-[#0b1d4d] p-6 text-white shadow-2xl">
            <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
              <Trophy className="text-yellow-400" size={24} />
              <span className="font-minecraft text-xl tracking-wider">RANKING</span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Linhas de Scoreboard Mockadas com tracejados */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[#005b9f]">0{i + 1}.</span>
                  <div className="h-[1px] flex-1 border-b border-dashed border-white/20" />
                  <span className="font-mono text-white/40">----</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-xl bg-white/5 p-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Sua melhor pontuação</p>
                <p className="font-minecraft text-2xl text-[#005b9f]">--</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}