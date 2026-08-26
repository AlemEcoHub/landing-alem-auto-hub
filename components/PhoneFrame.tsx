import Image from "next/image";

// One device frame for every screenshot on the page: the same width, the same
// corner radius and the same 390x844 screen ratio, so the mockups read as one
// set instead of five different crops.
export default function PhoneFrame({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-[232px] select-none sm:w-[256px] lg:w-[272px] ${className}`}
    >
      <div className="relative rounded-[2.25rem] border border-white/10 bg-[#111] p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)] sm:rounded-[2.6rem] sm:p-2.5">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[1.85rem] bg-[#0d0d0d] sm:rounded-[2.2rem]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 232px, (max-width: 1024px) 256px, 272px"
            className="object-cover object-top"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/20"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
