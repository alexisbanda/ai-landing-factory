
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

// Updated interface to include the AI component suggestion
export interface LandingConcept {
  headline: string;
  subheadline: string;
  keyBenefits: string[];
  cta: string;
  pageOutline: { section: string; description: string }[];
  imageSuggestions: { section: string; suggestion: string }[];
  abTestSuggestion: { headline: string };
  aiComponentSuggestion: {
    componentType: string;
    title: string;
    promptSuggestion: string;
    ctaIntegration: string;
  };
}

/**
 * Fetches the static, hardcoded FAQ data.
 */
export const fetchStaticFaqData = async (): Promise<FaqItem[]> => {
  return Promise.resolve(staticFaqData);
};

/**
 * Fetches dynamic FAQ data by calling our secure Netlify Function.
 */
export const fetchFaqFromGemini = async (): Promise<FaqItem[]> => {
  try {
    const response = await fetch('/.netlify/functions/generateFaq');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data as FaqItem[];
  } catch (error) {
    console.error("Error fetching from Netlify function:", error);
    throw new Error(`Failed to fetch dynamic FAQ data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Generates a landing page concept by calling our secure Netlify Function.
 */
export const generateLandingConcept = async (
  description: string,
  audience: string,
  goal: string,
  tone: string,
  aiComponent: string // Added aiComponent parameter
): Promise<LandingConcept> => {
  try {
    const response = await fetch('/.netlify/functions/generateConcept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, audience, goal, tone, aiComponent }), // Pass it to the function
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as LandingConcept;
  } catch (error) {
    console.error("Error fetching from Netlify function:", error);
    throw new Error(`No se pudo generar el concepto: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Regenerates just the headline by calling a dedicated Netlify Function.
 */
export const regenerateHeadline = async (
  description: string,
  audience: string,
  goal: string,
  tone: string,
  currentHeadline: string
): Promise<{ headline: string }> => {
  try {
    const response = await fetch('/.netlify/functions/regenerateHeadline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, audience, goal, tone, currentHeadline }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as { headline: string };

  } catch (error) {
    console.error("Error fetching from Netlify function:", error);
    throw new Error(`No se pudo regenerar el titular: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
