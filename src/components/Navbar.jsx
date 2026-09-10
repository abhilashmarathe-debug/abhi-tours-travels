import React, { useState } from 'react';
import { Compass, Headphones, FileText, Bus, User, X, ArrowRight, Menu } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authForm, setAuthForm] = useState({ name: '', phone: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { id: 'home', label: 'Holiday Portfolios', icon: Compass },
    { id: 'bus', label: 'Abhi Bus', icon: Bus },
    { id: 'track', label: 'PNR Terminal', icon: FileText },
    { id: 'grievance', label: 'Guest Support', icon: Headphones },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthForm({ name: '', phone: '', password: '' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Executive Brand Crest */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0B2545] via-[#133A6B] to-[#1D4ED8] p-0.5 shadow-md group-hover:shadow-lg transition-all duration-300">
              <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-[#0B2545] to-[#07192F] flex items-center justify-center relative overflow-hidden border border-white/15">
                <div className="absolute w-8 h-8 rounded-full bg-blue-400/20 blur-sm pointer-events-none" />

                {/* Aviation Crest SVG */}
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 sm:w-7 sm:h-7 transform group-hover:scale-110 transition-transform duration-300"
                >
                  <defs>
                    <linearGradient id="planeGrad" x1="16" y1="36" x2="36" y2="12" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#F8FAFC" />
                      <stop offset="100%" stopColor="#E2E8F0" />
                    </linearGradient>
                    <linearGradient id="goldArc" x1="8" y1="40" x2="40" y2="8" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF9900" />
                      <stop offset="100%" stopColor="#FFD000" />
                    </linearGradient>
                  </defs>

                  <ellipse cx="24" cy="24" rx="17" ry="6.5" transform="rotate(-30 24 24)" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.45" />
                  <path d="M10 32C15 39 33 41 40 25" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
                  <path d="M11 37C17 33 22 27 27 21" stroke="url(#goldArc)" strokeWidth="2.2" strokeLinecap="round" />
                  <path
                    d="M37.5 10.5C36.8 9.8 35.5 10.2 34.2 11.5L25.8 19.9L16.2 17.2C15.2 16.9 14.5 17.5 14.9 18.3L19.5 24.2L16.2 27.5L13.1 26.8C12.4 26.6 11.9 27.1 12.2 27.7L14.8 31.4L18.5 34C19.1 34.3 19.6 33.8 19.4 33.1L18.7 30L22 26.7L27.9 31.3C28.7 31.7 29.3 31 29 30L26.3 20.4L34.7 12C36 10.7 38.2 11.2 37.5 10.5Z"
                    fill="url(#planeGrad)"
                  />
                  <path d="M37.5 10.5L19.5 28.5L16.2 27.5L34.7 12L37.5 10.5Z" fill="#94A3B8" opacity="0.6" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#0B2545] leading-none font-mono">
                  ABHI
                </span>
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#FF9900] leading-none font-mono">
                  WORLD
                </span>
              </div>
              <span className="text-[8px] sm:text-[8.5px] uppercase font-extrabold text-slate-400 tracking-[0.2em] mt-0.5">
                Escorted Luxury Tours
              </span>
            </div>
          </div>

          {/* Desktop Navigation Controller */}
          <nav className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0B2545] shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-[#1D4ED8]' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Auth & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center text-[10px] font-black">
                    {authForm.name ? authForm.name.charAt(0).toUpperCase() : 'G'}
                  </div>
                  <span className="truncate max-w-[85px] sm:max-w-[110px]">{authForm.name || 'Guest'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[11px] font-bold text-slate-500 hover:text-rose-600 px-1.5 py-1 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#0B2545] hover:bg-[#07192F] text-white text-xs font-black uppercase tracking-wider transition shadow-sm cursor-pointer active:scale-95"
              >
                <User size={13} className="text-[#FF9900]" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg animate-fade-in space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#0B2545] font-black border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? 'text-[#1D4ED8]' : 'text-slate-400'} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div 
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in font-sans"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-[#0B2545]">
                  {authMode === 'login' ? 'Traveler Login' : 'Create Guest Account'}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {authMode === 'login' 
                    ? 'Access your bookings & itineraries' 
                    : 'Unlock exclusive festive travel vouchers'}
                </span>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`py-1.5 rounded-lg transition cursor-pointer ${
                  authMode === 'login' 
                    ? 'bg-white text-[#0B2545] shadow-xs' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`py-1.5 rounded-lg transition cursor-pointer ${
                  authMode === 'signup' 
                    ? 'bg-white text-[#0B2545] shadow-xs' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
              {authMode === 'signup' && (
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kulkarni"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#1D4ED8]"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Mobile Number / Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={authForm.phone}
                  onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#1D4ED8]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Password
                  </label>
                  {authMode === 'login' && (
                    <span 
                      onClick={() => alert("OTP login requested. Please use demo submit.")} 
                      className="text-[10px] font-bold text-[#1D4ED8] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#1D4ED8]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}