import { useState } from "react";
import TopCoins from "./components/TopCoins";
import CoinChart from "./components/CoinChart";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  const [symbol, setSymbol] = useState("BTCUSDT");

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

        {/* Main chart full screen */}
        <main className="flex-1 p-4">
          <CoinChart symbol={symbol} />
        </main>
      </div>

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
}
