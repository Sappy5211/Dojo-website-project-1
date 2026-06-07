"use client";

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { DUR, EASE_IN_OUT } from "@/lib/motion";

export function CurrentLine({
  d,
  nodes = [],
  stroke,
  width = 2,
  className = "",
  viewBox = "0 0 100 600",
}: {
  d: string;
  nodes?: { x: number; y: number }[];
  stroke?: string;
  width?: number;
  className?: string;
  viewBox?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const gradient = stroke ?? `url(#current-${id})`;
  const draw = reduce ? 1 : inView ? 1 : 0;

  return (
    <svg ref={ref} viewBox={viewBox} fill="none" className={className} aria-hidden preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`current-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16A34A" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        stroke={gradient}
        strokeWidth={width}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw }}
        transition={{ duration: DUR.draw, ease: EASE_IN_OUT }}
      />
      {nodes.map((node, index) => (
        <motion.circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r={4}
          fill="#10B981"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView || reduce ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: reduce ? 0 : 0.15 * index, duration: DUR.base, ease: EASE_IN_OUT }}
        />
      ))}
    </svg>
  );
}
