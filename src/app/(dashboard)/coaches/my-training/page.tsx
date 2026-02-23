"use client";

import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  TrendingUp,
  CheckCircle2,
  Circle,
  Dumbbell,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { getInitials } from "@/lib/utils";

// Simulated member data - assigned coach and training plan
const assignedCoach = {
  name: "Harpreet Singh",
  sport: "Cricket",
  specialization: "Batting & Fielding",
  rating: 4.8,
  phone: "+91 99001 10008",
  email: "harpreet.singh@peps.edu.in",
  experience: 15,
};

const trainingPlan = {
  name: "Cricket Elite Development Program",
  startDate: "2026-01-15",
  endDate: "2026-04-15",
  progress: 42,
  phase: "Strength Building",
  weeklyGoal: "5 sessions",
  completedThisWeek: 3,
};

const weeklySchedule = [
  { day: "Monday", time: "06:00 - 08:00 AM", activity: "Batting Practice", venue: "Main Ground", completed: true },
  { day: "Tuesday", time: "06:00 - 07:30 AM", activity: "Fitness & Conditioning", venue: "Gym", completed: true },
  { day: "Wednesday", time: "06:00 - 08:00 AM", activity: "Fielding Drills", venue: "Main Ground", completed: true },
  { day: "Thursday", time: "06:00 - 07:30 AM", activity: "Net Practice", venue: "Net Practice Area", completed: false },
  { day: "Friday", time: "06:00 - 08:00 AM", activity: "Match Simulation", venue: "Main Ground", completed: false },
  { day: "Saturday", time: "07:00 - 10:00 AM", activity: "Full Practice Match", venue: "Main Ground", completed: false },
];

const performanceProgress = [
  { week: "W1", batting: 72, fitness: 68, fielding: 75 },
  { week: "W2", batting: 74, fitness: 71, fielding: 76 },
  { week: "W3", batting: 76, fitness: 74, fielding: 78 },
  { week: "W4", batting: 79, fitness: 77, fielding: 80 },
  { week: "W5", batting: 82, fitness: 80, fielding: 82 },
  { week: "W6", batting: 84, fitness: 82, fielding: 84 },
];

const goals = [
  { id: 1, title: "Improve batting average to 45+", progress: 75, status: "in_progress" },
  { id: 2, title: "Complete 100m sprint under 12s", progress: 60, status: "in_progress" },
  { id: 3, title: "Master 5 fielding positions", progress: 100, status: "completed" },
  { id: 4, title: "Increase endurance by 20%", progress: 40, status: "in_progress" },
];

export default function MyTrainingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Training"
        description="Your personalized training plan and progress overview"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Coach */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Your Coach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarFallback className="text-xl bg-primary/10">
                    {getInitials(assignedCoach.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{assignedCoach.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {assignedCoach.specialization}
                </p>
                <div className="flex gap-2 mb-3">
                  <Badge>{assignedCoach.sport}</Badge>
                  <Badge variant="secondary">
                    {assignedCoach.experience}y exp
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`h-4 w-4 rounded-full ${
                        star <= Math.round(assignedCoach.rating)
                          ? "bg-amber-400"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">
                    {assignedCoach.rating}
                  </span>
                </div>
                <div className="w-full space-y-2 text-sm">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-xs truncate">
                      {assignedCoach.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="text-xs">{assignedCoach.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Training Plan */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Dumbbell className="h-4 w-4" />
                      Current Training Plan
                    </CardTitle>
                    <CardDescription>{trainingPlan.name}</CardDescription>
                  </div>
                  <Badge variant="info">{trainingPlan.phase}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Progress
                    </p>
                    <p className="text-lg font-bold">{trainingPlan.progress}%</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Weekly Goal
                    </p>
                    <p className="text-lg font-bold">{trainingPlan.weeklyGoal}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Completed
                    </p>
                    <p className="text-lg font-bold">
                      {trainingPlan.completedThisWeek}/5
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Duration
                    </p>
                    <p className="text-lg font-bold">3 months</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">
                      Overall Progress
                    </span>
                    <span className="font-medium">
                      {trainingPlan.progress}%
                    </span>
                  </div>
                  <Progress
                    value={trainingPlan.progress}
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  This Week's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weeklySchedule.map((session, index) => (
                    <motion.div
                      key={session.day}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        session.completed
                          ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/10 dark:border-emerald-800"
                          : ""
                      }`}
                    >
                      {session.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {session.day}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px]"
                          >
                            {session.activity}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{session.venue}</span>
                          </div>
                        </div>
                      </div>
                      {session.completed && (
                        <Badge variant="success" className="text-[10px]">
                          Done
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Performance Progress & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Your Performance Progress"
          description="Tracking your improvement over the past 6 weeks"
          type="line"
          data={performanceProgress}
          dataKeys={["batting", "fitness", "fielding"]}
          xAxisKey="week"
          height={280}
        />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              Training Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium flex items-center gap-2">
                      {goal.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                      )}
                      {goal.title}
                    </p>
                    <span className="text-xs font-medium">{goal.progress}%</span>
                  </div>
                  <Progress
                    value={goal.progress}
                    className={`h-2 ${
                      goal.status === "completed" ? "" : ""
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
