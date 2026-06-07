import { Pressure } from "@/content";
import { cn } from "@/lib/utils";
import { Reveal } from "../fx/Reveal";
import { IconGlyph } from "./IconGlyph";

export function PressureCard({ pressure, light = false }: { pressure: Pressure; light?: boolean }) {
  return (
    <Reveal>
      <article className={cn("rounded-2xl border p-6", light ? "border-ink-soft/10 bg-white text-ink-soft" : "glass-surface")}>
        <div className="mb-5 text-energy">
          <IconGlyph name={pressure.icon} />
        </div>
        <h3 className="text-lg font-semibold">{pressure.title}</h3>
        <p className={cn("mt-3 text-sm leading-relaxed", light ? "text-ink-soft/70" : "text-mist/68")}>{pressure.desc}</p>
      </article>
    </Reveal>
  );
}
