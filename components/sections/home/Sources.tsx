"use client";

import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import { useInView } from "../../motion/useInView";
import type { Dict } from "@/lib/i18n";
import { ArrowRight } from "../../Icons";

// ЭКРАН 10 · ИСТОЧНИКИ ДАННЫХ — схема проводки: пять источников сходятся в
// единую историю. Провода нарисованы под пятиколоночную сетку, поэтому на
// узком экране, где карточки идут в два столбца, вместо них одна стрелка.
const X = [70, 210, 350, 490, 630];

export default function Sources({ t }: { t: Dict }) {
  const s = t.home.sources;
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section id="sources" className="section relative">
      <div className="container-x">
        <SectionHeading trackId="sources" eyebrow={s.eyebrow} title={s.title} />

        <div ref={ref} className={`mt-10 sm:mt-14 ${inView ? "is-flowing" : ""}`}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {s.items.map((item, i) => (
              <div
                key={item.label}
                className={`glass flex flex-col items-center justify-center gap-2 p-4 text-center ${
                  i === s.items.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <span className="text-pretty text-[13px] font-medium leading-snug text-white">
                  {item.label}
                </span>
                {item.planned && (
                  <span className="rounded-full border border-accent-blue/35 bg-accent-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-blue">
                    {t.status.vision}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Десктоп: провода от каждой карточки сходятся в одну точку */}
          <svg
            viewBox="0 0 700 120"
            className="hidden h-[110px] w-full sm:block"
            aria-hidden
            preserveAspectRatio="none"
          >
            {X.map((x, i) => (
              <path
                key={x}
                className="wire"
                style={{ animationDelay: `${i * 0.14}s` }}
                d={`M ${x} 0 C ${x} 60, 350 50, 350 118`}
              />
            ))}
            <circle className="wire-spark" cx="350" cy="118" r="4" />
          </svg>

          {/* Телефон: карточки в два столбца, поэтому вместо проводки стрелка */}
          <div className="flex justify-center py-5 sm:hidden" aria-hidden>
            <span className="text-2xl text-brand-light">↓</span>
          </div>

          <div className="glass border-brand/30 bg-gradient-to-br from-brand/[0.1] to-transparent p-5 sm:-mt-2 sm:p-7">
            <p className="text-center font-display text-base font-bold uppercase tracking-[0.2em] text-brand-light">
              {s.hubTitle}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
              {s.hubFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2.5">
                  <span
                    className="hub-step rounded-xl border border-border bg-white/[0.03] px-3.5 py-2 text-pretty text-[13px] font-medium text-white"
                    style={{ animationDelay: `${0.9 + i * 0.12}s` }}
                  >
                    {step}
                  </span>
                  {i < s.hubFlow.length - 1 && (
                    <span className="shrink-0 text-muted" aria-hidden>
                      <ArrowRight width={16} height={16} />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mx-auto mt-6 max-w-2xl text-balance text-center text-xs leading-relaxed text-muted/80">
          {t.status.plannedNote}
        </Reveal>
      </div>
    </section>
  );
}
