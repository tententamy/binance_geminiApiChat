import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

type CandleData = [number, number, number, number, number]; 
// [timestamp, open, high, low, close]

export default function CoinChart({ symbol = "BTCUSDT" }: { symbol?: string }) {
  const [candles, setCandles] = useState<CandleData[]>([]);
  const [maSeries, setMaSeries] = useState<any[]>([]);

  // Hàm tính Moving Average
  function calculateMA(data: CandleData[], period: number) {
    const result: { x: number; y: number }[] = [];
    for (let i = period - 1; i < data.length; i++) {
      const slice = data.slice(i - period + 1, i + 1);
      const avg =
        slice.reduce((sum, c) => sum + c[4], 0) / period; // close price trung bình
      result.push({ x: data[i][0], y: avg });
    }
    return result;
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=5m&limit=100`
      );
       const data = res.data as any[]; // 👈 ép về any[]
       
      const formatted: CandleData[] = data.map((c: any) => [
        c[0], // timestamp
        parseFloat(c[1]), // open
        parseFloat(c[2]), // high
        parseFloat(c[3]), // low
        parseFloat(c[4]), // close
      ]);

      setCandles(formatted);

      // Tính MA(20)
      const ma20 = calculateMA(formatted, 20);
      setMaSeries([{ name: "MA20", data: ma20 }]);
    }

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [symbol]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
      height: 400,
      toolbar: { show: true },
    },
    title: {
      text: `${symbol} Candlestick + MA(20)`,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: { enabled: true },
    },
    tooltip: {
      shared: true,
      custom: function ({ dataPointIndex }) {
        return `
          <div style="padding:5px;">
            <b>${new Date(
              candles[dataPointIndex]?.[0]
            ).toLocaleTimeString()}</b><br/>
            Open: ${candles[dataPointIndex]?.[1]} <br/>
            High: ${candles[dataPointIndex]?.[2]} <br/>
            Low: ${candles[dataPointIndex]?.[3]} <br/>
            Close: ${candles[dataPointIndex]?.[4]} <br/>
            MA20: ${maSeries[0]?.data[dataPointIndex]?.y?.toFixed(2) || "-"}
          </div>
        `;
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <ReactApexChart
        options={options}
        series={[
          { name: "Candlestick", data: candles },
          ...maSeries, // overlay đường MA
        ]}
        type="candlestick"
        height={400}
      />
    </div>
  );
}
