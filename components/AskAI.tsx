"use client";

import { useState } from "react";

export default function AskAI({ context }: { context: string }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;

    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Context:\n${context}\n\nUser Question:\n${question}`,
      }),
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <textarea
        className="bg-slate-900 border border-slate-700 rounded p-2 text-sm"
        placeholder="Ask something about this note..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleAsk}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div className="text-sm text-slate-300 whitespace-pre-wrap mt-2">
          {response}
        </div>
      )}
    </div>
  );
}
