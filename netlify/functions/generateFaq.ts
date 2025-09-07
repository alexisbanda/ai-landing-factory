import { GoogleGenAI, Type } from "@google/genai";
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// Define the structure of a single FAQ item
export interface FaqItem {
  question: string;
  answer: string;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is not configured." }),
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: `Generate 6 frequently asked questions and their answers in Spanish for a company called VANLANDINGS. It's an AI-powered platform that creates fast, low-cost, high-conversion landing pages for marketers, startups, and entrepreneurs. The platform features AI content generation, brand alignment, A/B testing, integrations, and is optimized for speed and SEO. Ensure the answer for 'What is VANLANDINGS?' includes a mention that it generates pages in minutes, not weeks.` }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: 'The frequently asked question.',
              },
              answer: {
                type: Type.STRING,
                description: 'The answer to the question.',
              },
            },
            required: ["question", "answer"],
          },
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
    console.error("Error fetching data from Gemini API:", error);
    const errorMessage = error instanceof Error && error.message.includes('quota')
      ? 'You exceeded your current quota, please check your plan and billing details.'
      : 'Failed to fetch dynamic FAQ data.';

    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

export { handler };