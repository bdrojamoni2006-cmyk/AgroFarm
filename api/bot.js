import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('বস স্বাগতম AgroFarm Bot এ! \n/recharge txid দিয়ে পেমেন্ট ভেরিফাই করো'));

bot.command('recharge', async (ctx) => {
  const txid = ctx.message.text.split(' ')[1];
  if (!txid) return ctx.reply('বস TxID দাও। Format: /recharge 0x...');
  ctx.reply('TxID চেক করতেছি... ⏳');
  ctx.reply('API লাগানো বাকি আছে বস। আপাতত টেস্ট ওকে ✅');
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await bot.handleUpdate(req.body, res);
    res.status(200).send('OK');
  } else {
    res.status(200).send('Bot is running');
  }
}
