
import React, { useState, useEffect } from 'react';

// Custom hook for animating number counting
const useAnimatedCounter = (endValue: number, duration: number = 1000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const currentValue = Math.floor(progress * (endValue - start) + start);

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(endValue);
            }
        };

        const timeout = setTimeout(() => requestAnimationFrame(animate), 300); // Delay start of animation
        
        return () => clearTimeout(timeout);
    }, [endValue, duration]);

    return count;
};

// Component for the animated circular progress gauge
const CircularGauge: React.FC<{ value: number; label: string }> = ({ value, label }) => {
    const size = 150;
    const strokeWidth = 12;
    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    const animatedValue = useAnimatedCounter(value, 1200);

    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#0284C7" />
                    </linearGradient>
                </defs>
                {/* Background track */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                />
                {/* Foreground progress */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                    className="animate-circle-progress"
                    style={{ '--target-dash-offset': offset } as React.CSSProperties}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-4xl font-bold text-white tabular-nums">
                    {animatedValue}<span className="text-3xl align-middle">%</span>
                </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-300">{label}</p>
        </div>
    );
};

// Component for a single secondary metric
const MetricItem: React.FC<{ value: number; label: string; delay: number }> = ({ value, label, delay }) => {
    const animatedValue = useAnimatedCounter(value, 1200);
    return (
        <div className="flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: `${delay}ms`}}>
            <p className="text-2xl font-semibold text-slate-100 tabular-nums">{animatedValue.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">{label}</p>
        </div>
    );
};

// Component for the mini line chart
const TrendChart: React.FC<{ data: number[] }> = ({ data }) => {
    const width = 280;
    const height = 60;
    const padding = 5;
    const maxVal = Math.max(...data);
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
        const y = height - (d / maxVal) * (height - padding * 2) - padding;
        return `${x},${y}`;
    }).join(' ');
    
    const pathRef = React.useRef<SVGPolylineElement>(null);
    const [pathLength, setPathLength] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (pathRef.current && pathRef.current.getBBox().width > 0) { // Check if rendered
                try {
                    setPathLength(pathRef.current.getTotalLength());
                } catch (e) {
                    console.error("Failed to get SVG path length:", e);
                }
            }
        }, 100); // Increased timeout to allow for parent animations

        return () => clearTimeout(timer);
    }, [points]);

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <defs>
                    <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
                        <stop offset="50%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <polyline
                    ref={pathRef}
                    points={points}
                    fill="none"
                    stroke="url(#lineGlow)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength}
                    className="animate-draw-svg-path"
                    style={{animationDelay: '800ms', filter: 'url(#glow)'}}
                />
            </svg>
        </div>
    );
};

// Main dashboard component
export const LaunchDashboardDisplay: React.FC<{ data: any; animClass: (className: string) => string }> = ({ data, animClass }) => {
    return (
        <div className={`relative w-full h-full bg-slate-800 rounded-2xl p-4 flex flex-col shadow-inner overflow-hidden border border-slate-700 ${animClass('animate-fade-in')}`}>
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            {/* Main content area - using absolute positioning for perfect control */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-2">
                {/* Center Gauge - perfectly centered */}
                <div className="flex justify-center items-center">
                    <CircularGauge value={data.mainKPI.value} label={data.mainKPI.label} />
                </div>
                
                {/* Left Metric - positioned absolutely */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <MetricItem value={data.secondaryMetrics[0].value} label={data.secondaryMetrics[0].label} delay={500} />
                </div>

                {/* Right Metric - positioned absolutely */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <MetricItem value={data.secondaryMetrics[1].value} label={data.secondaryMetrics[1].label} delay={700} />
                </div>
            </div>

            {/* Bottom chart area */}
            <div className="relative z-10 h-16 flex-shrink-0">
                 <TrendChart data={data.lineChartData} />
            </div>
        </div>
    );
};