import React, { useState } from 'react';
import { FreightreeLogo } from './FreightreeLogo';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowUp,
  X,
  FileText,
  Lock,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Description (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <FreightreeLogo variant="white" size="md" />

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mt-3">
              FREIGHTREE LLP is a professional logistics and freight-forwarding company focused on providing reliable, efficient and well-coordinated logistics solutions for international trade.
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-slate-300 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GSTIN: {COMPANY_INFO.gstin}</span>
              </div>
              <div className="text-slate-400">Limited Liability Partnership • UP, India</div>
            </div>
          </div>

          {/* Column 2: Freight Services (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Our Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#services"
                    className="hover:text-cyan-400 transition-colors block text-xs"
                  >
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & Corridors (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">About FREIGHTREE</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#live-visualizer" className="hover:text-cyan-400 transition-colors">Route Visualizer</a>
              </li>
              <li>
                <a href="#network" className="hover:text-cyan-400 transition-colors">Global Network</a>
              </li>
              <li>
                <a href="#quote" className="hover:text-cyan-400 transition-colors">Request a Quote</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact Office</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Head Office
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-slate-300">
                  {COMPANY_INFO.registeredOffice}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-cyan-400 hover:underline font-mono"
                  id="footer-email"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href={`tel:${COMPANY_INFO.phones[0].clean}`}
                    className="block text-slate-200 hover:text-emerald-400 font-semibold"
                    id="footer-phone-1"
                  >
                    {COMPANY_INFO.phones[0].number}
                  </a>
                  <a
                    href={`tel:${COMPANY_INFO.phones[1].clean}`}
                    className="block text-slate-300 hover:text-emerald-400"
                    id="footer-phone-2"
                  >
                    {COMPANY_INFO.phones[1].number}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, GSTIN, Legal Links, Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} FREIGHTREE LLP. All Rights Reserved.</span>
            <span>•</span>
            <span className="font-mono text-slate-400">GSTIN: {COMPANY_INFO.gstin}</span>
            <span>•</span>
            <span>freightree.in</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy / Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl text-slate-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                {modalType === 'privacy' ? <Lock className="w-5 h-5 text-blue-400" /> : <FileText className="w-5 h-5 text-blue-400" />}
                <h3 className="text-lg font-bold text-white">
                  {modalType === 'privacy' ? 'FREIGHTREE LLP - Privacy Policy' : 'FREIGHTREE LLP - Standard Trading Terms'}
                </h3>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalType === 'privacy' ? (
              <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                <p>
                  <strong>1. Data Collection & Usage:</strong> FREIGHTREE LLP collects client and consignor details (name, company, email, phone number, origin/destination ports, and cargo manifests) solely for processing freight quotations, booking shipping slots, filing customs documentation, and coordinating transportation.
                </p>
                <p>
                  <strong>2. Confidentiality:</strong> All commercial invoices, packing lists, and statutory shipping instructions are handled with strict commercial confidentiality and shared strictly with relevant customs authorities, terminal operators, and ocean/air carriers for legitimate freight movement.
                </p>
                <p>
                  <strong>3. Contact:</strong> For inquiries regarding your trade data, reach our compliance team at <code>docs@freightree.in</code>.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                <p>
                  <strong>1. Scope of Services:</strong> All freight bookings, ocean (FCL/LCL), air cargo, customs clearance, and road transportation are performed subject to standard international maritime and air forwarding conventions, statutory Indian customs regulations, and applicable carrier tariffs.
                </p>
                <p>
                  <strong>2. Documentation & Compliance:</strong> Shippers and exporters are responsible for providing authentic Commercial Invoices, Packing Lists, and accurate Verified Gross Mass (VGM) declarations in compliance with IMO SOLAS guidelines and ICEGATE filings.
                </p>
                <p>
                  <strong>3. Jurisdiction:</strong> All business contracts and agreements are governed under the laws of Uttar Pradesh, India, under the registered corporate status of FREIGHTREE LLP (GSTIN: 09AAKFF6543M2ZT).
                </p>
              </div>
            )}

            <div className="pt-6 border-t border-slate-800 mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
