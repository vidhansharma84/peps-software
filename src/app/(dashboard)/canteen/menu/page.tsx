"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Plus,
  Leaf,
  Drumstick,
  Star,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { FormSheet } from "@/components/shared/form-sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { menuItems, type MenuItem } from "@/data/canteen";

const columns: ColumnDef<MenuItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.name}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {row.original.description}
        </p>
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
    accessorKey: "price",
    header: ({ column }) => <SortableHeader column={column} title="Price" />,
    cell: ({ row }) => (
      <span className="font-semibold">{formatCurrency(row.original.price)}</span>
    ),
  },
  {
    accessorKey: "isVeg",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant={row.original.isVeg ? "success" : "destructive"} className="gap-1">
        {row.original.isVeg ? (
          <>
            <Leaf className="h-3 w-3" />
            Veg
          </>
        ) : (
          <>
            <Drumstick className="h-3 w-3" />
            Non-Veg
          </>
        )}
      </Badge>
    ),
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
    cell: ({ row }) => (
      <Switch
        checked={row.original.isAvailable}
        onCheckedChange={() => {
          toast.info(
            `${row.original.name} marked as ${row.original.isAvailable ? "unavailable" : "available"}`
          );
        }}
      />
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <SortableHeader column={column} title="Rating" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        <span className="text-sm font-medium">{row.original.rating}</span>
      </div>
    ),
  },
  {
    accessorKey: "preparationTime",
    header: ({ column }) => <SortableHeader column={column} title="Prep Time" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        {row.original.preparationTime} min
      </div>
    ),
  },
];

export default function CanteenMenuPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Menu item added successfully!");
    setSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Menu Management"
        description="Manage canteen menu items, pricing, and availability"
      >
        <Button className="gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DataTable
          columns={columns}
          data={menuItems}
          searchKey="name"
          searchPlaceholder="Search menu items..."
        />
      </motion.div>

      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Add Menu Item"
        description="Add a new item to the canteen menu"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input id="name" placeholder="e.g., Masala Dosa" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the item"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (INR)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 60"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prepTime">Prep Time (min)</Label>
              <Input
                id="prepTime"
                type="number"
                placeholder="e.g., 10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="isVeg">Vegetarian</Label>
            <Switch id="isVeg" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="isAvailable">Available</Label>
            <Switch id="isAvailable" defaultChecked />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Add Item
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
