"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { leagues } from "@/data/sports";

export default function LeaguesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leagues & Standings"
        description="Track league standings and results across all sports"
      />

      <Tabs defaultValue={leagues[0].id}>
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-transparent p-0">
          {leagues.map((league) => (
            <TabsTrigger
              key={league.id}
              value={league.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border"
            >
              <Trophy className="h-3.5 w-3.5 mr-1.5" />
              {league.sport}
            </TabsTrigger>
          ))}
        </TabsList>

        {leagues.map((league) => (
          <TabsContent key={league.id} value={league.id} className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-lg">{league.name}</CardTitle>
                      <CardDescription className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(league.startDate)} - {formatDate(league.endDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {league.teams.length} Teams
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{league.sport}</Badge>
                      <StatusBadge status={league.status} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-10 text-center">#</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead className="text-center">P</TableHead>
                          <TableHead className="text-center">W</TableHead>
                          <TableHead className="text-center">L</TableHead>
                          <TableHead className="text-center">D</TableHead>
                          <TableHead className="text-center font-bold">Pts</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {league.teams
                          .sort((a, b) => b.points - a.points)
                          .map((team, index) => (
                            <motion.tr
                              key={team.name}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 }}
                              className={`border-b transition-colors hover:bg-muted/50 ${
                                index === 0
                                  ? "bg-amber-50/50 dark:bg-amber-950/20"
                                  : index === 1
                                  ? "bg-gray-50/50 dark:bg-gray-950/20"
                                  : index === 2
                                  ? "bg-orange-50/30 dark:bg-orange-950/10"
                                  : ""
                              }`}
                            >
                              <TableCell className="text-center">
                                {index === 0 ? (
                                  <span className="text-amber-500 font-bold">1</span>
                                ) : index === 1 ? (
                                  <span className="text-gray-400 font-bold">2</span>
                                ) : index === 2 ? (
                                  <span className="text-orange-400 font-bold">3</span>
                                ) : (
                                  <span className="text-muted-foreground">{index + 1}</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                    {team.name.charAt(0)}
                                  </div>
                                  <span className="font-medium text-sm">{team.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center text-sm">{team.played}</TableCell>
                              <TableCell className="text-center text-sm text-emerald-600 font-medium">
                                {team.won}
                              </TableCell>
                              <TableCell className="text-center text-sm text-red-500 font-medium">
                                {team.lost}
                              </TableCell>
                              <TableCell className="text-center text-sm text-muted-foreground">
                                {team.drawn}
                              </TableCell>
                              <TableCell className="text-center font-bold text-sm">
                                {team.points}
                              </TableCell>
                            </motion.tr>
                          ))}
                      </TableBody>
                    </Table>
                  </div>

                  {league.status === "upcoming" && (
                    <div className="mt-4 p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-sm text-muted-foreground">
                        League starts on {formatDate(league.startDate)}. Standings will be updated
                        once matches begin.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
