import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("AUTH HEADER:", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Authorization header missing",
      });
    }

    const token = authHeader.replace(
      "Bearer ",
      ""
    );

    console.log("TOKEN:", token);

    const { data, error } =
      await supabase.auth.getUser(token);

        console.log("SUPABASE USER:", data.user);
        console.log("SUPABASE ERROR:", error);
        console.log("AUTH HEADER:", authHeader);
        console.log("TOKEN:", token);
        console.log("SUPABASE ERROR:", error);console.log("USER:", data.user);

    if (error || !data.user) {
  return res.status(401).json({
    success: false,
    error: error?.message,
  });
}

    (req as any).user = data.user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Authentication failed",
    });
  }
}