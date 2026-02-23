"use client";

import { motion } from "framer-motion";
import { Users, IndianRupee, TrendingUp, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DEPARTMENTS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { departmentStats } from "@/data/departments";

const satisfactionData = DEPARTMENTS.map((dept) => {
  const stats = departmentStats.find((s) => s.slug === dept.slug);
  return { name: dept.name.split(" ")[0], satisfaction: stats?.satisfaction || 0, occupancy: stats?.occupancy || 0 };
}).filter((d) => d.satisfaction > 0);

const growthData = DEPARTMENTS.map((dept) => {
  const stats = departmentStats.find((s) => s.slug === dept.slug);
  return { name: dept.name.split(" ")[0], growth: stats?.monthlyGrowth || 0 };
}).filter((d) => d.growth > 0);

export default function ManagementDashboard() {
  const totalRevenue = departmentStats.reduce((sum, d) => sum + d.revenue, 0);
  const totalMembers = departmentStats.reduce((sum, d) => sum + d.memberCount, 0);
  const totalStaff = departmentStats.reduce((sum, d) => sum + d.staffCount, 0);
  const avgSatisfaction = departmentStats.filter((d) => d.satisfaction > 0).reduce((sum, d) => sum + d.satisfaction, 0) / departmentStats.filter((d) => d.satisfaction > 0).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Management Dashboard" description="Cross-department overview and key performance indicators" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value={formatCurrency(totalRevenue)} change={10.5} changeLabel="vs last month" icon={<IndianRupee className="h-6 w-6" />} gradient="from-emerald-500 to-green-600" />
        <StatsCard title="Total Members" value={totalMembers} change={7.8} changeLabel="vs last month" icon={<Users className="h-6 w-6" />} gradient="from-blue-500 to-cyan-500" />
        <StatsCard title="Total Staff" value={totalStaff} change={1.5} changeLabel="vs last month" icon={<Users className="h-6 w-6" />} gradient="from-purple-500 to-violet-500" />
        <StatsCard title="Avg Satisfaction" value={`${avgSatisfaction.toFixed(1)}/5`} change={2.3} changeLabel="vs last month" icon={<Star className="h-6 w-6" />} gradient="from-amber-500 to-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Department Satisfaction" description="Customer satisfaction ratings by department" type="bar" data={satisfactionData} dataKeys={["satisfaction"]} xAxisKey="name" colors={["#8b5cf6"]} height={280} />
        <ChartCard title="Monthly Growth" description="Growth rate by department" type="bar" data={growthData} dataKeys={["growth"]} xAxisKey="name" colors={["#10b981"]} height={280} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Department Performance</CardTitle>
            <Link href="/management/reports">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View Reports <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {DEPARTMENTS.map((dept, index) => {
              const stats = departmentStats.find((s) => s.slug === dept.slug);
              if (!stats) return null;
              return (
                <motion.div
                  key={dept.slug}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${dept.gradient} text-white text-xs font-bold shrink-0`}>
                    {dept.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">{dept.name}</span>
                      <span className="text-xs text-muted-foreground">{stats.occupancy}%</span>
                    </div>
                    <Progress value={stats.occupancy} className="h-1.5" />
                  </div>
                  <div className="text-right shrink-0 w-24">
                    <p className="text-sm font-medium">{stats.revenue > 0 ? formatCurrency(stats.revenue) : "—"}</p>
                    {stats.monthlyGrowth > 0 && (
                      <p className="text-xs text-emerald-500 flex items-center justify-end gap-0.5">
                        <TrendingUp className="h-3 w-3" /> {stats.monthlyGrowth}%
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
