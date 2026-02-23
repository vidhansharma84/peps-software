"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Clock,
  Users,
  Check,
  ChevronRight,
  ChevronLeft,
  Package,
  UtensilsCrossed,
  IndianRupee,
  MapPin,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn, formatCurrency } from "@/lib/utils";
import {
  conferenceRooms,
  rentalEquipment,
  conferenceBookings,
  type ConferenceRoom,
} from "@/data/conference";

const steps = [
  { id: 1, label: "Select Room", icon: Building2 },
  { id: 2, label: "Date & Time", icon: CalendarDays },
  { id: 3, label: "Details", icon: Users },
  { id: 4, label: "Add-ons", icon: Package },
  { id: 5, label: "Review", icon: Check },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00",
];

const configColors: Record<string, string> = {
  theatre: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  classroom: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  boardroom: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "u-shape": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function ConferenceBookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<ConferenceRoom | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bookedBy, setBookedBy] = useState("");
  const [attendeeCount, setAttendeeCount] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [cateringEnabled, setCateringEnabled] = useState(false);
  const [cateringType, setCateringType] = useState("");
  const [cateringHeadCount, setCateringHeadCount] = useState("");

  const isSlotBooked = (roomId: string, date: string, time: string): boolean => {
    return conferenceBookings.some((b) => {
      if (b.status === "cancelled" || b.roomId !== roomId || b.date !== date) return false;
      const slotHour = parseInt(time.split(":")[0]);
      const startHour = parseInt(b.startTime.split(":")[0]);
      const endHour = parseInt(b.endTime.split(":")[0]);
      return slotHour >= startHour && slotHour < endHour;
    });
  };

  const availableEndTimes = useMemo(() => {
    if (!startTime || !selectedRoom || !selectedDate) return [];
    const startIdx = timeSlots.indexOf(startTime);
    return ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
      .filter((t) => {
        const tHour = parseInt(t.split(":")[0]);
        const sHour = parseInt(startTime.split(":")[0]);
        if (tHour <= sHour) return false;
        // Check if any slot between start and end is booked
        for (let h = sHour; h < tHour; h++) {
          const slotStr = `${h.toString().padStart(2, "0")}:00`;
          if (isSlotBooked(selectedRoom.id, selectedDate, slotStr)) return false;
        }
        return true;
      });
  }, [startTime, selectedRoom, selectedDate]);

  const totalHours = useMemo(() => {
    if (!startTime || !endTime) return 0;
    return parseInt(endTime.split(":")[0]) - parseInt(startTime.split(":")[0]);
  }, [startTime, endTime]);

  const roomCost = selectedRoom ? totalHours * selectedRoom.hourlyRate : 0;
  const equipmentCost = selectedEquipment.reduce((sum, eqId) => {
    const eq = rentalEquipment.find((e) => e.id === eqId);
    return sum + (eq ? eq.ratePerDay : 0);
  }, 0);
  const cateringCost = cateringEnabled
    ? parseInt(cateringHeadCount || "0") * 450
    : 0;
  const totalCost = roomCost + equipmentCost + cateringCost;

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedRoom !== null;
      case 2: return selectedDate && startTime && endTime;
      case 3: return purpose && bookedBy;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    toast.success("Room booked successfully!", {
      description: `${selectedRoom?.name} has been booked for ${selectedDate} from ${startTime} to ${endTime}.`,
    });
    // Reset form
    setCurrentStep(1);
    setSelectedRoom(null);
    setSelectedDate("");
    setStartTime("");
    setEndTime("");
    setPurpose("");
    setBookedBy("");
    setAttendeeCount("");
    setSelectedEquipment([]);
    setCateringEnabled(false);
    setCateringType("");
    setCateringHeadCount("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Book a Conference Room"
        description="Select a room, pick your date and time, and finalize your booking"
      />

      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => {
                      if (step.id < currentStep) setCurrentStep(step.id);
                    }}
                    className={cn(
                      "flex items-center gap-2 transition-all",
                      step.id < currentStep && "cursor-pointer",
                      step.id > currentStep && "cursor-default opacity-50"
                    )}
                  >
                    <div
                      className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center transition-colors text-sm font-medium",
                        step.id === currentStep
                          ? "bg-primary text-primary-foreground"
                          : step.id < currentStep
                          ? "bg-emerald-500 text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <step.icon className="h-4 w-4" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium hidden sm:inline",
                        step.id === currentStep
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-px w-8 lg:w-16 mx-2",
                        step.id < currentStep ? "bg-emerald-500" : "bg-border"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Step 1: Select Room */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {conferenceRooms
                .filter((r) => r.status !== "maintenance")
                .map((room) => (
                  <Card
                    key={room.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedRoom?.id === room.id
                        ? "ring-2 ring-primary border-primary"
                        : ""
                    )}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{room.name}</CardTitle>
                        {selectedRoom?.id === room.id && (
                          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3.5 w-3.5 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Floor {room.floor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          {room.capacity} seats
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(room.hourlyRate)}/hr
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {room.configurations.map((config) => (
                          <span
                            key={config}
                            className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium capitalize",
                              configColors[config] || "bg-gray-100 text-gray-700"
                            )}
                          >
                            {config}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {room.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && selectedRoom && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Select Date & Time</CardTitle>
                <CardDescription>
                  Choose your preferred date and available time slots for{" "}
                  <span className="font-medium text-foreground">{selectedRoom.name}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setStartTime("");
                      setEndTime("");
                    }}
                    min="2026-02-23"
                  />
                </div>

                {selectedDate && (
                  <>
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {timeSlots.map((time) => {
                          const booked = isSlotBooked(selectedRoom.id, selectedDate, time);
                          return (
                            <button
                              key={time}
                              disabled={booked}
                              onClick={() => {
                                setStartTime(time);
                                setEndTime("");
                              }}
                              className={cn(
                                "p-2.5 rounded-lg border text-sm font-medium transition-all",
                                booked
                                  ? "bg-red-50 text-red-400 border-red-200 cursor-not-allowed dark:bg-red-900/20 dark:text-red-500 dark:border-red-800"
                                  : startTime === time
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "hover:bg-muted/50 hover:border-primary/50"
                              )}
                            >
                              <Clock className="h-3.5 w-3.5 mx-auto mb-0.5" />
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {startTime && (
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {availableEndTimes.map((time) => (
                            <button
                              key={time}
                              onClick={() => setEndTime(time)}
                              className={cn(
                                "p-2.5 rounded-lg border text-sm font-medium transition-all",
                                endTime === time
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "hover:bg-muted/50 hover:border-primary/50"
                              )}
                            >
                              <Clock className="h-3.5 w-3.5 mx-auto mb-0.5" />
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {startTime && endTime && (
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
                        <span className="font-medium">Duration: </span>
                        {totalHours} hour{totalHours > 1 ? "s" : ""} |{" "}
                        <span className="font-medium">Cost: </span>
                        {formatCurrency(roomCost)}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Booking Details</CardTitle>
                <CardDescription>
                  Provide information about the meeting or event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="bookedBy">Your Name</Label>
                  <Input
                    id="bookedBy"
                    placeholder="Enter your full name"
                    value={bookedBy}
                    onChange={(e) => setBookedBy(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Textarea
                    id="purpose"
                    placeholder="Describe the purpose of this booking"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendees">Expected Attendees</Label>
                  <Input
                    id="attendees"
                    type="number"
                    placeholder={`Max capacity: ${selectedRoom?.capacity}`}
                    value={attendeeCount}
                    onChange={(e) => setAttendeeCount(e.target.value)}
                    max={selectedRoom?.capacity}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Add-ons */}
          {currentStep === 4 && (
            <div className="space-y-4">
              {/* Equipment Add-ons */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Equipment Add-ons
                  </CardTitle>
                  <CardDescription>
                    Select additional equipment for your event
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {rentalEquipment
                      .filter((eq) => eq.available > 0)
                      .map((eq) => (
                        <div
                          key={eq.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer",
                            selectedEquipment.includes(eq.id)
                              ? "border-primary bg-primary/5"
                              : "hover:bg-muted/50"
                          )}
                          onClick={() => {
                            setSelectedEquipment((prev) =>
                              prev.includes(eq.id)
                                ? prev.filter((id) => id !== eq.id)
                                : [...prev, eq.id]
                            );
                          }}
                        >
                          <Checkbox
                            checked={selectedEquipment.includes(eq.id)}
                            onCheckedChange={() => {}}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{eq.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {eq.available} available | {formatCurrency(eq.ratePerDay)}/day
                            </p>
                          </div>
                          <Badge variant="outline" className="capitalize text-xs">
                            {eq.category}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Catering Option */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <UtensilsCrossed className="h-4 w-4" />
                        Catering
                      </CardTitle>
                      <CardDescription>
                        Add catering services to your booking
                      </CardDescription>
                    </div>
                    <Switch
                      checked={cateringEnabled}
                      onCheckedChange={setCateringEnabled}
                    />
                  </div>
                </CardHeader>
                {cateringEnabled && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Meal Type</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {["breakfast", "lunch", "snacks", "dinner", "beverages"].map(
                          (type) => (
                            <button
                              key={type}
                              onClick={() => setCateringType(type)}
                              className={cn(
                                "p-2 rounded-lg border text-sm font-medium capitalize transition-all",
                                cateringType === type
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "hover:bg-muted/50"
                              )}
                            >
                              {type}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cateringHeadCount">Head Count</Label>
                      <Input
                        id="cateringHeadCount"
                        type="number"
                        placeholder="Number of people"
                        value={cateringHeadCount}
                        onChange={(e) => setCateringHeadCount(e.target.value)}
                      />
                    </div>
                    {cateringType && cateringHeadCount && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm dark:bg-amber-900/20 dark:border-amber-800">
                        <span className="font-medium">Estimated Cost: </span>
                        {formatCurrency(parseInt(cateringHeadCount) * 450)} (approx. {formatCurrency(450)}/head)
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && selectedRoom && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Booking Summary
                </CardTitle>
                <CardDescription>
                  Review your booking details before confirming
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Room</p>
                      <p className="font-medium">{selectedRoom.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-medium">{selectedDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-medium">
                        {startTime} - {endTime} ({totalHours} hr{totalHours > 1 ? "s" : ""})
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Booked By</p>
                      <p className="font-medium">{bookedBy}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Purpose</p>
                      <p className="font-medium">{purpose}</p>
                    </div>
                    {attendeeCount && (
                      <div>
                        <p className="text-xs text-muted-foreground">Attendees</p>
                        <p className="font-medium">{attendeeCount}</p>
                      </div>
                    )}
                    {selectedEquipment.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground">Equipment</p>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {selectedEquipment.map((eqId) => {
                            const eq = rentalEquipment.find((e) => e.id === eqId);
                            return eq ? (
                              <Badge key={eqId} variant="outline" className="text-xs">
                                {eq.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    {cateringEnabled && (
                      <div>
                        <p className="text-xs text-muted-foreground">Catering</p>
                        <p className="font-medium capitalize">
                          {cateringType} for {cateringHeadCount} people
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Cost Breakdown */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Cost Breakdown</h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Room ({totalHours} hrs x {formatCurrency(selectedRoom.hourlyRate)})
                      </span>
                      <span className="font-medium">{formatCurrency(roomCost)}</span>
                    </div>
                    {equipmentCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Equipment ({selectedEquipment.length} items)
                        </span>
                        <span className="font-medium">{formatCurrency(equipmentCost)}</span>
                      </div>
                    )}
                    {cateringCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Catering ({cateringHeadCount} pax)
                        </span>
                        <span className="font-medium">{formatCurrency(cateringCost)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatCurrency(totalCost)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between pt-2"
      >
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        {currentStep < 5 ? (
          <Button
            onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}
            disabled={!canProceed()}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="gap-2">
            <Check className="h-4 w-4" />
            Confirm Booking
          </Button>
        )}
      </motion.div>
    </div>
  );
}
