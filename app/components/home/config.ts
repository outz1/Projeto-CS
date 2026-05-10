export const navItems = [
  { href: "#o-inf", label: "O INF" },
  { href: "#nosso-curso", label: "NOSSO CURSO" },
  { href: "#areas-correlatas", label: "ÁREAS CORRELATAS" },
  { href: "#entidades", label: "ENTIDADES" },
  { href: "#galeria", label: "GALERIA" },
];

const MATRIX_COLUMN_COUNT = 22;
const MATRIX_STREAM_LENGTH = 40;

function seededBit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value) < 0.5 ? "0" : "1";
}

const buildBinaryStream = (length: number, seedBase: number) =>
  Array.from({ length }, (_, row) => seededBit(seedBase + row)).join("\n");

export const matrixColumns = Array.from({ length: MATRIX_COLUMN_COUNT }, (_, index) => {
  const stream = buildBinaryStream(MATRIX_STREAM_LENGTH, index * 97 + 13);

  return {
    id: index,
    left: (index / (MATRIX_COLUMN_COUNT - 1)) * 100,
    duration: 8 + (index % 5) * 0.9,
    delay: (index % 7) * 0.45,
    opacity: 0.16 + (index % 4) * 0.06,
    stream,
  };
});
