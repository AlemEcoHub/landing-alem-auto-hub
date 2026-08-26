"use client";

import Gauge from "./Gauge";
import Odometer from "./Odometer";
import type { Dict, Locale } from "@/lib/i18n";

// 01 + 02 — the two readouts a driver recognises instantly, showing the same
// figures as the app screenshot beside them. Both tiles share one height and
// one internal rhythm so the row reads as a pair, not as two leftovers.
export default function Instruments({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <div className="mt-10 sm:mt-12">
      <div className="grid gap-4 sm:grid-cols-2">
        <Tile label={`${t.motion.odoLabel}, ${t.motion.odoUnit}`}>
          <Odometer value="045320" />
        </Tile>
        <Tile label={`${t.motion.gaugeLabel}, ${t.motion.gaugeUnit}`}>
          <Gauge value={200} fraction={0.22} locale={locale} />
        </Tile>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-sm leading-relaxed text-muted">
        {t.motion.instrumentsNote}
      </p>
    </div>
  );
}

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass flex flex-col items-center gap-4 p-5 sm:p-6">
      <p className="text-center text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <div className="flex min-h-[132px] w-full flex-1 items-center justify-center">
        {children}
      </div>
    </div>
  );
}
