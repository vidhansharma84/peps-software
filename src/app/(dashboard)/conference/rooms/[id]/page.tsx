"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  IndianRupee,
  MapPin,
  ArrowLeft,
  Clock,
  CalendarDays,
  Check,
  X,
  Wifi,
  Monitor,
  Mic,
  Snowflake,
} from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  getRoomById,
  getEventsByRoom,
  getBookingsByRoom,
  type ConferenceRoom,
} from "@/data/conference";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const amenityIcons: Record<string, React.ReactNode> = {
  Projector: <Monitor className="h-4 w-4" />,
  "Sound System": <Mic className="h-4 w-4" />,
  "Video Conferencing": <Wifi className="h-4 w-4" />,
  "Air Conditioning": <Snowflake className="h-4 w-4" />,
  Whiteboard: <Monitor className="h-4 w-4" />,
  "TV Display": <Monitor className="h-4 w-4" />,
  Microphones: <Mic className="h-4 w-4" />,
};

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekDates(): { day: string; date: string; fullDate: string }[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  return weekDays.map((day, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    return {
      day,
      date: d.getDate().toString(),
      fullDate: d.toISOString().split("T")[0],
    };
  });
}

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params.id as string;
  const room = getRoomById(roomId);
  const roomEvents = getEventsByRoom(roomId);
  const roomBookings = getBookingsByRoom(roomId);
  const weekDates = useMemo(() => getWeekDates(), []);

  if (!room) {
    return (
      <div className="space-y-6">
        <PageHeader title="Room Not Found" />
        <EmptyState
          title="Room not found"
          description="The conference room you are looking for does not exist."
          action={
            <Button asChild>
              <Link href="/conference/rooms">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Rooms
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  const upcomingBookings = roomBookings.filter(
    (b) => b.status !== "cancelled" && new Date(b.date) >= new Date("2026-02-23")
  );

  const isSlotBooked = (fullDate: string, time: string): boolean => {
    return roomBookings.some((b) => {
      if (b.status === "cancelled" || b.date !== fullDate) return false;
      const slotHour = parseInt(time.split(":")[0]);
      const startHour = parseInt(b.startTime.split(":")[0]);
      const endHour = parseInt(b.endTime.split(":")[0]);
      return slotHour >= startHour && slotHour < endHour;
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={room.name}
        description={`Floor ${room.floor} - Capacity: ${room.capacity} seats`}
      >
        <Button variant="outline" asChild>
          <Link href="/conference/rooms">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/conference/book?room=${room.id}`}>
            <CalendarDays className="h-4 w-4 mr-2" />
            Book This Room
          </Link>
        </Button>
      </PageHeader>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Room Info */}
        <motion.div variants={item} className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Room Information</CardTitle>
                <StatusBadge status={room.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{room.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" /> Capacity
                  </span>
                  <span className="font-medium">{room.capacity} seats</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" /> Hourly Rate
                  </span>
                  <span className="font-medium">{formatCurrency(room.hourlyRate)}/hr</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Floor
                  </span>
                  <span className="font-medium">
                    {room.floor === 0 ? "Ground Floor" : `Floor ${room.floor}`}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Configurations</p>
                <div className="flex flex-wrap gap-1.5">
                  {room.configurations.map((config) => (
                    <Badge key={config} variant="secondary" className="capitalize">
                      {config}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      {amenityIcons[amenity] || <Check className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Availability & Bookings */}
        <motion.div variants={item} className="lg:col-span-2 space-y-4">
          {/* Weekly Calendar */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Weekly Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  {/* Header Row */}
                  <div className="grid grid-cols-8 gap-1 mb-2">
                    <div className="text-xs font-medium text-muted-foreground p-2">Time</div>
                    {weekDates.map((wd) => (
                      <div
                        key={wd.day}
                        className={cn(
                          "text-center p-2 rounded-lg",
                          wd.fullDate === "2026-02-23"
                            ? "bg-primary/10 text-primary"
                            : ""
                        )}
                      >
                        <p className="text-xs font-medium">{wd.day}</p>
                        <p className="text-sm font-bold">{wd.date}</p>
                      </div>
                    ))}
                  </div>

                  {/* Time Slots */}
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8 gap-1 mb-1">
                      <div className="text-xs text-muted-foreground p-2 flex items-center">
                        {time}
                      </div>
                      {weekDates.map((wd) => {
                        const booked = isSlotBooked(wd.fullDate, time);
                        return (
                          <div
                            key={`${wd.day}-${time}`}
                            className={cn(
                              "h-8 rounded-md flex items-center justify-center text-xs transition-colors",
                              booked
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 cursor-pointer"
                            )}
                          >
                            {booked ? (
                              <X className="h-3.5 w-3.5" />
                            ) : (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  {/* Legend */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="h-3 w-3 rounded-sm bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/20" />
                      <span className="text-muted-foreground">Available</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="h-3 w-3 rounded-sm bg-red-100 border border-red-200 dark:bg-red-900/30" />
                      <span className="text-muted-foreground">Booked</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length === 0 ? (
                <EmptyState
                  title="No upcoming bookings"
                  description="This room has no upcoming bookings scheduled."
                />
              ) : (
                <div className="space-y-3">
                  {upcomingBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-sm">{booking.purpose}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <CalendarDays className="h-3 w-3" />
                          <span>{formatDate(booking.date)}</span>
                          <span className="text-muted-foreground/50">|</span>
                          <Clock className="h-3 w-3" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Booked by {booking.bookedBy}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-medium">{formatCurrency(booking.totalCost)}</span>
                        <StatusBadge status={booking.status} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
