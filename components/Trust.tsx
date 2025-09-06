
import React from 'react';
import { ShieldIcon, LockIcon, DatabaseIcon, CircleCheckBigIcon, MessageSquareIcon, ClockIcon, ThumbsUpIcon } from './icons/Icons';

const Trust: React.FC = () => {
    const securityFeatures = [
        { icon: <ShieldIcon />, title: "Protección de Datos Robusta", description: "Tus datos están protegidos con las mejores prácticas de la industria." },
        { icon: <LockIcon />, title: "Cifrado AES-256", description: "Protección de grado militar en tránsito y en reposo." },
        { icon: <DatabaseIcon />, title: "Privacidad Garantizada", description: "Tus datos nunca se utilizan para entrenar nuestros modelos de IA." },
        { icon: <CircleCheckBigIcon />, title: "Control de Acceso", description: "Gestiona los permisos de tu equipo con roles de usuario." }
    ];

    const supportMetrics = [
        { icon: <MessageSquareIcon />, value: "24/7", label: "Soporte por Chat" },
        { icon: <ClockIcon />, value: "< 24h", label: "Tiempo de Respuesta" },
        { icon: <ThumbsUpIcon />, value: "98%", label: "Tasa de Satisfacción" }
    ];

    return (
        <section id="trust" className="py-16 md:py-20 bg-gray-50/50">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 mb-4">
                        <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">Construido sobre una Base de Confianza</span>
                    </h2>
                    <h3 className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Tu éxito es nuestra prioridad. Por eso combinamos seguridad de nivel empresarial con un soporte al cliente excepcional.
                    </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Security Section */}
                    <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-lg">
                        <h3 className="text-2xl font-bold text-cleat-dark mb-6 text-center lg:text-left">Seguridad de Nivel Empresarial</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                            {securityFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 text-primary/90 mt-1">{React.cloneElement(feature.icon, { className: 'h-6 w-6' })}</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{feature.title}</p>
                                        <p className="text-sm text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-lg h-full flex flex-col">
                        <h3 className="text-2xl font-bold text-cleat-dark mb-6 text-center lg:text-left">Soporte Dedicado</h3>
                        <div className="flex-grow">
                            <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700">
                                "Este ha sido un gran soporte. Muchas gracias, aprecio su rápida respuesta y resolución. Servicio de 5 estrellas."
                                <cite className="block not-italic mt-2 font-medium text-gray-900">- Jim S.</cite>
                            </blockquote>
                        </div>
                        <div className="mt-8 border-t border-gray-200 pt-6 grid grid-cols-3 gap-4 text-center">
                            {supportMetrics.map((metric, index) => (
                                <div key={index} className="flex flex-col items-center justify-center gap-1">
                                    <div className="h-8 w-8 text-primary">{metric.icon}</div>
                                    <p className="text-xl font-semibold text-primary">{metric.value}</p>
                                    <p className="text-xs text-gray-600">{metric.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Trust;
