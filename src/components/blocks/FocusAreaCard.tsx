"use client";

import { motion, useReducedMotion } from "motion/react";
import { FocusArea, ui } from "@/content";
import { Reveal } from "../fx/Reveal";
import { IconGlyph } from "./IconGlyph";

export function FocusAreaCard({ area, light: _light = false }: { area: FocusArea; light?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <Reveal>
      <motion.article
        className="group relative min-h-[14rem] rounded-2xl border border-hairline bg-panel p-6"
        whileHover={reduce ? {} : { y: -6, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Subtle radial glow behind icon on hover */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute left-4 top-4 h-20 w-20 rounded-full bg-energy/10 blur-xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            aria-hidden
          />
        )}

        <div className="relative mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-energy/10 text-accent-ink">
          <IconGlyph name={area.icon} className="h-5 w-5" />
        </div>

        <h3 className="text-lg font-semibold leading-snug text-content">{area.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-content-muted">
          {area.desc}
        </p>

        {/* Explore arrow — fades in on hover */}
        {!reduce && (
          <motion.span
            className="pointer-events-none absolute bottom-5 right-5 text-xs font-semibold text-accent-ink"
            initial={{ opacity: 0, x: -4 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            {ui.labels.explore}
          </motion.span>
        )}
      </motion.article>
    </Reveal>
  );
}
