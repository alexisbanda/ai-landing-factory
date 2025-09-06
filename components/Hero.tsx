

import React, { useRef, useEffect } from 'react';
import { ZapIcon, SparklesIcon, FileSearchIcon } from './icons/Icons';
import { useLanguage } from '../contexts/LanguageContext';

// =================================================================
// HERO SECTION CONFIGURATION
// =================================================================
const heroConfig = {
  theme: 'dark' as 'dark' | 'light', // THEME SWITCH: 'dark' or 'light'
  showInteractiveBackground: true,
  
  // NEW: Background Image Configuration
  showBackgroundImage: true, // Master switch for the background image
  backgroundImage: {
    url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2942&auto=format&fit=crop', // A nice abstract dark background
    // Tailwind classes for styling the image
    blur: 'blur-sm',       // e.g., 'blur-none', 'blur-sm', 'blur-md'
    brightness: 'brightness-50', // e.g., 'brightness-50', 'brightness-75'
    opacity: 'opacity-80'    // e.g., 'opacity-30', 'opacity-50'
  },
  
  showDescription: true,
  showCtaButtons: true,
  showSocialProof: true,
  showKeyFeaturesGrid: true,
};
// =================================================================

interface HeroProps {
  onOpenDemoModal: () => void;
  onOpenSignUpModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenDemoModal, onOpenSignUpModal }) => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const isDark = heroConfig.theme === 'dark';

    const techStack = [
        { name: 'React', light: 'https://cdn.simpleicons.org/react/61DAFB', dark: 'https://cdn.simpleicons.org/react/FFFFFF' },
        { name: 'Python', light: 'https://cdn.simpleicons.org/python/3776AB', dark: 'https://cdn.simpleicons.org/python/FFFFFF' },
        { name: 'Google Gemini', light: 'https://cdn.simpleicons.org/googlegemini/8E76D3', dark: 'https://cdn.simpleicons.org/googlegemini/FFFFFF' },
        { name: 'JavaScript', light: 'https://cdn.simpleicons.org/javascript/F7DF1E', dark: 'https://cdn.simpleicons.org/javascript/FFFFFF' },
        { name: 'PHP', light: 'https://cdn.simpleicons.org/php/777BB4', dark: 'https://cdn.simpleicons.org/php/FFFFFF' },
        { name: 'Node.js', light: 'https://cdn.simpleicons.org/nodedotjs/339933', dark: 'https://cdn.simpleicons.org/nodedotjs/FFFFFF' },
        { name: 'TypeScript', light: 'https://cdn.simpleicons.org/typescript/3178C6', dark: 'https://cdn.simpleicons.org/typescript/FFFFFF' },
        { name: 'Vercel', light: 'https://cdn.simpleicons.org/vercel/000000', dark: 'https://cdn.simpleicons.org/vercel/FFFFFF' },
        { name: 'Amazon AWS', light: 'https://cdn.simpleicons.org/amazonaws/232F3E', dark: 'https://cdn.simpleicons.org/amazonaws/FFFFFF' },
    ];

    const keyFeatures = [
        {
            icon: <SparklesIcon />,
            title: "Contenido Impulsado por IA",
            description: "Genera textos de alta conversión en segundos, adaptados a tu audiencia."
        },
        {
            icon: <ZapIcon />,
            title: "Despliegue Rápido",
            description: "Pasa de la idea a una página activa y optimizada en minutos, no en semanas."
        },
        {
            icon: <FileSearchIcon />,
            title: "Optimización Continua",
            description: "Usa pruebas A/B y analíticas integradas para maximizar tus resultados."
        }
    ];

    useEffect(() => {
        if (!heroConfig.showInteractiveBackground || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function hexToRgba(hex: string, alpha: number): string {
            if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                return `rgba(0,0,0,${alpha})`; // fallback for invalid hex
            }
            let c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            const num = parseInt(c.join(''), 16);
            return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
        }

        const mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };
        canvas.addEventListener('mousemove', handleMouseMove);
        
        const handleMouseLeave = () => {
             mouse.x = -1000;
             mouse.y = -1000;
        };
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
        const accentSecondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-secondary').trim();
        const cleatDarkColor = getComputedStyle(document.documentElement).getPropertyValue('--color-cleat-dark').trim();

        class Particle {
            x: number; y: number; size: number; speedX: number; speedY: number; color: string; baseSize: number;

            constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
                this.x = x; this.y = y; this.size = size; this.baseSize = size; this.speedX = speedX; this.speedY = speedY; this.color = color;
            }

            update() {
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
                this.x += this.speedX; this.y += this.speedY;

                const dx = mouse.x - this.x; const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const forceDirectionX = dx / distance; const forceDirectionY = dy / distance;
                    const force = (100 - distance) / 100;
                    this.x -= forceDirectionX * force * 2; this.y -= forceDirectionY * force * 2;
                }
                this.size = this.baseSize + Math.sin(Date.now() * 0.001 + this.x) * 0.5;
            }

            draw() {
                ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
            }
        }

        let particlesArray: Particle[] = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);

        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 2 + 1;
                const x = Math.random() * canvas.width; const y = Math.random() * canvas.height;
                const speedX = (Math.random() - 0.5) * 0.5; const speedY = (Math.random() - 0.5) * 0.5;
                const color = Math.random() > 0.3 ? primaryColor : accentSecondaryColor;
                particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
            }
        }

        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : hexToRgba(cleatDarkColor, 0.1);
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const particle of particlesArray) {
                particle.update(); particle.draw();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        }

        init(); animate();

        const handleResize = () => {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight; init();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);


  return (
    <section className={`relative w-full overflow-hidden py-16 md:py-20 text-center ${isDark ? 'bg-cleat-dark' : 'bg-neutral-50'}`}>
      {heroConfig.showBackgroundImage && heroConfig.backgroundImage.url && (
        <div 
          className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-500 ${heroConfig.backgroundImage.blur} ${heroConfig.backgroundImage.brightness} ${heroConfig.backgroundImage.opacity}`}
          style={{
            backgroundImage: `url(${heroConfig.backgroundImage.url})`,
          }}
          aria-hidden="true"
        />
      )}
      {heroConfig.showInteractiveBackground && (
        <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />
      )}
      
      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <h1 
          className={`mb-9 text-4xl font-bold tracking-tight md:text-6xl animate-fade-in-up ${isDark ? 'text-neutral-50' : 'text-cleat-dark'}`}
          style={{ animationDelay: '100ms' }}
        >
          <span dangerouslySetInnerHTML={{ __html: t('hero.title_part1') }} />
          <span className="bg-gradient-to-r from-theme-accent-primary to-theme-accent-secondary bg-clip-text text-transparent">
            {t('hero.title_part2')}
          </span>
          <span className="relative inline-block ml-2">
            <span>{t('hero.title_part3')}</span>
            <svg
              className="absolute left-0 top-[calc(100%-8px)] w-full h-auto"
              viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none" aria-hidden="true"
            >
              <defs>
                <linearGradient id="underline-gradient-hero" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="var(--color-accent-primary)" />
                  <stop offset="100%" stopColor="var(--color-accent-secondary)" />
                </linearGradient>
              </defs>
              <path
                d="M2 8 C 30 20, 70 20, 98 8" stroke="url(#underline-gradient-hero)" strokeWidth="3"
                strokeLinecap="round" pathLength="100" className="animate-draw-underline"
              />
            </svg>
          </span>
        </h1>
        
        {heroConfig.showDescription && (
            <p 
              className={`text-lg mb-8 max-w-3xl mx-auto animate-fade-in-up ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}
              id="main-description" style={{ animationDelay: '250ms' }}
            >
              {t('hero.description_part1')}
              <span className={`font-extrabold ${isDark ? 'text-neutral-100' : 'text-cleat-dark'}`}>VANLANDINGS</span>
              {t('hero.description_part2')}
            </p>
        )}
        
        {heroConfig.showCtaButtons && (
            <div 
              className="mb-12 flex flex-col sm:flex-row flex-nowrap justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <button onClick={onOpenSignUpModal} className="group w-full sm:w-auto relative overflow-hidden rounded-full px-8 py-3 text-base font-semibold text-cleat-dark shadow-lg transition-all duration-300 hover:shadow-xl bg-gradient-to-r from-theme-accent-primary to-theme-accent-secondary transform hover:scale-105">
                {t('hero.cta_free')}
                <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-in-out group-hover:left-[100%]" />
              </button>
              <button onClick={onOpenDemoModal} className={`w-full sm:w-auto relative flex items-center justify-center rounded-full border-2 px-8 py-3 text-base font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] ${isDark ? 'border-neutral-200 bg-cleat-dark/50 text-neutral-100 hover:bg-neutral-100 hover:text-cleat-dark' : 'border-cleat-dark bg-transparent text-cleat-dark hover:bg-cleat-dark hover:text-white'}`}>
                {t('hero.cta_demo')}
              </button>
            </div>
        )}

        {heroConfig.showKeyFeaturesGrid && (
            <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '550ms' }}>
                {keyFeatures.map((feature, index) => (
                     <div key={index} className={`flex flex-col items-center gap-3 text-center p-6 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-cleat-dark/5 border-cleat-dark/10 hover:bg-cleat-dark/10'}`}>
                        <div className="text-theme-accent-primary">{React.cloneElement(feature.icon, { className: 'h-8 w-8' })}</div>
                        <h3 className={`font-semibold text-lg ${isDark ? 'text-neutral-100' : 'text-cleat-dark'}`}>{feature.title}</h3>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>{feature.description}</p>
                    </div>
                ))}
            </div>
        )}

        {heroConfig.showSocialProof && (
          <div
            className="flex flex-col items-center gap-6 animate-fade-in-up"
            style={{ animationDelay: '700ms' }}
          >
            <p className={`text-sm font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {t('hero.social_proof_title')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              {techStack.map((tech) => (
                <img
                  key={tech.name}
                  src={isDark ? tech.dark : tech.light}
                  alt={`${tech.name} logo`}
                  className="h-8 w-auto object-contain transition-opacity duration-300 opacity-70 hover:opacity-100"
                  title={tech.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        #root {
            background-color: ${isDark ? '#292524' /* stone-800 */ : '#FAFAF9' /* stone-50 */};
        }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 40s linear infinite; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation-name: fade-in-up; animation-duration: 0.6s; animation-timing-function: ease-out; animation-fill-mode: forwards; opacity: 0; }
        @keyframes draw-underline { to { stroke-dashoffset: 0; } }
        .animate-draw-underline { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw-underline 0.8s ease-out forwards; animation-delay: 500ms; }
      `}</style>
    </section>
  );
};

export default Hero;