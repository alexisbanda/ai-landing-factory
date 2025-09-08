import React from 'react';
import { useWizardContext } from './Wizard';
import { SparklesIcon } from '../icons/Icons'; // Assuming this icon is available

interface WizardNavigationProps {
    nextLabel?: string;
    backLabel?: string;
    completeLabel?: string;
    isNextDisabled?: boolean;
}

export const WizardNavigation = ({ 
    nextLabel = 'Siguiente', 
    backLabel = 'Anterior', 
    completeLabel = 'Generar', 
    isNextDisabled = false 
}: WizardNavigationProps) => {
    const { 
        prevStep, 
        nextStep, 
        isFirstStep, 
        isLastStep, 
        onComplete,
        goToStep
    } = useWizardContext();

    const handleNextClick = () => {
        if (isLastStep) {
            onComplete({ goToStep });
        } else {
            nextStep();
        }
    };

    return (
        <div className={`w-full flex pt-4 ${isFirstStep ? 'justify-end' : 'justify-between'}`}>
            {!isFirstStep && (
                <button 
                    onClick={prevStep} 
                    className="bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-lg hover:bg-slate-300 transition-all"
                >
                    {backLabel}
                </button>
            )}
            <button 
                onClick={handleNextClick} 
                disabled={isNextDisabled}
                className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
                {isLastStep && <SparklesIcon className="h-5 w-5" />}
                {isLastStep ? completeLabel : nextLabel}
            </button>
        </div>
    );
};