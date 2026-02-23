"use client";

import { motion } from "framer-motion";
import {
  Check,
  Crown,
  Users,
  IndianRupee,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { membershipPlans } from "@/data/gym";
import { formatCurrency } from "@/lib/utils";

const planGradients: Record<string, string> = {
  Basic: "from-gray-500 to-gray-600",
  Silver: "from-slate-400 to-slate-600",
  Gold: "from-amber-400 to-amber-600",
  Platinum: "from-violet-500 to-purple-700",
  Student: "from-blue-400 to-blue-600",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function GymPlansPage() {
  const totalSubscribers = membershipPlans.reduce((sum, p) => sum + p.subscriberCount, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Membership Plans"
        description="Choose the perfect plan for your fitness journey"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {totalSubscribers} total subscribers
        </div>
      </PageHeader>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
      >
        {membershipPlans.map((plan) => (
          <motion.div key={plan.id} variants={item}>
            <Card
              className={`relative h-full hover:shadow-lg transition-shadow ${
                plan.popular ? "border-primary shadow-md ring-1 ring-primary/20" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Crown className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2 pt-6">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${planGradients[plan.name]} mx-auto flex items-center justify-center text-white mb-3`}
                >
                  <IndianRupee className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{formatCurrency(plan.price)}</span>
                  <span className="text-sm text-muted-foreground">/{plan.duration}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{plan.subscriberCount} subscribers</span>
                </div>

                <Separator />

                <ul className="space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full mt-4"
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
