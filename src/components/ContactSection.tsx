import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Clock,
  Building2,
  ShieldCheck,
  MessageSquare,
  ExternalLink,
  Navigation
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  // Google Maps embed URL centered accurately on Sector 63 A, Noida, UP 201309
  const mapEmbedUrl = `https://www.google.com/maps?q=12th+Floor,+A-135,+Block+A,+Sharkspace+Co,+Sector+63+A,+Noida,+Uttar+Pradesh+201309&output=embed`;

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Operational Headquarters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Contact FREIGHTREE LLP
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Reach out to our freight and documentation desk for inquiries, space bookings, and logistics coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Official Contact Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              {/* Entity Title */}
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                  {COMPANY_INFO.businessType}
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-display mt-0.5">
                  {COMPANY_INFO.name}
                </h3>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>GSTIN: {COMPANY_INFO.gstin}</span>
                </div>
              </div>

              {/* Registered Office Address */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="block text-slate-900 text-sm font-semibold">Registered Office</strong>
                  <p className="leading-relaxed text-slate-600">
                    {COMPANY_INFO.registeredOffice}
                  </p>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="block text-slate-900 text-sm font-semibold">Email Correspondence</strong>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-blue-600 hover:text-blue-700 font-bold text-sm block"
                    id="contact-email-link"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <p className="text-[11px] text-slate-500">Dedicated inbox for documentation & quotes</p>
                </div>
              </div>

              {/* Direct Phone Numbers */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-700 space-y-2 flex-1">
                  <strong className="block text-slate-900 text-sm font-semibold">Phone & WhatsApp Desks</strong>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`tel:${COMPANY_INFO.phones[0].clean}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-900 hover:text-emerald-700 font-bold border border-slate-200 transition-colors"
                      id="contact-phone-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{COMPANY_INFO.phones[0].number}</span>
                    </a>
                    <a
                      href={`tel:${COMPANY_INFO.phones[1].clean}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-900 hover:text-emerald-700 font-bold border border-slate-200 transition-colors"
                      id="contact-phone-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{COMPANY_INFO.phones[1].number}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Official Website */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-700 space-y-0.5">
                  <strong className="block text-slate-900 text-sm font-semibold">Official Portal</strong>
                  <a
                    href={`https://${COMPANY_INFO.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-mono text-sm"
                  >
                    {COMPANY_INFO.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Button */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                id="contact-whatsapp-direct"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT INSTANTLY ON WHATSAPP (+91 96469 02482)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Google Maps Integration */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Noida Registered Office Location
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Sector+63+A+Noida+Uttar+Pradesh+201309"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Google Map Iframe Container */}
            <div className="w-full flex-1 min-h-[360px] rounded-xl overflow-hidden border border-slate-200 relative">
              <iframe
                title="FREIGHTREE LLP Office Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Coordinates: Sector 63 A, Noida, Gautam Buddha Nagar, UP – 201309</span>
              <span>Landmark: Near Indian Public School</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
