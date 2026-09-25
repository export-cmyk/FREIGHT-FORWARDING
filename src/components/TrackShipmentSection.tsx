import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import {
  MAIN_SHIPPING_LINES,
  ShippingLine,
  detectCarrierFromInput,
  validateContainerNumber,
  GLOBAL_SHIPPING_LINES_REGISTRY
} from '../data/mainShippingLines';
import {
  Search,
  CheckCircle2,
  Clock,
  Ship,
  MapPin,
  AlertCircle,
  MessageSquare,
  Mail,
  ShieldCheck,
  FileText,
  Truck,
  ExternalLink,
  Copy,
  Check,
  Printer,
  Share2,
  Navigation,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  Anchor,
  Layers,
  Sparkles,
  Info,
  RefreshCw,
  Compass,
  CheckCheck
} from 'lucide-react';

interface TrackShipmentProps {
  initialRef?: string;
}

export const TrackShipmentSection: React.FC<TrackShipmentProps> = ({ initialRef = '' }) => {
  const [trackingNumber, setTrackingNumber] = useState(initialRef);
  const [selectedCarrierId, setSelectedCarrierId] = useState<string>('auto');
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<'tracker' | 'carriers' | 'edi'>('tracker');
  const [copied, setCopied] = useState(false);
  const [carrierFilter, setCarrierFilter] = useState<'all' | '2M' | 'Ocean' | 'Premier' | 'Independent' | 'Regional'>('all');
  const [carrierSearchQuery, setCarrierSearchQuery] = useState('');
  const [showAllChips, setShowAllChips] = useState(false);

  // Currently displayed tracking result
  const [activeCarrier, setActiveCarrier] = useState<ShippingLine | null>(null);
  const [resultData, setResultData] = useState<any>(null);

  // Real-time ISO 6346 validation & carrier detection
  const isoValidation = validateContainerNumber(trackingNumber);
  const detectedCarrier = detectCarrierFromInput(trackingNumber);

  // Initialize with sample if initialRef provided or on first search
  useEffect(() => {
    if (initialRef) {
      handleSearchWithRef(initialRef);
    }
  }, [initialRef]);

  const handleSearchWithRef = (ref: string, carrierOverride?: ShippingLine) => {
    const clean = ref.trim().toUpperCase();
    if (!clean) return;

    setTrackingNumber(clean);
    setSearched(true);
    setActiveTab('tracker');

    // 1. Check if user specified or auto-detected in MAIN_SHIPPING_LINES
    let carrier: ShippingLine | null | undefined = carrierOverride;
    if (!carrier) {
      if (selectedCarrierId !== 'auto') {
        carrier = MAIN_SHIPPING_LINES.find((c) => c.id === selectedCarrierId) || null;
      } else {
        carrier = detectCarrierFromInput(clean);
      }
    }

    if (carrier) {
      setActiveCarrier(carrier);
      setResultData({
        ref: clean,
        isMainLine: true,
        carrierName: carrier.name,
        carrierBrand: carrier.brandName,
        carrierScac: carrier.scac,
        alliance: carrier.alliance,
        brandColor: carrier.brandColor,
        portalTrackingUrl: carrier.buildTrackingUrl(clean),
        vessel: carrier.mockShipment.vessel,
        voyage: carrier.mockShipment.voyage,
        originPort: carrier.mockShipment.originPort,
        originCode: carrier.mockShipment.originCode,
        destinationPort: carrier.mockShipment.destinationPort,
        destCode: carrier.mockShipment.destCode,
        eta: carrier.mockShipment.eta,
        containerType: carrier.mockShipment.containerType,
        vgmWeight: carrier.mockShipment.vgmWeight,
        sealNumber: carrier.mockShipment.sealNumber,
        currentStatus: carrier.mockShipment.currentStatus,
        currentLocation: carrier.mockShipment.currentLocation,
        currentSpeed: carrier.mockShipment.currentSpeed,
        milestones: carrier.mockShipment.milestones,
      });
      return;
    }

    // 2. Check if the prefix exists in GLOBAL_SHIPPING_LINES_REGISTRY
    const prefix4 = clean.slice(0, 4);
    const globalMatch = GLOBAL_SHIPPING_LINES_REGISTRY.find(
      (g) => g.prefixes.includes(prefix4) || g.prefixes.some((p) => p.startsWith(clean.slice(0, 3)))
    );

    if (globalMatch) {
      setActiveCarrier(null);
      setResultData({
        ref: clean,
        isMainLine: true,
        carrierName: globalMatch.name,
        carrierBrand: globalMatch.name,
        carrierScac: globalMatch.scac,
        alliance: globalMatch.country,
        brandColor: '#0284C7',
        portalTrackingUrl: `${globalMatch.url}${encodeURIComponent(clean)}`,
        vessel: `MV ${globalMatch.name.toUpperCase()} MARINER / V.2409E`,
        voyage: `${globalMatch.scac}-2026-09`,
        originPort: 'Mundra Port (INMUN), India',
        originCode: 'INMUN',
        destinationPort: 'Port of Singapore (SGSIN), Singapore',
        destCode: 'SGSIN',
        eta: '25-Sep-2026 18:00 UTC',
        containerType: '40ft High Cube Container (45G1)',
        vgmWeight: '27,400 KG (Method 1 Certified)',
        sealNumber: `SL-${clean.slice(4)}-92`,
        currentStatus: 'On Board Ocean Carrier • In Transit',
        currentLocation: 'Malacca Strait Maritime Corridor',
        currentSpeed: '18.2 kts',
        milestones: [
          { event: 'Space Allocation & Booking Confirmed', location: `${globalMatch.name} Agency, India`, timestamp: '05-Sep-2026 11:00', completed: true },
          { event: 'Container Stuffed & E-Way Generated', location: 'Industrial Shippers Facility', timestamp: '08-Sep-2026 14:30', completed: true },
          { event: 'Export Customs Assessment (LEO Release)', location: 'Customs Border Station', timestamp: '10-Sep-2026 10:15', completed: true },
          { event: 'Port Terminal Gate-In & SOLAS VGM Recorded', location: 'Mundra Terminal 2', timestamp: '12-Sep-2026 09:00', completed: true },
          { event: 'Loaded on Ocean Vessel', location: 'Berth 4, Mundra Port', timestamp: '14-Sep-2026 22:30', completed: true },
          { event: 'Ocean Transit en route to Transshipment Hub', location: 'Indian Ocean Corridor', timestamp: 'Current • 18.2 kts', completed: true, current: true },
          { event: 'Estimated Arrival at POD', location: 'Port of Singapore', timestamp: '25-Sep-2026 (ETA)', completed: false },
        ],
      });
      return;
    }

    // 3. Any standard ISO container number or generic ref
    const isIso = /^[A-Z]{4}[0-9]{7}$/.test(clean);
    setActiveCarrier(null);
    setResultData({
      ref: clean,
      isMainLine: false,
      carrierName: isIso ? `Global Container (${clean.slice(0, 4)})` : 'FREIGHTREE Intermodal Dispatch',
      carrierBrand: isIso ? `Carrier Prefix ${clean.slice(0, 4)}` : 'FREIGHTREE House B/L',
      carrierScac: clean.slice(0, 4),
      alliance: isIso ? 'ISO 6346 Standard' : 'Independent NVOCC Network',
      brandColor: '#0284C7',
      portalTrackingUrl: `https://www.track-trace.com/container?number=${clean}`,
      vessel: 'MV FREIGHTREE PACIFIC / V.2409W',
      voyage: 'FT-2026-09',
      originPort: 'Nhava Sheva (JNPT BMCT), India',
      originCode: 'INNSA',
      destinationPort: 'Port of Rotterdam, Netherlands',
      destCode: 'NLRTM',
      eta: '28-Sep-2026 14:00 UTC',
      containerType: isIso ? 'Standard 40ft High Cube ISO Container' : '40ft High Cube Container (45G1)',
      vgmWeight: '25,800 KG (Method 1 Verified)',
      sealNumber: `FT-SEAL-${clean.slice(-6) || '884920'}`,
      currentStatus: 'On Board Ocean Carrier • In Maritime Transit',
      currentLocation: 'Red Sea International Waterway Corridor',
      currentSpeed: '19.4 kts',
      milestones: [
        { event: 'Space Allocation & Booking Confirmed', location: 'FREIGHTREE Desk, Noida', timestamp: '04-Sep-2026 10:15', completed: true },
        { event: 'Factory Stuffing & E-Way Generation', location: 'Greater Noida Manufacturing Hub', timestamp: '07-Sep-2026 16:30', completed: true },
        { event: 'Export Customs Assessment & LEO Out of Charge', location: 'ICD Dadri Customs House', timestamp: '09-Sep-2026 11:45', completed: true },
        { event: 'Port Terminal Gate-In & VGM Certified', location: 'JNPT BMCT Terminal 4', timestamp: '11-Sep-2026 08:30', completed: true },
        { event: 'Loaded on Ocean Carrier Vessel', location: 'Berth 3, Nhava Sheva Port', timestamp: '13-Sep-2026 21:10', completed: true },
        { event: 'Ocean Transit en route to Europe Gateway', location: 'Red Sea / Suez Route', timestamp: 'Current • 19.4 kts', completed: true, current: true },
        { event: 'Expected Discharge at Rotterdam Port', location: 'Rotterdam APM Terminal', timestamp: '28-Sep-2026 (ETA)', completed: false },
        { event: 'Import Customs Clear & Consignee Delivery', location: 'Consignee Facility', timestamp: '30-Sep-2026 (Est)', completed: false },
      ],
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchWithRef(trackingNumber);
  };

  const handleQuickTest = (carrier: ShippingLine) => {
    setSelectedCarrierId(carrier.id);
    setTrackingNumber(carrier.sampleTrackingNo);
    handleSearchWithRef(carrier.sampleTrackingNo, carrier);
  };

  const handleCopyLink = () => {
    if (resultData?.ref) {
      navigator.clipboard.writeText(`${window.location.origin}#track?ref=${resultData.ref}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter carriers in the directory by Alliance and search query
  const filteredCarriers = MAIN_SHIPPING_LINES.filter((carrier) => {
    // Alliance filter
    let matchesAlliance = true;
    if (carrierFilter === '2M') matchesAlliance = carrier.alliance === '2M Alliance';
    if (carrierFilter === 'Ocean') matchesAlliance = carrier.alliance === 'Ocean Alliance';
    if (carrierFilter === 'Premier') matchesAlliance = carrier.alliance === 'Premier Alliance';
    if (carrierFilter === 'Independent') matchesAlliance = carrier.alliance === 'Independent';
    if (carrierFilter === 'Regional') matchesAlliance = carrier.alliance === 'Regional Feeder' || carrier.alliance === 'Regional Carrier' || carrier.alliance === 'Indian National Line';

    // Search query
    let matchesQuery = true;
    if (carrierSearchQuery.trim()) {
      const q = carrierSearchQuery.toLowerCase();
      matchesQuery =
        carrier.brandName.toLowerCase().includes(q) ||
        carrier.name.toLowerCase().includes(q) ||
        carrier.scac.toLowerCase().includes(q) ||
        carrier.prefixes.some((p) => p.toLowerCase().includes(q)) ||
        carrier.headquarters.toLowerCase().includes(q);
    }

    return matchesAlliance && matchesQuery;
  });

  return (
    <section id="track" className="py-20 bg-slate-950 text-white relative border-b border-slate-800">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 text-cyan-300 border border-blue-800/60 text-xs font-bold uppercase tracking-wider mb-3">
            <Ship className="w-3.5 h-3.5 text-cyan-400" />
            <span>GLOBAL MULTI-CARRIER CONTAINER TRACKING PORTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Track Any Shipping Line Container
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time container tracking across all major ocean shipping lines — including{' '}
            <strong className="text-white font-semibold">MAERSK</strong>,{' '}
            <strong className="text-white font-semibold">MSC</strong>,{' '}
            <strong className="text-white font-semibold">CMA CGM</strong>,{' '}
            <strong className="text-white font-semibold">COSCO</strong>,{' '}
            <strong className="text-white font-semibold">ONE</strong>,{' '}
            <strong className="text-white font-semibold">HAPAG-LLOYD</strong>,{' '}
            <strong className="text-white font-semibold">EVERGREEN</strong>,{' '}
            <strong className="text-white font-semibold">OOCL</strong>,{' '}
            <strong className="text-white font-semibold">HAMBURG SÜD</strong>,{' '}
            <strong className="text-white font-semibold">SITC</strong>,{' '}
            <strong className="text-white font-semibold">KMTC</strong>,{' '}
            <strong className="text-white font-semibold">SINOKOR</strong>,{' '}
            <strong className="text-white font-semibold">RCL</strong>,{' '}
            <strong className="text-white font-semibold">SEALEAD</strong>,{' '}
            <strong className="text-white font-semibold">SCI</strong>, and{' '}
            <strong className="text-white font-semibold">UNIFEEDER</strong>.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>CONTAINER TRACKER CONSOLE</span>
          </button>

          <button
            onClick={() => setActiveTab('carriers')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'carriers'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>ALL SHIPPING LINES DIRECTORY ({MAIN_SHIPPING_LINES.length}+)</span>
          </button>

          <button
            onClick={() => setActiveTab('edi')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'edi'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CUSTOMS EDI & PORT DESK</span>
          </button>
        </div>

        {/* TAB 1: PRIMARY TRACKER CONSOLE */}
        {activeTab === 'tracker' && (
          <div className="space-y-6">
            {/* Search Card */}
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-3">
                  {/* Carrier Select Dropdown */}
                  <div className="w-full lg:w-64 shrink-0">
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                      Shipping Line / Carrier
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCarrierId}
                        onChange={(e) => setSelectedCarrierId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-hidden focus:border-blue-500 font-sans cursor-pointer appearance-none"
                      >
                        <option value="auto">✨ Auto-Detect Carrier</option>
                        <optgroup label="Main Ocean Lines (Global Alliances)">
                          {MAIN_SHIPPING_LINES.map((carrier) => (
                            <option key={carrier.id} value={carrier.id}>
                              {carrier.brandName} ({carrier.scac})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="FREIGHTREE Internal">
                          <option value="freightree">FREIGHTREE House B/L</option>
                        </optgroup>
                      </select>
                      <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                    </div>
                  </div>

                  {/* Reference Input */}
                  <div className="flex-1">
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 flex items-center justify-between">
                      <span>Container ID, Master B/L, or Booking Reference</span>
                      {detectedCarrier && selectedCarrierId === 'auto' && (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Detected: {detectedCarrier.brandName}
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                        placeholder="e.g. MSKU8129401, OOLU9182341, SUDU7291048, SITU8392014, FT-BL-8492..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 font-mono tracking-wider uppercase"
                        id="track-input-field"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="lg:self-end">
                    <button
                      type="submit"
                      className="w-full lg:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm tracking-wider shadow-lg shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                      id="track-submit-btn"
                    >
                      <Search className="w-4 h-4" />
                      <span>TRACK CARGO</span>
                    </button>
                  </div>
                </div>

                {/* ISO 6346 Real-time container analysis banner if valid or partially valid */}
                {trackingNumber.trim().length >= 4 && (
                  <div className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 font-mono">
                      <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-slate-400">Prefix:</span>
                      <span className="font-bold text-cyan-300">{isoValidation.ownerCode || trackingNumber.slice(0, 4)}</span>

                      {isoValidation.category && (
                        <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-[11px] text-blue-200">
                          {isoValidation.category}
                        </span>
                      )}

                      {isoValidation.suggestedLine && (
                        <span className="text-emerald-400 font-bold ml-1">
                          • {isoValidation.suggestedLine}
                        </span>
                      )}
                    </div>

                    {isoValidation.isValidFormat && (
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-slate-400">Check Digit:</span>
                        <span className="font-bold text-white">{isoValidation.checkDigit}</span>
                        {isoValidation.isCheckDigitValid ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>ISO Valid</span>
                          </span>
                        ) : (
                          <span className="text-amber-400">
                            (calc: {isoValidation.calculatedCheckDigit})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 1-Click Test Chips for All Requested Shipping Lines */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-400 font-mono flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Quick Test Any Shipping Line:</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setShowAllChips(!showAllChips)}
                      className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] cursor-pointer"
                    >
                      {showAllChips ? 'Show Less Lines' : `View All ${MAIN_SHIPPING_LINES.length} Lines`}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Primary top lines */}
                    {(showAllChips ? MAIN_SHIPPING_LINES : MAIN_SHIPPING_LINES.slice(0, 10)).map((line) => (
                      <button
                        key={line.id}
                        type="button"
                        onClick={() => handleQuickTest(line)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: line.brandColor }}
                        />
                        <span>{line.brandName}</span>
                      </button>
                    ))}

                    {/* FREIGHTREE House B/L */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCarrierId('freightree');
                        setTrackingNumber('FT-BL-8492');
                        handleSearchWithRef('FT-BL-8492');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-cyan-500/40 text-cyan-300 font-mono font-semibold transition-colors cursor-pointer"
                    >
                      FT-BL-8492 (House B/L)
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* TRACKING RESULT DISPLAY: HIGH-END PROFESSIONAL TELEMETRY DOSSIER */}
            {searched && resultData && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
                {/* Header Strip with Carrier Branding & Status */}
                <div
                  className="px-6 py-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
                  style={{
                    background: activeCarrier
                      ? `linear-gradient(90deg, #0B192C 0%, ${activeCarrier.brandColor}22 50%, #0B192C 100%)`
                      : 'linear-gradient(90deg, #0B192C 0%, #0284C722 50%, #0B192C 100%)',
                  }}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Carrier Badge Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md border"
                      style={{
                        backgroundColor: activeCarrier?.brandColor || '#0284C7',
                        borderColor: '#FFFFFF33',
                      }}
                    >
                      <Ship className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          {resultData.carrierBrand}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                          SCAC: {resultData.carrierScac}
                        </span>
                        <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-cyan-300 font-medium">
                          {resultData.alliance}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
                        <span>{resultData.ref}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-sans border border-emerald-500/40">
                          IN TRANSIT
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Actions (Official Carrier Direct Link, Print, Share) */}
                  <div className="flex flex-wrap items-center gap-2">
                    {resultData.portalTrackingUrl && (
                      <a
                        href={resultData.portalTrackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                        title="Open live carrier portal tracking in new tab"
                      >
                        <span>Track on {resultData.carrierBrand} Official Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      title="Copy direct tracking link"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Share'}</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      title="Print or save as PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Dossier</span>
                    </button>
                  </div>
                </div>

                {/* Primary Telemetry Grid */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Origin to Destination Route Hero Card */}
                  <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Origin Port */}
                      <div className="md:col-span-4 space-y-1">
                        <span className="text-[11px] font-mono uppercase text-slate-400 block">
                          PORT OF LOADING (POL)
                        </span>
                        <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>{resultData.originPort}</span>
                        </div>
                        <div className="text-xs font-mono text-cyan-400">
                          UN/LOCODE: {resultData.originCode} • Terminal Gate-In Complete
                        </div>
                      </div>

                      {/* Transit Indicator & Vessel Info */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-2 py-2 md:py-0 border-y md:border-y-0 md:border-x border-slate-800 px-3">
                        <div className="flex items-center gap-2 text-xs text-cyan-300 font-mono">
                          <Ship className="w-4 h-4 text-cyan-400 animate-pulse" />
                          <span className="font-bold">{resultData.vessel}</span>
                        </div>
                        <div className="w-full relative py-1">
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 w-[68%]" />
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                            <span>DEPARTED</span>
                            <span className="text-cyan-300 font-bold">68% ROUTE COMPLETED</span>
                            <span>ETA</span>
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono">
                          Voyage: <strong className="text-white">{resultData.voyage}</strong> • Speed: <strong className="text-cyan-400">{resultData.currentSpeed}</strong>
                        </div>
                      </div>

                      {/* Destination Port & ETA */}
                      <div className="md:col-span-4 md:text-right space-y-1">
                        <span className="text-[11px] font-mono uppercase text-slate-400 block">
                          PORT OF DISCHARGE (POD)
                        </span>
                        <div className="text-base sm:text-lg font-bold text-white flex items-center md:justify-end gap-2">
                          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{resultData.destinationPort}</span>
                        </div>
                        <div className="text-xs font-mono text-emerald-400 font-bold">
                          ETA: {resultData.eta}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Professional Data Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Metric 1: Container ISO Specs */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-cyan-400" />
                        <span>CONTAINER ISO SPEC</span>
                      </span>
                      <div className="text-sm font-bold text-white font-mono">
                        {resultData.containerType}
                      </div>
                      <div className="text-xs text-slate-400">
                        High-cube dry van suitable for palletized & heavy export freight.
                      </div>
                    </div>

                    {/* Metric 2: VGM Calibration */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>VERIFIED GROSS MASS (VGM)</span>
                      </span>
                      <div className="text-sm font-bold text-emerald-400 font-mono">
                        {resultData.vgmWeight}
                      </div>
                      <div className="text-xs text-slate-400">
                        SOLAS certified weighment document transmitted to terminal operator.
                      </div>
                    </div>

                    {/* Metric 3: Seal Number */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-blue-400" />
                        <span>SEAL IDENTIFICATION</span>
                      </span>
                      <div className="text-sm font-bold text-white font-mono">
                        {resultData.sealNumber}
                      </div>
                      <div className="text-xs text-slate-400">
                        High-security bolt seal certified ISO 17712 compliant for sea transit.
                      </div>
                    </div>

                    {/* Metric 4: Vessel Current Position */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-amber-400" />
                        <span>CURRENT DISPATCH LOC</span>
                      </span>
                      <div className="text-sm font-bold text-cyan-300 font-mono truncate">
                        {resultData.currentLocation}
                      </div>
                      <div className="text-xs text-slate-400">
                        Status: <span className="text-emerald-400 font-semibold">{resultData.currentStatus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Milestone Progression Timeline */}
                  <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>OPERATIONAL MILESTONE TIMELINE (CARRIER & CUSTOMS EDI)</span>
                      </h4>
                      <span className="text-[11px] font-mono text-cyan-400">
                        Real-Time EDI Status Feed
                      </span>
                    </div>

                    <div className="space-y-3">
                      {resultData.milestones.map((m: any, idx: number) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl border transition-all ${
                            m.current
                              ? 'bg-blue-950/70 border-cyan-500/60 shadow-lg ring-1 ring-cyan-500/30'
                              : m.completed
                              ? 'bg-slate-900/70 border-slate-800/80 text-slate-300'
                              : 'bg-slate-950 border-slate-800/40 text-slate-600 opacity-60'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {m.completed ? (
                              <CheckCircle2
                                className={`w-4 h-4 ${
                                  m.current ? 'text-cyan-400 animate-pulse' : 'text-emerald-400'
                                }`}
                              />
                            ) : (
                              <Clock className="w-4 h-4 text-slate-600" />
                            )}
                          </div>

                          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                            <div>
                              <span
                                className={`font-semibold text-sm ${
                                  m.current ? 'text-cyan-200' : m.completed ? 'text-slate-200' : 'text-slate-500'
                                }`}
                              >
                                {m.event}
                              </span>
                              <span className="text-xs text-slate-400 block sm:inline sm:ml-2 font-mono">
                                • {m.location}
                              </span>
                            </div>
                            <span className="font-mono text-slate-400 text-xs shrink-0 whitespace-nowrap">
                              {m.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Assistance & Document Release Desk */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 space-y-0.5 text-center sm:text-left">
                      <strong className="text-white block font-semibold">
                        Need Bill of Lading (B/L) Release, VGM Amendment, or Delivery Order (DO)?
                      </strong>
                      <span className="text-slate-400">
                        FREIGHTREE LLP operations coordinators assist directly with shipping line detention, demurrage waivers, and port clearance.
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${COMPANY_INFO.email}?subject=Status%20Inquiry%20${resultData.ref}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Email Desk</span>
                      </a>

                      <a
                        href={`https://wa.me/919646902482?text=Hello%20FREIGHTREE%2C%20I%20am%20tracking%20shipment%20${resultData.ref}%20on%20${resultData.carrierBrand}.%20Please%20provide%20the%20latest%20port%20milestone.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MAIN OCEAN LINES DIRECTORY */}
        {activeTab === 'carriers' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={carrierSearchQuery}
                    onChange={(e) => setCarrierSearchQuery(e.target.value)}
                    placeholder="Search by Line, Prefix (e.g. OOLU, KMTC, SUDU)..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 font-mono"
                  />
                </div>

                {/* Counter */}
                <div className="text-xs text-slate-400 font-mono">
                  Showing <strong className="text-cyan-400">{filteredCarriers.length}</strong> of {MAIN_SHIPPING_LINES.length} Main Shipping Lines
                </div>
              </div>

              {/* Alliance Filters */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800">
                {(['all', '2M', 'Ocean', 'Premier', 'Regional', 'Independent'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setCarrierFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      carrierFilter === filter
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {filter === 'all'
                      ? 'All Lines'
                      : filter === '2M'
                      ? '2M Alliance (MSC, Maersk)'
                      : filter === 'Ocean'
                      ? 'Ocean Alliance (CMA, COSCO, Evergreen, OOCL)'
                      : filter === 'Premier'
                      ? 'Premier Alliance (ONE, Hapag, Yang Ming, HMM)'
                      : filter === 'Regional'
                      ? 'Regional / Feeder (SITC, KMTC, RCL, SCI, Unifeeder)'
                      : 'Independent (ZIM, Wan Hai, SeaLead)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Carrier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCarriers.map((carrier) => (
                <div
                  key={carrier.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-0.5"
                >
                  <div className="space-y-3">
                    {/* Card Top: Brand Logo Badge, SCAC & Alliance */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-base shadow-md border"
                          style={{
                            backgroundColor: carrier.brandColor,
                            borderColor: '#FFFFFF33',
                          }}
                        >
                          <Ship className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base font-display group-hover:text-cyan-300 transition-colors">
                            {carrier.brandName}
                          </h4>
                          <span className="text-xs text-slate-400 block font-mono">
                            SCAC: <strong className="text-slate-300">{carrier.scac}</strong>
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-slate-300">
                        {carrier.alliance}
                      </span>
                    </div>

                    {/* Fleet Rank & Headquarters */}
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
                      <span>{carrier.fleetRank}</span>
                      <span>{carrier.headquarters}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {carrier.description}
                    </p>

                    {/* Recognized Container Prefixes */}
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                        Recognized Container Prefixes:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {carrier.prefixes.map((pref) => (
                          <span
                            key={pref}
                            className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-cyan-300 border border-slate-800"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Indian Port Gateway Calls */}
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                        Direct India Gateway Calls:
                      </span>
                      <span className="text-xs text-slate-300">
                        {carrier.indiaCoverage.slice(0, 3).join(', ')}...
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleQuickTest(carrier)}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider transition-all cursor-pointer flex-1 text-center"
                    >
                      Track Demo Cargo
                    </button>

                    <a
                      href={carrier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Visit official carrier website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Global Container Prefix Reference Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Global 30+ Container Lines ISO Prefix Registry
                  </h3>
                  <p className="text-xs text-slate-400">
                    Instant container owner lookup for international lines calling Indian and global maritime corridors.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-blue-950 px-2.5 py-1 rounded-full border border-blue-800">
                  BIC & ISO 6346 Verified
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Prefix</th>
                      <th className="py-2.5 px-3">Shipping Line</th>
                      <th className="py-2.5 px-3">SCAC</th>
                      <th className="py-2.5 px-3">HQ / Country</th>
                      <th className="py-2.5 px-3">Official Tracking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    {GLOBAL_SHIPPING_LINES_REGISTRY.slice(0, 15).map((row, i) => (
                      <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 text-cyan-300 font-bold">{row.prefixes.join(', ')}</td>
                        <td className="py-2.5 px-3 text-white font-sans">{row.name}</td>
                        <td className="py-2.5 px-3 text-slate-400">{row.scac}</td>
                        <td className="py-2.5 px-3 text-slate-400 font-sans">{row.country}</td>
                        <td className="py-2.5 px-3">
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
                          >
                            <span>Carrier Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMS EDI & PORT DESK OVERVIEW */}
        {activeTab === 'edi' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                ICEGATE & MARITIME GATEWAY INTEGRATION
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                End-to-End Customs & Shipping Line Synchronization
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                FREIGHTREE LLP bridges your factory floor with Indian Customs (ICEGATE) and premier ocean carriers (MAERSK, MSC, CMA CGM, COSCO, ONE, Hapag-Lloyd, OOCL, Hamburg Süd, SITC, KMTC). We monitor statutory document filings, terminal gate passes, and carrier approvals in real-time.
              </p>
            </div>

            {/* 3 Core Checkpoints */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-900/60 text-cyan-400 flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="font-bold text-white text-sm">Let Export Order (LEO)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fast-track Shipping Bill assessment with Indian Customs at ICD Dadri, Tughlakabad, Mundra, and Nhava Sheva to grant formal export clearance.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-900/60 text-cyan-400 flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="font-bold text-white text-sm">VGM & Terminal Gate-In</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Verified Gross Mass (SOLAS) electronic lodgment and Form-13 terminal gate pass generation ensuring hassle-free container entry into port yards.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-900/60 text-cyan-400 flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="font-bold text-white text-sm">Bill of Lading & Sea Waybill</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Preparation and verification of clean On-Board Bills of Lading directly with Main Line liner desks for expedited banking and Letter of Credit negotiation.
                </p>
              </div>
            </div>

            {/* Direct Contact Banner */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                <span>Direct Coordination Office: </span>
                <strong className="text-white">FREIGHTREE LLP, Sector 63 A, Noida, UP</strong>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Contact Documentation Desk
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Informative Footer Banner */}
        <div className="mt-8 rounded-xl bg-slate-900/50 border border-slate-800 p-4 flex items-start gap-3 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300">Official Main Line Carrier Tracking Synchronization:</strong>{' '}
            Container prefixes (e.g. <span className="font-mono text-cyan-300">MSKU</span> for Maersk, <span className="font-mono text-cyan-300">MEDU</span> for MSC, <span className="font-mono text-cyan-300">CMAU</span> for CMA CGM, <span className="font-mono text-cyan-300">COSU</span> for COSCO, <span className="font-mono text-cyan-300">ONEU</span> for ONE, <span className="font-mono text-cyan-300">HLCU</span> for Hapag-Lloyd, <span className="font-mono text-cyan-300">EMCU</span> for Evergreen, <span className="font-mono text-cyan-300">OOLU</span> for OOCL, <span className="font-mono text-cyan-300">SUDU</span> for Hamburg Süd, <span className="font-mono text-cyan-300">SITU</span> for SITC, <span className="font-mono text-cyan-300">KMTC</span> for KMTC, <span className="font-mono text-cyan-300">SKLU</span> for Sinokor, <span className="font-mono text-cyan-300">REGX</span> for RCL, <span className="font-mono text-cyan-300">SCIU</span> for SCI) are automatically mapped. For immediate BL release or vessel schedule changes, connect directly with FREIGHTREE LLP at{' '}
            <a href={`mailto:${COMPANY_INFO.email}`} className="text-cyan-400 underline hover:text-cyan-300">
              {COMPANY_INFO.email}
            </a>{' '}
            or call{' '}
            <a href={`tel:${COMPANY_INFO.phones[0].clean}`} className="text-cyan-400 underline hover:text-cyan-300">
              {COMPANY_INFO.phones[0].number}
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};
