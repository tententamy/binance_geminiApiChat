import { useEffect, useState } from "react";
import { socket } from "../socket";

type Coin = {
  s: string; // symbol
  c: string; // last price
  P: string; // 24h %
  Q?: string; // volume (optional)
};

function formatNumber(n: string | number, fraction = 2) {
  return Number(n).toLocaleString("en-US", {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });
}

export default function TopCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);

useEffect(() => {
  const handleTickers = (raw: any) => {
      console.log("📩 tickers raw:", raw);  // ✅ log để check có nhận được không
    // Binance socket có thể trả về object, ép về array
    const list: Coin[] = Array.isArray(raw) ? raw : Object.values(raw);

    // Sắp xếp theo volume (nếu có Q), rồi lấy 10 coin top
    const sorted = list.sort((a: any, b: any) => Number(b.Q) - Number(a.Q));
    setCoins(sorted.slice(0, 10));
  };

  socket.on("tickers", handleTickers);

  return () => {
    socket.off("tickers", handleTickers);
  };
}, []);



  return (
    <div className="h-full flex flex-col bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        🔥 Top 10 Coins{" "}
        <span className="text-sm text-gray-500">(realtime)</span>
      </h2>
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 bg-gray-100 shadow-sm">
            <tr>
              <th className="p-2 text-left">Symbol</th>
              <th className="p-2 text-right">Last Price</th>
              <th className="p-2 text-right">24h %</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((c, i) => {
              const price = formatNumber(c.c);
              const change = Number(c.P);
              return (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="p-2 font-medium">{c.s}</td>
                  <td className="p-2 text-right">${price}</td>
                  <td
                    className={`p-2 text-right font-semibold ${
                      change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {change.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
