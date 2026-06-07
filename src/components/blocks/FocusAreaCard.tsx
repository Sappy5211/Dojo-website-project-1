import { FocusArea } from "@/content";
import { cn } from "@/lib/utils";
import { Reveal } from "../fx/Reveal";
import { IconGlyph } from "./IconGlyph";

export function FocusAreaCard({ area, light = false }: { area: FocusArea; light?: boolean }) {
  return (
    <Reveal>
      <article className={cn("min-h-[14rem] rounded-2xl border p-6 transition-transform hover:-translate-y-1", light ? "border-ink-soft/10 bg-white text-ink-soft" : "glass-surface")}>
        <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-energy/10 text-energy">
          <IconGlyph name={area.icon} />
        </div>
        <h3 className="text-lg font-semibold">{area.title}</h3>
        <p className={cn("mt-3 text-sm leading-relaxed", light ? "text-ink-soft/70" : "text-mist/68")}>{area.desc}</p>
      </article>
    </Reveal>
  );
}
