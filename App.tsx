import React, { useState, useState as useReactState } from 'react';
import { PromotionProvider, usePromotion } from './contexts/PromotionContext';
import PromotionBar from './components/PromotionBar';
import PromotionModal from './components/PromotionModal';
import Header from './components/Header';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import FeaturesTabs from './components/FeaturesTabs';
import HowItWorks from './components/HowItWorks/HowItWorks';
import PlatformGrid from './components/PlatformGrid';
import Showcase from './components/Showcase';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Trust from './components/Trust';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Footer from './components/Footer';
import ContextualCta from './components/ContextualCta';
import ScrollToTopButton from './components/ScrollToTopButton';
import DemoModal from './components/DemoModal';
import ContactModal from './components/ContactModal';
import AIConceptGenerator from './components/AIConceptGenerator';

// =================================================================
// COMPONENT VISIBILITY CONFIGURATION
// =================================================================
// Set any of these to `false` to hide the corresponding section from the page.
const sectionVisibility = {
  hero: true,
  featuresTabs: true,
  howItWorks: true,
  aiConceptGenerator: true, // New AI assistant section
  platformGrid: true,
  showcase: true,
  stats: false,
  testimonials: true,
  trust: false,
  pricing: true,
  faq: true,
  cta: true,
};
// =================================================================


const AppContent: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useReactState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useReactState(false);
  const [closedPromotionIds, setClosedPromotionIds] = useReactState<string[]>([]);
  const { promotions } = usePromotion();

  const handleOpenDemoModal = () => setIsDemoModalOpen(true);
  const handleCloseDemoModal = () => setIsDemoModalOpen(false);

  const handleOpenContactModal = () => setIsContactModalOpen(true);
  const handleCloseContactModal = () => setIsContactModalOpen(false);

  const handleClosePromotion = (id: string) => {
    setClosedPromotionIds((prev) => [...prev, id]);
  };

  // Render PromotionBar(s) at the top
  const activeBars = promotions.filter(p => p.type === 'bar' && !closedPromotionIds.includes(p.id));
  // Render PromotionModal(s) as pop-ups
  const activeModals = promotions.filter(p => p.type === 'modal' && !closedPromotionIds.includes(p.id));

  // Modal promo: solo mostrar tras scroll y esperar unos segundos
  const [showPromoModal, setShowPromoModal] = React.useState(false);
  React.useEffect(() => {
    let scrolled = false;
    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 100) {
        scrolled = true;
        timer = setTimeout(() => setShowPromoModal(true), 2000); // 2 segundos tras scroll
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Función para mostrar precios (scroll a sección pricing)
  const handleOpenPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white font-sans text-gray-600">
      {activeBars.map(promo => (
        <PromotionBar key={promo.id} promotion={promo} onClose={() => handleClosePromotion(promo.id)} onOpenPricing={handleOpenPricing} />
      ))}
      <Header onOpenDemoModal={handleOpenDemoModal} onOpenContactModal={handleOpenContactModal} />
      <main>
        {sectionVisibility.hero && (
          <>
            <Hero onOpenDemoModal={handleOpenDemoModal} onOpenContactModal={handleOpenContactModal} />
          </>
        )}
        {sectionVisibility.featuresTabs && (
          <>
            <FeaturesTabs />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.howItWorks && (
          <>
            <HowItWorks />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.aiConceptGenerator && (
          <>
            <AIConceptGenerator />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.platformGrid && (
          <>
            <PlatformGrid />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.showcase && (
          <>
            <Showcase />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.stats && (
          <>
            <Stats />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.testimonials && (
          <>
            <Testimonials />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.trust && (
          <>
            <Trust />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.pricing && (
          <>
            <Pricing onOpenContactModal={handleOpenContactModal} />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.faq && (
          <>
            <Faq />
            <SectionDivider />
          </>
        )}
        {sectionVisibility.cta && (
          <Cta onOpenDemoModal={handleOpenDemoModal} onOpenContactModal={handleOpenContactModal} />
        )}
      </main>
      <ContextualCta onOpenDemoModal={handleOpenDemoModal} onOpenContactModal={handleOpenContactModal} />
      <ScrollToTopButton />
      <Footer onOpenDemoModal={handleOpenDemoModal} />
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemoModal} />
      <ContactModal isOpen={isContactModalOpen} onClose={handleCloseContactModal} />
      {activeModals.map(promo => (
        showPromoModal && <PromotionModal key={promo.id} promotion={promo} onClose={() => { handleClosePromotion(promo.id); setShowPromoModal(false); }} onOpenContactModal={handleOpenContactModal} />
      ))}
    </div>
  );
};

const App: React.FC = () => (
  <PromotionProvider>
    <AppContent />
  </PromotionProvider>
);

export default App;