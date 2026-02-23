"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Clock,
  CalendarCheck,
  FileCheck,
  Download,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  complianceSummary,
  licenses,
  inspectionRecords,
  complianceTrend,
  categoryBreakdown,
} from "@/data/hefra";
import type { HeFRALicense } from "@/types/hefra";

function getStatusBadge(status: string) {
  const variants: Record<string, string> = {
    compliant: "success",
    active: "success",
    passed: "success",
    current: "success",
    non_compliant: "destructive",
    failed: "destructive",
    expired: "destructive",
    non_functional: "destructive",
    partially_compliant: "warning",
    pending_review: "info",
    scheduled: "info",
    pending: "warning",
    in_progress: "info",
    under_review: "info",
    draft: "secondary",
    suspended: "destructive",
  };
  return variants[status] || "secondary";
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getDaysRemaining(dateStr: string) {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

export default function ComplianceDashboardPage() {
  const recentInspections = useMemo(
    () =>
      [...inspectionRecords]
        .filter((i) => i.status !== "scheduled")
        .sort(
          (a, b) =>
            new Date(b.inspectionDate).getTime() -
            new Date(a.inspectionDate).getTime()
        )
        .slice(0, 5),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="HeFRA Compliance"
        description="Health Facilities Regulatory Agency (Act 829) compliance monitoring"
      >
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download Compliance Report
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Overall Score"
          value={`${complianceSummary.overallScore}%`}
          change={2.3}
          changeLabel="vs last month"
          icon={<Shield className="h-5 w-5" />}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatsCard
          title="Compliant Items"
          value={complianceSummary.compliant}
          change={5}
          changeLabel="vs last month"
          icon={<ShieldCheck className="h-5 w-5" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Critical Issues"
          value={complianceSummary.criticalIssues}
          change={-2}
          changeLabel="vs last month"
          icon={<ShieldX className="h-5 w-5" />}
          gradient="from-red-500 to-rose-600"
        />
        <StatsCard
          title="Upcoming Deadlines"
          value={complianceSummary.upcomingDeadlines}
          icon={<Clock className="h-5 w-5" />}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Compliance by Category</CardTitle>
              <CardDescription>
                Score breakdown across compliance categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="category"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="score"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="Score (%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Compliance Trend</CardTitle>
              <CardDescription>
                12-month compliance score trend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={complianceTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    domain={[60, 100]}
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    name="Overall"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="personnel"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.1}
                    name="Personnel"
                    strokeWidth={1.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="equipment"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.1}
                    name="Equipment"
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* License Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              License Status
            </CardTitle>
            <CardDescription>
              Current status of all facility licenses and permits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {licenses.map((license: HeFRALicense) => {
                const daysRemaining = getDaysRemaining(license.expiryDate);
                return (
                  <Card key={license.id} className="border">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">
                            {formatStatus(license.type)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {license.licenseNumber}
                          </p>
                        </div>
                        <Badge
                          variant={
                            getStatusBadge(license.status) as
                              | "success"
                              | "destructive"
                              | "warning"
                              | "info"
                              | "secondary"
                              | "default"
                              | "outline"
                          }
                        >
                          {formatStatus(license.status)}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex justify-between">
                          <span>Department:</span>
                          <span className="font-medium text-foreground">
                            {license.department}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expiry:</span>
                          <span className="font-medium text-foreground">
                            {new Date(license.expiryDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Days Remaining:</span>
                          <span
                            className={`font-medium ${
                              daysRemaining <= 0
                                ? "text-red-500"
                                : daysRemaining <= 90
                                ? "text-amber-500"
                                : "text-emerald-500"
                            }`}
                          >
                            {daysRemaining <= 0
                              ? `Expired ${Math.abs(daysRemaining)} days ago`
                              : `${daysRemaining} days`}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Inspections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              Recent Inspection Results
            </CardTitle>
            <CardDescription>
              Latest HeFRA inspection outcomes and scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        inspection.overallScore >= 80
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : inspection.overallScore >= 60
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {inspection.overallScore >= 80 ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {formatStatus(inspection.type)} Inspection -{" "}
                        {inspection.department}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          inspection.inspectionDate
                        ).toLocaleDateString()}{" "}
                        | {inspection.inspectorName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {inspection.overallScore}%
                      </p>
                      <Progress
                        value={inspection.overallScore}
                        className={`h-1.5 w-20 ${
                          inspection.overallScore >= 80
                            ? "[&>div]:bg-emerald-500"
                            : inspection.overallScore >= 60
                            ? "[&>div]:bg-amber-500"
                            : "[&>div]:bg-red-500"
                        }`}
                      />
                    </div>
                    <Badge
                      variant={
                        getStatusBadge(inspection.status) as
                          | "success"
                          | "destructive"
                          | "warning"
                          | "info"
                          | "secondary"
                          | "default"
                          | "outline"
                      }
                    >
                      {formatStatus(inspection.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
