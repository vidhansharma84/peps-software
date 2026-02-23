"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  IndianRupee,
  TrendingUp,
  ArrowRight,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  conferenceRooms,
  conferenceEvents,
  conferenceBookings,
  getUpcomingEvents,
  getTotalRevenue,
  getMonthlyEventCount,
  getRoomUtilization,
} from "@/data/conference";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ConferenceDashboardPage() {
  const totalRooms = conferenceRooms.length;
  const monthlyEvents = getMonthlyEventCount();
  const totalRevenue = getTotalRevenue();
  const upcomingEvents = getUpcomingEvents();
  const roomUtilization = getRoomUtilization();

  const totalBookedHours = roomUtilization.reduce((s, r) => s + r.value, 0);
  const maxPossibleHours = totalRooms * 8 * 20; // 8 hrs/day, 20 working days
  const avgUtilization = Math.round((totalBookedHours / maxPossibleHours) * 100);

  const utilizationData = conferenceRooms.map((room) => {
    const roomBookings = conferenceBookings.filter(
      (b) => b.roomId === room.id && b.status !== "cancelled"
    );
    const hours = roomBookings.reduce((sum, b) => {
      const start = parseInt(b.startTime.split(":")[0]);
      const end = parseInt(b.endTime.split(":")[0]);
      return sum + (end - start);
    }, 0);
    return { name: room.name.split(" ")[0], value: hours };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conference Hall"
        description="Manage conference rooms, events, bookings, and equipment"
      >
        <Button asChild>
          <Link href="/conference/book">
            <CalendarDays className="h-4 w-4 mr-2" />
            Book a Room
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Total Rooms"
            value={totalRooms}
            change={0}
            changeLabel="no change"
            icon={<Building2 className="h-5 w-5" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Events This Month"
            value={monthlyEvents}
            change={12}
            changeLabel="vs last month"
            icon={<CalendarDays className="h-5 w-5" />}
            gradient="from-emerald-500 to-green-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Revenue"
            value={formatCurrency(totalRevenue)}
            change={8.5}
            changeLabel="vs last month"
            icon={<IndianRupee className="h-5 w-5" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Avg Utilization"
            value={`${avgUtilization}%`}
            change={5}
            changeLabel="vs last month"
            icon={<TrendingUp className="h-5 w-5" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Upcoming Events</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/conference/events">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.slice(0, 6).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <CalendarDays className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{event.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <MapPin className="h-3 w-3" />
                          <span>{event.roomName}</span>
                          <span className="text-muted-foreground/50">|</span>
                          <Clock className="h-3 w-3" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees} attendees</span>
                          <span className="text-muted-foreground/50">|</span>
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={event.status} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Room Utilization Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ChartCard
            title="Room Utilization"
            description="Hours booked per room"
            type="donut"
            data={utilizationData}
            height={280}
            colors={[
              "hsl(var(--chart-1))",
              "hsl(var(--chart-2))",
              "hsl(var(--chart-3))",
              "hsl(var(--chart-4))",
              "hsl(var(--chart-5))",
              "#8b5cf6",
            ]}
          />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "View Rooms", href: "/conference/rooms", icon: Building2, color: "from-blue-500 to-cyan-500" },
                { label: "Events", href: "/conference/events", icon: CalendarDays, color: "from-emerald-500 to-green-500" },
                { label: "Bookings", href: "/conference/bookings", icon: Clock, color: "from-amber-500 to-orange-500" },
                { label: "Equipment", href: "/conference/equipment", icon: TrendingUp, color: "from-purple-500 to-violet-500" },
              ].map((action) => (
                <Link key={action.href} href={action.href}>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border hover:bg-muted/50 transition-all hover:shadow-sm cursor-pointer">
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
