"use client";

import { useState, useEffect } from "react";
import { Accessibility, SquareSquare } from "lucide-react";

interface AudioReaderProps {
  targetElementId: string;
  className?: string;
}

export function AudioReaderButton({ targetElementId, className }: AudioReaderProps) {
  const [isReading, setIsReading] = useState(false);

  const getReadableText = (root: HTMLElement) => {
    const selectors = "h1, span, a, p, img[alt], [aria-description], [data-description], [description]";
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(selectors));
    const seen = new Set<string>();
    const chunks: string[] = [];

    for (const node of nodes) {
      if (node.closest('[aria-hidden="true"], .sr-only')) continue;

      if (node.tagName === "H1" && node.querySelector("span, a")) continue;

      const isImage = node instanceof HTMLImageElement;
      const rawText = isImage
        ? node.alt
        : node.getAttribute("aria-description") ??
          node.getAttribute("data-description") ??
          node.getAttribute("description") ??
          node.textContent;

      const text = rawText?.replace(/\s+/g, " ").trim();
      if (!text || seen.has(text)) continue;

      seen.add(text);
      chunks.push(text);
    }

    return chunks.join(". ");
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleReading = () => {
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não suporta a leitura nativa de texto.");
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const element = document.getElementById(targetElementId);
    if (!element) return;

    const textToRead = getReadableText(element);
    if (!textToRead) return;

    const utterance = new SpeechSynthesisUtterance(textToRead);

    utterance.lang = "pt-BR";
    utterance.rate = 1.0;

    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  return (
    <button
      onClick={handleToggleReading}
      aria-label={isReading ? "Parar leitura em áudio" : "Ouvir conteúdo da página"}
      title={isReading ? "Parar leitura" : "Ouvir página"}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-[#0b1d4d] transition-colors hover:bg-[#8eb1ff]/30 active:scale-95 ${className ?? ""}`}
    >
      {isReading ? (
        <SquareSquare size={22} strokeWidth={2.5} className="text-red-600" />
      ) : (
        <Accessibility size={24} strokeWidth={2.5} />
      )}
    </button>
  );
}
