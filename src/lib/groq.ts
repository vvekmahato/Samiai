import axios from "axios";
import { Message } from "@/types/chat";

export async function getGroqResponse(messages: Message[]) {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (error: any) {
  console.error("FULL ERROR:", error.response?.data || error.message);
  return "Something went wrong.";
}
}