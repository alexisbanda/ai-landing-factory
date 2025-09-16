import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Logo, ChevronDownIcon, FileSearchIcon, ArrowLeftRightIcon, SparklesIcon, TargetIcon, FileTextIcon, HeartHandshakeIcon, UserIcon, MenuIcon, XIcon } from './icons/Icons';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

// =================================================================
// CONFIGURATION
// =================================================================
const headerConfig = {
  glassmorphismOnScroll: true,
  sophisticatedHovers: true,
  advancedMenuAnimation: true,
  showWatchDemoButton: true,
  showGetStartedButton: false,
  showLoginButton: false,
};

// I18n Configuration
const i18nConfig = {
  enabled: true,
  defaultLanguage: 'es' as 'en' | 'es',
};
// =================================================================

interface HeaderProps {
  onOpenDemoModal: () => void;
  onOpenContactModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenDemoModal, onOpenContactModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const { setLanguage } = useLanguage();

  // Set default language from config on mount
  useEffect(() => {
    if (i18nConfig.enabled) {
      setLanguage(i18nConfig.defaultLanguage);
    }
  }, [setLanguage]);


  const featuresButtonRef = useRef<HTMLButtonElement>(null);
  const featuresDropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const featuresNavContainerRef = useRef<HTMLDivElement>(null);
  const howItWorksNavRef = useRef<HTMLAnchorElement>(null);
  const showcaseNavRef = useRef<HTMLAnchorElement>(null);
  const testimonialsNavRef = useRef<HTMLAnchorElement>(null);
  const pricingNavRef = useRef<HTMLAnchorElement>(null);
  const faqNavRef = useRef<HTMLAnchorElement>(null);

  const features = [
    { icon: <SparklesIcon />, title: "Generación de Contenido con IA", description: "Genera textos persuasivos, titulares y CTA en segundos." },
    { icon: <ArrowLeftRightIcon />, title: "Alineación de Marca Instantánea", description: "La IA diseña una página que se adapta a tu marca basándose en tus activos." },
    { icon: <FileSearchIcon />, title: "Pruebas A/B Automatizadas", description: "Prueba automáticamente variaciones de tu página para maximizar conversiones." },
    { icon: <TargetIcon />, title: "Analíticas de Conversión", description: "Rastrea visitantes, prospectos y tasas de conversión con un panel simple y claro." },
    { icon: <FileTextIcon />, title: "Integraciones de Formularios", description: "Conéctate con tu CRM, herramientas de email marketing y más." },
    { icon: <HeartHandshakeIcon />, title: "SEO Dinámico", description: "Nuestra IA optimiza el contenido de tu página para los mejores rankings." },
  ];

  // Dynamic header background on scroll
  useEffect(() => {
    if (!headerConfig.glassmorphismOnScroll) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close features dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        featuresButtonRef.current && !featuresButtonRef.current.contains(event.target as Node) &&
        featuresDropdownRef.current && !featuresDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFeaturesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll spying for active nav link
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // --- Magic Indicator Logic ---
  const handleNavHover = useCallback((element: HTMLElement | null) => {
      if (!element || !headerConfig.advancedMenuAnimation) return;
      setIndicatorStyle({
          left: element.offsetLeft,
          width: element.offsetWidth,
          opacity: 1,
      });
  }, []);

  const updateIndicatorToRestingState = useCallback(() => {
      if (!headerConfig.advancedMenuAnimation) return;

      let targetElement: HTMLElement | null = null;
      if (isFeaturesOpen && featuresNavContainerRef.current) {
          targetElement = featuresNavContainerRef.current;
      } else {
          switch (activeSection) {
              
              case 'how-it-works':
                  targetElement = howItWorksNavRef.current;
                  break;
              case 'showcase':
                  targetElement = showcaseNavRef.current;
                  break;
              case 'testimonials':
                  targetElement = testimonialsNavRef.current;
                  break;
              case 'pricing':
                  targetElement = pricingNavRef.current;
                  break;
              case 'faqs':
                  targetElement = faqNavRef.current;
                  break;
              default:
                  targetElement = null;
          }
      }

      if (targetElement) {
          setIndicatorStyle({
              left: targetElement.offsetLeft,
              width: targetElement.offsetWidth,
              opacity: 1,
          });
      } else {
          setIndicatorStyle(prev => ({ ...prev, opacity: 0, width: 0 }));
      }
  }, [activeSection, isFeaturesOpen]);

  useEffect(() => {
      updateIndicatorToRestingState();
  }, [updateIndicatorToRestingState]);


  return (
    <header className={`
      sticky top-0 z-50 w-full py-5 transition-all duration-300
      ${headerConfig.glassmorphismOnScroll
          ? (isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent')
          : 'bg-white shadow-md'
      }
    `}>
      <div className="relative mx-auto max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8 flex">
        
        {/* Left Section: Logo */}
        <div className="flex lg:flex-1 items-center justify-start">
          <a href="#" className="flex items-center">
            <Logo className="h-9 w-auto" />
          </a>
        </div>

        {/* Center Section: Desktop Navigation */}
        <nav
          ref={navContainerRef}
          onMouseLeave={updateIndicatorToRestingState}
          className="hidden lg:flex items-center justify-center gap-6 relative"
        >
          {headerConfig.advancedMenuAnimation && (
            <div
              className="absolute bottom-[-2px] h-0.5 bg-primary transition-all duration-300 ease-out"
              style={indicatorStyle}
            />
          )}
          <div
            ref={featuresNavContainerRef}
            onMouseEnter={() => handleNavHover(featuresNavContainerRef.current)}
            className="group relative"
          >
            <button 
                ref={featuresButtonRef}
                onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                aria-haspopup="true"
                aria-expanded={isFeaturesOpen}
                className="relative flex items-center gap-2 px-3 py-2 text-gray-700"
            >
              <span className={`transition-colors group-hover:text-primary ${isFeaturesOpen ? 'text-primary font-semibold' : 'font-medium'}`}>Características</span>
              <ChevronDownIcon className={`h-4 w-4 transition-all duration-300 ${isFeaturesOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`} />
              {headerConfig.sophisticatedHovers && !headerConfig.advancedMenuAnimation && (
                 <span className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ease-out
                    ${isFeaturesOpen ? 'w-full' : 'w-0 group-hover:w-full'}
                `}></span>
              )}
            </button>
            <div 
                ref={featuresDropdownRef}
                className={`dropdown-menu absolute -left-1/2 top-full mt-2 w-[600px] grid origin-top grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 ease-out ${isFeaturesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
            >
                {features.map((feature, index) => (
                  <a 
                    key={feature.title} 
                    href="#" 
                    className={`group/item flex flex-col gap-2 rounded-lg p-3 transition-all duration-300 hover:bg-slate-50 ${isFeaturesOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                    style={{ transitionDelay: `${isFeaturesOpen ? 150 + index * 40 : 0}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      {feature.icon}
                      <span className="font-semibold text-cleat-dark">{feature.title}</span>
                    </div>
                    <span className="text-xs leading-relaxed text-slate-600">{feature.description}</span>
                  </a>
                ))}
            </div>
          </div>
          
          <a 
            key="ai-concept-generator"
            href="#ai-concept-generator" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <SparklesIcon className="h-4 w-4" />
            <span>
              Generador IA
            </span>
          </a>

          <a 
            ref={howItWorksNavRef}
            onMouseEnter={() => handleNavHover(howItWorksNavRef.current)}
            key="how-it-works"
            href="#how-it-works" 
            className="relative group px-3 py-2 text-gray-700"
          >
            <span className={`transition-colors group-hover:text-primary ${activeSection === 'how-it-works' ? 'text-primary font-semibold' : 'font-medium'}`}>
              Cómo Funciona
            </span>
            {headerConfig.sophisticatedHovers && !headerConfig.advancedMenuAnimation && (
              <span className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ease-out
                ${activeSection === 'how-it-works' ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            )}
          </a>
          
          <a
            ref={showcaseNavRef}
            onMouseEnter={() => handleNavHover(showcaseNavRef.current)}
            key="showcase"
            href="#showcase"
            className="relative group px-3 py-2 text-gray-700"
          >
            <span className={`transition-colors group-hover:text-primary ${activeSection === 'showcase' ? 'text-primary font-semibold' : 'font-medium'}`}>
              Galería
            </span>
            {headerConfig.sophisticatedHovers && !headerConfig.advancedMenuAnimation && (
              <span className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ease-out
                ${activeSection === 'showcase' ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            )}
          </a>

          <a
            ref={testimonialsNavRef}
            onMouseEnter={() => handleNavHover(testimonialsNavRef.current)}
            key="testimonials"
            href="#testimonials"
            className="relative group px-3 py-2 text-gray-700"
          >
            <span className={`transition-colors group-hover:text-primary ${activeSection === 'testimonials' ? 'text-primary font-semibold' : 'font-medium'}`}>
              Testimonios
            </span>
            {headerConfig.sophisticatedHovers && !headerConfig.advancedMenuAnimation && (
              <span className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ease-out
                ${activeSection === 'testimonials' ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            )}
          </a>

          <a
            ref={pricingNavRef}
            onMouseEnter={() => handleNavHover(pricingNavRef.current)}
            key="pricing"
            href="#pricing"
            className="relative group px-3 py-2 text-gray-700"
          >
            <span className={`transition-colors group-hover:text-primary ${activeSection === 'pricing' ? 'text-primary font-semibold' : 'font-medium'}`}>
              Precios
            </span>
            {headerConfig.sophisticatedHovers && !headerConfig.advancedMenuAnimation && (
              <span className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ease-out
                ${activeSection === 'pricing' ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            )}
          </a>

          <a
            ref={faqNavRef}
            onMouseEnter={() => handleNavHover(faqNavRef.current)}
            key="faqs"
            href="#faqs"
            className="relative group px-3 py-2 text-gray-700"
          >
            <span className={`transition-colors group-hover:text-primary ${activeSection === 'faqs' ? 'text-primary font-semibold' : 'font-medium'}`}>
              FAQs
            </span>
            {headerConfig.sophisticatedHovers && !headerConfig.advancedMenuAnimation && (
              <span className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ease-out
                ${activeSection === 'faqs' ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            )}
          </a>
        </nav>

        {/* Right Section: CTAs and Mobile Toggle */}
        <div className="flex lg:flex-1 items-center justify-end">
          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            {headerConfig.showWatchDemoButton && (
                <button onClick={onOpenDemoModal} className={`
                    border border-cleat-dark text-cleat-dark px-4 py-2 rounded-full text-sm font-semibold hover:bg-cleat-dark hover:text-white transition-all duration-300
                    ${headerConfig.sophisticatedHovers ? 'transform hover:scale-105' : ''}
                `}>
                    VER DEMO
                </button>
            )}
            {headerConfig.showGetStartedButton && (
                <button onClick={onOpenContactModal} className={`
                    relative overflow-hidden bg-cleat-dark text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 group
                    ${headerConfig.sophisticatedHovers ? 'transform hover:scale-105' : 'hover:bg-opacity-90'}
                `}>
                    CONTACTO
                    {headerConfig.sophisticatedHovers && (
                        <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:left-[100%]" />
                    )}
                </button>
            )}
            {(headerConfig.showWatchDemoButton || headerConfig.showGetStartedButton) && headerConfig.showLoginButton && (
                <div className="ml-2 h-5 border-l border-slate-400"></div>
            )}
            {headerConfig.showLoginButton && (
                <a href="#" className="ml-2 flex items-center gap-1 text-base hover:text-primary">
                    <UserIcon className="h-4 w-4" />
                </a>
            )}
            {i18nConfig.enabled && (
              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
             <button onClick={onOpenContactModal} className="bg-cleat-dark text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90">CONTACTO</button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className={`lg:hidden bg-white shadow-lg absolute top-full left-0 w-full p-6 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'}`}>
          <nav className="flex flex-col gap-4">
              <div className="flex flex-col">
                <button onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)} className="flex justify-between items-center px-3 py-2 text-gray-700 hover:text-primary">
                    <span className={`transition-colors group-hover:text-primary ${isMobileFeaturesOpen ? 'text-primary font-semibold' : 'font-medium'}`}>Características</span>
                    <ChevronDownIcon className={`h-4 w-4 transition-transform ${isMobileFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileFeaturesOpen && (
                    <div className="pl-4 pt-2 flex flex-col gap-2">
                        {features.map((feature) => (
                            <a key={feature.title} href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50">
                                {feature.icon}
                                <span className="text-sm font-medium text-cleat-dark">{feature.title}</span>
                            </a>
                        ))}
                    </div>
                )}
              </div>
              <a href="#ai-concept-generator" className="flex items-center justify-center gap-2 w-full text-center bg-primary text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all">
                <SparklesIcon className="h-5 w-5" />
                <span>Generador IA</span>
              </a>
              <a href="#how-it-works" className="px-3 py-2 text-gray-700 hover:text-primary">Cómo Funciona</a>
              <a href="#showcase" className="px-3 py-2 text-gray-700 hover:text-primary">Galería</a>
              <a href="#testimonials" className="px-3 py-2 text-gray-700 hover:text-primary">Testimonios</a>
              <a href="#pricing" className="px-3 py-2 text-gray-700 hover:text-primary">Precios</a>
              <a href="#faqs" className="px-3 py-2 text-gray-700 hover:text-primary">FAQs</a>
              
              {(headerConfig.showWatchDemoButton || headerConfig.showGetStartedButton || headerConfig.showLoginButton) && (
                <div className="border-t border-slate-200 mt-4 pt-4 flex flex-col gap-4">
                    {headerConfig.showWatchDemoButton && (
                        <button onClick={onOpenDemoModal} className="w-full text-center border border-cleat-dark text-cleat-dark px-4 py-2 rounded-full text-sm font-semibold hover:bg-cleat-dark hover:text-white transition-all">VER DEMO</button>
                    )}
                    {headerConfig.showGetStartedButton && (
                         <button onClick={onOpenContactModal} className="w-full text-center bg-cleat-dark text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90">CONTACTO</button>
                    )}
                    {headerConfig.showLoginButton && (
                        <a href="#" className="mt-2 flex items-center justify-center gap-1 text-base hover:text-primary">
                            Iniciar Sesión <UserIcon className="h-4 w-4" />
                        </a>
                    )}
                </div>
              )}

              {i18nConfig.enabled && (
                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-center">
                  <LanguageSwitcher />
                </div>
              )}
          </nav>
      </div>
    </header>
  );
};

export default Header;