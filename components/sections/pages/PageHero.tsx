import CtaButton from "../../CtaButton";
import Highlight from "../../Highlight";
import { ArrowRight } from "../../Icons";
import type { LeadKind } from "@/lib/i18n";

// Shared opening block for /drivers, /business and /partners.
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  cta,
  type,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  type: LeadKind;
}) {
  return (
    <section className="relative overflow-hidden pt-[68px]">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="glow-brand absolute -top-40 left-1/2 h-[380px] w-[380px] -translate-x-1/2 opacity-70"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-transparent to-bg"
        aria-hidden
      />
      <div className="container-x relative py-14 text-center sm:py-20">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-[2.7rem]">
          <Highlight text={title} />
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton type={type} location="page_hero" className="w-full sm:w-auto">
            {cta}
            <ArrowRight width={18} height={18} className="shrink-0" />
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
