import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import type { Dict } from "@/lib/i18n";
import { BellIcon, HistoryIcon, ShieldIcon, WalletIcon } from "../../Icons";

const ICONS = [ShieldIcon, BellIcon, HistoryIcon, WalletIcon];

export default function BusinessValue({ t }: { t: Dict }) {
  const v = t.business.value;

  return (
    <section id="value" className="section relative">
      <div className="container-x">
        <SectionHeading trackId="business_value" eyebrow={v.eyebrow} title={v.title} />

        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2">
          {v.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                key={item.title}
                delay={(i % 2) * 70}
                className="glass glass-hover flex items-start gap-4 p-5 sm:p-6"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-brand-light">
                  <Icon width={21} height={21} />
                </span>
                <span>
                  <span className="block text-pretty text-[15px] font-semibold text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-pretty text-sm leading-relaxed text-muted">
                    {item.text}
                  </span>
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
