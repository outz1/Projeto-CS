import { ArrowRight, Gamepad2 } from "lucide-react";
import { arcadeControlTips } from "../content";

type ArcadeLaunchPanelProps = {
  nameInput: string;
  safeId: string;
  previewName: string;
  canStart: boolean;
  maxNameLength: number;
  onNameChange: (value: string) => void;
  onStart: () => void;
};

export function ArcadeLaunchPanel({ nameInput, safeId, previewName, canStart, maxNameLength, onNameChange, onStart }: ArcadeLaunchPanelProps) {
  return (
    <aside id="entrar" className="rounded-[2.2rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6">
      <div className="rounded-[1.8rem] border border-cyan-200/15 bg-[#071333]/78 p-5 shadow-inner shadow-cyan-950/20 sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">Central de lançamento</p>
            <h2 className="arcade-readable-title mt-2 text-3xl font-extrabold leading-tight tracking-[-0.015em] text-white">Entrar no Arcade</h2>
          </div>
          <div className="rounded-3xl border border-fuchsia-200/20 bg-fuchsia-200/10 p-4 text-fuchsia-100 shadow-lg shadow-fuchsia-950/20">
            <Gamepad2 size={30} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/68">Nome do piloto</label>
            <input
              type="text"
              maxLength={maxNameLength}
              value={nameInput}
              onChange={(event) => onNameChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-cyan-200/18 bg-white/[0.07] px-4 py-3 text-base font-bold text-white outline-none transition placeholder:text-blue-100/35 focus:border-cyan-200/55 focus:bg-white/[0.10] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.10)]"
              placeholder="Digite seu nome"
            />
            <p className="mt-2 text-xs leading-relaxed text-blue-100/50">
              No ranking você aparecerá como <span className="font-black text-cyan-200">{previewName}</span>.
            </p>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/68">Identificador seguro</label>
            <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-cyan-200/18 bg-white/[0.07] px-4 py-3">
              <span className="font-mono text-sm font-bold tracking-widest text-cyan-200">{safeId || "gerando..."}</span>
              <span className="rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-200">auto</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onStart}
            disabled={!canStart}
            className={`group inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition active:scale-95 ${
              canStart
                ? "bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 text-[#071333] shadow-cyan-950/35 hover:-translate-y-0.5"
                : "cursor-not-allowed bg-white/10 text-blue-100/35 shadow-black/10"
            }`}
          >
            Iniciar missão <ArrowRight className="transition group-hover:translate-x-1" size={18} />
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {arcadeControlTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div key={tip.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <Icon className="mb-3 text-cyan-200" size={18} />
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-100/45">{tip.label}</p>
                <p className="mt-1 text-xs font-bold text-white">{tip.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
