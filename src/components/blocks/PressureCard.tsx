"use client";

import { motion, useReducedMotion } from "motion/react";
import { Pressure } from "@/content";
import { Reveal } from "../fx/Reveal";
import { IconGlyph } from "./IconGlyph";

export function PressureCard({ pressure, light: _light = false }: { pressure: Pressure; light?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <Reveal>
      <article className="group relative overflow-hidden rounded-2xl border border-hairline bg-panel p-6">
        {/* Top accent line — slides in on hover (transform only) */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-energy via-energy-bright to-cyan"
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        )}

        {/* Icon with subtle electric-pulse on group-hover */}
        <div className="mb-5 inline-block">
          <motion.div
            className="text-accent-ink"
            animate={reduce ? {} : undefined}
            whileHover={reduce ? {} : { opacity: [1, 0.6, 1] }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <IconGlyph name={pressure.icon} className="h-6 w-6" />
          </motion.div>
        </div>

        <h3 className="text-lg font-semibold leading-snug text-content">{pressure.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-content-muted">
          {pressure.desc}
        </p>
      </article>
    </Reveal>
  );
}
