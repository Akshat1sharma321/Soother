// Groq LLM chat service for the mood-support bot.
//
// NOTE: In a Create React App build, REACT_APP_* variables are embedded into
// the client bundle, so the key is visible to anyone using the deployed site.
// This is acceptable for a personal/demo project; for production, proxy these
// calls through a small backend that holds the key server-side.

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are Soother, a warm and supportive mental-wellness companion inside the Soother web app.

Guidelines:
- Be empathetic, gentle, and encouraging. Validate the user's feelings before offering suggestions.
- Keep replies short and conversational: 2-4 sentences. Never use markdown, headings, or bullet lists.
- When relevant, suggest features of the Soother app: the 4-7-8 breathing exercise on the Meditation page, calming playlists on the Music page, mood-lifting memes on the Memes page, and support communities on the Meet page.
- You are NOT a therapist. Never diagnose conditions or give medication advice. For persistent or serious struggles, gently encourage talking to a mental-health professional.
- If the user expresses thoughts of self-harm or suicide, respond with care and share these helplines: Tele-MANAS (India) 14416, AASRA (India) +91-9820466726, Crisis Text Line (US) text HOME to 741741, and 988 Suicide & Crisis Lifeline (US).
- Stay on the topic of emotional well-being. If asked something unrelated, briefly redirect to how the user is feeling.`;

export const isGroqConfigured = (): boolean =>
  Boolean(process.env.REACT_APP_GROQ_API_KEY);

export async function getAIResponse(history: ChatTurn[]): Promise<string> {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Groq API key is not configured");
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        // Cap the history so the payload stays small and cheap.
        ...history.slice(-12),
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const text: string | undefined = data?.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("Groq returned an empty response");
  }
  return text;
}
