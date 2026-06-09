import type { Metadata } from "next";
import Link from "next/link";
import { CapabilityCard } from "@/components/blocks/CapabilityCard";
import { CTABand } from "@/components/blocks/CTABand";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { SectorCard } from "@/components/blocks/SectorCard";
import { WwdPipeline } from "@/components/blocks/WwdPipeline";
import { WwdEngagementCard } from "@/components/blocks/WwdEngagementCard";
import { GlowCard } from "@/components/fx/GlowCard";
import { Reveal } from "@/components/fx/Reveal";
import { CurrentBackground } from "@/components/fx/CurrentBackground";
import { CurrentLine } from "@/components/fx/CurrentLine";
import { meta, sectors, ui, whatWeDo } from "@/content";

export const metadata: Metadata = {
  title: meta.whatWeDo.title,
  description: meta.whatWeDo.description,
  openGraph: { title: meta.whatWeDo.title },
  alternates: { canonical: "/what-we-do" },
};

export default function WhatWeDoPage() {
  const related = sectors.sectorList.filter((sector) =>
    whatWeDo.relatedSectors.includes(sector.slug)
  );

  return (
    <>
      {/* ── 1. HERO (always dark) ──────────────────────────────────────────── */}
      <section className="dark relative overflow-hidden bg-ink pt-36 text-mist">
        <CurrentBackground className="grid-current" />

        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[700px] -translate-x-1/2 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(24,226,123,0.35) 0%, rgba(31,227,207,0.15) 45%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="container-eneriq relative z-10 pb-24 pt-16">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-energy">
              {ui.whatWeDoSections.heroEyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.07}>
            <h1 className="max-w-4xl text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-tight">
              <span className="text-gradient">{whatWeDo.hero.title}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist/70 md:text-lg">
              {whatWeDo.hero.intro}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={whatWeDo.hero.cta.href}
                className="inline-flex rounded-full bg-gradient-to-r from-energy via-energy-bright to-cyan px-7 py-3 font-semibold text-ink transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {whatWeDo.hero.cta.label}
              </Link>
            </div>
          </Reveal>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #060A09)" }}
          aria-hidden
        />
      </section>

      {/* ── 2. CAPABILITY PILLARS (editorial — flips) ──────────────────────── */}
      <section className="bg-surface-2 py-24 lg:py-32">
        <div className="container-eneriq">
          <Reveal>
            <SectionHeader
              title={ui.whatWeDoSections.pillarsTitle}
              intro={ui.whatWeDoSections.pillarsIntro}
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.capabilityPillars.map((capability, index) => (
              <Reveal key={capability.title} delay={index * 0.06}>
                <CapabilityCard capability={capability} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. AI IMPLEMENTATION LAYER — WwdPipeline (always dark) ─────────── */}
      <section className="dark relative overflow-hidden bg-ink text-mist">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 48px)",
          }}
          aria-hidden
        />

        <WwdPipeline
          layers={whatWeDo.aiImplementationLayer.layers}
          intro={whatWeDo.aiImplementationLayer.intro}
          eyebrow={ui.whatWeDoSections.aiEyebrow}
          title={ui.whatWeDoSections.aiTitle}
        />
      </section>

      {/* ── 4. METHOD (editorial — flips) ──────────────────────────────────── */}
      <section className="bg-surface-2 py-24 lg:py-32">
        <div className="container-eneriq">
          <Reveal>
            <SectionHeader
              title={ui.whatWeDoSections.methodTitle}
              intro={ui.whatWeDoSections.methodIntro}
            />
          </Reveal>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-[4%] right-[4%] top-[2.25rem] hidden h-px lg:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(24,226,123,0.12), rgba(24,226,123,0.35) 30%, rgba(31,227,207,0.35) 70%, rgba(31,227,207,0.12))",
              }}
              aria-hidden
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {whatWeDo.method.map((step, index) => (
                <Reveal key={step.id} delay={index * 0.08}>
                  <article className="relative rounded-2xl border border-hairline bg-panel p-6 text-content shadow-sm">
                    <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-energy/25 bg-energy/10 font-mono text-xs font-semibold text-accent-ink">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-content">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-content-muted">{step.desc}</p>

                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl opacity-40"
                      style={{
                        background: `linear-gradient(to right, rgba(24,226,123,${0.4 + index * 0.12}), rgba(31,227,207,0.6))`,
                      }}
                      aria-hidden
                    />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. ENGAGEMENT MODELS (editorial — flips) ────────────────────────── */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-eneriq">
          <Reveal>
            <SectionHeader
              title={ui.whatWeDoSections.engagementTitle}
              intro={ui.whatWeDoSections.engagementIntro}
            />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.engagementModels.map((model, index) => (
              <WwdEngagementCard key={model.title} model={model} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. RELATED SECTORS (editorial — flips) ─────────────────────────── */}
      <section className="bg-surface-2 py-24 lg:py-32">
        <div className="container-eneriq">
          <Reveal>
            <SectionHeader
              title={ui.whatWeDoSections.relatedTitle}
              intro={ui.whatWeDoSections.relatedIntro}
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA BAND (always dark) ───────────────────────────────────────── */}
      <CTABand
        heading={ui.whatWeDoSections.ctaHeading}
        line={ui.whatWeDoSections.ctaLine}
        cta={whatWeDo.hero.cta}
      />
    </>
  );
}
