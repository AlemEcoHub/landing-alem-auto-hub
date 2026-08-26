"use client";

import { useInView } from "./useInView";

// 07 — the "checked by the service" badge lands like a stamp in a paper
// service book instead of just fading in.
export default function VerifiedStamp({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);

  return (
    <span
      ref={ref}
      className={`stamp-badge ${inView ? "is-stamped" : ""} absolute -left-2 -top-3 z-30 flex items-center gap-1.5 rounded-full border border-accent-green/40 bg-[#0e0e0e] px-3 py-1.5 text-[11px] font-medium text-accent-green shadow-lg sm:-left-3 sm:text-xs`}
    >
      <span className="stamp-ring" aria-hidden />
      {children}
    </span>
  );
}
