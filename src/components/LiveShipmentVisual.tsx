import React, { useState, useEffect } from 'react';
import { SIMULATION_ROUTES } from '../data/companyData';
import {
  Compass,
  Ship,
  Truck,
  Anchor,
  Navigation,
  Globe,
  Radio,
  ArrowRight,
  Clock,
  MapPin,
  Maximize2,
  Info
} from 'lucide-react';

interface LiveShipmentVisualProps {
  onBookCorridor: (routeInfo: string) => void;
  onOpenTrack: () => void;
}

export const LiveShipmentVisual: React.FC<LiveShipmentVisualProps> = ({
  onBookCorridor,
  onOpenTrack,
}) => {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [simulationPercent, setSimulationPercent] = useState(60);

  const route = SIMULATION_ROUTES[selectedRouteIndex];

  // Animate the vessel along the path smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setSimulationPercent((prev) => (prev >= 95 ? 15 : prev + 0.5));
    }, 200);
    return () => clearInterval(timer);
  }, [selectedRouteIndex]);

  // Interpolate coordinates for the moving vessel
  const vesselX =
    route.originCoords.x +
    (route.destCoords.x - route.originCoords.x) * (simulationPercent / 100);
  const vesselY =
    route.originCoords.y +
    (route.destCoords.y - route.originCoords.y) * (simulationPercent / 100) -
    Math.sin((simulationPercent / 100) * Math.PI) * 8; // arc curve

  return (
    <section id="live-visualizer" className="py-20 bg-[#071322] text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Global Logistics Movement Visualizer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              International Cargo Route Control Center
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
              Visualizing major container routes, ocean carrier transit corridors, and port handling nodes connecting Indian trade to worldwide gateways.
            </p>
          </div>

          {/* Route selector buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
            {SIMULATION_ROUTES.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRouteIndex(idx);
                  setSimulationPercent(r.progressPercent);
                }}
                className={`px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer border ${
                  selectedRouteIndex === idx
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* Global Control Center Screen */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative">
          {/* Top Telemetry Header Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-2 text-slate-300">
                <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span className="text-slate-400">CORRIDOR:</span>
                <span className="text-cyan-300 font-bold">{route.name}</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                CARRIER: <span className="text-white">{route.vesselName}</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                MODE: <span className="text-emerald-400">{route.mode}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Transit: {route.estTransit}</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 font-bold">
                Progress: {Math.round(simulationPercent)}%
              </span>
            </div>
          </div>

          {/* Main Map Visual Canvas */}
          <div className="relative w-full h-[420px] sm:h-[480px] bg-[#050e1a] overflow-hidden select-none">
            {/* Lat/Long Grid overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="worldgrid" width="60" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#worldgrid)" />
            </svg>

            {/* Simplified Vector World Map Continents */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35"
              viewBox="0 0 100 80"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* North America */}
              <path
                d="M 10 15 Q 18 10 28 14 Q 30 22 25 35 Q 15 32 10 15 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="0.4"
              />
              {/* South America */}
              <path
                d="M 24 40 Q 34 42 30 65 Q 22 70 20 50 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="0.4"
              />
              {/* Europe */}
              <path
                d="M 45 15 Q 56 12 55 28 Q 45 32 44 20 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="0.4"
              />
              {/* Africa */}
              <path
                d="M 46 32 Q 60 30 58 60 Q 50 72 44 50 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="0.4"
              />
              {/* Asia & India */}
              <path
                d="M 58 12 Q 85 10 88 38 Q 78 55 64 55 Q 60 35 58 12 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="0.4"
              />
              {/* India Subcontinent projection highlight */}
              <path
                d="M 64 40 Q 72 40 68 55 Q 64 55 64 40 Z"
                fill="#0F2847"
                stroke="#0284C7"
                strokeWidth="0.6"
              />
              {/* Australia */}
              <path
                d="M 80 60 Q 94 62 90 78 Q 78 78 80 60 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="0.4"
              />
            </svg>

            {/* Dynamic Connecting Route Line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d={`M ${route.originCoords.x} ${route.originCoords.y} Q ${
                  (route.originCoords.x + route.destCoords.x) / 2
                } ${
                  (route.originCoords.y + route.destCoords.y) / 2 - 8
                } ${route.destCoords.x} ${route.destCoords.y}`}
                stroke="#38BDF8"
                strokeWidth="0.8"
                strokeDasharray="2 1.5"
                fill="none"
              />
            </svg>

            {/* Origin Port Node */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: `${route.originCoords.x}%`, top: `${route.originCoords.y}%` }}
            >
              <div className="relative group cursor-pointer">
                <div className="w-5 h-5 rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center animate-ping" />
                <div className="absolute inset-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                  <Anchor className="w-3 h-3 text-white" />
                </div>
                {/* Tooltip */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-blue-500/50 px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-200 whitespace-nowrap shadow-xl">
                  <div className="font-bold text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span>ORIGIN: {route.origin}</span>
                  </div>
                  <div className="text-slate-400">Loading Port • Customs Cleared</div>
                </div>
              </div>
            </div>

            {/* Destination Port Node */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: `${route.destCoords.x}%`, top: `${route.destCoords.y}%` }}
            >
              <div className="relative group cursor-pointer">
                <div className="w-5 h-5 rounded-full bg-emerald-600/30 border-2 border-emerald-400 flex items-center justify-center animate-ping" />
                <div className="absolute inset-0 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                {/* Tooltip */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-emerald-500/50 px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-200 whitespace-nowrap shadow-xl">
                  <div className="font-bold text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>DEST: {route.destination}</span>
                  </div>
                  <div className="text-slate-400">Discharge Terminal • Door Delivery</div>
                </div>
              </div>
            </div>

            {/* Real-time Moving Vessel / Carrier Marker */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300"
              style={{ left: `${vesselX}%`, top: `${vesselY}%` }}
            >
              <div className="relative">
                {/* Carrier radar ring */}
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 shadow-md">
                    <Ship className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Floating Vessel Callout */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-cyan-400/60 px-3 py-1.5 rounded-lg text-[10px] font-mono whitespace-nowrap shadow-2xl">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                    <Navigation className="w-3 h-3 text-cyan-400 transform rotate-45" />
                    <span>{route.vesselName}</span>
                  </div>
                  <div className="text-slate-400 flex items-center justify-between gap-2">
                    <span>Dist: {route.distance}</span>
                    <span className="text-emerald-400 font-semibold">{route.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Port & Intermodal Activity Docking HUD */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 z-20">
              {/* Active Route Telemetry Card */}
              <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-3 backdrop-blur-md text-xs font-mono max-w-md">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="text-cyan-400 font-bold">FREIGHTREE CARGO MANIFEST</span>
                  <span>{route.mode}</span>
                </div>
                <p className="text-slate-200 text-xs truncate">
                  {route.origin} ➔ {route.destination}
                </p>
                <div className="flex items-center gap-4 mt-1.5 text-[11px] text-slate-400">
                  <span>Containers: 20' / 40' / 40'HC</span>
                  <span className="text-slate-600">•</span>
                  <span>VGM Cleared</span>
                  <span className="text-slate-600">•</span>
                  <span>Direct Bill of Lading</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onBookCorridor(route.name)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Book This Corridor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenTrack}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <SearchIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Track B/L</span>
                </button>
              </div>
            </div>
          </div>

          {/* Control Center Disclaimer & Transparency Note */}
          <div className="bg-slate-900 border-t border-slate-800 px-5 py-3 flex items-start sm:items-center gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="leading-normal">
              <strong className="text-slate-200 font-medium">Interactive Route Simulation:</strong>{' '}
              This map visually illustrates FREIGHTREE LLP's active international trade corridors and multi-modal handling pathways.
              Live carrier EDI and GPS milestone reporting are synchronized for contracted bookings through our operations desk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
