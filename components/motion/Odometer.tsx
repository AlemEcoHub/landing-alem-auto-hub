"use client";

import { useInView } from "./useInView";

// 02 — mileage reels. Each reel carries two runs of 0-9 so every digit lands
// after a full turn instead of nudging into place.
const RUN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Odometer({
  value,
  trip = true,
}: {
  value: string;
  trip?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const digits = value.split("");

  return (
    <div ref={ref} className="flex items-center gap-1" role="img" aria-label={value}>
      {digits.map((d, i) => {
        const n = Number(d);
        const last = i === digits.length - 1;
        return (
          <span
            key={i}
            className={`odo-reel ${trip && last ? "odo-reel-trip" : ""}`}
          >
            <span
              className="odo-strip"
              style={{
                transform: inView ? `translateY(-${(n + 10) * 2.5}rem)` : undefined,
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {RUN.concat(RUN).map((x, j) => (
                <span key={j}>{x}</span>
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
}
