"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IndianRupee,
  Users,
  UserCheck,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Activity,
  Building2,
  Percent,
  CalendarDays,
  Clock,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { EmptyState } from "@/components/shared/empty-state";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { DEPARTMENTS } from "@/lib/constants";
import { departmentStats } from "@/data/departments";
import { formatCurrency, cn } from "@/lib/utils";

// --- Monthly revenue dummy data generator ---
function generateMonthlyData(baseRevenue: number) {
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  return months.map((month, i) => ({
    month,
    revenue: Math.round(baseRevenue / 12 + Math.sin(i * 0.7) * (baseRevenue / 40) + i * (baseRevenue / 120)),
    expenses: Math.round(
      (baseRevenue * 0.55) / 12 + Math.cos(i * 0.5) * (baseRevenue / 60) + i * (baseRevenue / 200)
    ),
  }));
}

// --- Recent activity dummy data ---
function generateRecentActivity(deptName: string) {
  return [
    {
      id: 1,
      action: `New membership registered at ${deptName}`,
      person: "Arjun Mehta",
      time: "2 hours ago",
      type: "member" as const,
    },
    {
      id: 2,
      action: `Staff schedule updated for ${deptName}`,
      person: "Priya Sharma",
      time: "4 hours ago",
      type: "staff" as const,
    },
    {
      id: 3,
      action: `Monthly report generated for ${deptName}`,
      person: "Rajesh Kumar",
      time: "6 hours ago",
      type: "report" as const,
    },
    {
      id: 4,
      action: `Equipment maintenance completed at ${deptName}`,
      person: "Anita Desai",
      time: "1 day ago",
      type: "maintenance" as const,
    },
    {
      id: 5,
      action: `Payment of ${formatCurrency(45000)} received`,
      person: "Vikram Singh",
      time: "1 day ago",
      type: "payment" as const,
    },
    {
      id: 6,
      action: `Feedback review submitted for ${deptName}`,
      person: "Neha Gupta",
      time: "2 days ago",
      type: "feedback" as const,
    },
  ];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DepartmentAnalyticsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const department = DEPARTMENTS.find((d) => d.slug === slug);
  const stats = departmentStats.find((d) => d.slug === slug);

  if (!department || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <EmptyState
          icon={<Building2 className="h-8 w-8 text-muted-foreground" />}
          title="Department Not Found"
          description={`No department found with slug "${slug}". Please check the URL and try again.`}
          action={
            <Link href="/admin/analytics">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Analytics
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const monthlyData = generateMonthlyData(stats.revenue > 0 ? stats.revenue : stats.expenses * 1.2);
  const recentActivity = generateRecentActivity(department.name);

  const profit = stats.revenue - stats.expenses;
  const profitMargin = stats.revenue > 0 ? ((profit / stats.revenue) * 100).toFixed(1) : "0.0";
  const expenseRatio = stats.revenue > 0 ? ((stats.expenses / stats.revenue) * 100).toFixed(1) : "100";
  const memberStaffRatio =
    stats.staffCount > 0 && stats.memberCount > 0
      ? (stats.memberCount / stats.staffCount).toFixed(1)
      : "--";

  // Performance indicators
  const performanceIndicators = [
    {
      label: "Revenue Target",
      value: 78,
      target: `${formatCurrency(stats.revenue * 1.2)} target`,
      color: "bg-emerald-500",
    },
    {
      label: "Member Retention",
      value: 85,
      target: "90% target",
      color: "bg-blue-500",
    },
    {
      label: "Staff Productivity",
      value: 72,
      target: "80% target",
      color: "bg-purple-500",
    },
    {
      label: "Customer Satisfaction",
      value: Math.round((stats.satisfaction / 5) * 100),
      target: "90% target",
      color: "bg-amber-500",
    },
    {
      label: "Facility Utilization",
      value: stats.occupancy,
      target: "85% target",
      color: "bg-teal-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title={`${department.name} Analytics`}
        description={`Detailed performance metrics and insights for ${department.name}.`}
      >
        <Link href="/admin/analytics">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Analytics
          </Button>
        </Link>
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
            title="Revenue"
            value={stats.revenue > 0 ? formatCurrency(stats.revenue) : "--"}
            change={stats.monthlyGrowth}
            changeLabel="monthly growth"
            icon={<IndianRupee className="h-5 w-5" />}
            gradient={department.gradient}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Members"
            value={stats.memberCount > 0 ? stats.memberCount.toLocaleString() : "--"}
            change={stats.memberCount > 0 ? 2.8 : undefined}
            changeLabel="vs last month"
            icon={<Users className="h-5 w-5" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Staff"
            value={stats.staffCount.toString()}
            change={0}
            changeLabel="no change"
            icon={<UserCheck className="h-5 w-5" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Satisfaction"
            value={`${stats.satisfaction.toFixed(1)} / 5`}
            change={0.2}
            changeLabel="vs last month"
            icon={<Star className="h-5 w-5" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
      </motion.div>

      {/* Revenue Trend Chart */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <motion.div variants={item} className="lg:col-span-2">
          <ChartCard
            title="Monthly Revenue Trend"
            description="Revenue and expenses over the past 12 months"
            type="area"
            data={monthlyData}
            dataKeys={["revenue", "expenses"]}
            xAxisKey="month"
            colors={["#10b981", "#ef4444"]}
            height={320}
          />
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={item} className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-semibold">Key Metrics</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Growth Rate
                  </div>
                  <Badge variant={stats.monthlyGrowth > 0 ? "success" : "secondary"}>
                    {stats.monthlyGrowth > 0 ? "+" : ""}
                    {stats.monthlyGrowth}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Percent className="h-4 w-4" />
                    Occupancy
                  </div>
                  <Badge
                    variant={
                      stats.occupancy >= 80
                        ? "success"
                        : stats.occupancy >= 50
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {stats.occupancy}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="h-4 w-4" />
                    Expense Ratio
                  </div>
                  <Badge
                    variant={
                      parseFloat(expenseRatio) <= 60
                        ? "success"
                        : parseFloat(expenseRatio) <= 80
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {expenseRatio}%
                  </Badge>
                </div>

                {stats.revenue > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <IndianRupee className="h-4 w-4" />
                      Profit Margin
                    </div>
                    <Badge
                      variant={
                        parseFloat(profitMargin) >= 30
                          ? "success"
                          : parseFloat(profitMargin) >= 15
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {profitMargin}%
                    </Badge>
                  </div>
                )}

                {memberStaffRatio !== "--" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Member:Staff
                    </div>
                    <span className="text-sm font-semibold">{memberStaffRatio}:1</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold mb-3">Financial Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-medium text-emerald-600">
                    {stats.revenue > 0 ? formatCurrency(stats.revenue) : "--"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expenses</span>
                  <span className="font-medium text-red-500">
                    {formatCurrency(stats.expenses)}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-sm">
                  <span className="font-medium">Net Profit</span>
                  <span
                    className={cn(
                      "font-bold",
                      profit >= 0 ? "text-emerald-600" : "text-red-500"
                    )}
                  >
                    {formatCurrency(profit)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Performance Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Performance Indicators</CardTitle>
            <CardDescription>Key performance metrics vs targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {performanceIndicators.map((indicator) => (
              <div key={indicator.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{indicator.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{indicator.target}</span>
                    <Badge
                      variant={
                        indicator.value >= 80
                          ? "success"
                          : indicator.value >= 60
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {indicator.value}%
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={indicator.value} className="h-2.5" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Latest actions and events in {department.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center shrink-0",
                      activity.type === "member"
                        ? "bg-blue-100 text-blue-600"
                        : activity.type === "staff"
                        ? "bg-purple-100 text-purple-600"
                        : activity.type === "report"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "maintenance"
                        ? "bg-orange-100 text-orange-600"
                        : activity.type === "payment"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-amber-100 text-amber-600"
                    )}
                  >
                    {activity.type === "member" && <Users className="h-4 w-4" />}
                    {activity.type === "staff" && <CalendarDays className="h-4 w-4" />}
                    {activity.type === "report" && <Activity className="h-4 w-4" />}
                    {activity.type === "maintenance" && <Building2 className="h-4 w-4" />}
                    {activity.type === "payment" && <IndianRupee className="h-4 w-4" />}
                    {activity.type === "feedback" && <Star className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        {activity.person}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
