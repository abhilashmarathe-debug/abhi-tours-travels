import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage({ onBack }) {
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
          <ShieldCheck size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Data Protection Protocol</span>
        </div>
        <h1 className="text-3xl font-black text-[#0B2545]">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Regulated Under Digital Personal Data Protection (DPDP) Act</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-xs leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">1. Information Collection</h2>
          <p className="text-slate-600">
            When completing reservations on ABHI World, we collect personal identifying records including full legal names, contact numbers, email addresses, government photo identity details (such as Aadhaar or Passport copies required for temple sanctum slots and airline tickets), and payment confirmations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">2. Purpose of Data Processing</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Issuing confirmed PNR tokens, boarding passes, and verified room allocations.</li>
            <li>Registering pilgrimage entries with statutory trusts (TTD, Shri Ram Janmabhoomi Teerth Kshetra, BKTC).</li>
            <li>Dispatching automated SMS dispatch alerts, coach tracking, and emergency advisories.</li>
            <li>Complying with GST and Ministry of Tourism statutory audit mandates.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">3. Third-Party Data Disclosures</h2>
          <p className="text-slate-600">
            Your personal information is never sold to marketing aggregators. Identity records are shared solely with operational ground providers—such as licensed airline carriers, contracted luxury hotels, verified fleet dispatch drivers, and official darshan ticketing authorities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">4. Data Encryption & Security</h2>
          <p className="text-slate-600">
            All database transmissions are safeguarded via TLS 1.3 encryption. Payment transactions conform directly to RBI PCI-DSS compliant banking partner endpoints.
          </p>
        </section>
      </div>
    </div>
  );
}