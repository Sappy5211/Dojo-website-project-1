"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, STAGGER, VIEWPORT } from "@/lib/motion";
import { ui } from "@/content";

type HelpRow = { challenge: string; capability: string; outcome: string };

const COLUMN_LABELS = ui.sectorDetailSections.helpCols;
const COLUMN_COLORS = ["text-amber", "text-energy", "text-cyan"] as const;
const COLUMN_BORDERS = ["border-amber/30", "border-energy/30", "border-cyan/30"] as const;
const COLUMN_BG = ["bg-amber/5", "bg-energy/5", "bg-cyan/5"] as const;

export function SectorHowWeHelp({ rows, accent }: { rows: HelpRow[]; accent: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-6">
      {rows.map((row, i) => (
        <motion.div
          key={`help-${i}`}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.base, ease: EASE_OUT, delay: reduce ? 0 : i * STAGGER.step }}
          className="relative"
        >
          {/* connecting arrow between items */}
          {i < rows.length - 1 && (
            <div
              className="pointer-events-none absolute -bottom-3 left-6 h-6 w-px bg-gradient-to-b from-white/10 to-transparent"
              aria-hidden
            />
          )}
          <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-white/10 md:grid-cols-3">
            {/* Challenge */}
            <div className={`p-5 ${COLUMN_BG[0]} border-b border-white/10 md:border-b-0 md:border-r`}>
              <p
                className={`mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${COLUMN_COLORS[0]}`}
              >
                {COLUMN_LABELS[0]}
              </p>
              <p className="text-sm leading-relaxed text-mist/80">{row.challenge}</p>
            </div>
            {/* Capability */}
            <div className={`p-5 ${COLUMN_BG[1]} border-b border-white/10 md:border-b-0 md:border-r`}>
              <p
                className={`mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${COLUMN_COLORS[1]}`}
              >
                {COLUMN_LABELS[1]}
              </p>
              <p className="text-sm leading-relaxed text-mist/80">{row.capability}</p>
            </div>
            {/* Outcome */}
            <div className={`p-5 ${COLUMN_BG[2]}`}>
              <p
                className={`mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${COLUMN_COLORS[2]}`}
              >
                {COLUMN_LABELS[2]}
              </p>
              <p className="text-sm leading-relaxed text-mist/80">{row.outcome}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
