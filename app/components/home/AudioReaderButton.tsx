"use client";

import { useState, useEffect } from "react";
import { Accessibility, SquareSquare } from "lucide-react";

interface AudioReaderProps {
  targetElementId: string;
  className?: string;
}

export function AudioReaderButton({ targetElementId, className }: AudioReaderProps) {
  const [isReading, setIsReading] = useState(false);

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

    const textToRead = element.innerText;
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
