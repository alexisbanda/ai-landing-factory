import { GoogleGenAI, Type } from "@google/genai";
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// Define the expected structure of the incoming request body
interface RequestBody {
  description: string;
  audience: string;
  goal: string;
  tone: string;
  aiComponent: string; // Added AI component
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
  aiComponentSuggestion: { // Added AI component suggestion
    componentType: string;
    title: string;
    promptSuggestion: string;
    ctaIntegration: string;
  };
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
    const { description, audience, goal, tone, aiComponent } = JSON.parse(event.body || "{}") as RequestBody;
    if (!description || !audience || !goal || !tone || !aiComponent) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields in request body." }) };
    }

    const prompt = `Actúa como un experto en marketing de conversión y estratega de UX/UI de clase mundial. Un usuario quiere crear una landing page. A continuación se detallan sus necesidades:
      - Descripción del producto/servicio: "${description}"
      - Público objetivo: "${audience}"
      - Objetivo principal de la página: "${goal}"
      - Tono de la comunicación: "${tone}"
      - Componente de IA deseado: "${aiComponent}"

      Basado en TODA esta información, genera una "Hoja de Ruta Estratégica" completa para su landing page en español. La respuesta debe ser un objeto JSON con la siguiente estructura y REGLAS:
      1.  "headline": Un titular potente y que llame la atención.
      2.  "subheadline": Un subtítulo que complemente y amplíe el titular.
      3.  "keyBenefits": Una lista de EXACTAMENTE 3 puntos clave o beneficios. NO devuelvas más o menos de 3.
      4.  "cta": El texto para un botón de llamada a la acción claro y persuasivo.
      5.  "pageOutline": OBLIGATORIO. Proporciona un esquema DETALLADO de 4 a 5 secciones para la página, integrando de forma natural el componente de IA. Para cada sección, proporciona un "section" (nombre) y una "description" (descripción). NO devuelvas un array vacío.
      6.  "imageSuggestions": OBLIGATORIO. Proporciona EXACTAMENTE 2 sugerencias de imágenes. Una para la sección 'Hero' y otra para una sección de 'Beneficios' o 'Características'. NO devuelvas un array vacío.
      7.  "abTestSuggestion": Una sugerencia para una prueba A/B, específicamente un titular alternativo.
      8.  "aiComponentSuggestion": Ideas específicas para el componente de IA seleccionado. Debe incluir "componentType" (el nombre del componente), "title" (un título atractivo para la sección del componente), "promptSuggestion" (una sugerencia de texto o pregunta inicial para el componente), y "ctaIntegration" (cómo el componente ayuda al objetivo principal de la página).`;

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
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
              items: { type: Type.OBJECT, properties: { section: { type: Type.STRING }, description: { type: Type.STRING } }, required: ["section", "description"] },
            },
            imageSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.OBJECT, properties: { section: { type: Type.STRING }, suggestion: { type: Type.STRING } }, required: ["section", "suggestion"] },
            },
            abTestSuggestion: {
              type: Type.OBJECT, properties: { headline: { type: Type.STRING } }, required: ["headline"],
            },
            aiComponentSuggestion: {
              type: Type.OBJECT,
              properties: {
                componentType: { type: Type.STRING },
                title: { type: Type.STRING },
                promptSuggestion: { type: Type.STRING },
                ctaIntegration: { type: Type.STRING },
              },
              required: ["componentType", "title", "promptSuggestion", "ctaIntegration"],
            },
          },
          required: ["headline", "subheadline", "keyBenefits", "cta", "pageOutline", "imageSuggestions", "abTestSuggestion", "aiComponentSuggestion"],
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
    console.error("Error in Netlify function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to generate concept: ${errorMessage}` }),
    };
  }
};

export { handler };