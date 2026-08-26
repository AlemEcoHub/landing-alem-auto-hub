import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import CtaButton from "../../CtaButton";
import { CheckIcon } from "../../Icons";
import type { Dict } from "@/lib/i18n";

// ЭКРАН 7 · КОМПАНИИ И АВТОПАРКИ — сетка машин сама по себе ничего не значила,
// поэтому показываем её как то, чем она является: список автопарка в кабинете.
const CARS = [
  { model: "Toyota Camry", plate: "021 ABC 02", tone: "ok" },
  { model: "Kia K5", plate: "143 KLM 02", tone: "warn" },
  { model: "Hyundai Elantra", plate: "511 DEF 02", tone: "bad" },
  { model: "Kia Rio", plate: "778 GHI 02", tone: "ok" },
  { model: "Toyota Camry", plate: "882 JKL 02", tone: "warn" },
  { model: "Hyundai Accent", plate: "304 MNO 02", tone: "ok" },
  { model: "Hyundai Tucson", plate: "421 PQR 02", tone: "ok" },
  { model: "Hyundai Sonata", plate: "987 STU 02", tone: "warn" },
  { model: "Toyota Corolla", plate: "659 VWX 02", tone: "ok" },
] as const;

const DOT = { ok: "bg-accent-green", warn: "bg-accent-amber", bad: "bg-brand" } as const;
const TEXT = { ok: "text-accent-green", warn: "text-accent-amber", bad: "text-brand-light" } as const;
const STAT_TONE = ["text-white", "text-accent-amber", "text-brand-light"];

export default function Fleet({ t }: { t: Dict }) {
  const f = t.home.fleet;
  const d = f.dashboard;

  return (
    <section id="fleet" className="section relative">
      <div className="container-x">
        <SectionHeading trackId="fleet" eyebrow={f.eyebrow} title={f.title} />

        <Reveal delay={60} className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
          {f.benefits.map((benefit) => (
            <p
              key={benefit}
              className="glass flex items-start gap-2.5 p-4 text-pretty text-sm leading-snug text-white/90"
            >
              <span className="mt-0.5 shrink-0 text-accent-green">
                <CheckIcon width={14} height={14} />
              </span>
              {benefit}
            </p>
          ))}
        </Reveal>

        <Reveal className="glass mt-6 overflow-hidden">
          {/* шапка кабинета */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-semibold text-white">{d.title}</p>
              <p className="mt-0.5 text-xs text-muted">{d.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {f.stats.map((stat, i) => (
                <span
                  key={stat.title}
                  className="flex items-baseline gap-1.5 rounded-full border border-border bg-white/[0.03] px-3 py-1.5"
                >
                  <span className={`font-display text-sm font-bold ${STAT_TONE[i]}`}>
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-muted">{stat.title}</span>
                </span>
              ))}
            </div>
          </div>

          {/* заголовки колонок — только на широком экране */}
          <div className="hidden grid-cols-[1.4fr_1fr_1fr] gap-4 border-b border-border px-6 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted/70 sm:grid">
            <span>{d.columns.car}</span>
            <span>{d.columns.status}</span>
            <span>{d.columns.note}</span>
          </div>

          <div className="divide-y divide-border">
            {CARS.map((car) => (
              <div
                key={car.plate}
                className="grid gap-1 px-5 py-3.5 sm:grid-cols-[1.4fr_1fr_1fr] sm:items-center sm:gap-4 sm:px-6"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${DOT[car.tone]}`} />
                  <span className="text-sm font-medium text-white">{car.model}</span>
                  <span className="font-mono text-[11px] tracking-wide text-muted">
                    {car.plate}
                  </span>
                </div>
                <span className={`pl-[22px] text-[13px] sm:pl-0 ${TEXT[car.tone]}`}>
                  {f.states[car.tone === "ok" ? 0 : car.tone === "warn" ? 1 : 2]}
                </span>
                <span className="pl-[22px] text-[13px] text-muted sm:pl-0">
                  {d.notes[car.tone]}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center gap-5">
          <p className="mx-auto max-w-2xl text-balance text-center text-sm text-muted">
            {f.caption}
          </p>
          <CtaButton type="fleet" location="home_fleet" className="w-full sm:w-auto">
            {f.cta}
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
