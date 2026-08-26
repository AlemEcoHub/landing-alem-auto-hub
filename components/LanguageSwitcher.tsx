"use client";

import { useI18n } from "./I18nProvider";
import { LOCALES, LOCALE_COOKIE, LOCALE_META } from "@/lib/i18n";
import { track } from "@/lib/analytics";

// Real links (so both languages stay crawlable) that also remember the choice
// for the next visit to the bare domain.
export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { locale, t } = useI18n();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-white/[0.03] p-0.5 ${className}`}
      role="group"
      aria-label={t.common.languageLabel}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <a
            key={code}
            href={`/${code}`}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${code};path=/;max-age=31536000;samesite=lax`;
              track("language_switch", { locale: code });
            }}
            className={`w-11 rounded-full py-1.5 text-center text-xs font-semibold transition-colors ${
              active
                ? "bg-white/10 text-white"
                : "text-muted hover:text-white"
            }`}
          >
            {LOCALE_META[code].short}
          </a>
        );
      })}
    </div>
  );
}
