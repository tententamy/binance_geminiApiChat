import { useEffect, useState } from "react";
import axios from "axios";

type Coin = {
  symbol: string;
  lastPrice: string;            // nhận từ API dạng string
  priceChangePercent: string;   // nhận từ API dạng string
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
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/binance/top");
      setCoins(res.data as Coin[]);
    };
    fetchData();
  }, []);

  return (
    <div className="h-full flex flex-col bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        🔥 Top 10 Coins{" "}
        <span className="text-sm text-gray-500">(by Volume)</span>
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
              const price = formatNumber(c.lastPrice);
              const change = Number(c.priceChangePercent);

              return (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="p-2 font-medium">{c.symbol}</td>
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
