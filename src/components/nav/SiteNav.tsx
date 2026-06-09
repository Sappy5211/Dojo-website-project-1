"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { brand, home, nav, sectors, whatWeDo } from "@/content";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

type SubItem = { label: string; href: string; desc?: string };
type NavEntry = { label: string; href: string; submenu?: SubItem[]; kind?: "description" | "simple" };

// Build the nav from content.ts. Sectors + What We Do get data-driven dropdowns.
const sectorSub: SubItem[] = sectors.sectorList.map((s) => ({ label: s.name, href: `/sectors/${s.slug}` }));
const whatWeDoSub: SubItem[] = whatWeDo.capabilityPillars.slice(0, 5).map((c) => ({
  label: c.title,
  href: "/what-we-do",
  desc: c.desc,
}));

const entries: NavEntry[] = nav.map((item) => {
  if (item.href === "/sectors") return { ...item, submenu: sectorSub, kind: "simple" };
  if (item.href === "/what-we-do") return { ...item, submenu: whatWeDoSub, kind: "description" };
  return item;
});

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
const EASE = [0.22, 1, 0.36, 1] as const;

function Lamp() {
  return (
    <motion.span
      layoutId="nav-lamp"
      className="absolute inset-0 -z-10 rounded-full bg-energy/10"
      transition={SPRING}
      aria-hidden
    >
      <span className="absolute -top-[7px] left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-energy">
        <span className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-energy/25 blur-md" />
        <span className="absolute -top-1 h-6 w-8 rounded-full bg-energy/20 blur-md" />
        <span className="absolute left-2 top-0 h-4 w-4 rounded-full bg-cyan/20 blur-sm" />
      </span>
    </motion.span>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on route change.
  useEffect(() => { setOpenMenu(null); }, [pathname]);

  // Close on Escape + outside click.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenMenu(null); };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, []);

  const open = (key: string) => { clearTimeout(closeTimer.current); setOpenMenu(key); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 130); };

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[72px] transition-all duration-300",
          scrolled || openMenu ? "border-b border-white/10 bg-ink/90 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="container-eneriq relative flex h-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="ENIRIQ home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-energy via-energy-bright to-cyan text-sm font-bold text-ink shadow-[0_0_24px_rgba(16,185,129,0.28)]">
              E
            </span>
            <span className="text-lg font-semibold tracking-[0.18em]">{brand.name}</span>
          </Link>

          {/* Centred tubelight pill */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1.5 py-1.5 backdrop-blur-lg lg:flex"
            aria-label="Primary"
          >
            {entries.map((entry) => {
              const active = isActive(entry.href);
              const itemClass = cn(
                "relative z-10 inline-flex items-center gap-1 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                active ? "text-energy" : "text-mist/75 hover:text-mist"
              );

              if (!entry.submenu) {
                return (
                  <Link key={entry.href} href={entry.href} className={itemClass}>
                    {entry.label}
                    {active && <Lamp />}
                  </Link>
                );
              }

              const isOpen = openMenu === entry.href;
              return (
                <div
                  key={entry.href}
                  className="relative"
                  onMouseEnter={() => open(entry.href)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className={itemClass}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onClick={() => setOpenMenu(isOpen ? null : entry.href)}
                  >
                    {entry.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
                    {active && <Lamp />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: EASE }}
                      >
                        <div
                          style={{ backgroundColor: "#0d1411" }}
                          className={cn(
                            "overflow-hidden rounded-2xl border border-white/10 p-2 shadow-[0_1.5rem_4rem_rgba(0,0,0,0.6)]",
                            entry.kind === "simple" ? "w-[24rem]" : "w-[22rem]"
                          )}
                          role="menu"
                        >
                          <Link
                            href={entry.href}
                            onClick={() => setOpenMenu(null)}
                            className="mb-1 flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-energy hover:bg-white/5"
                          >
                            View {entry.label}
                            <span aria-hidden>→</span>
                          </Link>

                          <div className={cn("gap-1", entry.kind === "simple" ? "grid grid-cols-2" : "flex flex-col")}>
                            {entry.submenu.map((sub) => (
                              <Link
                                key={sub.label + sub.href}
                                href={sub.href}
                                onClick={() => setOpenMenu(null)}
                                className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                                role="menuitem"
                              >
                                <span className="flex items-center gap-2 text-sm font-medium text-mist group-hover:text-energy">
                                  {entry.kind === "simple" && (
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-energy/70" aria-hidden />
                                  )}
                                  {sub.label}
                                </span>
                                {sub.desc && (
                                  <span className="mt-1 line-clamp-2 block text-xs leading-snug text-mist/55">{sub.desc}</span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href={home.hero.primary.href}
              className="cta-lift hidden rounded-full bg-gradient-to-r from-energy via-energy-bright to-cyan px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_0.75rem_2rem_rgba(16,185,129,0.2)] lg:inline-flex"
            >
              {home.hero.primary.label}
            </Link>
            <button
              ref={toggleRef}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-mist lg:hidden"
              type="button"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileNav open={mobileOpen} activePath={pathname} onClose={() => setMobileOpen(false)} returnFocusRef={toggleRef} />
        )}
      </AnimatePresence>
    </>
  );
}
