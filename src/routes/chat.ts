import { Router } from "express";
import { generateResponse } from "../services/gemini";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const reply = await generateResponse(message);

    res.json({
      reply,
    });
  } catch (error) {
    console.error("===== GEMINI ERROR =====");
    console.error(error);

    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;