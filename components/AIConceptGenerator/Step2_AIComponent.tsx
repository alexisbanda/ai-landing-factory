import React from 'react';

// Define types that are also used in the main component
type AiComponentType = "Asistente de Ventas (Chatbot)" | "FAQ Inteligente" | "Quiz Interactivo";

interface AiComponent {
    name: AiComponentType;
    description: string;
    icon: React.FC<{className?: string}>;
}

interface Step2Props {
    aiComponents: AiComponent[];
    selectedAiComponent: AiComponentType;
    setSelectedAiComponent: (component: AiComponentType) => void;
}

export const Step2_AIComponent = ({ aiComponents, selectedAiComponent, setSelectedAiComponent }: Step2Props) => {
    return (
        <div className="animate-fade-in-up space-y-6">
            <div className="text-center">
                 <h2 className="text-xl font-bold text-cleat-dark">Elige tu Componente de IA Interactivo</h2>
                 <p className="text-sm text-slate-500">Esto le dará un superpoder a tu landing page.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiComponents.map(comp => (
                    <button 
                        key={comp.name} 
                        onClick={() => setSelectedAiComponent(comp.name)} 
                        className={`p-4 border rounded-lg text-left transition-all flex flex-col items-center text-center ${
                            selectedAiComponent === comp.name 
                            ? 'bg-primary/10 text-primary ring-2 ring-primary' 
                            : 'bg-white hover:bg-slate-50'
                        }`}>
                        <comp.icon className="h-8 w-8 mb-2 text-primary" />
                        <span className="font-bold text-base text-cleat-dark">{comp.name}</span>
                        <span className="text-xs text-slate-500 mt-1">{comp.description}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};