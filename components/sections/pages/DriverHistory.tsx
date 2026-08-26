import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import PhoneFrame from "../../PhoneFrame";
import CtaButton from "../../CtaButton";
import VerifiedStamp from "../../motion/VerifiedStamp";
import type { Dict } from "@/lib/i18n";
import { CheckIcon, HistoryIcon } from "../../Icons";

export default function DriverHistory({ t }: { t: Dict }) {
  const h = t.drivers.history;

  return (
    <section id="history" className="section relative overflow-hidden">
      <div
        className="absolute -left-10 top-1/4 h-[360px] w-[360px] rounded-full bg-accent-blue/10 blur-[120px]"
        aria-hidden
      />
      <div className="container-x relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              trackId="driver_history"
              center={false}
              eyebrow={h.eyebrow}
              title={h.title}
              subtitle={h.subtitle}
            />

            <ul className="mt-8 space-y-3">
              {h.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-blue/15 text-accent-blue">
                    <CheckIcon width={12} height={12} />
                  </span>
                  <span className="text-pretty text-sm leading-relaxed text-white/90">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <CtaButton type="owner" location="driver_history" className="w-full sm:w-auto">
                {h.cta}
              </CtaButton>
            </div>
          </div>

          <Reveal delay={120} className="relative">
            <div className="glow-brand absolute inset-0 scale-90 opacity-30 blur-2xl" aria-hidden />
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 -mr-16 hidden translate-y-6 -rotate-6 sm:block">
                <PhoneFrame
                  src="/screens/service-history.png"
                  alt={h.screenAltList}
                  className="opacity-95"
                />
              </div>
              <div className="relative z-20 sm:rotate-3">
                <VerifiedStamp>
                  <HistoryIcon width={13} height={13} className="shrink-0" />
                  {h.badge}
                </VerifiedStamp>
                <PhoneFrame src="/screens/service-report.png" alt={h.screenAltReport} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
