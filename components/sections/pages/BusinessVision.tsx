import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import type { Dict } from "@/lib/i18n";
import { BRAND } from "@/lib/content";
import { ArrowRight } from "../../Icons";

export default function BusinessVision({ t }: { t: Dict }) {
  const v = t.business.vision;

  return (
    <section id="vision" className="section relative">
      <div className="container-x">
        <SectionHeading
          trackId="business_vision"
          eyebrow={v.eyebrow}
          title={v.title}
          subtitle={v.subtitle}
        />

        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3">
          {v.phases.map((phase, i) => (
            <Reveal
              key={phase.title}
              delay={i * 80}
              className={`glass p-5 sm:p-6 ${
                i === 0
                  ? "border-brand/40 bg-gradient-to-br from-brand/[0.08] to-transparent"
                  : ""
              }`}
            >
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  i === 0
                    ? "bg-brand/20 text-brand-light"
                    : "border border-border bg-white/[0.03] text-muted"
                }`}
              >
                {phase.tag}
              </span>
              <h3 className="mt-4 text-pretty text-lg font-semibold text-white">
                {phase.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                {phase.text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={140}
          className="glass mt-6 flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p className="text-pretty text-base font-semibold text-white">
              {v.investorsTitle}
            </p>
            <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
              {v.investorsText}
            </p>
          </div>
          <a
            href={`mailto:${BRAND.email}?subject=Alem%20Auto%20Hub`}
            className="btn-ghost shrink-0"
          >
            {v.investorsCta}
            <ArrowRight width={16} height={16} className="shrink-0" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
