import { Server } from "socket.io";
import WebSocket from "ws";

export function initBinanceSocket(io: Server) {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

  ws.on("message", (msg) => {
    const tickers = JSON.parse(msg.toString());

    // gửi toàn bộ data realtime xuống frontend
    io.emit("tickers", tickers);
  });

  ws.on("open", () => {
    console.log("✅ Binance WebSocket connected");
  });

  ws.on("close", () => {
    console.log("❌ Binance WebSocket closed");
  });
}
