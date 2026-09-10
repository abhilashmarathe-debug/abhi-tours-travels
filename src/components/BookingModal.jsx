import React, { useState } from 'react';
import { 
  X, CheckCircle2, Calendar, MapPin, Check, ShieldAlert, 
  FileText, Shield, Users, Baby, BedDouble, Printer, 
  ArrowRight, PhoneCall, Plane, Clock, Info
} from 'lucide-react';

export default function BookingModal({ pkg, onClose }) {
  const [activeTab, setActiveTab] = useState('dates'); // 'dates' | 'itinerary' | 'inclusions'
  const [selectedDeparture, setSelectedDeparture] = useState(pkg.departures[0]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [booked, setBooked] = useState(false);
  const [referenceId] = useState(() => 'ABHI-' + Math.floor(100000 + Math.random() * 900000));

  // Pricing calculations
  const baseRate = selectedDeparture ? selectedDeparture.price : pkg.startingPrice;
  const adultSubtotal = baseRate * adults;
  const childSubtotal = Math.round(baseRate * 0.75 * children);
  const totalQuotation = adultSubtotal + childSubtotal;
  const tokenDeposit = Math.round(totalQuotation * 0.20);
  const emiEstimate = Math.round(baseRate / 12);

  // --- 1. PROFORMA CONFIRMATION SLIP (Veena World / Kesari Style) ---
  if (booked) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in font-sans">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl border border-slate-200 my-auto text-slate-900">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700 mb-4 shadow-sm">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-[11px] uppercase tracking-widest text-[#1D4ED8] font-black block">
            Guaranteed Fixed Departure Quota
          </span>
          <h3 className="text-2xl font-extrabold text-[#0B2545] mt-1">
            Provisional Seat Hold Placed!
          </h3>

          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs text-slate-700 font-medium">
            <span>Booking Token:</span>
            <span className="font-mono font-bold text-slate-900">{referenceId}</span>
          </div>

          {/* Quotation Voucher Card */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 my-5 text-left text-xs space-y-2.5">
            <div className="flex justify-between text-slate-600">
              <span className="font-medium">Tour Package:</span>
              <span className="font-bold text-slate-900 text-right truncate max-w-[240px]">{pkg.title}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="font-medium">Departure Batch:</span>
              <span className="font-bold text-slate-900 font-mono">{selectedDeparture.date}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="font-medium">Traveler Roster:</span>
              <span className="font-bold text-slate-900">{adults} Adult(s) {children > 0 ? `+ ${children} Child` : ''}</span>
            </div>
            <div className="flex justify-between text-slate-600 pt-1.5 border-t border-slate-200">
              <span className="font-medium">Integrated GST (5%):</span>
              <span className="text-emerald-700 font-bold">100% Inclusive</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-slate-200 text-sm font-black text-[#0B2545]">
              <span>Total Quotation:</span>
              <span className="font-mono">₹{totalQuotation.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-[#1D4ED8]">
              <span>Deposit Due to Lock (20%):</span>
              <span className="font-mono">₹{tokenDeposit.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[11px] text-amber-900 mb-6 text-left flex items-start gap-2">
            <Clock size={16} className="text-[#FF9900] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Your seats are locked under a temporary <strong>24-hour hold</strong>. An Abhi World tour coordinator will call you to finalize passenger passport details and official payment links.
            </p>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={() => window.print()}
              className="flex-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer size={14} /> Print Confirmation
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-[#0B2545] hover:bg-[#07192F] text-white font-extrabold py-3 rounded-xl transition text-xs cursor-pointer shadow-md"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. MULTI-TAB COMMERCIAL BOOKING MODAL ---
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#0B2545] text-white p-5 sm:p-6 flex justify-between items-start relative shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#FF9900] text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded shadow-sm tracking-wider">
                {pkg.category} Group Tour
              </span>
              <span className="bg-blue-900/60 text-blue-200 text-[11px] font-semibold px-2 py-0.5 rounded border border-blue-700/50">
                {pkg.duration}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {pkg.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <span>Escorted Fixed Batch</span>
              <span>•</span>
              <span className="text-amber-300 font-medium">Pure Indian & Jain Kitchen Staff Accompanied</span>
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Commercial Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-[#F8FAFC] px-5 text-xs font-bold text-slate-600 gap-6 shrink-0">
          <button
            onClick={() => setActiveTab('dates')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'dates' 
                ? 'border-[#1D4ED8] text-[#1D4ED8]' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Calendar size={15} /> 1. Departure Dates & Pricing
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'itinerary' 
                ? 'border-[#1D4ED8] text-[#1D4ED8]' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <MapPin size={15} /> 2. Day-Wise Plan
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'inclusions' 
                ? 'border-[#1D4ED8] text-[#1D4ED8]' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileText size={15} /> 3. Inclusions & Terms
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-xs text-slate-700 space-y-6">
          
          {/* TAB 1: BATCHES & OCCUPANCY CONFIGURATOR */}
          {activeTab === 'dates' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Select Departure Batch
                  </label>
                  <span className="text-[11px] text-slate-400">Guaranteed Escorted Schedules</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.departures.map((dep) => {
                    const isSelected = selectedDeparture.date === dep.date;
                    return (
                      <button
                        key={dep.date}
                        disabled={dep.status === 'Waitlist'}
                        onClick={() => setSelectedDeparture(dep)}
                        className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#1D4ED8] bg-blue-50/50 ring-2 ring-[#1D4ED8]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        } ${dep.status === 'Waitlist' ? 'opacity-40 cursor-not-allowed bg-slate-50' : 'cursor-pointer shadow-xs'}`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center gap-1.5 font-extrabold text-sm text-[#0B2545]">
                            <Calendar size={15} className="text-[#1D4ED8]" />
                            <span>{dep.date}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                            dep.status === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                            dep.status === 'Filling Fast' ? 'bg-amber-100 text-amber-900' : 
                            'bg-slate-200 text-slate-600'
                          }`}>
                            {dep.status}
                          </span>
                        </div>

                        <div className="mt-3 flex justify-between items-end border-t border-slate-100 pt-2.5">
                          <div>
                            <span className="text-[11px] text-slate-500 font-medium block">{dep.seatsLeft} seats remaining</span>
                            <span className="text-[10px] text-slate-400 font-mono">EMI from ₹{Math.round(dep.price / 12).toLocaleString('en-IN')}/mo</span>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-base text-[#0B2545]">₹{dep.price.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] text-slate-400 block font-normal">/ adult</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Occupancy Stepper Grid */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-2.5">
                  Guest & Room Setup
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Adults */}
                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                        <BedDouble size={15} className="text-[#1D4ED8]" /> Adults (12+ yrs)
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Twin sharing room basis</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center font-bold bg-white text-slate-800 hover:bg-slate-100 cursor-pointer shadow-xs"
                      >-</button>
                      <span className="font-black text-sm text-slate-900 w-5 text-center font-mono">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center font-bold bg-white text-slate-800 hover:bg-slate-100 cursor-pointer shadow-xs"
                      >+</button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                        <Baby size={15} className="text-[#1D4ED8]" /> Child (2 - 11 yrs)
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">With extra cot • 75% tariff</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center font-bold bg-white text-slate-800 hover:bg-slate-100 cursor-pointer shadow-xs"
                      >-</button>
                      <span className="font-black text-sm text-slate-900 w-5 text-center font-mono">{children}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center font-bold bg-white text-slate-800 hover:bg-slate-100 cursor-pointer shadow-xs"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inclusions Trust Badge */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Shield size={14} className="text-[#1D4ED8] shrink-0" />
                  Prices include 5% Integrated GST, hotel stay, guided transfers, and all meals.
                </span>
                <span className="font-extrabold text-emerald-700 uppercase tracking-wider text-[10px]">100% Transparent</span>
              </div>
            </div>
          )}

          {/* TAB 2: DAY-WISE ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-3.5">
              {pkg.itinerary?.map((item) => (
                <div key={item.day} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#1D4ED8] text-white font-extrabold text-[10px] px-2 py-0.5 rounded">
                      DAY {String(item.day).padStart(2, '0')}
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs">{item.title}</h5>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed pl-1">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/20 space-y-3">
                <h5 className="font-extrabold text-emerald-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Check size={16} className="text-emerald-700" /> Package Inclusions
                </h5>
                <ul className="space-y-2 pl-1">
                  {pkg.inclusions?.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-xs leading-snug">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-red-50/20 space-y-3">
                <h5 className="font-extrabold text-red-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <ShieldAlert size={16} className="text-red-600" /> Package Exclusions
                </h5>
                <ul className="space-y-2 pl-1">
                  {pkg.exclusions?.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-xs leading-snug">
                      <span className="text-red-500 font-bold shrink-0">✕</span> {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Checkout & Total Bar */}
        <div className="bg-white border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                Total Quotation ({adults} Adults{children > 0 ? `, ${children} Ch` : ''})
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">GST Included</span>
            </div>
            <div className="text-2xl font-black text-[#0B2545] font-mono leading-tight">
              ₹{totalQuotation.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-[#1D4ED8] font-bold">
              Token to lock seat: ₹{tokenDeposit.toLocaleString('en-IN')} (20%)
            </span>
          </div>

          <button
            onClick={() => setBooked(true)}
            className="bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 font-black px-8 py-3 rounded-xl shadow-md hover:shadow-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Hold Seats & Request Proforma</span>
            <ArrowRight size={15} className="stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}