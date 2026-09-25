import React, { useState, useEffect, useRef } from 'react';
import {
  Ship,
  Truck,
  Plane,
  ShieldCheck,
  Play,
  Pause,
  Sun,
  Sunset,
  Moon,
  Activity,
  Maximize2,
  Navigation,
  CheckCircle2,
  Gauge,
  Layers,
  MapPin,
  Eye,
  Info,
  RotateCcw
} from 'lucide-react';
import { FreightreeLogo } from './FreightreeLogo';

interface SimulationProps {
  onOpenQuote?: (service?: string) => void;
  variant?: 'hero' | 'standalone';
}

type SimulationMode = 'all' | 'cargo' | 'truck' | 'customs' | 'air';
type LightingTheme = 'sunset' | 'day' | 'night';

export const LiveLogisticsSimulation: React.FC<SimulationProps> = ({
  onOpenQuote,
  variant = 'hero',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<1 | 2 | 3>(1);
  const [activeMode, setActiveMode] = useState<SimulationMode>('all');
  const [theme, setTheme] = useState<LightingTheme>('sunset');
  const [selectedEntity, setSelectedEntity] = useState<'ship' | 'truck' | 'plane' | 'customs' | null>(null);

  // Animated positions
  const [shipX, setShipX] = useState(12); // % position
  const [truckX, setTruckX] = useState(55); // % position
  const [planeX, setPlaneX] = useState(18); // % position
  const [planeY, setPlaneY] = useState(25); // % position
  const [craneProgress, setCraneProgress] = useState(0); // 0 to 100
  const [customsScanActive, setCustomsScanActive] = useState(true);
  const [statsTick, setStatsTick] = useState(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Real-time animated loop
  useEffect(() => {
    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (isPlaying) {
        const factor = speed * 1.0;

        // Animate Container Vessel (moves gently left to right, then loops)
        setShipX((prev) => {
          const next = prev + 1.2 * factor * delta;
          return next > 45 ? 5 : next;
        });

        // Animate Container Truck (moves right to left or left to right along port expressway)
        setTruckX((prev) => {
          const next = prev + 4.5 * factor * delta;
          return next > 95 ? 42 : next;
        });

        // Animate Cargo Plane (climbs from port towards sky)
        setPlaneX((prev) => {
          const next = prev + 3.8 * factor * delta;
          return next > 98 ? 10 : next;
        });

        setPlaneY((prev) => {
          const next = prev - 1.4 * factor * delta;
          return next < 8 ? 40 : next;
        });

        // Gantry crane hoist
        setCraneProgress((prev) => (prev + 12 * factor * delta) % 100);

        setStatsTick((prev) => prev + 1);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  // Lighting backgrounds matching the uploaded concept image
  const themeGradients = {
    sunset: {
      sky: 'from-[#0B1E38] via-[#1E3A5F] to-[#E67E22]/40',
      sea: 'from-[#041B33] via-[#032B54] to-[#011627]',
      road: '#1E293B',
      sunGlow: 'bg-amber-500/20',
      label: 'Golden Sunset / Twilight (As in Concept)',
    },
    day: {
      sky: 'from-[#0369A1] via-[#0284C7] to-[#7DD3FC]/50',
      sea: 'from-[#0284C7] via-[#0369A1] to-[#0C4A6E]',
      road: '#334155',
      sunGlow: 'bg-yellow-300/30',
      label: 'Maritime Day Port Lighting',
    },
    night: {
      sky: 'from-[#020617] via-[#090D16] to-[#0F172A]',
      sea: 'from-[#030712] via-[#051329] to-[#020617]',
      road: '#0F172A',
      sunGlow: 'bg-cyan-500/10',
      label: 'Night Radar & Vessel AIS Mode',
    },
  };

  const currentTheme = themeGradients[theme];

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 select-none">
      {/* Top Banner Header: Exact Branding Arranged as in Uploaded Concept Image */}
      <div className="pt-6 pb-4 px-4 sm:px-8 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 border-b border-slate-200">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Official FREIGHTREE SHIPPING & CHARTERING Logo */}
          <div className="mb-2">
            <FreightreeLogo variant="dark" size="lg" showSubtitle={true} />
          </div>

          {/* Tagline: YOUR TRUSTED PARTNER IN GLOBAL TRADE */}
          <div className="flex items-center justify-center gap-3 w-full max-w-lg my-1.5">
            <div className="h-px bg-slate-300 flex-1" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-slate-700 font-display">
              YOUR TRUSTED PARTNER IN GLOBAL TRADE
            </span>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          {/* Three Key Service Highlight Badges from the Image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl mt-3">
            {/* Badge 1: CARGO MOVING */}
            <button
              onClick={() => setActiveMode(activeMode === 'cargo' ? 'all' : 'cargo')}
              className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeMode === 'cargo'
                  ? 'bg-blue-50 border-blue-600 shadow-xs ring-1 ring-blue-600'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                <Ship className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="leading-tight">
                <strong className="block text-xs font-black text-[#0B2545] tracking-wide uppercase">
                  CARGO MOVING
                </strong>
                <span className="text-[11px] text-slate-600 font-medium">
                  From Origin to Destination
                </span>
              </div>
            </button>

            {/* Badge 2: TRUCK MOVING */}
            <button
              onClick={() => setActiveMode(activeMode === 'truck' ? 'all' : 'truck')}
              className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeMode === 'truck'
                  ? 'bg-blue-50 border-blue-600 shadow-xs ring-1 ring-blue-600'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="leading-tight">
                <strong className="block text-xs font-black text-[#0B2545] tracking-wide uppercase">
                  TRUCK MOVING
                </strong>
                <span className="text-[11px] text-slate-600 font-medium">
                  Reliable Road Transport
                </span>
              </div>
            </button>

            {/* Badge 3: CUSTOMS CLEARANCE */}
            <button
              onClick={() => setActiveMode(activeMode === 'customs' ? 'all' : 'customs')}
              className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeMode === 'customs'
                  ? 'bg-blue-50 border-blue-600 shadow-xs ring-1 ring-blue-600'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="leading-tight">
                <strong className="block text-xs font-black text-[#0B2545] tracking-wide uppercase">
                  CUSTOMS CLEARANCE
                </strong>
                <span className="text-[11px] text-slate-600 font-medium">
                  Smooth & Hassle-Free Process
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Control Strip & Simulation Status */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-emerald-400 opacity-75' : 'bg-amber-400'}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </span>
            <span className="font-mono font-bold tracking-wider text-white">
              LIVE SIMULATION: {isPlaying ? 'ACTIVE TRANSIT' : 'PAUSED'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <span>•</span>
            <span>Speed: {speed}x</span>
            <span>•</span>
            <span className="text-cyan-400">ICEGATE EDI Sync: Connected</span>
          </div>
        </div>

        {/* Controls: Play/Pause, Speed, Theme, Reset */}
        <div className="flex items-center gap-2">
          {/* Transport Mode Pills */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveMode('all')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                activeMode === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveMode('cargo')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                activeMode === 'cargo' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ocean
            </button>
            <button
              onClick={() => setActiveMode('truck')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                activeMode === 'truck' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Road
            </button>
            <button
              onClick={() => setActiveMode('air')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                activeMode === 'air' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Air
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setTheme('sunset')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                theme === 'sunset' ? 'bg-amber-600/30 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Concept Sunset Ambiance"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('day')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                theme === 'day' ? 'bg-blue-600/30 text-blue-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Daylight Maritime Lighting"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('night')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                theme === 'night' ? 'bg-cyan-600/30 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Night Radar AIS Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 3 : 1)}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono font-bold text-cyan-300 transition-colors cursor-pointer"
            title="Toggle simulation speed"
          >
            {speed}x
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport (Canvas / SVG Stage) */}
      <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] overflow-hidden select-none">
        {/* Background Sky & Maritime Atmospheric Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${currentTheme.sky} transition-colors duration-1000`} />

        {/* Atmospheric Sunlight Glow / Horizon Center */}
        <div className="absolute top-[20%] left-[45%] w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

        {/* Global Satellite Flight Arcs & Meridian Grid in Sky */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 500" fill="none">
          {/* Latitude Arcs */}
          <path d="M 100 80 Q 500 20 900 120" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />
          <path d="M 50 140 Q 500 70 950 160" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4 6" strokeOpacity="0.5" />
          <path d="M 200 220 Q 500 140 850 200" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.3" />

          {/* Global network nodes */}
          <circle cx="280" cy="110" r="3" fill="#38BDF8" className="animate-pulse" />
          <circle cx="520" cy="90" r="3" fill="#38BDF8" className="animate-pulse" />
          <circle cx="740" cy="130" r="3" fill="#38BDF8" className="animate-pulse" />

          {/* Flight Path with Pulsing Jet Stream */}
          <path
            d="M 150 220 Q 420 110 820 50"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeOpacity="0.7"
          />
        </svg>

        {/* Distant Port Horizon, Gantry Cranes & Container Yard Stacks */}
        <div className="absolute top-[28%] left-[32%] w-[38%] h-40 pointer-events-none">
          <svg viewBox="0 0 400 160" className="w-full h-full opacity-85">
            {/* Distant Container Stacks (Multi-colored blocks) */}
            <g opacity="0.7">
              <rect x="20" y="90" width="18" height="20" fill="#dc2626" />
              <rect x="40" y="85" width="22" height="25" fill="#2563eb" />
              <rect x="64" y="92" width="18" height="18" fill="#eab308" />
              <rect x="84" y="80" width="24" height="30" fill="#059669" />
              <rect x="110" y="88" width="20" height="22" fill="#d97706" />
              <rect x="132" y="84" width="24" height="26" fill="#0284c7" />
              <rect x="158" y="90" width="22" height="20" fill="#dc2626" />
            </g>

            {/* Industrial Port Gantry Cranes (Tall blue/orange structures) */}
            {/* Crane 1 */}
            <g transform="translate(60, 20)">
              {/* Legs */}
              <line x1="10" y1="90" x2="25" y2="10" stroke="#0369a1" strokeWidth="2.5" />
              <line x1="45" y1="90" x2="30" y2="10" stroke="#0369a1" strokeWidth="2.5" />
              <line x1="18" y1="45" x2="37" y2="45" stroke="#0369a1" strokeWidth="1.5" />
              {/* Boom */}
              <line x1="0" y1="12" x2="80" y2="12" stroke="#0284c7" strokeWidth="3.5" />
              {/* Cab */}
              <rect x="22" y="5" width="12" height="8" fill="#f97316" />
              {/* Moving Hoist Spreader Cable */}
              <line
                x1={20 + (craneProgress / 100) * 45}
                y1="14"
                x2={20 + (craneProgress / 100) * 45}
                y2="55"
                stroke="#38bdf8"
                strokeWidth="1"
              />
              {/* Suspended Container */}
              <rect
                x={13 + (craneProgress / 100) * 45}
                y="55"
                width="14"
                height="8"
                fill="#2563eb"
                stroke="#60a5fa"
                strokeWidth="0.5"
              />
              {/* Flashing Warning Beacon Light */}
              <circle cx="28" cy="2" r="2" fill="#ef4444" className="animate-ping" />
            </g>

            {/* Crane 2 */}
            <g transform="translate(160, 15)">
              <line x1="10" y1="95" x2="25" y2="10" stroke="#0369a1" strokeWidth="2.5" />
              <line x1="45" y1="95" x2="30" y2="10" stroke="#0369a1" strokeWidth="2.5" />
              <line x1="18" y1="50" x2="37" y2="50" stroke="#0369a1" strokeWidth="1.5" />
              <line x1="0" y1="12" x2="85" y2="12" stroke="#0284c7" strokeWidth="3.5" />
              <rect x="22" y="5" width="12" height="8" fill="#f97316" />
              <circle cx="28" cy="2" r="2" fill="#ef4444" className="animate-ping" />
            </g>

            {/* Crane 3 */}
            <g transform="translate(260, 25)">
              <line x1="10" y1="85" x2="25" y2="10" stroke="#0369a1" strokeWidth="2.5" />
              <line x1="45" y1="85" x2="30" y2="10" stroke="#0369a1" strokeWidth="2.5" />
              <line x1="0" y1="12" x2="75" y2="12" stroke="#0284c7" strokeWidth="3.5" />
              <circle cx="28" cy="2" r="2" fill="#ef4444" className="animate-ping" />
            </g>
          </svg>
        </div>

        {/* ASCENDING CARGO AIRLINER (In the sky) */}
        <div
          className={`absolute transition-all duration-300 pointer-events-auto cursor-pointer z-30 ${
            activeMode === 'air' || activeMode === 'all' ? 'opacity-100' : 'opacity-30'
          }`}
          style={{
            left: `${planeX}%`,
            top: `${planeY}%`,
            transform: 'translate(-50%, -50%) rotate(-12deg)',
          }}
          onClick={() => setSelectedEntity('plane')}
        >
          <div className="relative group">
            {/* Airplane SVG Body */}
            <svg width="140" height="70" viewBox="0 0 140 70" fill="none" className="drop-shadow-xl">
              {/* Contrail / Vapor Trail Behind Engines */}
              <line x1="0" y1="42" x2="40" y2="42" stroke="white" strokeWidth="2.5" strokeOpacity="0.6" strokeDasharray="4 2" />
              <line x1="5" y1="46" x2="45" y2="46" stroke="white" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="3 2" />

              {/* Fuselage */}
              <path
                d="M 15 38 Q 40 36 90 35 Q 125 36 138 42 Q 130 46 95 46 Q 30 46 15 44 Z"
                fill="#F8FAFC"
                stroke="#CBD5E1"
                strokeWidth="1"
              />

              {/* Nose Radome */}
              <path d="M 125 36 Q 138 42 125 44 Z" fill="#334155" />

              {/* Cockpit Windshield */}
              <polygon points="118,37 125,38 122,40 116,40" fill="#0284C7" />

              {/* Swept Main Wing (Port) */}
              <polygon points="65,39 45,68 62,68 85,41" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />

              {/* Jet Engine (Underslung Nacelle) */}
              <rect x="58" y="52" width="22" height="8" rx="3" fill="#334155" />
              <ellipse cx="80" cy="56" rx="2" ry="4" fill="#0284C7" />

              {/* Vertical Tail Fin & Stabilizer */}
              <polygon points="22,38 10,12 28,12 36,38" fill="#0284C7" />
              <polygon points="12,14 26,14 34,36 22,36" fill="#0369A1" />

              {/* Wingtip Navigation Strobe Light */}
              <circle cx="45" cy="68" r="2.5" fill="#22C55E" className="animate-ping" />
              <circle cx="10" cy="12" r="2" fill="#EF4444" className="animate-ping" />
            </svg>

            {/* Aircraft Hover Telemetry Tooltip */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-cyan-300 text-[10px] font-mono whitespace-nowrap border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
              FT-AIR-409 | 520 kts | FL320
            </div>
          </div>
        </div>

        {/* Ocean Waves Surface Layer (Lower-Left 55% of canvas) */}
        <div
          className="absolute bottom-0 left-0 w-[58%] h-[58%] overflow-hidden"
          style={{ background: `linear-gradient(to bottom, #032B54 0%, #021C38 60%, #011124 100%)` }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
            {/* Dynamic wave layers */}
            <path
              d="M 0 40 Q 150 25 300 40 T 600 40 L 600 300 L 0 300 Z"
              fill="#02274d"
              fillOpacity="0.7"
            />
            <path
              d="M 0 80 Q 150 65 300 80 T 600 80 L 600 300 L 0 300 Z"
              fill="#021c38"
              fillOpacity="0.8"
            />
            {/* Realistic Sea Wake Ripples */}
            <path
              d="M 20 120 Q 80 110 160 120 T 320 120 T 480 120"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              fill="none"
            />
            <path
              d="M 60 160 Q 140 150 240 160 T 440 160"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeOpacity="0.3"
              fill="none"
            />
            <path
              d="M 10 210 Q 120 200 250 210 T 520 210"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeOpacity="0.2"
              fill="none"
            />
          </svg>
        </div>

        {/* OCEAN CONTAINER VESSEL (Cruising on Left Ocean Waters) */}
        <div
          className={`absolute bottom-[10%] transition-all duration-300 pointer-events-auto cursor-pointer z-20 ${
            activeMode === 'cargo' || activeMode === 'all' ? 'opacity-100' : 'opacity-30'
          }`}
          style={{
            left: `${shipX}%`,
            transform: 'translate(-50%, 0)',
          }}
          onClick={() => setSelectedEntity('ship')}
        >
          <div className="relative group">
            {/* Vessel SVG with Bulbous Bow & Container Stacks (Faithfully inspired by the concept image) */}
            <svg width="340" height="190" viewBox="0 0 340 190" fill="none" className="drop-shadow-2xl">
              {/* Bow Wave Foam & Water Wake */}
              <path
                d="M 270 145 Q 310 150 335 160 Q 300 170 240 165 Z"
                fill="#E0F2FE"
                fillOpacity="0.6"
              />
              <path
                d="M 20 150 Q 80 155 160 152 Q 220 158 260 150"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeOpacity="0.7"
                fill="none"
              />

              {/* Main Lower Ship Hull (Deep Blue & Red Keel Line) */}
              {/* Red Underwater Hull/Keel */}
              <path
                d="M 40 138 L 260 138 Q 285 142 295 152 L 275 160 Q 230 162 50 162 L 40 138 Z"
                fill="#DC2626"
              />
              {/* Bulbous Bow Bulb */}
              <ellipse cx="288" cy="154" rx="14" ry="7" fill="#B91C1C" />

              {/* Black / Dark Blue Main Hull */}
              <path
                d="M 20 100 L 250 100 Q 285 105 315 125 L 265 140 L 30 140 Z"
                fill="#0F172A"
                stroke="#1E293B"
                strokeWidth="1.5"
              />

              {/* Anchor hawsehole on bow */}
              <circle cx="280" cy="116" r="3" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
              <line x1="280" y1="116" x2="284" y2="128" stroke="#334155" strokeWidth="1.5" />

              {/* Waterline Stripe */}
              <path d="M 30 138 L 265 138" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />

              {/* Loaded Intermodal Shipping Containers on Deck */}
              {/* Tier 1 (Base tier) */}
              <g transform="translate(45, 68)">
                <rect x="0" y="16" width="30" height="16" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
                <rect x="32" y="16" width="30" height="16" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />
                <rect x="64" y="16" width="30" height="16" fill="#16A34A" stroke="#15803D" strokeWidth="1" />
                <rect x="96" y="16" width="30" height="16" fill="#D97706" stroke="#B45309" strokeWidth="1" />
                <rect x="128" y="16" width="30" height="16" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
                <rect x="160" y="16" width="30" height="16" fill="#7C3AED" stroke="#6D28D9" strokeWidth="1" />
                <rect x="192" y="16" width="30" height="16" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />
              </g>

              {/* Tier 2 (Middle tier) */}
              <g transform="translate(55, 52)">
                <rect x="0" y="16" width="30" height="16" fill="#EA580C" stroke="#C2410C" strokeWidth="1" />
                <rect x="32" y="16" width="30" height="16" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
                <rect x="64" y="16" width="30" height="16" fill="#059669" stroke="#047857" strokeWidth="1" />
                <rect x="96" y="16" width="30" height="16" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />
                <rect x="128" y="16" width="30" height="16" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
                <rect x="160" y="16" width="30" height="16" fill="#D97706" stroke="#B45309" strokeWidth="1" />
              </g>

              {/* Tier 3 (Top tier) */}
              <g transform="translate(70, 36)">
                <rect x="0" y="16" width="30" height="16" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
                <rect x="32" y="16" width="30" height="16" fill="#16A34A" stroke="#15803D" strokeWidth="1" />
                <rect x="64" y="16" width="30" height="16" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />
                <rect x="96" y="16" width="30" height="16" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
              </g>

              {/* Superstructure / Bridge Tower (Aft) */}
              <g transform="translate(15, 42)">
                <rect x="0" y="20" width="28" height="38" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                {/* Bridge Windows */}
                <rect x="4" y="24" width="20" height="6" fill="#0284C7" />
                <line x1="9" y1="24" x2="9" y2="30" stroke="#FFFFFF" strokeWidth="0.8" />
                <line x1="14" y1="24" x2="14" y2="30" stroke="#FFFFFF" strokeWidth="0.8" />
                <line x1="19" y1="24" x2="19" y2="30" stroke="#FFFFFF" strokeWidth="0.8" />

                {/* Radar Mast */}
                <line x1="14" y1="20" x2="14" y2="6" stroke="#475569" strokeWidth="2" />
                <line x1="8" y1="10" x2="20" y2="10" stroke="#38BDF8" strokeWidth="2" />
                {/* Rotating Radar Scanner */}
                <ellipse cx="14" cy="6" rx="4" ry="1.5" fill="#38BDF8" className="animate-spin" />

                {/* Funnel / Exhaust Stack */}
                <rect x="4" y="10" width="7" height="12" fill="#DC2626" />
                <rect x="4" y="10" width="7" height="4" fill="#0F172A" />
              </g>

              {/* Vessel Name Label on Bow */}
              <text x="245" y="132" fill="#E2E8F0" fontSize="7" fontWeight="bold" fontFamily="monospace">
                MV FREIGHTREE
              </text>
            </svg>

            {/* Telemetry Tag */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-cyan-300 text-[10px] font-mono whitespace-nowrap shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Ship className="w-3 h-3 text-cyan-400" />
              <span>MV FREIGHTREE VOYAGER | 19.4 KTS | 94% TEU LOAD</span>
            </div>
          </div>
        </div>

        {/* Coastal Highway & Port Expressway (Right 50% of Stage) */}
        <div
          className="absolute bottom-0 right-0 w-[52%] h-[48%] overflow-hidden border-l-2 border-slate-700/60"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
        >
          {/* Highway Asphalt, Lanes & Road Markings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
            {/* Highway surface */}
            <polygon points="0,0 500,40 500,240 0,240" fill="#1e293b" />
            <polygon points="0,60 500,90 500,240 0,240" fill="#0f172a" />

            {/* Highway Guardrails */}
            <line x1="0" y1="60" x2="500" y2="90" stroke="#475569" strokeWidth="4" />
            <line x1="0" y1="235" x2="500" y2="235" stroke="#475569" strokeWidth="4" />

            {/* Fast moving dashed highway lines */}
            <line
              x1="0"
              y1="140"
              x2="500"
              y2="155"
              stroke="#FACC15"
              strokeWidth="2.5"
              strokeDasharray="25 20"
              strokeDashoffset={statsTick * -8}
            />
            <line
              x1="0"
              y1="190"
              x2="500"
              y2="195"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="20 18"
              strokeDashoffset={statsTick * -10}
            />
          </svg>

          {/* Customs Compliance Laser Scanner Portal (Over Road) */}
          <div className="absolute top-[8%] left-[28%] z-10">
            <div className="relative">
              {/* Scanner Arch */}
              <div className="w-1.5 h-36 bg-cyan-500 rounded shadow-[0_0_12px_#38BDF8]" />
              <div className="absolute -top-3 -left-3 px-2 py-0.5 rounded bg-blue-900 border border-cyan-400 text-cyan-300 text-[9px] font-mono whitespace-nowrap shadow-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>ICEGATE RFID GATE</span>
              </div>
              {/* Laser scanning beam downward */}
              <div className="absolute top-6 left-0 w-32 h-28 bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-transparent pointer-events-none animate-pulse" />
            </div>
          </div>
        </div>

        {/* HEAVY CONTAINER TRUCK (Driving on Port Expressway) */}
        <div
          className={`absolute bottom-[6%] transition-all duration-200 pointer-events-auto cursor-pointer z-25 ${
            activeMode === 'truck' || activeMode === 'all' ? 'opacity-100' : 'opacity-30'
          }`}
          style={{
            left: `${truckX}%`,
            transform: 'translate(-50%, 0)',
          }}
          onClick={() => setSelectedEntity('truck')}
        >
          <div className="relative group">
            {/* Detailed Articulated Container Truck SVG (Matching the sleek white prime mover & blue container in the uploaded image) */}
            <svg width="290" height="135" viewBox="0 0 290 135" fill="none" className="drop-shadow-2xl">
              {/* Headlight Beam Projecting Forward */}
              <polygon points="265,95 380,80 380,130 265,115" fill="url(#headlightGlow)" opacity="0.4" />

              {/* 40FT Blue Freight Container on Chassis */}
              <g transform="translate(10, 20)">
                {/* Container Body */}
                <rect x="0" y="0" width="180" height="72" rx="2" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5" />

                {/* Vertical Corrugated Container Flutes */}
                {[...Array(14)].map((_, i) => (
                  <line
                    key={i}
                    x1={12 + i * 11.5}
                    y1="2"
                    x2={12 + i * 11.5}
                    y2="70"
                    stroke="#172554"
                    strokeWidth="2"
                  />
                ))}

                {/* Container Brand / Markings */}
                <rect x="15" y="10" width="48" height="18" fill="#0B2545" rx="2" />
                <text x="18" y="23" fill="#38BDF8" fontSize="8" fontWeight="900" fontFamily="sans-serif">
                  FREIGHTREE
                </text>
                <text x="130" y="20" fill="#93C5FD" fontSize="7" fontWeight="bold" fontFamily="monospace">
                  40' HC • FCL
                </text>
                <text x="130" y="32" fill="#CBD5E1" fontSize="6" fontFamily="monospace">
                  MAX.GR 32,500 KG
                </text>
                <text x="130" y="42" fill="#CBD5E1" fontSize="6" fontFamily="monospace">
                  TARE 3,850 KG
                </text>

                {/* Container Corner Castings */}
                <rect x="0" y="0" width="6" height="6" fill="#64748B" />
                <rect x="174" y="0" width="6" height="6" fill="#64748B" />
                <rect x="0" y="66" width="6" height="6" fill="#64748B" />
                <rect x="174" y="66" width="6" height="6" fill="#64748B" />
              </g>

              {/* Container Chassis / Semi-Trailer Frame */}
              <rect x="8" y="92" width="186" height="8" fill="#334155" />
              {/* Chassis Underrun Protection Guard */}
              <rect x="12" y="100" width="40" height="6" fill="#475569" />

              {/* Trailer Dual Axles & Wheels */}
              {/* Wheel 1 */}
              <circle cx="45" cy="108" r="14" fill="#0F172A" stroke="#475569" strokeWidth="2" />
              <circle cx="45" cy="108" r="7" fill="#64748B" />
              <line x1="45" y1="94" x2="45" y2="122" stroke="#334155" strokeWidth="1.5" />
              {/* Wheel 2 */}
              <circle cx="78" cy="108" r="14" fill="#0F172A" stroke="#475569" strokeWidth="2" />
              <circle cx="78" cy="108" r="7" fill="#64748B" />
              <line x1="78" y1="94" x2="78" y2="122" stroke="#334155" strokeWidth="1.5" />

              {/* Prime Mover / Tractor Cab (White Mercedes/Volvo Style Heavy Truck) */}
              <g transform="translate(192, 28)">
                {/* Main Cab Body (Aerodynamic High-Roof) */}
                <path
                  d="M 0 64 L 6 6 L 45 4 Q 68 8 72 32 L 74 64 Z"
                  fill="#FFFFFF"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                />

                {/* Front Windshield Glass */}
                <polygon points="26,8 44,7 66,28 34,28" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
                {/* Sun Visor */}
                <rect x="24" y="6" width="22" height="4" fill="#1E293B" />

                {/* Side Window */}
                <polygon points="8,10 24,10 32,28 8,28" fill="#0369A1" stroke="#0F172A" strokeWidth="0.8" />

                {/* Front Chrome Grille */}
                <rect x="52" y="36" width="22" height="24" rx="2" fill="#1E293B" />
                <line x1="54" y1="42" x2="72" y2="42" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="54" y1="48" x2="72" y2="48" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="54" y1="54" x2="72" y2="54" stroke="#94A3B8" strokeWidth="1.5" />

                {/* Center Truck Emblem (Star/Shield) */}
                <circle cx="63" cy="48" r="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />

                {/* Headlight Cluster */}
                <rect x="66" y="58" width="8" height="6" fill="#FEF08A" rx="1" />
                <circle cx="70" cy="61" r="2" fill="#FFFFFF" />

                {/* Bumper & Aerodynamic Skirt */}
                <rect x="0" y="64" width="76" height="8" fill="#334155" />

                {/* Rearview Side Mirror */}
                <rect x="36" y="12" width="4" height="14" rx="1" fill="#0F172A" />
              </g>

              {/* Tractor Front & Drive Wheels */}
              {/* Drive Axle Wheel */}
              <circle cx="210" cy="108" r="14" fill="#0F172A" stroke="#475569" strokeWidth="2" />
              <circle cx="210" cy="108" r="7" fill="#64748B" />
              {/* Steer Axle Front Wheel */}
              <circle cx="258" cy="108" r="14" fill="#0F172A" stroke="#475569" strokeWidth="2" />
              <circle cx="258" cy="108" r="7" fill="#E2E8F0" />

              <defs>
                <linearGradient id="headlightGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Telemetry Tag */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-cyan-300 text-[10px] font-mono whitespace-nowrap shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Truck className="w-3 h-3 text-cyan-400" />
              <span>FLEET #FT-TRK-108 | 78 KM/H | NOIDA ➔ NHAVA SHEVA</span>
            </div>
          </div>
        </div>

        {/* Live Entity Inspector Drawer (When clicked) */}
        {selectedEntity && (
          <div className="absolute top-4 right-4 z-40 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-2xl max-w-xs text-white animate-fadeIn">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold font-mono uppercase text-cyan-300">
                  {selectedEntity === 'ship' && 'OCEAN VESSEL TELEMETRY'}
                  {selectedEntity === 'truck' && 'ROAD DRAYAGE TELEMETRY'}
                  {selectedEntity === 'plane' && 'AIR CARGO FLIGHT DATA'}
                </span>
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                className="text-slate-400 hover:text-white text-xs font-mono px-1 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {selectedEntity === 'ship' && (
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Vessel:</span>
                  <strong className="text-white">MV FREIGHTREE VOYAGER</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Voyage:</span>
                  <span className="font-mono text-cyan-400">FT-IN-2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Speed / Draft:</span>
                  <span className="font-mono">19.4 kts / 14.2m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Route:</span>
                  <span>Nhava Sheva ➔ Rotterdam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Container TEU:</span>
                  <span className="text-emerald-400 font-bold">14,280 TEU (94%)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => onOpenQuote?.('Ocean Freight')}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-[11px] font-bold text-white cursor-pointer"
                  >
                    Book FCL / LCL Slot →
                  </button>
                </div>
              </div>
            )}

            {selectedEntity === 'truck' && (
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle ID:</span>
                  <strong className="text-white">FT-TRK-108 (40ft Trailer)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cargo Type:</span>
                  <span>FCL Sealed Container (40' HC)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Origin / Port:</span>
                  <span>Factory Noida ➔ Mundra Port</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">GPS Status:</span>
                  <span className="text-emerald-400 font-bold">Active Tracking / Speed 78 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">E-Way Bill:</span>
                  <span className="font-mono text-cyan-400">VERIFIED / VALID</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => onOpenQuote?.('Transportation')}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-[11px] font-bold text-white cursor-pointer"
                  >
                    Inquire Transport →
                  </button>
                </div>
              </div>
            )}

            {selectedEntity === 'plane' && (
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Flight:</span>
                  <strong className="text-white">FT-AIR-409 Cargo</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Corridor:</span>
                  <span>DEL (Delhi) ➔ FRA (Frankfurt)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Altitude / Speed:</span>
                  <span className="font-mono">FL320 (32,000 ft) / 520 kts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payload:</span>
                  <span className="text-emerald-400 font-bold">Palletized Express Air Cargo</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => onOpenQuote?.('Air Freight')}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-[11px] font-bold text-white cursor-pointer"
                  >
                    Inquire Air Freight →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Ribbon / Decorative Wave: FREIGHT FORWARDING SOLUTIONS */}
      <div className="relative py-4 px-6 bg-gradient-to-r from-[#031B38] via-[#0B2545] to-[#031B38] text-white border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Telemetry Summary */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-400 font-bold">PORT OPERATIONS:</span>
            <span>MUNDRA & NHAVA SHEVA</span>
          </div>
          <span className="hidden md:inline text-slate-600">|</span>
          <div className="hidden md:flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>CUSTOMS EDI LEO APPROVALS REAL-TIME</span>
          </div>
        </div>

        {/* Center Tag: FREIGHT FORWARDING SOLUTIONS (As in image bottom banner) */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-cyan-400/60" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-white font-display">
            FREIGHT FORWARDING SOLUTIONS
          </span>
          <div className="h-px w-8 bg-cyan-400/60" />
        </div>

        {/* Quick CTA */}
        {onOpenQuote && (
          <button
            onClick={() => onOpenQuote()}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider transition-all cursor-pointer shadow-sm"
          >
            REQUEST FREIGHT QUOTE
          </button>
        )}
      </div>
    </div>
  );
};
