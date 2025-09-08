import React from 'react';

// Define types
type Audience = "Emprendedores" | "Marketers" | "Desarrolladores" | "Público General" | "Otro...";
type Goal = "Generar Leads" | "Vender un Producto" | "Obtener Registros" | "Anunciar un Evento" | "Otro...";
type Tone = "Profesional" | "Amistoso" | "Urgente" | "Inspirador" | "Otro...";

// Define props
interface Step3Props {
    audiences: Audience[];
    goals: Goal[];
    tones: Tone[];
    selectedAudience: Audience;
    setSelectedAudience: (a: Audience) => void;
    customAudience: string;
    setCustomAudience: (a: string) => void;
    selectedGoal: Goal;
    setSelectedGoal: (g: Goal) => void;
    customGoal: string;
    setCustomGoal: (g: string) => void;
    selectedTone: Tone;
    setSelectedTone: (t: Tone) => void;
    customTone: string;
    setCustomTone: (t: string) => void;
    Tooltip: React.ComponentType<{ content: string, children: React.ReactNode }>;
    MessageCircleQuestionIcon: React.FC<{className?: string}>;
}

export const Step3_Details = (props: Step3Props) => {
    const {
        audiences, goals, tones,
        selectedAudience, setSelectedAudience, customAudience, setCustomAudience,
        selectedGoal, setSelectedGoal, customGoal, setCustomGoal,
        selectedTone, setSelectedTone, customTone, setCustomTone,
        Tooltip, MessageCircleQuestionIcon
    } = props;

    return (
        <div className="animate-fade-in-up space-y-4">
            <div className="space-y-2">
                <div className="flex justify-center items-center gap-2">
                    <h3 className="text-lg font-bold text-cleat-dark">¿Quién es tu público objetivo?</h3>
                    <Tooltip content="La audiencia define el lenguaje y el enfoque. Un tono para 'Desarrolladores' será más técnico que para 'Público General'.">
                        <MessageCircleQuestionIcon className="h-4 w-4 text-slate-400 cursor-help" />
                    </Tooltip>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {audiences.map(audience => (
                        <button key={audience} onClick={() => setSelectedAudience(audience)} className={`p-2 border rounded-lg font-semibold transition-all text-xs sm:text-sm ${selectedAudience === audience ? 'bg-primary text-white ring-2 ring-primary/50' : 'bg-slate-50 hover:bg-slate-100'}`}>{audience}</button>
                    ))}
                </div>
                {selectedAudience === 'Otro...' && <input type="text" value={customAudience} onChange={e => setCustomAudience(e.target.value)} placeholder="Define tu público" className="w-full mt-2 p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />}
            </div>
            <div className="space-y-2">
                <div className="flex justify-center items-center gap-2">
                    <h3 className="text-lg font-bold text-cleat-dark">¿Cuál es el objetivo principal?</h3>
                    <Tooltip content="El objetivo principal determina las llamadas a la acción (CTA) y el contenido. 'Vender un Producto' se enfocará en características y beneficios, mientras que 'Generar Leads' podría ofrecer un ebook o un webinar.">
                        <MessageCircleQuestionIcon className="h-4 w-4 text-slate-400 cursor-help" />
                    </Tooltip>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {goals.map(goal => (
                        <button key={goal} onClick={() => setSelectedGoal(goal)} className={`p-2 border rounded-lg font-semibold transition-all text-xs sm:text-sm ${selectedGoal === goal ? 'bg-primary text-white ring-2 ring-primary/50' : 'bg-slate-50 hover:bg-slate-100'}`}>{goal}</button>
                    ))}
                </div>
                {selectedGoal === 'Otro...' && <input type="text" value={customGoal} onChange={e => setCustomGoal(e.target.value)} placeholder="Define tu objetivo" className="w-full mt-2 p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />}
            </div>
             <div className="space-y-2">
                <div className="flex justify-center items-center gap-2">
                    <h3 className="text-lg font-bold text-cleat-dark">¿Cuál es el tono de la comunicación?</h3>
                    <Tooltip content="El tono ajusta la personalidad de la marca. 'Amistoso' usará un lenguaje más cercano y conversacional, mientras que 'Urgente' creará un sentido de escasez o tiempo limitado.">
                        <MessageCircleQuestionIcon className="h-4 w-4 text-slate-400 cursor-help" />
                    </Tooltip>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {tones.map(tone => (
                        <button key={tone} onClick={() => setSelectedTone(tone)} className={`p-2 border rounded-lg font-semibold transition-all text-xs sm:text-sm ${selectedTone === tone ? 'bg-primary text-white ring-2 ring-primary/50' : 'bg-slate-50 hover:bg-slate-100'}`}>{tone}</button>
                    ))}
                </div>
                {selectedTone === 'Otro...' && <input type="text" value={customTone} onChange={e => setCustomTone(e.target.value)} placeholder="Define tu tono" className="w-full mt-2 p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />}
            </div>
        </div>
    );
};