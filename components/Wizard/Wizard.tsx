import React, { createContext, useContext, ReactNode } from 'react';
import { useWizard } from '../../hooks/useWizard';
import { WizardProgressBar } from './WizardProgressBar';
import { WizardNavigation } from './WizardNavigation';
import { WizardStepProps } from './WizardStep';

// 1. Define the shape of the context
interface WizardContextType {
    currentStep: number;
    totalSteps: number;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    onComplete: (controls: { goToStep: (step: number) => void; }) => void;
    stepTitles: string[];
}

// 2. Create the context
const WizardContext = createContext<WizardContextType | undefined>(undefined);

// 3. Create a custom hook for easy consumption
export const useWizardContext = () => {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizardContext must be used within a Wizard provider');
    }
    return context;
};

// 4. Define the main Wizard component props
interface WizardProps {
    children: React.ReactElement<WizardStepProps>[] | React.ReactElement<WizardStepProps>;
    onComplete: (controls: { goToStep: (step: number) => void; }) => void;
    getIsNextDisabled?: (step: number) => boolean;
}

// 5. Create the main Wizard component
export const Wizard = ({ children, onComplete, getIsNextDisabled = () => false }: WizardProps) => {
    const steps = React.Children.toArray(children) as React.ReactElement<WizardStepProps>[];
    const totalSteps = steps.length;
    const stepTitles = steps.map(step => step.props.title);

    const wizardState = useWizard({ totalSteps });

    const contextValue: WizardContextType = {
        ...wizardState,
        onComplete,
        stepTitles,
    };

    const activeStepComponent = steps[wizardState.currentStep - 1];
    const isNextDisabled = getIsNextDisabled(wizardState.currentStep);

    return (
        <WizardContext.Provider value={contextValue}>
            <WizardProgressBar />
            <div className="flex-grow flex flex-col justify-center mt-6">
                {activeStepComponent}
            </div>
            <WizardNavigation isNextDisabled={isNextDisabled} />
        </WizardContext.Provider>
    );
};