// Формирование сообщения о заявке для Telegram.
// Вынесено из route.ts, чтобы формат можно было проверить отдельно.

export type LeadType = "owner" | "fleet" | "partner";

export interface LeadPayload {
  type?: LeadType;
  [key: string]: unknown;
}

const TITLES: Record<LeadType, string> = {
  owner: "🚗 Новая заявка — Автовладелец",
  fleet: "🚚 Новая заявка — Автопарк",
  partner: "🤝 Новая заявка — Партнёр",
};

// Порядок и подписи полей формы. Всё, чего здесь нет, уходит в блок источника.
const FIELDS: [string, string][] = [
  ["company", "Компания"],
  ["business", "Тип бизнеса"],
  ["fleetSize", "Размер автопарка"],
  ["name", "Контакт"],
  ["phone", "Телефон"],
  ["messenger", "Мессенджер"],
  ["city", "Город"],
  ["car", "Автомобиль"],
  ["comment", "Комментарий"],
];

const ATTRIBUTION: [string, string][] = [
  ["utm_source", "Источник"],
  ["utm_medium", "Канал"],
  ["utm_campaign", "Кампания"],
  ["utm_content", "Объявление"],
  ["utm_term", "Ключ"],
  ["referrer", "Переход с"],
  ["landing", "Страница входа"],
  ["locale", "Язык сайта"],
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function line(label: string, value: unknown): string | null {
  const text = String(value ?? "").trim();
  if (!text) return null;
  return `<b>${label}:</b> ${escapeHtml(text)}`;
}

export function formatLead(body: LeadPayload, now = new Date()): string {
  const type = (body.type ?? "owner") as LeadType;

  const main = FIELDS.map(([key, label]) => line(label, body[key])).filter(
    Boolean,
  ) as string[];

  const source = ATTRIBUTION.map(([key, label]) => line(label, body[key])).filter(
    Boolean,
  ) as string[];

  const stamp = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Almaty",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  const blocks = [`<b>${TITLES[type]}</b>`, main.join("\n")];
  if (source.length) blocks.push(source.join("\n"));
  blocks.push(`<i>${stamp} · Астана</i>`);

  return blocks.join("\n\n");
}
