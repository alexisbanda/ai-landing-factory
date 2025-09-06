import React from 'react';
import { HeartHandshakeIcon } from '../../icons/Icons';

interface IntegrationLogosDisplayProps {
    data: any;
    step: any;
    animClass: (className: string) => string;
}

export const IntegrationLogosDisplay: React.FC<IntegrationLogosDisplayProps> = ({ data, step, animClass }) => {
    const logos = data.details || [];
    const size = 256; 
    const center = size / 2;
    const radius = 100;

    return (
        <div className="relative flex h-64 w-64 items-center justify-center">
            {/* Central Icon */}
            <div className={`absolute z-10 grid aspect-square w-[90px] place-items-center rounded-3xl border ${step.colors.bg} ${step.colors.border} ${step.colors.text} ${animClass('animate-icon-pop')} ${animClass('animate-pulse-glow')}`}>
                <HeartHandshakeIcon className="h-10 w-10" />
            </div>

            {/* SVG Layer for animated lines */}
            <svg className="absolute h-full w-full overflow-visible" viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d1d5db" /> 
                        <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                </defs>
                {logos.map((_: any, index: number) => {
                    const angle = (index / logos.length) * 2 * Math.PI - (Math.PI / 2);
                    const lineEndX = center + radius * Math.cos(angle);
                    const lineEndY = center + radius * Math.sin(angle);
                    const pathLength = radius;

                    return (
                        <path
                            key={index}
                            d={`M ${center} ${center} L ${lineEndX} ${lineEndY}`}
                            stroke="url(#line-gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            className={animClass('animate-draw-line')}
                            style={{
                                strokeDasharray: pathLength,
                                strokeDashoffset: pathLength,
                                animationDelay: `${200 + index * 150}ms`,
                            }}
                        />
                    );
                })}
            </svg>
            
            {/* Integration Logos with separated positioning and animation */}
            {logos.map((logo: any, index: number) => {
                const angle = (index / logos.length) * 2 * Math.PI - (Math.PI / 2);
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                    // Wrapper for positioning transform
                    <div
                        key={index}
                        className="absolute left-1/2 top-1/2 z-20"
                        style={{
                            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                        }}
                    >
                        {/* Inner element for animation transform (scale) */}
                        <div
                            className={`flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white p-2.5 shadow-md ${animClass('animate-logo-pop-in')}`}
                            style={{
                                animationDelay: `${400 + index * 150}ms`,
                            }}
                        >
                            {logo.type === 'img' && (
                                <img
                                    src={logo.props.src}
                                    alt={logo.props.alt}
                                    className="h-full w-full object-contain"
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};