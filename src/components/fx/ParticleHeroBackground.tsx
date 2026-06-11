"use client";
/* eslint-disable react-hooks/immutability */

/**
 * Antigravity particle field — brand-recoloured + performance-hardened.
 *
 * Interaction: each particle rests at an origin, springs back to it (RETURN_SPEED),
 * and is pushed away by the cursor (REPULSION) within MOUSE_RADIUS. Velocity decays
 * via DAMPING so the field settles. This is what reads as "antigravity".
 *
 * Why it stays smooth (the donor lagged):
 *  - NO particle↔particle collision pass. The donor ran an O(n²) nested loop
 *    (~40k pair checks/frame) — that was the lag. The feel is identical without it.
 *  - ZERO per-frame React state (the donor called setState every frame → re-render storm).
 *  - DPR capped at 1.5, render throttled to 30fps.
 *  - Paused off-screen (IntersectionObserver) and on tab-hide (visibilitychange).
 *  - prefers-reduced-motion → one static frame, no loop. Mobile → fewer, calmer dots.
 */

import { useCallback, useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseAlpha: number;
};

type Dust = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
};

const PARTICLE_DENSITY = 0.00009; // main interactive dots per px²
const DUST_DENSITY = 0.00004; // ambient drifting dust per px²
const MAX_PARTICLES = 150;
const MAX_DUST = 80;
const MOUSE_RADIUS = 190;
const RETURN_SPEED = 0.045; // spring constant back to origin
const DAMPING = 0.9; // velocity friction
const REPULSION = 1.15; // cursor push strength

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// Mostly soft white with occasional brand green / cyan accents.
const pickColor = () => {
  const r = Math.random();
  if (r > 0.88) return "#1FE3CF"; // cyan
  if (r > 0.66) return "#5DFFA8"; // energy bright
  return "#E9F1EB"; // mist
};

export function ParticleHeroBackground({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const dustRef = useRef<Dust[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(0);
  const runningRef = useRef(true);
  const lastRef = useRef(0);
  const reducedRef = useRef(false);
  const animateRef = useRef<(t: number) => void>(() => {});

  const initParticles = useCallback((w: number, h: number) => {
    const isMobile = w < 768;
    const mainCount = isMobile ? Math.min(40, Math.floor(w * h * PARTICLE_DENSITY * 0.5)) : Math.min(MAX_PARTICLES, Math.floor(w * h * PARTICLE_DENSITY));
    const dustCount = isMobile ? Math.min(35, Math.floor(w * h * DUST_DENSITY * 0.6)) : Math.min(MAX_DUST, Math.floor(w * h * DUST_DENSITY));

    particlesRef.current = Array.from({ length: mainCount }, () => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return {
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(1.1, 2.7),
        color: pickColor(),
        baseAlpha: randomRange(0.32, 0.78),
      };
    });

    dustRef.current = Array.from({ length: dustCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      size: randomRange(0.5, 1.4),
      alpha: randomRange(0.1, 0.34),
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles(rect.width, rect.height);
  }, [initParticles]);

  const drawFrame = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !container || !ctx) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    ctx.clearRect(0, 0, w, h);

    // Soft pulsing brand glow behind the field.
    const cx = w * 0.5;
    const cy = h * 0.42;
    const pulse = Math.sin(time * 0.0007) * 0.03 + 0.1;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.75);
    glow.addColorStop(0, `rgba(24,226,123,${pulse})`);
    glow.addColorStop(0.4, "rgba(31,227,207,0.05)");
    glow.addColorStop(1, "rgba(6,10,9,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Ambient drifting dust.
    const dust = dustRef.current;
    ctx.fillStyle = "#E9F1EB";
    for (const d of dust) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < -4) d.x = w + 4;
      if (d.x > w + 4) d.x = -4;
      if (d.y < -4) d.y = h + 4;
      if (d.y > h + 4) d.y = -4;
      const twinkle = Math.sin(time * 0.0016 + d.phase) * 0.5 + 0.5;
      ctx.globalAlpha = d.alpha * (0.35 + 0.65 * twinkle);
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Main interactive particles: cursor repulsion + spring back to origin.
    const mouse = mouseRef.current;
    const particles = particlesRef.current;
    for (const p of particles) {
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq > 0.01 && distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
          const dist = Math.sqrt(distSq);
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPULSION * 5;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }
      }
      p.vx += (p.originX - p.x) * RETURN_SPEED;
      p.vy += (p.originY - p.y) * RETURN_SPEED;
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx;
      p.y += p.vy;

      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      ctx.globalAlpha = Math.min(p.baseAlpha + velocity * 0.04, 0.95);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  const animate = useCallback((time: number) => {
    rafRef.current = requestAnimationFrame((t) => animateRef.current(t));
    if (!runningRef.current) return;
    const frame = 1000 / 30; // 30fps cap
    const elapsed = time - lastRef.current;
    if (elapsed < frame) return;
    lastRef.current = time - (elapsed % frame);
    drawFrame(time);
  }, [drawFrame]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    animateRef.current = animate;
    resize();

    // Reduced motion: paint a single calm frame and stop.
    if (reducedRef.current) {
      drawFrame(0);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        runningRef.current = entry.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    if (containerRef.current) io.observe(containerRef.current);

    const onVisibility = () => {
      runningRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    rafRef.current = requestAnimationFrame((t) => animateRef.current(t));

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, drawFrame, resize]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden bg-ink ${className}`}
      style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent)", maskImage: "linear-gradient(to bottom, #000 72%, transparent)" }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
      }}
      onPointerLeave={() => {
        mouseRef.current.active = false;
      }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(24,226,123,0.18),transparent_36%),radial-gradient(circle_at_74%_26%,rgba(31,227,207,0.13),transparent_38%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
