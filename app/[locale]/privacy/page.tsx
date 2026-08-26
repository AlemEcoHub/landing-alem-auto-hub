import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import ModalProvider from "@/components/ModalProvider";
import Footer from "@/components/sections/Footer";
import { getDict, isLocale } from "@/lib/i18n";
import { BRAND } from "@/lib/content";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return {
    title: `${getDict(params.locale).footer.privacy} — ${BRAND.name}`,
    robots: { index: false, follow: true },
  };
}

// Placeholder legal page: the structure and routing are in place, the wording
// has to be supplied by the company's lawyer before launch.
export default function Privacy({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getDict(params.locale);

  return (
    <ModalProvider>
      <Header />
      <main className="pt-[68px]">
        <div className="container-x prose-invert max-w-3xl py-16 sm:py-20">
          <h1 className="heading">{t.footer.privacy}</h1>
          <p className="mt-6 text-pretty leading-relaxed text-muted">
            {t.legal.draftNotice}
          </p>
          <ul className="mt-8 space-y-3">
            {t.legal.points.map((point) => (
              <li key={point} className="flex gap-3 text-pretty text-sm leading-relaxed text-white/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            {t.legal.contact}{" "}
            <a href={`mailto:${BRAND.email}`} className="text-brand-light hover:underline">
              {BRAND.email}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </ModalProvider>
  );
}
