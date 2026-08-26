"use client";

import type { ReactNode } from "react";
import { useLeadModal, type LeadType } from "./ModalProvider";
import { track } from "@/lib/analytics";

export default function CtaButton({
  type,
  location,
  variant = "primary",
  className = "",
  children,
}: {
  type: LeadType;
  location: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
}) {
  const { open } = useLeadModal();

  const handleClick = () => {
    track(`cta_${type}_click`, { location });
    open(type);
  };

  return (
    <button
      onClick={handleClick}
      className={`${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
    >
      {children}
    </button>
  );
}
