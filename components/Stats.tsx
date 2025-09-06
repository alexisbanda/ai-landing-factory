import React, { useState, useEffect, useRef } from 'react';

const StatItemComponent: React.FC<{ value: number; label: string; suffix?: string; }> = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const end = value;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const counter = () => {
            start += increment;
            if (start < end) {
              setCount(Math.ceil(start));
              requestAnimationFrame(counter);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(counter);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="z-10 col-span-1 flex flex-col items-center gap-2 p-4">
      <p className="text-3xl font-bold text-slate-800 md:text-4xl xl:text-5xl">
        {count.toLocaleString()}{suffix}
      </p>
      <div className="relative max-w-[250px] text-center text-sm">
        <p className="inline">{label}</p>
      </div>
    </div>
  );
};

const StatItem = React.memo(StatItemComponent);

const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--x', `${x}px`);
    containerRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <section 
      className="container relative flex flex-col items-center gap-14 mx-auto px-4"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
       <div className="text-center">
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 mb-4">
            <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">Resultados que Hablan</span> por Sí Mismos
        </h2>
        <h3 className="text-lg text-gray-600 max-w-3xl mx-auto">
          Nuestra plataforma permite a empresas de todos los tamaños lograr resultados increíbles.
        </h3>
    </div>
      <div className="relative grid w-full max-w-6xl grid-cols-1 gap-y-10 rounded-2xl border border-slate-200 py-16 shadow-xl sm:grid-cols-2 lg:grid-cols-3 lg:py-20 bg-white overflow-hidden">
        <div 
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(600px circle at var(--x) var(--y), rgba(59, 130, 246, 0.1), transparent 40%)'
          }}
        ></div>
        <StatItem value={12500} label="Páginas de aterrizaje generadas por nuestra IA este mes" />
        <div className="hidden lg:block absolute left-1/3 top-1/2 -translate-y-1/2 h-2/3 w-px bg-slate-200"></div>
        <StatItem value={320} suffix="%" label="Aumento promedio de conversión para nuestros clientes" />
        <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-y-1/2 h-2/3 w-px bg-slate-200 lg:hidden"></div>
        <div className="hidden lg:block absolute left-2/3 top-1/2 -translate-y-1/2 h-2/3 w-px bg-slate-200"></div>
        <StatItem value={95} suffix="%" label="Reducción en el tiempo de lanzamiento de nuevas campañas" />
      </div>
    </section>
  );
};

export default Stats;