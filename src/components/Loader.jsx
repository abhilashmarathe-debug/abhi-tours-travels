import React, { useState, useEffect } from 'react';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('taxi'); // 'taxi' | 'takeoff' | 'fadeout'

  useEffect(() => {
    // 1. Initial ground roll
    const takeoffTimer = setTimeout(() => {
      setPhase('takeoff');
    }, 450);

    // 2. Flight ascends to the stars while bus glides across highway
    const fadeTimer = setTimeout(() => {
      setPhase('fadeout');
    }, 2450);

    // 3. Unmount loader and reveal application
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 2850);

    return () => {
      clearTimeout(takeoffTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#071326] text-white transition-opacity duration-600 overflow-hidden font-sans select-none ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dynamic Aurora Sky Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-[#071326] to-[#030914] pointer-events-none" />
      
      {/* Golden Sunrise Horizon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[340px] bg-gradient-to-r from-blue-600/15 via-[#FF9900]/15 to-blue-400/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Atmospheric Cloud Streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className={`absolute top-20 left-10 w-96 h-12 bg-white/5 blur-2xl rounded-full transition-transform duration-[3000ms] ${phase === 'takeoff' ? '-translate-x-40' : 'translate-x-0'}`} />
        <div className={`absolute top-44 right-16 w-80 h-16 bg-blue-400/10 blur-2xl rounded-full transition-transform duration-[3000ms] ${phase === 'takeoff' ? 'translate-x-32' : 'translate-x-0'}`} />
      </div>

      {/* Main Multi-Layered Stage */}
      <div className="relative w-full max-w-3xl h-96 flex items-center justify-center overflow-visible px-4">
        
        {/* ========================================================================= */}
        {/* 1. AEROPLANE: ASCENDS FROM RUNWAY UP INTO THE SKY                         */}
        {/* ========================================================================= */}
        <div
          className={`absolute left-4 z-30 transition-all ease-out ${
            phase === 'taxi'
              ? 'translate-x-6 bottom-20 scale-95 duration-500'
              : 'translate-x-[115vw] -translate-y-72 -rotate-14 duration-[1950ms] scale-125'
          }`}
        >
          <div className="relative flex items-center">
            
            {/* Supersonic Jet Vapor Exhaust Trailing Left */}
            <div
              className={`absolute right-[85%] top-[56%] -translate-y-1/2 flex flex-col gap-2 transition-opacity duration-300 pointer-events-none ${
                phase === 'takeoff' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-36 h-2 bg-gradient-to-l from-[#FF9900] via-amber-400/80 to-transparent rounded-full blur-[1px] animate-pulse" />
              <div className="w-24 h-1 bg-gradient-to-l from-sky-400 via-blue-300 to-transparent rounded-full blur-[0.5px]" />
            </div>

            {/* High-Fidelity 3D Stylized Aircraft SVG */}
            <div className="relative drop-shadow-[0_20px_35px_rgba(29,78,216,0.35)]">
              <svg
                width="152"
                height="88"
                viewBox="0 0 240 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-[-3deg]"
              >
                <defs>
                  {/* Fuselage Metallic Reflection */}
                  <linearGradient id="fuselageSpec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#E2E8F0" />
                    <stop offset="75%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>

                  {/* Brand Sapphire Wings */}
                  <linearGradient id="wingSapphire" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="40%" stopColor="#1D4ED8" />
                    <stop offset="100%" stopColor="#0B2545" />
                  </linearGradient>

                  {/* Far Wing Shade */}
                  <linearGradient id="farWing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#1E293B" />
                  </linearGradient>

                  {/* Jet Turbine Core Burn */}
                  <radialGradient id="jetBurn" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="40%" stopColor="#FF9900" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </radialGradient>
                </defs>

                {/* Left Background Wing */}
                <path d="M102 67 L162 16 L180 18 L138 69 Z" fill="url(#farWing)" opacity="0.9" />
                <rect x="115" y="42" width="28" height="10" rx="5" fill="#334155" />

                {/* Sculpted Fuselage */}
                <path
                  d="M14 73 C35 71, 72 65, 178 65 C215 65, 236 73, 239 74 C236 76, 215 83, 178 83 C72 83, 35 77, 14 75 C10 74, 10 73.5, 14 73 Z"
                  fill="url(#fuselageSpec)"
                />

                {/* Cockpit Visor Glaze */}
                <path d="M206 70 C218 71, 226 73, 228 74 C224 75, 216 76, 205 76 C203 73, 204 71, 206 70 Z" fill="#0B2545" />

                {/* Passenger Cabin Illumination */}
                <g fill="#60A5FA" opacity="0.95">
                  <rect x="82" y="71" width="3.5" height="4.5" rx="1.5" />
                  <rect x="91" y="71" width="3.5" height="4.5" rx="1.5" />
                  <rect x="100" y="71" width="3.5" height="4.5" rx="1.5" />
                  <rect x="109" y="71" width="3.5" height="4.5" rx="1.5" />
                  <rect x="118" y="71" width="3.5" height="4.5" rx="1.5" />
                  <rect x="127" y="71" width="3.5" height="4.5" rx="1.5" />
                  <rect x="146" y="71" width="3.5" height="4.5" rx="1.5" />
                  <rect x="155" y="71" width="3.5" height="4.5" rx="1.5" />
                  <rect x="164" y="71" width="3.5" height="4.5" rx="1.5" />
                  <rect x="173" y="71" width="3.5" height="4.5" rx="1.5" />
                </g>

                {/* Tail Vertical Stabilizer */}
                <path d="M18 73 L46 20 L68 20 L46 73 Z" fill="url(#wingSapphire)" />
                <path d="M34 42 L44 20 L54 20 L42 42 Z" fill="#FF9900" />

                {/* Horizontal Tail Wing */}
                <path d="M16 74 L38 59 L52 59 L32 75 Z" fill="#64748B" />

                {/* Swept Main Wing */}
                <path d="M96 76 L152 128 L176 126 L140 76 Z" fill="url(#wingSapphire)" />
                <path d="M171 126 L180 114 L176 126 Z" fill="#FF9900" />

                {/* Turbofan Engine Under Forewing */}
                <rect x="118" y="86" width="34" height="14" rx="7" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
                <ellipse cx="152" cy="93" rx="3.5" ry="7" fill="#64748B" />
                <ellipse cx="118" cy="93" rx="3" ry="6" fill="url(#jetBurn)" />
              </svg>
            </div>

            {/* Flight Tarmac Shadow */}
            <div
              className={`absolute top-26 left-6 h-3 bg-blue-950/80 rounded-full blur-md transition-all duration-700 pointer-events-none ${
                phase === 'takeoff' ? 'w-8 opacity-0 translate-x-24 scale-50' : 'w-28 opacity-100'
              }`}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. ABHI BUS: GLIDES ACROSS LOWER RUNWAY IN OPPOSITE DIRECTION (R -> L)   */}
        {/* ========================================================================= */}
        <div
          className={`absolute right-4 bottom-10 z-20 transition-all ease-in-out pointer-events-none ${
            phase === 'taxi'
              ? 'translate-x-2 duration-500 scale-95'
              : '-translate-x-[115vw] duration-[1950ms] scale-95'
          }`}
        >
          <div className="relative flex items-center">
            
            {/* Front Headlight Beams Piercing Left */}
            <div
              className={`absolute right-[88%] top-[55%] -translate-y-1/2 w-48 h-12 bg-gradient-to-l from-amber-300/40 via-blue-400/15 to-transparent blur-sm rounded-full pointer-events-none transition-opacity duration-300 ${
                phase === 'takeoff' ? 'opacity-100' : 'opacity-60'
              }`}
              style={{ clipPath: 'polygon(100% 40%, 0 0, 0 100%, 100% 60%)' }}
            />

            {/* 3D High-Deck Coach SVG */}
            <div className="relative drop-shadow-[0_12px_22px_rgba(0,0,0,0.5)]">
              <svg
                width="132"
                height="62"
                viewBox="0 0 160 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="coachHull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="45%" stopColor="#1D4ED8" />
                    <stop offset="100%" stopColor="#0B1E3B" />
                  </linearGradient>

                  <linearGradient id="goldLivery" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF9900" />
                    <stop offset="50%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </linearGradient>
                </defs>

                {/* Aerodynamic High-Deck Body (Facing Left) */}
                <path
                  d="M18 48 L154 48 C157 48, 158 46, 158 42 L158 13 C158 8, 154 7, 150 7 L32 7 C21 7, 10 17, 8 28 L6 40 C5 45, 9 48, 18 48 Z"
                  fill="url(#coachHull)"
                />

                {/* Panoramic Windshield */}
                <path d="M10 27 C12 17, 22 11, 30 11 L36 11 L36 34 L8 34 Z" fill="#BAE6FD" opacity="0.9" />

                {/* Upper Deck Sleeper Windows (Lit from within) */}
                <g fill="#E0F2FE" opacity="0.95">
                  <rect x="40" y="11" width="16" height="12" rx="2" />
                  <rect x="59" y="11" width="16" height="12" rx="2" />
                  <rect x="78" y="11" width="16" height="12" rx="2" />
                  <rect x="97" y="11" width="16" height="12" rx="2" />
                  <rect x="116" y="11" width="16" height="12" rx="2" />
                  <rect x="135" y="11" width="16" height="12" rx="2" />
                </g>

                {/* Lower Deck Seater Windows */}
                <g fill="#93C5FD" opacity="0.75">
                  <rect x="40" y="27" width="16" height="8" rx="1.5" />
                  <rect x="59" y="27" width="16" height="8" rx="1.5" />
                  <rect x="78" y="27" width="16" height="8" rx="1.5" />
                  <rect x="97" y="27" width="16" height="8" rx="1.5" />
                  <rect x="116" y="27" width="16" height="8" rx="1.5" />
                  <rect x="135" y="27" width="8" height="8" rx="1.5" />
                </g>

                {/* Gold Crest Ribbon Stripe */}
                <path d="M6 38 C32 38, 70 37, 158 37" stroke="url(#goldLivery)" strokeWidth="2.8" />

                {/* Chrome Hub Wheels */}
                <ellipse cx="32" cy="50" rx="9" ry="9" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <ellipse cx="32" cy="50" rx="5" ry="5" fill="#64748B" />
                <ellipse cx="32" cy="50" rx="2" ry="2" fill="#F8FAFC" />

                <ellipse cx="132" cy="50" rx="9" ry="9" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <ellipse cx="132" cy="50" rx="5" ry="5" fill="#64748B" />
                <ellipse cx="132" cy="50" rx="2" ry="2" fill="#F8FAFC" />
              </svg>
            </div>

            {/* Rear Taillight Trails to the Right */}
            <div
              className={`absolute left-[94%] top-1/2 -translate-y-1/2 flex flex-col gap-1.5 transition-opacity duration-300 pointer-events-none ${
                phase === 'takeoff' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-20 h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-transparent rounded-full blur-[0.5px]" />
              <div className="w-14 h-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. ILLUMINATED RUNWAY & HIGHWAY STRIP                                     */}
        {/* ========================================================================= */}
        <div className="absolute bottom-11 inset-x-2 h-3.5 bg-slate-900/90 rounded-full overflow-hidden border border-slate-700/80 shadow-[0_0_20px_rgba(29,78,216,0.3)]">
          {/* Dual Transit Flow Light Strips */}
          <div
            className={`h-full bg-gradient-to-r from-transparent via-[#FF9900] to-sky-400 transition-all duration-1000 ${
              phase === 'takeoff' ? 'w-full translate-x-full duration-1000' : 'w-36 -translate-x-16 animate-pulse'
            }`}
          />
        </div>

        {/* Neon Runway Approach Lights */}
        <div className="absolute bottom-5 inset-x-8 flex justify-between opacity-70">
          <span className="w-8 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
          <span className="w-8 h-1 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
          <span className="w-8 h-1 bg-[#FF9900] rounded-full shadow-[0_0_8px_#ff9900]" />
          <span className="w-8 h-1 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
          <span className="w-8 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
          <span className="w-8 h-1 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
          <span className="w-8 h-1 bg-[#FF9900] rounded-full shadow-[0_0_8px_#ff9900]" />
        </div>
      </div>

      {/* Brand Identity & Status */}
      <div className="relative z-10 text-center space-y-2.5 mt-2">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            ABHI
          </span>
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#FF9900] font-mono drop-shadow-[0_2px_14px_rgba(255,153,0,0.4)]">
            WORLD
          </span>
        </div>

        <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400 font-extrabold">
          {phase === 'taxi' && 'Preparing Flight Deck & Highway Corridors...'}
          {phase === 'takeoff' && 'Flight In Ascent • Coach En Route Below'}
          {phase === 'fadeout' && 'Welcome Aboard • Departures Active'}
        </p>

        {/* High-Precision Status Bar */}
        <div className="w-60 h-1.5 bg-slate-800/80 rounded-full mx-auto overflow-hidden mt-3 border border-slate-700/60 p-0.5">
          <div
            className={`h-full bg-gradient-to-r from-blue-500 via-[#FF9900] to-emerald-400 rounded-full transition-all duration-[2400ms] ease-out shadow-[0_0_12px_#3b82f6] ${
              phase === 'taxi' ? 'w-1/4' : 'w-full'
            }`}
          />
        </div>
      </div>
    </div>
  );
}