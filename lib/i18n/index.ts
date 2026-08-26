import ru, { type Dict } from "./ru";
import kk from "./kk";
import { DEFAULT_LOCALE, type Locale } from "./config";

const dictionaries: Record<Locale, Dict> = { ru, kk };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export type { Dict };
export type LeadKind = "owner" | "fleet" | "partner";
export * from "./config";
