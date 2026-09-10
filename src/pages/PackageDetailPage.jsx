import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, Check, CheckCircle2, Shield, Calendar, Users, 
  Utensils, Hotel, Bus, FileText, PhoneCall, MessageCircle, 
  Plane, Clock, Download, Sparkles, AlertCircle, Award, 
  ChevronRight, ChevronLeft, Share2, Heart, Camera, Eye, X, 
  MapPin, Copy, ExternalLink, Send, Mail, ArrowUpRight
} from 'lucide-react';
import DestinationAdvisory from '../components/DestinationAdvisory';
import InvoiceModal from '../components/InvoiceModal';
import { PACKAGES } from '../data/mockData';

const DESTINATION_STORIES = {
  "Europe": {
    heritage: "Central Europe merges centuries of imperial architecture with high alpine panoramas. From the engineering brilliance of the Eiffel Tower to high-altitude cogwheel railways ascending the glaciated Jungfrau, this route represents the crown jewel of escorted continental travel.",
    routeMap: "Paris (3N) → Central Switzerland / Lucerne (3N) → Zurich (3N)",
    gallery: [
      { url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80", caption: "Cinque Terre Coastal Cliffs" },
      { url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80", caption: "Swiss Alpine Cogwheel Route" },
      { url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80", caption: "Pont Alexandre III & Seine Waters" },
      { url: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80", caption: "Lucerne Covered Wooden Bridge" }
    ]
  },
  "Middle East": {
    heritage: "From traditional dhow trade routes and historic souks to world-record architectural marvels. Experience desert dune camps alongside cultural touchstones like the Sheikh Zayed Grand Mosque and Louvre Abu Dhabi.",
    routeMap: "Dubai (3N) → Abu Dhabi (1N) → Desert Oasis (1N)",
    gallery: [
      { url: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80", caption: "Sheikh Zayed Grand Mosque Marble Courtyard" },
      { url: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80", caption: "Golden Sunset over Arabian Sand Dunes" },
      { url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80", caption: "Louvre Abu Dhabi Floating Dome" },
      { url: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80", caption: "Traditional Wooden Abra on Dubai Creek" }
    ]
  },
  "Southeast Asia": {
    heritage: "A blend of sacred monastic traditions, vibrant night bazaars, and emerald sea karsts. Features authentic Indian culinary arrangements while touring iconic landmarks like Wat Pho, Bangkok Grand Palace, and Phi Phi Island.",
    routeMap: "Phuket (3N) → Bangkok (2N)",
    gallery: [
      { url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80", caption: "Phuket Limestone Karst Archipelago" },
      { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", caption: "Halong Bay Emerald Waters at Dawn" },
      { url: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=800&q=80", caption: "Ancient Angkor Wat Reflections" },
      { url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80", caption: "Bangkok Wat Arun Porcelain Mosaic" }
    ]
  },
  "Island Escapes": {
    heritage: "Pure turquoise atolls, pristine marine reserves, and overwater luxury. Designed for travelers seeking transparent lagoons, house reef snorkeling, and calm island living with dedicated ground coordinators.",
    routeMap: "Malé Airport → Private Island Resort (3N) / Agatti (4N)",
    gallery: [
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", caption: "Coral Lagoon Sandbars" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", caption: "Overwater Villa Boardwalk" },
      { url: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80", caption: "Havelock Island Coastal Fringe" },
      { url: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80", caption: "Agatti Island Pristine Atoll Runway" }
    ]
  },
  "North India": {
    heritage: "Mughal pleasure gardens, pine-scented valleys, and high Himalayan passes. Combines private Shikara rides on Dal Lake with Phase 1 Gondola access in Gulmarg and Kashmiri handicraft trails.",
    routeMap: "Srinagar (1N Houseboat + 2N Hotel) → Gulmarg (1N) → Pahalgam (2N)",
    gallery: [
      { url: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80", caption: "Dal Lake Lotus Gardens & Wooden Shikaras" },
      { url: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80", caption: "Snow-Capped Peaks of Gulmarg" },
      { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", caption: "Solang Valley Alpine Meadows" },
      { url: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80", caption: "Pahalgam Lidder River Banks" }
    ]
  },
  "South India": {
    heritage: "Ancient temple architecture, post-monsoon spice plantations, and historic backwater canals. Enjoy freshly prepared Indian culinary meals while cruising through Alleppey on private houseboats.",
    routeMap: "Cochin (1N) → Munnar (2N) → Thekkady (1N) → Alleppey (1N Houseboat)",
    gallery: [
      { url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", caption: "Munnar Rolling Emerald Tea Estates" },
      { url: "https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=800&q=80", caption: "Charminar Archways at Twilight" },
      { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80", caption: "Serene Alleppey Houseboat Waters" },
      { url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80", caption: "Dravidian Temple Sculptures" }
    ]
  },
  "West India": {
    heritage: "Fortified desert citadels, regal lake palaces, and colorful folk markets. Fully escorted with authentic Rajasthani dinners, palace entries, and evening cultural village experiences.",
    routeMap: "Jaipur (2N) → Jodhpur (2N) → Udaipur (2N)",
    gallery: [
      { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80", caption: "Jaipur Amber Fort Sandstone Ramparts" },
      { url: "https://images.unsplash.com/photo-1585139045762-b918f78f8705?auto=format&fit=crop&w=800&q=80", caption: "Udaipur Lake Palace on Pichola" },
      { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", caption: "Portuguese Balconies of Old Goa" },
      { url: "https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=800&q=80", caption: "Mehrangarh Fort Jodhpur Skyline" }
    ]
  },
  "East India": {
    heritage: "From the snow-crowned crest of Kanchenjunga to the mist-draped living root bridges of Meghalaya and the sacred coastal stones of Puri Jagannath. East and North-East India brings together Tibetan Buddhist monasteries, tea garden dynasties, one-horned rhino sanctuaries, and ancient Kalinga architecture.",
    routeMap: "Gangtok (3N) → Darjeeling (2N) / Guwahati (1N) → Kaziranga (2N) → Shillong (3N)",
    gallery: [
      { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80", caption: "Mount Kanchenjunga Over Darjeeling Tea Gardens" },
      { url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80", caption: "Meghalaya Living Root Bridge & Crystal Rivers" },
      { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80", caption: "Konark Sun Temple Carved Chariot Wheels" },
      { url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80", caption: "Tsomgo Glacial Lake at 12,400 ft Altitude" }
    ]
  }
};

export default function PackageDetailPage({ pkg, onBack, onSelectRelated }) {
  const [selectedDeparture, setSelectedDeparture] = useState(pkg.departures[0]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState('dates');
  const [invoiceData, setInvoiceData] = useState(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Reset states on package change
  useEffect(() => {
    setSelectedDeparture(pkg.departures[0]);
    setActiveTab('dates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pkg]);

  const story = DESTINATION_STORIES[pkg.region] || DESTINATION_STORIES["Europe"];
  const tourCode = `ABHI-${pkg.region.slice(0, 3).toUpperCase()}-${pkg.id.slice(-2)}`;
  const gallery = story.gallery;

  const months = ['All', 'Sep 2026', 'Oct 2026', 'Nov 2026'];

  const filteredDepartures = selectedMonth === 'All'
    ? pkg.departures
    : pkg.departures.filter(d => {
        if (selectedMonth === 'Sep 2026') return d.date.includes('-09-');
        if (selectedMonth === 'Oct 2026') return d.date.includes('-10-');
        if (selectedMonth === 'Nov 2026') return d.date.includes('-11-');
        return true;
      });

  const subtotal = (selectedDeparture.price * adults) + (selectedDeparture.price * 0.75 * children);
  const tokenAmount = Math.round(subtotal * 0.2);
  const emiEstimate = Math.round(selectedDeparture.price / 12);

  const handleConfirmReservation = () => {
    const generatedId = "ABHI-" + Math.floor(100000 + Math.random() * 900000);
    setInvoiceData({
      pkg,
      departure: selectedDeparture,
      adults,
      children,
      referenceId: generatedId
    });
  };

  // Lightbox navigation
  const handleNextPhoto = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveLightboxIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const handlePrevPhoto = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'Escape') setActiveLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleNextPhoto, handlePrevPhoto]);

  // Social Sharing Setup
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `Explore ${pkg.title} (${pkg.duration}) with Abhi Expeditions`;
  const shareMessage = `Check out this verified escorted group holiday to ${pkg.title}! Starting at ₹${pkg.startingPrice.toLocaleString('en-IN')}: ${currentUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const socialChannels = [
    {
      name: 'WhatsApp',
      color: 'bg-[#25D366] hover:bg-[#1EBE5D] text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.693.072-2.12-.524-1.615-.674-2.658-2.316-2.738-2.423-.08-.107-.648-.863-.648-1.646 0-.783.411-1.17.558-1.328.146-.158.32-.198.427-.198.106 0 .213.001.306.006.098.005.23-.037.36.275.133.32.453 1.107.493 1.187.04.08.067.173.013.28-.053.107-.08.173-.16.267-.08.093-.167.208-.239.28-.08.08-.163.167-.07.327.093.16.413.682.886 1.103.609.542 1.123.71 1.282.79.16.08.254.067.347-.04.094-.107.4-.467.507-.627.107-.16.213-.133.36-.08.147.053.933.44 1.093.52.16.08.267.12.307.187.04.067.04.387-.104.792z"/>
        </svg>
      ),
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`
    },
    {
      name: 'Facebook',
      color: 'bg-[#1877F2] hover:bg-[#166FE5] text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'X (Twitter)',
      color: 'bg-black hover:bg-slate-900 text-white',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Messenger',
      color: 'bg-[#00B2FF] hover:bg-[#009FE5] text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.1.305 2.26.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.963z"/>
        </svg>
      ),
      link: `fb-messenger://share/?link=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Instagram Web',
      color: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      link: `https://www.instagram.com/`
    },
    {
      name: 'Email Counselors',
      color: 'bg-slate-700 hover:bg-slate-800 text-white',
      icon: <Mail size={18} />,
      link: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareMessage)}`
    }
  ];

  // Dynamic Related Packages Engine (Matching region or category, excluding current package)
  const relatedPackages = PACKAGES
    .filter(p => p.id !== pkg.id && (p.region === pkg.region || p.category === pkg.category))
    .slice(0, 3);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 font-sans">

      {/* 1. Sticky Commercial Action Header Bar with Single Share Action */}
      <div className="bg-white border-b border-slate-200 py-3 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1D4ED8] hover:text-[#0B2545] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Holiday Catalog
          </button>

          <div className="flex items-center gap-3">
            {/* The ONLY Share Tour Button with Multi-Channel Popup */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-amber-50 hover:border-amber-400 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Share2 size={13} className="text-[#1D4ED8]" />
              <span>Share Tour</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isWishlisted 
                  ? 'bg-rose-50 border-rose-300 text-rose-600' 
                  : 'bg-slate-50 border-slate-300 text-slate-500 hover:text-rose-500'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart size={16} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />
            </button>

            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono text-slate-500 font-semibold">Tour Code: <strong className="text-slate-800">{tourCode}</strong></span>
              <span>•</span>
              <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                Guaranteed Departures
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">

        {/* 2. Kesari/Veena-Style Header Banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#0B2545] text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider">
                {pkg.category} Group Tour
              </span>
              <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded">
                ★ {pkg.rating} ({pkg.reviews} Verified Reviews)
              </span>
              <span className="text-xs text-slate-300">|</span>
              <span className="text-xs font-bold text-slate-700">{pkg.duration}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] leading-tight">
              {pkg.title}
            </h1>

            {/* City Hop Routing Chain */}
            <div className="flex items-center gap-2 text-xs text-slate-600 pt-1 font-semibold">
              <MapPin size={15} className="text-[#1D4ED8] shrink-0" />
              <span>Route Plan:</span>
              <span className="text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded font-mono text-[11px]">
                {story.routeMap}
              </span>
            </div>
          </div>

          {/* Quick Header Price Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-right shrink-0 md:min-w-[220px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Starting Price / Person</span>
            <div className="text-2xl font-black text-[#0B2545]">
              ₹{pkg.startingPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
              All Meals & 5% GST Included
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
              EMI options from ₹{emiEstimate.toLocaleString('en-IN')}/mo
            </span>
          </div>
        </div>

        {/* 3. 4-Pill Signature Advantage Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Utensils size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Pure Indian Kitchen</span>
              <span className="text-[11px] text-slate-500">Jain meals guaranteed on-trip</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Dedicated Tour Manager</span>
              <span className="text-[11px] text-slate-500">English & Hindi escort 24/7</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <Hotel size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">4-Star Rated Hotels</span>
              <span className="text-[11px] text-slate-500">Verified twin-sharing comfort</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <Plane size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Return Airfare Support</span>
              <span className="text-[11px] text-slate-500">Baggage & visa assistance</span>
            </div>
          </div>
        </div>

        {/* 4. Main Two-Column Booking Engine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column (Photos, Itinerary, Inclusions, Heritage) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Visual Hero Banner */}
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#FF9900] text-slate-950 font-black text-[10px] px-3 py-1 rounded shadow-md uppercase tracking-wider">
                  All-Inclusive Escorted Package
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 text-slate-900 text-xs px-3 py-1.5 rounded-lg shadow-md font-bold flex items-center gap-1.5">
                <Camera size={14} className="text-[#1D4ED8]" />
                <span>{gallery.length} Curated Field Sights</span>
              </div>
            </div>

            {/* Photo Highlights Strip */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Camera size={16} className="text-[#1D4ED8]" /> Sightseeing Highlights Included In Itinerary
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">Click any photo to browse gallery</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {gallery.map((photo, i) => (
                  <div 
                    key={i}
                    onClick={() => setActiveLightboxIndex(i)}
                    className="group relative h-24 rounded-lg overflow-hidden border border-slate-200 cursor-pointer shadow-xs hover:border-[#1D4ED8] transition-all"
                  >
                    <img 
                      src={photo.url} 
                      alt={photo.caption} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye size={16} className="text-white" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-[9px] p-1 truncate text-center font-semibold">
                      {photo.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advisory Strip */}
            <DestinationAdvisory region={pkg.region} category={pkg.category} />

            {/* Segmented Tabs (Dates, Itinerary, Inclusions, Heritage) */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
              <div className="border-b border-slate-200 flex flex-wrap gap-6 text-sm font-bold">
                <button
                  onClick={() => setActiveTab('dates')}
                  className={`pb-3 transition-colors relative cursor-pointer ${
                    activeTab === 'dates' 
                      ? 'text-[#1D4ED8] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#1D4ED8]' 
                      : 'text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Departure Dates & Seats
                </button>
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`pb-3 transition-colors relative cursor-pointer ${
                    activeTab === 'itinerary' 
                      ? 'text-[#1D4ED8] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#1D4ED8]' 
                      : 'text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Day-Wise Itinerary
                </button>
                <button
                  onClick={() => setActiveTab('inclusions')}
                  className={`pb-3 transition-colors relative cursor-pointer ${
                    activeTab === 'inclusions' 
                      ? 'text-[#1D4ED8] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#1D4ED8]' 
                      : 'text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Inclusions & Exclusions
                </button>
                <button
                  onClick={() => setActiveTab('heritage')}
                  className={`pb-3 transition-colors relative cursor-pointer ${
                    activeTab === 'heritage' 
                      ? 'text-[#1D4ED8] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#1D4ED8]' 
                      : 'text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Destination Highlights
                </button>
              </div>

              {/* TAB 1: Departure Dates Grid Matrix */}
              {activeTab === 'dates' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filter Departure Month</span>
                    <div className="flex gap-1.5">
                      {months.map((m) => (
                        <button
                          key={m}
                          onClick={() => setSelectedMonth(m)}
                          className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                            selectedMonth === m
                              ? 'bg-[#0B2545] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredDepartures.map((dep) => {
                      const isSelected = selectedDeparture?.date === dep.date;
                      return (
                        <div
                          key={dep.date}
                          onClick={() => dep.status !== 'Waitlist' && setSelectedDeparture(dep)}
                          className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected 
                              ? 'border-[#1D4ED8] bg-blue-50/40 ring-2 ring-[#1D4ED8]' 
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          } ${dep.status === 'Waitlist' ? 'opacity-40 cursor-not-allowed bg-slate-50' : ''}`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                              <Calendar size={15} className="text-[#1D4ED8]" />
                              <span>{dep.date}</span>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                              dep.status === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                              dep.status === 'Filling Fast' ? 'bg-amber-100 text-amber-900' : 
                              'bg-slate-200 text-slate-600'
                            }`}>
                              {dep.status}
                            </span>
                          </div>

                          <div className="flex justify-between items-end border-t border-slate-100 pt-3 mt-1">
                            <span className="text-[11px] font-semibold text-slate-500">{dep.seatsLeft} seats remaining</span>
                            <div className="text-right">
                              <span className="font-extrabold text-base text-[#0B2545]">₹{dep.price.toLocaleString('en-IN')}</span>
                              <span className="text-[10px] text-slate-400 block font-normal">/ adult</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#1D4ED8] text-white font-black text-[10px] px-2 py-0.5 rounded">
                          DAY {String(day.day).padStart(2, '0')}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{day.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-1">{day.desc}</p>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                        <span className="flex items-center gap-1 text-slate-700 font-medium">
                          <Utensils size={12} className="text-emerald-600" /> Breakfast & Indian Dinner Included
                        </span>
                        <span className="flex items-center gap-1 text-slate-700 font-medium">
                          <Hotel size={12} className="text-slate-500" /> 4-Star Accommodations
                        </span>
                        <span className="flex items-center gap-1 text-slate-700 font-medium">
                          <Bus size={12} className="text-slate-500" /> Luxury AC Coach
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: Inclusions / Exclusions */}
              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl border border-slate-200 bg-emerald-50/20 space-y-3">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block">
                      ✓ Tour Price Includes
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                          <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl border border-slate-200 bg-red-50/20 space-y-3">
                    <span className="text-xs font-black uppercase tracking-wider text-red-800 block">
                      ✕ Tour Price Excludes
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                          <span className="text-red-500 font-bold shrink-0">✕</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: Destination Heritage */}
              {activeTab === 'heritage' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {story.heritage}
                  </p>
                  <div className="bg-amber-50 border-l-4 border-[#FF9900] p-4 rounded-r-xl">
                    <span className="text-xs font-black text-amber-900 uppercase block mb-1">
                      Why Travel With Abhi World?
                    </span>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Every group departure features trained Indian tour leaders, accompanying kitchen specialists for vegetarian and Jain dietary needs, and centrally located hotels to ensure maximum sightseeing time.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Sticky Commercial Booking Console */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">

            {/* Primary Booking Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md space-y-5">

              {/* Batch & Status Summary */}
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Selected Batch Date</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-lg font-extrabold text-[#0B2545]">{selectedDeparture.date}</span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                    Seats Available
                  </span>
                </div>
                <span className="text-xs text-slate-500 block mt-0.5">
                  ₹{selectedDeparture.price.toLocaleString('en-IN')} / adult (Twin Sharing)
                </span>
              </div>

              {/* Passenger Occupancy Selectors */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Adults (12+ yrs)</span>
                    <span className="text-[10px] text-slate-400">Twin Sharing Room</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-7 h-7 rounded border border-slate-300 bg-white font-bold text-xs hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
                    >-</button>
                    <span className="text-xs font-bold w-4 text-center">{adults}</span>
                    <button
                      onClick={() => setAdults(adults + 1)}
                      className="w-7 h-7 rounded border border-slate-300 bg-white font-bold text-xs hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
                    >+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Child (2 - 11 yrs)</span>
                    <span className="text-[10px] text-slate-400">Extra Bed (75% Fare)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-7 h-7 rounded border border-slate-300 bg-white font-bold text-xs hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
                    >-</button>
                    <span className="text-xs font-bold w-4 text-center">{children}</span>
                    <button
                      onClick={() => setChildren(children + 1)}
                      className="w-7 h-7 rounded border border-slate-300 bg-white font-bold text-xs hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs border-t border-slate-100 pt-4 text-slate-600">
                <div className="flex justify-between">
                  <span>Total Calculated Fare:</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Integrated GST (5%):</span>
                  <span className="text-emerald-700 font-bold">Included</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 font-extrabold text-sm text-[#0B2545]">
                  <span>Pay Token to Lock Seat (20%):</span>
                  <span className="text-[#1D4ED8]">₹{tokenAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* High-Contrast Orange Action CTA */}
              <button
                onClick={handleConfirmReservation}
                className="w-full py-3.5 rounded-lg bg-[#FF9900] hover:bg-[#E68A00] text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Hold Seat & Get Proforma Voucher</span>
              </button>

              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                <Shield size={13} className="text-emerald-600" />
                <span>Zero convenience fee on booking deposit</span>
              </div>

            </div>

            {/* Quick Assistance Card */}
            <div className="bg-[#0B2545] text-white rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <PhoneCall size={16} className="text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-wider">Expert Tour Counselor</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Have questions regarding visa requirements, Jain kitchen arrangements, or customized flight add-ons?
              </p>
              <div className="pt-1 flex gap-2">
                <button
                  onClick={() => alert("Calling hotline: 1800-22-7979")}
                  className="flex-1 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition text-center cursor-pointer"
                >
                  Call 1800-22-7979
                </button>
                <button
                  onClick={() => alert("Connecting to WhatsApp Counselor desk...")}
                  className="flex-1 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition text-center cursor-pointer"
                >
                  WhatsApp Desk
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 5. NEW: RELATED PACKAGE SUGGESTIONS (Bottom Carousel / Grid)              */}
        {/* ========================================================================= */}
        {relatedPackages.length > 0 && (
          <section className="pt-8 border-t border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1D4ED8] block">
                  Compare Similar Escorted Tours
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B2545]">
                  You May Also Like in {pkg.region}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Fixed departures with guaranteed allocations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPackages.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated ? onSelectRelated(rel) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-lg hover:border-[#1D4ED8] transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img 
                      src={rel.image} 
                      alt={rel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95" 
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#0B2545] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      {rel.category} • {rel.region}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {rel.duration}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] mb-1">
                        <span className="bg-amber-100 text-amber-950 font-bold px-1.5 py-0.2 rounded text-[10px]">
                          ★ {rel.rating}
                        </span>
                        <span className="text-slate-400">({rel.reviews} reviews)</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-[#0B2545] leading-snug group-hover:text-[#1D4ED8] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Starting From</span>
                        <span className="text-base font-black text-[#0B2545] font-mono block mt-0.5">
                          ₹{rel.startingPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-black uppercase text-[#1D4ED8] group-hover:translate-x-1 transition-transform">
                        Explore <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 6. MULTI-CHANNEL SOCIAL SHARE MODAL                                      */}
      {/* ========================================================================= */}
      {isShareModalOpen && (
        <div 
          onClick={() => setIsShareModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-scale-up"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-bold">
                  <Share2 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0B2545]">Share Holiday Itinerary</h3>
                  <span className="text-[11px] text-slate-400">Share verified batch details with friends & family</span>
                </div>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tour Mini Preview */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                className="w-14 h-14 rounded-lg object-cover shrink-0" 
              />
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase text-[#1D4ED8] block">
                  {pkg.duration} • {pkg.category}
                </span>
                <h4 className="text-xs font-extrabold text-slate-900 truncate">
                  {pkg.title}
                </h4>
                <span className="text-xs font-black text-[#0B2545] font-mono">
                  Starting at ₹{pkg.startingPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Social Grid Icons */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">
                Share Via Social Channels
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {socialChannels.map((channel, i) => (
                  <a
                    key={i}
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 shadow-xs hover:scale-105 cursor-pointer ${channel.color}`}
                  >
                    <div className="mb-1">{channel.icon}</div>
                    <span className="text-[11px] font-bold text-center leading-tight">
                      {channel.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Copy Link Bar */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">
                Or Copy Direct URL
              </span>
              <div className="flex items-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-xl">
                <input 
                  type="text" 
                  readOnly 
                  value={currentUrl} 
                  className="flex-1 bg-transparent text-xs text-slate-600 px-2 focus:outline-none truncate font-mono select-all" 
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    copiedLink 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-[#0B2545] hover:bg-[#07192F] text-white shadow-xs'
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check size={13} className="stroke-[3]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. INTERACTIVE LIGHTBOX CAROUSEL                                         */}
      {/* ========================================================================= */}
      {activeLightboxIndex !== null && gallery[activeLightboxIndex] && (
        <div 
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
          >
            {/* Top Toolbar (Counter, Title, Close) */}
            <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-3">
                <span className="bg-[#1D4ED8] text-white text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                  {activeLightboxIndex + 1} / {gallery.length}
                </span>
                <span className="text-xs font-semibold text-slate-300 truncate max-w-xs sm:max-w-md">
                  {gallery[activeLightboxIndex].caption}
                </span>
              </div>
              <button 
                onClick={() => setActiveLightboxIndex(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* Center Stage with Previous & Next Chevrons */}
            <div className="relative flex items-center justify-center min-h-[45vh] max-h-[65vh] bg-black overflow-hidden group">
              <img 
                src={gallery[activeLightboxIndex].url} 
                alt={gallery[activeLightboxIndex].caption} 
                className="w-full h-full max-h-[65vh] object-contain mx-auto" 
              />

              {/* Prev Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                aria-label="Previous Photo"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                aria-label="Next Photo"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Bottom Quick-Jump Filmstrip Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
              {gallery.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeLightboxIndex === idx 
                      ? 'border-[#FF9900] scale-105 shadow-md ring-1 ring-[#FF9900]' 
                      : 'border-slate-700 opacity-50 hover:opacity-100'
                  }`}
                  aria-label={`Jump to photo ${idx + 1}`}
                >
                  <img 
                    src={thumb.url} 
                    alt={thumb.caption} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceData && (
        <InvoiceModal
          bookingData={invoiceData}
          onClose={() => setInvoiceData(null)}
        />
      )}
    </div>
  );
}