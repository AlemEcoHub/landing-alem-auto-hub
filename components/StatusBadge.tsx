"use client";

import { useI18n } from "./I18nProvider";

export type Status = "ready" | "mockup" | "vision";

// Truth-check labels (spec §6): anything still in development must never be
// shown as a working fact.
const TONE: Record<Status, string> = {
  ready: "border-accent-green/35 bg-accent-green/10 text-accent-green",
  mockup: "border-accent-amber/35 bg-accent-amber/10 text-accent-amber",
  vision: "border-accent-blue/35 bg-accent-blue/10 text-accent-blue",
};

export default function StatusBadge({
  status,
  className = "",
}: {
  status: Status;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TONE[status]} ${className}`}
    >
      {t.status[status]}
    </span>
  );
}
