"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, PersonStandingIcon } from "lucide-react";
import { navItems } from "./config";

export function Header() {
  const openVLibras = () => {
    const vlibrasButton = document.querySelector('[vw-access-button]') as HTMLElement;
    const hasLoaded = document.querySelector('.vw-plugin-top-wrapper');

    if (vlibrasButton && hasLoaded?.children.length) {
      vlibrasButton.click(); 
    } else {
      alert("Aguarde um momento. O tradutor de Libras está sendo inicializado...");
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((current) => !current);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 48rem)");
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    mediaQuery.addEventListener("change", closeMenuOnDesktop);
    return () => mediaQuery.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  return (
    <>
      <header className="fixed left-1/2 top-3 z-40 w-full max-w-[min(100%,70rem)] -translate-x-1/2 px-2">
        <div className="w-full rounded-2xl border border-[#8eb1ff]/45 bg-[#d8e6ff]/92 shadow-lg shadow-[#0b1d4d]/20 backdrop-blur">
          <div className="flex h-14 w-full items-center justify-between gap-2 px-3 sm:h-16 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <Image
                src="/INF-02.png"
                alt="Instituto de Informática"
                width={300}
                height={120}
                className="h-[5.5rem] w-auto shrink-0 sm:h-16 md:h-[6.5rem]"
                priority
              />
            </div>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 text-xs font-semibold tracking-wide md:flex lg:gap-6 lg:text-sm">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap text-[#0b1d4d] transition-colors hover:text-[#16367f]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center md:flex">
              <button
                type="button"
                onClick={openVLibras}
                aria-label="Abrir menu de Libras"
                className="cursor-pointer p-2 transition-colors hover:text-[#16367f]"
              >
                <PersonStandingIcon className="pointer-events-none mr-1 -ml-1 inline-block h-12 w-8" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-side-menu"
        className="fixed right-4 top-5 z-[90] inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg border border-[#8eb1ff]/60 bg-[#d8e6ff] text-[#0b1d4d] shadow-md shadow-[#0b1d4d]/20 active:scale-95 md:hidden"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        role="button"
        tabIndex={0}
        aria-label="Fechar menu"
        className={`fixed inset-0 z-[80] bg-[#0b1d4d]/40 transition-opacity duration-200 md:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
        onKeyDown={(e) => e.key === "Enter" && setIsMenuOpen(false)}
      />

      <aside
        id="mobile-side-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu lateral"
        className={`fixed right-0 top-0 z-[85] flex h-full w-[min(84%,26rem)] flex-col border-l border-[#8eb1ff]/60 bg-[#d2e2ff] p-6 shadow-2xl shadow-[#0b1d4d]/25 transition-transform duration-200 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 pt-10 flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-wide text-[#0b1d4d]">
            Menu
          </span>
          
          {/* Botão de Acessibilidade Mobile */}
          <button
            type="button"
            onClick={openVLibras}
            aria-label="Abrir menu de Libras"
            className="flex items-center gap-2 rounded-lg border border-[#8eb1ff]/60 bg-[#e4eeff]/70 px-3 py-1.5 text-xs font-bold text-[#0b1d4d] transition-colors active:bg-[#f1f6ff]"
          >
            <PersonStandingIcon size={18} />
            Libras
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-sm font-semibold text-[#0b1d4d]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="break-words rounded-md border border-[#8eb1ff]/60 bg-[#e4eeff]/70 px-3 py-3 transition-colors hover:bg-[#f1f6ff]"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-8 pb-4 w-full">
          <div className="flex h-24 w-full items-center justify-center rounded-xl border-2 border-dashed border-[#0b1d4d]/40 bg-[#0b1d4d]/10">
            <span className="text-xs font-semibold tracking-wide text-[#0b1d4d]/60">
              (SUA IMAGEM AQUI)
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}