"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Star,
  Clock,
  IndianRupee,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { doctors } from "@/data/medical";
import { getInitials, formatCurrency } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function MedicalDoctorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctors"
        description="View doctor profiles, specializations, and availability"
      >
        <Button asChild>
          <Link href="/medical/appointments">
            <Stethoscope className="h-4 w-4 mr-2" />
            Book Appointment
          </Link>
        </Button>
      </PageHeader>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {doctors.map((doctor) => (
          <motion.div key={doctor.id} variants={item}>
            <Link href={`/medical/doctors/${doctor.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                        {getInitials(doctor.name.replace("Dr. ", ""))}
                      </AvatarFallback>
                    </Avatar>
                    <StatusBadge status={doctor.status} />
                  </div>

                  {/* Name & Specialization */}
                  <div>
                    <h3 className="font-semibold text-base">{doctor.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {doctor.specialization}
                    </Badge>
                  </div>

                  {/* Qualification */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{doctor.qualification}</span>
                  </div>

                  {/* Experience & Rating */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{doctor.experience} yrs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                  </div>

                  {/* Consultation Fee */}
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium">
                      {formatCurrency(doctor.consultationFee)}
                    </span>
                    <span className="text-muted-foreground">/ consultation</span>
                  </div>

                  {/* Schedule Summary */}
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {Object.keys(doctor.schedule).length} days/week
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
