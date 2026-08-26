"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import LeadModal from "./LeadModal";

export type LeadType = "owner" | "fleet" | "partner";

interface ModalContextValue {
  open: (type: LeadType) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within ModalProvider");
  return ctx;
}

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<LeadType | null>(null);

  const open = (t: LeadType) => setType(t);
  const close = () => setType(null);

  // Lock body scroll while modal is open.
  useEffect(() => {
    document.body.style.overflow = type ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [type]);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {type && <LeadModal type={type} onClose={close} />}
    </ModalContext.Provider>
  );
}
