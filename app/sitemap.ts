import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/content";
import { LOCALES } from "@/lib/i18n/config";

const PATHS = ["", "/drivers", "/business", "/partners"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${BRAND.domain}`;
  const now = new Date();

  return LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? (locale === "ru" ? 1 : 0.9) : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  );
}
