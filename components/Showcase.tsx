import React, { useState, useMemo } from 'react';
import { EyeIcon } from './icons/Icons';
import Modal from './Modal';

// =================================================================
// Data
// =================================================================
interface Template {
  id: number;
  title: string;
  category: string;
  image: string;
  previewImage: string;
  demoUrl: string;
}

const templates: Template[] = [
  { 
    id: 1, 
    title: "Vancouver Landings", 
    category: "Agencia", 
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "#" 
  },
  { 
    id: 2, 
    title: "Invercorp", 
    category: "Finanzas", 
    image: "https://images.unsplash.com/photo-1665686310934-865eb9941a1d?q=80&w=2874&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1665686310934-865eb9941a1d?q=80&w=2874&auto=format&fit=crop", 
    demoUrl: "#" 
  },
  { 
    id: 3, 
    title: "Ecuatorianos en Canadá", 
    category: "Comunidad", 
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "#" 
  },
  { 
    id: 4, 
    title: "DentalCare", 
    category: "Salud", 
    image: "https://images.unsplash.com/photo-1588776814546-da637f43b7fe?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1588776814546-da637f43b7fe?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "#" 
  },
  { 
    id: 5, 
    title: "Leadership Landing", 
    category: "Portfolio", 
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2942&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2942&auto=format&fit=crop", 
    demoUrl: "#" 
  },
  { 
    id: 6, 
    title: "ASOECBC", 
    category: "Comunidad", 
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2874&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2874&auto=format&fit=crop", 
    demoUrl: "#" 
  },
  { 
    id: 7, 
    title: "Vancouver Coffee Co.", 
    category: "Negocio Local", 
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2787&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2787&auto=format&fit=crop", 
    demoUrl: "#" 
  },
  { 
    id: 8, 
    title: "Freelancer Landing", 
    category: "Portfolio", 
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop", 
    demoUrl: "#" 
  },
  { 
    id: 9, 
    title: "Billybon Detalles", 
    category: "E-commerce", 
    image: "https://images.unsplash.com/photo-1599745588545-c9c051a83a18?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1599745588545-c9c051a83a18?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "#" 
  }
];

const categories = ["Todos", "Agencia", "Negocio Local", "Portfolio", "Comunidad", "E-commerce", "Salud", "Finanzas"];

// =================================================================
// Sub-components
// =================================================================

// Card Component for a single template
const ShowcaseCard: React.FC<{ template: Template; onClick: () => void; index: number; }> = ({ template, onClick, index }) => (
  <button
    onClick={onClick}
    className="group animate-fade-in-up relative block w-full text-left overflow-hidden rounded-lg shadow-lg border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 aspect-video bg-slate-200"
    style={{ animationDelay: `${50 + index * 50}ms` }}
  >
    <img 
      src={template.image} 
      alt={template.title} 
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
      loading="lazy"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" aria-hidden="true" />
    <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-white">{template.title}</h3>
        <p className="text-sm text-slate-200">{template.category}</p>
      </div>
    </div>
  </button>
);

// Filter buttons component
const ShowcaseFilters: React.FC<{ activeFilter: string; onFilterChange: (filter: string) => void; }> = ({ activeFilter, onFilterChange }) => (
  <div className="flex justify-center mb-10">
    <div className="flex flex-wrap justify-center gap-2 rounded-full bg-white/60 p-2 shadow-md backdrop-blur-sm border border-slate-200/80">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            activeFilter === category
              ? 'bg-primary text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          aria-pressed={activeFilter === category}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

// Modal for template preview
const ShowcaseModal: React.FC<{ template: Template | null; onClose: () => void; }> = ({ template, onClose }) => {
  if (!template) return null;

  return (
    <Modal
      isOpen={!!template}
      onClose={onClose}
      title={`Vista Previa: ${template.title}`}
      size="4xl"
    >
      <div className="space-y-4">
        <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
          <img 
            src={template.previewImage} 
            alt={`Preview of ${template.title}`}
            className="w-full h-auto rounded"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 p-2">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
          >
            Cerrar
          </button>
          <a 
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-opacity-90 transition-all hover:scale-105"
          >
            <EyeIcon className="h-4 w-4" />
            Ver Demo en Vivo
          </a>
        </div>
      </div>
    </Modal>
  );
};


// =================================================================
// Main Component
// =================================================================
const Showcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = useMemo(() => {
    if (activeFilter === "Todos") {
      return templates;
    }
    return templates.filter(t => t.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <section id="showcase" className="py-16 md:py-20 bg-slate-50/70">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 mb-4">
              Creado con <span className="bg-gradient-to-r from-primary to-cleat-dark bg-clip-text text-transparent">VANLANDINGS</span>
            </h2>
            <h3 className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explora una selección de páginas creadas por nuestra comunidad. Empieza con un diseño profesional y adáptalo a tu marca.
            </h3>
          </div>

          <ShowcaseFilters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTemplates.map((template, index) => (
              <ShowcaseCard
                key={template.id}
                template={template}
                onClick={() => setSelectedTemplate(template)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <ShowcaseModal 
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
      
      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation-name: fade-in-up;
            animation-duration: 0.5s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
            opacity: 0;
        }
      `}</style>
    </>
  );
};

export default Showcase;