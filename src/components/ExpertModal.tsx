import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import {
  Phone,
  MessageSquare,
  Mail,
  X,
  ShieldCheck,
  Building2,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ExpertModal: React.FC<ExpertModalProps> = ({ isOpen, onClose, onOpenQuote }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
              DIRECT LOGISTICS CONSULTATION
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Talk to FREIGHTREE Operations
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          Speak directly with our freight forwarding and documentation team in Noida for instant vessel bookings, air cargo rates, and customs advice.
        </p>

        {/* Contact Channels */}
        <div className="space-y-3 mb-6">
          {/* WhatsApp Direct */}
          <a
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 hover:border-emerald-500 text-emerald-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">WhatsApp Freight Desk</span>
                <span className="text-[11px] text-emerald-300 font-mono">+91 96469 02482 (Instant Chat)</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Primary Phone */}
          <a
            href={`tel:${COMPANY_INFO.phones[0].clean}`}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-blue-500 text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Call Operations Desk (Primary)</span>
                <span className="text-[11px] text-cyan-300 font-mono">{COMPANY_INFO.phones[0].number}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary Phone */}
          <a
            href={`tel:${COMPANY_INFO.phones[1].clean}`}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-blue-500 text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-700 text-cyan-300 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Call Documentation Desk</span>
                <span className="text-[11px] text-cyan-300 font-mono">{COMPANY_INFO.phones[1].number}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-blue-500 text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-700 text-blue-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Official Email</span>
                <span className="text-[11px] text-slate-300 font-mono">{COMPANY_INFO.email}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Action Button to Fill Quote Form */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800">
          <span>Prefer a detailed written rate quotation?</span>
          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer"
          >
            Fill Request Form →
          </button>
        </div>
      </div>
    </div>
  );
};
