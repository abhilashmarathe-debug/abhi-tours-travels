import React, { useState } from 'react';
import { Copy, Check, Sparkles, Tag, ArrowRight, Gift } from 'lucide-react';

export default function PromoOffersAndForex() {
  const [copiedCode, setCopiedCode] = useState(null);

  const offers = [
    {
      code: "FESTIVE26",
      discount: "FLAT ₹12,000 OFF",
      category: "Europe & Alpine Departures",
      badge: "DIWALI SPECIAL",
      validity: "Valid till 31 Oct 2026",
      detail: "Instant savings applied on Swiss Alpine, Italy, and Paris escorted group tours."
    },
    {
      code: "DESERT5K",
      discount: "FLAT ₹5,000 OFF",
      category: "Middle East Special",
      badge: "LIMITED SEATS",
      validity: "Valid till 15 Nov 2026",
      detail: "Valid for Dubai, Abu Dhabi & Baku 5-Day escorted holiday packages."
    },
    {
      code: "EARLYBIRD",
      discount: "EXTRA 10% OFF",
      category: "India Holidays",
      badge: "EARLY BIRD",
      validity: "Valid till 30 Nov 2026",
      detail: "Applicable on Kashmir Houseboats, Lakshadweep Atolls, and Kerala packages."
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 pb-3 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#1D4ED8] mb-1">
            <Gift size={14} className="text-[#FF9900]" />
            <span>Special Festive Concessions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B2545]">
            Holiday Discount Vouchers & Coupons
          </h2>
        </div>
        <span className="text-xs font-bold text-slate-500">
          Apply promo code at checkout to reduce token deposit
        </span>
      </div>

      {/* High-Density Commercial Voucher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div 
            key={offer.code}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#1D4ED8] transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#FF9900]" />

            <div>
              {/* Category & Badge Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 truncate">
                  {offer.category}
                </span>
                <span className="bg-amber-100 text-amber-900 text-[9px] font-black uppercase px-2 py-0.5 rounded shrink-0">
                  {offer.badge}
                </span>
              </div>

              {/* Discount Amount */}
              <div className="text-2xl font-black text-[#0B2545] tracking-tight">
                {offer.discount}
              </div>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {offer.detail}
              </p>

              <span className="inline-block text-[11px] font-semibold text-emerald-700 mt-2">
                ✓ {offer.validity}
              </span>
            </div>

            {/* Promo Code Box with 1-Click Copy */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="px-3 py-1.5 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg font-mono text-xs font-black text-[#0B2545] tracking-wider select-all">
                {offer.code}
              </div>

              <button
                type="button"
                onClick={() => handleCopy(offer.code)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  copiedCode === offer.code
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 hover:bg-[#FF9900] text-slate-800 hover:text-slate-950'
                }`}
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check size={13} className="stroke-[3]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}