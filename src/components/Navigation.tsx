import React, { useState } from "react";
import { Phone, Clock, MapPin, Menu, X, HeartPulse, ShieldAlert, Calendar } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onEmergencyClick: () => void;
}

export default function Navigation({ activeTab, setActiveTab, onEmergencyClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Our Services" },
    { id: "doctors", label: "Specialists" },
    { id: "book", label: "Book Appointment" },
    { id: "records", label: "Patient Portal" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F9FBFD]/95 backdrop-blur-md shadow-sm border-b border-gray-200/60 font-sans" id="hospital-header">
      {/* Top Banner with emergency and key indicators */}
      <div className="bg-[#1A2E35] text-white text-[11px] font-bold uppercase tracking-widest py-3 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300">
            <span className="flex items-center gap-1.5 font-bold">
              <MapPin className="h-4 w-4 text-[#2ECC71]" />
              Near Bus Stand, Gohana Road, Gohana, Haryana
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#2ECC71]" />
              OPD Hours: Mon - Sat (9:00 AM - 5:00 PM)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+919876543210" 
              className="flex items-center gap-1.5 hover:text-[#2ECC71] font-bold transition-colors"
            >
              <Phone className="h-4 w-4 text-[#2ECC71] animate-pulse" />
              Helpline: +91 98765 43210
            </a>
            <button
              onClick={onEmergencyClick}
              className="bg-rose-600 hover:bg-rose-700 text-white font-black px-4 py-1.5 rounded-full flex items-center gap-1 text-[10px] cursor-pointer tracking-widest border border-rose-500 transition-colors duration-200"
              id="emergency-banner-btn"
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              EMERGENCY 24/7
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleTabClick("home")}
            className="flex items-start gap-3 cursor-pointer select-none group"
            id="hospital-logo"
          >
            <div className="bg-[#0076A3] group-hover:bg-[#005f85] text-white p-2.5 rounded-2xl shadow-sm transition-all duration-300 transform group-hover:scale-105 mt-0.5">
              <HeartPulse className="h-7 w-7" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none text-[#0076A3]">
                LIFE CARE<br/><span className="text-[#2ECC71]">HOSPITAL</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold mt-1 text-[#1A2E35]/50 leading-none">
                Gohana / Haryana
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative py-1 text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "text-[#1A2E35] border-b-2 border-[#2ECC71] pb-1" 
                      : "text-[#1A2E35]/40 hover:opacity-100 hover:text-[#1A2E35]"
                  }`}
                  id={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Call-to-action button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => handleTabClick("book")}
              className={`bg-[#0076A3] hover:bg-[#005f85] text-white font-black px-6 py-3 rounded-full shadow-sm hover:scale-[1.02] transition-all duration-300 flex items-center gap-1.5 cursor-pointer text-xs uppercase tracking-widest ${
                activeTab === "book" ? "ring-2 ring-[#2ECC71]" : ""
              }`}
              id="cta-book-appointment"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1A2E35] hover:text-[#0076A3] p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl px-4 py-4 space-y-2 animate-fadeIn" id="mobile-nav-drawer">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all ${
                  isActive 
                    ? "bg-[#0076A3]/10 text-[#0076A3] font-black" 
                    : "text-[#1A2E35]/60 hover:bg-slate-50 hover:text-[#0076A3]"
                }`}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleTabClick("book")}
              className="w-full bg-[#0076A3] hover:bg-[#005f85] text-white font-bold py-3.5 px-4 rounded-full shadow-sm text-center flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest"
              id="mobile-cta-book"
            >
              <Calendar className="h-4.5 w-4.5" />
              Book Appointment
            </button>
            <button
              onClick={() => {
                onEmergencyClick();
                setIsOpen(false);
              }}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3.5 px-4 rounded-full text-center flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest"
              id="mobile-cta-emergency"
            >
              <ShieldAlert className="h-4.5 w-4.5" />
              Emergency helpline
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
