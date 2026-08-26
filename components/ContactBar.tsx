"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Icons";
import { BRAND } from "@/lib/content";
import { useLeadModal } from "./ModalProvider";
import { useI18n } from "./I18nProvider";
import { track } from "@/lib/analytics";

// Mobile gets a sticky action bar (the main traffic source, so the CTA should
// never be more than a thumb away); desktop keeps the floating WhatsApp button.
export default function ContactBar() {
  const { open } = useLeadModal();
  const { locale, t } = useI18n();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-300 sm:hidden ${
          shown ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              track("cta_early_access_click", { location: "mobile_bar", locale });
              open("owner");
            }}
            className="btn-primary min-h-[46px] flex-1 text-[13px]"
          >
            {t.common.earlyAccess}
          </button>
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.common.writeWhatsApp}
            onClick={() => track("whatsapp_click", { location: "mobile_bar" })}
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white"
          >
            <WhatsAppIcon width={24} height={24} />
          </a>
        </div>
      </div>

      <a
        href={BRAND.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.common.writeWhatsApp}
        onClick={() => track("whatsapp_click", { location: "float" })}
        className="group fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 sm:flex"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <WhatsAppIcon className="relative" width={28} height={28} />
      </a>
    </>
  );
}
