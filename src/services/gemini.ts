import type { Message } from "../types/message";

const API_KEY = process.env.GEMINI_API_KEY!;

const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function generateResponse(messages: Message[]) {
  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [
      {
        text: message.content,
      },
    ],
  }));

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents,
    }),
  });

  const data = await response.json();

  console.log("Gemini Response:");
  console.log(JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data.candidates[0].content.parts[0].text;
}