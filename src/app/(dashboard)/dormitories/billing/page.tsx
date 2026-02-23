"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  IndianRupee,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";

import {
  rooms,
  getTotalMonthlyRevenue,
  getBuildingPaymentData,
  recentPayments,
} from "@/data/dormitories";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Payment {
  id: string;
  residentName: string;
  roomNumber: string;
  amount: number;
  date: string;
  status: "paid" | "overdue";
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function BillingPage() {
  const totalRevenue = getTotalMonthlyRevenue();
  const occupiedRooms = rooms.filter((r) => r.status === "occupied").length;
  const totalPaid = recentPayments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalOverdue = recentPayments.filter((p) => p.status === "overdue").reduce((s, p) => s + p.amount, 0);
  const collectionRate = Math.round((totalPaid / (totalPaid + totalOverdue)) * 100);

  const buildingPaymentData = getBuildingPaymentData();

  const columns = useMemo<ColumnDef<Payment, unknown>[]>(
    () => [
      {
        accessorKey: "residentName",
        header: ({ column }) => <SortableHeader column={column} title="Resident" />,
        cell: ({ row }) => (
          <span className="font-medium text-sm">{row.original.residentName}</span>
        ),
      },
      {
        accessorKey: "roomNumber",
        header: "Room",
        cell: ({ row }) => (
          <span className="text-sm font-medium text-primary">{row.original.roomNumber}</span>
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }) => <SortableHeader column={column} title="Amount" />,
        cell: ({ row }) => (
          <span className="text-sm font-medium">{formatCurrency(row.original.amount)}</span>
        ),
      },
      {
        accessorKey: "date",
        header: ({ column }) => <SortableHeader column={column} title="Date" />,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{formatDate(row.original.date)}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Billing Overview" description="Monthly billing, payments, and revenue tracking">
        <Button>
          <IndianRupee className="h-4 w-4 mr-2" />
          Generate Invoice
        </Button>
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
            title="Monthly Revenue"
            value={formatCurrency(totalRevenue)}
            change={6.8}
            changeLabel="vs last month"
            icon={<IndianRupee className="h-6 w-6" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Collection Rate"
            value={`${collectionRate}%`}
            change={2.1}
            changeLabel="vs last month"
            icon={<TrendingUp className="h-6 w-6" />}
            gradient="from-emerald-500 to-green-600"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Paid Amount"
            value={formatCurrency(totalPaid)}
            icon={<CheckCircle2 className="h-6 w-6" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Overdue Amount"
            value={formatCurrency(totalOverdue)}
            change={-3.2}
            changeLabel="vs last month"
            icon={<AlertTriangle className="h-6 w-6" />}
            gradient="from-red-500 to-rose-500"
          />
        </motion.div>
      </motion.div>

      {/* Payment Status per Building Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ChartCard
          title="Payment Status by Building"
          description="Paid vs pending amounts per building block"
          type="bar"
          data={buildingPaymentData}
          dataKeys={["paid", "pending"]}
          xAxisKey="name"
          colors={["#10b981", "#f59e0b"]}
          height={300}
        />
      </motion.div>

      {/* Recent Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Payments</h2>
          <DataTable
            columns={columns}
            data={recentPayments}
            searchKey="residentName"
            searchPlaceholder="Search payments by resident..."
            pageSize={10}
          />
        </div>
      </motion.div>
    </div>
  );
}
