import { Users } from "lucide-react";
import { careerRoles } from "../content";

export function CareerSection() {
  return (
    <section className="bg-[#e8f0fe] py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
            <Users size={15} />
            Mercado e papéis
          </span>
          <h2 className="text-2xl font-semibold leading-[1.3] tracking-[0.015em] text-[#071333] sm:text-4xl">Gamedev é trabalho em equipe.</h2>
          <p className="text-base leading-relaxed text-[#0b1d4d]/70">
            Mesmo jogos pequenos podem envolver muitas especialidades. Em projetos maiores, as funções se dividem para acelerar produção, melhorar qualidade e manter coerência entre tecnologia e experiência.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {careerRoles.map((role) => (
            <div key={role} className="rounded-2xl border border-[#c7d9ff] bg-white px-5 py-4 text-sm font-black text-[#071333] shadow-sm shadow-[#0b1d4d]/5">
              {role}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
