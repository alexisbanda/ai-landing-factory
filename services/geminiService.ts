import { GoogleGenAI, Type } from "@google/genai";
import { FaqItem } from '../types';

// Static data is kept as a reliable fallback and for when the API is disabled.
const staticFaqData: FaqItem[] = [
  { question: "¿Qué es VANLANDINGS?", answer: "VANLANDINGS es una plataforma impulsada por IA que te permite crear, lanzar y optimizar páginas de aterrizaje de alta conversión en minutos, no en semanas. Está diseñada para la velocidad, el rendimiento y la simplicidad." },
  { question: "¿Para quién está diseñado VANLANDINGS?", answer: "VANLANDINGS es perfecto para especialistas en marketing, startups, agencias y emprendedores que necesitan lanzar campañas rápidamente sin comprometer la calidad o el rendimiento." },
  { question: "¿Cómo funciona la generación de contenido con IA?", answer: "Proporcionas una breve descripción de tu producto, servicio u oferta. Nuestra IA luego genera titulares, textos y llamadas a la acción convincentes y adaptados a tu audiencia y objetivos." },
  { question: "¿Puedo usar mi propio dominio?", answer: "¡Por supuesto! Puedes publicar tus páginas de aterrizaje en cualquier dominio personalizado que poseas con un solo clic, asegurando una experiencia de marca fluida para tus visitantes." },
  { question: "¿Qué tipo de integraciones ofrecen?", answer: "Nos integramos con las herramientas que ya usas, incluyendo CRMs como HubSpot y Salesforce, plataformas de email marketing como Mailchimp, y herramientas de automatización como Zapier para conectar con miles de otras aplicaciones." },
  { question: "¿Las páginas son rápidas y están optimizadas para SEO?", answer: "Absolutamente. La velocidad es una de nuestras principales prioridades. Todas las páginas generadas con VANLANDINGS están optimizadas para las Core Web Vitals de Google y vienen con herramientas SEO integradas para ayudarte a posicionar mejor en los resultados de búsqueda." }
];

export interface LandingConcept {
  headline: string;
  subheadline: string;
  keyBenefits: string[];
  cta: string;
  pageOutline: { section: string; description: string }[];
  imageSuggestions: { section: string; suggestion: string }[];
  abTestSuggestion: { headline: string };
}


/**
 * Fetches the static, hardcoded FAQ data.
 * This is the default and recommended method to avoid API rate limits.
 */
export const fetchStaticFaqData = async (): Promise<FaqItem[]> => {
  return Promise.resolve(staticFaqData);
};

/**
 * Fetches dynamic FAQ data from the Gemini API.
 * This can be enabled via the config in the Faq component.
 */
export const fetchFaqFromGemini = async (): Promise<FaqItem[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate 6 frequently asked questions and their answers in Spanish for a company called VANLANDINGS. It's an AI-powered platform that creates fast, low-cost, high-conversion landing pages for marketers, startups, and entrepreneurs. The platform features AI content generation, brand alignment, A/B testing, integrations, and is optimized for speed and SEO. Ensure the answer for 'What is VANLANDINGS?' includes a mention that it generates pages in minutes, not weeks.`,
        config: {
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

    const jsonStr = response.text.trim();
    if (!jsonStr) {
      throw new Error("API returned an empty response.");
    }

    const data = JSON.parse(jsonStr);
    return data as FaqItem[];

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    // Re-throw a more specific error for the UI component to catch
    if (error instanceof Error && error.message.includes('quota')) {
        throw new Error('You exceeded your current quota, please check your plan and billing details.');
    }
    throw new Error('Failed to fetch dynamic FAQ data.');
  }
};

/**
 * Generates a landing page concept using the Gemini API based on user inputs.
 */
export const generateLandingConcept = async (
  description: string,
  audience: string,
  goal: string,
  tone: string
): Promise<LandingConcept> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING, description: 'El titular principal.' },
            subheadline: { type: Type.STRING, description: 'El subtítulo de apoyo.' },
            keyBenefits: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Lista de 3 beneficios.' },
            cta: { type: Type.STRING, description: 'Texto del botón CTA.' },
            pageOutline: {
              type: Type.ARRAY,
              description: 'Esquema de las secciones de la página.',
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING, description: 'Nombre de la sección.' },
                  description: { type: Type.STRING, description: 'Descripción de la sección.' },
                },
                required: ["section", "description"],
              },
            },
            imageSuggestions: {
              type: Type.ARRAY,
              description: 'Sugerencias de imágenes.',
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING, description: 'Sección para la imagen.' },
                  suggestion: { type: Type.STRING, description: 'Sugerencia de imagen.' },
                },
                required: ["section", "suggestion"],
              },
            },
            abTestSuggestion: {
              type: Type.OBJECT,
              description: 'Sugerencia para prueba A/B.',
              properties: {
                headline: { type: Type.STRING, description: 'Titular alternativo.' },
              },
              required: ["headline"],
            },
          },
          required: ["headline", "subheadline", "keyBenefits", "cta", "pageOutline", "imageSuggestions", "abTestSuggestion"],
        },
      },
    });

    const jsonStr = response.text.trim();
    if (!jsonStr) {
      throw new Error("La API devolvió una respuesta vacía.");
    }
    
    const data = JSON.parse(jsonStr);
    return data as LandingConcept;
  } catch (error) {
    console.error("Error al generar el concepto de landing page con la API de Gemini:", error);
     if (error instanceof Error && error.message.includes('quota')) {
        throw new Error('Has excedido tu cuota actual. Por favor, revisa tu plan y detalles de facturación.');
    }
    throw new Error('No se pudo generar el concepto de la landing page.');
  }
};