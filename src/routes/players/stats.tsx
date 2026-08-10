import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, RefreshCw } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import { clubTodayDate } from "@/lib/club-time";
import { DateRangeControls, daysAgo, rangeLabel, type Range } from "@/components/DateRangeControls";
import { getRangeStats } from "@/lib/players.functions";

export const Route = createFileRoute("/players/stats")({
  head: () => ({
    meta: [
      { title: "Rating Stats — Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "Rating gain over any stretch of days for every Neuqua Valley Chess member, split by rapid, blitz, and bullet.",
      },
      { property: "og:title", content: "Rating Stats — Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "Rapid, blitz, and bullet rating change per player over the date range you pick.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/players/stats" }],
  }),
  component: PlayerStatsPage,
});

const CATEGORIES = [
  { key: "rapid", label: "Rapid", color: "var(--navy)" },
  { key: "blitz", label: "Blitz", color: "var(--gold)" },
  { key: "bullet", label: "Bullet", color: "var(--chart-4)" },
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
  const [range, setRange] = useState<Range>(() => ({ from: daysAgo(6), to: clubTodayDate() }));
  const start = toDateKey(range.from);
  const end = toDateKey(range.to);
  const includesToday = end === toDateKey(clubTodayDate());

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["player-range-stats", start, end],
    queryFn: () => getRangeStats({ data: { start, end } }),
    refetchInterval: includesToday ? 5 * 60 * 1000 : false,
    refetchOnWindowFocus: includesToday,
    staleTime: 60 * 1000,
  });

  const players = (data?.players ?? []).filter((p) => p.totalGames > 0).sort((a, b) => b.netDelta - a.netDelta);
  const days = data?.days ?? [];
  const label = rangeLabel(range);

  // Cumulative rating change per category, so the lines read as a trend.
  let cr = 0;
  let cb = 0;
  let cu = 0;
  const chartData = days.map((d) => {
    cr += d.rapid;
    cb += d.blitz;
    cu += d.bullet;
    return {
      date: format(new Date(`${d.date}T12:00:00`), "MMM d"),
      rapid: cr,
      blitz: cb,
      bullet: cu,
    };
  });

  const totals = CATEGORIES.map((c) => {
    const net = players.reduce((sum, p) => sum + p.totals[c.key].delta, 0);
    const games = players.reduce((sum, p) => sum + p.totals[c.key].games, 0);
    const count = players.filter((p) => p.totals[c.key].games > 0).length;
    return { ...c, net, games, playerCount: count };
  });

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
            Rating gain over time
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-accent-foreground/80">
            Pick a single day or a stretch of days. The chart tracks the team's running rating change in rapid, blitz,
            and bullet. Numbers come from each player's chess.com game archive.
          </p>
          <Link
            to="/players"
            className="mt-8 inline-flex items-center gap-2 border-2 border-accent-foreground px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-foreground hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back to games and ratings
          </Link>
        </div>
      </section>

      <section className="w-full bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <DateRangeControls range={range} onChange={setRange} />
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
                  {isPending ? "" : `${t.games} games from ${t.playerCount} members, ${label}`}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-10 border border-border bg-card p-6">
            <h2 className="font-display text-xl font-bold text-card-foreground">
              Running rating change, {label}
            </h2>
            <div className="mt-6 h-[340px] w-full">
              {isPending ? (
                <div className="h-full w-full animate-pulse bg-muted" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: -12 }}>
                    <CartesianGrid stroke="var(--border)" vertical={false} />
                    <XAxis
                      dataKey="date"
                      stroke="var(--muted-foreground)"
                      tick={{ fontSize: 12 }}
                      tickMargin={8}
                      minTickGap={16}
                    />
                    <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} width={56} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: 0,
                        color: "var(--card-foreground)",
                      }}
                    />
                    <Legend />
                    {CATEGORIES.map((c) => (
                      <Line
                        key={c.key}
                        type="monotone"
                        dataKey={c.key}
                        name={c.label}
                        stroke={c.color}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
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
                    <th className="px-4 py-3 text-right font-semibold">Net</th>
                    <th className="px-4 py-3 text-right font-semibold">Games</th>
                    <th className="px-4 py-3 text-right font-semibold">W-L-D</th>
                  </tr>
                </thead>
                <tbody>
                  {(isPending ? [] : players).map((p) => {
                    const w = CATEGORIES.reduce((s, c) => s + p.totals[c.key].wins, 0);
                    const l = CATEGORIES.reduce((s, c) => s + p.totals[c.key].losses, 0);
                    const d = CATEGORIES.reduce((s, c) => s + p.totals[c.key].draws, 0);
                    return (
                      <tr key={p.name} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3 font-medium text-card-foreground">{p.name}</td>
                        {CATEGORIES.map((c) => (
                          <td key={c.key} className="px-4 py-3 text-right">
                            {p.totals[c.key].games > 0 ? (
                              <Delta value={p.totals[c.key].delta} />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-right font-semibold">
                          <Delta value={p.netDelta} />
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-card-foreground">{p.totalGames}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                          {`${w}-${l}-${d}`}
                        </td>
                      </tr>
                    );
                  })}
                  {isPending
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="border-b border-border/60 last:border-0">
                          <td colSpan={7} className="px-4 py-3">
                            <div className="h-4 w-full animate-pulse bg-muted" />
                          </td>
                        </tr>
                      ))
                    : null}
                  {!isPending && players.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-muted-foreground">
                        No games logged in this range yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          )}

          {!isPending && players.length > 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Biggest gain, {label}: {players[0]!.name} ({players[0]!.netDelta > 0 ? "+" : ""}
              {players[0]!.netDelta} across {players[0]!.totalGames} games).
            </p>
          ) : null}

          <p className="mt-4 text-xs text-muted-foreground">
            A day runs midnight to midnight Central time. Rating change for a category is the sum of the swings from
            each game in the range, so it lines up with what chess.com shows.
          </p>
        </div>
      </section>
    </div>
  );
}
