import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define a more specific type for translations to help with type safety.
type Translations = { [key: string]: any };

const translations: Translations = {};

async function loadTranslations() {
  try {
    const enRes = await fetch('/locales/en.json');
    if (enRes.ok) {
      translations.en = await enRes.json();
    } else {
      console.error("Failed to load en.json");
    }
    const esRes = await fetch('/locales/es.json');
    if (esRes.ok) {
      translations.es = await esRes.json();
    } else {
      console.error("Failed to load es.json");
    }
  } catch (error) {
    console.error("Failed to load translations:", error);
  }
}

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es'); // Default to 'es' as per Header config
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTranslations().then(() => setIsLoaded(true));
  }, []);

  const t = (key: string): string => {
    if (!isLoaded) return key;

    // Helper function to safely navigate a nested object with a key like "hero.title_part1"
    const getTranslation = (langObj: any, keys: string[]): string | undefined => {
      if (!langObj) {
        return undefined;
      }
      let result: any = langObj;
      for (const k of keys) {
        // Check if the current level of result is an object before proceeding
        if (typeof result !== 'object' || result === null) {
          return undefined;
        }
        result = result[k];
      }
      // Allow strings or numbers to be returned, convert numbers to string
      return (typeof result === 'string' || typeof result === 'number') ? String(result) : undefined;
    };
    
    const keys = key.split('.');

    // 1. Try to get the translation in the currently selected language
    let translation = getTranslation(translations[language], keys);
    if (translation !== undefined) {
      return translation;
    }

    // 2. Fallback to English if the translation is missing in the current language
    if (language !== 'en') {
        translation = getTranslation(translations['en'], keys);
        if (translation !== undefined) {
            return translation;
        }
    }

    // 3. If no translation is found in either language, return the original key
    return key;
  };
  
  // Render children only after translations are attempted to be loaded.
  // This prevents components from rendering with keys before the context is ready.
  if (!isLoaded) {
    // You might want to render a loading spinner here for a better UX
    return null; 
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};