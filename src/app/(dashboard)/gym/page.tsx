"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  IndianRupee,
  Dumbbell,
  Calendar,
  Clock,
  ArrowRight,
  Plus,
  UserPlus,
  ClipboardList,
  Settings,
} from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  gymMembers,
  gymClasses,
  equipment,
  attendanceRecords,
  weeklyAttendance,
  getMonthlyRevenue,
} from "@/data/gym";
import { formatCurrency } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function GymDashboardPage() {
  const activeMembers = gymMembers.filter((m) => m.status === "active").length;
  const todayAttendance = attendanceRecords.filter((r) => r.date === "2026-02-23").length;
  const monthlyRevenue = getMonthlyRevenue();
  const operationalEquipment = equipment.filter((e) => e.status === "operational").length;
  const totalEquipment = equipment.length;

  const todayClasses = gymClasses.filter((c) =>
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] === c.schedule.day
  );

  const quickActions = [
    { label: "Add Member", icon: UserPlus, href: "/gym/members", color: "from-blue-500 to-cyan-500" },
    { label: "Mark Attendance", icon: ClipboardList, href: "/gym/attendance", color: "from-emerald-500 to-green-500" },
    { label: "View Plans", icon: IndianRupee, href: "/gym/plans", color: "from-amber-500 to-orange-500" },
    { label: "Equipment", icon: Settings, href: "/gym/equipment", color: "from-purple-500 to-violet-500" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Gym Dashboard" description="Overview of gym operations, members, and equipment">
        <Button asChild>
          <Link href="/gym/members">
            <Users className="h-4 w-4 mr-2" />
            View Members
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
            title="Active Members"
            value={activeMembers}
            change={8.5}
            changeLabel="vs last month"
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Today's Attendance"
            value={todayAttendance}
            change={12.3}
            changeLabel="vs yesterday"
            icon={<UserCheck className="h-6 w-6" />}
            gradient="from-emerald-500 to-green-600"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Revenue This Month"
            value={formatCurrency(monthlyRevenue)}
            change={5.2}
            changeLabel="vs last month"
            icon={<IndianRupee className="h-6 w-6" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Equipment Status"
            value={`${operationalEquipment}/${totalEquipment}`}
            icon={<Dumbbell className="h-6 w-6" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
      </motion.div>

      {/* Chart + Today's Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <ChartCard
            title="Weekly Attendance"
            description="Member check-ins over the past 7 days"
            type="bar"
            data={weeklyAttendance}
            dataKeys={["visitors"]}
            xAxisKey="day"
            colors={["hsl(var(--chart-1))"]}
            height={280}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Today&apos;s Classes</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/gym/classes">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayClasses.length > 0 ? (
                todayClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{cls.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {cls.schedule.startTime} - {cls.schedule.endTime}
                      </div>
                      <p className="text-xs text-muted-foreground">{cls.instructor}</p>
                    </div>
                    <Badge variant={cls.enrolled >= cls.capacity ? "destructive" : "secondary"}>
                      {cls.enrolled}/{cls.capacity}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No classes scheduled today
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div
                      className={`h-10 w-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                    >
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
