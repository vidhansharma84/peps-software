// ──────────────────────────────────────────────
// Conference Hall Module — Dummy Data
// ──────────────────────────────────────────────

export interface ConferenceRoom {
  id: string;
  name: string;
  capacity: number;
  configurations: string[];
  amenities: string[];
  hourlyRate: number;
  status: "available" | "booked" | "maintenance";
  floor: number;
  description: string;
}

export interface ConferenceEvent {
  id: string;
  title: string;
  organizer: string;
  department: string;
  roomId: string;
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  description: string;
  cateringRequired: boolean;
}

export interface ConferenceBooking {
  id: string;
  eventId: string;
  roomId: string;
  roomName: string;
  bookedBy: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: "confirmed" | "pending" | "cancelled";
  totalCost: number;
}

export interface RentalEquipment {
  id: string;
  name: string;
  category: "audio" | "visual" | "furniture" | "other";
  quantity: number;
  available: number;
  ratePerDay: number;
  condition: "good" | "fair" | "poor";
}

export interface CateringRequest {
  id: string;
  eventId: string;
  eventTitle: string;
  type: "breakfast" | "lunch" | "snacks" | "dinner" | "beverages";
  headCount: number;
  menuItems: string[];
  totalCost: number;
  status: "pending" | "confirmed" | "delivered";
}

// ──────────────────────────────────────────────
// Conference Rooms (6)
// ──────────────────────────────────────────────
export const conferenceRooms: ConferenceRoom[] = [
  {
    id: "room-1",
    name: "Vikram Hall",
    capacity: 200,
    configurations: ["theatre", "classroom", "u-shape"],
    amenities: ["Projector", "Sound System", "Whiteboard", "Video Conferencing", "Air Conditioning", "Stage"],
    hourlyRate: 5000,
    status: "available",
    floor: 1,
    description: "Our flagship conference hall with state-of-the-art AV equipment, ideal for large seminars and corporate events.",
  },
  {
    id: "room-2",
    name: "Ashoka Boardroom",
    capacity: 20,
    configurations: ["boardroom", "u-shape"],
    amenities: ["Projector", "Video Conferencing", "Whiteboard", "Air Conditioning", "Coffee Machine"],
    hourlyRate: 2000,
    status: "booked",
    floor: 2,
    description: "Premium boardroom designed for executive meetings and strategy sessions with elegant interiors.",
  },
  {
    id: "room-3",
    name: "Chanakya Conference Room",
    capacity: 50,
    configurations: ["theatre", "classroom", "boardroom", "u-shape"],
    amenities: ["Projector", "Sound System", "Video Conferencing", "Whiteboard", "Air Conditioning"],
    hourlyRate: 3000,
    status: "available",
    floor: 1,
    description: "Versatile mid-size conference room suitable for workshops, training sessions, and team meetings.",
  },
  {
    id: "room-4",
    name: "Sarojini Meeting Room",
    capacity: 12,
    configurations: ["boardroom"],
    amenities: ["TV Display", "Video Conferencing", "Whiteboard", "Air Conditioning"],
    hourlyRate: 1500,
    status: "available",
    floor: 3,
    description: "Compact meeting room perfect for small team huddles and client discussions.",
  },
  {
    id: "room-5",
    name: "Tagore Auditorium",
    capacity: 300,
    configurations: ["theatre"],
    amenities: ["Projector", "Sound System", "Stage", "Green Room", "Air Conditioning", "Microphones", "Recording Equipment"],
    hourlyRate: 8000,
    status: "maintenance",
    floor: 0,
    description: "Grand auditorium with tiered seating for large-scale events, annual meets, and cultural programmes.",
  },
  {
    id: "room-6",
    name: "Kalam Innovation Hub",
    capacity: 30,
    configurations: ["classroom", "u-shape", "boardroom"],
    amenities: ["Projector", "Whiteboard", "Video Conferencing", "Air Conditioning", "Standing Desks"],
    hourlyRate: 2500,
    status: "available",
    floor: 2,
    description: "Modern collaborative space designed for brainstorming sessions, hackathons, and innovation workshops.",
  },
];

// ──────────────────────────────────────────────
// Conference Events (20)
// ──────────────────────────────────────────────
export const conferenceEvents: ConferenceEvent[] = [
  {
    id: "evt-1",
    title: "Annual Strategy Summit",
    organizer: "Rajesh Sharma",
    department: "Management",
    roomId: "room-1",
    roomName: "Vikram Hall",
    date: "2026-02-25",
    startTime: "09:00",
    endTime: "17:00",
    attendees: 150,
    status: "upcoming",
    description: "Annual strategy planning session with all department heads and senior leadership.",
    cateringRequired: true,
  },
  {
    id: "evt-2",
    title: "Product Launch Presentation",
    organizer: "Priya Patel",
    department: "Marketing",
    roomId: "room-1",
    roomName: "Vikram Hall",
    date: "2026-02-27",
    startTime: "14:00",
    endTime: "16:00",
    attendees: 120,
    status: "upcoming",
    description: "New product line launch with media and stakeholder presentations.",
    cateringRequired: true,
  },
  {
    id: "evt-3",
    title: "Board of Directors Meeting",
    organizer: "Anil Mehta",
    department: "Administration",
    roomId: "room-2",
    roomName: "Ashoka Boardroom",
    date: "2026-02-23",
    startTime: "10:00",
    endTime: "13:00",
    attendees: 15,
    status: "ongoing",
    description: "Quarterly board meeting to review financial performance and strategic direction.",
    cateringRequired: true,
  },
  {
    id: "evt-4",
    title: "HR Policy Workshop",
    organizer: "Sunita Verma",
    department: "Human Resources",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    date: "2026-02-24",
    startTime: "10:00",
    endTime: "12:00",
    attendees: 40,
    status: "upcoming",
    description: "Workshop on updated HR policies including remote work guidelines.",
    cateringRequired: false,
  },
  {
    id: "evt-5",
    title: "Client Review - Tata Projects",
    organizer: "Vikram Singh",
    department: "Business Development",
    roomId: "room-4",
    roomName: "Sarojini Meeting Room",
    date: "2026-02-23",
    startTime: "14:00",
    endTime: "15:30",
    attendees: 8,
    status: "upcoming",
    description: "Quarterly progress review with Tata Projects team on ongoing deliverables.",
    cateringRequired: false,
  },
  {
    id: "evt-6",
    title: "Tech Innovation Hackathon",
    organizer: "Arjun Nair",
    department: "Technology",
    roomId: "room-6",
    roomName: "Kalam Innovation Hub",
    date: "2026-03-01",
    startTime: "09:00",
    endTime: "18:00",
    attendees: 28,
    status: "upcoming",
    description: "Full-day hackathon focused on AI and automation solutions for business processes.",
    cateringRequired: true,
  },
  {
    id: "evt-7",
    title: "Safety Training Session",
    organizer: "Deepak Joshi",
    department: "Operations",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    date: "2026-02-20",
    startTime: "09:00",
    endTime: "11:00",
    attendees: 45,
    status: "completed",
    description: "Mandatory safety training covering fire safety and emergency evacuation procedures.",
    cateringRequired: false,
  },
  {
    id: "evt-8",
    title: "Annual Cultural Programme",
    organizer: "Kavita Reddy",
    department: "Employee Engagement",
    roomId: "room-5",
    roomName: "Tagore Auditorium",
    date: "2026-02-14",
    startTime: "16:00",
    endTime: "20:00",
    attendees: 250,
    status: "completed",
    description: "Annual cultural event with performances, awards, and celebrations.",
    cateringRequired: true,
  },
  {
    id: "evt-9",
    title: "Finance Review Meeting",
    organizer: "Ramesh Gupta",
    department: "Finance",
    roomId: "room-2",
    roomName: "Ashoka Boardroom",
    date: "2026-02-26",
    startTime: "11:00",
    endTime: "13:00",
    attendees: 12,
    status: "upcoming",
    description: "Monthly financial review and budget allocation discussions.",
    cateringRequired: true,
  },
  {
    id: "evt-10",
    title: "New Employee Orientation",
    organizer: "Meena Iyer",
    department: "Human Resources",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    date: "2026-03-03",
    startTime: "09:30",
    endTime: "12:30",
    attendees: 25,
    status: "upcoming",
    description: "Orientation programme for new joiners covering company policies and culture.",
    cateringRequired: true,
  },
  {
    id: "evt-11",
    title: "Vendor Negotiation - Reliance",
    organizer: "Suresh Kumar",
    department: "Procurement",
    roomId: "room-4",
    roomName: "Sarojini Meeting Room",
    date: "2026-02-18",
    startTime: "15:00",
    endTime: "16:30",
    attendees: 6,
    status: "completed",
    description: "Contract negotiation meeting with Reliance procurement team.",
    cateringRequired: false,
  },
  {
    id: "evt-12",
    title: "IT Infrastructure Planning",
    organizer: "Arjun Nair",
    department: "Technology",
    roomId: "room-6",
    roomName: "Kalam Innovation Hub",
    date: "2026-02-28",
    startTime: "10:00",
    endTime: "12:00",
    attendees: 18,
    status: "upcoming",
    description: "Planning session for Q2 infrastructure upgrades and cloud migration.",
    cateringRequired: false,
  },
  {
    id: "evt-13",
    title: "Marketing Campaign Review",
    organizer: "Priya Patel",
    department: "Marketing",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    date: "2026-02-15",
    startTime: "14:00",
    endTime: "16:00",
    attendees: 20,
    status: "completed",
    description: "Review of Q1 marketing campaigns with performance metrics and learnings.",
    cateringRequired: false,
  },
  {
    id: "evt-14",
    title: "CSR Committee Meeting",
    organizer: "Ananya Das",
    department: "CSR",
    roomId: "room-2",
    roomName: "Ashoka Boardroom",
    date: "2026-03-05",
    startTime: "14:00",
    endTime: "16:00",
    attendees: 10,
    status: "upcoming",
    description: "Quarterly CSR committee meeting to review ongoing initiatives and approve new projects.",
    cateringRequired: true,
  },
  {
    id: "evt-15",
    title: "Sales Team Town Hall",
    organizer: "Vikram Singh",
    department: "Sales",
    roomId: "room-1",
    roomName: "Vikram Hall",
    date: "2026-03-07",
    startTime: "10:00",
    endTime: "12:00",
    attendees: 80,
    status: "upcoming",
    description: "Quarterly sales team town hall with target reviews and motivational session.",
    cateringRequired: true,
  },
  {
    id: "evt-16",
    title: "Design Thinking Workshop",
    organizer: "Neha Kapoor",
    department: "Product",
    roomId: "room-6",
    roomName: "Kalam Innovation Hub",
    date: "2026-02-21",
    startTime: "09:00",
    endTime: "17:00",
    attendees: 24,
    status: "completed",
    description: "Full-day design thinking workshop facilitated by external consultants.",
    cateringRequired: true,
  },
  {
    id: "evt-17",
    title: "Compliance Training",
    organizer: "Ramesh Gupta",
    department: "Legal",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    date: "2026-03-10",
    startTime: "10:00",
    endTime: "12:00",
    attendees: 35,
    status: "upcoming",
    description: "Mandatory compliance training on SEBI regulations and insider trading policies.",
    cateringRequired: false,
  },
  {
    id: "evt-18",
    title: "Investor Presentation",
    organizer: "Anil Mehta",
    department: "Finance",
    roomId: "room-1",
    roomName: "Vikram Hall",
    date: "2026-02-12",
    startTime: "11:00",
    endTime: "13:00",
    attendees: 60,
    status: "completed",
    description: "Investor update presentation covering Q3 results and future roadmap.",
    cateringRequired: true,
  },
  {
    id: "evt-19",
    title: "Wellness Seminar",
    organizer: "Sunita Verma",
    department: "Human Resources",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    date: "2026-03-12",
    startTime: "15:00",
    endTime: "16:30",
    attendees: 40,
    status: "upcoming",
    description: "Employee wellness seminar covering mental health and work-life balance.",
    cateringRequired: false,
  },
  {
    id: "evt-20",
    title: "Project Kickoff - Smart Campus",
    organizer: "Arjun Nair",
    department: "Technology",
    roomId: "room-2",
    roomName: "Ashoka Boardroom",
    date: "2026-02-17",
    startTime: "10:00",
    endTime: "12:00",
    attendees: 14,
    status: "cancelled",
    description: "Kickoff meeting for the Smart Campus digitization initiative.",
    cateringRequired: false,
  },
];

// ──────────────────────────────────────────────
// Conference Bookings (15)
// ──────────────────────────────────────────────
export const conferenceBookings: ConferenceBooking[] = [
  {
    id: "bk-1",
    eventId: "evt-1",
    roomId: "room-1",
    roomName: "Vikram Hall",
    bookedBy: "Rajesh Sharma",
    date: "2026-02-25",
    startTime: "09:00",
    endTime: "17:00",
    purpose: "Annual Strategy Summit",
    status: "confirmed",
    totalCost: 40000,
  },
  {
    id: "bk-2",
    eventId: "evt-2",
    roomId: "room-1",
    roomName: "Vikram Hall",
    bookedBy: "Priya Patel",
    date: "2026-02-27",
    startTime: "14:00",
    endTime: "16:00",
    purpose: "Product Launch Presentation",
    status: "confirmed",
    totalCost: 10000,
  },
  {
    id: "bk-3",
    eventId: "evt-3",
    roomId: "room-2",
    roomName: "Ashoka Boardroom",
    bookedBy: "Anil Mehta",
    date: "2026-02-23",
    startTime: "10:00",
    endTime: "13:00",
    purpose: "Board of Directors Meeting",
    status: "confirmed",
    totalCost: 6000,
  },
  {
    id: "bk-4",
    eventId: "evt-4",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    bookedBy: "Sunita Verma",
    date: "2026-02-24",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "HR Policy Workshop",
    status: "confirmed",
    totalCost: 6000,
  },
  {
    id: "bk-5",
    eventId: "evt-5",
    roomId: "room-4",
    roomName: "Sarojini Meeting Room",
    bookedBy: "Vikram Singh",
    date: "2026-02-23",
    startTime: "14:00",
    endTime: "15:30",
    purpose: "Client Review - Tata Projects",
    status: "confirmed",
    totalCost: 2250,
  },
  {
    id: "bk-6",
    eventId: "evt-6",
    roomId: "room-6",
    roomName: "Kalam Innovation Hub",
    bookedBy: "Arjun Nair",
    date: "2026-03-01",
    startTime: "09:00",
    endTime: "18:00",
    purpose: "Tech Innovation Hackathon",
    status: "confirmed",
    totalCost: 22500,
  },
  {
    id: "bk-7",
    eventId: "evt-9",
    roomId: "room-2",
    roomName: "Ashoka Boardroom",
    bookedBy: "Ramesh Gupta",
    date: "2026-02-26",
    startTime: "11:00",
    endTime: "13:00",
    purpose: "Finance Review Meeting",
    status: "confirmed",
    totalCost: 4000,
  },
  {
    id: "bk-8",
    eventId: "evt-10",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    bookedBy: "Meena Iyer",
    date: "2026-03-03",
    startTime: "09:30",
    endTime: "12:30",
    purpose: "New Employee Orientation",
    status: "pending",
    totalCost: 9000,
  },
  {
    id: "bk-9",
    eventId: "evt-12",
    roomId: "room-6",
    roomName: "Kalam Innovation Hub",
    bookedBy: "Arjun Nair",
    date: "2026-02-28",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "IT Infrastructure Planning",
    status: "confirmed",
    totalCost: 5000,
  },
  {
    id: "bk-10",
    eventId: "evt-14",
    roomId: "room-2",
    roomName: "Ashoka Boardroom",
    bookedBy: "Ananya Das",
    date: "2026-03-05",
    startTime: "14:00",
    endTime: "16:00",
    purpose: "CSR Committee Meeting",
    status: "pending",
    totalCost: 4000,
  },
  {
    id: "bk-11",
    eventId: "evt-15",
    roomId: "room-1",
    roomName: "Vikram Hall",
    bookedBy: "Vikram Singh",
    date: "2026-03-07",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "Sales Team Town Hall",
    status: "confirmed",
    totalCost: 10000,
  },
  {
    id: "bk-12",
    eventId: "evt-17",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    bookedBy: "Ramesh Gupta",
    date: "2026-03-10",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "Compliance Training",
    status: "pending",
    totalCost: 6000,
  },
  {
    id: "bk-13",
    eventId: "evt-19",
    roomId: "room-3",
    roomName: "Chanakya Conference Room",
    bookedBy: "Sunita Verma",
    date: "2026-03-12",
    startTime: "15:00",
    endTime: "16:30",
    purpose: "Wellness Seminar",
    status: "pending",
    totalCost: 4500,
  },
  {
    id: "bk-14",
    eventId: "evt-20",
    roomId: "room-2",
    roomName: "Ashoka Boardroom",
    bookedBy: "Arjun Nair",
    date: "2026-02-17",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "Project Kickoff - Smart Campus",
    status: "cancelled",
    totalCost: 4000,
  },
  {
    id: "bk-15",
    eventId: "evt-18",
    roomId: "room-1",
    roomName: "Vikram Hall",
    bookedBy: "Anil Mehta",
    date: "2026-02-12",
    startTime: "11:00",
    endTime: "13:00",
    purpose: "Investor Presentation",
    status: "confirmed",
    totalCost: 10000,
  },
];

// ──────────────────────────────────────────────
// Rental Equipment (12)
// ──────────────────────────────────────────────
export const rentalEquipment: RentalEquipment[] = [
  {
    id: "eq-1",
    name: "Wireless Microphone Set",
    category: "audio",
    quantity: 10,
    available: 7,
    ratePerDay: 800,
    condition: "good",
  },
  {
    id: "eq-2",
    name: "Portable PA System",
    category: "audio",
    quantity: 4,
    available: 3,
    ratePerDay: 1500,
    condition: "good",
  },
  {
    id: "eq-3",
    name: "HD Projector (5000 Lumens)",
    category: "visual",
    quantity: 6,
    available: 4,
    ratePerDay: 2000,
    condition: "good",
  },
  {
    id: "eq-4",
    name: "LED Display Screen (65\")",
    category: "visual",
    quantity: 3,
    available: 2,
    ratePerDay: 3000,
    condition: "good",
  },
  {
    id: "eq-5",
    name: "Webcam (4K Conference)",
    category: "visual",
    quantity: 8,
    available: 6,
    ratePerDay: 500,
    condition: "good",
  },
  {
    id: "eq-6",
    name: "Foldable Banquet Table",
    category: "furniture",
    quantity: 20,
    available: 14,
    ratePerDay: 300,
    condition: "fair",
  },
  {
    id: "eq-7",
    name: "Stackable Conference Chair",
    category: "furniture",
    quantity: 100,
    available: 72,
    ratePerDay: 50,
    condition: "good",
  },
  {
    id: "eq-8",
    name: "Portable Podium",
    category: "furniture",
    quantity: 3,
    available: 2,
    ratePerDay: 600,
    condition: "good",
  },
  {
    id: "eq-9",
    name: "Whiteboard (Mobile)",
    category: "other",
    quantity: 5,
    available: 3,
    ratePerDay: 200,
    condition: "fair",
  },
  {
    id: "eq-10",
    name: "Laser Pointer (Presenter)",
    category: "other",
    quantity: 15,
    available: 12,
    ratePerDay: 100,
    condition: "good",
  },
  {
    id: "eq-11",
    name: "Extension Board (6-Way)",
    category: "other",
    quantity: 25,
    available: 18,
    ratePerDay: 50,
    condition: "fair",
  },
  {
    id: "eq-12",
    name: "Video Recording Kit",
    category: "visual",
    quantity: 2,
    available: 1,
    ratePerDay: 3500,
    condition: "good",
  },
];

// ──────────────────────────────────────────────
// Catering Requests (10)
// ──────────────────────────────────────────────
export const cateringRequests: CateringRequest[] = [
  {
    id: "cat-1",
    eventId: "evt-1",
    eventTitle: "Annual Strategy Summit",
    type: "lunch",
    headCount: 150,
    menuItems: ["Paneer Butter Masala", "Dal Makhani", "Jeera Rice", "Naan", "Raita", "Gulab Jamun"],
    totalCost: 67500,
    status: "confirmed",
  },
  {
    id: "cat-2",
    eventId: "evt-1",
    eventTitle: "Annual Strategy Summit",
    type: "snacks",
    headCount: 150,
    menuItems: ["Samosa", "Sandwich", "Tea", "Coffee", "Biscuits"],
    totalCost: 22500,
    status: "confirmed",
  },
  {
    id: "cat-3",
    eventId: "evt-2",
    eventTitle: "Product Launch Presentation",
    type: "snacks",
    headCount: 120,
    menuItems: ["Mini Dosa", "Vada Pav", "Fresh Juice", "Tea", "Coffee"],
    totalCost: 18000,
    status: "pending",
  },
  {
    id: "cat-4",
    eventId: "evt-3",
    eventTitle: "Board of Directors Meeting",
    type: "lunch",
    headCount: 15,
    menuItems: ["Butter Chicken", "Paneer Tikka", "Biryani", "Naan", "Salad", "Dessert Platter"],
    totalCost: 12000,
    status: "delivered",
  },
  {
    id: "cat-5",
    eventId: "evt-6",
    eventTitle: "Tech Innovation Hackathon",
    type: "breakfast",
    headCount: 28,
    menuItems: ["Idli Sambar", "Poha", "Bread Toast", "Fruit Plate", "Tea", "Coffee"],
    totalCost: 5600,
    status: "pending",
  },
  {
    id: "cat-6",
    eventId: "evt-6",
    eventTitle: "Tech Innovation Hackathon",
    type: "lunch",
    headCount: 28,
    menuItems: ["Chole Bhature", "Rajma Rice", "Mixed Raita", "Salad", "Ice Cream"],
    totalCost: 8400,
    status: "pending",
  },
  {
    id: "cat-7",
    eventId: "evt-8",
    eventTitle: "Annual Cultural Programme",
    type: "dinner",
    headCount: 250,
    menuItems: ["Paneer Handi", "Chicken Curry", "Biryani", "Naan", "Gulab Jamun", "Cold Drinks"],
    totalCost: 125000,
    status: "delivered",
  },
  {
    id: "cat-8",
    eventId: "evt-9",
    eventTitle: "Finance Review Meeting",
    type: "beverages",
    headCount: 12,
    menuItems: ["Tea", "Coffee", "Green Tea", "Biscuits"],
    totalCost: 1200,
    status: "confirmed",
  },
  {
    id: "cat-9",
    eventId: "evt-10",
    eventTitle: "New Employee Orientation",
    type: "snacks",
    headCount: 25,
    menuItems: ["Kachori", "Dhokla", "Tea", "Coffee", "Fresh Juice"],
    totalCost: 3750,
    status: "pending",
  },
  {
    id: "cat-10",
    eventId: "evt-15",
    eventTitle: "Sales Team Town Hall",
    type: "beverages",
    headCount: 80,
    menuItems: ["Tea", "Coffee", "Cold Coffee", "Cookies"],
    totalCost: 8000,
    status: "pending",
  },
];

// ──────────────────────────────────────────────
// Helper Functions
// ──────────────────────────────────────────────
export function getRoomById(id: string): ConferenceRoom | undefined {
  return conferenceRooms.find((r) => r.id === id);
}

export function getEventsByRoom(roomId: string): ConferenceEvent[] {
  return conferenceEvents.filter((e) => e.roomId === roomId);
}

export function getBookingsByRoom(roomId: string): ConferenceBooking[] {
  return conferenceBookings.filter((b) => b.roomId === roomId);
}

export function getUpcomingEvents(): ConferenceEvent[] {
  return conferenceEvents.filter((e) => e.status === "upcoming" || e.status === "ongoing");
}

export function getTotalRevenue(): number {
  return conferenceBookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.totalCost, 0);
}

export function getMonthlyEventCount(): number {
  return conferenceEvents.filter((e) => e.date.startsWith("2026-02")).length;
}

export function getRoomUtilization(): { name: string; value: number }[] {
  return conferenceRooms.map((room) => {
    const roomBookings = conferenceBookings.filter(
      (b) => b.roomId === room.id && b.status !== "cancelled"
    );
    const totalHours = roomBookings.reduce((sum, b) => {
      const start = parseInt(b.startTime.split(":")[0]);
      const end = parseInt(b.endTime.split(":")[0]);
      return sum + (end - start);
    }, 0);
    return { name: room.name, value: totalHours };
  });
}
