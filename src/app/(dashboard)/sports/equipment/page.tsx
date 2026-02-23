"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  AlertTriangle,
  CheckCircle2,
  MinusCircle,
  Search,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { sportsEquipment } from "@/data/sports";
import type { SportsEquipmentItem } from "@/data/sports";

const conditionConfig: Record<
  SportsEquipmentItem["condition"],
  { label: string; icon: React.ReactNode; className: string }
> = {
  good: {
    label: "Good",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300",
  },
  fair: {
    label: "Fair",
    icon: <MinusCircle className="h-3.5 w-3.5" />,
    className: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300",
  },
  poor: {
    label: "Poor",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    className: "text-red-600 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800 dark:text-red-300",
  },
};

const columns: ColumnDef<SportsEquipmentItem, unknown>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Equipment" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Package className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.category}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => <SortableHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <SortableHeader column={column} title="Total Qty" />,
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.quantity}</span>,
  },
  {
    accessorKey: "available",
    header: ({ column }) => <SortableHeader column={column} title="Available" />,
    cell: ({ row }) => {
      const pct = (row.original.available / row.original.quantity) * 100;
      return (
        <div className="space-y-1 min-w-[100px]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">{row.original.available}</span>
            <span className="text-muted-foreground">{Math.round(pct)}%</span>
          </div>
          <Progress value={pct} className="h-1.5" />
        </div>
      );
    },
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const config = conditionConfig[row.original.condition];
      return (
        <Badge variant="outline" className={`gap-1 ${config.className}`}>
          {config.icon}
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastInspection",
    header: ({ column }) => <SortableHeader column={column} title="Last Inspection" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.lastInspection)}
      </span>
    ),
  },
];

export default function EquipmentPage() {
  const totalItems = sportsEquipment.reduce((sum, e) => sum + e.quantity, 0);
  const totalAvailable = sportsEquipment.reduce((sum, e) => sum + e.available, 0);
  const poorCondition = sportsEquipment.filter((e) => e.condition === "poor").length;
  const categories = new Set(sportsEquipment.map((e) => e.category)).size;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sports Equipment"
        description="Track inventory, availability, and condition of all sports equipment"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Items"
          value={totalItems}
          icon={<Package className="h-6 w-6" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Available"
          value={totalAvailable}
          change={-2.1}
          changeLabel="vs last week"
          icon={<CheckCircle2 className="h-6 w-6" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Categories"
          value={categories}
          icon={<Package className="h-6 w-6" />}
          gradient="from-purple-500 to-violet-500"
        />
        <StatsCard
          title="Poor Condition"
          value={poorCondition}
          icon={<AlertTriangle className="h-6 w-6" />}
          gradient="from-red-500 to-rose-500"
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={sportsEquipment}
            searchKey="name"
            searchPlaceholder="Search equipment..."
            showExport
          />
        </CardContent>
      </Card>
    </div>
  );
}
