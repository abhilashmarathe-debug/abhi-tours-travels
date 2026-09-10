import React from 'react';
import { FileText, AlertTriangle, Scale, ArrowLeft } from 'lucide-react';

export default function TermsPage({ onBack }) {
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
          <Scale size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Legal Binding Agreement</span>
        </div>
        <h1 className="text-3xl font-black text-[#0B2545]">Terms & Conditions</h1>
        <p className="text-xs text-slate-500 mt-1">Abhi Expeditions Pvt. Ltd. • Consumer Contract</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-xs leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">1. Contractual Scope</h2>
          <p className="text-slate-600">
            By reserving an escorted holiday package or booking coach berths via Abhi Bus, you enter into a legally binding contract with Abhi Expeditions Pvt. Ltd. All fares published are inclusive of designated GST unless stated otherwise in custom add-on riders.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">2. Coach Berth Allocations & Timings</h2>
          <p className="text-slate-600">
            Berths marked exclusively for female passengers must not be reserved by male travelers. The company reserves the right to reassign seats or decline boarding without refund if false gender information is provided. While punctual departures are maintained, timings are subject to highway checkpoints and force majeure events.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">3. Cancellation & Refund Slabs</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>30+ Days Prior to Tour:</strong> 90% refund minus nominal processing fee.</li>
            <li><strong>15 to 29 Days Prior:</strong> 50% cancellation deduction.</li>
            <li><strong>Under 14 Days / No-Show:</strong> 100% non-refundable due to pre-committed hotel, flight, and permits.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">4. Jurisdiction</h2>
          <p className="text-slate-600">
            All legal claims, arbitrations, and contractual disputes are subject solely to the exclusive jurisdiction of the competent courts in Maharashtra, India.
          </p>
        </section>
      </div>
    </div>
  );
}