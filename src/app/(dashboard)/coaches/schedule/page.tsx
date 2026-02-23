"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { coaches } from "@/data/coaches";

interface ScheduleSession {
  id: string;
  coachId: string;
  coachName: string;
  sport: string;
  startTime: string;
  endTime: string;
  venue: string;
  athleteCount: number;
  type: "training" | "assessment" | "match_prep" | "recovery";
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const weeklySchedule: Record<string, ScheduleSession[]> = {
  Monday: [
    { id: "ws-001", coachId: "coach-001", coachName: "Harpreet Singh", sport: "Cricket", startTime: "06:00", endTime: "08:00", venue: "Main Ground", athleteCount: 8, type: "training" },
    { id: "ws-002", coachId: "coach-003", coachName: "Bhavana Reddy", sport: "Athletics", startTime: "06:30", endTime: "08:30", venue: "Athletics Track", athleteCount: 5, type: "training" },
    { id: "ws-003", coachId: "coach-006", coachName: "Vinod Thakur", sport: "Swimming", startTime: "05:00", endTime: "07:00", venue: "Swimming Pool", athleteCount: 4, type: "training" },
    { id: "ws-004", coachId: "coach-004", coachName: "Dinesh Chauhan", sport: "Football", startTime: "16:00", endTime: "18:00", venue: "Football Field", athleteCount: 4, type: "training" },
    { id: "ws-005", coachId: "coach-008", coachName: "Rajendra Prasad", sport: "Basketball", startTime: "17:30", endTime: "19:30", venue: "Indoor Court", athleteCount: 5, type: "training" },
  ],
  Tuesday: [
    { id: "ws-006", coachId: "coach-002", coachName: "Anil Kapoor", sport: "Cricket", startTime: "06:00", endTime: "08:00", venue: "Net Practice Area", athleteCount: 6, type: "training" },
    { id: "ws-007", coachId: "coach-009", coachName: "Kavitha Naidu", sport: "Hockey", startTime: "06:00", endTime: "08:00", venue: "Hockey Turf", athleteCount: 6, type: "training" },
    { id: "ws-008", coachId: "coach-010", coachName: "Manoj Kumar", sport: "Athletics", startTime: "05:30", endTime: "07:30", venue: "Athletics Track", athleteCount: 4, type: "training" },
    { id: "ws-009", coachId: "coach-007", coachName: "Priya Saxena", sport: "Badminton", startTime: "16:00", endTime: "18:00", venue: "Indoor Court 2", athleteCount: 3, type: "training" },
  ],
  Wednesday: [
    { id: "ws-010", coachId: "coach-001", coachName: "Harpreet Singh", sport: "Cricket", startTime: "06:00", endTime: "08:00", venue: "Main Ground", athleteCount: 8, type: "assessment" },
    { id: "ws-011", coachId: "coach-003", coachName: "Bhavana Reddy", sport: "Athletics", startTime: "06:30", endTime: "08:30", venue: "Athletics Track", athleteCount: 5, type: "assessment" },
    { id: "ws-012", coachId: "coach-006", coachName: "Vinod Thakur", sport: "Swimming", startTime: "05:00", endTime: "07:00", venue: "Swimming Pool", athleteCount: 4, type: "training" },
    { id: "ws-013", coachId: "coach-008", coachName: "Rajendra Prasad", sport: "Basketball", startTime: "17:30", endTime: "19:30", venue: "Indoor Court", athleteCount: 5, type: "match_prep" },
  ],
  Thursday: [
    { id: "ws-014", coachId: "coach-002", coachName: "Anil Kapoor", sport: "Cricket", startTime: "06:00", endTime: "08:00", venue: "Net Practice Area", athleteCount: 6, type: "training" },
    { id: "ws-015", coachId: "coach-004", coachName: "Dinesh Chauhan", sport: "Football", startTime: "16:00", endTime: "18:00", venue: "Football Field", athleteCount: 4, type: "match_prep" },
    { id: "ws-016", coachId: "coach-009", coachName: "Kavitha Naidu", sport: "Hockey", startTime: "06:00", endTime: "08:00", venue: "Hockey Turf", athleteCount: 6, type: "training" },
    { id: "ws-017", coachId: "coach-010", coachName: "Manoj Kumar", sport: "Athletics", startTime: "05:30", endTime: "07:30", venue: "Athletics Track", athleteCount: 4, type: "recovery" },
  ],
  Friday: [
    { id: "ws-018", coachId: "coach-001", coachName: "Harpreet Singh", sport: "Cricket", startTime: "06:00", endTime: "08:00", venue: "Main Ground", athleteCount: 8, type: "training" },
    { id: "ws-019", coachId: "coach-003", coachName: "Bhavana Reddy", sport: "Athletics", startTime: "06:30", endTime: "08:30", venue: "Athletics Track", athleteCount: 5, type: "training" },
    { id: "ws-020", coachId: "coach-006", coachName: "Vinod Thakur", sport: "Swimming", startTime: "05:00", endTime: "07:00", venue: "Swimming Pool", athleteCount: 4, type: "assessment" },
    { id: "ws-021", coachId: "coach-007", coachName: "Priya Saxena", sport: "Badminton", startTime: "16:00", endTime: "18:00", venue: "Indoor Court 2", athleteCount: 3, type: "training" },
    { id: "ws-022", coachId: "coach-008", coachName: "Rajendra Prasad", sport: "Basketball", startTime: "17:30", endTime: "19:30", venue: "Indoor Court", athleteCount: 5, type: "training" },
  ],
  Saturday: [
    { id: "ws-023", coachId: "coach-001", coachName: "Harpreet Singh", sport: "Cricket", startTime: "07:00", endTime: "10:00", venue: "Main Ground", athleteCount: 8, type: "match_prep" },
    { id: "ws-024", coachId: "coach-004", coachName: "Dinesh Chauhan", sport: "Football", startTime: "07:00", endTime: "09:00", venue: "Football Field", athleteCount: 4, type: "training" },
    { id: "ws-025", coachId: "coach-009", coachName: "Kavitha Naidu", sport: "Hockey", startTime: "07:00", endTime: "09:30", venue: "Hockey Turf", athleteCount: 6, type: "match_prep" },
  ],
  Sunday: [
    { id: "ws-026", coachId: "coach-010", coachName: "Manoj Kumar", sport: "Athletics", startTime: "06:00", endTime: "08:00", venue: "Athletics Track", athleteCount: 4, type: "recovery" },
    { id: "ws-027", coachId: "coach-006", coachName: "Vinod Thakur", sport: "Swimming", startTime: "06:00", endTime: "07:30", venue: "Swimming Pool", athleteCount: 4, type: "recovery" },
  ],
};

const typeColors: Record<string, string> = {
  training: "bg-blue-500/10 text-blue-700 border-blue-200",
  assessment: "bg-amber-500/10 text-amber-700 border-amber-200",
  match_prep: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  recovery: "bg-violet-500/10 text-violet-700 border-violet-200",
};

const typeLabels: Record<string, string> = {
  training: "Training",
  assessment: "Assessment",
  match_prep: "Match Prep",
  recovery: "Recovery",
};

export default function SchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0);

  const totalSessions = Object.values(weeklySchedule).reduce(
    (sum, sessions) => sum + sessions.length,
    0
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Weekly Schedule"
        description={`${totalSessions} sessions scheduled this week`}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setWeekOffset((w) => w - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset(0)}
          >
            This Week
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setWeekOffset((w) => w + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </PageHeader>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(typeLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <div
              className={`h-3 w-3 rounded-full ${typeColors[key].split(" ")[0].replace("/10", "")}`}
              style={{
                backgroundColor:
                  key === "training"
                    ? "rgb(59,130,246)"
                    : key === "assessment"
                    ? "rgb(245,158,11)"
                    : key === "match_prep"
                    ? "rgb(16,185,129)"
                    : "rgb(139,92,246)",
              }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {days.map((day, dayIndex) => {
          const sessions = weeklySchedule[day] || [];
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.05 }}
            >
              <Card
                className={`h-full ${
                  dayIndex < 5 ? "" : "border-dashed"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">
                      {day}
                    </CardTitle>
                    <Badge variant="secondary" className="text-[10px]">
                      {sessions.length} sessions
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sessions.length > 0 ? (
                    sessions.map((session, idx) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: dayIndex * 0.05 + idx * 0.03 }}
                        className={`p-3 rounded-lg border ${typeColors[session.type]}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[9px]">
                              {getInitials(session.coachName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium truncate">
                            {session.coachName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] mb-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {session.startTime} - {session.endTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{session.venue}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{session.athleteCount}</span>
                          </div>
                        </div>
                        <div className="mt-1">
                          <Badge
                            variant="outline"
                            className="text-[9px] capitalize"
                          >
                            {typeLabels[session.type]}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[9px] ml-1"
                          >
                            {session.sport}
                          </Badge>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-muted-foreground">
                      No sessions scheduled
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
