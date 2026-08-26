"use client";

import { useInView } from "./useInView";
import {
  InspectionIcon,
  InsuranceIcon,
  OilIcon,
  TaxIcon,
} from "../Icons";

const LAMP_ICONS = [InspectionIcon, OilIcon, InsuranceIcon, TaxIcon];

// 08 — closes the "Проблема" section: the four things a driver keeps in their
// head light up as warnings, then the cluster goes green. It carries the whole
// argument of the next section before a word of it is read.
export default function DashboardLamps({
  items,
  bad,
  good,
}: {
  items: readonly string[];
  bad: string;
  good: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);

  return (
    <div
      ref={ref}
      className={`mt-10 flex flex-col items-center gap-5 sm:mt-14 ${
        inView ? "is-alerting" : ""
      }`}
    >
      <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-x-2 gap-y-3 sm:max-w-lg sm:gap-x-4">
        {items.map((label, i) => (
          <span key={label} className="flex flex-col items-center gap-2 text-center">
            <span
              className="lamp"
              style={{ animationDelay: `${i * 0.22}s` }}
              aria-hidden
            >
              {(() => {
                const Glyph = LAMP_ICONS[i];
                return <Glyph width={22} height={22} />;
              })()}
            </span>
            <span className="text-pretty text-[11px] leading-tight text-muted">
              {label}
            </span>
          </span>
        ))}
      </div>

      <p className="grid w-full max-w-md text-balance text-center text-sm font-semibold">
        <span className="lamp-status lamp-status-bad">{bad}</span>
        <span className="lamp-status lamp-status-good">{good}</span>
      </p>
    </div>
  );
}
