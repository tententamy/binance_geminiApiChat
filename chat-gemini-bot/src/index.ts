import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat";
import binanceRoutes from "./routes/binance"

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/binance", binanceRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
