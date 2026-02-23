"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Building2,
  Shield,
  Activity,
  BarChart3,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { users, getUserById } from "@/data/users";
import { ROLE_LABELS, getDepartment } from "@/lib/constants";
import { formatDate, getInitials, getRelativeTime } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";

const userActivities = [
  {
    id: "1",
    user: "",
    action: "updated their profile",
    target: "settings",
    time: "2025-12-20T14:30:00",
    type: "update" as const,
  },
  {
    id: "2",
    user: "",
    action: "logged in from",
    target: "192.168.1.45",
    time: "2025-12-20T09:00:00",
    type: "info" as const,
  },
  {
    id: "3",
    user: "",
    action: "approved booking for",
    target: "Conference Room A",
    time: "2025-12-19T16:20:00",
    type: "create" as const,
  },
  {
    id: "4",
    user: "",
    action: "changed password via",
    target: "security settings",
    time: "2025-12-18T11:15:00",
    type: "update" as const,
  },
  {
    id: "5",
    user: "",
    action: "exported report for",
    target: "Q4 2025 Summary",
    time: "2025-12-17T14:45:00",
    type: "info" as const,
  },
  {
    id: "6",
    user: "",
    action: "added a new member",
    target: "to Gym department",
    time: "2025-12-16T10:30:00",
    type: "create" as const,
  },
  {
    id: "7",
    user: "",
    action: "resolved complaint",
    target: "#TC-4521",
    time: "2025-12-15T13:00:00",
    type: "update" as const,
  },
  {
    id: "8",
    user: "",
    action: "deleted expired membership",
    target: "Plan #M-892",
    time: "2025-12-14T09:20:00",
    type: "delete" as const,
  },
];

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const user = getUserById(userId);

  if (!user) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <EmptyState
          title="User not found"
          description={`No user found with ID "${userId}".`}
          action={
            <Button onClick={() => router.push("/admin/users")}>
              Go to Users
            </Button>
          }
        />
      </div>
    );
  }

  const department = user.department ? getDepartment(user.department) : null;
  const activitiesWithUser = userActivities.map((a) => ({ ...a, user: user.name }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Button variant="ghost" className="gap-2 -ml-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Users
      </Button>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
                {getInitials(user.name)}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={user.status} />
                    <Badge variant="outline">
                      <Shield className="h-3 w-3 mr-1" />
                      {ROLE_LABELS[user.role]}
                    </Badge>
                    {department && (
                      <Badge variant="secondary">
                        <Building2 className="h-3 w-3 mr-1" />
                        {department.name}
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>Joined {formatDate(user.joinedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Logins"
                value={247}
                change={12.3}
                changeLabel="this month"
                icon={<Users className="h-6 w-6" />}
                gradient="from-blue-500 to-cyan-500"
              />
              <StatsCard
                title="Tasks Completed"
                value={89}
                change={8.7}
                changeLabel="this month"
                icon={<CheckCircle2 className="h-6 w-6" />}
                gradient="from-emerald-500 to-green-600"
              />
              <StatsCard
                title="Avg. Session"
                value="4.2 hrs"
                icon={<Clock className="h-6 w-6" />}
                gradient="from-purple-500 to-violet-500"
              />
              <StatsCard
                title="Actions Today"
                value={14}
                change={-2.1}
                changeLabel="vs yesterday"
                icon={<Activity className="h-6 w-6" />}
                gradient="from-amber-500 to-orange-500"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "User ID", value: user.id },
                    { label: "Role", value: ROLE_LABELS[user.role] },
                    { label: "Department", value: department?.name || "None" },
                    { label: "Status", value: user.status },
                    { label: "Joined", value: formatDate(user.joinedAt) },
                    { label: "Last Active", value: getRelativeTime("2025-12-20T14:30:00") },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Permissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { perm: "View Dashboard", granted: true },
                      { perm: "Manage Users", granted: user.role === "super_admin" },
                      { perm: "Edit Settings", granted: ["super_admin", "department_head"].includes(user.role) },
                      { perm: "View Reports", granted: ["super_admin", "department_head", "manager"].includes(user.role) },
                      { perm: "Manage Members", granted: user.role !== "member" },
                      { perm: "Financial Access", granted: ["super_admin", "department_head"].includes(user.role) },
                    ].map((item) => (
                      <div key={item.perm} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.perm}</span>
                        <Badge variant={item.granted ? "success" : "secondary"}>
                          {item.granted ? "Granted" : "Denied"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed activities={activitiesWithUser} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
