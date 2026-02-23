"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, Users, ArrowRight, GitBranch } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { tournaments } from "@/data/sports";

export default function TournamentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tournaments"
        description="View tournament brackets, schedules, and results"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament, index) => {
          const totalMatches = tournament.bracket.length;
          const completedMatches = tournament.bracket.filter((m) => m.winner !== null).length;
          const progress = totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0;
          const totalRounds = Math.max(...tournament.bracket.map((m) => m.round));

          return (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{tournament.sport}</Badge>
                    <StatusBadge status={tournament.status} />
                  </div>
                  <CardTitle className="text-lg">{tournament.name}</CardTitle>
                  <CardDescription className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        Participants
                      </span>
                      <span className="font-medium">{tournament.teams.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <GitBranch className="h-3.5 w-3.5" />
                        Rounds
                      </span>
                      <span className="font-medium">{totalRounds}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Trophy className="h-3.5 w-3.5" />
                        Matches
                      </span>
                      <span className="font-medium">
                        {completedMatches}/{totalMatches} completed
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {tournament.status === "completed" && (
                      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                            Winner:{" "}
                            {tournament.bracket.find(
                              (m) =>
                                m.round === totalRounds && m.matchNumber === 1
                            )?.winner || "TBD"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link href={`/sports/tournaments/${tournament.id}`}>
                    <Button variant="outline" className="w-full gap-2">
                      View Bracket
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
