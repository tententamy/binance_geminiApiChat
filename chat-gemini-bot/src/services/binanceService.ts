import axios from "axios";

const BASE_URL = "https://api.binance.com/api/v3";

/**
 * Lấy giá của 1 coin cụ thể (ví dụ BTCUSDT).
 */
export async function getCoinPrice(symbol: string) {
  const { data } = await axios.get(`${BASE_URL}/ticker/24hr?symbol=${symbol}`);
  return data;
}

/**
 * Lấy toàn bộ coins và trả về top 10 theo volume.
 */
export async function getTopCoins(limit = 10) {
  const { data } = await axios.get(`${BASE_URL}/ticker/24hr`);
  const sorted = data
    .sort((a: any, b: any) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
    .slice(0, limit);
  return sorted;
}
