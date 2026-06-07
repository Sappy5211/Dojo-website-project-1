"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, REVEAL_Y, VIEWPORT } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  y = REVEAL_Y,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.base, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
