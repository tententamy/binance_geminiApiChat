import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import chatRoutes from "./routes/chat";
import binanceRoutes from "./routes/binance";
import { initBinanceSocket } from "./sockets/binanceSocket";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

// REST routes
app.use("/api/chat", chatRoutes);
app.use("/api/binance", binanceRoutes);

// Tạo server HTTP + Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // cho phép frontend Vite connect
    methods: ["GET", "POST"],
  },
});

// Gắn socket Binance realtime
initBinanceSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
