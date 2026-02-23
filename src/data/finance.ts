// ──────────────────────────────────────────────
// Finance Module — Interfaces & Dummy Data
// ──────────────────────────────────────────────

export interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  department: string;
  date: string;
  status: "completed" | "pending" | "failed";
  reference: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  department: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issuedDate: string;
  dueDate: string;
  paidDate: string | null;
}

export interface PayrollRecord {
  id: string;
  employeeName: string;
  department: string;
  designation: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  month: string;
  status: "paid" | "pending" | "processing";
}

export interface Budget {
  id: string;
  department: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
  status: "on_track" | "warning" | "over_budget";
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  department: string;
  date: string;
  approvedBy: string;
  status: "approved" | "pending" | "rejected";
}

export interface MonthlyPnL {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}

export interface RevenueDepartment {
  department: string;
  revenue: number;
}

export interface ExpenseCategory {
  name: string;
  value: number;
}

// ──────────────────────────────────────────────
// DEPARTMENTS
// ──────────────────────────────────────────────
const departments = [
  "Cricket", "Football", "Hockey", "Badminton", "Swimming",
  "Athletics", "Tennis", "Administration", "Medical", "Canteen",
];

const indianNames = [
  "Aarav Sharma", "Vivaan Patel", "Aditya Verma", "Vihaan Singh", "Arjun Gupta",
  "Sai Kumar", "Reyansh Reddy", "Ayaan Mehta", "Krishna Nair", "Ishaan Joshi",
  "Priya Iyer", "Ananya Das", "Kavya Rao", "Diya Mishra", "Riya Chopra",
  "Sneha Bhat", "Pooja Pandey", "Meera Kulkarni", "Neha Tiwari", "Shreya Menon",
  "Rahul Deshmukh", "Amit Saxena", "Suresh Pillai", "Rajesh Thakur", "Vikram Chauhan",
  "Deepak Yadav", "Manoj Hegde", "Sanjay Bhatt", "Kiran Shetty", "Rohan Kapoor",
  "Ankita Dubey", "Swati Rathore", "Geeta Agarwal", "Sunita Bansal", "Lakshmi Naidu",
  "Harini Gopal", "Nandini Prasad", "Divya Mohan", "Pallavi Sinha", "Tanvi Choudhary",
];

const clientNames = [
  "Tata Sports Foundation", "Reliance Athletics Trust", "Bajaj Sports Academy",
  "Mahindra Fitness Corp", "Adani Sports Ltd", "Birla Sports Institute",
  "Wipro Wellness Foundation", "Infosys Sports Hub", "HCL Sports Program",
  "Godrej Active Life", "Hero Sports Academy", "Jindal Steel Sports Club",
  "LIC Sports Division", "SBI Sports Foundation", "BPCL Sports Wing",
  "ONGC Sports Dept", "NTPC Sports Academy", "SAIL Sports Center",
  "Coal India Sports Club", "Indian Oil Sports Div",
];

const expenseCategories = [
  "Equipment", "Training", "Travel", "Medical", "Nutrition",
  "Infrastructure", "Utilities", "Salaries", "Insurance", "Maintenance",
  "Marketing", "Technology", "Events", "Licensing", "Supplies",
];

const incomeCategories = [
  "Sponsorship", "Ticket Sales", "Merchandise", "Broadcasting Rights",
  "Government Grants", "Membership Fees", "Coaching Fees", "Event Revenue",
  "Facility Rental", "Donations",
];

// ──────────────────────────────────────────────
// TRANSACTIONS (100)
// ──────────────────────────────────────────────
export const transactions: Transaction[] = [
  { id: "txn-001", type: "income", category: "Sponsorship", description: "Tata Group annual sponsorship - Cricket", amount: 2500000, department: "Cricket", date: "2026-02-20", status: "completed", reference: "TXN-2026-0001" },
  { id: "txn-002", type: "expense", category: "Equipment", description: "Cricket bats and pads procurement", amount: 185000, department: "Cricket", date: "2026-02-19", status: "completed", reference: "TXN-2026-0002" },
  { id: "txn-003", type: "income", category: "Ticket Sales", description: "Inter-academy football tournament tickets", amount: 420000, department: "Football", date: "2026-02-18", status: "completed", reference: "TXN-2026-0003" },
  { id: "txn-004", type: "expense", category: "Travel", description: "Hockey team travel to Bhopal nationals", amount: 325000, department: "Hockey", date: "2026-02-17", status: "completed", reference: "TXN-2026-0004" },
  { id: "txn-005", type: "income", category: "Government Grants", description: "SAI grant for swimming infrastructure", amount: 1800000, department: "Swimming", date: "2026-02-16", status: "completed", reference: "TXN-2026-0005" },
  { id: "txn-006", type: "expense", category: "Medical", description: "Physiotherapy equipment upgrade", amount: 275000, department: "Medical", date: "2026-02-15", status: "completed", reference: "TXN-2026-0006" },
  { id: "txn-007", type: "income", category: "Membership Fees", description: "Q1 membership fees collection", amount: 960000, department: "Administration", date: "2026-02-14", status: "completed", reference: "TXN-2026-0007" },
  { id: "txn-008", type: "expense", category: "Nutrition", description: "Monthly protein supplements and diet supplies", amount: 145000, department: "Canteen", date: "2026-02-13", status: "completed", reference: "TXN-2026-0008" },
  { id: "txn-009", type: "income", category: "Coaching Fees", description: "Badminton coaching fees - February batch", amount: 380000, department: "Badminton", date: "2026-02-12", status: "completed", reference: "TXN-2026-0009" },
  { id: "txn-010", type: "expense", category: "Infrastructure", description: "Athletics track resurfacing payment", amount: 890000, department: "Athletics", date: "2026-02-11", status: "pending", reference: "TXN-2026-0010" },
  { id: "txn-011", type: "income", category: "Broadcasting Rights", description: "Cricket match streaming rights", amount: 1200000, department: "Cricket", date: "2026-02-10", status: "completed", reference: "TXN-2026-0011" },
  { id: "txn-012", type: "expense", category: "Training", description: "Foreign coach consultancy - Tennis", amount: 450000, department: "Tennis", date: "2026-02-09", status: "completed", reference: "TXN-2026-0012" },
  { id: "txn-013", type: "income", category: "Event Revenue", description: "Swimming championship entry fees", amount: 210000, department: "Swimming", date: "2026-02-08", status: "completed", reference: "TXN-2026-0013" },
  { id: "txn-014", type: "expense", category: "Utilities", description: "Swimming pool water treatment chemicals", amount: 95000, department: "Swimming", date: "2026-02-07", status: "completed", reference: "TXN-2026-0014" },
  { id: "txn-015", type: "income", category: "Facility Rental", description: "Football ground rental for corporate event", amount: 175000, department: "Football", date: "2026-02-06", status: "completed", reference: "TXN-2026-0015" },
  { id: "txn-016", type: "expense", category: "Salaries", description: "February coaching staff salaries advance", amount: 1250000, department: "Administration", date: "2026-02-05", status: "pending", reference: "TXN-2026-0016" },
  { id: "txn-017", type: "income", category: "Sponsorship", description: "Reliance foundation hockey sponsorship", amount: 1500000, department: "Hockey", date: "2026-02-04", status: "completed", reference: "TXN-2026-0017" },
  { id: "txn-018", type: "expense", category: "Insurance", description: "Athlete insurance premium - Q1", amount: 520000, department: "Administration", date: "2026-02-03", status: "completed", reference: "TXN-2026-0018" },
  { id: "txn-019", type: "income", category: "Merchandise", description: "Academy merchandise sales - January", amount: 340000, department: "Administration", date: "2026-02-02", status: "completed", reference: "TXN-2026-0019" },
  { id: "txn-020", type: "expense", category: "Maintenance", description: "Badminton court flooring maintenance", amount: 180000, department: "Badminton", date: "2026-02-01", status: "completed", reference: "TXN-2026-0020" },
  { id: "txn-021", type: "income", category: "Donations", description: "Alumni donation for athletics program", amount: 750000, department: "Athletics", date: "2026-01-31", status: "completed", reference: "TXN-2026-0021" },
  { id: "txn-022", type: "expense", category: "Equipment", description: "Football training equipment set", amount: 220000, department: "Football", date: "2026-01-30", status: "completed", reference: "TXN-2026-0022" },
  { id: "txn-023", type: "income", category: "Coaching Fees", description: "Tennis private coaching - January", amount: 290000, department: "Tennis", date: "2026-01-29", status: "completed", reference: "TXN-2026-0023" },
  { id: "txn-024", type: "expense", category: "Technology", description: "Performance analytics software license", amount: 380000, department: "Administration", date: "2026-01-28", status: "completed", reference: "TXN-2026-0024" },
  { id: "txn-025", type: "income", category: "Ticket Sales", description: "Hockey league home match tickets", amount: 560000, department: "Hockey", date: "2026-01-27", status: "completed", reference: "TXN-2026-0025" },
  { id: "txn-026", type: "expense", category: "Travel", description: "Cricket team travel to Mumbai tournament", amount: 410000, department: "Cricket", date: "2026-01-26", status: "completed", reference: "TXN-2026-0026" },
  { id: "txn-027", type: "income", category: "Government Grants", description: "Ministry of Sports annual grant", amount: 3200000, department: "Administration", date: "2026-01-25", status: "completed", reference: "TXN-2026-0027" },
  { id: "txn-028", type: "expense", category: "Events", description: "Annual sports day event management", amount: 650000, department: "Administration", date: "2026-01-24", status: "completed", reference: "TXN-2026-0028" },
  { id: "txn-029", type: "income", category: "Sponsorship", description: "Bajaj sports academy partnership", amount: 1100000, department: "Badminton", date: "2026-01-23", status: "completed", reference: "TXN-2026-0029" },
  { id: "txn-030", type: "expense", category: "Medical", description: "Monthly medical supplies and medicines", amount: 125000, department: "Medical", date: "2026-01-22", status: "completed", reference: "TXN-2026-0030" },
  { id: "txn-031", type: "income", category: "Facility Rental", description: "Tennis court weekend bookings - January", amount: 135000, department: "Tennis", date: "2026-01-21", status: "completed", reference: "TXN-2026-0031" },
  { id: "txn-032", type: "expense", category: "Supplies", description: "Canteen kitchen supplies and utensils", amount: 85000, department: "Canteen", date: "2026-01-20", status: "completed", reference: "TXN-2026-0032" },
  { id: "txn-033", type: "income", category: "Membership Fees", description: "New athlete registrations - January", amount: 480000, department: "Administration", date: "2026-01-19", status: "completed", reference: "TXN-2026-0033" },
  { id: "txn-034", type: "expense", category: "Marketing", description: "Social media and digital marketing campaign", amount: 195000, department: "Administration", date: "2026-01-18", status: "completed", reference: "TXN-2026-0034" },
  { id: "txn-035", type: "income", category: "Event Revenue", description: "Cricket coaching camp registration", amount: 625000, department: "Cricket", date: "2026-01-17", status: "completed", reference: "TXN-2026-0035" },
  { id: "txn-036", type: "expense", category: "Equipment", description: "Swimming lane ropes and timing system", amount: 310000, department: "Swimming", date: "2026-01-16", status: "completed", reference: "TXN-2026-0036" },
  { id: "txn-037", type: "income", category: "Broadcasting Rights", description: "Football league streaming deal", amount: 850000, department: "Football", date: "2026-01-15", status: "completed", reference: "TXN-2026-0037" },
  { id: "txn-038", type: "expense", category: "Licensing", description: "Sports federation annual licensing fees", amount: 290000, department: "Administration", date: "2026-01-14", status: "completed", reference: "TXN-2026-0038" },
  { id: "txn-039", type: "income", category: "Sponsorship", description: "Mahindra fitness equipment sponsorship", amount: 980000, department: "Athletics", date: "2026-01-13", status: "completed", reference: "TXN-2026-0039" },
  { id: "txn-040", type: "expense", category: "Training", description: "Strength and conditioning program materials", amount: 165000, department: "Athletics", date: "2026-01-12", status: "completed", reference: "TXN-2026-0040" },
  { id: "txn-041", type: "income", category: "Ticket Sales", description: "Badminton invitational tournament tickets", amount: 195000, department: "Badminton", date: "2026-01-11", status: "completed", reference: "TXN-2026-0041" },
  { id: "txn-042", type: "expense", category: "Utilities", description: "Electricity bill - January", amount: 425000, department: "Administration", date: "2026-01-10", status: "completed", reference: "TXN-2026-0042" },
  { id: "txn-043", type: "income", category: "Coaching Fees", description: "Swimming coaching batch - January", amount: 310000, department: "Swimming", date: "2026-01-09", status: "completed", reference: "TXN-2026-0043" },
  { id: "txn-044", type: "expense", category: "Infrastructure", description: "Tennis court lighting upgrade", amount: 540000, department: "Tennis", date: "2026-01-08", status: "pending", reference: "TXN-2026-0044" },
  { id: "txn-045", type: "income", category: "Donations", description: "Corporate CSR donation - HDFC Bank", amount: 1500000, department: "Administration", date: "2026-01-07", status: "completed", reference: "TXN-2026-0045" },
  { id: "txn-046", type: "expense", category: "Nutrition", description: "Athletes diet plan supplements - January", amount: 210000, department: "Medical", date: "2026-01-06", status: "completed", reference: "TXN-2026-0046" },
  { id: "txn-047", type: "income", category: "Facility Rental", description: "Hockey ground corporate booking", amount: 225000, department: "Hockey", date: "2026-01-05", status: "completed", reference: "TXN-2026-0047" },
  { id: "txn-048", type: "expense", category: "Travel", description: "Swimming team travel to Goa nationals", amount: 285000, department: "Swimming", date: "2026-01-04", status: "completed", reference: "TXN-2026-0048" },
  { id: "txn-049", type: "income", category: "Merchandise", description: "Academy branded merchandise - December", amount: 275000, department: "Administration", date: "2026-01-03", status: "completed", reference: "TXN-2026-0049" },
  { id: "txn-050", type: "expense", category: "Salaries", description: "January coaching staff salaries", amount: 2850000, department: "Administration", date: "2026-01-02", status: "completed", reference: "TXN-2026-0050" },
  { id: "txn-051", type: "income", category: "Sponsorship", description: "Adani Sports annual sponsorship", amount: 2200000, department: "Football", date: "2025-12-28", status: "completed", reference: "TXN-2025-0051" },
  { id: "txn-052", type: "expense", category: "Equipment", description: "Hockey sticks and protective gear", amount: 175000, department: "Hockey", date: "2025-12-27", status: "completed", reference: "TXN-2025-0052" },
  { id: "txn-053", type: "income", category: "Ticket Sales", description: "Cricket winter league tickets", amount: 780000, department: "Cricket", date: "2025-12-26", status: "completed", reference: "TXN-2025-0053" },
  { id: "txn-054", type: "expense", category: "Medical", description: "Sports injury rehab equipment", amount: 350000, department: "Medical", date: "2025-12-25", status: "completed", reference: "TXN-2025-0054" },
  { id: "txn-055", type: "income", category: "Government Grants", description: "State sports council grant", amount: 1400000, department: "Administration", date: "2025-12-24", status: "completed", reference: "TXN-2025-0055" },
  { id: "txn-056", type: "expense", category: "Maintenance", description: "Cricket pitch maintenance and rolling", amount: 165000, department: "Cricket", date: "2025-12-23", status: "completed", reference: "TXN-2025-0056" },
  { id: "txn-057", type: "income", category: "Coaching Fees", description: "Athletics coaching - December batch", amount: 245000, department: "Athletics", date: "2025-12-22", status: "completed", reference: "TXN-2025-0057" },
  { id: "txn-058", type: "expense", category: "Insurance", description: "Property and liability insurance renewal", amount: 680000, department: "Administration", date: "2025-12-21", status: "completed", reference: "TXN-2025-0058" },
  { id: "txn-059", type: "income", category: "Event Revenue", description: "Football year-end championship", amount: 490000, department: "Football", date: "2025-12-20", status: "completed", reference: "TXN-2025-0059" },
  { id: "txn-060", type: "expense", category: "Technology", description: "CCTV and security system upgrade", amount: 425000, department: "Administration", date: "2025-12-19", status: "completed", reference: "TXN-2025-0060" },
  { id: "txn-061", type: "income", category: "Membership Fees", description: "Q4 membership renewals", amount: 720000, department: "Administration", date: "2025-12-18", status: "completed", reference: "TXN-2025-0061" },
  { id: "txn-062", type: "expense", category: "Events", description: "Year-end awards ceremony expenses", amount: 380000, department: "Administration", date: "2025-12-17", status: "completed", reference: "TXN-2025-0062" },
  { id: "txn-063", type: "income", category: "Sponsorship", description: "Wipro wellness program sponsorship", amount: 870000, department: "Medical", date: "2025-12-16", status: "completed", reference: "TXN-2025-0063" },
  { id: "txn-064", type: "expense", category: "Training", description: "Badminton international coaching clinic", amount: 320000, department: "Badminton", date: "2025-12-15", status: "completed", reference: "TXN-2025-0064" },
  { id: "txn-065", type: "income", category: "Facility Rental", description: "Swimming pool rental for school event", amount: 95000, department: "Swimming", date: "2025-12-14", status: "completed", reference: "TXN-2025-0065" },
  { id: "txn-066", type: "expense", category: "Supplies", description: "Office supplies and stationery", amount: 45000, department: "Administration", date: "2025-12-13", status: "completed", reference: "TXN-2025-0066" },
  { id: "txn-067", type: "income", category: "Donations", description: "Philanthropist donation for Tennis academy", amount: 600000, department: "Tennis", date: "2025-12-12", status: "completed", reference: "TXN-2025-0067" },
  { id: "txn-068", type: "expense", category: "Equipment", description: "Athletics timing and measurement equipment", amount: 290000, department: "Athletics", date: "2025-12-11", status: "completed", reference: "TXN-2025-0068" },
  { id: "txn-069", type: "income", category: "Broadcasting Rights", description: "Hockey tournament TV rights", amount: 650000, department: "Hockey", date: "2025-12-10", status: "completed", reference: "TXN-2025-0069" },
  { id: "txn-070", type: "expense", category: "Travel", description: "Badminton team travel to Hyderabad", amount: 195000, department: "Badminton", date: "2025-12-09", status: "completed", reference: "TXN-2025-0070" },
  { id: "txn-071", type: "income", category: "Coaching Fees", description: "Football coaching - December fees", amount: 355000, department: "Football", date: "2025-12-08", status: "completed", reference: "TXN-2025-0071" },
  { id: "txn-072", type: "expense", category: "Utilities", description: "Water and sewage charges - December", amount: 85000, department: "Administration", date: "2025-12-07", status: "completed", reference: "TXN-2025-0072" },
  { id: "txn-073", type: "income", category: "Event Revenue", description: "Athletics annual meet revenue", amount: 380000, department: "Athletics", date: "2025-12-06", status: "completed", reference: "TXN-2025-0073" },
  { id: "txn-074", type: "expense", category: "Infrastructure", description: "Football ground irrigation system", amount: 470000, department: "Football", date: "2025-12-05", status: "completed", reference: "TXN-2025-0074" },
  { id: "txn-075", type: "income", category: "Sponsorship", description: "Infosys technology partnership", amount: 1350000, department: "Administration", date: "2025-12-04", status: "completed", reference: "TXN-2025-0075" },
  { id: "txn-076", type: "expense", category: "Medical", description: "Anti-doping test kits and supplies", amount: 120000, department: "Medical", date: "2025-12-03", status: "completed", reference: "TXN-2025-0076" },
  { id: "txn-077", type: "income", category: "Ticket Sales", description: "Tennis exhibition match tickets", amount: 265000, department: "Tennis", date: "2025-12-02", status: "completed", reference: "TXN-2025-0077" },
  { id: "txn-078", type: "expense", category: "Marketing", description: "Print media advertising campaign", amount: 155000, department: "Administration", date: "2025-12-01", status: "completed", reference: "TXN-2025-0078" },
  { id: "txn-079", type: "income", category: "Membership Fees", description: "New member registrations - November", amount: 540000, department: "Administration", date: "2025-11-30", status: "completed", reference: "TXN-2025-0079" },
  { id: "txn-080", type: "expense", category: "Nutrition", description: "Sports nutrition supplements bulk order", amount: 310000, department: "Canteen", date: "2025-11-29", status: "completed", reference: "TXN-2025-0080" },
  { id: "txn-081", type: "income", category: "Sponsorship", description: "Hero Sports equipment sponsorship", amount: 920000, department: "Cricket", date: "2025-11-28", status: "completed", reference: "TXN-2025-0081" },
  { id: "txn-082", type: "expense", category: "Salaries", description: "November coaching staff salaries", amount: 2850000, department: "Administration", date: "2025-11-27", status: "completed", reference: "TXN-2025-0082" },
  { id: "txn-083", type: "income", category: "Facility Rental", description: "Cricket ground weekend bookings", amount: 310000, department: "Cricket", date: "2025-11-26", status: "completed", reference: "TXN-2025-0083" },
  { id: "txn-084", type: "expense", category: "Training", description: "Video analysis software subscription", amount: 180000, department: "Administration", date: "2025-11-25", status: "completed", reference: "TXN-2025-0084" },
  { id: "txn-085", type: "income", category: "Government Grants", description: "National sports development fund", amount: 2100000, department: "Administration", date: "2025-11-24", status: "completed", reference: "TXN-2025-0085" },
  { id: "txn-086", type: "expense", category: "Equipment", description: "Gym equipment maintenance and parts", amount: 235000, department: "Athletics", date: "2025-11-23", status: "completed", reference: "TXN-2025-0086" },
  { id: "txn-087", type: "income", category: "Coaching Fees", description: "Hockey coaching fees - November", amount: 275000, department: "Hockey", date: "2025-11-22", status: "completed", reference: "TXN-2025-0087" },
  { id: "txn-088", type: "expense", category: "Maintenance", description: "Swimming pool pump and filter service", amount: 145000, department: "Swimming", date: "2025-11-21", status: "completed", reference: "TXN-2025-0088" },
  { id: "txn-089", type: "income", category: "Event Revenue", description: "Badminton open championship fees", amount: 185000, department: "Badminton", date: "2025-11-20", status: "completed", reference: "TXN-2025-0089" },
  { id: "txn-090", type: "expense", category: "Travel", description: "Athletics team travel to Delhi meet", amount: 255000, department: "Athletics", date: "2025-11-19", status: "failed", reference: "TXN-2025-0090" },
  { id: "txn-091", type: "income", category: "Merchandise", description: "Online merchandise store - November", amount: 195000, department: "Administration", date: "2025-11-18", status: "completed", reference: "TXN-2025-0091" },
  { id: "txn-092", type: "expense", category: "Insurance", description: "Sports equipment insurance", amount: 175000, department: "Administration", date: "2025-11-17", status: "completed", reference: "TXN-2025-0092" },
  { id: "txn-093", type: "income", category: "Broadcasting Rights", description: "Badminton tournament highlights package", amount: 420000, department: "Badminton", date: "2025-11-16", status: "completed", reference: "TXN-2025-0093" },
  { id: "txn-094", type: "expense", category: "Events", description: "Inter-academy sports meet organization", amount: 520000, department: "Administration", date: "2025-11-15", status: "completed", reference: "TXN-2025-0094" },
  { id: "txn-095", type: "income", category: "Donations", description: "Sports enthusiast community donation", amount: 350000, department: "Swimming", date: "2025-11-14", status: "completed", reference: "TXN-2025-0095" },
  { id: "txn-096", type: "expense", category: "Licensing", description: "International coaching certification fees", amount: 210000, department: "Tennis", date: "2025-11-13", status: "completed", reference: "TXN-2025-0096" },
  { id: "txn-097", type: "income", category: "Ticket Sales", description: "Football friendly match tickets", amount: 310000, department: "Football", date: "2025-11-12", status: "completed", reference: "TXN-2025-0097" },
  { id: "txn-098", type: "expense", category: "Technology", description: "Scoreboard and display systems", amount: 380000, department: "Cricket", date: "2025-11-11", status: "pending", reference: "TXN-2025-0098" },
  { id: "txn-099", type: "income", category: "Sponsorship", description: "Godrej Active Life wellness sponsorship", amount: 680000, department: "Medical", date: "2025-11-10", status: "completed", reference: "TXN-2025-0099" },
  { id: "txn-100", type: "expense", category: "Supplies", description: "Cleaning and sanitation supplies", amount: 65000, department: "Canteen", date: "2025-11-09", status: "completed", reference: "TXN-2025-0100" },
];

// ──────────────────────────────────────────────
// INVOICES (30)
// ──────────────────────────────────────────────
export const invoices: Invoice[] = [
  {
    id: "inv-001", invoiceNumber: "INV-2026-001", clientName: "Tata Sports Foundation", department: "Cricket",
    items: [
      { description: "Annual Sponsorship - Cricket Program", quantity: 1, unitPrice: 2000000, total: 2000000 },
      { description: "Logo placement on jerseys", quantity: 50, unitPrice: 5000, total: 250000 },
    ],
    subtotal: 2250000, tax: 405000, total: 2655000, status: "paid", issuedDate: "2026-01-05", dueDate: "2026-02-05", paidDate: "2026-01-28",
  },
  {
    id: "inv-002", invoiceNumber: "INV-2026-002", clientName: "Reliance Athletics Trust", department: "Hockey",
    items: [
      { description: "Hockey Program Sponsorship - H1 2026", quantity: 1, unitPrice: 1500000, total: 1500000 },
    ],
    subtotal: 1500000, tax: 270000, total: 1770000, status: "paid", issuedDate: "2026-01-10", dueDate: "2026-02-10", paidDate: "2026-02-01",
  },
  {
    id: "inv-003", invoiceNumber: "INV-2026-003", clientName: "Bajaj Sports Academy", department: "Badminton",
    items: [
      { description: "Badminton coaching partnership", quantity: 1, unitPrice: 800000, total: 800000 },
      { description: "Tournament co-hosting rights", quantity: 2, unitPrice: 150000, total: 300000 },
    ],
    subtotal: 1100000, tax: 198000, total: 1298000, status: "sent", issuedDate: "2026-01-15", dueDate: "2026-02-15", paidDate: null,
  },
  {
    id: "inv-004", invoiceNumber: "INV-2026-004", clientName: "Mahindra Fitness Corp", department: "Athletics",
    items: [
      { description: "Equipment sponsorship package", quantity: 1, unitPrice: 980000, total: 980000 },
    ],
    subtotal: 980000, tax: 176400, total: 1156400, status: "overdue", issuedDate: "2025-12-20", dueDate: "2026-01-20", paidDate: null,
  },
  {
    id: "inv-005", invoiceNumber: "INV-2026-005", clientName: "Adani Sports Ltd", department: "Football",
    items: [
      { description: "Football program annual sponsorship", quantity: 1, unitPrice: 2200000, total: 2200000 },
      { description: "Ground naming rights", quantity: 1, unitPrice: 500000, total: 500000 },
    ],
    subtotal: 2700000, tax: 486000, total: 3186000, status: "paid", issuedDate: "2025-12-15", dueDate: "2026-01-15", paidDate: "2026-01-10",
  },
  {
    id: "inv-006", invoiceNumber: "INV-2026-006", clientName: "Birla Sports Institute", department: "Swimming",
    items: [
      { description: "Swimming pool rental - quarterly", quantity: 1, unitPrice: 350000, total: 350000 },
      { description: "Coaching collaboration fee", quantity: 1, unitPrice: 200000, total: 200000 },
    ],
    subtotal: 550000, tax: 99000, total: 649000, status: "sent", issuedDate: "2026-02-01", dueDate: "2026-03-01", paidDate: null,
  },
  {
    id: "inv-007", invoiceNumber: "INV-2026-007", clientName: "Wipro Wellness Foundation", department: "Medical",
    items: [
      { description: "Wellness program partnership", quantity: 1, unitPrice: 870000, total: 870000 },
    ],
    subtotal: 870000, tax: 156600, total: 1026600, status: "paid", issuedDate: "2025-12-10", dueDate: "2026-01-10", paidDate: "2025-12-28",
  },
  {
    id: "inv-008", invoiceNumber: "INV-2026-008", clientName: "Infosys Sports Hub", department: "Administration",
    items: [
      { description: "Technology partnership - annual", quantity: 1, unitPrice: 1000000, total: 1000000 },
      { description: "Digital platform development", quantity: 1, unitPrice: 350000, total: 350000 },
    ],
    subtotal: 1350000, tax: 243000, total: 1593000, status: "paid", issuedDate: "2025-12-01", dueDate: "2025-12-31", paidDate: "2025-12-22",
  },
  {
    id: "inv-009", invoiceNumber: "INV-2026-009", clientName: "HCL Sports Program", department: "Tennis",
    items: [
      { description: "Tennis academy sponsorship", quantity: 1, unitPrice: 600000, total: 600000 },
    ],
    subtotal: 600000, tax: 108000, total: 708000, status: "draft", issuedDate: "2026-02-15", dueDate: "2026-03-15", paidDate: null,
  },
  {
    id: "inv-010", invoiceNumber: "INV-2026-010", clientName: "Godrej Active Life", department: "Medical",
    items: [
      { description: "Wellness sponsorship - Q1", quantity: 1, unitPrice: 450000, total: 450000 },
      { description: "Health camp organization", quantity: 3, unitPrice: 75000, total: 225000 },
    ],
    subtotal: 675000, tax: 121500, total: 796500, status: "sent", issuedDate: "2026-02-10", dueDate: "2026-03-10", paidDate: null,
  },
  {
    id: "inv-011", invoiceNumber: "INV-2026-011", clientName: "Hero Sports Academy", department: "Cricket",
    items: [
      { description: "Cricket equipment sponsorship", quantity: 1, unitPrice: 920000, total: 920000 },
    ],
    subtotal: 920000, tax: 165600, total: 1085600, status: "paid", issuedDate: "2025-11-15", dueDate: "2025-12-15", paidDate: "2025-12-05",
  },
  {
    id: "inv-012", invoiceNumber: "INV-2026-012", clientName: "Jindal Steel Sports Club", department: "Hockey",
    items: [
      { description: "Hockey turf maintenance sponsorship", quantity: 1, unitPrice: 500000, total: 500000 },
      { description: "Player development program", quantity: 1, unitPrice: 300000, total: 300000 },
    ],
    subtotal: 800000, tax: 144000, total: 944000, status: "overdue", issuedDate: "2025-12-01", dueDate: "2026-01-01", paidDate: null,
  },
  {
    id: "inv-013", invoiceNumber: "INV-2026-013", clientName: "LIC Sports Division", department: "Administration",
    items: [
      { description: "Athlete insurance partnership", quantity: 1, unitPrice: 750000, total: 750000 },
    ],
    subtotal: 750000, tax: 135000, total: 885000, status: "paid", issuedDate: "2025-11-20", dueDate: "2025-12-20", paidDate: "2025-12-15",
  },
  {
    id: "inv-014", invoiceNumber: "INV-2026-014", clientName: "SBI Sports Foundation", department: "Athletics",
    items: [
      { description: "Athletics program grant", quantity: 1, unitPrice: 1100000, total: 1100000 },
      { description: "Track and field meet sponsorship", quantity: 1, unitPrice: 250000, total: 250000 },
    ],
    subtotal: 1350000, tax: 243000, total: 1593000, status: "sent", issuedDate: "2026-02-05", dueDate: "2026-03-05", paidDate: null,
  },
  {
    id: "inv-015", invoiceNumber: "INV-2026-015", clientName: "BPCL Sports Wing", department: "Football",
    items: [
      { description: "Football league sponsorship", quantity: 1, unitPrice: 650000, total: 650000 },
    ],
    subtotal: 650000, tax: 117000, total: 767000, status: "paid", issuedDate: "2025-11-25", dueDate: "2025-12-25", paidDate: "2025-12-20",
  },
  {
    id: "inv-016", invoiceNumber: "INV-2026-016", clientName: "ONGC Sports Dept", department: "Swimming",
    items: [
      { description: "Swimming championship title sponsorship", quantity: 1, unitPrice: 800000, total: 800000 },
      { description: "Aquatic center branding", quantity: 1, unitPrice: 200000, total: 200000 },
    ],
    subtotal: 1000000, tax: 180000, total: 1180000, status: "paid", issuedDate: "2025-12-05", dueDate: "2026-01-05", paidDate: "2025-12-30",
  },
  {
    id: "inv-017", invoiceNumber: "INV-2026-017", clientName: "NTPC Sports Academy", department: "Badminton",
    items: [
      { description: "Badminton court naming rights", quantity: 1, unitPrice: 400000, total: 400000 },
    ],
    subtotal: 400000, tax: 72000, total: 472000, status: "cancelled", issuedDate: "2025-12-15", dueDate: "2026-01-15", paidDate: null,
  },
  {
    id: "inv-018", invoiceNumber: "INV-2026-018", clientName: "SAIL Sports Center", department: "Athletics",
    items: [
      { description: "Athletic equipment donation acknowledgement", quantity: 1, unitPrice: 550000, total: 550000 },
      { description: "Joint training program", quantity: 1, unitPrice: 180000, total: 180000 },
    ],
    subtotal: 730000, tax: 131400, total: 861400, status: "draft", issuedDate: "2026-02-18", dueDate: "2026-03-18", paidDate: null,
  },
  {
    id: "inv-019", invoiceNumber: "INV-2026-019", clientName: "Coal India Sports Club", department: "Hockey",
    items: [
      { description: "Hockey talent hunt program sponsorship", quantity: 1, unitPrice: 650000, total: 650000 },
    ],
    subtotal: 650000, tax: 117000, total: 767000, status: "sent", issuedDate: "2026-01-20", dueDate: "2026-02-20", paidDate: null,
  },
  {
    id: "inv-020", invoiceNumber: "INV-2026-020", clientName: "Indian Oil Sports Div", department: "Cricket",
    items: [
      { description: "Cricket ground maintenance sponsorship", quantity: 1, unitPrice: 400000, total: 400000 },
      { description: "Youth development program", quantity: 1, unitPrice: 350000, total: 350000 },
    ],
    subtotal: 750000, tax: 135000, total: 885000, status: "paid", issuedDate: "2025-12-10", dueDate: "2026-01-10", paidDate: "2026-01-05",
  },
  {
    id: "inv-021", invoiceNumber: "INV-2026-021", clientName: "Tata Sports Foundation", department: "Tennis",
    items: [
      { description: "Tennis academy expansion fund", quantity: 1, unitPrice: 1200000, total: 1200000 },
    ],
    subtotal: 1200000, tax: 216000, total: 1416000, status: "overdue", issuedDate: "2025-12-25", dueDate: "2026-01-25", paidDate: null,
  },
  {
    id: "inv-022", invoiceNumber: "INV-2026-022", clientName: "Reliance Athletics Trust", department: "Administration",
    items: [
      { description: "General infrastructure support", quantity: 1, unitPrice: 900000, total: 900000 },
      { description: "IT systems upgrade contribution", quantity: 1, unitPrice: 300000, total: 300000 },
    ],
    subtotal: 1200000, tax: 216000, total: 1416000, status: "paid", issuedDate: "2025-11-10", dueDate: "2025-12-10", paidDate: "2025-12-02",
  },
  {
    id: "inv-023", invoiceNumber: "INV-2026-023", clientName: "Bajaj Sports Academy", department: "Football",
    items: [
      { description: "Football youth exchange program", quantity: 1, unitPrice: 500000, total: 500000 },
    ],
    subtotal: 500000, tax: 90000, total: 590000, status: "sent", issuedDate: "2026-02-12", dueDate: "2026-03-12", paidDate: null,
  },
  {
    id: "inv-024", invoiceNumber: "INV-2026-024", clientName: "Mahindra Fitness Corp", department: "Medical",
    items: [
      { description: "Fitness assessment program", quantity: 1, unitPrice: 350000, total: 350000 },
      { description: "Equipment supply partnership", quantity: 1, unitPrice: 250000, total: 250000 },
    ],
    subtotal: 600000, tax: 108000, total: 708000, status: "draft", issuedDate: "2026-02-20", dueDate: "2026-03-20", paidDate: null,
  },
  {
    id: "inv-025", invoiceNumber: "INV-2026-025", clientName: "Adani Sports Ltd", department: "Swimming",
    items: [
      { description: "Swimming nationals sponsorship", quantity: 1, unitPrice: 700000, total: 700000 },
    ],
    subtotal: 700000, tax: 126000, total: 826000, status: "paid", issuedDate: "2025-11-05", dueDate: "2025-12-05", paidDate: "2025-11-28",
  },
  {
    id: "inv-026", invoiceNumber: "INV-2026-026", clientName: "Birla Sports Institute", department: "Cricket",
    items: [
      { description: "Cricket coaching collaboration", quantity: 1, unitPrice: 450000, total: 450000 },
      { description: "Joint academy program", quantity: 2, unitPrice: 200000, total: 400000 },
    ],
    subtotal: 850000, tax: 153000, total: 1003000, status: "paid", issuedDate: "2025-11-15", dueDate: "2025-12-15", paidDate: "2025-12-10",
  },
  {
    id: "inv-027", invoiceNumber: "INV-2026-027", clientName: "Wipro Wellness Foundation", department: "Canteen",
    items: [
      { description: "Nutrition program sponsorship", quantity: 1, unitPrice: 300000, total: 300000 },
    ],
    subtotal: 300000, tax: 54000, total: 354000, status: "paid", issuedDate: "2025-12-20", dueDate: "2026-01-20", paidDate: "2026-01-12",
  },
  {
    id: "inv-028", invoiceNumber: "INV-2026-028", clientName: "Infosys Sports Hub", department: "Badminton",
    items: [
      { description: "Digital scoring system sponsorship", quantity: 1, unitPrice: 280000, total: 280000 },
      { description: "Live streaming setup", quantity: 1, unitPrice: 150000, total: 150000 },
    ],
    subtotal: 430000, tax: 77400, total: 507400, status: "sent", issuedDate: "2026-01-25", dueDate: "2026-02-25", paidDate: null,
  },
  {
    id: "inv-029", invoiceNumber: "INV-2026-029", clientName: "HCL Sports Program", department: "Athletics",
    items: [
      { description: "Athletics training technology", quantity: 1, unitPrice: 480000, total: 480000 },
    ],
    subtotal: 480000, tax: 86400, total: 566400, status: "overdue", issuedDate: "2025-12-28", dueDate: "2026-01-28", paidDate: null,
  },
  {
    id: "inv-030", invoiceNumber: "INV-2026-030", clientName: "Godrej Active Life", department: "Administration",
    items: [
      { description: "Corporate wellness partnership", quantity: 1, unitPrice: 550000, total: 550000 },
      { description: "Employee sports program", quantity: 1, unitPrice: 200000, total: 200000 },
    ],
    subtotal: 750000, tax: 135000, total: 885000, status: "sent", issuedDate: "2026-02-08", dueDate: "2026-03-08", paidDate: null,
  },
];

// ──────────────────────────────────────────────
// PAYROLL RECORDS (40)
// ──────────────────────────────────────────────
const designations = [
  "Head Coach", "Assistant Coach", "Physiotherapist", "Nutritionist",
  "Sports Analyst", "Fitness Trainer", "Team Manager", "Administrator",
  "Medical Officer", "Groundskeeper",
];

export const payrollRecords: PayrollRecord[] = [
  { id: "pr-001", employeeName: "Aarav Sharma", department: "Cricket", designation: "Head Coach", baseSalary: 120000, allowances: 25000, deductions: 18000, netSalary: 127000, month: "2026-02", status: "paid" },
  { id: "pr-002", employeeName: "Vivaan Patel", department: "Football", designation: "Head Coach", baseSalary: 115000, allowances: 22000, deductions: 17000, netSalary: 120000, month: "2026-02", status: "paid" },
  { id: "pr-003", employeeName: "Aditya Verma", department: "Hockey", designation: "Head Coach", baseSalary: 110000, allowances: 20000, deductions: 16000, netSalary: 114000, month: "2026-02", status: "paid" },
  { id: "pr-004", employeeName: "Vihaan Singh", department: "Badminton", designation: "Head Coach", baseSalary: 105000, allowances: 20000, deductions: 15500, netSalary: 109500, month: "2026-02", status: "paid" },
  { id: "pr-005", employeeName: "Arjun Gupta", department: "Swimming", designation: "Head Coach", baseSalary: 108000, allowances: 21000, deductions: 16000, netSalary: 113000, month: "2026-02", status: "paid" },
  { id: "pr-006", employeeName: "Sai Kumar", department: "Athletics", designation: "Head Coach", baseSalary: 112000, allowances: 22000, deductions: 16500, netSalary: 117500, month: "2026-02", status: "processing" },
  { id: "pr-007", employeeName: "Reyansh Reddy", department: "Tennis", designation: "Head Coach", baseSalary: 100000, allowances: 18000, deductions: 14500, netSalary: 103500, month: "2026-02", status: "processing" },
  { id: "pr-008", employeeName: "Ayaan Mehta", department: "Cricket", designation: "Assistant Coach", baseSalary: 75000, allowances: 15000, deductions: 11000, netSalary: 79000, month: "2026-02", status: "paid" },
  { id: "pr-009", employeeName: "Krishna Nair", department: "Football", designation: "Assistant Coach", baseSalary: 72000, allowances: 14000, deductions: 10500, netSalary: 75500, month: "2026-02", status: "paid" },
  { id: "pr-010", employeeName: "Ishaan Joshi", department: "Hockey", designation: "Assistant Coach", baseSalary: 70000, allowances: 13000, deductions: 10000, netSalary: 73000, month: "2026-02", status: "paid" },
  { id: "pr-011", employeeName: "Priya Iyer", department: "Medical", designation: "Physiotherapist", baseSalary: 85000, allowances: 18000, deductions: 12500, netSalary: 90500, month: "2026-02", status: "paid" },
  { id: "pr-012", employeeName: "Ananya Das", department: "Medical", designation: "Medical Officer", baseSalary: 95000, allowances: 20000, deductions: 14000, netSalary: 101000, month: "2026-02", status: "paid" },
  { id: "pr-013", employeeName: "Kavya Rao", department: "Canteen", designation: "Nutritionist", baseSalary: 65000, allowances: 12000, deductions: 9500, netSalary: 67500, month: "2026-02", status: "processing" },
  { id: "pr-014", employeeName: "Diya Mishra", department: "Administration", designation: "Administrator", baseSalary: 80000, allowances: 16000, deductions: 11800, netSalary: 84200, month: "2026-02", status: "paid" },
  { id: "pr-015", employeeName: "Riya Chopra", department: "Cricket", designation: "Sports Analyst", baseSalary: 70000, allowances: 14000, deductions: 10300, netSalary: 73700, month: "2026-02", status: "paid" },
  { id: "pr-016", employeeName: "Sneha Bhat", department: "Football", designation: "Fitness Trainer", baseSalary: 60000, allowances: 12000, deductions: 8800, netSalary: 63200, month: "2026-02", status: "paid" },
  { id: "pr-017", employeeName: "Pooja Pandey", department: "Badminton", designation: "Assistant Coach", baseSalary: 68000, allowances: 13000, deductions: 9900, netSalary: 71100, month: "2026-02", status: "pending" },
  { id: "pr-018", employeeName: "Meera Kulkarni", department: "Swimming", designation: "Assistant Coach", baseSalary: 67000, allowances: 13000, deductions: 9800, netSalary: 70200, month: "2026-02", status: "pending" },
  { id: "pr-019", employeeName: "Neha Tiwari", department: "Athletics", designation: "Fitness Trainer", baseSalary: 58000, allowances: 11000, deductions: 8400, netSalary: 60600, month: "2026-02", status: "pending" },
  { id: "pr-020", employeeName: "Shreya Menon", department: "Tennis", designation: "Sports Analyst", baseSalary: 65000, allowances: 12500, deductions: 9500, netSalary: 68000, month: "2026-02", status: "pending" },
  { id: "pr-021", employeeName: "Rahul Deshmukh", department: "Administration", designation: "Team Manager", baseSalary: 90000, allowances: 18000, deductions: 13200, netSalary: 94800, month: "2026-02", status: "paid" },
  { id: "pr-022", employeeName: "Amit Saxena", department: "Cricket", designation: "Groundskeeper", baseSalary: 40000, allowances: 8000, deductions: 5800, netSalary: 42200, month: "2026-02", status: "paid" },
  { id: "pr-023", employeeName: "Suresh Pillai", department: "Football", designation: "Groundskeeper", baseSalary: 40000, allowances: 8000, deductions: 5800, netSalary: 42200, month: "2026-02", status: "paid" },
  { id: "pr-024", employeeName: "Rajesh Thakur", department: "Hockey", designation: "Fitness Trainer", baseSalary: 55000, allowances: 10000, deductions: 7900, netSalary: 57100, month: "2026-02", status: "paid" },
  { id: "pr-025", employeeName: "Vikram Chauhan", department: "Medical", designation: "Physiotherapist", baseSalary: 82000, allowances: 17000, deductions: 12100, netSalary: 86900, month: "2026-02", status: "paid" },
  { id: "pr-026", employeeName: "Deepak Yadav", department: "Badminton", designation: "Fitness Trainer", baseSalary: 55000, allowances: 10000, deductions: 7900, netSalary: 57100, month: "2026-02", status: "pending" },
  { id: "pr-027", employeeName: "Manoj Hegde", department: "Swimming", designation: "Team Manager", baseSalary: 78000, allowances: 15000, deductions: 11300, netSalary: 81700, month: "2026-02", status: "processing" },
  { id: "pr-028", employeeName: "Sanjay Bhatt", department: "Athletics", designation: "Assistant Coach", baseSalary: 68000, allowances: 13000, deductions: 9900, netSalary: 71100, month: "2026-02", status: "paid" },
  { id: "pr-029", employeeName: "Kiran Shetty", department: "Administration", designation: "Administrator", baseSalary: 75000, allowances: 15000, deductions: 11000, netSalary: 79000, month: "2026-02", status: "paid" },
  { id: "pr-030", employeeName: "Rohan Kapoor", department: "Canteen", designation: "Team Manager", baseSalary: 55000, allowances: 10000, deductions: 7900, netSalary: 57100, month: "2026-02", status: "paid" },
  { id: "pr-031", employeeName: "Ankita Dubey", department: "Cricket", designation: "Fitness Trainer", baseSalary: 58000, allowances: 11000, deductions: 8400, netSalary: 60600, month: "2026-02", status: "paid" },
  { id: "pr-032", employeeName: "Swati Rathore", department: "Football", designation: "Sports Analyst", baseSalary: 68000, allowances: 13000, deductions: 9900, netSalary: 71100, month: "2026-02", status: "paid" },
  { id: "pr-033", employeeName: "Geeta Agarwal", department: "Hockey", designation: "Team Manager", baseSalary: 75000, allowances: 15000, deductions: 11000, netSalary: 79000, month: "2026-02", status: "processing" },
  { id: "pr-034", employeeName: "Sunita Bansal", department: "Administration", designation: "Administrator", baseSalary: 70000, allowances: 14000, deductions: 10300, netSalary: 73700, month: "2026-02", status: "paid" },
  { id: "pr-035", employeeName: "Lakshmi Naidu", department: "Medical", designation: "Nutritionist", baseSalary: 62000, allowances: 12000, deductions: 9000, netSalary: 65000, month: "2026-02", status: "paid" },
  { id: "pr-036", employeeName: "Harini Gopal", department: "Badminton", designation: "Sports Analyst", baseSalary: 63000, allowances: 12000, deductions: 9100, netSalary: 65900, month: "2026-02", status: "pending" },
  { id: "pr-037", employeeName: "Nandini Prasad", department: "Swimming", designation: "Fitness Trainer", baseSalary: 56000, allowances: 10500, deductions: 8100, netSalary: 58400, month: "2026-02", status: "paid" },
  { id: "pr-038", employeeName: "Divya Mohan", department: "Athletics", designation: "Sports Analyst", baseSalary: 64000, allowances: 12000, deductions: 9200, netSalary: 66800, month: "2026-02", status: "paid" },
  { id: "pr-039", employeeName: "Pallavi Sinha", department: "Tennis", designation: "Assistant Coach", baseSalary: 66000, allowances: 12500, deductions: 9600, netSalary: 68900, month: "2026-02", status: "paid" },
  { id: "pr-040", employeeName: "Tanvi Choudhary", department: "Tennis", designation: "Fitness Trainer", baseSalary: 55000, allowances: 10000, deductions: 7900, netSalary: 57100, month: "2026-02", status: "pending" },
];

// ──────────────────────────────────────────────
// BUDGETS (10 departments)
// ──────────────────────────────────────────────
export const budgets: Budget[] = [
  { id: "bgt-001", department: "Cricket", allocated: 5000000, spent: 3250000, remaining: 1750000, period: "FY 2025-26", status: "on_track" },
  { id: "bgt-002", department: "Football", allocated: 4500000, spent: 3800000, remaining: 700000, period: "FY 2025-26", status: "warning" },
  { id: "bgt-003", department: "Hockey", allocated: 4000000, spent: 2600000, remaining: 1400000, period: "FY 2025-26", status: "on_track" },
  { id: "bgt-004", department: "Badminton", allocated: 3000000, spent: 2100000, remaining: 900000, period: "FY 2025-26", status: "on_track" },
  { id: "bgt-005", department: "Swimming", allocated: 3500000, spent: 3300000, remaining: 200000, period: "FY 2025-26", status: "over_budget" },
  { id: "bgt-006", department: "Athletics", allocated: 3200000, spent: 2500000, remaining: 700000, period: "FY 2025-26", status: "warning" },
  { id: "bgt-007", department: "Tennis", allocated: 2800000, spent: 1700000, remaining: 1100000, period: "FY 2025-26", status: "on_track" },
  { id: "bgt-008", department: "Administration", allocated: 8000000, spent: 7500000, remaining: 500000, period: "FY 2025-26", status: "over_budget" },
  { id: "bgt-009", department: "Medical", allocated: 2500000, spent: 1650000, remaining: 850000, period: "FY 2025-26", status: "on_track" },
  { id: "bgt-010", department: "Canteen", allocated: 1800000, spent: 1350000, remaining: 450000, period: "FY 2025-26", status: "warning" },
];

// ──────────────────────────────────────────────
// EXPENSES (50)
// ──────────────────────────────────────────────
export const expenses: Expense[] = [
  { id: "exp-001", category: "Equipment", description: "Cricket bats - SG brand (20 units)", amount: 120000, department: "Cricket", date: "2026-02-20", approvedBy: "Aarav Sharma", status: "approved" },
  { id: "exp-002", category: "Travel", description: "Football team flight to Kolkata", amount: 185000, department: "Football", date: "2026-02-19", approvedBy: "Vivaan Patel", status: "approved" },
  { id: "exp-003", category: "Medical", description: "Physiotherapy sessions - February batch", amount: 95000, department: "Medical", date: "2026-02-18", approvedBy: "Ananya Das", status: "approved" },
  { id: "exp-004", category: "Training", description: "International coaching seminar fees", amount: 250000, department: "Hockey", date: "2026-02-17", approvedBy: "Aditya Verma", status: "pending" },
  { id: "exp-005", category: "Nutrition", description: "Protein supplements monthly order", amount: 78000, department: "Canteen", date: "2026-02-16", approvedBy: "Kavya Rao", status: "approved" },
  { id: "exp-006", category: "Infrastructure", description: "Swimming pool tile repair", amount: 340000, department: "Swimming", date: "2026-02-15", approvedBy: "Arjun Gupta", status: "approved" },
  { id: "exp-007", category: "Utilities", description: "Electricity bill - February", amount: 210000, department: "Administration", date: "2026-02-14", approvedBy: "Diya Mishra", status: "approved" },
  { id: "exp-008", category: "Equipment", description: "Badminton shuttlecocks (500 tubes)", amount: 150000, department: "Badminton", date: "2026-02-13", approvedBy: "Vihaan Singh", status: "approved" },
  { id: "exp-009", category: "Training", description: "Video analysis software renewal", amount: 95000, department: "Administration", date: "2026-02-12", approvedBy: "Rahul Deshmukh", status: "approved" },
  { id: "exp-010", category: "Maintenance", description: "Tennis court net replacement", amount: 45000, department: "Tennis", date: "2026-02-11", approvedBy: "Reyansh Reddy", status: "approved" },
  { id: "exp-011", category: "Equipment", description: "Athletics hurdles and starting blocks", amount: 180000, department: "Athletics", date: "2026-02-10", approvedBy: "Sai Kumar", status: "pending" },
  { id: "exp-012", category: "Travel", description: "Cricket team bus to Pune", amount: 45000, department: "Cricket", date: "2026-02-09", approvedBy: "Aarav Sharma", status: "approved" },
  { id: "exp-013", category: "Medical", description: "First aid kits replenishment", amount: 35000, department: "Medical", date: "2026-02-08", approvedBy: "Ananya Das", status: "approved" },
  { id: "exp-014", category: "Marketing", description: "Social media ad campaign - February", amount: 85000, department: "Administration", date: "2026-02-07", approvedBy: "Diya Mishra", status: "approved" },
  { id: "exp-015", category: "Equipment", description: "Football goal nets and corner flags", amount: 65000, department: "Football", date: "2026-02-06", approvedBy: "Vivaan Patel", status: "approved" },
  { id: "exp-016", category: "Nutrition", description: "Energy bars and electrolytes", amount: 42000, department: "Canteen", date: "2026-02-05", approvedBy: "Kavya Rao", status: "approved" },
  { id: "exp-017", category: "Insurance", description: "Monthly athlete insurance premium", amount: 175000, department: "Administration", date: "2026-02-04", approvedBy: "Rahul Deshmukh", status: "approved" },
  { id: "exp-018", category: "Infrastructure", description: "Hockey turf patching and repair", amount: 220000, department: "Hockey", date: "2026-02-03", approvedBy: "Aditya Verma", status: "approved" },
  { id: "exp-019", category: "Supplies", description: "Cleaning materials and detergents", amount: 28000, department: "Canteen", date: "2026-02-02", approvedBy: "Rohan Kapoor", status: "approved" },
  { id: "exp-020", category: "Technology", description: "Scoreboard software license", amount: 120000, department: "Administration", date: "2026-02-01", approvedBy: "Diya Mishra", status: "pending" },
  { id: "exp-021", category: "Equipment", description: "Swimming goggles and caps bulk order", amount: 55000, department: "Swimming", date: "2026-01-30", approvedBy: "Arjun Gupta", status: "approved" },
  { id: "exp-022", category: "Travel", description: "Badminton team travel to Chennai", amount: 135000, department: "Badminton", date: "2026-01-29", approvedBy: "Vihaan Singh", status: "approved" },
  { id: "exp-023", category: "Training", description: "Strength coach workshop fees", amount: 75000, department: "Athletics", date: "2026-01-28", approvedBy: "Sai Kumar", status: "approved" },
  { id: "exp-024", category: "Maintenance", description: "Cricket pitch roller servicing", amount: 55000, department: "Cricket", date: "2026-01-27", approvedBy: "Amit Saxena", status: "approved" },
  { id: "exp-025", category: "Events", description: "Inter-department sports meet", amount: 195000, department: "Administration", date: "2026-01-26", approvedBy: "Rahul Deshmukh", status: "approved" },
  { id: "exp-026", category: "Equipment", description: "Tennis rackets and balls", amount: 95000, department: "Tennis", date: "2026-01-25", approvedBy: "Reyansh Reddy", status: "approved" },
  { id: "exp-027", category: "Utilities", description: "Water bill - January", amount: 48000, department: "Administration", date: "2026-01-24", approvedBy: "Diya Mishra", status: "approved" },
  { id: "exp-028", category: "Medical", description: "MRI scan charges for injured athlete", amount: 25000, department: "Medical", date: "2026-01-23", approvedBy: "Ananya Das", status: "approved" },
  { id: "exp-029", category: "Nutrition", description: "Monthly meal plan ingredients", amount: 165000, department: "Canteen", date: "2026-01-22", approvedBy: "Kavya Rao", status: "approved" },
  { id: "exp-030", category: "Travel", description: "Hockey team travel to Lucknow", amount: 155000, department: "Hockey", date: "2026-01-21", approvedBy: "Aditya Verma", status: "rejected" },
  { id: "exp-031", category: "Infrastructure", description: "Athletics track marking paint", amount: 35000, department: "Athletics", date: "2026-01-20", approvedBy: "Sai Kumar", status: "approved" },
  { id: "exp-032", category: "Equipment", description: "Football training cones and bibs", amount: 28000, department: "Football", date: "2026-01-19", approvedBy: "Vivaan Patel", status: "approved" },
  { id: "exp-033", category: "Licensing", description: "Sports federation membership renewal", amount: 145000, department: "Administration", date: "2026-01-18", approvedBy: "Rahul Deshmukh", status: "approved" },
  { id: "exp-034", category: "Maintenance", description: "Badminton court wooden floor polishing", amount: 85000, department: "Badminton", date: "2026-01-17", approvedBy: "Vihaan Singh", status: "approved" },
  { id: "exp-035", category: "Equipment", description: "Swimming lane dividers replacement", amount: 110000, department: "Swimming", date: "2026-01-16", approvedBy: "Arjun Gupta", status: "approved" },
  { id: "exp-036", category: "Training", description: "Cricket bowling machine lease", amount: 60000, department: "Cricket", date: "2026-01-15", approvedBy: "Aarav Sharma", status: "approved" },
  { id: "exp-037", category: "Marketing", description: "Print brochures and banners", amount: 45000, department: "Administration", date: "2026-01-14", approvedBy: "Diya Mishra", status: "approved" },
  { id: "exp-038", category: "Medical", description: "Blood test kits for health checkup", amount: 42000, department: "Medical", date: "2026-01-13", approvedBy: "Ananya Das", status: "approved" },
  { id: "exp-039", category: "Events", description: "Annual day decoration and catering", amount: 280000, department: "Administration", date: "2026-01-12", approvedBy: "Rahul Deshmukh", status: "approved" },
  { id: "exp-040", category: "Equipment", description: "Hockey goalkeeper pads and gloves", amount: 75000, department: "Hockey", date: "2026-01-11", approvedBy: "Aditya Verma", status: "approved" },
  { id: "exp-041", category: "Utilities", description: "Gas and fuel charges", amount: 32000, department: "Canteen", date: "2026-01-10", approvedBy: "Rohan Kapoor", status: "approved" },
  { id: "exp-042", category: "Travel", description: "Tennis team travel to Bangalore", amount: 125000, department: "Tennis", date: "2026-01-09", approvedBy: "Reyansh Reddy", status: "approved" },
  { id: "exp-043", category: "Technology", description: "Athlete performance tracking tablets", amount: 180000, department: "Administration", date: "2026-01-08", approvedBy: "Diya Mishra", status: "approved" },
  { id: "exp-044", category: "Supplies", description: "Towels and cleaning cloths", amount: 18000, department: "Swimming", date: "2026-01-07", approvedBy: "Arjun Gupta", status: "approved" },
  { id: "exp-045", category: "Training", description: "Mental conditioning workshop", amount: 90000, department: "Administration", date: "2026-01-06", approvedBy: "Rahul Deshmukh", status: "pending" },
  { id: "exp-046", category: "Equipment", description: "Athletics javelin and discus set", amount: 65000, department: "Athletics", date: "2026-01-05", approvedBy: "Sai Kumar", status: "approved" },
  { id: "exp-047", category: "Maintenance", description: "Football ground grass trimming", amount: 22000, department: "Football", date: "2026-01-04", approvedBy: "Suresh Pillai", status: "approved" },
  { id: "exp-048", category: "Insurance", description: "Equipment insurance premium", amount: 95000, department: "Administration", date: "2026-01-03", approvedBy: "Diya Mishra", status: "approved" },
  { id: "exp-049", category: "Nutrition", description: "Vitamin and mineral supplements", amount: 52000, department: "Medical", date: "2026-01-02", approvedBy: "Lakshmi Naidu", status: "approved" },
  { id: "exp-050", category: "Events", description: "New Year sports festival expenses", amount: 350000, department: "Administration", date: "2026-01-01", approvedBy: "Rahul Deshmukh", status: "rejected" },
];

// ──────────────────────────────────────────────
// MONTHLY P&L DATA (12 months)
// ──────────────────────────────────────────────
export const monthlyPnL: MonthlyPnL[] = [
  { month: "Mar 2025", income: 4200000, expenses: 3100000, profit: 1100000 },
  { month: "Apr 2025", income: 3800000, expenses: 2900000, profit: 900000 },
  { month: "May 2025", income: 4500000, expenses: 3400000, profit: 1100000 },
  { month: "Jun 2025", income: 3600000, expenses: 3200000, profit: 400000 },
  { month: "Jul 2025", income: 5100000, expenses: 3800000, profit: 1300000 },
  { month: "Aug 2025", income: 4800000, expenses: 3500000, profit: 1300000 },
  { month: "Sep 2025", income: 4300000, expenses: 3300000, profit: 1000000 },
  { month: "Oct 2025", income: 5500000, expenses: 3900000, profit: 1600000 },
  { month: "Nov 2025", income: 5200000, expenses: 3700000, profit: 1500000 },
  { month: "Dec 2025", income: 6100000, expenses: 4200000, profit: 1900000 },
  { month: "Jan 2026", income: 5800000, expenses: 4000000, profit: 1800000 },
  { month: "Feb 2026", income: 6400000, expenses: 4100000, profit: 2300000 },
];

// ──────────────────────────────────────────────
// REVENUE BY DEPARTMENT
// ──────────────────────────────────────────────
export const revenueByDepartment: RevenueDepartment[] = [
  { department: "Cricket", revenue: 8500000 },
  { department: "Football", revenue: 6200000 },
  { department: "Hockey", revenue: 4800000 },
  { department: "Badminton", revenue: 3100000 },
  { department: "Swimming", revenue: 3500000 },
  { department: "Athletics", revenue: 2900000 },
  { department: "Tennis", revenue: 2400000 },
  { department: "Administration", revenue: 12500000 },
  { department: "Medical", revenue: 1800000 },
  { department: "Canteen", revenue: 900000 },
];

// ──────────────────────────────────────────────
// EXPENSE CATEGORY BREAKDOWN
// ──────────────────────────────────────────────
export const expenseCategoryBreakdown: ExpenseCategory[] = [
  { name: "Salaries", value: 14200000 },
  { name: "Equipment", value: 4500000 },
  { name: "Infrastructure", value: 3800000 },
  { name: "Travel", value: 2900000 },
  { name: "Training", value: 2100000 },
  { name: "Medical", value: 1800000 },
  { name: "Utilities", value: 1500000 },
  { name: "Events", value: 1400000 },
  { name: "Insurance", value: 1200000 },
  { name: "Nutrition", value: 950000 },
  { name: "Marketing", value: 800000 },
  { name: "Technology", value: 750000 },
  { name: "Maintenance", value: 700000 },
  { name: "Supplies", value: 400000 },
  { name: "Licensing", value: 350000 },
];
