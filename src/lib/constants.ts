import type { Department, DepartmentSlug, NavItem, Role } from "@/types";

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  department_head: "Department Head",
  manager: "Manager",
  staff: "Staff",
  member: "Member",
};

export const DEPARTMENTS: Department[] = [
  {
    slug: "gym",
    name: "Gym",
    description: "Gym management system for members, equipment, and classes",
    icon: "Dumbbell",
    color: "text-orange-500",
    gradient: "from-orange-500 to-amber-500",
    headId: "u-gym-head",
    staffCount: 15,
    memberCount: 1250,
  },
  {
    slug: "physio",
    name: "Physio & Spa",
    description: "Appointment & treatment software for physiotherapy and spa",
    icon: "Heart",
    color: "text-pink-500",
    gradient: "from-pink-500 to-rose-500",
    headId: "u-physio-head",
    staffCount: 12,
    memberCount: 420,
  },
  {
    slug: "medical",
    name: "Medical Centre",
    description: "EMR / hospital system for patient care",
    icon: "Stethoscope",
    color: "text-red-500",
    gradient: "from-red-500 to-rose-600",
    headId: "u-medical-head",
    staffCount: 22,
    memberCount: 890,
  },
  {
    slug: "sports",
    name: "Sports Facilities",
    description: "Facility booking & league management",
    icon: "Trophy",
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
    headId: "u-sports-head",
    staffCount: 18,
    memberCount: 650,
  },
  {
    slug: "dormitories",
    name: "Dormitories & Residences",
    description: "Hostel / property management system",
    icon: "Building2",
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    headId: "u-dorm-head",
    staffCount: 10,
    memberCount: 320,
  },
  {
    slug: "conference",
    name: "Conference Hall",
    description: "Event & rental booking system",
    icon: "Presentation",
    color: "text-purple-500",
    gradient: "from-purple-500 to-violet-500",
    headId: "u-conf-head",
    staffCount: 8,
    memberCount: 0,
  },
  {
    slug: "canteen",
    name: "Canteen",
    description: "POS + inventory management for food services",
    icon: "UtensilsCrossed",
    color: "text-yellow-600",
    gradient: "from-yellow-500 to-orange-500",
    headId: "u-canteen-head",
    staffCount: 20,
    memberCount: 0,
  },
  {
    slug: "coaches",
    name: "Coaches",
    description: "Staff scheduling and athlete management system",
    icon: "Whistle",
    color: "text-teal-500",
    gradient: "from-teal-500 to-cyan-500",
    headId: "u-coaches-head",
    staffCount: 15,
    memberCount: 60,
  },
  {
    slug: "finance",
    name: "Finance",
    description: "Accounting software for revenue and expenses",
    icon: "IndianRupee",
    color: "text-emerald-600",
    gradient: "from-emerald-500 to-green-600",
    headId: "u-finance-head",
    staffCount: 8,
    memberCount: 0,
  },
  {
    slug: "management",
    name: "Management",
    description: "ERP dashboard & analytics for oversight",
    icon: "LayoutDashboard",
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-blue-600",
    headId: "u-mgmt-head",
    staffCount: 6,
    memberCount: 0,
  },
];

export function getDepartment(slug: DepartmentSlug): Department | undefined {
  return DEPARTMENTS.find((d) => d.slug === slug);
}

const ALL_ROLES: Role[] = ["super_admin", "department_head", "manager", "staff", "member"];
const STAFF_ROLES: Role[] = ["super_admin", "department_head", "manager", "staff"];
const MANAGEMENT_ROLES: Role[] = ["super_admin", "department_head", "manager"];

const HEFRA_NAV: NavItem[] = [
  { title: "HeFRA Dashboard", href: "/compliance", icon: "ShieldCheck", roles: ["super_admin", "department_head"] },
  { title: "Personnel", href: "/compliance/personnel", icon: "Users", roles: ["super_admin", "department_head"] },
  { title: "Premises & Safety", href: "/compliance/premises", icon: "Building2", roles: ["super_admin", "department_head"] },
  { title: "Equipment", href: "/compliance/equipment", icon: "Wrench", roles: ["super_admin", "department_head"] },
  { title: "Licensing", href: "/compliance/licensing", icon: "FileCheck", roles: ["super_admin", "department_head"] },
  { title: "Inspections", href: "/compliance/inspections", icon: "ClipboardCheck", roles: ["super_admin", "department_head"] },
];

const ADMIN_NAV: NavItem[] = [
  { title: "Overview", href: "/admin", icon: "LayoutDashboard", roles: ["super_admin"] },
  { title: "Users", href: "/admin/users", icon: "Users", roles: ["super_admin"] },
  { title: "Departments", href: "/admin/departments", icon: "Building", roles: ["super_admin"] },
  { title: "Analytics", href: "/admin/analytics", icon: "BarChart3", roles: ["super_admin"] },
  { title: "Audit Log", href: "/admin/audit-log", icon: "FileText", roles: ["super_admin"] },
  { title: "Settings", href: "/admin/settings", icon: "Settings", roles: ["super_admin"] },
];

const DEPARTMENT_NAV: Record<DepartmentSlug, NavItem[]> = {
  gym: [
    { title: "Dashboard", href: "/gym", icon: "LayoutDashboard", roles: STAFF_ROLES },
    { title: "Members", href: "/gym/members", icon: "Users", roles: STAFF_ROLES },
    { title: "Equipment", href: "/gym/equipment", icon: "Dumbbell", roles: MANAGEMENT_ROLES },
    { title: "Classes", href: "/gym/classes", icon: "Calendar", roles: STAFF_ROLES },
    { title: "Trainers", href: "/gym/trainers", icon: "UserCheck", roles: MANAGEMENT_ROLES },
    { title: "Attendance", href: "/gym/attendance", icon: "ClipboardCheck", roles: STAFF_ROLES },
    { title: "Plans", href: "/gym/plans", icon: "CreditCard", roles: MANAGEMENT_ROLES },
  ],
  physio: [
    { title: "Dashboard", href: "/physio", icon: "LayoutDashboard", roles: STAFF_ROLES },
    { title: "Appointments", href: "/physio/appointments", icon: "CalendarCheck", roles: STAFF_ROLES },
    { title: "Therapists", href: "/physio/therapists", icon: "UserCheck", roles: MANAGEMENT_ROLES },
    { title: "Treatments", href: "/physio/treatments", icon: "Pill", roles: STAFF_ROLES },
    { title: "Packages", href: "/physio/packages", icon: "Package", roles: MANAGEMENT_ROLES },
    { title: "Patients", href: "/physio/patients", icon: "Users", roles: STAFF_ROLES },
  ],
  medical: [
    { title: "Dashboard", href: "/medical", icon: "LayoutDashboard", roles: STAFF_ROLES },
    { title: "Patients", href: "/medical/patients", icon: "Users", roles: STAFF_ROLES },
    { title: "Doctors", href: "/medical/doctors", icon: "Stethoscope", roles: MANAGEMENT_ROLES },
    { title: "Appointments", href: "/medical/appointments", icon: "CalendarCheck", roles: STAFF_ROLES },
    { title: "Prescriptions", href: "/medical/prescriptions", icon: "FileText", roles: STAFF_ROLES },
    { title: "Lab Results", href: "/medical/lab-results", icon: "TestTube", roles: STAFF_ROLES },
    { title: "Emergency", href: "/medical/emergency", icon: "Siren", roles: STAFF_ROLES },
  ],
  sports: [
    { title: "Dashboard", href: "/sports", icon: "LayoutDashboard", roles: STAFF_ROLES },
    { title: "Facilities", href: "/sports/facilities", icon: "MapPin", roles: STAFF_ROLES },
    { title: "Bookings", href: "/sports/bookings", icon: "CalendarCheck", roles: STAFF_ROLES },
    { title: "Leagues", href: "/sports/leagues", icon: "Trophy", roles: MANAGEMENT_ROLES },
    { title: "Tournaments", href: "/sports/tournaments", icon: "Swords", roles: MANAGEMENT_ROLES },
    { title: "Equipment", href: "/sports/equipment", icon: "Package", roles: MANAGEMENT_ROLES },
  ],
  dormitories: [
    { title: "Dashboard", href: "/dormitories", icon: "LayoutDashboard", roles: STAFF_ROLES },
    { title: "Rooms", href: "/dormitories/rooms", icon: "DoorOpen", roles: STAFF_ROLES },
    { title: "Residents", href: "/dormitories/residents", icon: "Users", roles: STAFF_ROLES },
    { title: "Maintenance", href: "/dormitories/maintenance", icon: "Wrench", roles: STAFF_ROLES },
    { title: "Visitors", href: "/dormitories/visitors", icon: "UserPlus", roles: STAFF_ROLES },
    { title: "Billing", href: "/dormitories/billing", icon: "Receipt", roles: MANAGEMENT_ROLES },
  ],
  conference: [
    { title: "Dashboard", href: "/conference", icon: "LayoutDashboard", roles: STAFF_ROLES },
    { title: "Rooms", href: "/conference/rooms", icon: "DoorOpen", roles: STAFF_ROLES },
    { title: "Events", href: "/conference/events", icon: "Calendar", roles: STAFF_ROLES },
    { title: "Bookings", href: "/conference/bookings", icon: "CalendarCheck", roles: STAFF_ROLES },
    { title: "Equipment", href: "/conference/equipment", icon: "Monitor", roles: MANAGEMENT_ROLES },
    { title: "Catering", href: "/conference/catering", icon: "UtensilsCrossed", roles: MANAGEMENT_ROLES },
  ],
  canteen: [
    { title: "Dashboard", href: "/canteen", icon: "LayoutDashboard", roles: STAFF_ROLES },
    { title: "POS", href: "/canteen/pos", icon: "ShoppingCart", roles: STAFF_ROLES },
    { title: "Menu", href: "/canteen/menu", icon: "BookOpen", roles: MANAGEMENT_ROLES },
    { title: "Orders", href: "/canteen/orders", icon: "ClipboardList", roles: STAFF_ROLES },
    { title: "Inventory", href: "/canteen/inventory", icon: "Package", roles: MANAGEMENT_ROLES },
    { title: "Suppliers", href: "/canteen/suppliers", icon: "Truck", roles: MANAGEMENT_ROLES },
    { title: "Daily Sales", href: "/canteen/daily-sales", icon: "TrendingUp", roles: MANAGEMENT_ROLES },
  ],
  coaches: [
    { title: "Dashboard", href: "/coaches", icon: "LayoutDashboard", roles: STAFF_ROLES },
    { title: "Directory", href: "/coaches/directory", icon: "Users", roles: STAFF_ROLES },
    { title: "Athletes", href: "/coaches/athletes", icon: "Medal", roles: STAFF_ROLES },
    { title: "Schedule", href: "/coaches/schedule", icon: "Calendar", roles: STAFF_ROLES },
    { title: "Performance", href: "/coaches/performance", icon: "TrendingUp", roles: MANAGEMENT_ROLES },
    { title: "Certifications", href: "/coaches/certifications", icon: "Award", roles: MANAGEMENT_ROLES },
  ],
  finance: [
    { title: "Dashboard", href: "/finance", icon: "LayoutDashboard", roles: STAFF_ROLES },
    { title: "Transactions", href: "/finance/transactions", icon: "ArrowLeftRight", roles: STAFF_ROLES },
    { title: "Invoices", href: "/finance/invoices", icon: "FileText", roles: STAFF_ROLES },
    { title: "Payroll", href: "/finance/payroll", icon: "Wallet", roles: MANAGEMENT_ROLES },
    { title: "Budgets", href: "/finance/budgets", icon: "PieChart", roles: MANAGEMENT_ROLES },
    { title: "Reports", href: "/finance/reports", icon: "BarChart3", roles: MANAGEMENT_ROLES },
  ],
  management: [
    { title: "Dashboard", href: "/management", icon: "LayoutDashboard", roles: MANAGEMENT_ROLES },
    { title: "Staff Directory", href: "/management/staff-directory", icon: "Users", roles: MANAGEMENT_ROLES },
    { title: "Announcements", href: "/management/announcements", icon: "Megaphone", roles: MANAGEMENT_ROLES },
    { title: "Reports", href: "/management/reports", icon: "BarChart3", roles: MANAGEMENT_ROLES },
  ],
};

const MEMBER_NAV: NavItem[] = [
  { title: "My Portal", href: "/portal", icon: "Home", roles: ["member"] },
  { title: "My Membership", href: "/gym/my-membership", icon: "Dumbbell", roles: ["member"] },
  { title: "My Bookings", href: "/sports/my-bookings", icon: "CalendarCheck", roles: ["member"] },
  { title: "My Training", href: "/coaches/my-training", icon: "Medal", roles: ["member"] },
  { title: "My Records", href: "/medical/my-records", icon: "Stethoscope", roles: ["member"] },
  { title: "My Appointments", href: "/physio/my-appointments", icon: "Heart", roles: ["member"] },
  { title: "My Room", href: "/dormitories/my-room", icon: "Building2", roles: ["member"] },
  { title: "Book Conference", href: "/conference/book", icon: "Presentation", roles: ["member"] },
  { title: "Order Food", href: "/canteen/order", icon: "UtensilsCrossed", roles: ["member"] },
];

export function getNavigation(role: Role, department?: DepartmentSlug | null): NavItem[] {
  if (role === "super_admin") {
    return [...ADMIN_NAV, ...HEFRA_NAV];
  }

  if (role === "member") {
    return MEMBER_NAV;
  }

  if (department && DEPARTMENT_NAV[department]) {
    const deptNav = DEPARTMENT_NAV[department].filter((item) => item.roles.includes(role));
    // Medical and Physio department heads get HeFRA compliance nav
    if ((department === "medical" || department === "physio") && role === "department_head") {
      return [...deptNav, ...HEFRA_NAV.filter((item) => item.roles.includes(role))];
    }
    return deptNav;
  }

  return [];
}

export function getAllDepartmentNavItems(): NavItem[] {
  return Object.entries(DEPARTMENT_NAV).flatMap(([, items]) => items);
}
