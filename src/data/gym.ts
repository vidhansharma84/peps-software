// ──────────────────────────────────────────────
// Gym Module — Dummy Data
// ──────────────────────────────────────────────

export interface GymMember {
  id: string;
  name: string;
  email: string;
  plan: "Basic" | "Silver" | "Gold" | "Platinum" | "Student";
  planExpiry: string;
  status: "active" | "expired" | "frozen";
  joinDate: string;
  lastVisit: string;
  totalVisits: number;
  phone: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: "Cardio" | "Strength" | "Flexibility" | "Functional";
  brand: string;
  status: "operational" | "maintenance" | "out_of_order";
  location: string;
  purchaseDate: string;
}

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  schedule: { day: string; startTime: string; endTime: string };
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  memberCount: number;
  status: "active" | "on_leave";
  phone: string;
  email: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  subscriberCount: number;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  checkIn: string;
  checkOut: string | null;
  date: string;
}

// ──────────────────────────────────────────────
// GYM MEMBERS (30)
// ──────────────────────────────────────────────
export const gymMembers: GymMember[] = [
  { id: "gm-001", name: "Aarav Sharma", email: "aarav.sharma@peps.edu.in", plan: "Platinum", planExpiry: "2026-06-15", status: "active", joinDate: "2024-06-15", lastVisit: "2026-02-22", totalVisits: 312, phone: "+91 98765 10001" },
  { id: "gm-002", name: "Diya Patel", email: "diya.patel@peps.edu.in", plan: "Gold", planExpiry: "2026-05-20", status: "active", joinDate: "2024-08-20", lastVisit: "2026-02-23", totalVisits: 245, phone: "+91 98765 10002" },
  { id: "gm-003", name: "Vihaan Reddy", email: "vihaan.reddy@peps.edu.in", plan: "Silver", planExpiry: "2026-03-10", status: "active", joinDate: "2025-03-10", lastVisit: "2026-02-21", totalVisits: 178, phone: "+91 98765 10003" },
  { id: "gm-004", name: "Ananya Iyer", email: "ananya.iyer@peps.edu.in", plan: "Basic", planExpiry: "2026-01-15", status: "expired", joinDate: "2025-01-15", lastVisit: "2026-01-10", totalVisits: 89, phone: "+91 98765 10004" },
  { id: "gm-005", name: "Arjun Nair", email: "arjun.nair@peps.edu.in", plan: "Platinum", planExpiry: "2026-08-01", status: "active", joinDate: "2024-02-01", lastVisit: "2026-02-23", totalVisits: 420, phone: "+91 98765 10005" },
  { id: "gm-006", name: "Ishita Gupta", email: "ishita.gupta@peps.edu.in", plan: "Student", planExpiry: "2026-07-31", status: "active", joinDate: "2025-08-01", lastVisit: "2026-02-22", totalVisits: 134, phone: "+91 98765 10006" },
  { id: "gm-007", name: "Kabir Singh", email: "kabir.singh@peps.edu.in", plan: "Gold", planExpiry: "2026-04-18", status: "frozen", joinDate: "2024-10-18", lastVisit: "2025-12-15", totalVisits: 201, phone: "+91 98765 10007" },
  { id: "gm-008", name: "Meera Krishnan", email: "meera.krishnan@peps.edu.in", plan: "Silver", planExpiry: "2026-02-28", status: "active", joinDate: "2025-02-28", lastVisit: "2026-02-20", totalVisits: 156, phone: "+91 98765 10008" },
  { id: "gm-009", name: "Rohan Deshmukh", email: "rohan.deshmukh@peps.edu.in", plan: "Basic", planExpiry: "2025-12-01", status: "expired", joinDate: "2025-06-01", lastVisit: "2025-11-28", totalVisits: 67, phone: "+91 98765 10009" },
  { id: "gm-010", name: "Saanvi Joshi", email: "saanvi.joshi@peps.edu.in", plan: "Platinum", planExpiry: "2026-09-10", status: "active", joinDate: "2024-03-10", lastVisit: "2026-02-23", totalVisits: 389, phone: "+91 98765 10010" },
  { id: "gm-011", name: "Aditya Kulkarni", email: "aditya.kulkarni@peps.edu.in", plan: "Gold", planExpiry: "2026-05-05", status: "active", joinDate: "2024-11-05", lastVisit: "2026-02-22", totalVisits: 198, phone: "+91 98765 10011" },
  { id: "gm-012", name: "Pooja Menon", email: "pooja.menon@peps.edu.in", plan: "Student", planExpiry: "2026-07-31", status: "active", joinDate: "2025-08-01", lastVisit: "2026-02-21", totalVisits: 112, phone: "+91 98765 10012" },
  { id: "gm-013", name: "Harsh Trivedi", email: "harsh.trivedi@peps.edu.in", plan: "Silver", planExpiry: "2026-04-22", status: "active", joinDate: "2025-04-22", lastVisit: "2026-02-19", totalVisits: 143, phone: "+91 98765 10013" },
  { id: "gm-014", name: "Neha Bhatt", email: "neha.bhatt@peps.edu.in", plan: "Basic", planExpiry: "2026-03-15", status: "active", joinDate: "2025-09-15", lastVisit: "2026-02-18", totalVisits: 78, phone: "+91 98765 10014" },
  { id: "gm-015", name: "Siddharth Rao", email: "siddharth.rao@peps.edu.in", plan: "Platinum", planExpiry: "2026-10-20", status: "active", joinDate: "2024-04-20", lastVisit: "2026-02-23", totalVisits: 356, phone: "+91 98765 10015" },
  { id: "gm-016", name: "Kavya Sundaram", email: "kavya.sundaram@peps.edu.in", plan: "Gold", planExpiry: "2025-11-30", status: "expired", joinDate: "2024-11-30", lastVisit: "2025-11-25", totalVisits: 165, phone: "+91 98765 10016" },
  { id: "gm-017", name: "Pranav Hegde", email: "pranav.hegde@peps.edu.in", plan: "Student", planExpiry: "2026-07-31", status: "active", joinDate: "2025-08-01", lastVisit: "2026-02-22", totalVisits: 98, phone: "+91 98765 10017" },
  { id: "gm-018", name: "Riya Chatterjee", email: "riya.chatterjee@peps.edu.in", plan: "Silver", planExpiry: "2026-06-08", status: "frozen", joinDate: "2025-06-08", lastVisit: "2026-01-05", totalVisits: 87, phone: "+91 98765 10018" },
  { id: "gm-019", name: "Vikram Thakur", email: "vikram.thakur@peps.edu.in", plan: "Gold", planExpiry: "2026-07-14", status: "active", joinDate: "2025-01-14", lastVisit: "2026-02-23", totalVisits: 210, phone: "+91 98765 10019" },
  { id: "gm-020", name: "Tanvi Agarwal", email: "tanvi.agarwal@peps.edu.in", plan: "Basic", planExpiry: "2026-04-01", status: "active", joinDate: "2025-10-01", lastVisit: "2026-02-20", totalVisits: 56, phone: "+91 98765 10020" },
  { id: "gm-021", name: "Manish Saxena", email: "manish.saxena@peps.edu.in", plan: "Platinum", planExpiry: "2026-11-05", status: "active", joinDate: "2024-05-05", lastVisit: "2026-02-22", totalVisits: 378, phone: "+91 98765 10021" },
  { id: "gm-022", name: "Shreya Pandey", email: "shreya.pandey@peps.edu.in", plan: "Student", planExpiry: "2026-07-31", status: "active", joinDate: "2025-08-01", lastVisit: "2026-02-21", totalVisits: 105, phone: "+91 98765 10022" },
  { id: "gm-023", name: "Deepak Chauhan", email: "deepak.chauhan@peps.edu.in", plan: "Gold", planExpiry: "2026-08-20", status: "active", joinDate: "2025-02-20", lastVisit: "2026-02-23", totalVisits: 187, phone: "+91 98765 10023" },
  { id: "gm-024", name: "Anjali Verma", email: "anjali.verma2@peps.edu.in", plan: "Silver", planExpiry: "2025-10-15", status: "expired", joinDate: "2025-04-15", lastVisit: "2025-10-12", totalVisits: 72, phone: "+91 98765 10024" },
  { id: "gm-025", name: "Rajesh Pillai", email: "rajesh.pillai@peps.edu.in", plan: "Basic", planExpiry: "2026-05-28", status: "active", joinDate: "2025-11-28", lastVisit: "2026-02-19", totalVisits: 42, phone: "+91 98765 10025" },
  { id: "gm-026", name: "Priya Nambiar", email: "priya.nambiar@peps.edu.in", plan: "Platinum", planExpiry: "2026-12-01", status: "active", joinDate: "2024-06-01", lastVisit: "2026-02-23", totalVisits: 345, phone: "+91 98765 10026" },
  { id: "gm-027", name: "Karan Malhotra", email: "karan.malhotra@peps.edu.in", plan: "Gold", planExpiry: "2026-03-30", status: "frozen", joinDate: "2024-09-30", lastVisit: "2026-01-20", totalVisits: 176, phone: "+91 98765 10027" },
  { id: "gm-028", name: "Swati Bhandari", email: "swati.bhandari@peps.edu.in", plan: "Student", planExpiry: "2026-07-31", status: "active", joinDate: "2025-08-01", lastVisit: "2026-02-22", totalVisits: 118, phone: "+91 98765 10028" },
  { id: "gm-029", name: "Nitin Wagh", email: "nitin.wagh@peps.edu.in", plan: "Silver", planExpiry: "2026-06-15", status: "active", joinDate: "2025-06-15", lastVisit: "2026-02-21", totalVisits: 132, phone: "+91 98765 10029" },
  { id: "gm-030", name: "Divya Srinivasan", email: "divya.srinivasan@peps.edu.in", plan: "Gold", planExpiry: "2026-09-25", status: "active", joinDate: "2025-03-25", lastVisit: "2026-02-23", totalVisits: 167, phone: "+91 98765 10030" },
];

// ──────────────────────────────────────────────
// EQUIPMENT (20)
// ──────────────────────────────────────────────
export const equipment: Equipment[] = [
  { id: "eq-001", name: "Treadmill Pro X500", category: "Cardio", brand: "Life Fitness", status: "operational", location: "Cardio Zone A", purchaseDate: "2023-06-15" },
  { id: "eq-002", name: "Treadmill Pro X500", category: "Cardio", brand: "Life Fitness", status: "operational", location: "Cardio Zone A", purchaseDate: "2023-06-15" },
  { id: "eq-003", name: "Elliptical Trainer E7", category: "Cardio", brand: "Precor", status: "operational", location: "Cardio Zone A", purchaseDate: "2023-07-20" },
  { id: "eq-004", name: "Stationary Bike S200", category: "Cardio", brand: "Schwinn", status: "maintenance", location: "Cardio Zone B", purchaseDate: "2023-08-10" },
  { id: "eq-005", name: "Rowing Machine RW900", category: "Cardio", brand: "NordicTrack", status: "operational", location: "Cardio Zone B", purchaseDate: "2024-01-05" },
  { id: "eq-006", name: "Bench Press Station", category: "Strength", brand: "Hammer Strength", status: "operational", location: "Strength Zone", purchaseDate: "2023-05-10" },
  { id: "eq-007", name: "Squat Rack Power Cage", category: "Strength", brand: "Rogue Fitness", status: "operational", location: "Strength Zone", purchaseDate: "2023-05-10" },
  { id: "eq-008", name: "Lat Pulldown Machine", category: "Strength", brand: "Cybex", status: "out_of_order", location: "Strength Zone", purchaseDate: "2023-06-01" },
  { id: "eq-009", name: "Leg Press 45-Degree", category: "Strength", brand: "Hammer Strength", status: "operational", location: "Strength Zone", purchaseDate: "2023-09-15" },
  { id: "eq-010", name: "Cable Crossover Machine", category: "Strength", brand: "Life Fitness", status: "operational", location: "Strength Zone", purchaseDate: "2024-02-20" },
  { id: "eq-011", name: "Dumbbell Set (5-50 kg)", category: "Strength", brand: "Bullrock", status: "operational", location: "Free Weights Area", purchaseDate: "2023-05-01" },
  { id: "eq-012", name: "Smith Machine", category: "Strength", brand: "Body-Solid", status: "maintenance", location: "Strength Zone", purchaseDate: "2023-07-01" },
  { id: "eq-013", name: "Yoga Mat Premium", category: "Flexibility", brand: "Manduka", status: "operational", location: "Yoga Studio", purchaseDate: "2024-03-10" },
  { id: "eq-014", name: "Foam Roller Set", category: "Flexibility", brand: "TriggerPoint", status: "operational", location: "Stretching Area", purchaseDate: "2024-04-15" },
  { id: "eq-015", name: "Resistance Band Kit", category: "Flexibility", brand: "Theraband", status: "operational", location: "Stretching Area", purchaseDate: "2024-06-01" },
  { id: "eq-016", name: "Pilates Reformer", category: "Flexibility", brand: "Balanced Body", status: "operational", location: "Yoga Studio", purchaseDate: "2024-08-20" },
  { id: "eq-017", name: "Battle Ropes 15m", category: "Functional", brand: "Rogue Fitness", status: "operational", location: "Functional Zone", purchaseDate: "2023-10-05" },
  { id: "eq-018", name: "Kettlebell Set (4-32 kg)", category: "Functional", brand: "Bullrock", status: "operational", location: "Functional Zone", purchaseDate: "2023-11-15" },
  { id: "eq-019", name: "TRX Suspension Trainer", category: "Functional", brand: "TRX", status: "out_of_order", location: "Functional Zone", purchaseDate: "2024-01-20" },
  { id: "eq-020", name: "Plyo Box Set", category: "Functional", brand: "Rogue Fitness", status: "operational", location: "Functional Zone", purchaseDate: "2024-05-10" },
];

// ──────────────────────────────────────────────
// GYM CLASSES (12)
// ──────────────────────────────────────────────
export const gymClasses: GymClass[] = [
  { id: "gc-001", name: "Power Yoga", instructor: "Meera Krishnan", capacity: 25, enrolled: 22, schedule: { day: "Monday", startTime: "06:00", endTime: "07:00" }, category: "Yoga", level: "Intermediate" },
  { id: "gc-002", name: "HIIT Blast", instructor: "Arjun Nair", capacity: 20, enrolled: 18, schedule: { day: "Monday", startTime: "07:30", endTime: "08:15" }, category: "Cardio", level: "Advanced" },
  { id: "gc-003", name: "Spin Cycle", instructor: "Deepak Chauhan", capacity: 15, enrolled: 15, schedule: { day: "Tuesday", startTime: "06:30", endTime: "07:15" }, category: "Cardio", level: "All Levels" },
  { id: "gc-004", name: "Strength Foundations", instructor: "Vikram Thakur", capacity: 12, enrolled: 9, schedule: { day: "Tuesday", startTime: "08:00", endTime: "09:00" }, category: "Strength", level: "Beginner" },
  { id: "gc-005", name: "Zumba Fitness", instructor: "Priya Nambiar", capacity: 30, enrolled: 27, schedule: { day: "Wednesday", startTime: "06:00", endTime: "07:00" }, category: "Dance", level: "All Levels" },
  { id: "gc-006", name: "CrossFit WOD", instructor: "Kabir Singh", capacity: 15, enrolled: 13, schedule: { day: "Wednesday", startTime: "07:30", endTime: "08:30" }, category: "Functional", level: "Advanced" },
  { id: "gc-007", name: "Pilates Core", instructor: "Saanvi Joshi", capacity: 20, enrolled: 16, schedule: { day: "Thursday", startTime: "06:00", endTime: "07:00" }, category: "Flexibility", level: "Intermediate" },
  { id: "gc-008", name: "Boxing Fitness", instructor: "Rohan Deshmukh", capacity: 12, enrolled: 10, schedule: { day: "Thursday", startTime: "17:00", endTime: "18:00" }, category: "Combat", level: "Intermediate" },
  { id: "gc-009", name: "Morning Stretch", instructor: "Meera Krishnan", capacity: 30, enrolled: 14, schedule: { day: "Friday", startTime: "06:00", endTime: "06:45" }, category: "Flexibility", level: "Beginner" },
  { id: "gc-010", name: "Powerlifting Club", instructor: "Vikram Thakur", capacity: 10, enrolled: 8, schedule: { day: "Friday", startTime: "16:00", endTime: "17:30" }, category: "Strength", level: "Advanced" },
  { id: "gc-011", name: "Aqua Aerobics", instructor: "Tanvi Agarwal", capacity: 20, enrolled: 12, schedule: { day: "Saturday", startTime: "07:00", endTime: "08:00" }, category: "Cardio", level: "All Levels" },
  { id: "gc-012", name: "Weekend Warrior HIIT", instructor: "Arjun Nair", capacity: 25, enrolled: 23, schedule: { day: "Saturday", startTime: "09:00", endTime: "10:00" }, category: "Cardio", level: "Intermediate" },
];

// ──────────────────────────────────────────────
// TRAINERS (6)
// ──────────────────────────────────────────────
export const trainers: Trainer[] = [
  { id: "tr-001", name: "Rahul Kapoor", specialization: "Strength & Conditioning", experience: 8, rating: 4.8, memberCount: 24, status: "active", phone: "+91 99887 10001", email: "rahul.kapoor@peps.edu.in" },
  { id: "tr-002", name: "Sunita Sharma", specialization: "Yoga & Mindfulness", experience: 12, rating: 4.9, memberCount: 32, status: "active", phone: "+91 99887 10002", email: "sunita.sharma@peps.edu.in" },
  { id: "tr-003", name: "Amit Desai", specialization: "CrossFit & Functional Training", experience: 6, rating: 4.6, memberCount: 18, status: "active", phone: "+91 99887 10003", email: "amit.desai@peps.edu.in" },
  { id: "tr-004", name: "Kavitha Rajan", specialization: "Weight Loss & Nutrition", experience: 10, rating: 4.7, memberCount: 28, status: "active", phone: "+91 99887 10004", email: "kavitha.rajan@peps.edu.in" },
  { id: "tr-005", name: "Vikas Yadav", specialization: "Sports Performance", experience: 5, rating: 4.5, memberCount: 15, status: "on_leave", phone: "+91 99887 10005", email: "vikas.yadav@peps.edu.in" },
  { id: "tr-006", name: "Prerna Mehta", specialization: "Pilates & Rehabilitation", experience: 7, rating: 4.8, memberCount: 21, status: "active", phone: "+91 99887 10006", email: "prerna.mehta@peps.edu.in" },
];

// ──────────────────────────────────────────────
// MEMBERSHIP PLANS (5)
// ──────────────────────────────────────────────
export const membershipPlans: MembershipPlan[] = [
  {
    id: "mp-001",
    name: "Basic",
    price: 1500,
    duration: "month",
    subscriberCount: 45,
    features: [
      "Access to gym floor",
      "Locker facility",
      "Basic fitness assessment",
      "Access during off-peak hours (6 AM - 4 PM)",
    ],
  },
  {
    id: "mp-002",
    name: "Silver",
    price: 2500,
    duration: "month",
    subscriberCount: 62,
    features: [
      "Full gym access (all hours)",
      "Locker facility",
      "Monthly fitness assessment",
      "2 group classes per week",
      "Access to stretching area",
    ],
  },
  {
    id: "mp-003",
    name: "Gold",
    price: 4000,
    duration: "month",
    popular: true,
    subscriberCount: 78,
    features: [
      "Full gym access (all hours)",
      "Premium locker with towel service",
      "Bi-weekly fitness assessment",
      "Unlimited group classes",
      "1 personal training session/month",
      "Nutrition consultation",
      "Access to sauna & steam room",
    ],
  },
  {
    id: "mp-004",
    name: "Platinum",
    price: 6000,
    duration: "month",
    subscriberCount: 35,
    features: [
      "24/7 gym access",
      "VIP locker with amenities",
      "Weekly fitness assessment",
      "Unlimited group classes",
      "4 personal training sessions/month",
      "Personalized nutrition plan",
      "Sauna, steam room & jacuzzi",
      "Guest pass (2/month)",
      "Priority class booking",
      "Complimentary protein shake daily",
    ],
  },
  {
    id: "mp-005",
    name: "Student",
    price: 999,
    duration: "month",
    subscriberCount: 52,
    features: [
      "Full gym access (6 AM - 8 PM)",
      "Locker facility",
      "Monthly fitness assessment",
      "2 group classes per week",
      "Valid student ID required",
    ],
  },
];

// ──────────────────────────────────────────────
// ATTENDANCE RECORDS (20)
// ──────────────────────────────────────────────
export const attendanceRecords: AttendanceRecord[] = [
  { id: "ar-001", memberId: "gm-001", memberName: "Aarav Sharma", checkIn: "2026-02-23T05:45:00", checkOut: "2026-02-23T07:30:00", date: "2026-02-23" },
  { id: "ar-002", memberId: "gm-002", memberName: "Diya Patel", checkIn: "2026-02-23T06:00:00", checkOut: "2026-02-23T07:15:00", date: "2026-02-23" },
  { id: "ar-003", memberId: "gm-005", memberName: "Arjun Nair", checkIn: "2026-02-23T06:15:00", checkOut: "2026-02-23T08:00:00", date: "2026-02-23" },
  { id: "ar-004", memberId: "gm-010", memberName: "Saanvi Joshi", checkIn: "2026-02-23T06:30:00", checkOut: "2026-02-23T08:15:00", date: "2026-02-23" },
  { id: "ar-005", memberId: "gm-006", memberName: "Ishita Gupta", checkIn: "2026-02-23T07:00:00", checkOut: "2026-02-23T08:30:00", date: "2026-02-23" },
  { id: "ar-006", memberId: "gm-011", memberName: "Aditya Kulkarni", checkIn: "2026-02-23T07:15:00", checkOut: "2026-02-23T09:00:00", date: "2026-02-23" },
  { id: "ar-007", memberId: "gm-015", memberName: "Siddharth Rao", checkIn: "2026-02-23T07:30:00", checkOut: "2026-02-23T09:15:00", date: "2026-02-23" },
  { id: "ar-008", memberId: "gm-019", memberName: "Vikram Thakur", checkIn: "2026-02-23T08:00:00", checkOut: "2026-02-23T10:00:00", date: "2026-02-23" },
  { id: "ar-009", memberId: "gm-021", memberName: "Manish Saxena", checkIn: "2026-02-23T08:30:00", checkOut: "2026-02-23T10:30:00", date: "2026-02-23" },
  { id: "ar-010", memberId: "gm-023", memberName: "Deepak Chauhan", checkIn: "2026-02-23T09:00:00", checkOut: "2026-02-23T10:45:00", date: "2026-02-23" },
  { id: "ar-011", memberId: "gm-026", memberName: "Priya Nambiar", checkIn: "2026-02-23T09:30:00", checkOut: null, date: "2026-02-23" },
  { id: "ar-012", memberId: "gm-030", memberName: "Divya Srinivasan", checkIn: "2026-02-23T10:00:00", checkOut: null, date: "2026-02-23" },
  { id: "ar-013", memberId: "gm-003", memberName: "Vihaan Reddy", checkIn: "2026-02-23T10:15:00", checkOut: null, date: "2026-02-23" },
  { id: "ar-014", memberId: "gm-012", memberName: "Pooja Menon", checkIn: "2026-02-23T10:30:00", checkOut: null, date: "2026-02-23" },
  { id: "ar-015", memberId: "gm-017", memberName: "Pranav Hegde", checkIn: "2026-02-23T11:00:00", checkOut: null, date: "2026-02-23" },
  { id: "ar-016", memberId: "gm-013", memberName: "Harsh Trivedi", checkIn: "2026-02-23T15:00:00", checkOut: null, date: "2026-02-23" },
  { id: "ar-017", memberId: "gm-022", memberName: "Shreya Pandey", checkIn: "2026-02-23T16:00:00", checkOut: null, date: "2026-02-23" },
  { id: "ar-018", memberId: "gm-028", memberName: "Swati Bhandari", checkIn: "2026-02-23T16:30:00", checkOut: null, date: "2026-02-23" },
  { id: "ar-019", memberId: "gm-029", memberName: "Nitin Wagh", checkIn: "2026-02-23T17:00:00", checkOut: null, date: "2026-02-23" },
  { id: "ar-020", memberId: "gm-014", memberName: "Neha Bhatt", checkIn: "2026-02-23T17:30:00", checkOut: null, date: "2026-02-23" },
];

// ──────────────────────────────────────────────
// HELPER DATA
// ──────────────────────────────────────────────

export const weeklyAttendance = [
  { day: "Mon", visitors: 85 },
  { day: "Tue", visitors: 92 },
  { day: "Wed", visitors: 78 },
  { day: "Thu", visitors: 96 },
  { day: "Fri", visitors: 88 },
  { day: "Sat", visitors: 110 },
  { day: "Sun", visitors: 45 },
];

export const planColors: Record<string, string> = {
  Basic: "bg-gray-100 text-gray-700 border-gray-300",
  Silver: "bg-slate-100 text-slate-700 border-slate-300",
  Gold: "bg-amber-100 text-amber-700 border-amber-300",
  Platinum: "bg-violet-100 text-violet-700 border-violet-300",
  Student: "bg-blue-100 text-blue-700 border-blue-300",
};

// ──────────────────────────────────────────────
// HELPER FUNCTIONS
// ──────────────────────────────────────────────

export function getGymMemberById(id: string): GymMember | undefined {
  return gymMembers.find((m) => m.id === id);
}

export function getActiveMembers(): GymMember[] {
  return gymMembers.filter((m) => m.status === "active");
}

export function getMembersByPlan(plan: string): GymMember[] {
  return gymMembers.filter((m) => m.plan === plan);
}

export function getTodayAttendance(): AttendanceRecord[] {
  return attendanceRecords.filter((r) => r.date === "2026-02-23");
}

export function getOperationalEquipment(): Equipment[] {
  return equipment.filter((e) => e.status === "operational");
}

export function getMonthlyRevenue(): number {
  const planPrices: Record<string, number> = {
    Basic: 1500,
    Silver: 2500,
    Gold: 4000,
    Platinum: 6000,
    Student: 999,
  };
  return gymMembers
    .filter((m) => m.status === "active")
    .reduce((sum, m) => sum + (planPrices[m.plan] || 0), 0);
}
