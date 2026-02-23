"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ColumnDef } from "@tanstack/react-table";
import {
  Plus,
  Calendar,
  Clock,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormSheet } from "@/components/shared/form-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  appointments as allAppointments,
  therapists,
  type PhysioAppointment,
} from "@/data/physio";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";

const columns: ColumnDef<PhysioAppointment>[] = [
  {
    accessorKey: "patientName",
    header: ({ column }) => <SortableHeader column={column} title="Patient" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs bg-primary/10">
            {getInitials(row.original.patientName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{row.original.patientName}</p>
          <p className="text-xs text-muted-foreground">{row.original.patientId}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "therapistName",
    header: ({ column }) => (
      <SortableHeader column={column} title="Therapist" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.original.therapistName}</span>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.date)}</span>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <Clock className="h-3 w-3 text-muted-foreground" />
        {row.original.time}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.duration} min</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.type.replace("_", " ")}
      </Badge>
    ),
    filterFn: (row, id, value) => value === "all" || row.getValue(id) === value,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    filterFn: (row, id, value) => value === "all" || row.getValue(id) === value,
  },
  {
    accessorKey: "fee",
    header: ({ column }) => <SortableHeader column={column} title="Fee" />,
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {formatCurrency(row.original.fee)}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="h-4 w-4 mr-2" /> View Details
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="h-4 w-4 mr-2" /> Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function AppointmentsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAppointments = allAppointments.filter((apt) => {
    if (typeFilter !== "all" && apt.type !== typeFilter) return false;
    if (statusFilter !== "all" && apt.status !== statusFilter) return false;
    return true;
  });

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment booked successfully");
    setSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        description="Manage physiotherapy and spa appointment bookings"
      >
        <Button onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </PageHeader>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-3"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filters:</span>
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
            <SelectItem value="massage">Massage</SelectItem>
            <SelectItem value="acupuncture">Acupuncture</SelectItem>
            <SelectItem value="hydrotherapy">Hydrotherapy</SelectItem>
            <SelectItem value="spa_treatment">Spa Treatment</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        {(typeFilter !== "all" || statusFilter !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTypeFilter("all");
              setStatusFilter("all");
            }}
          >
            Clear Filters
          </Button>
        )}
      </motion.div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          columns={columns}
          data={filteredAppointments}
          searchKey="patientName"
          searchPlaceholder="Search by patient name..."
        />
      </motion.div>

      {/* Book Appointment FormSheet */}
      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Book Appointment"
        description="Schedule a new physiotherapy or spa appointment"
      >
        <form onSubmit={handleBookAppointment} className="space-y-4">
          <div className="space-y-2">
            <Label>Patient Name</Label>
            <Input placeholder="Enter patient name" required />
          </div>
          <div className="space-y-2">
            <Label>Therapist</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select therapist" />
              </SelectTrigger>
              <SelectContent>
                {therapists
                  .filter((t) => t.status === "available")
                  .map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name} - {t.specialization}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" required />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
                  <SelectItem value="massage">Massage</SelectItem>
                  <SelectItem value="acupuncture">Acupuncture</SelectItem>
                  <SelectItem value="hydrotherapy">Hydrotherapy</SelectItem>
                  <SelectItem value="spa_treatment">Spa Treatment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Fee</Label>
            <Input type="number" placeholder="Enter fee amount" required />
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea placeholder="Any additional notes or instructions..." />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Book Appointment
            </Button>
            <Button
              type="button"
              variant="outline"
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
