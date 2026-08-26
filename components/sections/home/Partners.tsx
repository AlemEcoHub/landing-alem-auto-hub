import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import CtaButton from "../../CtaButton";
import FlowChain from "../../FlowChain";
import type { Dict } from "@/lib/i18n";
import { HistoryIcon, PartnersIcon, WalletIcon } from "../../Icons";

// ЭКРАН 9 · ДЛЯ ПАРТНЁРОВ — сразу отвечаем бизнесу: что я получаю.
const CARD_STYLE = [
  { Icon: PartnersIcon, color: "text-accent-blue", ring: "border-accent-blue/30" },
  { Icon: WalletIcon, color: "text-brand-light", ring: "border-brand/30" },
  { Icon: HistoryIcon, color: "text-accent-green", ring: "border-accent-green/30" },
];

export default function Partners({ t }: { t: Dict }) {
  const p = t.home.partners;

  return (
    <section id="partners" className="section relative">
      <div className="container-x">
        <SectionHeading trackId="partners" eyebrow={p.eyebrow} title={p.title} />

        <Reveal delay={60} className="mt-10 sm:mt-14">
          <FlowChain steps={p.exchange} />
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {p.cards.map((card, i) => {
            const s = CARD_STYLE[i];
            return (
              <Reveal
                key={card.title}
                delay={i * 80}
                className="glass glass-hover p-5 sm:p-6"
              >
                <span
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border bg-white/[0.03] ${s.ring} ${s.color}`}
                >
                  <s.Icon width={21} height={21} />
                </span>
                <h3 className="text-pretty text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                  {card.text}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={220}
          className="glass mt-4 border-accent-blue/25 bg-gradient-to-br from-accent-blue/[0.07] to-transparent p-5 sm:p-7"
        >
          <h3 className="text-pretty text-lg font-semibold text-white">
            {p.wide.title}
          </h3>
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {p.wide.text}
          </p>
        </Reveal>

        <Reveal className="mt-8 flex justify-center">
          <CtaButton
            type="partner"
            location="home_partners"
            className="w-full sm:w-auto"
          >
            {p.cta}
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
