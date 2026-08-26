import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ModalProvider from "@/components/ModalProvider";
import Header from "@/components/Header";
import ContactBar from "@/components/ContactBar";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/sections/pages/PageHero";
import DriverFeatures from "@/components/sections/pages/DriverFeatures";
import DriverHistory from "@/components/sections/pages/DriverHistory";
import DriverHow from "@/components/sections/pages/DriverHow";
import DriverMarketplace from "@/components/sections/pages/DriverMarketplace";
import { getDict, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return isLocale(params.locale) ? buildMetadata(params.locale, "drivers") : {};
}

export default function Drivers({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getDict(params.locale);

  return (
    <ModalProvider>
      <Header />
      <main>
        <PageHero
          eyebrow={t.drivers.hero.eyebrow}
          title={t.drivers.hero.title}
          subtitle={t.drivers.hero.subtitle}
          cta={t.drivers.hero.cta}
          type="owner"
        />
        <SectionDivider />
        <DriverFeatures t={t} />
        <SectionDivider />
        <DriverHistory t={t} />
        <SectionDivider />
        <DriverHow t={t} />
        <SectionDivider />
        <DriverMarketplace t={t} />
      </main>
      <Footer />
      <ContactBar />
    </ModalProvider>
  );
}
