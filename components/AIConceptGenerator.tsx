import React, { useState, useEffect } from 'react';
import { generateLandingConcept, regenerateHeadline, LandingConcept } from '../services/geminiService';

// WIZARD AND STEP COMPONENTS
import { Wizard, useWizardContext } from './Wizard/Wizard';
import { WizardStep } from './Wizard/WizardStep';
import { WizardProgressBar } from './Wizard/WizardProgressBar';
import { WizardNavigation } from './Wizard/WizardNavigation';

// UI COMPONENTS FOR THIS FEATURE
import { Step1_ProductInfo } from './AIConceptGenerator/Step1_ProductInfo';
import { Step2_AIComponent } from './AIConceptGenerator/Step2_AIComponent';
import { Step3_Details } from './AIConceptGenerator/Step3_Details';
import { Step4_Results, ResultCard, ResultCardTitle } from './AIConceptGenerator/Step4_Results';

// ICONS
import { 
    SparklesIcon, CheckIcon, FileTextIcon, ArrowLeftRightIcon, RefreshCwIcon, 
    MessageCircleQuestionIcon, BotMessageSquareIcon, ClipboardPenIcon, ArrowLeftIcon,
    LoaderIcon, ClipboardIcon
} from './icons/Icons';

// --- DATA ---
type Audience = "Emprendedores" | "Marketers" | "Desarrolladores" | "Público General" | "Otro...";
type Goal = "Generar Leads" | "Vender un Producto" | "Obtener Registros" | "Anunciar un Evento" | "Otro...";
type Tone = "Profesional" | "Amistoso" | "Urgente" | "Inspirador" | "Otro...";
type AiComponentType = "Asistente de Ventas (Chatbot)" | "FAQ Inteligente" | "Quiz Interactivo";

const audiences: Audience[] = ["Emprendedores", "Marketers", "Desarrolladores", "Público General", "Otro..."];
const goals: Goal[] = ["Generar Leads", "Vender un Producto", "Obtener Registros", "Anunciar un Evento", "Otro..."];
const tones: Tone[] = ["Profesional", "Amistoso", "Urgente", "Inspirador", "Otro..."];
const aiComponents: { name: AiComponentType; description: string; icon: React.FC<{className?: string}> }[] = [
    { name: "Asistente de Ventas (Chatbot)", description: "Un chatbot que responde preguntas y captura leads 24/7.", icon: BotMessageSquareIcon },
    { name: "FAQ Inteligente", description: "Una sección de FAQs que responde dudas al instante.", icon: MessageCircleQuestionIcon },
    { name: "Quiz Interactivo", description: "Un quiz que guía y califica a tus visitantes.", icon: ClipboardPenIcon },
];
const loadingMessages = [
    "Analizando tu producto...", "Identificando a tu audiencia...", "Consultando modelos de lenguaje avanzadosவைக்",
    "Escribiendo un titular impactante...", "Diseñando la estructura de conversión...", "Casi listo, puliendo los detalles..."
];

// --- HELPER COMPONENTS ---
const Tooltip = ({ content, children }: { content: string, children: React.ReactNode }) => (
    <div className="relative flex items-center group">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-cleat-dark text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {content}
        </div>
    </div>
);

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    };
    return (
        <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-primary rounded-full transition-colors" aria-label="Copiar">
            {isCopied ? <CheckIcon className="h-4 w-4 text-status-success" /> : <ClipboardIcon className="h-4 w-4" />}
        </button>
    );
};

const EditButton = () => {
    const { goToStep } = useWizardContext();
    return (
        <div className="mt-6 pt-6 border-t border-slate-200 flex justify-center">
            <button onClick={() => goToStep(3)} className="bg-slate-100 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-200 transition-all flex items-center gap-2">
                <ArrowLeftIcon className="h-5 w-5" />
                Volver y Editar
            </button>
        </div>
    );
};

// --- MAIN WRAPPER COMPONENT ---
const AIConceptGenerator: React.FC = () => {
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
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-xl min-h-[500px] flex flex-col">
                    <GeneratorWizard />
                </div>
            </div>
        </section>
    );
}

// --- WIZARD LOGIC & COMPOSITION ---
const GeneratorWizard: React.FC = () => {
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
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

    useEffect(() => {
        if (isLoading) {
            let i = 0;
            const interval = setInterval(() => {
                i = (i + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[i]);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    const getFinalInputs = () => ({
        finalAudience: selectedAudience === 'Otro...' ? customAudience : selectedAudience,
        finalGoal: selectedGoal === 'Otro...' ? customGoal : selectedGoal,
        finalTone: selectedTone === 'Otro...' ? customTone : selectedTone,
    });

    const handleGenerateConcept = async (controls: { goToStep: (step: number) => void; }) => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        controls.goToStep(4);

        const { finalAudience, finalGoal, finalTone } = getFinalInputs();
        if (!finalAudience.trim() || !finalGoal.trim() || !finalTone.trim()) {
            setError("Por favor, completa los campos personalizados.");
            setIsLoading(false);
            controls.goToStep(3);
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
            setResult(prev => prev ? { ...prev, headline: newHeadlineData.headline } : null);
        } catch (err) {
            console.error("Failed to regenerate headline");
        } finally {
            setIsRegenerating(false);
        }
    };

    const getIsNextDisabled = (step: number) => {
        if (step === 1) return !productInfo.what.trim() || !productInfo.problem.trim();
        if (step === 3) {
            const { finalAudience, finalGoal, finalTone } = getFinalInputs();
            return !finalAudience.trim() || !finalGoal.trim() || !finalTone.trim();
        }
        return false;
    };

    return (
        <Wizard onComplete={handleGenerateConcept} getIsNextDisabled={getIsNextDisabled}>
            <WizardStep title="Oferta">
                <Step1_ProductInfo productInfo={productInfo} handleInputChange={(e) => setProductInfo({...productInfo, [e.target.name]: e.target.value})} />
            </WizardStep>
            <WizardStep title="Componente IA">
                <Step2_AIComponent {...{ aiComponents, selectedAiComponent, setSelectedAiComponent }} />
            </WizardStep>
            <WizardStep title="Detalles">
                <Step3_Details {...{ audiences, goals, tones, selectedAudience, setSelectedAudience, customAudience, setCustomAudience, selectedGoal, setSelectedGoal, customGoal, setCustomGoal, selectedTone, setSelectedTone, customTone, setCustomTone, Tooltip, MessageCircleQuestionIcon }} />
            </WizardStep>
            <WizardStep title="Concepto">
                <Step4_Results {...{ isLoading, error, result, loadingMessage }}>
                    {result && (
                        <div className="space-y-6">
                            <ResultCard className="text-center">
                                <ResultCardTitle>Titular y Subtítulo</ResultCardTitle>
                                <p className="text-2xl font-bold text-cleat-dark">"{result.headline}"</p>
                                <p className="text-slate-600 mt-2">{result.subheadline}</p>
                                <div className="absolute top-2 right-2 flex items-center gap-1">
                                    <CopyButton textToCopy={`Titular: ${result.headline}\nSubtítulo: ${result.subheadline}`} />
                                    <button onClick={handleRegenerateHeadline} disabled={isRegenerating} className="p-1.5 text-slate-400 hover:text-primary rounded-full" aria-label="Regenerar titular">
                                        {isRegenerating ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <RefreshCwIcon className="h-4 w-4" />}
                                    </button>
                                </div>
                            </ResultCard>

                            {result.aiComponentSuggestion && (
                                <ResultCard className="bg-primary/10 border-2 border-dashed border-primary/30 text-center">
                                    <ResultCardTitle>Sugerencia para Componente IA: {result.aiComponentSuggestion.componentType}</ResultCardTitle>
                                    <p className="text-xl font-bold text-cleat-dark">"{result.aiComponentSuggestion.title}"</p>
                                    <p className="text-slate-600 mt-2 text-sm"><b>Sugerencia de prompt:</b> {result.aiComponentSuggestion.promptSuggestion}</p>
                                    <p className="text-slate-600 mt-1 text-sm"><b>Integración con el objetivo:</b> {result.aiComponentSuggestion.ctaIntegration}</p>
                                </ResultCard>
                            )}
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <ResultCard>
                                        <div className="flex items-center justify-between">
                                            <ResultCardTitle>Beneficios Clave</ResultCardTitle>
                                            <CopyButton textToCopy={result.keyBenefits.join('\n- ')} />
                                        </div>
                                        <ul className="space-y-2 mt-2">
                                            {result.keyBenefits.map((b, i) => <li key={i} className="flex items-start gap-2"><CheckIcon className="h-5 w-5 mt-0.5 text-status-success"/><span>{b}</span></li>)}
                                        </ul>
                                    </ResultCard>
                                    <ResultCard className="flex flex-col justify-center items-center">
                                        <ResultCardTitle>Llamada a la Acción (CTA)</ResultCardTitle>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="bg-primary text-white font-bold py-3 px-6 rounded-lg text-sm">{result.cta}</div>
                                            <CopyButton textToCopy={result.cta} />
                                        </div>
                                    </ResultCard>
                                    <ResultCard className="bg-slate-50/50 border-dashed">
                                        <div className="flex items-center justify-between">
                                            <ResultCardTitle icon={<ArrowLeftRightIcon className="h-4 w-4" />}>Idea para Prueba A/B</ResultCardTitle>
                                            <CopyButton textToCopy={result.abTestSuggestion.headline} />
                                        </div>
                                        <p className="text-slate-600 text-sm italic mt-2">Prueba este titular alternativo: "{result.abTestSuggestion.headline}"</p>
                                    </ResultCard>
                                </div>
                                
                                <div className="space-y-4">
                                    <ResultCard>
                                        <ResultCardTitle icon={<FileTextIcon className="h-4 w-4" />}>Esquema Visual de la Página</ResultCardTitle>
                                        <div className="mt-4 border-2 border-slate-200 rounded-lg p-3 bg-white space-y-2 shadow-inner">
                                            {result.pageOutline.map((item, i) => (
                                                <div key={i} className="p-2 rounded bg-slate-100 border border-slate-200">
                                                    <p className="font-semibold text-cleat-dark text-xs text-center">{item.section}</p>
                                                    <div className={`mt-1.5 ${item.section.toLowerCase().includes('hero') || item.section.toLowerCase().includes('cta') ? 'h-8 w-3/4' : 'h-4 w-full'} mx-auto bg-slate-300 rounded-sm`}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </ResultCard>
                                    <ResultCard>
                                        <ResultCardTitle>Sugerencias de Imágenes</ResultCardTitle>
                                        <ul className="space-y-2.5 mt-2">{result.imageSuggestions.map((item, i) => <li key={i}><p className="font-semibold text-sm">{item.section}:</p><p className="text-xs pl-2">{item.suggestion}</p></li>)}</ul>
                                    </ResultCard>
                                </div>
                            </div>

                            <EditButton />

                            <div className="mt-6 text-center bg-green-50 border-t-4 border-green-400 p-4 rounded-b-lg">
                                <h3 className="text-lg font-bold text-green-800">¡Tu Hoja de Ruta Estratégica está lista!</h3>
                                <p className="text-green-700 mt-1 text-sm">Ingresa tu email para recibir el plan completo.</p>
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
                </Step4_Results>
            </WizardStep>
        </Wizard>
    );
}

export default AIConceptGenerator;
