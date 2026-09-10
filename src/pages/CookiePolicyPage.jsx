import React from 'react';
import { Cookie, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function CookiePolicyPage({ onBack }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8 font-sans animate-fade-in text-slate-800">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#1D4ED8] hover:underline cursor-pointer"
      >
        <ArrowLeft size={14} /> Return to Portal
      </button>

      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-[#1D4ED8] mb-1">
          <Cookie size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Compliance Protocol</span>
        </div>
        <h1 className="text-3xl font-black text-[#0B2545]">Cookie Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Effective Date: September 2026</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-xs leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">1. What Are Cookies?</h2>
          <p className="text-slate-600">
            Cookies are small cryptographic data files placed on your computer or mobile device when accessing ABHI World. They allow our terminal servers to recognize your session, preserve coach berth allocations, and ensure seamless checkout authentication.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">2. Categories of Cookies We Employ</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-extrabold text-[#0B2545] block">Essential Operational Cookies</span>
              <p className="text-slate-500 text-[11px]">
                Required for core authentication, gateway payments, and real-time Abhi Bus berth locks.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-extrabold text-[#0B2545] block">Session & State Cookies</span>
              <p className="text-slate-500 text-[11px]">
                Remembers selected departures, currency selections, and comparisons between tabs.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-extrabold text-[#0B2545] block">Analytical Metrics</span>
              <p className="text-slate-500 text-[11px]">
                Tracks anonymous visitor flows to optimize server load across high-demand pilgrim booking windows.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-extrabold text-[#0B2545] block">Security & Fraud Prevention</span>
              <p className="text-slate-500 text-[11px]">
                Detects repetitive automated bot scripts seeking ticket hoard lockouts.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">3. Managing Preferences</h2>
          <p className="text-slate-600">
            You can modify your browser settings to decline all non-essential cookies. However, disabling essential session tokens will impede your ability to complete ticket reservations and verify PNR status terminals.
          </p>
        </section>
      </div>
    </div>
  );
}