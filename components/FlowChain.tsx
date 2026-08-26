import { Fragment } from "react";

// Horizontal process strip used by the spec's chain diagrams (screens 4, 6, 8).
// Turns into a vertical list on a phone so the arrows still read.
export default function FlowChain({
  steps,
  tone = "brand",
}: {
  steps: readonly string[];
  tone?: "brand" | "green";
}) {
  const accent = tone === "green" ? "text-accent-green" : "text-brand-light";

  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {steps.map((step, i) => (
        <Fragment key={step}>
          <div className="glass flex-1 px-4 py-3 text-center text-pretty text-sm leading-snug text-white/90">
            {step}
          </div>
          {i < steps.length - 1 && (
            <span
              className={`flex shrink-0 items-center justify-center text-lg ${accent}`}
              aria-hidden
            >
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
