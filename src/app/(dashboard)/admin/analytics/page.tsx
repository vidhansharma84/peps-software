"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IndianRupee,
  Users,
  UserCheck,
  Star,
  TrendingUp,
  ArrowUpRight,
  Building2,
  BarChart3,
  Activity,
  Gauge,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { DEPARTMENTS } from "@/lib/constants";
import { departmentStats } from "@/data/departments";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

// --- Derived aggregate data ---
const totalRevenue = departmentStats.reduce((sum, d) => sum + d.revenue, 0);
const totalMembers = departmentStats.reduce((sum, d) => sum + d.memberCount, 0);
const totalStaff = departmentStats.reduce((sum, d) => sum + d.staffCount, 0);
const avgSatisfaction =
  departmentStats.reduce((sum, d) => sum + d.satisfaction, 0) / departmentStats.length;

// --- Monthly revenue/expenses (dummy 12-month data) ---
const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const monthlyOverview = months.map((month, i) => ({
  month,
  revenue: Math.round(750000 + Math.sin(i * 0.6) * 200000 + i * 40000),
  expenses: Math.round(480000 + Math.cos(i * 0.5) * 120000 + i * 20000),
}));

// --- Department comparison data ---
const deptComparisonData = DEPARTMENTS.map((dept) => {
  const stats = departmentStats.find((s) => s.slug === dept.slug);
  return {
    name: dept.name.length > 12 ? dept.name.slice(0, 10) + ".." : dept.name,
    fullName: dept.name,
    slug: dept.slug,
    revenue: stats?.revenue ?? 0,
    expenses: stats?.expenses ?? 0,
    satisfaction: stats?.satisfaction ?? 0,
    occupancy: stats?.occupancy ?? 0,
    members: stats?.memberCount ?? 0,
    staff: stats?.staffCount ?? 0,
    growth: stats?.monthlyGrowth ?? 0,
  };
}).sort((a, b) => b.revenue - a.revenue);

// --- Satisfaction data ---
const satisfactionData = DEPARTMENTS.map((dept) => {
  const stats = departmentStats.find((s) => s.slug === dept.slug);
  return {
    name: dept.name.length > 12 ? dept.name.slice(0, 10) + ".." : dept.name,
    satisfaction: stats?.satisfaction ?? 0,
  };
}).sort((a, b) => b.satisfaction - a.satisfaction);

// --- Revenue trend (monthly per quarter) ---
const revenueTrendData = months.map((month, i) => ({
  month,
  gym: Math.round(140000 + Math.sin(i * 0.7) * 30000 + i * 5000),
  medical: Math.round(190000 + Math.cos(i * 0.4) * 40000 + i * 6000),
  sports: Math.round(100000 + Math.sin(i * 0.5) * 25000 + i * 4000),
  canteen: Math.round(85000 + Math.cos(i * 0.6) * 15000 + i * 3000),
  physio: Math.round(75000 + Math.sin(i * 0.8) * 20000 + i * 2500),
}));

// --- Top 5 departments by revenue ---
const top5Departments = [...deptComparisonData].slice(0, 5);

// --- Utilization data ---
const utilizationData = DEPARTMENTS.map((dept) => {
  const stats = departmentStats.find((s) => s.slug === dept.slug);
  return {
    name: dept.name.length > 12 ? dept.name.slice(0, 10) + ".." : dept.name,
    fullName: dept.name,
    occupancy: stats?.occupancy ?? 0,
    capacity: 100,
  };
}).sort((a, b) => b.occupancy - a.occupancy);

// --- Stagger animation variants ---
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

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Analytics"
        description="Cross-department performance metrics and insights across all 10 departments."
      />

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            change={4.8}
            changeLabel="vs last month"
            icon={<IndianRupee className="h-5 w-5" />}
            gradient="from-emerald-500 to-green-600"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Total Members"
            value={formatNumber(totalMembers)}
            change={3.2}
            changeLabel="vs last month"
            icon={<Users className="h-5 w-5" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Total Staff"
            value={formatNumber(totalStaff)}
            change={1.5}
            changeLabel="vs last month"
            icon={<UserCheck className="h-5 w-5" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Avg Satisfaction"
            value={`${avgSatisfaction.toFixed(1)} / 5`}
            change={0.3}
            changeLabel="vs last month"
            icon={<Star className="h-5 w-5" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="gap-1.5">
            <IndianRupee className="h-3.5 w-3.5" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-1.5">
            <Activity className="h-3.5 w-3.5" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="utilization" className="gap-1.5">
            <Gauge className="h-3.5 w-3.5" />
            Utilization
          </TabsTrigger>
        </TabsList>

        {/* ===== OVERVIEW TAB ===== */}
        <TabsContent value="overview">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard
                title="Revenue vs Expenses"
                description="Monthly trend across all departments"
                type="area"
                data={monthlyOverview}
                dataKeys={["revenue", "expenses"]}
                xAxisKey="month"
                colors={["#10b981", "#ef4444"]}
                height={320}
              />
              <ChartCard
                title="Revenue by Department"
                description="Comparative revenue across departments"
                type="bar"
                data={deptComparisonData.filter((d) => d.revenue > 0)}
                dataKeys={["revenue"]}
                xAxisKey="name"
                colors={["#6366f1"]}
                height={320}
              />
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard
                title="Satisfaction Scores"
                description="Department-wise satisfaction ratings (out of 5)"
                type="bar"
                data={satisfactionData}
                dataKeys={["satisfaction"]}
                xAxisKey="name"
                colors={["#f59e0b"]}
                height={300}
              />
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Department Quick Links</CardTitle>
                  <CardDescription>Deep-dive into any department</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {DEPARTMENTS.map((dept) => {
                    const stats = departmentStats.find((s) => s.slug === dept.slug);
                    return (
                      <Link
                        key={dept.slug}
                        href={`/admin/analytics/department/${dept.slug}`}
                      >
                        <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br",
                                dept.gradient
                              )}
                            >
                              {dept.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{dept.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {stats && stats.revenue > 0
                                  ? formatCurrency(stats.revenue)
                                  : "Support dept."}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* ===== REVENUE TAB ===== */}
        <TabsContent value="revenue">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard
                title="Revenue by Department"
                description="Revenue-generating departments ranked"
                type="bar"
                data={deptComparisonData.filter((d) => d.revenue > 0)}
                dataKeys={["revenue", "expenses"]}
                xAxisKey="name"
                colors={["#10b981", "#ef4444"]}
                height={320}
              />
              <ChartCard
                title="Revenue Trend"
                description="Top 5 departments monthly revenue"
                type="line"
                data={revenueTrendData}
                dataKeys={["gym", "medical", "sports", "canteen", "physio"]}
                xAxisKey="month"
                colors={["#f97316", "#ef4444", "#22c55e", "#eab308", "#ec4899"]}
                height={320}
              />
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Top Departments by Revenue</CardTitle>
                  <CardDescription>Revenue, expenses, and profit margin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-muted-foreground">
                          <th className="pb-3 font-medium">#</th>
                          <th className="pb-3 font-medium">Department</th>
                          <th className="pb-3 font-medium text-right">Revenue</th>
                          <th className="pb-3 font-medium text-right">Expenses</th>
                          <th className="pb-3 font-medium text-right">Profit</th>
                          <th className="pb-3 font-medium text-right">Margin</th>
                          <th className="pb-3 font-medium text-right">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {top5Departments.map((dept, i) => {
                          const profit = dept.revenue - dept.expenses;
                          const margin =
                            dept.revenue > 0
                              ? ((profit / dept.revenue) * 100).toFixed(1)
                              : "0.0";
                          return (
                            <tr key={dept.slug} className="border-b last:border-0">
                              <td className="py-3 font-medium text-muted-foreground">
                                {i + 1}
                              </td>
                              <td className="py-3">
                                <Link
                                  href={`/admin/analytics/department/${dept.slug}`}
                                  className="font-medium hover:text-primary transition-colors"
                                >
                                  {dept.fullName}
                                </Link>
                              </td>
                              <td className="py-3 text-right font-medium">
                                {formatCurrency(dept.revenue)}
                              </td>
                              <td className="py-3 text-right text-muted-foreground">
                                {formatCurrency(dept.expenses)}
                              </td>
                              <td className="py-3 text-right">
                                <span
                                  className={
                                    profit >= 0 ? "text-emerald-600" : "text-red-500"
                                  }
                                >
                                  {formatCurrency(profit)}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                <Badge
                                  variant={
                                    parseFloat(margin) >= 30
                                      ? "success"
                                      : parseFloat(margin) >= 15
                                      ? "warning"
                                      : "destructive"
                                  }
                                >
                                  {margin}%
                                </Badge>
                              </td>
                              <td className="py-3 text-right">
                                <span className="flex items-center justify-end gap-1 text-emerald-600">
                                  <TrendingUp className="h-3 w-3" />
                                  +{dept.growth}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* ===== PERFORMANCE TAB ===== */}
        <TabsContent value="performance">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {/* Staff Efficiency */}
            <motion.div variants={item}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Staff Efficiency Metrics</CardTitle>
                  <CardDescription>Revenue per staff member and member-to-staff ratio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-muted-foreground">
                          <th className="pb-3 font-medium">Department</th>
                          <th className="pb-3 font-medium text-right">Staff</th>
                          <th className="pb-3 font-medium text-right">Members</th>
                          <th className="pb-3 font-medium text-right">Member:Staff</th>
                          <th className="pb-3 font-medium text-right">Revenue/Staff</th>
                          <th className="pb-3 font-medium text-right">Satisfaction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deptComparisonData.map((dept) => {
                          const ratio =
                            dept.staff > 0 && dept.members > 0
                              ? (dept.members / dept.staff).toFixed(1)
                              : "--";
                          const revenuePerStaff =
                            dept.staff > 0 && dept.revenue > 0
                              ? formatCurrency(Math.round(dept.revenue / dept.staff))
                              : "--";
                          return (
                            <tr key={dept.slug} className="border-b last:border-0">
                              <td className="py-3 font-medium">{dept.fullName}</td>
                              <td className="py-3 text-right">{dept.staff}</td>
                              <td className="py-3 text-right">
                                {dept.members > 0 ? dept.members.toLocaleString() : "--"}
                              </td>
                              <td className="py-3 text-right font-medium">{ratio}</td>
                              <td className="py-3 text-right font-medium">{revenuePerStaff}</td>
                              <td className="py-3 text-right">
                                <Badge
                                  variant={
                                    dept.satisfaction >= 4.0
                                      ? "success"
                                      : dept.satisfaction >= 3.5
                                      ? "warning"
                                      : "destructive"
                                  }
                                >
                                  {dept.satisfaction.toFixed(1)}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Member-to-Staff ratio chart */}
              <ChartCard
                title="Member-to-Staff Ratio"
                description="Departments with active members"
                type="bar"
                data={deptComparisonData
                  .filter((d) => d.members > 0)
                  .map((d) => ({
                    name: d.name,
                    ratio: d.staff > 0 ? parseFloat((d.members / d.staff).toFixed(1)) : 0,
                  }))}
                dataKeys={["ratio"]}
                xAxisKey="name"
                colors={["#8b5cf6"]}
                height={300}
              />

              {/* Satisfaction Comparison */}
              <ChartCard
                title="Satisfaction Scores"
                description="All departments rated out of 5"
                type="bar"
                data={satisfactionData}
                dataKeys={["satisfaction"]}
                xAxisKey="name"
                colors={["#14b8a6"]}
                height={300}
              />
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* ===== UTILIZATION TAB ===== */}
        <TabsContent value="utilization">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.div variants={item}>
              <ChartCard
                title="Facility Occupancy Rates"
                description="Current occupancy percentage per department"
                type="bar"
                data={utilizationData}
                dataKeys={["occupancy"]}
                xAxisKey="name"
                colors={["#6366f1"]}
                height={320}
              />
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Capacity Usage Details</CardTitle>
                  <CardDescription>Occupancy and capacity metrics for each department</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {utilizationData.map((dept) => (
                    <div key={dept.fullName} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{dept.fullName}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              dept.occupancy >= 80
                                ? "success"
                                : dept.occupancy >= 50
                                ? "warning"
                                : "secondary"
                            }
                          >
                            {dept.occupancy}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={dept.occupancy} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(() => {
                const highUtil = utilizationData.filter((d) => d.occupancy >= 80);
                const midUtil = utilizationData.filter(
                  (d) => d.occupancy >= 50 && d.occupancy < 80
                );
                const lowUtil = utilizationData.filter((d) => d.occupancy < 50);
                return (
                  <>
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-3 w-3 rounded-full bg-emerald-500" />
                          <p className="text-sm font-medium">High Utilization</p>
                        </div>
                        <p className="text-3xl font-bold mb-1">{highUtil.length}</p>
                        <p className="text-xs text-muted-foreground">
                          Departments at 80%+ capacity
                        </p>
                        <div className="mt-3 space-y-1">
                          {highUtil.map((d) => (
                            <p key={d.fullName} className="text-xs text-muted-foreground">
                              {d.fullName} ({d.occupancy}%)
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-3 w-3 rounded-full bg-amber-500" />
                          <p className="text-sm font-medium">Moderate Utilization</p>
                        </div>
                        <p className="text-3xl font-bold mb-1">{midUtil.length}</p>
                        <p className="text-xs text-muted-foreground">
                          Departments at 50-79% capacity
                        </p>
                        <div className="mt-3 space-y-1">
                          {midUtil.map((d) => (
                            <p key={d.fullName} className="text-xs text-muted-foreground">
                              {d.fullName} ({d.occupancy}%)
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-3 w-3 rounded-full bg-slate-400" />
                          <p className="text-sm font-medium">Low Utilization</p>
                        </div>
                        <p className="text-3xl font-bold mb-1">{lowUtil.length}</p>
                        <p className="text-xs text-muted-foreground">
                          Departments below 50% capacity
                        </p>
                        <div className="mt-3 space-y-1">
                          {lowUtil.map((d) => (
                            <p key={d.fullName} className="text-xs text-muted-foreground">
                              {d.fullName} ({d.occupancy}%)
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
