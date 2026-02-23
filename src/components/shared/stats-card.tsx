"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  className?: string;
  gradient?: string;
}

export function StatsCard({ title, value, change, changeLabel, icon, className, gradient }: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === "number" ? value : parseFloat(value.replace(/[^0-9.]/g, ""));
  const isNumeric = !isNaN(numericValue) && typeof value === "number";

  useEffect(() => {
    if (!isNumeric) return;
    const duration = 1000;
    const steps = 30;
    const increment = numericValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [numericValue, isNumeric]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">
                {isNumeric ? displayValue.toLocaleString() : value}
              </p>
              {change !== undefined && (
                <div className="flex items-center gap-1 text-xs">
                  {change >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={cn(change >= 0 ? "text-emerald-500" : "text-red-500")}>
                    {change > 0 ? "+" : ""}{change}%
                  </span>
                  {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
                </div>
              )}
            </div>
            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", gradient ? `bg-gradient-to-br ${gradient} text-white` : "bg-primary/10 text-primary")}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
