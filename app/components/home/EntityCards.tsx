"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

export type EntityItem = {
  name: string;
  description: string;
  logo: string; // Nova propriedade de imagem
};

export function EntityCard({ entity }: { entity: EntityItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-xl border border-[#8eb1ff]/55 bg-[#d9e7ff]/90 p-5 transition-all sm:p-6">
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Renderiza a logo real */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full sm:h-24 sm:w-24">
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
          {/* Linha decorativa abaixo do título */}
          <div className="mt-2 h-2 w-28 rounded-md bg-[#8eb1ff]/60 sm:w-40" />
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] mt-5 opacity-100 sm:mt-6" : "grid-rows-[0fr] mt-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-base leading-relaxed text-[#0b1d4d]/90 sm:text-lg">
            {entity.description}
          </p>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b1d4d]/10 py-2.5 text-sm font-bold uppercase tracking-wide text-[#0b1d4d] transition-colors hover:bg-[#0b1d4d]/20 active:scale-[0.98]"
      >
        {isExpanded ? (
          <>
            Recolher <ChevronUp size={18} />
          </>
        ) : (
          <>
            Ver mais <ChevronDown size={18} />
          </>
        )}
      </button>
    </article>
  );
}