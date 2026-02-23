"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Users, IndianRupee, Building2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { ChartCard } from "@/components/shared/chart-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/utils";
import { payrollRecords, type PayrollRecord } from "@/data/finance";

const columns: ColumnDef<PayrollRecord>[] = [
  {
    accessorKey: "employeeName",
    header: ({ column }) => <SortableHeader column={column} title="Employee" />,
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.employeeName}</span>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <SortableHeader column={column} title="Department" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.department}</Badge>
    ),
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <SortableHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.original.designation}</span>
    ),
  },
  {
    accessorKey: "baseSalary",
    header: ({ column }) => (
      <SortableHeader column={column} title="Base Salary" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{formatCurrency(row.original.baseSalary)}</span>
    ),
  },
  {
    accessorKey: "allowances",
    header: ({ column }) => (
      <SortableHeader column={column} title="Allowances" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-emerald-600 dark:text-emerald-400">
        +{formatCurrency(row.original.allowances)}
      </span>
    ),
  },
  {
    accessorKey: "deductions",
    header: ({ column }) => (
      <SortableHeader column={column} title="Deductions" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-red-600 dark:text-red-400">
        -{formatCurrency(row.original.deductions)}
      </span>
    ),
  },
  {
    accessorKey: "netSalary",
    header: ({ column }) => (
      <SortableHeader column={column} title="Net Salary" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-bold">
        {formatCurrency(row.original.netSalary)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === "paid"
          ? "success"
          : status === "processing"
          ? "info"
          : "warning";
      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
];

export default function PayrollPage() {
  const deptSummary = useMemo(() => {
    const map = new Map<
      string,
      { count: number; totalPayroll: number; paid: number; pending: number }
    >();
    payrollRecords.forEach((r) => {
      const curr = map.get(r.department) || {
        count: 0,
        totalPayroll: 0,
        paid: 0,
        pending: 0,
      };
      curr.count++;
      curr.totalPayroll += r.netSalary;
      if (r.status === "paid") curr.paid++;
      else curr.pending++;
      map.set(r.department, curr);
    });
    return Array.from(map.entries())
      .map(([dept, data]) => ({ department: dept, ...data }))
      .sort((a, b) => b.totalPayroll - a.totalPayroll);
  }, []);

  const monthlyPayrollChart = useMemo(() => {
    return deptSummary.map((d) => ({
      department: d.department,
      payroll: d.totalPayroll,
    }));
  }, [deptSummary]);

  const totalPayroll = payrollRecords.reduce((s, r) => s + r.netSalary, 0);
  const totalPaid = payrollRecords
    .filter((r) => r.status === "paid")
    .reduce((s, r) => s + r.netSalary, 0);
  const totalPending = payrollRecords
    .filter((r) => r.status !== "paid")
    .reduce((s, r) => s + r.netSalary, 0);
  const employeeCount = payrollRecords.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll"
        description="Manage monthly payroll for all staff and coaching personnel"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Payroll"
          value={formatCurrency(totalPayroll)}
          change={3.2}
          changeLabel="vs last month"
          icon={<IndianRupee className="h-5 w-5" />}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatsCard
          title="Paid"
          value={formatCurrency(totalPaid)}
          icon={<IndianRupee className="h-5 w-5" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Pending / Processing"
          value={formatCurrency(totalPending)}
          icon={<Clock className="h-5 w-5" />}
          gradient="from-amber-500 to-orange-600"
        />
        <StatsCard
          title="Total Employees"
          value={employeeCount}
          icon={<Users className="h-5 w-5" />}
          gradient="from-violet-500 to-purple-600"
        />
      </div>

      {/* Department Summary Cards + Chart */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Department-wise Payroll Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {deptSummary.map((dept, index) => (
                  <motion.div
                    key={dept.department}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {dept.department}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {dept.count} staff
                      </Badge>
                    </div>
                    <p className="text-lg font-bold">
                      {formatCurrency(dept.totalPayroll)}
                    </p>
                    <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {dept.paid} paid
                      </span>
                      <span className="text-amber-600 dark:text-amber-400">
                        {dept.pending} pending
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <ChartCard
            title="Payroll by Department"
            description="Monthly payroll distribution"
            type="bar"
            data={monthlyPayrollChart}
            dataKeys={["payroll"]}
            xAxisKey="department"
            colors={["#8b5cf6"]}
            height={380}
          />
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={payrollRecords}
        searchKey="employeeName"
        searchPlaceholder="Search employees..."
        showExport
      />
    </div>
  );
}
