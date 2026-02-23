// ──────────────────────────────────────────────
// Interfaces
// ──────────────────────────────────────────────

export interface Coach {
  id: string;
  name: string;
  sport: string;
  specialization: string;
  experience: number;
  certifications: string[];
  athleteCount: number;
  rating: number;
  status: "active" | "inactive" | "on_leave";
  phone: string;
  email: string;
  avatar: string;
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  coachId: string;
  level: "beginner" | "intermediate" | "advanced" | "elite";
  personalBests: Record<string, string>;
  age: number;
}

export interface PerformanceRecord {
  id: string;
  athleteId: string;
  athleteName: string;
  coachId: string;
  date: string;
  sport: string;
  metrics: {
    speed: number;
    endurance: number;
    technique: number;
  };
  notes: string;
  rating: number;
}

export interface Certification {
  id: string;
  coachId: string;
  coachName: string;
  name: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  status: "active" | "expiring_soon" | "expired";
}

// ──────────────────────────────────────────────
// Coaches (10)
// ──────────────────────────────────────────────

export const coaches: Coach[] = [
  {
    id: "coach-001",
    name: "Harpreet Singh",
    sport: "Cricket",
    specialization: "Batting & Fielding",
    experience: 15,
    certifications: ["BCCI Level 3", "ICC Coaching Certificate"],
    athleteCount: 8,
    rating: 4.8,
    status: "active",
    phone: "+91 99001 10008",
    email: "harpreet.singh@peps.edu.in",
    avatar: "",
  },
  {
    id: "coach-002",
    name: "Anil Kapoor",
    sport: "Cricket",
    specialization: "Bowling & Strategy",
    experience: 12,
    certifications: ["BCCI Level 2", "NIS Diploma"],
    athleteCount: 6,
    rating: 4.6,
    status: "active",
    phone: "+91 98210 22015",
    email: "anil.kapoor@peps.edu.in",
    avatar: "",
  },
  {
    id: "coach-003",
    name: "Bhavana Reddy",
    sport: "Athletics",
    specialization: "Sprints & Hurdles",
    experience: 10,
    certifications: ["AFI Level 2", "IAAF Coaching Certificate"],
    athleteCount: 5,
    rating: 4.7,
    status: "active",
    phone: "+91 98210 22016",
    email: "bhavana.reddy@peps.edu.in",
    avatar: "",
  },
  {
    id: "coach-004",
    name: "Dinesh Chauhan",
    sport: "Football",
    specialization: "Midfield Tactics & Set Pieces",
    experience: 8,
    certifications: ["AIFF D License", "AFC C License"],
    athleteCount: 4,
    rating: 4.5,
    status: "active",
    phone: "+91 97890 33013",
    email: "dinesh.chauhan@peps.edu.in",
    avatar: "",
  },
  {
    id: "coach-005",
    name: "Smita Kulkarni",
    sport: "Tennis",
    specialization: "Singles Strategy & Serve Technique",
    experience: 9,
    certifications: ["ITF Level 1", "AITA Coaching Certificate"],
    athleteCount: 3,
    rating: 4.4,
    status: "on_leave",
    phone: "+91 97890 33052",
    email: "smita.kulkarni@peps.edu.in",
    avatar: "",
  },
  {
    id: "coach-006",
    name: "Vinod Thakur",
    sport: "Swimming",
    specialization: "Freestyle & Butterfly",
    experience: 11,
    certifications: ["SFI Level 2", "FINA Coaching Diploma"],
    athleteCount: 4,
    rating: 4.6,
    status: "active",
    phone: "+91 97890 33007",
    email: "vinod.thakur@peps.edu.in",
    avatar: "",
  },
  {
    id: "coach-007",
    name: "Priya Saxena",
    sport: "Badminton",
    specialization: "Singles & Doubles Strategy",
    experience: 7,
    certifications: ["BAI Level 1", "BWF Shuttle Time Trainer"],
    athleteCount: 3,
    rating: 4.3,
    status: "inactive",
    phone: "+91 97890 33008",
    email: "priya.saxena@peps.edu.in",
    avatar: "",
  },
  {
    id: "coach-008",
    name: "Rajendra Prasad",
    sport: "Basketball",
    specialization: "Offense Plays & Conditioning",
    experience: 13,
    certifications: ["BFI Level 2", "FIBA Mini Basketball Instructor"],
    athleteCount: 5,
    rating: 4.5,
    status: "active",
    phone: "+91 98765 44001",
    email: "rajendra.prasad@peps.edu.in",
    avatar: "",
  },
  {
    id: "coach-009",
    name: "Kavitha Naidu",
    sport: "Hockey",
    specialization: "Defense & Penalty Corners",
    experience: 14,
    certifications: ["Hockey India Level 3", "FIH Academy Coach"],
    athleteCount: 6,
    rating: 4.7,
    status: "active",
    phone: "+91 99001 10004",
    email: "kavitha.naidu@peps.edu.in",
    avatar: "",
  },
  {
    id: "coach-010",
    name: "Manoj Kumar",
    sport: "Athletics",
    specialization: "Long Distance & Marathon",
    experience: 16,
    certifications: ["AFI Level 3", "IAAF Kids Athletics Instructor"],
    athleteCount: 4,
    rating: 4.8,
    status: "active",
    phone: "+91 98210 22007",
    email: "manoj.kumar@peps.edu.in",
    avatar: "",
  },
];

// ──────────────────────────────────────────────
// Athletes (25)
// ──────────────────────────────────────────────

export const athletes: Athlete[] = [
  { id: "ath-001", name: "Rohit Mehta", sport: "Cricket", coachId: "coach-001", level: "elite", personalBests: { "100m Sprint": "11.2s", "Batting Avg": "48.5" }, age: 22 },
  { id: "ath-002", name: "Saurabh Pandey", sport: "Cricket", coachId: "coach-001", level: "advanced", personalBests: { "Batting Avg": "42.3", "Catches": "18" }, age: 20 },
  { id: "ath-003", name: "Aditya Sharma", sport: "Cricket", coachId: "coach-001", level: "intermediate", personalBests: { "Batting Avg": "35.1", "Fielding Rating": "82%" }, age: 19 },
  { id: "ath-004", name: "Ishaan Trivedi", sport: "Cricket", coachId: "coach-002", level: "advanced", personalBests: { "Bowling Avg": "22.4", "Economy": "4.8" }, age: 21 },
  { id: "ath-005", name: "Tanvi Bhatt", sport: "Cricket", coachId: "coach-002", level: "elite", personalBests: { "Bowling Avg": "18.7", "Wickets": "45" }, age: 23 },
  { id: "ath-006", name: "Deepika Nair", sport: "Athletics", coachId: "coach-003", level: "elite", personalBests: { "100m": "11.8s", "200m": "24.1s" }, age: 20 },
  { id: "ath-007", name: "Vikram Rathore", sport: "Athletics", coachId: "coach-003", level: "advanced", personalBests: { "110m Hurdles": "14.5s", "Long Jump": "7.2m" }, age: 21 },
  { id: "ath-008", name: "Anjali Deshmukh", sport: "Athletics", coachId: "coach-003", level: "intermediate", personalBests: { "400m": "56.3s", "800m": "2:12" }, age: 18 },
  { id: "ath-009", name: "Karan Gill", sport: "Football", coachId: "coach-004", level: "advanced", personalBests: { "Goals": "14", "Assists": "9" }, age: 22 },
  { id: "ath-010", name: "Manpreet Kaur", sport: "Football", coachId: "coach-004", level: "intermediate", personalBests: { "Goals": "8", "Pass Accuracy": "78%" }, age: 19 },
  { id: "ath-011", name: "Arjun Sinha", sport: "Football", coachId: "coach-004", level: "beginner", personalBests: { "Goals": "3", "Tackles": "22" }, age: 17 },
  { id: "ath-012", name: "Neha Gupta", sport: "Tennis", coachId: "coach-005", level: "advanced", personalBests: { "Serve Speed": "165 km/h", "Aces": "42" }, age: 20 },
  { id: "ath-013", name: "Rahul Joshi", sport: "Tennis", coachId: "coach-005", level: "intermediate", personalBests: { "Serve Speed": "148 km/h", "Win Rate": "62%" }, age: 18 },
  { id: "ath-014", name: "Pooja Verma", sport: "Swimming", coachId: "coach-006", level: "elite", personalBests: { "50m Freestyle": "26.8s", "100m Butterfly": "1:02.4" }, age: 21 },
  { id: "ath-015", name: "Sameer Khan", sport: "Swimming", coachId: "coach-006", level: "advanced", personalBests: { "100m Freestyle": "52.3s", "200m IM": "2:14" }, age: 20 },
  { id: "ath-016", name: "Divya Pillai", sport: "Swimming", coachId: "coach-006", level: "intermediate", personalBests: { "50m Backstroke": "33.1s", "100m Freestyle": "1:01.2" }, age: 18 },
  { id: "ath-017", name: "Rishi Agarwal", sport: "Badminton", coachId: "coach-007", level: "advanced", personalBests: { "Smash Speed": "310 km/h", "Win Rate": "71%" }, age: 22 },
  { id: "ath-018", name: "Sneha Rao", sport: "Badminton", coachId: "coach-007", level: "intermediate", personalBests: { "Smash Speed": "280 km/h", "Rally Length": "18" }, age: 19 },
  { id: "ath-019", name: "Akash Tiwari", sport: "Basketball", coachId: "coach-008", level: "elite", personalBests: { "Points/Game": "22.5", "Rebounds": "8.3" }, age: 23 },
  { id: "ath-020", name: "Meera Iyer", sport: "Basketball", coachId: "coach-008", level: "advanced", personalBests: { "Points/Game": "16.2", "Assists": "5.7" }, age: 21 },
  { id: "ath-021", name: "Sunil Chavan", sport: "Basketball", coachId: "coach-008", level: "beginner", personalBests: { "Points/Game": "6.4", "Steals": "2.1" }, age: 18 },
  { id: "ath-022", name: "Gauri Deshpande", sport: "Hockey", coachId: "coach-009", level: "elite", personalBests: { "Goals": "28", "Penalty Corners": "15" }, age: 22 },
  { id: "ath-023", name: "Naveen Reddy", sport: "Hockey", coachId: "coach-009", level: "advanced", personalBests: { "Goals": "16", "Tackles": "34" }, age: 20 },
  { id: "ath-024", name: "Fatima Sheikh", sport: "Athletics", coachId: "coach-010", level: "advanced", personalBests: { "5000m": "17:42", "10000m": "36:15" }, age: 21 },
  { id: "ath-025", name: "Ramesh Yadav", sport: "Athletics", coachId: "coach-010", level: "intermediate", personalBests: { "Marathon": "3:12:45", "Half Marathon": "1:28:30" }, age: 24 },
];

// ──────────────────────────────────────────────
// Performance Records (15)
// ──────────────────────────────────────────────

export const performanceRecords: PerformanceRecord[] = [
  { id: "perf-001", athleteId: "ath-001", athleteName: "Rohit Mehta", coachId: "coach-001", date: "2026-02-20T10:00:00.000Z", sport: "Cricket", metrics: { speed: 88, endurance: 82, technique: 92 }, notes: "Excellent batting form, needs to work on running between wickets", rating: 4.5 },
  { id: "perf-002", athleteId: "ath-005", athleteName: "Tanvi Bhatt", coachId: "coach-002", date: "2026-02-19T09:00:00.000Z", sport: "Cricket", metrics: { speed: 78, endurance: 85, technique: 90 }, notes: "Outstanding swing bowling, improved accuracy by 15%", rating: 4.7 },
  { id: "perf-003", athleteId: "ath-006", athleteName: "Deepika Nair", coachId: "coach-003", date: "2026-02-18T07:00:00.000Z", sport: "Athletics", metrics: { speed: 95, endurance: 80, technique: 88 }, notes: "Personal best in 100m, explosive start improvement", rating: 4.8 },
  { id: "perf-004", athleteId: "ath-009", athleteName: "Karan Gill", coachId: "coach-004", date: "2026-02-17T16:00:00.000Z", sport: "Football", metrics: { speed: 82, endurance: 88, technique: 78 }, notes: "Good midfield control, set piece delivery improved", rating: 4.2 },
  { id: "perf-005", athleteId: "ath-014", athleteName: "Pooja Verma", coachId: "coach-006", date: "2026-02-16T06:00:00.000Z", sport: "Swimming", metrics: { speed: 92, endurance: 90, technique: 94 }, notes: "Near-national record in 50m freestyle, breathing technique refined", rating: 4.9 },
  { id: "perf-006", athleteId: "ath-019", athleteName: "Akash Tiwari", coachId: "coach-008", date: "2026-02-15T17:00:00.000Z", sport: "Basketball", metrics: { speed: 80, endurance: 84, technique: 86 }, notes: "Consistent three-point shooting, court vision improving", rating: 4.4 },
  { id: "perf-007", athleteId: "ath-022", athleteName: "Gauri Deshpande", coachId: "coach-009", date: "2026-02-14T08:00:00.000Z", sport: "Hockey", metrics: { speed: 86, endurance: 88, technique: 92 }, notes: "Excellent drag flick technique, penalty corner conversion rate up", rating: 4.7 },
  { id: "perf-008", athleteId: "ath-002", athleteName: "Saurabh Pandey", coachId: "coach-001", date: "2026-02-13T10:00:00.000Z", sport: "Cricket", metrics: { speed: 75, endurance: 78, technique: 80 }, notes: "Improving footwork, needs more match practice", rating: 3.8 },
  { id: "perf-009", athleteId: "ath-007", athleteName: "Vikram Rathore", coachId: "coach-003", date: "2026-02-12T07:30:00.000Z", sport: "Athletics", metrics: { speed: 88, endurance: 76, technique: 84 }, notes: "Hurdle clearance improved, stride pattern needs attention", rating: 4.1 },
  { id: "perf-010", athleteId: "ath-015", athleteName: "Sameer Khan", coachId: "coach-006", date: "2026-02-11T06:30:00.000Z", sport: "Swimming", metrics: { speed: 84, endurance: 82, technique: 86 }, notes: "Freestyle turn technique improved, building endurance base", rating: 4.0 },
  { id: "perf-011", athleteId: "ath-017", athleteName: "Rishi Agarwal", coachId: "coach-007", date: "2026-02-10T15:00:00.000Z", sport: "Badminton", metrics: { speed: 90, endurance: 78, technique: 85 }, notes: "Net play excellent, deception shots improving", rating: 4.3 },
  { id: "perf-012", athleteId: "ath-024", athleteName: "Fatima Sheikh", coachId: "coach-010", date: "2026-02-09T06:00:00.000Z", sport: "Athletics", metrics: { speed: 76, endurance: 94, technique: 82 }, notes: "Marathon pace consistency excellent, hill training showing results", rating: 4.5 },
  { id: "perf-013", athleteId: "ath-012", athleteName: "Neha Gupta", coachId: "coach-005", date: "2026-02-08T09:00:00.000Z", sport: "Tennis", metrics: { speed: 82, endurance: 80, technique: 88 }, notes: "Serve accuracy improved, backhand needs more work", rating: 4.2 },
  { id: "perf-014", athleteId: "ath-020", athleteName: "Meera Iyer", coachId: "coach-008", date: "2026-02-07T17:00:00.000Z", sport: "Basketball", metrics: { speed: 78, endurance: 82, technique: 80 }, notes: "Good court awareness, layup technique refined", rating: 3.9 },
  { id: "perf-015", athleteId: "ath-023", athleteName: "Naveen Reddy", coachId: "coach-009", date: "2026-02-06T08:30:00.000Z", sport: "Hockey", metrics: { speed: 84, endurance: 86, technique: 80 }, notes: "Strong tackling, positional play improving steadily", rating: 4.1 },
];

// ──────────────────────────────────────────────
// Certifications (12)
// ──────────────────────────────────────────────

export const certifications: Certification[] = [
  { id: "cert-001", coachId: "coach-001", coachName: "Harpreet Singh", name: "BCCI Level 3 Coaching", issuedBy: "Board of Control for Cricket in India", issuedDate: "2022-03-15T00:00:00.000Z", expiryDate: "2027-03-14T00:00:00.000Z", status: "active" },
  { id: "cert-002", coachId: "coach-001", coachName: "Harpreet Singh", name: "ICC Coaching Certificate", issuedBy: "International Cricket Council", issuedDate: "2021-06-20T00:00:00.000Z", expiryDate: "2026-06-19T00:00:00.000Z", status: "active" },
  { id: "cert-003", coachId: "coach-002", coachName: "Anil Kapoor", name: "BCCI Level 2 Coaching", issuedBy: "Board of Control for Cricket in India", issuedDate: "2023-01-10T00:00:00.000Z", expiryDate: "2026-01-09T00:00:00.000Z", status: "expired" },
  { id: "cert-004", coachId: "coach-003", coachName: "Bhavana Reddy", name: "AFI Level 2 Certification", issuedBy: "Athletics Federation of India", issuedDate: "2023-07-01T00:00:00.000Z", expiryDate: "2026-06-30T00:00:00.000Z", status: "expiring_soon" },
  { id: "cert-005", coachId: "coach-004", coachName: "Dinesh Chauhan", name: "AIFF D License", issuedBy: "All India Football Federation", issuedDate: "2024-02-15T00:00:00.000Z", expiryDate: "2027-02-14T00:00:00.000Z", status: "active" },
  { id: "cert-006", coachId: "coach-005", coachName: "Smita Kulkarni", name: "ITF Level 1 Coaching", issuedBy: "International Tennis Federation", issuedDate: "2022-11-01T00:00:00.000Z", expiryDate: "2025-10-31T00:00:00.000Z", status: "expired" },
  { id: "cert-007", coachId: "coach-006", coachName: "Vinod Thakur", name: "SFI Level 2 Certification", issuedBy: "Swimming Federation of India", issuedDate: "2023-05-20T00:00:00.000Z", expiryDate: "2026-05-19T00:00:00.000Z", status: "expiring_soon" },
  { id: "cert-008", coachId: "coach-007", coachName: "Priya Saxena", name: "BAI Level 1 Coaching", issuedBy: "Badminton Association of India", issuedDate: "2024-01-10T00:00:00.000Z", expiryDate: "2027-01-09T00:00:00.000Z", status: "active" },
  { id: "cert-009", coachId: "coach-008", coachName: "Rajendra Prasad", name: "BFI Level 2 Coaching", issuedBy: "Basketball Federation of India", issuedDate: "2022-08-15T00:00:00.000Z", expiryDate: "2025-08-14T00:00:00.000Z", status: "expired" },
  { id: "cert-010", coachId: "coach-009", coachName: "Kavitha Naidu", name: "Hockey India Level 3", issuedBy: "Hockey India", issuedDate: "2023-04-01T00:00:00.000Z", expiryDate: "2028-03-31T00:00:00.000Z", status: "active" },
  { id: "cert-011", coachId: "coach-009", coachName: "Kavitha Naidu", name: "FIH Academy Coach", issuedBy: "International Hockey Federation", issuedDate: "2024-06-10T00:00:00.000Z", expiryDate: "2027-06-09T00:00:00.000Z", status: "active" },
  { id: "cert-012", coachId: "coach-010", coachName: "Manoj Kumar", name: "AFI Level 3 Certification", issuedBy: "Athletics Federation of India", issuedDate: "2023-09-01T00:00:00.000Z", expiryDate: "2026-08-31T00:00:00.000Z", status: "active" },
];
