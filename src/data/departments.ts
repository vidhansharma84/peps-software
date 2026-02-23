import type { Department } from "@/types";
import { DEPARTMENTS } from "@/lib/constants";

export const departments: Department[] = DEPARTMENTS;

export interface DepartmentStats {
  slug: string;
  revenue: number;
  expenses: number;
  memberCount: number;
  staffCount: number;
  satisfaction: number; // 1-5
  occupancy: number; // percentage
  monthlyGrowth: number; // percentage
}

export const departmentStats: DepartmentStats[] = [
  {
    slug: "gym",
    revenue: 1850000,
    expenses: 920000,
    memberCount: 1250,
    staffCount: 15,
    satisfaction: 4.3,
    occupancy: 78,
    monthlyGrowth: 5.2,
  },
  {
    slug: "physio",
    revenue: 980000,
    expenses: 540000,
    memberCount: 420,
    staffCount: 12,
    satisfaction: 4.6,
    occupancy: 65,
    monthlyGrowth: 3.8,
  },
  {
    slug: "medical",
    revenue: 2450000,
    expenses: 1680000,
    memberCount: 890,
    staffCount: 22,
    satisfaction: 4.1,
    occupancy: 72,
    monthlyGrowth: 2.4,
  },
  {
    slug: "sports",
    revenue: 1320000,
    expenses: 780000,
    memberCount: 650,
    staffCount: 18,
    satisfaction: 4.4,
    occupancy: 82,
    monthlyGrowth: 6.1,
  },
  {
    slug: "dormitories",
    revenue: 760000,
    expenses: 420000,
    memberCount: 320,
    staffCount: 10,
    satisfaction: 3.9,
    occupancy: 91,
    monthlyGrowth: 1.5,
  },
  {
    slug: "conference",
    revenue: 540000,
    expenses: 310000,
    memberCount: 0,
    staffCount: 8,
    satisfaction: 4.2,
    occupancy: 58,
    monthlyGrowth: 4.7,
  },
  {
    slug: "canteen",
    revenue: 1100000,
    expenses: 820000,
    memberCount: 0,
    staffCount: 20,
    satisfaction: 3.7,
    occupancy: 88,
    monthlyGrowth: 1.9,
  },
  {
    slug: "coaches",
    revenue: 680000,
    expenses: 490000,
    memberCount: 60,
    staffCount: 15,
    satisfaction: 4.5,
    occupancy: 70,
    monthlyGrowth: 3.2,
  },
  {
    slug: "finance",
    revenue: 0,
    expenses: 380000,
    memberCount: 0,
    staffCount: 8,
    satisfaction: 4.0,
    occupancy: 45,
    monthlyGrowth: 0.0,
  },
  {
    slug: "management",
    revenue: 0,
    expenses: 520000,
    memberCount: 0,
    staffCount: 6,
    satisfaction: 4.1,
    occupancy: 50,
    monthlyGrowth: 0.0,
  },
];

export function getDepartmentStats(slug: string): DepartmentStats | undefined {
  return departmentStats.find((d) => d.slug === slug);
}
