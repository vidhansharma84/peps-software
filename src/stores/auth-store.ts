"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DepartmentSlug, Role, User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  loginAs: (role: Role, department?: DepartmentSlug | null) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const DEMO_USERS: Record<string, User> = {
  super_admin: {
    id: "u-admin-1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@peps.edu.in",
    avatar: "",
    role: "super_admin",
    department: null,
    phone: "+91 98765 43210",
    joinedAt: "2023-01-15",
    status: "active",
  },
  "department_head-gym": {
    id: "u-gym-head",
    name: "Vikram Singh",
    email: "vikram.singh@peps.edu.in",
    avatar: "",
    role: "department_head",
    department: "gym",
    phone: "+91 98765 43211",
    joinedAt: "2023-03-10",
    status: "active",
  },
  "department_head-medical": {
    id: "u-medical-head",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@peps.edu.in",
    avatar: "",
    role: "department_head",
    department: "medical",
    phone: "+91 98765 43212",
    joinedAt: "2023-02-20",
    status: "active",
  },
  "department_head-finance": {
    id: "u-finance-head",
    name: "Anita Desai",
    email: "anita.desai@peps.edu.in",
    avatar: "",
    role: "department_head",
    department: "finance",
    phone: "+91 98765 43213",
    joinedAt: "2023-04-05",
    status: "active",
  },
  "manager-gym": {
    id: "u-gym-mgr-1",
    name: "Arjun Patel",
    email: "arjun.patel@peps.edu.in",
    avatar: "",
    role: "manager",
    department: "gym",
    phone: "+91 98765 43214",
    joinedAt: "2023-06-15",
    status: "active",
  },
  "staff-medical": {
    id: "u-medical-staff-1",
    name: "Neha Gupta",
    email: "neha.gupta@peps.edu.in",
    avatar: "",
    role: "staff",
    department: "medical",
    phone: "+91 98765 43215",
    joinedAt: "2024-01-10",
    status: "active",
  },
  member: {
    id: "u-member-1",
    name: "Rohit Verma",
    email: "rohit.verma@peps.edu.in",
    avatar: "",
    role: "member",
    department: null,
    phone: "+91 98765 43216",
    joinedAt: "2024-06-01",
    status: "active",
  },
};

function getDemoUser(role: Role, department?: DepartmentSlug | null): User {
  const key = department ? `${role}-${department}` : role;
  return DEMO_USERS[key] || DEMO_USERS[role] || DEMO_USERS.super_admin;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, _password: string) => {
        const user = Object.values(DEMO_USERS).find((u) => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        // Default: login as super admin for any email
        set({ user: DEMO_USERS.super_admin, isAuthenticated: true });
        return true;
      },

      loginAs: (role: Role, department?: DepartmentSlug | null) => {
        const user = getDemoUser(role, department);
        set({
          user: { ...user, role, department: department ?? null },
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: "peps-auth",
    }
  )
);
