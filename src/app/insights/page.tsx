import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { flags, insights, meta, ui } from "@/content";

export const metadata: Metadata = {
  title: meta.insights.title,
  description: meta.insights.description,
  openGraph: { title: meta.insights.title },
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  if (!flags.insightsEnabled) notFound();

  return (
    <section className="bg-ink pt-36 text-mist">
      <div className="container-eneriq py-24">
        <SectionHeader eyebrow={ui.insightsSections.eyebrow} title={insights.hero.title} intro={insights.hero.intro} />
        <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm text-energy">{insights.featured.category}</p>
          <h2 className="mt-3 text-2xl font-semibold">{insights.featured.title}</h2>
          <p className="mt-4 text-mist/70">{insights.featured.excerpt}</p>
          <p className="mt-6 text-sm text-mist/50">{insights.featured.readTime}</p>
        </article>
      </div>
    </section>
  );
}
