import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon, FileTextIcon, GavelIcon, HeartHandshakeIcon, TrophyIcon, PlayIcon, PauseIcon, FileSearchIcon, ArrowLeftRightIcon } from '../icons/Icons';
import { steps as allSteps } from '../../data/howItWorksData';
import { TypingPromptDisplay } from './displays/TypingPromptDisplay';
import { VideoDisplay } from './displays/VideoDisplay';
import { UiEditorDisplay } from './displays/UiEditorDisplay';
import { IntegrationLogosDisplay } from './displays/IntegrationLogosDisplay';
import { LaunchDashboardDisplay } from './displays/LaunchDashboardDisplay';
import { DefaultIconDisplay, iconComponents } from './displays/DefaultIconDisplay';
import { OptimizeDisplay } from './displays/OptimizeDisplay';
import { BrandScannerDisplay } from './displays/BrandScannerDisplay';
import { ImageGenerationDisplay } from './displays/ImageGenerationDisplay';


// =================================================================
// CONFIGURATION VARIABLES
// =================================================================
const config = {
  autoplay: true,
  showProgressBar: true,
  useGradientBackground: true,
  useAnimations: true,
  showNavButtons: true,
  showPausePlayButton: true,
  enableMobileSwipe: true,
};
// =================================================================

const AUTOPLAY_DURATION = 8000; // Increased to 8 seconds for the new animation

const animClass = (className: string) => config.useAnimations ? className : '';

// =================================================================
// MAIN COMPONENTS
// =================================================================

const InactiveStepComponent = ({ step, index, onClick }: { step: typeof allSteps[0], index: number, onClick: () => void }) => {
    const IconComponent = iconComponents[step.icon as keyof typeof iconComponents];
    return (
    <div
        className="group relative flex max-w-[88vw] cursor-pointer flex-col gap-3 rounded-lg px-3 transition-all duration-300 xl:hover:scale-105"
        style={{ height: '120px' }}
        onClick={onClick}
    >
        <div className="absolute left-1/2 -translate-x-1/2 top-0 z-[11] grid aspect-square w-8 -translate-y-1/2 place-items-center rounded-full border border-cleat-dark bg-white">
            <span className="text-sm font-semibold text-cleat-dark">{index + 1}</span>
        </div>
        <div className="relative grid flex-1 place-items-center">
            <div className={`z-10 grid aspect-square w-[100px] place-items-center rounded-3xl border transition-all duration-300 group-hover:shadow-lg ${step.colors.bg} ${step.colors.border} ${step.colors.text}`}>
                {IconComponent && <IconComponent className="h-10 w-10" />}
            </div>
        </div>
        <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center text-xl font-semibold text-slate-700 hidden xl:block">
            {step.title}
        </p>
    </div>
)};

const InactiveStep = React.memo(InactiveStepComponent);

const ActiveStep = ({ step, index, onNavigate, onMouseEnter, onMouseLeave, isPaused, togglePause, onTouchStart, onTouchEnd }: { 
    step: (typeof allSteps)[0], 
    index: number, 
    onNavigate: (dir: number) => void,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    isPaused: boolean,
    togglePause: () => void,
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void,
    onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void
}) => {
    const renderDisplay = () => {
        switch(step.displayType) {
            case 'typing-prompt':
                return <TypingPromptDisplay data={step.displayData} />;
            case 'video':
                return <VideoDisplay data={step.displayData} animClass={animClass} />;
            case 'ui-editor':
                return <UiEditorDisplay animClass={animClass} />;
            case 'integration-logos':
                return <IntegrationLogosDisplay data={step.displayData} step={step} animClass={animClass} />;
            case 'launch-dashboard':
                return <LaunchDashboardDisplay data={step.displayData} animClass={animClass} />;
            case 'ab-testing':
                return <OptimizeDisplay animClass={animClass} />;
            case 'brand-scanner':
                return <BrandScannerDisplay animClass={animClass} />;
            case 'image-generation':
                return <ImageGenerationDisplay animClass={animClass} />;
            default:
                return <DefaultIconDisplay step={step} animClass={animClass} />;
        }
    };
    
    return (
        <div 
            className={`relative flex max-w-md flex-col gap-3 rounded-lg border border-slate-200 p-6 shadow-xl transition-all duration-300 ${config.useGradientBackground ? `bg-gradient-to-br from-white ${step.gradient}` : 'bg-white'} ${animClass('animate-card-pop-in')}`} 
            style={{ height: '540px' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className="absolute left-7 top-0 z-[11] grid aspect-square w-10 -translate-y-1/2 place-items-center rounded-full border border-primary bg-white">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
            </div>
            <div className="relative grid flex-1 place-items-center">
                {renderDisplay()}
                {config.autoplay && config.showPausePlayButton && (
                    <button
                        onClick={togglePause}
                        aria-label={isPaused ? "Reanudar animación" : "Pausar animación"}
                        className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/50 text-slate-700 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/80"
                    >
                        {isPaused ? <PlayIcon className="h-5 w-5 ml-0.5" /> : <PauseIcon className="h-5 w-5" />}
                    </button>
                )}
            </div>
            <div className="flex flex-col items-start gap-3.5 text-left h-48">
                <p className={`text-2xl font-semibold text-slate-800 ${animClass('animate-fade-in-up')}`} style={{ animationDelay: '100ms' }}>{step.title}</p>
                <p className={`text-base tracking-tight text-gray-600 ${animClass('animate-fade-in-up')}`} style={{ animationDelay: '200ms' }}>{step.description}</p>
                {config.showNavButtons && (
                  <div className={`flex w-full justify-between mt-auto ${animClass('animate-fade-in-up')}`} style={{ animationDelay: '300ms' }}>
                      <button onClick={() => onNavigate(-1)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-10 rounded-md px-6 text-slate-600 border bg-white shadow-xs hover:bg-gray-50">
                          <ArrowLeftIcon /><span>Ant</span>
                      </button>
                      <button onClick={() => onNavigate(1)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-10 rounded-md px-6 bg-primary text-white shadow-xs hover:bg-opacity-90">
                          <span>Sig</span><ArrowRightIcon />
                      </button>
                  </div>
                )}
            </div>
            {config.autoplay && config.showProgressBar && (
                <div className="absolute bottom-0 left-0 right-0 h-2.5 px-6 pb-2">
                    <div className="w-full bg-slate-200 rounded-full h-1">
                        <div 
                            key={index} // Force re-render and restart animation on step change
                            className={`bg-primary h-1 rounded-full ${isPaused ? '' : animClass('animate-progress-bar-fill')}`}
                            style={{ 
                                animationPlayState: isPaused ? 'paused' : 'running',
                                animationDuration: `${AUTOPLAY_DURATION}ms`
                            }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

const HowItWorks: React.FC = () => {
    // Filter the steps based on the 'enabled' flag from the data file.
    const steps = allSteps.filter(step => step.enabled);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);
    const [isHoverPaused, setIsHoverPaused] = useState(false);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const timerRef = useRef<number | null>(null);

    const isPaused = isManuallyPaused || isHoverPaused;

    const advanceStep = useCallback(() => {
        if (steps.length > 0) {
            setActiveIndex(prev => (prev + 1) % steps.length);
        }
    }, [steps.length]);

    useEffect(() => {
      if (timerRef.current) {
          clearTimeout(timerRef.current);
      }
      if (config.autoplay && !isPaused && steps.length > 1) {
          timerRef.current = window.setTimeout(advanceStep, AUTOPLAY_DURATION);
      }
      return () => {
          if (timerRef.current) {
              clearTimeout(timerRef.current);
          }
      };
    }, [activeIndex, isPaused, advanceStep, steps.length]);
    
    const handleNavigation = (direction: number) => {
        if (steps.length === 0) return;
        setActiveIndex(prev => {
            const newIndex = (prev + direction + steps.length) % steps.length;
            return newIndex;
        });
        setIsManuallyPaused(true);
    };
    
    const selectStep = (index: number) => {
        setActiveIndex(index);
        setIsManuallyPaused(true);
    }
    
    const handleMouseEnter = () => {
        if (config.autoplay) setIsHoverPaused(true);
    };
    
    const handleMouseLeave = () => {
        if (config.autoplay) setIsHoverPaused(false);
    };

    const togglePause = () => {
        setIsManuallyPaused(prev => !prev);
    }
    
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!config.enableMobileSwipe) return;
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX === null || !config.enableMobileSwipe) return;

        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) { // 50px swipe threshold
            if (diff > 0) {
                // Swiped left
                handleNavigation(1);
            } else {
                // Swiped right
                handleNavigation(-1);
            }
        }
        setTouchStartX(null);
    };
    
    if (steps.length === 0) {
        return null; // Don't render the component if no steps are enabled
    }

  return (
    <>
    <section id="how-it-works" className="relative container mx-auto px-4 py-8 overflow-hidden">
      {/* Immersive Background Layers */}
      <div className="absolute inset-0 z-[-1]">
        {steps.map((step, index) => (
            <div
                key={index}
                className={`absolute inset-0 bg-gradient-to-br from-white ${step.gradient} transition-opacity duration-1000 ease-in-out ${activeIndex === index ? 'opacity-30' : 'opacity-0'}`}
                aria-hidden="true"
            />
        ))}
      </div>
      
      <div className="relative z-10">
          <div className="mx-auto text-center">
              <h2 className="md:w-4/ mx-auto mb-2 text-2xl font-bold text-slate-800 md:mb-3 md:text-4xl xl:mb-4 xl:text-5xl">
                  <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">Lanza tu próxima landing en minutos</span>
              </h2>
              <h3 className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[75%] text-gray-600">Un flujo optimizado que combina IA y estrategia humana para pasar de la idea a una página lista para convertir.</h3>
          </div>
          <div className="mb-12 mt-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-3 shadow-sm">
                <SparklesIcon className="h-4 w-4 text-theme-accent-primary" />
                <span className="text-sm font-semibold text-slate-700">
                    Potenciado por{' '}
                    <span className="bg-gradient-to-r from-theme-accent-secondary to-theme-accent-primary bg-clip-text text-transparent">IA</span>
                </span>
            </div>
          </div>
    
          {/* Mobile Step Indicator */}
          <div className="mb-8 flex justify-center xl:hidden" aria-hidden="true">
              <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                      <div
                          key={index}
                          className={`h-2 rounded-full transition-all duration-300 ${
                              activeIndex === index ? 'w-6 bg-primary' : 'w-2 bg-slate-300'
                          }`}
                      />
                  ))}
              </div>
          </div>

          {/* Mobile Carousel View */}
          <div className="flex flex-col items-center justify-center xl:hidden">
              <ActiveStep 
                  step={steps[activeIndex]} 
                  index={activeIndex} 
                  onNavigate={handleNavigation}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  isPaused={isPaused}
                  togglePause={togglePause}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
              />
          </div>
  
          {/* Desktop Steps View */}
          <div className="hidden xl:flex flex-row items-center justify-between h-[540px] w-full">
              {steps.map((step, index) => (
                  <React.Fragment key={step.title}>
                      {index === activeIndex ? (
                          <div key={activeIndex}>
                              <ActiveStep 
                                  step={step} 
                                  index={index} 
                                  onNavigate={handleNavigation}
                                  onMouseEnter={handleMouseEnter}
                                  onMouseLeave={handleMouseLeave}
                                  isPaused={isPaused}
                                  togglePause={togglePause}
                                  onTouchStart={handleTouchStart}
                                  onTouchEnd={handleTouchEnd}
                              />
                          </div>
                      ) : (
                          <InactiveStep step={step} index={index} onClick={() => selectStep(index)} />
                      )}
                      
                      {index < steps.length - 1 && (
                          <div className="w-auto flex-1 h-0.5 bg-slate-200" />
                      )}
                  </React.Fragment>
              ))}
          </div>
      </div>
    </section>
     <style>{`
        /* Core Animations */
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

        @keyframes icon-pop {
            0% { opacity: 0; transform: scale(0.7) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-icon-pop { animation: icon-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; opacity: 0; }
        
        @keyframes card-pop-in {
            0% { transform: scale(0.95) translateY(10px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-card-pop-in {
            animation: card-pop-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes progress-bar-fill { from { width: 0%; } to { width: 100%; } }
        .animate-progress-bar-fill { animation-name: progress-bar-fill; animation-timing-function: linear; animation-fill-mode: forwards; }

        /* Step-Specific Animations */
        @keyframes blink { 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; }
        
        @keyframes logo-pop-in {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-logo-pop-in { animation: logo-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }

        @keyframes draw-line {
            to { stroke-dashoffset: 0; }
        }
        .animate-draw-line { animation: draw-line 0.5s ease-out forwards; }

        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 10px 0px transparent; }
            50% { box-shadow: 0 0 20px 8px rgba(139, 92, 246, 0.2); }
        }
        .animate-pulse-glow { animation: pulse-glow 3s infinite ease-in-out; }

        @keyframes draw-svg-path {
            to { stroke-dashoffset: 0; }
        }
        .animate-draw-svg-path {
            animation: draw-svg-path 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes animated-circle {
            to { stroke-dashoffset: var(--target-dash-offset); }
        }
        .animate-circle-progress {
            animation: animated-circle 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        /* Customize/UiEditorDisplay Animations */
        @keyframes customize-cursor {
            0%, 100% { top: 50%; left: 90%; }
            10% { top: 10%; left: 60%; transform: scale(1); }
            15% { transform: scale(0.9); }
            35% { top: 10%; left: 20%; transform: scale(0.9); }
            40% { transform: scale(1); }
            55% { top: 75%; left: 30%; }
            70% { top: 75%; left: 48%; }
            75% { transform: scale(0.9); }
            80% { transform: scale(1); }
        }
        .animate-customize-cursor { animation: customize-cursor 8s infinite cubic-bezier(0.65, 0, 0.35, 1); }

        @keyframes customize-image {
            0%, 10%, 100% { left: 50%; transform: translateX(-50%) scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            15% { transform: translateX(-50%) scale(1.03) translateY(-2px); box-shadow: 0 10px 15px rgba(0,0,0,0.15); }
            35% { left: 15%; transform: translateX(0) scale(1.03) translateY(-2px); box-shadow: 0 10px 15px rgba(0,0,0,0.15); }
            40% { left: 15%; transform: translateX(0) scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        }
        .animate-customize-image { animation: customize-image 8s infinite cubic-bezier(0.65, 0, 0.35, 1); }

        @keyframes customize-palette {
            0%, 58%, 84%, 100% { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }
            62%, 80% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-customize-palette { animation: customize-palette 8s infinite ease-in-out; }

        @keyframes customize-button {
            0%, 72% { background-color: var(--color-primary); }
            78%, 100% { background-color: var(--color-accent-secondary); }
        }
        .animate-customize-button { animation: customize-button 8s infinite ease-in-out; }

        /* OptimizeDisplay (A/B Test) Animations */
        @keyframes optimize-card-a {
            0%, 10% { left: 50%; transform: translate(-50%, -50%); opacity: 1; }
            20% { left: 2.5%; transform: translate(0, -50%); opacity: 1; }
            80% { opacity: 1; }
            90%, 100% { opacity: 0; transform: translate(-20px, -50%); }
        }
        .animate-optimize-card-a { animation: optimize-card-a 8s infinite ease-in-out; }

        @keyframes optimize-card-b {
            0%, 10% { left: 50%; transform: translate(-50%, -50%); }
            20% { left: 52.5%; transform: translate(0, -50%); }
            90% { left: 52.5%; transform: translate(0, -50%); }
            100% { left: 50%; transform: translate(-50%, -50%); }
        }
        .animate-optimize-card-b { animation: optimize-card-b 8s infinite ease-in-out; }

        @keyframes optimize-counter-a {
            0%, 25% { content: "12.4%"; } 50% { content: "12.9%"; } 75%, 100% { content: "13.2%"; }
        }
        .animate-optimize-counter-a::before { content: "12.4%"; animation: optimize-counter-a 8s infinite ease-in-out; }

        @keyframes optimize-counter-b {
            0%, 25% { content: "18.2%"; } 50% { content: "21.6%"; } 75%, 100% { content: "24.1%"; }
        }
        .animate-optimize-counter-b::before { content: "18.2%"; animation: optimize-counter-b 8s infinite ease-in-out; }
        
        @keyframes optimize-button-b { 0%, 15% { background-color: var(--color-primary); } 20%, 100% { background-color: var(--color-accent-secondary); } }
        .animate-optimize-button-b { animation: optimize-button-b 8s infinite ease-in-out; }
        
        @keyframes optimize-scale {
            0%, 20%, 90%, 100% { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }
            25%, 85% { opacity: 1; transform: translate(-50%, 0) scale(1) rotate(0deg); }
            50% { transform: translate(-50%, 0) scale(1) rotate(15deg); }
        }
        .animate-optimize-scale { animation: optimize-scale 8s infinite ease-in-out; }

        @keyframes optimize-crown {
            0%, 95% { opacity: 0; transform: translate(-50%, 10px) scale(0); }
            100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-optimize-crown { animation: optimize-crown 8s infinite ease-in-out; }

        /* BrandScannerDisplay Animations */
        @keyframes brand-scan-line {
            0% { left: 0%; } 40% { left: 100%; } 100% { left: 100%; }
        }
        .animate-brand-scan-line { animation: brand-scan-line 8s infinite ease-out; }

        @keyframes brand-typing-effect {
            0% { content: ""; } 5% { content: "w"; } 10% { content: "ww.mi"; } 15% { content: "www.miem"; } 20% { content: "www.miempresa"; } 25% { content: "www.miempresa.com"; } 100% { content: "www.miempresa.com"; }
        }
        .animate-brand-typing::before { content: ""; animation: brand-typing-effect 8s infinite ease-in-out; }

        @keyframes brand-palette-pop { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        .animate-brand-palette-pop { animation: brand-palette-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        
        /* ImageGenerationDisplay Animations */
        @keyframes image-gen-noise {
            0%, 40% { opacity: 1; } 60%, 100% { opacity: 0; }
            0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); }
        }
        .animate-image-gen-noise { animation: image-gen-noise 8s infinite ease-in-out; }

        @keyframes image-gen-resolve {
            0%, 50% { opacity: 0; transform: scale(1.2); }
            65%, 100% { opacity: 1; transform: scale(1); }
        }
        .animate-image-gen-resolve { animation: image-gen-resolve 8s infinite ease-in-out; }
      `}</style>
      </>
  );
};

export default HowItWorks;