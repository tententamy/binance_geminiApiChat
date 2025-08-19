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


export async function getKlines(symbol: string, interval: string = "1h") {
  const url = `${BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=100`;
  const res = await axios.get(url);

  // Binance trả: [time, open, high, low, close, volume,...]
  return res.data.map((d: any) => ({
    time: d[0],
    open: parseFloat(d[1]),
    high: parseFloat(d[2]),
    low: parseFloat(d[3]),
    close: parseFloat(d[4]),
    volume: parseFloat(d[5]),
  }));
}

