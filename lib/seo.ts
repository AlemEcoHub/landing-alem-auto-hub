import type { Metadata } from "next";
import { BRAND } from "./content";
import { getDict, LOCALES, LOCALE_META, type Locale } from "./i18n";

const siteUrl = `https://${BRAND.domain}`;

export type PageKey = "home" | "drivers" | "business" | "partners";

const PATHS: Record<PageKey, string> = {
  home: "",
  drivers: "/drivers",
  business: "/business",
  partners: "/partners",
};

// One place for canonical URLs, hreflang and OpenGraph so every page in both
// languages stays consistent (spec §7).
export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const t = getDict(locale);
  const meta = t.meta[page];
  const path = PATHS[page];
  const url = `${siteUrl}/${locale}${path}`;

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    keywords: [...t.meta.keywords],
    authors: [{ name: BRAND.name }],
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url,
      siteName: BRAND.name,
      locale: LOCALE_META[locale].ogLocale,
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: meta.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((l) => [l, `${siteUrl}/${l}${path}`]),
        ),
        "x-default": `${siteUrl}/ru${path}`,
      },
    },
  };
}
