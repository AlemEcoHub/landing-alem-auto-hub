import Reveal from "../../Reveal";
import PhoneFrame from "../../PhoneFrame";
import CtaButton from "../../CtaButton";
import Highlight from "../../Highlight";
import StatusBadge from "../../StatusBadge";
import type { Dict } from "@/lib/i18n";
import { MarketIcon } from "../../Icons";

export default function DriverMarketplace({ t }: { t: Dict }) {
  const m = t.drivers.marketplace;

  return (
    <section className="section relative">
      <div className="container-x">
        <Reveal className="glass relative overflow-hidden">
          <div
            className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-accent-amber/10 blur-[100px]"
            aria-hidden
          />
          <div className="grid items-center gap-8 p-5 sm:p-10 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow border-accent-amber/30 text-accent-amber">
                  <MarketIcon width={14} height={14} />
                  {m.eyebrow}
                </span>
                <StatusBadge status="mockup" />
              </div>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight sm:text-3xl">
                <Highlight text={m.title} />
              </h2>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
                {m.text}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7">
                <CtaButton type="owner" location="driver_marketplace" className="w-full sm:w-auto">
                  {m.cta}
                </CtaButton>
              </div>
            </div>

            <div className="relative order-1 flex justify-center lg:order-2">
              <div className="glow-brand absolute inset-0 scale-90 opacity-40 blur-2xl" aria-hidden />
              <PhoneFrame src="/screens/marketplace.png" alt={m.screenAlt} className="relative" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
