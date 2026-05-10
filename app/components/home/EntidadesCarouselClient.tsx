"use client";

import dynamic from "next/dynamic";

const EntidadesCarousel = dynamic(
  () => import("./EntidadesCarousel").then((module) => module.EntidadesCarousel),
  { ssr: false }
);

export function EntidadesCarouselClient() {
  return <EntidadesCarousel />;
}
