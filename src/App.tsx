import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LiveShipmentVisual } from './components/LiveShipmentVisual';
import { TrackShipmentSection } from './components/TrackShipmentSection';
import { WhyFreightreeSection } from './components/WhyFreightreeSection';
import { GlobalNetworkSection } from './components/GlobalNetworkSection';
import { AboutSection } from './components/AboutSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ExpertModal } from './components/ExpertModal';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [isExpertOpen, setIsExpertOpen] = useState(false);
  const [quoteServicePrefill, setQuoteServicePrefill] = useState('');
  const [quoteRoutePrefill, setQuoteRoutePrefill] = useState('');

  const scrollToQuote = (service?: string, route?: string) => {
    if (service) setQuoteServicePrefill(service);
    if (route) setQuoteRoutePrefill(route);

    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTrack = () => {
    const trackElement = document.getElementById('track');
    if (trackElement) {
      trackElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Sticky Header with Navigation, Logo & Direct Contacts */}
      <Header
        onOpenQuote={() => scrollToQuote()}
        onOpenTrack={scrollToTrack}
      />

      <main className="flex-grow">
        {/* Homepage Hero Section with Live Logistics Movement Concept */}
        <HeroSection
          onOpenQuote={() => scrollToQuote()}
          onOpenExpert={() => setIsExpertOpen(true)}
        />

        {/* 6 Specialized Logistics Services Section */}
        <ServicesSection
          onSelectServiceForQuote={(srvTitle) => scrollToQuote(srvTitle)}
        />

        {/* How It Works: 8-Phase Visual Workflow with Animated Connections */}
        <HowItWorksSection />

        {/* Live Shipment / Movement Visualizer Control Center */}
        <LiveShipmentVisual
          onBookCorridor={(routeInfo) => scrollToQuote('Ocean Freight', routeInfo)}
          onOpenTrack={scrollToTrack}
        />

        {/* Dedicated Shipment Status & B/L Tracking Portal */}
        <TrackShipmentSection />

        {/* Why FREIGHTREE LLP Section with 7 Core Pillars */}
        <WhyFreightreeSection
          onOpenQuote={() => scrollToQuote()}
        />

        {/* Global Network Hubs and Trade Corridors */}
        <GlobalNetworkSection
          onSelectHubForQuote={(hubRegion) => scrollToQuote('Ocean Freight', `India ➔ ${hubRegion}`)}
        />

        {/* About FREIGHTREE Company Introduction & Verified Credentials */}
        <AboutSection
          onOpenQuote={() => scrollToQuote()}
        />

        {/* Prominent Quote Request Form Configured for docs@freightree.in */}
        <QuoteFormSection
          initialService={quoteServicePrefill}
          initialRoute={quoteRoutePrefill}
        />

        {/* Contact Section with Verified Details & Google Maps Embed */}
        <ContactSection />
      </main>

      {/* Corporate Footer with GSTIN, Links & Legal Terms */}
      <Footer />

      {/* Expert Consultation Dialog */}
      <ExpertModal
        isOpen={isExpertOpen}
        onClose={() => setIsExpertOpen(false)}
        onOpenQuote={() => scrollToQuote()}
      />

      {/* Floating Action Pill & WhatsApp Widget */}
      <FloatingActions
        onOpenQuote={() => scrollToQuote()}
      />
    </div>
  );
}
