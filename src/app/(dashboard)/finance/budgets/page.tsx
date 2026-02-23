"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { cn, formatCurrency } from "@/lib/utils";
import { budgets, type Budget } from "@/data/finance";

function getUtilization(budget: Budget) {
  return Math.round((budget.spent / budget.allocated) * 100);
}

function getStatusColor(pct: number) {
  if (pct > 90) return "text-red-600 dark:text-red-400";
  if (pct > 70) return "text-amber-600 dark:text-amber-400";
  return "text-emerald-600 dark:text-emerald-400";
}

function getProgressColor(pct: number) {
  if (pct > 90) return "bg-red-500";
  if (pct > 70) return "bg-amber-500";
  return "bg-emerald-500";
}

function getStatusBadge(status: Budget["status"]) {
  switch (status) {
    case "on_track":
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" /> On Track
        </Badge>
      );
    case "warning":
      return (
        <Badge variant="warning" className="gap-1">
          <AlertTriangle className="h-3 w-3" /> Warning
        </Badge>
      );
    case "over_budget":
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" /> Over Budget
        </Badge>
      );
  }
}

export default function BudgetsPage() {
  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const totalRemaining = budgets.reduce((s, b) => s + b.remaining, 0);
  const overallUtilization = Math.round((totalSpent / totalAllocated) * 100);

  const onTrack = budgets.filter((b) => b.status === "on_track").length;
  const warnings = budgets.filter((b) => b.status === "warning").length;
  const overBudget = budgets.filter((b) => b.status === "over_budget").length;

  const utilizationChart = useMemo(
    () =>
      budgets.map((b) => ({
        department: b.department,
        allocated: b.allocated,
        spent: b.spent,
      })),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget Management"
        description="Track department-wise budget allocation and spending for FY 2025-26"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Allocated"
          value={formatCurrency(totalAllocated)}
          icon={<Wallet className="h-5 w-5" />}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatsCard
          title="Total Spent"
          value={formatCurrency(totalSpent)}
          change={overallUtilization > 80 ? 5.2 : -3.1}
          changeLabel="utilization rate"
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-violet-500 to-purple-600"
        />
        <StatsCard
          title="Total Remaining"
          value={formatCurrency(totalRemaining)}
          icon={<Wallet className="h-5 w-5" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Overall Utilization"
          value={`${overallUtilization}%`}
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Overall Summary Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm">On Track ({onTrack})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-sm">Warning ({warnings})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm">Over Budget ({overBudget})</span>
              </div>
            </div>
            <div className="relative h-4 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all rounded-full",
                  getProgressColor(overallUtilization)
                )}
                style={{ width: `${Math.min(overallUtilization, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{formatCurrency(totalSpent)} spent</span>
              <span>{formatCurrency(totalAllocated)} allocated</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Budget Comparison Chart */}
      <ChartCard
        title="Budget vs Spending"
        description="Allocated vs spent per department"
        type="bar"
        data={utilizationChart}
        dataKeys={["allocated", "spent"]}
        xAxisKey="department"
        colors={["#6366f1", "#f59e0b"]}
        height={320}
      />

      {/* Department Budget Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets
          .sort((a, b) => getUtilization(b) - getUtilization(a))
          .map((budget, index) => {
            const pct = getUtilization(budget);
            return (
              <motion.div
                key={budget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {budget.department}
                      </CardTitle>
                      {getStatusBadge(budget.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Utilization
                        </span>
                        <span
                          className={cn("font-bold", getStatusColor(pct))}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div className="relative h-2.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all rounded-full",
                            getProgressColor(pct)
                          )}
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Allocated
                        </p>
                        <p className="text-sm font-semibold">
                          {formatCurrency(budget.allocated)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Spent</p>
                        <p className="text-sm font-semibold">
                          {formatCurrency(budget.spent)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Remaining
                        </p>
                        <p
                          className={cn(
                            "text-sm font-semibold",
                            budget.remaining < 0
                              ? "text-red-600 dark:text-red-400"
                              : ""
                          )}
                        >
                          {formatCurrency(budget.remaining)}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      {budget.period}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
