"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Layers,
  BedDouble,
  IndianRupee,
  Users,
  Wrench,
  Wifi,
  Wind,
  Bath,
  UserCheck,
  Clock,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormSheet } from "@/components/shared/form-sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  rooms,
  residents,
  getMaintenanceByRoom,
  getVisitorsByResident,
} from "@/data/dormitories";
import { formatCurrency, formatDate, formatDateTime, getInitials, getRelativeTime } from "@/lib/utils";

// Simulate current logged-in user as resident "Aarav Sharma" in room A-101
const currentResident = residents.find((r) => r.id === "res-001")!;
const currentRoom = rooms.find((r) => r.id === currentResident.roomId)!;
const roommates = residents.filter(
  (r) => r.roomId === currentRoom.id && r.id !== currentResident.id && r.status === "active"
);
const maintenanceHistory = getMaintenanceByRoom(currentRoom.id);
const visitorHistory = getVisitorsByResident(currentResident.name);

const amenityIcons: Record<string, React.ReactNode> = {
  "AC": <Wind className="h-4 w-4" />,
  "Wi-Fi": <Wifi className="h-4 w-4" />,
  "Fan": <Wind className="h-4 w-4" />,
  "Attached Bath": <Bath className="h-4 w-4" />,
  "Common Bath": <Bath className="h-4 w-4" />,
};

export default function MyRoomPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !priority || !description) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Maintenance request submitted successfully");
    setCategory("");
    setPriority("");
    setDescription("");
    setSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="My Room" description={`Welcome back, ${currentResident.name}`}>
        <Button onClick={() => setSheetOpen(true)}>
          <Wrench className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </PageHeader>

      {/* Room Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                {currentRoom.number}
              </div>
              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-xl font-bold">Room {currentRoom.number}</h2>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={currentRoom.status} />
                    <Badge variant="outline" className="capitalize">
                      <BedDouble className="h-3 w-3 mr-1" />
                      {currentRoom.type}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span>{currentRoom.buildingName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Layers className="h-4 w-4 shrink-0" />
                    <span>Floor {currentRoom.floor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IndianRupee className="h-4 w-4 shrink-0" />
                    <span>{formatCurrency(currentRoom.monthlyRent)} / month</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentRoom.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="gap-1.5">
                      {amenityIcons[amenity] || null}
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roommates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Roommates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {roommates.length > 0 ? (
                <div className="space-y-3">
                  {roommates.map((mate) => (
                    <div
                      key={mate.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {getInitials(mate.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{mate.name}</p>
                        <p className="text-xs text-muted-foreground">{mate.department}</p>
                      </div>
                      <StatusBadge status={mate.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No roommates (single room)
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Billing Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Monthly Rent", value: formatCurrency(currentRoom.monthlyRent) },
                { label: "Due Date", value: "1st of every month" },
                { label: "Last Payment", value: "01 Feb 2026" },
                { label: "Payment Status", value: "Paid" },
                { label: "Total Paid (Semester)", value: formatCurrency(currentRoom.monthlyRent * 6) },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}

              <Separator />

              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
                <UserCheck className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  All dues cleared
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">
                  Next payment due: 01 Mar 2026
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  My Maintenance Requests
                </CardTitle>
                <Badge variant="secondary">{maintenanceHistory.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {maintenanceHistory.length > 0 ? (
                <div className="space-y-3">
                  {maintenanceHistory
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((req) => (
                      <div
                        key={req.id}
                        className="p-3 rounded-lg border bg-muted/30 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{req.description}</span>
                          <StatusBadge status={req.status} />
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {req.category}
                          </Badge>
                          <span className="capitalize">{req.priority} priority</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {getRelativeTime(req.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No maintenance requests
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Visitor History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Visitor History
                </CardTitle>
                <Badge variant="secondary">{visitorHistory.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {visitorHistory.length > 0 ? (
                <div className="space-y-3">
                  {visitorHistory
                    .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
                    .map((visitor) => (
                      <div
                        key={visitor.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{visitor.visitorName}</p>
                          <p className="text-xs text-muted-foreground">{visitor.purpose}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(visitor.checkIn)}
                          </p>
                        </div>
                        <StatusBadge status={visitor.status} />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No visitor history
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Submit Maintenance Request Sheet */}
      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Report Maintenance Issue"
        description="Submit a new maintenance request for your room"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room">Room</Label>
            <Input id="room" value={`${currentRoom.number} — ${currentRoom.buildingName}`} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority *</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Submit Request
            </Button>
            <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </FormSheet>
    </div>
  );
}
