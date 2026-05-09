import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { VLibrasWidget } from "./components/home/VlibrasWidgget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const minecraft = localFont({
  src: "../public/fonts/Minecraftia-Regular.ttf",
  variable: "--font-minecraft",
});

export const metadata: Metadata = {
  title: "Espaço das Profissões",
  description: "Espaço das Profissões - Instituto de Informática",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${minecraft.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <VLibrasWidget />
      </body>
    </html>
  );
}