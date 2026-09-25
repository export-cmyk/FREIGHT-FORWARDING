import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import {
  Ship,
  Truck,
  Plane,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Activity,
  CheckCircle2,
  FileCheck,
  Globe,
  Sparkles,
  Maximize2,
  X,
  Layers,
  Search,
  ExternalLink,
  Download
} from 'lucide-react';
import { LiveLogisticsSimulation } from './LiveLogisticsSimulation';

interface HeroSectionProps {
  onOpenQuote: () => void;
  onOpenExpert: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuote, onOpenExpert }) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [heroView, setHeroView] = useState<'banner' | 'simulation'>('banner');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const telemetryEvents = [
    { mode: 'Ocean FCL', route: 'Nhava Sheva (INNSA) ➔ Rotterdam (NLRTM)', status: 'Vessel in Transit • 19.4 kts', carrier: 'MV FREIGHTREE VOYAGER', time: 'Just now' },
    { mode: 'Customs EDI', route: 'ICD Dadri ➔ Mundra Port', status: 'Shipping Bill Assessed (LEO Released)', carrier: 'ICEGATE EDI System', time: '2m ago' },
    { mode: 'Air Expedited', route: 'DEL (New Delhi) ➔ FRA (Frankfurt)', status: 'Cargo Manifested & Flight Airborne', carrier: 'Flight FT-AIR-409', time: '5m ago' },
    { mode: 'Port Drayage', route: 'Factory Noida ➔ Mundra Gate-in', status: 'Trailer En Route w/ E-Way GPS', carrier: '40ft Heavy Tri-Axle (FT-TRK-108)', time: '8m ago' },
    { mode: 'Documentation', route: 'Mundra ➔ Jebel Ali (Dubai)', status: 'Bill of Lading & VGM Issued', carrier: 'FREIGHTREE Docs Desk', time: '11m ago' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % telemetryEvents.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [telemetryEvents.length]);

  return (
    <section
      id="home"
      className="relative bg-gradient-to-b from-slate-950 via-[#08172c] to-slate-900 text-white overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-slate-800"
    >
      {/* Subtle world meridian grid backdrop */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Atmospheric blue/cyan lighting glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Verification Pill & Live Telemetry Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-white">FREIGHTREE LLP</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-mono">GSTIN: {COMPANY_INFO.gstin}</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 font-medium">Verified India Freight Forwarder</span>
          </div>

          {/* Real-time telemetry ticker */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/40 text-xs text-blue-200">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-slate-400 font-mono text-[11px]">LIVE DISPATCH:</span>
            <span className="text-white font-semibold">{telemetryEvents[tickerIndex].route}</span>
            <span className="text-cyan-400">({telemetryEvents[tickerIndex].status})</span>
          </div>
        </div>

        {/* Hero Header & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-cyan-400 bg-cyan-950/70 px-3 py-1 rounded-md border border-cyan-800/50">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>INTERNATIONAL FREIGHT FORWARDING & LOGISTICS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-display">
              MOVING YOUR CARGO.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-teal-200">
                CONNECTING THE WORLD.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
              Reliable freight-forwarding and global logistics solutions for international trade.
              Specialized in ocean vessel chartering, containerized cargo (FCL/LCL), cross-border air freight,
              and seamless ICEGATE customs clearance.
            </p>

            {/* Quick Service Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <Ship className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Ocean Freight (FCL/LCL)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Port Drayage & Haulage</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <Plane className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>International Air Cargo</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Customs Port Clearance</span>
              </div>
            </div>
          </div>

          {/* Direct CTA Column */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm tracking-wider shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              id="hero-cta-quote"
            >
              <span>REQUEST FREIGHT QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenExpert}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-100 font-bold text-sm tracking-wide transition-all cursor-pointer"
              id="hero-cta-expert"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>TALK TO FREIGHT EXPERT</span>
            </button>

            {/* Direct Phone Numbers */}
            <div className="pt-1 flex flex-wrap items-center justify-between text-xs text-slate-400 px-1">
              <span>Direct Booking:</span>
              <div className="flex items-center gap-2 font-mono font-semibold text-white">
                <a href={`tel:${COMPANY_INFO.phones[0].clean}`} className="hover:text-cyan-400 transition-colors">
                  {COMPANY_INFO.phones[0].number}
                </a>
                <span>|</span>
                <a href={`tel:${COMPANY_INFO.phones[1].clean}`} className="hover:text-cyan-400 transition-colors">
                  {COMPANY_INFO.phones[1].number}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FRONT PAGE ARRANGED BANNER & VISUAL SHOWCASE */}
        <div className="mt-4" id="front-showcase">
          {/* Controls bar: switch between Official Graphic Banner and Interactive AIS Simulation */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-bold">
                {heroView === 'banner' ? 'FREIGHTREE OFFICIAL VISUAL BANNER' : 'LIVE LOGISTICS MOVEMENT SIMULATION'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHeroView('banner')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  heroView === 'banner'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
                id="view-banner-btn"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>OFFICIAL BANNER</span>
              </button>

              <button
                onClick={() => setHeroView('simulation')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  heroView === 'simulation'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
                id="view-sim-btn"
              >
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>LIVE SIMULATION</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: OFFICIAL FREIGHTREE HIGH-RES GRAPHIC BANNER */}
          {heroView === 'banner' && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl group">
              {/* The high-resolution banner image */}
              <div className="relative aspect-[16/9] w-full max-h-[580px] overflow-hidden bg-slate-950">
                <img
                  src="/images/freightree-hero-banner.jpg"
                  alt="FREIGHTREE SHIPPING & CHARTERING - Your Trusted Partner in Global Trade"
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  id="freightree-main-banner-img"
                />

                {/* Subtle top and bottom lighting gradients for depth and text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                {/* Top overlay badge bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-xs font-semibold text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-bold text-cyan-300">FREIGHTREE</span>
                    <span className="text-slate-400 hidden sm:inline">| Shipping & Chartering</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="/images/freightree-hero-banner.jpg"
                      download="freightree-hero-banner.jpg"
                      className="px-3 py-1.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 text-cyan-300 hover:text-white backdrop-blur-md border border-cyan-500/30 shadow-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                      title="Download Banner Image (JPG)"
                      id="download-banner-btn"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Download Image</span>
                    </a>

                    <button
                      onClick={() => setIsLightboxOpen(true)}
                      className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700 shadow-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                      title="Enlarge Image to Fullscreen"
                      id="enlarge-banner-btn"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Full View</span>
                    </button>
                  </div>
                </div>

                {/* Bottom interactive action strip overlay on the banner */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                      <Ship className="w-3.5 h-3.5 text-cyan-400" />
                      <span>CARGO MOVING</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>TRUCK MOVING</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>CUSTOMS CLEARANCE</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onOpenQuote}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Book Shipment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Core Pillars matching the uploaded banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-950/95 border-t border-slate-800 text-xs">
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center shrink-0 text-cyan-400">
                    <Ship className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">CARGO MOVING</h4>
                    <p className="text-slate-400 text-xs">From Origin to Destination • Ocean Vessel FCL & LCL</p>
                  </div>
                </div>

                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center shrink-0 text-cyan-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">TRUCK MOVING</h4>
                    <p className="text-slate-400 text-xs">Reliable Road Transport • Factory to ICD & Sea Gateways</p>
                  </div>
                </div>

                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center shrink-0 text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">CUSTOMS CLEARANCE</h4>
                    <p className="text-slate-400 text-xs">Smooth & Hassle-Free • ICEGATE EDI, Shipping Bill & LEO</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: LIVE SIMULATION COMPONENT */}
          {heroView === 'simulation' && (
            <LiveLogisticsSimulation onOpenQuote={onOpenQuote} variant="hero" />
          )}
        </div>

        {/* LIGHTBOX MODAL TO VIEW FULL BANNER */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className="relative max-w-6xl w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">FREIGHTREE SHIPPING & CHARTERING</span>
                  <span className="text-slate-400 text-xs hidden sm:inline">— Front Page Banner Showcase</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/images/freightree-hero-banner.jpg"
                    download="freightree-hero-banner.jpg"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
                    id="lightbox-download-header-btn"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Image (856 KB)</span>
                  </a>
                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                    id="close-lightbox-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-2 bg-slate-950 flex items-center justify-center">
                <img
                  src="/images/freightree-hero-banner.jpg"
                  alt="FREIGHTREE SHIPPING & CHARTERING Banner Fullscreen"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <span>Cargo Moving • Truck Moving • Customs Clearance • Freight Forwarding</span>
                  <span className="text-slate-600">•</span>
                  <a
                    href="/freightree-project.zip"
                    download="freightree-project.zip"
                    className="text-cyan-400 hover:text-cyan-300 underline font-mono flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Full Project (ZIP)</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/images/freightree-hero-banner.jpg"
                    download="freightree-hero-banner.jpg"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Save Image</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsLightboxOpen(false);
                      onOpenQuote();
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
                  >
                    Request Freight Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

