"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  CalendarCheck,
  Plus,
  Eye,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormSheet } from "@/components/shared/form-sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  medicalAppointments,
  patients,
  doctors,
  type MedicalAppointment,
} from "@/data/medical";
import { getInitials, formatDate } from "@/lib/utils";

export default function MedicalAppointmentsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredAppointments = useMemo(() => {
    return medicalAppointments.filter((a) => {
      if (filterType !== "all" && a.type !== filterType) return false;
      if (filterStatus !== "all" && a.status !== filterStatus) return false;
      return true;
    });
  }, [filterType, filterStatus]);

  const columns = useMemo<ColumnDef<MedicalAppointment, unknown>[]>(
    () => [
      {
        accessorKey: "patientName",
        header: ({ column }) => <SortableHeader column={column} title="Patient" />,
        cell: ({ row }) => {
          const apt = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(apt.patientName)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{apt.patientName}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "doctorName",
        header: ({ column }) => <SortableHeader column={column} title="Doctor" />,
        cell: ({ row }) => (
          <span className="text-sm">{row.original.doctorName}</span>
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
          <span className="text-sm flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            {row.original.time}
          </span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.original.type;
          return (
            <Badge
              variant={
                type === "emergency"
                  ? "destructive"
                  : type === "follow_up"
                  ? "info"
                  : type === "checkup"
                  ? "secondary"
                  : "outline"
              }
            >
              {type.replace("_", " ")}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/medical/patients/${row.original.patientId}`}>
              <Eye className="h-4 w-4 mr-1" />
              View Patient
            </Link>
          </Button>
        ),
      },
    ],
    []
  );

  const handleSubmitAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment created successfully");
    setFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        description="Manage and schedule medical appointments"
      >
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </PageHeader>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3"
      >
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
            <SelectItem value="follow_up">Follow Up</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
            <SelectItem value="checkup">Checkup</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no_show">No Show</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

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

      {/* New Appointment Form Sheet */}
      <FormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        title="New Appointment"
        description="Schedule a new medical appointment"
      >
        <form onSubmit={handleSubmitAppointment} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name} - {d.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Appointment Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="follow_up">Follow Up</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="checkup">Checkup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Add notes about the appointment..." />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Schedule Appointment</Button>
          </div>
        </form>
      </FormSheet>
    </div>
  );
}
