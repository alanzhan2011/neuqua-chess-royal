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
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3 text-left font-semibold">Player</th>
                    <th className="px-4 py-3 text-left font-semibold">Username</th>
                    <th className="px-4 py-3 text-right font-semibold">USCF</th>
                    <th className="px-4 py-3 text-right font-semibold">Rapid</th>
                    <th className="px-4 py-3 text-right font-semibold">Blitz</th>
                    <th className="px-4 py-3 text-right font-semibold">Bullet</th>
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
                    </tr>
                  ))}
                  {isPending
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="border-b border-border/60 last:border-0">
                          <td colSpan={6} className="px-4 py-3">
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
