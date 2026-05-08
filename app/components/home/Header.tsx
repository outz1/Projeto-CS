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

  return (
    <>
      <header className="fixed left-1/2 top-3 z-40 w-[calc(100%-1rem)] max-w-[1100px] -translate-x-1/2 rounded-2xl border border-[#0b1d4d]/20 bg-white/95 shadow-lg backdrop-blur [font-family:var(--font-minecraft)]">
        <div className="flex h-14 items-center justify-between px-3 sm:h-16 sm:px-5">
          <div className="flex items-center gap-2">
            <ImagePlaceholder className="h-7 w-28 rounded-sm sm:h-8 sm:w-36" />
            <ImagePlaceholder className="hidden h-4 w-24 rounded-sm md:block" />
          </div>

          <nav className="hidden items-center gap-4 text-xs font-semibold tracking-wide md:flex lg:gap-6 lg:text-sm">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-[#16367f]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ImagePlaceholder className="h-7 w-7 rounded-md sm:h-8 sm:w-8" />
            <ImagePlaceholder className="h-7 w-7 rounded-md sm:h-8 sm:w-8" />
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-side-menu"
        className="fixed right-4 top-5 z-[90] inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg border border-[#0b1d4d]/30 bg-white text-[#0b1d4d] shadow-md active:scale-95 md:hidden"
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
        className={`fixed inset-0 z-[80] bg-[#0b1d4d]/40 transition-opacity duration-200 md:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id="mobile-side-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu lateral"
        className={`fixed right-0 top-0 z-[85] h-full w-[84%] max-w-[320px] border-l border-[#0b1d4d]/20 bg-white p-6 shadow-2xl transition-transform duration-200 md:hidden [font-family:var(--font-minecraft)] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 pt-10">
          <span className="text-sm font-semibold uppercase tracking-wide">Menu</span>
        </div>

        <nav className="flex flex-col gap-4 text-sm font-semibold">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md border border-[#0b1d4d]/15 px-3 py-3 transition-colors hover:bg-[#f2f6ff]"
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
