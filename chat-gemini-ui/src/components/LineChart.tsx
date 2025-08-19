import { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

type Props = {
  symbol: string;
  interval?: string;
};

export default function LineChart({ symbol, interval = "1h" }: Props) {
  const [series, setSeries] = useState<any[]>([]);
  const [options] = useState<any>({
    chart: {
      type: "line",
      height: 500,
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#2563eb"],
    tooltip: {
      shared: true,
      x: { format: "dd MMM HH:mm" },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/binance/klines?symbol=${symbol}&interval=${interval}`
      );
      const data = res.data as any[];
      console.log(data)
      // Đúng format cho ApexCharts: [{x: Date, y: number}, ...]
     // ✅ Vì backend đã trả object { time, close }
      const lineData = data.map((d: any) => ({
        x: d.time,                 // timestamp
        y: parseFloat(d.close),    // close price
      }));


      console.log("✅ Line data parsed:", lineData);
      setSeries([{ name: symbol, data: lineData }]);
    };

    fetchData();
  }, [symbol, interval]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">📈 {symbol} Line Chart</h2>
      <ReactApexChart options={options} series={series} type="line" height={500} />
    </div>
  );
}

