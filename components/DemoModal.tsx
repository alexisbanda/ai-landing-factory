import React from 'react';
import Modal from './Modal';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  // IMPORTANT: Replace this placeholder URL with your actual Calendly link.
  const calendlyUrl = "https://calendly.com/your-username/30min";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Agenda una Demostración Personalizada"
      size="3xl"
    >
      <div className="flex flex-col gap-4">
        <p className="text-slate-600 text-center">
          Elige un horario que te convenga para una demostración 1-a-1. Veremos cómo VANLANDINGS puede ayudarte a alcanzar tus objetivos de conversión.
        </p>
        
        {/* Responsive Calendly embed: Uses a padding-bottom trick to maintain aspect ratio */}
        <div className="relative h-0 pb-[125%] overflow-hidden border border-slate-200 rounded-lg">
          <iframe
            src={calendlyUrl}
            className="absolute top-0 left-0 w-full h-full border-0"
            title="Agendar una demostración con Calendly"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
    </Modal>
  );
};

export default DemoModal;
