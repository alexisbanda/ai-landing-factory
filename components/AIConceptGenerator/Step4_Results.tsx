import React from 'react';
import { LandingConcept } from '../../services/geminiService';
import { LoaderIcon } from '../icons/Icons';
import { useWizardContext } from '../Wizard/Wizard';

// Define props
interface Step4Props {
    isLoading: boolean;
    error: string | null;
    result: LandingConcept | null;
    loadingMessage: string;
    children: React.ReactNode; // To render the result sections
}

export const Step4_Results = (props: Step4Props) => {
    const { isLoading, error, result, loadingMessage, children } = props;
    const { goToStep } = useWizardContext(); // Use context to get navigation

    return (
        <div className="animate-fade-in-up">
            {isLoading && (
                <div className="flex flex-col items-center gap-4 text-primary text-center min-h-[300px] justify-center">
                    <LoaderIcon className="h-12 w-12 animate-spin" />
                    <p className="text-xl font-semibold text-cleat-dark transition-opacity duration-300">{loadingMessage}</p>
                </div>
            )}
            {error && (
                <div className="text-center text-status-error bg-red-100 p-4 rounded-lg">
                    <p className="font-semibold">Error al generar el concepto:</p>
                    <p>{error}</p>
                    <button onClick={() => goToStep(3)} className="mt-4 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90">
                        Intentar de Nuevo
                    </button>
                </div>
            )}
            {result && children}
        </div>
    );
};

// I'll also create specific sub-components for displaying parts of the result
// to keep the main generator file clean.

interface ResultCardProps {
    children: React.ReactNode;
    className?: string;
}
export const ResultCard = ({ children, className = '' }: ResultCardProps) => (
    <div className={`p-4 rounded-lg bg-slate-50 border border-slate-200 ${className}`}>
        {children}
    </div>
);

interface ResultCardTitleProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
}
export const ResultCardTitle = ({ children, icon }: ResultCardTitleProps) => (
    <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-primary tracking-wider mb-3">
        {icon}
        {children}
    </h3>
);