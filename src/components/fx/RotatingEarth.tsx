"use client";

/**
 * Dotted rotating globe (orthographic halftone). Adapted from the d3 donor and hardened:
 *  - Map data loaded LOCALLY from /public/geo (no runtime githubusercontent hotlink).
 *  - Container-responsive (ResizeObserver) instead of window-sized.
 *  - 30fps cap, paused off-screen (IntersectionObserver) and on tab-hide (visibilitychange).
 *  - prefers-reduced-motion → renders one static frame, no auto-rotation.
 *  - DPR capped at 1.5, dot density reduced. Drag to rotate (wheel-zoom removed so it
 *    never hijacks page scroll). Recoloured to the dark brand palette.
 */

import { useEffect, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoBounds, geoGraticule } from "d3-geo";
import { timer } from "d3-timer";
import type { Feature, FeatureCollection } from "geojson";

type Dot = { lng: number; lat: number };

const OCEAN = "#060A09";
const RIM = "rgba(31,227,207,0.55)"; // cyan rim
const GRATICULE = "rgba(233,241,235,0.14)";
const LAND_OUTLINE = "rgba(233,241,235,0.28)";
const DOT = "rgba(24,226,123,0.85)"; // energy green

function pointInPolygon(point: [number, number], polygon: number[][]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function pointInFeature(point: [number, number], feature: Feature): boolean {
  const g = feature.geometry;
  if (g.type === "Polygon") {
    const c = g.coordinates as number[][][];
    if (!pointInPolygon(point, c[0])) return false;
    for (let i = 1; i < c.length; i++) if (pointInPolygon(point, c[i])) return false;
    return true;
  }
  if (g.type === "MultiPolygon") {
    const mc = g.coordinates as number[][][][];
    for (const poly of mc) {
      if (pointInPolygon(point, poly[0])) {
        let inHole = false;
        for (let i = 1; i < poly.length; i++) if (pointInPolygon(point, poly[i])) { inHole = true; break; }
        if (!inHole) return true;
      }
    }
  }
  return false;
}

export function RotatingEarth({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let size = 0;
    let radius = 0;
    const projection = geoOrthographic().clipAngle(90);
    const path = geoPath().projection(projection).context(context);
    const graticule = geoGraticule();

    let land: FeatureCollection | null = null;
    const dots: Dot[] = [];
    const rotation: [number, number] = [0, 0];

    const layout = () => {
      size = wrap.clientWidth;
      radius = size / 2.2;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      projection.scale(radius).translate([size / 2, size / 2]);
    };

    const render = () => {
      if (!size) return;
      context.clearRect(0, 0, size, size);

      // Ocean disc + cyan rim
      context.beginPath();
      context.arc(size / 2, size / 2, projection.scale(), 0, 2 * Math.PI);
      context.fillStyle = OCEAN;
      context.fill();
      context.strokeStyle = RIM;
      context.lineWidth = 1.5;
      context.stroke();

      if (!land) return;

      context.beginPath();
      path(graticule());
      context.strokeStyle = GRATICULE;
      context.lineWidth = 0.6;
      context.stroke();

      context.beginPath();
      for (const f of land.features) path(f);
      context.strokeStyle = LAND_OUTLINE;
      context.lineWidth = 0.8;
      context.stroke();

      context.fillStyle = DOT;
      for (const d of dots) {
        const p = projection([d.lng, d.lat]);
        if (p && p[0] >= 0 && p[0] <= size && p[1] >= 0 && p[1] <= size) {
          // geoOrthographic returns null for the far hemisphere, so visible dots only.
          context.beginPath();
          context.arc(p[0], p[1], 1.2, 0, 2 * Math.PI);
          context.fill();
        }
      }
    };

    const buildDots = () => {
      if (!land) return;
      const step = 2; // degrees — coarser than donor for fewer dots / smoother frames
      for (const f of land.features) {
        const [[minLng, minLat], [maxLng, maxLat]] = geoBounds(f);
        for (let lng = minLng; lng <= maxLng; lng += step) {
          for (let lat = minLat; lat <= maxLat; lat += step) {
            if (pointInFeature([lng, lat], f)) dots.push({ lng, lat });
          }
        }
      }
    };

    // Interaction: drag to rotate (pauses auto-rotation).
    let dragging = false;
    let autoRotate = !reduced;
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      autoRotate = false;
      const startX = e.clientX;
      const startY = e.clientY;
      const start: [number, number] = [rotation[0], rotation[1]];
      const onMove = (m: PointerEvent) => {
        rotation[0] = start[0] + (m.clientX - startX) * 0.4;
        rotation[1] = Math.max(-90, Math.min(90, start[1] - (m.clientY - startY) * 0.4));
        projection.rotate(rotation);
        render();
      };
      const onUp = () => {
        dragging = false;
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        setTimeout(() => { if (!reduced) autoRotate = true; }, 200);
      };
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    };
    canvas.addEventListener("pointerdown", onPointerDown);

    // Pause off-screen / on tab-hide.
    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }, { rootMargin: "120px" });
    io.observe(wrap);
    const onVisibility = () => { /* read in loop */ };
    document.addEventListener("visibilitychange", onVisibility);

    // 30fps-capped auto-rotation.
    let last = 0;
    const frame = 1000 / 30;
    const t = reduced
      ? null
      : timer((elapsed) => {
          if (!onScreen || document.hidden || dragging || !autoRotate) return;
          if (elapsed - last < frame) return;
          last = elapsed;
          rotation[0] += 0.32;
          projection.rotate(rotation);
          render();
        });

    const ro = new ResizeObserver(() => { layout(); render(); });
    ro.observe(wrap);

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/geo/ne_110m_land.json");
        if (!res.ok) throw new Error("geo load failed");
        if (cancelled) return;
        land = (await res.json()) as FeatureCollection;
        buildDots();
        layout();
        render();
      } catch {
        if (!cancelled) setError(true);
      }
    })();

    layout();
    render();

    return () => {
      cancelled = true;
      t?.stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  if (error) {
    return (
      <div className={`grid aspect-square w-full place-items-center rounded-2xl border border-white/10 bg-white/[0.03] ${className}`}>
        <p className="text-sm text-mist/50">‹globe unavailable›</p>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative mx-auto aspect-square w-full max-w-[34rem] ${className}`}>
      <div className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(24,226,123,0.12),transparent_70%)] blur-2xl" aria-hidden />
      <canvas ref={canvasRef} className="relative cursor-grab touch-none active:cursor-grabbing" aria-hidden />
      <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-mist/35">
        Drag to rotate
      </p>
    </div>
  );
}
