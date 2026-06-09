import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/blocks/ContactForm";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { CurrentBackground } from "@/components/fx/CurrentBackground";
import { Reveal } from "@/components/fx/Reveal";
import { contact, meta, ui } from "@/content";

export const metadata: Metadata = {
  title: meta.contact.title,
  description: meta.contact.description,
  openGraph: { title: meta.contact.title },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero (always dark) ──────────────────────────────────── */}
      <section className="dark relative overflow-hidden bg-ink pt-36 text-mist">
        <CurrentBackground />
        <div
          className="pointer-events-none absolute left-1/2 top-32 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-energy/6 blur-3xl"
          aria-hidden
        />
        <div className="container-eneriq relative z-10 py-24">
          <SectionHeader
            eyebrow={ui.contactSections.eyebrow}
            title={contact.hero.title}
            intro={contact.hero.line}
            align="center"
          />
        </div>
      </section>

      {/* ── Routing + Form (editorial — flips) ────────────────────── */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-eneriq">
          <SectionHeader
            title={ui.contactSections.routingTitle}
            intro={ui.contactSections.routingIntro}
          />
          <ContactForm />
        </div>
      </section>

      {/* ── Direct details (editorial — flips) ────────────────────── */}
      <section className="bg-surface-2 py-24 lg:py-32">
        <div className="container-eneriq">
          <SectionHeader
            title={ui.contactSections.detailsTitle}
            intro={contact.reassurance}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {/* Email */}
            <Reveal delay={0}>
              <article className="light-panel group rounded-2xl p-6">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-energy/10 text-accent-ink">
                  <Mail className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-content-muted">
                  {contact.directLabels.email}
                </p>
                <a
                  href={`mailto:${contact.directDetails.email}`}
                  className="text-sm font-medium text-content underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2"
                >
                  {contact.directDetails.email}
                </a>
              </article>
            </Reveal>

            {/* LinkedIn */}
            <Reveal delay={0.07}>
              <article className="light-panel group rounded-2xl p-6">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-energy/10 text-accent-ink">
                  <ExternalLink className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-content-muted">
                  {contact.directLabels.linkedin}
                </p>
                <a
                  href={contact.directDetails.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-content underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2"
                >
                  {contact.directDetails.linkedin}
                  <ExternalLink className="h-3.5 w-3.5 opacity-50" strokeWidth={1.7} aria-hidden />
                </a>
              </article>
            </Reveal>

            {/* Location */}
            <Reveal delay={0.14}>
              <article className="light-panel group rounded-2xl p-6">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-energy/10 text-accent-ink">
                  <MapPin className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-content-muted">
                  {contact.directLabels.location}
                </p>
                <p className="text-sm font-medium text-content">
                  {contact.directDetails.location}
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-sm text-content-muted">
              {contact.reassurance}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
