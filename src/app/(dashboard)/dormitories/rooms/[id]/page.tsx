"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Layers,
  BedDouble,
  IndianRupee,
  Wifi,
  Wind,
  Bath,
  Users,
  Wrench,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  getRoomById,
  getMaintenanceByRoom,
  residents,
  type MaintenanceRequest,
} from "@/data/dormitories";
import { formatCurrency, formatDate, getRelativeTime, getInitials } from "@/lib/utils";

const amenityIcons: Record<string, React.ReactNode> = {
  "AC": <Wind className="h-4 w-4" />,
  "Wi-Fi": <Wifi className="h-4 w-4" />,
  "Fan": <Wind className="h-4 w-4" />,
  "Attached Bath": <Bath className="h-4 w-4" />,
  "Common Bath": <Bath className="h-4 w-4" />,
};

const priorityColors: Record<string, string> = {
  low: "text-blue-600",
  medium: "text-amber-600",
  high: "text-orange-600",
  urgent: "text-red-600",
};

const statusIcons: Record<MaintenanceRequest["status"], React.ReactNode> = {
  open: <AlertCircle className="h-4 w-4 text-amber-500" />,
  in_progress: <Clock className="h-4 w-4 text-blue-500" />,
  resolved: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
};

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;
  const room = getRoomById(roomId);

  if (!room) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <EmptyState
          title="Room not found"
          description={`No room found with ID "${roomId}".`}
          action={
            <Button onClick={() => router.push("/dormitories/rooms")}>
              Go to Rooms
            </Button>
          }
        />
      </div>
    );
  }

  const maintenanceHistory = getMaintenanceByRoom(roomId);
  const roomResidents = residents.filter((r) => r.roomId === roomId && r.status === "active");

  const maxOccupants = room.type === "single" ? 1 : room.type === "double" ? 2 : 3;
  const totalBilled = room.monthlyRent * (room.status === "occupied" ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Button variant="ghost" className="gap-2 -ml-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Rooms
      </Button>

      {/* Room Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                {room.number}
              </div>

              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-xl font-bold">Room {room.number}</h2>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={room.status} />
                    <Badge variant="outline" className="capitalize">
                      <BedDouble className="h-3 w-3 mr-1" />
                      {room.type}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span>{room.buildingName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Layers className="h-4 w-4 shrink-0" />
                    <span>Floor {room.floor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IndianRupee className="h-4 w-4 shrink-0" />
                    <span>{formatCurrency(room.monthlyRent)} / month</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Room Info + Occupants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Amenities & Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BedDouble className="h-4 w-4" />
                Room Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Room Type", value: room.type.charAt(0).toUpperCase() + room.type.slice(1) },
                { label: "Building", value: room.buildingName },
                { label: "Floor", value: `Floor ${room.floor}` },
                { label: "Capacity", value: `${maxOccupants} person(s)` },
                { label: "Current Occupants", value: `${room.occupants.length} / ${maxOccupants}` },
                { label: "Monthly Rent", value: formatCurrency(room.monthlyRent) },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}

              <Separator />

              <div>
                <p className="text-sm font-medium mb-3">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="gap-1.5">
                      {amenityIcons[amenity] || null}
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Occupants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Current Occupants
              </CardTitle>
            </CardHeader>
            <CardContent>
              {roomResidents.length > 0 ? (
                <div className="space-y-3">
                  {roomResidents.map((resident) => (
                    <div
                      key={resident.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {getInitials(resident.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{resident.name}</p>
                        <p className="text-xs text-muted-foreground">{resident.department}</p>
                        <p className="text-xs text-muted-foreground">{resident.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Joined</p>
                        <p className="text-xs font-medium">{formatDate(resident.joinDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No current occupants
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Maintenance History + Billing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Maintenance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {maintenanceHistory.length > 0 ? (
                <div className="space-y-4">
                  {maintenanceHistory
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((req, index) => (
                      <div key={req.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          {statusIcons[req.status]}
                          {index < maintenanceHistory.length - 1 && (
                            <div className="flex-1 w-px bg-border mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium">{req.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-[10px] capitalize">
                                  {req.category}
                                </Badge>
                                <span className={`text-xs font-medium capitalize ${priorityColors[req.priority]}`}>
                                  {req.priority}
                                </span>
                              </div>
                            </div>
                            <StatusBadge status={req.status} />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getRelativeTime(req.createdAt)}
                            {req.resolvedAt && ` — Resolved ${getRelativeTime(req.resolvedAt)}`}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No maintenance history
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Billing Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Monthly Rent", value: formatCurrency(room.monthlyRent) },
                { label: "Current Month Billing", value: room.status === "occupied" ? formatCurrency(totalBilled) : "N/A" },
                { label: "Payment Status", value: room.status === "occupied" ? "Paid" : "N/A" },
                { label: "Occupant Count", value: `${room.occupants.length}` },
                { label: "Per Person (approx)", value: room.occupants.length > 0 ? formatCurrency(Math.round(room.monthlyRent / room.occupants.length)) : "N/A" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}

              <Separator />

              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Revenue (This Room)</p>
                <p className="text-xl font-bold">
                  {room.status === "occupied" ? formatCurrency(room.monthlyRent * 8) : formatCurrency(0)}
                </p>
                <p className="text-xs text-muted-foreground">Last 8 months</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
