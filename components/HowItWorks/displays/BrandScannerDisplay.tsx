import React from 'react';

interface BrandScannerDisplayProps {
    animClass: (className: string) => string;
}

export const BrandScannerDisplay: React.FC<BrandScannerDisplayProps> = ({ animClass }) => {
    const brandColors = ['#0284C7', '#22D3EE', '#2DD4BF', '#475569'];

    return (
        <div className={`w-full h-full bg-slate-100 rounded-2xl p-4 flex flex-col justify-center items-center gap-6 shadow-inner overflow-hidden border border-slate-200 ${animClass('animate-fade-in')}`}>
            
            {/* URL Input Mock */}
            <div className="relative w-4/5">
                <div className="h-12 w-full bg-white rounded-lg border border-slate-300 shadow-sm flex items-center px-4 font-mono text-slate-700">
                    <span className="text-slate-400">https://</span>
                    <p className={`${animClass('animate-brand-typing')}`}></p>
                </div>
                {/* Animated Scan Line */}
                <div className={`absolute top-0 left-0 h-full w-1.5 bg-primary/50 rounded-full shadow-[0_0_10px_theme(colors.primary)] ${animClass('animate-brand-scan-line')}`}></div>
            </div>

            {/* Brand Palette Output */}
            <div className="w-4/5 p-4 bg-white/50 rounded-lg border border-slate-200/80 backdrop-blur-sm">
                <p className="text-sm font-semibold text-cleat-dark mb-3">Paleta de Marca Extraída</p>
                <div className="flex justify-between items-center">
                    
                    {/* Colors */}
                    <div className="flex gap-2">
                        {brandColors.map((color, index) => (
                            <div 
                                key={color}
                                className={`w-8 h-8 rounded-full border-2 border-white shadow-md ${animClass('animate-brand-palette-pop')}`}
                                style={{ backgroundColor: color, animationDelay: `${500 + index * 150}ms` }}
                            />
                        ))}
                    </div>

                    {/* Typography */}
                    <div className={`text-center ${animClass('animate-brand-palette-pop')}`} style={{ animationDelay: '1100ms' }}>
                        <p className="font-sans font-bold text-2xl text-cleat-dark">Aa</p>
                        <p className="text-xs text-slate-500">Inter</p>
                    </div>

                    {/* Logo */}
                    <div className={`w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center ${animClass('animate-brand-palette-pop')}`} style={{ animationDelay: '1250ms' }}>
                       <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary">
                            <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
