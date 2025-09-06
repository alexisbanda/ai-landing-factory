import React from 'react';

// Simplified icons for the display
const ScaleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 L 2 7 L 12 12 L 22 7 Z" />
        <path d="M12 12 V 22" />
        <path d="M4 12 L 2 22" />
        <path d="M20 12 L 22 22" />
        <path d="M3 10 L 21 10" />
    </svg>
);

const CrownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
    </svg>
);

interface OptimizeDisplayProps {
    animClass: (className: string) => string;
}

export const OptimizeDisplay: React.FC<OptimizeDisplayProps> = ({ animClass }) => {
    // This is a purely visual component. All animation is driven by CSS.
    // The keyframes are defined in HowItWorks.tsx.
    
    return (
        <div className={`relative w-full h-full bg-slate-100 rounded-2xl p-4 flex items-center justify-center shadow-inner overflow-hidden border border-slate-200 ${animClass('animate-fade-in')}`}>
            {/* Container for the two competing cards */}
            <div className="relative w-full h-full">
                {/* Card A */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-[45%] h-[70%] bg-white rounded-lg shadow-md border border-slate-200 p-2 flex flex-col gap-2 ${animClass('animate-optimize-card-a')}`}>
                    <div className="w-full h-1/3 bg-categorical-blue-light rounded"></div>
                    <div className="w-3/4 h-3 bg-slate-200 rounded"></div>
                    <div className="w-1/2 h-3 bg-slate-200 rounded"></div>
                    <div className="w-1/3 h-6 mt-2 bg-primary rounded-full"></div>
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-center">
                        <p className={`text-xl font-bold text-slate-600 ${animClass('animate-optimize-counter-a')}`}>12.4%</p>
                        <p className="text-xs text-slate-500">Conversión</p>
                    </div>
                </div>

                {/* Card B (The Winner) */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-[45%] h-[70%] bg-white rounded-lg shadow-md border border-slate-200 p-2 flex flex-col gap-2 ${animClass('animate-optimize-card-b')}`}>
                    <CrownIcon className={`absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 text-yellow-400 drop-shadow-md ${animClass('animate-optimize-crown')}`} />
                    <div className="w-full h-1/3 bg-categorical-blue-light rounded"></div>
                    <div className="w-3/4 h-3 bg-slate-200 rounded"></div>
                    <div className="w-1/2 h-3 bg-slate-200 rounded"></div>
                    <div className={`w-1/3 h-6 mt-2 rounded-full ${animClass('animate-optimize-button-b')}`}></div>
                     <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-center">
                        <p className={`text-xl font-bold text-primary ${animClass('animate-optimize-counter-b')}`}>18.2%</p>
                        <p className="text-xs text-slate-500">Conversión</p>
                    </div>
                </div>
            </div>
            
            {/* Animated Scale Icon */}
            <ScaleIcon className={`absolute bottom-[22%] left-1/2 -translate-x-1/2 w-10 h-10 text-slate-400 ${animClass('animate-optimize-scale')}`} />
        </div>
    );
};
