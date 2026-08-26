import SectionHeading from "../../SectionHeading";
import Reveal from "../../Reveal";
import FlowChain from "../../FlowChain";
import type { Dict } from "@/lib/i18n";

export default function BusinessContractors({ t }: { t: Dict }) {
  const c = t.business.contractors;

  return (
    <section className="section relative">
      <div className="container-x">
        <SectionHeading
          trackId="business_contractors"
          eyebrow={c.eyebrow}
          title={c.title}
          subtitle={c.text}
        />
        <Reveal className="mt-10 sm:mt-14">
          <FlowChain steps={c.chain} />
        </Reveal>
      </div>
    </section>
  );
}
