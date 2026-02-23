// ──────────────────────────────────────────────
// Medical Centre Module — Dummy Data
// ──────────────────────────────────────────────

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  conditions: string[];
  lastVisit: string;
  status: "active" | "inactive";
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  rating: number;
  status: "available" | "busy" | "off_duty";
  consultationFee: number;
  schedule: Record<string, string>;
  phone: string;
  email: string;
}

export interface MedicalAppointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: "consultation" | "follow_up" | "emergency" | "checkup";
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  notes: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  medications: { name: string; dosage: string; frequency: string; duration: string }[];
  diagnosis: string;
  notes: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  category: "blood" | "urine" | "imaging" | "other";
  date: string;
  status: "pending" | "completed" | "abnormal";
  results: Record<string, { value: string; reference: string; flag?: "high" | "low" | "normal" }>;
  orderedBy: string;
}

// ──────────────────────────────────────────────
// PATIENTS (40)
// ──────────────────────────────────────────────
export const patients: Patient[] = [
  { id: "pt-001", name: "Aarav Sharma", email: "aarav.sharma@peps.edu.in", phone: "+91 98765 20001", age: 28, gender: "Male", bloodGroup: "B+", allergies: ["Penicillin"], conditions: ["Hypertension"], lastVisit: "2026-02-22", status: "active" },
  { id: "pt-002", name: "Diya Patel", email: "diya.patel@peps.edu.in", phone: "+91 98765 20002", age: 24, gender: "Female", bloodGroup: "O+", allergies: [], conditions: [], lastVisit: "2026-02-20", status: "active" },
  { id: "pt-003", name: "Vihaan Reddy", email: "vihaan.reddy@peps.edu.in", phone: "+91 98765 20003", age: 35, gender: "Male", bloodGroup: "A+", allergies: ["Sulfa drugs"], conditions: ["Diabetes Type 2"], lastVisit: "2026-02-18", status: "active" },
  { id: "pt-004", name: "Ananya Iyer", email: "ananya.iyer@peps.edu.in", phone: "+91 98765 20004", age: 22, gender: "Female", bloodGroup: "AB+", allergies: [], conditions: ["Asthma"], lastVisit: "2026-02-15", status: "active" },
  { id: "pt-005", name: "Arjun Nair", email: "arjun.nair@peps.edu.in", phone: "+91 98765 20005", age: 31, gender: "Male", bloodGroup: "O-", allergies: ["Aspirin"], conditions: ["Migraine"], lastVisit: "2026-02-21", status: "active" },
  { id: "pt-006", name: "Ishita Gupta", email: "ishita.gupta@peps.edu.in", phone: "+91 98765 20006", age: 27, gender: "Female", bloodGroup: "B-", allergies: [], conditions: [], lastVisit: "2026-02-19", status: "active" },
  { id: "pt-007", name: "Kabir Singh", email: "kabir.singh@peps.edu.in", phone: "+91 98765 20007", age: 42, gender: "Male", bloodGroup: "A-", allergies: ["Ibuprofen"], conditions: ["Hypertension", "High Cholesterol"], lastVisit: "2026-02-23", status: "active" },
  { id: "pt-008", name: "Meera Krishnan", email: "meera.krishnan@peps.edu.in", phone: "+91 98765 20008", age: 29, gender: "Female", bloodGroup: "O+", allergies: [], conditions: ["PCOS"], lastVisit: "2026-02-17", status: "active" },
  { id: "pt-009", name: "Rohan Deshmukh", email: "rohan.deshmukh@peps.edu.in", phone: "+91 98765 20009", age: 33, gender: "Male", bloodGroup: "AB-", allergies: ["Latex"], conditions: [], lastVisit: "2026-01-10", status: "inactive" },
  { id: "pt-010", name: "Saanvi Joshi", email: "saanvi.joshi@peps.edu.in", phone: "+91 98765 20010", age: 26, gender: "Female", bloodGroup: "B+", allergies: [], conditions: ["Thyroid disorder"], lastVisit: "2026-02-22", status: "active" },
  { id: "pt-011", name: "Aditya Kulkarni", email: "aditya.kulkarni@peps.edu.in", phone: "+91 98765 20011", age: 38, gender: "Male", bloodGroup: "A+", allergies: ["Codeine"], conditions: ["Back pain"], lastVisit: "2026-02-16", status: "active" },
  { id: "pt-012", name: "Pooja Menon", email: "pooja.menon@peps.edu.in", phone: "+91 98765 20012", age: 30, gender: "Female", bloodGroup: "O+", allergies: [], conditions: [], lastVisit: "2026-02-14", status: "active" },
  { id: "pt-013", name: "Harsh Trivedi", email: "harsh.trivedi@peps.edu.in", phone: "+91 98765 20013", age: 45, gender: "Male", bloodGroup: "B+", allergies: ["Amoxicillin"], conditions: ["Diabetes Type 2", "Hypertension"], lastVisit: "2026-02-21", status: "active" },
  { id: "pt-014", name: "Neha Bhatt", email: "neha.bhatt@peps.edu.in", phone: "+91 98765 20014", age: 23, gender: "Female", bloodGroup: "A-", allergies: [], conditions: ["Anemia"], lastVisit: "2026-02-20", status: "active" },
  { id: "pt-015", name: "Siddharth Rao", email: "siddharth.rao@peps.edu.in", phone: "+91 98765 20015", age: 36, gender: "Male", bloodGroup: "AB+", allergies: ["Morphine"], conditions: ["Asthma"], lastVisit: "2026-02-18", status: "active" },
  { id: "pt-016", name: "Kavya Sundaram", email: "kavya.sundaram@peps.edu.in", phone: "+91 98765 20016", age: 25, gender: "Female", bloodGroup: "O-", allergies: [], conditions: [], lastVisit: "2025-12-05", status: "inactive" },
  { id: "pt-017", name: "Pranav Hegde", email: "pranav.hegde@peps.edu.in", phone: "+91 98765 20017", age: 40, gender: "Male", bloodGroup: "B-", allergies: ["Erythromycin"], conditions: ["Arthritis"], lastVisit: "2026-02-22", status: "active" },
  { id: "pt-018", name: "Riya Chatterjee", email: "riya.chatterjee@peps.edu.in", phone: "+91 98765 20018", age: 21, gender: "Female", bloodGroup: "A+", allergies: [], conditions: [], lastVisit: "2026-02-19", status: "active" },
  { id: "pt-019", name: "Vikram Thakur", email: "vikram.thakur@peps.edu.in", phone: "+91 98765 20019", age: 34, gender: "Male", bloodGroup: "O+", allergies: ["NSAIDs"], conditions: ["Gastritis"], lastVisit: "2026-02-17", status: "active" },
  { id: "pt-020", name: "Tanvi Agarwal", email: "tanvi.agarwal@peps.edu.in", phone: "+91 98765 20020", age: 28, gender: "Female", bloodGroup: "AB+", allergies: [], conditions: ["Migraine"], lastVisit: "2026-02-15", status: "active" },
  { id: "pt-021", name: "Manish Saxena", email: "manish.saxena@peps.edu.in", phone: "+91 98765 20021", age: 50, gender: "Male", bloodGroup: "B+", allergies: ["Cephalosporins"], conditions: ["Hypertension", "Diabetes Type 2"], lastVisit: "2026-02-23", status: "active" },
  { id: "pt-022", name: "Shreya Pandey", email: "shreya.pandey@peps.edu.in", phone: "+91 98765 20022", age: 19, gender: "Female", bloodGroup: "O+", allergies: [], conditions: [], lastVisit: "2026-02-20", status: "active" },
  { id: "pt-023", name: "Deepak Chauhan", email: "deepak.chauhan@peps.edu.in", phone: "+91 98765 20023", age: 37, gender: "Male", bloodGroup: "A+", allergies: [], conditions: ["Spondylitis"], lastVisit: "2026-02-21", status: "active" },
  { id: "pt-024", name: "Anjali Verma", email: "anjali.verma@peps.edu.in", phone: "+91 98765 20024", age: 32, gender: "Female", bloodGroup: "B-", allergies: ["Tetracycline"], conditions: ["Thyroid disorder"], lastVisit: "2026-02-18", status: "active" },
  { id: "pt-025", name: "Rajesh Pillai", email: "rajesh.pillai@peps.edu.in", phone: "+91 98765 20025", age: 48, gender: "Male", bloodGroup: "O+", allergies: [], conditions: ["High Cholesterol", "Arthritis"], lastVisit: "2026-02-22", status: "active" },
  { id: "pt-026", name: "Priya Nambiar", email: "priya.nambiar@peps.edu.in", phone: "+91 98765 20026", age: 26, gender: "Female", bloodGroup: "AB-", allergies: [], conditions: [], lastVisit: "2025-11-15", status: "inactive" },
  { id: "pt-027", name: "Karan Malhotra", email: "karan.malhotra@peps.edu.in", phone: "+91 98765 20027", age: 29, gender: "Male", bloodGroup: "A-", allergies: ["Sulfonamides"], conditions: ["Eczema"], lastVisit: "2026-02-19", status: "active" },
  { id: "pt-028", name: "Nisha Kapoor", email: "nisha.kapoor@peps.edu.in", phone: "+91 98765 20028", age: 31, gender: "Female", bloodGroup: "B+", allergies: [], conditions: ["PCOS"], lastVisit: "2026-02-16", status: "active" },
  { id: "pt-029", name: "Suresh Bhat", email: "suresh.bhat@peps.edu.in", phone: "+91 98765 20029", age: 55, gender: "Male", bloodGroup: "O-", allergies: ["Metformin"], conditions: ["Diabetes Type 2", "Neuropathy"], lastVisit: "2026-02-23", status: "active" },
  { id: "pt-030", name: "Lakshmi Menon", email: "lakshmi.menon@peps.edu.in", phone: "+91 98765 20030", age: 44, gender: "Female", bloodGroup: "A+", allergies: [], conditions: ["Hypertension"], lastVisit: "2026-02-20", status: "active" },
  { id: "pt-031", name: "Gaurav Mishra", email: "gaurav.mishra@peps.edu.in", phone: "+91 98765 20031", age: 27, gender: "Male", bloodGroup: "AB+", allergies: [], conditions: [], lastVisit: "2026-02-21", status: "active" },
  { id: "pt-032", name: "Swati Desai", email: "swati.desai@peps.edu.in", phone: "+91 98765 20032", age: 33, gender: "Female", bloodGroup: "O+", allergies: ["Ciprofloxacin"], conditions: ["Anemia"], lastVisit: "2026-02-14", status: "active" },
  { id: "pt-033", name: "Nikhil Banerjee", email: "nikhil.banerjee@peps.edu.in", phone: "+91 98765 20033", age: 39, gender: "Male", bloodGroup: "B+", allergies: [], conditions: ["Sleep Apnea"], lastVisit: "2026-02-18", status: "active" },
  { id: "pt-034", name: "Divya Ramesh", email: "divya.ramesh@peps.edu.in", phone: "+91 98765 20034", age: 24, gender: "Female", bloodGroup: "A+", allergies: [], conditions: [], lastVisit: "2026-02-22", status: "active" },
  { id: "pt-035", name: "Amit Tiwari", email: "amit.tiwari@peps.edu.in", phone: "+91 98765 20035", age: 46, gender: "Male", bloodGroup: "O+", allergies: ["Doxycycline"], conditions: ["Gout"], lastVisit: "2026-02-17", status: "active" },
  { id: "pt-036", name: "Pallavi Shetty", email: "pallavi.shetty@peps.edu.in", phone: "+91 98765 20036", age: 20, gender: "Female", bloodGroup: "B-", allergies: [], conditions: [], lastVisit: "2025-10-20", status: "inactive" },
  { id: "pt-037", name: "Rahul Goswami", email: "rahul.goswami@peps.edu.in", phone: "+91 98765 20037", age: 41, gender: "Male", bloodGroup: "AB+", allergies: [], conditions: ["Hypertension", "Obesity"], lastVisit: "2026-02-23", status: "active" },
  { id: "pt-038", name: "Sneha Kulkarni", email: "sneha.kulkarni@peps.edu.in", phone: "+91 98765 20038", age: 30, gender: "Female", bloodGroup: "A-", allergies: ["Clindamycin"], conditions: ["Endometriosis"], lastVisit: "2026-02-19", status: "active" },
  { id: "pt-039", name: "Vivek Choudhary", email: "vivek.choudhary@peps.edu.in", phone: "+91 98765 20039", age: 52, gender: "Male", bloodGroup: "O+", allergies: [], conditions: ["COPD", "Hypertension"], lastVisit: "2026-02-21", status: "active" },
  { id: "pt-040", name: "Geeta Mohan", email: "geeta.mohan@peps.edu.in", phone: "+91 98765 20040", age: 47, gender: "Female", bloodGroup: "B+", allergies: ["Azithromycin"], conditions: ["Rheumatoid Arthritis"], lastVisit: "2026-02-22", status: "active" },
];

// ──────────────────────────────────────────────
// DOCTORS (8)
// ──────────────────────────────────────────────
export const doctors: Doctor[] = [
  {
    id: "dr-001", name: "Dr. Rajiv Mehta", specialization: "Orthopedics", qualification: "MBBS, MS (Ortho)", experience: 18,
    rating: 4.8, status: "available", consultationFee: 800,
    schedule: { Monday: "9:00 AM - 1:00 PM", Tuesday: "9:00 AM - 1:00 PM", Wednesday: "2:00 PM - 6:00 PM", Thursday: "9:00 AM - 1:00 PM", Friday: "9:00 AM - 1:00 PM", Saturday: "10:00 AM - 12:00 PM" },
    phone: "+91 98765 30001", email: "rajiv.mehta@peps.edu.in",
  },
  {
    id: "dr-002", name: "Dr. Sunita Sharma", specialization: "Cardiology", qualification: "MBBS, MD (Cardiology), DM", experience: 22,
    rating: 4.9, status: "busy", consultationFee: 1200,
    schedule: { Monday: "10:00 AM - 2:00 PM", Tuesday: "10:00 AM - 2:00 PM", Wednesday: "10:00 AM - 2:00 PM", Thursday: "2:00 PM - 6:00 PM", Friday: "10:00 AM - 2:00 PM" },
    phone: "+91 98765 30002", email: "sunita.sharma@peps.edu.in",
  },
  {
    id: "dr-003", name: "Dr. Arun Kumar", specialization: "General Medicine", qualification: "MBBS, MD (Medicine)", experience: 15,
    rating: 4.6, status: "available", consultationFee: 500,
    schedule: { Monday: "8:00 AM - 4:00 PM", Tuesday: "8:00 AM - 4:00 PM", Wednesday: "8:00 AM - 4:00 PM", Thursday: "8:00 AM - 4:00 PM", Friday: "8:00 AM - 4:00 PM", Saturday: "8:00 AM - 12:00 PM" },
    phone: "+91 98765 30003", email: "arun.kumar@peps.edu.in",
  },
  {
    id: "dr-004", name: "Dr. Priya Venkatesh", specialization: "Dermatology", qualification: "MBBS, MD (Dermatology)", experience: 12,
    rating: 4.7, status: "available", consultationFee: 700,
    schedule: { Monday: "11:00 AM - 3:00 PM", Tuesday: "11:00 AM - 3:00 PM", Wednesday: "11:00 AM - 3:00 PM", Thursday: "11:00 AM - 3:00 PM", Friday: "11:00 AM - 3:00 PM" },
    phone: "+91 98765 30004", email: "priya.venkatesh@peps.edu.in",
  },
  {
    id: "dr-005", name: "Dr. Vikram Desai", specialization: "Pediatrics", qualification: "MBBS, MD (Pediatrics)", experience: 20,
    rating: 4.9, status: "off_duty", consultationFee: 600,
    schedule: { Monday: "9:00 AM - 1:00 PM", Tuesday: "9:00 AM - 1:00 PM", Wednesday: "9:00 AM - 1:00 PM", Thursday: "9:00 AM - 1:00 PM", Friday: "9:00 AM - 1:00 PM" },
    phone: "+91 98765 30005", email: "vikram.desai@peps.edu.in",
  },
  {
    id: "dr-006", name: "Dr. Kavitha Nair", specialization: "ENT", qualification: "MBBS, MS (ENT)", experience: 14,
    rating: 4.5, status: "available", consultationFee: 650,
    schedule: { Monday: "10:00 AM - 2:00 PM", Tuesday: "2:00 PM - 6:00 PM", Wednesday: "10:00 AM - 2:00 PM", Thursday: "2:00 PM - 6:00 PM", Friday: "10:00 AM - 2:00 PM", Saturday: "10:00 AM - 1:00 PM" },
    phone: "+91 98765 30006", email: "kavitha.nair@peps.edu.in",
  },
  {
    id: "dr-007", name: "Dr. Sanjay Gupta", specialization: "Ophthalmology", qualification: "MBBS, MS (Ophthalmology)", experience: 16,
    rating: 4.7, status: "busy", consultationFee: 750,
    schedule: { Monday: "9:00 AM - 1:00 PM", Tuesday: "9:00 AM - 1:00 PM", Wednesday: "2:00 PM - 5:00 PM", Thursday: "9:00 AM - 1:00 PM", Friday: "9:00 AM - 1:00 PM" },
    phone: "+91 98765 30007", email: "sanjay.gupta@peps.edu.in",
  },
  {
    id: "dr-008", name: "Dr. Anjali Reddy", specialization: "Gynecology", qualification: "MBBS, MS (OBG), DNB", experience: 19,
    rating: 4.8, status: "available", consultationFee: 900,
    schedule: { Monday: "10:00 AM - 2:00 PM", Tuesday: "10:00 AM - 2:00 PM", Wednesday: "10:00 AM - 2:00 PM", Thursday: "10:00 AM - 2:00 PM", Friday: "10:00 AM - 2:00 PM", Saturday: "10:00 AM - 12:00 PM" },
    phone: "+91 98765 30008", email: "anjali.reddy@peps.edu.in",
  },
];

// ──────────────────────────────────────────────
// APPOINTMENTS (50)
// ──────────────────────────────────────────────
export const medicalAppointments: MedicalAppointment[] = [
  { id: "apt-001", patientId: "pt-001", patientName: "Aarav Sharma", doctorId: "dr-002", doctorName: "Dr. Sunita Sharma", date: "2026-02-23", time: "10:00 AM", type: "consultation", status: "scheduled", notes: "Routine cardiac checkup" },
  { id: "apt-002", patientId: "pt-002", patientName: "Diya Patel", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-23", time: "10:30 AM", type: "checkup", status: "scheduled", notes: "Annual health checkup" },
  { id: "apt-003", patientId: "pt-003", patientName: "Vihaan Reddy", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-23", time: "11:00 AM", type: "follow_up", status: "scheduled", notes: "Diabetes follow-up, blood sugar monitoring" },
  { id: "apt-004", patientId: "pt-004", patientName: "Ananya Iyer", doctorId: "dr-006", doctorName: "Dr. Kavitha Nair", date: "2026-02-23", time: "11:30 AM", type: "consultation", status: "scheduled", notes: "Sinus congestion" },
  { id: "apt-005", patientId: "pt-005", patientName: "Arjun Nair", doctorId: "dr-001", doctorName: "Dr. Rajiv Mehta", date: "2026-02-23", time: "09:30 AM", type: "follow_up", status: "completed", notes: "Knee pain follow-up" },
  { id: "apt-006", patientId: "pt-007", patientName: "Kabir Singh", doctorId: "dr-002", doctorName: "Dr. Sunita Sharma", date: "2026-02-23", time: "12:00 PM", type: "consultation", status: "scheduled", notes: "Chest pain evaluation" },
  { id: "apt-007", patientId: "pt-010", patientName: "Saanvi Joshi", doctorId: "dr-004", doctorName: "Dr. Priya Venkatesh", date: "2026-02-23", time: "11:00 AM", type: "consultation", status: "scheduled", notes: "Skin rash evaluation" },
  { id: "apt-008", patientId: "pt-013", patientName: "Harsh Trivedi", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-23", time: "09:00 AM", type: "follow_up", status: "completed", notes: "BP and sugar review" },
  { id: "apt-009", patientId: "pt-021", patientName: "Manish Saxena", doctorId: "dr-002", doctorName: "Dr. Sunita Sharma", date: "2026-02-23", time: "01:00 PM", type: "emergency", status: "scheduled", notes: "Elevated BP reading" },
  { id: "apt-010", patientId: "pt-029", patientName: "Suresh Bhat", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-23", time: "02:00 PM", type: "follow_up", status: "scheduled", notes: "Neuropathy management review" },
  { id: "apt-011", patientId: "pt-006", patientName: "Ishita Gupta", doctorId: "dr-008", doctorName: "Dr. Anjali Reddy", date: "2026-02-22", time: "10:00 AM", type: "checkup", status: "completed", notes: "Routine gynecological checkup" },
  { id: "apt-012", patientId: "pt-008", patientName: "Meera Krishnan", doctorId: "dr-008", doctorName: "Dr. Anjali Reddy", date: "2026-02-22", time: "11:00 AM", type: "follow_up", status: "completed", notes: "PCOS management follow-up" },
  { id: "apt-013", patientId: "pt-011", patientName: "Aditya Kulkarni", doctorId: "dr-001", doctorName: "Dr. Rajiv Mehta", date: "2026-02-22", time: "09:30 AM", type: "consultation", status: "completed", notes: "Lower back pain assessment" },
  { id: "apt-014", patientId: "pt-014", patientName: "Neha Bhatt", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-22", time: "10:30 AM", type: "follow_up", status: "completed", notes: "Anemia treatment review" },
  { id: "apt-015", patientId: "pt-017", patientName: "Pranav Hegde", doctorId: "dr-001", doctorName: "Dr. Rajiv Mehta", date: "2026-02-22", time: "11:30 AM", type: "follow_up", status: "completed", notes: "Arthritis pain management" },
  { id: "apt-016", patientId: "pt-019", patientName: "Vikram Thakur", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-21", time: "09:00 AM", type: "consultation", status: "completed", notes: "Stomach pain and acidity" },
  { id: "apt-017", patientId: "pt-020", patientName: "Tanvi Agarwal", doctorId: "dr-006", doctorName: "Dr. Kavitha Nair", date: "2026-02-21", time: "10:00 AM", type: "consultation", status: "completed", notes: "Ear infection symptoms" },
  { id: "apt-018", patientId: "pt-023", patientName: "Deepak Chauhan", doctorId: "dr-001", doctorName: "Dr. Rajiv Mehta", date: "2026-02-21", time: "11:00 AM", type: "follow_up", status: "completed", notes: "Spondylitis treatment review" },
  { id: "apt-019", patientId: "pt-024", patientName: "Anjali Verma", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-21", time: "12:00 PM", type: "follow_up", status: "completed", notes: "Thyroid medication adjustment" },
  { id: "apt-020", patientId: "pt-025", patientName: "Rajesh Pillai", doctorId: "dr-001", doctorName: "Dr. Rajiv Mehta", date: "2026-02-21", time: "09:30 AM", type: "follow_up", status: "completed", notes: "Joint pain and mobility check" },
  { id: "apt-021", patientId: "pt-027", patientName: "Karan Malhotra", doctorId: "dr-004", doctorName: "Dr. Priya Venkatesh", date: "2026-02-20", time: "11:00 AM", type: "follow_up", status: "completed", notes: "Eczema treatment follow-up" },
  { id: "apt-022", patientId: "pt-028", patientName: "Nisha Kapoor", doctorId: "dr-008", doctorName: "Dr. Anjali Reddy", date: "2026-02-20", time: "10:00 AM", type: "consultation", status: "completed", notes: "PCOS consultation" },
  { id: "apt-023", patientId: "pt-030", patientName: "Lakshmi Menon", doctorId: "dr-002", doctorName: "Dr. Sunita Sharma", date: "2026-02-20", time: "10:30 AM", type: "follow_up", status: "completed", notes: "Blood pressure monitoring" },
  { id: "apt-024", patientId: "pt-031", patientName: "Gaurav Mishra", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-20", time: "11:30 AM", type: "checkup", status: "completed", notes: "General health checkup" },
  { id: "apt-025", patientId: "pt-032", patientName: "Swati Desai", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-20", time: "01:00 PM", type: "follow_up", status: "cancelled", notes: "Patient cancelled - rescheduled" },
  { id: "apt-026", patientId: "pt-033", patientName: "Nikhil Banerjee", doctorId: "dr-006", doctorName: "Dr. Kavitha Nair", date: "2026-02-19", time: "10:00 AM", type: "consultation", status: "completed", notes: "Snoring and sleep disorder evaluation" },
  { id: "apt-027", patientId: "pt-034", patientName: "Divya Ramesh", doctorId: "dr-004", doctorName: "Dr. Priya Venkatesh", date: "2026-02-19", time: "11:30 AM", type: "consultation", status: "completed", notes: "Acne treatment consultation" },
  { id: "apt-028", patientId: "pt-035", patientName: "Amit Tiwari", doctorId: "dr-001", doctorName: "Dr. Rajiv Mehta", date: "2026-02-19", time: "09:30 AM", type: "consultation", status: "completed", notes: "Gout flare-up evaluation" },
  { id: "apt-029", patientId: "pt-037", patientName: "Rahul Goswami", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-19", time: "12:00 PM", type: "consultation", status: "no_show", notes: "Patient did not show up" },
  { id: "apt-030", patientId: "pt-038", patientName: "Sneha Kulkarni", doctorId: "dr-008", doctorName: "Dr. Anjali Reddy", date: "2026-02-19", time: "10:30 AM", type: "follow_up", status: "completed", notes: "Endometriosis management" },
  { id: "apt-031", patientId: "pt-039", patientName: "Vivek Choudhary", doctorId: "dr-002", doctorName: "Dr. Sunita Sharma", date: "2026-02-18", time: "10:00 AM", type: "consultation", status: "completed", notes: "Breathlessness and cardiac evaluation" },
  { id: "apt-032", patientId: "pt-040", patientName: "Geeta Mohan", doctorId: "dr-001", doctorName: "Dr. Rajiv Mehta", date: "2026-02-18", time: "11:00 AM", type: "follow_up", status: "completed", notes: "RA treatment review" },
  { id: "apt-033", patientId: "pt-015", patientName: "Siddharth Rao", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-18", time: "09:00 AM", type: "follow_up", status: "completed", notes: "Asthma inhaler review" },
  { id: "apt-034", patientId: "pt-012", patientName: "Pooja Menon", doctorId: "dr-007", doctorName: "Dr. Sanjay Gupta", date: "2026-02-18", time: "09:30 AM", type: "checkup", status: "completed", notes: "Routine eye examination" },
  { id: "apt-035", patientId: "pt-018", patientName: "Riya Chatterjee", doctorId: "dr-004", doctorName: "Dr. Priya Venkatesh", date: "2026-02-17", time: "11:00 AM", type: "consultation", status: "completed", notes: "Allergic dermatitis" },
  { id: "apt-036", patientId: "pt-022", patientName: "Shreya Pandey", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-17", time: "09:30 AM", type: "checkup", status: "completed", notes: "General wellness checkup" },
  { id: "apt-037", patientId: "pt-009", patientName: "Rohan Deshmukh", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-01-10", time: "10:00 AM", type: "consultation", status: "completed", notes: "Seasonal flu symptoms" },
  { id: "apt-038", patientId: "pt-016", patientName: "Kavya Sundaram", doctorId: "dr-005", doctorName: "Dr. Vikram Desai", date: "2025-12-05", time: "09:00 AM", type: "checkup", status: "completed", notes: "Routine checkup" },
  { id: "apt-039", patientId: "pt-026", patientName: "Priya Nambiar", doctorId: "dr-004", doctorName: "Dr. Priya Venkatesh", date: "2025-11-15", time: "11:00 AM", type: "consultation", status: "completed", notes: "Skin allergy treatment" },
  { id: "apt-040", patientId: "pt-036", patientName: "Pallavi Shetty", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2025-10-20", time: "10:30 AM", type: "checkup", status: "completed", notes: "Annual checkup" },
  { id: "apt-041", patientId: "pt-001", patientName: "Aarav Sharma", doctorId: "dr-002", doctorName: "Dr. Sunita Sharma", date: "2026-02-10", time: "10:00 AM", type: "follow_up", status: "completed", notes: "ECG review and BP check" },
  { id: "apt-042", patientId: "pt-007", patientName: "Kabir Singh", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-12", time: "09:30 AM", type: "follow_up", status: "completed", notes: "Cholesterol medication review" },
  { id: "apt-043", patientId: "pt-013", patientName: "Harsh Trivedi", doctorId: "dr-007", doctorName: "Dr. Sanjay Gupta", date: "2026-02-15", time: "09:00 AM", type: "consultation", status: "completed", notes: "Vision check for diabetic retinopathy" },
  { id: "apt-044", patientId: "pt-002", patientName: "Diya Patel", doctorId: "dr-004", doctorName: "Dr. Priya Venkatesh", date: "2026-02-16", time: "11:30 AM", type: "consultation", status: "cancelled", notes: "Patient rescheduled to next week" },
  { id: "apt-045", patientId: "pt-005", patientName: "Arjun Nair", doctorId: "dr-001", doctorName: "Dr. Rajiv Mehta", date: "2026-02-14", time: "09:00 AM", type: "consultation", status: "completed", notes: "Initial knee assessment" },
  { id: "apt-046", patientId: "pt-010", patientName: "Saanvi Joshi", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-13", time: "10:00 AM", type: "follow_up", status: "completed", notes: "Thyroid levels review" },
  { id: "apt-047", patientId: "pt-034", patientName: "Divya Ramesh", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-11", time: "09:30 AM", type: "checkup", status: "completed", notes: "Post-fever follow-up" },
  { id: "apt-048", patientId: "pt-037", patientName: "Rahul Goswami", doctorId: "dr-002", doctorName: "Dr. Sunita Sharma", date: "2026-02-23", time: "02:30 PM", type: "consultation", status: "scheduled", notes: "Cardiac risk assessment" },
  { id: "apt-049", patientId: "pt-040", patientName: "Geeta Mohan", doctorId: "dr-003", doctorName: "Dr. Arun Kumar", date: "2026-02-23", time: "03:00 PM", type: "follow_up", status: "scheduled", notes: "RA medication review" },
  { id: "apt-050", patientId: "pt-025", patientName: "Rajesh Pillai", doctorId: "dr-007", doctorName: "Dr. Sanjay Gupta", date: "2026-02-23", time: "09:30 AM", type: "checkup", status: "completed", notes: "Routine eye check" },
];

// ──────────────────────────────────────────────
// PRESCRIPTIONS (30)
// ──────────────────────────────────────────────
export const prescriptions: Prescription[] = [
  { id: "rx-001", appointmentId: "apt-005", patientId: "pt-005", patientName: "Arjun Nair", doctorName: "Dr. Rajiv Mehta", date: "2026-02-23", medications: [{ name: "Diclofenac", dosage: "50mg", frequency: "Twice daily", duration: "7 days" }, { name: "Pantoprazole", dosage: "40mg", frequency: "Once daily", duration: "7 days" }], diagnosis: "Knee osteoarthritis", notes: "Apply ice pack. Review after 1 week." },
  { id: "rx-002", appointmentId: "apt-008", patientId: "pt-013", patientName: "Harsh Trivedi", doctorName: "Dr. Arun Kumar", date: "2026-02-23", medications: [{ name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }, { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "30 days" }, { name: "Atorvastatin", dosage: "10mg", frequency: "Once at night", duration: "30 days" }], diagnosis: "Diabetes Type 2, Hypertension", notes: "Maintain diet control. Reduce salt intake." },
  { id: "rx-003", appointmentId: "apt-011", patientId: "pt-006", patientName: "Ishita Gupta", doctorName: "Dr. Anjali Reddy", date: "2026-02-22", medications: [{ name: "Folic Acid", dosage: "5mg", frequency: "Once daily", duration: "30 days" }], diagnosis: "Routine wellness", notes: "All reports normal. Continue supplements." },
  { id: "rx-004", appointmentId: "apt-012", patientId: "pt-008", patientName: "Meera Krishnan", doctorName: "Dr. Anjali Reddy", date: "2026-02-22", medications: [{ name: "Letrozole", dosage: "2.5mg", frequency: "Once daily (Day 3-7)", duration: "5 days" }, { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }], diagnosis: "PCOS management", notes: "Monitor ovulation cycle. Next visit in 4 weeks." },
  { id: "rx-005", appointmentId: "apt-013", patientId: "pt-011", patientName: "Aditya Kulkarni", doctorName: "Dr. Rajiv Mehta", date: "2026-02-22", medications: [{ name: "Etoricoxib", dosage: "60mg", frequency: "Once daily", duration: "10 days" }, { name: "Thiocolchicoside", dosage: "4mg", frequency: "Twice daily", duration: "5 days" }], diagnosis: "Lumbar spondylosis", notes: "Physiotherapy recommended. Avoid heavy lifting." },
  { id: "rx-006", appointmentId: "apt-014", patientId: "pt-014", patientName: "Neha Bhatt", doctorName: "Dr. Arun Kumar", date: "2026-02-22", medications: [{ name: "Ferrous Ascorbate", dosage: "100mg", frequency: "Once daily", duration: "60 days" }, { name: "Vitamin B12", dosage: "1500mcg", frequency: "Once daily", duration: "30 days" }], diagnosis: "Iron deficiency anemia", notes: "Include iron-rich foods. Repeat CBC after 2 months." },
  { id: "rx-007", appointmentId: "apt-015", patientId: "pt-017", patientName: "Pranav Hegde", doctorName: "Dr. Rajiv Mehta", date: "2026-02-22", medications: [{ name: "Hydroxychloroquine", dosage: "200mg", frequency: "Once daily", duration: "30 days" }, { name: "Methylprednisolone", dosage: "4mg", frequency: "Once daily", duration: "5 days" }], diagnosis: "Rheumatoid arthritis flare", notes: "Taper steroids. Follow up in 2 weeks." },
  { id: "rx-008", appointmentId: "apt-016", patientId: "pt-019", patientName: "Vikram Thakur", doctorName: "Dr. Arun Kumar", date: "2026-02-21", medications: [{ name: "Esomeprazole", dosage: "40mg", frequency: "Once daily before food", duration: "14 days" }, { name: "Domperidone", dosage: "10mg", frequency: "Three times daily", duration: "7 days" }], diagnosis: "Gastritis with GERD", notes: "Avoid spicy food and late meals. Elevate bed head." },
  { id: "rx-009", appointmentId: "apt-017", patientId: "pt-020", patientName: "Tanvi Agarwal", doctorName: "Dr. Kavitha Nair", date: "2026-02-21", medications: [{ name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "7 days" }, { name: "Ofloxacin ear drops", dosage: "4 drops", frequency: "Three times daily", duration: "7 days" }], diagnosis: "Acute otitis media", notes: "Keep ear dry. Follow up if symptoms persist." },
  { id: "rx-010", appointmentId: "apt-018", patientId: "pt-023", patientName: "Deepak Chauhan", doctorName: "Dr. Rajiv Mehta", date: "2026-02-21", medications: [{ name: "Pregabalin", dosage: "75mg", frequency: "Twice daily", duration: "14 days" }, { name: "Aceclofenac", dosage: "100mg", frequency: "Twice daily", duration: "7 days" }], diagnosis: "Cervical spondylitis", notes: "Neck collar advised. Physiotherapy sessions." },
  { id: "rx-011", appointmentId: "apt-019", patientId: "pt-024", patientName: "Anjali Verma", doctorName: "Dr. Arun Kumar", date: "2026-02-21", medications: [{ name: "Levothyroxine", dosage: "75mcg", frequency: "Once daily before breakfast", duration: "90 days" }], diagnosis: "Hypothyroidism", notes: "Dosage increased from 50mcg. Recheck TSH after 6 weeks." },
  { id: "rx-012", appointmentId: "apt-020", patientId: "pt-025", patientName: "Rajesh Pillai", doctorName: "Dr. Rajiv Mehta", date: "2026-02-21", medications: [{ name: "Glucosamine", dosage: "1500mg", frequency: "Once daily", duration: "90 days" }, { name: "Rosuvastatin", dosage: "10mg", frequency: "Once at night", duration: "30 days" }], diagnosis: "Osteoarthritis, Hyperlipidemia", notes: "Regular exercise. Low-fat diet." },
  { id: "rx-013", appointmentId: "apt-021", patientId: "pt-027", patientName: "Karan Malhotra", doctorName: "Dr. Priya Venkatesh", date: "2026-02-20", medications: [{ name: "Mometasone cream", dosage: "Apply thin layer", frequency: "Twice daily", duration: "14 days" }, { name: "Cetirizine", dosage: "10mg", frequency: "Once at night", duration: "14 days" }], diagnosis: "Atopic eczema", notes: "Moisturize frequently. Avoid irritants." },
  { id: "rx-014", appointmentId: "apt-022", patientId: "pt-028", patientName: "Nisha Kapoor", doctorName: "Dr. Anjali Reddy", date: "2026-02-20", medications: [{ name: "Oral Contraceptive (Drospirenone+EE)", dosage: "As prescribed", frequency: "Once daily", duration: "21 days" }, { name: "Spironolactone", dosage: "25mg", frequency: "Once daily", duration: "30 days" }], diagnosis: "PCOS with hyperandrogenism", notes: "Lifestyle modifications. Weight management." },
  { id: "rx-015", appointmentId: "apt-023", patientId: "pt-030", patientName: "Lakshmi Menon", doctorName: "Dr. Sunita Sharma", date: "2026-02-20", medications: [{ name: "Telmisartan", dosage: "40mg", frequency: "Once daily", duration: "30 days" }, { name: "Aspirin", dosage: "75mg", frequency: "Once daily after lunch", duration: "30 days" }], diagnosis: "Essential hypertension", notes: "Daily BP monitoring. Reduce salt intake." },
  { id: "rx-016", appointmentId: "apt-026", patientId: "pt-033", patientName: "Nikhil Banerjee", doctorName: "Dr. Kavitha Nair", date: "2026-02-19", medications: [{ name: "Montelukast", dosage: "10mg", frequency: "Once at night", duration: "30 days" }, { name: "Fluticasone nasal spray", dosage: "2 sprays each nostril", frequency: "Once daily", duration: "30 days" }], diagnosis: "Allergic rhinitis with sleep disturbance", notes: "Sleep study recommended. Avoid allergens." },
  { id: "rx-017", appointmentId: "apt-027", patientId: "pt-034", patientName: "Divya Ramesh", doctorName: "Dr. Priya Venkatesh", date: "2026-02-19", medications: [{ name: "Adapalene gel", dosage: "Apply thin layer", frequency: "Once at night", duration: "30 days" }, { name: "Clindamycin gel", dosage: "Apply to affected areas", frequency: "Twice daily", duration: "14 days" }], diagnosis: "Acne vulgaris", notes: "Use sunscreen. Avoid oily cosmetics." },
  { id: "rx-018", appointmentId: "apt-028", patientId: "pt-035", patientName: "Amit Tiwari", doctorName: "Dr. Rajiv Mehta", date: "2026-02-19", medications: [{ name: "Colchicine", dosage: "0.5mg", frequency: "Twice daily", duration: "14 days" }, { name: "Febuxostat", dosage: "40mg", frequency: "Once daily", duration: "30 days" }], diagnosis: "Acute gouty arthritis", notes: "Increase water intake. Avoid red meat and alcohol." },
  { id: "rx-019", appointmentId: "apt-030", patientId: "pt-038", patientName: "Sneha Kulkarni", doctorName: "Dr. Anjali Reddy", date: "2026-02-19", medications: [{ name: "Dienogest", dosage: "2mg", frequency: "Once daily", duration: "90 days" }, { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "PRN" }], diagnosis: "Endometriosis", notes: "Monitor symptoms. MRI follow-up in 3 months." },
  { id: "rx-020", appointmentId: "apt-031", patientId: "pt-039", patientName: "Vivek Choudhary", doctorName: "Dr. Sunita Sharma", date: "2026-02-18", medications: [{ name: "Tiotropium inhaler", dosage: "18mcg", frequency: "Once daily", duration: "30 days" }, { name: "Salbutamol inhaler", dosage: "100mcg", frequency: "As needed", duration: "PRN" }, { name: "Enalapril", dosage: "5mg", frequency: "Once daily", duration: "30 days" }], diagnosis: "COPD, Hypertension", notes: "Pulmonary rehab referral. Quit smoking counseling." },
  { id: "rx-021", appointmentId: "apt-032", patientId: "pt-040", patientName: "Geeta Mohan", doctorName: "Dr. Rajiv Mehta", date: "2026-02-18", medications: [{ name: "Methotrexate", dosage: "10mg", frequency: "Once weekly", duration: "12 weeks" }, { name: "Folic Acid", dosage: "5mg", frequency: "Once daily (except MTX day)", duration: "12 weeks" }], diagnosis: "Rheumatoid arthritis", notes: "Monitor CBC and LFT monthly. Watch for infections." },
  { id: "rx-022", appointmentId: "apt-033", patientId: "pt-015", patientName: "Siddharth Rao", doctorName: "Dr. Arun Kumar", date: "2026-02-18", medications: [{ name: "Budesonide inhaler", dosage: "200mcg", frequency: "Twice daily", duration: "30 days" }, { name: "Montelukast", dosage: "10mg", frequency: "Once at night", duration: "30 days" }], diagnosis: "Bronchial asthma", notes: "Peak flow monitoring. Avoid triggers." },
  { id: "rx-023", appointmentId: "apt-035", patientId: "pt-018", patientName: "Riya Chatterjee", doctorName: "Dr. Priya Venkatesh", date: "2026-02-17", medications: [{ name: "Hydrocortisone cream", dosage: "Apply thin layer", frequency: "Twice daily", duration: "7 days" }, { name: "Levocetirizine", dosage: "5mg", frequency: "Once at night", duration: "7 days" }], diagnosis: "Contact dermatitis", notes: "Identify and avoid allergen. Moisturize regularly." },
  { id: "rx-024", appointmentId: "apt-041", patientId: "pt-001", patientName: "Aarav Sharma", doctorName: "Dr. Sunita Sharma", date: "2026-02-10", medications: [{ name: "Losartan", dosage: "50mg", frequency: "Once daily", duration: "30 days" }, { name: "Aspirin", dosage: "75mg", frequency: "Once daily", duration: "30 days" }], diagnosis: "Hypertension", notes: "ECG normal. Continue current regime." },
  { id: "rx-025", appointmentId: "apt-042", patientId: "pt-007", patientName: "Kabir Singh", doctorName: "Dr. Arun Kumar", date: "2026-02-12", medications: [{ name: "Atorvastatin", dosage: "20mg", frequency: "Once at night", duration: "30 days" }, { name: "Olmesartan", dosage: "20mg", frequency: "Once daily", duration: "30 days" }], diagnosis: "Hypertension, Hyperlipidemia", notes: "Lipid profile improved. Maintain diet." },
  { id: "rx-026", appointmentId: "apt-046", patientId: "pt-010", patientName: "Saanvi Joshi", doctorName: "Dr. Arun Kumar", date: "2026-02-13", medications: [{ name: "Levothyroxine", dosage: "50mcg", frequency: "Once daily before breakfast", duration: "90 days" }], diagnosis: "Hypothyroidism", notes: "TSH levels improving. Continue current dose." },
  { id: "rx-027", appointmentId: "apt-037", patientId: "pt-009", patientName: "Rohan Deshmukh", doctorName: "Dr. Arun Kumar", date: "2026-01-10", medications: [{ name: "Paracetamol", dosage: "650mg", frequency: "Three times daily", duration: "3 days" }, { name: "Cetirizine", dosage: "10mg", frequency: "Once at night", duration: "5 days" }], diagnosis: "Upper respiratory tract infection", notes: "Plenty of fluids and rest." },
  { id: "rx-028", appointmentId: "apt-034", patientId: "pt-012", patientName: "Pooja Menon", doctorName: "Dr. Sanjay Gupta", date: "2026-02-18", medications: [{ name: "Lubricating eye drops", dosage: "1-2 drops", frequency: "Four times daily", duration: "30 days" }], diagnosis: "Computer vision syndrome", notes: "Follow 20-20-20 rule. Reduce screen time." },
  { id: "rx-029", appointmentId: "apt-047", patientId: "pt-034", patientName: "Divya Ramesh", doctorName: "Dr. Arun Kumar", date: "2026-02-11", medications: [{ name: "Paracetamol", dosage: "500mg", frequency: "Three times daily", duration: "3 days" }, { name: "Vitamin C", dosage: "500mg", frequency: "Once daily", duration: "14 days" }], diagnosis: "Viral fever recovery", notes: "Rest and hydration. CBC normal." },
  { id: "rx-030", appointmentId: "apt-050", patientId: "pt-025", patientName: "Rajesh Pillai", doctorName: "Dr. Sanjay Gupta", date: "2026-02-23", medications: [{ name: "Brimonidine eye drops", dosage: "1 drop each eye", frequency: "Twice daily", duration: "30 days" }], diagnosis: "Early glaucoma suspect", notes: "IOP borderline elevated. Visual field test in 3 months." },
];

// ──────────────────────────────────────────────
// LAB RESULTS (25)
// ──────────────────────────────────────────────
export const labResults: LabResult[] = [
  { id: "lr-001", patientId: "pt-003", patientName: "Vihaan Reddy", testName: "HbA1c", category: "blood", date: "2026-02-22", status: "abnormal", results: { "HbA1c": { value: "8.2%", reference: "4.0-5.6%", flag: "high" }, "Fasting Glucose": { value: "156 mg/dL", reference: "70-100 mg/dL", flag: "high" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-002", patientId: "pt-001", patientName: "Aarav Sharma", testName: "Lipid Profile", category: "blood", date: "2026-02-22", status: "completed", results: { "Total Cholesterol": { value: "195 mg/dL", reference: "<200 mg/dL", flag: "normal" }, "LDL": { value: "118 mg/dL", reference: "<130 mg/dL", flag: "normal" }, "HDL": { value: "48 mg/dL", reference: ">40 mg/dL", flag: "normal" }, "Triglycerides": { value: "145 mg/dL", reference: "<150 mg/dL", flag: "normal" } }, orderedBy: "Dr. Sunita Sharma" },
  { id: "lr-003", patientId: "pt-014", patientName: "Neha Bhatt", testName: "Complete Blood Count", category: "blood", date: "2026-02-22", status: "abnormal", results: { "Hemoglobin": { value: "9.2 g/dL", reference: "12-16 g/dL", flag: "low" }, "RBC": { value: "3.5 M/uL", reference: "4.0-5.5 M/uL", flag: "low" }, "WBC": { value: "6800 /uL", reference: "4500-11000 /uL", flag: "normal" }, "Platelets": { value: "210000 /uL", reference: "150000-400000 /uL", flag: "normal" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-004", patientId: "pt-007", patientName: "Kabir Singh", testName: "Lipid Profile", category: "blood", date: "2026-02-21", status: "abnormal", results: { "Total Cholesterol": { value: "248 mg/dL", reference: "<200 mg/dL", flag: "high" }, "LDL": { value: "162 mg/dL", reference: "<130 mg/dL", flag: "high" }, "HDL": { value: "38 mg/dL", reference: ">40 mg/dL", flag: "low" }, "Triglycerides": { value: "198 mg/dL", reference: "<150 mg/dL", flag: "high" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-005", patientId: "pt-010", patientName: "Saanvi Joshi", testName: "Thyroid Function Test", category: "blood", date: "2026-02-21", status: "completed", results: { "TSH": { value: "3.8 mIU/L", reference: "0.4-4.0 mIU/L", flag: "normal" }, "Free T4": { value: "1.1 ng/dL", reference: "0.8-1.8 ng/dL", flag: "normal" }, "Free T3": { value: "2.9 pg/mL", reference: "2.3-4.2 pg/mL", flag: "normal" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-006", patientId: "pt-024", patientName: "Anjali Verma", testName: "Thyroid Function Test", category: "blood", date: "2026-02-21", status: "abnormal", results: { "TSH": { value: "8.5 mIU/L", reference: "0.4-4.0 mIU/L", flag: "high" }, "Free T4": { value: "0.6 ng/dL", reference: "0.8-1.8 ng/dL", flag: "low" }, "Free T3": { value: "1.8 pg/mL", reference: "2.3-4.2 pg/mL", flag: "low" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-007", patientId: "pt-021", patientName: "Manish Saxena", testName: "Renal Function Test", category: "blood", date: "2026-02-20", status: "completed", results: { "Creatinine": { value: "1.1 mg/dL", reference: "0.7-1.3 mg/dL", flag: "normal" }, "BUN": { value: "18 mg/dL", reference: "7-20 mg/dL", flag: "normal" }, "eGFR": { value: "82 mL/min", reference: ">60 mL/min", flag: "normal" } }, orderedBy: "Dr. Sunita Sharma" },
  { id: "lr-008", patientId: "pt-013", patientName: "Harsh Trivedi", testName: "HbA1c", category: "blood", date: "2026-02-20", status: "abnormal", results: { "HbA1c": { value: "7.8%", reference: "4.0-5.6%", flag: "high" }, "Fasting Glucose": { value: "142 mg/dL", reference: "70-100 mg/dL", flag: "high" }, "Post-prandial Glucose": { value: "210 mg/dL", reference: "<140 mg/dL", flag: "high" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-009", patientId: "pt-019", patientName: "Vikram Thakur", testName: "Urine Routine", category: "urine", date: "2026-02-20", status: "completed", results: { "pH": { value: "6.0", reference: "4.5-8.0", flag: "normal" }, "Protein": { value: "Nil", reference: "Nil", flag: "normal" }, "Glucose": { value: "Nil", reference: "Nil", flag: "normal" }, "RBC": { value: "0-2 /hpf", reference: "0-3 /hpf", flag: "normal" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-010", patientId: "pt-039", patientName: "Vivek Choudhary", testName: "Chest X-Ray", category: "imaging", date: "2026-02-18", status: "completed", results: { "Findings": { value: "Hyperinflated lungs, flattened diaphragm", reference: "Normal", flag: "high" }, "Impression": { value: "COPD changes", reference: "Normal", flag: "high" } }, orderedBy: "Dr. Sunita Sharma" },
  { id: "lr-011", patientId: "pt-029", patientName: "Suresh Bhat", testName: "HbA1c", category: "blood", date: "2026-02-19", status: "abnormal", results: { "HbA1c": { value: "9.1%", reference: "4.0-5.6%", flag: "high" }, "Fasting Glucose": { value: "178 mg/dL", reference: "70-100 mg/dL", flag: "high" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-012", patientId: "pt-008", patientName: "Meera Krishnan", testName: "Hormonal Panel", category: "blood", date: "2026-02-22", status: "abnormal", results: { "LH": { value: "12.5 mIU/mL", reference: "2-15 mIU/mL", flag: "normal" }, "FSH": { value: "5.8 mIU/mL", reference: "3-10 mIU/mL", flag: "normal" }, "Testosterone": { value: "85 ng/dL", reference: "15-70 ng/dL", flag: "high" }, "DHEAS": { value: "420 mcg/dL", reference: "65-380 mcg/dL", flag: "high" } }, orderedBy: "Dr. Anjali Reddy" },
  { id: "lr-013", patientId: "pt-025", patientName: "Rajesh Pillai", testName: "Liver Function Test", category: "blood", date: "2026-02-19", status: "completed", results: { "SGOT": { value: "28 U/L", reference: "8-45 U/L", flag: "normal" }, "SGPT": { value: "32 U/L", reference: "7-56 U/L", flag: "normal" }, "Bilirubin": { value: "0.8 mg/dL", reference: "0.1-1.2 mg/dL", flag: "normal" }, "Albumin": { value: "4.1 g/dL", reference: "3.5-5.0 g/dL", flag: "normal" } }, orderedBy: "Dr. Rajiv Mehta" },
  { id: "lr-014", patientId: "pt-040", patientName: "Geeta Mohan", testName: "ESR & CRP", category: "blood", date: "2026-02-18", status: "abnormal", results: { "ESR": { value: "42 mm/hr", reference: "0-20 mm/hr", flag: "high" }, "CRP": { value: "18.5 mg/L", reference: "<5 mg/L", flag: "high" }, "RA Factor": { value: "64 IU/mL", reference: "<14 IU/mL", flag: "high" } }, orderedBy: "Dr. Rajiv Mehta" },
  { id: "lr-015", patientId: "pt-002", patientName: "Diya Patel", testName: "Complete Blood Count", category: "blood", date: "2026-02-20", status: "completed", results: { "Hemoglobin": { value: "13.5 g/dL", reference: "12-16 g/dL", flag: "normal" }, "WBC": { value: "7200 /uL", reference: "4500-11000 /uL", flag: "normal" }, "Platelets": { value: "245000 /uL", reference: "150000-400000 /uL", flag: "normal" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-016", patientId: "pt-015", patientName: "Siddharth Rao", testName: "Pulmonary Function Test", category: "other", date: "2026-02-18", status: "completed", results: { "FEV1": { value: "78%", reference: ">80%", flag: "low" }, "FVC": { value: "85%", reference: ">80%", flag: "normal" }, "FEV1/FVC": { value: "72%", reference: ">70%", flag: "normal" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-017", patientId: "pt-037", patientName: "Rahul Goswami", testName: "ECG", category: "other", date: "2026-02-23", status: "pending", results: {}, orderedBy: "Dr. Sunita Sharma" },
  { id: "lr-018", patientId: "pt-005", patientName: "Arjun Nair", testName: "Knee X-Ray", category: "imaging", date: "2026-02-23", status: "pending", results: {}, orderedBy: "Dr. Rajiv Mehta" },
  { id: "lr-019", patientId: "pt-030", patientName: "Lakshmi Menon", testName: "ECG", category: "other", date: "2026-02-20", status: "completed", results: { "Heart Rate": { value: "76 bpm", reference: "60-100 bpm", flag: "normal" }, "Rhythm": { value: "Normal sinus", reference: "Normal sinus", flag: "normal" }, "Impression": { value: "Normal ECG", reference: "Normal", flag: "normal" } }, orderedBy: "Dr. Sunita Sharma" },
  { id: "lr-020", patientId: "pt-011", patientName: "Aditya Kulkarni", testName: "Spine MRI", category: "imaging", date: "2026-02-22", status: "completed", results: { "Findings": { value: "L4-L5 disc bulge with mild canal stenosis", reference: "Normal", flag: "high" }, "Impression": { value: "Degenerative disc disease", reference: "Normal", flag: "high" } }, orderedBy: "Dr. Rajiv Mehta" },
  { id: "lr-021", patientId: "pt-032", patientName: "Swati Desai", testName: "Complete Blood Count", category: "blood", date: "2026-02-14", status: "abnormal", results: { "Hemoglobin": { value: "10.1 g/dL", reference: "12-16 g/dL", flag: "low" }, "RBC": { value: "3.8 M/uL", reference: "4.0-5.5 M/uL", flag: "low" }, "MCV": { value: "68 fL", reference: "80-100 fL", flag: "low" }, "WBC": { value: "7100 /uL", reference: "4500-11000 /uL", flag: "normal" } }, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-022", patientId: "pt-021", patientName: "Manish Saxena", testName: "HbA1c", category: "blood", date: "2026-02-23", status: "pending", results: {}, orderedBy: "Dr. Arun Kumar" },
  { id: "lr-023", patientId: "pt-035", patientName: "Amit Tiwari", testName: "Serum Uric Acid", category: "blood", date: "2026-02-19", status: "abnormal", results: { "Uric Acid": { value: "9.2 mg/dL", reference: "3.5-7.2 mg/dL", flag: "high" } }, orderedBy: "Dr. Rajiv Mehta" },
  { id: "lr-024", patientId: "pt-004", patientName: "Ananya Iyer", testName: "Spirometry", category: "other", date: "2026-02-23", status: "pending", results: {}, orderedBy: "Dr. Kavitha Nair" },
  { id: "lr-025", patientId: "pt-028", patientName: "Nisha Kapoor", testName: "Pelvic Ultrasound", category: "imaging", date: "2026-02-20", status: "completed", results: { "Uterus": { value: "Normal size and echotexture", reference: "Normal", flag: "normal" }, "Ovaries": { value: "Bilateral polycystic ovaries (>12 follicles each)", reference: "Normal", flag: "high" }, "Impression": { value: "PCOS", reference: "Normal", flag: "high" } }, orderedBy: "Dr. Anjali Reddy" },
];

// ──────────────────────────────────────────────
// CHART / AGGREGATE DATA
// ──────────────────────────────────────────────
export const appointmentsByDay = [
  { day: "Mon", appointments: 12 },
  { day: "Tue", appointments: 15 },
  { day: "Wed", appointments: 10 },
  { day: "Thu", appointments: 14 },
  { day: "Fri", appointments: 18 },
  { day: "Sat", appointments: 8 },
  { day: "Sun", appointments: 0 },
];

export const vitalsHistory = [
  { date: "Jan", systolic: 130, diastolic: 85, heartRate: 78, weight: 72 },
  { date: "Feb", systolic: 128, diastolic: 82, heartRate: 76, weight: 71.5 },
  { date: "Mar", systolic: 132, diastolic: 86, heartRate: 80, weight: 72.2 },
  { date: "Apr", systolic: 126, diastolic: 80, heartRate: 74, weight: 71 },
  { date: "May", systolic: 124, diastolic: 78, heartRate: 72, weight: 70.5 },
  { date: "Jun", systolic: 122, diastolic: 76, heartRate: 70, weight: 70 },
];

export const doctorRatingTrend = [
  { month: "Sep", rating: 4.5 },
  { month: "Oct", rating: 4.6 },
  { month: "Nov", rating: 4.7 },
  { month: "Dec", rating: 4.6 },
  { month: "Jan", rating: 4.8 },
  { month: "Feb", rating: 4.9 },
];

// ──────────────────────────────────────────────
// HELPER FUNCTIONS
// ──────────────────────────────────────────────
export function getPatientById(id: string): Patient | undefined {
  return patients.find((p) => p.id === id);
}

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

export function getAppointmentsByPatient(patientId: string): MedicalAppointment[] {
  return medicalAppointments.filter((a) => a.patientId === patientId);
}

export function getPrescriptionsByPatient(patientId: string): Prescription[] {
  return prescriptions.filter((p) => p.patientId === patientId);
}

export function getLabResultsByPatient(patientId: string): LabResult[] {
  return labResults.filter((l) => l.patientId === patientId);
}
