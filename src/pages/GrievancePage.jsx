import React, { useState } from 'react';
import { 
  Headphones, ShieldAlert, CheckCircle2, Send, PhoneCall, 
  Clock, FileText, AlertCircle, HelpCircle, ArrowRight, MessageSquare,
  ChevronDown
} from 'lucide-react';

const FAQS = [
  {
    q: "How do I make changes or request cancellations for my booking?",
    a: "Modifications and cancellations depend on your package or bus departure category. You can submit an inquiry through this desk with your PNR or contact your designated tour coordinator directly for tier-based cancellation policies and refunds."
  },
  {
    q: "What dietary options are guaranteed on escorted holidays?",
    a: "All escorted holidays feature verified pure vegetarian dining, including guaranteed Jain arrangements prepared without root vegetables, garlic, or onion, accompanied by dedicated kitchen specialists."
  },
  {
    q: "How does VIP Darshan assistance work on Devotional tours?",
    a: "Our pilgrim circuits include verified token coordination for priority sanctum entry (such as Kashi Vishwanath and Tirupati Balaji) managed by experienced local pandits and escorts."
  },
  {
    q: "When will I receive my bus booking PNR and driver contact details?",
    a: "Bus booking confirmation PNRs are generated instantly upon checkout. Boarding bay specifics and driver contact details are delivered via automated SMS and WhatsApp 2 hours prior to scheduled departure."
  },
  {
    q: "What documentation is required for domestic flights and hotel check-ins?",
    a: "Every passenger must present a government-recognized physical photo ID (Aadhaar Card, Passport, or Voter ID) at all airport checkpoints, hotel receptions, and high-altitude border permits."
  }
];

export default function GrievancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pnr: '',
    category: 'Billing & Proforma Invoices',
    priority: 'Normal (48h SLA)',
    message: ''
  });

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = "TICK-" + Math.floor(100000 + Math.random() * 900000);
    setTicketId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 animate-fade-in font-sans">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center shadow-lg space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700 shadow-sm">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#1D4ED8] font-black block">
              Official Inquiry Logged
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] mt-1">
              Support Ticket Acknowledged
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-700 font-semibold">
            <span>Tracking Docket ID:</span>
            <span className="font-mono font-black text-[#0B2545]">{ticketId}</span>
          </div>

          {/* Ticket Summary Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2.5 max-w-md mx-auto">
            <div className="flex justify-between text-slate-600">
              <span className="font-medium">Guest Legal Name:</span>
              <span className="font-bold text-slate-900">{formData.name}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="font-medium">Contact Phone:</span>
              <span className="font-mono font-bold text-slate-900">{formData.phone}</span>
            </div>
            {formData.pnr && (
              <div className="flex justify-between text-slate-600">
                <span className="font-medium">Linked PNR:</span>
                <span className="font-mono font-bold text-[#1D4ED8]">{formData.pnr}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600 pt-1.5 border-t border-slate-200">
              <span className="font-medium">Inquiry Department:</span>
              <span className="font-bold text-slate-900">{formData.category}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="font-medium">Assigned SLA:</span>
              <span className="font-bold text-emerald-700">{formData.priority}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
            Our Central Operations Desk and Duty Manager have received your submission. An executive will contact you directly on your registered mobile number within the specified response window.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  phone: '',
                  pnr: '',
                  category: 'Billing & Proforma Invoices',
                  priority: 'Normal (48h SLA)',
                  message: ''
                });
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              Submit Another Inquiry
            </button>
            <a
              href="tel:1800227979"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-black uppercase tracking-wider hover:bg-[#07192F] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <PhoneCall size={13} className="text-[#FF9900]" /> Call Priority Desk
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 animate-fade-in space-y-8 font-sans">
      
      {/* 1. Header Banner */}
      <div className="text-center space-y-2">
        <span className="text-[11px] uppercase tracking-wider text-[#1D4ED8] font-black flex items-center justify-center gap-1.5">
          <Headphones size={15} className="text-[#FF9900]" /> 
          Central Concierge & Escalations Desk
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B2545]">
          Guest Support & Inquiry Portal
        </h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
          Log formal queries regarding visa documentation, dietary requirements, booking modifications, GST tax invoices, or on-tour emergency assistance.
        </p>
      </div>

      {/* 2. Commercial SLA Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <span className="text-xs font-black text-slate-900 block">SLA-Backed Response</span>
            <span className="text-[11px] text-slate-500">24 to 48 hour guaranteed resolution</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <PhoneCall size={18} />
          </div>
          <div>
            <span className="text-xs font-black text-slate-900 block">Toll-Free Helpline</span>
            <span className="text-[11px] text-slate-500">1800-22-7979 (8 AM – 8 PM)</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
            <ShieldAlert size={18} className="text-[#FF9900]" />
          </div>
          <div>
            <span className="text-xs font-black text-slate-900 block">On-Trip Escalations</span>
            <span className="text-[11px] text-slate-500">Direct link to tour leaders on duty</span>
          </div>
        </div>
      </div>

      {/* 3. Main Support Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-[#0B2545]">
              Submit Formal Support Ticket
            </h3>
            <span className="text-[11px] text-slate-400">
              Fields marked with an asterisk (*) are mandatory for resolution
            </span>
          </div>
          <span className="bg-blue-50 text-[#1D4ED8] font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
            Official CRM Link
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-slate-700 font-extrabold block">
                Full Legal Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-slate-700 font-extrabold block">
                Registered Contact Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all font-mono font-medium"
              />
            </div>
          </div>

          {/* Row 2: PNR, Department, Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-slate-700 font-extrabold block">
                Booking Reference / PNR
              </label>
              <input
                type="text"
                placeholder="e.g. ABHI-982410"
                value={formData.pnr}
                onChange={(e) => setFormData({ ...formData, pnr: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono font-bold uppercase text-slate-900 focus:outline-none focus:bg-white focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-slate-700 font-extrabold block">
                Inquiry Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all cursor-pointer"
              >
                <option value="Billing & Proforma Invoices">Billing & Proforma Invoices</option>
                <option value="Visa & Passport Documentation">Visa & Passport Documentation</option>
                <option value="Indian Kitchen & Jain Catering">Indian Kitchen & Jain Meals</option>
                <option value="Tour Leader & Coach Operations">Tour Manager & Coach Transit</option>
                <option value="On-Trip Emergency Request">On-Trip Urgent Assistance</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-slate-700 font-extrabold block">
                Priority Level *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all cursor-pointer"
              >
                <option value="Normal (48h SLA)">Standard Request (48h SLA)</option>
                <option value="Urgent (24h SLA)">Urgent Departure (24h SLA)</option>
                <option value="Immediate On-Trip Emergency">Immediate Active-Tour Emergency</option>
              </select>
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-slate-700 font-extrabold block">
              Inquiry Specifics & Brief *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Please provide full details including destination, departure date, or specific requests so our desk can assist efficiently..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all resize-none font-medium leading-relaxed"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-400">
              Official acknowledgement and SMS token will be issued upon dispatch.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <Send size={14} className="stroke-[2.5]" />
              <span>Submit Support Docket</span>
            </button>
          </div>

        </form>
      </div>

      {/* 4. Frequently Asked Questions Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle size={18} className="text-[#1D4ED8]" />
          <div>
            <h3 className="text-base font-black text-[#0B2545]">
              Frequently Asked Inquiries
            </h3>
            <span className="text-[11px] text-slate-400">
              Instant answers regarding operational guidelines and booking protocols
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-3">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#1D4ED8] transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#1D4ED8]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 pl-1 pr-4 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Bottom Helpline Assistance Strip */}
      <div className="bg-[#0B2545] text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
            <PhoneCall size={18} />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 block">
              Urgent Assistance Required?
            </span>
            <p className="text-xs text-slate-300 mt-0.5">
              Call our Central Operations Center directly at <strong className="text-white">1800-22-7979</strong> or connect with our duty managers.
            </p>
          </div>
        </div>

        <a
          href="tel:1800227979"
          className="shrink-0 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#0B2545] text-xs font-extrabold uppercase tracking-wider transition"
        >
          Call Duty Manager
        </a>
      </div>

    </div>
  );
}