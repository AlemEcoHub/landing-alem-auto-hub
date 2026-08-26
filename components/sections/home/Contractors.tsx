import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import FlowChain from "../../FlowChain";
import type { Dict } from "@/lib/i18n";

// ЭКРАН 8 · СУЩЕСТВУЮЩИЕ ПОДРЯДЧИКИ — B2B → партнёр → данные автомобиля.
export default function Contractors({ t }: { t: Dict }) {
  const c = t.home.contractors;

  return (
    <section className="section relative">
      <div className="container-x">
        <SectionHeading trackId="contractors" eyebrow={c.eyebrow} title={c.title} />

        <Reveal className="mt-10 sm:mt-14">
          <FlowChain steps={c.chain} />
        </Reveal>

        <Reveal className="mt-8 text-balance text-center text-[15px] leading-relaxed text-muted sm:text-base">
          {c.caption}
        </Reveal>
      </div>
    </section>
  );
}
