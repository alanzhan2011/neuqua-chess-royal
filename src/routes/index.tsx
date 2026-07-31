import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import heroImage from "../assets/hero-chess.jpg";
import championsAsset from "../assets/sectional-champions.jpg.asset.json";
import nctvAsset from "../assets/nctv17-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neuqua Valley Chess | Celebrating 30 Years" },
      {
        name: "description",
        content:
          "Neuqua Valley Chess Club celebrates 30 years of strategy, competition, and community — 1st place at IHSA Sectionals and 5th at state.",
      },
      { property: "og:title", content: "Neuqua Valley Chess | Celebrating 30 Years" },
      {
        property: "og:description",
        content:
          "Thirty years of Neuqua Valley Chess — a 1st place IHSA Sectional championship, 5th at state, and chess outreach at the YMCA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Golden chess king on a board under dramatic blue lighting"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-deep/80" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
          <p className="mb-6 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium tracking-wide text-gold uppercase">
            30 Years · Est. 1996
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-7xl">
            Celebrating 30 Years of
            <br />
            <span className="text-gold">Neuqua Valley Chess</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl">
            Three decades of players, rivalries, and championships. The board is still set — come make your next move
            part of our story.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/join"
              className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-base font-semibold text-navy-deep transition-transform hover:scale-105 hover:bg-gold/90"
            >
              Join the Club
            </Link>
            <Link
              to="/meetings"
              className="inline-flex items-center justify-center rounded-md border border-cream/30 bg-cream/5 px-6 py-3 text-base font-medium text-cream transition-colors hover:bg-cream/10"
            >
              Meeting Times
            </Link>
          </div>
        </div>
      </section>

      {/* Sectional champions */}
      <section className="w-full border-b border-border bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <img
                src={championsAsset.url}
                alt="Neuqua Valley Chess team holding the IHSA Sectional Champions plaque"
                width={1920}
                height={1080}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">Championship</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                1st Place at IHSA Sectionals
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Our team took first place at the IHSA Sectional tournament, bringing home the Sectional Champions plaque
                after a full day of hard-fought matches across every board.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Every point came from preparation — countless hours of openings study, tactics drills, and post-game
                analysis at club meetings.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-muted p-5">
                  <p className="font-display text-3xl font-bold text-navy">1st</p>
                  <p className="mt-1 text-sm text-muted-foreground">Sectional finish</p>
                </div>
                <div className="rounded-xl bg-muted p-5">
                  <p className="font-display text-3xl font-bold text-navy">30</p>
                  <p className="mt-1 text-sm text-muted-foreground">Years of chess</p>
                </div>
                <div className="rounded-xl bg-muted p-5">
                  <p className="font-display text-3xl font-bold text-navy">8</p>
                  <p className="mt-1 text-sm text-muted-foreground">Boards competing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5th at state — text left, NCTV17 logo right */}
      <section className="w-full border-b border-border bg-muted/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">State Finals</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                5th Place at the IHSA State Tournament
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                After winning the Glenbard West sectional, Neuqua Valley finished fifth at the two-day IHSA state chess
                tournament — the best finish in program history.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Freshman Alan Zhan went 6–1, while Steven Bozue and Carter Hanninen each added five wins and a draw for
                the Wildcats.
              </p>
              <div className="mt-8">
                <a
                  href="https://www.nctv17.org/sports/waubonsie-valley-finishes-as-team-chess-state-runner-up-neuqua-takes-fifth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Read the article
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-10 shadow-sm">
              <img
                src={nctvAsset.url}
                alt="NCTV17 logo"
                width={62}
                height={65}
                loading="lazy"
                className="h-20 w-auto"
              />
              <p className="text-center text-sm leading-relaxed text-muted-foreground">
                As covered by NCTV17: “Waubonsie Valley finishes as team chess state runner up, Neuqua takes fifth.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YMCA outreach video */}
      <section className="w-full bg-navy-deep py-24 text-cream md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold tracking-wide text-gold uppercase">Community</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Teaching Chess at the YMCA</h2>
              <p className="mt-6 text-lg leading-relaxed text-cream/70">
                Our members volunteer at the local YMCA, teaching kids the rules, tactics, and joy of chess — passing the
                game on to the next generation of players.
              </p>
              <div className="mt-8">
                <a
                  href="https://www.youtube.com/watch?v=0V7UpuerAQw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold/90"
                >
                  Watch on YouTube
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-cream/10 shadow-sm">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/0V7UpuerAQw"
                  title="Neuqua Valley Chess teaching at the YMCA"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
