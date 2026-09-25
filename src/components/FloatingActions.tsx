import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { MessageSquare, Phone, Send } from 'lucide-react';

interface FloatingActionsProps {
  onOpenQuote: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenQuote }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Quick Quote Pill */}
      <button
        onClick={onOpenQuote}
        className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 border border-blue-400/40 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        id="floating-quote-btn"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Get a Freight Quote</span>
      </button>

      {/* Direct Call Button */}
      <a
        href={`tel:${COMPANY_INFO.phones[0].clean}`}
        className="flex sm:hidden items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-cyan-400 hover:bg-slate-800 shadow-xl border border-slate-700 transition-all active:scale-95"
        title="Call Primary Freight Desk"
        id="floating-call-btn"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp Action */}
      <a
        href={COMPANY_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/40 border-2 border-white transition-all transform hover:scale-105 active:scale-95"
        title="Chat on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
      </a>
    </div>
  );
};
