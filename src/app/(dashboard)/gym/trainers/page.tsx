"use client";

import { motion } from "framer-motion";
import {
  Star,
  Users,
  Phone,
  Mail,
  Award,
  Clock,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { trainers } from "@/data/gym";
import { getInitials } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star - 0.5 <= rating
              ? "fill-amber-400/50 text-amber-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm font-medium ml-1">{rating}</span>
    </div>
  );
}

export default function GymTrainersPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Trainers"
        description="Our certified fitness trainers and their specializations"
      >
        <Badge variant="outline" className="text-sm">
          <Users className="h-3.5 w-3.5 mr-1" />
          {trainers.length} Trainers
        </Badge>
      </PageHeader>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {trainers.map((trainer) => (
          <motion.div key={trainer.id} variants={item}>
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground text-lg font-bold">
                      {getInitials(trainer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{trainer.name}</h3>
                      <StatusBadge status={trainer.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{trainer.specialization}</p>
                  </div>
                </div>

                <RatingStars rating={trainer.rating} />

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{trainer.experience} yrs</p>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <Users className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">{trainer.memberCount}</p>
                      <p className="text-xs text-muted-foreground">Members</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{trainer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate">{trainer.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
