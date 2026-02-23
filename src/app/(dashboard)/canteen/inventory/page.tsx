"use client";

import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Package,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { canteenInventory, type CanteenInventory } from "@/data/canteen";

const columns: ColumnDef<CanteenInventory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-8 w-8 rounded-lg flex items-center justify-center",
            row.original.quantity <= row.original.minStock
              ? "bg-amber-100 dark:bg-amber-900/30"
              : "bg-emerald-100 dark:bg-emerald-900/30"
          )}
        >
          <Package
            className={cn(
              "h-4 w-4",
              row.original.quantity <= row.original.minStock
                ? "text-amber-600 dark:text-amber-400"
                : "text-emerald-600 dark:text-emerald-400"
            )}
          />
        </div>
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => <SortableHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,
    cell: ({ row }) => (
      <span
        className={cn(
          "font-semibold",
          row.original.quantity <= row.original.minStock
            ? "text-amber-600 dark:text-amber-400"
            : ""
        )}
      >
        {row.original.quantity} {row.original.unit}
      </span>
    ),
  },
  {
    accessorKey: "minStock",
    header: ({ column }) => <SortableHeader column={column} title="Min Stock" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.minStock} {row.original.unit}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const isLow = row.original.quantity <= row.original.minStock;
      return isLow ? (
        <Badge variant="warning" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Low Stock
        </Badge>
      ) : (
        <Badge variant="success" className="gap-1">
          <CheckCircle2 className="h-3 w-3" />
          In Stock
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastRestocked",
    header: ({ column }) => (
      <SortableHeader column={column} title="Last Restocked" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.lastRestocked)}
      </span>
    ),
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => <SortableHeader column={column} title="Supplier" />,
    cell: ({ row }) => (
      <span className="text-sm">{row.original.supplier}</span>
    ),
  },
];

export default function CanteenInventoryPage() {
  // Sort so low stock items appear first
  const sortedInventory = [...canteenInventory].sort((a, b) => {
    const aLow = a.quantity <= a.minStock ? 0 : 1;
    const bLow = b.quantity <= b.minStock ? 0 : 1;
    return aLow - bLow;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory Management"
        description="Track canteen stock levels and manage restocking"
      />

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-3 grid-cols-2 lg:grid-cols-4"
      >
        {[
          {
            label: "Total Items",
            value: canteenInventory.length,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-100 dark:bg-blue-900/30",
          },
          {
            label: "Low Stock",
            value: canteenInventory.filter((i) => i.quantity <= i.minStock).length,
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-100 dark:bg-amber-900/30",
          },
          {
            label: "Well Stocked",
            value: canteenInventory.filter((i) => i.quantity > i.minStock).length,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-100 dark:bg-emerald-900/30",
          },
          {
            label: "Categories",
            value: new Set(canteenInventory.map((i) => i.category)).size,
            color: "text-violet-600 dark:text-violet-400",
            bg: "bg-violet-100 dark:bg-violet-900/30",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-lg border p-4"
          >
            <div
              className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center",
                stat.bg
              )}
            >
              <Package className={cn("h-5 w-5", stat.color)} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          columns={columns}
          data={sortedInventory}
          searchKey="name"
          searchPlaceholder="Search inventory..."
        />
      </motion.div>
    </div>
  );
}
