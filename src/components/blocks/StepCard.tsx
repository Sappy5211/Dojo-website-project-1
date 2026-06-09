"use client";

import { motion, useReducedMotion } from "motion/react";
import { Step } from "@/content";
import { cn } from "@/lib/utils";

export function StepCard({
  step,
  index,
  light = false,
}: {
  step: Step;
  index: number;
  light?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <article
      className={cn(
        "relative rounded-2xl border p-6",
        light ? "border-ink-soft/10 bg-white text-ink-soft" : "glass-surface"
      )}
    >
      {/* Connector line — shown between cards (not on last, handled by parent grid gap) */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-full lg:block",
          "w-6 border-t border-dashed",
          light ? "border-ink-soft/20" : "border-energy/20"
        )}
        aria-hidden
      />

      {/* Step number badge */}
      <div className="mb-5 flex items-center gap-3">
        <motion.span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold",
            light
              ? "bg-energy/10 text-energy"
              : "bg-energy/15 text-energy"
          )}
          whileHover={reduce ? {} : { scale: 1.12, opacity: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        {/* Energy-green accent dot */}
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            light ? "bg-energy/40" : "bg-energy/50"
          )}
          aria-hidden
        />
      </div>

      <h3 className="text-lg font-semibold leading-snug">{step.title}</h3>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed",
          light ? "text-ink-soft/70" : "text-mist/68"
        )}
      >
        {step.desc}
      </p>
    </article>
  );
}
