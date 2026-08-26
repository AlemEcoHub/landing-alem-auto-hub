"use client";

import { useEffect, useRef, useState } from "react";

// 06 — a strip of road in the left margin with a car driving down it as you
// scroll: the car's position is the scroll progress. Shown only from xl, where
// the page gutter is wide enough for an actual road.
export default function RoadSpine() {
  const carRef = useRef<HTMLSpanElement | null>(null);
  const dashRef = useRef<HTMLSpanElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        const p = Math.min(Math.max(window.scrollY / max, 0), 1);
        carRef.current?.style.setProperty("--drive", String(p));
        // Markings slide under the car as the page moves.
        dashRef.current?.style.setProperty(
          "--markings",
          `${-window.scrollY * 0.4}px`,
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="road pointer-events-none fixed bottom-6 left-3 top-[86px] z-30 hidden xl:block"
      aria-hidden
    >
      <span ref={dashRef} className="road-markings" />
      <span ref={carRef} className="road-car">
        <svg viewBox="0 0 40 70" width="26" height="46">
          <defs>
            <linearGradient id="roadCar" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FF8C00" />
              <stop offset="1" stopColor="#E8431E" />
            </linearGradient>
          </defs>
          <g fill="#0a0a0c">
            <rect x="4" y="13" width="5" height="13" rx="2.5" />
            <rect x="31" y="13" width="5" height="13" rx="2.5" />
            <rect x="4" y="44" width="5" height="13" rx="2.5" />
            <rect x="31" y="44" width="5" height="13" rx="2.5" />
          </g>
          <rect x="8" y="3" width="24" height="64" rx="9" fill="url(#roadCar)" />
          {/* windscreen sits toward the bottom — the car is driving downwards */}
          <path d="M12 50h16l-2.5 7h-11z" fill="#111117" opacity=".85" />
          <rect x="12" y="16" width="16" height="9" rx="3" fill="#111117" opacity=".7" />
          <rect x="11" y="29" width="18" height="14" rx="3" fill="#000" opacity=".18" />
          <circle cx="13.5" cy="63" r="1.9" fill="#FFE7C2" />
          <circle cx="26.5" cy="63" r="1.9" fill="#FFE7C2" />
        </svg>
      </span>
    </div>
  );
}
