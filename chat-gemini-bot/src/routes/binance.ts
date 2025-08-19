import { Router } from "express";
import { getCoinPrice, getTopCoins } from "../services/binanceService";

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

export default router;
