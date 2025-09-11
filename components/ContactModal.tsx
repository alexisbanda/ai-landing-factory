import React, { useState } from 'react';
import Modal from './Modal';
import { SendPlaneIcon } from './icons/Icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Handle error - maybe show an error message to the user
        console.error("Form submission failed");
        alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
      // Reset form after a delay
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setIsSubmitted(false);
        }, 300);
      }, 2500);
    }
  };

  const InputField = ({ id, name, type, placeholder, required, icon }) => (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
      />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSubmitted ? "¡Gracias!" : "Hablemos"}
      size="md"
    >
      {isSubmitted ? (
        <div className="text-center px-4 py-8 transition-all duration-300 ease-in-out">
          <div className="flex justify-center items-center mb-4">
            <svg className="w-16 h-16 text-green-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Mensaje Enviado</h3>
          <p className="text-slate-600">Nos pondremos en contacto contigo pronto.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <p className="text-center text-slate-600 -mt-2">
            ¿Listo para llevar tu negocio al siguiente nivel? Completa el formulario y empecemos a crear algo increíble juntos.
          </p>

          <form 
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit} 
            className="space-y-5"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
            </p>
            <InputField
              id="contact-name"
              name="name"
              type="text"
              placeholder="Tu Nombre"
              required
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>}
            />
            <InputField
              id="contact-email"
              name="email"
              type="email"
              placeholder="Tu Email"
              required
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>}
            />
            <div className="relative">
              <label htmlFor="contact-message" className="sr-only">Tu Mensaje</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group flex items-center justify-center gap-3 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-[1.02] disabled:bg-opacity-70 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
              <SendPlaneIcon className={`h-5 w-5 transition-transform duration-500 ease-in-out ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
            </button>
          </form>

          <div className="text-center text-sm text-slate-500">
            <p>También puedes contactarnos en <a href="mailto:hola@vanlandings.com" className="font-semibold text-primary hover:underline">hola@vanlandings.com</a></p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ContactModal;
