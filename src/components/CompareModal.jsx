import React from 'react';
import { 
  X, ArrowRight, Check, Calendar, Utensils, Hotel, 
  Bus, Star, Plane, ShieldCheck, MapPin, Sparkles 
} from 'lucide-react';

export default function CompareModal({ packages, onClose, onSelect }) {
  const maxSlots = 3;
  const emptySlotsCount = Math.max(0, maxSlots - packages.length);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Commercial Portal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#0B2545] text-white">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-amber-300 font-black block mb-0.5">
              Side-by-Side Evaluation Matrix
            </span>
            <h3 className="text-xl font-extrabold text-white">
              Compare Tour Packages ({packages.length} of {maxSlots})
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Matrix Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F8FAFC]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              
              {/* Product Header Row */}
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="w-1/4 pb-4 align-bottom">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400 block">
                      Tour Parameters
                    </span>
                  </th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className="w-1/4 p-3 align-top">
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3 shadow-xs">
                        <div className="h-32 rounded-lg overflow-hidden relative bg-slate-100">
                          <img 
                            src={pkg.image} 
                            alt={pkg.title} 
                            className="w-full h-full object-cover" 
                          />
                          <span className="absolute top-2 left-2 bg-[#0B2545] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                            {pkg.category}
                          </span>
                          <span className="absolute top-2 right-2 bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                            {pkg.duration}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">
                            {pkg.title}
                          </h4>
                          <div className="text-base font-black text-[#0B2545] mt-1.5">
                            ₹{pkg.startingPrice.toLocaleString('en-IN')}
                            <span className="text-[11px] text-slate-400 font-medium ml-1">/ person</span>
                          </div>
                          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                            All Meals & Taxes Included
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: emptySlotsCount }).map((_, i) => (
                    <th key={i} className="w-1/4 p-3 align-top">
                      <div className="h-full min-h-[240px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 text-center text-slate-400 bg-slate-50/50">
                        <span className="text-xs font-bold text-slate-500">Available Slot</span>
                        <span className="text-[11px] text-slate-400 mt-1">Select another holiday from the catalog to compare features</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Comparative Parameters */}
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700 bg-white">
                
                {/* Destination Territory */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/70">
                    Territory & Region
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="p-3.5 font-semibold text-slate-800">
                      {pkg.region}
                    </td>
                  ))}
                  {Array.from({ length: emptySlotsCount }).map((_, i) => (
                    <td key={i} className="p-3.5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Next Fixed Departure */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/70">
                    Upcoming Departure
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="p-3.5 font-mono font-bold text-[#1D4ED8]">
                      {pkg.departures[0]?.date || 'Inquire with Desk'}
                    </td>
                  ))}
                  {Array.from({ length: emptySlotsCount }).map((_, i) => (
                    <td key={i} className="p-3.5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Rating & Reviews */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/70">
                    Traveler Rating
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded text-[11px]">
                          ★ {pkg.rating}
                        </span>
                        <span className="text-[11px] text-slate-400">({pkg.reviews} reviews)</span>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: emptySlotsCount }).map((_, i) => (
                    <td key={i} className="p-3.5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Kitchen / Dining Inclusions */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-500 uppercase tracking-wider text-[11px] align-top bg-slate-50/70">
                    Dining & Kitchen
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="p-3.5 align-top space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                        <Check size={14} className="text-emerald-600 shrink-0" />
                        <span>Pure Indian Kitchen Meals</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                        <Check size={14} className="text-slate-400 shrink-0" />
                        <span>Jain Dining Prepared</span>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: emptySlotsCount }).map((_, i) => (
                    <td key={i} className="p-3.5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Key Highlights */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-500 uppercase tracking-wider text-[11px] align-top bg-slate-50/70">
                    Key Sightseeing
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="p-3.5 align-top space-y-1 text-slate-600 leading-relaxed">
                      {pkg.highlights.slice(0, 3).map((h, idx) => (
                        <div key={idx} className="line-clamp-1">• {h}</div>
                      ))}
                    </td>
                  ))}
                  {Array.from({ length: emptySlotsCount }).map((_, i) => (
                    <td key={i} className="p-3.5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Tour Manager & Escort */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/70">
                    Tour Manager
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="p-3.5 text-slate-700 font-medium">
                      Accompanying English & Hindi Leader
                    </td>
                  ))}
                  {Array.from({ length: emptySlotsCount }).map((_, i) => (
                    <td key={i} className="p-3.5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Action CTA Row */}
                <tr>
                  <td className="p-4 font-bold text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/70">
                    Proceed
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="p-4">
                      <button
                        onClick={() => onSelect(pkg)}
                        className="w-full py-2.5 px-3 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 rounded-lg font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </button>
                    </td>
                  ))}
                  {Array.from({ length: emptySlotsCount }).map((_, i) => (
                    <td key={i} className="p-4"></td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}