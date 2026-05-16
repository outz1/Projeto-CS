import Image from "next/image";

type AnimatedNeonImageProps = {
  src: string;
  alt: string;
};

// Componente isolado para o efeito de borda Neon Animada
export function AnimatedNeonImage({ src, alt }: AnimatedNeonImageProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl p-[3px] shadow-2xl shadow-[#005b9f]/10 transition-all duration-700 hover:-translate-y-2 hover:shadow-[#005b9f]/30">
      {/* Luz neon giratória primária (linha visível) */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_75%,#005b9f_100%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Luz neon secundária com blur (para o efeito de "brilho" / glow externo) */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_75%,#005b9f_100%)] blur-xl opacity-40 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Container da imagem que cobre o meio e deixa a "borda" vazar */}
      <div className="relative h-full w-full overflow-hidden rounded-[21px] bg-white">
        <Image
          src={src}
          width={1200}
          height={800}
          alt={alt}
          className="h-[38vh] min-h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-[56vh]"
          quality={95}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
