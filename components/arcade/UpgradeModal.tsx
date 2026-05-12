"use client";

import { ARCADE_UPGRADES } from "@/lib/arcadeBalance";
import type { ArcadeUpgradeId } from "@/lib/arcadeTypes";

interface Props {
  options: ArcadeUpgradeId[];
  onSelect: (id: ArcadeUpgradeId) => void;
}

export default function UpgradeModal({ options, onSelect }: Props) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-fuchsia-400/40 bg-[#140b29] p-5 shadow-[0_0_24px_rgba(192,132,252,0.35)]">
        <h3 className="text-center font-mono text-lg font-bold tracking-widest text-fuchsia-300">
          LEVEL UP · ESCOLHA 1 UPGRADE
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {options.map((id) => {
            const upgrade = ARCADE_UPGRADES[id];
            return (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className="rounded-xl border border-violet-300/30 bg-violet-950/40 p-4 text-left transition hover:border-fuchsia-300/70 hover:bg-violet-900/50"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-fuchsia-300">{upgrade.category}</p>
                <p className="mt-2 font-bold text-violet-100">{upgrade.title}</p>
                <p className="mt-1 text-xs text-violet-200/80">{upgrade.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
