"use client";

import { motion, useReducedMotion } from "motion/react";
import { Step } from "@/content";
import { cn } from "@/lib/utils";

export function StepCard({
  step,
  index,
  light: _light = false, // kept for API compat
}: {
  step: Step;
  index: number;
  light?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <article className="relative rounded-2xl border border-hairline bg-panel p-6 text-content">
      {/* Connector line — shown between cards (not on last, handled by parent grid gap) */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-full lg:block w-6 border-t border-dashed border-energy/20"
        aria-hidden
      />

      {/* Step number badge */}
      <div className="mb-5 flex items-center gap-3">
        <motion.span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-energy/10 font-mono text-xs font-semibold text-accent-ink"
          whileHover={reduce ? {} : { scale: 1.12, opacity: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        {/* Energy-green accent dot */}
        <span
          className="h-1.5 w-1.5 rounded-full bg-energy/50"
          aria-hidden
        />
      </div>

      <h3 className="text-lg font-semibold leading-snug text-content">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-content-muted">
        {step.desc}
      </p>
    </article>
  );
}
