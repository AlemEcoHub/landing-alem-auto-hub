"use client";

import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { captureAttribution } from "@/lib/analytics";

const I18nContext = createContext<{ locale: Locale; t: Dict } | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export default function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dict;
  children: ReactNode;
}) {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t: dict }}>
      {children}
    </I18nContext.Provider>
  );
}
