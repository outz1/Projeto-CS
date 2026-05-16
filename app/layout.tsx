import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { defaultMetadata, seoConfig } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "@/features/seo/StructuredData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const minecraft = localFont({
  src: "../public/fonts/Minecraftia-Regular.ttf",
  variable: "--font-minecraft",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: seoConfig.themeColor,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${minecraft.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
