"use client";

import { Users, IndianRupee, Building2, TrendingUp, Star } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEPARTMENTS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { departmentStats } from "@/data/departments";

const revenueData = [
  { month: "Jan", revenue: 1850000, expenses: 1200000 },
  { month: "Feb", revenue: 1920000, expenses: 1250000 },
  { month: "Mar", revenue: 2100000, expenses: 1300000 },
  { month: "Apr", revenue: 1980000, expenses: 1280000 },
  { month: "May", revenue: 2200000, expenses: 1350000 },
  { month: "Jun", revenue: 2350000, expenses: 1400000 },
  { month: "Jul", revenue: 2150000, expenses: 1320000 },
  { month: "Aug", revenue: 2400000, expenses: 1380000 },
  { month: "Sep", revenue: 2550000, expenses: 1420000 },
  { month: "Oct", revenue: 2300000, expenses: 1360000 },
  { month: "Nov", revenue: 2450000, expenses: 1400000 },
  { month: "Dec", revenue: 2600000, expenses: 1450000 },
];

const departmentRevenue = departmentStats
  .filter((d) => d.revenue > 0)
  .sort((a, b) => b.revenue - a.revenue)
  .map((d) => {
    const dept = DEPARTMENTS.find((dep) => dep.slug === d.slug);
    return { name: dept?.name || d.slug, revenue: d.revenue, expenses: d.expenses };
  });

const recentActivities = [
  { id: "1", user: "Vikram Singh", action: "added new member", target: "Rohit Verma to Gym", time: "2025-12-20T10:30:00", type: "create" as const },
  { id: "2", user: "Dr. Priya Sharma", action: "updated patient record", target: "Patient #45", time: "2025-12-20T09:15:00", type: "update" as const },
  { id: "3", user: "Anita Desai", action: "approved budget for", target: "Q1 2026 Physio Dept", time: "2025-12-19T16:45:00", type: "info" as const },
  { id: "4", user: "Suresh Reddy", action: "scheduled tournament", target: "Inter-Dept Cricket 2026", time: "2025-12-19T14:20:00", type: "create" as const },
  { id: "5", user: "Meena Kumari", action: "resolved maintenance", target: "Room 204B AC Fix", time: "2025-12-19T11:00:00", type: "update" as const },
  { id: "6", user: "Arjun Patel", action: "completed inventory check", target: "Gym Equipment", time: "2025-12-18T15:30:00", type: "info" as const },
  { id: "7", user: "Kavita Iyer", action: "cancelled appointment", target: "Physio Session #89", time: "2025-12-18T13:00:00", type: "delete" as const },
  { id: "8", user: "Amit Shah", action: "booked conference room", target: "Main Hall - Jan 15", time: "2025-12-18T10:30:00", type: "create" as const },
];

export default function AdminDashboard() {
  const totalRevenue = departmentStats.reduce((sum, d) => sum + d.revenue, 0);
  const totalMembers = departmentStats.reduce((sum, d) => sum + d.memberCount, 0);
  const totalStaff = departmentStats.reduce((sum, d) => sum + d.staffCount, 0);
  const avgSatisfaction = departmentStats.reduce((sum, d) => sum + d.satisfaction, 0) / departmentStats.length;

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Welcome back! Here's an overview of all departments." />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={12.5}
          changeLabel="vs last month"
          icon={<IndianRupee className="h-6 w-6" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Total Members"
          value={totalMembers}
          change={8.2}
          changeLabel="vs last month"
          icon={<Users className="h-6 w-6" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Total Staff"
          value={totalStaff}
          change={2.1}
          changeLabel="vs last month"
          icon={<Building2 className="h-6 w-6" />}
          gradient="from-purple-500 to-violet-500"
        />
        <StatsCard
          title="Avg. Satisfaction"
          value={`${avgSatisfaction.toFixed(1)} / 5`}
          change={3.5}
          changeLabel="vs last month"
          icon={<Star className="h-6 w-6" />}
          gradient="from-amber-500 to-orange-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Revenue vs Expenses"
          description="Monthly trend for the current year"
          type="area"
          data={revenueData}
          dataKeys={["revenue", "expenses"]}
          xAxisKey="month"
          colors={["#10b981", "#f43f5e"]}
        />
        <ChartCard
          title="Revenue by Department"
          description="Top revenue-generating departments"
          type="bar"
          data={departmentRevenue}
          dataKeys={["revenue"]}
          xAxisKey="name"
          height={300}
        />
      </div>

      {/* Department Cards + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Departments Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEPARTMENTS.map((dept) => {
                  const stats = departmentStats.find((s) => s.slug === dept.slug);
                  return (
                    <div
                      key={dept.slug}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${dept.gradient} text-white`}>
                        <span className="text-xs font-bold">{dept.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{dept.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{dept.staffCount} staff</span>
                          {dept.memberCount > 0 && (
                            <>
                              <span>·</span>
                              <span>{dept.memberCount} members</span>
                            </>
                          )}
                        </div>
                      </div>
                      {stats && stats.satisfaction > 0 && (
                        <Badge variant={stats.satisfaction >= 4 ? "success" : stats.satisfaction >= 3.5 ? "warning" : "destructive"}>
                          {stats.satisfaction.toFixed(1)}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed activities={recentActivities} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
