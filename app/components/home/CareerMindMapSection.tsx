"use client";

import Image from "next/image";

type CompanySlot = {
  id: string;
  name: string;
  logo: string;
  desktopPosition: string;
  lineEnd: { x: number; y: number };
};

const companySlots: CompanySlot[] = [
  { id: "01", name: "Nubank", logo: "/empresas/nubank2.png", desktopPosition: "left-[14%] top-[10%]", lineEnd: { x: 22, y: 18 } },
  { id: "02", name: "Meta", logo: "/empresas/meta.png", desktopPosition: "right-[14%] top-[10%]", lineEnd: { x: 78, y: 18 } },
  { id: "03", name: "Microsoft", logo: "/empresas/microsoft.png", desktopPosition: "left-[6%] top-[38%]", lineEnd: { x: 14, y: 46 } },
  { id: "04", name: "Huawei", logo: "/empresas/huawei.png", desktopPosition: "right-[6%] top-[38%]", lineEnd: { x: 86, y: 46 } },
  { id: "05", name: "Google", logo: "/empresas/google.png", desktopPosition: "left-[14%] bottom-[10%]", lineEnd: { x: 22, y: 78 } },
  { id: "06", name: "Amazon", logo: "/empresas/amazon.png", desktopPosition: "right-[14%] bottom-[10%]", lineEnd: { x: 78, y: 78 } },
];

function CompanyCard({ id, name, logo }: { id: string; name: string; logo: string }) {
  return (
    <article className="group relative h-28 w-full overflow-hidden rounded-2xl border border-[#005b9f]/30 bg-white shadow-sm shadow-[#0b1d4d]/8 transition-all duration-300 hover:scale-105 hover:border-[#005b9f]/60 hover:shadow-lg hover:shadow-[#005b9f]/15 sm:h-32">
      <Image
        src={logo}
        alt={`Logo da empresa ${name}`}
        fill
        className="object-contain object-center p-3 transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 45vw, 232px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d4d]/50 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 truncate px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white">
        {name}
      </div>
    </article>
  );
}

export function CareerMindMapSection() {
  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-14 sm:px-6 md:px-8 lg:px-12">
      <div className="rounded-[2rem] border border-[#8eb1ff]/40 bg-[#dce8ff]/40 p-6 shadow-md shadow-[#0b1d4d]/8 sm:p-8 lg:p-10">
        <div className="space-y-2">
          <p className="section-label">Mercado de Trabalho</p>
          <h2 className="text-3xl font-black uppercase tracking-wide text-[#0b1d4d] sm:text-4xl">
            Mapa de <span className="text-[#005b9f]">Carreiras</span>
          </h2>
          <p className="max-w-3xl text-sm font-medium leading-relaxed text-[#0b1d4d]/70 sm:text-base">
            Conheça as empresas onde os profissionais formados em Ciência da Computação atuam, desde gigantes da tecnologia até startups inovadoras, e descubra as diversas oportunidades de carreira que o curso pode oferecer.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 md:hidden">
          <div className="flex w-full max-w-sm items-center justify-center rounded-2xl border border-[#005b9f]/30 bg-[#0b1d4d] px-4 py-5 text-center text-white shadow-lg">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/60">CURSO</p>
              <p className="mt-1 text-lg font-black uppercase tracking-wide">Ciência da Computação</p>
            </div>
          </div>

          <div className="grid w-full max-w-sm grid-cols-2 gap-3">
            {companySlots.map((slot) => (
              <CompanyCard key={slot.id} id={slot.id} name={slot.name} logo={slot.logo} />
            ))}
          </div>
        </div>

        <div className="relative mt-10 hidden min-h-[36rem] md:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker id="mindmap-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#005b9f" />
              </marker>
            </defs>
            {companySlots.map((slot) => (
              <line
                key={slot.id}
                x1="50"
                y1="50"
                x2={slot.lineEnd.x}
                y2={slot.lineEnd.y}
                stroke="#005b9f"
                strokeWidth="0.55"
                strokeOpacity="0.7"
                markerEnd="url(#mindmap-arrow)"
              />
            ))}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 flex h-44 w-72 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.75rem] border border-[#005b9f]/50 bg-[#0b2a67] p-6 text-center text-white shadow-2xl shadow-[#0b1d4d]/40">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/50">CURSO</p>
              <h3 className="text-xl font-black uppercase leading-tight tracking-wide">Ciência da Computação</h3>
              <div className="mx-auto mt-3 h-px w-12 bg-[#60a5fa]/60" />
            </div>
          </div>

          {companySlots.map((slot) => (
            <div key={slot.id} className={`absolute z-20 w-[14.5rem] ${slot.desktopPosition}`}>
              <CompanyCard id={slot.id} name={slot.name} logo={slot.logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
