import { Doctor, Department } from "../types";

export interface DepartmentInfo {
  name: Department;
  icon: string; // Will match Lucide icon keys dynamically
  tagline: string;
  description: string;
  features: string[];
  color: string;
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    name: "Emergency & Trauma",
    icon: "Activity",
    tagline: "24/7 Red Code Urgent Care",
    description: "Fully-equipped trauma ICU, round-the-clock emergency responses, and state-of-the-art ventilator support system.",
    features: ["Golden Hour Trauma Care", "Advanced Cardiac Life Support (ACLS)", "Emergency Ambulance Service", "24/7 Diagnostic Lab Support"],
    color: "from-red-500 to-rose-600"
  },
  {
    name: "Cardiology",
    icon: "Heart",
    tagline: "Advanced Cardiac & Heart Care",
    description: "Comprehensive diagnostics, preventative cardiology, and expert interventional care for complex heart conditions.",
    features: ["Digital ECG & 2D Echo", "TMT (Treadmill Test) Clinics", "Hypertension & Lipid Clinics", "Pacemaker Follow-up"],
    color: "from-amber-500 to-red-600"
  },
  {
    name: "Orthopedics",
    icon: "Bone",
    tagline: "Joint, Spine & Bone Specialists",
    description: "Leading-edge bone and joint treatments, minimally invasive arthroscopies, complex fracture fixations, and physiotherapy rehabilitation.",
    features: ["Joint Replacement Therapy", "Spine Care & Decompression", "Advanced Fracture Management", "Sports Injury Clinic"],
    color: "from-emerald-500 to-teal-600"
  },
  {
    name: "Gynaecology",
    icon: "Baby",
    tagline: "Comprehensive Women's & Maternal Health",
    description: "Specialized maternal services, high-risk pregnancy management, painless deliveries, and laparoscopic gynaecological procedures.",
    features: ["Antenatal & Postnatal Care", "High-Risk Pregnancy Suite", "Painless Delivery Option", "Menopause Management Centre"],
    color: "from-pink-500 to-purple-600"
  },
  {
    name: "Pediatrics",
    icon: "Smile",
    tagline: "Dedicated Newborn & Child Care",
    description: "Compassionate child disease management, developmental monitoring, specialized pediatric ICU coverage, and standard immunisation.",
    features: ["Newborn Screening & Checkups", "Complete Immunisation Centre", "Growth & Nutrition Counselling", "Pediatric Asthma Management"],
    color: "from-sky-500 to-indigo-600"
  },
  {
    name: "General Medicine",
    icon: "Stethoscope",
    tagline: "Holistic Family & Internal Health",
    description: "Diagnosis and therapy of chronic multi-system disorders, diabetes checkups, infectious diseases, and comprehensive health packages.",
    features: ["Chronic Disease Management", "Diabetes Care & Counseling", "Infectious Disease Ward", "Annual Health Checkup Plans"],
    color: "from-indigo-500 to-blue-600"
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Anil Lathwal",
    department: "Cardiology",
    qualification: "MBBS, MD (Medicine), DM (Cardiology) - AIIMS",
    experience: 18,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    availableSlots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:00 PM", "03:30 PM"],
    bio: "Chief Cardiologist with extensive training from AIIMS. Expert in non-invasive cardiology, coronary artery disease management, and cardiac rehabilitation.",
    fee: 600,
    status: "Available"
  },
  {
    id: "doc-2",
    name: "Dr. Preeti Sharma",
    department: "Gynaecology",
    qualification: "MBBS, MS (Obstetrics & Gynaecology) - PGIMS Rohtak",
    experience: 12,
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    availableDays: ["Mon", "Wed", "Thu", "Fri", "Sat"],
    availableSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "02:30 PM", "04:00 PM"],
    bio: "Senior Gynaecologist and Infertility Specialist. Passionate about natural deliveries, high-risk pregnancy support, and female wellness counselling.",
    fee: 500,
    status: "Available"
  },
  {
    id: "doc-3",
    name: "Dr. Rajesh Kumar",
    department: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics), Fellow in Joint Replacement - India & UK",
    experience: 15,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    availableDays: ["Mon", "Tue", "Thu", "Fri", "Sat"],
    availableSlots: ["09:00 AM", "10:15 AM", "11:45 AM", "03:00 PM", "04:30 PM"],
    bio: "Renowned ortho-surgeon specializing in knee, hip, and spine surgeries. Highly experienced in complex trauma, sports injuries, and advanced joint replacements.",
    fee: 550,
    status: "Available"
  },
  {
    id: "doc-4",
    name: "Dr. Devendra Malik",
    department: "Pediatrics",
    qualification: "MBBS, MD (Pediatrics), DCH",
    experience: 10,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    availableDays: ["Tue", "Wed", "Thu", "Fri", "Sat"],
    availableSlots: ["10:30 AM", "11:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"],
    bio: "Dedicated pediatrician with specialized knowledge in neonatal treatment, baby immunization, childhood allergies, and adolescent wellness.",
    fee: 400,
    status: "Available"
  },
  {
    id: "doc-5",
    name: "Dr. Meenakshi Hooda",
    department: "General Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 14,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
    bio: "Consultant Physician with expertise in managing critical conditions, complex multi-system disorders, diabetes, and tropical infectious fevers.",
    fee: 400,
    status: "Available"
  },
  {
    id: "doc-6",
    name: "Dr. Sanjay Malik",
    department: "Emergency & Trauma",
    qualification: "MBBS, MEM (Emergency Medicine) - GWU, USA Resident Consultant",
    experience: 8,
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f0471?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    availableSlots: ["Emergency 24/7 (Walk-in Desk)"],
    bio: "Emergency care head trained in handling complex medical, surgical, and toxicological crises with rapid decisions and efficient trauma management.",
    fee: 500,
    status: "On Call"
  }
];

export const HOSPITAL_METRICS = [
  { value: "40+", label: "Inpatient Beds" },
  { value: "15+", label: "Years of Service" },
  { value: "100k+", label: "Outpatients Treated" },
  { value: "6+", label: "Specialised Clinics" },
];

export const FAQ_LIST = [
  {
    question: "What are the emergency hours at Life Care Hospital?",
    answer: "Our Emergency & Trauma Centre is open 24 hours a day, 7 days a week, 365 days a year. We always have a dedicated general surgeon, trauma doctors, and ICU nurses on active duty."
  },
  {
    question: "How do I book an appointment with a specialist?",
    answer: "You can book an appointment instantly using our interactive 'Book Appointment' form on this web portal, or by calling our active helpdesk lines directly. You will receive an immediate virtual token slip."
  },
  {
    question: "What is a Digital Life Care Health ID?",
    answer: "The Life Care Health ID is a digital hospital profile that holds your basic details like emergency contacts, allergies, and blood group. Having a Digital ID speeds up your check-in and medical assessment."
  },
  {
    question: "Which locations do you serve?",
    answer: "We are located near the Bus Stand on Gohana Road, Gohana, Haryana. We support patients from Gohana city and nearby regions including Sonipat, Rohtak, Jind, and Panipat rural areas."
  },
  {
    question: "Do you have pharmacy and lab services on-site?",
    answer: "Yes, we have an in-house fully automated diagnostic lab, digital radiography (X-Ray), and a fully stocked 24/7 pharmacy so that patients can receive care under one single roof."
  }
];
