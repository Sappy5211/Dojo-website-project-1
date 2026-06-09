"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, STAGGER, VIEWPORT } from "@/lib/motion";
import { GlowCard } from "@/components/fx/GlowCard";

type DecisionItem = { title: string; desc: string };

export function SectorDecisionMap({ decisions }: { decisions: DecisionItem[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {decisions.map((decision, i) => (
        <motion.div
          key={`decision-${i}`}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.base, ease: EASE_OUT, delay: reduce ? 0 : i * STAGGER.card }}
        >
          <GlowCard className="h-full p-6">
            {/* index badge */}
            <div
              className="mb-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-energy/30 text-xs font-bold text-accent-ink"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-base font-semibold text-content">{decision.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-content-muted">{decision.desc}</p>
            {/* bottom accent line */}
            <div className="mt-6 h-px w-full bg-gradient-to-r from-energy/30 via-cyan/20 to-transparent" aria-hidden />
          </GlowCard>
        </motion.div>
      ))}
    </div>
  );
}
