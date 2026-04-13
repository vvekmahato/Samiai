import { NextResponse } from "next/server";
import { getGroqResponse } from "@/lib/groq";
import { Message } from "@/types/chat";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    const reply = await getGroqResponse(messages);

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}