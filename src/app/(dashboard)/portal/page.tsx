"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Dumbbell, Heart, Stethoscope, Trophy, Building2,
  Presentation, UtensilsCrossed, Calendar, ArrowRight,
  Clock, CheckCircle, Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { useAuthStore } from "@/stores/auth-store";

const quickActions = [
  { title: "Gym", description: "View membership & classes", href: "/gym/my-membership", icon: <Dumbbell className="h-5 w-5" />, gradient: "from-orange-500 to-amber-500" },
  { title: "Sports", description: "Book facilities & courts", href: "/sports/my-bookings", icon: <Trophy className="h-5 w-5" />, gradient: "from-green-500 to-emerald-500" },
  { title: "Medical", description: "View health records", href: "/medical/my-records", icon: <Stethoscope className="h-5 w-5" />, gradient: "from-red-500 to-rose-500" },
  { title: "Physio & Spa", description: "Book appointments", href: "/physio/my-appointments", icon: <Heart className="h-5 w-5" />, gradient: "from-pink-500 to-rose-500" },
  { title: "My Room", description: "Room info & maintenance", href: "/dormitories/my-room", icon: <Building2 className="h-5 w-5" />, gradient: "from-blue-500 to-cyan-500" },
  { title: "Conference", description: "Book meeting rooms", href: "/conference/book", icon: <Presentation className="h-5 w-5" />, gradient: "from-purple-500 to-violet-500" },
  { title: "Canteen", description: "Order food online", href: "/canteen/order", icon: <UtensilsCrossed className="h-5 w-5" />, gradient: "from-yellow-500 to-orange-500" },
  { title: "Training", description: "View training plan", href: "/coaches/my-training", icon: <Calendar className="h-5 w-5" />, gradient: "from-teal-500 to-cyan-500" },
];

const upcomingEvents = [
  { id: "1", title: "Gym Session - Cardio", time: "Today, 6:00 AM", status: "upcoming" },
  { id: "2", title: "Physio Appointment", time: "Tomorrow, 10:30 AM", status: "confirmed" },
  { id: "3", title: "Cricket Practice", time: "Dec 23, 4:00 PM", status: "upcoming" },
  { id: "4", title: "Doctor Appointment - Annual Checkup", time: "Dec 26, 11:00 AM", status: "confirmed" },
];

const recentNotices = [
  { id: "1", title: "Annual Sports Day 2026", content: "Registration open for all events. Submit entries by Jan 5.", priority: "high" },
  { id: "2", title: "Holiday Schedule", content: "Modified timings during Dec 24 - Jan 2. Check with departments.", priority: "medium" },
  { id: "3", title: "New Canteen Menu", content: "Healthy options added. Effective from January 1, 2026.", priority: "low" },
];

export default function MemberPortal() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.name?.split(" ")[0] || "Member"}!`}
        description="Your personal dashboard — access all services from here."
      />

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={action.href}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <CardContent className="pt-6">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${action.gradient} text-white mb-3 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Upcoming Schedule
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                  <Badge variant={event.status === "confirmed" ? "success" : "info"} className="shrink-0 text-[10px]">
                    {event.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              Recent Notices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium">{notice.title}</h4>
                    <Badge
                      variant={notice.priority === "high" ? "warning" : notice.priority === "medium" ? "info" : "secondary"}
                      className="text-[10px]"
                    >
                      {notice.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{notice.content}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
