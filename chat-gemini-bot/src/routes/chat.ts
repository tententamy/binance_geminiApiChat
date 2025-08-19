import { Router, Request, Response } from "express";
import { askGemini } from "../services/gemini";

const router = Router();

// POST /api/chat
router.post("/", async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Thiếu câu hỏi" });
    }

    const answer = await askGemini(question);
    res.json({ question, answer });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

export default router;
