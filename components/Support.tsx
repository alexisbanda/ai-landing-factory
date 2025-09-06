import React from 'react';
import { MessageSquareIcon, ClockIcon, ThumbsUpIcon } from './icons/Icons';

const Support: React.FC = () => {
  const testimonials = [
    { quote: "Este ha sido un gran soporte. Muchas gracias, aprecio su rápida respuesta y resolución. Servicio de 5 estrellas, se lo agradezco.", author: "Jim S" },
    { quote: "Respuestas rápidas, información útil y seguimiento hasta que el trabajo está completo. ¡5 estrellas!", author: "Michele" },
    { quote: "¡Su servicio al cliente es EXCEPCIONAL! Su empresa hace que una persona se sienta a gusto.", author: "Miguel O" }
  ];

  const metrics = [
    { icon: <MessageSquareIcon />, value: "24/7", label: "Soporte por Chat en Vivo" },
    { icon: <ClockIcon />, value: "< 24hrs", label: "Tiempo de Respuesta" },
    { icon: <ThumbsUpIcon />, value: "98%", label: "Tasa de Satisfacción" }
  ];

  return (
    <section id="customer-service" className="py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 mb-4">
            <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">Soporte al Cliente</span> Excepcional
          </h2>
          <h3 className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestro equipo dedicado está aquí para ayudarte a tener éxito con cada campaña.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col h-full text-center">
              <p className="text-base italic text-gray-700 flex-grow">"{testimonial.quote}"</p>
              <div className="mt-4">
                <span className="font-medium text-gray-900">- {testimonial.author}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-3xl grid grid-cols-3 border-t border-gray-200 pt-8">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-1">
              <div className="h-8 w-8 text-primary">{metric.icon}</div>
              <p className="text-2xl font-semibold text-primary">{metric.value}</p>
              <p className="text-center text-sm text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;