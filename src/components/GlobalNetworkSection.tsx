import React, { useState } from 'react';
import { GLOBAL_NETWORK_HUBS } from '../data/companyData';
import { NetworkHub } from '../types';
import {
  Globe,
  MapPin,
  Anchor,
  Ship,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Navigation
} from 'lucide-react';

interface GlobalNetworkSectionProps {
  onSelectHubForQuote: (regionName: string) => void;
}

export const GlobalNetworkSection: React.FC<GlobalNetworkSectionProps> = ({
  onSelectHubForQuote,
}) => {
  const [selectedHubId, setSelectedHubId] = useState<string>('india');

  const selectedHub =
    GLOBAL_NETWORK_HUBS.find((h) => h.id === selectedHubId) || GLOBAL_NETWORK_HUBS[0];

  return (
    <section id="network" className="py-20 bg-slate-900 text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Worldwide Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Global Trade Corridors & Port Network
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Connecting key manufacturing centers in India with premier sea ports and international air terminals across the globe.
          </p>
        </div>

        {/* Global Network World Map Visualizer */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl mb-12">
          {/* Map Canvas */}
          <div className="relative w-full h-[360px] sm:h-[420px] bg-[#051122] rounded-xl border border-slate-800/80 overflow-hidden select-none">
            {/* SVG Continents & Connecting Corridors */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 80"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* World Grid Lines */}
              <defs>
                <pattern id="netgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#netgrid)" />

              {/* Continents Base */}
              {/* North America */}
              <path d="M 8 16 Q 16 10 26 14 Q 28 24 22 36 Q 14 34 8 16 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="0.3" />
              {/* South America */}
              <path d="M 22 42 Q 32 44 28 66 Q 20 70 18 52 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="0.3" />
              {/* Europe */}
              <path d="M 44 16 Q 54 13 54 28 Q 44 32 43 20 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="0.3" />
              {/* Africa */}
              <path d="M 45 34 Q 58 32 56 62 Q 48 72 43 52 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="0.3" />
              {/* Asia */}
              <path d="M 57 14 Q 84 12 86 38 Q 76 56 63 56 Q 59 36 57 14 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="0.3" />
              {/* India */}
              <path d="M 64 42 Q 71 42 68 54 Q 64 54 64 42 Z" fill="#1e3a8a" stroke="#38BDF8" strokeWidth="0.6" />
              {/* Australia */}
              <path d="M 78 62 Q 92 64 88 78 Q 76 78 78 62 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="0.3" />

              {/* Dynamic Trade Lines from India to All Hubs */}
              {GLOBAL_NETWORK_HUBS.filter((h) => h.id !== 'india').map((hub) => (
                <g key={hub.id}>
                  <path
                    d={`M 67 48 Q ${(67 + hub.coordinates.x) / 2} ${
                      Math.min(48, hub.coordinates.y) - 6
                    } ${hub.coordinates.x} ${hub.coordinates.y}`}
                    stroke={selectedHubId === hub.id ? '#38BDF8' : '#0284C7'}
                    strokeWidth={selectedHubId === hub.id ? '0.9' : '0.4'}
                    strokeDasharray={selectedHubId === hub.id ? 'none' : '1.5 1.5'}
                    strokeOpacity={selectedHubId === hub.id ? 1 : 0.4}
                    fill="none"
                  />
                </g>
              ))}
            </svg>

            {/* Interactive Hub Node Pins */}
            {GLOBAL_NETWORK_HUBS.map((hub) => {
              const isSelected = hub.id === selectedHubId;
              const isIndia = hub.id === 'india';

              return (
                <div
                  key={hub.id}
                  onClick={() => setSelectedHubId(hub.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  style={{ left: `${hub.coordinates.x}%`, top: `${hub.coordinates.y}%` }}
                >
                  <div className="relative">
                    {/* Pulsing ring */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-cyan-400/30 border border-cyan-400 animate-ping'
                          : 'bg-blue-600/20 group-hover:bg-blue-600/40'
                      }`}
                    />
                    {/* Node Core */}
                    <div
                      className={`absolute inset-0 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 scale-110 font-bold ring-2 ring-white'
                          : isIndia
                          ? 'bg-blue-600 text-white ring-2 ring-cyan-300'
                          : 'bg-slate-800 text-slate-300 group-hover:bg-blue-600 group-hover:text-white'
                      }`}
                    >
                      {isIndia ? (
                        <Ship className="w-3.5 h-3.5" />
                      ) : (
                        <MapPin className="w-3 h-3" />
                      )}
                    </div>

                    {/* Node Label Tooltip */}
                    <div
                      className={`absolute top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-all shadow-md ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : 'bg-slate-900/90 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {hub.region.split(' ')[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Hub Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2">
            {GLOBAL_NETWORK_HUBS.map((hub) => (
              <button
                key={hub.id}
                onClick={() => setSelectedHubId(hub.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  hub.id === selectedHubId
                    ? 'bg-blue-600 text-white border-blue-500 shadow'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                {hub.region}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Hub Details Card */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <Navigation className="w-3.5 h-3.5" />
                <span>TRADE CORRIDOR DETAILS</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedHub.region}</h3>
              <p className="text-sm text-slate-400 mt-1">{selectedHub.description}</p>
            </div>

            <button
              onClick={() => onSelectHubForQuote(selectedHub.region)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide shadow-md transition-all whitespace-nowrap cursor-pointer"
            >
              <span>INQUIRE FREIGHT TO {selectedHub.region.toUpperCase()}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {/* Key Gateway Ports */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2 font-bold">
                GATEWAY SEAPORTS & HUBS
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedHub.ports.map((p, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2">
                    <Anchor className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Frequency */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2 font-bold">
                SERVICE CAPABILITY & FREQUENCY
              </span>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedHub.activeTradeVolume}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>FCL (Full Container Load) Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>LCL Consolidation Handled</span>
                </div>
              </div>
            </div>

            {/* Documentation & Clearance */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2 font-bold">
                REGULATORY & CUSTOMS HANDLING
              </span>
              <div className="space-y-1.5 text-xs text-slate-300">
                <p>• Verified VGM Submission</p>
                <p>• Country-Specific Certificate of Origin</p>
                <p>• Consignee BL Documentation Support</p>
                <p>• Single-Window Desk Coordination</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
