import React, { useEffect, useState } from 'react';
import { Promotion } from '../contexts/PromotionContext';


interface PromotionBarProps {
  promotion: Promotion;
  onClose?: () => void;
  onOpenPricing?: () => void;
}

const PromotionBar: React.FC<PromotionBarProps> = ({ promotion, onClose, onOpenPricing }) => {
  if (!promotion.isActive) return null;

  // Countdown logic
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  useEffect(() => {
    if (!promotion.endDate) return;
    const end = new Date(promotion.endDate).getTime();
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft('00:00:00');
        clearInterval(timer);
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [promotion.endDate]);

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    if (promotion.ctaLink === '/pricing' && onOpenPricing) {
      onOpenPricing();
    } else {
      window.location.href = promotion.ctaLink || '#';
    }
  };

  // Extraer porcentaje del mensaje
  const percentMatch = promotion.message.match(/(\d+)%/);
  const discountPercent = percentMatch ? percentMatch[1] : null;

  return (
    <div className="w-full bg-primary text-white text-center py-2 px-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-1 sm:gap-6 relative z-50 text-sm sm:text-base">
      {/* Desktop: texto completo, contador y CTA normal */}
      <span className="hidden sm:flex font-semibold flex-row items-center gap-2 max-w-[90vw] truncate">
        <span>{promotion.message}</span>
        {promotion.endDate && timeLeft && (
          <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-white/10 text-yellow-200 font-mono text-xs font-bold border border-yellow-200/30 animate-pulse">
            <svg className="w-4 h-4 mr-1 text-yellow-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            Termina en {timeLeft}
          </span>
        )}
      </span>
      {promotion.ctaText && promotion.ctaLink && (
        <a
          href={promotion.ctaLink}
          onClick={handleCta}
          className="hidden sm:inline-flex ml-4 items-center gap-2 px-5 py-2 rounded-full bg-white/90 text-primary font-bold shadow hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-200 border border-yellow-200 text-base"
        >
          <span>{promotion.ctaText}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      )}

      {/* Móvil: solo contador y botón con porcentaje */}
      <span className="sm:hidden font-semibold flex flex-col items-center gap-1 max-w-[90vw] truncate">
        {promotion.endDate && timeLeft && (
          <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-white/10 text-yellow-200 font-mono text-base font-bold border border-yellow-200/30 animate-pulse">
            <svg className="w-4 h-4 mr-1 text-yellow-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            {timeLeft}
          </span>
        )}
      </span>
      {promotion.ctaText && promotion.ctaLink && discountPercent && (
        <a
          href={promotion.ctaLink}
          onClick={handleCta}
          className="sm:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-primary font-bold shadow hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-200 border border-yellow-200 text-base"
        >
          <span>{discountPercent}% OFF</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      )}

      {onClose && (
        <button onClick={onClose} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-yellow-200 text-lg">&times;</button>
      )}
    </div>
  );
}

export default PromotionBar;
