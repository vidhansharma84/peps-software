// ──────────────────────────────────────────────
// Dormitories Module — Dummy Data
// ──────────────────────────────────────────────

export interface Building {
  id: string;
  name: string;
  floors: number;
  totalRooms: number;
  occupiedRooms: number;
  warden: string;
  contact: string;
}

export interface Room {
  id: string;
  buildingId: string;
  buildingName: string;
  floor: number;
  number: string;
  type: "single" | "double" | "triple";
  status: "occupied" | "vacant" | "maintenance" | "reserved";
  occupants: string[];
  amenities: string[];
  monthlyRent: number;
}

export interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomId: string;
  roomNumber: string;
  buildingName: string;
  department: string;
  joinDate: string;
  status: "active" | "checked_out";
}

export interface MaintenanceRequest {
  id: string;
  roomId: string;
  roomNumber: string;
  residentName: string;
  category: "electrical" | "plumbing" | "furniture" | "cleaning" | "other";
  description: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  resolvedAt: string | null;
}

export interface VisitorLog {
  id: string;
  visitorName: string;
  purpose: string;
  residentName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string | null;
  status: "checked_in" | "checked_out";
}

// ──────────────────────────────────────────────
// BUILDINGS (4)
// ──────────────────────────────────────────────
export const buildings: Building[] = [
  { id: "bld-001", name: "Aryabhata Block", floors: 3, totalRooms: 12, occupiedRooms: 9, warden: "Dr. Ramesh Kumar", contact: "+91 98765 20001" },
  { id: "bld-002", name: "Bhaskaracharya Block", floors: 3, totalRooms: 10, occupiedRooms: 8, warden: "Prof. Sunita Devi", contact: "+91 98765 20002" },
  { id: "bld-003", name: "Chanakya Block", floors: 3, totalRooms: 10, occupiedRooms: 7, warden: "Dr. Anil Verma", contact: "+91 98765 20003" },
  { id: "bld-004", name: "Dhyanchand Block", floors: 2, totalRooms: 8, occupiedRooms: 6, warden: "Prof. Meena Sharma", contact: "+91 98765 20004" },
];

// ──────────────────────────────────────────────
// ROOMS (40)
// ──────────────────────────────────────────────
export const rooms: Room[] = [
  // Aryabhata Block — Floor 1
  { id: "rm-001", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 1, number: "A-101", type: "single", status: "occupied", occupants: ["Aarav Sharma"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-002", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 1, number: "A-102", type: "double", status: "occupied", occupants: ["Vivaan Patel", "Reyansh Gupta"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 6000 },
  { id: "rm-003", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 1, number: "A-103", type: "triple", status: "occupied", occupants: ["Aditya Reddy", "Sai Krishna", "Arjun Nair"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 4500 },
  { id: "rm-004", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 1, number: "A-104", type: "single", status: "vacant", occupants: [], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  // Aryabhata Block — Floor 2
  { id: "rm-005", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 2, number: "A-201", type: "double", status: "occupied", occupants: ["Kartik Iyer", "Dhruv Mishra"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 7000 },
  { id: "rm-006", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 2, number: "A-202", type: "single", status: "maintenance", occupants: [], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-007", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 2, number: "A-203", type: "double", status: "occupied", occupants: ["Rohan Deshmukh", "Pranav Joshi"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 6000 },
  { id: "rm-008", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 2, number: "A-204", type: "triple", status: "occupied", occupants: ["Ishaan Kulkarni", "Manish Tiwari", "Nikhil Rao"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 4500 },
  // Aryabhata Block — Floor 3
  { id: "rm-009", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 3, number: "A-301", type: "single", status: "occupied", occupants: ["Rajesh Pandey"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-010", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 3, number: "A-302", type: "double", status: "occupied", occupants: ["Vikram Singh", "Harsh Mehta"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 7000 },
  { id: "rm-011", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 3, number: "A-303", type: "single", status: "reserved", occupants: [], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-012", buildingId: "bld-001", buildingName: "Aryabhata Block", floor: 3, number: "A-304", type: "double", status: "vacant", occupants: [], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 6000 },

  // Bhaskaracharya Block — Floor 1
  { id: "rm-013", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 1, number: "B-101", type: "double", status: "occupied", occupants: ["Ananya Iyer", "Priya Menon"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 7000 },
  { id: "rm-014", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 1, number: "B-102", type: "single", status: "occupied", occupants: ["Diya Patel"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-015", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 1, number: "B-103", type: "triple", status: "occupied", occupants: ["Kavya Reddy", "Sneha Rao", "Meera Joshi"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 4500 },
  { id: "rm-016", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 1, number: "B-104", type: "double", status: "vacant", occupants: [], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 6000 },
  // Bhaskaracharya Block — Floor 2
  { id: "rm-017", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 2, number: "B-201", type: "single", status: "occupied", occupants: ["Riya Sharma"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-018", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 2, number: "B-202", type: "double", status: "occupied", occupants: ["Pooja Nair", "Shruti Kulkarni"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 7000 },
  { id: "rm-019", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 2, number: "B-203", type: "single", status: "maintenance", occupants: [], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  // Bhaskaracharya Block — Floor 3
  { id: "rm-020", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 3, number: "B-301", type: "double", status: "occupied", occupants: ["Nisha Verma", "Tanvi Desai"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 6000 },
  { id: "rm-021", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 3, number: "B-302", type: "triple", status: "occupied", occupants: ["Aisha Khan", "Fatima Syed", "Zara Hussain"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 4500 },
  { id: "rm-022", buildingId: "bld-002", buildingName: "Bhaskaracharya Block", floor: 3, number: "B-303", type: "single", status: "reserved", occupants: [], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },

  // Chanakya Block — Floor 1
  { id: "rm-023", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 1, number: "C-101", type: "double", status: "occupied", occupants: ["Suresh Pillai", "Ganesh Nambiar"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 7000 },
  { id: "rm-024", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 1, number: "C-102", type: "single", status: "occupied", occupants: ["Amit Thakur"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-025", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 1, number: "C-103", type: "triple", status: "vacant", occupants: [], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 4500 },
  { id: "rm-026", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 1, number: "C-104", type: "double", status: "occupied", occupants: ["Deepak Chauhan", "Mohit Saxena"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 6000 },
  // Chanakya Block — Floor 2
  { id: "rm-027", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 2, number: "C-201", type: "single", status: "occupied", occupants: ["Rahul Bhatia"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-028", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 2, number: "C-202", type: "double", status: "occupied", occupants: ["Sanjay Malhotra", "Vijay Kapoor"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 7000 },
  { id: "rm-029", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 2, number: "C-203", type: "single", status: "maintenance", occupants: [], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  // Chanakya Block — Floor 3
  { id: "rm-030", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 3, number: "C-301", type: "double", status: "occupied", occupants: ["Karan Sethi", "Tarun Aggarwal"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 6000 },
  { id: "rm-031", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 3, number: "C-302", type: "single", status: "vacant", occupants: [], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-032", buildingId: "bld-003", buildingName: "Chanakya Block", floor: 3, number: "C-303", type: "triple", status: "occupied", occupants: ["Naveen Choudhary", "Ajay Yadav", "Sumit Pandey"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 4500 },

  // Dhyanchand Block — Floor 1
  { id: "rm-033", buildingId: "bld-004", buildingName: "Dhyanchand Block", floor: 1, number: "D-101", type: "double", status: "occupied", occupants: ["Lakshmi Pillai", "Radha Krishnan"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 7000 },
  { id: "rm-034", buildingId: "bld-004", buildingName: "Dhyanchand Block", floor: 1, number: "D-102", type: "single", status: "occupied", occupants: ["Geeta Mishra"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-035", buildingId: "bld-004", buildingName: "Dhyanchand Block", floor: 1, number: "D-103", type: "triple", status: "occupied", occupants: ["Swati Bansal", "Neha Tiwari", "Ankita Sinha"], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 4500 },
  { id: "rm-036", buildingId: "bld-004", buildingName: "Dhyanchand Block", floor: 1, number: "D-104", type: "double", status: "vacant", occupants: [], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 6000 },
  // Dhyanchand Block — Floor 2
  { id: "rm-037", buildingId: "bld-004", buildingName: "Dhyanchand Block", floor: 2, number: "D-201", type: "single", status: "occupied", occupants: ["Rekha Jain"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-038", buildingId: "bld-004", buildingName: "Dhyanchand Block", floor: 2, number: "D-202", type: "double", status: "occupied", occupants: ["Suman Ghosh", "Parvati Das"], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 7000 },
  { id: "rm-039", buildingId: "bld-004", buildingName: "Dhyanchand Block", floor: 2, number: "D-203", type: "single", status: "reserved", occupants: [], amenities: ["AC", "Wi-Fi", "Attached Bath"], monthlyRent: 8000 },
  { id: "rm-040", buildingId: "bld-004", buildingName: "Dhyanchand Block", floor: 2, number: "D-204", type: "triple", status: "maintenance", occupants: [], amenities: ["Fan", "Wi-Fi", "Common Bath"], monthlyRent: 4500 },
];

// ──────────────────────────────────────────────
// RESIDENTS (30)
// ──────────────────────────────────────────────
export const residents: Resident[] = [
  { id: "res-001", name: "Aarav Sharma", email: "aarav.sharma@peps.edu.in", phone: "+91 98765 30001", roomId: "rm-001", roomNumber: "A-101", buildingName: "Aryabhata Block", department: "Computer Science", joinDate: "2025-07-15", status: "active" },
  { id: "res-002", name: "Vivaan Patel", email: "vivaan.patel@peps.edu.in", phone: "+91 98765 30002", roomId: "rm-002", roomNumber: "A-102", buildingName: "Aryabhata Block", department: "Electronics", joinDate: "2025-07-20", status: "active" },
  { id: "res-003", name: "Reyansh Gupta", email: "reyansh.gupta@peps.edu.in", phone: "+91 98765 30003", roomId: "rm-002", roomNumber: "A-102", buildingName: "Aryabhata Block", department: "Mechanical", joinDate: "2025-08-01", status: "active" },
  { id: "res-004", name: "Aditya Reddy", email: "aditya.reddy@peps.edu.in", phone: "+91 98765 30004", roomId: "rm-003", roomNumber: "A-103", buildingName: "Aryabhata Block", department: "Civil", joinDate: "2025-07-18", status: "active" },
  { id: "res-005", name: "Sai Krishna", email: "sai.krishna@peps.edu.in", phone: "+91 98765 30005", roomId: "rm-003", roomNumber: "A-103", buildingName: "Aryabhata Block", department: "Physics", joinDate: "2025-08-05", status: "active" },
  { id: "res-006", name: "Arjun Nair", email: "arjun.nair@peps.edu.in", phone: "+91 98765 30006", roomId: "rm-003", roomNumber: "A-103", buildingName: "Aryabhata Block", department: "Chemistry", joinDate: "2025-07-22", status: "active" },
  { id: "res-007", name: "Kartik Iyer", email: "kartik.iyer@peps.edu.in", phone: "+91 98765 30007", roomId: "rm-005", roomNumber: "A-201", buildingName: "Aryabhata Block", department: "Mathematics", joinDate: "2025-08-10", status: "active" },
  { id: "res-008", name: "Dhruv Mishra", email: "dhruv.mishra@peps.edu.in", phone: "+91 98765 30008", roomId: "rm-005", roomNumber: "A-201", buildingName: "Aryabhata Block", department: "Computer Science", joinDate: "2025-07-25", status: "active" },
  { id: "res-009", name: "Rohan Deshmukh", email: "rohan.deshmukh@peps.edu.in", phone: "+91 98765 30009", roomId: "rm-007", roomNumber: "A-203", buildingName: "Aryabhata Block", department: "Electronics", joinDate: "2025-08-01", status: "active" },
  { id: "res-010", name: "Pranav Joshi", email: "pranav.joshi@peps.edu.in", phone: "+91 98765 30010", roomId: "rm-007", roomNumber: "A-203", buildingName: "Aryabhata Block", department: "Mechanical", joinDate: "2025-07-30", status: "active" },
  { id: "res-011", name: "Ananya Iyer", email: "ananya.iyer@peps.edu.in", phone: "+91 98765 30011", roomId: "rm-013", roomNumber: "B-101", buildingName: "Bhaskaracharya Block", department: "Biotechnology", joinDate: "2025-07-16", status: "active" },
  { id: "res-012", name: "Priya Menon", email: "priya.menon@peps.edu.in", phone: "+91 98765 30012", roomId: "rm-013", roomNumber: "B-101", buildingName: "Bhaskaracharya Block", department: "Computer Science", joinDate: "2025-08-02", status: "active" },
  { id: "res-013", name: "Diya Patel", email: "diya.patel@peps.edu.in", phone: "+91 98765 30013", roomId: "rm-014", roomNumber: "B-102", buildingName: "Bhaskaracharya Block", department: "Physics", joinDate: "2025-07-20", status: "active" },
  { id: "res-014", name: "Kavya Reddy", email: "kavya.reddy@peps.edu.in", phone: "+91 98765 30014", roomId: "rm-015", roomNumber: "B-103", buildingName: "Bhaskaracharya Block", department: "Chemistry", joinDate: "2025-07-22", status: "active" },
  { id: "res-015", name: "Sneha Rao", email: "sneha.rao@peps.edu.in", phone: "+91 98765 30015", roomId: "rm-015", roomNumber: "B-103", buildingName: "Bhaskaracharya Block", department: "Mathematics", joinDate: "2025-08-08", status: "active" },
  { id: "res-016", name: "Riya Sharma", email: "riya.sharma@peps.edu.in", phone: "+91 98765 30016", roomId: "rm-017", roomNumber: "B-201", buildingName: "Bhaskaracharya Block", department: "Civil", joinDate: "2025-07-18", status: "active" },
  { id: "res-017", name: "Pooja Nair", email: "pooja.nair@peps.edu.in", phone: "+91 98765 30017", roomId: "rm-018", roomNumber: "B-202", buildingName: "Bhaskaracharya Block", department: "Electronics", joinDate: "2025-08-12", status: "active" },
  { id: "res-018", name: "Suresh Pillai", email: "suresh.pillai@peps.edu.in", phone: "+91 98765 30018", roomId: "rm-023", roomNumber: "C-101", buildingName: "Chanakya Block", department: "Mechanical", joinDate: "2025-07-15", status: "active" },
  { id: "res-019", name: "Ganesh Nambiar", email: "ganesh.nambiar@peps.edu.in", phone: "+91 98765 30019", roomId: "rm-023", roomNumber: "C-101", buildingName: "Chanakya Block", department: "Computer Science", joinDate: "2025-08-01", status: "active" },
  { id: "res-020", name: "Amit Thakur", email: "amit.thakur@peps.edu.in", phone: "+91 98765 30020", roomId: "rm-024", roomNumber: "C-102", buildingName: "Chanakya Block", department: "Civil", joinDate: "2025-07-25", status: "active" },
  { id: "res-021", name: "Deepak Chauhan", email: "deepak.chauhan@peps.edu.in", phone: "+91 98765 30021", roomId: "rm-026", roomNumber: "C-104", buildingName: "Chanakya Block", department: "Physics", joinDate: "2025-07-20", status: "active" },
  { id: "res-022", name: "Rahul Bhatia", email: "rahul.bhatia@peps.edu.in", phone: "+91 98765 30022", roomId: "rm-027", roomNumber: "C-201", buildingName: "Chanakya Block", department: "Chemistry", joinDate: "2025-08-05", status: "active" },
  { id: "res-023", name: "Sanjay Malhotra", email: "sanjay.malhotra@peps.edu.in", phone: "+91 98765 30023", roomId: "rm-028", roomNumber: "C-202", buildingName: "Chanakya Block", department: "Biotechnology", joinDate: "2025-07-28", status: "active" },
  { id: "res-024", name: "Lakshmi Pillai", email: "lakshmi.pillai@peps.edu.in", phone: "+91 98765 30024", roomId: "rm-033", roomNumber: "D-101", buildingName: "Dhyanchand Block", department: "Mathematics", joinDate: "2025-07-16", status: "active" },
  { id: "res-025", name: "Geeta Mishra", email: "geeta.mishra@peps.edu.in", phone: "+91 98765 30025", roomId: "rm-034", roomNumber: "D-102", buildingName: "Dhyanchand Block", department: "Computer Science", joinDate: "2025-08-01", status: "active" },
  { id: "res-026", name: "Swati Bansal", email: "swati.bansal@peps.edu.in", phone: "+91 98765 30026", roomId: "rm-035", roomNumber: "D-103", buildingName: "Dhyanchand Block", department: "Electronics", joinDate: "2025-07-22", status: "active" },
  { id: "res-027", name: "Rekha Jain", email: "rekha.jain@peps.edu.in", phone: "+91 98765 30027", roomId: "rm-037", roomNumber: "D-201", buildingName: "Dhyanchand Block", department: "Civil", joinDate: "2025-08-10", status: "active" },
  { id: "res-028", name: "Suman Ghosh", email: "suman.ghosh@peps.edu.in", phone: "+91 98765 30028", roomId: "rm-038", roomNumber: "D-202", buildingName: "Dhyanchand Block", department: "Physics", joinDate: "2025-07-30", status: "active" },
  { id: "res-029", name: "Vikram Singh", email: "vikram.singh@peps.edu.in", phone: "+91 98765 30029", roomId: "rm-010", roomNumber: "A-302", buildingName: "Aryabhata Block", department: "Mechanical", joinDate: "2025-01-10", status: "checked_out" },
  { id: "res-030", name: "Karan Sethi", email: "karan.sethi@peps.edu.in", phone: "+91 98765 30030", roomId: "rm-030", roomNumber: "C-301", buildingName: "Chanakya Block", department: "Electronics", joinDate: "2025-07-15", status: "active" },
];

// ──────────────────────────────────────────────
// MAINTENANCE REQUESTS (25)
// ──────────────────────────────────────────────
export const maintenanceRequests: MaintenanceRequest[] = [
  { id: "mnt-001", roomId: "rm-001", roomNumber: "A-101", residentName: "Aarav Sharma", category: "electrical", description: "Ceiling fan making grinding noise and vibrating", status: "open", priority: "medium", createdAt: "2026-02-22T10:30:00", resolvedAt: null },
  { id: "mnt-002", roomId: "rm-002", roomNumber: "A-102", residentName: "Vivaan Patel", category: "plumbing", description: "Bathroom tap is leaking continuously", status: "in_progress", priority: "high", createdAt: "2026-02-20T14:15:00", resolvedAt: null },
  { id: "mnt-003", roomId: "rm-003", roomNumber: "A-103", residentName: "Aditya Reddy", category: "furniture", description: "Wardrobe door hinge is broken", status: "resolved", priority: "low", createdAt: "2026-02-15T09:00:00", resolvedAt: "2026-02-17T16:30:00" },
  { id: "mnt-004", roomId: "rm-005", roomNumber: "A-201", residentName: "Kartik Iyer", category: "electrical", description: "Power socket near study table not working", status: "open", priority: "high", createdAt: "2026-02-23T08:45:00", resolvedAt: null },
  { id: "mnt-005", roomId: "rm-007", roomNumber: "A-203", residentName: "Rohan Deshmukh", category: "cleaning", description: "Mold growth on bathroom walls", status: "in_progress", priority: "urgent", createdAt: "2026-02-19T11:00:00", resolvedAt: null },
  { id: "mnt-006", roomId: "rm-013", roomNumber: "B-101", residentName: "Ananya Iyer", category: "plumbing", description: "Hot water geyser not working", status: "open", priority: "high", createdAt: "2026-02-22T07:30:00", resolvedAt: null },
  { id: "mnt-007", roomId: "rm-014", roomNumber: "B-102", residentName: "Diya Patel", category: "electrical", description: "Tube light flickering in room", status: "resolved", priority: "medium", createdAt: "2026-02-10T16:00:00", resolvedAt: "2026-02-11T10:00:00" },
  { id: "mnt-008", roomId: "rm-015", roomNumber: "B-103", residentName: "Kavya Reddy", category: "furniture", description: "Study chair wheel is broken", status: "in_progress", priority: "low", createdAt: "2026-02-21T13:30:00", resolvedAt: null },
  { id: "mnt-009", roomId: "rm-017", roomNumber: "B-201", residentName: "Riya Sharma", category: "other", description: "Window glass cracked during storm", status: "open", priority: "urgent", createdAt: "2026-02-23T06:15:00", resolvedAt: null },
  { id: "mnt-010", roomId: "rm-018", roomNumber: "B-202", residentName: "Pooja Nair", category: "plumbing", description: "Toilet flush mechanism stuck", status: "resolved", priority: "high", createdAt: "2026-02-14T08:00:00", resolvedAt: "2026-02-14T17:00:00" },
  { id: "mnt-011", roomId: "rm-023", roomNumber: "C-101", residentName: "Suresh Pillai", category: "electrical", description: "AC remote not responding, need replacement", status: "open", priority: "medium", createdAt: "2026-02-21T15:45:00", resolvedAt: null },
  { id: "mnt-012", roomId: "rm-024", roomNumber: "C-102", residentName: "Amit Thakur", category: "cleaning", description: "Drains clogged in bathroom", status: "in_progress", priority: "high", createdAt: "2026-02-20T10:30:00", resolvedAt: null },
  { id: "mnt-013", roomId: "rm-026", roomNumber: "C-104", residentName: "Deepak Chauhan", category: "furniture", description: "Bed frame squeaking loudly", status: "resolved", priority: "low", createdAt: "2026-02-12T14:00:00", resolvedAt: "2026-02-15T11:30:00" },
  { id: "mnt-014", roomId: "rm-027", roomNumber: "C-201", residentName: "Rahul Bhatia", category: "plumbing", description: "Water pressure very low in shower", status: "open", priority: "medium", createdAt: "2026-02-22T09:00:00", resolvedAt: null },
  { id: "mnt-015", roomId: "rm-028", roomNumber: "C-202", residentName: "Sanjay Malhotra", category: "electrical", description: "Inverter battery backup not charging", status: "in_progress", priority: "high", createdAt: "2026-02-19T08:30:00", resolvedAt: null },
  { id: "mnt-016", roomId: "rm-033", roomNumber: "D-101", residentName: "Lakshmi Pillai", category: "other", description: "Door lock is jammed, cannot close properly", status: "open", priority: "urgent", createdAt: "2026-02-23T07:00:00", resolvedAt: null },
  { id: "mnt-017", roomId: "rm-034", roomNumber: "D-102", residentName: "Geeta Mishra", category: "cleaning", description: "Pest control needed, cockroach infestation", status: "resolved", priority: "urgent", createdAt: "2026-02-16T11:00:00", resolvedAt: "2026-02-17T09:00:00" },
  { id: "mnt-018", roomId: "rm-035", roomNumber: "D-103", residentName: "Swati Bansal", category: "plumbing", description: "Wash basin pipe leaking underneath", status: "in_progress", priority: "medium", createdAt: "2026-02-21T10:15:00", resolvedAt: null },
  { id: "mnt-019", roomId: "rm-037", roomNumber: "D-201", residentName: "Rekha Jain", category: "electrical", description: "Exhaust fan in bathroom not working", status: "resolved", priority: "medium", createdAt: "2026-02-13T09:30:00", resolvedAt: "2026-02-14T14:00:00" },
  { id: "mnt-020", roomId: "rm-038", roomNumber: "D-202", residentName: "Suman Ghosh", category: "furniture", description: "Bookshelf bracket loose, shelf tilting", status: "open", priority: "low", createdAt: "2026-02-22T14:30:00", resolvedAt: null },
  { id: "mnt-021", roomId: "rm-001", roomNumber: "A-101", residentName: "Aarav Sharma", category: "plumbing", description: "Shower head needs replacement", status: "resolved", priority: "low", createdAt: "2026-02-05T12:00:00", resolvedAt: "2026-02-07T15:00:00" },
  { id: "mnt-022", roomId: "rm-009", roomNumber: "A-301", residentName: "Rajesh Pandey", category: "electrical", description: "Main switch board sparking occasionally", status: "open", priority: "urgent", createdAt: "2026-02-23T09:30:00", resolvedAt: null },
  { id: "mnt-023", roomId: "rm-010", roomNumber: "A-302", residentName: "Vikram Singh", category: "other", description: "Wall paint peeling near window", status: "resolved", priority: "low", createdAt: "2026-02-08T10:00:00", resolvedAt: "2026-02-12T16:00:00" },
  { id: "mnt-024", roomId: "rm-030", roomNumber: "C-301", residentName: "Karan Sethi", category: "cleaning", description: "Room deep cleaning requested before move-in", status: "resolved", priority: "medium", createdAt: "2026-02-10T08:00:00", resolvedAt: "2026-02-10T17:00:00" },
  { id: "mnt-025", roomId: "rm-020", roomNumber: "B-301", residentName: "Nisha Verma", category: "furniture", description: "Curtain rod fallen off wall bracket", status: "in_progress", priority: "low", createdAt: "2026-02-22T16:00:00", resolvedAt: null },
];

// ──────────────────────────────────────────────
// VISITOR LOGS (20)
// ──────────────────────────────────────────────
export const visitorLogs: VisitorLog[] = [
  { id: "vst-001", visitorName: "Rajendra Sharma", purpose: "Parent Visit", residentName: "Aarav Sharma", roomNumber: "A-101", checkIn: "2026-02-23T09:00:00", checkOut: null, status: "checked_in" },
  { id: "vst-002", visitorName: "Meena Patel", purpose: "Parent Visit", residentName: "Vivaan Patel", roomNumber: "A-102", checkIn: "2026-02-23T10:30:00", checkOut: "2026-02-23T14:00:00", status: "checked_out" },
  { id: "vst-003", visitorName: "Suresh Reddy", purpose: "Parent Visit", residentName: "Aditya Reddy", roomNumber: "A-103", checkIn: "2026-02-22T11:00:00", checkOut: "2026-02-22T17:30:00", status: "checked_out" },
  { id: "vst-004", visitorName: "Pradeep Iyer", purpose: "Relative Visit", residentName: "Kartik Iyer", roomNumber: "A-201", checkIn: "2026-02-23T08:15:00", checkOut: null, status: "checked_in" },
  { id: "vst-005", visitorName: "Nandini Gupta", purpose: "Friend Visit", residentName: "Reyansh Gupta", roomNumber: "A-102", checkIn: "2026-02-21T14:00:00", checkOut: "2026-02-21T18:00:00", status: "checked_out" },
  { id: "vst-006", visitorName: "Ramya Iyer", purpose: "Parent Visit", residentName: "Ananya Iyer", roomNumber: "B-101", checkIn: "2026-02-23T09:30:00", checkOut: null, status: "checked_in" },
  { id: "vst-007", visitorName: "Mahesh Patel", purpose: "Parent Visit", residentName: "Diya Patel", roomNumber: "B-102", checkIn: "2026-02-22T10:00:00", checkOut: "2026-02-22T16:00:00", status: "checked_out" },
  { id: "vst-008", visitorName: "Snehal Reddy", purpose: "Sibling Visit", residentName: "Kavya Reddy", roomNumber: "B-103", checkIn: "2026-02-20T13:00:00", checkOut: "2026-02-20T17:30:00", status: "checked_out" },
  { id: "vst-009", visitorName: "Arun Sharma", purpose: "Friend Visit", residentName: "Riya Sharma", roomNumber: "B-201", checkIn: "2026-02-23T11:00:00", checkOut: null, status: "checked_in" },
  { id: "vst-010", visitorName: "Venkatesh Pillai", purpose: "Parent Visit", residentName: "Suresh Pillai", roomNumber: "C-101", checkIn: "2026-02-22T08:30:00", checkOut: "2026-02-22T15:00:00", status: "checked_out" },
  { id: "vst-011", visitorName: "Kamala Thakur", purpose: "Parent Visit", residentName: "Amit Thakur", roomNumber: "C-102", checkIn: "2026-02-21T09:00:00", checkOut: "2026-02-21T14:30:00", status: "checked_out" },
  { id: "vst-012", visitorName: "Rohit Chauhan", purpose: "Relative Visit", residentName: "Deepak Chauhan", roomNumber: "C-104", checkIn: "2026-02-23T10:00:00", checkOut: null, status: "checked_in" },
  { id: "vst-013", visitorName: "Sunita Bhatia", purpose: "Parent Visit", residentName: "Rahul Bhatia", roomNumber: "C-201", checkIn: "2026-02-20T09:15:00", checkOut: "2026-02-20T16:00:00", status: "checked_out" },
  { id: "vst-014", visitorName: "Gopal Pillai", purpose: "Parent Visit", residentName: "Lakshmi Pillai", roomNumber: "D-101", checkIn: "2026-02-23T08:00:00", checkOut: null, status: "checked_in" },
  { id: "vst-015", visitorName: "Radhika Mishra", purpose: "Sibling Visit", residentName: "Geeta Mishra", roomNumber: "D-102", checkIn: "2026-02-22T12:00:00", checkOut: "2026-02-22T18:00:00", status: "checked_out" },
  { id: "vst-016", visitorName: "Mohan Bansal", purpose: "Parent Visit", residentName: "Swati Bansal", roomNumber: "D-103", checkIn: "2026-02-21T10:00:00", checkOut: "2026-02-21T15:30:00", status: "checked_out" },
  { id: "vst-017", visitorName: "Ashok Jain", purpose: "Parent Visit", residentName: "Rekha Jain", roomNumber: "D-201", checkIn: "2026-02-23T09:45:00", checkOut: null, status: "checked_in" },
  { id: "vst-018", visitorName: "Tapan Ghosh", purpose: "Relative Visit", residentName: "Suman Ghosh", roomNumber: "D-202", checkIn: "2026-02-19T11:30:00", checkOut: "2026-02-19T16:00:00", status: "checked_out" },
  { id: "vst-019", visitorName: "Dinesh Sethi", purpose: "Parent Visit", residentName: "Karan Sethi", roomNumber: "C-301", checkIn: "2026-02-22T09:00:00", checkOut: "2026-02-22T14:00:00", status: "checked_out" },
  { id: "vst-020", visitorName: "Prakash Nair", purpose: "Friend Visit", residentName: "Arjun Nair", roomNumber: "A-103", checkIn: "2026-02-23T12:00:00", checkOut: null, status: "checked_in" },
];

// ──────────────────────────────────────────────
// HELPER FUNCTIONS
// ──────────────────────────────────────────────
export function getRoomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}

export function getResidentById(id: string): Resident | undefined {
  return residents.find((r) => r.id === id);
}

export function getMaintenanceByRoom(roomId: string): MaintenanceRequest[] {
  return maintenanceRequests.filter((m) => m.roomId === roomId);
}

export function getVisitorsByResident(residentName: string): VisitorLog[] {
  return visitorLogs.filter((v) => v.residentName === residentName);
}

// ──────────────────────────────────────────────
// COMPUTED / CHART DATA
// ──────────────────────────────────────────────
export function getOccupancyData() {
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const vacant = rooms.filter((r) => r.status === "vacant").length;
  const maintenance = rooms.filter((r) => r.status === "maintenance").length;
  const reserved = rooms.filter((r) => r.status === "reserved").length;
  return [
    { name: "Occupied", value: occupied },
    { name: "Vacant", value: vacant },
    { name: "Maintenance", value: maintenance },
    { name: "Reserved", value: reserved },
  ];
}

export function getMaintenanceStatusData() {
  const open = maintenanceRequests.filter((m) => m.status === "open").length;
  const inProgress = maintenanceRequests.filter((m) => m.status === "in_progress").length;
  const resolved = maintenanceRequests.filter((m) => m.status === "resolved").length;
  return [
    { name: "Open", count: open },
    { name: "In Progress", count: inProgress },
    { name: "Resolved", count: resolved },
  ];
}

export function getTotalMonthlyRevenue(): number {
  return rooms
    .filter((r) => r.status === "occupied")
    .reduce((sum, r) => sum + r.monthlyRent, 0);
}

export function getBuildingPaymentData() {
  return buildings.map((b) => {
    const buildingRooms = rooms.filter((r) => r.buildingId === b.id);
    const totalBilled = buildingRooms.filter((r) => r.status === "occupied").reduce((s, r) => s + r.monthlyRent, 0);
    const paid = Math.round(totalBilled * 0.85);
    const pending = totalBilled - paid;
    return { name: b.name.replace(" Block", ""), paid, pending };
  });
}

export const recentPayments = [
  { id: "pay-001", residentName: "Aarav Sharma", roomNumber: "A-101", amount: 8000, date: "2026-02-20", status: "paid" as const },
  { id: "pay-002", residentName: "Vivaan Patel", roomNumber: "A-102", amount: 6000, date: "2026-02-19", status: "paid" as const },
  { id: "pay-003", residentName: "Ananya Iyer", roomNumber: "B-101", amount: 7000, date: "2026-02-18", status: "paid" as const },
  { id: "pay-004", residentName: "Diya Patel", roomNumber: "B-102", amount: 8000, date: "2026-02-21", status: "paid" as const },
  { id: "pay-005", residentName: "Suresh Pillai", roomNumber: "C-101", amount: 7000, date: "2026-02-17", status: "paid" as const },
  { id: "pay-006", residentName: "Kartik Iyer", roomNumber: "A-201", amount: 7000, date: "2026-02-22", status: "paid" as const },
  { id: "pay-007", residentName: "Kavya Reddy", roomNumber: "B-103", amount: 4500, date: "2026-02-15", status: "overdue" as const },
  { id: "pay-008", residentName: "Deepak Chauhan", roomNumber: "C-104", amount: 6000, date: "2026-02-20", status: "paid" as const },
  { id: "pay-009", residentName: "Lakshmi Pillai", roomNumber: "D-101", amount: 7000, date: "2026-02-16", status: "overdue" as const },
  { id: "pay-010", residentName: "Geeta Mishra", roomNumber: "D-102", amount: 8000, date: "2026-02-21", status: "paid" as const },
  { id: "pay-011", residentName: "Rohan Deshmukh", roomNumber: "A-203", amount: 6000, date: "2026-02-19", status: "paid" as const },
  { id: "pay-012", residentName: "Riya Sharma", roomNumber: "B-201", amount: 8000, date: "2026-02-20", status: "paid" as const },
  { id: "pay-013", residentName: "Rahul Bhatia", roomNumber: "C-201", amount: 8000, date: "2026-02-18", status: "overdue" as const },
  { id: "pay-014", residentName: "Rekha Jain", roomNumber: "D-201", amount: 8000, date: "2026-02-22", status: "paid" as const },
  { id: "pay-015", residentName: "Karan Sethi", roomNumber: "C-301", amount: 6000, date: "2026-02-17", status: "paid" as const },
];

export const recentActivities = [
  { id: "act-001", user: "Aarav Sharma", action: "submitted maintenance request for", target: "Room A-101", time: "2026-02-23T10:30:00", type: "create" as const },
  { id: "act-002", user: "Dr. Ramesh Kumar", action: "approved checkout for", target: "Vikram Singh", time: "2026-02-23T09:15:00", type: "update" as const },
  { id: "act-003", user: "Rajendra Sharma", action: "checked in to visit", target: "Room A-101", time: "2026-02-23T09:00:00", type: "info" as const },
  { id: "act-004", user: "Admin", action: "assigned room A-302 to", target: "Harsh Mehta", time: "2026-02-22T16:30:00", type: "create" as const },
  { id: "act-005", user: "Maintenance Team", action: "resolved plumbing issue in", target: "Room B-202", time: "2026-02-22T15:00:00", type: "update" as const },
  { id: "act-006", user: "Diya Patel", action: "paid monthly rent for", target: "Room B-102", time: "2026-02-22T14:00:00", type: "info" as const },
  { id: "act-007", user: "Prof. Sunita Devi", action: "marked room B-203 for", target: "Maintenance", time: "2026-02-22T11:30:00", type: "update" as const },
  { id: "act-008", user: "Kavya Reddy", action: "submitted visitor request for", target: "Room B-103", time: "2026-02-22T10:00:00", type: "create" as const },
];
