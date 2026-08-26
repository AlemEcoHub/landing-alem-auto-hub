"use client";

import { useI18n } from "./I18nProvider";
import Reveal from "./Reveal";
import { ArrowRight } from "./Icons";

type Key = "drivers" | "business" | "partners";

// Разделяет главную на три адресных блока. Экраны идут в порядке ТЗ, но теперь
// видно, где заканчивается разговор с водителем и начинается с автопарком.
const ACCENT: Record<Key, { rail: string; text: string; glow: string }> = {
  drivers: {
    rail: "from-brand to-brand-light",
    text: "text-brand-light",
    glow: "bg-brand/25",
  },
  business: {
    rail: "from-accent-amber to-[#ffd27a]",
    text: "text-accent-amber",
    glow: "bg-accent-amber/20",
  },
  partners: {
    rail: "from-accent-blue to-[#7bb8ff]",
    text: "text-accent-blue",
    glow: "bg-accent-blue/20",
  },
};

export default function AudienceChapter({ audience }: { audience: Key }) {
  const { locale, t } = useI18n();
  const chapter = t.chapters[audience];
  const accent = ACCENT[audience];

  return (
    <section className="relative pt-14 sm:pt-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-card/40 px-5 py-6 sm:px-8 sm:py-8">
          <span
            className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${accent.rail}`}
            aria-hidden
          />
          <span
            className={`absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[70px] ${accent.glow}`}
            aria-hidden
          />

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4 sm:gap-5">
              <span
                className={`font-display text-3xl font-bold leading-none sm:text-4xl ${accent.text}`}
              >
                {chapter.index}
              </span>
              <span>
                <span
                  className={`block text-xs font-semibold uppercase tracking-[0.18em] ${accent.text}`}
                >
                  {chapter.label}
                </span>
                <span className="mt-1.5 block text-pretty text-[15px] leading-snug text-white sm:text-lg">
                  {chapter.lead}
                </span>
              </span>
            </div>

            <a
              href={`/${locale}${chapter.href}`}
              className="btn-ghost shrink-0 self-start lg:self-auto"
            >
              {chapter.cta}
              <ArrowRight width={16} height={16} className="shrink-0" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
