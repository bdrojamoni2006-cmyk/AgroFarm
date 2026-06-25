export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { txid } = req.body;
  const BSCSCAN_KEY = process.env.BSCSCAN_KEy; // তোমার ছোট y দিয়াই
  const USDT_ADDRESS = process.env.USDT_ADDRESS;

  if (!txid) return res.status(400).json({ error: 'txid লাগবে বস' });

  try {
    const url = `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionReceipt&txhash=${txid}&apikey=${BSCSCAN_KEY}`;
    
    const resp = await fetch(url);
    const data = await resp.json();
    
    if (data.result && data.result.status === '0x1') {
      return res.status(200).json({ 
        success: true, 
        message: 'Payment Confirmed ✅',
        txid: txid 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction Failed বা Pending' 
      });
    }
  } catch (err) {
    return res.status(500).json({ error: 'BSCScan Error' });
  }
}
