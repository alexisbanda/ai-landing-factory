import React, { useRef, useEffect } from 'react';

interface VideoDisplayProps {
    data: any;
    animClass: (className: string) => string;
}

export const VideoDisplay: React.FC<VideoDisplayProps> = ({ data, animClass }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            // The source element is updated by React because data.src changes.
            // We just need to manually load and play the new source.
            videoElement.load();
            const playPromise = videoElement.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Autoplay was prevented or interrupted. We can ignore the 'AbortError'
                    // as it's expected when the user switches slides quickly.
                    if (error.name !== 'AbortError') {
                        console.error("Video playback error:", error);
                    }
                });
            }
        }
    }, [data.src]); // Reruns the effect if the video source changes

    return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-inner ${animClass('animate-fade-in')}`}>
            <video
                ref={videoRef}
                // The `key` attribute was removed to prevent the video element from
                // being unmounted and remounted on source change, which caused play() interruptions.
                poster={data.poster}
                preload="auto"
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover bg-slate-100"
            >
                {/* The source tag is now correctly updated by React without destroying the parent video */}
                <source src={data.src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
