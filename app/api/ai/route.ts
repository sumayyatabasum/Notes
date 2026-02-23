export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    },
  );

  const data = await response.json();

  console.log("STATUS:", response.status);
  console.log("FULL GEMINI RESPONSE:");
  console.log(JSON.stringify(data, null, 2));

  return Response.json({
    reply:
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      data.error?.message ||
      "No response",
  });
}
