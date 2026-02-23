"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Check,
  X,
  Eye,
  Plus,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormSheet } from "@/components/shared/form-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { facilityBookings, facilities } from "@/data/sports";
import type { FacilityBooking } from "@/data/sports";

export default function BookingsPage() {
  const [bookings, setBookings] = useState(facilityBookings);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [detailBooking, setDetailBooking] = useState<FacilityBooking | null>(null);

  const handleApprove = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "confirmed" as const } : b))
    );
    toast.success("Booking approved successfully");
  };

  const handleReject = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
    );
    toast.success("Booking rejected");
  };

  const columns: ColumnDef<FacilityBooking, unknown>[] = [
    {
      accessorKey: "facilityName",
      header: ({ column }) => <SortableHeader column={column} title="Facility" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{row.original.facilityName}</p>
            <p className="text-xs text-muted-foreground">{row.original.purpose}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "userName",
      header: ({ column }) => <SortableHeader column={column} title="Booked By" />,
      cell: ({ row }) => <span className="text-sm">{row.original.userName}</span>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => <SortableHeader column={column} title="Date" />,
      cell: ({ row }) => <span className="text-sm">{row.original.date}</span>,
    },
    {
      id: "time",
      header: "Time",
      cell: ({ row }) => (
        <span className="text-sm flex items-center gap-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          {row.original.startTime} - {row.original.endTime}
        </span>
      ),
    },
    {
      accessorKey: "participants",
      header: ({ column }) => <SortableHeader column={column} title="Participants" />,
      cell: ({ row }) => (
        <span className="text-sm flex items-center gap-1">
          <Users className="h-3 w-3 text-muted-foreground" />
          {row.original.participants}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const booking = row.original;
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setDetailBooking(booking)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            {booking.status === "pending" && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  onClick={() => handleApprove(booking.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleReject(booking.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const cancelledCount = bookings.filter((b) => b.status === "cancelled").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Facility Bookings" description="Manage and approve facility booking requests">
        <Button className="gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Pending", count: pendingCount, variant: "warning" as const },
          { label: "Confirmed", count: confirmedCount, variant: "success" as const },
          { label: "Cancelled", count: cancelledCount, variant: "destructive" as const },
        ].map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold">{item.count}</p>
                </div>
                <Badge variant={item.variant} className="text-lg px-3 py-1">
                  {item.count}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={bookings}
            searchKey="facilityName"
            searchPlaceholder="Search bookings..."
          />
        </CardContent>
      </Card>

      {/* Detail Sheet */}
      <FormSheet
        open={!!detailBooking}
        onOpenChange={() => setDetailBooking(null)}
        title="Booking Details"
        description="Full booking information"
      >
        {detailBooking && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Facility</Label>
              <p className="font-medium">{detailBooking.facilityName}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Purpose</Label>
              <p className="font-medium">{detailBooking.purpose}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Booked By</Label>
              <p className="font-medium">{detailBooking.userName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Date</Label>
                <p className="font-medium">{detailBooking.date}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Status</Label>
                <StatusBadge status={detailBooking.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Start Time</Label>
                <p className="font-medium">{detailBooking.startTime}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">End Time</Label>
                <p className="font-medium">{detailBooking.endTime}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Participants</Label>
              <p className="font-medium">{detailBooking.participants}</p>
            </div>
            {detailBooking.status === "pending" && (
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 gap-2"
                  onClick={() => {
                    handleApprove(detailBooking.id);
                    setDetailBooking(null);
                  }}
                >
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 gap-2"
                  onClick={() => {
                    handleReject(detailBooking.id);
                    setDetailBooking(null);
                  }}
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </FormSheet>

      {/* New Booking Sheet */}
      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="New Booking"
        description="Book a sports facility"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Facility</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select facility" />
              </SelectTrigger>
              <SelectContent>
                {facilities
                  .filter((f) => f.status !== "maintenance")
                  .map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input type="time" />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Purpose</Label>
            <Input placeholder="e.g., Team practice session" />
          </div>
          <div className="space-y-2">
            <Label>Expected Participants</Label>
            <Input type="number" placeholder="e.g., 20" />
          </div>
          <Button
            className="w-full mt-4"
            onClick={() => {
              toast.success("Booking request submitted successfully");
              setSheetOpen(false);
            }}
          >
            Submit Booking Request
          </Button>
        </div>
      </FormSheet>
    </div>
  );
}
