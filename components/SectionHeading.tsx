import Reveal from "./Reveal";
import Highlight from "./Highlight";
import HeadlightText from "./motion/HeadlightText";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  trackId,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  trackId?: string;
}) {
  return (
    <Reveal
      trackId={trackId}
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <div className={eyebrow ? "mt-4" : ""}>
        <HeadlightText className="heading">
          <Highlight text={title} />
        </HeadlightText>
      </div>
      {subtitle && (
        <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
