// Печатает chat id всех чатов, где боту уже писали.
// Запуск: npm run tg:chat-id  (после того, как вы нажали Start у бота)
import { readFileSync } from "node:fs";

function tokenFromEnv() {
  if (process.env.TELEGRAM_BOT_TOKEN) return process.env.TELEGRAM_BOT_TOKEN;
  try {
    const line = readFileSync(".env", "utf8")
      .split("\n")
      .find((l) => l.startsWith("TELEGRAM_BOT_TOKEN="));
    return line?.slice("TELEGRAM_BOT_TOKEN=".length).trim();
  } catch {
    return undefined;
  }
}

const token = tokenFromEnv();
if (!token) {
  console.error("TELEGRAM_BOT_TOKEN не найден — проверьте .env");
  process.exit(1);
}

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data = await res.json();

if (!data.ok) {
  console.error("Telegram вернул ошибку:", data.description);
  process.exit(1);
}

const chats = new Map();
for (const update of data.result) {
  const chat = update.message?.chat ?? update.my_chat_member?.chat;
  if (chat) chats.set(chat.id, chat);
}

if (chats.size === 0) {
  console.log("Пока ни одного чата.");
  console.log("Откройте https://t.me/alemautohubbot, нажмите Start и запустите команду снова.");
  console.log("Для группы: добавьте бота в группу и напишите там любое сообщение.");
  process.exit(0);
}

console.log("Найденные чаты:\n");
for (const chat of chats.values()) {
  const name = chat.title ?? [chat.first_name, chat.last_name].filter(Boolean).join(" ");
  console.log(`  TELEGRAM_CHAT_ID=${chat.id}   ← ${chat.type}: ${name}`);
}
console.log("\nСкопируйте нужную строку в .env и перезапустите сервер.");
