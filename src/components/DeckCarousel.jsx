import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, ArrowRight, Calendar, 
  Star, Utensils, Users, Sparkles 
} from 'lucide-react';

export default function DeckCarousel({ packages, onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const featured = packages.slice(0, 5);
  const total = featured.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, total, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const activePkg = featured[currentIndex] || featured[0];
  const nextPkg = featured[(currentIndex + 1) % total];

  if (!activePkg) return null;

  const emiEstimate = Math.round(activePkg.startingPrice / 12);

  return (
    <div 
      className="w-full py-2 font-sans"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Section Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#1D4ED8] mb-1">
            <Sparkles size={14} className="text-[#FF9900]" />
            <span>Guaranteed Group Holidays</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B2545]">
            Featured Escorted Departures (2026)
          </h2>
        </div>

        {/* Carousel Slider Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i ? 'w-6 bg-[#1D4ED8]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            aria-label="Previous tour"
            className="w-9 h-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition shadow-xs cursor-pointer active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-bold text-slate-600 px-2 font-mono">
            {currentIndex + 1} / {total}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next tour"
            className="w-9 h-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition shadow-xs cursor-pointer active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 2. Main High-Impact Commercial Stage */}
      <div className="relative w-full">
        <div
          key={activePkg.id}
          className="w-full bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden transition-all duration-300 relative"
        >
          {/* Fixed height grid so no aspect ratio or horizontal image can stretch the card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 h-auto lg:h-[430px]">
            
            {/* Image Showcase Container (Strict locked height on mobile, absolute-fill on desktop) */}
            <div 
              onClick={() => onSelect(activePkg)}
              className="lg:col-span-7 h-64 sm:h-72 lg:h-full relative overflow-hidden bg-slate-900 cursor-pointer group"
            >
              <img
                src={activePkg.image}
                alt={activePkg.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <span className="bg-[#FF9900] text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded shadow-md tracking-wider">
                  Bestseller Escorted Tour
                </span>
                <span className="bg-[#0B2545]/90 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded backdrop-blur-xs border border-white/20">
                  {activePkg.category} • {activePkg.region}
                </span>
              </div>

              {/* Live Departure Pill */}
              <div className="absolute bottom-4 left-4 bg-white/95 text-slate-900 text-xs px-3 py-1.5 flex items-center gap-2 rounded-lg shadow-lg font-bold z-10">
                <Calendar size={14} className="text-[#1D4ED8]" />
                <span>Next Fixed Batch: <strong className="text-[#0B2545] font-mono">{activePkg.departures[0]?.date}</strong></span>
              </div>
            </div>

            {/* Commercial Details & CTA Side */}
            <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-white h-full space-y-4">
              <div className="space-y-3">
                {/* Rating & Duration */}
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-950 font-black text-xs px-2.5 py-0.5 rounded flex items-center gap-1">
                    <Star size={13} className="fill-amber-500 text-amber-500" />
                    <span>{activePkg.rating}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-500">({activePkg.reviews} verified reviews)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-extrabold text-[#1D4ED8]">{activePkg.duration}</span>
                </div>

                {/* Tour Title */}
                <h3 
                  onClick={() => onSelect(activePkg)}
                  className="text-xl sm:text-2xl font-black text-[#0B2545] leading-snug cursor-pointer hover:text-[#1D4ED8] transition-colors line-clamp-2"
                >
                  {activePkg.title}
                </h3>

                {/* Key Sightseeing Highlights */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  {activePkg.highlights.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-[#1D4ED8] font-bold">✓</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Value Highlights */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <Utensils size={14} className="text-emerald-600 shrink-0" />
                    <span className="truncate">Indian & Jain Meals</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <Users size={14} className="text-[#1D4ED8] shrink-0" />
                    <span className="truncate">Dedicated Tour Leader</span>
                  </div>
                </div>
              </div>

              {/* Pricing & High-Contrast CTA Bar */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    All-Inclusive Price / Person
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#0B2545] leading-none mt-0.5">
                    ₹{activePkg.startingPrice.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1">
                    5% GST Included • EMI from ₹{emiEstimate.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <button
                  onClick={() => onSelect(activePkg)}
                  className="bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 font-black px-6 py-3 rounded-xl shadow-md hover:shadow-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
                >
                  <span>View Batches</span>
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </button>
              </div>
            </div>

          </div>

          {/* Real-time Slide Timer Bar */}
          {!isPaused && (
            <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-100 z-10">
              <div 
                key={currentIndex} 
                className="h-full bg-[#1D4ED8] animate-[progress_5s_linear_forwards]"
              />
            </div>
          )}
        </div>

        {/* 3. Up Next Strip */}
        {nextPkg && (
          <div
            onClick={handleNext}
            className="mt-3 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors text-xs text-slate-600 shadow-2xs group"
          >
            <span className="truncate">
              <span className="bg-[#0B2545] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded mr-2 tracking-wider">
                Up Next
              </span>
              <strong className="text-slate-900 group-hover:text-[#1D4ED8] transition-colors">{nextPkg.title}</strong> 
              <span className="text-slate-400 ml-1.5 font-medium">({nextPkg.duration})</span>
            </span>
            <span className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-[#1D4ED8] ml-2 group-hover:translate-x-0.5 transition-transform">
              Next Tour <ChevronRight size={14} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}