# ENIRIQ — Build Plan FINAL (Frozen) · v2.1
### Energy-transition, utilities & AI consultancy · multi-page · animation-led · startup-safe

> **STATUS: FROZEN.** This is the single source of truth for the build. It supersedes `PLAN.md` and `BUILD_INSTRUCTIONS.md` on **all information-architecture and content decisions**. Those older files may be used **only** for non-conflicting technical detail (exact CLI commands, recolor maps, three.js notes).
>
> **Instruction to the build agent:**
> Build ENIRIQ as a **multi-page** Next.js site with **real routes** (Home, What We Do, Sectors + `[slug]`, People, Contact; Insights optional/hidden). Do **not** build a single long page. Obey §0A Non-negotiables. Credibility comes from **people, values, method and sector understanding** — never fake proof. Use **"the Current"** as one shared animation language that *restarts contextually per page*. All copy is placeholder (`‹…›`) and lives in `content.ts`; assemble pages from reusable components.

---

## 0A. Non-negotiables (do NOT reintroduce old established-firm proof)

The build agent must not build any of the following. If a harvested component contains them, **strip it to layout/animation only**:

- Single-page anchor navigation (use real routes)
- Trust / client-logo bar
- Hero stat strip / count-up of figures
- Impact-metrics band
- Case studies
- Testimonials
- Careers (page, section, or nav item)
- "Our Work" page or nav item
- Particle text intro
- Fake client names, fake awards, fake results, dummy statistics presented as real proof

(Reinforces §13. This list is the hard gate — when in doubt, leave it out.)

---

## 0B. Page purposes (one line each)

- **Home** — tell the short story and route users to deeper pages.
- **What We Do** — explain the capability model and the AI implementation spine.
- **Sectors** — help users self-identify by sector and see sector-specific decisions.
- **Sector detail** — pressures, key decisions, how we help, and relevant people for one sector.
- **People** — establish credibility through leadership, responsibility areas and decision-making philosophy.
- **Contact** — convert interest into a conversation with clear routing options.
- **Insights** — optional thought leadership; build only if publishing will be maintained.

---

## 1. Stack & tooling (retained from PLAN — proven combo)

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind v4 + CSS variables (shadcn tokens) — pin the known-good Next 15 + Tailwind v4 + shadcn combo |
| UI primitives | shadcn/ui (button, card, badge, accordion, navigation-menu, avatar, input, label, textarea, tooltip). **No** `switch`, **no** carousel |
| Animation | **`motion` only** (`motion/react`) — do NOT also install `framer-motion`. three.js for the shader background |
| Icons | lucide-react |
| Fonts | Inter / Geist (editorial weight range) |
| Routing | **Real Next.js routes** (multi-page), not `#anchor` scroll |
| Deploy (later) | Vercel; local: `next dev -H 0.0.0.0 -p 3000` for LAN device viewing |

Brand: **ENIRIQ**. App folder: `eniriq/`.

---

## 2. Brand & design system (palette retained from PLAN)

- `--background` deep slate/near-black (#0A0F0D); `--foreground` near-white (#F5F7F5)
- **Primary (energy green):** #16A34A → #10B981 · **Secondary (grid cyan):** #38BDF8 · **Amber (rare accent):** #D9A441
- Light sections on warm off-white (#F6F7F4), dark text (#16201C); glass surfaces `white/5` + `backdrop-blur` + `border-white/10`
- **Motion discipline:** one signature moment (Values node system); everything else calm reveal-on-scroll; transform/opacity only; honour `prefers-reduced-motion`; never delay the hero message.
- **Typography:** display headline, tight tracking + mask-reveal; relaxed muted body.

---

## 3. "The Current" — shared animation system

Connected **energy → data → AI-decision** line that is the brand spine. **Not literally continuous across routes** — the same motif restarts contextually per page:

| Page | Current behaviour |
|---|---|
| Home | Full journey: source → values → people → focus → branches → CTA |
| What We Do | Becomes a layered system diagram |
| Sectors | Branches into sector pathways |
| Sector detail | Adapts/recolours to that sector |
| People | Connects people nodes to responsibility areas |
| Contact | Resolves into the CTA |

Rules: scroll-triggered reveals, line-draw, node activation, light parallax, soft transitions, animated diagrams. Avoid multiple moving backgrounds, glowing-AI-brain clichés, random spins. Reduced-motion → static; mobile → simplified/static.

---

## 4. Site map, navigation & routes

**Nav:** `Home · What We Do · Sectors · People · Insights · Contact` + `[ Talk to us ]`
- Component: `header-3` sticky bar + `tubelight-navbar` indicator — adapted to **active route** highlighting. Transparent over hero → solid+blur+hairline on scroll. Mobile: portal overlay, staggered links.
- **Insights** hidden from nav until publishing. **Removed:** Careers, Our Work, Case Studies, Use Cases.

### Route structure (real routes — no primary-nav anchors)
- `/` — Home
- `/what-we-do` — What We Do
- `/sectors` — Sectors landing
- `/sectors/[slug]` — Reusable sector detail template
- `/people` — People
- `/contact` — Contact
- `/insights` — Optional, hidden unless publishing

Explicitly kill the old `#services / #work / #careers` anchor pattern.

---

## 5. Reusable components (build once)

`SectionHeader` · `ValueNode` · `PersonCard` · `CapabilityCard` · `SectorCard` · `FocusAreaCard` · `StepCard` · `PressureCard` · `ResponsibilityMap` · `CTABand` · `CurrentLine/CurrentBackground` · `AuroraShaderBackground` (three.js, green/teal). Content slot convention: `‹…›` = client fills later.

---

## 6. Harvested animation components — keep / repurpose / cut

| Supplied component | Decision | Where |
|---|---|---|
| `animated-shader-background` (aurora) | **Keep** — recolour green/teal | Home hero bg (+ low-opacity on Closing CTA) |
| `header-3` + `tubelight-navbar` | **Keep** — adapt to multi-page routes | Global nav |
| `spotlight-card` GlowCard grid | **Keep** | What We Do pillars, Focus areas, capability teasers |
| `radial-orbital-timeline` | **Repurpose** — **redesign as an energy/data network, NOT a space/orbit/SaaS animation** (connected infrastructure + decision nodes) | Values 6-node signature |
| shadcn `accordion` | **Keep** | Sectors landing segments |
| `team-section` | **Keep** — local avatars | People page + Home people teaser |
| `footer-section` | **Keep** — drop dark toggle & Careers | Footer |
| `glassmorphism-trust-hero` | **Layout only** — drop stat strip & "Trusted by" marquee | Home hero layout |
| `StatCounter` · `container-scroll-animation` · `gallery4` · `testimonials-columns-1` · trust marquee · `ParticleTextEffect` intro · three.js globe | **Cut** (tied to removed proof; globe optional ambient only) | — |

---

## 7. PAGE `/` — Home (story → routes to depth)

1. **Nav**
2. **Hero** — `‹eyebrow›` · `‹H1 mission line›` · `‹subline›` · `[ Talk to us ]` · `‹See what we do›`. Bg = recoloured aurora + dark scrim. **No stats/logos/count-up.**
3. **Purpose / mission** — `‹title›` · `‹2–3 sentence mission›` · `‹optional belief line›`. Current flows quietly behind.
4. **Why this matters now** — `‹title›` + 4 `PressureCard`s: `‹transition›` · `‹AI-adoption›` · `‹legacy-infrastructure›` · `‹regulatory/investment›`. Current fragments under pressure, then reconnects into Values.
5. **Values — six animated nodes** *(signature, §12)* — 6 `ValueNode`s: `‹Innovation›` · `‹Responsibility›` · `‹Practicality›` · `‹Sector expertise›` · `‹Partnership›` · `‹Long-term impact›`.
6. **People teaser** — `‹title›` · `‹leadership statement›` · 3–6 `PersonCard`s → `/people`. Current carries from Values into people.
7. **Focus areas** — `‹title›` + 4–7 `FocusAreaCard`s (exploration-framed; never "use cases/solutions/proven outcomes"). Current branches.
8. **What We Do teaser** — 4–6 `CapabilityCard`s → `/what-we-do`. Stacked layers.
9. **Sectors teaser** — `SectorCard` row → `/sectors`. Current splits into branches.
10. **How we work teaser** — 4 `StepCard`s: `‹Understand → Diagnose → Design → Guide implementation›`; line-draw.
11. **Closing CTA** — `CTABand`: `‹heading›` · `‹line›` · `[ Talk to us ]`. Current resolves into the button.
12. **Footer**

---

## 8. PAGE `/what-we-do` (AI spine central)

1. **Hero** — `‹title›` · `‹intro›` · `‹CTA›` (data-grid Current variant).
2. **Capability pillars** — 4–6 `CapabilityCard`s: `‹title›` · `‹desc›` · `‹sub-capabilities›` · `‹related sectors link›`.
3. **AI & digital implementation layer** *(structurally central)* — left `‹explanation›`, right an animated layered diagram building one layer at a time: `Business problem → Data sources → Workflow design → AI support → Human decision → Implementation → Outcome measurement`.
4. **Method — idea to implementation** — `StepCard` pathway `‹Discover → Prioritise → Design → Implement → Measure›`, line-draw.
5. **Engagement models** — `Card`s: `‹advisory sprint›` · `‹strategy project›` · `‹implementation support›` · `‹ongoing partnership›`.
6. **Related sectors** — `SectorCard` links.
7. **CTA band.**

---

## 9. PAGE `/sectors` (landing) + `/sectors/[slug]` (template)

### Sectors landing
1. **Hero** — `‹title›` · `‹intro: each sector faces different decisions›`.
2. **Sector grid** — `SectorCard`s branching from a central Current node (placeholder sectors): Electricity networks · Gas distribution · Water utilities · Renewable developers · Energy retailers · Infrastructure investors · Public sector/regulators.
3. **Cross-sector themes** — connected map: Decarbonisation · Asset resilience · Data quality · AI adoption · Regulation · Capital delivery.
4. **Sector decision map** — the key decisions leaders across sectors must get right.
5. **CTA band.**

### Sector detail — reusable template
1. **Sector hero** — `‹sector name›` · `‹statement›` (sector-recoloured Current).
2. **Sector pressures** — 4–6 `PressureCard`s.
3. **Key decisions this sector needs to make** *(consulting differentiator)* — `‹decision cards›`.
4. **How we help** — mapping `‹Challenge› | ‹Relevant capability› | ‹Outcome placeholder›`.
5. **AI/data opportunities** — `Card`s: `‹opportunity›` · `‹data/workflow note›` · `‹human-oversight note›`.
6. **Relevant people** — 1–3 `PersonCard`s → `/people`.
7. **Related capabilities** — links to What We Do pillars.
8. **CTA band.**

### Sector template scalability rule
All sector pages use the **same template + data model**; new sectors are added by editing `content.ts` only. Each sector object: `slug · name · hero · pressures · keyDecisions · howWeHelp · aiDataOpportunities · relevantPeople · relatedCapabilities · cta`.

---

## 10. PAGE `/people` (credibility engine)

1. **Hero** — `‹title›` · `‹people-are-the-proof intro›` · `‹optional group image›`. Leadership nodes inside the Current.
2. **Leadership grid** — `PersonCard`s: `‹photo› ‹name› ‹role› ‹specialism› ‹short bio› ‹LinkedIn› ‹responsibility area›`. Local placeholder avatars only.
3. **Areas of responsibility** *(most important)* — `ResponsibilityMap` connecting people → domains: `‹energy transition strategy›` · `‹AI & digital›` · `‹utilities operations›` · `‹regulation & policy›` · `‹capital/infrastructure›` · `‹commercial strategy›`.
4. **Decision-making philosophy** — 3–4 blocks: `‹evidence-led judgement›` · `‹responsible innovation›` · `‹sector-informed thinking›` · `‹implementation realism›`.
5. **Advisory network** *(optional)* — advisor placeholders; include only if expected.
6. **CTA band.**

### People wording guardrail
Structure may position the team as experienced leaders/specialists, but final copy must be supported by client bios. Safe placeholder framing: `‹experienced sector leader›` · `‹specialist in [domain]›` · `‹leads thinking across [area]›` · `‹responsible for guiding decisions in [area]›`. **Avoid until verified:** world-leading, best-in-class, award-winning, globally recognised, unmatched expertise.

### People placeholder handling (startup empty-state)
If bios/photos aren't ready: use abstract cards, initials, or silhouette placeholders; keep the page live as structure; **no fake names**. Each card shows `‹Name› ‹Role› ‹Specialism› ‹Responsibility area› ‹Bio placeholder› ‹LinkedIn placeholder›`.

---

## 11. PAGE `/contact` · PAGE `/insights` (optional)

**Contact**
1. **Hero** — `‹title›` · `‹one line›` (minimal Current).
2. **Quick routing options** — `‹discuss strategy›` · `‹discuss AI/digital›` · `‹discuss a sector challenge›` · `‹speak to a specific person›`.
3. **Form** — Name · Organisation · Email · Sector ‹select› · Area of interest ‹select› · Message · `[ Send ]` (styled + client-side validated, **non-functional**, no backend).
4. **Direct details** — `‹email› ‹LinkedIn› ‹location›`.
5. **Reassurance line** — `‹what happens next›`.

**Insights (behind a flag; hidden from nav otherwise):** Hero → Featured insight → Article grid (`‹category›‹title›‹excerpt›‹read time›`) → Topic filters → optional newsletter.

---

## 12. Values — six-node signature animation (detail)

The company's "operating system," using a repurposed `radial-orbital-timeline` (contained, not full-screen).
- **Redesign the visual language to read as an energy/data network — connected infrastructure and decision nodes, NOT a space/orbit or SaaS-dashboard animation.**
- 6 `ValueNode`s on a connected grid; the Current activates them **in sequence on scroll progress** (not a timer): Node 1 pulses → line travels → Node 2 … → Node 6, each revealing `‹title›` + `‹one-line›` + icon.
- Each value visibly **distinct** (own icon/accent) yet **linked** (same line).
- Reduced-motion / mobile → all six render statically at once.

---

## 13. Removed from MVP (reconciled — see §0A gate)

Trust-logo bar · hero stat count-up · impact band · case studies · testimonials · careers · "Our Work" nav · client logos · particle intro · dark toggle · globe (optional ambient only). **Replacement credibility:** `Mission → Why now → Values → People → Method → Sectors`. Add removed items later **only when real**.

---

## 14. content.ts — content architecture (placeholder data only)

Centralise all copy/data here, organised by page/component; every value stays placeholder (`‹…›`). This prevents the old fake ENIRIQ stats/names/cases/testimonials from creeping back in.

```
brand
nav
home: { hero, purpose, pressures, values[6], peopleTeaser, focusAreas,
        capabilitiesTeaser, sectorsTeaser, howWeWorkTeaser, closingCTA }
whatWeDo: { hero, capabilityPillars, aiImplementationLayer, method,
            engagementModels, relatedSectors }
sectors: { landing, sectorList[], sectorDetailTemplate }
  sectorList[] item: { slug, name, hero, pressures, keyDecisions, howWeHelp,
                       aiDataOpportunities, relevantPeople, relatedCapabilities, cta }
people: { hero, leadership[], responsibilities, philosophy, advisoryNetwork? }
contact: { hero, routingOptions, formFields, directDetails, reassurance }
insights?: { ... }   // behind flag
```

---

## 15. SEO / metadata placeholders (per route)

Each route exports Next.js metadata placeholders (no final SEO copy until client positioning arrives):
- Title: `‹page-specific title› | ENIRIQ`
- Description: `‹one-sentence page description›`
- Open Graph title/image placeholders · canonical URL placeholder
- Sitemap-ready route structure (important for `/sectors/[slug]`)

---

## 16. Adaptation rules (Next.js)

Real routes (not anchors). Standardise on `motion/react` (rewrite any `framer-motion` imports; don't install it). Local `/public` images via `next/image`; strip all demo URLs (supabase/unsplash/randomuser/githubusercontent). `"use client"` on interactive/animated components; pages compose them; shadcn imports resolve to `components/ui/*`. Recolour every supplied component → ENIRIQ palette; recolour the aurora shader green/teal. Zero hard-coded demo strings — everything via `content.ts`.

---

## 17. Performance budget & guardrails

- Hero text visible immediately; no animation blocks core content.
- **No layout shift** from animated sections (pre-size containers).
- **Only one heavy WebGL/canvas element runs at a time**; lazy-mount via IntersectionObserver, pause off-screen, cap DPR ≤2.
- Mobile uses static/simplified Current visuals.
- Every page remains usable with animation reduced/disabled (reduced-motion = full content, instant reveals).
- Pin Next 15 + Tailwind v4 + shadcn to the known-good combo; build inside `eniriq/`; non-functional forms are styled + validated only.

---

## 18. Build order (phased, multi-page)

**A — Scaffold:** create-next-app (TS, Tailwind v4, App Router, src) at `eniriq/`; init shadcn; install `motion`, three, lucide-react (+ shadcn adds, no `switch`/carousel); theme tokens + global CSS; `lib/utils.ts`; `content.ts` (per §14, placeholder only); local `/public` placeholder assets.
**B — Engines:** `AuroraShaderBackground` (recoloured, resize-safe, reduced-motion → static); `CurrentLine/CurrentBackground` primitive.
**C — Global:** `SiteNav` (header-3 + tubelight, route-active, mobile overlay); `Footer` (no toggle/careers); shared layout + per-route metadata (§15).
**D — Pages:** `/` (sections 1–12) → `/what-we-do` → `/sectors` → `/sectors/[slug]` template → `/people` → `/contact` → `/insights` (flag).
**E — Polish:** route wiring + active states; reduced-motion + mobile fallbacks; lazy-mount canvases; performance budget (§17); responsive + a11y (focus, aria, AA); `next build` clean; `next dev -H 0.0.0.0 -p 3000` → report LAN URL.

---

## 19. Done =

Multi-page site live (Home · What We Do · Sectors + `[slug]` template · People · Contact; Insights optional/hidden); §0A non-negotiables all respected; the Current applied per page (contextual); Values 6-node energy-network signature working; nav = sticky header-3 + tubelight route indicator; **no** fake proof anywhere; all images local; placeholder copy only in `content.ts`; per-route metadata placeholders; reduced-motion + mobile safe; performance budget met; `next build` clean; `next dev -H 0.0.0.0 -p 3000` live on LAN. Vercel deploy deferred.

---

## 20. Client content needed before launch (handoff checklist)

The client must provide: final company name + logo · positioning statement · mission/purpose copy · six values + descriptions · leadership names, photos, roles, bios, LinkedIn · capability areas + descriptions · sector list + priority sectors · sector-specific challenges + key decisions · contact email, location, LinkedIn · whether Insights launches or stays hidden · legal/footer requirements.

---

*Frozen. Replace every `‹…›` placeholder with client-supplied copy before launch. Technical detail (exact commands, recolor maps) may be drawn from the old BUILD_INSTRUCTIONS only where it does not contradict this file.*
