import React, { useState, useEffect } from "react";
import { Appointment, PatientProfile } from "../types";
import { DOCTORS } from "../data/medicalData";
import { 
  Calendar, 
  User, 
  Activity, 
  Clock, 
  Trash2, 
  Edit, 
  Save, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Plus, 
  Heart, 
  UserCheck, 
  AlertTriangle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AppointmentsDashboardProps {
  onNavigateToBook: () => void;
}

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function AppointmentsDashboard({ onNavigateToBook }: AppointmentsDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  
  // Dialog / Editor States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState<number>(30);
  const [editGender, setEditGender] = useState<"Male" | "Female" | "Other">("Male");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBloodGroup, setEditBloodGroup] = useState("O+");
  const [editAllergies, setEditAllergies] = useState("");
  const [editEmergency, setEditEmergency] = useState("");

  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    // 1. Appointments
    const savedApts = localStorage.getItem("life_care_appointments");
    if (savedApts) {
      setAppointments(JSON.parse(savedApts));
    } else {
      // Create some default test data to make the UI look alive out of the box!
      const defaultApts: Appointment[] = [
        {
          id: "LC-APT-772910",
          patientName: "Sumit Lathwal",
          patientAge: 42,
          patientGender: "Male",
          phone: "9812345678",
          email: "sumit@gohana.net",
          date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // 2 days ahead
          timeSlot: "11:30 AM",
          department: "Cardiology",
          doctorId: "doc-1",
          doctorName: "Dr. Anil Lathwal",
          status: "Scheduled",
          symptoms: "Mild hypertension and general cardiology evaluation",
          notes: "Requires standard digital ECG report before consultation.",
          healthId: "LC-HID-1282-9903",
          createdAt: new Date().toISOString()
        }
      ];
      setAppointments(defaultApts);
      localStorage.setItem("life_care_appointments", JSON.stringify(defaultApts));
    }

    // 2. Profile
    const savedProfile = localStorage.getItem("life_care_patient_profiles");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      if (parsed && parsed.length > 0) {
        setProfile(parsed[0]);
      }
    } else {
      // Initial default profile
      const defaultProfile: PatientProfile = {
        id: "profile-main",
        name: "Sumit Lathwal",
        age: 42,
        gender: "Male",
        phone: "9812345678",
        email: "sumit@gohana.net",
        bloodGroup: "O+",
        allergies: "Seasonal pollen, Penicillin",
        emergencyContact: "9876543210",
        healthId: "LC-HID-1282-9903",
        isActive: true
      };
      setProfile(defaultProfile);
      localStorage.setItem("life_care_patient_profiles", JSON.stringify([defaultProfile]));
    }
  }, []);

  // Synchronise edits
  const startProfileEdit = () => {
    if (!profile) return;
    setIsEditingProfile(true);
    setEditName(profile.name);
    setEditAge(profile.age);
    setEditGender(profile.gender);
    setEditPhone(profile.phone);
    setEditEmail(profile.email);
    setEditBloodGroup(profile.bloodGroup);
    setEditAllergies(profile.allergies);
    setEditEmergency(profile.emergencyContact);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editPhone.trim()) return;

    const updatedProfile: PatientProfile = {
      id: profile?.id || "profile-main",
      name: editName.trim(),
      age: Number(editAge),
      gender: editGender,
      phone: editPhone.trim(),
      email: editEmail.trim(),
      bloodGroup: editBloodGroup,
      allergies: editAllergies.trim() || "None reported",
      emergencyContact: editEmergency.trim() || editPhone.trim(),
      healthId: profile?.healthId || "LC-HID-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000),
      isActive: true
    };

    setProfile(updatedProfile);
    setIsEditingProfile(false);
    localStorage.setItem("life_care_patient_profiles", JSON.stringify([updatedProfile]));
  };

  // Cancel Appointment handler
  const cancelAppointment = (id: string) => {
    const updated = appointments.map(apt => {
      if (apt.id === id) {
        return { ...apt, status: "Cancelled" as const };
      }
      return apt;
    });
    setAppointments(updated);
    setConfirmCancelId(null);
    localStorage.setItem("life_care_appointments", JSON.stringify(updated));
  };

  // Create new manual profile if deleted
  const handleCreateEmptyProfile = () => {
    const freshProfile: PatientProfile = {
      id: "profile-main",
      name: "New Guest Patient",
      age: 30,
      gender: "Male",
      phone: "9999900000",
      email: "guest@gohana.com",
      bloodGroup: "B+",
      allergies: "None reported",
      emergencyContact: "9999900000",
      healthId: "LC-HID-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000),
      isActive: true
    };
    setProfile(freshProfile);
    localStorage.setItem("life_care_patient_profiles", JSON.stringify([freshProfile]));
  };

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto font-sans" id="records-dashboard-section">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#0076a3] bg-sky-50 px-3.5 py-1.5 rounded-full shadow-sm">
          Patient Portal
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
          Your Digital Medical Health Console
        </h2>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Manage queued consultations, customize emergency credentials, and access your virtual hospital verification slip.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Professional Digital Membership Card & Profile details (col-span-12 or col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-5 flex items-center justify-between">
              <span>Life Care Health ID Card</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </h3>

            {profile ? (
              <div className="space-y-6">
                {/* Virtual ID Card Graphic styling */}
                <div 
                  className="bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-950 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden border border-sky-700/50 flex flex-col justify-between min-h-[220px]"
                  id="clinical-id-card-render"
                >
                  {/* Subtle graphical background ripples */}
                  <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 skew-x-12 transform origin-bottom-right" />
                  
                  {/* Card head */}
                  <div className="flex justify-between items-start border-b border-white/10 pb-3 z-10">
                    <div>
                      <h4 className="font-extrabold text-[#2ecc71] tracking-wide text-sm">LIFE CARE CLINICAL ID</h4>
                      <p className="text-[10px] uppercase tracking-wider text-sky-200">Gohana OPD Access Pass</p>
                    </div>
                    <UserCheck className="h-6 w-6 text-sky-300" />
                  </div>

                  {/* Card mid details */}
                  <div className="py-4 flex gap-4 items-center z-10">
                    {/* CSS Avatar placeholder with initial */}
                    <div className="h-12 w-12 rounded-full bg-sky-100/10 border border-white/20 flex items-center justify-center font-bold text-sky-300 text-lg">
                      {profile.name[0]}
                    </div>
                    <div>
                      <p className="text-base font-extrabold tracking-wide leading-none">{profile.name}</p>
                      <p className="text-[11px] text-sky-200 mt-1">Age: {profile.age} • Gender: {profile.gender}</p>
                      <p className="text-[11px] font-mono text-emerald-300 mt-1.5 tracking-wider">{profile.healthId}</p>
                    </div>
                  </div>

                  {/* Card footer with barcode */}
                  <div className="flex justify-between items-end pt-3 border-t border-white/5 z-10">
                    <div>
                      <p className="text-[8px] uppercase tracking-wider text-sky-300">Emergency Helpline</p>
                      <p className="text-[11px] font-bold text-slate-100 mt-0.5">{profile.emergencyContact}</p>
                    </div>
                    {/* SVG barcode simulation */}
                    <div className="flex flex-col items-center">
                      <svg className="w-24 h-6 text-white stroke-current" fill="none" viewBox="0 0 100 24">
                        <line x1="2" y1="2" x2="2" y2="22" strokeWidth="2" />
                        <line x1="6" y1="2" x2="6" y2="22" strokeWidth="1" />
                        <line x1="10" y1="2" x2="10" y2="22" strokeWidth="3" />
                        <line x1="16" y1="2" x2="16" y2="22" strokeWidth="1.5" />
                        <line x1="20" y1="2" x2="20" y2="22" strokeWidth="2" />
                        <line x1="24" y1="2" x2="24" y2="22" strokeWidth="1" />
                        <line x1="28" y1="2" x2="28" y2="22" strokeWidth="3.5" />
                        <line x1="34" y1="2" x2="34" y2="22" strokeWidth="1" />
                        <line x1="38" y1="2" x2="38" y2="22" strokeWidth="2" />
                        <line x1="44" y1="2" x2="44" y2="22" strokeWidth="1.5" />
                        <line x1="48" y1="2" x2="48" y2="22" strokeWidth="4" />
                        <line x1="54" y1="2" x2="54" y2="22" strokeWidth="1" />
                        <line x1="58" y1="2" x2="58" y2="22" strokeWidth="2.5" />
                        <line x1="64" y1="2" x2="64" y2="22" strokeWidth="1.5" />
                        <line x1="70" y1="2" x2="70" y2="22" strokeWidth="3" />
                        <line x1="76" y1="2" x2="76" y2="22" strokeWidth="1" />
                        <line x1="82" y1="2" x2="82" y2="22" strokeWidth="2" />
                        <line x1="88" y1="2" x2="88" y2="22" strokeWidth="3.5" />
                        <line x1="94" y1="2" x2="94" y2="22" strokeWidth="1" />
                      </svg>
                      <span className="text-[7px] font-mono tracking-widest text-sky-200 mt-1">PATIENT-OPD</span>
                    </div>
                  </div>
                </div>

                {/* Profile Details Details */}
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block pb-0.5 text-[10px] uppercase">Blood Group</span>
                      <span className="text-slate-800 font-extrabold text-sm">{profile.bloodGroup}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block pb-0.5 text-[10px] uppercase">Contact Phone</span>
                      <span className="text-slate-800 font-extrabold text-sm">{profile.phone}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed font-semibold">
                    <span className="text-slate-400 block pb-1 text-[10px] uppercase tracking-wider font-extrabold">Known Clinical Allergies & Contradictions</span>
                    {profile.allergies}
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed font-semibold">
                    <span className="text-slate-400 block pb-1 text-[10px] uppercase tracking-wider font-extrabold">Registered Email ID</span>
                    {profile.email || <span className="text-slate-400 italic font-medium">None configured</span>}
                  </div>

                  {/* Actions (trigger edit dialog modal) */}
                  {!isEditingProfile && (
                    <button
                      onClick={startProfileEdit}
                      className="w-full bg-slate-50 hover:bg-sky-50 text-sky-700 font-bold border border-slate-200 hover:border-sky-200 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit Demographic Credentials
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-slate-400 text-xs italic">No patient health profile initialized.</p>
                <button
                  onClick={handleCreateEmptyProfile}
                  className="mt-3 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-xl text-xs cursor-pointer"
                >
                  Setup Digital Health Profile
                </button>
              </div>
            )}
          </div>

          {/* Interactive Profile Editing Form block */}
          <AnimatePresence>
            {isEditingProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-sky-100 rounded-3xl p-6 shadow-sm space-y-4"
              >
                <h4 className="font-extrabold text-sm text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Edit className="h-4 w-4 text-[#0076a3]" />
                  Update Patient Demographics
                </h4>

                <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                      <input 
                        type="text" 
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Age</label>
                      <input 
                        type="number" 
                        value={editAge}
                        onChange={e => setEditAge(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg font-bold"
                        required
                        min="1" max="110"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Biological Gender</label>
                      <select 
                        value={editGender}
                        onChange={e => setEditGender(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg font-bold"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Blood Group</label>
                      <select 
                        value={editBloodGroup}
                        onChange={e => setEditBloodGroup(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg font-bold"
                      >
                        {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Contact Number</label>
                      <input 
                        type="text" 
                        value={editPhone}
                        onChange={e => setEditPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                      <input 
                        type="email" 
                        value={editEmail}
                        onChange={e => setEditEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Emergency Contact Helpline</label>
                      <input 
                        type="text" 
                        value={editEmergency}
                        onChange={e => setEditEmergency(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Known Medical Allergies/Contradictions</label>
                      <textarea 
                        value={editAllergies}
                        onChange={e => setEditAllergies(e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-2 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="h-3.5 w-3.5" /> Save ID Card
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT PANEL: Outpatient Appointments queue list tracker (col-span-12 or col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 tracking-tight leading-none">
                  Reserved Medical Slots
                </h3>
                <p className="text-slate-400 text-xs mt-1">Check scheduled dates and OPD consultant reservations.</p>
              </div>
              
              <button
                onClick={onNavigateToBook}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-100/30 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                id="portal-booking-add-btn"
              >
                <Plus className="h-4 w-4" /> Schedule Visit
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-100 rounded-2xl bg-slate-50/20" id="portal-appointments-empty">
                <p className="text-slate-800 font-bold">No active clinical bookings</p>
                <p className="text-slate-400 text-xs mt-1 mb-4">Book outpatient visits or specialized services to track queues here.</p>
                <button
                  onClick={onNavigateToBook}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs cursor-pointer shadow-xs border border-sky-500"
                >
                  Schedule Initial Consultation Token
                </button>
              </div>
            ) : (
              <div className="space-y-4" id="portal-appointments-list">
                {appointments.map((apt) => {
                  const isScheduled = apt.status === "Scheduled";
                  const isCancelled = apt.status === "Cancelled";
                  
                  return (
                    <div 
                      key={apt.id} 
                      className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center ${
                        isCancelled 
                          ? "bg-slate-50/50 border-slate-200/50 opacity-60" 
                          : "bg-white border-slate-100 hover:border-sky-100 shadow-xs hover:shadow-md"
                      }`}
                      id={`portal-apt-card-${apt.id}`}
                    >
                      {/* Left icon wrapper */}
                      <div className={`p-3.5 rounded-xl flex-shrink-0 ${
                        isCancelled
                          ? "bg-slate-100 text-slate-400"
                          : "bg-sky-50 text-sky-600"
                      }`}>
                        <Calendar className="h-6 w-6" />
                      </div>

                      {/* Middle Details */}
                      <div className="flex-grow space-y-1 text-xs">
                        <div className="flex justify-between sm:justify-start items-center gap-2">
                          <span className="font-mono text-[11px] text-slate-400 font-bold tracking-wider">
                            {apt.id}
                          </span>
                          
                          {/* Status pill */}
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            isScheduled 
                              ? "bg-emerald-100 text-emerald-800" 
                              : isCancelled 
                              ? "bg-rose-100 text-rose-800" 
                              : "bg-indigo-100 text-indigo-800"
                          }`}>
                            {apt.status}
                          </span>
                        </div>

                        <h4 className="text-[15px] font-extrabold text-slate-800 tracking-tight leading-tight">
                          Consult with {apt.doctorName}
                        </h4>
                        
                        <p className="text-xs text-sky-700 font-bold uppercase tracking-wider">
                          Dept: {apt.department}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 pt-0.5 font-semibold text-[11px]">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            {apt.date} • {apt.timeSlot}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            Patient: {apt.patientName} ({apt.patientAge}Y)
                          </span>
                        </div>

                        {apt.symptoms && (
                          <p className="text-slate-400 text-[11px] font-semibold mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100/50 italic leading-snug">
                            " {apt.symptoms} "
                          </p>
                        )}
                      </div>

                      {/* Right actions (Cancel option) */}
                      {isScheduled && (
                        <div className="w-full sm:w-auto flex justify-end items-center gap-2 pt-2 sm:pt-0">
                          {confirmCancelId === apt.id ? (
                            <div className="flex items-center gap-1 text-xs font-semibold animate-pulse">
                              <span className="text-rose-600 font-bold mr-1">Cancel slot?</span>
                              <button 
                                onClick={() => cancelAppointment(apt.id)}
                                className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-1.5 px-3 rounded-lg text-[10px] cursor-pointer"
                              >
                                Yes, Cancel
                              </button>
                              <button 
                                onClick={() => setConfirmCancelId(null)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1.5 rounded-lg text-[10px]"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmCancelId(apt.id)}
                              className="bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 p-2.5 rounded-xl justify-center items-center flex cursor-pointer transition-colors border border-slate-100"
                              title="Cancel slot reservation"
                              id={`cancel-apt-${apt.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* OPD Check-in & Queue Guidance block */}
          <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-900 border border-slate-200/10 rounded-3xl p-6 text-white text-xs">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/10 rounded-2xl text-emerald-400">
                <Activity className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold tracking-tight text-white">OPD OPD Token Instructions:</h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  When you arrive at Life Care Hospital in Gohana, present your Digital Health Card or reservation Token ID (e.g., <span className="font-mono text-emerald-400 font-bold">LC-APT-XXXXXX</span>) to the main assistance desk. Patients who have pre-booked online bypass standard offline queues and get assigned direct medical diagnostics within 10-15 minutes of scheduled appointment slots.
                </p>
                <div className="pt-2 flex items-center gap-4 text-[10px] text-emerald-300 font-bold">
                  <span>✓ Emergency bypass active</span>
                  <span>✓ Standard diagnostics included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
