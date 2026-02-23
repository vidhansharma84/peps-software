"use client";

import { motion } from "framer-motion";
import { cn, getRelativeTime } from "@/lib/utils";

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type?: "create" | "update" | "delete" | "info";
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const typeColors = {
  create: "bg-emerald-500",
  update: "bg-blue-500",
  delete: "bg-red-500",
  info: "bg-amber-500",
};

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex gap-3"
        >
          <div className="flex flex-col items-center">
            <div className={cn("h-2 w-2 rounded-full mt-2", typeColors[activity.type || "info"])} />
            {index < activities.length - 1 && <div className="flex-1 w-px bg-border mt-1" />}
          </div>
          <div className="flex-1 pb-4">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{getRelativeTime(activity.time)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
