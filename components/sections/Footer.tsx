"use client";

import Logo from "../Logo";
import LanguageSwitcher from "../LanguageSwitcher";
import { InstagramIcon, WhatsAppIcon } from "../Icons";
import { BRAND } from "@/lib/content";
import { useI18n } from "../I18nProvider";
import { track } from "@/lib/analytics";
import { withBasePath } from "@/lib/basePath";

export default function Footer() {
  const { locale, t } = useI18n();

  const localeHref = (href: string) =>
    href.startsWith("/")
      ? withBasePath(`/${locale}${href === "/" ? "" : href}`)
      : href;

  return (
    <footer
      id="contacts"
      className="pb-action-bar border-t border-border bg-surface/60"
    >
      <div className="container-x py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted">
              {t.footer.about}
            </p>
            <div className="mt-5 flex gap-3">
              <SocialLink
                href={BRAND.whatsappLink}
                label="WhatsApp"
                event="whatsapp_click"
              >
                <WhatsAppIcon width={18} height={18} />
              </SocialLink>
              <SocialLink
                href={BRAND.instagram}
                label="Instagram"
                event="instagram_click"
              >
                <InstagramIcon width={18} height={18} />
              </SocialLink>
            </div>
            <LanguageSwitcher className="mt-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              {t.footer.navTitle}
            </p>
            <ul className="mt-4 space-y-2.5">
              {t.nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={localeHref(l.href)}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              {t.footer.contactsTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>{t.footer.city}</li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-colors hover:text-white"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { location: "footer" })}
                  className="transition-colors hover:text-white"
                >
                  {BRAND.whatsapp} · WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. {t.footer.rights}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
            <a
              href={withBasePath(`/${locale}/privacy`)}
              className="transition-colors hover:text-white"
            >
              {t.footer.privacy}
            </a>
            <span aria-hidden>·</span>
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  event,
  children,
}: {
  href: string;
  label: string;
  event: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() => track(event, { location: "footer" })}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-muted transition-all hover:border-white/20 hover:text-white"
    >
      {children}
    </a>
  );
}
