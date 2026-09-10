import React, { useState, useMemo } from 'react';
import { 
  Bus, Calendar, MapPin, ArrowRightLeft, Star, 
  Check, User, Phone, ArrowRight, X, Clock, 
  SlidersHorizontal, ShieldCheck, Armchair, Bed, Sparkles,
  Sun, Sunset, Moon, Sunrise, RotateCcw, ArrowUpDown, ArrowUp, ArrowDown
} from 'lucide-react';
import { BUS_LOCATIONS, ABHI_BUS_FLEET } from '../data/busMockData';

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
    <svg viewBox="0 0 46 86" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
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
    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
  const [fromCity, setFromCity] = useState(BUS_LOCATIONS[0]);
  const [toCity, setToCity] = useState(BUS_LOCATIONS[3]);
  const [journeyDate, setJourneyDate] = useState('2026-09-12');

  // Filter & Sorting States
  const [activeBusTypeFilter, setActiveBusTypeFilter] = useState('All');
  const [priceSort, setPriceSort] = useState('none'); // 'none' | 'asc' (Low to High) | 'desc' (High to Low)
  const [departureSlot, setDepartureSlot] = useState('all');
  const [arrivalSlot, setArrivalSlot] = useState('all');

  // Modal states
  const [activeBusModal, setActiveBusModal] = useState(null);
  const [activeStep, setActiveStep] = useState('seats');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBoarding, setSelectedBoarding] = useState('');
  const [selectedDropping, setSelectedDropping] = useState('');

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
  };

  const handleCloseModal = () => {
    setActiveBusModal(null);
    setSelectedSeats([]);
    setActiveStep('seats');
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

  const totalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const handleBookingConfirm = (e) => {
    e.preventDefault();
    const pnr = "ABHI-BUS-" + Math.floor(100000 + Math.random() * 900000);
    setConfirmedBooking({
      pnr,
      bus: activeBusModal,
      seats: selectedSeats.map((s) => s.id).join(', '),
      total: totalPrice,
      boarding: selectedBoarding,
      dropping: selectedDropping,
      date: journeyDate,
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

        {/* 1. Search Bar Console */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] animate-ping" />
            <h2 className="text-sm font-black uppercase tracking-wider text-[#0B2545]">
              Abhi Bus Official Fleet Desk
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* From */}
            <div className="md:col-span-4 relative">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Departure Station</span>
              <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-3 py-2.5 bg-slate-50 hover:bg-white transition-colors">
                <MapPin size={16} className="text-[#1D4ED8] shrink-0" />
                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  {BUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center">
              <button
                type="button"
                onClick={handleSwapCities}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-blue-50 hover:border-[#1D4ED8] flex items-center justify-center text-slate-600 hover:text-[#1D4ED8] transition shadow-xs cursor-pointer active:scale-95"
                aria-label="Swap Locations"
              >
                <ArrowRightLeft size={15} />
              </button>
            </div>

            {/* To */}
            <div className="md:col-span-4 relative">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Arrival Destination</span>
              <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-3 py-2.5 bg-slate-50 hover:bg-white transition-colors">
                <MapPin size={16} className="text-[#FF9900] shrink-0" />
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  {BUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="md:col-span-3 relative">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Travel Date</span>
              <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-3 py-2.5 bg-slate-50 hover:bg-white transition-colors">
                <Calendar size={16} className="text-emerald-600 shrink-0" />
                <input
                  type="date"
                  value={journeyDate}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Advanced Multi-Facet Filter Control Console */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
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
              className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw size={12} />
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 ${
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

            {/* Price Sort: Low to High & High to Low */}
            <div className="md:col-span-3 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Sort By Fare
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPriceSort(priceSort === 'asc' ? 'none' : 'asc')}
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1 transition cursor-pointer active:scale-95 ${
                    priceSort === 'asc'
                      ? 'border-[#1D4ED8] bg-blue-50 text-[#1D4ED8] font-black ring-1 ring-[#1D4ED8]'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ArrowUp size={13} />
                  <span>Low to High</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPriceSort(priceSort === 'desc' ? 'none' : 'desc')}
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1 transition cursor-pointer active:scale-95 ${
                    priceSort === 'desc'
                      ? 'border-[#1D4ED8] bg-blue-50 text-[#1D4ED8] font-black ring-1 ring-[#1D4ED8]'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ArrowDown size={13} />
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
                      className={`p-2 rounded-lg border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        departureSlot === slot.id
                          ? 'border-[#1D4ED8] bg-blue-50/80 text-[#1D4ED8] font-black ring-1 ring-[#1D4ED8]'
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
                  className={`px-3 py-1 rounded-lg transition cursor-pointer text-[11px] ${
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
                {filteredBuses.length} Luxury Fleet Departures Match Criteria
              </span>
              {priceSort !== 'none' && (
                <span className="text-[10px] bg-blue-50 text-[#1D4ED8] border border-blue-200 px-2 py-0.5 rounded font-black uppercase">
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
                className="bg-white border border-slate-200 hover:border-[#1D4ED8] rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-black text-[#0B2545] group-hover:text-[#1D4ED8] transition-colors">{bus.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded">
                      ★ {bus.rating}
                    </span>
                    <span className="text-xs text-slate-400">({bus.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    {bus.category === 'Regular Seater' ? <Armchair size={15} className="text-[#1D4ED8]" /> : <Bed size={15} className="text-[#1D4ED8]" />}
                    <span>{bus.busType}</span>
                  </div>

                  {/* Timing Row */}
                  <div className="flex items-center gap-6 text-xs text-slate-800 pt-1">
                    <div>
                      <span className="text-xl font-black font-mono text-[#0B2545] block">{bus.departureTime}</span>
                      <span className="text-[11px] text-slate-400 font-medium">Departure</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{bus.duration}</span>
                      <div className="w-20 h-0.5 bg-slate-300 relative my-1">
                        <div className="w-2 h-2 rounded-full bg-[#1D4ED8] absolute left-1/2 -translate-x-1/2 -translate-y-1/2" />
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
                      <span key={i} className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                        ✓ {am}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Select CTA */}
                <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-8 text-left md:text-right space-y-2 shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Fares From</span>
                  <div className="text-3xl font-black font-mono text-[#0B2545]">
                    ₹{bus.startingPrice.toLocaleString('en-IN')}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenSeatModal(bus)}
                    className="w-full md:w-auto px-7 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-lg cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Select Seats</span>
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center space-y-3">
              <Bus size={32} className="text-slate-400 mx-auto" />
              <h4 className="text-sm font-black text-slate-800">No Coaches Match Your Selected Filters</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try resetting departure or arrival time window filters to review other scheduled journeys.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#0B2545] text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* 4. Interactive Seat Layout Modal */}
        {activeBusModal && (
          <div 
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col animate-scale-up"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-20">
                <div>
                  <div className="flex items-center gap-2 text-sm font-black text-[#0B2545]">
                    <span>{fromCity}</span>
                    <span className="text-slate-400">→</span>
                    <span>{toCity}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {activeBusModal.name} • {journeyDate}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Stepper Tabs */}
              <div className="flex items-center justify-center gap-8 border-b border-slate-200 text-xs font-extrabold text-slate-500 py-3 bg-slate-50/80 sticky top-[65px] z-10">
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
                  <span>Passenger Info</span>
                </button>
              </div>

              {/* STEP 1: Full Standard Coach Layout */}
              {activeStep === 'seats' && (
                <div className="p-6 sm:p-8 space-y-6 bg-[#F8FAFC]">

                  {/* Seat Status Color Legend */}
                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-600 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-emerald-600 border-2 border-emerald-700" />
                      <span className="text-emerald-800">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-rose-50 border-2 border-rose-300" />
                      <span className="text-rose-700">Female Only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-slate-200 border-2 border-slate-300 opacity-60" />
                      <span className="text-slate-400">Booked</span>
                    </div>
                  </div>

                  {/* Main Seat Matrix */}
                  {isSeaterBus ? (
                    <div className="max-w-md mx-auto bg-white border border-slate-300 rounded-3xl p-6 shadow-sm space-y-4">
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
                                        ? 'scale-105 bg-emerald-600 text-white shadow-md'
                                        : 'hover:scale-105 hover:-translate-y-0.5'
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
                                        ? 'scale-105 bg-emerald-600 text-white shadow-md'
                                        : 'hover:scale-105 hover:-translate-y-0.5'
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
                      
                      {/* LOWER DECK (15 Berths) */}
                      <div className="bg-white border border-slate-300 rounded-3xl p-5 shadow-sm space-y-4">
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
                                className={`relative w-16 h-24 p-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                  row.single.status === 'sold'
                                    ? 'opacity-40 cursor-not-allowed'
                                    : selectedSeats.some((s) => s.id === row.single.id)
                                    ? 'scale-105 bg-emerald-600 text-white shadow-md'
                                    : 'hover:scale-105 hover:-translate-y-0.5'
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
                                      className={`relative w-16 h-24 p-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                        berth.status === 'sold'
                                          ? 'opacity-40 cursor-not-allowed'
                                          : isSelected
                                          ? 'scale-105 bg-emerald-600 text-white shadow-md'
                                          : 'hover:scale-105 hover:-translate-y-0.5'
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

                      {/* UPPER DECK (15 Berths) */}
                      <div className="bg-white border border-slate-300 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                          <div>
                            <span className="text-xs font-black uppercase text-[#0B2545] block">Upper Deck</span>
                            <span className="text-[10px] text-slate-400">15 Luxury Panoramic Berths</span>
                          </div>
                          <span className="text-[10px] font-black uppercase text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded">Skyview</span>
                        </div>

                        <div className="space-y-4">
                          {standardUpperSleeper.map((row, rIdx) => (
                            <div key={rIdx} className="flex items-center justify-between gap-3">
                              <div
                                onClick={() => toggleSeat(row.single)}
                                className={`relative w-16 h-24 p-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                  row.single.status === 'sold'
                                    ? 'opacity-40 cursor-not-allowed'
                                    : selectedSeats.some((s) => s.id === row.single.id)
                                    ? 'scale-105 bg-emerald-600 text-white shadow-md'
                                    : 'hover:scale-105 hover:-translate-y-0.5'
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
                                      className={`relative w-16 h-24 p-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 transform ${
                                        berth.status === 'sold'
                                          ? 'opacity-40 cursor-not-allowed'
                                          : isSelected
                                          ? 'scale-105 bg-emerald-600 text-white shadow-md'
                                          : 'hover:scale-105 hover:-translate-y-0.5'
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
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                            selectedBoarding === bp.point ? 'border-[#1D4ED8] bg-blue-50/50 font-bold' : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="boarding"
                              checked={selectedBoarding === bp.point}
                              onChange={() => setSelectedBoarding(bp.point)}
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
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                            selectedDropping === dp.point ? 'border-[#1D4ED8] bg-blue-50/50 font-bold' : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="dropping"
                              checked={selectedDropping === dp.point}
                              onChange={() => setSelectedDropping(dp.point)}
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

              {/* STEP 3: Passenger Form */}
              {activeStep === 'passenger' && (
                <div className="p-6 sm:p-8 max-w-lg mx-auto">
                  <form onSubmit={handleBookingConfirm} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Lead Passenger Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={passenger.name}
                        onChange={(e) => setPassenger({ ...passenger, name: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:border-[#1D4ED8] focus:outline-none"
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
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:border-[#1D4ED8] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Gender</label>
                        <select
                          value={passenger.gender}
                          onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:border-[#1D4ED8] focus:outline-none cursor-pointer"
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
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:border-[#1D4ED8] focus:outline-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer mt-4 active:scale-95"
                    >
                      Confirm Booking & Pay ₹{totalPrice.toLocaleString('en-IN')}
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
                  <span className="text-xl font-black text-[#0B2545] font-mono">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                {activeStep === 'seats' && (
                  <button
                    type="button"
                    disabled={selectedSeats.length === 0}
                    onClick={() => setActiveStep('points')}
                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-md cursor-pointer ${
                      selectedSeats.length > 0
                        ? 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
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
                    className="px-8 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer active:scale-95"
                  >
                    Proceed to Passenger Details
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* 5. Confirmation Ticket Modal */}
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center animate-scale-up">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check size={28} className="stroke-[3]" />
              </div>
              <h3 className="text-xl font-black text-[#0B2545]">Ticket Confirmed</h3>
              <p className="text-xs text-slate-500">
                Bus Booking PNR: <strong className="font-mono text-slate-900">{confirmedBooking.pnr}</strong>
              </p>

              <div className="bg-slate-50 p-4 rounded-xl text-left text-xs space-y-1.5 border border-slate-200">
                <p>• <strong>Coach:</strong> {confirmedBooking.bus.name}</p>
                <p>• <strong>Seats / Berths:</strong> {confirmedBooking.seats}</p>
                <p>• <strong>Boarding:</strong> {confirmedBooking.boarding}</p>
                <p>• <strong>Dropping:</strong> {confirmedBooking.dropping}</p>
                <p>• <strong>Passenger:</strong> {confirmedBooking.passenger.name} ({confirmedBooking.passenger.phone})</p>
                <p>• <strong>Total Fare:</strong> ₹{confirmedBooking.total.toLocaleString('en-IN')}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedBooking(null);
                  setSelectedSeats([]);
                  setActiveStep('seats');
                }}
                className="w-full py-3 bg-[#0B2545] text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer active:scale-95"
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