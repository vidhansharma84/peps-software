"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { type ColumnDef } from "@tanstack/react-table";
import {
  FileText,
  Plus,
  Eye,
  Pill,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { FormSheet } from "@/components/shared/form-sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  prescriptions,
  patients,
  doctors,
  type Prescription,
} from "@/data/medical";
import { getInitials, formatDate } from "@/lib/utils";

export default function MedicalPrescriptionsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const columns = useMemo<ColumnDef<Prescription, unknown>[]>(
    () => [
      {
        accessorKey: "patientName",
        header: ({ column }) => <SortableHeader column={column} title="Patient" />,
        cell: ({ row }) => {
          const rx = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(rx.patientName)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{rx.patientName}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "doctorName",
        header: ({ column }) => <SortableHeader column={column} title="Doctor" />,
        cell: ({ row }) => (
          <span className="text-sm">{row.original.doctorName}</span>
        ),
      },
      {
        accessorKey: "date",
        header: ({ column }) => <SortableHeader column={column} title="Date" />,
        cell: ({ row }) => (
          <span className="text-sm">{formatDate(row.original.date)}</span>
        ),
      },
      {
        accessorKey: "diagnosis",
        header: "Diagnosis",
        cell: ({ row }) => (
          <span className="text-sm max-w-[200px] truncate block">
            {row.original.diagnosis}
          </span>
        ),
      },
      {
        id: "medications",
        header: "Medications",
        cell: ({ row }) => (
          <Badge variant="secondary">
            {row.original.medications.length} med{row.original.medications.length !== 1 ? "s" : ""}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedPrescription(row.original);
              setDetailOpen(true);
            }}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        ),
      },
    ],
    []
  );

  const handleSubmitPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Prescription created successfully");
    setFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prescriptions"
        description="Manage patient prescriptions and medications"
      >
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Prescription
        </Button>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          columns={columns}
          data={prescriptions}
          searchKey="patientName"
          searchPlaceholder="Search by patient name..."
        />
      </motion.div>

      {/* Prescription Detail Sheet */}
      <FormSheet
        open={detailOpen}
        onOpenChange={setDetailOpen}
        title="Prescription Details"
        description={
          selectedPrescription
            ? `${selectedPrescription.patientName} - ${formatDate(selectedPrescription.date)}`
            : ""
        }
      >
        {selectedPrescription && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Doctor</p>
              <p className="font-medium">{selectedPrescription.doctorName}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Diagnosis</p>
              <p className="font-medium">{selectedPrescription.diagnosis}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium">
                Medications ({selectedPrescription.medications.length})
              </p>
              <div className="space-y-3">
                {selectedPrescription.medications.map((med, i) => (
                  <Card key={i}>
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <Pill className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-medium text-sm">{med.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Dosage: {med.dosage}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Frequency: {med.frequency}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Duration: {med.duration}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedPrescription.notes && (
              <>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPrescription.notes}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </FormSheet>

      {/* New Prescription Form Sheet */}
      <FormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        title="New Prescription"
        description="Create a new prescription for a patient"
      >
        <form onSubmit={handleSubmitPrescription} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rx-patient">Patient</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rx-doctor">Doctor</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name} - {d.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rx-diagnosis">Diagnosis</Label>
            <Input id="rx-diagnosis" placeholder="Enter diagnosis" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Medication</Label>
            <div className="space-y-3 p-3 border rounded-lg">
              <Input placeholder="Medication name" />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Dosage (e.g. 500mg)" />
                <Input placeholder="Frequency (e.g. Twice daily)" />
              </div>
              <Input placeholder="Duration (e.g. 7 days)" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rx-notes">Notes</Label>
            <Textarea id="rx-notes" placeholder="Additional notes..." />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Prescription</Button>
          </div>
        </form>
      </FormSheet>
    </div>
  );
}
