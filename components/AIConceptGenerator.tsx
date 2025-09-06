import React, { useState } from 'react';
import { generateLandingConcept, LandingConcept } from '../services/geminiService';
import { SparklesIcon, LoaderIcon, CheckIcon, FileTextIcon, ArrowLeftRightIcon } from './icons/Icons';

type Step = 1 | 2 | 3;
type Audience = "Emprendedores" | "Marketers" | "Desarrolladores" | "Público General";
type Goal = "Generar Leads" | "Vender un Producto" | "Obtener Registros" | "Anunciar un Evento";
type Tone = "Profesional" | "Amistoso" | "Urgente" | "Inspirador";


const audiences: Audience[] = ["Emprendedores", "Marketers", "Desarrolladores", "Público General"];
const goals: Goal[] = ["Generar Leads", "Vender un Producto", "Obtener Registros", "Anunciar un Evento"];
const tones: Tone[] = ["Profesional", "Amistoso", "Urgente", "Inspirador"];


const AIConceptGenerator: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [description, setDescription] = useState('');
    const [selectedAudience, setSelectedAudience] = useState<Audience>('Marketers');
    const [selectedGoal, setSelectedGoal] = useState<Goal>('Generar Leads');
    const [selectedTone, setSelectedTone] = useState<Tone>('Profesional');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<LandingConcept | null>(null);
    const [leadEmail, setLeadEmail] = useState('');

    const handleGenerateConcept = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        setCurrentStep(3);
        try {
            const concept = await generateLandingConcept(description, selectedAudience, selectedGoal, selectedTone);
            setResult(concept);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    };

    const ProgressBar = () => (
        <div className="w-full px-4 sm:px-8">
            <div className="relative h-2 w-full rounded-full bg-slate-200">
                <div 
                    className="absolute top-0 left-0 h-2 rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                />
            </div>
            <div className="mt-2 flex justify-between text-sm font-semibold text-slate-500">
                <span className={currentStep >= 1 ? 'text-primary' : ''}>Oferta</span>
                <span className={currentStep >= 2 ? 'text-primary' : ''}>Detalles</span>
                <span className={currentStep >= 3 ? 'text-primary' : ''}>Concepto</span>
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
                            <div className="animate-fade-in-up space-y-4">
                                <label htmlFor="description" className="block text-xl font-bold text-cleat-dark text-center">¿Qué producto, servicio u oferta quieres promocionar?</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Ej: Una app de yoga para principiantes con clases en vivo y seguimiento personalizado."
                                    className="w-full h-32 p-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    onClick={() => setCurrentStep(2)}
                                    disabled={!description.trim()}
                                    className="w-full sm:w-auto float-right bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                        {currentStep === 2 && (
                             <div className="animate-fade-in-up space-y-5">
                                <div>
                                    <h3 className="text-lg font-bold text-cleat-dark text-center mb-3">¿Quién es tu público objetivo?</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {audiences.map(audience => (
                                            <button key={audience} onClick={() => setSelectedAudience(audience)} className={`p-3 border rounded-lg font-semibold transition-all text-sm ${selectedAudience === audience ? 'bg-primary text-white ring-2 ring-primary/50' : 'bg-slate-50 hover:bg-slate-100'}`}>{audience}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-cleat-dark text-center mb-3">¿Cuál es el objetivo principal?</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {goals.map(goal => (
                                            <button key={goal} onClick={() => setSelectedGoal(goal)} className={`p-3 border rounded-lg font-semibold transition-all text-sm ${selectedGoal === goal ? 'bg-primary text-white ring-2 ring-primary/50' : 'bg-slate-50 hover:bg-slate-100'}`}>{goal}</button>
                                        ))}
                                    </div>
                                </div>
                                 <div>
                                    <h3 className="text-lg font-bold text-cleat-dark text-center mb-3">¿Cuál es el tono de la comunicación?</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {tones.map(tone => (
                                            <button key={tone} onClick={() => setSelectedTone(tone)} className={`p-3 border rounded-lg font-semibold transition-all text-sm ${selectedTone === tone ? 'bg-primary text-white ring-2 ring-primary/50' : 'bg-slate-50 hover:bg-slate-100'}`}>{tone}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between pt-2">
                                    <button onClick={() => setCurrentStep(1)} className="bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-lg hover:bg-slate-300 transition-all">Anterior</button>
                                    <button onClick={handleGenerateConcept} className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
                                        <SparklesIcon className="h-5 w-5" />
                                        Generar Hoja de Ruta
                                    </button>
                                </div>
                            </div>
                        )}
                        {currentStep === 3 && (
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
                                        <button onClick={() => setCurrentStep(2)} className="mt-4 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90">Intentar de Nuevo</button>
                                    </div>
                                )}
                                {result && (
                                    <div className="space-y-6">
                                        {/* Titular y Subtitulo */}
                                        <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 text-center">
                                            <h3 className="text-sm font-bold uppercase text-primary tracking-wider mb-2">Titular y Subtítulo</h3>
                                            <p className="text-2xl font-bold text-cleat-dark">"{result.headline}"</p>
                                            <p className="text-slate-600 mt-2">{result.subheadline}</p>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Beneficios y CTA */}
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
                                            
                                            {/* Esquema e Imágenes */}
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

                                        {/* Lead Capture */}
                                        <div className="mt-6 text-center bg-green-50 border-t-4 border-green-400 p-4 rounded-b-lg">
                                            <h3 className="text-lg font-bold text-green-800">¡Tu Hoja de Ruta Estratégica está lista!</h3>
                                            <p className="text-green-700 mt-1 text-sm">Ingresa tu email para recibir el plan completo y empezar tu prueba gratuita.</p>
                                            <form className="mt-4 flex flex-col sm:flex-row gap-2 justify-center" onSubmit={(e) => e.preventDefault()}>
                                                <input type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="tu@email.com" required className="flex-grow px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
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