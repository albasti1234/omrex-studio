import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const industries: string[] = body?.industries ?? ["Restaurant", "Clinic", "Real Estate"];

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
      defaultHeaders: {
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_SITE_NAME ?? "OMREX.STUDIO",
      },
    });

    const prompt = `
You are generating demo website specs for OMREX.STUDIO.

Return ONLY valid JSON (no markdown) with this shape:
{
  "ok": true,
  "demos": [
    {
      "id": "kebab-case-unique",
      "title": "Brand Name",
      "subtitle": "Short tagline",
      "description": "1 sentence",
      "category": "One of: ${industries.join(", ")}",
      "route": "/demos/<id>",
      "thumbnail": "/images/demos/<id>.jpg",
      "color": { "primary": "#RRGGBB", "secondary": "#RRGGBB" },
      "features": ["Feature 1","Feature 2","Feature 3","Feature 4"],
      "status": "coming-soon",
      "variants": {
        "dark": true,
        "light": true
      },
      "market": "Worldwide"
    }
  ]
}

Rules:
- Generate EXACTLY 3 demos.
- Each demo must use a different category from the industries list.
- id must be kebab-case, route must match id.
- Make the 3 demos feel premium + cinematic.
`;

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini", // سريع ورخيص، تقدر تغيّره
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices?.[0]?.message?.content ?? "";
    // Parse JSON safely
    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          error: "Model did not return valid JSON",
          raw: text,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(json);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Something went wrong";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}