import { NextResponse } from "next/server";
import { formatLead, type LeadPayload } from "@/lib/leadMessage";

// Lead intake endpoint.
//
// By default it validates + logs the lead. To deliver leads, set the relevant
// environment variables and the handler will forward automatically:
//
//   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID  → sends a message to a Telegram chat
//   LEAD_WEBHOOK_URL                       → POSTs the JSON to any webhook
//                                            (Google Sheets / CRM / Make / n8n)

export const runtime = "nodejs";

function isValid(body: LeadPayload): boolean {
  if (!["owner", "fleet", "partner"].includes(String(body.type))) return false;
  if (!body.phone || String(body.phone).trim().length < 5) return false;
  if (body.type === "owner" && !body.name) return false;
  if (body.type !== "owner" && !body.company) return false;
  return true;
}

async function forwardTelegram(body: LeadPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[lead] telegram is not configured — set TELEGRAM_CHAT_ID");
    return;
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLead(body),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  // Telegram отвечает 200 даже на отклонённый запрос, поэтому читаем тело.
  if (!res.ok) {
    console.error("[lead] telegram http error", res.status);
    return;
  }
  const data = (await res.json()) as { ok?: boolean; description?: string };
  if (!data.ok) console.error("[lead] telegram rejected:", data.description);
}

async function forwardWebhook(body: LeadPayload) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, receivedAt: new Date().toISOString() }),
  });
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "Invalid lead data" }, { status: 422 });
  }

  try {
    // Fire-and-forward to whichever channels are configured.
    await Promise.allSettled([forwardTelegram(body), forwardWebhook(body)]);
    // Always keep a server-side trace.
    console.log("[lead]", JSON.stringify(body));
  } catch (err) {
    console.error("[lead] delivery error", err);
    // We still accept the lead so the user gets a success state; the log above
    // preserves the data for manual recovery.
  }

  return NextResponse.json({ ok: true });
}
