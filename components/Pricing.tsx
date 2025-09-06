
import React, { useState } from 'react';
import { CheckIcon } from './icons/Icons';

// Configuration for plans
const pricingPlans = [
  {
    name: "Básico",
    price: "$19",
    billingCycle: "/mes",
    description: "Perfecto para lanzar tu primera idea o proyecto personal con una página profesional.",
    features: [
      "1 Landing Page",
      "Formulario de Contacto",
      "Hosting Incluido",
      "Analíticas Básicas",
      "Templates Estándar",
      "Soporte por Email",
    ],
    ctaText: "Empezar Plan Básico",
    isPopular: false,
  },
  {
    name: "Profesional",
    price: "$49",
    billingCycle: "/mes",
    description: "La solución ideal para negocios en crecimiento que buscan optimizar la conversión.",
    features: [
      "Hasta 5 Landing Pages",
      "Chatbot con IA Personalizado",
      "Componentes Premium",
      "Integraciones con CRM y Mail",
      "Pruebas A/B Automatizadas",
      "Soporte Prioritario",
    ],
    ctaText: "Empezar Plan Profesional",
    isPopular: true,
  },
  {
    name: "Ultra Instinto",
    price: "$99",
    billingCycle: "/mes",
    description: "Desata todo el poder de la IA para una automatización y resultados sin precedentes.",
    features: [
      "Landing Pages Ilimitadas",
      "Generación de Contenido con IA",
      "Automatizaciones de Marketing",
      "SEO Dinámico con IA",
      "Analíticas Predictivas",
      "Manager de Cuenta Dedicado",
    ],
    ctaText: "Empezar Plan Ultra",
    isPopular: false,
  },
];

interface PricingProps {
  onOpenSignUpModal: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onOpenSignUpModal }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with the popular plan (index 1)

  return (
    <section id="pricing" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 mb-4">
            Planes <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">Flexibles</span> para Cada Necesidad
          </h2>
          <h3 className="text-lg text-gray-600 max-w-3xl mx-auto">
            Elige el plan que se adapte a tu etapa y empieza a convertir visitantes en clientes hoy mismo.
          </h3>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div
            className={`relative rounded-xl border p-8 flex flex-col h-full transition-all duration-300 ${
              pricingPlans[activeIndex].isPopular
                ? 'border-primary shadow-2xl bg-primary/5'
                : 'border-slate-200 bg-white shadow-lg'
            }`}
          >
            {pricingPlans[activeIndex].isPopular && (
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
                  MÁS POPULAR
                </span>
              </div>
            )}
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-cleat-dark text-center">{pricingPlans[activeIndex].name}</h3>
              <div className="mt-4 text-center">
                <span className="text-4xl font-extrabold text-cleat-dark">{pricingPlans[activeIndex].price}</span>
                <span className="text-lg font-medium text-gray-500">{pricingPlans[activeIndex].billingCycle}</span>
              </div>
              <p className="mt-4 text-center text-gray-600 h-16">{pricingPlans[activeIndex].description}</p>
              
              <ul className="mt-8 space-y-4">
                {pricingPlans[activeIndex].features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-status-success" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <button
                onClick={onOpenSignUpModal}
                className={`w-full text-center inline-block rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                  pricingPlans[activeIndex].isPopular
                    ? 'bg-primary text-white shadow-md hover:bg-opacity-90'
                    : 'bg-white border-2 border-cleat-dark text-cleat-dark hover:bg-cleat-dark hover:text-white'
                }`}
              >
                {pricingPlans[activeIndex].ctaText}
              </button>
            </div>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
              {pricingPlans.map((_, index) => (
                  <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Ver plan ${pricingPlans[index].name}`}
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-primary' : 'bg-slate-300'}`}
                  />
              ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-8 flex flex-col h-full transition-all duration-300 ${
                plan.isPopular
                  ? 'border-primary shadow-2xl scale-105 bg-primary/5'
                  : 'border-slate-200 bg-white shadow-lg hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
                    MÁS POPULAR
                  </span>
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-cleat-dark text-center">{plan.name}</h3>
                <div className="mt-4 text-center">
                  <span className="text-4xl font-extrabold text-cleat-dark">{plan.price}</span>
                  <span className="text-lg font-medium text-gray-500">{plan.billingCycle}</span>
                </div>
                <p className="mt-4 text-center text-gray-600 h-16">{plan.description}</p>
                
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-status-success" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <button
                  onClick={onOpenSignUpModal}
                  className={`w-full text-center inline-block rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-primary text-white shadow-md hover:bg-opacity-90'
                      : 'bg-white border-2 border-cleat-dark text-cleat-dark hover:bg-cleat-dark hover:text-white'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-500">
          ¿Necesitas más? <a href="#" className="font-semibold text-primary hover:underline">Contacta con nosotros</a> para planes empresariales.
        </p>
      </div>
    </section>
  );
};

export default Pricing;