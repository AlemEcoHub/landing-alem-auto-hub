import Reveal from "../../Reveal";
import CtaButton from "../../CtaButton";
import type { Dict } from "@/lib/i18n";
import { CheckIcon } from "../../Icons";

export default function PartnerDetails({ t }: { t: Dict }) {
  const p = t.partners;

  return (
    <section id="partner-details" className="section relative">
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
              {p.forWhomLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.modal.partnerTypes
                .filter((type) => type.value !== "Другое")
                .map((type) => (
                  <span
                    key={type.value}
                    className="rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/80"
                  >
                    {type.label}
                  </span>
                ))}
            </div>

            <Reveal className="glass mt-8 overflow-hidden">
              <p className="border-b border-border px-5 py-4 text-xs font-medium uppercase tracking-wider text-muted sm:px-6">
                {p.stepsTitle}
              </p>
              <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {p.steps.map((step, i) => (
                  <div key={step.title} className="p-5 sm:p-6">
                    <p className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand/15 text-[11px] font-bold text-brand-light">
                        {i + 1}
                      </span>
                      <span className="text-pretty text-[15px] font-semibold text-white">
                        {step.title}
                      </span>
                    </p>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="glass p-5 sm:p-8">
            <p className="text-sm font-semibold text-white">{p.benefitsTitle}</p>
            <ul className="mt-5 space-y-4">
              {p.benefits.map((benefit, i) => (
                <li key={benefit} className="flex items-center gap-3 sm:gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-sm font-bold text-brand-light">
                    {i + 1}
                  </span>
                  <span className="text-pretty text-sm text-white/90">{benefit}</span>
                  <CheckIcon
                    width={16}
                    height={16}
                    className="ml-auto hidden shrink-0 text-accent-green sm:block"
                  />
                </li>
              ))}
            </ul>
            <CtaButton
              type="partner"
              location="partner_details"
              className="mt-7 w-full"
            >
              {p.hero.cta}
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
