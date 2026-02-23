"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Star,
  Phone,
  Mail,
  Award,
  Clock,
  CheckCircle,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { therapists } from "@/data/physio";
import { getInitials } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star <= rating
              ? "fill-amber-400/50 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="text-sm font-medium ml-1">{rating}</span>
    </div>
  );
}

export default function TherapistsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Therapists"
        description="Our team of certified physiotherapists and wellness specialists"
      >
        <Button asChild>
          <Link href="/physio">
            <Users className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </Button>
      </PageHeader>

      {/* Therapist Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      >
        {therapists.map((therapist) => (
          <motion.div key={therapist.id} variants={item}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              {/* Gradient Header */}
              <div className="h-24 bg-gradient-to-br from-teal-500 to-emerald-600 relative">
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <Avatar className="h-16 w-16 border-4 border-background">
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                      {getInitials(therapist.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <CardContent className="pt-12 pb-6 text-center space-y-4">
                {/* Name & Status */}
                <div>
                  <h3 className="font-semibold text-lg">{therapist.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {therapist.specialization}
                  </p>
                  <div className="flex justify-center mt-2">
                    <StatusBadge status={therapist.status} />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center">
                  <StarRating rating={therapist.rating} />
                </div>

                {/* Qualification */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  {therapist.qualification}
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">Experience</span>
                    </div>
                    <p className="text-sm font-semibold">
                      {therapist.experience} years
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <CheckCircle className="h-3 w-3" />
                      <span className="text-xs">Sessions</span>
                    </div>
                    <p className="text-sm font-semibold">
                      {therapist.sessionsCompleted.toLocaleString()}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Contact */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {therapist.phone}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {therapist.email}
                  </div>
                </div>

                {/* Action Button */}
                <Button asChild variant="outline" className="w-full mt-2">
                  <Link href={`/physio/therapists/${therapist.id}`}>
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
