const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);

app.post("/", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  await bot.sendMessage(chatId, "📥 Скачиваю видео...");

  try {
    await bot.sendMessage(chatId, "❌ Пока тест. Скоро будет скачивание видео 😎");
  } catch (err) {
    await bot.sendMessage(chatId, "Ошибка 😢");
  }
});

app.listen(3000, () => console.log("Bot started"));
