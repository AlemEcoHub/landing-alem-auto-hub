import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ModalProvider from "@/components/ModalProvider";
import Header from "@/components/Header";
import ContactBar from "@/components/ContactBar";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/sections/pages/PageHero";
import Fleet from "@/components/sections/home/Fleet";
import BusinessValue from "@/components/sections/pages/BusinessValue";
import BusinessContractors from "@/components/sections/pages/BusinessContractors";
import BusinessVision from "@/components/sections/pages/BusinessVision";
import { getDict, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return isLocale(params.locale) ? buildMetadata(params.locale, "business") : {};
}

export default function Business({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getDict(params.locale);

  return (
    <ModalProvider>
      <Header />
      <main>
        <PageHero
          eyebrow={t.business.hero.eyebrow}
          title={t.business.hero.title}
          subtitle={t.business.hero.subtitle}
          cta={t.business.hero.cta}
          type="fleet"
        />
        <SectionDivider />
        <Fleet t={t} />
        <SectionDivider />
        <BusinessValue t={t} />
        <SectionDivider />
        <BusinessContractors t={t} />
        <SectionDivider />
        <BusinessVision t={t} />
      </main>
      <Footer />
      <ContactBar />
    </ModalProvider>
  );
}
