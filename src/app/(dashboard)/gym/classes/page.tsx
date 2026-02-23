"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Calendar,
  User,
  Zap,
  Award,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { gymClasses } from "@/data/gym";

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 border-green-300",
  Intermediate: "bg-amber-100 text-amber-700 border-amber-300",
  Advanced: "bg-red-100 text-red-700 border-red-300",
  "All Levels": "bg-blue-100 text-blue-700 border-blue-300",
};

const categoryColors: Record<string, string> = {
  Yoga: "from-purple-500 to-violet-500",
  Cardio: "from-red-500 to-pink-500",
  Strength: "from-blue-500 to-indigo-500",
  Dance: "from-pink-500 to-rose-500",
  Functional: "from-amber-500 to-orange-500",
  Flexibility: "from-green-500 to-emerald-500",
  Combat: "from-gray-700 to-gray-900",
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function GymClassesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Class Schedule"
        description="Browse and manage group fitness classes"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {gymClasses.length} classes scheduled weekly
        </div>
      </PageHeader>

      {days.map((day) => {
        const dayClasses = gymClasses.filter((c) => c.schedule.day === day);
        if (dayClasses.length === 0) return null;

        return (
          <div key={day} className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {day}
            </h2>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {dayClasses.map((cls) => {
                const fillPercent = (cls.enrolled / cls.capacity) * 100;
                const isFull = cls.enrolled >= cls.capacity;

                return (
                  <motion.div key={cls.id} variants={item}>
                    <Card className="hover:shadow-md transition-shadow h-full">
                      <CardContent className="p-5 space-y-4">
                        <div className="flex items-start justify-between">
                          <div
                            className={`h-10 w-10 rounded-lg bg-gradient-to-br ${categoryColors[cls.category] || "from-gray-500 to-gray-600"} flex items-center justify-center text-white`}
                          >
                            <Zap className="h-5 w-5" />
                          </div>
                          <Badge variant="outline" className={levelColors[cls.level]}>
                            {cls.level}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="font-semibold">{cls.name}</h3>
                          <p className="text-sm text-muted-foreground">{cls.category}</p>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5" />
                            <span>{cls.instructor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{cls.schedule.startTime} - {cls.schedule.endTime}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {cls.enrolled}/{cls.capacity} enrolled
                              </span>
                            </div>
                            {isFull && (
                              <Badge variant="destructive" className="text-xs">Full</Badge>
                            )}
                          </div>
                          <Progress value={fillPercent} className="h-1.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
