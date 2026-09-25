import React from 'react';
import { WHY_FREIGHTREE_POINTS, COMPANY_INFO } from '../data/companyData';
import {
  CheckCircle,
  TrendingDown,
  FileSpreadsheet,
  Layers,
  Globe2,
  Headphones,
  MessageSquare,
  Shield,
  ArrowRight
} from 'lucide-react';

interface WhyFreightreeProps {
  onOpenQuote: () => void;
}

export const WhyFreightreeSection: React.FC<WhyFreightreeProps> = ({ onOpenQuote }) => {
  const getPillarIcon = (iconName: string) => {
    const iconClass = 'w-6 h-6 text-blue-600';
    switch (iconName) {
      case 'CheckCircle':
        return <CheckCircle className={iconClass} />;
      case 'TrendingDown':
        return <TrendingDown className={iconClass} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className={iconClass} />;
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'Globe2':
        return <Globe2 className={iconClass} />;
      case 'Headphones':
        return <Headphones className={iconClass} />;
      case 'MessageSquare':
      default:
        return <MessageSquare className={iconClass} />;
    }
  };

  return (
    <section id="why-freightree" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Built on Reliability & Precision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Why Choose FREIGHTREE LLP for Your Global Trade
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We streamline the complexities of international trade so you can focus on expanding your business across global markets with confidence.
          </p>
        </div>

        {/* 7 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {WHY_FREIGHTREE_POINTS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              id={`why-pillar-${idx}`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors shadow-xs">
                  {getPillarIcon(pillar.iconName)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>PILLAR 0{idx + 1}</span>
                <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                  Verified Standard →
                </span>
              </div>
            </div>
          ))}

          {/* Special Verification Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-800/60 text-cyan-300 text-xs font-mono font-bold mb-3">
                <span>REGISTERED ENTITY</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                FREIGHTREE LLP
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Operating under registered Limited Liability Partnership status in Noida, Uttar Pradesh with authenticated GSTIN: <strong className="font-mono text-cyan-300">{COMPANY_INFO.gstin}</strong>.
              </p>
              <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800 pt-3 font-mono">
                <div>• Zero Guesswork Documentation</div>
                <div>• Professional Cargo Oversight</div>
                <div>• Prompt Operational Updates</div>
              </div>
            </div>

            <button
              onClick={onOpenQuote}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CONNECT WITH OUR DESK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
