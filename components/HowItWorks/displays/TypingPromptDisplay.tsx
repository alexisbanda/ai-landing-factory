import React, { useState, useEffect } from 'react';

export const TypingPromptDisplay: React.FC<{ data: any }> = ({ data }) => {
    const [promptIndex, setPromptIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const prompts = data.prompts;

    useEffect(() => {
        let typingTimeout: number;
        let mainInterval: number;

        const handleTyping = () => {
            const currentPrompt = prompts[promptIndex];
            setDisplayText(''); // Clear previous text
            
            let i = 0;
            const type = () => {
                if (i < currentPrompt.length) {
                    setDisplayText(prev => prev + currentPrompt.charAt(i));
                    i++;
                    typingTimeout = window.setTimeout(type, 50);
                }
            };
            type();
        };
        
        handleTyping();
        mainInterval = window.setInterval(() => {
            setPromptIndex(prev => (prev + 1) % prompts.length);
        }, 4000);

        return () => {
            clearTimeout(typingTimeout);
            clearInterval(mainInterval);
        };
    }, [promptIndex, prompts]);

    return (
        <div className="w-full h-full bg-slate-800 rounded-2xl p-6 flex items-start shadow-inner font-mono text-lg text-green-300">
            <span className="animate-fade-in">{displayText}</span>
            <span className="w-2 h-5 bg-green-300 ml-1 animate-blink" />
        </div>
    );
};
