"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

// 01 — the needle sweeps past its mark and settles back, the way a real one
// does, and the readout counts up alongside it.
export default function Gauge({
  value,
  fraction = 0.68,
  locale = "ru",
}: {
  value: number;
  fraction?: number;
  locale?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1500, 1);
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  // The dial covers 180°, so the needle rests at -90° + 180° * fraction.
  const rest = -90 + 180 * fraction;
  const arc = describeArc(fraction);

  return (
    <div ref={ref} className="w-full">
      <svg viewBox="0 0 200 118" className="mx-auto h-auto w-[168px]">
        <path
          d="M22 100a78 78 0 0 1 156 0"
          fill="none"
          stroke="#22222A"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d={arc}
          fill="none"
          stroke="url(#gaugeFill)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gaugeFill" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#E8431E" />
            <stop offset="1" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
        <g
          className={`gauge-needle ${inView ? "is-swept" : ""}`}
          style={{ "--rest": `${rest}deg` } as React.CSSProperties}
        >
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="46"
            stroke="#FF8C00"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <circle
            cx="100"
            cy="100"
            r="7"
            fill="#15151A"
            stroke="#FF8C00"
            strokeWidth="2.5"
          />
        </g>
      </svg>
      <p className="mt-1 text-center font-display text-2xl font-semibold tabular-nums text-white">
        {shown.toLocaleString(locale === "kk" ? "kk-KZ" : "ru-RU")}
      </p>
    </div>
  );
}

// The dial is a half circle centred on (100,100) with r=78, starting at the
// left end. `fraction` is how much of those 180 degrees the fill covers.
function describeArc(fraction: number) {
  const angle = Math.PI * Math.min(Math.max(fraction, 0), 1);
  const x = 100 - 78 * Math.cos(angle);
  const y = 100 - 78 * Math.sin(angle);
  return `M22 100A78 78 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`;
}
