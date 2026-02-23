"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Calendar, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { tournaments } from "@/data/sports";
import type { BracketMatch } from "@/data/sports";

function getRoundLabel(round: number, totalRounds: number): string {
  if (round === totalRounds) return "Final";
  if (round === totalRounds - 1) return "Semi-Finals";
  if (round === totalRounds - 2) return "Quarter-Finals";
  return `Round ${round}`;
}

function MatchCard({ match, isLast }: { match: BracketMatch; isLast: boolean }) {
  const isCompleted = match.winner !== null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "border rounded-lg overflow-hidden w-56 shrink-0",
        isCompleted ? "bg-card" : "bg-muted/30",
        isLast && isCompleted ? "ring-2 ring-amber-400" : ""
      )}
    >
      {/* Team 1 */}
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 border-b",
          match.winner === match.team1
            ? "bg-emerald-50 dark:bg-emerald-950/30"
            : ""
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {match.winner === match.team1 && (
            <Trophy className="h-3 w-3 text-amber-500 shrink-0" />
          )}
          <span
            className={cn(
              "text-sm truncate",
              match.winner === match.team1 ? "font-semibold" : "",
              match.team1 === "TBD" ? "text-muted-foreground italic" : ""
            )}
          >
            {match.team1}
          </span>
        </div>
        <span
          className={cn(
            "text-sm font-mono ml-2 shrink-0",
            match.winner === match.team1 ? "font-bold" : "text-muted-foreground"
          )}
        >
          {match.score1 !== null ? match.score1 : "-"}
        </span>
      </div>

      {/* Team 2 */}
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2",
          match.winner === match.team2
            ? "bg-emerald-50 dark:bg-emerald-950/30"
            : ""
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {match.winner === match.team2 && (
            <Trophy className="h-3 w-3 text-amber-500 shrink-0" />
          )}
          <span
            className={cn(
              "text-sm truncate",
              match.winner === match.team2 ? "font-semibold" : "",
              match.team2 === "TBD" ? "text-muted-foreground italic" : ""
            )}
          >
            {match.team2}
          </span>
        </div>
        <span
          className={cn(
            "text-sm font-mono ml-2 shrink-0",
            match.winner === match.team2 ? "font-bold" : "text-muted-foreground"
          )}
        >
          {match.score2 !== null ? match.score2 : "-"}
        </span>
      </div>

      {/* Match info */}
      <div className="px-3 py-1.5 bg-muted/50 text-center">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          Match {match.matchNumber}
        </span>
      </div>
    </motion.div>
  );
}

export default function TournamentBracketPage() {
  const params = useParams();
  const router = useRouter();
  const tournamentId = params.id as string;

  const tournament = tournaments.find((t) => t.id === tournamentId);

  const rounds = useMemo(() => {
    if (!tournament) return [];
    const totalRounds = Math.max(...tournament.bracket.map((m) => m.round));
    const roundsArr: { label: string; matches: BracketMatch[] }[] = [];
    for (let r = 1; r <= totalRounds; r++) {
      roundsArr.push({
        label: getRoundLabel(r, totalRounds),
        matches: tournament.bracket
          .filter((m) => m.round === r)
          .sort((a, b) => a.matchNumber - b.matchNumber),
      });
    }
    return roundsArr;
  }, [tournament]);

  if (!tournament) {
    return (
      <div className="space-y-6">
        <PageHeader title="Tournament Not Found" description="The requested tournament does not exist">
          <Button variant="outline" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </PageHeader>
      </div>
    );
  }

  const totalRounds = Math.max(...tournament.bracket.map((m) => m.round));
  const finalMatch = tournament.bracket.find(
    (m) => m.round === totalRounds && m.matchNumber === 1
  );

  return (
    <div className="space-y-6">
      <PageHeader title={tournament.name} description={`${tournament.sport} Tournament`}>
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Tournaments
        </Button>
      </PageHeader>

      {/* Tournament Info */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="gap-1">
          <Calendar className="h-3 w-3" />
          {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
        </Badge>
        <Badge variant="outline" className="gap-1">
          <Users className="h-3 w-3" />
          {tournament.teams.length} Participants
        </Badge>
        <StatusBadge status={tournament.status} />
        {tournament.status === "completed" && finalMatch?.winner && (
          <Badge className="gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
            <Trophy className="h-3 w-3" />
            Champion: {finalMatch.winner}
          </Badge>
        )}
      </div>

      {/* Bracket Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tournament Bracket</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-8 min-w-max">
              {rounds.map((round, roundIndex) => (
                <div key={round.label} className="flex flex-col items-center">
                  <h3 className="text-sm font-semibold mb-4 text-center sticky top-0 bg-background py-1 px-3 rounded-full border">
                    {round.label}
                  </h3>
                  <div
                    className="flex flex-col justify-around flex-1 gap-4"
                    style={{
                      minHeight:
                        roundIndex === 0
                          ? "auto"
                          : `${rounds[0].matches.length * 100}px`,
                    }}
                  >
                    {round.matches.map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        isLast={
                          match.round === totalRounds && match.matchNumber === 1
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Participants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {tournament.teams.map((team, index) => {
              const isWinner =
                tournament.status === "completed" && finalMatch?.winner === team;
              const isEliminated =
                tournament.status !== "upcoming" &&
                tournament.bracket.some(
                  (m) =>
                    m.winner !== null &&
                    m.winner !== team &&
                    (m.team1 === team || m.team2 === team)
                ) &&
                !tournament.bracket.some(
                  (m) => m.winner === team && m.round === totalRounds
                );

              return (
                <motion.div
                  key={team}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={cn(
                    "p-3 rounded-lg border flex items-center gap-2",
                    isWinner
                      ? "bg-amber-50 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700"
                      : isEliminated
                      ? "opacity-50"
                      : ""
                  )}
                >
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {team.charAt(0)}
                  </div>
                  <span className={cn("text-sm truncate", isWinner ? "font-semibold" : "")}>
                    {team}
                  </span>
                  {isWinner && <Trophy className="h-3.5 w-3.5 text-amber-500 shrink-0 ml-auto" />}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
