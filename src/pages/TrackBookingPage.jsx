import React, { useState } from 'react';
import { 
  Search, ShieldCheck, Calendar, Users, MapPin, Printer, 
  ArrowRight, AlertCircle, PhoneCall, CheckCircle2, 
  Clock, FileText, Download, User, Plane, MessageSquare 
} from 'lucide-react';

export default function TrackBookingPage() {
  const [pnrInput, setPnrInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  // Mock lookup database for demo verification
  const mockDatabase = {
    "ABHI-982410": {
      referenceId: "ABHI-982410",
      status: "Quota Confirmed (24H Hold Active)",
      statusCode: "HOLD",
      packageName: "Splendid Europe & Swiss Alpine Wonders",
      category: "World Tours • Europe",
      duration: "10 Days / 9 Nights",
      departureDate: "12 Oct 2026",
      adults: 2,
      children: 0,
      totalAmount: 379998,
      tokenPaid: 75999,
      balanceDue: 303999,
      leadTime: "15-20 Working Days (VFS Schengen In-Process)",
      coordinator: "Vikram Malhotra",
      coordinatorPhone: "+91 98210 44551",
      hotelTier: "4-Star Centrally Located Hotels",
      mealPlan: "All Meals Included (Pure Indian & Jain Kitchen)"
    },
    "ABHI-541209": {
      referenceId: "ABHI-541209",
      status: "Ticketed & 100% Guaranteed",
      statusCode: "CONFIRMED",
      packageName: "Untouched Lakshadweep: Agatti, Bangaram & Coral Lagoons",
      category: "India Holidays • Island Escapes",
      duration: "5 Days / 4 Nights",
      departureDate: "11 Oct 2026",
      adults: 2,
      children: 1,
      totalAmount: 116997,
      tokenPaid: 116997,
      balanceDue: 0,
      leadTime: "Island Entry Permits Approved & Issued",
      coordinator: "Ananya Iyer",
      coordinatorPhone: "+91 98450 11223",
      hotelTier: "Beachfront Lagoon Cottages",
      mealPlan: "All Meals (Buffet Breakfast, Lunch & Dinner)"
    }
  };

  const handleLookup = (e, customCode = null) => {
    if (e) e.preventDefault();
    const query = (customCode || pnrInput).trim().toUpperCase();
    if (!query) return;

    setPnrInput(query);
    setSearched(true);
    if (mockDatabase[query]) {
      setBookingResult(mockDatabase[query]);
    } else {
      setBookingResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 animate-fade-in space-y-8 font-sans">
      
      {/* 1. Commercial Top Banner */}
      <div className="text-center space-y-2">
        <span className="text-[11px] uppercase tracking-wider text-[#1D4ED8] font-black flex items-center justify-center gap-1.5">
          <FileText size={15} className="text-[#FF9900]" /> 
          Central Reservation & PNR Terminal
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B2545]">
          Manage & Track Your Booking
        </h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
          Enter your 6-digit booking token to view departure schedules, passenger rosters, visa tracking milestones, and payment receipts.
        </p>
      </div>

      {/* 2. Commercial Search & Quick-Demo Console */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <form onSubmit={(e) => handleLookup(e)} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Enter Booking PNR (e.g. ABHI-982410)..."
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3 text-xs font-mono font-bold uppercase border border-slate-300 bg-slate-50 rounded-xl focus:outline-none focus:bg-white focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all placeholder:font-sans placeholder:normal-case placeholder:font-normal"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Verify Booking</span>
            <ArrowRight size={15} className="stroke-[2.5]" />
          </button>
        </form>

        {/* 1-Click Demo Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">Quick Demo Lookup:</span>
          <button
            type="button"
            onClick={() => handleLookup(null, 'ABHI-982410')}
            className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 font-mono font-bold text-[#0B2545] text-xs transition cursor-pointer"
          >
            ABHI-982410 (Europe 24H Hold)
          </button>
          <button
            type="button"
            onClick={() => handleLookup(null, 'ABHI-541209')}
            className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 font-mono font-bold text-[#0B2545] text-xs transition cursor-pointer"
          >
            ABHI-541209 (Lakshadweep Confirmed)
          </button>
        </div>
      </div>

      {/* 3. Lookup Results Display */}
      {searched && (
        <div className="animate-fade-in space-y-6">
          {bookingResult ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Verified Booking Record
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-bold text-slate-600">{bookingResult.category}</span>
                  </div>
                  <h3 className="text-2xl font-black font-mono text-[#0B2545] tracking-wider">
                    {bookingResult.referenceId}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                    bookingResult.statusCode === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    <ShieldCheck size={15} />
                    <span>{bookingResult.status}</span>
                  </span>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Departure Preparation Milestones
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <div>
                      <strong className="block text-slate-900">Seat Quota Hold</strong>
                      <span className="text-[11px] text-emerald-700 font-semibold">Completed</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <div>
                      <strong className="block text-slate-900">Token Payment</strong>
                      <span className="text-[11px] text-emerald-700 font-semibold">Verified</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className={bookingResult.statusCode === 'CONFIRMED' ? 'text-emerald-600 shrink-0' : 'text-[#FF9900] shrink-0 animate-pulse'} />
                    <div>
                      <strong className="block text-slate-900">Visa & Permits</strong>
                      <span className="text-[11px] text-slate-500">{bookingResult.statusCode === 'CONFIRMED' ? 'Approved' : 'In Progress'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className={bookingResult.balanceDue === 0 ? 'text-emerald-600 shrink-0' : 'text-slate-400 shrink-0'} />
                    <div>
                      <strong className="block text-slate-900">Final Ticket Docket</strong>
                      <span className="text-[11px] text-slate-500">{bookingResult.balanceDue === 0 ? 'Ready to Print' : 'Pending Balance'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Details Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Holiday Package Specs */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black block">
                    Confirmed Holiday Package
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                    {bookingResult.packageName}
                  </h4>
                  <div className="space-y-1 text-slate-600 pt-1">
                    <p>• <strong>Duration:</strong> {bookingResult.duration}</p>
                    <p>• <strong>Accommodations:</strong> {bookingResult.hotelTier}</p>
                    <p>• <strong>Dining:</strong> {bookingResult.mealPlan}</p>
                  </div>
                </div>

                {/* Schedule & Travelers */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black block">
                    Departure Schedule & Party
                  </span>
                  <div className="text-sm font-black text-[#0B2545] font-mono">
                    Departure Date: {bookingResult.departureDate}
                  </div>
                  <div className="space-y-1 text-slate-600 pt-1">
                    <p>• <strong>Roster:</strong> {bookingResult.adults} Adults {bookingResult.children > 0 ? `+ ${bookingResult.children} Child (With Bed)` : ''}</p>
                    <p>• <strong>Room Type:</strong> Standard Twin Sharing</p>
                    <p>• <strong>Permit / Visa Lead Time:</strong> {bookingResult.leadTime}</p>
                  </div>
                </div>

                {/* Financial Ledger */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black block">
                    Financial Status (GST Included)
                  </span>
                  <div className="text-base font-black text-[#0B2545] font-mono">
                    Total Fare: ₹{bookingResult.totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="space-y-1 text-xs pt-1">
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Deposited Token Amount:</span>
                      <span className="font-mono">₹{bookingResult.tokenPaid.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 font-semibold border-t border-slate-200 pt-1">
                      <span>Remaining Balance Due:</span>
                      <span className="font-mono text-slate-900 font-bold">₹{bookingResult.balanceDue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Assigned Tour Coordinator */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black block">
                      Dedicated Tour Coordinator
                    </span>
                    <h5 className="font-extrabold text-slate-900 text-sm mt-0.5">
                      {bookingResult.coordinator}
                    </h5>
                    <p className="text-slate-500 text-[11px] mt-1">
                      Your designated holiday manager is available for visa forms, insurance briefings, and flight ticketing.
                    </p>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <a
                      href={`tel:${bookingResult.coordinatorPhone.replace(/\s+/g, '')}`}
                      className="flex-1 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 font-bold text-xs text-slate-800 text-center flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <PhoneCall size={13} className="text-[#1D4ED8]" /> Call
                    </a>
                    <button
                      type="button"
                      onClick={() => alert(`Connecting with Tour Manager ${bookingResult.coordinator} on WhatsApp...`)}
                      className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white text-center flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <MessageSquare size={13} /> WhatsApp
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Buttons Bar */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  Government of India Ministry of Tourism & IATA Regulated Booking System
                </span>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Printer size={14} /> Print Summary Slip
                  </button>
                  {bookingResult.balanceDue > 0 && (
                    <button
                      type="button"
                      onClick={() => alert(`Redirecting to secure gateway to clear balance of ₹${bookingResult.balanceDue.toLocaleString('en-IN')}...`)}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-black uppercase tracking-wider transition shadow-sm cursor-pointer"
                    >
                      Pay Remaining Balance
                    </button>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3 shadow-sm">
              <AlertCircle size={32} className="text-[#FF9900] mx-auto" />
              <h4 className="text-lg font-black text-[#0B2545]">
                No Active Booking Found for '{pnrInput}'
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Please double-check your reservation reference number or try our test tokens: <strong className="font-mono text-[#0B2545]">ABHI-982410</strong> or <strong className="font-mono text-[#0B2545]">ABHI-541209</strong>.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}