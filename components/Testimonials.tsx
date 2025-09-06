import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Testimonial } from '../types';

const testimonialsData: Testimonial[] = [
  {
    image: "https://picsum.photos/seed/face1/48/48",
    name: "Sarah Jennings",
    company: "GrowthMarketers Inc.",
    quote: "Con VANLANDINGS, lanzamos una nueva página de campaña en menos de una hora. Lo que antes le tomaba a nuestro equipo una semana, ahora toma minutos. El rendimiento es increíble.",
    designation: "Directora de Marketing"
  },
  {
    image: "https://picsum.photos/seed/face2/48/48",
    name: "Mike Chen",
    company: "SaaS Launchpad",
    quote: "Esta herramienta cambia las reglas del juego para las startups. Ahora podemos probar nuevas ideas y mensajes a la velocidad de la luz sin sobrecargar a nuestro equipo de desarrollo. Es esencial.",
    designation: "Fundador y CEO"
  },
  {
    image: "https://picsum.photos/seed/face3/48/48",
    name: "Emily Carter",
    company: "E-Commerce Experts",
    quote: "Era escéptico sobre el contenido generado por IA, pero VANLANDINGS me demostró que estaba equivocado. El texto es ingenioso, fiel a la marca, y nuestra tasa de conversión literalmente se ha duplicado desde que cambiamos.",
    designation: "Gerente de E-commerce"
  },
  {
    image: "https://picsum.photos/seed/face4/48/48",
    name: "David Rodriguez",
    company: "Digital Agency Pro",
    quote: "Como agencia, VANLANDINGS nos permite entregar páginas de aterrizaje impresionantes y de alto rendimiento para nuestros clientes a una fracción del costo y tiempo. Es nuestra nueva arma secreta.",
    designation: "Dueño de Agencia"
  },
];

const AUTOPLAY_DURATION = 8000; // 8 seconds

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const advanceSlide = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % testimonialsData.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = window.setTimeout(advanceSlide, AUTOPLAY_DURATION);
      
      // Animation reset for progress bar
      if (progressRef.current) {
        progressRef.current.classList.remove('animate-progress');
        void progressRef.current.offsetWidth; // Trigger reflow
        progressRef.current.classList.add('animate-progress');
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeIndex, isPaused, advanceSlide]);

  const handleSelectTestimonial = (index: number) => {
    setActiveIndex(index);
    // When user manually selects, pause for a bit to let them read
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), AUTOPLAY_DURATION * 2);
  };

  const currentTestimonial = testimonialsData[activeIndex];

  return (
    <>
    <section 
      id="testimonials" 
      className="container mx-auto px-4 py-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-center mb-12">
         <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 mb-4">
            Lo que <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">Nuestros Clientes</span> Dicen
        </h2>
        <h3 className="text-lg text-gray-600 max-w-3xl mx-auto">
            Historias reales de negocios transformados por VANLANDINGS.
        </h3>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-12 items-center max-w-6xl mx-auto">
        {/* Featured Testimonial */}
        <div className="relative lg:col-span-3 w-full p-8 rounded-xl bg-slate-50 border border-slate-200/80 min-h-[320px] flex flex-col justify-between">
          <div>
            <svg className="absolute top-6 left-6 h-12 w-12 text-slate-200/80" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L25.864 4z" />
            </svg>
            <p key={activeIndex} className="relative text-xl text-slate-700 leading-relaxed animate-fade-in-up">
              "{currentTestimonial.quote}"
            </p>
          </div>
          <div className="mt-8">
             <div key={activeIndex + '-author'} className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <img src={currentTestimonial.image} alt={`${currentTestimonial.name} profile`} className="h-14 w-14 rounded-full object-cover shadow-md" loading="lazy" decoding="async" />
              <div>
                <p className="text-lg font-bold text-cleat-dark">{currentTestimonial.name}</p>
                <p className="text-base font-medium text-slate-500">{currentTestimonial.designation}, {currentTestimonial.company}</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-200/80 overflow-hidden rounded-b-xl">
             <div 
                ref={progressRef}
                key={activeIndex + '-progress'}
                className="h-full bg-primary animate-progress"
                style={{
                  animationPlayState: isPaused ? 'paused' : 'running',
                  animationDuration: `${AUTOPLAY_DURATION}ms`
                }}
             ></div>
          </div>
        </div>

        {/* Testimonial Selector List */}
        <div className="lg:col-span-2 w-full mt-8 lg:mt-0">
          <div className="flex flex-col gap-3">
            {testimonialsData.map((testimonial, index) => (
              <button
                key={testimonial.name}
                onClick={() => handleSelectTestimonial(index)}
                className={`relative w-full p-4 rounded-lg border text-left transition-all duration-300 ease-out
                ${activeIndex === index
                  ? 'bg-white shadow-lg border-primary scale-105'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:shadow-md hover:border-slate-300'
                }`}
                aria-pressed={activeIndex === index}
              >
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className={`h-12 w-12 rounded-full object-cover transition-transform duration-300 ${activeIndex === index ? 'scale-110' : 'scale-100'}`} loading="lazy" decoding="async" />
                  <div>
                    <p className="font-semibold text-cleat-dark">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.company}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
    <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
        }

        @keyframes progress-fill {
            from { width: 0%; }
            to { width: 100%; }
        }
        .animate-progress {
            animation: progress-fill linear forwards;
        }
    `}</style>
    </>
  );
};

export default Testimonials;