import React from 'react';

const CursorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={className}
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M6.37893 2.8711C6.78817 2.2222 7.61631 2.01257 8.26521 2.42182L21.3323 10.5511C21.9812 10.9604 22.1908 11.7885 21.7816 12.4374L16.3218 20.8168C15.9126 21.4657 15.0844 21.6753 14.4355 21.2661L3.52841 14.1205C2.87951 13.7112 2.67005 12.8831 3.07929 12.2342L6.37893 2.8711Z" />
    </svg>
);


interface UiEditorDisplayProps {
    animClass: (className: string) => string;
}

export const UiEditorDisplay: React.FC<UiEditorDisplayProps> = ({ animClass }) => (
    <div className={`w-full h-full bg-slate-100 rounded-2xl p-3 flex flex-col gap-2 shadow-inner overflow-hidden border border-slate-200 ${animClass('animate-fade-in')}`}>
        {/* Browser UI Mock */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
        </div>
        
        {/* Canvas area where animation happens */}
        <div className="relative flex-grow bg-white rounded-lg border border-slate-200/80 overflow-hidden">
            {/* Animated Cursor */}
            <CursorIcon className={`absolute top-0 left-0 h-5 w-5 text-cleat-dark drop-shadow-md z-30 ${animClass('animate-customize-cursor')}`} />

            {/* Schematic Landing Page Elements */}
            {/* 1. Hero Image */}
            <div className={`absolute top-[15%] left-1/2 -translate-x-1/2 w-[70%] h-[35%] bg-categorical-blue-light rounded-lg z-20 ${animClass('animate-customize-image')}`} />

            {/* 2. Text Lines */}
            <div className="absolute top-[58%] left-[15%] w-3/5 h-4 bg-slate-200 rounded" />
            <div className="absolute top-[68%] left-[15%] w-1/2 h-3 bg-slate-200 rounded" />

            {/* 3. CTA Button & Color Palette */}
            <div className="absolute top-[80%] left-[15%]">
                <div className={`w-24 h-7 rounded-full z-10 ${animClass('animate-customize-button')}`} />
                {/* Palette that appears on hover */}
                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1.5 p-1 bg-white rounded-full shadow-md z-20 ${animClass('animate-customize-palette')}`}>
                    <div className="w-5 h-5 rounded-full bg-primary ring-2 ring-offset-1 ring-slate-400" />
                    <div className="w-5 h-5 rounded-full bg-theme-accent-secondary" />
                    <div className="w-5 h-5 rounded-full bg-categorical-orange-mid" />
                </div>
            </div>
        </div>
    </div>
);