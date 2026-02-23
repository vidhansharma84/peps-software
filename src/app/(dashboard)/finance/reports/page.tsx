"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileBarChart,
  TrendingUp,
  TrendingDown,
  Percent,
  IndianRupee,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { cn, formatCurrency } from "@/lib/utils";
import {
  transactions,
  monthlyPnL,
  revenueByDepartment,
  expenseCategoryBreakdown,
  budgets,
} from "@/data/finance";

export default function ReportsPage() {
  // Income Statement Data
  const incomeStatement = useMemo(() => {
    const totalRevenue = monthlyPnL.reduce((s, m) => s + m.income, 0);
    const totalExpenses = monthlyPnL.reduce((s, m) => s + m.expenses, 0);
    const grossProfit = totalRevenue - totalExpenses;
    const profitMargin = ((grossProfit / totalRevenue) * 100).toFixed(1);
    const expenseRatio = ((totalExpenses / totalRevenue) * 100).toFixed(1);

    return { totalRevenue, totalExpenses, grossProfit, profitMargin, expenseRatio };
  }, []);

  // Department-wise P&L
  const departmentPnL = useMemo(() => {
    const deptMap = new Map<string, { income: number; expense: number }>();
    transactions.forEach((t) => {
      const curr = deptMap.get(t.department) || { income: 0, expense: 0 };
      if (t.type === "income" && t.status === "completed") {
        curr.income += t.amount;
      } else if (t.type === "expense" && t.status === "completed") {
        curr.expense += t.amount;
      }
      deptMap.set(t.department, curr);
    });

    return Array.from(deptMap.entries())
      .map(([dept, data]) => ({
        department: dept,
        income: data.income,
        expense: data.expense,
        profit: data.income - data.expense,
        margin:
          data.income > 0
            ? ((data.income - data.expense) / data.income) * 100
            : 0,
      }))
      .sort((a, b) => b.profit - a.profit);
  }, []);

  // Revenue trend (monthly)
  const revenueTrend = useMemo(
    () =>
      monthlyPnL.map((m) => ({
        month: m.month,
        revenue: m.income,
      })),
    []
  );

  // Expense trend (monthly)
  const expenseTrend = useMemo(
    () =>
      monthlyPnL.map((m) => ({
        month: m.month,
        expenses: m.expenses,
      })),
    []
  );

  // Profit trend
  const profitTrend = useMemo(
    () =>
      monthlyPnL.map((m) => ({
        month: m.month,
        profit: m.profit,
      })),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Reports"
        description="Comprehensive financial analysis and reporting"
      />

      {/* Key Financial Ratios */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue (FY)"
          value={formatCurrency(incomeStatement.totalRevenue)}
          change={14.3}
          changeLabel="year over year"
          icon={<IndianRupee className="h-5 w-5" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Net Profit (FY)"
          value={formatCurrency(incomeStatement.grossProfit)}
          change={22.1}
          changeLabel="year over year"
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatsCard
          title="Profit Margin"
          value={`${incomeStatement.profitMargin}%`}
          icon={<Percent className="h-5 w-5" />}
          gradient="from-violet-500 to-purple-600"
        />
        <StatsCard
          title="Expense Ratio"
          value={`${incomeStatement.expenseRatio}%`}
          icon={<TrendingDown className="h-5 w-5" />}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="income-statement" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
          <TabsTrigger value="department-pnl">Department P&L</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="expense-analysis">Expense Analysis</TabsTrigger>
        </TabsList>

        {/* Tab 1: Income Statement */}
        <TabsContent value="income-statement">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileBarChart className="h-5 w-5" />
                  Income Statement Summary - FY 2025-26
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Revenue Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Revenue
                    </h3>
                    <div className="space-y-2">
                      {revenueByDepartment
                        .sort((a, b) => b.revenue - a.revenue)
                        .map((dept) => (
                          <div
                            key={dept.department}
                            className="flex items-center justify-between py-1.5 px-3 rounded hover:bg-muted/50"
                          >
                            <span className="text-sm">{dept.department}</span>
                            <span className="text-sm font-medium">
                              {formatCurrency(dept.revenue)}
                            </span>
                          </div>
                        ))}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 dark:bg-emerald-950/20 rounded">
                      <span className="font-semibold">Total Revenue</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(incomeStatement.totalRevenue)}
                      </span>
                    </div>
                  </div>

                  {/* Expenses Section */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Expenses
                    </h3>
                    <div className="space-y-2">
                      {expenseCategoryBreakdown.slice(0, 10).map((cat) => (
                        <div
                          key={cat.name}
                          className="flex items-center justify-between py-1.5 px-3 rounded hover:bg-muted/50"
                        >
                          <span className="text-sm">{cat.name}</span>
                          <span className="text-sm font-medium">
                            {formatCurrency(cat.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center justify-between px-3 py-2 bg-red-50 dark:bg-red-950/20 rounded">
                      <span className="font-semibold">Total Expenses</span>
                      <span className="font-bold text-red-600 dark:text-red-400">
                        {formatCurrency(incomeStatement.totalExpenses)}
                      </span>
                    </div>
                  </div>

                  {/* Net Profit */}
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between px-3 py-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <span className="text-lg font-bold">Net Profit</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(incomeStatement.grossProfit)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Tab 2: Department P&L */}
        <TabsContent value="department-pnl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Profit & Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Income</TableHead>
                        <TableHead className="text-right">Expenses</TableHead>
                        <TableHead className="text-right">
                          Net Profit/Loss
                        </TableHead>
                        <TableHead className="text-right">Margin</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentPnL.map((dept) => (
                        <TableRow key={dept.department}>
                          <TableCell className="font-medium">
                            {dept.department}
                          </TableCell>
                          <TableCell className="text-right text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(dept.income)}
                          </TableCell>
                          <TableCell className="text-right text-red-600 dark:text-red-400">
                            {formatCurrency(dept.expense)}
                          </TableCell>
                          <TableCell
                            className={cn(
                              "text-right font-semibold",
                              dept.profit >= 0
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-600 dark:text-red-400"
                            )}
                          >
                            {dept.profit >= 0 ? "+" : ""}
                            {formatCurrency(dept.profit)}
                          </TableCell>
                          <TableCell className="text-right">
                            {dept.margin.toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={
                                dept.profit > 0
                                  ? "success"
                                  : dept.profit === 0
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {dept.profit > 0
                                ? "Profitable"
                                : dept.profit === 0
                                ? "Break Even"
                                : "Loss"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      {/* Totals Row */}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(
                            departmentPnL.reduce((s, d) => s + d.income, 0)
                          )}
                        </TableCell>
                        <TableCell className="text-right text-red-600 dark:text-red-400">
                          {formatCurrency(
                            departmentPnL.reduce((s, d) => s + d.expense, 0)
                          )}
                        </TableCell>
                        <TableCell className="text-right text-blue-600 dark:text-blue-400">
                          {formatCurrency(
                            departmentPnL.reduce((s, d) => s + d.profit, 0)
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {(
                            (departmentPnL.reduce((s, d) => s + d.profit, 0) /
                              departmentPnL.reduce(
                                (s, d) => s + d.income,
                                0
                              )) *
                            100
                          ).toFixed(1)}
                          %
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Tab 3: Trends */}
        <TabsContent value="trends">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            <ChartCard
              title="Revenue Trend"
              description="Monthly revenue over the past 12 months"
              type="line"
              data={revenueTrend}
              dataKeys={["revenue"]}
              xAxisKey="month"
              colors={["#10b981"]}
              height={300}
            />
            <ChartCard
              title="Expense Trend"
              description="Monthly expenses over the past 12 months"
              type="line"
              data={expenseTrend}
              dataKeys={["expenses"]}
              xAxisKey="month"
              colors={["#ef4444"]}
              height={300}
            />
            <ChartCard
              title="Profit Trend"
              description="Monthly net profit over the past 12 months"
              type="area"
              data={profitTrend}
              dataKeys={["profit"]}
              xAxisKey="month"
              colors={["#6366f1"]}
              height={300}
              className="lg:col-span-2"
            />
          </motion.div>
        </TabsContent>

        {/* Tab 4: Expense Analysis */}
        <TabsContent value="expense-analysis">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            <ChartCard
              title="Expense by Category"
              description="Distribution of expenses across categories"
              type="donut"
              data={expenseCategoryBreakdown.slice(0, 8)}
              valueKey="value"
              nameKey="name"
              height={350}
            />
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Expense Category Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenseCategoryBreakdown.map((cat, idx) => {
                    const totalExp = expenseCategoryBreakdown.reduce(
                      (s, c) => s + c.value,
                      0
                    );
                    const pct = ((cat.value / totalExp) * 100).toFixed(1);
                    return (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="space-y-1"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{cat.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              {pct}%
                            </span>
                            <span className="font-semibold w-24 text-right">
                              {formatCurrency(cat.value)}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary/60"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Budget Utilization Summary */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">
                  Budget Utilization Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Allocated</TableHead>
                        <TableHead className="text-right">Spent</TableHead>
                        <TableHead className="text-right">Remaining</TableHead>
                        <TableHead className="text-right">
                          Utilization
                        </TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {budgets.map((b) => {
                        const pct = Math.round(
                          (b.spent / b.allocated) * 100
                        );
                        return (
                          <TableRow key={b.id}>
                            <TableCell className="font-medium">
                              {b.department}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(b.allocated)}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(b.spent)}
                            </TableCell>
                            <TableCell
                              className={cn(
                                "text-right",
                                b.remaining < 0
                                  ? "text-red-600 dark:text-red-400"
                                  : ""
                              )}
                            >
                              {formatCurrency(b.remaining)}
                            </TableCell>
                            <TableCell
                              className={cn(
                                "text-right font-semibold",
                                pct > 90
                                  ? "text-red-600 dark:text-red-400"
                                  : pct > 70
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-emerald-600 dark:text-emerald-400"
                              )}
                            >
                              {pct}%
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant={
                                  b.status === "on_track"
                                    ? "success"
                                    : b.status === "warning"
                                    ? "warning"
                                    : "destructive"
                                }
                                className="capitalize"
                              >
                                {b.status.replace("_", " ")}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
