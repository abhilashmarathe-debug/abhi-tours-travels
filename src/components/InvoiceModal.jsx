import React from 'react';
import { 
  X, Printer, CheckCircle2, ShieldCheck, Plane, 
  Clock, PhoneCall, FileText, Download, AlertCircle 
} from 'lucide-react';

export default function InvoiceModal({ bookingData, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const { pkg, departure, adults, children = 0, referenceId } = bookingData;
  const baseRate = departure?.price || pkg?.startingPrice || 0;
  const adultTotal = baseRate * adults;
  const childTotal = Math.round(baseRate * 0.75 * children);
  const subtotal = adultTotal + childTotal;
  
  // 5% GST split (standard Indian travel operator SAC 998555)
  const cgst = Math.round(subtotal * 0.025);
  const sgst = Math.round(subtotal * 0.025);
  const totalTax = cgst + sgst;
  const grandTotal = subtotal + totalTax;
  
  // Deposit milestones
  const tokenDue = Math.round(grandTotal * 0.20);
  const balanceDue = grandTotal - tokenDue;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in font-sans print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full my-auto overflow-hidden text-slate-900 print:m-0 print:border-none print:shadow-none print:max-w-none print:w-full">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="px-6 py-3.5 bg-[#0B2545] text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="bg-[#FF9900] text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
              Official Tax Proforma
            </span>
            <span className="text-xs font-bold text-slate-200">
              Booking Confirmation & Financial Ledger
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer uppercase tracking-wider"
            >
              <Printer size={14} className="stroke-[2.5]" /> Print Tax Invoice / PDF
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close invoice"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 space-y-6 text-xs bg-white relative" id="printable-voucher">
          
          {/* 1. Header with Corporate Identity & PNR Status */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center font-black text-base shadow-sm">
                  <Plane size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-black tracking-tight text-[#0B2545] leading-none">ABHI</span>
                    <span className="text-2xl font-black tracking-tight text-[#FF9900] leading-none">WORLD</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold block mt-0.5">
                    Abhi Expeditions & Escorted Holidays Pvt. Ltd.
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 mt-3 space-y-0.5 font-medium">
                <p>Govt. Registered Tour Operator • IATA Accredited Passenger Agent</p>
                <p>GSTIN: <strong className="text-slate-800">27AABCA1234F1Z9</strong> • SAC Code: <strong>998555</strong> (Tour Operator Services)</p>
                <p>Central Desk: 1800-22-7979 / 1800-000-ABHI • support@abhiworld.com</p>
              </div>
            </div>

            {/* PNR Reference Badge */}
            <div className="sm:text-right bg-slate-50 p-3 rounded-xl border border-slate-200 w-full sm:w-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Booking Reference (PNR)
              </span>
              <span className="text-xl font-mono font-black text-[#0B2545] tracking-wider block">
                {referenceId}
              </span>
              <div className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded font-black mt-1 uppercase">
                <CheckCircle2 size={11} className="text-emerald-700" />
                <span>24-Hour Quota Locked</span>
              </div>
              <span className="text-[9px] text-slate-400 block mt-1 font-mono">Date: 09-Sep-2026</span>
            </div>
          </div>

          {/* 2. Package & Departure Summary Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                Holiday Package Details
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                {pkg?.title}
              </h4>
              <span className="text-[11px] text-[#1D4ED8] font-bold block">
                {pkg?.duration} • {pkg?.category} Special ({pkg?.region})
              </span>
              <span className="text-[10px] text-slate-500 block">
                Accompanied by Indian Kitchen-Car & Tour Leader
              </span>
            </div>

            <div className="space-y-1 sm:border-l sm:border-slate-200 sm:pl-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">
                Confirmed Batch & Occupancy
              </span>
              <span className="font-mono font-black text-[#0B2545] text-sm block">
                {departure?.date || 'Confirmed 2026 Batch'}
              </span>
              <span className="text-[11px] text-slate-700 font-semibold block">
                {adults} Adult(s) {children > 0 ? `+ ${children} Child (With Bed)` : ''}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Basis: Standard Twin / Double Sharing AC Rooms
              </span>
            </div>
          </div>

          {/* 3. Itemized Tax & Cost Ledger */}
          <div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-100/70 text-slate-600 font-extrabold text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Description & Service Details</th>
                  <th className="py-2.5 px-3 text-center">Travelers</th>
                  <th className="py-2.5 px-3 text-right">Base Tariff</th>
                  <th className="py-2.5 px-3 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 text-xs">
                <tr>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">Adult Passenger (Twin Sharing Basis)</span>
                    <span className="text-[10px] text-slate-500">Includes 4-star hotel stay, all meals, AC coach transits, and guided escort</span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">{adults}</td>
                  <td className="py-3 px-3 text-right font-mono">₹{baseRate.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">₹{adultTotal.toLocaleString('en-IN')}</td>
                </tr>

                {children > 0 && (
                  <tr>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 block">Child with Bed (75% of Adult Tariff)</span>
                      <span className="text-[10px] text-slate-500">Rollaway bed setup, coach seat, and complete meal inclusions</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">{children}</td>
                    <td className="py-3 px-3 text-right font-mono">₹{Math.round(baseRate * 0.75).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">₹{childTotal.toLocaleString('en-IN')}</td>
                  </tr>
                )}

                {/* Subtotal */}
                <tr className="bg-slate-50/50 font-bold text-slate-700">
                  <td colSpan="3" className="py-2 px-3 text-right">Taxable Net Subtotal:</td>
                  <td className="py-2 px-3 text-right font-mono">₹{subtotal.toLocaleString('en-IN')}</td>
                </tr>

                {/* Taxes */}
                <tr>
                  <td colSpan="3" className="py-1.5 px-3 text-right text-slate-500 font-medium">
                    Central GST (CGST 2.5%):
                  </td>
                  <td className="py-1.5 px-3 text-right font-mono text-slate-600">₹{cgst.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="py-1.5 px-3 text-right text-slate-500 font-medium">
                    State GST (SGST 2.5%):
                  </td>
                  <td className="py-1.5 px-3 text-right font-mono text-slate-600">₹{sgst.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
              
              {/* Grand Total & Payment Schedule */}
              <tfoot>
                <tr className="border-t-2 border-slate-900 bg-slate-50 text-slate-950 font-black text-sm">
                  <td colSpan="3" className="py-3 px-3">Grand Total Tour Quotation (All Inclusive):</td>
                  <td className="py-3 px-3 text-right font-mono text-base text-[#0B2545]">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr className="bg-amber-50/70 text-[#B45309] font-black text-xs">
                  <td colSpan="3" className="py-2 px-3">
                    Provisional Registration Token to Lock Quota (20%):
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-sm">
                    ₹{tokenDue.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr className="text-slate-500 text-[11px] font-semibold">
                  <td colSpan="3" className="py-1 px-3 text-right">
                    Remaining Balance (Due 21 Days prior to departure):
                  </td>
                  <td className="py-1 px-3 text-right font-mono text-slate-700">
                    ₹{balanceDue.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 4. Terms, Inclusions & Bank Settlement Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 text-[10px] text-slate-600">
            <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-extrabold uppercase text-slate-800 block">Terms of Confirmation</span>
              <p>1. This proforma guarantees a 24-hour seat allocation for the roster indicated.</p>
              <p>2. For international batches, passport copies (minimum 6 months validity) are required with token submission.</p>
              <p>3. Cancellations adhere to standard Ministry of Tourism & IATA tour operator schedules.</p>
            </div>

            <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-extrabold uppercase text-slate-800 block">NEFT / RTGS Bank Details</span>
              <p>Account Name: <strong>Abhi Expeditions Pvt. Ltd.</strong></p>
              <p>Bank: <strong>HDFC Bank Ltd., Mumbai Main Branch</strong></p>
              <p>A/C No: <strong>50200088991234</strong> • IFSC: <strong>HDFC0000060</strong></p>
            </div>
          </div>

          {/* 5. Authorization Stamp & Signature Block */}
          <div className="pt-4 border-t-2 border-slate-200 flex justify-between items-end text-[10px] text-slate-400">
            <div>
              <span className="font-bold text-slate-700 block">Computer Generated Tax Proforma</span>
              <p className="font-mono mt-0.5">Verified by Operations Desk • Abhi Expeditions Pvt. Ltd.</p>
            </div>
            <div className="text-right">
              <div className="w-32 h-10 border-b border-slate-300 mb-1 flex items-center justify-center">
                <span className="font-serif italic text-slate-300 text-xs select-none">Authorized Officer</span>
              </div>
              <span className="font-extrabold text-slate-700 uppercase tracking-wider block">Authorized Signatory</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}