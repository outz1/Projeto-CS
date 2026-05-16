"use client";

import { useState } from "react"; 
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

export type EntityItem = {
  name: string;
  description: string;
  logo: string;
};

export function EntityCard({ entity, isActive = true }: { entity: EntityItem; isActive?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Estado auxiliar para rastrear a mudança da prop isActive
  const [prevIsActive, setPrevIsActive] = useState(isActive);

  // Se a prop isActive mudou desde a última renderização
  if (isActive !== prevIsActive) {
    setPrevIsActive(isActive); // Atualiza o rastreador
    
    // Se o card deixou de ser o ativo, recolhemos o conteúdo
    if (!isActive) {
      setIsExpanded(false);
    }
  }

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-[#8eb1ff]/45 bg-white/80 p-6 shadow-sm shadow-[#0b1d4d]/6 transition-all duration-300 hover:shadow-md hover:shadow-[#0b1d4d]/10 sm:p-8">
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#8eb1ff]/40 bg-[#e8f0fe] sm:h-24 sm:w-24">
          <Image
            src={entity.logo}
            alt={`Logo da entidade ${entity.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 80px, 96px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-black uppercase tracking-wide text-[#0b1d4d] sm:text-2xl">
            {entity.name}
          </h3>
          <div className="mt-2.5 h-1.5 w-24 rounded-full bg-[#005b9f]/60 sm:w-36" />
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isExpanded ? "grid-rows-[1fr] mt-5 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-[#0b1d4d]/80 sm:text-base">
            {entity.description}
          </p>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#8eb1ff]/50 bg-[#e8f0fe]/60 py-2.5 text-xs font-bold uppercase tracking-widest text-[#005b9f] transition-all duration-200 hover:bg-[#dce8ff] hover:border-[#005b9f]/40 active:scale-[0.98]"
      >
        {isExpanded ? (
          <>
            Recolher <ChevronUp size={15} />
          </>
        ) : (
          <>
            Ver mais <ChevronDown size={15} />
          </>
        )}
      </button>
    </article>
  );
}