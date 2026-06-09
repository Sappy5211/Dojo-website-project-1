"use client";

/**
 * WwdPipeline — signature AI implementation layer widget.
 * A vertical spine where:
 *   - An SVG connector line draws via pathLength 0→1 on scroll into view
 *   - Each layer node fades + scales in sequentially as the section enters view
 *   - Reduced-motion: static fully-drawn state, no animation
 */

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE_IN_OUT, EASE_OUT, DUR } from "@/lib/motion";
import { ui } from "@/content";

// Icon decorators for each layer — index-mapped
const LAYER_ICONS = ["⬡", "⬡", "⬡", "⬡", "⬡", "⬡", "⬡"] as const;

// Accent colours cycling through the brand gradient range
const LAYER_ACCENTS = [
  { ring: "border-energy/40", dot: "#18E27B", label: "text-energy" },
  { ring: "border-energy/30", dot: "#2EE888", label: "text-energy/80" },
  { ring: "border-energy-bright/40", dot: "#5DFFA8", label: "text-energy-bright" },
  { ring: "border-cyan/40", dot: "#1FE3CF", label: "text-cyan" },
  { ring: "border-cyan/30", dot: "#1FE3CF", label: "text-cyan/80" },
  { ring: "border-energy/30", dot: "#18E27B", label: "text-energy/70" },
  { ring: "border-amber/40", dot: "#F2C24E", label: "text-amber" },
] as const;

// SVG geometry: vertical spine height, node y positions
const SVG_W = 2;
const NODE_COUNT = 7;
// We'll place nodes spaced evenly over a 600-unit tall SVG
const SVG_HEIGHT = 560;
const STEP = SVG_HEIGHT / (NODE_COUNT - 1);
const NODE_Y = Array.from({ length: NODE_COUNT }, (_, i) => Math.round(i * STEP));
// Build straight vertical path through all nodes
const PATH_D = `M 8 ${NODE_Y[0]} ${NODE_Y.slice(1).map((y) => `L 8 ${y}`).join(" ")}`;

interface WwdPipelineProps {
  layers: string[];
  intro: string;
  eyebrow: string;
  title: string;
}

export function WwdPipeline({ layers, intro, eyebrow, title }: WwdPipelineProps) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();

  const drawn = reduce ? 1 : inView ? 1 : 0;

  return (
    <div className="container-eneriq py-24 lg:py-32">
      {/* Section header */}
      <div className="mb-16 max-w-2xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-energy">{eyebrow}</p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-mist">{title}</h2>
        <p className="mt-5 text-base leading-relaxed text-mist/70 md:text-[1.0625rem]">{intro}</p>
      </div>

      {/* Pipeline widget */}
      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* Ambient glow behind the widget */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 90% at 8% 50%, rgba(24,226,123,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 92% 50%, rgba(31,227,207,0.12) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative flex gap-0">
          {/* SVG spine column */}
          <div className="relative flex-shrink-0" style={{ width: 32 }}>
            <svg
              viewBox={`0 0 16 ${SVG_HEIGHT}`}
              fill="none"
              className="h-full w-full"
              aria-hidden
              preserveAspectRatio="xMidYMid meet"
              style={{ position: "absolute", top: 0, left: 0, width: 32, height: "100%" }}
            >
              <defs>
                <linearGradient id={`spine-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#18E27B" />
                  <stop offset="45%" stopColor="#5DFFA8" />
                  <stop offset="80%" stopColor="#1FE3CF" />
                  <stop offset="100%" stopColor="#F2C24E" />
                </linearGradient>
              </defs>
              {/* Track (static faint line always visible) */}
              <line
                x1="8"
                y1={NODE_Y[0]}
                x2="8"
                y2={NODE_Y[NODE_Y.length - 1]}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={SVG_W}
                strokeLinecap="round"
              />
              {/* Animated fill line */}
              <motion.path
                d={PATH_D}
                stroke={`url(#spine-grad-${id})`}
                strokeWidth={SVG_W}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: drawn }}
                transition={{ duration: 1.4, ease: EASE_IN_OUT, delay: 0.1 }}
              />
              {/* Node dots */}
              {NODE_Y.map((y, i) => {
                const accent = LAYER_ACCENTS[i % LAYER_ACCENTS.length];
                return (
                  <motion.circle
                    key={`node-dot-${i}`}
                    cx={8}
                    cy={y}
                    r={5}
                    fill="hsl(150 14% 7%)"
                    stroke={accent.dot}
                    strokeWidth={1.5}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView || reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.15 + i * 0.14,
                      duration: DUR.base,
                      ease: EASE_OUT,
                    }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Layer rows */}
          <div className="flex flex-1 flex-col" style={{ gap: 0 }}>
            {layers.map((layer, i) => {
              const accent = LAYER_ACCENTS[i % LAYER_ACCENTS.length];
              const isFirst = i === 0;
              const isLast = i === layers.length - 1;

              return (
                <motion.div
                  key={`layer-${i}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView || reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                  transition={{
                    delay: reduce ? 0 : 0.2 + i * 0.13,
                    duration: DUR.base,
                    ease: EASE_OUT,
                  }}
                  className="group relative flex-1"
                  // Ensure row heights match SVG node spacing
                  style={{ minHeight: i < layers.length - 1 ? `${STEP * (100 / SVG_HEIGHT)}%` : undefined }}
                >
                  {/* Node card */}
                  <div
                    className={[
                      "relative ml-6 my-1.5 rounded-xl border bg-white/[0.03] px-5 py-4 backdrop-blur-sm",
                      "transition-colors duration-200 group-hover:bg-white/[0.07]",
                      accent.ring,
                      isFirst ? "border-l-2" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {/* Step number */}
                    <span className={`font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${accent.label}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Layer name */}
                    <p className="mt-1 font-semibold text-mist leading-snug">{layer}</p>

                    {/* Last node gets an "outcome" badge */}
                    {isLast && (
                      <span className="mt-2 inline-flex rounded-full bg-amber/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber">
                        ◎ {ui.whatWeDoSections.pipelineOutcome}
                      </span>
                    )}

                    {/* First node gets a "start" accent */}
                    {isFirst && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-energy/50">
                        {ui.whatWeDoSections.pipelineStart}
                      </span>
                    )}

                    {/* Subtle right glow on hover */}
                    <span
                      className="pointer-events-none absolute inset-y-0 right-0 w-24 rounded-r-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(ellipse 80% 80% at 100% 50%, ${accent.dot}22, transparent)`,
                      }}
                      aria-hidden
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 rounded-b-3xl"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(6,10,9,0.6))" }}
          aria-hidden
        />
      </div>
    </div>
  );
}
