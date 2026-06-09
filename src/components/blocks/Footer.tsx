"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink, Mail, MapPin, Send } from "lucide-react";
import { brand, footer, nav, ui } from "@/content";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const EASE = [0.22, 1, 0.36, 1] as const;

// Blur + lift + fade reveal, staggered, reduced-motion aware.
function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: {
  className?: ComponentProps<typeof motion.div>["className"];
  delay?: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.8, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-mist">
      {/* top centre glow line */}
      <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-energy/40 blur-sm" aria-hidden />

      <div className="container-eneriq py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + stay connected */}
          <AnimatedContainer className="relative" delay={0.1}>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-energy via-energy-bright to-cyan text-sm font-bold text-ink">
                S
              </span>
              <span className="text-lg font-semibold tracking-[0.18em]">{brand.name}</span>
            </div>
            <p className="mb-2 text-sm font-semibold text-mist">{footer.newsletterHeading}</p>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-mist/60">{footer.newsletterBlurb}</p>
            <form className="relative max-w-xs" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder={footer.emailPlaceholder}
                aria-label={footer.emailPlaceholder}
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-sm text-mist placeholder:text-mist/40 focus:border-energy/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-energy to-cyan text-ink transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="pointer-events-none absolute -right-2 top-0 h-24 w-24 rounded-full bg-energy/10 blur-2xl" aria-hidden />
          </AnimatedContainer>

          {/* Explore */}
          <AnimatedContainer delay={0.2}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-energy">{footer.linksHeading}</h3>
            <nav className="space-y-2.5 text-sm">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="block text-mist/65 transition-colors hover:text-energy">
                  {item.label}
                </Link>
              ))}
            </nav>
          </AnimatedContainer>

          {/* Contact */}
          <AnimatedContainer delay={0.3}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-energy">{footer.contactHeading}</h3>
            <address className="space-y-3 text-sm not-italic text-mist/65">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-energy/70" />
                {brand.location}
              </p>
              <a href={`mailto:${brand.email}`} className="flex items-center gap-2 transition-colors hover:text-energy">
                <Mail className="h-4 w-4 shrink-0 text-energy/70" />
                {brand.email}
              </a>
            </address>
          </AnimatedContainer>

          {/* Follow */}
          <AnimatedContainer delay={0.4}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-energy">{footer.followHeading}</h3>
            <div className="flex gap-3">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={brand.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={footer.linkedinTooltip}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-mist transition-colors hover:border-energy/50 hover:text-energy"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  }
                />
                <TooltipContent>{footer.linkedinTooltip}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={`mailto:${brand.email}`}
                      aria-label={footer.emailTooltip}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-mist transition-colors hover:border-energy/50 hover:text-energy"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  }
                />
                <TooltipContent>{footer.emailTooltip}</TooltipContent>
              </Tooltip>
            </div>
          </AnimatedContainer>
        </div>

        {/* Bottom bar */}
        <AnimatedContainer
          delay={0.5}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row"
        >
          <p className="text-sm text-mist/45">
            © {year} {brand.name}. {ui.labels.legal}
          </p>
          <nav className="flex flex-wrap justify-center gap-5 text-sm text-mist/45">
            {footer.legalLinks.map((label) => (
              <span key={label} className="cursor-default transition-colors hover:text-mist/70">
                {label}
              </span>
            ))}
          </nav>
        </AnimatedContainer>
      </div>
    </footer>
  );
}
