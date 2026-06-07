import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { brand, flags, home, nav, ui, whatWeDo } from "@/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink py-14 text-mist">
      <div className="container-eneriq">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-energy via-energy-bright to-cyan text-sm font-bold text-white">
                E
              </span>
              <span className="font-semibold tracking-[0.18em]">{brand.name}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-mist/65">{brand.tagline}</p>
            {flags.insightsEnabled ? (
              <div className="mt-6">
                <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-energy">{home.closingCTA.line}</label>
                <input className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm" />
              </div>
            ) : null}
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-energy">{ui.labels.footerWhatWeDo}</h2>
            <ul className="space-y-3 text-sm text-mist/65">
              {whatWeDo.capabilityPillars.slice(0, 4).map((item) => (
                <li key={item.title}>
                  <Link href="/what-we-do" className="hover:text-mist">{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-energy">{ui.labels.footerCompany}</h2>
            <ul className="space-y-3 text-sm text-mist/65">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-mist">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-energy">{ui.labels.footerContact}</h2>
            <ul className="space-y-3 text-sm text-mist/65">
              <li>{brand.email}</li>
              <li>{brand.location}</li>
              <li>
                <a href={brand.linkedin} className="inline-flex items-center gap-2 hover:text-mist" aria-label="LinkedIn">
                  {brand.linkedin}
                  <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-mist/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {brand.name}</p>
          <p>{ui.labels.legal}</p>
        </div>
      </div>
    </footer>
  );
}
