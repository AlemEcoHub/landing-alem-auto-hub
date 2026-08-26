import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ModalProvider from "@/components/ModalProvider";
import Header from "@/components/Header";
import ContactBar from "@/components/ContactBar";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/sections/pages/PageHero";
import HomePartners from "@/components/sections/home/Partners";
import PartnerDetails from "@/components/sections/pages/PartnerDetails";
import { getDict, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return isLocale(params.locale) ? buildMetadata(params.locale, "partners") : {};
}

export default function PartnersPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getDict(params.locale);

  return (
    <ModalProvider>
      <Header />
      <main>
        <PageHero
          eyebrow={t.partners.hero.eyebrow}
          title={t.partners.hero.title}
          subtitle={t.partners.hero.subtitle}
          cta={t.partners.hero.cta}
          type="partner"
        />
        <SectionDivider />
        <HomePartners t={t} />
        <SectionDivider />
        <PartnerDetails t={t} />
      </main>
      <Footer />
      <ContactBar />
    </ModalProvider>
  );
}
