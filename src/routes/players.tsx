import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

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

function PlayersPage() {
  const { data, isPending, isFetching, dataUpdatedAt, error } = useQuery({
    queryKey: ["player-ratings"],
    queryFn: () => getPlayerRatings(),
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    staleTime: 60 * 1000,
  });

  const players = data?.players ?? [];
  const totalGamesToday = players.reduce((sum, p) => sum + (p.gamesToday ?? 0), 0);
  const activePlayers = players.filter((p) => (p.gamesToday ?? 0) > 0);

  return (
    <div>
      <section className="w-full bg-accent py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-accent-foreground md:text-5xl">
            Players &amp; Ratings
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-accent-foreground/80">
            Our roster with live USCF ratings and chess.com rapid, blitz, and bullet ratings — refreshed
            automatically.
          </p>
        </div>
      </section>

      <section className="w-full bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold tracking-wide text-accent uppercase">Games played today</p>
              <p className="font-display mt-2 text-5xl font-bold text-navy tabular-nums">
                {isPending ? "—" : totalGamesToday}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Across all members on chess.com</p>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-accent uppercase">Members active</p>
              <p className="font-display mt-2 text-5xl font-bold text-navy tabular-nums">
                {isPending ? "—" : activePlayers.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Played at least one game today</p>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-accent uppercase">Most active</p>
              <p className="mt-2 text-sm leading-relaxed text-card-foreground">
                {isPending || activePlayers.length === 0
                  ? "No games logged yet today."
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
                    <th className="px-4 py-3 text-right font-semibold">Today</th>
                  </tr>
                </thead>
                <tbody>
                  {(isPending ? [] : players).map((p) => (
                    <tr key={p.name} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-3 font-medium text-card-foreground">{p.name}</td>
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
