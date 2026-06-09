"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { nav } from "@/content";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav({
  open,
  activePath,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  activePath: string;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        returnFocusRef.current?.focus();
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a,button"));
      const firstItem = focusable[0];
      const lastItem = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <motion.div
      ref={panelRef}
      className="fixed inset-0 z-40 bg-surface/98 px-6 pt-28 backdrop-blur-xl lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Primary navigation"
    >
      <div className="container-eneriq">
        <div className="flex flex-col">
          {nav.map((item, index) => {
            const active = activePath === item.href || (item.href !== "/" && activePath.startsWith(item.href));
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block border-b border-hairline py-5 text-2xl font-semibold",
                    active ? "text-accent-ink" : "text-content/80"
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}

          {/* Theme toggle at bottom of mobile nav */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: nav.length * 0.06 + 0.06 }}
            className="mt-6 flex items-center gap-3"
          >
            <ThemeToggle />
            <span className="text-sm text-content-muted">Toggle theme</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
