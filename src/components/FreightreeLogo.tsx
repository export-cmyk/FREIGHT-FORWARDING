import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

/**
 * Official FREIGHTREE SHIPPING & CHARTERING Logo
 * Faithfully recreated from official brand asset FT_LOGO_resized.png:
 * - "FREIGH" + Container Ship "T" + "REE"
 * - Ship "T" features 3 stacked container bays, horizontal vessel hull crossbar,
 *   bridge tower with navigation windows, and forward ship prow/keel.
 * - Subtitle: "SHIPPING & CHARTERING"
 */
export const ShipTMark: React.FC<{
  className?: string;
  color?: string;
  accentColor?: string;
  size?: number;
}> = ({
  className = 'w-10 h-10',
  color = 'currentColor',
  accentColor,
}) => {
  return (
    <svg
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FREIGHTREE Ship T Mark"
    >
      {/* 3 Top Cargo Containers stacked on the deck */}
      <g stroke={color} strokeWidth="3" strokeLinejoin="miter">
        {/* Container 1 (Left) */}
        <rect x="22" y="10" width="18" height="19" fill={accentColor || 'none'} />
        <line x1="28" y1="10" x2="28" y2="29" strokeWidth="2.5" />
        <line x1="34" y1="10" x2="34" y2="29" strokeWidth="2.5" />

        {/* Container 2 (Center) */}
        <rect x="44" y="10" width="22" height="19" fill={accentColor || 'none'} />
        <line x1="51" y1="10" x2="51" y2="29" strokeWidth="2.5" />
        <line x1="58" y1="10" x2="58" y2="29" strokeWidth="2.5" />

        {/* Container 3 (Right) */}
        <rect x="70" y="10" width="18" height="19" fill={accentColor || 'none'} />
        <line x1="76" y1="10" x2="76" y2="29" strokeWidth="2.5" />
        <line x1="82" y1="10" x2="82" y2="29" strokeWidth="2.5" />
      </g>

      {/* Main Ship Hull (Horizontal Crossbar of the 'T') */}
      {/* Sweeps from left stern across deck to right bow with sheer line */}
      <path
        d="M 12 30 
           L 96 30 
           L 106 38 
           L 94 48 
           L 84 48 
           L 84 38
           L 26 38 
           L 26 48 
           L 16 48 
           Z"
        stroke={color}
        strokeWidth="3.2"
        strokeLinejoin="round"
        fill={accentColor ? `${accentColor}20` : 'none'}
      />

      {/* Bow anchor hawsehole / porthole on the right */}
      <circle cx="97" cy="40" r="2" fill={color} />

      {/* Vertical Stem of the 'T': Ship Bridge Superstructure */}
      {/* Mast / Antenna */}
      <line x1="55" y1="38" x2="55" y2="44" stroke={color} strokeWidth="3" />

      {/* Upper Bridge Tier (2 Windows) */}
      <rect
        x="47"
        y="44"
        width="16"
        height="12"
        stroke={color}
        strokeWidth="3"
        fill={accentColor ? `${accentColor}30` : 'none'}
      />
      <line x1="55" y1="44" x2="55" y2="56" stroke={color} strokeWidth="2.5" />

      {/* Lower Bridge Tier (3 Windows) */}
      <rect
        x="42"
        y="56"
        width="26"
        height="14"
        stroke={color}
        strokeWidth="3"
        fill={accentColor ? `${accentColor}30` : 'none'}
      />
      <line x1="50" y1="56" x2="50" y2="70" stroke={color} strokeWidth="2.5" />
      <line x1="60" y1="56" x2="60" y2="70" stroke={color} strokeWidth="2.5" />

      {/* Ship Prow / Lower Keel (Forward facing bow hull) */}
      <path
        d="M 42 70 
           L 44 86 
           L 55 98 
           L 66 86 
           L 68 70 
           Z"
        stroke={color}
        strokeWidth="3.2"
        strokeLinejoin="round"
        fill={accentColor ? `${accentColor}20` : 'none'}
      />

      {/* Center Keel Line down the bow */}
      <line x1="55" y1="70" x2="55" y2="98" stroke={color} strokeWidth="3" />
    </svg>
  );
};

export const FreightreeLogo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const isWhite = variant === 'white';
  const isLight = variant === 'light';

  // Primary colors matching the logo
  const textColor = isWhite
    ? 'text-white'
    : isLight
    ? 'text-slate-100'
    : 'text-[#0B2545]';

  const strokeColor = isWhite ? '#FFFFFF' : isLight ? '#E2E8F0' : '#0B2545';
  const subtitleColor = isWhite
    ? 'text-cyan-300'
    : isLight
    ? 'text-slate-300'
    : 'text-[#0B2545]';

  // Size scalers
  const fontSizes = {
    sm: {
      text: 'text-lg tracking-tight',
      icon: 'w-6 h-6',
      subtitle: 'text-[7.5px] tracking-[0.26em]',
      gap: 'gap-0.5',
    },
    md: {
      text: 'text-xl sm:text-2xl tracking-tight',
      icon: 'w-8 h-8 sm:w-9 sm:h-9',
      subtitle: 'text-[9px] sm:text-[10px] tracking-[0.28em]',
      gap: 'gap-1',
    },
    lg: {
      text: 'text-2xl sm:text-3xl lg:text-4xl tracking-tight',
      icon: 'w-10 h-10 sm:w-12 sm:h-12',
      subtitle: 'text-[11px] sm:text-[13px] tracking-[0.3em]',
      gap: 'gap-1.5',
    },
    xl: {
      text: 'text-3xl sm:text-5xl lg:text-6xl tracking-tight',
      icon: 'w-14 h-14 sm:w-20 sm:h-20',
      subtitle: 'text-xs sm:text-base tracking-[0.32em]',
      gap: 'gap-2',
    },
  };

  const currentSize = fontSizes[size];

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
      id="freightree-logo-container"
    >
      {/* Top Logotype: FREIGH + [SHIP T] + REE */}
      <div className={`flex items-center ${currentSize.gap} font-black font-sans leading-none ${textColor}`}>
        <span className={currentSize.text} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          FREIGH
        </span>

        {/* The Container Ship T */}
        <div className="inline-flex items-center justify-center transform -translate-y-[2px]">
          <ShipTMark
            className={currentSize.icon}
            color={strokeColor}
            accentColor={isWhite ? '#38BDF8' : '#0284C7'}
          />
        </div>

        <span className={currentSize.text} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          REE
        </span>
      </div>

      {/* Subtitle: SHIPPING & CHARTERING */}
      {showSubtitle && (
        <div
          className={`font-bold uppercase font-sans mt-0.5 ${currentSize.subtitle} ${subtitleColor} text-center font-display`}
          style={{ letterSpacing: '0.28em' }}
        >
          SHIPPING & CHARTERING
        </div>
      )}
    </div>
  );
};
