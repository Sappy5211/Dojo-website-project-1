"use client";
/* eslint-disable react-hooks/immutability */

import { useCallback, useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  originX: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  phase: number;
  lift: number;
  drift: number;
};

type DustParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
};

type MouseState = {
  x: number;
  y: number;
  active: boolean;
};

const MAIN_DENSITY = 0.000085;
const DUST_DENSITY = 0.000045;
const MAX_MAIN = 170;
const MAX_DUST = 90;
const MOUSE_RADIUS = 210;
const HORIZONTAL_TETHER = 0.0018;
const DAMPING = 0.94;
const REPULSION = 1.22;
const RISE_BOOST = 0.012;

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export function ParticleHeroBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const dustRef = useRef<DustParticle[]>([]);
  const mouseRef = useRef<MouseState>({ x: -1000, y: -1000, active: false });
  const rafRef = useRef(0);
  const animateRef = useRef<(time: number) => void>(() => {});
  const runningRef = useRef(false);
  const lastRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const mainCount = isMobile ? 0 : Math.min(MAX_MAIN, Math.floor(width * height * MAIN_DENSITY));
    const dustCount = Math.min(isMobile ? 45 : MAX_DUST, Math.floor(width * height * DUST_DENSITY));

    particlesRef.current = Array.from({ length: mainCount }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const brandColor = Math.random();
      const size = randomRange(1.15, 2.9);
      return {
        x,
        y,
        originX: x,
        vx: randomRange(-0.24, 0.24),
        vy: randomRange(-0.55, -0.12),
        size,
        color: brandColor > 0.86 ? "#38BDF8" : brandColor > 0.62 ? "#10B981" : "#F5F7F5",
        alpha: randomRange(0.38, 0.82),
        phase: Math.random() * Math.PI * 2,
        lift: randomRange(0.009, 0.026) * (size > 2.2 ? 1.2 : 1),
        drift: randomRange(0.006, 0.02),
      };
    });

    dustRef.current = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: randomRange(-0.3, -0.08),
      size: randomRange(0.55, 1.45),
      alpha: randomRange(0.12, 0.38),
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

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !container || !ctx) return;

    rafRef.current = requestAnimationFrame((nextTime) => animateRef.current(nextTime));
    if (!runningRef.current) return;

    const frame = 1000 / 30;
    const elapsed = time - lastRef.current;
    if (elapsed < frame) return;
    lastRef.current = time - (elapsed % frame);

    const width = container.clientWidth;
    const height = container.clientHeight;
    ctx.clearRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(width * 0.5, height * 0.4, 0, width * 0.5, height * 0.4, Math.max(width, height) * 0.78);
    glow.addColorStop(0, `rgba(16, 185, 129, ${Math.sin(time * 0.0008) * 0.025 + 0.11})`);
    glow.addColorStop(0.42, "rgba(56, 189, 248, 0.06)");
    glow.addColorStop(1, "rgba(10, 15, 13, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    const dust = dustRef.current;
    for (const p of dust) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx += Math.sin(time * 0.00035 + p.phase) * 0.002;
      p.vy -= 0.0016;
      if (p.x < -4) p.x = width + 4;
      if (p.x > width + 4) p.x = -4;
      if (p.y < -4) {
        p.y = height + 4;
        p.x = Math.random() * width;
        p.vy = randomRange(-0.3, -0.08);
      }
      if (p.y > height + 4) p.y = -4;

      const twinkle = Math.sin(time * 0.0018 + p.phase) * 0.5 + 0.5;
      ctx.globalAlpha = p.alpha * (0.35 + 0.65 * twinkle);
      ctx.fillStyle = "#F5F7F5";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const mouse = mouseRef.current;
    for (const p of particlesRef.current) {
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq > 0.01 && distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
          const distance = Math.sqrt(distSq);
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          const push = force * REPULSION * 5;
          p.vx -= (dx / distance) * push;
          p.vy -= (dy / distance) * push;
        }
      }

      const wave = Math.sin(time * 0.00055 + p.phase) * p.drift;
      p.vx += (p.originX - p.x) * HORIZONTAL_TETHER + wave;
      p.vy -= p.lift + RISE_BOOST;
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -18) {
        p.y = height + 18;
        p.x = Math.random() * width;
        p.originX = p.x;
        p.vx = randomRange(-0.22, 0.22);
        p.vy = randomRange(-0.52, -0.18);
      }
      if (p.x < -18) {
        p.x = width + 18;
        p.originX = p.x;
      }
      if (p.x > width + 18) {
        p.x = -18;
        p.originX = p.x;
      }

      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(p.alpha + velocity * 0.045, 0.95);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animateRef.current = animate;
    resize();
    const observer = new IntersectionObserver(([entry]) => {
      runningRef.current = entry.isIntersecting;
    }, { rootMargin: "120px" });
    if (containerRef.current) observer.observe(containerRef.current);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, resize]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden bg-ink ${className}`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
      }}
      onMouseLeave={() => {
        mouseRef.current.active = false;
      }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(22,163,74,0.2),transparent_34%),radial-gradient(circle_at_72%_24%,rgba(56,189,248,0.15),transparent_36%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
