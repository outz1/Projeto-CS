export const navItems = [
  { href: "#o-inf", label: "O INF" },
  { href: "#nosso-curso", label: "NOSSO CURSO" },
  { href: "#areas-correlatas", label: "ÁREAS CORRELATAS" },
  { href: "#entidades", label: "ENTIDADES" },
  { href: "#galeria", label: "GALERIA" },
];

export const matrixColumns = Array.from({ length: 22 }, (_, index) => {
  const stream = Array.from({ length: 40 }, (_, row) =>
    (index * 7 + row * 3 + row) % 2 === 0 ? "1" : "0"
  ).join("\n");

  return {
    id: index,
    left: (index / 21) * 100,
    duration: 18 + (index % 5) * 1.8,
    delay: (index % 7) * 1.3,
    opacity: 0.16 + (index % 4) * 0.06,
    stream,
  };
});
