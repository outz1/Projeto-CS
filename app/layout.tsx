import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en" className={`${minecraft.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
