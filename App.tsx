import React, { useState } from 'react';
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


const App: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleOpenDemoModal = () => setIsDemoModalOpen(true);
  const handleCloseDemoModal = () => setIsDemoModalOpen(false);

  const handleOpenContactModal = () => setIsContactModalOpen(true);
  const handleCloseContactModal = () => setIsContactModalOpen(false);


  return (
    <div className="bg-white font-sans text-gray-600">
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
    </div>
  );
};

export default App;