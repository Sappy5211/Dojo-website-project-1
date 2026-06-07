import { home } from "@/content";
import { HeroCurrentOrbit } from "./HeroCurrentOrbit";

export function HeroCurrentPanel() {
  return (
    <aside className="premium-panel motion-stable relative min-h-[31rem] overflow-hidden rounded-3xl p-5 md:p-6" aria-label={home.hero.diagram.title}>
      <div className="absolute inset-0 grid-current opacity-45" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(22,163,74,0.22),transparent_18rem),linear-gradient(180deg,rgba(10,15,13,0.2),rgba(10,15,13,0.78))]" aria-hidden />

      <div className="relative z-10 flex h-full flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-energy">{home.hero.diagram.eyebrow}</p>
        <h2 className="mt-4 max-w-sm text-2xl font-semibold leading-tight">{home.hero.diagram.title}</h2>

        <HeroCurrentOrbit />
      </div>
    </aside>
  );
}
