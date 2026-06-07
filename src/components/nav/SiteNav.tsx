"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { brand, home, nav } from "@/content";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const current = nav.find((item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) ?? nav[0];
      const active = linkRefs.current[current.href];
      const parent = navRef.current;
      if (!active || !parent) return;
      const activeRect = active.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      setIndicator({ left: activeRect.left - parentRect.left, width: activeRect.width });
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[72px] transition-all duration-300",
          scrolled ? "border-b border-white/10 bg-ink/90 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="container-eneriq flex h-full items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="ENIRIQ home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-energy via-energy-bright to-cyan text-sm font-bold text-white shadow-[0_0_24px_rgba(16,185,129,0.28)]">
              E
            </span>
            <span className="text-lg font-semibold tracking-[0.18em]">{brand.name}</span>
          </Link>

          <nav ref={navRef} className="relative hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(node) => {
                    linkRefs.current[item.href] = node;
                  }}
                  className={cn("py-2 text-sm transition-colors", active ? "text-energy" : "text-mist/70 hover:text-mist")}
                >
                  {item.label}
                </Link>
              );
            })}
            <span
              className="absolute -bottom-1 h-0.5 rounded-full bg-energy transition-all duration-300"
              style={{ left: indicator.left, width: indicator.width }}
              aria-hidden
            />
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={home.hero.primary.href}
              className="cta-lift hidden rounded-full bg-gradient-to-r from-energy via-energy-bright to-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0.75rem_2rem_rgba(16,185,129,0.2)] lg:inline-flex"
            >
              {home.hero.primary.label}
            </Link>
            <button
              ref={toggleRef}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-mist lg:hidden"
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        <MobileNav open={open} activePath={pathname} onClose={() => setOpen(false)} returnFocusRef={toggleRef} />
      </AnimatePresence>
    </>
  );
}
