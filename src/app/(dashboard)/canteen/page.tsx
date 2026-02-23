"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  Package,
  Clock,
  Utensils,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  canteenOrders,
  canteenInventory,
  hourlyOrdersData,
  popularItemsData,
  categoryRevenueData,
} from "@/data/canteen";

export default function CanteenDashboardPage() {
  const todaysOrders = canteenOrders.filter((o) => o.status !== "cancelled");
  const completedOrders = canteenOrders.filter((o) => o.status === "completed");
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const avgOrderValue = completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0;
  const lowStockItems = canteenInventory.filter((i) => i.quantity <= i.minStock);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Canteen Dashboard"
        description="Overview of canteen operations, orders, and inventory"
      />

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Today's Orders"
          value={todaysOrders.length}
          change={12.5}
          changeLabel="vs yesterday"
          icon={<ShoppingCart className="h-5 w-5" />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Revenue Today"
          value={formatCurrency(totalRevenue)}
          change={8.3}
          changeLabel="vs yesterday"
          icon={<IndianRupee className="h-5 w-5" />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatsCard
          title="Avg Order Value"
          value={formatCurrency(avgOrderValue)}
          change={3.2}
          changeLabel="vs last week"
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-violet-500 to-violet-600"
        />
        <StatsCard
          title="Low Stock Items"
          value={lowStockItems.length}
          change={-2}
          changeLabel="needs attention"
          icon={<AlertTriangle className="h-5 w-5" />}
          gradient="from-amber-500 to-amber-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Popular Items"
          description="Most ordered items this week"
          type="pie"
          data={popularItemsData}
          height={300}
          colors={["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6"]}
        />
        <ChartCard
          title="Hourly Orders"
          description="Order distribution throughout the day"
          type="bar"
          data={hourlyOrdersData}
          dataKeys={["orders"]}
          xAxisKey="name"
          height={300}
          colors={["#3b82f6"]}
        />
      </div>

      {/* Category Revenue + Low Stock Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Revenue by Category"
          description="Category-wise revenue breakdown"
          type="donut"
          data={categoryRevenueData}
          height={300}
          colors={["#f59e0b", "#3b82f6", "#8b5cf6", "#10b981", "#14b8a6"]}
        />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  All items are well stocked
                </p>
              ) : (
                lowStockItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <Package className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.supplier}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="warning" className="text-xs">
                        {item.quantity} {item.unit}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Min: {item.minStock} {item.unit}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Orders Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            Active Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(["pending", "preparing", "ready", "completed"] as const).map((status) => {
              const count = canteenOrders.filter((o) => o.status === status).length;
              const colors: Record<string, string> = {
                pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                preparing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                ready: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
                completed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
              };
              const icons: Record<string, React.ReactNode> = {
                pending: <Clock className="h-5 w-5" />,
                preparing: <Utensils className="h-5 w-5" />,
                ready: <Package className="h-5 w-5" />,
                completed: <ShoppingCart className="h-5 w-5" />,
              };
              return (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colors[status]}`}>
                    {icons[status]}
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground capitalize">{status}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
