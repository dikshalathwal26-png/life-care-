import React, { useState, useMemo } from "react";
import { DOCTORS, DEPARTMENTS } from "../data/medicalData";
import { Doctor, Department } from "../types";
import { Search, Star, Award, Stethoscope, MapPin, Calendar, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface DoctorsListProps {
  onBookWithDoctor: (doctorId: string, deptName: string) => void;
}

export default function DoctorsList({ onBookWithDoctor }: DoctorsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.qualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDept = selectedDept === "All" || doc.department === selectedDept;
      
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, selectedDept]);

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto font-sans" id="doctors-team-section">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#0076a3] bg-sky-50 px-3.5 py-1.5 rounded-full shadow-sm">
          Specialist Panel
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
          Meet Our Premium Medical Board
        </h2>
        <p className="text-slate-500 mt-2.5 text-sm md:text-base leading-relaxed">
          Access highly accredited clinicians, physicians, and consultants serving Gohana. Book physical consultations with trusted doctors.
        </p>
      </div>

      {/* Control Panel: Filters & Search bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs max-w-5xl mx-auto mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, credentials, bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all font-medium"
            id="doctor-search-input"
          />
        </div>

        {/* Department Filters pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto justify-start md:justify-end pb-1 md:pb-0">
          <button
            onClick={() => setSelectedDept("All")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedDept === "All"
                ? "bg-sky-600 text-white shadow-sm shadow-sky-100"
                : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100"
            }`}
            id="filter-all-doctors"
          >
            All Departments
          </button>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.name}
              onClick={() => setSelectedDept(dept.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDept === dept.name
                  ? "bg-sky-600 text-white shadow-sm shadow-sky-100"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100"
              }`}
              id={`filter-doc-dept-${dept.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-12 max-w-md mx-auto" id="no-doctors-found">
          <div className="inline-flex p-4 bg-sky-50 rounded-full text-sky-600 mb-4 animate-bounce">
            <Stethoscope className="h-8 w-8" />
          </div>
          <p className="text-slate-800 font-bold text-lg">No matching doctors found</p>
          <p className="text-slate-400 text-xs mt-1">Try clarifying your terms or clearing filters to locate a healthcare specialist.</p>
          <button
            onClick={() => { setSearchTerm(""); setSelectedDept("All"); }}
            className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-sm cursor-pointer"
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto" id="doctors-profiles-grid">
          {filteredDoctors.map((doc, idx) => {
            const isEmergencyGroup = doc.department === "Emergency & Trauma";
            return (
              <motion.div
                layout
                key={doc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-lg hover:border-sky-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group"
                id={`doctor-card-${doc.id}`}
              >
                {/* Doctor Header image + Tags */}
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  
                  {/* Status Indicator Badge */}
                  <span className={`absolute top-4 right-4 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-xs ${
                    doc.status === "Available" 
                      ? "bg-emerald-500 text-white" 
                      : doc.status === "On Call" 
                      ? "bg-amber-500 text-white" 
                      : "bg-slate-400 text-white"
                  }`}>
                    ● {doc.status}
                  </span>

                  {/* Rating Tag */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-extrabold text-slate-800 shadow-sm border border-slate-100/50">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span>{doc.rating} Rating</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#0076a3] bg-sky-50 py-1 px-3.5 rounded-full w-fit">
                    {doc.department}
                  </span>

                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight mt-3 mb-1">
                    {doc.name}
                  </h3>
                  
                  <p className="text-xs text-slate-400 font-bold leading-tight min-h-[32px]">
                    {doc.qualification}
                  </p>

                  <p className="text-slate-500 text-xs mt-3.5 leading-relaxed flex-grow">
                    {doc.bio}
                  </p>

                  {/* Badges/Credentials list */}
                  <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                      <Award className="h-4 w-4 text-[#0076a3] flex-shrink-0" />
                      <span>{doc.experience} Years Exp</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold text-right justify-end">
                      <span className="text-slate-400 text-[11px] font-semibold">OPD Fee:</span>
                      <span className="text-emerald-600">₹{doc.fee}</span>
                    </div>
                  </div>

                  {/* Working Info Grid */}
                  <div className="bg-slate-50 p-3.5 rounded-xl mt-4 border border-slate-100 text-[11px]">
                    <div className="flex justify-between items-center text-slate-500">
                      <span className="font-bold flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-sky-600" /> Availability:
                      </span>
                      <span className="text-slate-700 font-extrabold">
                        {isEmergencyGroup ? "Walk-In Desk" : doc.availableDays.join(", ")}
                      </span>
                    </div>
                    <div className="mt-1.5 flex justify-between items-center text-slate-500">
                      <span className="font-bold flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-sky-600" /> Slots:
                      </span>
                      <span className="text-slate-700 font-extrabold truncate max-w-[150px]">
                        {isEmergencyGroup ? "Emergency 24x7" : doc.availableSlots[0] + " - " + doc.availableSlots[doc.availableSlots.length - 1]}
                      </span>
                    </div>
                  </div>

                  {/* Action button */}
                  <button
                    onClick={() => onBookWithDoctor(doc.id, doc.department)}
                    disabled={doc.status === "On Leave"}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer mt-5 flex items-center justify-center gap-1.5 shadow-xs ${
                      doc.status === "On Leave"
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        : "bg-[#0076a3] hover:bg-sky-700 text-white font-extrabold border border-[#005f85] hover:shadow-md"
                    }`}
                    id={`doc-card-btn-${doc.id}`}
                  >
                    <Calendar className="h-4 w-4" />
                    {doc.status === "On Leave" ? "Not Available" : "Schedule Clinical Visit"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
