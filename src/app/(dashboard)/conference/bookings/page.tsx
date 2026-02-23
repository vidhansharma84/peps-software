"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Plus,
  Clock,
  Building2,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormSheet } from "@/components/shared/form-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  conferenceBookings,
  conferenceRooms,
  type ConferenceBooking,
} from "@/data/conference";

const columns: ColumnDef<ConferenceBooking>[] = [
  {
    accessorKey: "roomName",
    header: ({ column }) => <SortableHeader column={column} title="Room" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
          <Building2 className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{row.getValue("roomName")}</span>
      </div>
    ),
  },
  {
    accessorKey: "bookedBy",
    header: ({ column }) => <SortableHeader column={column} title="Booked By" />,
    cell: ({ row }) => <span>{row.getValue("bookedBy")}</span>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.getValue("date"))}</span>
    ),
  },
  {
    id: "time",
    header: "Time",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        {row.original.startTime} - {row.original.endTime}
      </div>
    ),
  },
  {
    accessorKey: "purpose",
    header: ({ column }) => <SortableHeader column={column} title="Purpose" />,
    cell: ({ row }) => (
      <span className="text-sm truncate max-w-[200px] block">
        {row.getValue("purpose")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "totalCost",
    header: ({ column }) => <SortableHeader column={column} title="Cost" />,
    cell: ({ row }) => (
      <span className="font-medium">{formatCurrency(row.getValue("totalCost"))}</span>
    ),
  },
];

export default function ConferenceBookingsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    roomId: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    bookedBy: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking created successfully!", {
      description: "The conference room has been booked.",
    });
    setSheetOpen(false);
    setFormData({
      roomId: "",
      date: "",
      startTime: "",
      endTime: "",
      purpose: "",
      bookedBy: "",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bookings"
        description="View and manage all conference room bookings"
      >
        <Button onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DataTable
          columns={columns}
          data={conferenceBookings}
          searchKey="bookedBy"
          searchPlaceholder="Search by person name..."
        />
      </motion.div>

      {/* New Booking FormSheet */}
      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="New Booking"
        description="Book a conference room for your event"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bookedBy">Booked By</Label>
            <Input
              id="bookedBy"
              placeholder="Enter your name"
              value={formData.bookedBy}
              onChange={(e) =>
                setFormData({ ...formData, bookedBy: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomId">Conference Room</Label>
            <Select
              value={formData.roomId}
              onValueChange={(value) =>
                setFormData({ ...formData, roomId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {conferenceRooms
                  .filter((r) => r.status !== "maintenance")
                  .map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name} (Cap: {room.capacity})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Select
                value={formData.startTime}
                onValueChange={(value) =>
                  setFormData({ ...formData, startTime: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Start" />
                </SelectTrigger>
                <SelectContent>
                  {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(
                    (time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Select
                value={formData.endTime}
                onValueChange={(value) =>
                  setFormData({ ...formData, endTime: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="End" />
                </SelectTrigger>
                <SelectContent>
                  {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(
                    (time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              placeholder="Describe the purpose of the booking"
              value={formData.purpose}
              onChange={(e) =>
                setFormData({ ...formData, purpose: e.target.value })
              }
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <CalendarDays className="h-4 w-4 mr-2" />
              Create Booking
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
