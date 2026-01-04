// app/api/ai/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages, model = "openai/gpt-4o" } = await req.json();

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      // اختياري (للتعريف عن تطبيقك)
      "HTTP-Referer": "https://omrex.studio",
      "X-Title": "OMREX.STUDIO",
    },
    body: JSON.stringify({ model, messages }),
  });

  const data = await r.json();
  return NextResponse.json(data);
}