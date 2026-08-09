import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { getPlayerRatings } from "../lib/players.functions";

export const Route = createFileRoute("/players/stats")({
  head: () => ({
    meta: [
      { title: "Daily Rating Stats — Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "Day-by-day chess.com rating gain for every Neuqua Valley Chess member, split by rapid, blitz, and bullet.",
      },
      { property: "og:title", content: "Daily Rating Stats — Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "Rapid, blitz, and bullet rating change per player for any day you pick.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/players/stats" }],
  }),
  component: PlayerStatsPage,
});

const CATEGORIES = [
  { key: "rapid", label: "Rapid" },
  { key: "blitz", label: "Blitz" },
  { key: "bullet", label: "Bullet" },
] as const;

function Delta({ value }: { value: number | null }) {
  if (value == null) return <span className="text-muted-foreground">—</span>;
  const sign = value > 0 ? "+" : "";
  return (
    <span className={cn("tabular-nums", value > 0 ? "text-navy" : value < 0 ? "text-destructive" : "")}>
      {sign}
      {value}
    </span>
  );
}

function toDateKey(d: Date) {
  return format(d, "yyyy-MM-dd");
}

function PlayerStatsPage() {
  const [date, setDate] = useState<Date>(() => new Date());
  const dateKey = toDateKey(date);
  const isToday = dateKey === toDateKey(new Date());

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["player-ratings", dateKey],
    queryFn: () => getPlayerRatings({ data: { date: dateKey } }),
    refetchInterval: isToday ? 5 * 60 * 1000 : false,
    refetchOnWindowFocus: isToday,
    staleTime: 60 * 1000,
  });

  const players = (data?.players ?? []).filter((p) => p.day);
  const dayLabel = isToday ? "today" : format(date, "MMM d, yyyy");

  const totals = CATEGORIES.map((c) => {
    const rows = players.filter((p) => (p.day?.[c.key].games ?? 0) > 0);
    const net = rows.reduce((sum, p) => sum + (p.day?.[c.key].delta ?? 0), 0);
    const games = rows.reduce((sum, p) => sum + (p.day?.[c.key].games ?? 0), 0);
    return { ...c, net, games, playerCount: rows.length };
  });

  const movers = [...players]
    .map((p) => ({
      name: p.name,
      net: CATEGORIES.reduce((sum, c) => sum + (p.day?.[c.key].delta ?? 0), 0),
      games: CATEGORIES.reduce((sum, c) => sum + (p.day?.[c.key].games ?? 0), 0),
    }))
    .filter((p) => p.games > 0)
    .sort((a, b) => b.net - a.net);

  return (
    <div>
      <section className="w-full bg-accent py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent-foreground/70 uppercase">
            <Link to="/players" className="underline-offset-4 hover:underline">
              Players
            </Link>{" "}
            / Stats
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-accent-foreground md:text-5xl">
            Rating gain by day
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-accent-foreground/80">
            How much rating the team picked up or dropped on a given day, split into rapid, blitz, and bullet. Numbers
            come from each player's chess.com game archive, so a day only shows up once games are finished.
          </p>
        </div>
      </section>

      <section className="w-full bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-card-foreground">Showing</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal")}>
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
            {isFetching && !isPending ? (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" /> Updating
              </span>
            ) : null}
          </div>

          <div className="mb-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {totals.map((t) => (
              <div key={t.key} className="bg-card p-8">
                <p className="text-sm font-semibold tracking-wide text-navy uppercase">{t.label} net</p>
                <p className="font-display mt-2 text-5xl font-bold tabular-nums text-navy">
                  {isPending ? "—" : `${t.net > 0 ? "+" : ""}${t.net}`}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isPending ? "" : `${t.games} games from ${t.playerCount} members ${dayLabel}`}
                </p>
              </div>
            ))}
          </div>

          {error ? (
            <p className="border border-border bg-card p-6 text-muted-foreground">
              Stats did not load this time. They try again automatically.
            </p>
          ) : (
            <div className="overflow-x-auto border border-border bg-card">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3 text-left font-semibold">Player</th>
                    {CATEGORIES.map((c) => (
                      <th key={c.key} className="px-4 py-3 text-right font-semibold">
                        {c.label} +/−
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right font-semibold">Games</th>
                    <th className="px-4 py-3 text-right font-semibold">W-L-D</th>
                  </tr>
                </thead>
                <tbody>
                  {(isPending ? [] : players).map((p) => {
                    const games = CATEGORIES.reduce((s, c) => s + (p.day?.[c.key].games ?? 0), 0);
                    const w = CATEGORIES.reduce((s, c) => s + (p.day?.[c.key].wins ?? 0), 0);
                    const l = CATEGORIES.reduce((s, c) => s + (p.day?.[c.key].losses ?? 0), 0);
                    const d = CATEGORIES.reduce((s, c) => s + (p.day?.[c.key].draws ?? 0), 0);
                    return (
                      <tr key={p.name} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3 font-medium text-card-foreground">{p.name}</td>
                        {CATEGORIES.map((c) => (
                          <td key={c.key} className="px-4 py-3 text-right">
                            {(p.day?.[c.key].games ?? 0) > 0 ? (
                              <Delta value={p.day?.[c.key].delta ?? null} />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-right tabular-nums text-card-foreground">{games}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                          {games ? `${w}-${l}-${d}` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                  {isPending
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="border-b border-border/60 last:border-0">
                          <td colSpan={6} className="px-4 py-3">
                            <div className="h-4 w-full animate-pulse bg-muted" />
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          )}

          {!isPending && movers.length > 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Biggest gain {dayLabel}: {movers[0]!.name} ({movers[0]!.net > 0 ? "+" : ""}
              {movers[0]!.net} across {movers[0]!.games} games).
            </p>
          ) : null}

          <p className="mt-4 text-xs text-muted-foreground">
            A day runs midnight to midnight Central time. The baseline for each category is the rating after that
            player's last game before the day started, so the change lines up with what chess.com shows.
          </p>
        </div>
      </section>
    </div>
  );
}
