"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Plus,
  Clock,
  Users,
  MapPin,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormSheet } from "@/components/shared/form-sheet";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { facilityBookings, facilities } from "@/data/sports";
import type { FacilityBooking } from "@/data/sports";

// Simulate a logged-in user
const CURRENT_USER_ID = "u-001";
const CURRENT_USER_NAME = "Rohit Mehta";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<FacilityBooking[]>(
    facilityBookings.filter((b) => b.userId === CURRENT_USER_ID)
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const upcomingBookings = bookings.filter(
    (b) => b.status !== "cancelled" && b.date >= new Date().toISOString().split("T")[0]
  );
  const pastBookings = bookings.filter(
    (b) => b.date < new Date().toISOString().split("T")[0]
  );
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  const handleCancel = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
    );
    toast.success("Booking cancelled successfully");
  };

  const handleNewBooking = () => {
    toast.success("Booking request submitted. You will be notified once it is approved.");
    setSheetOpen(false);
  };

  const BookingCard = ({ booking }: { booking: FacilityBooking }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-lg border bg-card hover:bg-accent/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <CalendarCheck className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold truncate">{booking.purpose}</h4>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" />
              {booking.facilityName}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarCheck className="h-3 w-3" />
                {booking.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {booking.startTime} - {booking.endTime}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {booking.participants}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <StatusBadge status={booking.status} />
          {booking.status === "pending" && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
              onClick={() => handleCancel(booking.id)}
            >
              <Trash2 className="h-3 w-3" />
              Cancel
            </Button>
          )}
          {booking.status === "confirmed" && booking.date >= new Date().toISOString().split("T")[0] && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
              onClick={() => handleCancel(booking.id)}
            >
              <Trash2 className="h-3 w-3" />
              Cancel
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Bookings"
        description={`Manage your facility bookings, ${CURRENT_USER_NAME}`}
      >
        <Button className="gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" />
          Book Facility
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
              </div>
              <Badge variant="outline" className="text-blue-600 bg-blue-50 dark:bg-blue-950">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Past</p>
                <p className="text-2xl font-bold">{pastBookings.length}</p>
              </div>
              <Badge variant="secondary">History</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold">{cancelledBookings.length}</p>
              </div>
              <Badge variant="destructive">{cancelledBookings.length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastBookings.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4 space-y-3">
          {upcomingBookings.length === 0 ? (
            <EmptyState
              title="No upcoming bookings"
              description="Book a facility to get started"
              action={
                <Button className="gap-2" onClick={() => setSheetOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Book Facility
                </Button>
              }
            />
          ) : (
            upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-4 space-y-3">
          {pastBookings.length === 0 ? (
            <EmptyState
              title="No past bookings"
              description="Your completed bookings will appear here"
            />
          ) : (
            pastBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-4 space-y-3">
          {cancelledBookings.length === 0 ? (
            <EmptyState
              title="No cancelled bookings"
              description="Cancelled bookings will appear here"
            />
          ) : (
            cancelledBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Book New Facility Sheet */}
      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Book a Facility"
        description="Submit a booking request for a sports facility"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Facility</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a facility" />
              </SelectTrigger>
              <SelectContent>
                {facilities
                  .filter((f) => f.status !== "maintenance")
                  .map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{f.name}</span>
                        <Badge variant="outline" className="ml-2 text-[10px]">
                          {f.sport}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" min={new Date().toISOString().split("T")[0]} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Start" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => i + 6).map((h) => (
                    <SelectItem key={h} value={`${String(h).padStart(2, "0")}:00`}>
                      {`${String(h).padStart(2, "0")}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="End" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => i + 7).map((h) => (
                    <SelectItem key={h} value={`${String(h).padStart(2, "0")}:00`}>
                      {`${String(h).padStart(2, "0")}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Purpose</Label>
            <Input placeholder="e.g., Team practice, friendly match..." />
          </div>

          <div className="space-y-2">
            <Label>Expected Participants</Label>
            <Input type="number" placeholder="Number of participants" />
          </div>

          <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            Your booking will be reviewed by the Sports department. You will receive a
            notification once it is approved or rejected.
          </div>

          <Button className="w-full" onClick={handleNewBooking}>
            Submit Booking Request
          </Button>
        </div>
      </FormSheet>
    </div>
  );
}
