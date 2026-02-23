"use client";

import { motion } from "framer-motion";
import {
  Package,
  Mic,
  Monitor,
  Armchair,
  MoreHorizontal,
  IndianRupee,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { rentalEquipment, type RentalEquipment } from "@/data/conference";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const categoryConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"; icon: React.ReactNode }> = {
  audio: { label: "Audio", variant: "info", icon: <Mic className="h-3.5 w-3.5" /> },
  visual: { label: "Visual", variant: "default", icon: <Monitor className="h-3.5 w-3.5" /> },
  furniture: { label: "Furniture", variant: "warning", icon: <Armchair className="h-3.5 w-3.5" /> },
  other: { label: "Other", variant: "secondary", icon: <MoreHorizontal className="h-3.5 w-3.5" /> },
};

const conditionConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" }> = {
  good: { label: "Good", variant: "success" },
  fair: { label: "Fair", variant: "warning" },
  poor: { label: "Poor", variant: "destructive" },
};

const columns: ColumnDef<RentalEquipment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
          {categoryConfig[row.original.category]?.icon || <Package className="h-4 w-4" />}
        </div>
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const cat = categoryConfig[row.getValue("category") as string];
      return cat ? (
        <Badge variant={cat.variant} className="gap-1">
          {cat.icon}
          {cat.label}
        </Badge>
      ) : (
        <Badge variant="outline">{row.getValue("category")}</Badge>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("quantity")}</span>
    ),
  },
  {
    accessorKey: "available",
    header: ({ column }) => <SortableHeader column={column} title="Available" />,
    cell: ({ row }) => {
      const available = row.getValue("available") as number;
      const total = row.original.quantity;
      const percentage = Math.round((available / total) * 100);
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{available}</span>
          <span className="text-xs text-muted-foreground">({percentage}%)</span>
        </div>
      );
    },
  },
  {
    accessorKey: "ratePerDay",
    header: ({ column }) => <SortableHeader column={column} title="Rate/Day" />,
    cell: ({ row }) => (
      <span className="font-medium">{formatCurrency(row.getValue("ratePerDay"))}</span>
    ),
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const cond = conditionConfig[row.getValue("condition") as string];
      return cond ? (
        <Badge variant={cond.variant}>{cond.label}</Badge>
      ) : (
        <Badge variant="outline">{row.getValue("condition")}</Badge>
      );
    },
  },
];

export default function ConferenceEquipmentPage() {
  const totalItems = rentalEquipment.reduce((sum, eq) => sum + eq.quantity, 0);
  const totalAvailable = rentalEquipment.reduce((sum, eq) => sum + eq.available, 0);
  const totalInUse = totalItems - totalAvailable;
  const goodCondition = rentalEquipment.filter((eq) => eq.condition === "good").length;
  const avgDailyRevenue = rentalEquipment.reduce(
    (sum, eq) => sum + (eq.quantity - eq.available) * eq.ratePerDay,
    0
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Equipment"
        description="Manage conference rental equipment inventory and availability"
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
            title="Total Items"
            value={totalItems}
            icon={<Package className="h-5 w-5" />}
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Available"
            value={totalAvailable}
            change={3}
            changeLabel="returned today"
            icon={<CheckCircle className="h-5 w-5" />}
            gradient="from-emerald-500 to-green-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="In Use"
            value={totalInUse}
            icon={<AlertTriangle className="h-5 w-5" />}
            gradient="from-amber-500 to-orange-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Daily Rental Revenue"
            value={formatCurrency(avgDailyRevenue)}
            change={12}
            changeLabel="vs last week"
            icon={<IndianRupee className="h-5 w-5" />}
            gradient="from-purple-500 to-violet-500"
          />
        </motion.div>
      </motion.div>

      {/* Equipment Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <DataTable
          columns={columns}
          data={rentalEquipment}
          searchKey="name"
          searchPlaceholder="Search equipment..."
        />
      </motion.div>
    </div>
  );
}
