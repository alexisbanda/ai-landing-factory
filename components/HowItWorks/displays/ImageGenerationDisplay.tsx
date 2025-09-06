import React, { useEffect, useState } from 'react';

interface ImageGenerationDisplayProps {
    animClass: (className: string) => string;
}

export const ImageGenerationDisplay: React.FC<ImageGenerationDisplayProps> = ({ animClass }) => {
    const [promptText, setPromptText] = useState('');
    const fullPrompt = "Un astronauta en monopatín en Marte...";

    useEffect(() => {
        setPromptText(''); // Reset on re-render if needed
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < fullPrompt.length) {
                setPromptText(prev => prev + fullPrompt.charAt(i));
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 80); // Typing speed

        return () => clearInterval(intervalId);
    }, []); // Runs once

    return (
        <div className={`w-full h-full bg-slate-100 rounded-2xl p-3 flex flex-col gap-3 shadow-inner overflow-hidden border border-slate-200 ${animClass('animate-fade-in')}`}>
            {/* Image Placeholder */}
            <div className={`relative w-full flex-grow bg-slate-800 rounded-lg overflow-hidden`}>
                {/* Final Image (initially hidden) */}
                <div 
                    className={`absolute inset-0 bg-cover bg-center ${animClass('animate-image-gen-resolve')}`}
                    style={{ backgroundImage: 'url(https://images.pexels.com/photos/1799904/pexels-photo-1799904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}
                />
                
                {/* Noise/Generation Effect */}
                <div className={`absolute inset-0 ${animClass('animate-image-gen-noise')}`} style={{
                    backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGUmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=)',
                    opacity: 0.2
                }}></div>
            </div>

            {/* Prompt Input Mock */}
            <div className="flex-shrink-0 h-12 w-full bg-white rounded-lg border border-slate-300 shadow-sm flex items-center px-4 font-mono text-slate-700">
                <p>{promptText}</p>
                <span className="w-0.5 h-4 bg-slate-700 ml-1 animate-blink" />
            </div>
        </div>
    );
};
