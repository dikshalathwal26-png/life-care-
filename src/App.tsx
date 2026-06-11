import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import ServicesGrid from "./components/ServicesGrid";
import DoctorsList from "./components/DoctorsList";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentsDashboard from "./components/AppointmentsDashboard";
import ContactSection from "./components/ContactSection";
import { FAQ_LIST, DOCTORS, HOSPITAL_METRICS } from "./data/medicalData";
import { Appointment } from "./types";
import { 
  HeartPulse, 
  Activity, 
  Phone, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Users, 
  Award, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle, 
  PhoneCall, 
  X, 
  Bed, 
  Navigation as NavIcon 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Doctor/Specialist Preselection for booking page transfers
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string | null>(null);

  // Home Page Interaction States
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  
  // Ambulance summon widget states
  const [ambulanceLandmark, setAmbulanceLandmark] = useState("");
  const [ambulanceCategory, setAmbulanceCategory] = useState("");
  const [oxygenNeeded, setOxygenNeeded] = useState(false);
  const [summonStatus, setSummonStatus] = useState<"idle" | "sending" | "dispatched">("idle");
  const [dispatchTicket, setDispatchTicket] = useState("");

  const handleBookWithDoctor = (docId: string, dept: string) => {
    setSelectedDoctorId(docId);
    setSelectedDepartmentName(dept);
    setActiveTab("book");
  };

  const handleBookingSuccess = (newApt: Appointment) => {
    // Navigate or update
    setSelectedDoctorId(null);
    setSelectedDepartmentName(null);
  };

  const handleNavigateToRecords = () => {
    setActiveTab("records");
  };

  const handleNavigateToBookDirect = () => {
    setSelectedDoctorId(null);
    setSelectedDepartmentName(null);
    setActiveTab("book");
  };

  const handleEmergencyTrigger = () => {
    setShowEmergencyModal(true);
  };

  // Submit Ambulance Summon Form
  const handleSummonAmbulance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ambulanceLandmark.trim()) return;

    setSummonStatus("sending");
    
    // Simulate active dispatcher call routing
    setTimeout(() => {
      const ticketId = "LC-AMB-" + Math.floor(1000 + Math.random() * 9000);
      setDispatchTicket(ticketId);
      setSummonStatus("dispatched");
    }, 1200);
  };

  const handleResetAmbulanceWidget = () => {
    setAmbulanceLandmark("");
    setAmbulanceCategory("");
    setOxygenNeeded(false);
    setSummonStatus("idle");
    setDispatchTicket("");
  };

  return (
    <div className="min-h-screen bg-[#F9FBFD] flex flex-col font-sans select-none antialiased">
      
      {/* 24/7 Top Navigation Bar Header */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onEmergencyClick={handleEmergencyTrigger} 
      />

      {/* Primary Application Screens Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME PANEL */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 pb-16"
            >
              {/* Premium Hero Section */}
              <section 
                className="relative bg-[#F9FBFD] text-[#1A2E35] overflow-hidden py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200/50"
                id="hero-banner"
              >
                {/* Subtle abstract geometric structures matching the bold minimal theme */}
                <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#0076A3]/5 blur-3xl" />
                <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-[#2ECC71]/5 blur-2xl" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center position-relative z-10">
                  
                  {/* Left Column Text details */}
                  <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                    <div className="space-y-4">
                      <p className="text-[#2ECC71] font-black text-sm tracking-[0.25em] uppercase mb-4 block">
                        — Established 1998
                      </p>
                      
                      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] leading-[0.88] font-black tracking-tighter uppercase text-[#1A2E35]" id="hero-main-title">
                        Precision<br/>In Healing
                      </h1>
                    </div>
                    
                    <p className="text-[#5A6F77] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold">
                      Combining world-class medical expertise with compassionate care. Gohana's leading multi-speciality healthcare institution providing 24/7 critical support near Gohana Bus Stand. Outfitted with advanced ICUs and a distinguished specialist medical board.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                      <button
                        onClick={() => setActiveTab("book")}
                        className="w-full sm:w-auto bg-[#0076A3] hover:bg-[#005f85] text-white px-8 py-5 rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 hover:shadow-md transition-all cursor-pointer border border-[#0076A3]"
                        id="hero-cta-book"
                      >
                        Book Appointment
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                      <button
                        onClick={handleEmergencyTrigger}
                        className="w-full sm:w-auto border-2 border-[#1A2E35] text-[#1A2E35] px-8 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#1A2E35] hover:text-white transition-all text-center cursor-pointer flex items-center justify-center gap-2"
                        id="hero-cta-emergency"
                      >
                        <ShieldAlert className="h-4.5 w-4.5 text-rose-600 animate-pulse" />
                        Contact Support
                      </button>
                    </div>

                    {/* Operational schedules note */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 text-[10px] sm:text-xs text-[#1A2E35]/65 font-black uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#2ECC71] block" />
                        24/7 ICU RESPONSE
                      </span>
                      <span>•</span>
                      <span>Near Bus Stand Landmark</span>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Interactive Ambulance Dispatch Summon Widget */}
                  <div className="lg:col-span-5 w-full max-w-md mx-auto lg:mx-0" id="home-ambulance-dispatch-widget">
                    <div className="bg-white p-6 sm:p-8 border border-gray-150 shadow-sm rounded-3xl text-[#1A2E35]">
                      
                      {summonStatus === "idle" && (
                        <form onSubmit={handleSummonAmbulance} className="space-y-5">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <div>
                              <h3 className="text-xs font-black tracking-widest uppercase text-[#1A2E35]">
                                🚨 Rapid ICU Summon
                              </h3>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Emergency vehicle dispatch across Gohana</p>
                            </div>
                            <span className="bg-rose-100 text-rose-800 font-black text-[9px] tracking-wider px-2.5 py-1 rounded-full">
                              ACTIVE 24/7
                            </span>
                          </div>

                          <div className="space-y-4 text-xs">
                            {/* Location */}
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-black tracking-widest text-[#1A2E35]/60">Your Current Landmark / Ward *</label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-rose-500" />
                                <input
                                  type="text"
                                  placeholder="e.g. Near Gohana Railway Crossing, Ward 5"
                                  value={ambulanceLandmark}
                                  onChange={e => setAmbulanceLandmark(e.target.value)}
                                  className="w-full bg-slate-50 border border-gray-205 pl-10 pr-4 py-3 rounded-xl font-bold placeholder-gray-400 focus:outline-[#0076A3]"
                                  required
                                />
                              </div>
                            </div>

                            {/* Category Emergency */}
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-black tracking-widest text-[#1A2E35]/60">Emergency Type / Category *</label>
                              <select
                                value={ambulanceCategory}
                                onChange={e => setAmbulanceCategory(e.target.value)}
                                className="w-full bg-slate-50 border border-gray-205 px-3 py-3 rounded-xl font-bold text-gray-700 focus:outline-[#0076A3]"
                                required
                              >
                                <option value="">-- Select Situation Type --</option>
                                <option value="Cardiac Distress">Cardiac distress / Acute chest pain</option>
                                <option value="Severe Trauma">Accident / Sports Trauma injury</option>
                                <option value="Maternal Emergency">Labour / Pregnancy crisis</option>
                                <option value="Critical General">High fever / Extreme breathing difficulty</option>
                              </select>
                            </div>

                            {/* Oxygen checkpoint */}
                            <div className="flex items-center gap-2.5 pt-1">
                              <input
                                type="checkbox"
                                id="oxy-chk"
                                checked={oxygenNeeded}
                                onChange={e => setOxygenNeeded(e.target.checked)}
                                className="h-4.5 w-4.5 bg-slate-50 border-gray-300 rounded text-rose-600 focus:ring-rose-200 cursor-pointer"
                              />
                              <label htmlFor="oxy-chk" className="text-[10px] font-bold text-gray-500 cursor-pointer uppercase tracking-wider">
                                Patient requires ventilator support
                              </label>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-full text-xs tracking-widest uppercase cursor-pointer shadow-sm flex items-center justify-center gap-2 border border-rose-500 transition-all duration-200 hover:scale-[1.01]"
                            id="ambulance-widget-dispatch-btn"
                          >
                            <ShieldAlert className="h-4.5 w-4.5" />
                            GPS Siren Dispatch
                          </button>
                        </form>
                      )}

                      {summonStatus === "sending" && (
                        <div className="py-12 text-center space-y-4">
                          <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-rose-600 animate-spin mx-auto" />
                          <div>
                            <h4 className="font-extrabold text-rose-600 text-xs tracking-widest uppercase">ROUTING EMERGENCY COORDINATION</h4>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1.5">Locating active coordinates in Gohana...</p>
                          </div>
                        </div>
                      )}

                      {summonStatus === "dispatched" && (
                        <div className="py-6 text-center space-y-4" id="ambulance-dispatched-feedback">
                          <div className="inline-flex p-4 bg-rose-50 rounded-full text-rose-600">
                            <ShieldAlert className="h-8 w-8 animate-bounce" />
                          </div>
                          <div>
                            <h4 className="font-black text-rose-700 text-xs tracking-widest uppercase">🚨 AMBULANCE CREW SUMMONED!</h4>
                            <p className="text-slate-600 text-xs leading-relaxed mt-2 max-w-sm mx-auto">
                              Emergency vehicle dispatched. Dispatch Ticket Issued: <strong className="font-mono text-rose-600">{dispatchTicket}</strong>. Emergency paramedics have been routed to <strong className="text-slate-900">{ambulanceLandmark}</strong> for <strong className="text-slate-900">{ambulanceCategory}</strong>.
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3">
                              Estimated Arrival Time (ETA): 10-12 Mins
                            </p>
                          </div>
                          <div className="pt-2 flex gap-2.5 justify-center">
                            <a 
                              href="tel:+919876543210" 
                              className="bg-emerald-600 text-white px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm hover:bg-emerald-700 transition"
                            >
                              📞 Speak to Driver
                            </a>
                            <button
                              onClick={handleResetAmbulanceWidget}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-black px-4 py-2.5 rounded-full text-[10px] uppercase tracking-wider cursor-pointer"
                            >
                              Cancel Dispatch
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </section>

              {/* hospital performance grids metrics indicator - styled with Bold Typography Bento stats cards */}
              <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8" id="metrics-band">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-3xl">
                    <div className="text-4xl font-black tracking-tighter text-[#0076A3] mb-1">24/7</div>
                    <div className="text-[10px] uppercase font-black tracking-widest opacity-50">Emergency Response</div>
                    <p className="text-xs mt-3 leading-relaxed text-[#1A2E35]/80 font-semibold md:min-h-[48px]">Instant trauma care and ICU facilities equipped for any medical emergency.</p>
                  </div>

                  <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-3xl">
                    <div className="text-4xl font-black tracking-tighter text-[#2ECC71] mb-1">50+</div>
                    <div className="text-[10px] uppercase font-black tracking-widest opacity-50">Expert Specialists</div>
                    <p className="text-xs mt-3 leading-relaxed text-[#1A2E35]/80 font-semibold md:min-h-[48px]">Board-certified doctors across cardiology, neurology, pediatrics, and more.</p>
                  </div>

                  <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-3xl">
                    <div className="text-4xl font-black tracking-tighter text-[#0076A3] mb-1">25+ Yrs</div>
                    <div className="text-[10px] uppercase font-black tracking-widest opacity-50">Gohana Service</div>
                    <p className="text-xs mt-3 leading-relaxed text-[#1A2E35]/80 font-semibold md:min-h-[48px]">Gohana's premier multi-speciality healthcare node with state accredited safety.</p>
                  </div>

                  <div className="bg-[#1A2E35] text-white p-8 rounded-3xl flex flex-col justify-between h-48">
                    <div className="text-[10px] uppercase font-black tracking-widest opacity-60">Next Available Slot</div>
                    <div className="text-2xl font-bold tracking-tight text-white leading-tight">Dr. Sharma<br/><span className="text-[#2ECC71] font-black">Today, 4:30 PM</span></div>
                    <div className="text-[10px] font-mono tracking-widest uppercase opacity-40 italic">ID: LC-992-G</div>
                  </div>
                </div>
              </section>

              {/* Gohana Clinician Board: Quick Booking Row */}
              <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8" id="quick-doctor-panel">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 mb-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0076A3] bg-[#0076A3]/5 px-4 py-2 rounded-full">
                      Immediate Consultation
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#1A2E35] tracking-tighter uppercase mt-4">
                      Appointed OPD Specialists Today
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("doctors")}
                    className="text-xs text-[#0076A3] hover:text-[#005f85] font-black uppercase tracking-widest flex items-center gap-1.5 cursor-pointer hover:underline"
                  >
                    View All Doctors Panel ({DOCTORS.length}) <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {DOCTORS.slice(0, 3).map((doc) => (
                    <div 
                      key={doc.id} 
                      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex gap-4 items-center hover:shadow-md hover:border-[#0076A3]/20 transition-all duration-300"
                      id={`home-doc-card-${doc.id}`}
                    >
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="h-16 w-16 rounded-full object-cover border-2 border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#2ECC71] bg-[#2ECC71]/10 px-2.5 py-1 rounded">
                          {doc.department}
                        </span>
                        <h4 className="text-base font-black text-[#1A2E35] tracking-tight leading-none pt-1">
                          {doc.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate max-w-[150px]">
                          {doc.qualification}
                        </p>
                        <div className="pt-2 flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-gray-400">
                          <span>₹{doc.fee} Fee</span>
                          <button
                            onClick={() => handleBookWithDoctor(doc.id, doc.department)}
                            className="bg-slate-50 border border-gray-200 text-[#0076A3] hover:bg-[#0076A3] hover:text-white font-black px-3 py-1.5 rounded-full block cursor-pointer text-[10px] transition-colors"
                          >
                            Book Slot
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Interactive Frequently Asked Questions */}
              <section className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8" id="faq-section">
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                  <div className="text-center max-w-xl mx-auto mb-10">
                    <h3 className="text-2xl md:text-3xl font-black text-[#1A2E35] tracking-tighter uppercase">
                      Patient Help Center & FAQs
                    </h3>
                    <p className="text-[#5A6F77] mt-2 text-xs font-bold uppercase tracking-widest">Immediate guide to OPD, emergency timelines, and records check-in.</p>
                  </div>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    {FAQ_LIST.map((faq, index) => {
                      const isOpen = openFaqIdx === index;
                      return (
                        <div 
                          key={index} 
                          className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200"
                          id={`faq-item-${index}`}
                        >
                          <button
                            onClick={() => setOpenFaqIdx(isOpen ? null : index)}
                            className="w-full text-left p-4 sm:p-5 flex justify-between items-center bg-[#F9FBFD] hover:bg-gray-100/50 transition-colors font-black text-[#1A2E35] text-xs sm:text-xs tracking-widest uppercase gap-3"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown className={`h-4 w-4 text-[#0076A3] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-white border-t border-gray-100 p-5 text-gray-600 text-xs leading-relaxed font-semibold font-sans"
                              >
                                {faq.answer}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Hospital physical location highlights near Gohana */}
              <section className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row gap-6 justify-between items-center bg-[#1A2E35] text-white p-8 rounded-3xl">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-black uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="h-5 w-5 text-[#2ECC71]" />
                    How to reach us?
                  </h3>
                  <p className="text-gray-300 text-xs font-semibold max-w-md leading-relaxed">Our hospital is easily accessible by major road routes. It stands adjacent to the Gohana main bus stand, keeping you connected within Sonipat division.</p>
                </div>
                <button
                  onClick={() => setActiveTab("contact")}
                  className="bg-[#0076A3] hover:bg-[#005f85] text-white font-black px-8 py-4 rounded-full text-xs uppercase tracking-widest cursor-pointer shadow-sm text-center transition-colors h-fit"
                >
                  Locate On Transit Map
                </button>
              </section>

            </motion.div>
          )}

          {/* TAB 2: SERVICES PANEL */}
          {activeTab === "services" && (
            <motion.div
              layout
              key="services"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ServicesGrid onBookWithDoctor={handleBookWithDoctor} />
            </motion.div>
          )}

          {/* TAB 3: DOCTORS PANEL */}
          {activeTab === "doctors" && (
            <motion.div
              layout
              key="doctors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DoctorsList onBookWithDoctor={handleBookWithDoctor} />
            </motion.div>
          )}

          {/* TAB 4: BOOK APPOINTMENT PANEL */}
          {activeTab === "book" && (
            <motion.div
              layout
              key="book"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AppointmentForm 
                preselectedDoctorId={selectedDoctorId} 
                preselectedDepartmentName={selectedDepartmentName} 
                onSuccess={handleBookingSuccess} 
                onNavigateToRecords={handleNavigateToRecords} 
              />
            </motion.div>
          )}

          {/* TAB 5: RECORDS APPOINTMENT PORTAL */}
          {activeTab === "records" && (
            <motion.div
              layout
              key="records"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AppointmentsDashboard onNavigateToBook={handleNavigateToBookDirect} />
            </motion.div>
          )}

          {/* TAB 6: CONTACT & LOCATION PANEL */}
          {activeTab === "contact" && (
            <motion.div
              layout
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ContactSection />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* EMERGENCY 24/7 OVERLAY MODAL */}
      <AnimatePresence>
        {showEmergencyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-rose-100 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 overflow-hidden relative"
              id="emergency-modal-popup"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowEmergencyModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-xl"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="inline-flex p-4 bg-rose-50 rounded-full text-rose-600 animate-pulse border border-rose-200">
                  <ShieldAlert className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-extrabold tracking-tight text-rose-700 uppercase">
                  Active Emergency & Ambulance Hotline
                </h3>
                <p className="text-slate-400 text-xs">Life Support Paramedics and Critical Wards active in Gohana.</p>
              </div>

              {/* Helpline Numbers Box */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-bold text-center text-rose-950 uppercase tracking-widest leading-none">Immediate Call Dispatchers</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-1">
                  <a 
                    href="tel:+919876543210" 
                    className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3 px-5 rounded-xl shadow-md text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <PhoneCall className="h-4.5 w-4.5 animate-pulse" />
                    Ambulance: +91 98765 43210
                  </a>
                  <a 
                    href="tel:+919123456789" 
                    className="bg-sky-905 hover:bg-sky-100 text-slate-800 border-rose-200 border font-extrabold py-3 px-5 rounded-xl text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    🏥 Direct ICU Desk: +91 91234 56789
                  </a>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 text-xs text-slate-600 font-semibold pl-1.5">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Instructions For Patients:</p>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-extrabold mt-0.5">•</span>
                  <span><strong>Stay Calm:</strong> Give clear direction coordinates to the driver or helpline assistant.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-extrabold mt-0.5">•</span>
                  <span><strong>Keep Records Ready:</strong> Extract previous doctor bills or blood reports if available.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-extrabold mt-0.5">•</span>
                  <span><strong>By-Pass Queues:</strong> Walk-in Emergency cases skip general OPD booking and go straight to the active Trauma Ward.</span>
                </div>
              </div>

              {/* Close prompt */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 px-5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close Advisory Warning
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Applet Aesthetic Footer */}
      <footer className="bg-[#1A2E35] border-t border-[#101F24] text-gray-300 text-[11px] font-bold uppercase tracking-wider py-12 px-4 md:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-gray-700/20">
          
          {/* Logo brand */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="bg-[#0076A3] text-white p-2.5 rounded-xl">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-black tracking-tighter text-white uppercase">
                LIFE CARE <span className="text-[#2ECC71]">HOSPITAL</span>
              </h4>
            </div>
            <p className="text-gray-400 lowercase first-letter:uppercase font-semibold tracking-wide leading-relaxed max-w-sm">
              Providing world-class medical expertise with compassionate care. Gohana's leading multi-speciality healthcare institution providing 24/7 critical support around Sonipat division.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3.5 text-center md:text-left">
            <h4 className="font-extrabold text-white uppercase tracking-[0.2em] text-[10px]">Primary Access Pass</h4>
            <div className="flex flex-col gap-2.5 font-bold">
              <button onClick={() => setActiveTab("services")} className="hover:text-white transition-colors text-left w-fit mx-auto md:mx-0">Clinical Specialties</button>
              <button onClick={() => setActiveTab("doctors")} className="hover:text-white transition-colors text-left w-fit mx-auto md:mx-0 font-bold">Find Our Clinicians</button>
              <button onClick={() => setActiveTab("records")} className="hover:text-white transition-colors text-left w-fit mx-auto md:mx-0">Access Health Records Panel</button>
              <button onClick={() => setActiveTab("contact")} className="hover:text-white transition-colors text-left w-fit mx-auto md:mx-0">Addresses & Directions</button>
            </div>
          </div>

          {/* Clinical stats */}
          <div className="md:col-span-4 space-y-3.5 text-center md:text-left">
            <h4 className="font-extrabold text-white uppercase tracking-[0.2em] text-[10px]">Accredited Direct Certifications</h4>
            <div className="space-y-2 leading-relaxed text-[10px] text-gray-400 font-bold">
              <p>✓ ISO 9001:2015 Quality Management Certified Clinical Unit.</p>
              <p>✓ Verified by Haryana State Health & Pollution boards.</p>
              <p>✓ Authorized Emergency ICU ICU transport station.</p>
            </div>
          </div>
        </div>

        {/* Outer credit lines */}
        <div className="max-w-7xl mx-auto pt-8 text-center text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em]">
          <div>Rohtak Road, Gohana • +91 98120 00000</div>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-[#101F24] rounded text-[#2ECC71]">NABH Accredited</span>
            <span className="px-3 py-1 bg-[#101F24] rounded">ISO 9001:2015</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
