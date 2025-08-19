import { Router } from "express";
import { getCoinPrice, getTopCoins, getKlines} from "../services/binanceService";

const router = Router();

// Lấy giá 1 coin
router.get("/price/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const data = await getCoinPrice(symbol);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy top coin theo volume
router.get("/top", async (_req, res) => {
  try {
    const data = await getTopCoins(10);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * GET /api/binance/klines?symbol=BTCUSDT&interval=1h
 */
router.get("/klines", async (req, res) => {
  try {
    const symbol = (req.query.symbol as string) || "BTCUSDT";
    const interval = (req.query.interval as string) || "1h";

    const data = await getKlines(symbol, interval);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
