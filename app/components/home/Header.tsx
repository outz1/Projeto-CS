"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "./config";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function Header() {
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
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", closeMenuOnDesktop);
    return () => mediaQuery.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  return (
    <>
      <header className="fixed left-1/2 top-3 z-40 w-full max-w-[min(100%,70rem)] -translate-x-1/2 overflow-x-hidden px-2 [font-family:var(--font-minecraft)]">
        <div className="w-full max-w-full overflow-x-hidden rounded-2xl border border-[#8eb1ff]/45 bg-[#d8e6ff]/92 shadow-lg shadow-[#0b1d4d]/20 backdrop-blur">
          <div className="flex h-14 w-full max-w-full min-w-0 items-center justify-between gap-2 overflow-x-hidden px-3 sm:h-16 sm:px-5">
            <div className="flex min-w-0 max-w-full items-center gap-2 overflow-x-hidden">
              <ImagePlaceholder className="h-7 w-28 shrink-0 rounded-sm sm:h-8 sm:w-36" />
              <ImagePlaceholder className="hidden h-4 w-24 shrink-0 rounded-sm md:block" />
            </div>

            <nav className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-3 overflow-x-hidden text-xs font-semibold tracking-wide md:flex lg:gap-6 lg:text-sm">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="max-w-full truncate whitespace-nowrap transition-colors hover:text-[#16367f]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center gap-2 md:flex">
              <ImagePlaceholder className="h-7 w-7 rounded-md sm:h-8 sm:w-8" />
              <ImagePlaceholder className="h-7 w-7 rounded-md sm:h-8 sm:w-8" />
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
        onTouchStart={(event) => {
          event.preventDefault();
          toggleMenu();
        }}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <button
        type="button"
        aria-label="Fechar menu"
        className={`fixed inset-0 z-[80] overflow-x-hidden bg-[#0b1d4d]/40 transition-opacity duration-200 md:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id="mobile-side-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu lateral"
        className={`fixed right-0 top-0 z-[85] h-full w-[min(84%,26rem)] max-w-[100%] overflow-x-hidden border-l border-[#8eb1ff]/60 bg-[#d2e2ff] p-6 shadow-2xl shadow-[#0b1d4d]/25 transition-transform duration-200 md:hidden [font-family:var(--font-minecraft)] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 pt-10">
          <span className="text-sm font-semibold uppercase tracking-wide">Menu</span>
        </div>

        <nav className="flex max-w-full flex-col gap-4 overflow-x-hidden text-sm font-semibold">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="max-w-full rounded-md border border-[#8eb1ff]/60 bg-[#e4eeff]/70 px-3 py-3 break-words transition-colors hover:bg-[#f1f6ff]"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
