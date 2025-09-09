import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Feature } from '../types';
import { FileSearchIcon, ArrowLeftRightIcon, SparklesIcon, TargetIcon, FileTextIcon, HeartHandshakeIcon, ArrowRightIcon, CheckIcon, ArrowLeftIcon, ZapIcon, GavelIcon } from './icons/Icons';

// =================================================================

// Fix: Omitted 'details' from the Feature type to resolve the type conflict.
interface TabFeature extends Omit<Feature, 'description' | 'details'> {
    uppercaseTitle: string;
    headingMain: string;
    headingGradient: string;

    description: string;
    details: string[];
    image: string;
}

// =================================================================
// MODAL COMPONENT
// =================================================================
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-xl m-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-4">
                    {children}
                </div>
            </div>
        </div>
    );
};


// =================================================================
// CONFIGURATION
// =================================================================
const featuresTabsConfig = {
  layoutStyle: 'contained' as 'contained' | 'full-bleed',
  tabOrientation: 'horizontal' as 'horizontal' | 'vertical',
};
// =================================================================


const featuresData: TabFeature[] = [
    {
        icon: <SparklesIcon />,
        title: "Inteligencia de Serie",
        uppercaseTitle: "TU WEB, UN EMPLEADO MÁS",
        headingMain: "Cada Landing Page, ",
        headingGradient: "un Agente Inteligente",
        description: "No ofrecemos la IA como un extra caro. Es nuestro estándar. Cada página que construimos viene equipada con capacidades de IA avanzadas, transformando tu web en un activo que trabaja 24/7 para tu negocio.",
        details: ["Chatbots inteligentes para capturar leads.", "Contenido dinámico optimizado por IA.", "Una ventaja competitiva real, incluida de serie."],
        image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2940&auto=format&fit=crop",
        link: "#"
    },
    {
        icon: <ZapIcon />,
        title: "Lanzamiento Ultra-Rápido",
        uppercaseTitle: "VELOCIDAD QUE IMPULSA",
        headingMain: "Tu Landing Operativa ",
        headingGradient: "en Días, no Meses",
        description: "Gracias a nuestra metodología híbrida IA-humana, tu landing page estará operativa y generando resultados en días, no en meses. Eliminamos los cuellos de botella y la burocracia de los procesos tradicionales.",
        details: ["Proceso de creación acelerado y eficiente.", "Reducción drástica de tiempos de espera.", "Agilidad para adaptarse al mercado."],
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2864&auto=format&fit=crop",
        link: "#"
    },
    {
        icon: <ArrowLeftRightIcon />,
        title: "Diseño Estratégico",
        uppercaseTitle: "BELLEZA QUE CONVIERTE",
        headingMain: "Diseño Único, ",
        headingGradient: "Optimizado para Vender",
        description: "Nuestra IA propone, pero el ojo experto humano refina. Creamos diseños únicos que no solo son estéticos, sino que están pensados para convertir y reflejar tu marca a la perfección, garantizando una experiencia de usuario impecable.",
        details: ["Diseños basados en tu identidad de marca.", "Optimización UX/UI para la máxima conversión.", "Mockups interactivos para tu validación."],
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2940&auto=format&fit=crop",
        link: "#"
    },
    {
        icon: <HeartHandshakeIcon />,
        title: "Socio de Crecimiento",
        uppercaseTitle: "TU ÉXITO ES EL NUESTRO",
        headingMain: "No te Dejamos Solo ",
        headingGradient: "Tras el Lanzamiento",
        description: "No te entregamos una web y desaparecemos. Ofrecemos un acompañamiento constante y mejoras proactivas para asegurar que tu landing page evolucione con tu negocio y el mercado, manteniéndose siempre relevante y optimizada.",
        details: ["Monitorización de rendimiento y seguridad.", "Propuestas proactivas de mejora y optimización.", "Un socio tecnológico a largo plazo para tu negocio."],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2938&auto=format&fit=crop",
        link: "#"
    },
    {
        icon: <FileTextIcon />,
        title: "Inversión Inteligente",
        uppercaseTitle: "VALOR SIN COMPROMISO",
        headingMain: "Tecnología de Punta, ",
        headingGradient: "Precio Accesible",
        description: "Accede a tecnología de punta y expertise humano sin los costos desorbitados de una agencia tradicional. Tu inversión se traduce directamente en un activo digital de alto rendimiento que genera un ROI claro y medible.",
        details: ["Precios transparentes y accesibles.", "Alto ROI garantizado.", "Sin costos ocultos ni sorpresas."],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
        link: "#"
    },
];

const FeaturesTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const highlightRef = useRef<HTMLDivElement>(null);
    const [loadedImages, setLoadedImages] = useState<boolean[]>(() => new Array(featuresData.length).fill(false));

    const isFullBleed = featuresTabsConfig.layoutStyle === 'full-bleed';
    const isVerticalLayout = featuresTabsConfig.tabOrientation === 'vertical';

    const handlePrev = () => {
        setActiveTab((prev) => (prev - 1 + featuresData.length) % featuresData.length);
    };
    const handleNext = () => {
        setActiveTab((prev) => (prev + 1) % featuresData.length);
    };

    useEffect(() => {
        const element = highlightRef.current;
        if (!element) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
        }, { threshold: 0.8 });
        observer.observe(element);
        return () => { if (element) observer.unobserve(element); };
    }, []);

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => {
            if (prev[index]) return prev;
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
        });
    };
    
    const imageRoundingClass = isFullBleed
        ? (isVerticalLayout ? 'md:rounded-lg' : 'md:rounded-l-lg md:rounded-r-none')
        : 'rounded-lg';
        
    const activeFeature = featuresData[activeTab];

    return (
        <>
        <section id="features" className="relative mb-10 mt-16 flex flex-col gap-0 overflow-x-hidden">
            <div className="container mx-auto px-4">
                <div className="mx-auto text-center">
                    <h2 className="md:w-4/ mx-auto mb-2 text-2xl font-bold text-slate-800 md:mb-3 md:text-4xl xl:mb-4 xl:text-5xl">
                        <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">Todo lo que Necesitas para Convertir</span>
                    </h2>
                    <h3 className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[75%] text-gray-600">Explora las herramientas principales de VANLANDINGS, diseñadas para convertir visitantes en clientes.</h3>
                </div>

                <div ref={highlightRef} className="my-4 lg:my-8 text-center">
                    <h3 className="text-xl md:text-2xl font-semibold text-cleat-dark">
                        Nuestra IA <span className="highlight-word highlight-crea" style={{ transitionDelay: '200ms' }}>crea</span>, <span className="highlight-word highlight-optimiza" style={{ transitionDelay: '400ms' }}>optimiza</span> y <span className="highlight-word highlight-acelera" style={{ transitionDelay: '600ms' }}>acelera</span> tu camino al éxito.
                    </h3>
                </div>
            </div>

            <div className={`mt-10 w-full`}>
                <div className={`${isFullBleed ? 'w-full' : 'container mx-auto max-w-screen-xl px-4'}`}>
                    <div className={`${isVerticalLayout 
                        ? (isFullBleed ? 'lg:grid lg:grid-cols-12 lg:gap-2 lg:items-start' : 'lg:grid lg:grid-cols-[280px_1fr] lg:gap-12 lg:items-start') 
                        : 'flex flex-col items-center'
                    }`}>
                        
                        {/* Mobile Carousel Navigation */}
                        <div className="lg:hidden mb-6 w-full">
                            <div className="flex items-center justify-between max-w-xs mx-auto">
                                <button onClick={handlePrev} aria-label="Anterior" className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                                    <ArrowLeftIcon className="h-5 w-5" />
                                </button>
                                <div className="text-center">
                                    <p className="font-semibold text-lg text-cleat-dark">{activeFeature.title}</p>
                                    <p className="text-sm text-slate-500">{activeTab + 1} / {featuresData.length}</p>
                                </div>
                                <button onClick={handleNext} aria-label="Siguiente" className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                                    <ArrowRightIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Desktop Tabs Container */}
                        <div role="tablist" className={`hidden relative ${
                            isVerticalLayout 
                            ? (isFullBleed ? 'lg:col-span-3 lg:col-start-2' : 'w-full') + ' lg:flex flex-col w-full max-w-sm mx-auto lg:w-full lg:max-w-none lg:space-y-1.5' 
                            : 'lg:flex items-center justify-center text-muted-foreground h-auto w-full space-x-1.5 rounded-lg bg-slate-100 p-1.5'
                        }`}>
                            {featuresData.map((feature, index) => (
                                <button
                                    key={index}
                                    role="tab"
                                    aria-selected={activeTab === index}
                                    data-state={activeTab === index ? 'active' : 'inactive'}
                                    onClick={() => setActiveTab(index)}
                                    className={`z-10 group whitespace-nowrap focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 !mb-0 flex items-center transition-colors duration-300 ${
                                        isVerticalLayout
                                        ? 'w-full justify-start gap-3 rounded-lg p-4 font-semibold text-slate-600 hover:bg-slate-100/50 data-[state=active]:text-primary data-[state=active]:bg-slate-100'
                                        : 'h-9 justify-center rounded-md border-0 px-4 py-2 text-sm font-medium text-slate-500 hover:text-primary data-[state=active]:text-primary sm:group-data-[state=active]:justify-start sm:group-data-[state=active]:gap-2 lg:justify-start lg:gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm'
                                    }`}
                                >
                                    <div className={`transition-transform duration-300 ${isVerticalLayout ? 'group-data-[state=active]:scale-110' : 'group-hover:scale-110 group-hover:-rotate-6 data-[state=active]:group-hover:scale-100 data-[state=active]:group-hover:rotate-0'}`}>
                                        {feature.icon}
                                    </div>
                                    <h4 className={`${isVerticalLayout ? '' : 'hidden sm:group-data-[state=active]:block lg:block'}`}>{feature.title}</h4>
                                </button>
                            ))}
                        </div>
                        
                        {/* Content Container */}
                        <div className={`
                            relative grid w-full
                            ${isVerticalLayout && isFullBleed ? 'lg:col-span-8' : ''}
                            ${!isVerticalLayout ? 'lg:mt-8 lg:md:mt-16' : ''}
                        `}>
                            {featuresData.map((feature, index) => (
                                <div
                                    key={index}
                                    role="tabpanel"
                                    data-state={activeTab === index ? 'active' : 'inactive'}
                                    className={`
                                        col-start-1 row-start-1 w-full transition-opacity duration-500 data-[state=inactive]:opacity-0 data-[state=inactive]:pointer-events-none data-[state=active]:opacity-100
                                        ${
                                            isVerticalLayout
                                            ? 'flex flex-col-reverse md:flex-row md:items-start' // Layout for Vertical (always two columns side-by-side)
                                            : isFullBleed
                                                ? 'md:grid md:grid-cols-2 md:items-stretch' // Layout for Horizontal Full-Bleed
                                                : 'flex flex-col-reverse gap-6 md:flex-row md:gap-10' // Layout for Horizontal Contained
                                        }
                                    `}
                                >
                                    {/* Text content div */}
                                    <div className={`
                                        flex flex-col items-center text-center md:text-left md:items-start gap-3.5 md:gap-6 md:py-8
                                        ${
                                            isVerticalLayout
                                            ? 'md:w-1/2 md:pr-12' // Vertical layout gets 50% width and padding
                                            : (isFullBleed 
                                                ? 'px-6 md:col-start-1 md:flex md:justify-center md:items-center' // Horizontal full-bleed styling
                                                : 'px-6 md:w-1/2' // Horizontal contained styling
                                            )
                                        }
                                    `}>
                                        <div className={`w-full ${!isVerticalLayout && isFullBleed ? 'max-w-lg' : ''}`}>
                                            {/* ===== UNIFIED RESPONSIVE HEADER ===== */}
                                            <div className="flex flex-col gap-2 md:gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center text-primary">{feature.icon}</div>
                                                    <strong className="text-sm md:text-lg font-medium uppercase tracking-[0.5px] text-primary data-[state=active]:md:animate-fade-up">{feature.uppercaseTitle}</strong>
                                                </div>
                                                <div className="text-3xl md:text-[48px] data-[state=active]:md:animate-fade-up" style={{ animationDelay: '0.25s' }}>
                                                    <h4 className="font-semibold text-cleat-dark leading-tight md:leading-normal">
                                                        {feature.headingMain}
                                                        <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">{feature.headingGradient}</span>
                                                    </h4>
                                                </div>
                                            </div>
                                            {/* ===== END UNIFIED HEADER ===== */}

                                            <div className="mt-4 text-base leading-relaxed text-slate-600">
                                                <div className="mb-4 text-slate-600 data-[state=active]:md:animate-fade-up" style={{ animationDelay: '0.5s' }}>{feature.description}</div>
                                                <div className="space-y-3">
                                                    {feature.details.map((detail, i) => (
                                                        <div key={i} className="flex items-start text-left gap-3 data-[state=active]:md:animate-fade-up" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                                                            <CheckIcon className="h-3.5 w-3.5 flex-shrink-0 text-status-success mt-1" />
                                                            <span className="text-slate-600">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-6 flex justify-center md:justify-start">
                                                <button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap shrink-0 inline-flex items-center gap-1 rounded-full border border-primary text-sm font-bold text-primary transition hover:scale-105 h-9 px-4 py-2 data-[state=active]:md:animate-fade-up" style={{ animationDelay: '0.85s' }}>
                                                    Saber Más <ArrowRightIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Image content div */}
                                    <div className={`
                                        flex h-auto flex-col
                                        ${
                                            isVerticalLayout
                                            ? 'md:w-1/2 md:self-stretch' // Vertical layout gets 50% width and stretches
                                            : (isFullBleed 
                                                ? 'px-6 md:px-0 md:col-start-2' // Horizontal full-bleed styling
                                                : 'px-6 md:px-0 md:h-full md:w-1/2' // Horizontal contained styling
                                            )
                                        }
                                    `}>
                                        {/* Mobile header was here, now removed */}
                                        <div className={`
                                            block w-full overflow-hidden aspect-video md:aspect-auto
                                            ${isFullBleed && isVerticalLayout
                                                ? 'md:h-full'
                                                : (isFullBleed ? 'md:h-full' : 'relative md:h-full')
                                            }
                                        `}>
                                            <div className={`relative h-full data-[state=active]:md:animate-slide-in bg-slate-200 ${imageRoundingClass}`}>
                                                <img 
                                                  key={feature.image}
                                                  alt={feature.title} 
                                                  loading="lazy" 
                                                  decoding="async" 
                                                  onLoad={() => handleImageLoad(index)}
                                                  className={`
                                                      h-full w-full object-cover shadow-xl transition-all duration-700 ease-in-out
                                                      ${loadedImages[index] ? 'blur-0 scale-100' : 'blur-md scale-105'}
                                                      ${imageRoundingClass}
                                                  `}
                                                  src={feature.image} 
                                                  style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
             <style>{`
                .highlight-word {
                    position: relative;
                    z-index: 1;
                    white-space: nowrap;
                }
                .highlight-word::before {
                    content: '';
                    position: absolute;
                    inset: -0.35em -0.4em;
                    z-index: -1;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.8s ease-out;
                    border-radius: 0.3rem;
                }
                .is-visible .highlight-word::before {
                    transform: scaleX(1);
                }
                .highlight-crea::before { background-color: var(--color-accent-primary); opacity: 0.4; }
                .highlight-optimiza::before { background-color: var(--color-accent-secondary); opacity: 0.4; }
                .highlight-acelera::before { background-color: var(--color-primary); opacity: 0.3; }

                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-in-from-left {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0px); opacity: 1; }
                }
                .data-\\[state\\=active\\]\\:md\\:animate-fade-up { 
                    animation-name: fade-up; 
                    animation-duration: 0.6s; 
                    animation-timing-function: ease-out;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                .data-\\[state\\=active\\]\\:md\\:animate-slide-in { 
                    animation-name: slide-in-from-left; 
                    animation-duration: 0.75s;
                    animation-timing-function: ease-out;
                }
            `}</style>
        </section>
        {isModalOpen && activeFeature && (
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={activeFeature.title}
            >
                <div className="space-y-4 prose prose-slate max-w-none">
                    <h3 className="text-2xl font-bold">
                        {activeFeature.headingMain}
                        <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">{activeFeature.headingGradient}</span>
                    </h3>
                    <p>{activeFeature.description}</p>
                    {activeFeature.details && (
                        <ul className="!mt-4 !space-y-2">
                            {activeFeature.details.map((point, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-status-success !mt-1" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Modal>
        )}
        </>
    );
};

export default FeaturesTabs;