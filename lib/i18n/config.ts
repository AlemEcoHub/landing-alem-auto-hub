export const LOCALES = ["ru", "kk"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

// Cookie the language switcher writes so a returning visitor lands on the
// language they picked instead of being re-detected every time.
export const LOCALE_COOKIE = "aah_locale";

export const LOCALE_META: Record<
  Locale,
  { short: string; name: string; htmlLang: string; ogLocale: string }
> = {
  ru: { short: "RU", name: "Русский", htmlLang: "ru", ogLocale: "ru_KZ" },
  kk: { short: "KZ", name: "Қазақша", htmlLang: "kk", ogLocale: "kk_KZ" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
