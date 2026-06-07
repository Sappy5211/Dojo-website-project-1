import { ArrowRight, BrainCircuit, Database, Lightbulb, Zap } from "lucide-react";
import { home } from "@/content";
import { CurrentLine } from "../fx/CurrentLine";

const icons = [Zap, Database, BrainCircuit, Lightbulb];

export function HeroCurrentPanel() {
  return (
    <aside className="premium-panel motion-stable relative min-h-[31rem] overflow-hidden rounded-3xl p-5 md:p-6" aria-label={home.hero.diagram.title}>
      <div className="absolute inset-0 grid-current opacity-45" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(22,163,74,0.22),transparent_18rem),linear-gradient(180deg,rgba(10,15,13,0.2),rgba(10,15,13,0.78))]" aria-hidden />
      <CurrentLine
        className="absolute left-1/2 top-20 h-[19rem] w-36 -translate-x-1/2 opacity-80"
        viewBox="0 0 120 320"
        d="M22 22 C96 56 22 105 84 146 C128 176 20 230 92 298"
        nodes={[
          { x: 22, y: 22 },
          { x: 84, y: 146 },
          { x: 92, y: 298 },
        ]}
      />

      <div className="relative z-10 flex h-full flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-energy">{home.hero.diagram.eyebrow}</p>
        <h2 className="mt-4 max-w-sm text-2xl font-semibold leading-tight">{home.hero.diagram.title}</h2>

        <div className="mt-8 grid gap-3">
          {home.hero.diagram.nodes.map((node, index) => {
            const Icon = icons[index] ?? Lightbulb;
            return (
              <div key={`${node}-${index}`} className="group flex min-h-16 items-center gap-3 rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-xl transition-colors duration-200 hover:border-energy/35 hover:bg-white/[0.075]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-energy/10 text-energy">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <span className="text-sm font-medium text-mist/86">{node}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-cyan opacity-70 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            );
          })}
        </div>

        <p className="mt-auto pt-8 text-sm leading-relaxed text-mist/60">{home.hero.diagram.caption}</p>
      </div>
    </aside>
  );
}
