import React, { useState, useEffect, useId } from 'react';
import { FaqItem } from '../types';
import { fetchStaticFaqData, fetchFaqFromGemini } from '../services/geminiService';
import { PlusIcon, MinusIcon } from './icons/Icons';

// =================================================================
// CONFIGURATION
// =================================================================
// Set to `true` to use the live Gemini API.
// Set to `false` to use the reliable, static FAQ data and avoid API rate limits.
const faqConfig = {
  useGeminiApi: false,
};
// =================================================================


// Skeleton component for a better loading experience
const FaqSkeletonComponent: React.FC = () => (
  <div className="w-full space-y-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="w-full animate-pulse rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-3/4 rounded bg-slate-200"></div>
          <div className="h-5 w-5 rounded-full bg-slate-200"></div>
        </div>
      </div>
    ))}
  </div>
);

const FaqSkeleton = React.memo(FaqSkeletonComponent);

const FaqAccordionItemComponent: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  const uniqueId = useId();
  const panelId = `faq-panel-${uniqueId}`;

  return (
    <div className={`overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 ${isOpen ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}>
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-cleat-dark"
      >
        <span className="flex-1">{item.question}</span>
        {isOpen 
            ? <MinusIcon className="h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ease-in-out" />
            : <PlusIcon className="h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ease-in-out" />
        }
      </button>
      <div
        className="grid transition-all duration-500 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div id={panelId} role="region" className="min-h-0 overflow-hidden">
          <div className={`border-t border-slate-200 px-6 pb-6 pt-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div
              className="prose prose-slate max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqAccordionItem = React.memo(FaqAccordionItemComponent);

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [faqData, setFaqData] = useState<FaqItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(faqConfig.useGeminiApi);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFaqs = async () => {
            if (faqConfig.useGeminiApi) {
                setIsLoading(true);
                setError(null);
                try {
                    const data = await fetchFaqFromGemini();
                    setFaqData(data);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching data.');
                    // As a fallback, load static data on API error
                    const staticData = await fetchStaticFaqData();
                    setFaqData(staticData);
                } finally {
                    setIsLoading(false);
                }
            } else {
                // Load static data directly
                const data = await fetchStaticFaqData();
                setFaqData(data);
            }
        };

        loadFaqs();
    }, []);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
        <section id="faqs" className="py-16 md:py-20 bg-slate-50/70">
            <div className="container mx-auto max-w-3xl px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
                        Preguntas Frecuentes
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        ¿Tienes preguntas? Tenemos respuestas. Si no encuentras lo que buscas, no dudes en contactarnos.
                    </p>
                </div>
                
                <div className="space-y-4">
                   {isLoading ? (
                        <FaqSkeleton />
                   ) : error ? (
                        <div className="text-center text-status-error bg-red-100 p-4 rounded-lg">
                            <p className="font-semibold">Error fetching FAQ data from Gemini API:</p>
                            <p>{error}</p>
                            <p className="mt-2 text-sm text-slate-600">Displaying default questions as a fallback.</p>
                        </div>
                   ) : null}

                   {/* Always render the data, which will be static data in case of error */}
                   {!isLoading && faqData.length > 0 && (
                        faqData.map((faq, index) => (
                            <FaqAccordionItem
                                key={index}
                                item={faq}
                                isOpen={openIndex === index}
                                onClick={() => handleToggle(index)}
                            />
                        ))
                   )}
                </div>
            </div>
        </section>
    );
};
  
export default Faq;