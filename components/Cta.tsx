import React from 'react';

interface CtaProps {
  onOpenDemoModal: () => void;
  onOpenContactModal: () => void;
}

const Cta: React.FC<CtaProps> = ({ onOpenDemoModal, onOpenContactModal }) => {
  const benefits = [
    "Textos impulsados por IA que convierten visitantes en clientes",
    "Páginas ultrarrápidas optimizadas para Core Web Vitals y SEO",
    "Integraciones fluidas con tus herramientas de marketing favoritas",
    "Un editor simple e intuitivo que es un placer usar"
  ];

  const userImages = [
      "https://picsum.photos/seed/face1/40/40",
      "https://picsum.photos/seed/face2/40/40",
      "https://picsum.photos/seed/face3/40/40",
      "https://picsum.photos/seed/face4/40/40",
  ];

  return (
    <section id="final-cta" className="py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="flex h-full flex-col justify-center space-y-6 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 p-8 shadow-2xl md:p-10">
              <div className="space-y-4 text-center">
                <p className="text-sm font-medium uppercase tracking-wide text-blue-200">
                  ¿Listo para Dejar de Construir y Empezar a Convertir?
                </p>
                <p className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                  Lanza gratis tu próxima página de aterrizaje de alto rendimiento
                </p>
              </div>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-400"></div>
                    <p className="text-base leading-relaxed text-blue-100">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row sm:gap-4">
                <button
                  onClick={onOpenContactModal}
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-theme-cta-gradient-start to-theme-cta-gradient-end px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-90 sm:px-8 sm:text-base"
                >
                  INICIAR PRUEBA GRATIS
                </button>
                <button onClick={onOpenDemoModal} className="flex w-full items-center justify-center rounded-full border-2 border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-all hover:scale-[1.02] hover:bg-blue-50 sm:w-auto sm:px-8 sm:text-base">
                  AGENDAR DEMO
                </button>
              </div>
              <div className="flex flex-col items-center space-y-4 pt-6">
                <div className="flex -space-x-3">
                    {userImages.map((src, index) => (
                        <img key={index} alt={`User ${index + 1}`} src={src} className="h-10 w-10 rounded-full border-2 border-white bg-white object-cover" loading="lazy" decoding="async" />
                    ))}
                </div>
                <p className="text-center text-sm text-blue-100 md:text-base">
                  Únete a más de 1,000 especialistas en marketing y fundadores felices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;