"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Users,
  IndianRupee,
  Clock,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { facilities, facilityBookings } from "@/data/sports";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 15 }, (_, i) => i + 6); // 6 AM to 8 PM

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function FacilityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const facilityId = params.id as string;

  const facility = facilities.find((f) => f.id === facilityId);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthDays = useMemo(() => getMonthDays(year, month), [year, month]);
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const facilityBookingsFiltered = facilityBookings.filter((b) => b.facilityId === facilityId);

  const selectedDateBookings = selectedDate
    ? facilityBookingsFiltered.filter((b) => b.date === selectedDate)
    : [];

  const bookedDates = new Set(
    facilityBookingsFiltered.filter((b) => b.status !== "cancelled").map((b) => b.date)
  );

  if (!facility) {
    return (
      <div className="space-y-6">
        <PageHeader title="Facility Not Found" description="The requested facility does not exist">
          <Button variant="outline" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </PageHeader>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={facility.name} description={`${facility.sport} - ${facility.location}`}>
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Facilities
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Facility Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Facility Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge status={facility.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type</span>
                <Badge variant="outline" className="capitalize">{facility.type}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sport</span>
                <span className="text-sm font-medium">{facility.sport}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Location
                </span>
                <span className="text-sm font-medium">{facility.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" /> Capacity
                </span>
                <span className="text-sm font-medium">{facility.capacity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <IndianRupee className="h-3 w-3" /> Hourly Rate
                </span>
                <span className="text-sm font-medium">{formatCurrency(facility.hourlyRate)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {facility.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Date Bookings */}
          {selectedDate && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Bookings on {selectedDate}</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateBookings.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No bookings for this date</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedDateBookings.map((booking) => (
                        <div key={booking.id} className="p-3 rounded-lg border space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{booking.purpose}</span>
                            <StatusBadge status={booking.status} />
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {booking.startTime} - {booking.endTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {booking.participants}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">By {booking.userName}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4" />
                  Booking Calendar
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium w-36 text-center">{monthName}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="h-12" />;
                  }
                  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const hasBookings = bookedDates.has(dateStr);
                  const isSelected = selectedDate === dateStr;
                  const isToday =
                    new Date().toISOString().split("T")[0] === dateStr;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                      className={`h-12 rounded-lg text-sm relative transition-colors flex flex-col items-center justify-center gap-0.5
                        ${isSelected ? "bg-primary text-primary-foreground" : "hover:bg-accent"}
                        ${isToday && !isSelected ? "border-2 border-primary" : ""}
                      `}
                    >
                      <span className="font-medium">{day}</span>
                      {hasBookings && (
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected ? "bg-primary-foreground" : "bg-primary"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Has Bookings
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded border-2 border-primary" />
                  Today
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded bg-primary" />
                  Selected
                </div>
              </div>

              {/* Time Slots Grid */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6"
                >
                  <h4 className="text-sm font-medium mb-3">Time Slots for {selectedDate}</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {HOURS.map((hour) => {
                      const timeStr = `${String(hour).padStart(2, "0")}:00`;
                      const isBooked = selectedDateBookings.some((b) => {
                        const start = parseInt(b.startTime.split(":")[0]);
                        const end = parseInt(b.endTime.split(":")[0]);
                        return hour >= start && hour < end;
                      });
                      return (
                        <div
                          key={hour}
                          className={`p-2 rounded-lg text-center text-xs font-medium border transition-colors ${
                            isBooked
                              ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300"
                              : "bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1">
                            {isBooked ? (
                              <XCircle className="h-3 w-3" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                            {timeStr}
                          </div>
                          <span className="text-[10px]">{isBooked ? "Booked" : "Available"}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
