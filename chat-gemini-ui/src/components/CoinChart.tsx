import { useEffect, useState } from "react";
import { socket } from "../socket";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

type Props = { symbol: string };

export default function CoinChart({ symbol }: Props) {
  const [series, setSeries] = useState<any[]>([{ name: symbol, data: [] }]);

  useEffect(() => {
    let isMounted = true;

    // 1. Load dữ liệu lịch sử
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/binance/klines?symbol=${symbol}&interval=1m&limit=100`
        );
        const data = res.data as any[];

        const formatted = data.map((d: any) => ({
          x: new Date(d.time),  // thay vì d[0]
          y: [
            parseFloat(d.open),
            parseFloat(d.high),
            parseFloat(d.low),
            parseFloat(d.close),
          ],
        }));

        if (isMounted) {
          setSeries([{ name: symbol, data: formatted }]);
        }
      } catch (err) {
        console.error("Fetch history error:", err);
      }
    };

    fetchHistory();

    // 2. Subscribe realtime
    socket.emit("subscribeKline", symbol);

    socket.on(`kline:${symbol}`, (k) => {
      const newPoint = {
        x: Number(k.t),
        y: [Number(k.o), Number(k.h), Number(k.l), Number(k.c)],
      };

      setSeries((prev) => {
        if (!prev.length) return [{ name: symbol, data: [newPoint] }];

        // ✅ merge realtime vào history
        const updated = [...prev[0].data, newPoint].slice(-200);
        return [{ name: symbol, data: updated }];
      });
    });

    return () => {
      isMounted = false;
      socket.emit("unsubscribeKline", symbol);
      socket.off(`kline:${symbol}`);
    };
  }, [symbol]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold mb-3">{symbol} Realtime Candlestick</h2>
      <ReactApexChart
        options={{
          chart: { type: "candlestick", height: 400, animations: { enabled: false } },
          xaxis: { type: "datetime" },
          yaxis: { tooltip: { enabled: true } },
        }}
        series={series}
        type="candlestick"
        height={400}
      />
    </div>
  );
}
