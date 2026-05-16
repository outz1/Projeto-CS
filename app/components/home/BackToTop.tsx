"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  /** Distância (px) de rolagem a partir da qual o botão aparece. */
  threshold?: number;
  /** Classe extra opcional. */
  className?: string;
}

/**
 * Botão flutuante que retorna a página ao topo.
 * - Aparece após o usuário rolar além do `threshold`.
 * - Respeita `prefers-reduced-motion` para o scroll.
 * - Segue o design system (cores accent, sombras e focus-visible globais).
 */
export function BackToTop({ threshold = 320, className = "" }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const handleClick = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={[
        "fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center",
        "rounded-full bg-[#005b9f] text-white",
        "shadow-[0_8px_32px_rgba(11,29,77,0.16)]",
        "transition-all duration-300 ease-out",
        "hover:bg-[#0b1d4d] hover:scale-105",
        "active:scale-95",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#005b9f]",
        "motion-reduce:transition-none motion-reduce:hover:scale-100",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        "sm:bottom-8 sm:right-8",
        className,
      ].join(" ")}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
