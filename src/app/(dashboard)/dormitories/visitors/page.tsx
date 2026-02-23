"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import { UserPlus, Users } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormSheet } from "@/components/shared/form-sheet";
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

import { visitorLogs, residents, type VisitorLog } from "@/data/dormitories";
import { formatDateTime } from "@/lib/utils";

export default function VisitorsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedResident, setSelectedResident] = useState("");

  const activeResidents = residents.filter((r) => r.status === "active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !purpose || !selectedResident) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success(`Visitor ${visitorName} checked in successfully`);
    setVisitorName("");
    setPurpose("");
    setSelectedResident("");
    setSheetOpen(false);
  };

  const columns = useMemo<ColumnDef<VisitorLog, unknown>[]>(
    () => [
      {
        accessorKey: "visitorName",
        header: ({ column }) => <SortableHeader column={column} title="Visitor Name" />,
        cell: ({ row }) => (
          <span className="font-medium text-sm">{row.original.visitorName}</span>
        ),
      },
      {
        accessorKey: "purpose",
        header: "Purpose",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{row.original.purpose}</span>
        ),
      },
      {
        accessorKey: "residentName",
        header: ({ column }) => <SortableHeader column={column} title="Resident" />,
        cell: ({ row }) => (
          <span className="text-sm">{row.original.residentName}</span>
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
        accessorKey: "checkIn",
        header: ({ column }) => <SortableHeader column={column} title="Check-in" />,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDateTime(row.original.checkIn)}
          </span>
        ),
      },
      {
        accessorKey: "checkOut",
        header: "Check-out",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.checkOut ? formatDateTime(row.original.checkOut) : "—"}
          </span>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader title="Visitor Logs" description="Track and manage visitor check-ins and check-outs">
        <Button onClick={() => setSheetOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          New Visitor
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={visitorLogs}
        searchKey="visitorName"
        searchPlaceholder="Search visitors by name..."
        pageSize={10}
      />

      {/* New Visitor FormSheet */}
      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Check In Visitor"
        description="Register a new visitor at the dormitory"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visitorName">Visitor Name *</Label>
            <Input
              id="visitorName"
              placeholder="Enter visitor name"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose *</Label>
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Parent Visit">Parent Visit</SelectItem>
                <SelectItem value="Relative Visit">Relative Visit</SelectItem>
                <SelectItem value="Friend Visit">Friend Visit</SelectItem>
                <SelectItem value="Sibling Visit">Sibling Visit</SelectItem>
                <SelectItem value="Official Visit">Official Visit</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resident">Visiting Resident *</Label>
            <Select value={selectedResident} onValueChange={setSelectedResident}>
              <SelectTrigger>
                <SelectValue placeholder="Select resident" />
              </SelectTrigger>
              <SelectContent>
                {activeResidents.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.name} — {r.roomNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              Check In
            </Button>
            <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </FormSheet>
    </motion.div>
  );
}
