import { Router } from "express";
import { generateResponse } from "../services/gemini";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages array is required.",
      });
    }

    const reply = await generateResponse(messages);

    return res.json({
      reply,
    });
  } catch (error) {
    console.error("Chat Route Error:", error);

    const message =
      error instanceof Error ? error.message : "";

    // Gemini unavailable / overloaded
    if (
      message.includes("503") ||
      message.includes("UNAVAILABLE")
    ) {
      return res.status(503).json({
        error:
          "Satiety AI is currently experiencing high demand. Please try again in a few moments.",
      });
    }

    // Invalid API key
    if (
      message.includes("401") ||
      message.includes("API_KEY")
    ) {
      return res.status(500).json({
        error:
          "AI service configuration error. Please contact the administrator.",
      });
    }

    // Network failure
    if (
      message.includes("fetch") ||
      message.includes("network")
    ) {
      return res.status(500).json({
        error:
          "Unable to connect to the AI service. Please check your internet connection and try again.",
      });
    }

    // Unknown error
    return res.status(500).json({
      error:
        "Something went wrong while generating the response. Please try again later.",
    });
  }
});

export default router;