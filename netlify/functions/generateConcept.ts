import { GoogleGenAI, Type } from "@google/genai";
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// Define the expected structure of the incoming request body
interface RequestBody {
  description: string;
  audience: string;
  goal: string;
  tone: string;
}

// Define the structure of the successful response body
export interface LandingConcept {
  headline: string;
  subheadline: string;
  keyBenefits: string[];
  cta: string;
  pageOutline: { section: string; description: string }[];
  imageSuggestions: { section: string; suggestion: string }[];
  abTestSuggestion: { headline: string };
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // 1. Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // 2. Get API Key from environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is not configured." }),
    };
  }

  try {
    // 3. Parse the incoming request body
    const { description, audience, goal, tone } = JSON.parse(event.body || "{}") as RequestBody;
    if (!description || !audience || !goal || !tone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields in request body." }),
      };
    }

    // 4. Construct the prompt for the Gemini API
    const prompt = `Actúa como un experto en marketing de conversión y estratega de UX/UI de clase mundial. Un usuario quiere crear una landing page. A continuación se detallan sus necesidades:
      - Descripción del producto/servicio: "${description}"
      - Público objetivo: "${audience}"
      - Objetivo principal de la página: "${goal}"
      - Tono de la comunicación: "${tone}"

      Basado en esta información, genera una "Hoja de Ruta Estratégica" completa para su landing page en español. La respuesta debe ser un objeto JSON con la siguiente estructura:
      1.  "headline": Un titular potente y que llame la atención.
      2.  "subheadline": Un subtítulo que complemente y amplíe el titular.
      3.  "keyBenefits": Una lista de 3 puntos clave o beneficios que resalten el valor principal.
      4.  "cta": El texto para un botón de llamada a la acción claro y persuasivo.
      5.  "pageOutline": Un esquema sugerido para la estructura de la página, con 4-5 secciones (ej: Hero, Problema, Beneficios, Prueba Social, CTA Final). Cada sección debe tener un nombre ("section") y una breve descripción ("description").
      6.  "imageSuggestions": Dos sugerencias de imágenes o visuales clave (ej: para el Hero y la sección de Beneficios). Cada sugerencia debe tener una sección ("section") y la propia sugerencia ("suggestion").
      7.  "abTestSuggestion": Una sugerencia para una prueba A/B, específicamente un titular alternativo ("headline").`;

    // 5. Initialize Gemini and make the API call
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Using 1.5-flash
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            subheadline: { type: Type.STRING },
            keyBenefits: { type: Type.ARRAY, items: { type: Type.STRING } },
            cta: { type: Type.STRING },
            pageOutline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["section", "description"],
              },
            },
            imageSuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING },
                  suggestion: { type: Type.STRING },
                },
                required: ["section", "suggestion"],
              },
            },
            abTestSuggestion: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
              },
              required: ["headline"],
            },
          },
          required: ["headline", "subheadline", "keyBenefits", "cta", "pageOutline", "imageSuggestions", "abTestSuggestion"],
        },
      },
    });

    // 6. Clean and return the successful response
    let jsonStr = response.text.trim();
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonStr,
    };

  } catch (error) {
    console.error("Error in Netlify function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to generate concept: ${errorMessage}` }),
    };
  }
};

export { handler };