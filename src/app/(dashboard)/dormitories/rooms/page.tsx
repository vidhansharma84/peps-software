"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, Users, Wrench, DoorOpen, BedSingle, BedDouble } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { rooms, buildings, type Room } from "@/data/dormitories";

const statusStyles: Record<Room["status"], { bg: string; border: string; text: string; label: string }> = {
  occupied: { bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800", text: "text-emerald-700 dark:text-emerald-400", label: "Occupied" },
  vacant: { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800", text: "text-blue-700 dark:text-blue-400", label: "Vacant" },
  maintenance: { bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800", text: "text-red-700 dark:text-red-400", label: "Maintenance" },
  reserved: { bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800", text: "text-amber-700 dark:text-amber-400", label: "Reserved" },
};

const typeLabels: Record<Room["type"], string> = {
  single: "Single",
  double: "Double",
  triple: "Triple",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export default function RoomsPage() {
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0].id);
  const [selectedFloor, setSelectedFloor] = useState(1);

  const building = buildings.find((b) => b.id === selectedBuilding)!;
  const floors = Array.from({ length: building.floors }, (_, i) => i + 1);

  const filteredRooms = useMemo(
    () =>
      rooms.filter(
        (r) => r.buildingId === selectedBuilding && r.floor === selectedFloor
      ),
    [selectedBuilding, selectedFloor]
  );

  const buildingRooms = rooms.filter((r) => r.buildingId === selectedBuilding);
  const buildingStats = {
    total: buildingRooms.length,
    occupied: buildingRooms.filter((r) => r.status === "occupied").length,
    vacant: buildingRooms.filter((r) => r.status === "vacant").length,
    maintenance: buildingRooms.filter((r) => r.status === "maintenance").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Room Management" description="Visual room grid with status overview across all buildings">
        <Button asChild>
          <Link href="/dormitories">
            <Building2 className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </Button>
      </PageHeader>

      {/* Building Selector */}
      <Tabs value={selectedBuilding} onValueChange={(v) => { setSelectedBuilding(v); setSelectedFloor(1); }}>
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1 p-1">
          {buildings.map((b) => (
            <TabsTrigger key={b.id} value={b.id} className="text-xs sm:text-sm">
              {b.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Building Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3"
      >
        <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
          <DoorOpen className="h-3.5 w-3.5" />
          Total: {buildingStats.total}
        </Badge>
        <Badge variant="success" className="gap-1.5 py-1.5 px-3">
          <Users className="h-3.5 w-3.5" />
          Occupied: {buildingStats.occupied}
        </Badge>
        <Badge variant="info" className="gap-1.5 py-1.5 px-3">
          <BedSingle className="h-3.5 w-3.5" />
          Vacant: {buildingStats.vacant}
        </Badge>
        <Badge variant="destructive" className="gap-1.5 py-1.5 px-3">
          <Wrench className="h-3.5 w-3.5" />
          Maintenance: {buildingStats.maintenance}
        </Badge>
      </motion.div>

      {/* Floor Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Floor:</span>
        <div className="flex gap-1">
          {floors.map((f) => (
            <Button
              key={f}
              variant={selectedFloor === f ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFloor(f)}
              className="w-10"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <motion.div
        key={`${selectedBuilding}-${selectedFloor}`}
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {filteredRooms.map((room) => {
          const style = statusStyles[room.status];
          return (
            <motion.div key={room.id} variants={item}>
              <Link href={`/dormitories/rooms/${room.id}`}>
                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] border-2",
                    style.bg,
                    style.border
                  )}
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={cn("font-bold text-lg", style.text)}>
                        {room.number}
                      </span>
                      {room.type === "single" && <BedSingle className={cn("h-4 w-4", style.text)} />}
                      {room.type === "double" && <BedDouble className={cn("h-4 w-4", style.text)} />}
                      {room.type === "triple" && <Users className={cn("h-4 w-4", style.text)} />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{typeLabels[room.type]}</p>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            room.status === "occupied"
                              ? "success"
                              : room.status === "vacant"
                              ? "info"
                              : room.status === "maintenance"
                              ? "destructive"
                              : "warning"
                          }
                          className="text-[10px] px-1.5 py-0"
                        >
                          {style.label}
                        </Badge>
                        {room.occupants.length > 0 && (
                          <span className="text-xs text-muted-foreground">
                            <Users className="h-3 w-3 inline mr-0.5" />
                            {room.occupants.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2"
      >
        <span className="font-medium">Legend:</span>
        {Object.entries(statusStyles).map(([status, style]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={cn("h-3 w-3 rounded-sm border", style.bg, style.border)} />
            <span>{style.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
