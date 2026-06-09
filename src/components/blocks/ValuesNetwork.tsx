"use client";

import { useRef } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Value, ui } from "@/content";
import { IconGlyph } from "./IconGlyph";

// Anchor points are card CENTRES (cards use x/y: -50%), so keep them in a
// safe band — a 17rem card needs ~14% half-width / ~13% half-height of the
// box to stay inside without clipping at the edges.
const positions = [
  { x: 20, y: 20 },
  { x: 44, y: 16 },
  { x: 72, y: 28 },
  { x: 58, y: 54 },
  { x: 30, y: 62 },
  { x: 76, y: 78 },
];

export function ValuesNetwork({ values }: { values: Value[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });

  return (
    <section ref={ref} className="relative bg-ink py-24 text-mist lg:min-h-[160vh]">
      <div className="container-eneriq lg:sticky lg:top-28">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-energy">{ui.values.eyebrow}</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight">{ui.values.title}</h2>
        </div>
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-2 lg:hidden">
          {values.map((value) => (
            <article key={value.id} className="rounded-2xl border border-white/10 bg-ink/80 p-5">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-energy/10 text-energy">
                <IconGlyph name={value.icon} />
              </div>
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/65">{value.line}</p>
            </article>
          ))}
        </div>
        <div className="relative hidden min-h-[42rem] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 lg:block">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="values-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#18E27B" />
                <stop offset="50%" stopColor="#5DFFA8" />
                <stop offset="100%" stopColor="#1FE3CF" />
              </linearGradient>
            </defs>
            {positions.slice(1).map((point, index) => {
              const prev = positions[index];
              return (
                <ValuePath
                  key={`${point.x}-${point.y}`}
                  d={`M ${prev.x} ${prev.y} C ${(prev.x + point.x) / 2} ${prev.y - 10}, ${(prev.x + point.x) / 2} ${point.y + 10}, ${point.x} ${point.y}`}
                  index={index}
                  progress={scrollYProgress}
                  reduce={Boolean(reduce)}
                />
              );
            })}
          </svg>
          {values.map((value, index) => {
            const point = positions[index];
            return (
              <ValueCard
                key={value.id}
                value={value}
                index={index}
                point={point}
                progress={scrollYProgress}
                reduce={Boolean(reduce)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ValuePath({
  d,
  index,
  progress,
  reduce,
}: {
  d: string;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const pathLength = useTransform(progress, [index / 6, (index + 1) / 6], [0, 1]);
  return (
    <motion.path
      d={d}
      stroke="url(#values-grad)"
      strokeWidth="0.35"
      strokeLinecap="round"
      fill="none"
      style={{ pathLength: reduce ? 1 : pathLength }}
    />
  );
}

function ValueCard({
  value,
  index,
  point,
  progress,
  reduce,
}: {
  value: Value;
  index: number;
  point: { x: number; y: number };
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [index / 6, index / 6 + 0.04], [0.55, 1]);
  const scale = useTransform(progress, [index / 6, index / 6 + 0.06], [0.92, 1]);

  return (
    <motion.article
      className="absolute w-[min(17rem,78vw)] rounded-2xl border border-white/10 bg-ink/80 p-5 backdrop-blur-xl"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        x: "-50%",
        y: "-50%",
        opacity: reduce ? 1 : opacity,
        scale: reduce ? 1 : scale,
      }}
    >
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-energy/10 text-energy">
        <IconGlyph name={value.icon} />
      </div>
      <h3 className="text-lg font-semibold">{value.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist/65">{value.line}</p>
    </motion.article>
  );
}
