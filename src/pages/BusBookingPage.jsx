import React, { useState, useMemo } from 'react';
import { 
  Bus, Calendar, MapPin, ArrowRightLeft, Star, 
  Check, User, Phone, ArrowRight, X, Clock, 
  SlidersHorizontal, ShieldCheck, Armchair, Bed, Sparkles,
  Sun, Sunset, Moon, Sunrise, RotateCcw, ArrowUpDown, ArrowUp, ArrowDown,
  Tag, Percent, Zap, CheckCircle2, Award, Search, Loader2
} from 'lucide-react';
import { BUS_LOCATIONS, ABHI_BUS_FLEET } from '../data/busMockData';

// Available mock promo codes
const PROMO_CODES = {
  ABHIBUS50: { discount: 50, type: 'flat', desc: 'Flat ₹50 OFF on your booking' },
  FESTIVE15: { discount: 0.15, type: 'percent', desc: '15% OFF up to ₹250', maxDiscount: 250 },
  FIRSTBUS: { discount: 100, type: 'flat', desc: 'Flat ₹100 OFF on first coach journey' }
};

// Standard 2+1 Sleeper Layout Generator (5 Rows = 15 berths per deck; Total 30 berths)
const generateStandardSleeperDeck = (deckPrefix, basePrice) => {
  const rows = [];
  for (let r = 1; r <= 5; r++) {
    rows.push({
      single: {
        id: `${deckPrefix}${r}A`,
        price: basePrice,
        status: (r === 2 && deckPrefix === 'L') ? 'sold' : 'available',
        isFemale: r === 4
      },
      double1: {
        id: `${deckPrefix}${r}B`,
        price: basePrice + 50,
        status: (r === 1 || r === 3) ? 'sold' : 'available',
        isFemale: r === 2
      },
      double2: {
        id: `${deckPrefix}${r}C`,
        price: basePrice + 50,
        status: (r === 3 || r === 5) ? 'sold' : 'available',
        isFemale: false
      }
    });
  }
  return rows;
};

// Standard 2+2 Seater Layout Generator (8 Rows = 32 seats)
const generateStandardSeaterDeck = (basePrice) => {
  const rows = [];
  for (let r = 1; r <= 8; r++) {
    rows.push({
      left1: { id: `S${r}A`, price: basePrice, status: (r === 2 || r === 5) ? 'sold' : 'available', isFemale: r === 4 },
      left2: { id: `S${r}B`, price: basePrice, status: (r === 1) ? 'sold' : 'available', isFemale: false },
      right1: { id: `S${r}C`, price: basePrice, status: (r === 3 || r === 6) ? 'sold' : 'available', isFemale: r === 7 },
      right2: { id: `S${r}D`, price: basePrice, status: (r === 4) ? 'sold' : 'available', isFemale: false }
    });
  }
  return rows;
};

// Realistic Mattress SVG for Sleeper Berths
const SleeperMattressGraphic = ({ isSelected, isSold, isFemale }) => {
  const accentColor = isSold ? '#94A3B8' : isSelected ? '#FFFFFF' : isFemale ? '#E11D48' : '#2563EB';
  const pillowBg = isSold ? '#CBD5E1' : isSelected ? '#047857' : isFemale ? '#FFE4E6' : '#EFF6FF';

  return (
    <svg viewBox="0 0 46 86" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs transition-transform duration-200">
      <rect x="1.5" y="1.5" width="43" height="83" rx="7" stroke={accentColor} strokeWidth="2" strokeDasharray={isSold ? "3 2" : "none"} />
      <rect x="5.5" y="5.5" width="35" height="20" rx="4" fill={pillowBg} stroke={accentColor} strokeWidth="1.2" />
      <line x1="8" y1="36" x2="38" y2="36" stroke={accentColor} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
      <line x1="8" y1="50" x2="38" y2="50" stroke={accentColor} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
      <line x1="8" y1="64" x2="38" y2="64" stroke={accentColor} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
    </svg>
  );
};

// Ergonomic Push-Back Seat SVG for Regular Coaches
const RegularSeatGraphic = ({ isSelected, isSold, isFemale }) => {
  const accentColor = isSold ? '#94A3B8' : isSelected ? '#FFFFFF' : isFemale ? '#E11D48' : '#1D4ED8';
  const cushionBg = isSold ? '#E2E8F0' : isSelected ? '#047857' : isFemale ? '#FFF1F2' : '#F8FAFC';

  return (
    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-200">
      <rect x="9" y="4" width="34" height="26" rx="6" fill={cushionBg} stroke={accentColor} strokeWidth="2" />
      <rect x="16" y="7" width="20" height="9" rx="3" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1" />
      <rect x="3" y="16" width="6" height="22" rx="3" fill={cushionBg} stroke={accentColor} strokeWidth="1.5" />
      <rect x="43" y="16" width="6" height="22" rx="3" fill={cushionBg} stroke={accentColor} strokeWidth="1.5" />
      <rect x="9" y="30" width="34" height="18" rx="4" fill={cushionBg} stroke={accentColor} strokeWidth="1.8" />
    </svg>
  );
};

// Slot mapper helper
const checkTimeSlot = (timeString, slot) => {
  if (slot === 'all') return true;
  const hour = parseInt(timeString.split(':')[0], 10);
  if (slot === 'morning') return hour >= 6 && hour < 12;
  if (slot === 'afternoon') return hour >= 12 && hour < 18;
  if (slot === 'evening') return hour >= 18 && hour < 23;
  if (slot === 'night') return hour >= 23 || hour < 6;
  return true;
};

export default function BusBookingPage() {
  // Active Search & Selection States
  const [fromCity, setFromCity] = useState(BUS_LOCATIONS[0]);
  const [toCity, setToCity] = useState(BUS_LOCATIONS[3]);
  const [journeyDate, setJourneyDate] = useState('2026-09-12');

  // Committed Searched Route (Updated only when Search Buses is clicked)
  const [activeSearchSummary, setActiveSearchSummary] = useState({
    from: BUS_LOCATIONS[0],
    to: BUS_LOCATIONS[3],
    date: '2026-09-12'
  });

  // Searching transition states
  const [isSearching, setIsSearching] = useState(false);
  const [searchConfirmedBanner, setSearchConfirmedBanner] = useState(false);

  // Filter & Sorting States
  const [activeBusTypeFilter, setActiveBusTypeFilter] = useState('All');
  const [priceSort, setPriceSort] = useState('none');
  const [departureSlot, setDepartureSlot] = useState('all');
  const [arrivalSlot, setArrivalSlot] = useState('all');

  // Modal states
  const [activeBusModal, setActiveBusModal] = useState(null);
  const [activeStep, setActiveStep] = useState('seats');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBoarding, setSelectedBoarding] = useState('');
  const [selectedDropping, setSelectedDropping] = useState('');

  // Coupon code states
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccessAnim, setCouponSuccessAnim] = useState(false);

  const [passenger, setPassenger] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: ''
  });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  // Search Buses Action with Confirmation
  const handleSearchBuses = (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      setActiveSearchSummary({
        from: fromCity,
        to: toCity,
        date: journeyDate
      });
      setIsSearching(false);
      setSearchConfirmedBanner(true);
      setTimeout(() => setSearchConfirmedBanner(false), 3500);
    }, 550);
  };

  const handleResetFilters = () => {
    setActiveBusTypeFilter('All');
    setPriceSort('none');
    setDepartureSlot('all');
    setArrivalSlot('all');
  };

  // Multi-Filter & Sort Engine
  const filteredBuses = useMemo(() => {
    let result = ABHI_BUS_FLEET.filter((bus) => {
      const matchType = activeBusTypeFilter === 'All' || bus.category === activeBusTypeFilter;
      const matchDeparture = checkTimeSlot(bus.departureTime, departureSlot);
      const matchArrival = checkTimeSlot(bus.arrivalTime, arrivalSlot);
      return matchType && matchDeparture && matchArrival;
    });

    if (priceSort === 'asc') {
      result.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (priceSort === 'desc') {
      result.sort((a, b) => b.startingPrice - a.startingPrice);
    }

    return result;
  }, [activeBusTypeFilter, priceSort, departureSlot, arrivalSlot]);

  const handleOpenSeatModal = (bus) => {
    setActiveBusModal(bus);
    setActiveStep('seats');
    setSelectedSeats([]);
    setSelectedBoarding(bus.boardingPoints[0]?.point || '');
    setSelectedDropping(bus.droppingPoints[0]?.point || '');
    setCouponInput('');
    setAppliedCoupon(null);
    setCouponError('');
  };

  const handleCloseModal = () => {
    setActiveBusModal(null);
    setSelectedSeats([]);
    setActiveStep('seats');
    setCouponInput('');
    setAppliedCoupon(null);
    setCouponError('');
  };

  const toggleSeat = (seat) => {
    if (seat.status === 'sold') return;
    const exists = selectedSeats.find((s) => s.id === seat.id);
    if (exists) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= 6) {
        alert("Maximum 6 berths / seats can be reserved per transaction.");
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const subtotalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const promo = PROMO_CODES[appliedCoupon];
    if (!promo) return 0;

    if (promo.type === 'flat') {
      return Math.min(promo.discount, subtotalPrice);
    } else if (promo.type === 'percent') {
      const calculated = Math.round(subtotalPrice * promo.discount);
      return promo.maxDiscount ? Math.min(calculated, promo.maxDiscount) : calculated;
    }
    return 0;
  }, [appliedCoupon, subtotalPrice]);

  const finalPrice = Math.max(0, subtotalPrice - discountAmount);

  const handleApplyCoupon = (codeToApply = null) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (PROMO_CODES[code]) {
      setAppliedCoupon(code);
      setCouponInput(code);
      setCouponError('');
      setCouponSuccessAnim(true);
      setTimeout(() => setCouponSuccessAnim(false), 800);
    } else {
      setCouponError('Invalid coupon code. Try ABHIBUS50 or FESTIVE15.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  const handleBookingConfirm = (e) => {
    e.preventDefault();
    const pnr = "ABHI-BUS-" + Math.floor(100000 + Math.random() * 900000);
    setConfirmedBooking({
      pnr,
      bus: activeBusModal,
      seats: selectedSeats.map((s) => s.id).join(', '),
      subtotal: subtotalPrice,
      discount: discountAmount,
      couponCode: appliedCoupon,
      total: finalPrice,
      boarding: selectedBoarding,
      dropping: selectedDropping,
      date: activeSearchSummary.date,
      passenger
    });
    setActiveBusModal(null);
  };

  const isSeaterBus = activeBusModal?.category === 'Regular Seater';
  const standardLowerSleeper = activeBusModal ? generateStandardSleeperDeck('L', activeBusModal.startingPrice) : [];
  const standardUpperSleeper = activeBusModal ? generateStandardSleeperDeck('U', activeBusModal.startingPrice + 100) : [];
  const standardSeaterRows = activeBusModal ? generateStandardSeaterDeck(activeBusModal.startingPrice) : [];

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-8 px-4 sm:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 1. Search Bar Console with Dedicated Search Button */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] animate-ping" />
              <h2 className="text-sm font-black uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
                <Bus size={17} className="text-[#1D4ED8]" />
                Abhi Bus Fleet Search
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck size={13} /> Official Client Fleet
            </span>
          </div>

          <form onSubmit={handleSearchBuses} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* From */}
            <div className="md:col-span-3 relative group">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Departure City</span>
              <div className="flex items-center gap-2 border border-slate-300 rounded-2xl px-3 py-2.5 bg-slate-50 group-hover:bg-white group-hover:border-[#1D4ED8] transition-all">
                <MapPin size={16} className="text-[#1D4ED8] shrink-0" />
                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer truncate"
                >
                  {BUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center pb-0.5">
              <button
                type="button"
                onClick={handleSwapCities}
                className="w-10 h-10 rounded-2xl border border-slate-300 bg-white hover:bg-blue-50 hover:border-[#1D4ED8] flex items-center justify-center text-slate-600 hover:text-[#1D4ED8] transition shadow-2xs cursor-pointer active:scale-95"
                aria-label="Swap Locations"
              >
                <ArrowRightLeft size={15} />
              </button>
            </div>

            {/* To */}
            <div className="md:col-span-3 relative group">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Destination City</span>
              <div className="flex items-center gap-2 border border-slate-300 rounded-2xl px-3 py-2.5 bg-slate-50 group-hover:bg-white group-hover:border-[#FF9900] transition-all">
                <MapPin size={16} className="text-[#FF9900] shrink-0" />
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer truncate"
                >
                  {BUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="md:col-span-2 relative group">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Travel Date</span>
              <div className="flex items-center gap-2 border border-slate-300 rounded-2xl px-3 py-2.5 bg-slate-50 group-hover:bg-white group-hover:border-emerald-600 transition-all">
                <Calendar size={16} className="text-emerald-600 shrink-0" />
                <input
                  type="date"
                  value={journeyDate}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Search Buses CTA Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-3 bg-[#0B2545] hover:bg-[#07192F] text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-75"
              >
                {isSearching ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#FF9900]" />
                    <span>Searching Route...</span>
                  </>
                ) : (
                  <>
                    <Search size={15} className="text-[#FF9900] stroke-[2.5]" />
                    <span>Search Buses</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Search Confirmation Ribbon */}
          {searchConfirmedBanner && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs flex items-center justify-between text-emerald-900 animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="font-bold">
                  Schedules updated for: <strong>{activeSearchSummary.from}</strong> → <strong>{activeSearchSummary.to}</strong> ({activeSearchSummary.date})
                </span>
              </div>
              <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-mono">
                {filteredBuses.length} Coaches Ready
              </span>
            </div>
          )}
        </div>

        {/* 2. Multi-Facet Filter Control Console */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-[#1D4ED8]" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Filter & Sort Coaches
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors cursor-pointer group"
            >
              <RotateCcw size={12} className="group-hover:-rotate-90 transition-transform duration-300" />
              <span>Reset Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Category Segmented Selector */}
            <div className="md:col-span-4 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Coach Class
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'AC Sleeper', 'Non-AC Sleeper', 'Regular Seater'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveBusTypeFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                      activeBusTypeFilter === cat
                        ? 'bg-[#0B2545] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Sort */}
            <div className="md:col-span-3 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Sort By Fare
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPriceSort(priceSort === 'asc' ? 'none' : 'asc')}
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-95 ${
                    priceSort === 'asc'
                      ? 'border-[#1D4ED8] bg-blue-50 text-[#1D4ED8] font-black ring-1 ring-[#1D4ED8]'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ArrowUp size={13} className={priceSort === 'asc' ? 'animate-bounce' : ''} />
                  <span>Low to High</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPriceSort(priceSort === 'desc' ? 'none' : 'desc')}
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-95 ${
                    priceSort === 'desc'
                      ? 'border-[#1D4ED8] bg-blue-50 text-[#1D4ED8] font-black ring-1 ring-[#1D4ED8]'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ArrowDown size={13} className={priceSort === 'desc' ? 'animate-bounce' : ''} />
                  <span>High to Low</span>
                </button>
              </div>
            </div>

            {/* Departure Time Slots */}
            <div className="md:col-span-5 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Departure Window
              </span>
              <div className="grid grid-cols-4 gap-1 text-[11px] font-bold">
                {[
                  { id: 'all', label: 'Anytime', icon: Clock },
                  { id: 'morning', label: '6am - 12pm', icon: Sunrise },
                  { id: 'evening', label: '6pm - 11pm', icon: Sunset },
                  { id: 'night', label: '11pm - 6am', icon: Moon }
                ].map((slot) => {
                  const Icon = slot.icon;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setDepartureSlot(slot.id)}
                      className={`p-2 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        departureSlot === slot.id
                          ? 'border-[#1D4ED8] bg-blue-50 text-[#1D4ED8] font-black ring-1 ring-[#1D4ED8]'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon size={13} />
                      <span className="leading-tight text-[10px] truncate max-w-full">{slot.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Arrival Window Row */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Arrival Window:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs font-bold">
              {[
                { id: 'all', label: 'Any Arrival Time' },
                { id: 'morning', label: 'Morning (6 AM - 12 PM)' },
                { id: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
                { id: 'night', label: 'Early Morning / Night' }
              ].map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setArrivalSlot(slot.id)}
                  className={`px-3 py-1 rounded-xl transition-all duration-200 cursor-pointer text-[11px] ${
                    arrivalSlot === slot.id
                      ? 'bg-slate-900 text-white font-black'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Bus Results List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                {filteredBuses.length} Coaches Available For {activeSearchSummary.from} → {activeSearchSummary.to}
              </span>
              {priceSort !== 'none' && (
                <span className="text-[10px] bg-blue-50 text-[#1D4ED8] border border-blue-200 px-2 py-0.5 rounded-full font-black uppercase">
                  Price: {priceSort === 'asc' ? 'Low to High' : 'High to Low'}
                </span>
              )}
            </div>
            <span className="text-xs text-slate-400">Guaranteed proprietary coaches</span>
          </div>

          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white border border-slate-200 hover:border-[#1D4ED8] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1D4ED8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-black text-[#0B2545] group-hover:text-[#1D4ED8] transition-colors">{bus.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                      ★ {bus.rating}
                    </span>
                    <span className="text-xs text-slate-400">({bus.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    {bus.category === 'Regular Seater' ? <Armchair size={15} className="text-[#1D4ED8]" /> : <Bed size={15} className="text-[#1D4ED8]" />}
                    <span>{bus.busType}</span>
                  </div>

                  {/* Timing & Animated Route */}
                  <div className="flex items-center gap-6 text-xs text-slate-800 pt-1">
                    <div>
                      <span className="text-xl font-black font-mono text-[#0B2545] block">{bus.departureTime}</span>
                      <span className="text-[11px] text-slate-400 font-medium">Departure</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{bus.duration}</span>
                      <div className="w-24 h-1 bg-slate-200 rounded-full relative my-1 overflow-hidden">
                        <div className="w-6 h-full bg-gradient-to-r from-transparent via-[#1D4ED8] to-transparent rounded-full animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>

                    <div>
                      <span className="text-xl font-black font-mono text-[#0B2545] block">{bus.arrivalTime}</span>
                      <span className="text-[11px] text-slate-400 font-medium">Arrival</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500 font-semibold">
                    {bus.amenities.map((am, i) => (
                      <span key={i} className="bg-slate-50 border border-slate-200/80 px-2.5 py-0.5 rounded-lg">
                        ✓ {am}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-8 text-left md:text-right space-y-2 shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Fares From</span>
                  <div className="text-3xl font-black font-mono text-[#0B2545] tracking-tight">
                    ₹{bus.startingPrice.toLocaleString('en-IN')}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenSeatModal(bus)}
                    className="w-full md:w-auto px-7 py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-xl hover:scale-103 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Select Seats</span>
                    <ArrowRight size={15} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center space-y-3">
              <Bus size={36} className="text-slate-400 mx-auto" />
              <h4 className="text-sm font-black text-slate-800">No Coaches Match Your Selected Filters</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try resetting departure or arrival time window filters to review other scheduled journeys.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#0B2545] hover:bg-[#07192F] text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* 4. Interactive Seat Layout Modal with Coupon System */}
        {activeBusModal && (
          <div 
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-all duration-300"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col transform transition-all duration-300 scale-100"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
                <div>
                  <div className="flex items-center gap-2 text-sm font-black text-[#0B2545]">
                    <span>{activeSearchSummary.from}</span>
                    <span className="text-slate-400">→</span>
                    <span>{activeSearchSummary.to}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {activeBusModal.name} • {activeSearchSummary.date}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-800 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Stepper Tabs */}
              <div className="flex items-center justify-center gap-8 border-b border-slate-200 text-xs font-extrabold text-slate-500 py-3 bg-slate-50/90 sticky top-[68px] z-10">
                <button
                  type="button"
                  onClick={() => setActiveStep('seats')}
                  className={`flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeStep === 'seats' ? 'text-rose-600 border-b-2 border-rose-600 pb-2 -mb-3 scale-105' : 'hover:text-slate-900'
                  }`}
                >
                  <Check size={14} className={selectedSeats.length > 0 ? "text-emerald-600 stroke-[3]" : "text-slate-400"} />
                  <span>Select seats</span>
                </button>

                <button
                  type="button"
                  onClick={() => selectedSeats.length > 0 && setActiveStep('points')}
                  disabled={selectedSeats.length === 0}
                  className={`flex items-center gap-1.5 transition-all ${
                    activeStep === 'points'
                      ? 'text-rose-600 border-b-2 border-rose-600 pb-2 -mb-3 scale-105'
                      : selectedSeats.length === 0
                      ? 'opacity-40 cursor-not-allowed'
                      : 'cursor-pointer hover:text-slate-900'
                  }`}
                >
                  <span>Board/Drop point</span>
                </button>

                <button
                  type="button"
                  onClick={() => selectedSeats.length > 0 && setActiveStep('passenger')}
                  disabled={selectedSeats.length === 0}
                  className={`flex items-center gap-1.5 transition-all ${
                    activeStep === 'passenger'
                      ? 'text-rose-600 border-b-2 border-rose-600 pb-2 -mb-3 scale-105'
                      : selectedSeats.length === 0
                      ? 'opacity-40 cursor-not-allowed'
                      : 'cursor-pointer hover:text-slate-900'
                  }`}
                >
                  <span>Passenger & Payment</span>
                </button>
              </div>

              {/* STEP 1: Full Standard Coach Layout */}
              {activeStep === 'seats' && (
                <div className="p-6 sm:p-8 space-y-6 bg-[#F8FAFC]">
                  {/* Legend */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-600 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-emerald-600 border-2 border-emerald-700" />
                      <span className="text-emerald-800">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-rose-50 border-2 border-rose-300" />
                      <span className="text-rose-700">Female Only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-slate-200 border-2 border-slate-300 opacity-60" />
                      <span className="text-slate-400">Booked</span>
                    </div>
                  </div>

                  {/* Seat Grid */}
                  {isSeaterBus ? (
                    <div className="max-w-md mx-auto bg-white border-2 border-slate-300 rounded-3xl p-6 shadow-sm space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-700">Driver Cabin</span>
                        <div className="w-9 h-9 rounded-full border-2 border-slate-400 flex items-center justify-center text-slate-600 font-bold">
                          ✇
                        </div>
                      </div>

                      <div className="space-y-3">
                        {standardSeaterRows.map((row, rIdx) => (
                          <div key={rIdx} className="flex items-center justify-between gap-4">
                            <div className="flex gap-2">
                              {[row.left1, row.left2].map((seat) => {
                                const isSelected = selectedSeats.some((s) => s.id === seat.id);
                                return (
                                  <div
                                    key={seat.id}
                                    onClick={() => toggleSeat(seat)}
                                    className={`relative w-12 h-12 p-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                      seat.status === 'sold'
                                        ? 'opacity-40 cursor-not-allowed'
                                        : isSelected
                                        ? 'scale-110 bg-emerald-600 text-white shadow-md'
                                        : 'hover:scale-108 hover:-translate-y-0.5'
                                    }`}
                                  >
                                    <RegularSeatGraphic isSelected={isSelected} isSold={seat.status === 'sold'} isFemale={seat.isFemale} />
                                    <span className={`text-[9px] font-black absolute bottom-0.5 ${isSelected ? 'text-white' : 'text-slate-600'}`}>{seat.id}</span>
                                  </div>
                                );
                              })}
                            </div>

                            <span className="text-[10px] text-slate-300 font-mono tracking-widest uppercase">AISLE</span>

                            <div className="flex gap-2">
                              {[row.right1, row.right2].map((seat) => {
                                const isSelected = selectedSeats.some((s) => s.id === seat.id);
                                return (
                                  <div
                                    key={seat.id}
                                    onClick={() => toggleSeat(seat)}
                                    className={`relative w-12 h-12 p-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                      seat.status === 'sold'
                                        ? 'opacity-40 cursor-not-allowed'
                                        : isSelected
                                        ? 'scale-110 bg-emerald-600 text-white shadow-md'
                                        : 'hover:scale-108 hover:-translate-y-0.5'
                                    }`}
                                  >
                                    <RegularSeatGraphic isSelected={isSelected} isSold={seat.status === 'sold'} isFemale={seat.isFemale} />
                                    <span className={`text-[9px] font-black absolute bottom-0.5 ${isSelected ? 'text-white' : 'text-slate-600'}`}>{seat.id}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      {/* LOWER DECK */}
                      <div className="bg-white border-2 border-slate-300 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                          <div>
                            <span className="text-xs font-black uppercase text-[#0B2545] block">Lower Deck</span>
                            <span className="text-[10px] text-slate-400">15 Luxury Berths</span>
                          </div>
                          <div className="w-8 h-8 rounded-full border-2 border-slate-400 flex items-center justify-center text-slate-600 font-black text-xs">
                            ✇
                          </div>
                        </div>

                        <div className="space-y-4">
                          {standardLowerSleeper.map((row, rIdx) => (
                            <div key={rIdx} className="flex items-center justify-between gap-3">
                              <div
                                onClick={() => toggleSeat(row.single)}
                                className={`relative w-16 h-24 p-1 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                  row.single.status === 'sold'
                                    ? 'opacity-40 cursor-not-allowed'
                                    : selectedSeats.some((s) => s.id === row.single.id)
                                    ? 'scale-108 bg-emerald-600 text-white shadow-md'
                                    : 'hover:scale-105 hover:-translate-y-1'
                                }`}
                              >
                                <SleeperMattressGraphic
                                  isSelected={selectedSeats.some((s) => s.id === row.single.id)}
                                  isSold={row.single.status === 'sold'}
                                  isFemale={row.single.isFemale}
                                />
                                <span className={`text-[10px] font-black absolute top-2 ${selectedSeats.some((s) => s.id === row.single.id) ? 'text-white' : 'text-slate-700'}`}>{row.single.id}</span>
                                <span className={`text-[9px] font-bold absolute bottom-2 ${selectedSeats.some((s) => s.id === row.single.id) ? 'text-white' : 'text-slate-500'}`}>₹{row.single.price}</span>
                              </div>

                              <span className="text-[9px] text-slate-300 font-mono tracking-widest uppercase">AISLE</span>

                              <div className="flex gap-2">
                                {[row.double1, row.double2].map((berth) => {
                                  const isSelected = selectedSeats.some((s) => s.id === berth.id);
                                  return (
                                    <div
                                      key={berth.id}
                                      onClick={() => toggleSeat(berth)}
                                      className={`relative w-16 h-24 p-1 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                        berth.status === 'sold'
                                          ? 'opacity-40 cursor-not-allowed'
                                          : isSelected
                                          ? 'scale-108 bg-emerald-600 text-white shadow-md'
                                          : 'hover:scale-105 hover:-translate-y-1'
                                      }`}
                                    >
                                      <SleeperMattressGraphic
                                        isSelected={isSelected}
                                        isSold={berth.status === 'sold'}
                                        isFemale={berth.isFemale}
                                      />
                                      <span className={`text-[10px] font-black absolute top-2 ${isSelected ? 'text-white' : 'text-slate-700'}`}>{berth.id}</span>
                                      <span className={`text-[9px] font-bold absolute bottom-2 ${isSelected ? 'text-white' : 'text-slate-500'}`}>₹{berth.price}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* UPPER DECK */}
                      <div className="bg-white border-2 border-slate-300 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                          <div>
                            <span className="text-xs font-black uppercase text-[#0B2545] block">Upper Deck</span>
                            <span className="text-[10px] text-slate-400">15 Luxury Panoramic Berths</span>
                          </div>
                          <span className="text-[10px] font-black uppercase text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Skyview</span>
                        </div>

                        <div className="space-y-4">
                          {standardUpperSleeper.map((row, rIdx) => (
                            <div key={rIdx} className="flex items-center justify-between gap-3">
                              <div
                                onClick={() => toggleSeat(row.single)}
                                className={`relative w-16 h-24 p-1 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                  row.single.status === 'sold'
                                    ? 'opacity-40 cursor-not-allowed'
                                    : selectedSeats.some((s) => s.id === row.single.id)
                                    ? 'scale-108 bg-emerald-600 text-white shadow-md'
                                    : 'hover:scale-105 hover:-translate-y-1'
                                }`}
                              >
                                <SleeperMattressGraphic
                                  isSelected={selectedSeats.some((s) => s.id === row.single.id)}
                                  isSold={row.single.status === 'sold'}
                                  isFemale={row.single.isFemale}
                                />
                                <span className={`text-[10px] font-black absolute top-2 ${selectedSeats.some((s) => s.id === row.single.id) ? 'text-white' : 'text-slate-700'}`}>{row.single.id}</span>
                                <span className={`text-[9px] font-bold absolute bottom-2 ${selectedSeats.some((s) => s.id === row.single.id) ? 'text-white' : 'text-slate-500'}`}>₹{row.single.price}</span>
                              </div>

                              <span className="text-[9px] text-slate-300 font-mono tracking-widest uppercase">AISLE</span>

                              <div className="flex gap-2">
                                {[row.double1, row.double2].map((berth) => {
                                  const isSelected = selectedSeats.some((s) => s.id === berth.id);
                                  return (
                                    <div
                                      key={berth.id}
                                      onClick={() => toggleSeat(berth)}
                                      className={`relative w-16 h-24 p-1 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                        berth.status === 'sold'
                                          ? 'opacity-40 cursor-not-allowed'
                                          : isSelected
                                          ? 'scale-108 bg-emerald-600 text-white shadow-md'
                                          : 'hover:scale-105 hover:-translate-y-1'
                                      }`}
                                    >
                                      <SleeperMattressGraphic
                                        isSelected={isSelected}
                                        isSold={berth.status === 'sold'}
                                        isFemale={berth.isFemale}
                                      />
                                      <span className={`text-[10px] font-black absolute top-2 ${isSelected ? 'text-white' : 'text-slate-700'}`}>{berth.id}</span>
                                      <span className={`text-[9px] font-bold absolute bottom-2 ${isSelected ? 'text-white' : 'text-slate-500'}`}>₹{berth.price}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* STEP 2: Boarding & Dropping Points */}
              {activeStep === 'points' && (
                <div className="p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-[#0B2545] uppercase tracking-wider">Select Boarding Point</h4>
                    <div className="space-y-2">
                      {activeBusModal.boardingPoints.map((bp, i) => (
                        <label
                          key={i}
                          className={`flex items-center justify-between p-4 rounded-2xl border text-xs cursor-pointer transition-all duration-200 ${
                            selectedBoarding === bp.point ? 'border-[#1D4ED8] bg-blue-50/70 font-bold shadow-2xs scale-101' : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="boarding"
                              checked={selectedBoarding === bp.point}
                              onChange={() => setSelectedBoarding(bp.point)}
                              className="accent-[#1D4ED8]"
                            />
                            <span>{bp.point}</span>
                          </div>
                          <span className="font-mono text-slate-500">{bp.time}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-[#0B2545] uppercase tracking-wider">Select Dropping Point</h4>
                    <div className="space-y-2">
                      {activeBusModal.droppingPoints.map((dp, i) => (
                        <label
                          key={i}
                          className={`flex items-center justify-between p-4 rounded-2xl border text-xs cursor-pointer transition-all duration-200 ${
                            selectedDropping === dp.point ? 'border-[#1D4ED8] bg-blue-50/70 font-bold shadow-2xs scale-101' : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="dropping"
                              checked={selectedDropping === dp.point}
                              onChange={() => setSelectedDropping(dp.point)}
                              className="accent-[#1D4ED8]"
                            />
                            <span>{dp.point}</span>
                          </div>
                          <span className="font-mono text-slate-500">{dp.time}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Passenger Form & Coupon System */}
              {activeStep === 'passenger' && (
                <div className="p-6 sm:p-8 max-w-xl mx-auto space-y-6">
                  
                  {/* Promo & Coupon Code Section */}
                  <div className={`bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-3.5 transition-all duration-300 ${couponSuccessAnim ? 'ring-2 ring-emerald-500 scale-102' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-[#1D4ED8]" />
                        <span className="text-xs font-black uppercase tracking-wider text-[#0B2545]">
                          Apply Coupon Code
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles size={11} /> Special Fare Deals
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="ENTER CODE (e.g. ABHIBUS50)"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          setCouponError('');
                        }}
                        disabled={!!appliedCoupon}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold uppercase text-slate-900 focus:outline-none focus:border-[#1D4ED8] disabled:bg-slate-100 transition-colors"
                      />
                      {appliedCoupon ? (
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="px-4 py-2.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApplyCoupon()}
                          className="px-5 py-2.5 bg-[#0B2545] hover:bg-[#07192F] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                          Apply
                        </button>
                      )}
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-rose-600 font-bold animate-shake">{couponError}</p>
                    )}

                    {appliedCoupon && (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs animate-fade-in">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={15} className="text-emerald-700 shrink-0" />
                          <span className="font-bold text-emerald-900">
                            '{appliedCoupon}' Applied ({PROMO_CODES[appliedCoupon].desc})
                          </span>
                        </div>
                        <span className="font-mono font-black text-emerald-700">-₹{discountAmount}</span>
                      </div>
                    )}

                    {!appliedCoupon && (
                      <div className="pt-2 border-t border-slate-200/80">
                        <span className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">Available Offers:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.keys(PROMO_CODES).map((code) => (
                            <button
                              key={code}
                              type="button"
                              onClick={() => handleApplyCoupon(code)}
                              className="px-2.5 py-1 rounded-lg bg-white border border-dashed border-slate-300 hover:border-[#1D4ED8] text-slate-700 hover:text-[#1D4ED8] text-[10px] font-mono font-bold transition-all cursor-pointer hover:scale-103"
                            >
                              {code} ({PROMO_CODES[code].desc})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Passenger Form */}
                  <form onSubmit={handleBookingConfirm} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Lead Passenger Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={passenger.name}
                        onChange={(e) => setPassenger({ ...passenger, name: e.target.value })}
                        className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs focus:border-[#1D4ED8] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Age</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 35"
                          value={passenger.age}
                          onChange={(e) => setPassenger({ ...passenger, age: e.target.value })}
                          className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs focus:border-[#1D4ED8] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Gender</label>
                        <select
                          value={passenger.gender}
                          onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}
                          className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs focus:border-[#1D4ED8] focus:outline-none cursor-pointer transition-colors"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Mobile Contact Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={passenger.phone}
                        onChange={(e) => setPassenger({ ...passenger, phone: e.target.value })}
                        className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs focus:border-[#1D4ED8] focus:outline-none font-mono transition-colors"
                      />
                    </div>

                    {/* Price Breakdown Summary */}
                    <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200 text-xs space-y-2">
                      <div className="flex justify-between text-slate-600">
                        <span>Base Fare ({selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'}):</span>
                        <span className="font-mono font-bold">₹{subtotalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Coupon Discount ({appliedCoupon}):</span>
                          <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#0B2545] font-black text-sm pt-2.5 border-t border-slate-200">
                        <span>Net Payable Amount:</span>
                        <span className="font-mono">₹{finalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-xl hover:scale-102 cursor-pointer mt-4 active:scale-95"
                    >
                      Confirm Booking & Pay ₹{finalPrice.toLocaleString('en-IN')}
                    </button>
                  </form>
                </div>
              )}

              {/* Bottom Sticky Action Bar */}
              <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between sticky bottom-0 z-20">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-bold">
                    {selectedSeats.length} {selectedSeats.length === 1 ? 'seat / berth' : 'seats / berths'}
                  </span>
                  <div>
                    {appliedCoupon ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-[#0B2545] font-mono">
                          ₹{finalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-mono">
                          ₹{subtotalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-black text-[#0B2545] font-mono">
                        ₹{subtotalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {activeStep === 'seats' && (
                  <button
                    type="button"
                    disabled={selectedSeats.length === 0}
                    onClick={() => setActiveStep('points')}
                    className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                      selectedSeats.length > 0
                        ? 'bg-rose-600 hover:bg-rose-700 text-white hover:scale-103 active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Select Boarding & Dropping Points
                  </button>
                )}

                {activeStep === 'points' && (
                  <button
                    type="button"
                    onClick={() => setActiveStep('passenger')}
                    className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-md hover:scale-103 cursor-pointer active:scale-95"
                  >
                    Proceed to Passenger & Payment
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* 5. Confirmation Ticket Modal */}
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 transition-all duration-300">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 text-center animate-scale-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <Check size={32} className="stroke-[3]" />
              </div>
              <h3 className="text-xl font-black text-[#0B2545]">Ticket Confirmed</h3>
              <p className="text-xs text-slate-500">
                Bus Booking PNR: <strong className="font-mono text-slate-900">{confirmedBooking.pnr}</strong>
              </p>

              <div className="bg-slate-50 p-4.5 rounded-2xl text-left text-xs space-y-1.5 border border-slate-200">
                <p>• <strong>Coach:</strong> {confirmedBooking.bus.name}</p>
                <p>• <strong>Seats / Berths:</strong> {confirmedBooking.seats}</p>
                <p>• <strong>Boarding:</strong> {confirmedBooking.boarding}</p>
                <p>• <strong>Dropping:</strong> {confirmedBooking.dropping}</p>
                <p>• <strong>Passenger:</strong> {confirmedBooking.passenger.name} ({confirmedBooking.passenger.phone})</p>
                {confirmedBooking.couponCode && (
                  <p className="text-emerald-700 font-semibold">
                    • <strong>Promo Code:</strong> {confirmedBooking.couponCode} (Saved ₹{confirmedBooking.discount.toLocaleString('en-IN')})
                  </p>
                )}
                <p className="border-t border-slate-200 pt-2 text-sm font-black text-slate-900">
                  • <strong>Total Fare Paid:</strong> ₹{confirmedBooking.total.toLocaleString('en-IN')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedBooking(null);
                  setSelectedSeats([]);
                  setActiveStep('seats');
                  setAppliedCoupon(null);
                  setCouponInput('');
                }}
                className="w-full py-3.5 bg-[#0B2545] hover:bg-[#07192F] text-white rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all hover:scale-102 active:scale-95"
              >
                Close Ticket Summary
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}