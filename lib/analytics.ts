// Lightweight analytics event dispatcher.
// Forwards to Google Analytics (gtag), Meta Pixel (fbq) and Yandex.Metrika (ym)
// when they are present. Safe to call on the server (no-ops).

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const UTM_KEY = "aah_attribution";
const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

// Attribution is captured once per session on the first landing and then sent
// with every event and every lead (spec §5).
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(UTM_KEY)) return;
    const url = new URLSearchParams(window.location.search);
    const data: Record<string, string> = {};
    UTM_FIELDS.forEach((field) => {
      const value = url.get(field);
      if (value) data[field] = value;
    });
    if (document.referrer) data.referrer = document.referrer;
    data.landing = window.location.pathname;
    sessionStorage.setItem(UTM_KEY, JSON.stringify(data));
  } catch {
    /* private mode — attribution is optional */
  }
}

export function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function track(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  const enriched = { ...getAttribution(), ...params };

  try {
    window.gtag?.("event", event, enriched);
    window.fbq?.("trackCustom", event, enriched);
    // Replace 0 with your real Yandex.Metrika counter id when integrating.
    if (window.ym) window.ym(0, "reachGoal", event, enriched);
    // Always push to dataLayer so GTM can pick it up too.
    (window.dataLayer ??= []).push({ event, ...enriched });
  } catch {
    /* analytics must never break the UI */
  }
}
