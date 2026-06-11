import React, { useState, useEffect } from "react";
import { FeedbackMessage } from "../types";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Navigation, 
  Send, 
  ShieldAlert, 
  ChevronRight, 
  Sparkles 
} from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setImmediate(() => {});
    setErrorMsg(null);

    if (!name.trim()) return setErrorMsg("Please specify your name.");
    if (!phone.match(/^[0-9]{10}$/)) return setErrorMsg("Please enter a valid 10-digit mobile number.");
    if (!message.trim()) return setErrorMsg("Please write details of your enquiry.");

    setIsSending(true);

    const feedbackRecord: FeedbackMessage = {
      id: "FB-" + Math.floor(100000 + Math.random() * 900000),
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, "")}@example.com`,
      phone: phone.trim(),
      subject: subject.trim() || "General Medical Enquiry",
      message: message.trim(),
      createdAt: new Date().toISOString(),
      isRead: false
    };

    // Store in localStorage
    const savedMsg = localStorage.getItem("life_care_feedbacks");
    const currentMsgs: FeedbackMessage[] = savedMsg ? JSON.parse(savedMsg) : [];
    currentMsgs.unshift(feedbackRecord);
    localStorage.setItem("life_care_feedbacks", JSON.stringify(currentMsgs));

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      // reset form
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    }, 1000);
  };

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto font-sans" id="contact-outer-section">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#0076a3] bg-sky-50 px-3.5 py-1.5 rounded-full shadow-sm">
          Get In Touch
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
          Contact Life Care & Find Directions
        </h2>
        <p className="text-slate-500 mt-2 text-sm max-w-lg mx-auto leading-relaxed">
          Reach our helpline instantly or write to our medical superintendent. Located at the heart of Gohana city with seamless transit links.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        
        {/* LEFT COMPONENT: Location Details Cards & Operating hours (col-span-12 or col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Contact Details */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800 tracking-tight pb-3 border-b border-slate-50">
              Hotlines & Enquiries
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              {/* Address */}
              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-sky-50 rounded-xl text-[#0076a3] flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Hospital Address</h4>
                  <p className="text-slate-850 mt-1 font-bold text-sm leading-snug">Near Bus Stand, Gohana Road, Gohana, Haryana - 131301</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">Adjacent to public transport pathways for direct ambulance routes.</p>
                </div>
              </div>

              {/* Helplines */}
              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Active Helpdesk</h4>
                  <p className="text-slate-850 mt-1 font-extrabold text-sm leading-tight">+91 98765 43210</p>
                  <p className="text-slate-500 mt-0.5 text-xs font-bold leading-tight">+91 91234 56789</p>
                </div>
              </div>

              {/* Emails */}
              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-indigo-800 uppercase tracking-wider">Official Email</h4>
                  <p className="text-slate-850 mt-1 font-bold text-sm">support@lifecaregohana.com</p>
                  <p className="text-slate-500 mt-0.5 text-xs">admin@lifecaregohana.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800 tracking-tight pb-3 border-b border-indigo-50 flex items-center gap-1.5 justify-between">
              <span>Department Schedule</span>
              <Clock className="h-4 w-4 text-emerald-500 animate-pulse" />
            </h3>

            <div className="space-y-3.5 text-xs font-semibold">
              <div className="flex justify-between items-center bg-rose-50 p-3 rounded-2xl border border-rose-100">
                <span className="text-rose-950 font-extrabold flex items-center gap-1.5">
                  <ShieldAlert className="h-4.5 w-4.5 text-rose-600" />
                  EMERGENCY & AMBULANCE
                </span>
                <span className="bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded text-[9px] uppercase tracking-wide">
                  24/7 OPEN
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 px-3 border-b border-slate-50">
                <span className="text-slate-500 font-bold">OPD Outpatient Check-in:</span>
                <span className="text-slate-805 font-extrabold">Mon - Sat (9:00 AM - 5:00 PM)</span>
              </div>

              <div className="flex justify-between items-center py-1.5 px-3 border-b border-slate-50">
                <span className="text-slate-500 font-bold">Visiting Hours (IPD Wards):</span>
                <span className="text-slate-805 font-extrabold">daily 4:00 PM - 6:00 PM</span>
              </div>

              <div className="flex justify-between items-center py-1.5 px-3">
                <span className="text-slate-500 font-bold">24-Hour Clinical Pharmacy:</span>
                <span className="text-slate-805 font-extrabold text-emerald-600">Always Available</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COMPONENT: Interactive Feedback Query Form & Map (col-span-12 or col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Diagnostic Map Design */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 flex items-center justify-between">
              <span>Gohana Location Blueprint</span>
              <span className="text-sky-600 font-bold text-xs flex items-center gap-1">
                <Navigation className="h-3.5 w-3.5 text-sky-500" /> Map Directions
              </span>
            </h3>

            {/* Simulated Vector Map layout utilizing SVG and CSS */}
            <div className="h-56 bg-gradient-to-br from-emerald-50 via-slate-50 to-sky-50 rounded-2xl border border-slate-100 relative overflow-hidden flex items-center justify-center">
              {/* Complex road layouts SVG */}
              <svg className="absolute inset-0 w-full h-full text-slate-200" fill="none">
                {/* Horizontal main Highway */}
                <path d="M-20 120 C 100 120, 200 100, 600 100" stroke="#fff" strokeWidth="32" />
                <path d="M-20 120 C 100 120, 200 100, 600 100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />
                
                {/* Diagonal Bus Stand Road */}
                <path d="M 120 -20 L 400 300" stroke="#fff" strokeWidth="24" />
                <path d="M 120 -20 L 400 300" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Nearby River outline */}
                <path d="M 0 -10 Q 150 150, 600 40" stroke="#dbeafe" strokeWidth="12" />
                
                {/* Town landmarks outline blocks */}
                <rect x="30" y="30" width="60" height="40" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                <text x="35" y="55" fill="#64748b" className="text-[9px] font-bold">New Colony</text>
                
                <rect x="420" y="20" width="90" height="45" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                <text x="430" y="47" fill="#64748b" className="text-[9px] font-extrabold">Gohana Bus Stand</text>
              </svg>

              {/* Pulsing Target pointer representing the Hospital */}
              <div 
                className="absolute left-[54%] top-[42%] flex flex-col items-center"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <div className="absolute h-10 w-10 rounded-full bg-rose-500/20 animate-ping border border-rose-500/50" />
                <div className="bg-rose-600 text-white p-2.5 rounded-full shadow-lg relative border border-white flex items-center justify-center">
                  <span className="text-xs font-bold leading-none block">✚</span>
                </div>
                <div className="bg-sky-900 border border-sky-800 text-white font-extrabold text-[10px] px-2.5 py-1 rounded shadow-md mt-1.5 whitespace-nowrap">
                  LIFE CARE HOSPITAL
                </div>
              </div>

              {/* Key labels on map overlay */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-slate-100 text-[10px] space-y-0.5 shadow-sm text-slate-500 font-bold block">
                <p>📍 Landmarks: Near main Bus Stand</p>
                <p>🚗 Transit: Gohana Road Exit</p>
              </div>
            </div>
          </div>

          {/* Direct feedback write block */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 tracking-tight pb-3 border-b border-slate-50 mb-4 flex items-center gap-1.5">
              <MessageSquare className="h-5 w-5 text-sky-600" />
              Write To Customer Support / Enquiries
            </h3>

            {isSent ? (
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center space-y-2 max-w-md mx-auto" id="contact-success-msg">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-800 text-sm">Enquiry Lodged Successfully</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Your message has been filed under local register list. Our hospital helpdesk coordinates response resolutions within 24 business hours.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-2 text-xs font-bold text-[#0076a3] hover:underline"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4 text-xs font-semibold text-slate-700">
                {errorMsg && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs font-bold">
                    ⚠️ Error: {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Your Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg font-bold"
                      required
                    />
                  </div>
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Your Mobile Number *</label>
                    <input 
                      type="tel" 
                      placeholder="10-digit phone"
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg font-bold"
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Your Email ID</label>
                    <input 
                      type="email" 
                      placeholder="e.g. name@domain.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg font-bold"
                    />
                  </div>
                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Enquiry Subject</label>
                    <input 
                      type="text" 
                      placeholder="e.g. OPD queries, Medical billing..."
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg font-bold"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">Enquiry Details / Message *</label>
                  <textarea 
                    placeholder="Clearly write your concern, requesting information, feedback, or scheduling assistance..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg font-medium text-slate-700"
                    required
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="bg-[#0076a3] hover:bg-sky-700 text-white font-extrabold py-3 px-6 rounded-xl flex items-center gap-1 cursor-pointer shadow-sm text-xs border border-[#005f85] tracking-wider transition-colors"
                  >
                    <Send className="h-4 w-4 text-sky-200" />
                    {isSending ? "LODGING MESSAGE..." : "SUBMIT ENQUIRY"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
