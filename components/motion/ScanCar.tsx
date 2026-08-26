"use client";

import { useInView } from "./useInView";
import { CAR_BODY, CAR_VIEWBOX } from "./carPath";

// 04 — a scan line crosses the car and drops a verdict pin behind it. Pin
// delays are timed to the moment the line reaches each one.
type Pin = {
  cx: number;
  cy: number;
  labelX: number;
  labelY?: number;
  tone: "ok" | "warn";
  delay: number;
};

const PINS: Pin[] = [
  { cx: 114, cy: 133, labelX: 114, tone: "ok", delay: 0.55 },
  { cx: 272, cy: 96, labelX: 272, labelY: 24, tone: "warn", delay: 1.5 },
  { cx: 352, cy: 102, labelX: 344, tone: "ok", delay: 1.9 },
];

export default function ScanCar({
  labels,
  alt,
}: {
  labels: readonly string[];
  alt: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox={CAR_VIEWBOX}
        className={`mx-auto h-auto w-full max-w-[340px] ${inView ? "is-scanning" : ""}`}
        role="img"
        aria-label={alt}
      >
        <path d={CAR_BODY} fill="#22222A" stroke="#31313B" strokeWidth="1.5" />
        <circle cx="114" cy="133" r="27" fill="#101014" stroke="#26262C" strokeWidth="2" />
        <circle cx="310" cy="133" r="27" fill="#101014" stroke="#26262C" strokeWidth="2" />

        <g className="scan-sweep">
          <rect x="10" y="18" width="30" height="130" fill="url(#scanFade)" />
          <rect x="24" y="18" width="2.5" height="130" fill="#5AC8E8" />
        </g>
        <defs>
          <linearGradient id="scanFade" x1="0" x2="1">
            <stop offset="0" stopColor="#5AC8E8" stopOpacity="0" />
            <stop offset="1" stopColor="#5AC8E8" stopOpacity=".26" />
          </linearGradient>
        </defs>

        {PINS.map((p, i) => (
          <g
            key={i}
            className="scan-pin"
            style={{ animationDelay: `${p.delay}s` }}
          >
            <circle
              cx={p.cx}
              cy={p.cy}
              r="9"
              fill="none"
              strokeWidth="2.4"
              stroke={p.tone === "ok" ? "#22C55E" : "#F59E0B"}
            />
            <text
              x={p.labelX}
              y={p.labelY ?? 172}
              textAnchor="middle"
              className="scan-label"
              fill={p.tone === "ok" ? "#22C55E" : "#F59E0B"}
            >
              {labels[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
