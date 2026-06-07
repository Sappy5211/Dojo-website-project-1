# ENIRIQ — Technical Project Record

> **Internal planning reference.** Architecture decisions, assumptions, dependencies, constraints and build logic for the ENIRIQ website rebuild. This is the *companion* to `ENIRIQ_BUILD_HANDOVER.md` — the handover is the executable brief; this file is the rationale and the decision log.
>
> **Status:** Planning complete · Build not started · Handover ready
> **Authored:** for a fresh build agent with zero prior context.

---

## 1. Project summary

**ENIRIQ** is an early-stage consultancy operating at the intersection of **energy transition, utilities, and AI/digital implementation**. It advises utilities, networks, renewable developers, investors and the public sector on how to plan, decide and *implement* the move to a working clean-energy system — with applied AI/data as a structural part of how that gets delivered.

We are building **ENIRIQ's primary marketing website**: a **multi-page, animation-led, startup-safe** site that earns trust through *substance* (mission, why-now context, values, people, method, sector understanding, and a clear AI-implementation logic) rather than through borrowed-credibility props (logos, stats, case studies).

The defining creative device is **"the Current"** — one shared animation language representing the flow of **energy → data → AI-supported decision → implementation** — which *restarts contextually on every page* rather than literally persisting across routes.

Because ENIRIQ is early-stage, **all copy is placeholder** (`‹…›`) and centralised in `content.ts`. The build must look finished and premium while containing zero invented facts.

---

## 2. Source-of-truth hierarchy

1. **`ENIRIQ_Build_Plan_FINAL.md` (v2.1, FROZEN)** — authoritative for **information architecture, page structure, content rules, and startup-safe positioning**. When anything conflicts, this file wins.
2. **`ENIRIQ_BUILD_HANDOVER.md`** (this package) — authoritative for **technical execution**: exact stack, file layout, component contracts, motion specs, colours, code patterns and validation gates. It operationalises the FINAL plan and must never contradict it.
3. **`ENIRIQ_HARVESTED_COMPONENTS.md` (in this folder)** — the **curated, cleaned, copy-ready source** for only the components the build keeps/repurposes (`GlowCard`, `tubelight-navbar`, `header-3`, `team-section`, `footer-section`, and the `radial-orbital-timeline` conceptual donor). Extracted from the original `Animations code.md`, un-escaped, with per-block adaptation notes. This is *technical source material*, not an IA authority; the handover **§9A** maps it. (The original raw `Animations code.md` in `~/Downloads/` is no longer required — banned-proof components were intentionally excluded.)
4. **`PLAN.md` / `BUILD_INSTRUCTIONS.md` (older)** — usable **only** for *non-conflicting technical detail* (CLI commands, the palette `@theme` block, the GlowCard spotlight mechanism, three.js resize/dispose notes). **`BUILD_INSTRUCTIONS.md` is the superseded single-page runbook** — its IA and its component recipe table keep banned proof items; **discard its IA**, mine its recipes only.
5. **The existing `eniriq/` build in this folder** — it implements the *old, superseded* single-page concept (trust bar, stats, case studies, testimonials, careers, particle intro, globe). **Do not treat it as the target.** It is useful only as a *technical donor* for proven, non-conflicting engine code (the perf-hardened aurora shader, the Reveal pattern, IntersectionObserver/rAF performance techniques). Its `Approach.tsx` is an *orbital* timeline — wrong aesthetic for Values; reference its mechanics only.

---

## 3. Product constraints (non-negotiable)

- **Multi-page site** with **real Next.js routes** — never a single-page anchor-scroll site.
- **Placeholder-only content** — every string is `‹…›`, all of it in `content.ts`. No hard-coded demo strings in components.
- **No fake proof of any kind:** no trust/client-logo bar, no client names, no hero stat strip / count-ups, no impact-metrics band, no case studies, no testimonials, no fake awards, no fake outcomes, no invented statistics.
- **People-led credibility.** Trust comes from: mission → why-now → values → people → method → sectors → AI logic.
- **No Careers** (page, section, or nav item). **No "Our Work."**
- **Insights is optional** and **hidden behind a flag / removed from nav** unless publishing will actually be maintained.
- **No particle intro.** **Globe only if** purely ambient and non-proof-like (default: omit).
- **No external image hotlinks** — all images local in `/public`.
- **`motion/react` only** — never install or import `framer-motion`.
- **No shadcn `switch`, no carousel.**
- **Reduced-motion and mobile** must render full content with animation simplified/disabled.

---

## 4. Technical stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Plan targets **Next 15**. **Proven local env = Next 16.2.7 / React 19.2.4.** See §10 risk + handover §3. |
| Styling | **Tailwind v4** + CSS variables | Tailwind v4 uses `@import "tailwindcss"` + `@theme` in `globals.css`. **No `tailwind.config.js`** for tokens. |
| UI primitives | **shadcn/ui** | `button, card, badge, accordion, navigation-menu, avatar, input, label, textarea, tooltip`. **No `switch`, no carousel.** |
| Animation | **`motion` (`motion/react`) only** | Never `framer-motion`. |
| 3D / shader | **three.js** | *Only* for the recoloured aurora background. Nothing else WebGL by default. |
| Icons | **lucide-react** | Note: some icon exports vary by version — `Linkedin` may be unavailable; fall back to `ExternalLink`. |
| Fonts | **Geist** (or Inter) | Editorial weight range; display + body. Loaded via `next/font`. |
| Images | Local `/public` via `next/image` | Strip every supabase/unsplash/randomuser/githubusercontent URL. |
| Routing | **Real routes** | No primary-nav `#anchor` scrolling. |
| Local serve | `next dev -H 0.0.0.0 -p 3000` | For LAN device viewing. |
| Deploy | Vercel (deferred) | Not part of this build. |

---

## 5. Route inventory

| Route | Type | Status |
|---|---|---|
| `/` | Home | Required |
| `/what-we-do` | Static page | Required |
| `/sectors` | Sectors landing | Required |
| `/sectors/[slug]` | Dynamic template (one template, data-driven) | Required |
| `/people` | People | Required |
| `/contact` | Contact | Required |
| `/insights` | Optional | **Behind flag; hidden from nav** unless publishing |

`generateStaticParams` for `/sectors/[slug]` is derived from `content.ts → sectors.sectorList[]`. Sitemap-ready.

---

## 6. Page purpose map

- **`/` Home** — tell the short story and route users to deeper pages.
- **`/what-we-do`** — explain the capability model and the **AI-implementation spine** (structurally central).
- **`/sectors`** — help users self-identify by sector and see sector-specific decisions.
- **`/sectors/[slug]`** — pressures, key decisions, how we help, AI/data opportunities, and relevant people for one sector.
- **`/people`** — establish credibility via leadership, responsibility areas and decision-making philosophy.
- **`/contact`** — convert interest into a conversation with clear routing options (non-functional form).
- **`/insights`** — optional thought leadership; build only if it will be maintained.

---

## 7. Component inventory

**Engines / primitives**
- `AuroraShaderBackground` — three.js green/teal aurora; perf-hardened (DPR cap, 30fps, IntersectionObserver + visibility pause, reduced-motion static).
- `CurrentLine` / `CurrentBackground` — the SVG "Current" connector (scroll-drawn path + nodes); the shared motif primitive.
- `Reveal` — reduced-motion-aware scroll reveal wrapper (`whileInView`, `once`).

**Layout / global**
- `SiteNav` — sticky header + tubelight indicator, **route-active** (not scroll-spy), transparent-over-hero → solid+blur on scroll.
- `MobileNav` — portal overlay, staggered links.
- `Footer` — no dark toggle, no Careers.

**Content building blocks**
- `SectionHeader` — eyebrow + heading + optional intro, consistent rhythm.
- `ValueNode` + `ValuesNetwork` — the six-node **signature** energy/data network (scroll-progress sequential activation).
- `PersonCard` — local avatar/initials, role, specialism, bio, responsibility chip, LinkedIn.
- `CapabilityCard` — spotlight/glow card for What-We-Do pillars & capability teasers.
- `SectorCard` — sector entry, branches from a Current node.
- `FocusAreaCard` — exploration-framed focus areas (Home).
- `StepCard` — method steps with line-draw connector.
- `PressureCard` — "why now" / sector pressures.
- `ResponsibilityMap` — connects people ↔ responsibility domains (People page).
- `CTABand` — closing call-to-action band; Current resolves into the button.

---

## 8. Animation system notes — "the Current"

A single connected **energy → data → AI-decision** line is the brand spine. It is **not literally continuous across routes**; the same motif **restarts contextually per page**:

| Page | Current behaviour |
|---|---|
| **Home** | Full journey: source → values → people → focus → branches → CTA |
| **What We Do** | Becomes a layered **system diagram** (data-grid variant) |
| **Sectors** | **Branches** into sector pathways from a central node |
| **Sector detail** | Adapts / **recolours** to that sector |
| **People** | Connects **people nodes → responsibility areas** |
| **Contact** | **Resolves** into the CTA |

**Mechanics:** scroll-triggered reveals, SVG line-draw (`pathLength` 0→1), node activation (pulse/scale), light parallax, soft transitions, animated diagrams. **transform/opacity only.**
**Banned:** multiple moving backgrounds at once, glowing-AI-brain clichés, random spins, orbit/space/SaaS-dashboard aesthetics.
**Signature exception:** the Values six-node network is the *one* heavier signature moment; everything else is calm reveal-on-scroll.
**Fallbacks:** `prefers-reduced-motion` → static, fully drawn, all nodes shown; mobile → simplified/static Current.

---

## 9. Content model summary (`content.ts`)

All copy/data centralised, organised by page/component; every value is placeholder (`‹…›`).

```
brand            // name, tagline, contact stubs, social
nav              // route labels + hrefs (Insights conditional)
home: { hero, purpose, pressures[4], values[6], peopleTeaser,
        focusAreas[4-7], capabilitiesTeaser[4-6], sectorsTeaser,
        howWeWorkTeaser[4], closingCTA }
whatWeDo: { hero, capabilityPillars[4-6], aiImplementationLayer,
            method[5], engagementModels[4], relatedSectors }
sectors: { landing, sectorList[], sectorDetailTemplateLabels }
  sectorList[] item: { slug, name, hero, pressures, keyDecisions,
                       howWeHelp, aiDataOpportunities, relevantPeople,
                       relatedCapabilities, cta }
people: { hero, leadership[], responsibilities, philosophy[3-4],
          advisoryNetwork? }
contact: { hero, routingOptions[4], formFields, directDetails, reassurance }
insights?: { hero, featured, articles[], topics }   // behind flag
flags: { insightsEnabled: boolean }
```

Single source of truth prevents the old fake stats/names/cases from creeping back in. Adding a new sector = adding one object to `sectorList[]` (no new files).

---

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| **WebGL performance** (aurora) | One heavy canvas at a time; lazy-mount via IntersectionObserver; **pause off-screen and on tab-hide**; DPR ≤ 2 (render the aurora at ~0.55×); 30fps cap; reduced-motion → static. Use the perf-hardened component from the donor build. |
| **Over-animation** | Motion discipline: one signature (Values); all else calm reveal. transform/opacity only. No competing backgrounds. |
| **Fake-proof regression** | §3 hard gate. If a harvested component contains proof props, **strip to layout/animation only.** No stats/logos/cases/testimonials/awards anywhere. |
| **Old-plan contamination** | The existing `eniriq/` build is the *wrong* concept. Treat it as a code donor only. FINAL plan wins. Scaffold fresh (see handover §3). |
| **Next version drift** | Plan says 15; local proven env is **16.2.7 / React 19**. `create-next-app@latest` installs latest. **Verify version, read `node_modules/next/dist/docs/` (AGENTS.md convention), and handle async `params`/`generateMetadata`.** |
| **Mobile fallback** | Simplified/static Current; single-column layouts; no heavy canvas on small screens; hero text never animation-gated. |
| **Accessibility** | Honour reduced-motion (full content, instant reveals); visible focus states; aria labels on nav/icons/form; AA contrast; semantic headings; keyboard-navigable menus. |
| **Placeholder content** | Keep `‹…›` markers obvious but design must still read as finished. No invented names/numbers. People page has an empty-state path (initials/silhouette). |

---

## 11. Refinements made to the FINAL plan (decision log)

These are *technical* clarifications layered on top of the frozen plan; none alter its IA or content rules.

1. **Version reality:** documented the Next 16 / React 19 proven env alongside the plan's "Next 15," with concrete gotchas (async `params`, async `generateMetadata`, `next/font`).
2. **Concrete motion tokens:** fixed easing curves, durations, stagger and reveal offsets (handover §7) so the build agent makes no motion guesses.
3. **Exact colour tokens** as Tailwind v4 `@theme` variables (handover §5), including a named `--color-cyan` (plan's "grid cyan") and `--color-amber`.
4. **The Current implemented as SVG `pathLength`** primitives (`CurrentLine`/`CurrentBackground`) with a documented per-page contract, rather than left abstract.
5. **Values network defined as a scroll-progress sequential SVG network** (sticky-section `useScroll` thresholds), explicitly *not* the donor's orbital/timer animation.
6. **Aurora = the perf-hardened variant** (14-iter shader, 0.55× render scale, 30fps, IO + visibility pause) carried from the donor build, not the naive 28-iter version.
7. **lucide `Linkedin` caveat** → use `ExternalLink`.
8. **Fresh scaffold** recommended (donor build kept for reference), to avoid old-concept contamination.
9. **Harvest map added (handover §9A):** every component in `Animations code.md` mapped to keep/repurpose/cut for the *multi-page* architecture, with `framer-motion`→`motion/react` rewrites flagged (`tubelight-navbar`, `header-3`/`MobileMenu`), `Switch` removal (`footer-section`), and demo-URL stripping (`team-section`). The old runbook's recipe table was **not** reused (it keeps banned proof).
10. **GlowCard hue-pinning:** the source maps glow hue to cursor X (drifts to magenta); constrained to green→cyan for brand consistency (handover §13.2).

---

## 12. Build validation checklist

Before the build is considered ready:

- [ ] Multi-page with **real routes**: `/`, `/what-we-do`, `/sectors`, `/sectors/[slug]`, `/people`, `/contact` (+ `/insights` only if flag on).
- [ ] **Zero** items from the §3 hard gate present anywhere.
- [ ] Credibility comes only from mission/why-now/values/people/method/sectors/AI logic.
- [ ] "The Current" applied **per page, contextually** (six behaviours, §8).
- [ ] **Values six-node** energy-network signature works (sequential activation; static fallback).
- [ ] Nav = sticky header + tubelight indicator bound to **active route**; transparent→solid; mobile overlay.
- [ ] All copy is placeholder and lives in `content.ts`; **no hard-coded demo strings**.
- [ ] All images local in `/public`; no external hotlinks; `next/image` used.
- [ ] Per-route metadata placeholders (`generateMetadata` where dynamic).
- [ ] `prefers-reduced-motion` → full content, instant/static; **mobile** simplified Current.
- [ ] Performance budget met: hero text instant; no layout shift; one WebGL at a time; lazy-mount + pause; DPR ≤ 2.
- [ ] a11y: focus states, aria, AA contrast, keyboard nav.
- [ ] `next build` clean (no type/lint errors).
- [ ] `next dev -H 0.0.0.0 -p 3000` serves on LAN; report URL.

---

*Companion file: `ENIRIQ_BUILD_HANDOVER.md` (primary, executable). Frozen source: `ENIRIQ_Build_Plan_FINAL.md` v2.1.*
