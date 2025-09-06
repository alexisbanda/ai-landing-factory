import React, { useState, useEffect } from 'react';

interface ContextualCtaProps {
  onOpenDemoModal: () => void;
  onOpenSignUpModal: () => void;
}

const ContextualCtaComponent: React.FC<ContextualCtaProps> = ({ onOpenDemoModal, onOpenSignUpModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA when scrolled past the hero section (approx 700px)
      if (window.scrollY > 700) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside
      aria-hidden={!isVisible}
      className={`fixed bottom-0 left-0 right-0 z-40 p-4 transition-all duration-500 ease-in-out
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex w-full items-center justify-between rounded-xl border border-slate-200/80 bg-white/70 p-3 shadow-contextual-cta backdrop-blur-lg sm:p-4">
          <p className="hidden text-base font-semibold text-cleat-dark sm:block md:text-lg">
            ¿Listo para empezar a construir?
          </p>
          <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end">
            <button
              onClick={onOpenDemoModal}
              className="w-full rounded-full border border-cleat-dark bg-white px-4 py-2 text-center text-xs font-semibold text-cleat-dark transition-all duration-300 hover:bg-cleat-dark hover:text-white sm:w-auto sm:text-sm"
            >
              VER DEMO
            </button>
            <button
              onClick={onOpenSignUpModal}
              className="w-full rounded-full bg-cleat-dark px-4 py-2 text-center text-xs font-semibold text-white transition-all duration-300 hover:bg-opacity-90 sm:w-auto sm:text-sm"
            >
              EMPIEZA GRATIS
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

const ContextualCta = React.memo(ContextualCtaComponent);

export default ContextualCta;