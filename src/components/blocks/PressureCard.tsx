"use client";

import { motion, useReducedMotion } from "motion/react";
import { Pressure } from "@/content";
import { cn } from "@/lib/utils";
import { Reveal } from "../fx/Reveal";
import { IconGlyph } from "./IconGlyph";

export function PressureCard({ pressure, light = false }: { pressure: Pressure; light?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <Reveal>
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl border p-6",
          light
            ? "border-ink-soft/10 bg-white text-ink-soft"
            : "glass-surface"
        )}
      >
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
            className={cn("text-energy")}
            animate={reduce ? {} : undefined}
            whileHover={reduce ? {} : { opacity: [1, 0.6, 1] }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <IconGlyph name={pressure.icon} className="h-6 w-6" />
          </motion.div>
        </div>

        <h3 className="text-lg font-semibold leading-snug">{pressure.title}</h3>
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed",
            light ? "text-ink-soft/70" : "text-mist/68"
          )}
        >
          {pressure.desc}
        </p>
      </article>
    </Reveal>
  );
}
