import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../socket";
import ReactApexChart from "react-apexcharts";

type Props = { symbol: string };

export default function LineChart({ symbol }: Props) {
  const [series, setSeries] = useState<any[]>([{ data: [] }]);

  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/binance/klines?symbol=${symbol}&interval=1m&limit=100`
      );
      const data = res.data as any[];

      const formatted = data.map((d: any) => ({
        x: new Date(d.time),         // ✅ fix
        y: parseFloat(d.close)       // ✅ fix
      }));
      if (isMounted) setSeries([{ name: symbol, data: formatted }]);
    };


    fetchHistory();

    // Subscribe realtime
    socket.on(`kline:${symbol}`, (k) => {
    const newPoint = {
      x: new Date(k.t),       // open time
      y: parseFloat(k.c)      // close
    };

    setSeries((prev) => {
      if (!prev.length) return [{ name: symbol, data: [newPoint] }];
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
      <h2 className="text-lg font-bold mb-3">{symbol} Realtime Line Chart</h2>
      <ReactApexChart
        options={{
          chart: { type: "line", height: 400, animations: { enabled: false } },
          stroke: { curve: "smooth", width: 2 },
          xaxis: { type: "datetime" },
        }}
        series={series}
        type="line"
        height={400}
      />
    </div>
  );
}
