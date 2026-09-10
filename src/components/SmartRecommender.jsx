import React, { useState } from 'react';
import { 
  Calendar, Users, IndianRupee, ArrowRight, 
  Globe, MapPin, BedDouble, Baby, Search, RotateCcw, 
  Sparkles, CheckCircle2, Sliders, ShieldCheck
} from 'lucide-react';

export default function SmartRecommender({ packages, onSelect }) {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [maxBudget, setMaxBudget] = useState(150000);
  const [partyMode, setPartyMode] = useState('couple'); // 'solo' | 'couple' | 'custom'
  
  // Custom occupancy counters
  const [customAdults, setCustomAdults] = useState(2);
  const [customChildren, setCustomChildren] = useState(0);

  // Search trigger state: results stay hidden until user initiates search
  const [hasSearched, setHasSearched] = useState(false);

  // Calculate passenger weighting based on selection:
  // Solo: 1.25x single occupancy surcharge
  // Couple: 2x twin-sharing
  // Custom: Adults at full fare + Children at 75%
  const getPartyCost = (basePrice) => {
    if (partyMode === 'solo') {
      return Math.round(basePrice * 1.25);
    }
    if (partyMode === 'couple') {
      return Math.round(basePrice * 2);
    }
    return Math.round((basePrice * customAdults) + (basePrice * 0.75 * customChildren));
  };

  const getPartyLabel = () => {
    if (partyMode === 'solo') return '1 Adult (Solo Occupancy)';
    if (partyMode === 'couple') return '2 Adults (Twin Sharing)';
    return `${customAdults} Adult${customAdults > 1 ? 's' : ''}${customChildren > 0 ? ` + ${customChildren} Child${customChildren > 1 ? 'ren' : ''}` : ''}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedMonth) {
      alert('Please select an intended departure window first.');
      return;
    }
    setHasSearched(true);
  };

  const handleReset = () => {
    setHasSearched(false);
    setSelectedMonth('');
  };

  // Only calculate matches after search has been triggered
  const matchingPackages = hasSearched
    ? packages.filter((pkg) => {
        const totalCost = getPartyCost(pkg.startingPrice);
        const matchesBudget = totalCost <= maxBudget;

        const matchesDate = pkg.departures.some((dep) => {
          if (selectedMonth === 'Sep 2026') return dep.date.includes('-09-');
          if (selectedMonth === 'Oct 2026') return dep.date.includes('-10-');
          if (selectedMonth === 'Nov 2026') return dep.date.includes('-11-');
          return true;
        });

        return matchesBudget && matchesDate;
      })
    : [];

  const domesticMatches = matchingPackages.filter((p) => p.category === 'Domestic');
  const internationalMatches = matchingPackages.filter((p) => p.category === 'International');
  const hasInternationalBudget = internationalMatches.length > 0;

  return (
    <section className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 font-sans">
      
      {/* 1. Header Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#1D4ED8] font-black flex items-center gap-1.5 mb-1">
            <Sparkles size={14} className="text-[#FF9900]" />
            Smart Holiday Matchmaker
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0B2545] tracking-tight">
            Find Guaranteed Tours Within Your Budget
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>Transparent Pricing (GST Included)</span>
        </div>
      </div>

      {/* 2. Commercial Search Console Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 rounded-xl bg-slate-50 border border-slate-200">
          
          {/* Departure Window */}
          <div className="lg:col-span-3 space-y-2">
            <label className="text-xs uppercase tracking-wider text-slate-700 font-extrabold flex items-center gap-1.5">
              <Calendar size={14} className="text-[#1D4ED8]" /> Departure Window *
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setHasSearched(false);
              }}
              required
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] shadow-2xs cursor-pointer"
            >
              <option value="" disabled>Select Departure Month</option>
              <option value="Sep 2026">September 2026</option>
              <option value="Oct 2026">October 2026 (Diwali / Puja Specials)</option>
              <option value="Nov 2026">November 2026</option>
            </select>
          </div>

          {/* Traveler Configuration */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs uppercase tracking-wider text-slate-700 font-extrabold flex items-center gap-1.5">
              <Users size={14} className="text-[#1D4ED8]" /> Passenger Occupancy
            </label>
            
            <div className="grid grid-cols-3 gap-1.5 bg-slate-200/70 p-1 rounded-xl border border-slate-300">
              <button
                type="button"
                onClick={() => {
                  setPartyMode('solo');
                  setHasSearched(false);
                }}
                className={`py-2 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  partyMode === 'solo' 
                    ? 'bg-white text-[#0B2545] shadow-xs border border-slate-300' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Solo (1)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPartyMode('couple');
                  setHasSearched(false);
                }}
                className={`py-2 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  partyMode === 'couple' 
                    ? 'bg-white text-[#0B2545] shadow-xs border border-slate-300' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Couple (2)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPartyMode('custom');
                  setHasSearched(false);
                }}
                className={`py-2 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  partyMode === 'custom' 
                    ? 'bg-white text-[#0B2545] shadow-xs border border-slate-300' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Family / Group
              </button>
            </div>

            {/* Custom Steppers */}
            {partyMode === 'custom' && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* Adults */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-300 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <BedDouble size={14} className="text-[#1D4ED8]" />
                    <span>Adults</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCustomAdults(Math.max(1, customAdults - 1));
                        setHasSearched(false);
                      }}
                      className="w-6 h-6 rounded-md border border-slate-300 bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-black text-xs text-slate-800"
                    >-</button>
                    <span className="font-mono font-black text-xs w-4 text-center text-slate-900">{customAdults}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomAdults(customAdults + 1);
                        setHasSearched(false);
                      }}
                      className="w-6 h-6 rounded-md border border-slate-300 bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-black text-xs text-slate-800"
                    >+</button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-300 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Baby size={14} className="text-[#1D4ED8]" />
                    <span>Child (2-11y)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCustomChildren(Math.max(0, customChildren - 1));
                        setHasSearched(false);
                      }}
                      className="w-6 h-6 rounded-md border border-slate-300 bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-black text-xs text-slate-800"
                    >-</button>
                    <span className="font-mono font-black text-xs w-4 text-center text-slate-900">{customChildren}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomChildren(customChildren + 1);
                        setHasSearched(false);
                      }}
                      className="w-6 h-6 rounded-md border border-slate-300 bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-black text-xs text-slate-800"
                    >+</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Budget Slider */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider text-slate-700 font-extrabold flex items-center gap-1">
                <IndianRupee size={13} className="text-[#1D4ED8]" /> Maximum Total Budget
              </span>
              <span className="font-black text-[#0B2545] font-mono text-base">
                ₹{maxBudget.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="600000"
              step="10000"
              value={maxBudget}
              onChange={(e) => {
                setMaxBudget(Number(e.target.value));
                setHasSearched(false);
              }}
              className="w-full accent-[#FF9900] cursor-pointer h-2 bg-slate-200 rounded-lg mt-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>₹30K (India Holidays)</span>
              <span>₹6.0L (International Escort)</span>
            </div>
          </div>

        </div>

        {/* Action Button Row */}
        <div className="flex justify-end gap-3 pt-1">
          {hasSearched && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RotateCcw size={14} /> Clear Selection
            </button>
          )}
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer active:scale-95"
          >
            <Search size={15} className="stroke-[2.5]" />
            <span>Search Matching Packages</span>
          </button>
        </div>
      </form>

      {/* State A: Before Searching Prompt */}
      {!hasSearched && (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/60 space-y-2">
          <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[#1D4ED8] shadow-xs">
            <Calendar size={22} />
          </div>
          <h4 className="text-base font-extrabold text-slate-800">
            Set Your Travel Preferences Above
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Select an intended departure month, configure party size, adjust your total estimated budget, and click <strong>Search Matching Packages</strong> to review verified fixed departures.
          </p>
        </div>
      )}

      {/* State B: Results Displayed After Searching */}
      {hasSearched && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Triage Status Banner */}
          <div className="flex flex-wrap items-center justify-between text-xs py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 gap-2">
            <div>
              Active filter for <strong className="text-[#0B2545]">{getPartyLabel()}</strong> in <strong className="text-[#0B2545]">{selectedMonth}</strong> with budget up to <strong className="text-[#0B2545] font-mono">₹{maxBudget.toLocaleString('en-IN')}</strong>.
            </div>
            <div className="font-bold">
              {hasInternationalBudget ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  ✓ Unlocked Domestic & International Tours ({matchingPackages.length} Available)
                </span>
              ) : (
                <span className="text-amber-800">
                  ● Budget covers India Holidays ({domesticMatches.length} tours). Increase budget to unlock International departures.
                </span>
              )}
            </div>
          </div>

          {/* India Holidays Matches */}
          {domesticMatches.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <MapPin size={15} className="text-[#1D4ED8]" />
                <h4 className="text-xs uppercase tracking-wider font-black text-[#0B2545]">
                  Recommended India Holidays ({domesticMatches.length})
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {domesticMatches.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => onSelect(pkg)}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#1D4ED8] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group shadow-xs"
                  >
                    <div className="flex gap-3 items-start">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          {pkg.region} • {pkg.duration}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#1D4ED8] transition-colors line-clamp-2 mt-0.5">
                          {pkg.title}
                        </h5>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-extrabold tracking-wider">
                          Est. Total ({partyMode === 'couple' ? '2 Adults' : partyMode === 'solo' ? '1 Adult' : `${customAdults}A + ${customChildren}C`})
                        </span>
                        <span className="font-black text-[#0B2545] font-mono text-sm">
                          ₹{getPartyCost(pkg.startingPrice).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-black uppercase text-[#1D4ED8] group-hover:translate-x-0.5 transition-transform">
                        View Tour <ArrowRight size={13} className="stroke-[2.5]" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* International Matches */}
          {hasInternationalBudget && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <Globe size={15} className="text-[#1D4ED8]" />
                <h4 className="text-xs uppercase tracking-wider font-black text-[#0B2545]">
                  Recommended World Tours ({internationalMatches.length})
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {internationalMatches.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => onSelect(pkg)}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#1D4ED8] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group shadow-xs"
                  >
                    <div className="flex gap-3 items-start">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          {pkg.region} • {pkg.duration}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#1D4ED8] transition-colors line-clamp-2 mt-0.5">
                          {pkg.title}
                        </h5>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-extrabold tracking-wider">
                          Est. Total ({partyMode === 'couple' ? '2 Adults' : partyMode === 'solo' ? '1 Adult' : `${customAdults}A + ${customChildren}C`})
                        </span>
                        <span className="font-black text-[#0B2545] font-mono text-sm">
                          ₹{getPartyCost(pkg.startingPrice).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-black uppercase text-[#1D4ED8] group-hover:translate-x-0.5 transition-transform">
                        View Tour <ArrowRight size={13} className="stroke-[2.5]" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingPackages.length === 0 && (
            <div className="text-center py-10 text-xs text-slate-500 border border-slate-200 rounded-2xl bg-slate-50">
              No guaranteed batches currently match your chosen budget cap. Try adjusting the maximum budget slider or exploring alternate departure months.
            </div>
          )}
        </div>
      )}
    </section>
  );
}