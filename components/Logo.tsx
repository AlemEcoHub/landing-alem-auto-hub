import Image from "next/image";
import { withBasePath } from "@/lib/basePath";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={withBasePath("/logo-mark.png")}
        alt=""
        width={44}
        height={33}
        priority
        className="h-[30px] w-auto sm:h-[33px]"
      />
      <span className="text-[15px] font-bold leading-none tracking-tight">
        Alem<span className="text-brand"> Auto Hub</span>
      </span>
    </div>
  );
}
