import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import {
  ShieldCheck,
  Building2,
  FileBadge,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Award,
  Globe,
  ArrowRight
} from 'lucide-react';

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Official Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>About FREIGHTREE LLP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display leading-tight">
              A Trusted Partner for International Trade & Freight Forwarding
            </h2>

            {/* Exact Required Company Introduction */}
            <div className="p-6 rounded-2xl bg-slate-50 border-l-4 border-blue-600 border-y border-r border-slate-200 text-slate-800 text-base sm:text-lg leading-relaxed font-medium shadow-xs">
              “FREIGHTREE LLP is a professional logistics and freight-forwarding company focused on providing reliable, efficient and well-coordinated logistics solutions for international trade. We support businesses with freight movement, documentation, customs coordination, transportation and end-to-end shipment handling.”
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Based in Noida, Uttar Pradesh, FREIGHTREE LLP delivers structured freight coordination for manufacturers, exporters, and importers. We combine hands-on operational supervision with strict adherence to Indian customs and international maritime regulations.
            </p>

            {/* Operational Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Transparent freight rates & zero hidden fees</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Rigorous statutory document compliance</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Multi-carrier space availability & bookings</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Single point of operational coordination</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-sm transition-all cursor-pointer"
                id="about-cta-quote"
              >
                <span>REQUEST FREIGHT FORWARDING SERVICES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Verified Corporate Credentials Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="text-base font-bold text-white font-display">VERIFIED BUSINESS DETAILS</h3>
                    <p className="text-[11px] text-slate-400 font-mono">Government of India Registration</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-mono font-bold border border-emerald-800/60">
                  ACTIVE GST
                </span>
              </div>

              {/* Verified Information Rows */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Legal Entity Name</span>
                  <strong className="text-white text-sm tracking-wide">{COMPANY_INFO.name}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Business Constitution</span>
                  <span className="text-slate-200 font-semibold">{COMPANY_INFO.businessType}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Goods & Services Tax ID (GSTIN)</span>
                  <div className="mt-1 flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-cyan-300 font-bold text-sm tracking-widest">{COMPANY_INFO.gstin}</span>
                    <span className="text-[10px] text-emerald-400 font-sans font-semibold bg-emerald-950/60 px-2 py-0.5 rounded">Verified</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Registered Office Address</span>
                  <p className="text-slate-300 mt-1 font-sans text-xs leading-relaxed">
                    {COMPANY_INFO.registeredOffice}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800 font-sans">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Direct Operations Email</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold truncate block mt-0.5"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Inquiries</span>
                    <a
                      href={`tel:${COMPANY_INFO.phones[0].clean}`}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold block mt-0.5"
                    >
                      {COMPANY_INFO.phones[0].number}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
