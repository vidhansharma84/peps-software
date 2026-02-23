import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  role: z.enum(["super_admin", "department_head", "manager", "staff", "member"]),
  department: z.string().nullable(),
  status: z.enum(["active", "inactive", "suspended"]),
});

export type UserFormData = z.infer<typeof userSchema>;

export const bookingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  purpose: z.string().min(1, "Purpose is required"),
  participants: z.number().min(1, "At least 1 participant required"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
