"use client";

import { navItems } from "./config";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="flex flex-col bg-[#d2e2ff]">
      {/* Container Principal do Footer */}
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 border-t border-[#8eb1ff]/60 px-4 pb-8 pt-6 text-xs sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12">
        <div className="flex flex-wrap items-center gap-2 text-[#0b1d4d] sm:gap-3">
          <Image
          width = {200}
          height = {200}
          src="/logoespaco.png" 
          alt="Logo" 
          className="h-28 w-36 rounded-lg" />
        </div>
        <nav className="flex flex-wrap items-center gap-3 font-bold tracking-wide sm:gap-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#0b1d4d] transition-colors hover:text-[#16367f]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex w-full justify-center">
        <div className="flex w-fit items-center rounded-t-xl bg-[#005b9f] px-4 py-2 text-sm font-semibold text-white shadow-md underline underline-offset-4 transition-all duration-300 hover:bg-[#005b9f]/90 hover:underline hover:decoration-[#005b9f]/90 hover:scale-110">
          <span>
            {" "}
            <a
              href="https://www.linkedin.com/in/duebrits-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:text-white/70 hover:underline hover:decoration-white/70"
            >
              desenvolvido por outz.dev
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
