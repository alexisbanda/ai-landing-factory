import React from 'react';

interface ProductInfo {
    what: string;
    problem: string;
    features: string;
}

interface Step1Props {
    productInfo: ProductInfo;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Step1_ProductInfo = ({ productInfo, handleInputChange }: Step1Props) => {
    return (
        <div className="animate-fade-in-up space-y-6">
            <div className="text-center">
                 <h2 className="text-xl font-bold text-cleat-dark">Cuéntanos sobre tu idea</h2>
                 <p className="text-sm text-slate-500">Sé específico para obtener los mejores resultados.</p>
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="what" className="block text-sm font-semibold text-slate-700 mb-1">1. ¿Qué producto, servicio u oferta quieres promocionar?</label>
                    <input type="text" id="what" name="what" value={productInfo.what} onChange={handleInputChange} placeholder="Ej: Una app de yoga para principiantes" className="w-full p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label htmlFor="problem" className="block text-sm font-semibold text-slate-700 mb-1">2. ¿Cuál es el principal problema que resuelve?</label>
                    <input type="text" id="problem" name="problem" value={productInfo.problem} onChange={handleInputChange} placeholder="Ej: Ayuda a la gente a empezar a hacer ejercicio sin sentirse intimidada" className="w-full p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label htmlFor="features" className="block text-sm font-semibold text-slate-700 mb-1">3. Menciona 1 o 2 características clave (opcional)</label>
                    <input type="text" id="features" name="features" value={productInfo.features} onChange={handleInputChange} placeholder="Ej: Clases en vivo y seguimiento personalizado" className="w-full p-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
            </div>
        </div>
    );
};