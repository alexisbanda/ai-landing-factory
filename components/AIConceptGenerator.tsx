import React, { useState } from 'react';
import { generateLandingConcept, regenerateHeadline, LandingConcept } from '../services/geminiService';
import { SparklesIcon, LoaderIcon, CheckIcon, FileTextIcon, ArrowLeftRightIcon, RefreshCwIcon, MessageCircleQuestionIcon, BotMessageSquareIcon, ClipboardPenIcon } from './icons/Icons';

// Updated to a 4-step process
type Step = 1 | 2 | 3 | 4;
type Audience = "Emprendedores" | "Marketers" | "Desarrolladores" | "Público General" | "Otro...";
type Goal = "Generar Leads" | "Vender un Producto" | "Obtener Registros" | "Anunciar un Evento" | "Otro...";
type Tone = "Profesional" | "Amistoso" | "Urgente" | "Inspirador" | "Otro...";

// New type for AI Components
type AiComponentType = "Asistente de Ventas (Chatbot)" | "FAQ Inteligente" | "Quiz Interactivo";

const audiences: Audience[] = ["Emprendedores", "Marketers", "Desarrolladores", "Público General", "Otro..."];
const goals: Goal[] = ["Generar Leads", "Vender un Producto", "Obtener Registros", "Anunciar un Evento", "Otro..."];
const tones: Tone[] = ["Profesional", "Amistoso", "Urgente", "Inspirador", "Otro..."];

// Data for the new AI Component step
const aiComponents: { name: AiComponentType; description: string; icon: React.FC<{className?: string}> }[] = [
    { name: "Asistente de Ventas (Chatbot)", description: "Un chatbot que responde preguntas y captura leads 24/7.", icon: BotMessageSquareIcon },
    { name: "FAQ Inteligente", description: "Una sección de FAQs que responde dudas al instante.", icon: MessageCircleQuestionIcon },
    { name: "Quiz Interactivo", description: "Un quiz que guía y califica a tus visitantes.", icon: ClipboardPenIcon },
];

const AIConceptGenerator: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [productInfo, setProductInfo] = useState({ what: '', problem: '', features: '' });
    const [selectedAiComponent, setSelectedAiComponent] = useState<AiComponentType>('Asistente de Ventas (Chatbot)');
    const [selectedAudience, setSelectedAudience] = useState<Audience>('Marketers');
    const [selectedGoal, setSelectedGoal] = useState<Goal>('Generar Leads');
    const [selectedTone, setSelectedTone] = useState<Tone>('Profesional');
    const [customAudience, setCustomAudience] = useState('');
    const [customGoal, setCustomGoal] = useState('');
    const [customTone, setCustomTone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<LandingConcept | null>(null);
    const [leadEmail, setLeadEmail] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductInfo(prev => ({ ...prev, [name]: value }));
    };

    const getFinalInputs = () => {
        const finalAudience = selectedAudience === 'Otro...' ? customAudience : selectedAudience;
        const finalGoal = selectedGoal === 'Otro...' ? customGoal : selectedGoal;
        const finalTone = selectedTone === 'Otro...' ? customTone : selectedTone;
        return { finalAudience, finalGoal, finalTone };
    }

    const handleGenerateConcept = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        setCurrentStep(4); // Concept is now step 4

        const { finalAudience, finalGoal, finalTone } = getFinalInputs();

        if (!finalAudience.trim() || !finalGoal.trim() || !finalTone.trim()) {
            setError("Por favor, completa los campos personalizados.");
            setIsLoading(false);
            setCurrentStep(3); // Go back to details step
            return;
        }

        try {
            const fullDescription = `Producto: ${productInfo.what}. Problema que resuelve: ${productInfo.problem}. Características clave: ${productInfo.features}.`;
            const concept = await generateLandingConcept(fullDescription, finalAudience, finalGoal, finalTone, selectedAiComponent);
            setResult(concept);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegenerateHeadline = async () => {
        if (!result) return;
        setIsRegenerating(true);
        const { finalAudience, finalGoal, finalTone } = getFinalInputs();
        const fullDescription = `Producto: ${productInfo.what}. Problema que resuelve: ${productInfo.problem}. Características clave: ${productInfo.features}.`;
        
        try {
            const newHeadlineData = await regenerateHeadline(fullDescription, finalAudience, finalGoal, finalTone, result.headline);
            setResult(prevResult => prevResult ? { ...prevResult, headline: newHeadlineData.headline } : null);
        } catch (err) {
            console.error("Failed to regenerate headline");
        } finally {
            setIsRegenerating(false);
        }
    };

    const ProgressBar = () => (
        <div className="w-full px-4 sm:px-8">
            <div className="relative h-2 w-full rounded-full bg-slate-200">
                <div 
                    className="absolute top-0 left-0 h-2 rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }} // Updated for 4 steps
                />
            </div>
            <div className="mt-2 grid grid-cols-4 text-center text-sm font-semibold text-slate-500">
                <span className={currentStep >= 1 ? 'text-primary' : ''}>Oferta</span>
                <span className={currentStep >= 2 ? 'text-primary' : ''}>Componente IA</span>
                <span className={currentStep >= 3 ? 'text-primary' : ''}>Detalles</span>
                <span className={currentStep >= 4 ? 'text-primary' : ''}>Concepto</span>
            </div>
        </div>
    );
    
    return (
        <section id="ai-concept-generator" className="py-16 md:py-20 bg-slate-50/70">
            <div className="container mx-auto max-w-4xl px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 mb-4">
                        Conceptualiza tu Landing en <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">60 Segundos</span>
                    </h2>
                    <h3 className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Usa nuestro asistente de IA para esbozar una estrategia de conversión para tu próxima idea.
                    </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl min-h-[500px] flex flex-col justify-between">
                    <ProgressBar />

                    <div className="flex-grow flex flex-col justify-center mt-6">
                        {currentStep === 1 && (
                            <div className="animate-fade-in-up space-y-6">
                                <div className="text-center">
                                     <h2 className="text-xl font-bold text-cleat-dark">Cuéntanos sobre tu idea</h2>
                                     <p className="text-sm text-slate-500">Sé específico para obtener los mejores resultados.</p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="what" className="block text-sm font-semibold text-slate-700 mb-1">1. ¿Qué producto, servicio u oferta quieres promocionar?</label>
                                        <input type="text" id="what" name="what" value={productInfo.what} onChange={handleInputChange} placeholder="Ej: Una app de yoga para principiantes" className="w-full p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label htmlFor="problem" className="block text-sm font-semibold text-slate-700 mb-1">2. ¿Cuál es el principal problema que resuelve?</label>
                                        <input type="text" id="problem" name="problem" value={productInfo.problem} onChange={handleInputChange} placeholder="Ej: Ayuda a la gente a empezar a hacer ejercicio sin sentirse intimidada" className="w-full p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label htmlFor="features" className="block text-sm font-semibold text-slate-700 mb-1">3. Menciona 1 o 2 características clave (opcional)</label>
                                        <input type="text" id="features" name="features" value={productInfo.features} onChange={handleInputChange} placeholder="Ej: Clases en vivo y seguimiento personalizado" className="w-full p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                </div>
                                <button onClick={() => setCurrentStep(2)} disabled={!productInfo.what.trim() || !productInfo.problem.trim()} className="w-full sm:w-auto float-right bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed">Siguiente</button>
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div className="animate-fade-in-up space-y-6">
                                <div className="text-center">
                                     <h2 className="text-xl font-bold text-cleat-dark">Elige tu Componente de IA Interactivo</h2>
                                     <p className="text-sm text-slate-500">Esto le dará un superpoder a tu landing page.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {aiComponents.map(comp => (
                                        <button key={comp.name} onClick={() => setSelectedAiComponent(comp.name)} className={`p-4 border rounded-lg text-left transition-all flex flex-col items-center text-center ${selectedAiComponent === comp.name ? 'bg-primary/10 text-primary ring-2 ring-primary' : 'bg-white hover:bg-slate-50'}`}>
                                            <comp.icon className="h-8 w-8 mb-2 text-primary" />
                                            <span className="font-bold text-base text-cleat-dark">{comp.name}</span>
                                            <span className="text-xs text-slate-500 mt-1">{comp.description}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between pt-2">
                                    <button onClick={() => setCurrentStep(1)} className="bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-lg hover:bg-slate-300 transition-all">Anterior</button>
                                    <button onClick={() => setCurrentStep(3)} className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all">Siguiente</button>
                                </div>
                            </div>
                        )}
                        {currentStep === 3 && (
                             <div className="animate-fade-in-up space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-cleat-dark text-center">¿Quién es tu público objetivo?</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        {audiences.map(audience => (
                                            <button key={audience} onClick={() => setSelectedAudience(audience)} className={`p-2 border rounded-lg font-semibold transition-all text-xs sm:text-sm ${selectedAudience === audience ? 'bg-primary text-white ring-2 ring-primary/50' : 'bg-slate-50 hover:bg-slate-100'}`}>{audience}</button>
                                        ))}
                                    </div>
                                    {selectedAudience === 'Otro...' && <input type="text" value={customAudience} onChange={e => setCustomAudience(e.target.value)} placeholder="Define tu público" className="w-full mt-2 p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-cleat-dark text-center">¿Cuál es el objetivo principal?</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        {goals.map(goal => (
                                            <button key={goal} onClick={() => setSelectedGoal(goal)} className={`p-2 border rounded-lg font-semibold transition-all text-xs sm:text-sm ${selectedGoal === goal ? 'bg-primary text-white ring-2 ring-primary/50' : 'bg-slate-50 hover:bg-slate-100'}`}>{goal}</button>
                                        ))}
                                    </div>
                                    {selectedGoal === 'Otro...' && <input type="text" value={customGoal} onChange={e => setCustomGoal(e.target.value)} placeholder="Define tu objetivo" className="w-full mt-2 p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />}
                                </div>
                                 <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-cleat-dark text-center">¿Cuál es el tono de la comunicación?</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        {tones.map(tone => (
                                            <button key={tone} onClick={() => setSelectedTone(tone)} className={`p-2 border rounded-lg font-semibold transition-all text-xs sm:text-sm ${selectedTone === tone ? 'bg-primary text-white ring-2 ring-primary/50' : 'bg-slate-50 hover:bg-slate-100'}`}>{tone}</button>
                                        ))}
                                    </div>
                                    {selectedTone === 'Otro...' && <input type="text" value={customTone} onChange={e => setCustomTone(e.target.value)} placeholder="Define tu tono" className="w-full mt-2 p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />}
                                </div>
                                <div className="flex justify-between pt-2">
                                    <button onClick={() => setCurrentStep(2)} className="bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-lg hover:bg-slate-300 transition-all">Anterior</button>
                                    <button onClick={handleGenerateConcept} className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
                                        <SparklesIcon className="h-5 w-5" />
                                        Generar Hoja de Ruta
                                    </button>
                                </div>
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div className="animate-fade-in-up">
                                {isLoading && (
                                    <div className="flex flex-col items-center gap-4 text-primary text-center">
                                        <LoaderIcon className="h-12 w-12 animate-spin" />
                                        <p className="text-xl font-semibold text-cleat-dark">Nuestra IA está diseñando tu estrategia...</p>
                                    </div>
                                )}
                                {error && (
                                    <div className="text-center text-status-error bg-red-100 p-4 rounded-lg">
                                        <p className="font-semibold">Error al generar el concepto:</p>
                                        <p>{error}</p>
                                        <button onClick={() => setCurrentStep(3)} className="mt-4 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90">Intentar de Nuevo</button>
                                    </div>
                                )}
                                {result && (
                                    <div className="space-y-6">
                                        <div className="relative p-6 rounded-lg bg-slate-50 border border-slate-200 text-center">
                                            <h3 className="text-sm font-bold uppercase text-primary tracking-wider mb-2">Titular y Subtítulo</h3>
                                            <p className="text-2xl font-bold text-cleat-dark">"{result.headline}"</p>
                                            <p className="text-slate-600 mt-2">{result.subheadline}</p>
                                            <button onClick={handleRegenerateHeadline} disabled={isRegenerating} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-primary rounded-full transition-colors disabled:cursor-not-allowed" aria-label="Regenerar titular">
                                                {isRegenerating ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <RefreshCwIcon className="h-4 w-4" />}
                                            </button>
                                        </div>

                                        {result.aiComponentSuggestion && (
                                            <div className="p-6 rounded-lg bg-primary/10 border-2 border-dashed border-primary/30 text-center">
                                                <h3 className="text-sm font-bold uppercase text-primary tracking-wider mb-2">Sugerencia para Componente IA: {result.aiComponentSuggestion.componentType}</h3>
                                                <p className="text-xl font-bold text-cleat-dark">"{result.aiComponentSuggestion.title}"</p>
                                                <p className="text-slate-600 mt-2 text-sm"><b>Sugerencia de prompt:</b> {result.aiComponentSuggestion.promptSuggestion}</p>
                                                <p className="text-slate-600 mt-1 text-sm"><b>Integración con el objetivo:</b> {result.aiComponentSuggestion.ctaIntegration}</p>
                                            </div>
                                        )}
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                                    <h3 className="text-sm font-bold uppercase text-primary tracking-wider mb-3">Beneficios Clave</h3>
                                                    <ul className="space-y-2">
                                                        {result.keyBenefits.map((benefit, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <CheckIcon className="h-5 w-5 flex-shrink-0 text-status-success mt-0.5" />
                                                                <span className="text-slate-600 text-sm">{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-center items-center">
                                                    <h3 className="text-sm font-bold uppercase text-primary tracking-wider mb-2">Llamada a la Acción (CTA)</h3>
                                                    <div className="bg-primary text-white font-bold py-3 px-6 rounded-lg mt-2 text-sm">{result.cta}</div>
                                                </div>
                                                <div className="p-4 rounded-lg bg-slate-50/50 border border-dashed border-slate-300">
                                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-primary tracking-wider mb-2">
                                                        <ArrowLeftRightIcon className="h-4 w-4" />
                                                        Idea para Prueba A/B
                                                    </h3>
                                                    <p className="text-slate-600 text-sm italic">Prueba este titular alternativo: "{result.abTestSuggestion.headline}"</p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-primary tracking-wider mb-3">
                                                        <FileTextIcon className="h-4 w-4" />
                                                        Esquema de la Página
                                                    </h3>
                                                    <ul className="space-y-2.5">
                                                        {result.pageOutline.map((item, i) => (
                                                            <li key={i}>
                                                                <p className="font-semibold text-cleat-dark text-sm">{i+1}. {item.section}</p>
                                                                <p className="text-xs text-slate-500 pl-5">{item.description}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                 <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                                    <h3 className="text-sm font-bold uppercase text-primary tracking-wider mb-3">Sugerencias de Imágenes</h3>
                                                    <ul className="space-y-2">
                                                        {result.imageSuggestions.map((item, i) => (
                                                             <li key={i}>
                                                                <p className="font-semibold text-cleat-dark text-sm">{item.section}:</p>
                                                                <p className="text-xs text-slate-500 pl-2">{item.suggestion}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Lead Capture Form for Netlify */}
                                        <div className="mt-6 text-center bg-green-50 border-t-4 border-green-400 p-4 rounded-b-lg">
                                            <h3 className="text-lg font-bold text-green-800">¡Tu Hoja de Ruta Estratégica está lista!</h3>
                                            <p className="text-green-700 mt-1 text-sm">Ingresa tu email para recibir el plan completo y empezar tu prueba gratuita.</p>
                                            <form name="concept-form" method="POST" data-netlify="true" action="/thank-you.html" className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                                                <input type="hidden" name="form-name" value="concept-form" />
                                                {result && (
                                                    <>
                                                        <input type="hidden" name="headline" value={result.headline} />
                                                        <input type="hidden" name="subheadline" value={result.subheadline} />
                                                        <input type="hidden" name="keyBenefits" value={JSON.stringify(result.keyBenefits)} />
                                                        <input type="hidden" name="cta" value={result.cta} />
                                                        <input type="hidden" name="pageOutline" value={JSON.stringify(result.pageOutline)} />
                                                        <input type="hidden" name="abTestSuggestion" value={result.abTestSuggestion.headline} />
                                                        <input type="hidden" name="aiComponentSuggestion" value={JSON.stringify(result.aiComponentSuggestion)} />
                                                    </>
                                                )}
                                                <input type="email" name="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="tu@email.com" required className="flex-grow px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                                <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-md hover:bg-green-700 transition-all">Enviar Plan</button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation-name: fade-in-up;
                    animation-duration: 0.5s;
                    animation-timing-function: ease-out;
                    animation-fill-mode: forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
};

export default AIConceptGenerator;