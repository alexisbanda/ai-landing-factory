import React, { createContext, useContext, useMemo } from 'react';

export interface Promotion {
  id: string;
  type: 'bar' | 'modal';
  isActive: boolean;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  startDate?: string;
  endDate?: string;
}

interface PromotionContextValue {
  promotions: Promotion[];
}

const PromotionContext = createContext<PromotionContextValue>({ promotions: [] });

export const usePromotion = () => useContext(PromotionContext);

function isPromotionActive(promo: Promotion) {
  if (!promo.isActive) return false;
  const now = new Date();
  if (promo.startDate && new Date(promo.startDate) > now) return false;
  if (promo.endDate && new Date(promo.endDate) < now) return false;
  return true;
}

export const PromotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  let config: Promotion[] = [];
  let envConfig: string | undefined = undefined;
  // Vite variables de entorno
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_PROMOTIONS_CONFIG) {
    envConfig = import.meta.env.VITE_PROMOTIONS_CONFIG;
  } else if (process.env.REACT_APP_PROMOTIONS_CONFIG) {
    envConfig = process.env.REACT_APP_PROMOTIONS_CONFIG;
  } else if (process.env.VITE_PROMOTIONS_CONFIG) {
    envConfig = process.env.VITE_PROMOTIONS_CONFIG;
  }
  console.log('PROMO ENV CONFIG:', envConfig); // Depuración
  try {
    if (envConfig) {
      config = JSON.parse(envConfig);
    }
  } catch (e) {
    console.error('Error parsing promotions config:', e);
    config = [];
  }

  const promotions = useMemo(() => config.filter(isPromotionActive), [config]);

  return (
    <PromotionContext.Provider value={{ promotions }}>
      {children}
    </PromotionContext.Provider>
  );
};
