import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { getPlayerRatings } from "../lib/players.functions";

export const Route = createFileRoute("/players")({
  head: () => ({
    meta: [
      { title: "Players & Ratings — Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "Live USCF and chess.com ratings for every member of the Neuqua Valley Chess Club, updated automatically.",
      },
      { property: "og:title", content: "Players & Ratings — Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "Live USCF and chess.com ratings for the Neuqua Valley Chess Club roster.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/players" }],
  }),
  component: PlayersPage,
});

function Cell({ value }: { value: number | null }) {
  return (
    <td className="px-4 py-3 text-right tabular-nums text-card-foreground">
      {value ?? <span className="text-muted-foreground">—</span>}
    </td>
  );
}

// US Chess member search by name — opens the player's rating page on the current US Chess site.
function uscfSearchUrl(name: string) {
  const query = name.trim().toLowerCase().replace(/\s+/g, "+");
  return `https://ratings.uschess.org/?fuzzy=${query}`;
}

function toDateKey(d: Date) {
  return format(d, "yyyy-MM-dd");
}

function PlayersPage() {
  const [date, setDate] = useState<Date>(() => new Date());
  const dateKey = toDateKey(date);
  const isToday = dateKey === toDateKey(new Date());

  const { data, isPending, isFetching, dataUpdatedAt, error } = useQuery({
    queryKey: ["player-ratings", dateKey],
    queryFn: () => getPlayerRatings({ data: { date: dateKey } }),
    refetchInterval: isToday ? 5 * 60 * 1000 : false,
    refetchOnWindowFocus: isToday,
    staleTime: 60 * 1000,
  });

  const players = data?.players ?? [];
  const totalGamesToday = players.reduce((sum, p) => sum + (p.gamesToday ?? 0), 0);
  const activePlayers = players.filter((p) => (p.gamesToday ?? 0) > 0);
  const dayLabel = isToday ? "today" : format(date, "MMM d, yyyy");


  return (
    <div>
      <section className="w-full bg-accent py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-display text-4xl font-bold tracking-tight text-accent-foreground md:text-5xl">
            Players and ratings
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-accent-foreground/80">
            The roster, with USCF ratings and live chess.com rapid, blitz, and bullet numbers. Pick a date to see how
            many games each person played that day.
          </p>
        </div>
      </section>


      <section className="w-full bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-card-foreground">Games played on</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-[240px] justify-start text-left font-normal")}
                >
                  <CalendarIcon />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  disabled={{ after: new Date() }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            {!isToday ? (
              <Button variant="ghost" size="sm" onClick={() => setDate(new Date())}>
                Back to today
              </Button>
            ) : null}
          </div>

          <div className="mb-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-card p-8">
              <p className="text-sm font-semibold tracking-wide text-navy uppercase">
                Games played {dayLabel}
              </p>
              <p className="font-display mt-2 text-5xl font-bold text-navy tabular-nums">
                {isPending ? "—" : totalGamesToday}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Across all members on chess.com</p>
            </div>
            <div className="bg-card p-8">
              <p className="text-sm font-semibold tracking-wide text-navy uppercase">Members active</p>
              <p className="font-display mt-2 text-5xl font-bold text-navy tabular-nums">
                {isPending ? "—" : activePlayers.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Played at least one game {dayLabel}</p>
            </div>
            <div className="bg-card p-8">
              <p className="text-sm font-semibold tracking-wide text-navy uppercase">Most games</p>
              <p className="mt-2 text-sm leading-relaxed text-card-foreground">
                {isPending || activePlayers.length === 0
                  ? `Nobody logged a game ${dayLabel}.`
                  : [...activePlayers]
                      .sort((a, b) => (b.gamesToday ?? 0) - (a.gamesToday ?? 0))
                      .slice(0, 3)
                      .map((p) => `${p.name} (${p.gamesToday})`)
                      .join(", ")}
              </p>
            </div>
          </div>


          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {isPending
                ? "Loading live ratings…"
                : dataUpdatedAt
                  ? `Last updated ${new Date(dataUpdatedAt).toLocaleTimeString()}`
                  : ""}
            </p>
            {isFetching && !isPending ? (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" /> Updating
              </span>
            ) : null}
          </div>


          {error ? (
            <p className="rounded-lg border border-border bg-card p-6 text-muted-foreground">
              Ratings are temporarily unavailable. They'll refresh automatically.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3 text-left font-semibold">Player</th>
                    <th className="px-4 py-3 text-left font-semibold">Username</th>
                    <th className="px-4 py-3 text-right font-semibold">USCF</th>
                    <th className="px-4 py-3 text-right font-semibold">Rapid</th>
                    <th className="px-4 py-3 text-right font-semibold">Blitz</th>
                    <th className="px-4 py-3 text-right font-semibold">Bullet</th>
                    <th className="px-4 py-3 text-right font-semibold">
                      {isToday ? "Today" : format(date, "MMM d")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(isPending ? [] : players).map((p) => (
                    <tr key={p.name} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-3 font-medium text-card-foreground">
                        <a
                          href={uscfSearchUrl(p.name)}
                          target="_blank"
                          rel="noreferrer"
                          title={`View ${p.name}'s USCF rating page`}
                          className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                        >
                          {p.name}
                        </a>
                      </td>

                      <td className="px-4 py-3 text-muted-foreground">
                        {p.username ? (
                          p.platform === "chess.com" ? (
                            <a
                              href={`https://www.chess.com/member/${p.username}`}
                              target="_blank"
                              rel="noreferrer"
                              className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                            >
                              {p.username}
                            </a>
                          ) : (
                            p.username
                          )
                        ) : (
                          "—"
                        )}
                      </td>
                      <Cell value={p.uscf} />
                      <Cell value={p.rapid} />
                      <Cell value={p.blitz} />
                      <Cell value={p.bullet} />
                      <Cell value={p.gamesToday} />
                    </tr>
                  ))}
                  {isPending
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="border-b border-border/60 last:border-0">
                          <td colSpan={7} className="px-4 py-3">
                            <div className="h-4 w-full animate-pulse rounded bg-muted" />
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Rapid, blitz, and bullet come live from the chess.com public API. USCF ratings come from the
            club's live rating sheet.
          </p>
        </div>
      </section>
    </div>
  );
}
