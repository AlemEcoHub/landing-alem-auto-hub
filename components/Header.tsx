"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { MenuIcon, CloseIcon } from "./Icons";
import { useLeadModal } from "./ModalProvider";
import { useI18n } from "./I18nProvider";
import { track } from "@/lib/analytics";
import { withBasePath } from "@/lib/basePath";

export default function Header() {
  const { open } = useLeadModal();
  const { locale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the page behind the open mobile menu from scrolling away under it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Nav entries are stored as plain paths; every link needs the /ru or /kk prefix.
  const localeHref = (href: string) =>
    href.startsWith("/")
      ? withBasePath(`/${locale}${href === "/" ? "" : href}`)
      : href;

  const handleCta = (location: string) => {
    track("cta_early_access_click", { location, locale });
    open("owner");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-3">
        <a href={withBasePath(`/${locale}`)} aria-label={t.common.home} className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={localeHref(link.href)}
              className="text-[13px] text-muted transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => handleCta("header")}
            className="btn-primary hidden text-[13px] lg:inline-flex"
          >
            {t.common.earlyAccessShort}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.common.close : t.common.menu}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-white xl:hidden"
          >
            {menuOpen ? (
              <CloseIcon width={20} height={20} />
            ) : (
              <MenuIcon width={20} height={20} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-border bg-bg/95 backdrop-blur-xl xl:hidden">
          <nav className="container-x flex flex-col py-3">
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={localeHref(link.href)}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/60 py-3.5 text-[15px] text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                handleCta("header_menu");
              }}
              className="btn-primary mt-4 w-full"
            >
              {t.common.earlyAccess}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
