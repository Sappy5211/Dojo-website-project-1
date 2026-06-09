"use client";

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Person } from "@/content";

export function ResponsibilityMap({ people, responsibilities }: { people: Person[]; responsibilities: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
      {/* Desktop: computed-position hub-and-spoke */}
      <div className="hidden lg:block">
        <DesktopMap people={people} responsibilities={responsibilities} />
      </div>

      {/* Mobile: stacked fallback */}
      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {people.map((person) => (
          <div key={person.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-semibold text-mist">{person.name}</p>
            <p className="mt-1 text-sm text-energy">{person.responsibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopMap({ people, responsibilities }: { people: Person[]; responsibilities: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const gradId = useId().replace(/:/g, "");

  const pCount = people.length;
  const rCount = responsibilities.length;

  // Percentage-based vertical positions for each person and responsibility.
  // Cards are absolutely positioned; SVG uses the same math so endpoints always align.
  const personYs = Array.from({ length: pCount }, (_, i) => ((i + 0.5) / pCount) * 100);
  const respYs = Array.from({ length: rCount }, (_, i) => ((i + 0.5) / rCount) * 100);

  // SVG coordinate system: x in [0,100], y in [0,100] (percentages via preserveAspectRatio=none)
  // Left card right-anchor: x=22 (card ends roughly here in percentage)
  // Right card left-anchor: x=78
  // Hub spine x: 50
  const leftAnchorX = 23;
  const rightAnchorX = 77;
  const hubX = 50;

  // Hub node Y is the vertical midpoint of all people
  const hubY = pCount > 0 ? personYs.reduce((a, b) => a + b, 0) / pCount : 50;

  const shouldDraw = reduce || inView;

  return (
    <div ref={ref} className="relative" style={{ minHeight: "32rem" }}>
      {/* SVG connector layer — sits behind the cards */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`rm-grad-${gradId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18E27B" />
            <stop offset="55%" stopColor="#5DFFA8" />
            <stop offset="100%" stopColor="#1FE3CF" />
          </linearGradient>
        </defs>

        {/* People → hub paths */}
        {personYs.map((py, i) => {
          const d = `M${leftAnchorX} ${py} C${(leftAnchorX + hubX) / 2} ${py} ${(leftAnchorX + hubX) / 2} ${hubY} ${hubX} ${hubY}`;
          return (
            <motion.path
              key={`p-${i}`}
              d={d}
              stroke={`url(#rm-grad-${gradId})`}
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={shouldDraw ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : i * 0.1 }}
            />
          );
        })}

        {/* Hub → responsibility paths */}
        {respYs.map((ry, i) => {
          const d = `M${hubX} ${hubY} C${(hubX + rightAnchorX) / 2} ${hubY} ${(hubX + rightAnchorX) / 2} ${ry} ${rightAnchorX} ${ry}`;
          return (
            <motion.path
              key={`r-${i}`}
              d={d}
              stroke={`url(#rm-grad-${gradId})`}
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={shouldDraw ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : pCount * 0.1 + i * 0.08 }}
            />
          );
        })}

        {/* Hub node */}
        <motion.circle
          cx={hubX}
          cy={hubY}
          r={1.4}
          fill="#18E27B"
          initial={{ scale: 0, opacity: 0 }}
          animate={shouldDraw ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : pCount * 0.1 }}
        />
      </svg>

      {/* People cards — left column */}
      <div className="absolute inset-y-0 left-0 w-[22%]">
        {people.map((person, i) => (
          <div
            key={person.slug}
            className="absolute -translate-y-1/2"
            style={{ top: `${personYs[i]}%`, left: 0, right: 0 }}
          >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink px-3 py-2">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-energy to-cyan text-xs font-bold text-ink">
                {person.initials}
              </span>
              <span className="truncate text-xs font-semibold text-mist">{person.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Responsibility cards — right column */}
      <div className="absolute inset-y-0 right-0 w-[22%]">
        {responsibilities.map((item, i) => (
          <div
            key={item}
            className="absolute -translate-y-1/2"
            style={{ top: `${respYs[i]}%`, left: 0, right: 0 }}
          >
            <div className="rounded-xl border border-white/10 bg-ink/80 px-3 py-2.5 text-xs text-mist/75 leading-snug">
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
