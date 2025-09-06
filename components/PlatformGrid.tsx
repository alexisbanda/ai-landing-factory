
import React, { useState } from 'react';
import { Feature } from '../types';
import { FileSearchIcon, ArrowLeftRightIcon, SparklesIcon, TargetIcon, FileTextIcon, HeartHandshakeIcon, ArrowRightIcon, CheckIcon } from './icons/Icons';
import Modal from './Modal';

const features: Feature[] = [
  { 
    icon: <SparklesIcon />, 
    title: "Generación de Contenido con IA", 
    description: "Genera textos persuasivos, titulares y CTA adaptados a tu audiencia y diseñados para convertir.", 
    link: "#",
    details: {
      heading: "Escribe Textos Que Venden, Sin Esfuerzo",
      points: [
        "Utiliza marcos de copywriting probados como AIDA y PAS para estructurar tu mensaje.",
        "Mantiene un tono de voz consistente con tu marca a través de todas las páginas.",
        "Genera múltiples variaciones para pruebas A/B con un solo clic."
      ]
    }
  },
  { 
    icon: <ArrowLeftRightIcon />, 
    title: "Alineación de Marca Instantánea", 
    description: "Nuestra IA analiza los activos de tu marca para crear diseños hermosos y fieles a tu marca en segundos.", 
    link: "#",
    details: {
      heading: "Tu Identidad Visual, Automatizada",
      points: [
        "Extrae automáticamente colores, tipografías y logo desde tu sitio web existente.",
        "Aplica tu guía de estilo a cualquier plantilla de nuestra biblioteca al instante.",
        "Asegura una consistencia visual profesional en todas tus campañas de marketing."
      ]
    }
  },
  { 
    icon: <FileSearchIcon />, 
    title: "Pruebas A/B Automatizadas", 
    description: "Elimina las conjeturas de la optimización. Prueba automáticamente variaciones para encontrar la combinación ganadora.", 
    link: "#",
    details: {
      heading: "Optimización Continua, en Piloto Automático",
      points: [
        "Lanza experimentos de optimización sin necesidad de escribir una sola línea de código.",
        "La IA distribuye el tráfico de forma inteligente y declara un ganador basándose en la significancia estadística.",
        "Optimiza titulares, imágenes, llamadas a la acción, y hasta la estructura de la página."
      ]
    }
  },
  { 
    icon: <TargetIcon />, 
    title: "Analíticas de Conversión", 
    description: "Mide visitantes, prospectos y tasas de conversión con un panel simple y claro para tomar decisiones basadas en datos.", 
    link: "#",
    details: {
      heading: "Entiende a Tus Visitantes",
      points: [
        "Visualiza el embudo de conversión de tu página de aterrizaje de forma clara e intuitiva.",
        "Identifica qué secciones de tu página generan más interés con mapas de calor y de scroll.",
        "Integra fácilmente con Google Analytics y otras herramientas para una visión de 360 grados."
      ]
    }
  },
  { 
    icon: <FileTextIcon />, 
    title: "Integraciones de Formularios", 
    description: "Conéctate sin problemas con tu CRM y herramientas de email para automatizar tu flujo de gestión de prospectos.", 
    link: "#",
    details: {
      heading: "Tu Ecosistema de Marketing, Conectado",
      points: [
        "Disfruta de conexiones nativas con HubSpot, Mailchimp, Salesforce, y muchas más.",
        "Utiliza nuestra integración con Zapier para conectar con miles de otras aplicaciones web.",
        "Asegura que ningún prospecto se pierda gracias a la sincronización de datos en tiempo real."
      ]
    }
  },
  { 
    icon: <HeartHandshakeIcon />, 
    title: "SEO Dinámico", 
    description: "Atrae más tráfico orgánico con contenido optimizado por IA, metadatos y las mejores prácticas de SEO técnico.", 
    link: "#",
    details: {
      heading: "Escala Posiciones en Google",
      points: [
        "Optimización automática de metatítulos y descripciones para un CTR más alto.",
        "Generación automática de datos estructurados (Schema) para destacar en los resultados de búsqueda.",
        "Sugerencias de palabras clave y optimización de contenido basadas en el análisis de la competencia."
      ]
    }
  },
];

const PlatformGrid: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return (
    <>
    <section className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 mb-4">
          <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">Tu Kit de Herramientas Completo</span> para Landing Pages
        </h2>
        <h3 className="text-lg text-gray-600 max-w-3xl mx-auto">
          Todo lo que necesitas para tener éxito con páginas de aterrizaje de alta conversión, optimizado en una sola plataforma.
        </h3>
      </div>
      <div className="mx-auto max-w-5xl rounded-lg border border-slate-200 bg-white p-4 sm:p-8 lg:p-12 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} onClick={() => setSelectedFeature(feature)} className="cursor-pointer group flex flex-col gap-4 rounded-lg border border-slate-100 bg-slate-50/30 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center text-theme-accent-primary">
                    {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-cleat-dark">{feature.title}</h3>
              </div>
              <p className="text-base leading-relaxed text-slate-600 transition-colors group-hover:text-slate-700 flex-grow">
                {feature.description}
              </p>
              <div className="flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/90 mt-auto">
                <span>Saber Más</span>
                <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {selectedFeature && (
      <Modal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature.title}
      >
        <div className="space-y-4 prose prose-slate max-w-none">
          <h3>{selectedFeature.details?.heading}</h3>
          <p>{selectedFeature.description}</p>
          {selectedFeature.details?.points && (
            <ul className="!mt-4 !space-y-2">
              {selectedFeature.details.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon className="h-5 w-5 flex-shrink-0 text-status-success !mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Modal>
    )}
    </>
  );
};

export default PlatformGrid;