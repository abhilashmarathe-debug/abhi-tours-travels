import React, { useState } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  Calendar, 
  Search, 
  User, 
  Heart, 
  Sparkles, 
  Plane, 
  ChevronDown, 
  Compass,
  FileText
} from 'lucide-react';

export default function Header({ onSearch, activeCategory, setActiveCategory, onMonthChange }) {
  const [query, setQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('Any');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query, selectedMonth);
  };

  const specialityPills = [
    { label: "Women's Special", badge: "POPULAR" },
    { label: "Senior Citizens", badge: null },
    { label: "Family Escapes", badge: "HOT" },
    { label: "Honeymoon Specials", badge: null },
    { label: "Jain Kitchen Tours", badge: "100% PURE VEG" },
    { label: "Weekend Getaways", badge: null }
  ];

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-slate-200 shadow-sm">
      
      {/* 1. Top Utility Strip (Hotlines, Currency, Support) */}
      <div className="bg-[#0B2545] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-[#07192F]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-200">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <PhoneCall size={12} className="animate-pulse" />
              1800-22-7979 / 1800-000-ABHI
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">
              Assistance: 8:00 AM – 8:00 PM (All 7 Days)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <button 
              type="button" 
              onClick={() => alert("Connecting you with our tour manager desk...")}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <PhoneCall size={11} /> Request A Call Back
            </button>
            <span className="text-slate-600">|</span>
            <button 
              type="button" 
              onClick={() => alert("Redirecting to Travel Agent & Corporate Portal...")}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <User size={11} /> Agent Login / Register
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Brand & Destination Category Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveCategory('All')} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center font-black shadow-md group-hover:bg-[#1E40AF] transition-colors">
            <Plane size={22} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-[#0B2545] leading-none">
                ABHI
              </span>
              <span className="text-2xl font-black tracking-tight text-[#FF9900] leading-none">
                WORLD
              </span>
            </div>
            <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400 block mt-0.5">
              Escorted Tours & Group Holidays
            </span>
          </div>
        </div>

        {/* Primary Product Categorization */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700">
          <button 
            type="button"
            onClick={() => setActiveCategory('All')} 
            className={`pb-1 transition-colors relative cursor-pointer ${
              activeCategory === 'All' 
                ? 'text-[#1D4ED8] border-b-2 border-[#1D4ED8]' 
                : 'hover:text-[#1D4ED8]'
            }`}
          >
            All Tour Packages
          </button>
          <button 
            type="button"
            onClick={() => setActiveCategory('Domestic')} 
            className={`pb-1 transition-colors relative cursor-pointer ${
              activeCategory === 'Domestic' 
                ? 'text-[#1D4ED8] border-b-2 border-[#1D4ED8]' 
                : 'hover:text-[#1D4ED8]'
            }`}
          >
            India Holidays
          </button>
          <button 
            type="button"
            onClick={() => setActiveCategory('International')} 
            className={`pb-1 transition-colors relative cursor-pointer ${
              activeCategory === 'International' 
                ? 'text-[#1D4ED8] border-b-2 border-[#1D4ED8]' 
                : 'hover:text-[#1D4ED8]'
            }`}
          >
            World Tours
          </button>
          <div className="flex items-center gap-1 text-slate-500 hover:text-slate-900 cursor-pointer text-xs font-semibold">
            <span>Corporate Travel</span>
            <ChevronDown size={14} />
          </div>
        </nav>

        {/* Quick Action Badges */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="text-right hidden xl:block">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Certified Operator</span>
            <span className="text-xs font-bold text-slate-800">IATA & Ministry Approved</span>
          </div>
        </div>

      </div>

      {/* 3. High-Density Search Booking Ribbon */}
      <div className="bg-[#F1F5F9] border-t border-slate-200 py-3 px-4 sm:px-8">
        <form 
          onSubmit={handleSearchSubmit}
          className="max-w-7xl mx-auto flex flex-col md:flex-row gap-2.5 items-center"
        >
          {/* Destination Destination Search */}
          <div className="flex-1 w-full flex items-center bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 shadow-xs focus-within:border-[#1D4ED8] focus-within:ring-1 focus-within:ring-[#1D4ED8] transition-all">
            <MapPin size={16} className="text-[#1D4ED8] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Where do you wish to travel? (e.g. Kashmir, Switzerland, Baku, Dubai)..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (onSearch) onSearch(e.target.value, selectedMonth);
              }}
              className="w-full focus:outline-none text-slate-800 placeholder:text-slate-400 text-xs font-medium bg-transparent"
            />
          </div>

          {/* Month Selector */}
          <div className="w-full md:w-64 flex items-center bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 shadow-xs focus-within:border-[#1D4ED8] transition-all">
            <Calendar size={16} className="text-[#1D4ED8] mr-2 shrink-0" />
            <select 
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                if (onMonthChange) onMonthChange(e.target.value);
                if (onSearch) onSearch(query, e.target.value);
              }}
              className="w-full focus:outline-none bg-transparent text-slate-700 text-xs cursor-pointer font-semibold"
            >
              <option value="Any">All Departure Months (2026)</option>
              <option value="Sep 2026">September 2026</option>
              <option value="Oct 2026">October 2026 (Diwali / Puja)</option>
              <option value="Nov 2026">November 2026</option>
            </select>
          </div>

          {/* Kesari/Veena-Style Bright Saffron Action CTA */}
          <button 
            type="submit"
            className="w-full md:w-auto bg-[#FF9900] hover:bg-[#E68A00] text-slate-900 font-extrabold px-8 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-xs cursor-pointer shrink-0 uppercase tracking-wide"
          >
            <Search size={15} className="stroke-[2.5]" />
            <span>Search Tours</span>
          </button>
        </form>
      </div>

      {/* 4. Kesari / Veena World Speciality Quick-Pills Filter */}
      <div className="bg-white border-b border-slate-200 py-2 px-4 sm:px-8 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Sparkles size={11} className="text-[#FF9900]" /> Speciality:
          </span>
          {specialityPills.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(pill.label.split(" ")[0]);
                if (onSearch) onSearch(pill.label.split(" ")[0], selectedMonth);
              }}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-slate-700 hover:text-slate-900 text-[11px] font-semibold transition-all cursor-pointer"
            >
              <span>{pill.label}</span>
              {pill.badge && (
                <span className="bg-[#1D4ED8] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-xs uppercase">
                  {pill.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

    </header>
  );
}