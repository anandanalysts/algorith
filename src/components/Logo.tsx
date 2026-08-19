import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
  sloganClassName?: string;
  animate?: boolean;
}

export function AlgorithLogoIcon({ size = 36, className = "" }: { size?: number; className?: string }) {
  const gradientId = "algorith-logo-grad-" + Math.random().toString(36).substr(2, 9);
  const glowGradId = "algorith-glow-grad-" + Math.random().toString(36).substr(2, 9);
  const cyanGradId = "algorith-cyan-grad-" + Math.random().toString(36).substr(2, 9);

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
        <linearGradient id={gradientId} x1="10" y1="90" x2="90" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1557E8" />
          <stop offset="50%" stopColor="#168CFF" />
          <stop offset="100%" stopColor="#12D9F5" />
        </linearGradient>
        
        <linearGradient id={cyanGradId} x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#12D9F5" />
          <stop offset="100%" stopColor="#19DDB5" />
        </linearGradient>

        <radialGradient id={glowGradId} cx="50" cy="50" r="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#12D9F5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#061226" stopOpacity="0" />
        </radialGradient>

        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient background glow ring */}
      <circle cx="50" cy="50" r="44" fill={`url(#${glowGradId})`} />
      <circle cx="50" cy="50" r="44" stroke="#12D9F5" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />

      {/* Left Strut of Architectural 'A' */}
      <path 
        d="M50 14L20 82H34L50 44L66 82H80L50 14Z" 
        fill={`url(#${gradientId})`} 
        fillOpacity="0.9"
      />

      {/* Cyber Inner Diamond & Neural Crossbar */}
      <path 
        d="M50 32L38 60H62L50 32Z" 
        fill="#061226" 
      />

      {/* Glowing Algorithm Bridge Vector */}
      <path 
        d="M26 62L74 62" 
        stroke={`url(#${cyanGradId})`} 
        strokeWidth="3.5" 
        strokeLinecap="round"
        filter="url(#neon-glow)"
      />

      {/* Neural Core Nodes */}
      <circle cx="50" cy="14" r="4.5" fill="#12D9F5" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="20" cy="82" r="4" fill="#1557E8" stroke="#12D9F5" strokeWidth="1.5" />
      <circle cx="80" cy="82" r="4" fill="#12D9F5" stroke="#19DDB5" strokeWidth="1.5" />
      <circle cx="50" cy="62" r="3" fill="#19DDB5" />
    </svg>
  );
}

export function AlgorithLogo({ 
  className = "", 
  size = 38, 
  showText = true,
  textClassName = "",
  sloganClassName = ""
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative group/logo flex items-center justify-center">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#1557E8] to-[#12D9F5] opacity-30 blur-sm group-hover/logo:opacity-75 transition duration-300"></div>
        <div className="relative w-10 h-10 rounded-lg bg-[#0B1930] border border-[#12D9F5]/40 flex items-center justify-center p-1 group-hover/logo:border-[#12D9F5] transition-colors">
          <AlgorithLogoIcon size={size} />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={`font-neo text-xl font-bold tracking-[0.06em] text-white leading-none flex items-baseline gap-1 ${textClassName}`}>
            <span>ALG<span className="text-slate-100 font-semibold">orith</span></span>
            <span className="font-['IBM_Plex_Mono'] text-[10px] font-semibold text-[#12D9F5] tracking-widest px-1 py-0.5 rounded bg-[#12D9F5]/10 border border-[#12D9F5]/30">TECH</span>
          </div>
          <div className={`font-['IBM_Plex_Mono'] text-[9px] tracking-[0.18em] text-slate-400 mt-1 uppercase font-medium ${sloganClassName}`}>
            THINK • BUILD • AUTOMATE • GROW
          </div>
        </div>
      )}
    </div>
  );
}
