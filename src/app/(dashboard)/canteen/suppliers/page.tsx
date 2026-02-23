"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Plus,
  Star,
  Phone,
  Mail,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { FormSheet } from "@/components/shared/form-sheet";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { suppliers, type Supplier } from "@/data/canteen";

const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Truck className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.category}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-sm">
          <Phone className="h-3 w-3 text-muted-foreground" />
          {row.original.contact}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Mail className="h-3 w-3" />
          {row.original.email}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => <SortableHeader column={column} title="Category" />,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <SortableHeader column={column} title="Rating" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < Math.floor(row.original.rating)
                ? "fill-amber-400 text-amber-400"
                : i < row.original.rating
                  ? "fill-amber-400/50 text-amber-400"
                  : "text-muted-foreground/30"
            }`}
          />
        ))}
        <span className="text-sm font-medium ml-1">{row.original.rating}</span>
      </div>
    ),
  },
  {
    accessorKey: "lastDelivery",
    header: ({ column }) => (
      <SortableHeader column={column} title="Last Delivery" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.lastDelivery)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

export default function CanteenSuppliersPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Supplier added successfully!");
    setSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suppliers"
        description="Manage canteen suppliers and track deliveries"
      >
        <Button className="gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Supplier
        </Button>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DataTable
          columns={columns}
          data={suppliers}
          searchKey="name"
          searchPlaceholder="Search suppliers..."
        />
      </motion.div>

      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Add Supplier"
        description="Add a new supplier to the canteen network"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Supplier Name</Label>
            <Input id="name" placeholder="e.g., Fresh Farms Vegetables" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Number</Label>
            <Input id="contact" placeholder="e.g., +91 98765 00000" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g., supplier@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grains">Grains & Staples</SelectItem>
                <SelectItem value="vegetables">Vegetables & Fruits</SelectItem>
                <SelectItem value="dairy">Dairy Products</SelectItem>
                <SelectItem value="spices">Spices & Masalas</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="meat">Meat & Poultry</SelectItem>
                <SelectItem value="packaged">Packaged Foods</SelectItem>
                <SelectItem value="disposables">Disposables & Packaging</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Add Supplier
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setSheetOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormSheet>
    </div>
  );
}
