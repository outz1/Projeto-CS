import Link from "next/link";
import { ArrowRight, BrainCircuit, Gamepad2, Trophy } from "lucide-react";

export function NextStepSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-[#c7d9ff] bg-white p-6 shadow-xl shadow-[#0b1d4d]/6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d8e6ff] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
              <Trophy size={15} />
              Próximo passo
            </span>
            <h2 className="text-2xl font-semibold leading-[1.3] tracking-[0.015em] text-[#071333] sm:text-4xl">Da leitura para a experimentação.</h2>
            <p className="text-base leading-relaxed text-[#0b1d4d]/70">
              Depois de entender os fundamentos, a melhor forma de aprender é jogar criticamente: observe regras, feedback, dificuldade, interfaces e escolhas de design. Depois, tente transformar uma ideia pequena em protótipo.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/arcade"
              className="group rounded-3xl bg-[#071333] p-6 text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#071333]/20"
            >
              <Gamepad2 className="mb-5 text-blue-200" size={30} />
              <h3 className="text-xl font-semibold leading-snug tracking-[0.015em]">Entrar no Arcade</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-50/68">Experimente uma atividade gamificada do projeto e observe os conceitos em ação.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-200">
                Acessar <ArrowRight className="transition group-hover:translate-x-1" size={16} />
              </span>
            </Link>

            <Link
              href="/"
              className="group rounded-3xl border border-[#c7d9ff] bg-[#f8fbff] p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b1d4d]/10"
            >
              <BrainCircuit className="mb-5 text-[#005b9f]" size={30} />
              <h3 className="text-xl font-semibold leading-snug tracking-[0.015em] text-[#071333]">Voltar ao portal</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#0b1d4d]/68">Continue explorando cursos, áreas, entidades e possibilidades em Computação.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#005b9f]">
                Voltar <ArrowRight className="transition group-hover:translate-x-1" size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
