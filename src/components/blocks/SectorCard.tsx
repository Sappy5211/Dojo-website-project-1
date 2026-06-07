import Link from "next/link";
import { Sector, ui } from "@/content";
import { cn } from "@/lib/utils";
import { Reveal } from "../fx/Reveal";

export function SectorCard({ sector, light = false }: { sector: Sector; light?: boolean }) {
  return (
    <Reveal>
      <Link
        href={`/sectors/${sector.slug}`}
        className={cn(
          "motion-stable group block min-h-[13rem] rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-1",
          light ? "light-panel text-ink-soft" : "premium-panel"
        )}
      >
        <span className="mb-7 block h-1.5 w-16 rounded-full" style={{ backgroundColor: sector.accent }} />
        <h3 className="text-lg font-semibold">{sector.name}</h3>
        <p className={cn("mt-3 text-sm leading-relaxed", light ? "text-ink-soft/70" : "text-mist/68")}>{sector.hero.statement}</p>
        <span className="mt-6 inline-flex text-sm font-semibold text-energy transition-transform group-hover:translate-x-1">{ui.labels.explore}</span>
      </Link>
    </Reveal>
  );
}
