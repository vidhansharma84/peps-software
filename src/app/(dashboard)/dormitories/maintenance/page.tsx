"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Droplets,
  Armchair,
  Sparkles,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Clock,
  AlertTriangle,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getRelativeTime } from "@/lib/utils";
import { maintenanceRequests, type MaintenanceRequest } from "@/data/dormitories";

const categoryIcons: Record<MaintenanceRequest["category"], React.ReactNode> = {
  electrical: <Zap className="h-4 w-4" />,
  plumbing: <Droplets className="h-4 w-4" />,
  furniture: <Armchair className="h-4 w-4" />,
  cleaning: <Sparkles className="h-4 w-4" />,
  other: <HelpCircle className="h-4 w-4" />,
};

const priorityConfig: Record<MaintenanceRequest["priority"], { color: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" }> = {
  low: { color: "text-blue-600", variant: "info" },
  medium: { color: "text-amber-600", variant: "warning" },
  high: { color: "text-orange-600", variant: "destructive" },
  urgent: { color: "text-red-600", variant: "destructive" },
};

const columnConfig: { status: MaintenanceRequest["status"]; label: string; color: string; bgColor: string }[] = [
  { status: "open", label: "Open", color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-950/30" },
  { status: "in_progress", label: "In Progress", color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-950/30" },
  { status: "resolved", label: "Resolved", color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950/30" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(maintenanceRequests);

  const moveRequest = (requestId: string, newStatus: MaintenanceRequest["status"]) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: newStatus,
              resolvedAt: newStatus === "resolved" ? new Date().toISOString() : r.resolvedAt,
            }
          : r
      )
    );
    const statusLabel = newStatus === "in_progress" ? "In Progress" : newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    toast.success(`Request moved to ${statusLabel}`);
  };

  const getRequestsByStatus = (status: MaintenanceRequest["status"]) =>
    requests
      .filter((r) => r.status === status)
      .sort((a, b) => {
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

  return (
    <div className="space-y-6">
      <PageHeader title="Maintenance Requests" description="Track and manage dormitory maintenance requests in a kanban view">
        <Button>
          <Wrench className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </PageHeader>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3"
      >
        {columnConfig.map((col) => {
          const count = getRequestsByStatus(col.status).length;
          return (
            <Badge key={col.status} variant="outline" className={cn("gap-1.5 py-1.5 px-3", col.color)}>
              {col.label}: {count}
            </Badge>
          );
        })}
        <Badge variant="outline" className="gap-1.5 py-1.5 px-3 text-red-600">
          <AlertTriangle className="h-3.5 w-3.5" />
          Urgent: {requests.filter((r) => r.priority === "urgent" && r.status !== "resolved").length}
        </Badge>
      </motion.div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columnConfig.map((col) => {
          const colRequests = getRequestsByStatus(col.status);
          return (
            <motion.div
              key={col.status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: columnConfig.indexOf(col) * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className={cn("text-base flex items-center gap-2", col.color)}>
                      <div className={cn("h-2 w-2 rounded-full", col.bgColor.replace("bg-", "bg-").replace("/30", ""), col.status === "open" ? "bg-amber-500" : col.status === "in_progress" ? "bg-blue-500" : "bg-emerald-500")} />
                      {col.label}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {colRequests.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                  <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                    {colRequests.length > 0 ? (
                      colRequests.map((req) => (
                        <motion.div key={req.id} variants={item}>
                          <Card className={cn("border", col.bgColor)}>
                            <CardContent className="p-3 space-y-2">
                              {/* Header */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  {categoryIcons[req.category]}
                                  <span className="text-sm font-medium">{req.roomNumber}</span>
                                </div>
                                <Badge variant={priorityConfig[req.priority].variant} className="text-[10px] px-1.5 py-0 capitalize">
                                  {req.priority}
                                </Badge>
                              </div>

                              {/* Description */}
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {req.description}
                              </p>

                              {/* Meta */}
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <User className="h-3 w-3" />
                                <span>{req.residentName}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{getRelativeTime(req.createdAt)}</span>
                              </div>

                              {/* Category Badge */}
                              <Badge variant="outline" className="text-[10px] capitalize">
                                {req.category}
                              </Badge>

                              {/* Move Actions */}
                              <div className="flex items-center gap-1 pt-1">
                                {col.status !== "open" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-[10px] gap-1 px-2"
                                    onClick={() =>
                                      moveRequest(
                                        req.id,
                                        col.status === "in_progress" ? "open" : "in_progress"
                                      )
                                    }
                                  >
                                    <ChevronLeft className="h-3 w-3" />
                                    {col.status === "in_progress" ? "Open" : "In Progress"}
                                  </Button>
                                )}
                                {col.status !== "resolved" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-[10px] gap-1 px-2 ml-auto"
                                    onClick={() =>
                                      moveRequest(
                                        req.id,
                                        col.status === "open" ? "in_progress" : "resolved"
                                      )
                                    }
                                  >
                                    {col.status === "open" ? "In Progress" : "Resolved"}
                                    <ChevronRight className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-xs text-muted-foreground">
                        No requests
                      </div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
