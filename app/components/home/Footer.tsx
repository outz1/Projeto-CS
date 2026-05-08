import { navItems } from "./config";

export function Footer() {
  return (
    <footer className="border-t border-[#0b1d4d]/20 bg-white">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 px-4 py-6 text-xs sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12">
        <div className="flex flex-wrap items-center gap-2 text-[#0b1d4d] sm:gap-3">
          <span className="font-semibold">Espaço das Profissões</span>
          <span className="text-[#0b1d4d]/60">espacodasprofissoes/cienciadacomputacao.com.br</span>
        </div>
        <nav className="flex flex-wrap items-center gap-3 font-bold tracking-wide sm:gap-5 [font-family:var(--font-minecraft)]">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-[#16367f]">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
