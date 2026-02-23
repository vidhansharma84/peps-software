// ──────────────────────────────────────────────
// Interfaces
// ──────────────────────────────────────────────

export interface Facility {
  id: string;
  name: string;
  type: "court" | "field" | "pool" | "track" | "arena";
  sport: string;
  capacity: number;
  status: "available" | "booked" | "maintenance";
  location: string;
  amenities: string[];
  hourlyRate: number;
}

export interface FacilityBooking {
  id: string;
  facilityId: string;
  facilityName: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: "confirmed" | "pending" | "cancelled";
  participants: number;
}

export interface LeagueTeam {
  name: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  points: number;
}

export interface League {
  id: string;
  name: string;
  sport: string;
  status: "upcoming" | "ongoing" | "completed";
  teams: LeagueTeam[];
  startDate: string;
  endDate: string;
}

export interface BracketMatch {
  id: string;
  round: number;
  matchNumber: number;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
  winner: string | null;
}

export interface Tournament {
  id: string;
  name: string;
  sport: string;
  status: "upcoming" | "ongoing" | "completed";
  startDate: string;
  endDate: string;
  teams: string[];
  bracket: BracketMatch[];
}

export interface SportsEquipmentItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  available: number;
  condition: "good" | "fair" | "poor";
  lastInspection: string;
}

// ──────────────────────────────────────────────
// Facilities (8)
// ──────────────────────────────────────────────

export const facilities: Facility[] = [
  {
    id: "fac-001",
    name: "Rajiv Gandhi Indoor Stadium",
    type: "arena",
    sport: "Badminton",
    capacity: 500,
    status: "available",
    location: "Block A, Ground Floor",
    amenities: ["Wooden Flooring", "Scoreboard", "PA System", "Changing Rooms", "Water Coolers"],
    hourlyRate: 2500,
  },
  {
    id: "fac-002",
    name: "Main Cricket Ground",
    type: "field",
    sport: "Cricket",
    capacity: 2000,
    status: "booked",
    location: "East Campus, Open Area",
    amenities: ["Practice Nets", "Pitch Covers", "Pavilion", "Floodlights", "Sightscreen"],
    hourlyRate: 5000,
  },
  {
    id: "fac-003",
    name: "Olympic Swimming Pool",
    type: "pool",
    sport: "Swimming",
    capacity: 200,
    status: "available",
    location: "Block C, Basement Level",
    amenities: ["Heated Water", "Diving Boards", "Timing System", "Changing Rooms", "Spectator Gallery"],
    hourlyRate: 3000,
  },
  {
    id: "fac-004",
    name: "Synthetic Athletics Track",
    type: "track",
    sport: "Athletics",
    capacity: 300,
    status: "available",
    location: "West Campus, Open Area",
    amenities: ["8 Lanes", "High Jump Pit", "Long Jump Pit", "Shot Put Circle", "Floodlights"],
    hourlyRate: 2000,
  },
  {
    id: "fac-005",
    name: "Tennis Court Complex",
    type: "court",
    sport: "Tennis",
    capacity: 100,
    status: "maintenance",
    location: "Block B, South Wing",
    amenities: ["Clay Surface", "Ball Machine", "Umpire Chair", "Seating Gallery", "Night Lights"],
    hourlyRate: 1500,
  },
  {
    id: "fac-006",
    name: "Basketball Arena",
    type: "court",
    sport: "Basketball",
    capacity: 400,
    status: "booked",
    location: "Block A, First Floor",
    amenities: ["Hardwood Floor", "Shot Clocks", "Scoreboard", "PA System", "AC"],
    hourlyRate: 2000,
  },
  {
    id: "fac-007",
    name: "Football Ground",
    type: "field",
    sport: "Football",
    capacity: 1500,
    status: "available",
    location: "North Campus, Open Area",
    amenities: ["Natural Turf", "Goal Posts", "Corner Flags", "Dugouts", "Floodlights"],
    hourlyRate: 4000,
  },
  {
    id: "fac-008",
    name: "Table Tennis Hall",
    type: "arena",
    sport: "Table Tennis",
    capacity: 80,
    status: "available",
    location: "Block D, Second Floor",
    amenities: ["6 Tables", "Robot Machine", "AC", "Wooden Flooring", "LED Lighting"],
    hourlyRate: 800,
  },
];

// ──────────────────────────────────────────────
// Facility Bookings (20)
// ──────────────────────────────────────────────

export const facilityBookings: FacilityBooking[] = [
  {
    id: "bk-001",
    facilityId: "fac-001",
    facilityName: "Rajiv Gandhi Indoor Stadium",
    userId: "u-001",
    userName: "Rohit Mehta",
    date: "2026-02-23",
    startTime: "06:00",
    endTime: "08:00",
    purpose: "Morning Badminton Practice",
    status: "confirmed",
    participants: 12,
  },
  {
    id: "bk-002",
    facilityId: "fac-002",
    facilityName: "Main Cricket Ground",
    userId: "u-002",
    userName: "Anil Kapoor",
    date: "2026-02-23",
    startTime: "09:00",
    endTime: "12:00",
    purpose: "U-19 Cricket Team Practice",
    status: "confirmed",
    participants: 22,
  },
  {
    id: "bk-003",
    facilityId: "fac-003",
    facilityName: "Olympic Swimming Pool",
    userId: "u-003",
    userName: "Vinod Thakur",
    date: "2026-02-23",
    startTime: "07:00",
    endTime: "09:00",
    purpose: "Swimming Coaching Session",
    status: "confirmed",
    participants: 15,
  },
  {
    id: "bk-004",
    facilityId: "fac-004",
    facilityName: "Synthetic Athletics Track",
    userId: "u-004",
    userName: "Bhavana Reddy",
    date: "2026-02-23",
    startTime: "05:30",
    endTime: "07:30",
    purpose: "Athletics Sprint Training",
    status: "confirmed",
    participants: 18,
  },
  {
    id: "bk-005",
    facilityId: "fac-006",
    facilityName: "Basketball Arena",
    userId: "u-005",
    userName: "Sanjay Kulkarni",
    date: "2026-02-23",
    startTime: "16:00",
    endTime: "18:00",
    purpose: "Staff Basketball Match",
    status: "pending",
    participants: 20,
  },
  {
    id: "bk-006",
    facilityId: "fac-007",
    facilityName: "Football Ground",
    userId: "u-006",
    userName: "Dinesh Chauhan",
    date: "2026-02-23",
    startTime: "15:00",
    endTime: "17:00",
    purpose: "Football Team Practice",
    status: "confirmed",
    participants: 25,
  },
  {
    id: "bk-007",
    facilityId: "fac-008",
    facilityName: "Table Tennis Hall",
    userId: "u-007",
    userName: "Priya Saxena",
    date: "2026-02-23",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "TT Coaching Session",
    status: "confirmed",
    participants: 8,
  },
  {
    id: "bk-008",
    facilityId: "fac-001",
    facilityName: "Rajiv Gandhi Indoor Stadium",
    userId: "u-008",
    userName: "Kavitha Naidu",
    date: "2026-02-24",
    startTime: "14:00",
    endTime: "17:00",
    purpose: "Badminton Tournament Qualifier",
    status: "pending",
    participants: 32,
  },
  {
    id: "bk-009",
    facilityId: "fac-002",
    facilityName: "Main Cricket Ground",
    userId: "u-009",
    userName: "Manoj Kumar",
    date: "2026-02-24",
    startTime: "06:00",
    endTime: "09:00",
    purpose: "Inter-department Cricket Match",
    status: "confirmed",
    participants: 30,
  },
  {
    id: "bk-010",
    facilityId: "fac-003",
    facilityName: "Olympic Swimming Pool",
    userId: "u-010",
    userName: "Deepa Nair",
    date: "2026-02-24",
    startTime: "16:00",
    endTime: "18:00",
    purpose: "Aqua Aerobics Class",
    status: "pending",
    participants: 20,
  },
  {
    id: "bk-011",
    facilityId: "fac-004",
    facilityName: "Synthetic Athletics Track",
    userId: "u-011",
    userName: "Suresh Babu",
    date: "2026-02-25",
    startTime: "06:00",
    endTime: "08:00",
    purpose: "Marathon Training",
    status: "confirmed",
    participants: 35,
  },
  {
    id: "bk-012",
    facilityId: "fac-006",
    facilityName: "Basketball Arena",
    userId: "u-012",
    userName: "Arjun Malhotra",
    date: "2026-02-25",
    startTime: "18:00",
    endTime: "20:00",
    purpose: "Inter-college Basketball Friendly",
    status: "confirmed",
    participants: 24,
  },
  {
    id: "bk-013",
    facilityId: "fac-007",
    facilityName: "Football Ground",
    userId: "u-013",
    userName: "Harpreet Singh",
    date: "2026-02-25",
    startTime: "16:00",
    endTime: "18:00",
    purpose: "Football League Match",
    status: "pending",
    participants: 30,
  },
  {
    id: "bk-014",
    facilityId: "fac-008",
    facilityName: "Table Tennis Hall",
    userId: "u-014",
    userName: "Rekha Joshi",
    date: "2026-02-25",
    startTime: "11:00",
    endTime: "13:00",
    purpose: "Recreational TT Session",
    status: "cancelled",
    participants: 6,
  },
  {
    id: "bk-015",
    facilityId: "fac-001",
    facilityName: "Rajiv Gandhi Indoor Stadium",
    userId: "u-015",
    userName: "Divya Subramaniam",
    date: "2026-02-26",
    startTime: "09:00",
    endTime: "11:00",
    purpose: "Kho-Kho Practice",
    status: "confirmed",
    participants: 24,
  },
  {
    id: "bk-016",
    facilityId: "fac-002",
    facilityName: "Main Cricket Ground",
    userId: "u-002",
    userName: "Anil Kapoor",
    date: "2026-02-26",
    startTime: "14:00",
    endTime: "17:00",
    purpose: "Cricket Net Session",
    status: "confirmed",
    participants: 16,
  },
  {
    id: "bk-017",
    facilityId: "fac-003",
    facilityName: "Olympic Swimming Pool",
    userId: "u-003",
    userName: "Vinod Thakur",
    date: "2026-02-26",
    startTime: "06:00",
    endTime: "08:00",
    purpose: "Competitive Swim Practice",
    status: "pending",
    participants: 10,
  },
  {
    id: "bk-018",
    facilityId: "fac-007",
    facilityName: "Football Ground",
    userId: "u-006",
    userName: "Dinesh Chauhan",
    date: "2026-02-27",
    startTime: "06:00",
    endTime: "08:00",
    purpose: "Morning Fitness Drills",
    status: "confirmed",
    participants: 22,
  },
  {
    id: "bk-019",
    facilityId: "fac-004",
    facilityName: "Synthetic Athletics Track",
    userId: "u-004",
    userName: "Bhavana Reddy",
    date: "2026-02-27",
    startTime: "16:00",
    endTime: "18:00",
    purpose: "Relay Race Rehearsal",
    status: "cancelled",
    participants: 16,
  },
  {
    id: "bk-020",
    facilityId: "fac-006",
    facilityName: "Basketball Arena",
    userId: "u-005",
    userName: "Sanjay Kulkarni",
    date: "2026-02-28",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "Interdepartment Tournament Finals",
    status: "pending",
    participants: 28,
  },
];

// ──────────────────────────────────────────────
// Leagues (4)
// ──────────────────────────────────────────────

export const leagues: League[] = [
  {
    id: "league-001",
    name: "PEPS Inter-Department Cricket League",
    sport: "Cricket",
    status: "ongoing",
    startDate: "2026-01-15",
    endDate: "2026-03-30",
    teams: [
      { name: "Gym Warriors", played: 6, won: 5, lost: 1, drawn: 0, points: 10 },
      { name: "Medical Mavericks", played: 6, won: 4, lost: 1, drawn: 1, points: 9 },
      { name: "Sports Strikers", played: 6, won: 3, lost: 2, drawn: 1, points: 7 },
      { name: "Canteen Kings", played: 6, won: 3, lost: 3, drawn: 0, points: 6 },
      { name: "Dorm Defenders", played: 6, won: 2, lost: 3, drawn: 1, points: 5 },
      { name: "Coach Chargers", played: 6, won: 1, lost: 4, drawn: 1, points: 3 },
      { name: "Finance Falcons", played: 6, won: 1, lost: 5, drawn: 0, points: 2 },
      { name: "Admin Aces", played: 6, won: 0, lost: 5, drawn: 1, points: 1 },
    ],
  },
  {
    id: "league-002",
    name: "PEPS Badminton Premier League",
    sport: "Badminton",
    status: "ongoing",
    startDate: "2026-02-01",
    endDate: "2026-04-15",
    teams: [
      { name: "Shuttle Stars", played: 4, won: 4, lost: 0, drawn: 0, points: 8 },
      { name: "Net Ninjas", played: 4, won: 3, lost: 1, drawn: 0, points: 6 },
      { name: "Smash Kings", played: 4, won: 2, lost: 2, drawn: 0, points: 4 },
      { name: "Rally Racers", played: 4, won: 1, lost: 3, drawn: 0, points: 2 },
      { name: "Drop Shot Divas", played: 4, won: 0, lost: 4, drawn: 0, points: 0 },
    ],
  },
  {
    id: "league-003",
    name: "PEPS Football League 2026",
    sport: "Football",
    status: "upcoming",
    startDate: "2026-03-10",
    endDate: "2026-05-20",
    teams: [
      { name: "Red Rovers", played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
      { name: "Blue Blazers", played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
      { name: "Green Giants", played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
      { name: "Yellow Yetis", played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
      { name: "Orange Outlaws", played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
      { name: "Purple Panthers", played: 0, won: 0, lost: 0, drawn: 0, points: 0 },
    ],
  },
  {
    id: "league-004",
    name: "PEPS Basketball Championship 2025",
    sport: "Basketball",
    status: "completed",
    startDate: "2025-10-01",
    endDate: "2025-12-20",
    teams: [
      { name: "Hoop Heroes", played: 8, won: 7, lost: 1, drawn: 0, points: 14 },
      { name: "Dunk Masters", played: 8, won: 6, lost: 2, drawn: 0, points: 12 },
      { name: "Court Crushers", played: 8, won: 4, lost: 4, drawn: 0, points: 8 },
      { name: "Basket Blazers", played: 8, won: 2, lost: 6, drawn: 0, points: 4 },
      { name: "Rebound Rebels", played: 8, won: 1, lost: 7, drawn: 0, points: 2 },
    ],
  },
];

// ──────────────────────────────────────────────
// Tournaments (3)
// ──────────────────────────────────────────────

export const tournaments: Tournament[] = [
  {
    id: "tourn-001",
    name: "PEPS Annual Badminton Open 2026",
    sport: "Badminton",
    status: "ongoing",
    startDate: "2026-02-15",
    endDate: "2026-03-01",
    teams: [
      "Rohit Mehta", "Ananya Sharma", "Vikram Das", "Sneha Patel",
      "Karan Joshi", "Priya Nair", "Amit Deshmukh", "Neha Gupta",
    ],
    bracket: [
      { id: "m-001", round: 1, matchNumber: 1, team1: "Rohit Mehta", team2: "Neha Gupta", score1: 21, score2: 15, winner: "Rohit Mehta" },
      { id: "m-002", round: 1, matchNumber: 2, team1: "Ananya Sharma", team2: "Amit Deshmukh", score1: 21, score2: 18, winner: "Ananya Sharma" },
      { id: "m-003", round: 1, matchNumber: 3, team1: "Vikram Das", team2: "Priya Nair", score1: 19, score2: 21, winner: "Priya Nair" },
      { id: "m-004", round: 1, matchNumber: 4, team1: "Sneha Patel", team2: "Karan Joshi", score1: 21, score2: 17, winner: "Sneha Patel" },
      { id: "m-005", round: 2, matchNumber: 1, team1: "Rohit Mehta", team2: "Ananya Sharma", score1: 21, score2: 19, winner: "Rohit Mehta" },
      { id: "m-006", round: 2, matchNumber: 2, team1: "Priya Nair", team2: "Sneha Patel", score1: null, score2: null, winner: null },
      { id: "m-007", round: 3, matchNumber: 1, team1: "Rohit Mehta", team2: "TBD", score1: null, score2: null, winner: null },
    ],
  },
  {
    id: "tourn-002",
    name: "PEPS Cricket Knockout Cup 2026",
    sport: "Cricket",
    status: "upcoming",
    startDate: "2026-03-15",
    endDate: "2026-04-10",
    teams: [
      "Gym Warriors", "Medical Mavericks", "Sports Strikers", "Canteen Kings",
      "Dorm Defenders", "Coach Chargers", "Finance Falcons", "Admin Aces",
    ],
    bracket: [
      { id: "m-101", round: 1, matchNumber: 1, team1: "Gym Warriors", team2: "Admin Aces", score1: null, score2: null, winner: null },
      { id: "m-102", round: 1, matchNumber: 2, team1: "Medical Mavericks", team2: "Finance Falcons", score1: null, score2: null, winner: null },
      { id: "m-103", round: 1, matchNumber: 3, team1: "Sports Strikers", team2: "Coach Chargers", score1: null, score2: null, winner: null },
      { id: "m-104", round: 1, matchNumber: 4, team1: "Canteen Kings", team2: "Dorm Defenders", score1: null, score2: null, winner: null },
      { id: "m-105", round: 2, matchNumber: 1, team1: "TBD", team2: "TBD", score1: null, score2: null, winner: null },
      { id: "m-106", round: 2, matchNumber: 2, team1: "TBD", team2: "TBD", score1: null, score2: null, winner: null },
      { id: "m-107", round: 3, matchNumber: 1, team1: "TBD", team2: "TBD", score1: null, score2: null, winner: null },
    ],
  },
  {
    id: "tourn-003",
    name: "PEPS Table Tennis Championship 2025",
    sport: "Table Tennis",
    status: "completed",
    startDate: "2025-11-01",
    endDate: "2025-11-20",
    teams: [
      "Arjun M.", "Deepak T.", "Kavitha N.", "Manoj K.",
      "Priya S.", "Vinod T.", "Rekha J.", "Suresh B.",
    ],
    bracket: [
      { id: "m-201", round: 1, matchNumber: 1, team1: "Arjun M.", team2: "Suresh B.", score1: 3, score2: 1, winner: "Arjun M." },
      { id: "m-202", round: 1, matchNumber: 2, team1: "Deepak T.", team2: "Rekha J.", score1: 3, score2: 2, winner: "Deepak T." },
      { id: "m-203", round: 1, matchNumber: 3, team1: "Kavitha N.", team2: "Vinod T.", score1: 1, score2: 3, winner: "Vinod T." },
      { id: "m-204", round: 1, matchNumber: 4, team1: "Manoj K.", team2: "Priya S.", score1: 3, score2: 0, winner: "Manoj K." },
      { id: "m-205", round: 2, matchNumber: 1, team1: "Arjun M.", team2: "Deepak T.", score1: 3, score2: 2, winner: "Arjun M." },
      { id: "m-206", round: 2, matchNumber: 2, team1: "Vinod T.", team2: "Manoj K.", score1: 1, score2: 3, winner: "Manoj K." },
      { id: "m-207", round: 3, matchNumber: 1, team1: "Arjun M.", team2: "Manoj K.", score1: 3, score2: 1, winner: "Arjun M." },
    ],
  },
];

// ──────────────────────────────────────────────
// Sports Equipment (15)
// ──────────────────────────────────────────────

export const sportsEquipment: SportsEquipmentItem[] = [
  { id: "eq-001", name: "Badminton Rackets (Yonex Astrox)", category: "Badminton", quantity: 30, available: 22, condition: "good", lastInspection: "2026-02-10" },
  { id: "eq-002", name: "Shuttlecocks (Feather)", category: "Badminton", quantity: 200, available: 145, condition: "good", lastInspection: "2026-02-15" },
  { id: "eq-003", name: "Cricket Bats (SG)", category: "Cricket", quantity: 20, available: 14, condition: "good", lastInspection: "2026-02-01" },
  { id: "eq-004", name: "Cricket Balls (SG Test)", category: "Cricket", quantity: 50, available: 30, condition: "fair", lastInspection: "2026-01-20" },
  { id: "eq-005", name: "Cricket Pads & Gloves Sets", category: "Cricket", quantity: 15, available: 10, condition: "good", lastInspection: "2026-02-05" },
  { id: "eq-006", name: "Footballs (Nivia Ashtang)", category: "Football", quantity: 25, available: 18, condition: "good", lastInspection: "2026-02-12" },
  { id: "eq-007", name: "Football Goal Nets", category: "Football", quantity: 4, available: 4, condition: "fair", lastInspection: "2026-01-15" },
  { id: "eq-008", name: "Basketballs (Spalding)", category: "Basketball", quantity: 20, available: 15, condition: "good", lastInspection: "2026-02-08" },
  { id: "eq-009", name: "Tennis Rackets (Wilson)", category: "Tennis", quantity: 16, available: 8, condition: "fair", lastInspection: "2026-01-25" },
  { id: "eq-010", name: "Tennis Balls (Championship)", category: "Tennis", quantity: 100, available: 60, condition: "good", lastInspection: "2026-02-18" },
  { id: "eq-011", name: "Table Tennis Paddles (Butterfly)", category: "Table Tennis", quantity: 24, available: 18, condition: "good", lastInspection: "2026-02-14" },
  { id: "eq-012", name: "Table Tennis Balls (3-star)", category: "Table Tennis", quantity: 150, available: 95, condition: "good", lastInspection: "2026-02-14" },
  { id: "eq-013", name: "Swimming Goggles (Speedo)", category: "Swimming", quantity: 40, available: 28, condition: "fair", lastInspection: "2026-02-03" },
  { id: "eq-014", name: "Starting Blocks (Athletics)", category: "Athletics", quantity: 8, available: 8, condition: "good", lastInspection: "2026-01-30" },
  { id: "eq-015", name: "Shot Put & Discus Set", category: "Athletics", quantity: 6, available: 4, condition: "poor", lastInspection: "2025-12-20" },
];
