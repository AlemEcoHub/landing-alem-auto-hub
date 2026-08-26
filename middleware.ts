import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, isLocale } from "@/lib/i18n/config";

// Every page lives under /ru or /kk. A bare "/" picks a language from the
// visitor's saved choice, then from Accept-Language, then falls back to ru.
function pickLocale(req: NextRequest): string {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;

  const header = req.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (tag.startsWith("kk") || tag.startsWith("kaz")) return "kk";
    if (tag.startsWith("ru")) return "ru";
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|screens|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
