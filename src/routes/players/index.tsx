import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { RefreshCw } from "lucide-react";

import { clubTodayDate } from "@/lib/club-time";
import { DateRangeControls, daysAgo, rangeLabel, type Range } from "@/components/DateRangeControls";
import { getPlayerRatings, getRangeStats } from "@/lib/players.functions";

export const Route = createFileRoute("/players/")({
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
  const [range, setRange] = useState<Range>(() => ({ from: clubTodayDate(), to: clubTodayDate() }));
  const start = toDateKey(range.from);
  const end = toDateKey(range.to);
  const includesToday = end === toDateKey(clubTodayDate());
  const label = rangeLabel(range);

  const ratings = useQuery({
    queryKey: ["player-ratings", end],
    queryFn: () => getPlayerRatings({ data: { date: end } }),
    refetchInterval: includesToday ? 5 * 60 * 1000 : false,
    refetchOnWindowFocus: includesToday,
    staleTime: 60 * 1000,
  });

  const gamesQuery = useQuery({
    queryKey: ["player-range-stats", start, end],
    queryFn: () => getRangeStats({ data: { start, end } }),
    refetchInterval: includesToday ? 5 * 60 * 1000 : false,
    refetchOnWindowFocus: includesToday,
    staleTime: 60 * 1000,
  });

  const isPending = ratings.isPending;
  const isFetching = ratings.isFetching || gamesQuery.isFetching;
  const players = ratings.data?.players ?? [];
  const gamesByName = new Map((gamesQuery.data?.players ?? []).map((p) => [p.name, p.totalGames]));
  const gamesFor = (name: string) => (gamesQuery.data ? (gamesByName.get(name) ?? 0) : null);

  const totalGames = (gamesQuery.data?.players ?? []).reduce((sum, p) => sum + p.totalGames, 0);
  const activePlayers = (gamesQuery.data?.players ?? []).filter((p) => p.totalGames > 0);

  return (
    <div>
      <section className="w-full bg-accent py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-display text-4xl font-bold tracking-tight text-accent-foreground md:text-5xl">
            Players and ratings
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-accent-foreground/80">
            The roster, with USCF ratings and live chess.com rapid, blitz, and bullet numbers. Pick a day or a range of
            days to see how many games each person played.
          </p>
        </div>
      </section>

      <section className="w-full bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <DateRangeControls range={range} onChange={setRange} label="Games played" />
            <Link
              to="/players/stats"
              className="ml-auto border border-border px-4 py-2 text-sm font-semibold text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Rating stats and graph
            </Link>
          </div>

          <div className="mb-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-card p-8">
              <p className="text-sm font-semibold tracking-wide text-navy uppercase">Games played</p>
              <p className="font-display mt-2 text-5xl font-bold text-navy tabular-nums">
                {gamesQuery.isPending ? "—" : totalGames}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{label}, across all members on chess.com</p>
            </div>
            <div className="bg-card p-8">
              <p className="text-sm font-semibold tracking-wide text-navy uppercase">Members active</p>
              <p className="font-display mt-2 text-5xl font-bold text-navy tabular-nums">
                {gamesQuery.isPending ? "—" : activePlayers.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Played at least one game, {label}</p>
            </div>
            <div className="bg-card p-8">
              <p className="text-sm font-semibold tracking-wide text-navy uppercase">Most games</p>
              <p className="mt-2 text-sm leading-relaxed text-card-foreground">
                {gamesQuery.isPending || activePlayers.length === 0
                  ? `Nobody logged a game ${label}.`
                  : [...activePlayers]
                      .sort((a, b) => b.totalGames - a.totalGames)
                      .slice(0, 3)
                      .map((p) => `${p.name} (${p.totalGames})`)
                      .join(", ")}
              </p>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {isPending
                ? "Loading live ratings…"
                : ratings.dataUpdatedAt
                  ? `Last updated ${new Date(ratings.dataUpdatedAt).toLocaleTimeString()}`
                  : ""}
            </p>
            {isFetching && !isPending ? (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" /> Updating
              </span>
            ) : null}
          </div>

          {ratings.error ? (
            <p className="border border-border bg-card p-6 text-muted-foreground">
              Ratings did not load this time. They try again automatically.
            </p>
          ) : (
            <div className="overflow-x-auto border border-border bg-card">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3 text-left font-semibold">Player</th>
                    <th className="px-4 py-3 text-left font-semibold">Username</th>
                    <th className="px-4 py-3 text-right font-semibold">USCF</th>
                    <th className="px-4 py-3 text-right font-semibold">Rapid</th>
                    <th className="px-4 py-3 text-right font-semibold">Blitz</th>
                    <th className="px-4 py-3 text-right font-semibold">Bullet</th>
                    <th className="px-4 py-3 text-right font-semibold">Games</th>
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
                          className="underline-offset-4 transition-colors hover:text-navy hover:underline"
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
                              className="underline-offset-4 transition-colors hover:text-navy hover:underline"
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
                      <Cell value={gamesFor(p.name)} />
                    </tr>
                  ))}
                  {isPending
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="border-b border-border/60 last:border-0">
                          <td colSpan={7} className="px-4 py-3">
                            <div className="h-4 w-full animate-pulse bg-muted" />
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Rapid, blitz, and bullet come straight from the chess.com public API. USCF ratings come from the club's
            rating sheet. Click a name to look it up on the US Chess site.
          </p>
        </div>
      </section>
    </div>
  );
}
