import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // backend Express + Gemini
});

type ChatResponse = {
  question: string;
  answer: string;
};

export const sendMessage = async (question: string) => {
  const res = await api.post<ChatResponse>("/chat", { question });
  return res.data;
};
