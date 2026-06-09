"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LazyMount — renders children only once the wrapper div enters within
 * `rootMargin` of the viewport (default 300px). Until then renders a
 * sized placeholder to prevent CLS. Disconnects the observer after mount.
 *
 * Animate transform/opacity only inside children — never width/height/top/left.
 */
export function LazyMount({
  children,
  className = "",
  minHeight,
}: {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={!mounted && minHeight ? { minHeight } : undefined}
    >
      {mounted ? children : null}
    </div>
  );
}
