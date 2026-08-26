import Reveal from "../../Reveal";
import Highlight from "../../Highlight";
import HeadlightText from "../../motion/HeadlightText";
import type { Dict } from "@/lib/i18n";
import { ArrowRight, CarIcon, CheckIcon } from "../../Icons";

// ЭКРАН 2 · ПРОБЛЕМА — боль и ответ на неё видны сразу, без наведения и тапа:
// раньше решение было спрятано за переворотом карточки и на мобильном не
// читалось вовсе.
export default function Problem({ t }: { t: Dict }) {
  const p = t.home.problem;

  return (
    <section id="problem" className="section relative">
      <div className="container-x">
        <Reveal trackId="problem" className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{p.eyebrow}</span>
          <div className="mt-4">
            <HeadlightText className="heading">
              <Highlight text={p.title} />
            </HeadlightText>
          </div>
        </Reveal>

        {/* Разрозненные источники собираются в одну карточку автомобиля */}
        <Reveal delay={80} className="mt-10 sm:mt-12">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6">
            <div className="glass w-full flex-1 p-5">
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {p.scattered.map((chip, i) => (
                  <span
                    key={chip}
                    className="rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-xs text-muted"
                    style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (1 + i)}deg)` }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <span className="shrink-0 rotate-90 text-brand-light lg:rotate-0" aria-hidden>
              <ArrowRight width={26} height={26} />
            </span>

            <div className="glass w-full flex-1 border-brand/35 bg-gradient-to-br from-brand/[0.1] to-transparent p-5">
              <p className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-light text-white">
                  <CarIcon width={20} height={20} />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-white">
                    {p.collected.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {p.collected.text}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Проблема и ответ в одной карточке — ничего не спрятано */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {p.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 70}
              className="glass glass-hover flex flex-col p-5 sm:p-6"
            >
              <h3 className="text-pretty text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">
                {item.text}
              </p>
              <div className="mt-5 border-t border-accent-green/25 pt-4">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent-green">
                  <CheckIcon width={13} height={13} />
                  {p.answerLabel}
                </p>
                <p className="mt-2 text-pretty text-sm font-medium leading-relaxed text-white">
                  {item.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Главная боль — вынесена крупно */}
        <Reveal
          delay={220}
          className="glass mt-4 border-brand/30 bg-gradient-to-br from-brand/[0.09] to-transparent p-6 sm:p-9"
        >
          <h3 className="text-balance text-xl font-bold text-white sm:text-2xl">
            {p.wide.title}
          </h3>
          <p className="mt-3 max-w-3xl text-pretty text-[15px] leading-relaxed text-muted sm:text-lg">
            {p.wide.text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
