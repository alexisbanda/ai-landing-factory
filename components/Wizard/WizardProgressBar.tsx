import React from 'react';
import { useWizardContext } from './Wizard';

export const WizardProgressBar = () => {
    const { currentStep, totalSteps, stepTitles } = useWizardContext();
    const currentStepName = stepTitles[currentStep - 1];
    const progressPercentage = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;

    return (
        <div className="w-full">
            {/* Progress Bar Line */}
            <div className="relative h-2 w-full rounded-full bg-slate-200">
                <div 
                    className="absolute top-0 left-0 h-2 rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
            
            {/* Desktop Labels */}
            <div className="mt-2 hidden sm:grid text-center text-sm font-semibold text-slate-500" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
                {stepTitles.map((title, index) => (
                    <span key={index} className={currentStep >= (index + 1) ? 'text-primary' : ''}>{title}</span>
                ))}
            </div>

            {/* Mobile Label */}
            <div className="mt-3 text-center sm:hidden">
                <p className="text-sm font-semibold text-primary">
                    Paso {currentStep} de {totalSteps}: <span className="text-cleat-dark font-bold">{currentStepName}</span>
                </p>
            </div>
        </div>
    );
};