import type { Viewport } from "next";
import { Golos_Text, Onest } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import I18nProvider from "@/components/I18nProvider";
import RoadSpine from "@/components/motion/RoadSpine";
import { getDict, isLocale, LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";

// Two Cyrillic-first faces: Onest for headings, Golos Text for everything
// read at body size. cyrillic-ext carries ә ғ қ ң ө ұ ү һ і — without it Kazakh
// falls back to a system font mid-sentence.
const display = Onest({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-display",
  display: "swap",
});

const body = Golos_Text({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <html lang={LOCALE_META[locale].htmlLang} className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <I18nProvider locale={locale} dict={getDict(locale)}>
          {children}
          <RoadSpine />
        </I18nProvider>
      </body>
    </html>
  );
}
