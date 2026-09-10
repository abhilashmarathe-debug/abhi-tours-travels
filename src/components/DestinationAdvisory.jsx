import React from 'react';
import { 
  Sun, Clock, CreditCard, Zap, ShieldCheck, 
  AlertCircle, FileCheck, HeartPulse, Compass 
} from 'lucide-react';

export default function DestinationAdvisory({ region, category }) {
  const advisoryData = {
    "Europe": {
      weather: "14°C - 19°C (Autumn Crisp)",
      season: "Peak Sightseeing Window (Clear Alpine Views)",
      visaTime: "15-20 Working Days (VFS Schengen)",
      visaType: "Sticker Visa (Biometrics Required)",
      currency: "Euro (€) / Swiss Franc (CHF)",
      plug: "Type C / J (230V European Standard)",
      health: "Overseas Travel Mediclaim (Included in Package)"
    },
    "Middle East": {
      weather: "24°C - 31°C (Warm & Sunny)",
      season: "Prime Desert Safari & City Shopping Window",
      visaTime: "3-5 Working Days",
      visaType: "Paper / Electronic Visa (E-Visa)",
      currency: "AED / OMR / SAR / AZN",
      plug: "Type G (British 3-Pin Standard)",
      health: "Travel Medical Insurance Included"
    },
    "Middle East & Africa": {
      weather: "22°C - 29°C (Pleasant Winter Sun)",
      season: "Optimal Nile Cruise & Monument Season",
      visaTime: "5-7 Working Days",
      visaType: "E-Visa / Group Visa Authority Letter",
      currency: "Egyptian Pound (EGP) / USD",
      plug: "Type C / F (220V Standard)",
      health: "Routine Vaccinations Advised"
    },
    "Southeast Asia": {
      weather: "27°C - 32°C (Tropical)",
      season: "Ideal for Island Cruises & Temples",
      visaTime: "2-4 Working Days",
      visaType: "E-Visa / Free Visa on Arrival",
      currency: "THB / MYR / SGD / VND / IDR",
      plug: "Type A / C / G (Universal Sockets)",
      health: "Light Cottons & Sun Protection Advised"
    },
    "Island Escapes": {
      weather: "26°C - 30°C (Breezy Maritime)",
      season: "Crystal Waters & Optimal Coral Visibility",
      visaTime: "Instant / On Arrival",
      visaType: "Free 30-Day Tourist Permit",
      currency: "USD / MVR / INR (₹)",
      plug: "Type G / D (Resort Universal Compatible)",
      health: "Reef-Safe Sunscreen Recommended"
    },
    "North India": {
      weather: "10°C - 19°C (Chilly Evenings)",
      season: "Clear Skies, Snow Vistas & Shikara Season",
      visaTime: "No Visa Required",
      visaType: "Valid Govt. Photo ID / Passport",
      currency: "Indian Rupee (INR ₹)",
      plug: "Standard Indian 3-Pin (Type D / M)",
      health: "Warm Woolens & Layering Mandatory"
    },
    "South India": {
      weather: "23°C - 28°C (Lush Green)",
      season: "Backwaters & Hill Plantation Season",
      visaTime: "No Visa Required",
      visaType: "Valid Govt. Photo ID / Passport",
      currency: "Indian Rupee (INR ₹)",
      plug: "Standard Indian 3-Pin (Type D / M)",
      health: "Breathable Cottons Recommended"
    },
    "West India": {
      weather: "20°C - 29°C (Comfortable)",
      season: "Royal Forts & Desert Festivity Window",
      visaTime: "No Visa Required",
      visaType: "Valid Govt. Photo ID / Passport",
      currency: "Indian Rupee (INR ₹)",
      plug: "Standard Indian 3-Pin (Type D / M)",
      health: "Comfortable Walking Footwear Advised"
    }
  };

  const info = advisoryData[region] || advisoryData["Europe"];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#0B2545] text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#07192F]">
        <div className="flex items-center gap-2">
          <Compass size={16} className="text-[#FF9900]" />
          <span className="text-xs font-black uppercase tracking-wider">
            Important Travel Advisory & Visa Guidelines • {region}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-amber-300">
          Official Briefing
        </span>
      </div>

      {/* 4-Column Commercial Matrix */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white">
        
        {/* 1. Climate */}
        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-1.5 text-amber-700 mb-1">
            <Sun size={14} className="text-[#FF9900]" />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Weather & Temp
            </span>
          </div>
          <span className="font-extrabold text-slate-900 text-xs block leading-snug">
            {info.weather}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5 truncate">
            {info.season}
          </span>
        </div>

        {/* 2. Visa & Lead Time */}
        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-1.5 text-[#1D4ED8] mb-1">
            <Clock size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Visa Processing
            </span>
          </div>
          <span className="font-extrabold text-slate-900 text-xs block leading-snug">
            {info.visaTime}
          </span>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
            {info.visaType}
          </span>
        </div>

        {/* 3. Currency */}
        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
            <CreditCard size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Accepted Currency
            </span>
          </div>
          <span className="font-extrabold text-slate-900 text-xs block leading-snug">
            {info.currency}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            Forex Card Recommended
          </span>
        </div>

        {/* 4. Power Grid */}
        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-1.5 text-purple-700 mb-1">
            <Zap size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Power & Socket
            </span>
          </div>
          <span className="font-extrabold text-slate-900 text-xs block leading-snug">
            {info.plug}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            220V - 240V Standard
          </span>
        </div>

      </div>

      {/* Bottom Health & Mediclaim Strip */}
      <div className="px-4 py-2.5 bg-blue-50/60 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck size={15} className="text-emerald-700 shrink-0" />
          <span>
            <strong>Health & Travel Safety:</strong> {info.health}
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#1D4ED8] shrink-0">
          Tour Manager Assisted Departure
        </span>
      </div>

    </div>
  );
}