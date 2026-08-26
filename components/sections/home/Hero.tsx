import PhoneFrame from "../../PhoneFrame";
import CtaButton from "../../CtaButton";
import Highlight from "../../Highlight";
import type { Dict } from "@/lib/i18n";
import {
  ArrowRight,
  CommunityIcon,
  GarageIcon,
  HistoryIcon,
  MarketIcon,
  RobotIcon,
  WalletIcon,
} from "../../Icons";

// ЭКРАН 1 · HERO — за 3–5 секунд объяснить, вокруг чего строится Alem.
// Вокруг мокапа — реальные разделы приложения, а не абстрактные термины.
const LABEL_STYLE = [
  { Icon: GarageIcon, pos: "left-0 top-6", color: "text-brand-light" },
  { Icon: WalletIcon, pos: "right-0 top-2", color: "text-accent-green" },
  { Icon: RobotIcon, pos: "-left-2 top-1/2", color: "text-accent-purple" },
  { Icon: MarketIcon, pos: "-right-2 top-[58%]", color: "text-accent-amber" },
  { Icon: CommunityIcon, pos: "left-2 bottom-16", color: "text-accent-blue" },
];

export default function Hero({ t }: { t: Dict }) {
  const h = t.home.hero;

  return (
    <section id="top" className="relative overflow-hidden pt-[68px]">
      <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
      <div
        className="glow-brand absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 animate-pulse-glow sm:h-[520px] sm:w-[520px]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-transparent to-bg"
        aria-hidden
      />

      <div className="container-x relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <div className="animate-fade-up text-center lg:text-left">
          <h1 className="text-balance text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-[2.9rem] lg:text-[3.1rem]">
            <Highlight text={h.title} />
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-lg lg:mx-0">
            {h.subtitle}
          </p>

          {/* Конкретные сценарии владельца вместо определений терминов */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {h.scenarios.map((item, i) => (
              <div key={item.title} className="glass p-4 text-left">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="font-mono text-[11px] text-brand-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </p>
                <p className="mt-1 text-pretty text-[13px] leading-snug text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <CtaButton type="owner" location="hero" className="w-full sm:w-auto">
              {h.ctaOwner}
              <ArrowRight width={18} height={18} className="shrink-0" />
            </CtaButton>
            <CtaButton
              type="fleet"
              location="hero"
              variant="ghost"
              className="w-full sm:w-auto"
            >
              {h.ctaFleet}
            </CtaButton>
            <CtaButton
              type="partner"
              location="hero"
              variant="ghost"
              className="w-full sm:w-auto"
            >
              {h.ctaPartner}
            </CtaButton>
          </div>

          <p className="mx-auto mt-6 flex max-w-md items-start justify-center gap-2 text-left text-[13px] leading-relaxed text-muted sm:text-sm lg:mx-0 lg:justify-start">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green" />
            {h.note}
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-lg">
          <div className="glow-brand absolute inset-0 scale-90 blur-2xl" aria-hidden />

          <div className="relative flex w-full flex-col items-center gap-5 py-4 md:h-[560px] md:gap-0 md:py-0">
            <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="md:animate-float">
                <PhoneFrame src="/screens/home.png" alt={h.screenAlt} priority />
              </div>
            </div>

            {LABEL_STYLE.map(({ Icon, pos, color }, i) => (
              <div
                key={h.labels[i]}
                className={`absolute ${pos} hidden animate-float md:flex`}
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <div className="flex items-center gap-2 rounded-full border border-border bg-card/85 px-3 py-2 shadow-lg backdrop-blur-sm">
                  <span className={color}>
                    <Icon width={17} height={17} />
                  </span>
                  <span className="text-xs font-medium text-white">
                    {h.labels[i]}
                  </span>
                </div>
              </div>
            ))}

            {/* На телефоне лейблы вокруг мокапа не помещаются, но разделы
                приложения показать нужно — выносим их строкой под экраном. */}
            <div className="flex flex-wrap justify-center gap-2 md:hidden">
              {h.labels.slice(0, 5).map((label, i) => {
                const { Icon, color } = LABEL_STYLE[i];
                return (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-card/85 px-3 py-1.5"
                  >
                    <span className={color}>
                      <Icon width={14} height={14} />
                    </span>
                    <span className="text-[11px] font-medium text-white">{label}</span>
                  </span>
                );
              })}
              <span className="flex items-center gap-1.5 rounded-full border border-accent-green/35 bg-accent-green/10 px-3 py-1.5">
                <span className="text-accent-green">
                  <HistoryIcon width={14} height={14} />
                </span>
                <span className="text-[11px] font-medium text-white">
                  {h.labels[5]}
                </span>
              </span>
            </div>

            {/* Шестой элемент — то, ради чего всё остальное */}
            <div className="absolute inset-x-0 bottom-0 hidden justify-center md:flex">
              <div className="flex items-center gap-2 rounded-full border border-accent-green/35 bg-accent-green/10 px-3.5 py-2 shadow-lg backdrop-blur-sm">
                <span className="text-accent-green">
                  <HistoryIcon width={17} height={17} />
                </span>
                <span className="text-xs font-medium text-white">
                  {h.labels[5]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
