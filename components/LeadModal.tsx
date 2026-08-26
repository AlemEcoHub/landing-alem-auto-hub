"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CloseIcon } from "./Icons";
import { getAttribution, track } from "@/lib/analytics";
import { useI18n } from "./I18nProvider";
import type { Dict } from "@/lib/i18n";
import type { LeadType } from "./ModalProvider";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadModal({
  type,
  onClose,
}: {
  type: LeadType;
  onClose: () => void;
}) {
  const { locale, t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const started = useRef(false);
  const copy = t.modal[type];

  const handleFirstInput = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { type, locale });
  };

  useEffect(() => {
    // Focusing straight away pops the keyboard on mobile and hides the form,
    // so only desktop gets an autofocus.
    if (window.matchMedia("(min-width: 640px)").matches) {
      firstFieldRef.current?.focus();
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, locale, ...getAttribution(), ...payload }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      track(`lead_${type}_submit`, { type, locale });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <div className="animate-fade-up relative max-h-[92dvh] w-full max-w-lg overflow-hidden rounded-t-3xl border border-border bg-[#0e0e0e] shadow-2xl sm:max-h-[90vh] sm:rounded-3xl">
        <div className="h-1 w-full bg-gradient-to-r from-brand to-brand-light" />

        <button
          onClick={onClose}
          aria-label={t.common.close}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[#141414] text-muted transition hover:text-white"
        >
          <CloseIcon width={18} height={18} />
        </button>

        <div className="max-h-[calc(92dvh-4px)] overflow-y-auto p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:max-h-[calc(90vh-4px)] sm:p-8">
          {status === "success" ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-green/15 text-accent-green">
                <CheckIcon width={32} height={32} />
              </div>
              <h3 className="mb-2 text-xl font-bold">{t.modal.sent}</h3>
              <p className="mx-auto max-w-sm text-pretty text-sm leading-relaxed text-muted">
                {copy.success}
              </p>
              <button onClick={onClose} className="btn-primary mt-6">
                {t.modal.done}
              </button>
            </div>
          ) : (
            <>
              <h3
                id="lead-modal-title"
                className="pr-12 text-balance text-xl font-bold sm:text-2xl"
              >
                {copy.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                {copy.subtitle}
              </p>

              <form
                onSubmit={handleSubmit}
                onInput={handleFirstInput}
                className="mt-6 space-y-4"
              >
                {type === "owner" && <OwnerFields t={t} firstRef={firstFieldRef} />}
                {type === "fleet" && <FleetFields t={t} firstRef={firstFieldRef} />}
                {type === "partner" && <PartnerFields t={t} firstRef={firstFieldRef} />}

                {status === "error" && (
                  <p className="rounded-lg border border-brand/40 bg-brand/10 px-3 py-2 text-sm text-brand-light">
                    {t.modal.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? t.modal.sending : copy.button}
                </button>

                <p className="text-pretty text-center text-xs leading-relaxed text-muted/70">
                  {t.modal.consent}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- field building blocks ---------- */

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">
        {label}
        {required && <span className="text-brand-light"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-base text-white outline-none transition placeholder:text-muted/50 focus:border-brand/60 focus:bg-white/[0.05] sm:text-sm";

function OwnerFields({
  t,
  firstRef,
}: {
  t: Dict;
  firstRef: React.RefObject<HTMLInputElement>;
}) {
  const f = t.modal.fields;
  return (
    <>
      <Field label={f.name} required>
        <input
          ref={firstRef}
          name="name"
          required
          autoComplete="name"
          placeholder={f.namePlaceholder}
          className={inputCls}
        />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.phone} required>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            placeholder="+7 700 000 00 00"
            className={inputCls}
          />
        </Field>
        <Field label={f.city}>
          <select name="city" className={inputCls} defaultValue="">
            <option value="" disabled>
              {f.cityPlaceholder}
            </option>
            {t.modal.cities.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {/* Kept out of the way: two required fields convert far better than five,
          and anyone who wants to add detail still can. */}
      <details className="group rounded-xl border border-border bg-white/[0.02] px-4 py-3">
        <summary className="cursor-pointer list-none text-xs font-medium text-muted transition-colors marker:hidden hover:text-white">
          {t.modal.fields.moreDetails}
          <span className="ml-1 inline-block transition-transform group-open:rotate-90">
            ›
          </span>
        </summary>
        <div className="mt-4 space-y-4">
          <Field label={f.car}>
            <input name="car" placeholder={f.carPlaceholder} className={inputCls} />
          </Field>
          <Field label={f.comment}>
            <textarea
              name="comment"
              rows={2}
              placeholder={f.commentPlaceholder}
              className={inputCls}
            />
          </Field>
        </div>
      </details>
    </>
  );
}

function FleetFields({
  t,
  firstRef,
}: {
  t: Dict;
  firstRef: React.RefObject<HTMLInputElement>;
}) {
  const f = t.modal.fields;
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.company} required>
          <input
            ref={firstRef}
            name="company"
            required
            autoComplete="organization"
            placeholder={f.companyPlaceholder}
            className={inputCls}
          />
        </Field>
        <Field label={f.fleetSize} required>
          <select name="fleetSize" required className={inputCls} defaultValue="">
            <option value="" disabled>
              {f.fleetSizePlaceholder}
            </option>
            {t.modal.fleetSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.city} required>
          <select name="city" required className={inputCls} defaultValue="">
            <option value="" disabled>
              {f.cityPlaceholder}
            </option>
            {t.modal.cities.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={f.contact} required>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder={f.namePlaceholder}
            className={inputCls}
          />
        </Field>
      </div>
      <Field label={f.phone} required>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="+7 700 000 00 00"
          className={inputCls}
        />
      </Field>
      <Field label={f.comment}>
        <textarea
          name="comment"
          rows={2}
          placeholder={f.fleetComment}
          className={inputCls}
        />
      </Field>
    </>
  );
}

function PartnerFields({
  t,
  firstRef,
}: {
  t: Dict;
  firstRef: React.RefObject<HTMLInputElement>;
}) {
  const f = t.modal.fields;
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.company} required>
          <input
            ref={firstRef}
            name="company"
            required
            autoComplete="organization"
            placeholder={f.companyPlaceholder}
            className={inputCls}
          />
        </Field>
        <Field label={f.business} required>
          <select name="business" required className={inputCls} defaultValue="">
            <option value="" disabled>
              {f.businessPlaceholder}
            </option>
            {t.modal.partnerTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.city} required>
          <select name="city" required className={inputCls} defaultValue="">
            <option value="" disabled>
              {f.cityPlaceholder}
            </option>
            {t.modal.cities.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={f.contact} required>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder={f.namePlaceholder}
            className={inputCls}
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.phone} required>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            placeholder="+7 700 000 00 00"
            className={inputCls}
          />
        </Field>
        <Field label={f.messenger}>
          <input
            name="messenger"
            placeholder={f.messengerPlaceholder}
            className={inputCls}
          />
        </Field>
      </div>
      <Field label={f.comment}>
        <textarea
          name="comment"
          rows={2}
          placeholder={f.partnerComment}
          className={inputCls}
        />
      </Field>
    </>
  );
}
