import React, { useState, useEffect } from "react";
import { Department, Doctor, Appointment } from "../types";
import { DOCTORS, DEPARTMENTS } from "../data/medicalData";
import { 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  HeartPulse, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  FileText 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AppointmentFormProps {
  preselectedDoctorId: string | null;
  preselectedDepartmentName: string | null;
  onSuccess: (newAppointment: Appointment) => void;
  onNavigateToRecords: () => void;
}

export default function AppointmentForm({ 
  preselectedDoctorId, 
  preselectedDepartmentName, 
  onSuccess, 
  onNavigateToRecords 
}: AppointmentFormProps) {
  
  // High level wizard steps: 1 = Spec & Doctor, 2 = Date & Slot, 3 = Patient Details, 4 = Confirmation receipt
  const [step, setStep] = useState(1);
  
  // Fields state
  const [department, setDepartment] = useState<Department | "">("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState<number | "">("");
  const [patientGender, setPatientGender] = useState<"Male" | "Female" | "Other" | "">("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");
  const [generateHealthId, setGenerateHealthId] = useState(true);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [createdSlip, setCreatedSlip] = useState<Appointment | null>(null);

  // Apply preselection
  useEffect(() => {
    if (preselectedDepartmentName) {
      setDepartment(preselectedDepartmentName as Department);
    }
    if (preselectedDoctorId) {
      setDoctorId(preselectedDoctorId);
      // Auto-populate department for preselected doctor
      const matchedDoc = DOCTORS.find(d => d.id === preselectedDoctorId);
      if (matchedDoc) {
        setDepartment(matchedDoc.department);
      }
    }
  }, [preselectedDoctorId, preselectedDepartmentName]);

  // Doctors list filtered by chosen department
  const filteredDoctorsByDept = DOCTORS.filter(doc => !department || doc.department === department);

  // Selected doctor's metadata
  const selectedDoctor = DOCTORS.find(doc => doc.id === doctorId);

  // Reset doctor choice if department changes
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Department;
    setDepartment(value);
    setDoctorId(""); // Reset doctor selection
    setTimeSlot(""); // Reset slot
  };

  // Get date boundaries (limit range from today to 30 days ahead)
  const getMinDateString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDateString = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split("T")[0];
  };

  // Steps Validator
  const handleNextStep = () => {
    setValidationError(null);
    
    if (step === 1) {
      if (!department) {
        setValidationError("Please select a medical department.");
        return;
      }
      if (!doctorId) {
        setValidationError("Please choose an available doctor/specialist.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!date) {
        setValidationError("Please specify a preferred consultation date.");
        return;
      }
      if (!timeSlot) {
        setValidationError("Please select an available OPD time slot.");
        return;
      }
      setStep(3);
    }
  };

  // Submit & Create Appointment Object
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!patientName.trim()) return setValidationError("Please specify the patient's full name.");
    if (!patientAge || Number(patientAge) <= 0 || Number(patientAge) > 120) {
      return setValidationError("Please enter a valid patient age (1-120).");
    }
    if (!patientGender) return setValidationError("Please specify the patient's biological gender.");
    if (!phone.match(/^[0-9]{10}$/)) {
      return setValidationError("Please specify a valid 10-digit mobile helpline number.");
    }
    if (!symptoms.trim()) return setValidationError("Please describe current symptoms or complaints briefly.");

    // Passed validation! Create object
    const newId = "LC-APT-" + Math.floor(100000 + Math.random() * 900000);
    const healthCardId = generateHealthId ? "LC-HID-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000) : undefined;
    
    const appointmentRecord: Appointment = {
      id: newId,
      patientName: patientName.trim(),
      patientAge: Number(patientAge),
      patientGender: patientGender as "Male" | "Female" | "Other",
      phone: phone.trim(),
      email: email.trim() || `${patientName.toLowerCase().replace(/\s+/g, "")}@example.com`,
      date,
      timeSlot,
      department: department as Department,
      doctorId,
      doctorName: selectedDoctor ? selectedDoctor.name : "Staff Medical Practitioner",
      status: "Scheduled",
      symptoms: symptoms.trim(),
      notes: notes.trim() || undefined,
      healthId: healthCardId,
      createdAt: new Date().toISOString()
    };

    // Store inside localStorage
    const savedData = localStorage.getItem("life_care_appointments");
    let currentApts: Appointment[] = savedData ? JSON.parse(savedData) : [];
    currentApts.unshift(appointmentRecord);
    localStorage.setItem("life_care_appointments", JSON.stringify(currentApts));

    // Handle profile creation if checked
    if (generateHealthId) {
      const savedProfiles = localStorage.getItem("life_care_patient_profiles");
      let currentProfiles = savedProfiles ? JSON.parse(savedProfiles) : [];
      const newProfile = {
        id: "profile-main",
        name: patientName.trim(),
        age: Number(patientAge),
        gender: patientGender,
        phone: phone.trim(),
        email: email.trim() || `${patientName.toLowerCase().replace(/\s+/g, "")}@example.com`,
        bloodGroup: "O+ (Default)",
        allergies: "None reported",
        emergencyContact: phone.trim(),
        healthId: healthCardId,
        isActive: true
      };
      // Keep only one primary active profile for ease of testing
      currentProfiles = [newProfile];
      localStorage.setItem("life_care_patient_profiles", JSON.stringify(currentProfiles));
    }

    setCreatedSlip(appointmentRecord);
    onSuccess(appointmentRecord);
    setStep(4);
  };

  // Reset form to booklet state
  const handleResetForm = () => {
    setStep(1);
    setDepartment("");
    setDoctorId("");
    setDate("");
    setTimeSlot("");
    setPatientName("");
    setPatientAge("");
    setPatientGender("");
    setPhone("");
    setEmail("");
    setSymptoms("");
    setNotes("");
    setCreatedSlip(null);
  };

  return (
    <div className="py-10 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto font-sans" id="scheduler-container">
      {/* Title Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#0076a3] bg-sky-50 px-3.5 py-1.5 rounded-full shadow-sm">
          Booking Station
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
          Schedule Clinical Visit
        </h2>
        <p className="text-slate-400 mt-1.5 text-xs max-w-sm mx-auto">
          Book immediate OPD consult tokens, high-risk pregnancy evaluations, or diagnostic assessments.
        </p>

        {/* Action Indicators for Steps */}
        {step < 4 && (
          <div className="flex items-center justify-between max-w-md mx-auto mt-8 relative px-4 text-slate-400">
            {/* Background progress track */}
            <div className="absolute left-0 right-0 h-0.5 bg-slate-100 top-1/2 -translate-y-1/2 z-0" />
            <div 
              className="absolute left-0 h-0.5 bg-sky-500 top-1/2 -translate-y-1/2 z-0 transition-all duration-300" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />

            {[
              { id: 1, label: "Specialist" },
              { id: 2, label: "Schedule" },
              { id: 3, label: "Patient" },
            ].map((s) => {
              const active = step >= s.id;
              const current = step === s.id;
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center gap-1.5">
                  <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all ${
                    current 
                      ? "bg-white border-sky-500 text-sky-600 ring-4 ring-sky-100" 
                      : active 
                      ? "bg-sky-500 border-sky-500 text-white" 
                      : "bg-white border-slate-200 text-slate-400"
                  }`}>
                    {s.id}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    current ? "text-sky-700" : active ? "text-slate-700" : "text-slate-400"
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {validationError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs px-4 py-3 rounded-xl max-w-lg mx-auto mb-6 flex items-start gap-2 animate-bounce" id="scheduler-error">
          <span className="font-bold flex-shrink-0">⚠️ Error:</span>
          <span>{validationError}</span>
        </div>
      )}

      {/* Main wizard interface outer shell */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-md p-6 sm:p-8 md:p-10 max-w-2xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Department and Doctor Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-sky-600 animate-pulse" />
                  Select Department & Doctor Specialist
                </h3>
                <p className="text-slate-400 text-xs mt-1">Specify which care module or practitioner you wish to coordinate with.</p>
              </div>

              {/* Department Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">Choose Medical Department *</label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={handleDepartmentChange}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all font-semibold text-slate-700 appearance-none cursor-pointer"
                    id="doctor-dept-select"
                  >
                    <option value="">-- Click to Select Specialty Department --</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept.name} value={dept.name}>{dept.name} • {dept.tagline}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold block">▼</div>
                </div>
              </div>

              {/* Doctor Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">Assign Physician / Specialist *</label>
                <div className="grid grid-cols-1 gap-3">
                  {!department ? (
                    <div className="bg-slate-50 p-4 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400">
                      Please select a department above to view active specialists.
                    </div>
                  ) : (
                    filteredDoctorsByDept.map(doc => {
                      const isSelected = doctorId === doc.id;
                      return (
                        <div
                          key={doc.id}
                          onClick={() => {
                            setDoctorId(doc.id);
                            setTimeSlot(""); // Clear slot
                          }}
                          className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex gap-4 items-center ${
                            isSelected 
                              ? "bg-sky-50/50 border-sky-400 shadow-xs" 
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                          id={`select-doctor-${doc.id}`}
                        >
                          <img 
                            src={doc.image} 
                            alt={doc.name} 
                            className="h-14 w-14 rounded-full object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow">
                            <h4 className="text-[14px] font-bold text-slate-800 leading-tight">
                              {doc.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-bold">
                              {doc.qualification}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 font-semibold">
                              <span>Exp: {doc.experience} Years</span>
                              <span>•</span>
                              <span className="text-emerald-600 font-extrabold">Fee: ₹{doc.fee}</span>
                            </div>
                          </div>
                          
                          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "border-sky-500 bg-sky-500 text-white" : "border-slate-300"
                          }`}>
                            {isSelected && <CheckCircle2 className="h-3 w-3" />}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Navigation button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3 px-6 rounded-xl flex items-center gap-1 shadow-sm text-xs cursor-pointer tracking-wider"
                  id="wizard-step1-next"
                >
                  Schedule Slot 
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Date & Slot Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-sky-600 animate-pulse" />
                  Select Date & Timeslot
                </h3>
                <p className="text-slate-400 text-xs mt-1">Specify when the patient will check-in for outpatient consulting.</p>
              </div>

              {selectedDoctor && (
                <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex items-center gap-3">
                  <img src={selectedDoctor.image} alt={selectedDoctor.name} className="h-10 w-10 rounded-full object-cover border" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-700">Appointed Specialist:</h4>
                    <p className="text-sky-900 font-bold text-sm leading-none mt-1">{selectedDoctor.name}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold block uppercase tracking-wider">
                      OPD DAYS: {selectedDoctor.availableDays.join(", ")}
                    </p>
                  </div>
                </div>
              )}

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">Preferred Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    min={getMinDateString()}
                    max={getMaxDateString()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all cursor-pointer"
                    id="doctor-appt-date-input"
                  />
                </div>
              </div>

              {/* Available Slots */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">Available Hourly Slots *</label>
                
                {!date ? (
                  <div className="bg-slate-50 p-4 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                    Please select a consultation date first to view active hourly sessions.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {selectedDoctor?.availableSlots.map(slot => {
                      const isSelectedSlot = timeSlot === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setTimeSlot(slot)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col justify-center items-center gap-1 ${
                            isSelectedSlot
                              ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                              : "bg-white border-slate-200 text-slate-600 hover:border-sky-300 hover:bg-sky-50/20"
                          }`}
                          id={`slot-btn-${slot.replace(/\s+/g, "-")}`}
                        >
                          <Clock className={`h-3.5 w-3.5 ${isSelectedSlot ? "text-emerald-300" : "text-sky-500"}`} />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Navigation Actions */}
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-extrabold py-3 px-5 rounded-xl flex items-center gap-1 text-xs cursor-pointer transition-colors"
                  id="wizard-step2-prev"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3 px-6 rounded-xl flex items-center gap-1 shadow-sm text-xs cursor-pointer tracking-wider"
                  id="wizard-step2-next"
                >
                  Patient Details 
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Patient Information Form */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <User className="h-5 w-5 text-sky-600 animate-pulse" />
                    Enter Patient Demographics
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">Specify medical records details to compile your consulting receipt.</p>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5 col-span-2 sm:col-span-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Patient Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                      required
                      id="patient-name-input"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Patient Age (Years) *</label>
                    <input
                      type="number"
                      placeholder="e.g. 35"
                      min="1"
                      max="120"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value ? Number(e.target.value) : "")}
                      className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                      required
                      id="patient-age-input"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Biological Gender *</label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                      required
                      id="patient-gender-select"
                    >
                      <option value="">-- Choose Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5 col-span-2 sm:col-span-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Phone / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="10-digit mobile phone"
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white"
                        required
                        id="patient-phone-input"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 col-span-2 sm:col-span-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="e.g. name@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white"
                        id="patient-email-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Symptoms Text area */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Describe Chief Complaint / Symptoms *</label>
                  <textarea
                    placeholder="Briefly state patient symptoms (fever since 2 days, knee injury, acute chest pain, etc.)"
                    rows={3}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                    required
                    id="patient-symptoms-textarea"
                  />
                </div>

                {/* Notes Text Area */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Additional Medical Notes or History</label>
                  <textarea
                    placeholder="Is the patient taking medication? Any allergies? Record them here."
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white"
                    id="patient-notes-textarea"
                  />
                </div>

                {/* Toggle digital ID */}
                <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gen-id-chk"
                    checked={generateHealthId}
                    onChange={(e) => setGenerateHealthId(e.target.checked)}
                    className="h-4.5 w-4.5 text-sky-600 focus:ring-sky-200 border-slate-300 rounded cursor-pointer mt-0.5"
                  />
                  <div>
                    <label htmlFor="gen-id-chk" className="text-xs font-extrabold text-indigo-950 cursor-pointer flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
                      Generate Digital Life Care Health ID Card
                    </label>
                    <p className="text-[10px] text-indigo-700 mt-1">
                      Creates a secure digital patient health ID which generates a virtual QR slip and barcode within our Portal for rapid hospital check-ins.
                    </p>
                  </div>
                </div>

                {/* Submits */}
                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-extrabold py-3 px-5 rounded-xl flex items-center gap-1 text-xs cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-7 rounded-xl flex items-center gap-1.5 shadow-sm text-xs cursor-pointer tracking-wider border border-emerald-500"
                    id="submit-appointment-btn"
                  >
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-300" />
                    Confirm & Complete Booking
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 4: Success Receipt Slip */}
          {step === 4 && createdSlip && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <div className="inline-flex p-4 bg-emerald-50 rounded-full text-emerald-600 mb-2">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>
              
              <div>
                <h3 className="text-xl font-extrabold text-[#0076a3] tracking-tight">
                  Clinical Consulting Token Issued!
                </h3>
                <p className="text-slate-400 text-xs mt-1">Your OPD queue reservation slip has been generated and filed.</p>
              </div>

              {/* Patient Slip Mockups */}
              <div className="border border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50 max-w-md mx-auto text-left font-mono relative mt-2 text-xs" id="receipt-slip">
                {/* Visual punches */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border border-slate-100 hidden sm:block" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border border-slate-100 hidden sm:block" />
                
                <div className="border-b border-dashed border-slate-200 pb-3 flex justify-between items-center">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-[13px]">LIFE CARE HOSPITAL</h4>
                    <p className="text-[10px] text-slate-400">Gohana, Haryana</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded text-[10px]">
                    APPROVED
                  </span>
                </div>

                <div className="py-4 space-y-2 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Consult Token ID:</span>
                    <span className="font-bold text-slate-800">{createdSlip.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dept/Specialty:</span>
                    <span className="font-bold text-slate-850">{createdSlip.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Physician:</span>
                    <span className="font-bold text-slate-850">{createdSlip.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Visit Date:</span>
                    <span className="font-bold text-sky-800">{createdSlip.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Check-in Slot:</span>
                    <span className="font-bold text-emerald-700">{createdSlip.timeSlot}</span>
                  </div>
                  <div className="border-t border-slate-100 my-2 pt-2" />
                  <div className="flex justify-between">
                    <span className="text-slate-400">Patient:</span>
                    <span className="font-bold text-slate-800">{createdSlip.patientName} ({createdSlip.patientAge}Y, {createdSlip.patientGender})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Helpline:</span>
                    <span className="font-bold text-slate-800">{createdSlip.phone}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400">Symptoms:</span>
                    <span className="font-bold text-slate-700 text-right max-w-[200px] truncate leading-none block">{createdSlip.symptoms}</span>
                  </div>
                  {createdSlip.healthId && (
                    <div className="flex justify-between text-indigo-700 font-semibold bg-indigo-50 p-1.5 rounded mt-2">
                      <span>✓ Health ID Assigned:</span>
                      <span className="font-mono text-xs">{createdSlip.healthId}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-dashed border-slate-200 pt-3 text-center text-[10px] text-slate-400">
                  <span>Please carry this token ID for direct check-in at medical reception desk. Thank you for choosing Life Care.</span>
                </div>
              </div>

              {/* CTA toggles */}
              <div className="space-y-2 max-w-sm mx-auto pt-4">
                <button
                  onClick={onNavigateToRecords}
                  className="w-full bg-[#0076a3] hover:bg-sky-700 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md shadow-sky-100 flex items-center justify-center gap-1.5 cursor-pointer border border-[#005f85]"
                  id="success-show-records"
                >
                  <FileText className="h-4.5 w-4.5" />
                  Access Patient Portal & Digital ID
                </button>
                <button
                  onClick={handleResetForm}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-extrabold py-3 rounded-xl text-xs cursor-pointer transition-colors"
                  id="success-book-another"
                >
                  Schedule Another Appointment
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
