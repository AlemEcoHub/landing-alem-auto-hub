import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import Highlight from "../../Highlight";
import ScanCar from "../../motion/ScanCar";
import type { Dict } from "@/lib/i18n";
import { ArrowRight, CheckIcon } from "../../Icons";

// Сценарий пользователя — вместо трёх экранов про отдельные функции
// (Digital Garage, светофор, Auto Box) один сквозной путь: как машина
// попадает в систему и как из этого вырастает подтверждённая история.
export default function Scenario({ t }: { t: Dict }) {
  const s = t.home.scenario;

  return (
    <section id="product" className="section relative overflow-hidden">
      <div
        className="absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-accent-green/10 blur-[130px]"
        aria-hidden
      />
      <div className="container-x relative">
        <SectionHeading
          trackId="scenario"
          eyebrow={s.eyebrow}
          title={s.title}
          subtitle={s.lead}
        />

        {/* Восемь шагов одной истории */}
        <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {s.steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={(i % 4) * 60}
              className={`glass glass-hover relative flex flex-col p-4 sm:p-5 ${
                i === 4 ? "border-accent-purple/35" : ""
              }`}
            >
              <span
                className={`font-mono text-xs ${
                  i === 4 ? "text-accent-purple" : "text-brand-light"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-pretty text-[15px] font-semibold leading-snug text-white">
                {step.title}
              </h3>
              <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-muted">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>

        {/* ИИ — слой поверх данных, а не ещё одна функция в списке */}
        <Reveal
          delay={120}
          className="glass mt-4 border-accent-purple/30 bg-gradient-to-br from-accent-purple/[0.08] to-transparent p-5 sm:p-7"
        >
          <p className="text-pretty text-base font-semibold text-white sm:text-lg">
            {s.aiTitle}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            {s.aiFlow.map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="rounded-lg border border-border bg-white/[0.03] px-3 py-1.5 text-[13px] text-white">
                  {step}
                </span>
                {i < s.aiFlow.length - 1 && (
                  <span className="text-accent-purple" aria-hidden>
                    <ArrowRight width={16} height={16} />
                  </span>
                )}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Почему исходным данным можно верить */}
        <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-2">
          <Reveal className="glass overflow-hidden">
            <p className="border-b border-border px-5 py-4 text-sm font-semibold text-white sm:px-6">
              {s.boxTitle}
            </p>
            <div className="grid grid-cols-2 border-b border-border">
              <p className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted sm:px-6">
                {s.usualLabel}
              </p>
              <p className="border-l border-border px-5 py-3 text-xs font-medium uppercase tracking-wider text-accent-green sm:px-6">
                {s.alemLabel}
              </p>
            </div>
            {s.rows.map((row) => (
              <div
                key={row.alem}
                className="grid grid-cols-2 border-b border-border last:border-b-0"
              >
                <p className="px-5 py-4 text-pretty text-sm leading-snug text-muted sm:px-6">
                  {row.usual}
                </p>
                <p className="flex items-start gap-2 border-l border-border px-5 py-4 text-pretty text-sm leading-snug text-white/90 sm:px-6">
                  <span className="mt-0.5 shrink-0 text-accent-green">
                    <CheckIcon width={14} height={14} />
                  </span>
                  {row.alem}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className="glass flex items-center p-5 sm:p-6">
            <ScanCar labels={s.scanPins} alt={s.scanAlt} />
          </Reveal>
        </div>

        <Reveal delay={80} className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-balance text-xl font-bold leading-snug text-white sm:text-2xl">
            <Highlight text={s.closing} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
