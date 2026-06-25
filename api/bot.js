import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('বস স্বাগতম AgroFarm Bot এ! \n/recharge txid দিয়ে পেমেন্ট ভেরিফাই করো'));

bot.command('recharge', async (ctx) => {
  const txid = ctx.message.text.split(' ')[1];
  if (!txid) return ctx.reply('বস TxID দাও। Format: /recharge 0x...');

  ctx.reply('TxID চেক করতেছি... ⏳');

  try {
    const res = await fetch('https://agro-farm-two.vercel.app/api/verify', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({txid})
    });
    const data = await res.json();
    ctx.reply(data.success? `✅ Payment Confirmed!\nTxID: ${txid}` : `❌ ${data.message}`);
  } catch (e) {
    ctx.reply('API Error বস। পরে ট্রাই করো');
  }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await bot.handleUpdate(req.body, res);
  } else {
    res.status(200).send('Bot is running');
  }
}
