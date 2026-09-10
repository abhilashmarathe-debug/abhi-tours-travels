import React, { useState, useEffect } from 'react';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('taxi'); // 'taxi' | 'takeoff' | 'fadeout'

  useEffect(() => {
    // 1. Initial relaxed ground roll & tarmac preview
    const takeoffTimer = setTimeout(() => {
      setPhase('takeoff');
    }, 900);

    // 2. Flight ascends gently while coach glides smoothly across the road below
    const fadeTimer = setTimeout(() => {
      setPhase('fadeout');
    }, 4200);

    // 3. Unmount loader and reveal application
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 4800);

    return () => {
      clearTimeout(takeoffTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-slate-900 transition-opacity duration-700 overflow-hidden font-sans select-none ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Crisp Daylight Gradient Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/60 via-blue-50/40 to-slate-50 pointer-events-none" />

      {/* Sunburst Morning Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[340px] bg-gradient-to-r from-sky-200/50 via-amber-100/40 to-blue-200/30 blur-3xl rounded-full pointer-events-none" />

      {/* Soft Drifting Vapor Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div
          className={`absolute top-14 left-10 w-96 h-12 bg-sky-200/60 blur-2xl rounded-full transition-transform duration-[4500ms] ${
            phase === 'takeoff' ? '-translate-x-36' : 'translate-x-0'
          }`}
        />
        <div
          className={`absolute top-36 right-12 w-80 h-14 bg-amber-200/40 blur-2xl rounded-full transition-transform duration-[4500ms] ${
            phase === 'takeoff' ? 'translate-x-32' : 'translate-x-0'
          }`}
        />
      </div>

      {/* Main Multi-Layered Stage */}
      <div className="relative w-full max-w-4xl h-[420px] flex items-center justify-center overflow-visible px-4">

        {/* ========================================================================= */}
        {/* BACKDROP: LUXURY RESORTS & METROPOLITAN SKYSCRAPERS (PARALLAX VECTOR)    */}
        {/* ========================================================================= */}
        <div
          className={`absolute bottom-11 inset-x-0 h-56 flex items-end justify-center pointer-events-none transition-transform duration-[3800ms] ease-out ${
            phase === 'takeoff' ? '-translate-x-8 scale-[1.02]' : 'translate-x-0 scale-100'
          }`}
        >
          <svg
            viewBox="0 0 1000 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-bottom opacity-75"
          >
            <defs>
              <linearGradient id="hotelGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#DBEAFE" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.05" />
              </linearGradient>

              <linearGradient id="skyScraperGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* --- Distant Layer: Mega-Towers & Spires --- */}
            <g fill="url(#skyScraperGrad)" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.4">
              <path d="M495 20 L500 0 L505 20 L514 90 L514 240 L486 240 L486 90 Z" />
              <rect x="230" y="55" width="46" height="185" rx="3" />
              <path d="M230 55 L253 28 L276 55 Z" />
              <rect x="740" y="45" width="54" height="195" rx="3" />
              <path d="M740 45 L767 18 L794 45 Z" />
              <path d="M340 70 L385 45 L385 240 L340 240 Z" />
              <path d="M620 50 L675 75 L675 240 L620 240 Z" />
            </g>

            {/* --- Forefront Layer: Grand Heritage Palaces & Luxury Hotels --- */}
            <g fill="url(#hotelGrad)" stroke="#60A5FA" strokeWidth="1.2" strokeOpacity="0.55">
              <rect x="80" y="95" width="90" height="145" rx="4" />
              <path d="M80 95 L125 70 L170 95 Z" />
              <g stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.6">
                <line x1="92" y1="115" x2="158" y2="115" />
                <line x1="92" y1="135" x2="158" y2="135" />
                <line x1="92" y1="155" x2="158" y2="155" />
                <line x1="92" y1="175" x2="158" y2="175" />
                <line x1="92" y1="195" x2="158" y2="195" />
              </g>

              <path d="M185 130 L215 130 L215 105 L230 105 L230 85 L260 85 L260 105 L275 105 L275 130 L305 130 L305 240 L185 240 Z" />

              <rect x="400" y="85" width="70" height="155" rx="3" />
              <circle cx="435" cy="115" r="14" stroke="#60A5FA" strokeWidth="1" fill="none" opacity="0.7" />

              <rect x="530" y="75" width="75" height="165" rx="3" />
              <g fill="#93C5FD" opacity="0.45">
                <rect x="542" y="90" width="10" height="12" rx="1" />
                <rect x="562" y="90" width="10" height="12" rx="1" />
                <rect x="582" y="90" width="10" height="12" rx="1" />
                <rect x="542" y="112" width="10" height="12" rx="1" />
                <rect x="562" y="112" width="10" height="12" rx="1" />
                <rect x="582" y="112" width="10" height="12" rx="1" />
                <rect x="542" y="134" width="10" height="12" rx="1" />
                <rect x="562" y="134" width="10" height="12" rx="1" />
                <rect x="582" y="134" width="10" height="12" rx="1" />
              </g>

              <path d="M815 110 Q850 65 885 110 L885 240 L815 240 Z" />
              <line x1="850" y1="65" x2="850" y2="48" stroke="#60A5FA" strokeWidth="1.5" />
              <circle cx="850" cy="46" r="2.5" fill="#FF9900" />

              <rect x="900" y="100" width="60" height="140" rx="3" />
              <path d="M900 100 L930 80 L960 100 Z" />
            </g>

            {/* Subtle Palms */}
            <g stroke="#60A5FA" strokeWidth="1" opacity="0.5" fill="none">
              <path d="M55 240 Q65 210 60 195 Q50 190 40 200 M60 195 Q70 185 80 192 M60 195 Q65 180 60 175" />
              <path d="M710 240 Q718 215 715 200 Q705 195 695 205 M715 200 Q725 190 735 197 M715 200 Q720 185 715 180" />
            </g>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* 1. AEROPLANE: LIFTS OFF RUNWAY AND ASCENDS TO TOP-RIGHT                  */}
        {/* ========================================================================= */}
        <div
          className={`absolute left-4 z-30 transition-all ease-out ${
            phase === 'taxi'
              ? 'translate-x-6 bottom-20 scale-95 duration-900'
              : 'translate-x-[115vw] -translate-y-72 -rotate-14 duration-[3400ms] scale-125'
          }`}
        >
          <div className="relative flex items-center">

            {/* Jet Engine Thermal Wake & Vapor Lines */}
            <div
              className={`absolute right-[85%] top-[56%] -translate-y-1/2 flex flex-col gap-2 transition-opacity duration-500 pointer-events-none ${
                phase === 'takeoff' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-36 h-2 bg-gradient-to-l from-[#FF9900] via-amber-300 to-transparent rounded-full blur-[0.8px] animate-pulse" />
              <div className="w-24 h-1 bg-gradient-to-l from-blue-400 via-sky-200 to-transparent rounded-full blur-[0.5px]" />
            </div>

            {/* Aerodynamic 3D Vector Airliner */}
            <div className="relative drop-shadow-[0_16px_22px_rgba(15,23,42,0.18)]">
              <svg
                width="152"
                height="88"
                viewBox="0 0 240 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-[-3deg]"
              >
                <defs>
                  <linearGradient id="planeBodyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#F1F5F9" />
                    <stop offset="75%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#94A3B8" />
                  </linearGradient>

                  <linearGradient id="planeWingGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#1D4ED8" />
                    <stop offset="100%" stopColor="#0B2545" />
                  </linearGradient>

                  <linearGradient id="planeUnderwing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#64748B" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>

                  <radialGradient id="planeJetBurn" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="40%" stopColor="#FF9900" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </radialGradient>
                </defs>

                <path d="M102 67 L162 16 L180 18 L138 69 Z" fill="url(#planeUnderwing)" opacity="0.85" />
                <rect x="115" y="42" width="28" height="10" rx="5" fill="#475569" />

                <path
                  d="M14 73 C35 71, 72 65, 178 65 C215 65, 236 73, 239 74 C236 76, 215 83, 178 83 C72 83, 35 77, 14 75 C10 74, 10 73.5, 14 73 Z"
                  fill="url(#planeBodyGrad)"
                />

                <path d="M206 70 C218 71, 226 73, 228 74 C224 75, 216 76, 205 76 C203 73, 204 71, 206 70 Z" fill="#0B2545" />

                <g fill="#0B2545" opacity="0.85">
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

                <path d="M18 73 L46 20 L68 20 L46 73 Z" fill="url(#planeWingGrad)" />
                <path d="M34 42 L44 20 L54 20 L42 42 Z" fill="#FF9900" />

                <path d="M16 74 L38 59 L52 59 L32 75 Z" fill="#64748B" />

                <path d="M96 76 L152 128 L176 126 L140 76 Z" fill="url(#planeWingGrad)" />
                <path d="M171 126 L180 114 L176 126 Z" fill="#FF9900" />

                <rect x="118" y="86" width="34" height="14" rx="7" fill="#334155" />
                <ellipse cx="152" cy="93" rx="3.5" ry="7" fill="#64748B" />
                <ellipse cx="118" cy="93" rx="3" ry="6" fill="url(#planeJetBurn)" />
              </svg>
            </div>

            {/* Dissipating Tarmac Shadow */}
            <div
              className={`absolute top-26 left-6 h-3 bg-slate-300/70 rounded-full blur-md transition-all duration-1000 pointer-events-none ${
                phase === 'takeoff' ? 'w-8 opacity-0 translate-x-24 scale-50' : 'w-28 opacity-100'
              }`}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. ABHI BUS: GLIDES SAFELY UNDERNEATH IN OPPOSITE DIRECTION (R -> L)     */}
        {/* ========================================================================= */}
        <div
          className={`absolute right-4 bottom-10 z-20 transition-all ease-in-out pointer-events-none ${
            phase === 'taxi'
              ? 'translate-x-2 duration-900 scale-95'
              : '-translate-x-[115vw] duration-[3400ms] scale-95'
          }`}
        >
          <div className="relative flex items-center">

            {/* Front Headlight Beams Piercing Road Ahead */}
            <div
              className={`absolute right-[88%] top-[55%] -translate-y-1/2 w-44 h-11 bg-gradient-to-l from-amber-300/60 via-amber-200/20 to-transparent blur-xs rounded-full pointer-events-none transition-opacity duration-500 ${
                phase === 'takeoff' ? 'opacity-100' : 'opacity-60'
              }`}
              style={{ clipPath: 'polygon(100% 35%, 0 0, 0 100%, 100% 65%)' }}
            />

            {/* 3D High-Deck Coach Entity */}
            <div className="relative drop-shadow-[0_12px_18px_rgba(15,23,42,0.22)]">
              <svg
                width="132"
                height="62"
                viewBox="0 0 160 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="busHullGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="50%" stopColor="#1D4ED8" />
                    <stop offset="100%" stopColor="#0B2545" />
                  </linearGradient>

                  <linearGradient id="busGoldStripe" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF9900" />
                    <stop offset="50%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </linearGradient>
                </defs>

                <path
                  d="M18 48 L154 48 C157 48, 158 46, 158 42 L158 13 C158 8, 154 7, 150 7 L32 7 C21 7, 10 17, 8 28 L6 40 C5 45, 9 48, 18 48 Z"
                  fill="url(#busHullGrad)"
                />

                <path d="M10 27 C12 17, 22 11, 30 11 L36 11 L36 34 L8 34 Z" fill="#E0F2FE" opacity="0.9" />

                <g fill="#F0F9FF" opacity="0.95">
                  <rect x="40" y="11" width="16" height="12" rx="2" />
                  <rect x="59" y="11" width="16" height="12" rx="2" />
                  <rect x="78" y="11" width="16" height="12" rx="2" />
                  <rect x="97" y="11" width="16" height="12" rx="2" />
                  <rect x="116" y="11" width="16" height="12" rx="2" />
                  <rect x="135" y="11" width="16" height="12" rx="2" />
                </g>

                <g fill="#BAE6FD" opacity="0.8">
                  <rect x="40" y="27" width="16" height="8" rx="1.5" />
                  <rect x="59" y="27" width="16" height="8" rx="1.5" />
                  <rect x="78" y="27" width="16" height="8" rx="1.5" />
                  <rect x="97" y="27" width="16" height="8" rx="1.5" />
                  <rect x="116" y="27" width="16" height="8" rx="1.5" />
                  <rect x="135" y="27" width="8" height="8" rx="1.5" />
                </g>

                <path d="M6 38 C32 38, 70 37, 158 37" stroke="url(#busGoldStripe)" strokeWidth="2.8" />
                <rect x="6" y="41" width="3.5" height="4" rx="1" fill="#FEF08A" />

                <ellipse cx="32" cy="50" rx="9" ry="9" fill="#0F172A" />
                <ellipse cx="32" cy="50" rx="5" ry="5" fill="#64748B" />
                <ellipse cx="32" cy="50" rx="2" ry="2" fill="#FFFFFF" />

                <ellipse cx="132" cy="50" rx="9" ry="9" fill="#0F172A" />
                <ellipse cx="132" cy="50" rx="5" ry="5" fill="#64748B" />
                <ellipse cx="132" cy="50" rx="2" ry="2" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Rear Red Brake Light Trails */}
            <div
              className={`absolute left-[94%] top-1/2 -translate-y-1/2 flex flex-col gap-1.5 transition-opacity duration-500 pointer-events-none ${
                phase === 'takeoff' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-20 h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-transparent rounded-full blur-[0.5px]" />
              <div className="w-14 h-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CLEAN DAYLIGHT RUNWAY & EXPRESSWAY DECK                                */}
        {/* ========================================================================= */}
        <div className="absolute bottom-11 inset-x-2 h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300 shadow-inner">
          <div
            className={`h-full bg-gradient-to-r from-transparent via-[#FF9900] to-blue-600 transition-all duration-1000 ${
              phase === 'takeoff' ? 'w-full translate-x-full duration-1000' : 'w-36 -translate-x-16 animate-pulse'
            }`}
          />
        </div>

        {/* Highway & Runway Centerline Markings */}
        <div className="absolute bottom-5 inset-x-8 flex justify-between opacity-60">
          <span className="w-8 h-1 bg-slate-400 rounded-full" />
          <span className="w-8 h-1 bg-slate-300 rounded-full" />
          <span className="w-8 h-1 bg-[#FF9900] rounded-full" />
          <span className="w-8 h-1 bg-slate-300 rounded-full" />
          <span className="w-8 h-1 bg-[#1D4ED8] rounded-full" />
          <span className="w-8 h-1 bg-slate-300 rounded-full" />
          <span className="w-8 h-1 bg-[#FF9900] rounded-full" />
        </div>
      </div>

      {/* Brand Identity & Status Section */}
      <div className="relative z-10 text-center space-y-2 mt-1">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B2545] font-mono">
            ABHI
          </span>
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#FF9900] font-mono">
            WORLD
          </span>
        </div>

        <p className="text-[11px] uppercase tracking-[0.32em] text-slate-500 font-extrabold">
          {phase === 'taxi' && 'Preparing Flight Deck & Fleet Corridors...'}
          {phase === 'takeoff' && 'Flight In Ascent • Coach En Route Below'}
          {phase === 'fadeout' && 'Welcome Aboard • Departures Active'}
        </p>

        {/* Relaxed Progress Track */}
        <div className="w-60 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden mt-3 border border-slate-200">
          <div
            className={`h-full bg-gradient-to-r from-[#1D4ED8] via-[#FF9900] to-emerald-600 rounded-full transition-all duration-[4200ms] ease-out ${
              phase === 'taxi' ? 'w-1/4' : 'w-full'
            }`}
          />
        </div>
      </div>
    </div>
  );
}