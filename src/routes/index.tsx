import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Trophy, Target, Calendar, Clock, MapPin } from "lucide-react";
import heroImage from "../assets/hero-chess.jpg";
import championsAsset from "../assets/sectional-champions.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neuqua Valley Chess | Celebrating 30 Years" },
      {
        name: "description",
        content:
          "Neuqua Valley Chess Club celebrates 30 years of strategy, competition, and community — including our 1st place finish at IHSA Sectionals.",
      },
      { property: "og:title", content: "Neuqua Valley Chess | Celebrating 30 Years" },
      {
        property: "og:description",
        content:
          "Thirty years of Neuqua Valley Chess — weekly meetings, lessons, and a 1st place IHSA Sectional championship.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const features = [
  {
    icon: Users,
    title: "All Skill Levels",
    description: "From first-time players to seasoned competitors, everyone has a seat at the board.",
  },
  {
    icon: Trophy,
    title: "Compete",
    description: "Represent Neuqua in local tournaments, ladder matches, and club championships.",
  },
  {
    icon: Target,
    title: "Improve",
    description: "Learn openings, tactics, and endgames through guided lessons and peer analysis.",
  },
  {
    icon: Calendar,
    title: "Weekly Events",
    description: "Regular meetings, casual play nights, and special themed events all year long.",
  },
];

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

      {/* 5th at state */}
      <section className="w-full border-b border-border bg-muted/40 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">State Finals</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            5th Place at the IHSA State Tournament
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            After winning the Glenbard West sectional, Neuqua Valley finished fifth at the two-day IHSA state chess
            tournament — the best finish in program history. Freshman Alan Zhan went 6–1, while Steven Bozue and Carter
            Hanninen each added five wins and a draw for the Wildcats.
          </p>
          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-5 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <img
              src={nctvAsset.url}
              alt="NCTV17 logo"
              width={62}
              height={65}
              loading="lazy"
              className="h-14 w-auto"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              As covered by NCTV17: “Waubonsie Valley finishes as team chess state runner up, Neuqua takes fifth.”
            </p>
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
      </section>


      {/* What we do */}
      <section className="w-full bg-navy-deep py-24 text-cream md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-wide text-gold uppercase">What We Do</p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">More Than Just Games</h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">
              We build skills, friendships, and school pride through every event we host.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-cream/10 bg-cream/5 p-6 transition-colors hover:border-gold/30 hover:bg-cream/[0.07]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-deep">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meeting teaser */}
      <section className="w-full bg-background py-20 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-card-foreground">Meeting Times</h3>
            <p className="mt-3 text-muted-foreground">Tuesdays &amp; Thursdays</p>
            <p className="font-medium text-foreground">3:15 PM – 4:30 PM</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-card-foreground">Where</h3>
            <p className="mt-3 text-muted-foreground">Neuqua Valley High School</p>
            <p className="font-medium text-foreground">Room D200</p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/meetings"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            See full meeting details
          </Link>
        </div>
      </section>
    </div>
  );
}
