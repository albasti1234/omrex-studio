"use client";

import { useState } from "react";

export default function DemoGenerator() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/demos/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        industries: ["Restaurant", "Clinic", "Real Estate"], // غيّرها وقت ما بدك
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-10">
      <h1 className="text-3xl font-light mb-8">🎨 Demo Generator (AI)</h1>

      <button
        onClick={generate}
        className="rounded-xl border border-white/10 px-5 py-2 text-sm hover:bg-white/10 transition"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate 3 Demos"}
      </button>

      {result && (
        <pre className="mt-6 p-4 bg-black/40 rounded-lg text-xs whitespace-pre-wrap border border-white/10">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}