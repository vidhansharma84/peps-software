"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { transactions, type Transaction } from "@/data/finance";

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.date)}</span>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <SortableHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium line-clamp-1">
          {row.original.description}
        </p>
        <p className="text-xs text-muted-foreground">{row.original.category}</p>
      </div>
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const isIncome = row.original.type === "income";
      return (
        <Badge variant={isIncome ? "success" : "destructive"}>
          <span className="flex items-center gap-1">
            {isIncome ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {isIncome ? "Income" : "Expense"}
          </span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const isIncome = row.original.type === "income";
      return (
        <span
          className={`text-sm font-semibold ${
            isIncome
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(row.original.amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground font-mono">
        {row.original.reference}
      </span>
    ),
  },
];

type DateRange = "all" | "week" | "month" | "quarter";
type TypeFilter = "all" | "income" | "expense";

export default function TransactionsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [department, setDepartment] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const departments = useMemo(
    () => [...new Set(transactions.map((t) => t.department))].sort(),
    []
  );

  const filteredData = useMemo(() => {
    let data = [...transactions];
    const now = new Date();

    // Date range filter
    if (dateRange !== "all") {
      const daysMap: Record<string, number> = {
        week: 7,
        month: 30,
        quarter: 90,
      };
      const cutoff = new Date(
        now.getTime() - daysMap[dateRange] * 24 * 60 * 60 * 1000
      );
      data = data.filter((t) => new Date(t.date) >= cutoff);
    }

    // Department filter
    if (department !== "all") {
      data = data.filter((t) => t.department === department);
    }

    // Type filter
    if (typeFilter !== "all") {
      data = data.filter((t) => t.type === typeFilter);
    }

    return data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [dateRange, department, typeFilter]);

  const summary = useMemo(() => {
    const income = filteredData
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = filteredData
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    return { income, expense, net: income - expense };
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Track all financial transactions across departments"
      />

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="rounded-lg border bg-emerald-50 dark:bg-emerald-950/20 p-4">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(summary.income)}
          </p>
        </div>
        <div className="rounded-lg border bg-red-50 dark:bg-red-950/20 p-4">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">
            {formatCurrency(summary.expense)}
          </p>
        </div>
        <div className="rounded-lg border bg-blue-50 dark:bg-blue-950/20 p-4">
          <p className="text-sm text-muted-foreground">Net Amount</p>
          <p
            className={`text-xl font-bold ${
              summary.net >= 0
                ? "text-blue-600 dark:text-blue-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {formatCurrency(summary.net)}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-3"
      >
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground mr-1">Period:</span>
          {(["all", "week", "month", "quarter"] as DateRange[]).map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange(range)}
              className="capitalize"
            >
              {range === "all" ? "All Time" : `This ${range}`}
            </Button>
          ))}
        </div>

        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground mr-1">Type:</span>
          {(["all", "income", "expense"] as TypeFilter[]).map((type) => (
            <Button
              key={type}
              variant={typeFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(type)}
              className="capitalize"
            >
              {type === "all" ? "All" : type}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        searchKey="description"
        searchPlaceholder="Search transactions..."
        showExport
      />
    </div>
  );
}
