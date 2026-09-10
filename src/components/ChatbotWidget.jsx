import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Compass, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Abhi Expeditions Concierge. How may we assist with your upcoming journey?',
      options: ['Popular Departures', 'Visa & Lead Times', 'Booking Reference PNR', 'Indian Kitchen & Meals']
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, isTyping, open]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "Thank you for reaching out. A senior journey specialist has received your inquiry and will follow up shortly.";
      let newOptions = ['View Tour Catalog', 'Hold Seats & Dates'];

      const lower = query.toLowerCase();

      if (lower.includes('booking') || lower.includes('status') || lower.includes('pnr')) {
        botReply = "Please navigate to our 'PNR Terminal' from the top menu or provide your 6-digit reference (e.g., ABHI-XXXXXX) to view verified seat allocations.";
        newOptions = ['Go to PNR Terminal', 'Check Departure Date'];
      } else if (lower.includes('visa') || lower.includes('lead time')) {
        botReply = "Schengen visa processing requires 15–20 working days. Middle East E-Visas (Dubai, Abu Dhabi, Baku) process in 3–5 working days, while Thailand and Maldives offer on-arrival entry for Indian passport holders.";
        newOptions = ['Europe Departures', 'Dubai & Abu Dhabi', 'Baku (Azerbaijan)'];
      } else if (lower.includes('kitchen') || lower.includes('meal') || lower.includes('jain') || lower.includes('food')) {
        botReply = "All international and domestic group departures feature dedicated pure Indian kitchen arrangements with guaranteed Jain and vegetarian dining options prepared by our accompanying kitchen staff.";
        newOptions = ['Explore Packages', 'Contact Desk'];
      } else if (lower.includes('package') || lower.includes('departure') || lower.includes('popular') || lower.includes('tour')) {
        botReply = "Our highlighted escorted batches for 2026 include Italian Renaissance, Swiss Alpine Wonders, Baku (Azerbaijan), Kashmir Houseboats, and Untouched Lakshadweep. Which destination interests you?";
        newOptions = ['Italy & Europe', 'Baku (Azerbaijan)', 'Kashmir & Himalayas', 'Lakshadweep Islands'];
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply, options: newOptions }]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-3.5 rounded-full shadow-xl flex items-center gap-2.5 border border-stone-700 transition-all transform hover:-translate-y-0.5 active:scale-95"
        >
          <div className="relative">
            <Compass size={18} className="text-amber-300 animate-spin-slow" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase pr-0.5">Expedition Desk</span>
        </button>
      )}

      {/* Expanded Concierge Drawer */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-stone-300 w-80 sm:w-96 flex flex-col h-[520px] overflow-hidden animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-stone-900 text-white p-4 flex justify-between items-center border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-300">
                <Compass size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wider uppercase text-white">Abhi Concierge</h4>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Tour Advisory
                </span>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF9F6] text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-stone-900 text-white rounded-br-xs shadow-xs font-sans text-xs'
                      : 'bg-white border border-stone-300 text-stone-800 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>

                {/* Interactive Triage Options */}
                {m.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {m.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(opt)}
                        className="bg-white border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all active:scale-95 shadow-2xs"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Subtle Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-white border border-stone-200 w-16 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Entry Field */}
          <div className="p-3 border-t border-stone-200 bg-white flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Ask about dates, visas, dining, or batches..."
              className="flex-1 text-xs border border-stone-300 rounded-xl px-3 py-2 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-stone-500 transition-colors"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={() => handleSend()}
              className="bg-stone-900 hover:bg-stone-800 text-white p-2.5 rounded-xl transition-all active:scale-95 shadow-xs"
              aria-label="Send query"
            >
              <Send size={14} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}