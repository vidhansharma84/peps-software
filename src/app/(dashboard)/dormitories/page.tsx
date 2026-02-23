"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Wrench,
  IndianRupee,
  ArrowRight,
  DoorOpen,
  UserPlus,
  ClipboardList,
  Eye,
} from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  rooms,
  maintenanceRequests,
  getOccupancyData,
  getMaintenanceStatusData,
  getTotalMonthlyRevenue,
  recentActivities,
} from "@/data/dormitories";
import { formatCurrency } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DormitoriesDashboardPage() {
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === "occupied").length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
  const pendingMaintenance = maintenanceRequests.filter(
    (m) => m.status === "open" || m.status === "in_progress"
  ).length;
  const monthlyRevenue = getTotalMonthlyRevenue();

  const occupancyData = getOccupancyData();
  const maintenanceStatusData = getMaintenanceStatusData();

  const quickActions = [
    { label: "View Rooms", icon: DoorOpen, href: "/dormitories/rooms", color: "from-blue-500 to-cyan-500" },
    { label: "Residents", icon: UserPlus, href: "/dormitories/residents", color: "from-emerald-500 to-green-500" },
    { label: "Maintenance", icon: ClipboardList, href: "/dormitories/maintenance", color: "from-amber-500 to-orange-500" },
    { label: "Visitors", icon: Eye, href: "/dormitories/visitors", color: "from-purple-500 to-violet-500" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Dormitories Dashboard" description="Overview of dormitory operations, occupancy, and maintenance">
        <Button asChild>
          <Link href="/dormitories/rooms">
            <Building2 className="h-4 w-4 mr-2" />
            View Rooms
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
            change={5.0}
            changeLabel="vs last semester"
            icon={<Building2 className="h-6 w-6" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Occupancy Rate"
            value={`${occupancyRate}%`}
            change={3.2}
            changeLabel="vs last month"
            icon={<Users className="h-6 w-6" />}
            gradient="from-emerald-500 to-green-600"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Pending Maintenance"
            value={pendingMaintenance}
            change={-8.5}
            changeLabel="vs last week"
            icon={<Wrench className="h-6 w-6" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Monthly Revenue"
            value={formatCurrency(monthlyRevenue)}
            change={6.8}
            changeLabel="vs last month"
            icon={<IndianRupee className="h-6 w-6" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ChartCard
            title="Room Occupancy"
            description="Current room status distribution"
            type="donut"
            data={occupancyData}
            colors={["#10b981", "#3b82f6", "#ef4444", "#f59e0b"]}
            height={280}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ChartCard
            title="Maintenance Status"
            description="Current maintenance request breakdown"
            type="bar"
            data={maintenanceStatusData}
            dataKeys={["count"]}
            xAxisKey="name"
            colors={["hsl(var(--chart-2))"]}
            height={280}
          />
        </motion.div>
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dormitories/maintenance">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ActivityFeed activities={recentActivities} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
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
    </div>
  );
}
