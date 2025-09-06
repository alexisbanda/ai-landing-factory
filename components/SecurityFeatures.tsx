import React from 'react';
import { ShieldIcon, LockIcon, DatabaseIcon, CircleCheckBigIcon } from './icons/Icons';

const SecurityFeatures: React.FC = () => {
  const features = [
    { icon: <ShieldIcon />, title: "Protección de Datos Robusta", description: "Los datos de tus clientes y campañas están protegidos con las mejores prácticas de la industria" },
    { icon: <LockIcon />, title: "Cifrado AES-256", description: "Protección de datos de grado militar en tránsito y en reposo" },
    { icon: <DatabaseIcon />, title: "Privacidad de Datos", description: "Tus valiosos datos nunca se utilizan para entrenar a la IA" },
    { icon: <CircleCheckBigIcon />, title: "Control de Acceso Granular", description: "Gestiona los permisos del equipo con las opciones de usuario disponibles" }
  ];

  return (
    <section id="security-features" className="py-12 bg-gray-50/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 mb-4">
            <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">Seguridad de Nivel</span> Empresarial
          </h2>
          <h3 className="text-lg text-gray-600 max-w-3xl mx-auto">
            La seguridad de tus datos es nuestra máxima prioridad. VANLANDINGS implementa medidas de seguridad líderes en la industria para proteger tu información sensible.
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center justify-start gap-2 text-center">
              <div className="text-primary/90 drop-shadow-sm h-8 w-8">{feature.icon}</div>
              <p className="font-semibold text-gray-900">{feature.title}</p>
              <p className="text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;