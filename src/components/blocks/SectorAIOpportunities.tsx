"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, STAGGER, VIEWPORT } from "@/lib/motion";
import { GlowCard } from "@/components/fx/GlowCard";

type AIOpportunity = { opportunity: string; dataNote: string; oversightNote: string };

export function SectorAIOpportunities({ items }: { items: AIOpportunity[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, i) => (
        <motion.div
          key={`ai-opp-${i}`}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.base, ease: EASE_OUT, delay: reduce ? 0 : i * STAGGER.card }}
        >
          <GlowCard glowColor="cyan" className="flex h-full flex-col p-6">
            <h3 className="text-base font-semibold text-content">{item.opportunity}</h3>
            <p className="mt-3 text-sm leading-relaxed text-content-muted">{item.dataNote}</p>
            {/* highlighted oversight note */}
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-energy/25 bg-energy/8 px-4 py-3">
              <span className="mt-0.5 flex-shrink-0 text-accent-ink" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1.5L7 7M7 9.5L7 10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <p className="text-xs leading-relaxed text-accent-ink">{item.oversightNote}</p>
            </div>
          </GlowCard>
        </motion.div>
      ))}
    </div>
  );
}
