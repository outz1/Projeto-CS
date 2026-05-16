"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
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
          className={`mx-auto flex w-full max-w-[1500px] items-center justify-between gap-3 transition-all duration-300 ${
            isScrolled ? "h-14 px-4 sm:h-16 sm:px-6" : "h-20 pt-1.5 px-4 sm:h-24 sm:px-8 lg:px-12"
          }`}
        >
          <div className="flex shrink-0 items-center">
            <Image
              src="/INF-02.png"
              alt="Instituto de Informática"
              width={300}
              height={120}
              className={`h-auto brightness-0 invert transition-all duration-300 ${
                isScrolled ? "w-40 sm:w-44" : "w-36 sm:w-42"
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
            className={`rounded-xl border shadow-lg transition-all duration-300 ${
              isMenuOpen
                ? "border-white/20 bg-white/10 text-white shadow-black/25 backdrop-blur-md hover:bg-white/15"
                : "border-[#8eb1ff]/60 bg-[#d8e6ff] text-[#0b1d4d] shadow-[#0b1d4d]/20 hover:bg-[#f1f6ff]"
            }`}
          />
        )}
        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-side-menu"
          className={`inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-2xl border shadow-xl transition-all duration-300 active:scale-95 ${
            isMenuOpen
              ? "rotate-90 border-white/20 bg-white/10 text-white shadow-black/25 backdrop-blur-md"
              : "border-[#8eb1ff]/60 bg-[#d8e6ff] text-[#0b1d4d] shadow-[#0b1d4d]/20 hover:bg-[#f1f6ff]"
          }`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label="Fechar menu"
        className={`fixed inset-0 z-[80] bg-[#071333]/65 backdrop-blur-[2px] transition-all duration-300 md:hidden ${
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
        className={`fixed right-0 top-0 z-[85] flex h-[100dvh] w-[min(90vw,25rem)] flex-col overflow-hidden border-l border-white/15 bg-[#071333] text-white shadow-[-24px_0_70px_rgba(0,0,0,0.38)] transition-all duration-500 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-80"
        }`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#60a5fa]/25 blur-3xl" />
          <div className="absolute bottom-20 left-[-5rem] h-48 w-48 rounded-full bg-[#005b9f]/25 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_28%,rgba(96,165,250,0.08)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:22px_22px] opacity-20" />
        </div>

        <div className="relative h-20 shrink-0 border-b border-white/10 px-5 pr-28">
          <Image
            src="/INF-02.png"
            alt="Instituto de Informática"
            width={300}
            height={120}
            className="absolute left-5 top-5 h-auto w-36 -translate-y-8 brightness-0 invert"
            priority
          />
        </div>

        <nav className="relative flex-1 overflow-y-auto px-4 py-5 text-sm font-semibold text-slate-100">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative isolate flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3.5 tracking-[0.12em] shadow-lg shadow-black/10 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[#60a5fa]/50 hover:bg-white/[0.12] focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071333] active:scale-[0.98]"
                onClick={() => setIsMenuOpen(false)}
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#60a5fa] to-[#005b9f] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="break-words pr-4">{item.label}</span>
                <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-[#bfdbfe] transition-all duration-200 group-hover:translate-x-1 group-hover:border-[#60a5fa]/50 group-hover:text-white">
                  <ChevronRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </nav>

        <div className="relative mt-auto border-t border-white/10 px-5 pb-7 pt-5">
          <div className="rounded-3xl border border-white/15 bg-white/[0.08] p-2 shadow-2xl shadow-black/20 backdrop-blur-md">
            <Image
              src="/logoespaco.png"
              alt="Logo Espaço"
              width={400}
              height={200}
              className="h-auto w-full rounded-2xl object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
