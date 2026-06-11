import React, { useState } from "react";
import { DEPARTMENTS, DOCTORS, DepartmentInfo } from "../data/medicalData";
import { Doctor } from "../types";
import { 
  Activity, 
  Heart, 
  Bone, 
  Baby, 
  Smile, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Calendar 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServicesGridProps {
  onBookWithDoctor: (doctorId: string, deptName: string) => void;
}

export default function ServicesGrid({ onBookWithDoctor }: ServicesGridProps) {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  // Helper to map icon names to Lucide icon components
  const renderIcon = (iconName: string, className = "h-8 w-8") => {
    switch (iconName) {
      case "Activity": return <Activity className={className} />;
      case "Heart": return <Heart className={className} />;
      case "Bone": return <Bone className={className} />;
      case "Baby": return <Baby className={className} />;
      case "Smile": return <Smile className={className} />;
      case "Stethoscope": return <Stethoscope className={className} />;
      default: return <Stethoscope className={className} />;
    }
  };

  // Find doctors belonging to selected department
  const getDoctorsByDept = (deptName: string): Doctor[] => {
    return DOCTORS.filter(doc => doc.department === deptName);
  };

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto font-sans" id="services-section">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase font-extrabold tracking-widest text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full shadow-sm">
          Clinical Excellence
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
          Our Specialised Healthcare Services
        </h2>
        <p className="text-slate-500 mt-3 text-base md:text-lg">
          We provide comprehensive general and specialistic treatments in Gohana, outfitted with modular facilities and an experienced expert medical board.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" id="services-main-grid">
        {DEPARTMENTS.map((dept, index) => {
          const isSelected = selectedDept === dept.name;
          const deptDocs = getDoctorsByDept(dept.name);
          
          return (
            <motion.div
              layout
              key={dept.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm flex flex-col cursor-pointer ${
                isSelected 
                  ? "border-sky-500 ring-2 ring-sky-100 shadow-md transform scale-[1.01]" 
                  : "border-slate-100 hover:border-sky-200 hover:shadow-md hover:-translate-y-1"
              }`}
              onClick={() => setSelectedDept(isSelected ? null : dept.name)}
              id={`service-card-${dept.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div className={`h-2.5 bg-gradient-to-r ${dept.color}`} />
              
              <div className="p-6 md:p-8 flex-grow">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-slate-50 rounded-xl text-sky-600 transition-colors group-hover:bg-sky-50 group-hover:text-sky-700">
                    {renderIcon(dept.icon, "h-7 w-7 text-sky-600")}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Available 24/7
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mt-4 tracking-tight">
                  {dept.name}
                </h3>
                <p className="text-xs text-sky-600 font-medium mt-1 uppercase tracking-wide">
                  {dept.tagline}
                </p>
                <p className="text-slate-500 mt-2.5 text-sm leading-relaxed">
                  {dept.description}
                </p>

                {/* Features Checklist */}
                <ul className="mt-5 space-y-2">
                  {dept.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Docs indicator */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">
                    Spcl. Team: {deptDocs.length} Specialists
                  </span>
                  <span className="text-xs text-sky-600 font-bold flex items-center gap-1 hover:underline">
                    {isSelected ? "Collapse Details" : "View Specialists"}
                    <ArrowRight className={`h-3 w-3 ${isSelected ? "rotate-90" : ""} transition-transform`} />
                  </span>
                </div>
              </div>

              {/* Collapsible Doctor List within Service Card */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-100 bg-sky-50/50 p-5 space-y-4"
                    onClick={(e) => e.stopPropagation()} // Prevent closing on inner clicks
                  >
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Our Appointed Specialists in Gohana:
                    </h4>
                    
                    {deptDocs.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No schedules listed today. Walk-in appointments active at Trauma Desk.</p>
                    ) : (
                      <div className="space-y-3">
                        {deptDocs.map((doc) => (
                          <div 
                            key={doc.id} 
                            className="bg-white p-3 rounded-xl shadow-xs border border-sky-100 flex items-center gap-3 hover:shadow-sm"
                          >
                            <img 
                              src={doc.image} 
                              alt={doc.name} 
                              className="h-11 w-11 rounded-full object-cover border border-slate-100"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-grow">
                              <h5 className="text-[14px] font-bold text-slate-800 leading-tight">
                                {doc.name}
                              </h5>
                              <p className="text-[11px] text-slate-400 font-medium">
                                {doc.qualification}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="flex items-center text-[10px] text-amber-500 font-bold">
                                  <Star className="h-2.5 w-2.5 fill-amber-500 mr-0.5" />
                                  {doc.rating}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {doc.experience} Years Exp
                                </span>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => onBookWithDoctor(doc.id, dept.name)}
                              className="bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-sm border border-sky-500 transition-colors flex items-center gap-1 cursor-pointer"
                              id={`spec-book-${doc.id}`}
                            >
                              <Calendar className="h-3 w-3" />
                              Book
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Hospital Infrastructure Highlights */}
      <div className="mt-16 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-sky-100/60 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="max-w-xl">
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
            Infrastructure Strength
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight mt-2.5">
            Modern Medical Machinery & Diagnostics
          </h3>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Our facilities in Gohana house high-precision diagnostic systems, an advanced life support ICU ambulance, modular aseptic surgical suites, and computerized health assessment reporting systems.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="bg-white text-xs text-slate-600 font-semibold px-4 py-2 rounded-xl shadow-xs border border-slate-100">
            ✓ Digital 2D Echo/ECG
          </span>
          <span className="bg-white text-xs text-slate-600 font-semibold px-4 py-2 rounded-xl shadow-xs border border-slate-100">
            ✓ Advanced Trauma Beds
          </span>
          <span className="bg-white text-xs text-slate-600 font-semibold px-4 py-2 rounded-xl shadow-xs border border-slate-100">
            ✓ 24/7 Oxygen Plant
          </span>
          <span className="bg-white text-xs text-slate-600 font-semibold px-4 py-2 rounded-xl shadow-xs border border-slate-100">
            ✓ Sterilized Surgical OT
          </span>
        </div>
      </div>
    </section>
  );
}
