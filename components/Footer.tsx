import React from 'react';
import { Logo, LinkedInIcon, YouTubeIcon, XSocialIcon } from './icons/Icons';

interface FooterProps {
  onOpenDemoModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenDemoModal }) => {
  const footerLinks = {
    Plataforma: [
      { text: "Características", href: "#features" },
      { text: "Cómo Funciona", href: "#how-it-works" },
      { text: "Galería", href: "#showcase" },
      { text: "Precios", href: "#pricing" },
    ],
    Recursos: [
      { text: "Testimonios", href: "#testimonials" },
      { text: "FAQs", href: "#faqs" },
      { text: "Agendar Demo", action: onOpenDemoModal },
      { text: "Blog", href: "#" }, // Placeholder
    ],
    Empresa: [
      { text: "Contacto", href: "#" },
      { text: "Política de Privacidad", href: "#" },
      { text: "Términos y Condiciones", href: "#" },
    ],
  };

  return (
    <footer className="bg-cleat-dark text-gray-400">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* Brand and social section */}
            <div className="lg:col-span-5">
              <a href="#" className="inline-block mb-6">
                <Logo className="h-10 w-auto" variant="light" />
              </a>
              <p className="max-w-xs text-base leading-relaxed">
                La plataforma IA que transforma tus ideas en páginas de aterrizaje de alto rendimiento en minutos, no semanas.
              </p>
              <div className="mt-8 flex items-center space-x-2">
                <a href="#" aria-label="LinkedIn" className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-300">
                  <LinkedInIcon />
                </a>
                <a href="#" aria-label="YouTube" className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-300">
                  <YouTubeIcon />
                </a>
                <a href="#" aria-label="X" className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-300">
                  <XSocialIcon />
                </a>
              </div>
            </div>

            {/* Links section */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h3 className="text-base font-semibold tracking-wider text-white">{title}</h3>
                  <ul className="mt-4 space-y-3">
                    {links.map(link => (
                      <li key={link.text}>
                        {'href' in link ? (
                           <a href={(link as {href: string}).href} className="inline-block text-gray-400 transition-all duration-300 hover:text-primary hover:translate-x-1">
                             {link.text}
                           </a>
                        ) : (
                          <button onClick={(link as {action: () => void}).action} className="inline-block text-left text-gray-400 transition-all duration-300 hover:text-primary hover:translate-x-1">
                            {link.text}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 py-6 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} VANLANDINGS. Todos los derechos reservados.
            </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;