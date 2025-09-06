import React from 'react';
import { FileTextIcon, SparklesIcon, GavelIcon, HeartHandshakeIcon, TrophyIcon, FileSearchIcon, ArrowLeftRightIcon } from '../../icons/Icons';

// Mapa centralizado de componentes de iconos. Exportado para su uso en otros componentes.
export const iconComponents: { [key: string]: React.FC<{ className?: string }> } = {
    FileTextIcon,
    SparklesIcon,
    GavelIcon,
    HeartHandshakeIcon,
    TrophyIcon,
    FileSearchIcon,
    ArrowLeftRightIcon
};


interface DefaultIconDisplayProps {
    step: any;
    animClass: (className: string) => string;
}

export const DefaultIconDisplay: React.FC<DefaultIconDisplayProps> = ({ step, animClass }) => {
    const IconComponent = iconComponents[step.icon as keyof typeof iconComponents];
    return (
     <div className={`z-10 grid aspect-square w-[100px] place-items-center rounded-3xl border ${step.colors.bg} ${step.colors.border} ${step.colors.text} ${animClass('animate-icon-pop')}`}>
        {IconComponent && <IconComponent className="h-10 w-10" />}
    </div>
)};
