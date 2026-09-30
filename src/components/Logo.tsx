import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showIcon?: boolean;
  showSlogan?: boolean;
  sloganClassName?: string;
  wordmarkClassName?: string;
  techBadgeClassName?: string;
}

/**
 * 3D Holographic Hexagon Icon
 */
export function AlgorithLogoIcon({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="hexGrad" x1="12" y1="88" x2="88" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F5D4" />
          <stop offset="35%" stopColor="#12D9F5" />
          <stop offset="70%" stopColor="#1557E8" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        <radialGradient id="centerBall" cx="44%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#70E4FF" />
          <stop offset="30%" stopColor="#00A2FF" />
          <stop offset="75%" stopColor="#0052D4" />
          <stop offset="100%" stopColor="#002D80" />
        </radialGradient>

        <radialGradient id="emeraldBall" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#80FFDB" />
          <stop offset="30%" stopColor="#19DDB5" />
          <stop offset="70%" stopColor="#00A876" />
          <stop offset="100%" stopColor="#00543B" />
        </radialGradient>
      </defs>

      {/* Hexagon Border */}
      <path
        d="M 45 6.2 Q 50 3.5 55 6.2 L 85.8 24.2 Q 90.5 27 90.5 32.4 L 90.5 67.6 Q 90.5 73 85.8 75.8 L 55 93.8 Q 50 96.5 45 93.8 L 14.2 75.8 Q 9.5 73 9.5 67.6 L 9.5 32.4 Q 9.5 27 14.2 24.2 Z"
        stroke="url(#hexGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#060D1A"
      />

      {/* Futuristic Internal Nodes */}
      <circle cx="50" cy="48" r="8" fill="url(#centerBall)" />
      <circle cx="28" cy="58" r="6.5" fill="url(#emeraldBall)" />
      <circle cx="40" cy="68" r="6.5" fill="url(#emeraldBall)" />
      <circle cx="68" cy="36" r="5" fill="#70E4FF" />
      <circle cx="74" cy="54" r="5.5" fill="#12D9F5" />
    </svg>
  );
}

/**
 * Exact ALGorith TECH Brand Lockup matching official brand specification
 * - "AL" + angular "G" + "orith"
 * - "[ TECH ]" pill badge
 * - "THINK • BUILD • AUTOMATE • GROW"
 */
export function AlgorithBrandLockup({
  showIcon = false,
  showSlogan = true,
  className = "",
  wordmarkClassName = "text-2xl sm:text-3xl",
  sloganClassName = "text-[9px] sm:text-[10px]",
  techBadgeClassName = "text-[10px] sm:text-[11px] px-2 py-0.5"
}: LogoProps) {
  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {/* Top Line: Icon + Wordmark + TECH Badge */}
      <div className="flex items-center gap-2.5">
        {showIcon && (
          <div className="w-8 h-8 rounded-lg bg-[#0C172E] border border-[#12D9F5]/30 flex items-center justify-center p-0.5 shrink-0">
            <AlgorithLogoIcon size={26} />
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Main Wordmark: AL + G + orith */}
          <div className={`font-display font-bold text-white tracking-tight flex items-baseline leading-none ${wordmarkClassName}`}>
            <span>AL</span>
            <span className="font-neo font-extrabold tracking-normal">G</span>
            <span>orith</span>
          </div>

          {/* TECH Badge */}
          <div className={`font-mono font-bold uppercase text-[#12D9F5] bg-[#0A1A2E]/80 border border-[#12D9F5]/60 rounded-md tracking-wider flex items-center justify-center shadow-sm shadow-cyan-950/50 ${techBadgeClassName}`}>
            TECH
          </div>
        </div>
      </div>

      {/* Bottom Line: Slogan */}
      {showSlogan && (
        <div className={`font-mono uppercase tracking-[0.22em] text-[#7A8B9E] font-medium mt-1 leading-none ${sloganClassName}`}>
          THINK &bull; BUILD &bull; AUTOMATE &bull; GROW
        </div>
      )}
    </div>
  );
}

/**
 * Default Logo Component (Used in Navigation & Footer)
 */
export function AlgorithLogo({
  className = "",
  size = 32,
  showIcon = true,
  showSlogan = true
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {showIcon && (
        <div className="relative group/icon flex items-center justify-center shrink-0">
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#1557E8] to-[#12D9F5] opacity-25 group-hover/icon:opacity-60 transition duration-300 blur-[2px]" />
          <div className="relative w-9 h-9 rounded-lg bg-[#0B1528] border border-[#12D9F5]/40 flex items-center justify-center p-1">
            <AlgorithLogoIcon size={size} />
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white flex items-baseline leading-none">
            <span>AL</span>
            <span className="font-neo font-extrabold">G</span>
            <span>orith</span>
          </span>

          <span className="font-mono text-[9px] font-bold text-[#12D9F5] uppercase px-1.5 py-0.5 rounded bg-[#0A1A2E] border border-[#12D9F5]/60 tracking-wider shadow-sm">
            TECH
          </span>
        </div>

        {showSlogan && (
          <div className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-slate-400 font-medium mt-1 leading-none">
            THINK &bull; BUILD &bull; AUTOMATE &bull; GROW
          </div>
        )}
      </div>
    </div>
  );
}

export { AlgorithLogo as Logo };
