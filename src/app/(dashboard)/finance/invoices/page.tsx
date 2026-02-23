"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import {
  Plus,
  Eye,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { FormSheet } from "@/components/shared/form-sheet";
import { formatCurrency, formatDate } from "@/lib/utils";
import { invoices, type Invoice } from "@/data/finance";

const statusConfig: Record<
  Invoice["status"],
  { label: string; variant: "success" | "info" | "warning" | "destructive" | "secondary"; icon: React.ReactNode }
> = {
  draft: { label: "Draft", variant: "secondary", icon: <FileText className="h-3 w-3" /> },
  sent: { label: "Sent", variant: "info", icon: <Send className="h-3 w-3" /> },
  paid: { label: "Paid", variant: "success", icon: <CheckCircle className="h-3 w-3" /> },
  overdue: { label: "Overdue", variant: "destructive", icon: <AlertCircle className="h-3 w-3" /> },
  cancelled: { label: "Cancelled", variant: "destructive", icon: <XCircle className="h-3 w-3" /> },
};

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <SortableHeader column={column} title="Invoice #" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">
        {row.original.invoiceNumber}
      </span>
    ),
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => <SortableHeader column={column} title="Client" />,
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.clientName}</span>
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
    accessorKey: "total",
    header: ({ column }) => <SortableHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <span className="text-sm font-semibold">
        {formatCurrency(row.original.total)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const config = statusConfig[row.original.status];
      return (
        <Badge variant={config.variant} className="gap-1">
          {config.icon}
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "issuedDate",
    header: ({ column }) => (
      <SortableHeader column={column} title="Issued Date" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.issuedDate)}</span>
    ),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <SortableHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const isOverdue =
        row.original.status === "overdue" ||
        (row.original.status === "sent" &&
          new Date(row.original.dueDate) < new Date());
      return (
        <span
          className={`text-sm ${
            isOverdue ? "text-red-600 dark:text-red-400 font-medium" : ""
          }`}
        >
          {formatDate(row.original.dueDate)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={() =>
            router.push(`/finance/invoices/${row.original.id}`)
          }
        >
          <Eye className="h-4 w-4" />
          View
        </Button>
      );
    },
  },
];

export default function InvoicesPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    department: "",
    itemDescription: "",
    quantity: "",
    unitPrice: "",
  });

  const handleCreateInvoice = () => {
    if (!formData.clientName || !formData.department || !formData.itemDescription) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Invoice created successfully!");
    setSheetOpen(false);
    setFormData({
      clientName: "",
      department: "",
      itemDescription: "",
      quantity: "",
      unitPrice: "",
    });
  };

  const statusCounts = invoices.reduce(
    (acc, inv) => {
      acc[inv.status] = (acc[inv.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Manage and track all invoices"
      >
        <Button onClick={() => setSheetOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </PageHeader>

      {/* Status Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-3 grid-cols-2 md:grid-cols-5"
      >
        {(["draft", "sent", "paid", "overdue", "cancelled"] as Invoice["status"][]).map(
          (status) => {
            const config = statusConfig[status];
            return (
              <div
                key={status}
                className="rounded-lg border p-3 text-center"
              >
                <p className="text-xs text-muted-foreground">{config.label}</p>
                <p className="text-2xl font-bold mt-1">
                  {statusCounts[status] || 0}
                </p>
              </div>
            );
          }
        )}
      </motion.div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={[...invoices].sort(
          (a, b) =>
            new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
        )}
        searchKey="clientName"
        searchPlaceholder="Search by client name..."
        showExport
      />

      {/* Create Invoice Sheet */}
      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Create New Invoice"
        description="Fill in the details to create a new invoice"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name *</Label>
            <Input
              id="clientName"
              placeholder="Enter client name"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Select
              value={formData.department}
              onValueChange={(val) =>
                setFormData({ ...formData, department: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Cricket", "Football", "Hockey", "Badminton", "Swimming",
                  "Athletics", "Tennis", "Administration", "Medical", "Canteen",
                ].map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />
          <p className="text-sm font-medium">Line Item</p>

          <div className="space-y-2">
            <Label htmlFor="itemDescription">Description *</Label>
            <Input
              id="itemDescription"
              placeholder="Item description"
              value={formData.itemDescription}
              onChange={(e) =>
                setFormData({ ...formData, itemDescription: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitPrice">Unit Price (INR)</Label>
              <Input
                id="unitPrice"
                type="number"
                placeholder="0"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData({ ...formData, unitPrice: e.target.value })
                }
              />
            </div>
          </div>

          {formData.quantity && formData.unitPrice && (
            <div className="rounded-lg bg-muted p-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>
                  {formatCurrency(
                    Number(formData.quantity) * Number(formData.unitPrice)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Tax (18% GST)</span>
                <span>
                  {formatCurrency(
                    Number(formData.quantity) *
                      Number(formData.unitPrice) *
                      0.18
                  )}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-sm font-bold">
                <span>Total</span>
                <span>
                  {formatCurrency(
                    Number(formData.quantity) *
                      Number(formData.unitPrice) *
                      1.18
                  )}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setSheetOpen(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleCreateInvoice}>
              Create Invoice
            </Button>
          </div>
        </div>
      </FormSheet>
    </div>
  );
}
