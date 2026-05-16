"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const images = [
  { src: "p1.jpg", aspect: "aspect-[4/3]" },
  { src: "p2.jpg", aspect: "aspect-[3/4]" },
  { src: "p3.jpg", aspect: "aspect-[4/3]" },
  { src: "p4.jpg", aspect: "aspect-[16/9]" },
  { src: "p5.jpg", aspect: "aspect-square" },
  { src: "p6.jpg", aspect: "aspect-[4/3]" },
  { src: "p7.jpg", aspect: "aspect-[3/4]" },
  { src: "p8.jpg", aspect: "aspect-[16/9]" },
];

/* ── Lightbox ──────────────────────────────────────────────────────── */
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#040d1e]/92 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizar imagem"
    >
      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="relative max-h-[88svh] max-w-[88vw] overflow-hidden rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={`/galery/${images[index].src}`}
            alt={`Galeria ${index + 1}`}
            width={1400}
            height={900}
            className="max-h-[88svh] w-auto max-w-[88vw] object-contain"
            quality={92}
            priority
          />

          {/* Counter pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-1.5 text-xs font-bold text-white/75 backdrop-blur-sm">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/22 hover:text-white"
        aria-label="Fechar"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        disabled={index === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/22 hover:text-white disabled:pointer-events-none disabled:opacity-0"
        aria-label="Anterior"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        disabled={index === images.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/22 hover:text-white disabled:pointer-events-none disabled:opacity-0"
        aria-label="Próxima"
      >
        <ChevronRight size={22} />
      </button>
    </motion.div>
  );
}

/* ── Gallery grid ──────────────────────────────────────────────────── */
export function GaleriaClient() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null && i < images.length - 1 ? i + 1 : i
    );
  }, []);

  return (
    <>
      {/* Masonry via CSS columns */}
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 lg:gap-5">
        {images.map((img, index) => (
          <motion.div
            key={img.src}
            className="group mb-3 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl sm:mb-4 lg:mb-5"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.06, duration: 0.42, ease: "easeOut" }}
            onClick={() => setLightboxIndex(index)}
          >
            <div className={`relative ${img.aspect} bg-[#0b2a67]`}>
              <Image
                src={`/galery/${img.src}`}
                alt={`Galeria ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                quality={85}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040d1e]/65 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Expand icon */}
              <div className="absolute right-2.5 top-2.5 flex h-8 w-8 scale-75 items-center justify-center rounded-full bg-white/15 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <Maximize2 size={13} className="text-white" />
              </div>

              {/* Bottom number */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-px flex-1 bg-white/40" />
                <span className="ml-2.5 text-[10px] font-bold text-white/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
