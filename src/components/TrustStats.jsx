import React, { useState, useEffect, useRef } from 'react';
import { Award, CalendarCheck, Users, Compass, ShieldCheck } from 'lucide-react';

function Counter({ targetValue, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  // Extract number from strings like "35+", "50,000+", "100%"
  const numericTarget = parseInt(targetValue.replace(/[^0-9]/g, ''), 10);
  const suffix = targetValue.replace(/[0-9,]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease-out cubic calculation
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * numericTarget));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(numericTarget);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [numericTarget, duration]);

  return (
    <span ref={counterRef} className="font-mono">
      {count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export default function TrustStats() {
  const stats = [
    { 
      label: "Years of Heritage", 
      value: "35+", 
      desc: "Dedicated escorted tour leadership since 1991",
      icon: Award
    },
    { 
      label: "Fixed Departures", 
      value: "400+", 
      desc: "Guaranteed seasonal & festive seat quotas",
      icon: CalendarCheck
    },
    { 
      label: "Verified Travelers", 
      value: "50,000+", 
      desc: "Delighted families, couples & group guests",
      icon: Users
    },
    { 
      label: "Tour Leadership", 
      value: "100%", 
      desc: "Multilingual Indian escorts & kitchen-car staff",
      icon: Compass
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-2 mb-8 text-center">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span className="text-xs uppercase tracking-widest font-black text-[#1D4ED8]">
            Uncompromising Escort Standards & Proven Track Record
          </span>
        </div>

        {/* 4-Column Commercial Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div 
                key={i} 
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-xs hover:shadow-md hover:border-[#1D4ED8] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Counter & Icon Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl sm:text-4xl font-black text-[#0B2545] leading-none">
                    <Counter targetValue={s.value} />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#1D4ED8] group-hover:bg-[#0B2545] group-hover:text-amber-300 group-hover:border-[#0B2545] transition-colors shadow-2xs">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Metric Descriptions */}
                <div className="space-y-1 border-t border-slate-200 pt-3">
                  <div className="text-xs uppercase tracking-wider font-extrabold text-slate-800">
                    {s.label}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}