"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  CalendarCheck,
  Trophy,
  Package,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { facilities, facilityBookings, leagues, sportsEquipment } from "@/data/sports";

const todayStr = new Date().toISOString().split("T")[0];
const bookingsToday = facilityBookings.filter((b) => b.date === todayStr);
const activeLeagues = leagues.filter((l) => l.status === "ongoing" || l.status === "upcoming");

const utilizationData = [
  { name: "Available", value: facilities.filter((f) => f.status === "available").length },
  { name: "Booked", value: facilities.filter((f) => f.status === "booked").length },
  { name: "Maintenance", value: facilities.filter((f) => f.status === "maintenance").length },
];

const upcomingBookings = facilityBookings
  .filter((b) => b.status !== "cancelled")
  .sort((a, b) => {
    const dateA = `${a.date}T${a.startTime}`;
    const dateB = `${b.date}T${b.startTime}`;
    return dateA.localeCompare(dateB);
  })
  .slice(0, 6);

export default function SportsDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sports & Facilities"
        description="Manage facilities, bookings, leagues, and equipment"
      >
        <Link href="/sports/bookings">
          <Button className="gap-2">
            <CalendarCheck className="h-4 w-4" />
            View Bookings
          </Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Facilities"
          value={facilities.length}
          change={12.5}
          changeLabel="vs last quarter"
          icon={<Landmark className="h-6 w-6" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Bookings Today"
          value={bookingsToday.length}
          change={8.3}
          changeLabel="vs yesterday"
          icon={<CalendarCheck className="h-6 w-6" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Active Leagues"
          value={activeLeagues.length}
          change={25}
          changeLabel="vs last season"
          icon={<Trophy className="h-6 w-6" />}
          gradient="from-amber-500 to-orange-500"
        />
        <StatsCard
          title="Equipment Items"
          value={sportsEquipment.reduce((sum, e) => sum + e.quantity, 0)}
          change={5.2}
          changeLabel="vs last month"
          icon={<Package className="h-6 w-6" />}
          gradient="from-purple-500 to-violet-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Facility Utilization"
          description="Current status of all sports facilities"
          type="donut"
          data={utilizationData}
          nameKey="name"
          valueKey="value"
          height={280}
          colors={["#10b981", "#3b82f6", "#f59e0b"]}
        />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Upcoming Bookings</CardTitle>
              <Link href="/sports/bookings">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CalendarCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium truncate">{booking.purpose}</span>
                      <StatusBadge status={booking.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {booking.facilityName.split(" ").slice(0, 2).join(" ")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {booking.startTime} - {booking.endTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {booking.participants}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {booking.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Facilities", href: "/sports/facilities", icon: Landmark, desc: "View & manage all sports facilities" },
          { title: "Leagues", href: "/sports/leagues", icon: Trophy, desc: "League standings & schedules" },
          { title: "Tournaments", href: "/sports/tournaments", icon: Trophy, desc: "Tournament brackets & results" },
          { title: "Equipment", href: "/sports/equipment", icon: Package, desc: "Inventory & availability tracking" },
        ].map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={item.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
