"use client";

import { create } from "zustand";
import type { Notification } from "@/types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
}

const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "New Member Registration",
    message: "Rohit Verma has registered for the Gym Gold plan",
    type: "success",
    read: false,
    createdAt: "2025-12-20T10:30:00",
    departmentSlug: "gym",
  },
  {
    id: "n2",
    title: "Equipment Maintenance Due",
    message: "3 treadmills require scheduled maintenance this week",
    type: "warning",
    read: false,
    createdAt: "2025-12-20T09:15:00",
    departmentSlug: "gym",
  },
  {
    id: "n3",
    title: "Appointment Cancelled",
    message: "Dr. Priya Sharma cancelled 2:00 PM appointment with Patient #45",
    type: "info",
    read: false,
    createdAt: "2025-12-19T16:45:00",
    departmentSlug: "medical",
  },
  {
    id: "n4",
    title: "Low Inventory Alert",
    message: "Rice stock is below minimum threshold in canteen",
    type: "error",
    read: false,
    createdAt: "2025-12-19T14:20:00",
    departmentSlug: "canteen",
  },
  {
    id: "n5",
    title: "Tournament Registration Open",
    message: "Inter-department Cricket Tournament 2026 registration is now open",
    type: "info",
    read: true,
    createdAt: "2025-12-18T11:00:00",
    departmentSlug: "sports",
  },
  {
    id: "n6",
    title: "Budget Approved",
    message: "Q1 2026 budget for Physio & Spa has been approved",
    type: "success",
    read: true,
    createdAt: "2025-12-18T09:30:00",
    departmentSlug: "finance",
  },
  {
    id: "n7",
    title: "Maintenance Request",
    message: "Room 204B reported AC malfunction in Block A",
    type: "warning",
    read: false,
    createdAt: "2025-12-17T22:10:00",
    departmentSlug: "dormitories",
  },
  {
    id: "n8",
    title: "Conference Booking Confirmed",
    message: "Main Hall booked for Annual Sports Day on Jan 15, 2026",
    type: "success",
    read: true,
    createdAt: "2025-12-17T15:00:00",
    departmentSlug: "conference",
  },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.read).length,

  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: `n${Date.now()}`,
        createdAt: new Date().toISOString(),
        read: false,
      };
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),
}));
