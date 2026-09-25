import React, { useState } from 'react';
import { SERVICES } from '../data/companyData';
import { ServiceItem } from '../types';
import {
  Ship,
  Plane,
  ShieldCheck,
  Truck,
  FileText,
  Globe,
  Check,
  ArrowRight,
  ChevronRight,
  Anchor,
  HelpCircle,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ship':
        return <Ship className="w-6 h-6 text-blue-600" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-sky-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-amber-600" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-indigo-600" />;
      case 'Globe':
      default:
        return <Globe className="w-6 h-6 text-teal-600" />;
    }
  };

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Specialized Freight Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Comprehensive International Freight & Logistics Services
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Delivering robust end-to-end cargo movement tailored for Indian exporters, importers, and global trading houses.
          </p>
        </div>

        {/* 6 Professional Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service) => {
            const isSelected = service.id === activeServiceId;
            return (
              <div
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`group relative bg-white rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-lg'
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-blue-50 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                      {service.mode}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-blue-600 font-medium mt-1 mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 border-t border-slate-100 pt-4 mb-4">
                    {service.features.slice(0, 4).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectServiceForQuote(service.title);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 py-1.5 cursor-pointer"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-400 font-medium group-hover:text-slate-600 transition-colors">
                    View Details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Spotlight for the Selected Service */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                {getServiceIcon(activeService.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                  SERVICE SPECIFICATION
                </span>
                <h4 className="text-2xl font-bold text-slate-900">{activeService.title}</h4>
                <p className="text-sm text-slate-500">{activeService.tagline}</p>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote(activeService.title)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-sm transition-all"
              id="service-spotlight-quote-btn"
            >
              <span>INQUIRE ABOUT {activeService.title.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {activeService.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">{feature}</span>
                  <span className="text-[11px] text-slate-500">Coordinated with certified port & carrier standards.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
