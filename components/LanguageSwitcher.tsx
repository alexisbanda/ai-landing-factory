import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UKFlagIcon, SpainFlagIcon } from './icons/Icons';

const LanguageSwitcherComponent: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      {language === 'en' ? (
        <UKFlagIcon className="w-full h-full" />
      ) : (
        <SpainFlagIcon className="w-full h-full" />
      )}
    </button>
  );
};

const LanguageSwitcher = React.memo(LanguageSwitcherComponent);

export default LanguageSwitcher;