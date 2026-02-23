"use client";

import { motion } from "framer-motion";
import {
  Clock,
  LogIn,
  LogOut,
  UserCheck,
  Users,
  Activity,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { attendanceRecords } from "@/data/gym";
import { getInitials } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function GymAttendancePage() {
  const todayRecords = attendanceRecords.filter((r) => r.date === "2026-02-23");
  const checkedIn = todayRecords.filter((r) => !r.checkOut).length;
  const checkedOut = todayRecords.filter((r) => r.checkOut).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Today's Attendance"
        description="Real-time gym check-in and check-out tracking"
      >
        <Badge variant="outline" className="text-sm">
          <Activity className="h-3.5 w-3.5 mr-1" />
          {todayRecords.length} Total Entries
        </Badge>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total Check-ins"
          value={todayRecords.length}
          icon={<Users className="h-6 w-6" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Currently In Gym"
          value={checkedIn}
          icon={<LogIn className="h-6 w-6" />}
          gradient="from-emerald-500 to-green-600"
        />
        <StatsCard
          title="Checked Out"
          value={checkedOut}
          icon={<LogOut className="h-6 w-6" />}
          gradient="from-amber-500 to-orange-500"
        />
      </div>

      {/* Attendance List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Attendance Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            {todayRecords.map((record) => {
              const checkInTime = new Date(record.checkIn).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const checkOutTime = record.checkOut
                ? new Date(record.checkOut).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null;
              const isStillIn = !record.checkOut;

              let duration = "";
              if (record.checkOut) {
                const diff = new Date(record.checkOut).getTime() - new Date(record.checkIn).getTime();
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                duration = `${hours}h ${mins}m`;
              }

              return (
                <motion.div
                  key={record.id}
                  variants={item}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {getInitials(record.memberName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{record.memberName}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <LogIn className="h-3 w-3 text-emerald-500" />
                        <span>{checkInTime}</span>
                        {checkOutTime && (
                          <>
                            <LogOut className="h-3 w-3 text-red-500 ml-1" />
                            <span>{checkOutTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {duration && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{duration}</span>
                      </div>
                    )}
                    <Badge variant={isStillIn ? "success" : "secondary"}>
                      {isStillIn ? "In Gym" : "Left"}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
