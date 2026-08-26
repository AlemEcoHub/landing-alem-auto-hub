import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import StatusBadge, { type Status } from "../../StatusBadge";
import type { Dict } from "@/lib/i18n";
import {
  BoxIcon,
  CommunityIcon,
  GarageIcon,
  HistoryIcon,
  MarketIcon,
  PartnersIcon,
  RobotIcon,
  WalletIcon,
} from "../../Icons";

const MAIN_STYLE = [
  { Icon: GarageIcon, color: "text-brand-light", ring: "border-brand/30", highlight: false },
  { Icon: HistoryIcon, color: "text-accent-blue", ring: "border-accent-blue/30", highlight: false },
  { Icon: BoxIcon, color: "text-accent-green", ring: "border-accent-green/30", highlight: true },
  { Icon: PartnersIcon, color: "text-accent-blue", ring: "border-accent-blue/30", highlight: false },
];

const MORE_STYLE = [RobotIcon, MarketIcon, WalletIcon, CommunityIcon];

export default function DriverFeatures({ t }: { t: Dict }) {
  const f = t.drivers.features;

  return (
    <section id="features" className="section relative">
      <div className="container-x">
        <SectionHeading trackId="driver_features" eyebrow={f.eyebrow} title={f.title} />

        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2">
          {f.main.map((item, i) => {
            const s = MAIN_STYLE[i];
            return (
              <Reveal
                key={item.title}
                delay={(i % 2) * 70}
                className={`glass glass-hover flex flex-col p-5 sm:p-6 ${
                  s.highlight
                    ? "border-accent-green/30 bg-gradient-to-br from-accent-green/[0.06] to-transparent"
                    : ""
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-white/[0.03] ${s.ring} ${s.color}`}
                  >
                    <s.Icon width={24} height={24} />
                  </span>
                  <StatusBadge status={item.status as Status} />
                </div>
                <h3 className="text-pretty text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className={`mt-1 text-pretty text-xs font-medium ${s.color}`}>
                  {item.tag}
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
            {f.moreTitle}
          </p>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {f.more.map((item, i) => {
              const Icon = MORE_STYLE[i];
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 border-t border-border pt-4"
                >
                  <span className="mt-0.5 flex-shrink-0 text-muted">
                    <Icon width={18} height={18} />
                  </span>
                  <p className="text-pretty text-sm leading-relaxed text-muted">
                    <span className="mr-2 inline-flex items-center gap-2 align-middle">
                      <span className="font-semibold text-white">{item.title}</span>
                      <StatusBadge status={item.status as Status} />
                    </span>
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
