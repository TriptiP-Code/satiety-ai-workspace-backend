import { Request, Response } from "express";

import { registerUser } from "../services/authServices";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const user = await registerUser(
      name,
      email,
      password
    );

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}