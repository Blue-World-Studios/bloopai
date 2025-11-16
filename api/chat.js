import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY // stored on vercel
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: req.body.messages
    });

    res.status(200).json({
      reply: response.choices[0].message
    });

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({
      reply: {
        role: "assistant",
        content: "AI unavailable (server error)"
      }
    });
  }
}

