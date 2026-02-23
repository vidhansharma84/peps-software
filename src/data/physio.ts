// ============================================================
// Physio & Spa Module - Data & Interfaces
// ============================================================

export interface Therapist {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  rating: number;
  status: "available" | "busy" | "off_duty";
  phone: string;
  email: string;
  sessionsCompleted: number;
}

export interface PhysioAppointment {
  id: string;
  patientId: string;
  patientName: string;
  therapistId: string;
  therapistName: string;
  date: string;
  time: string;
  duration: number;
  type:
    | "physiotherapy"
    | "massage"
    | "acupuncture"
    | "hydrotherapy"
    | "spa_treatment";
  status: "scheduled" | "completed" | "cancelled" | "in_progress";
  notes: string;
  fee: number;
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: "physiotherapy" | "massage" | "spa" | "wellness";
  popularity: number;
}

export interface SpaPackage {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  includes: string[];
  popular: boolean;
}

export interface TreatmentRecord {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  therapistName: string;
  date: string;
  treatment: string;
  painLevelBefore: number;
  painLevelAfter: number;
  mobilityScore: number;
  notes: string;
  progress: "improving" | "stable" | "declining";
}

// ── Therapists ──────────────────────────────────────────────
export const therapists: Therapist[] = [
  {
    id: "TH001",
    name: "Dr. Ananya Sharma",
    specialization: "Sports Physiotherapy",
    qualification: "BPT, MPT (Sports)",
    experience: 12,
    rating: 4.9,
    status: "available",
    phone: "+91 98765 43210",
    email: "ananya.sharma@peps.in",
    sessionsCompleted: 2450,
  },
  {
    id: "TH002",
    name: "Dr. Rajesh Menon",
    specialization: "Orthopaedic Rehabilitation",
    qualification: "BPT, MPT (Ortho)",
    experience: 15,
    rating: 4.8,
    status: "busy",
    phone: "+91 98765 43211",
    email: "rajesh.menon@peps.in",
    sessionsCompleted: 3120,
  },
  {
    id: "TH003",
    name: "Priya Nair",
    specialization: "Therapeutic Massage",
    qualification: "CIBTAC, Diploma in Massage Therapy",
    experience: 8,
    rating: 4.7,
    status: "available",
    phone: "+91 98765 43212",
    email: "priya.nair@peps.in",
    sessionsCompleted: 1850,
  },
  {
    id: "TH004",
    name: "Dr. Vikram Patel",
    specialization: "Acupuncture & Pain Management",
    qualification: "BAMS, Certified Acupuncturist",
    experience: 10,
    rating: 4.6,
    status: "available",
    phone: "+91 98765 43213",
    email: "vikram.patel@peps.in",
    sessionsCompleted: 2100,
  },
  {
    id: "TH005",
    name: "Deepika Reddy",
    specialization: "Hydrotherapy & Aquatic Rehab",
    qualification: "BPT, Aquatic Therapy Certification",
    experience: 6,
    rating: 4.5,
    status: "busy",
    phone: "+91 98765 43214",
    email: "deepika.reddy@peps.in",
    sessionsCompleted: 980,
  },
  {
    id: "TH006",
    name: "Arjun Deshmukh",
    specialization: "Spa & Wellness Therapy",
    qualification: "Diploma in Spa Management, CIDESCO",
    experience: 9,
    rating: 4.8,
    status: "off_duty",
    phone: "+91 98765 43215",
    email: "arjun.deshmukh@peps.in",
    sessionsCompleted: 1670,
  },
  {
    id: "TH007",
    name: "Dr. Kavitha Iyer",
    specialization: "Neurological Physiotherapy",
    qualification: "BPT, MPT (Neuro)",
    experience: 14,
    rating: 4.9,
    status: "available",
    phone: "+91 98765 43216",
    email: "kavitha.iyer@peps.in",
    sessionsCompleted: 2890,
  },
  {
    id: "TH008",
    name: "Suresh Kumar",
    specialization: "Ayurvedic Massage & Therapy",
    qualification: "BAMS, Panchakarma Specialist",
    experience: 11,
    rating: 4.7,
    status: "available",
    phone: "+91 98765 43217",
    email: "suresh.kumar@peps.in",
    sessionsCompleted: 2230,
  },
];

// ── Appointments (60) ───────────────────────────────────────
const appointmentTypes: PhysioAppointment["type"][] = [
  "physiotherapy",
  "massage",
  "acupuncture",
  "hydrotherapy",
  "spa_treatment",
];
const appointmentStatuses: PhysioAppointment["status"][] = [
  "scheduled",
  "completed",
  "cancelled",
  "in_progress",
];
const patientNames = [
  "Aarav Gupta",
  "Ishita Verma",
  "Rohan Mehta",
  "Sneha Joshi",
  "Kabir Singh",
  "Meera Pillai",
  "Aditya Rao",
  "Pooja Kulkarni",
  "Vivek Choudhary",
  "Neha Bhat",
  "Siddharth Das",
  "Tanvi Agarwal",
  "Harsh Pandey",
  "Riya Saxena",
  "Mohit Tiwari",
  "Anushka Shetty",
  "Kunal Thakur",
  "Divya Hegde",
  "Aryan Malhotra",
  "Simran Kaur",
];

const durations = [30, 45, 60, 90];
const fees = [1500, 2000, 2500, 3000, 3500, 4000, 5000];
const times = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];
const appointmentNotes = [
  "Follow-up session for lower back pain",
  "Initial assessment for shoulder injury",
  "Post-surgery rehabilitation",
  "Chronic pain management",
  "Relaxation therapy session",
  "Sports injury recovery",
  "Knee rehabilitation program",
  "Stress relief massage",
  "Joint mobilization therapy",
  "Deep tissue treatment",
];

function generateAppointments(): PhysioAppointment[] {
  const appointments: PhysioAppointment[] = [];
  for (let i = 0; i < 60; i++) {
    const therapist = therapists[i % therapists.length];
    const dayOffset = Math.floor(i / 4) - 7;
    const date = new Date(2026, 1, 23 + dayOffset);
    const dateStr = date.toISOString().split("T")[0];
    const isToday = dateStr === "2026-02-23";
    const isPast = date < new Date(2026, 1, 23);

    let status: PhysioAppointment["status"];
    if (isPast) {
      status = i % 8 === 0 ? "cancelled" : "completed";
    } else if (isToday) {
      status = i % 3 === 0 ? "in_progress" : "scheduled";
    } else {
      status = "scheduled";
    }

    appointments.push({
      id: `APT${String(i + 1).padStart(3, "0")}`,
      patientId: `PAT${String((i % 20) + 1).padStart(3, "0")}`,
      patientName: patientNames[i % patientNames.length],
      therapistId: therapist.id,
      therapistName: therapist.name,
      date: dateStr,
      time: times[i % times.length],
      duration: durations[i % durations.length],
      type: appointmentTypes[i % appointmentTypes.length],
      status,
      notes: appointmentNotes[i % appointmentNotes.length],
      fee: fees[i % fees.length],
    });
  }
  return appointments;
}

export const appointments: PhysioAppointment[] = generateAppointments();

// ── Treatments (15) ─────────────────────────────────────────
export const treatments: Treatment[] = [
  {
    id: "TR001",
    name: "Deep Tissue Massage",
    description:
      "Intensive massage targeting deep muscle layers to relieve chronic tension and pain.",
    duration: 60,
    price: 3000,
    category: "massage",
    popularity: 92,
  },
  {
    id: "TR002",
    name: "Sports Injury Rehabilitation",
    description:
      "Comprehensive rehab program for athletes recovering from sports-related injuries.",
    duration: 45,
    price: 2500,
    category: "physiotherapy",
    popularity: 88,
  },
  {
    id: "TR003",
    name: "Aromatherapy Session",
    description:
      "Relaxing therapy using essential oils to promote physical and emotional well-being.",
    duration: 60,
    price: 3500,
    category: "spa",
    popularity: 85,
  },
  {
    id: "TR004",
    name: "Joint Mobilization",
    description:
      "Manual therapy technique to restore joint movement and reduce stiffness.",
    duration: 30,
    price: 2000,
    category: "physiotherapy",
    popularity: 78,
  },
  {
    id: "TR005",
    name: "Hot Stone Therapy",
    description:
      "Heated stones placed on key body points for deep relaxation and muscle relief.",
    duration: 90,
    price: 4500,
    category: "spa",
    popularity: 82,
  },
  {
    id: "TR006",
    name: "Acupuncture Treatment",
    description:
      "Traditional needle therapy targeting specific points for pain relief and healing.",
    duration: 45,
    price: 2500,
    category: "wellness",
    popularity: 75,
  },
  {
    id: "TR007",
    name: "Swedish Massage",
    description:
      "Classic full-body massage using long strokes, kneading, and circular movements.",
    duration: 60,
    price: 2800,
    category: "massage",
    popularity: 90,
  },
  {
    id: "TR008",
    name: "Hydrotherapy Pool Session",
    description:
      "Water-based exercises in a heated therapeutic pool for gentle rehabilitation.",
    duration: 45,
    price: 2000,
    category: "physiotherapy",
    popularity: 70,
  },
  {
    id: "TR009",
    name: "Abhyanga (Ayurvedic Massage)",
    description:
      "Traditional warm oil massage following Ayurvedic principles for holistic healing.",
    duration: 75,
    price: 3500,
    category: "massage",
    popularity: 86,
  },
  {
    id: "TR010",
    name: "Electrotherapy (TENS)",
    description:
      "Electrical stimulation therapy for pain management and muscle recovery.",
    duration: 30,
    price: 1500,
    category: "physiotherapy",
    popularity: 65,
  },
  {
    id: "TR011",
    name: "Body Scrub & Wrap",
    description:
      "Exfoliating scrub followed by a nourishing body wrap for skin rejuvenation.",
    duration: 90,
    price: 4000,
    category: "spa",
    popularity: 73,
  },
  {
    id: "TR012",
    name: "Meditation & Breathing",
    description:
      "Guided meditation and pranayama techniques for stress reduction and mental clarity.",
    duration: 45,
    price: 1200,
    category: "wellness",
    popularity: 68,
  },
  {
    id: "TR013",
    name: "Posture Correction Program",
    description:
      "Assessment and corrective exercises to improve posture and prevent related pain.",
    duration: 45,
    price: 2000,
    category: "physiotherapy",
    popularity: 72,
  },
  {
    id: "TR014",
    name: "Facial Rejuvenation Therapy",
    description:
      "Specialized facial treatment combining massage, masks, and acupressure techniques.",
    duration: 60,
    price: 3000,
    category: "spa",
    popularity: 80,
  },
  {
    id: "TR015",
    name: "Yoga Therapy Session",
    description:
      "Personalized yoga sequences designed for therapeutic benefits and recovery.",
    duration: 60,
    price: 1800,
    category: "wellness",
    popularity: 77,
  },
];

// ── Spa Packages (8) ────────────────────────────────────────
export const spaPackages: SpaPackage[] = [
  {
    id: "PKG001",
    name: "Tranquility Escape",
    description:
      "A calming experience combining aromatherapy, Swedish massage, and facial treatment for complete relaxation.",
    duration: 120,
    price: 6500,
    includes: [
      "Aromatherapy Session",
      "Swedish Massage",
      "Facial Rejuvenation",
      "Herbal Tea Service",
    ],
    popular: false,
  },
  {
    id: "PKG002",
    name: "Royal Ayurveda",
    description:
      "An authentic Ayurvedic experience with Abhyanga massage, Shirodhara, and herbal steam bath.",
    duration: 150,
    price: 8500,
    includes: [
      "Abhyanga Massage",
      "Shirodhara Treatment",
      "Herbal Steam Bath",
      "Ayurvedic Consultation",
      "Detox Tea",
    ],
    popular: true,
  },
  {
    id: "PKG003",
    name: "Sports Recovery Pro",
    description:
      "Designed for athletes, combining deep tissue work, hydrotherapy, and TENS therapy.",
    duration: 120,
    price: 7000,
    includes: [
      "Deep Tissue Massage",
      "Hydrotherapy Session",
      "Electrotherapy (TENS)",
      "Cold Compress Therapy",
    ],
    popular: true,
  },
  {
    id: "PKG004",
    name: "Couples Bliss",
    description:
      "Side-by-side relaxation for two with synchronized massage and spa treatments.",
    duration: 90,
    price: 9000,
    includes: [
      "Couples Massage",
      "Hot Stone Therapy",
      "Champagne & Fruit Platter",
      "Relaxation Lounge Access",
    ],
    popular: false,
  },
  {
    id: "PKG005",
    name: "Weekend Rejuvenation",
    description:
      "A full-day wellness experience to recharge your body and mind over the weekend.",
    duration: 240,
    price: 12000,
    includes: [
      "Body Scrub & Wrap",
      "Aromatherapy Massage",
      "Facial Treatment",
      "Yoga Session",
      "Healthy Lunch",
      "Pool Access",
    ],
    popular: true,
  },
  {
    id: "PKG006",
    name: "Express Refresh",
    description:
      "A quick but effective session for busy professionals needing a fast recharge.",
    duration: 60,
    price: 3500,
    includes: [
      "Express Massage (30 min)",
      "Mini Facial",
      "Refreshment",
    ],
    popular: false,
  },
  {
    id: "PKG007",
    name: "Pain Relief Intensive",
    description:
      "Targeted therapy program for chronic pain sufferers combining multiple modalities.",
    duration: 90,
    price: 5500,
    includes: [
      "Physiotherapy Assessment",
      "Acupuncture",
      "Hot Stone Application",
      "Take-home Exercise Plan",
    ],
    popular: false,
  },
  {
    id: "PKG008",
    name: "Holistic Wellness Journey",
    description:
      "A comprehensive wellness experience covering body, mind, and spirit through diverse therapies.",
    duration: 180,
    price: 15000,
    includes: [
      "Full Body Massage",
      "Meditation & Breathing",
      "Yoga Therapy",
      "Abhyanga Massage",
      "Facial Rejuvenation",
      "Gourmet Wellness Meal",
      "Wellness Consultation",
    ],
    popular: true,
  },
];

// ── Treatment Records (40) ──────────────────────────────────
function generateTreatmentRecords(): TreatmentRecord[] {
  const records: TreatmentRecord[] = [];
  const treatmentNames = treatments.map((t) => t.name);
  const progressOptions: TreatmentRecord["progress"][] = [
    "improving",
    "stable",
    "declining",
  ];

  for (let i = 0; i < 40; i++) {
    const patientIndex = i % 20;
    const dayOffset = -Math.floor(i / 2);
    const date = new Date(2026, 1, 23 + dayOffset);
    const painBefore = Math.min(10, Math.max(1, Math.floor(Math.random() * 7) + 3));
    const painReduction = Math.floor(Math.random() * 4) + 1;
    const painAfter = Math.max(1, painBefore - painReduction);

    records.push({
      id: `REC${String(i + 1).padStart(3, "0")}`,
      appointmentId: `APT${String(i + 1).padStart(3, "0")}`,
      patientId: `PAT${String(patientIndex + 1).padStart(3, "0")}`,
      patientName: patientNames[patientIndex],
      therapistName: therapists[i % therapists.length].name,
      date: date.toISOString().split("T")[0],
      treatment: treatmentNames[i % treatmentNames.length],
      painLevelBefore: painBefore,
      painLevelAfter: painAfter,
      mobilityScore: Math.min(100, Math.max(30, 50 + i + Math.floor(Math.random() * 20))),
      notes:
        i % 3 === 0
          ? "Significant improvement noted. Continue current plan."
          : i % 3 === 1
          ? "Steady progress. Adjusted exercise intensity."
          : "Good response to therapy. Next session in 3 days.",
      progress: i < 30 ? (i % 5 === 0 ? "stable" : "improving") : progressOptions[i % 3],
    });
  }
  return records;
}

export const treatmentRecords: TreatmentRecord[] = generateTreatmentRecords();

// ── Helper Functions ────────────────────────────────────────
export function getTherapistById(id: string): Therapist | undefined {
  return therapists.find((t) => t.id === id);
}

export function getAppointmentsByTherapist(
  therapistId: string
): PhysioAppointment[] {
  return appointments.filter((a) => a.therapistId === therapistId);
}

export function getTreatmentRecordsByPatient(
  patientId: string
): TreatmentRecord[] {
  return treatmentRecords.filter((r) => r.patientId === patientId);
}

// ── Chart / Aggregation Data ────────────────────────────────
export const weeklyAppointmentTrend = [
  { day: "Mon", appointments: 12, revenue: 42000 },
  { day: "Tue", appointments: 15, revenue: 52500 },
  { day: "Wed", appointments: 10, revenue: 35000 },
  { day: "Thu", appointments: 18, revenue: 63000 },
  { day: "Fri", appointments: 14, revenue: 49000 },
  { day: "Sat", appointments: 20, revenue: 70000 },
  { day: "Sun", appointments: 8, revenue: 28000 },
];

export const therapistPerformance = [
  { week: "Week 1", sessions: 22 },
  { week: "Week 2", sessions: 25 },
  { week: "Week 3", sessions: 20 },
  { week: "Week 4", sessions: 28 },
  { week: "Week 5", sessions: 24 },
  { week: "Week 6", sessions: 30 },
];
