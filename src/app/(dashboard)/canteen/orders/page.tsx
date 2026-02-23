"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChefHat,
  Package,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatCurrency, getRelativeTime } from "@/lib/utils";
import { canteenOrders, type CanteenOrder } from "@/data/canteen";

type OrderStatus = "pending" | "preparing" | "ready" | "completed";

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: React.ReactNode; color: string; headerColor: string }
> = {
  pending: {
    label: "Pending",
    icon: <Clock className="h-4 w-4" />,
    color: "border-amber-200 dark:border-amber-800",
    headerColor: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  },
  preparing: {
    label: "Preparing",
    icon: <ChefHat className="h-4 w-4" />,
    color: "border-blue-200 dark:border-blue-800",
    headerColor: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  },
  ready: {
    label: "Ready",
    icon: <Package className="h-4 w-4" />,
    color: "border-emerald-200 dark:border-emerald-800",
    headerColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  },
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: "border-gray-200 dark:border-gray-800",
    headerColor: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-400",
  },
};

const nextStatus: Record<string, OrderStatus | null> = {
  pending: "preparing",
  preparing: "ready",
  ready: "completed",
  completed: null,
};

export default function CanteenOrdersPage() {
  const [orders, setOrders] = useState<CanteenOrder[]>(
    canteenOrders.filter((o) => o.status !== "cancelled")
  );

  const moveOrder = (orderId: string, currentStatus: string) => {
    const next = nextStatus[currentStatus];
    if (!next) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: next,
              completedAt:
                next === "completed"
                  ? new Date().toISOString()
                  : o.completedAt,
            }
          : o
      )
    );

    const order = orders.find((o) => o.id === orderId);
    toast.success(
      `${order?.orderId} moved to ${statusConfig[next].label}`
    );
  };

  const columns: OrderStatus[] = ["pending", "preparing", "ready", "completed"];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Order Management"
        description="Track and manage canteen orders in real-time"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((status) => {
          const config = statusConfig[status];
          const statusOrders = orders.filter((o) => o.status === status);

          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col"
            >
              <Card className="flex-1">
                <CardHeader
                  className={cn(
                    "py-3 px-4 rounded-t-lg flex flex-row items-center gap-2",
                    config.headerColor
                  )}
                >
                  {config.icon}
                  <CardTitle className="text-sm font-semibold">
                    {config.label}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {statusOrders.length}
                  </Badge>
                </CardHeader>
                <CardContent className="p-2">
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-2 p-1">
                      <AnimatePresence mode="popLayout">
                        {statusOrders.length === 0 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8 text-sm text-muted-foreground"
                          >
                            No orders
                          </motion.div>
                        ) : (
                          statusOrders.map((order) => (
                            <motion.div
                              key={order.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Card
                                className={cn(
                                  "border transition-colors hover:shadow-sm",
                                  config.color
                                )}
                              >
                                <CardContent className="p-3 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold">
                                      {order.orderId}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {getRelativeTime(order.orderTime)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <User className="h-3 w-3" />
                                    {order.customerName}
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <ShoppingBag className="h-3 w-3" />
                                    {order.items.reduce(
                                      (sum, i) => sum + i.quantity,
                                      0
                                    )}{" "}
                                    items
                                  </div>
                                  <div className="flex items-center justify-between pt-1">
                                    <span className="text-sm font-semibold">
                                      {formatCurrency(order.totalAmount)}
                                    </span>
                                    {nextStatus[status] && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-xs gap-1"
                                        onClick={() =>
                                          moveOrder(order.id, status)
                                        }
                                      >
                                        {statusConfig[nextStatus[status]!].label}
                                        <ArrowRight className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
