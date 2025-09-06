import React from 'react';
import Modal from './Modal';
import { GoogleIcon } from './icons/Icons';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    onClose(); // Close modal on submission for now
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crea tu Cuenta Gratis"
      size="md"
    >
      <div className="flex flex-col gap-5">
        <p className="text-center text-slate-600">
          Únete a miles de creadores y empieza a construir tu próxima página de aterrizaje en segundos.
        </p>

        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
          <GoogleIcon className="h-6 w-6" />
          <span>Regístrate con Google</span>
        </button>

        <div className="flex items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-sm">O</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              required
              placeholder="Ej: Ana García"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email de Trabajo</label>
            <input 
              type="email" 
              id="email"
              name="email"
              required
              placeholder="ana.garcia@empresa.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password-signup" className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              id="password-signup"
              name="password"
              required
              minLength={8}
              placeholder="8+ caracteres"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Crear Cuenta
          </button>
        </form>

        <div className="text-center text-sm text-slate-500">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <a href="#" className="font-semibold text-primary hover:underline">
              Iniciar Sesión
            </a>
          </p>
          <p className="mt-2 text-xs">
            Al registrarte, aceptas nuestros{' '}
            <a href="#" className="underline">Términos de Servicio</a> y{' '}
            <a href="#" className="underline">Política de Privacidad</a>.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;