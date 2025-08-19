import { useState } from "react";
import TopCoins from "./components/TopCoins";
import CoinChart from "./components/CoinChart";
import ChatWidget from "./components/ChatWidget";
import LineChart from "./components/LineChart";

export default function App() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [mode, setMode] = useState<"candle" | "line">("candle"); // ✅ thêm state để chọn chart

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-blue-700 text-white flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">📊 Binance Pro Dashboard</h1>

        {/* Dropdown chọn coin */}
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-white text-black px-2 py-1 rounded"
        >
          <option value="BTCUSDT">BTC/USDT</option>
          <option value="ETHUSDT">ETH/USDT</option>
          <option value="BNBUSDT">BNB/USDT</option>
          <option value="SOLUSDT">SOL/USDT</option>
        </select>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (ẩn trên mobile) */}
        <aside className="hidden lg:block w-72 bg-white border-r shadow-md overflow-y-auto">
          <TopCoins />
        </aside>

        {/* Main chart */}
        <div className="flex-1 bg-white shadow-lg rounded-xl m-4 p-4 flex flex-col">
          {/* Chart header + tab */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg">{symbol} Chart</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setMode("candle")}
                className={`px-3 py-1 rounded transition ${
                  mode === "candle"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 bg-gray-100"
                }`}
              >
                Candlestick
              </button>
              <button
                onClick={() => setMode("line")}
                className={`px-3 py-1 rounded transition ${
                  mode === "line"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 bg-gray-100"
                }`}
              >
                Line
              </button>
            </div>
          </div>

          {/* Chart render */}
          <div className="flex-1">
            {mode === "candle" ? (
              <CoinChart symbol={symbol} />
            ) : (
              <LineChart symbol={symbol} />
            )}
          </div>
        </div>
      </div>

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
}
