import { Step } from "@/content";
import { cn } from "@/lib/utils";

export function StepCard({ step, index, light = false }: { step: Step; index: number; light?: boolean }) {
  return (
    <article className={cn("relative rounded-2xl border p-6", light ? "border-ink-soft/10 bg-white text-ink-soft" : "glass-surface")}>
      <p className="mb-6 font-mono text-sm text-energy/70">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="text-lg font-semibold">{step.title}</h3>
      <p className={cn("mt-3 text-sm leading-relaxed", light ? "text-ink-soft/70" : "text-mist/68")}>{step.desc}</p>
    </article>
  );
}
