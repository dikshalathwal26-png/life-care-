export type Department = 
  | "Cardiology" 
  | "Orthopedics" 
  | "Pediatrics" 
  | "General Medicine" 
  | "Gynaecology" 
  | "Emergency & Trauma";

export type DoctorStatus = "Available" | "On Call" | "On Leave";

export interface Doctor {
  id: string;
  name: string;
  department: Department;
  qualification: string;
  experience: number;
  image: string;
  rating: number;
  availableDays: string[]; // e.g., ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  availableSlots: string[]; // e.g., ["09:00 AM", "10:30 AM", ...]
  bio: string;
  fee: number;
  status: DoctorStatus;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: "Male" | "Female" | "Other";
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  department: Department;
  doctorId: string; // references Doctor.id
  doctorName: string; // helper for displaying
  status: "Scheduled" | "Completed" | "Cancelled";
  symptoms: string;
  notes?: string;
  healthId?: string; // Digital Life Care Health ID
  createdAt: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  email: string;
  bloodGroup: string;
  allergies: string;
  emergencyContact: string;
  healthId: string; // Pattern: LC-XXXX-XXXX
  isActive: boolean;
}

export interface FeedbackMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}
