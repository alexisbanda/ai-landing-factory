import { GoogleGenAI, Type } from "@google/genai";
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

interface RequestBody {
  description: string;
  audience: string;
  goal: string;
  tone: string;
  currentHeadline: string;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key is not configured." }) };
  }

  try {
    const { description, audience, goal, tone, currentHeadline } = JSON.parse(event.body || "{}") as RequestBody;
    if (!description || !audience || !goal || !tone || !currentHeadline) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields." }) };
    }

    const prompt = `Actúa como un copywriter experto en conversión. Basado en la siguiente estrategia para una landing page, genera un titular alternativo que sea diferente al actual.

      **Estrategia Base:**
      - Descripción: "${description}"
      - Público: "${audience}"
      - Objetivo: "${goal}"
      - Tono: "${tone}"

      **Titular Actual (a evitar):** "${currentHeadline}"

      Genera un único titular nuevo, potente y que llame la atención. La respuesta debe ser un objeto JSON con una sola clave: "headline".`;

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING, description: "El nuevo titular alternativo." },
          },
          required: ["headline"],
        },
      },
    });

    let jsonStr = response.text.trim();
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: jsonStr,
    };

  } catch (error) {
    console.error("Error in regenerateHeadline function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to regenerate headline: ${errorMessage}` }),
    };
  }
};

export { handler };