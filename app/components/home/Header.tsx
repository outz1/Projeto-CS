"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "./config";
import { AudioReaderButton } from "./AudioReaderButton";

interface HeaderProps {
  readerTargetId?: string;
}

export function Header({ readerTargetId }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((current) => !current);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={`fixed z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "left-1/2 top-3 w-[min(96%,70rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#071333]/90 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md"
            : "left-0 top-0 w-full rounded-none border-b border-white/5 bg-[#071333] shadow-md"
        }`}
      >
        <div
          className={`absolute inset-x-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#005b9f] via-[#60a5fa] to-[#005b9f] transition-opacity duration-300 ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
        />

        <div
          className={`mx-auto flex w-full max-w-[1500px] items-center justify-between gap-3 transition-all duration-300 ${
            isScrolled ? "h-14 px-4 sm:h-16 sm:px-6" : "h-20 pt-1.5 px-4 sm:h-24 sm:px-8 lg:px-12"
          }`}
        >
          <div className="flex shrink-0 items-center">
            <Image
              src="/INF_INT_ART_PRETA2.png"
              alt="Instituto de Informática"
              width={350}
              height={120}
              className={`h-auto brightness-0 invert transition-all duration-300 ${
                isScrolled ? "w-40 sm:w-44" : "w-48 sm:w-60"
              }`}
              priority
            />
          </div>

          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-3 px-8 text-xs font-semibold tracking-wide md:flex lg:gap-7 lg:text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link whitespace-nowrap text-slate-300 transition-all duration-200 hover:text-white hover:underline hover:underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071333]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center md:flex">
            {readerTargetId && (
              <AudioReaderButton
                targetElementId={readerTargetId}
                className="rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071333]"
              />
            )}
          </div>
        </div>
      </header>

      {/* Mobile Buttons */}
      <div className="fixed right-4 top-5 z-[90] flex items-center gap-2 md:hidden">
        {readerTargetId && (
          <AudioReaderButton
            targetElementId={readerTargetId}
            className="rounded-lg border border-[#8eb1ff]/60 bg-[#d8e6ff] shadow-md shadow-[#0b1d4d]/20 hover:bg-[#f1f6ff]"
          />
        )}
        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-side-menu"
          className="inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg border border-[#8eb1ff]/60 bg-[#d8e6ff] text-[#0b1d4d] shadow-md shadow-[#0b1d4d]/20 active:scale-95"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

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
        className={`fixed right-0 top-0 z-[85] flex h-full w-[min(84%,26rem)] flex-col border-l border-[#8eb1ff]/40 bg-[#dce8ff] shadow-2xl shadow-[#0b1d4d]/30 transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#8eb1ff]/40 px-6 py-5 pt-16">
          <Image
            src="/INF_INT_ART_PRETA2.png"
            alt="Instituto de Informática"
            width={200}
            height={80}
            className="w-40 sm:w-48 h-auto"
          />
        </div>

        <nav className="flex flex-col gap-1 px-4 pt-4 text-sm font-semibold text-[#0b1d4d]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="break-words rounded-xl px-4 py-3 tracking-wide transition-all duration-150 hover:bg-[#0b1d4d]/8 hover:text-[#0b1d4d] active:scale-[0.98]"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#8eb1ff]/40 px-6 pb-8 pt-6">
          <Image
            src="/logoespaco.png"
            alt="Logo Espaço"
            width={400}
            height={200}
            className="h-24 w-auto rounded-xl object-contain"
          />
        </div>
      </aside>
    </>
  );
}
