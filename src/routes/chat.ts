import { Router } from "express";
import { generateResponse } from "../services/gemini";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "messages array is required",
      });
    }

    const reply = await generateResponse(messages);

    res.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate response",
    });
  }
});

export default router;