"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

// 05 — the heading dims, a headlight sweeps across it and leaves it lit. Two
// stacked copies: the dim one below, the bright one revealed by a moving mask.
// Before the animation is armed on the client, only the plain heading exists,
// so the text is never left invisible.
export default function HeadlightText({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.45);

  return (
    <div ref={ref} className={`headlight ${inView ? "is-lit" : ""}`}>
      <Tag className={`headlight-base ${className}`}>{children}</Tag>
      {inView && (
        <>
          {/* font-display: the lit copy must use the same face as the heading,
              otherwise the two layers differ in metrics and the dim one shows
              through as a ghost. */}
          <span aria-hidden className={`headlight-lit font-display ${className}`}>
            {children}
          </span>
          <span aria-hidden className={`headlight-hot font-display ${className}`}>
            {children}
          </span>
        </>
      )}
    </div>
  );
}
