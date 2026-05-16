import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function GameDevelopmentHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d8e6ff] bg-[#071333]/95 text-white shadow-lg shadow-[#071333]/10 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors hover:text-white">
          <ChevronRight className="rotate-180" size={18} />
          Voltar ao Espaço das Profissões
        </Link>
        <Link
          href="/arcade"
          className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-100 transition hover:bg-white/15 sm:inline-flex"
        >
          Experimentar Arcade
        </Link>
      </div>
    </header>
  );
}
