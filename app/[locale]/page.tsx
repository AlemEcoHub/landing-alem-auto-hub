import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ModalProvider from "@/components/ModalProvider";
import Header from "@/components/Header";
import ContactBar from "@/components/ContactBar";
import SectionDivider from "@/components/SectionDivider";
import AudienceChapter from "@/components/AudienceChapter";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/home/Hero";
import Problem from "@/components/sections/home/Problem";
import Ecosystem from "@/components/sections/home/Ecosystem";
import Scenario from "@/components/sections/home/Scenario";
import Fleet from "@/components/sections/home/Fleet";
import Contractors from "@/components/sections/home/Contractors";
import Partners from "@/components/sections/home/Partners";
import Sources from "@/components/sections/home/Sources";
import BrandFinal from "@/components/sections/home/BrandFinal";
import { getDict, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return isLocale(params.locale) ? buildMetadata(params.locale, "home") : {};
}

// Главная объясняет систему. Детали живут на /drivers, /business, /partners.
export default function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getDict(params.locale);

  return (
    <ModalProvider>
      <Header />
      <main>
        <Hero t={t} />
        <SectionDivider />
        <Problem t={t} />
        <SectionDivider />
        <Ecosystem t={t} />

        {/* Дальше страница идёт по адресатам: сначала водитель, потом автопарк,
            потом партнёр. Порядок экранов — как в ТЗ. */}
        <AudienceChapter audience="drivers" />
        <Scenario t={t} />

        <AudienceChapter audience="business" />
        <Fleet t={t} />
        <SectionDivider />
        <Contractors t={t} />

        <AudienceChapter audience="partners" />
        <Partners t={t} />

        <SectionDivider />
        <Sources t={t} />
        <SectionDivider />
        <BrandFinal t={t} />
      </main>
      <Footer />
      <ContactBar />
    </ModalProvider>
  );
}
