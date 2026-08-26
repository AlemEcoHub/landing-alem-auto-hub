"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Fades child content up on first scroll into view. Also fires an optional
// analytics event the first time a section becomes visible (scroll depth).
export default function Reveal({
  children,
  className = "",
  delay = 0,
  trackId,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  trackId?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (trackId) {
            import("@/lib/analytics").then(({ track }) =>
              track("section_view", { section: trackId }),
            );
          }
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trackId]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
