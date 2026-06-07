# ENIRIQ — Build Handover

> **You are the build agent.** You have **no prior context**. This file tells you *everything*: what we are building, why, the exact stack, file layout, design tokens, every component contract, every motion/scroll spec, every colour, and the validation gates. Build strictly to this document. Where this file gives a number, a curve, a colour or a layout — **use it; do not improvise.**
>
> **Frozen source of truth for IA/content:** `ENIRIQ_Build_Plan_FINAL.md` (v2.1). **Rationale/decision log:** `ENIRIQ_TECHNICAL_PROJECT_RECORD.md`. If anything here ever seems to conflict with the FINAL plan on *information architecture or content*, the FINAL plan wins — but this file has already reconciled them.

---

## Source material you must have on hand

| File | What it is | How to use it |
|---|---|---|
| `ENIRIQ_Build_Plan_FINAL.md` (v2.1, FROZEN) | Authoritative IA / content / positioning | Obey it. It wins on structure & content. |
| **`ENIRIQ_HARVESTED_COMPONENTS.md`** (in this folder) | **Curated, cleaned, copy-ready source for every component the build KEEPS or REPURPOSES** (GlowCard, tubelight-navbar, header-3, team-section, footer-section, radial-orbital donor). Markdown escaping already removed. | **This is your component source — copy from it and apply the per-block notes.** Mapped in **§9A**. |
| `ENIRIQ_BUILD_HANDOVER.md` (this file) | The build brief + full engine code (Aurora, CurrentLine, Reveal) | Build to it. Engines in §9 are complete code. |
| `BUILD_INSTRUCTIONS.md` (OLD runbook) | The *superseded single-page* build runbook | **IA is dead** (it builds the banned single-page/proof-heavy site). Use **only** for non-conflicting technical recipes: the palette `@theme` block, three.js resize/dispose patterns, the scaffold command. |
| The existing `eniriq/` app in this project | The *old single-page build* (has trust bar, stats, cases, testimonials, careers, particle intro, globe) | **Code donor only — wrong architecture.** Lift proven *mechanics* (perf-hardened aurora, `Reveal`, IntersectionObserver/rAF perf patterns). **Never** copy its sections or its concept. |

> Everything you need to build the site is in **this folder**: `ENIRIQ_Build_Plan_FINAL.md` (frozen spec), this handover, `ENIRIQ_HARVESTED_COMPONENTS.md` (copy-ready component source), and `ENIRIQ_TECHNICAL_PROJECT_RECORD.md` (rationale). The original raw `Animations code.md` is **not required** — its needed parts are already curated into `ENIRIQ_HARVESTED_COMPONENTS.md`.

---

## Table of contents

1. Executive build brief
2. Absolute non-negotiables (hard gate)
3. Project setup (exact commands + environment reality)
4. File & folder structure
5. Design system — colours, tokens, `globals.css`
6. Typography system
7. Motion system — global tokens & rules
8. "The Current" — full implementation spec
9. Engine components (full code): Aurora, CurrentLine, Reveal
9A. Harvested animation source & adaptation map (`Animations code.md`)
10. Content model — `content.ts` types + example
11. Routing, layout & metadata (App Router)
12. Global chrome — `SiteNav`, `MobileNav`, `Footer`
13. Shared building-block components (contracts + motion)
14. The Values six-node signature (full spec)
15. Page `/` — Home (section by section)
16. Page `/what-we-do`
17. Page `/sectors` + `/sectors/[slug]`
18. Page `/people`
19. Page `/contact`
20. Page `/insights` (flagged, optional)
21. Performance budget & guardrails
22. Accessibility requirements
23. Build order (phased)
24. Definition of done + validation gates
25. Client content needed before launch

---

## 1. Executive build brief

Build a **multi-page, animation-led, startup-safe** marketing website for **ENIRIQ**, an early-stage **energy-transition, utilities & AI** consultancy, using **Next.js (App Router) + TypeScript + Tailwind v4 + shadcn/ui + `motion/react`** and a single restrained **three.js aurora** background.

Three things this is **NOT**:
- **Not** a single-page anchor-scroll website. → Real routes.
- **Not** a proof-heavy established-consultancy site. → No logos/stats/cases/testimonials.
- **Not** a generic SaaS template. → It is **people-led, values-led, sector-routed**, with an **AI-implementation spine**.

Credibility is built from **mission → why-now → values → people → method → sectors → AI logic**. The signature creative device is **"the Current"** (energy → data → AI decision → implementation), one animation language that **restarts contextually on each page**.

All copy is **placeholder** (`‹…›`) and lives in **`content.ts`**. The site must *look* finished and premium while containing **zero invented facts**.

---

## 2. Absolute non-negotiables (hard gate)

Build **none** of the following. If any harvested/borrowed component contains them, **strip it down to layout/animation only**:

- ❌ Single-page `#anchor` navigation for primary nav (use real routes).
- ❌ Trust bar / client-logo bar / any client logos.
- ❌ Hero stat strip / count-up numbers / `StatCounter`.
- ❌ Impact-metrics band.
- ❌ Case studies. ❌ Testimonials. ❌ Careers (page/section/nav). ❌ "Our Work."
- ❌ Fake client names, fake awards, fake results, dummy statistics presented as real.
- ❌ Particle-text intro.
- ❌ three.js globe (allowed *only* if ambient and non-proof-like — **default: omit**).
- ❌ `framer-motion` (install/import). Use `motion/react` only.
- ❌ External image hotlinks (supabase/unsplash/randomuser/githubusercontent/etc.).
- ❌ Hard-coded demo strings anywhere outside `content.ts`.
- ❌ shadcn `switch`, dark-mode toggle, or any carousel.

**When in doubt, leave it out.**

---

## 3. Project setup (exact commands + environment reality)

### 3.1 Environment reality — read this first
- The FINAL plan names **Next.js 15**. The **proven local environment is Next.js 16.2.7 with React 19.2.4, `motion@^12`, `three@^0.184`, Tailwind `v4`.**
- `create-next-app@latest` installs the **latest** Next (currently 16.x). That is acceptable and proven.
- **Critical:** there is a repo convention (`AGENTS.md`) stating *"This is NOT the Next.js you know — read the relevant guide in `node_modules/next/dist/docs/` before writing code."* **Honour it.** Before writing route/layout/metadata code, skim the installed docs.
- **Concrete Next 15/16 gotchas you must handle:**
  - In dynamic routes, **`params` is a `Promise`** → `const { slug } = await params;` and type it `{ params: Promise<{ slug: string }> }`.
  - **`generateMetadata` is async**; for `[slug]` it also receives `params` as a Promise.
  - Use **`next/font`** (`geist` package or `next/font/google`) — no `<link>` font tags.
  - Mark every interactive/animated component `"use client"`. Pages can stay server components that compose client components.

### 3.2 Scaffold (fresh app)
> Recommendation: scaffold **fresh**. The existing `eniriq/` folder in this project implements the *old, superseded* single-page concept — keep it only as a **code donor** (see §9). Scaffold the new app in a clean directory (e.g. `eniriq/` if empty, otherwise `eniriq-app/`). Use the same folder name the plan expects where possible.

```bash
npx create-next-app@latest eniriq --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
# If the installed CLI rejects --no-turbopack, drop that flag and re-run (turbopack default is fine).

cd eniriq

# Animation + 3D + icons
npm i motion three lucide-react
npm i -D @types/three

# shadcn (defaults)
npx shadcn@latest init -d
npx shadcn@latest add button card badge accordion navigation-menu avatar input label textarea tooltip
```

- **Do NOT** `npm i framer-motion`.
- **Do NOT** add `switch` or any carousel component.
- If prompted about Turbopack, either choice is fine; verify `npm run dev` works after.
- After install, run `npm run dev` once to confirm a clean baseline before writing any feature code.

### 3.3 Fonts
Use **Geist** (display + body). With `next/font`:
```ts
// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google"; // or the `geist` package
const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
```
Apply `${sans.variable} ${mono.variable}` to `<html>`; set `--font-sans` as the base in `@theme`.

### 3.4 Local serve for LAN
```bash
npm run dev -- -H 0.0.0.0 -p 3000
# report the LAN URL, e.g. http://192.168.1.x:3000
```

---

## 4. File & folder structure

```
eniriq/
├─ public/
│  ├─ people/                 # local placeholder avatars (or none → initials)
│  ├─ og/                     # OG image placeholders
│  └─ noise.png               # optional subtle texture (local)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx           # root layout: fonts, <body>, TooltipProvider, SiteNav, Footer
│  │  ├─ globals.css          # Tailwind v4 @import + @theme tokens + keyframes
│  │  ├─ page.tsx             # Home (/)
│  │  ├─ what-we-do/page.tsx
│  │  ├─ sectors/
│  │  │  ├─ page.tsx          # Sectors landing
│  │  │  └─ [slug]/page.tsx   # Sector detail template (async params)
│  │  ├─ people/page.tsx
│  │  ├─ contact/page.tsx
│  │  └─ insights/page.tsx    # render only if flags.insightsEnabled
│  ├─ components/
│  │  ├─ fx/
│  │  │  ├─ AuroraShaderBackground.tsx
│  │  │  ├─ CurrentLine.tsx
│  │  │  ├─ CurrentBackground.tsx
│  │  │  └─ Reveal.tsx
│  │  ├─ nav/
│  │  │  ├─ SiteNav.tsx
│  │  │  └─ MobileNav.tsx
│  │  ├─ blocks/
│  │  │  ├─ SectionHeader.tsx
│  │  │  ├─ ValueNode.tsx
│  │  │  ├─ ValuesNetwork.tsx
│  │  │  ├─ PersonCard.tsx
│  │  │  ├─ CapabilityCard.tsx
│  │  │  ├─ SectorCard.tsx
│  │  │  ├─ FocusAreaCard.tsx
│  │  │  ├─ StepCard.tsx
│  │  │  ├─ PressureCard.tsx
│  │  │  ├─ ResponsibilityMap.tsx
│  │  │  ├─ CTABand.tsx
│  │  │  └─ Footer.tsx
│  │  └─ ui/                  # shadcn-generated
│  ├─ content.ts             # ALL copy/data (placeholders)
│  └─ lib/
│     └─ utils.ts            # cn() etc (shadcn)
└─ ...
```

Convention: **engines** in `fx/`, **chrome** in `nav/`, **content blocks** in `blocks/`, **shadcn** in `ui/`.

---

## 5. Design system — colours, tokens, `globals.css`

### 5.1 Palette (exact)

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#0A0F0D` | Primary dark background |
| `--color-ink-soft` | `#16201C` | Dark text on light sections |
| `--color-paper` | `#F6F7F4` | Warm off-white section background |
| `--color-mist` | `#F5F7F5` | Near-white foreground/text on dark |
| `--color-energy` | `#16A34A` | **Primary** (energy green) |
| `--color-energy-bright` | `#10B981` | Primary bright / teal end of gradient |
| `--color-cyan` | `#38BDF8` | **Secondary** (grid cyan) |
| `--color-amber` | `#D9A441` | **Rare** accent only |

**Signature gradient** (CTAs, accent words, the Current stroke): `linear-gradient(135deg, #16A34A, #10B981, #38BDF8)`.
**Glass surface:** `bg-white/5` + `backdrop-blur-xl` + `border border-white/10`.
**Scrim over aurora:** dark radial/linear gradient from `--color-ink` (≈0.85 → 0.4) so hero text always meets AA.

Amber is **rare** — small flourishes only (e.g., a single eyebrow accent), never a primary surface.

### 5.2 `globals.css` (Tailwind v4 — tokens live here, **not** a config file)

```css
@import "tailwindcss";
/* shadcn base layers as generated by `shadcn init` go here */

@theme {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);

  /* ENIRIQ palette */
  --color-ink: #0A0F0D;
  --color-ink-soft: #16201C;
  --color-paper: #F6F7F4;
  --color-mist: #F5F7F5;
  --color-energy: #16A34A;
  --color-energy-bright: #10B981;
  --color-cyan: #38BDF8;
  --color-amber: #D9A441;
}

@layer base {
  html { scroll-behavior: smooth; }
  body { background: var(--color-ink); color: var(--color-mist); }
}

/* Accent text */
.text-gradient {
  background: linear-gradient(135deg, #16A34A, #10B981, #38BDF8);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Reduced motion: disable animation globally */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```
Tailwind v4 auto-generates utilities from `@theme` colours: `bg-ink`, `text-mist`, `text-energy`, `border-energy/30`, etc. Use those everywhere.

### 5.3 Section rhythm & surfaces
- Container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
- Vertical rhythm: `py-24 lg:py-32` per section.
- **Surface alternation** (set per page in §15–19): dark sections use `bg-ink` + `text-mist`; light sections use `bg-paper` + `text-ink-soft`. Keep a deliberate dark→light→dark rhythm — never two identical adjacent surfaces without intent.
- Card radius: `rounded-2xl` (small), `rounded-3xl` (feature). Pills/CTAs: `rounded-full`.
- Borders: dark surfaces `border-white/10`; light surfaces `border-ink-soft/10`.

---

## 6. Typography system

- **Family:** Geist via `--font-sans`. Mono (`--font-mono`) only for tiny code-like step indices (e.g., `01`).
- **Scale (use `clamp` for fluid headings):**

| Role | Classes / size | Tracking |
|---|---|---|
| Eyebrow | `text-xs uppercase` · `tracking-[0.25em]` · `text-energy font-semibold` | wide |
| H1 (hero) | `text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05]` | `tracking-tight` |
| H2 (section) | `text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1]` | `tracking-tight` |
| H3 (card) | `text-lg md:text-xl font-semibold` | normal |
| Body | `text-base md:text-[1.0625rem] leading-relaxed` | normal |
| Body-muted | body + `text-mist/70` (dark) or `text-ink-soft/70` (light) | normal |
| Small/meta | `text-sm text-mist/50` | normal |

- **Headline treatment:** display headings get a **mask/clip reveal** (see §7). Apply `.text-gradient` to **one** key phrase per hero (not the whole headline).
- Max line length for body: `max-w-2xl` (≈65ch). Never full-width paragraphs.

---

## 7. Motion system — global tokens & rules

> Implement these once as shared constants and reuse. **Never invent ad-hoc curves/durations.**

```ts
// motion tokens (keep in a small module, e.g. src/lib/motion.ts)
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;     // primary reveal curve
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;  // line-draw / diagrams
export const DUR = { micro: 0.2, base: 0.6, slow: 0.8, draw: 1.2 } as const;
export const REVEAL_Y = 24;        // px (use 16 on mobile via responsive logic if needed)
export const STAGGER = { card: 0.08, step: 0.12 } as const;
export const VIEWPORT = { once: true, margin: "-80px" } as const;
```

**Standard reveal** (the default for ~everything):
```tsx
initial={{ opacity: 0, y: REVEAL_Y }}
whileInView={{ opacity: 1, y: 0 }}
viewport={VIEWPORT}
transition={{ duration: DUR.base, ease: EASE_OUT }}
```

**Hero headline mask reveal:**
```tsx
initial={{ opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" }}
animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
transition={{ duration: DUR.slow, ease: EASE_OUT }}
```
Hero animates on **mount** (`animate`, not `whileInView`) so the message is instant. **Never gate hero copy behind scroll.**

**Staggered grids/lists:** parent `transition={{ staggerChildren: STAGGER.card }}`; children use the standard reveal. Use motion's `variants` with a container.

**Line-draw (the Current, method connectors, diagrams):** animate an SVG `<motion.path>` `pathLength` from `0 → 1`, `duration: DUR.draw, ease: EASE_IN_OUT`, triggered by `useInView(ref, { once: true, margin: "-100px" })`.

**Hover (cards/CTAs):** `whileHover={{ y: -4 }}` + border/glow brighten, `transition={{ duration: DUR.micro, ease: EASE_OUT }}`. CTAs: `whileHover={{ scale: 1.03 }}`, `whileTap={{ scale: 0.98 }}`.

**Hard rules:**
- transform/opacity (and `clipPath`/`pathLength`) **only** — never animate layout (width/height/top/left) on scroll.
- **One** signature heavy moment per page (Values on Home). Everything else is calm.
- No two animated backgrounds visible at once.
- Pre-size every animated container to avoid layout shift.
- All of the above must no-op under `prefers-reduced-motion` (see §9 `Reveal` and §21).

---

## 8. "The Current" — full implementation spec

The Current is a **green→teal→cyan connected line** representing **energy → data → AI decision → implementation**. It is **per-page contextual**, not literally continuous between routes.

### 8.1 Two primitives
- **`CurrentBackground`** — an *ambient* SVG layer sitting low-opacity behind a section (or page region). Soft, slow, near-static; a faint flowing line/grid. Opacity ≤ 0.18. Purely decorative, `aria-hidden`.
- **`CurrentLine`** — an *active* connector that **draws on scroll** between content nodes (e.g., between method steps, between sections). Stroke = the signature gradient; nodes = small circles that scale/glow as the draw front passes.

### 8.2 Per-page behaviour (build each variant)

| Page | Current behaviour | How to implement |
|---|---|---|
| **Home** | Full journey: source → values → people → focus → branches → CTA | A vertical `CurrentLine` threading the page; nodes at each section anchor; draws progressively with scroll. Fragments under "Why now", reconnects into Values. |
| **What We Do** | Layered **system diagram** (data-grid variant) | Horizontal/layered `CurrentLine` in the AI-implementation section building layer-by-layer (§16.3). |
| **Sectors** | **Branches** into pathways | One central node with `CurrentLine`s branching to each `SectorCard` (line-draw outward). |
| **Sector detail** | **Recolours** to the sector | Same `CurrentLine`, but stroke tinted by `sector.accent` (pass a colour prop). |
| **People** | People → responsibility areas | `ResponsibilityMap` uses `CurrentLine`s connecting person nodes to domain labels. |
| **Contact** | **Resolves** into the CTA | A short `CurrentLine` converging into the primary button. |

### 8.3 Rules
- Scroll-triggered, line-draw, node activation, light parallax, soft transitions.
- **Banned aesthetics:** orbit/space, SaaS dashboard, glowing-AI-brain, random spins, multiple moving backgrounds.
- **Reduced-motion / mobile:** render the line **fully drawn, static**; nodes shown without pulsing; no parallax.

---

## 9. Engine components (full reference code)

> These three are foundational. The Aurora and Reveal can be adapted from the donor `eniriq/` build (they are already perf-hardened). Use the versions below.

### 9.1 `Reveal.tsx`
```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, DUR, REVEAL_Y, VIEWPORT } from "@/lib/motion";

export function Reveal({
  children, delay = 0, y = REVEAL_Y, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
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
```

### 9.2 `AuroraShaderBackground.tsx` (perf-hardened — use exactly this approach)
Recoloured green/teal aurora. **14-iteration** fragment loop, render at **0.55× resolution**, **30fps** cap, **pause when off-screen (IntersectionObserver) and when the tab is hidden**, **reduced-motion → don't start**. DPR ≤ 2.

```tsx
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AuroraShaderBackground({ className = "", opacity = 1 }:
  { className?: string; opacity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current; if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) * 0.55); // soft bg → low res
    renderer.setSize(el.offsetWidth, el.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(el.offsetWidth, el.offsetHeight) },
      },
      vertexShader: `void main(){ gl_Position = vec4(position,1.0); }`,
      fragmentShader: `
        uniform float iTime; uniform vec2 iResolution;
        #define NUM_OCTAVES 3
        #define ITER 14.0
        float rand(vec2 n){ return fract(sin(dot(n, vec2(12.9898,4.1414)))*43758.5453); }
        float noise(vec2 p){ vec2 ip=floor(p),u=fract(p); u=u*u*(3.0-2.0*u);
          return mix(mix(rand(ip),rand(ip+vec2(1,0)),u.x),
                     mix(rand(ip+vec2(0,1)),rand(ip+vec2(1,1)),u.x),u.y); }
        float fbm(vec2 x){ float v=0.0,a=0.3; vec2 sh=vec2(100);
          mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
          for(int i=0;i<NUM_OCTAVES;i++){ v+=a*noise(x); x=rot*x*2.0+sh; a*=0.4; } return v; }
        void main(){
          vec2 sk=vec2(sin(iTime*1.2)*0.005, cos(iTime*2.1)*0.005);
          vec2 p=((gl_FragCoord.xy+sk*iResolution.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.0,-4.0,4.0,6.0);
          vec2 v; vec4 o=vec4(0.0);
          float f=2.0+fbm(p+vec2(iTime*5.0,0.0))*0.5;
          for(float i=0.0;i<ITER;i++){
            v=p+cos(i*i+(iTime+p.x*0.08)*0.025+i*vec2(13.0,11.0))*3.5
               +vec2(sin(iTime*3.0+i)*0.003,cos(iTime*3.5-i)*0.003);
            float tn=fbm(v+vec2(iTime*0.5,i))*0.3*(1.0-(i/ITER));
            vec4 col=vec4(
              0.05+0.15*sin(i*0.2+iTime*0.4),   // low red → green dominant
              0.35+0.45*cos(i*0.3+iTime*0.5),   // strong green
              0.40+0.45*sin(i*0.4+iTime*0.3),   // teal/cyan
              1.0);
            vec4 c=col*exp(sin(i*i+iTime*0.8))/length(max(v,vec2(v.x*f*0.015,v.y*1.5)));
            float thin=smoothstep(0.0,1.0,i/ITER)*0.6;
            o+=c*(1.0+tn*0.8)*thin;
          }
          o=tanh(pow(o/100.0, vec4(1.6)));
          gl_FragColor=vec4(o.rgb*1.4, o.a*0.9);
        }`,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let raf = 0, onScreen = true, visible = true, last = performance.now();
    const FPS = 1000 / 30;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!onScreen || !visible) return;
      const dt = now - last; if (dt < FPS) return;
      last = now - (dt % FPS);
      material.uniforms.iTime.value += 0.03;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { rootMargin: "120px" });
    io.observe(el);
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);
    const onResize = () => {
      renderer.setSize(el.offsetWidth, el.offsetHeight);
      material.uniforms.iResolution.value.set(el.offsetWidth, el.offsetHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      mesh.geometry.dispose(); material.dispose(); renderer.dispose();
    };
  }, []);
  return <div ref={ref} className={`absolute inset-0 ${className}`} style={{ opacity }} aria-hidden />;
}
```
**Usage:** only on **Home hero** (full) and **Closing CTA** (`opacity={0.35}`). Always lay a **dark scrim** over it under text. Never more than these two instances on a page, and never two visible at once.

### 9.3 `CurrentLine.tsx` (scroll-drawn connector)
```tsx
"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { DUR, EASE_IN_OUT } from "@/lib/motion";

export function CurrentLine({
  d, nodes = [], stroke = "url(#current-grad)", width = 2, className = "",
  viewBox = "0 0 100 600",
}: {
  d: string;                      // SVG path for the line
  nodes?: { x: number; y: number }[];
  stroke?: string; width?: number; className?: string; viewBox?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  const draw = reduce ? 1 : inView ? 1 : 0;
  return (
    <svg ref={ref} viewBox={viewBox} fill="none" className={className} aria-hidden
         preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="current-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16A34A" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <motion.path d={d} stroke={stroke} strokeWidth={width} strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw }}
        transition={{ duration: DUR.draw, ease: EASE_IN_OUT }} />
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={4} fill="#10B981"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView || reduce ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: reduce ? 0 : 0.15 * i, duration: DUR.base, ease: EASE_IN_OUT }} />
      ))}
    </svg>
  );
}
```
`CurrentBackground` is the same idea at ≤ 0.18 opacity, slower, used as a section backdrop (`absolute inset-0 -z-10`).

---

## 9A. Harvested animation source & adaptation map (`Animations code.md`)

**Copy-ready source for every KEEP/REPURPOSE component is in `ENIRIQ_HARVESTED_COMPONENTS.md`** (numbered §1–6, already un-escaped). Open that file, copy the block into the target file, then apply its per-block note + the recipe below. The `~Lxxx` references in the table point to the original `Animations code.md` only if you want surrounding context — you do not need it.

> ⚠️ The old `BUILD_INSTRUCTIONS.md` has a similar recipe table, **but it targets the dead single-page site and keeps banned proof components.** Use **this** table — it is reconciled to the multi-page, no-fake-proof architecture.

### Decision map (source block → decision → target)

| Source block (find by import) | Decision | Target in this build | Adaptation recipe |
|---|---|---|---|
| `animated-shader-background` (`AnoAI`, ~L526) | **KEEP** | `fx/AuroraShaderBackground.tsx` | Use the **perf-hardened version in §9.2** (it already supersedes this block: recoloured green/teal, 14-iter, 0.55× res, 30fps, IO + visibility pause). Only on Home hero + Closing CTA. |
| `spotlight-card` (`GlowCard`, ~L1566) | **KEEP** | `blocks/CapabilityCard.tsx` (+ `FocusAreaCard`) | Pointer-tracked glow. See **§13.2** for the exact mechanism + the **hue-pinning** brand fix. |
| `header-3` (`Header` + `MobileMenu`, ~L3119) | **KEEP — adapt to routes** | `nav/SiteNav.tsx` + `nav/MobileNav.tsx` | **Rewrite `framer-motion` → `motion/react`** (imports at ~L3492). Drive active state from `usePathname()` (real routes), **not** scroll. Keep `navigation-menu` dropdowns; keep `MenuToggleIcon`. **Cut** any scroll→hamburger morph / circular FAB. |
| `tubelight-navbar` (`NavBar`, ~L3036) | **KEEP — indicator only** | merge into `nav/SiteNav.tsx` | **Rewrite `framer-motion` → `motion/react`** (import at ~L3020). Take **only** the lamp/indicator that slides under the active item; bind it to the active **route**. Discard its standalone link list. |
| shadcn `accordion` (~L2203) | **KEEP** | `/sectors` cross-themes / decision list (optional) | Use shadcn's own `accordion` component (already installed). lucide `ChevronDown`. Recolour to palette. |
| `team-section` (`TeamSection`, ~L2765) | **KEEP — local avatars** | `blocks/PersonCard.tsx` + `/people` grid | **Strip all `raw.githubusercontent.com` avatar URLs** → local `/public/people` or initials fallback (§13.7). Recolour. |
| `footer-section` (`Footerdemo`, ~L2824) | **KEEP — strip** | `blocks/Footer.tsx` | **Remove the `Switch`/dark-toggle entirely** (import at ~L2831). **No Careers column.** Newsletter only if `flags.insightsEnabled`. Recolour. |
| `radial-orbital-timeline` (~L1143) | **REPURPOSE — redesign** | `blocks/ValuesNetwork.tsx` (Home signature) | **Do NOT ship it as an orbit.** Take only the *concept* (nodes + connecting lines + activation). **Rebuild** as a connected **energy/data network** with **scroll-progress** sequential activation per **§14** — not radial, not a timer, not space/SaaS. |
| `glassmorphism-trust-hero` (~L578 / ~L812) | **LAYOUT ONLY** | `/` Hero composition | Keep the glass layout language. **Delete** the stat strip/metric card and the built-in "Trusted by" marquee. No stats, no logos. |
| `ParticleTextEffect` (~L147) | **CUT** | — | Particle intro is banned (§2). |
| `container-scroll-animation` (~L1010, uses framer-motion) | **CUT** | — | Tied to the case-studies signature (banned). |
| `gallery4` (~L1970) + `carousel` (~L1769) | **CUT** | — | No carousel; case gallery banned. |
| `testimonials-columns-1` (~L2033) | **CUT** | — | Testimonials banned. |
| `about-us-section` (~L2258, uses framer-motion) | **CUT** | — | Its only reuse was `StatCounter` — and stat count-ups are banned. |

### framer-motion → motion/react (mandatory rewrites)
The following **kept** blocks import `framer-motion`. Change every import to `motion/react`; the APIs (`motion`, `useScroll`, `useTransform`, `AnimatePresence`, `useMotionValueEvent`) are identical. **Do not install framer-motion.**
- `tubelight-navbar` (~L3020) → SiteNav
- `header-3` / `MobileMenu` (~L3492) → SiteNav / MobileNav

(`container-scroll-animation` and `about-us-section` also import framer-motion but are **CUT**, so ignore them.)

### Demo content to strip from every kept block
- External image URLs: `raw.githubusercontent.com`, `randomuser.me`, `unsplash`, `supabase`, etc. → local `/public` or initials.
- Demo copy: "shadcn/ui", "Acme", author names, lorem, SaaS/interior-design text → replace with `content.ts` values.
- Demo colours → ENIRIQ palette tokens (§5).

### Token-name note (donor vs this build)
The donor build / old runbook name the secondary/accent tokens `--color-cyan-accent` and `--color-gold`. **This handover standardises on `--color-cyan` and `--color-amber`** (§5.1). If you copy donor CSS, rename accordingly. Same hex values (`#38BDF8`, `#D9A441`).

### Existing build = perf donor, wrong concept
`eniriq/src/components/fx/AuroraShaderBackground.tsx`, `Reveal.tsx`, and the IntersectionObserver/rAF patterns are good to lift. **`eniriq/src/components/sections/Approach.tsx` is a contained *orbital* timeline — it is the wrong aesthetic for Values; reference its scroll/rAF mechanics only, not its look.** Never copy the donor's Hero/Services/Sectors/etc. sections — they implement the banned single-page concept.

---

## 10. Content model — `content.ts` types + example

**Every** visible string comes from here. Use `‹…›` so placeholders are obvious. Suggested types:

```ts
// src/content.ts
export type CTA = { label: string; href: string };
export type NavItem = { label: string; href: string };

export type Value = { id: string; title: string; line: string; icon: string }; // icon = lucide name
export type Person = {
  slug: string; name: string; role: string; specialism: string;
  bio: string; responsibility: string; linkedin: string; avatar?: string; // /public path, optional
  initials: string;
};
export type Capability = { title: string; desc: string; sub: string[]; sectorsHref?: string };
export type FocusArea = { title: string; desc: string; icon: string };
export type Step = { id: string; title: string; desc: string };
export type Pressure = { title: string; desc: string; icon: string };

export type Sector = {
  slug: string; name: string; accent: string;          // accent = hex for recoloured Current
  hero: { eyebrow: string; statement: string };
  pressures: Pressure[];
  keyDecisions: { title: string; desc: string }[];
  howWeHelp: { challenge: string; capability: string; outcome: string }[];
  aiDataOpportunities: { opportunity: string; dataNote: string; oversightNote: string }[];
  relevantPeople: string[];                              // person slugs
  relatedCapabilities: string[];                         // capability titles or hrefs
  cta: { heading: string; line: string; cta: CTA };
};

export const flags = { insightsEnabled: false };

export const brand = {
  name: "ENIRIQ",
  tagline: "‹short positioning line›",
  email: "‹hello@eniriq.com›",
  linkedin: "‹linkedin url›",
  location: "‹location›",
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Sectors", href: "/sectors" },
  { label: "People", href: "/people" },
  // { label: "Insights", href: "/insights" },  // only when flags.insightsEnabled
  { label: "Contact", href: "/contact" },
];

export const home = {
  hero: { eyebrow: "‹energy transition · utilities · AI›",
          h1: "‹mission line — one key phrase gets .text-gradient›",
          subline: "‹supporting sentence›",
          primary: { label: "Talk to us", href: "/contact" },
          secondary: { label: "See what we do", href: "/what-we-do" } },
  purpose: { title: "‹title›", body: "‹2–3 sentence mission›", belief: "‹optional belief line›" },
  pressures: [ /* 4 Pressure: transition, AI-adoption, legacy-infrastructure, regulatory/investment */ ],
  values: [ /* exactly 6 Value */ ],
  peopleTeaser: { title: "‹title›", statement: "‹leadership statement›", peopleSlugs: ["…"] },
  focusAreas: [ /* 4–7 FocusArea, exploration-framed */ ],
  capabilitiesTeaser: [ /* 4–6 Capability */ ],
  sectorsTeaser: { title: "‹title›", sectorSlugs: ["…"] },
  howWeWorkTeaser: [ /* 4 Step: Understand → Diagnose → Design → Guide implementation */ ],
  closingCTA: { heading: "‹heading›", line: "‹line›", cta: { label: "Talk to us", href: "/contact" } },
};

export const whatWeDo = {
  hero: { title: "‹title›", intro: "‹intro›", cta: { label: "Talk to us", href: "/contact" } },
  capabilityPillars: [ /* 4–6 Capability */ ],
  aiImplementationLayer: {
    intro: "‹explanation›",
    layers: ["Business problem","Data sources","Workflow design","AI support","Human decision","Implementation","Outcome measurement"],
  },
  method: [ /* 5 Step: Discover → Prioritise → Design → Implement → Measure */ ],
  engagementModels: [ /* 4 Card: advisory sprint, strategy project, implementation support, ongoing partnership */ ],
  relatedSectors: ["…"], // sector slugs
};

export const sectors = {
  landing: {
    hero: { title: "‹title›", intro: "‹each sector faces different decisions›" },
    crossThemes: ["Decarbonisation","Asset resilience","Data quality","AI adoption","Regulation","Capital delivery"],
    decisionMap: [ /* key cross-sector decisions */ ],
  },
  sectorList: [ /* Sector objects; slugs: electricity-networks, gas-distribution, water-utilities,
                   renewable-developers, energy-retailers, infrastructure-investors, public-sector */ ],
};

export const people = {
  hero: { title: "‹title›", intro: "‹people-are-the-proof intro›" },
  leadership: [ /* Person[] */ ],
  responsibilities: ["energy transition strategy","AI & digital","utilities operations","regulation & policy","capital/infrastructure","commercial strategy"],
  philosophy: [ /* 3–4: evidence-led judgement, responsible innovation, sector-informed thinking, implementation realism */ ],
  advisoryNetwork: undefined, // optional
};

export const contact = {
  hero: { title: "‹title›", line: "‹one line›" },
  routingOptions: [ "‹discuss strategy›","‹discuss AI/digital›","‹discuss a sector challenge›","‹speak to a specific person›" ],
  formFields: { /* labels for Name, Organisation, Email, Sector select, Area select, Message */ },
  directDetails: { email: brand.email, linkedin: brand.linkedin, location: brand.location },
  reassurance: "‹what happens next›",
};
```
**Rule:** if a component needs a string, it imports it from `content.ts`. No exceptions.

---

## 11. Routing, layout & metadata (App Router)

### 11.1 Root layout (`src/app/layout.tsx`)
- Loads fonts (§3.3), sets `<html lang="en" className="${sans.variable} ${mono.variable}">`, `<body className="bg-ink text-mist antialiased">`.
- Wraps children with shadcn `TooltipProvider`.
- Renders **`<SiteNav />` and `<Footer />`** here (they are global), with `{children}` between in a `<main>`.
- Exports base `metadata` (template title): `title: { default: "ENIRIQ", template: "%s | ENIRIQ" }`, `description: "‹default description›"`.

### 11.2 Per-route metadata
Each `page.tsx` exports `metadata` placeholders:
```ts
export const metadata = {
  title: "‹page title›",                 // becomes "‹page title› | ENIRIQ"
  description: "‹one-sentence page description›",
  openGraph: { title: "‹og title›", images: ["/og/‹route›.png"] },
  alternates: { canonical: "/‹route›" },
};
```

### 11.3 Dynamic sector route (`src/app/sectors/[slug]/page.tsx`)
- **`generateStaticParams`** from `content.ts`:
```ts
import { sectors } from "@/content";
export function generateStaticParams() {
  return sectors.sectorList.map((s) => ({ slug: s.slug }));
}
```
- **Async params** (Next 15/16):
```ts
export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = sectors.sectorList.find((s) => s.slug === slug);
  if (!sector) return notFound();           // import { notFound } from "next/navigation"
  // render template with `sector`
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = sectors.sectorList.find((x) => x.slug === slug);
  return { title: s?.name ?? "Sectors", description: "‹sector description›",
           alternates: { canonical: `/sectors/${slug}` } };
}
```

---

## 12. Global chrome

### 12.1 `SiteNav.tsx`
> Source: adapt `header-3` (structure + `navigation-menu` dropdowns + `MenuToggleIcon`) and `tubelight-navbar` (the sliding lamp) from `Animations code.md` (§9A). **Rewrite `framer-motion` → `motion/react`.**
- Sticky `fixed top-0 inset-x-0 z-50`, height `h-[72px]`, container as §5.3.
- **Transparent over hero**, then on scroll > 40px → `bg-ink/90 backdrop-blur-md border-b border-white/10`. Toggle via a scroll listener (`{ passive: true }`).
- Left: logo (small gradient square “E” + wordmark “ENIRIQ”, links `/`).
- Center (desktop `lg:flex`): nav links from `content.nav`. **Active state = active route** via `usePathname()` (NOT scroll-spy). The active link is `text-energy`; inactive `text-mist/70 hover:text-mist`.
- **Tubelight indicator:** an absolutely-positioned `bg-energy h-0.5 rounded-full` under the active link; position/width set from the active link's `getBoundingClientRect()` in a `useEffect` keyed on `pathname` (and on resize). Animate with a CSS `transition-all duration-300`.
- Right: primary CTA pill `Talk to us` → `/contact` (gradient bg). Hamburger on mobile (`lg:hidden`).
- Mark `"use client"`.

### 12.2 `MobileNav.tsx`
- Portal/overlay (`fixed inset-0 z-40 bg-ink/98 backdrop-blur-xl`), opened from the hamburger.
- Links from `content.nav` as large `motion.a`, **staggered** in (`delay: i * 0.06`), each `py-4 text-xl border-b border-white/5`.
- Active route highlighted `text-energy`. Closing returns focus to the toggle. Trap focus while open; close on link click and on `Esc`.

### 12.3 `Footer.tsx`
> Source: adapt `footer-section` from `Animations code.md` (§9A). **Remove the `Switch` import/usage entirely.**
- `bg-ink border-t border-white/10`, container, `py-14`.
- 4 columns: **(1)** brand + one-line positioning + optional newsletter input (non-functional, client-validated only — **only if `flags.insightsEnabled`**, else omit newsletter); **(2)** "What we do" → capability links to `/what-we-do`; **(3)** "Company" → nav routes; **(4)** "Contact" → email/LinkedIn/location from `content.brand`.
- Bottom bar: `© ‹year› ENIRIQ` + legal placeholders + LinkedIn icon.
- **No dark-mode toggle. No Careers. No Switch import.** LinkedIn icon: use lucide **`ExternalLink`** (the `Linkedin` export is unreliable across versions).

---

## 13. Shared building-block components (contracts + motion)

> All of these wrap their reveal in `Reveal` (or use the standard reveal inline). Props are typed from `content.ts`. All `"use client"` only if they use motion/hover/state — most do.

### 13.1 `SectionHeader`
Props: `{ eyebrow?: string; title: string; intro?: string; align?: "left"|"center"; light?: boolean }`.
Layout: eyebrow (eyebrow style §6) → H2 → optional intro (`max-w-2xl`, muted). `mb-12`. Colours flip with `light`.

### 13.2 `CapabilityCard` (spotlight/glow card)
Adapt the **`GlowCard` / `spotlight-card`** block from `Animations code.md` (~L1566). Card: glass surface, `rounded-2xl`, `p-6`.
- **Spotlight mechanism (from source):** a `pointermove` listener writes four CSS vars on the card — `--x`, `--y` (cursor px) and `--xp`, `--yp` (cursor as 0–1 fraction of viewport). The card background is a `radial-gradient(... at calc(var(--x)*1px) calc(var(--y)*1px), hsl(var(--hue) ...))`, and `[data-glow]::before`/`::after` paint the border glow. Keep the `data-glow` attribute + the injected `<style>` for the pseudo-elements.
- **Brand hue-pinning fix (do this):** the source maps hue to cursor X (`--hue = base + xp*spread`, green preset `base:120, spread:200`) — which lets the glow drift to magenta. **Constrain it to ENIRIQ green→cyan:** set `--base: 140` and `--spread: 50` (≈ hue 140→190), or simply fix `--hue` to `155` and let only the spotlight *position* move. Pin saturation/lightness so the glow reads energy-green, never rainbow.
- Content: small index/icon (lucide) → H3 title → `desc` (muted) → `sub[]` as small chips/list → optional "Related sectors →" link.
- Motion: standard reveal; `whileHover={{ y: -4 }}`.
Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (pillars) — pre-size to avoid shift.

### 13.3 `SectorCard`
Props from `Sector` (name, hero.statement excerpt, accent). Card with left accent bar tinted `accent`, name H3, one-line, arrow on hover (`group-hover:translate-x-1`). Links to `/sectors/[slug]`. Branches visually from the Current node on the Sectors page.

### 13.4 `FocusAreaCard`
Exploration-framed (never "use case/solution/proven outcome"). Icon + title + `desc`. Simple bordered card on the relevant surface. Standard reveal, light hover lift.

### 13.5 `StepCard` + connector
Number (`font-mono text-energy/60`, e.g. `01`), title, desc. Rendered in a row/column joined by a **`CurrentLine`** that line-draws as the group enters view. Stagger the cards `STAGGER.step`.

### 13.6 `PressureCard`
Icon (lucide), title, desc; bordered card. Used in Home "Why now" (4) and sector pressures (4–6). On Home, the Current visibly **fragments** behind these then reconnects into Values (achieve with a `CurrentLine` whose path breaks across this band then rejoins).

### 13.7 `PersonCard` (people-led credibility — design precisely)
> Source: adapt `team-section` from `Animations code.md` (§9A). **Strip every `raw.githubusercontent.com` URL** → local avatar or initials.
Props from `Person`. Card: glass on dark / bordered on light, `rounded-2xl`, `p-6`, `flex flex-col`.
- **Avatar:** 96px circle. If `avatar` path exists → `next/image` (local). **Else fallback:** initials on the signature gradient (`bg-gradient-to-br from-energy to-energy-bright`, white bold initials) — **or** a neutral silhouette SVG. **Never** an external image, never a fake photo.
- **Name** (`font-semibold text-base`), **role** (`text-energy text-sm`), **specialism** (`text-mist/60 text-xs`).
- **Bio** (2–3 lines, muted).
- **Responsibility chip:** shadcn `Badge` (outline, `border-energy/30 text-energy`) showing `responsibility`.
- **LinkedIn:** lucide `ExternalLink` icon link (`aria-label="LinkedIn"`).
- Motion: standard reveal; `whileHover={{ y: -4 }}` + border brighten + soft glow.
Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

### 13.8 `ResponsibilityMap` (People page — most important)
A contained diagram connecting **people → responsibility domains**.
- Left/top: person nodes (initials chips). Right/bottom: domain labels from `people.responsibilities`.
- **`CurrentLine`s** connect each person to their `responsibility`. Lines draw in on scroll; domain labels fade in as their line completes.
- Layout: on desktop a two-column SVG/flex network; on mobile, a simple stacked list (person → domain), lines hidden/static. Reduced-motion → all drawn statically.

### 13.9 `CTABand`
Full-width band, `bg-ink` with `AuroraShaderBackground opacity={0.35}` + dark scrim (or a flat dark variant on inner pages). Centered: heading (H2), one line, **primary CTA** (gradient pill). The page's `CurrentLine` **resolves into** this button (path ends at the CTA). `whileHover={{ scale: 1.03 }}` on the CTA.

---

## 14. The Values six-node signature (full spec)

This is the **one** heavy signature moment (Home, §15 step 5). It is the company's "operating system" rendered as a **connected energy/data network** — **NOT** an orbit, space, clock, or SaaS dashboard.

> Source: the `radial-orbital-timeline` block in `Animations code.md` (§9A) is the *conceptual* donor (nodes + connecting lines + activation). **Do not ship its radial/orbital layout or its timer.** Rebuild as the scroll-driven network below. The donor build's `Approach.tsx` is an orbital version — reference its rAF/scroll mechanics only, not its look.

### 14.1 Visual language
- 6 `ValueNode`s placed on an **organic infrastructure layout** (e.g., an irregular hex / branching grid), connected by `CurrentLine` segments forming one continuous spine. Each node has its **own lucide icon + accent** yet shares the **same gradient line** (distinct but linked).
- Values (from `content.home.values`): **Innovation · Responsibility · Practicality · Sector expertise · Partnership · Long-term impact** (placeholders titles/lines).
- Each node reveals: icon → `title` → one-line `line`.

### 14.2 Activation = scroll progress (not a timer)
- Wrap the section in a **sticky** container so it holds while the user scrolls through it.
- `const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });`
- Map progress to 6 sequential thresholds. For node *k* (0..5): activation window `[k/6, (k+1)/6]`.
  - `opacity = useTransform(scrollYProgress, [k/6, k/6 + 0.04], [0.25, 1])`
  - `scale = useTransform(scrollYProgress, [k/6, k/6 + 0.06], [0.9, 1])`
  - the connecting line segment to node *k* uses `pathLength = useTransform(scrollYProgress, [k/6, (k+1)/6], [0, 1])`.
- Sequence: Node 1 pulses → line travels → Node 2 … → Node 6.
- A subtle pulse on the **currently active** node (scale 1→1.05→1 via a small keyframe) is fine; no continuous spinning.

### 14.3 Fallbacks
- `prefers-reduced-motion` **or** mobile (`< 768px`): render **all six nodes and lines fully, statically, at once** (no sticky, no scroll mapping). Pre-size the container so there is no layout shift.

---

## 15. Page `/` — Home (section by section)

Surface rhythm noted per section. The page's vertical **`CurrentLine`** threads sections 3→11.

1. **Nav** (global).
2. **Hero** — `bg-ink` + `AuroraShaderBackground` (full) + dark scrim.
   - Left: eyebrow → H1 mission line (one phrase `.text-gradient`) → subline (`max-w-xl`) → CTAs: primary `Talk to us` (gradient pill) + secondary `See what we do` (glass).
   - **No** stats, **no** logos, **no** count-ups, **no** right-side metric card.
   - Motion: hero copy mask-reveals on **mount** (§7). Aurora behind. Min-height ~`90vh`, content vertically centered.
3. **Purpose / mission** — `bg-paper` `text-ink-soft`. `SectionHeader` (title) + 2–3 sentence mission + optional belief line. `CurrentBackground` flows quietly behind at ≤0.12 opacity.
4. **Why this matters now** — `bg-ink`. `SectionHeader` ("Why now") + 4 `PressureCard`s (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`): transition · AI-adoption · legacy-infrastructure · regulatory/investment. The Current **fragments** across this band, then **reconnects** into Values.
5. **Values — six animated nodes (SIGNATURE, §14)** — `bg-ink` (deep). Sticky scroll-activated network. The page's single heavy moment.
6. **People teaser** — `bg-paper`. `SectionHeader` (title) + leadership statement + 3–6 `PersonCard`s → link `/people`. Current carries from Values into people nodes.
7. **Focus areas** — `bg-ink`. `SectionHeader` + 4–7 `FocusAreaCard`s (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`). Exploration-framed. Current **branches**.
8. **What We Do teaser** — `bg-paper`. 4–6 `CapabilityCard`s (stacked-layers feel) → `/what-we-do`.
9. **Sectors teaser** — `bg-ink`. Row of `SectorCard`s → `/sectors`. Current **splits into branches**.
10. **How we work teaser** — `bg-paper`. 4 `StepCard`s joined by line-draw: Understand → Diagnose → Design → Guide implementation.
11. **Closing CTA** — `CTABand` (aurora `opacity={0.35}` + scrim). Current **resolves into** the button.
12. **Footer** (global).

---

## 16. Page `/what-we-do`

The **AI-implementation spine** is structurally central here.

1. **Hero** — `bg-ink`. `SectionHeader` (title) + intro + CTA. Current = **data-grid variant** (a faint grid `CurrentBackground`).
2. **Capability pillars** — `bg-paper`. 4–6 `CapabilityCard`s: title · desc · `sub[]` sub-capabilities · "Related sectors →" link. Grid `sm:grid-cols-2 lg:grid-cols-3`.
3. **AI & digital implementation layer (CENTRAL)** — `bg-ink`. Two columns:
   - Left: `aiImplementationLayer.intro` explanation.
   - Right: an **animated layered diagram** that builds **one layer at a time** on scroll: `Business problem → Data sources → Workflow design → AI support → Human decision → Implementation → Outcome measurement`. Implement as stacked rows connected by a vertical `CurrentLine`; each row reveals in sequence (stagger `STAGGER.step`) as the line draws past it. Human-decision and oversight steps visibly present (responsible-AI framing).
4. **Method — idea to implementation** — `bg-paper`. `StepCard` pathway with line-draw: Discover → Prioritise → Design → Implement → Measure.
5. **Engagement models** — `bg-ink`. 4 shadcn `Card`s: advisory sprint · strategy project · implementation support · ongoing partnership.
6. **Related sectors** — `bg-paper`. `SectorCard` links (from `whatWeDo.relatedSectors`).
7. **CTA band**.

---

## 17. Page `/sectors` + `/sectors/[slug]`

### 17.1 `/sectors` (landing) — `bg-ink` hero, alternate below
1. **Hero** — `SectionHeader` title + intro ("each sector faces different decisions").
2. **Sector grid** — `SectorCard`s **branching from a central Current node** (a central dot with `CurrentLine`s drawing outward to each card). Placeholder sectors (slugs): `electricity-networks · gas-distribution · water-utilities · renewable-developers · energy-retailers · infrastructure-investors · public-sector`. Grid `sm:grid-cols-2 lg:grid-cols-3`.
3. **Cross-sector themes** — connected map of: Decarbonisation · Asset resilience · Data quality · AI adoption · Regulation · Capital delivery (`CurrentLine`-connected chips).
4. **Sector decision map** — the key decisions leaders across sectors must get right (cards or a simple connected list).
5. **CTA band**.

### 17.2 `/sectors/[slug]` (reusable template — data-driven)
One template; **all** sectors render from a `Sector` object. The Current **recolours** to `sector.accent` (pass it to `CurrentLine` stroke / a tinted `CurrentBackground`).
1. **Sector hero** — `sector.name` + `sector.hero.statement`, sector-recoloured Current.
2. **Sector pressures** — 4–6 `PressureCard`s.
3. **Key decisions this sector needs to make** (consulting differentiator) — decision cards from `keyDecisions`.
4. **How we help** — 3-column mapping rows: `Challenge | Relevant capability | Outcome placeholder` from `howWeHelp`.
5. **AI/data opportunities** — `Card`s: `opportunity · data/workflow note · human-oversight note`.
6. **Relevant people** — 1–3 `PersonCard`s (resolve `relevantPeople` slugs against `people.leadership`) → `/people`.
7. **Related capabilities** — links to What-We-Do pillars.
8. **CTA band**.

**Scalability rule:** adding a sector = adding one object to `sectors.sectorList[]`. No new files. `generateStaticParams` picks it up.

---

## 18. Page `/people` (credibility engine)

1. **Hero** — `bg-ink`. `SectionHeader` (title) + "people-are-the-proof" intro + optional **local** group image (`next/image`, or omit). Leadership nodes sit inside the Current.
2. **Leadership grid** — `bg-paper`. `PersonCard`s (§13.7). **Local avatars or initials only.** Grid `sm:grid-cols-2 lg:grid-cols-3`.
3. **Areas of responsibility (MOST IMPORTANT)** — `bg-ink`. `ResponsibilityMap` (§13.8) connecting people → domains: energy transition strategy · AI & digital · utilities operations · regulation & policy · capital/infrastructure · commercial strategy.
4. **Decision-making philosophy** — `bg-paper`. 3–4 blocks: evidence-led judgement · responsible innovation · sector-informed thinking · implementation realism (icon + title + one-liner each).
5. **Advisory network (optional)** — only if `people.advisoryNetwork` provided; advisor placeholders.
6. **CTA band**.

**Wording guardrail (enforce in placeholder copy):** safe framing only — `‹experienced sector leader›`, `‹specialist in [domain]›`, `‹leads thinking across [area]›`, `‹responsible for guiding decisions in [area]›`. **Avoid** until client-verified: *world-leading, best-in-class, award-winning, globally recognised, unmatched expertise.*
**Empty-state:** if bios/photos aren't ready, use initials/silhouette cards; keep the page live as structure; **no fake names/numbers.**

---

## 19. Page `/contact`

1. **Hero** — `bg-ink`. Title + one line. Minimal Current.
2. **Quick routing options** — 4 cards from `contact.routingOptions`: discuss strategy · discuss AI/digital · discuss a sector challenge · speak to a specific person. (Each is a styled card; clicking pre-selects the matching "Area of interest" in the form, or just scrolls to it.)
3. **Form** — fields: Name · Organisation · Email · **Sector** (shadcn `Select`-style via native or a simple menu — **no carousel/switch**) · **Area of interest** (select) · Message · `[ Send ]`.
   - **Non-functional** (no backend). **Client-side validation only:** required fields, email contains `@`. On submit, show an inline success state ("‹what happens next›"); never POST anywhere.
   - Use shadcn `input`, `label`, `textarea`, `button`. (For selects, use a native `<select>` styled to match — do not add a new shadcn component beyond the approved list if it requires `switch`/carousel.)
4. **Direct details** — email / LinkedIn / location from `content.brand` (lucide `Mail`, `ExternalLink`, `MapPin`).
5. **Reassurance line** — `contact.reassurance`. Current **resolves into** the Send button.

---

## 20. Page `/insights` (flagged, optional)

Build the route but render gated on `flags.insightsEnabled` (default **false** → return `notFound()` and **omit from nav**). When enabled: Hero → Featured insight → Article grid (`category · title · excerpt · read time`) → Topic filters → optional newsletter. All placeholder; no external images.

---

## 21. Performance budget & guardrails

- **Hero text visible immediately** — never gate core copy behind animation/canvas load.
- **No layout shift** — pre-size every animated/canvas container (fixed min-heights, aspect boxes).
- **One heavy WebGL/canvas at a time.** Only Aurora uses WebGL; it appears on Home hero + Closing CTA. **Lazy-mount via IntersectionObserver and pause off-screen and on tab-hide** (already in §9.2). **DPR ≤ 2** (Aurora renders at 0.55×). 30fps cap on the shader.
- **Mobile** uses static/simplified Current; avoid the heavy Values scroll-mapping (< 768px → static, §14.3).
- **Every page fully usable with motion reduced/disabled** (full content, instant reveals).
- Pin the Next + Tailwind v4 + shadcn combo that installs cleanly; build inside the app folder.
- Non-functional forms = styled + validated only.
- Run `npm run build` and fix all type/lint errors before declaring done.

---

## 22. Accessibility requirements

- **Reduced motion:** `Reveal`, `CurrentLine`, `ValuesNetwork`, Aurora all respect `prefers-reduced-motion` (content shown, animation off).
- **Focus:** visible focus rings on all interactive elements (`focus-visible:ring-2 ring-energy`). Logical tab order. Mobile menu traps focus and restores it on close; `Esc` closes.
- **ARIA/semantics:** one `<h1>` per page; sections use proper heading levels; nav is `<nav aria-label="Primary">`; icon-only links/buttons have `aria-label`; decorative SVG/aurora `aria-hidden`.
- **Contrast:** body text meets **AA** against its surface (use the scrim over aurora; muted text not below `~/60` on its background).
- **Forms:** every field has a `<label>`; errors announced via `aria-describedby`; success state is readable text, not colour-only.
- **Images:** meaningful `alt`; decorative `alt=""`.
- Keyboard-operable nav dropdowns; no hover-only access to content.

---

## 23. Build order (phased)

**Phase A — Scaffold**
- create-next-app (TS, Tailwind v4, App Router, src) per §3.2; verify `npm run dev`.
- `shadcn init` + add the approved components only.
- Install `motion`, `three`, `lucide-react` (+ `@types/three`). **No** framer-motion / switch / carousel.
- Write `globals.css` `@theme` tokens (§5.2), fonts (§3.3), `lib/utils.ts`, `lib/motion.ts`.
- Author **`content.ts`** with the full placeholder structure (§10).
- Add local `/public` placeholders (avatars optional; OG placeholders).

**Phase B — Engines**
- `AuroraShaderBackground` (§9.2), `Reveal` (§9.1), `CurrentLine` + `CurrentBackground` (§9.3).

**Phase C — Global chrome**
- `SiteNav` (route-active tubelight) + `MobileNav` — **adapt `header-3` + `tubelight-navbar` from `Animations code.md` per §9A; rewrite `framer-motion`→`motion/react`; bind active state to `usePathname()`.**
- `Footer` — **adapt `footer-section` per §9A; remove the `Switch`; no Careers column.**
- Root `layout.tsx` + base metadata.

**Phase D — Pages (in order)**
- `/` (sections 1–12) → `/what-we-do` → `/sectors` → `/sectors/[slug]` template → `/people` → `/contact` → `/insights` (flagged).
- Build shared blocks (§13) as needed; the Values signature (§14) during Home.

**Phase E — Polish**
- Route wiring + active states; reduced-motion + mobile fallbacks; lazy-mount/pause canvases; performance budget (§21); responsive + a11y (§22); per-route metadata (§11.2).
- `npm run build` clean → `npm run dev -- -H 0.0.0.0 -p 3000` → report LAN URL.

---

## 24. Definition of done + validation gates

The build is done when **all** are true:

- [ ] Real routes live: `/`, `/what-we-do`, `/sectors`, `/sectors/[slug]`, `/people`, `/contact` (+ `/insights` only if flag on). No primary-nav anchors.
- [ ] **Hard gate (§2) fully respected** — none of the banned items exist anywhere.
- [ ] Credibility comes only from mission/why-now/values/people/method/sectors/AI logic.
- [ ] "The Current" applied **per page, contextually** (six behaviours, §8.2).
- [ ] **Values six-node** energy-network signature works (scroll-sequential; static on reduced-motion/mobile).
- [ ] Nav = sticky header + tubelight bound to **active route**; transparent→solid; mobile overlay with focus trap.
- [ ] **All** copy via `content.ts`; zero hard-coded demo strings.
- [ ] **All** images local; `next/image`; no external hotlinks.
- [ ] Per-route metadata placeholders; `generateMetadata`/`generateStaticParams` for `[slug]`; async `params` handled.
- [ ] Reduced-motion → full content + instant/static; mobile → simplified Current; hero text instant.
- [ ] Performance: one WebGL at a time, lazy-mount + pause off-screen/tab-hide, DPR ≤ 2, no layout shift.
- [ ] a11y: focus states, aria, AA contrast, keyboard nav, labelled forms.
- [ ] `npm run build` clean (no TS/lint errors).
- [ ] `npm run dev -- -H 0.0.0.0 -p 3000` serves on LAN; URL reported.

**Self-check before handing back:** grep the source for banned tokens — `framer-motion`, `unsplash`, `randomuser`, `githubusercontent`, `supabase`, `testimonial`, `case-stud`, `careers`, `Switch`, `StatCounter`, `count-up` — all must return **zero** matches in your code.

---

## 25. Client content needed before launch (handoff checklist)

Replace every `‹…›` with client-supplied copy before launch. The client must provide: final company name + logo · positioning statement · mission/purpose copy · six values + descriptions · leadership names, photos, roles, bios, LinkedIn · capability areas + descriptions · sector list + priority sectors · sector-specific challenges + key decisions · contact email, location, LinkedIn · whether Insights launches or stays hidden · legal/footer requirements.

---

*Primary deliverable. Pairs with `ENIRIQ_TECHNICAL_PROJECT_RECORD.md`. Frozen source of truth: `ENIRIQ_Build_Plan_FINAL.md` v2.1. Build to this document; where it specifies a value, use it.*
