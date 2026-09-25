import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { QuoteFormData } from '../types';
import {
  Send,
  CheckCircle2,
  Ship,
  Plane,
  Truck,
  MessageSquare,
  Mail,
  Copy,
  Check,
  AlertCircle,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

interface QuoteFormSectionProps {
  initialService?: string;
  initialRoute?: string;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  initialService = '',
  initialRoute = '',
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    companyName: '',
    email: '',
    mobile: '',
    origin: '',
    destination: '',
    direction: 'Export',
    serviceType: 'FCL',
    commodity: '',
    containerType: "40' High Cube (HC)",
    cargoWeight: '',
    weightUnit: 'MT',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (initialService) {
      if (initialService.toLowerCase().includes('air')) {
        setFormData((prev) => ({ ...prev, serviceType: 'Air', containerType: 'Air Cargo LD3 / Pallet' }));
      } else if (initialService.toLowerCase().includes('lcl')) {
        setFormData((prev) => ({ ...prev, serviceType: 'LCL', containerType: 'LCL Loose Cargo (CBM)' }));
      } else if (initialService.toLowerCase().includes('customs')) {
        setFormData((prev) => ({ ...prev, serviceType: 'Customs' }));
      } else if (initialService.toLowerCase().includes('transport')) {
        setFormData((prev) => ({ ...prev, serviceType: 'Transportation' }));
      } else {
        setFormData((prev) => ({ ...prev, serviceType: 'FCL' }));
      }
    }
  }, [initialService]);

  useEffect(() => {
    if (initialRoute) {
      const parts = initialRoute.split('➔');
      if (parts.length === 2) {
        setFormData((prev) => ({
          ...prev,
          origin: parts[0].trim(),
          destination: parts[1].trim(),
        }));
      }
    }
  }, [initialRoute]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateEmailBody = (rfqRef: string) => {
    return `FREIGHTREE LLP - Freight Quote Request
Reference: ${rfqRef}

CLIENT DETAILS:
• Name: ${formData.fullName}
• Company Name: ${formData.companyName}
• Email: ${formData.email}
• Mobile: ${formData.mobile}

SHIPMENT SPECIFICATIONS:
• Trade Direction: ${formData.direction}
• Service Type: ${formData.serviceType}
• Port/City of Origin: ${formData.origin}
• Port/City of Destination: ${formData.destination}
• Commodity / Cargo Description: ${formData.commodity}
• Container / Equipment Type: ${formData.containerType}
• Cargo Weight: ${formData.cargoWeight} ${formData.weightUnit}

CLIENT REMARKS / SPECIAL REQUIREMENTS:
${formData.message || 'No additional notes provided.'}

Sent via FREIGHTREE LLP Website (freightree.in) Quote Request Portal.
Target Recipient: docs@freightree.in`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rfqRef = `FT-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(rfqRef);
    setSubmitted(true);

    const subject = encodeURIComponent(`Freight Quote Request [${rfqRef}]: ${formData.origin} to ${formData.destination} (${formData.serviceType})`);
    const body = encodeURIComponent(generateEmailBody(rfqRef));

    // Open native mailto dispatch directed to docs@freightree.in
    const mailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const copyRfqDetails = () => {
    const text = generateEmailBody(referenceId || 'FT-RFQ-PENDING');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const sendWhatsAppRfq = () => {
    const text = `Hello FREIGHTREE LLP, I submitted an RFQ (${referenceId}) for ${formData.direction} shipment from ${formData.origin} to ${formData.destination} (${formData.serviceType}, ${formData.cargoWeight} ${formData.weightUnit}). Please provide your best freight rate.`;
    const url = `https://wa.me/919646902482?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="quote" className="py-20 bg-slate-900 text-white relative border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Operational Inquiry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Get a Quote for Your Freight
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Submit your cargo specifications directly to the FREIGHTREE LLP operations desk at{' '}
            <strong className="text-cyan-300 font-mono">{COMPANY_INFO.email}</strong> for competitive container rates and prompt booking space.
          </p>
        </div>

        {/* Quote Form Container */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {submitted ? (
            /* Submission Success State */
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  QUOTE REQUEST TRANSMITTED
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Your freight inquiry has been prepared for dispatch to{' '}
                  <strong className="text-cyan-300">{COMPANY_INFO.email}</strong>.
                  Reference ID: <strong className="font-mono text-emerald-400">{referenceId}</strong>.
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="max-w-lg mx-auto p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs font-mono text-slate-300 space-y-1.5">
                <div>• Direction: <span className="text-white font-bold">{formData.direction}</span> ({formData.serviceType})</div>
                <div>• Routing: <span className="text-white font-bold">{formData.origin} ➔ {formData.destination}</span></div>
                <div>• Equipment: <span className="text-white">{formData.containerType}</span></div>
                <div>• Cargo: <span className="text-white">{formData.commodity}</span> ({formData.cargoWeight} {formData.weightUnit})</div>
                <div>• Company: <span className="text-white">{formData.companyName}</span></div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={copyRfqDetails}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy RFQ Summary'}</span>
                </button>

                <button
                  onClick={sendWhatsAppRfq}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 96469 02482)</span>
                </button>

                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Submit Another Quote</span>
                </button>
              </div>
            </div>
          ) : (
            /* Main Input Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Contact Information */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>1. Contact & Company Information</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                      id="quote-fullname"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Apex Global Exports LLP"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                      id="quote-company"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. export@company.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                      id="quote-email"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                      id="quote-mobile"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Route & Freight Type */}
              <div className="pt-2 border-t border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>2. Routing & Mode</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Origin (City / Port / ICD) *
                    </label>
                    <input
                      type="text"
                      name="origin"
                      required
                      value={formData.origin}
                      onChange={handleChange}
                      placeholder="e.g. Nhava Sheva / Noida / Mundra"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                      id="quote-origin"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Destination (Port / Country) *
                    </label>
                    <input
                      type="text"
                      name="destination"
                      required
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="e.g. Rotterdam / Jebel Ali / New York"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                      id="quote-destination"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Trade Direction *
                    </label>
                    <select
                      name="direction"
                      value={formData.direction}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-blue-500"
                      id="quote-direction"
                    >
                      <option value="Export">Export (From India)</option>
                      <option value="Import">Import (Into India)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Freight Category *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-blue-500"
                      id="quote-servicetype"
                    >
                      <option value="FCL">FCL (Full Container Load)</option>
                      <option value="LCL">LCL (Less than Container Load)</option>
                      <option value="Air">Air Freight Cargo</option>
                      <option value="Customs">Customs Clearance Only</option>
                      <option value="Transportation">Inland Transportation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Cargo & Equipment Specifications */}
              <div className="pt-2 border-t border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>3. Cargo & Equipment Specifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Commodity / Cargo Type *
                    </label>
                    <input
                      type="text"
                      name="commodity"
                      required
                      value={formData.commodity}
                      onChange={handleChange}
                      placeholder="e.g. Textiles, Auto Parts, Chemicals, Rice"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                      id="quote-commodity"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Container / Equipment Type *
                    </label>
                    <select
                      name="containerType"
                      value={formData.containerType}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-blue-500"
                      id="quote-containertype"
                    >
                      <option value="20' Standard GP">20' Standard GP</option>
                      <option value="40' Standard GP">40' Standard GP</option>
                      <option value="40' High Cube (HC)">40' High Cube (HC)</option>
                      <option value="20' Reefer (Cold Chain)">20' Reefer (Cold Chain)</option>
                      <option value="40' Reefer (Cold Chain)">40' Reefer (Cold Chain)</option>
                      <option value="Open Top / Flat Rack">Open Top / Flat Rack</option>
                      <option value="LCL Loose Cargo (CBM)">LCL Loose Cargo (CBM)</option>
                      <option value="Air Cargo LD3 / Pallet">Air Cargo Pallet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Cargo Weight *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="cargoWeight"
                        required
                        value={formData.cargoWeight}
                        onChange={handleChange}
                        placeholder="e.g. 18.5"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 font-mono"
                        id="quote-weight"
                      />
                      <select
                        name="weightUnit"
                        value={formData.weightUnit}
                        onChange={handleChange}
                        className="w-20 bg-slate-900 border border-slate-700 rounded-xl px-2 py-2.5 text-xs text-white font-mono"
                        id="quote-weightunit"
                      >
                        <option value="MT">MT</option>
                        <option value="KG">KG</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Additional Requirements / Message */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message / Special Instructions (Incoterms, Target Readiness, Hazards)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify Incoterms (FOB / CIF / CFR / DDP), expected cargo readiness date, hazardous classification, or customs assistance needed..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                  id="quote-message"
                />
              </div>

              {/* Submit Button & Destination Notice */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Configured to transmit directly to: <strong className="text-cyan-300 font-mono">{COMPANY_INFO.email}</strong></span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  id="quote-submit-button"
                >
                  <span>REQUEST A QUOTE</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
