import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Substitui a fonte padrão de textos pela JetBrains Mono
        sans: ["var(--font-jetbrains-mono)", "monospace"],
        // Mantém a classe específica para os títulos
        minecraft: ["var(--font-minecraft)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;