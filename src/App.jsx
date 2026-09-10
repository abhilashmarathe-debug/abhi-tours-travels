import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PackageDetailPage from './pages/PackageDetailPage';
import TrackBookingPage from './pages/TrackBookingPage';
import GrievancePage from './pages/GrievancePage';
import BusBookingPage from './pages/BusBookingPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookiePopup from './components/CookiePopup';
import CompareModal from './components/CompareModal';
import PromoOffersAndForex from './components/PromoOffersAndForex';
import TrustStats from './components/TrustStats';
import DeckCarousel from './components/DeckCarousel';
import SmartRecommender from './components/SmartRecommender';
import Loader from './components/Loader';
import { PACKAGES } from './data/mockData';
import { 
  Search, ArrowRight, Globe, ArrowRightLeft, 
  X, MapPin, PhoneCall, Code2
} from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    const handleUrlSync = () => {
      const params = new URLSearchParams(window.location.search);
      const pkgId = params.get('package');
      const pageParam = params.get('page');

      if (pkgId) {
        const found = PACKAGES.find((p) => p.id === pkgId);
        if (found) {
          setSelectedPkg(found);
          setActivePage('detail');
          return;
        }
      }

      if (
        pageParam && 
        ['track', 'grievance', 'bus', 'cookie-policy', 'privacy-policy', 'terms', 'home'].includes(pageParam)
      ) {
        setActivePage(pageParam);
        setSelectedPkg(null);
      } else {
        setActivePage('home');
        setSelectedPkg(null);
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  const navigateTo = (page, pkg = null) => {
    setActivePage(page);
    setSelectedPkg(pkg);

    const url = new URL(window.location.href);

    if (page === 'detail' && pkg) {
      url.searchParams.set('package', pkg.id);
      url.searchParams.delete('page');
    } else if (page !== 'home') {
      url.searchParams.set('page', page);
      url.searchParams.delete('package');
    } else {
      url.searchParams.delete('package');
      url.searchParams.delete('page');
    }

    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackage = (pkg) => {
    navigateTo('detail', pkg);
  };

  const handleBackToCatalog = () => {
    navigateTo('home', null);
  };

  const regions = categoryFilter === 'International'
    ? ['All', 'Europe', 'Middle East', 'Southeast Asia', 'Island Escapes', 'Middle East & Africa']
    : categoryFilter === 'Domestic'
    ? ['All', 'North India', 'South India', 'West India', 'East India', 'Island Escapes']
    : categoryFilter === 'Devotional'
    ? ['All', 'Devotional']
    : ['All', 'Europe', 'Middle East', 'Southeast Asia', 'North India', 'South India', 'West India', 'East India', 'Island Escapes', 'Devotional'];

  const filteredPackages = PACKAGES.filter((p) => {
    const matchCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchRegion = regionFilter === 'All' || p.region === regionFilter;
    const matchSearch = p.title.toLowerCase().includes(query.toLowerCase()) ||
                        p.highlights.some(h => h.toLowerCase().includes(query.toLowerCase())) ||
                        p.region.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchRegion && matchSearch;
  });

  const toggleCompare = (pkg, e) => {
    e.stopPropagation();
    if (compareList.find(item => item.id === pkg.id)) {
      setCompareList(compareList.filter(item => item.id !== pkg.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 packages simultaneously.");
        return;
      }
      setCompareList([...compareList, pkg]);
    }
  };

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#1D4ED8] selection:text-white">
        <Navbar activePage={activePage} setActivePage={(page) => navigateTo(page, null)} />

        {activePage === 'home' && (
          <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full space-y-12">
            <section className="animate-fade-in">
              <DeckCarousel packages={PACKAGES} onSelect={handleSelectPackage} />
            </section>

            <section className="animate-fade-in-up">
              <SmartRecommender packages={PACKAGES} onSelect={handleSelectPackage} />
            </section>

            <section>
              <PromoOffersAndForex />
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search destination, country, or route plan..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium border border-slate-300 bg-slate-50 rounded-xl placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all"
                  />
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 w-full md:w-auto overflow-x-auto no-scrollbar">
                  {['All', 'Domestic', 'International', 'Devotional'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(cat);
                        setRegionFilter('All');
                      }}
                      className={`flex-1 md:flex-none px-4 py-2 text-xs font-black tracking-wider uppercase transition-all rounded-lg cursor-pointer whitespace-nowrap ${
                        categoryFilter === cat
                          ? 'bg-white text-[#0B2545] shadow-xs border border-slate-300'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat === 'Domestic' 
                        ? 'India Tours' 
                        : cat === 'International' 
                        ? 'World Tours' 
                        : cat === 'Devotional'
                        ? 'Teerth Yatra'
                        : 'All Tours'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mr-2 flex items-center gap-1.5">
                  <Globe size={13} className="text-[#1D4ED8]" /> Territory:
                </span>
                {regions.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setRegionFilter(reg)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      regionFilter === reg
                        ? 'bg-[#0B2545] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-3 gap-2">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#1D4ED8] font-black block mb-0.5">
                    100% Escorted Group Itineraries
                  </span>
                  <h3 className="text-2xl font-black text-[#0B2545]">
                    Guaranteed Fixed Departures ({filteredPackages.length} Available)
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  Pure Indian & Jain Kitchen Staff Accompanied
                </span>
              </div>

              {filteredPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPackages.map((pkg) => {
                    const isCompared = compareList.some(item => item.id === pkg.id);
                    const emiMonthly = Math.round(pkg.startingPrice / 12);

                    return (
                      <div
                        key={pkg.id}
                        onClick={() => handleSelectPackage(pkg)}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1D4ED8] transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="h-56 overflow-hidden relative bg-slate-900">
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            <span className="bg-[#0B2545] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded shadow-md tracking-wider">
                              {pkg.category} • {pkg.region}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3 bg-white/95 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded shadow-md">
                            {pkg.duration}
                          </div>

                          <button
                            onClick={(e) => toggleCompare(pkg, e)}
                            className={`absolute bottom-3 left-3 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all rounded-lg cursor-pointer ${
                              isCompared 
                                ? 'bg-[#0B2545] text-white border border-[#0B2545]' 
                                : 'bg-white/95 text-slate-700 border border-slate-300 hover:bg-white shadow-xs'
                            }`}
                          >
                            <ArrowRightLeft size={11} />
                            <span>{isCompared ? 'In Compare List' : 'Compare'}</span>
                          </button>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs mb-1.5">
                              <span className="bg-amber-100 text-amber-950 font-black px-2 py-0.5 rounded text-[11px]">
                                ★ {pkg.rating}
                              </span>
                              <span className="text-slate-400 font-medium">({pkg.reviews} verified reviews)</span>
                            </div>

                            <h4 className="text-base font-extrabold text-[#0B2545] leading-snug group-hover:text-[#1D4ED8] transition-colors line-clamp-2">
                              {pkg.title}
                            </h4>

                            <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                              {pkg.highlights.slice(0, 2).map((item, i) => (
                                <div key={i} className="flex items-start gap-1.5">
                                  <span className="text-[#1D4ED8] font-bold">✓</span>
                                  <span className="truncate">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3.5 border-t border-slate-100 flex items-end justify-between gap-2">
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
                                All-Inclusive From
                              </span>
                              <span className="text-xl font-black text-[#0B2545] font-mono leading-none block mt-0.5">
                                ₹{pkg.startingPrice.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                                GST Included • EMI ₹{emiMonthly.toLocaleString('en-IN')}/mo
                              </span>
                            </div>

                            <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#1D4ED8] font-black group-hover:translate-x-1 transition-transform">
                              View Batches <ArrowRight size={14} className="stroke-[2.5]" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-slate-300 rounded-2xl bg-white space-y-3 shadow-xs">
                  <MapPin size={32} className="text-slate-400 mx-auto" />
                  <h4 className="text-base font-extrabold text-slate-800">No matching itineraries found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try clearing your search keyword or switching your territory filter to inspect other guaranteed departures.
                  </p>
                  <button
                    onClick={() => {
                      setQuery('');
                      setCategoryFilter('All');
                      setRegionFilter('All');
                    }}
                    className="px-5 py-2.5 bg-[#0B2545] text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </section>

            <TrustStats />

            {compareList.length > 0 && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0B2545] text-white rounded-2xl px-6 py-3.5 shadow-2xl flex items-center gap-5 border border-slate-700 animate-fade-in-up">
                <div className="text-xs">
                  <span className="font-black text-[#FF9900]">{compareList.length} of 3</span> Tours Selected
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsCompareOpen(true)}
                    className="px-4 py-2 bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 text-xs font-black uppercase tracking-wider transition-colors rounded-xl cursor-pointer"
                  >
                    Launch Comparison
                  </button>
                  <button
                    onClick={() => setCompareList([])}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Clear compare list"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </main>
        )}

        {/* Page Render Routing */}
        {activePage === 'bus' && <BusBookingPage />}
        {activePage === 'cookie-policy' && <CookiePolicyPage onBack={handleBackToCatalog} />}
        {activePage === 'privacy-policy' && <PrivacyPolicyPage onBack={handleBackToCatalog} />}
        {activePage === 'terms' && <TermsPage onBack={handleBackToCatalog} />}

        {activePage === 'detail' && selectedPkg && (
          <PackageDetailPage 
            pkg={selectedPkg} 
            onBack={handleBackToCatalog} 
            onSelectRelated={handleSelectPackage}
          />
        )}

        {activePage === 'track' && <TrackBookingPage />}
        {activePage === 'grievance' && <GrievancePage />}

        {isCompareOpen && (
          <CompareModal
            packages={compareList}
            onClose={() => setIsCompareOpen(false)}
            onSelect={(pkg) => {
              setIsCompareOpen(false);
              handleSelectPackage(pkg);
            }}
          />
        )}

        {/* Persistent Cookie Consent Popup */}
        <CookiePopup onNavigate={(page) => navigateTo(page)} />

        {/* Commercial Brand Footer */}
        <footer className="border-t border-slate-200 bg-white text-xs text-slate-500 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex flex-col text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1">
                  <span className="font-black tracking-tight text-[#0B2545] text-lg font-mono">ABHI</span>
                  <span className="font-black tracking-tight text-[#FF9900] text-lg font-mono">WORLD</span>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold mt-0.5">
                  Abhi Expeditions Pvt. Ltd. • Ministry of Tourism & IATA Regulated Operator
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 font-bold text-slate-700">
                <button 
                  onClick={() => navigateTo('bus')} 
                  className="hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Abhi Bus Fleet
                </button>
                <button 
                  onClick={() => navigateTo('track')} 
                  className="hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  PNR Status Terminal
                </button>
                <button 
                  onClick={() => navigateTo('grievance')} 
                  className="hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Guest Relations Desk
                </button>
                <a 
                  href="tel:1800227979" 
                  className="hover:text-[#1D4ED8] transition-colors flex items-center gap-1 text-[#0B2545]"
                >
                  <PhoneCall size={13} className="text-[#FF9900]" /> 1800-22-7979
                </a>
              </div>
            </div>

            {/* Bottom Row: Legal Links & SkewX Technologies Attribution */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
              <div className="flex flex-wrap items-center gap-5">
                <button
                  onClick={() => navigateTo('cookie-policy')}
                  className="hover:text-slate-700 transition cursor-pointer"
                >
                  Cookie Policy
                </button>
                <button
                  onClick={() => navigateTo('privacy-policy')}
                  className="hover:text-slate-700 transition cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-slate-700 transition cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </div>

              {/* Developer Attribution */}
              <div className="flex items-center gap-1.5 font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Code2 size={13} className="text-[#1D4ED8]" />
                <span>Developed by</span>
                <span className="font-extrabold text-[#0B2545]">SkewX Technologies</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}