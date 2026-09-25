import React, { useState, useEffect } from 'react';
import { FreightreeLogo } from './FreightreeLogo';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, MessageSquare, Menu, X, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: (service?: string) => void;
  onOpenTrack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenTrack }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'GLOBAL NETWORK', href: '#network' },
    { label: 'TRACK SHIPMENT', onClick: onOpenTrack },
    { label: 'GET A QUOTE', onClick: () => onOpenQuote() },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      {/* Top Utility Bar with verified GSTIN, Direct Email and Quick Contact */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-400">GSTIN:</span>
              <strong className="font-mono text-white tracking-wide">{COMPANY_INFO.gstin}</strong>
            </span>
            <span className="hidden md:inline-block text-slate-600">•</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>International Freight Desk | Noida Office</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hover:text-blue-400 transition-colors text-slate-300 font-medium"
              id="header-email-link"
            >
              {COMPANY_INFO.email}
            </a>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.phones[0].clean}`}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-200 font-semibold"
                id="header-call-primary"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>{COMPANY_INFO.phones[0].number}</span>
              </a>
              <span className="hidden lg:inline text-slate-600">/</span>
              <a
                href={`tel:${COMPANY_INFO.phones[1].clean}`}
                className="hidden lg:flex items-center gap-1 hover:text-emerald-400 transition-colors text-slate-300"
                id="header-call-secondary"
              >
                <span>{COMPANY_INFO.phones[1].number}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Company Logo */}
          <a href="#home" className="group" id="header-brand-logo">
            <FreightreeLogo variant="dark" size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link, idx) => {
              if (link.onClick) {
                return (
                  <button
                    key={idx}
                    onClick={link.onClick}
                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-colors ${
                      link.label === 'GET A QUOTE'
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm ml-2'
                        : link.label === 'TRACK SHIPMENT'
                        ? 'bg-slate-100 text-slate-800 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                    id={`nav-btn-${idx}`}
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <a
                  key={idx}
                  href={link.href}
                  className="px-3 py-2 text-xs font-bold tracking-wider text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                  id={`nav-link-${idx}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Quick Action Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              id="header-whatsapp-btn"
              title="Chat with our logistics team on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-sm rounded-lg transition-all"
              id="header-cta-quote"
            >
              <span>GET A QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 bg-emerald-50 rounded-lg"
              title="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            <div className="grid gap-1">
              {navLinks.map((link, idx) => {
                if (link.onClick) {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        link.onClick?.();
                        setMobileMenuOpen(false);
                      }}
                      className="text-left w-full px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                    >
                      {link.label}
                    </button>
                  );
                }
                return (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${COMPANY_INFO.phones[0].clean}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-slate-800 bg-slate-100 rounded-lg"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call: {COMPANY_INFO.phones[0].number}</span>
              </a>
              <button
                onClick={() => {
                  onOpenQuote();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-blue-600 rounded-lg shadow"
              >
                <span>GET A QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
