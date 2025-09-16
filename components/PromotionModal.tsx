import React from 'react';
import { Promotion } from '../contexts/PromotionContext';


interface PromotionModalProps {
  promotion: Promotion;
  onClose?: () => void;
  onOpenContactModal?: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ promotion, onClose, onOpenContactModal }) => {
  if (!promotion.isActive) return null;
  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    if (promotion.ctaLink === '/contact' && onOpenContactModal) {
      onOpenContactModal();
      if (onClose) onClose();
    } else {
      window.location.href = promotion.ctaLink || '#';
      if (onClose) onClose();
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 max-w-xs sm:max-w-lg w-[95vw] sm:w-full relative border border-neutral-200 animate-fade-in-up">
        <button onClick={onClose} className="absolute top-2 sm:top-4 right-2 sm:right-4 text-neutral-400 text-xl sm:text-2xl font-bold hover:text-primary transition-all">&times;</button>
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 sm:mb-4">
            <span className="inline-block px-3 sm:px-4 py-1 rounded-full bg-neutral-100 text-primary text-xs font-semibold tracking-wider border border-primary/30">Oferta exclusiva</span>
          </div>
          <div className="text-lg sm:text-2xl font-bold mb-2 text-cleat-dark">{promotion.message}</div>
          <div className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">Solicita tu demo personalizada y descubre cómo puedes lanzar tu landing en minutos, sin complicaciones ni costos ocultos.</div>
          {promotion.ctaText && promotion.ctaLink && (
            <a
              href={promotion.ctaLink}
              onClick={handleCta}
              className="inline-block mt-2 px-5 sm:px-8 py-2 sm:py-3 bg-cleat-dark text-white rounded-full font-semibold text-base sm:text-lg shadow hover:scale-105 hover:bg-primary transition-all duration-300"
            >
              {promotion.ctaText} <span className="ml-2">🚀</span>
            </a>
          )}
          <div className="mt-2 sm:mt-4 text-xs text-neutral-400">Sin compromiso. ¡Te mostramos el poder de la IA en vivo!</div>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
