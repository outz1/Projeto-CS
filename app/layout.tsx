import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { defaultMetadata } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const minecraft = localFont({
  src: "../public/fonts/Minecraftia-Regular.ttf",
  variable: "--font-minecraft",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${minecraft.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
