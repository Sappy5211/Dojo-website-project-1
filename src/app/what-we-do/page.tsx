import type { Metadata } from "next";
import { CapabilityCard } from "@/components/blocks/CapabilityCard";
import { CTABand } from "@/components/blocks/CTABand";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { SectorCard } from "@/components/blocks/SectorCard";
import { StepCard } from "@/components/blocks/StepCard";
import { CurrentBackground } from "@/components/fx/CurrentBackground";
import { CurrentLine } from "@/components/fx/CurrentLine";
import { meta, sectors, ui, whatWeDo } from "@/content";

export const metadata: Metadata = {
  title: meta.whatWeDo.title,
  description: meta.whatWeDo.description,
  openGraph: { title: meta.whatWeDo.title, images: ["/og/what-we-do.png"] },
  alternates: { canonical: "/what-we-do" },
};

export default function WhatWeDoPage() {
  const related = sectors.sectorList.filter((sector) => whatWeDo.relatedSectors.includes(sector.slug));

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-mist">
        <CurrentBackground className="grid-current" />
        <div className="container-eneriq relative z-10 py-24">
          <SectionHeader eyebrow={ui.whatWeDoSections.heroEyebrow} title={whatWeDo.hero.title} intro={whatWeDo.hero.intro} />
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.whatWeDoSections.pillarsTitle} intro={ui.whatWeDoSections.pillarsIntro} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.capabilityPillars.map((capability, index) => <CapabilityCard key={capability.title} capability={capability} index={index} light />)}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow={ui.whatWeDoSections.aiEyebrow} title={ui.whatWeDoSections.aiTitle} intro={whatWeDo.aiImplementationLayer.intro} />
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <CurrentLine className="absolute left-10 top-10 h-[calc(100%-5rem)] w-20 opacity-70" d="M20 0 C50 80 0 140 40 220 C70 300 20 360 50 440" viewBox="0 0 80 460" />
            <div className="relative ml-16 grid gap-4">
              {whatWeDo.aiImplementationLayer.layers.map((layer, index) => (
                <div key={layer} className="rounded-2xl border border-white/10 bg-ink/70 p-4">
                  <p className="font-mono text-xs text-energy/70">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-semibold">{layer}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.whatWeDoSections.methodTitle} intro={ui.whatWeDoSections.methodIntro} light />
          <div className="grid gap-6 md:grid-cols-5">
            {whatWeDo.method.map((step, index) => <StepCard key={step.id} step={step} index={index} light />)}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.whatWeDoSections.engagementTitle} intro={ui.whatWeDoSections.engagementIntro} />
          <div className="grid gap-6 md:grid-cols-4">
            {whatWeDo.engagementModels.map((model) => (
              <article key={model.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-semibold">{model.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist/68">{model.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.whatWeDoSections.relatedTitle} intro={ui.whatWeDoSections.relatedIntro} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((sector) => <SectorCard key={sector.slug} sector={sector} light />)}
          </div>
        </div>
      </section>

      <CTABand heading={ui.whatWeDoSections.ctaHeading} line={ui.whatWeDoSections.ctaLine} cta={whatWeDo.hero.cta} />
    </>
  );
}
