import Link from "next/link";
import { ChevronRight, RadioTower } from "lucide-react";

export function ArcadeHeader() {
  return (
    <header className="relative z-10 border-b border-white/10 bg-[#040816]/60 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100 transition hover:border-cyan-200/40 hover:bg-white/[0.10]">
          <ChevronRight className="rotate-180 transition group-hover:-translate-x-0.5" size={16} />
          Voltar ao site
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100 sm:inline-flex">
          <RadioTower size={14} />
          Arcade universitário online
        </div>
      </div>
    </header>
  );
}
