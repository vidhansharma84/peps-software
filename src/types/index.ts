export type Role = "super_admin" | "department_head" | "manager" | "staff" | "member";

export type DepartmentSlug =
  | "gym"
  | "physio"
  | "medical"
  | "sports"
  | "dormitories"
  | "conference"
  | "canteen"
  | "coaches"
  | "finance"
  | "management";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  department: DepartmentSlug | null;
  phone: string;
  joinedAt: string;
  status: "active" | "inactive" | "suspended";
}

export interface Department {
  slug: DepartmentSlug;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  headId: string;
  staffCount: number;
  memberCount: number;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
  roles: Role[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  createdAt: string;
  departmentSlug?: DepartmentSlug;
}

export interface StatsCardData {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
}
