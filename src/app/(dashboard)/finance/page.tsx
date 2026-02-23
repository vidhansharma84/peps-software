"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  transactions,
  invoices,
  monthlyPnL,
  revenueByDepartment,
  expenseCategoryBreakdown,
} from "@/data/finance";

export default function FinanceDashboardPage() {
  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalIncome - totalExpenses;
    const outstandingInvoices = invoices
      .filter((inv) => inv.status === "sent" || inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.total, 0);

    return { totalIncome, totalExpenses, netProfit, outstandingInvoices };
  }, []);

  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance Dashboard"
        description="Overview of financial performance, revenue, and expenses"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalIncome)}
          change={12.5}
          changeLabel="vs last quarter"
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Total Expenses"
          value={formatCurrency(stats.totalExpenses)}
          change={8.3}
          changeLabel="vs last quarter"
          icon={<TrendingDown className="h-5 w-5" />}
          gradient="from-red-500 to-rose-600"
        />
        <StatsCard
          title="Net Profit"
          value={formatCurrency(stats.netProfit)}
          change={18.2}
          changeLabel="vs last quarter"
          icon={<IndianRupee className="h-5 w-5" />}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatsCard
          title="Outstanding Invoices"
          value={formatCurrency(stats.outstandingInvoices)}
          change={-5.1}
          changeLabel="vs last month"
          icon={<FileText className="h-5 w-5" />}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Profit & Loss"
          description="Monthly income vs expenses (12 months)"
          type="area"
          data={monthlyPnL}
          dataKeys={["income", "expenses"]}
          xAxisKey="month"
          colors={["#10b981", "#ef4444"]}
          height={320}
        />
        <ChartCard
          title="Revenue by Department"
          description="Department-wise revenue contribution"
          type="bar"
          data={revenueByDepartment}
          dataKeys={["revenue"]}
          xAxisKey="department"
          colors={["#6366f1"]}
          height={320}
        />
      </div>

      {/* Expense Breakdown + Recent Transactions */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ChartCard
            title="Expense Breakdown"
            description="Category-wise expense distribution"
            type="donut"
            data={expenseCategoryBreakdown.slice(0, 8)}
            valueKey="value"
            nameKey="name"
            height={320}
          />
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.map((txn, index) => (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        txn.type === "income"
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {txn.type === "income" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">
                        {txn.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {txn.department} &middot; {formatDate(txn.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${
                        txn.type === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {txn.type === "income" ? "+" : "-"}
                      {formatCurrency(txn.amount)}
                    </p>
                    <Badge
                      variant={
                        txn.status === "completed"
                          ? "success"
                          : txn.status === "pending"
                          ? "warning"
                          : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {txn.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
