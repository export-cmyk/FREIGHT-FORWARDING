import React, { useState, useEffect } from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/companyData';
import {
  CalendarCheck,
  FileCheck,
  ShieldAlert,
  Truck,
  Anchor,
  Ship,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= HOW_IT_WORKS_STEPS.length ? 1 : prev + 1));
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getStepIcon = (iconName: string, active: boolean) => {
    const iconClass = `w-5 h-5 transition-transform duration-300 ${active ? 'scale-110' : ''}`;
    switch (iconName) {
      case 'CalendarCheck':
        return <CalendarCheck className={iconClass} />;
      case 'FileCheck':
        return <FileCheck className={iconClass} />;
      case 'ShieldAlert':
        return <ShieldAlert className={iconClass} />;
      case 'Truck':
        return <Truck className={iconClass} />;
      case 'Anchor':
        return <Anchor className={iconClass} />;
      case 'Ship':
        return <Ship className={iconClass} />;
      case 'MapPin':
        return <MapPin className={iconClass} />;
      case 'CheckCircle2':
      default:
        return <CheckCircle2 className={iconClass} />;
    }
  };

  const currentStepData = HOW_IT_WORKS_STEPS[activeStep - 1] || HOW_IT_WORKS_STEPS[0];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background World Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
              <span>Streamlined Execution Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              How Global Freight Movement Works
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
              A systematic 8-stage operational pathway connecting export factories in India to foreign destination ports and doorsteps.
            </p>
          </div>

          {/* Player controls for animation */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? 'Pause Loop' : 'Play Flow'}</span>
            </button>
            <button
              onClick={() => setActiveStep(1)}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset to Phase 01"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 8-Step Connected Timeline Track (Horizontal on desktop, scrollable/card on mobile) */}
        <div className="relative mb-12">
          {/* Animated Connecting Line (Behind icons) */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-slate-800 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${((activeStep - 1) / (HOW_IT_WORKS_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {/* 8 Step Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
            {HOW_IT_WORKS_STEPS.map((s) => {
              const isActive = s.step === activeStep;
              const isPast = s.step < activeStep;

              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setActiveStep(s.step);
                    setIsPlaying(false);
                  }}
                  className={`relative p-3.5 rounded-2xl flex flex-col items-center text-center transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-105 border-2 border-cyan-300'
                      : isPast
                      ? 'bg-slate-800/90 text-cyan-300 border border-slate-700 hover:bg-slate-750'
                      : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:bg-slate-800/80'
                  }`}
                  id={`step-node-${s.step}`}
                >
                  {/* Step Number Tag */}
                  <span
                    className={`text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-full mb-2 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    0{s.step}
                  </span>

                  {/* Icon Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-md'
                        : isPast
                        ? 'bg-cyan-950/80 text-cyan-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {getStepIcon(s.iconName, isActive)}
                  </div>

                  <span className="text-xs font-black tracking-wide leading-tight">
                    {s.title}
                  </span>

                  {/* Tiny status indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Stage Information */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  {currentStepData.statusBadge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  STEP {currentStepData.step} OF 08
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentStepData.title}: <span className="text-cyan-400 font-medium">{currentStepData.subtitle}</span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Verified Checklist for this stage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Carrier & Shipper Alignment</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Continuous Tracking Update</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Statutory Compliance Check</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Documented Handover Record</span>
                </div>
              </div>
            </div>

            {/* Right: Visual Route Flow Preview for This Stage */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl p-5 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-4 border-b border-slate-800 pb-2">
                <span>STAGE TRANSIT STATUS</span>
                <span className="text-cyan-400 font-semibold">ACTIVE EXECUTION</span>
              </div>

              {/* Progress bar visual */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Overall Shipment Lifecycle</span>
                    <span className="text-cyan-300 font-bold">{Math.round((currentStepData.step / 8) * 100)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStepData.step / 8) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Operations Desk Responsibility</div>
                  <div className="font-semibold text-white">FREIGHTREE LLP Documentation & Drayage Team</div>
                  <div className="text-[11px] text-slate-400">Email: docs@freightree.in | Desk: +91 96469 02482</div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setActiveStep((prev) => (prev > 1 ? prev - 1 : 8))}
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Previous Phase
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => (prev < 8 ? prev + 1 : 1))}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
