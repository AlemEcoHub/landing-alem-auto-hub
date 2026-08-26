import Reveal from "../../Reveal";
import CtaButton from "../../CtaButton";
import Highlight from "../../Highlight";
import type { Dict, LeadKind } from "@/lib/i18n";
import { CarIcon, PartnersIcon, ShieldIcon } from "../../Icons";

// ЭКРАН 11 · ФИНАЛ БРЕНДА — заканчиваем эмоцией, затем три сценария.
const TYPES: LeadKind[] = ["owner", "fleet", "partner"];
const ICONS = [CarIcon, ShieldIcon, PartnersIcon];
const ACCENT = [
  "border-brand/30 bg-brand/10 text-brand-light",
  "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
  "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
];

export default function BrandFinal({ t }: { t: Dict }) {
  const b = t.home.brandFinal;

  return (
    <section className="section relative overflow-hidden">
      <div
        className="glow-brand absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 opacity-60"
        aria-hidden
      />
      <div className="container-x relative">
        <Reveal trackId="brand_final" className="mx-auto max-w-2xl text-center">
          <p className="text-pretty text-lg text-muted sm:text-xl">{b.line1}</p>
          <p className="heading mt-3">
            <Highlight text={b.line2} />
          </p>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base font-semibold text-brand-light sm:text-lg">
            {b.formula}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted/80">
            {b.statement}
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:mt-12 md:grid-cols-3">
          {t.home.finalCta.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                key={item.question}
                delay={i * 90}
                className="glass glass-hover flex flex-col p-6 text-center"
              >
                <span
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border ${ACCENT[i]}`}
                >
                  <Icon width={26} height={26} />
                </span>
                <h3 className="mt-5 flex-1 text-pretty text-lg font-semibold text-white">
                  {item.question}
                </h3>
                <CtaButton
                  type={TYPES[i]}
                  location={`brand_final_${TYPES[i]}`}
                  variant={i === 0 ? "primary" : "ghost"}
                  className="mt-5 w-full"
                >
                  {item.cta}
                </CtaButton>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
