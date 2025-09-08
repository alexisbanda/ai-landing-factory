import React, { ReactNode } from 'react';

export interface WizardStepProps {
    children: ReactNode;
    title: string; // This will be used by the progress bar
}

export const WizardStep = ({ children }: WizardStepProps) => {
    // This component doesn't render anything by itself.
    // It's a data container for the main Wizard component to read.
    // The actual content is rendered by the Wizard component.
    return <>{children}</>;
};
