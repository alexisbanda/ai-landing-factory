
import React, { useState } from 'react';
import { CheckIcon } from './icons/Icons';

// Nueva configuración de planes con dos opciones de pago único
const pricingPlans = [
  {
    name: "Emprendedor",
    price: "$29",
    billingCycle: "/mes",
    description: "Ideal para validar una idea o lanzar tu primer proyecto online de forma rápida y asequible.",
    features: [
      "1 Página Publicada",
      "50 créditos IA / mes",
      "Dominio Personalizado",
      "Hosting y SSL incluidos",
      "Integraciones básicas (hasta 2)",
      "Panel de analíticas básico",
      "Soporte por Email (48h)",
      "Marca 'Made with...' incluida",
    ],
    ctaText: "Empezar como Emprendedor",
    isPopular: false,
    type: "monthly",
  },
  {
    name: "Profesional",
    price: "$59",
    billingCycle: "/mes",
    description: "La opción inteligente para PYMES que lanzan campañas de marketing continuas y buscan agilidad y conversión.",
    features: [
      "10 Páginas Publicadas",
      "200 créditos IA / mes",
      "Dominio Personalizado",
      "Hosting y SSL incluidos",
      "Integraciones avanzadas (ilimitadas)",
      "Panel avanzado + A/B Testing",
      "Soporte Prioritario (24h)",
      "Sin marca 'Made with...'",
    ],
    ctaText: "Empezar como Profesional",
    isPopular: true,
    type: "monthly",
  },
  {
    name: "Agencia",
    price: "$129",
    billingCycle: "/mes",
    description: "Para freelancers y agencias que gestionan múltiples clientes y buscan eficiencia y escalabilidad.",
    features: [
      "50 Páginas Publicadas",
      "1,000 créditos IA / mes",
      "Dominio Personalizado",
      "Hosting y SSL incluidos",
      "Integraciones avanzadas (ilimitadas)",
      "Panel avanzado + A/B Testing",
      "Soporte Prioritario + Chat",
      "Marca blanca y gestión de clientes",
    ],
    ctaText: "Empezar como Agencia",
    isPopular: false,
    type: "monthly",
  },
  {
    name: "Proyecto Básico (Pago Único)",
    price: "$99",
    billingCycle: "",
    description: "Para validar ideas o lanzamientos puntuales. Incluye lo esencial para estar online rápido.",
    features: [
      "1 Página Publicada",
      "50 créditos IA (totales)",
      "Dominio Personalizado",
      "Hosting y SSL incluidos por 1 año",
      "Integraciones básicas (hasta 2)",
      "Panel de analíticas básico",
      "Soporte por Email (48h)",
      "Marca 'Made with...' incluida",
    ],
    ctaText: "Comprar Proyecto Básico",
    isPopular: false,
    type: "one-time",
  },
  {
    name: "Proyecto Premium (Pago Único)",
    price: "$179",
    billingCycle: "",
    description: "Para lanzamientos más exigentes: más IA, integraciones avanzadas y soporte extendido.",
    features: [
      "1 Página Publicada",
      "200 créditos IA (totales)",
      "Dominio Personalizado",
      "Hosting y SSL incluidos por 2 años",
      "Integraciones avanzadas (ilimitadas)",
      "Panel avanzado + A/B Testing",
      "Soporte Prioritario (24h)",
      "Sin marca 'Made with...'",
    ],
    ctaText: "Comprar Proyecto Premium",
    isPopular: false,
    type: "one-time",
  },
];

interface PricingProps {
  onOpenContactModal: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onOpenContactModal }) => {
  const [paymentType, setPaymentType] = useState<'monthly' | 'one-time'>('one-time');
  const monthlyPlans = pricingPlans.filter(plan => plan.type === 'monthly');
  const oneTimePlans = pricingPlans.filter(plan => plan.type === 'one-time');

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

        {/* Switcher de tipo de pago */}
        <div className="flex justify-center mb-10">
          <button
            className={`px-6 py-2 rounded-l-full font-semibold border transition-all duration-300 ${paymentType === 'monthly' ? 'bg-primary text-white border-primary' : 'bg-white text-cleat-dark border-slate-300'}`}
            onClick={() => setPaymentType('monthly')}
          >
            Suscripción Mensual
          </button>
          <button
            className={`px-6 py-2 rounded-r-full font-semibold border transition-all duration-300 ${paymentType === 'one-time' ? 'bg-primary text-white border-primary' : 'bg-white text-cleat-dark border-slate-300'}`}
            onClick={() => setPaymentType('one-time')}
          >
            Pago Único
          </button>
        </div>

        {/* Mostrar planes según el tipo de pago */}
        {paymentType === 'monthly' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {monthlyPlans.map((plan) => (
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
                    onClick={onOpenContactModal}
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
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-center justify-center">
            {oneTimePlans.map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-xl border p-8 flex flex-col h-full transition-all duration-300 border-slate-200 bg-white shadow-lg max-w-md w-full mx-auto"
              >
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-cleat-dark text-center">{plan.name}</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-extrabold text-cleat-dark">{plan.price}</span>
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
                    onClick={onOpenContactModal}
                    className="w-full text-center inline-block rounded-full px-6 py-3 font-semibold transition-all duration-300 bg-white border-2 border-cleat-dark text-cleat-dark hover:bg-cleat-dark hover:text-white"
                  >
                    {plan.ctaText}
                  </button>
                </div>
                <p className="mt-6 text-xs text-gray-500 text-center">
                  {plan.name.includes('Básico') ? '* Hosting y SSL incluidos por 1 año. Renovación opcional a partir del segundo año.' : '* Hosting y SSL incluidos por 2 años. Renovación opcional a partir del tercer año.'}
                </p>
              </div>
            ))}
          </div>
        )}
        <p className="mt-8 text-center text-sm text-gray-500">
          ¿Necesitas más? <a href="#" className="font-semibold text-primary hover:underline">Contacta con nosotros</a> para planes empresariales.
        </p>
      </div>
    </section>
  );
};

export default Pricing;