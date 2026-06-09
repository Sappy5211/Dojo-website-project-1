"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { AuroraShaderBackground } from "../fx/AuroraShaderBackground";
import { CurrentLine } from "../fx/CurrentLine";

export function CTABand({
  heading,
  line,
  cta,
  aurora = false,
}: {
  heading: string;
  line: string;
  cta: { label: string; href: string };
  aurora?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-mist lg:py-32">
      {aurora ? <AuroraShaderBackground opacity={0.35} /> : null}

      {/* Gradient scrim */}
      <div className="absolute inset-0 dark-scrim" aria-hidden />

      {/* Decorative current line */}
      <CurrentLine
        className="pointer-events-none absolute left-1/2 top-8 h-28 w-40 -translate-x-1/2 opacity-70"
        viewBox="0 0 120 120"
        d="M10 10 C55 40 65 78 110 108"
        nodes={[{ x: 110, y: 108 }]}
      />

      {/* Radial energy bloom behind copy */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-energy/5 blur-3xl"
        aria-hidden
      />

      <div className="container-eneriq relative z-10 text-center">
        <motion.h2
          className="mx-auto max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight"
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {heading}
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-mist/70"
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {line}
        </motion.p>

        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 14 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mt-9 inline-block"
        >
          <Link
            href={cta.href}
            className="cta-lift inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-energy via-energy-bright to-cyan px-8 py-3.5 font-semibold text-ink shadow-[0_1rem_2.5rem_rgba(24,226,123,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {cta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
