import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import type { Dict } from "@/lib/i18n";

export default function DriverHow({ t }: { t: Dict }) {
  const h = t.drivers.how;

  return (
    <section className="section relative">
      <div className="container-x">
        <SectionHeading trackId="driver_how" eyebrow={h.eyebrow} title={h.title} />

        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {h.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80} className="relative">
              {i < h.steps.length - 1 && (
                <span
                  className="absolute left-[26px] top-[26px] hidden h-px w-full bg-gradient-to-r from-brand/50 to-transparent xl:block"
                  aria-hidden
                />
              )}
              <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-brand/40 bg-gradient-to-br from-[#181818] to-[#111] text-lg font-bold text-brand-light shadow-[0_10px_30px_-12px_rgba(232,67,30,0.6)]">
                {i + 1}
              </div>
              <h3 className="mt-4 text-pretty text-base font-semibold text-white sm:mt-5">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
