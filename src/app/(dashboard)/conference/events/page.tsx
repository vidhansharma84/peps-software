"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  X,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn, formatDate } from "@/lib/utils";
import { conferenceEvents, type ConferenceEvent } from "@/data/conference";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const statusColors: Record<string, string> = {
  upcoming: "bg-blue-500",
  ongoing: "bg-emerald-500",
  completed: "bg-gray-400",
  cancelled: "bg-red-500",
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function ConferenceEventsPage() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(1); // February (0-indexed)
  const [selectedEvent, setSelectedEvent] = useState<ConferenceEvent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const eventsInMonth = useMemo(() => {
    const monthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
    return conferenceEvents.filter((e) => e.date.startsWith(monthStr));
  }, [currentYear, currentMonth]);

  const eventsByDate = useMemo(() => {
    const map: Record<number, ConferenceEvent[]> = {};
    eventsInMonth.forEach((event) => {
      const day = parseInt(event.date.split("-")[2]);
      if (!map[day]) map[day] = [];
      map[day].push(event);
    });
    return map;
  }, [eventsInMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleEventClick = (event: ConferenceEvent) => {
    setSelectedEvent(event);
    setDetailOpen(true);
  };

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  const today = new Date();
  const isToday = (day: number) =>
    today.getFullYear() === currentYear &&
    today.getMonth() === currentMonth &&
    today.getDate() === day;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conference Events"
        description="Calendar view of all scheduled events across conference rooms"
      />

      {/* Calendar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {monthNames[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentYear(2026);
                    setCurrentMonth(1);
                  }}
                >
                  Today
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((day, i) => (
                <div
                  key={i}
                  className={cn(
                    "min-h-[80px] p-1.5 rounded-lg border text-sm transition-colors",
                    day === null
                      ? "bg-muted/30 border-transparent"
                      : "hover:bg-muted/50",
                    day !== null && isToday(day)
                      ? "border-primary bg-primary/5"
                      : "border-border/50"
                  )}
                >
                  {day !== null && (
                    <>
                      <span
                        className={cn(
                          "inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium",
                          isToday(day)
                            ? "bg-primary text-primary-foreground"
                            : ""
                        )}
                      >
                        {day}
                      </span>
                      <div className="mt-0.5 space-y-0.5">
                        {(eventsByDate[day] || []).slice(0, 3).map((event) => (
                          <button
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            className="flex items-center gap-1 w-full text-left"
                          >
                            <div
                              className={cn(
                                "h-1.5 w-1.5 rounded-full shrink-0",
                                statusColors[event.status]
                              )}
                            />
                            <span className="text-[10px] truncate leading-tight">
                              {event.title}
                            </span>
                          </button>
                        ))}
                        {(eventsByDate[day]?.length || 0) > 3 && (
                          <span className="text-[10px] text-muted-foreground pl-3">
                            +{eventsByDate[day].length - 3} more
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t">
              {Object.entries(statusColors).map(([status, color]) => (
                <div key={status} className="flex items-center gap-1.5 text-xs">
                  <div className={cn("h-2.5 w-2.5 rounded-full", color)} />
                  <span className="text-muted-foreground capitalize">{status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Events List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Events in {monthNames[currentMonth]} ({eventsInMonth.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eventsInMonth.length === 0 ? (
              <EmptyState
                title="No events this month"
                description="There are no events scheduled for this month."
              />
            ) : (
              <div className="space-y-3">
                {eventsInMonth.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={item}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                          event.status === "upcoming"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : event.status === "ongoing"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : event.status === "completed"
                            ? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        )}
                      >
                        <CalendarDays className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{event.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.roomName}
                          </span>
                          <span className="text-muted-foreground/50">|</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.startTime} - {event.endTime}
                          </span>
                          <span className="text-muted-foreground/50">|</span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendees}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {event.organizer} - {event.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {event.cateringRequired && (
                        <Badge variant="outline" className="text-xs gap-1">
                          <UtensilsCrossed className="h-3 w-3" />
                          Catering
                        </Badge>
                      )}
                      <StatusBadge status={event.status} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Event Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>{selectedEvent.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Organizer</p>
                    <p className="font-medium">{selectedEvent.organizer}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Department</p>
                    <p className="font-medium">{selectedEvent.department}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Room</p>
                    <p className="font-medium">{selectedEvent.roomName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Attendees</p>
                    <p className="font-medium">{selectedEvent.attendees}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Date</p>
                    <p className="font-medium">{formatDate(selectedEvent.date)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Time</p>
                    <p className="font-medium">
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedEvent.status} />
                    {selectedEvent.cateringRequired && (
                      <Badge variant="outline" className="gap-1">
                        <UtensilsCrossed className="h-3 w-3" />
                        Catering Required
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
