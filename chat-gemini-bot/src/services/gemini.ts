import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY?.trim(); // 👈 loại bỏ khoảng trắng
if (!apiKey) {
  throw new Error("❌ GEMINI_API_KEY chưa được cấu hình trong .env");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function askGemini(question: string): Promise<string> {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: question }]
      }
    ]
  });

  return result.response.text();
}
