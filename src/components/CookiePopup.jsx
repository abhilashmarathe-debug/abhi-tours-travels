import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export default function CookiePopup({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('abhi_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('abhi_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('abhi_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-fade-in-up">
      <div className="bg-[#0B2545]/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF9900]/20 text-[#FF9900] flex items-center justify-center shrink-0">
              <Cookie size={18} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-100">
              Cookie & Data Consent
            </h4>
          </div>
          <button
            type="button"
            onClick={handleDecline}
            className="text-slate-400 hover:text-white p-1 rounded-md transition cursor-pointer"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          We use operational cookies to maintain your active tour carts, bus berth holds, PNR tracking, and analytics. View our{' '}
          <button
            type="button"
            onClick={() => onNavigate('cookie-policy')}
            className="text-[#FF9900] underline font-bold cursor-pointer hover:text-amber-300"
          >
            Cookie Policy
          </button>{' '}
          and{' '}
          <button
            type="button"
            onClick={() => onNavigate('privacy-policy')}
            className="text-[#FF9900] underline font-bold cursor-pointer hover:text-amber-300"
          >
            Privacy Policy
          </button>.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 py-2 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition shadow-sm cursor-pointer"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="px-4 py-2 border border-slate-600 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}