import { Router } from "express";
import { supabase } from "../config/supabase";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const { error } = await supabase
      .from("workspaces")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({
        status: "error",
        database: "disconnected",
        message: error.message,
      });
    }

    return res.json({
      status: "ok",
      database: "connected",
      message: "Supabase connection successful 🚀",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: "error",
      database: "disconnected",
      message: "Unable to reach Supabase.",
    });
  }
});

export default router;