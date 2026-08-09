import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import heroImage from "../assets/hero-chess.jpg";
import championsAsset from "../assets/sectional-champions.jpg.asset.json";
import nctvAsset from "../assets/nctv17-logo.png.asset.json";
import alumni1 from "../assets/Copy_of_20260108_151825.jpg.asset.json";
import alumni2 from "../assets/Copy_of_20260108_151513.jpg.asset.json";
import alumni3 from "../assets/Copy_of_20260108_151831.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neuqua Valley Chess | 30 Years of the Club" },
      {
        name: "description",
        content:
          "Neuqua Valley Chess has been meeting since 1996. This year we won IHSA Sectionals and finished 5th at state. We meet Tuesdays and Thursdays in D221.",
      },
      { property: "og:title", content: "Neuqua Valley Chess | 30 Years of the Club" },
      {
        property: "og:description",
        content:
          "Thirty years of Neuqua Valley Chess: first at IHSA Sectionals, fifth at state, alumni night, and chess lessons at the YMCA.",
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
      <section className="relative flex min-h-screen items-center overflow-hidden">
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
        <div className="relative mx-auto w-full max-w-5xl px-6 py-32">
          <p className="mb-6 border-l-2 border-gold pl-3 text-sm font-medium tracking-wide text-gold uppercase">
            Est. 1996
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-7xl">
            30 years of
            <br />
            <span className="text-gold">Neuqua Valley Chess</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl">
            The club started in 1996 and we still meet twice a week in D221. Some of us are rated, some of us
            learned the rules last month. Everybody gets a game.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/join"
              className="inline-flex items-center justify-center bg-gold px-6 py-3 text-base font-semibold text-navy-deep transition-colors hover:bg-gold/85"
            >
              How to join
            </Link>
            <Link
              to="/meetings"
              className="inline-flex items-center justify-center border border-cream/40 px-6 py-3 text-base font-medium text-cream transition-colors hover:bg-cream/10"
            >
              Meeting times
            </Link>
          </div>
        </div>
      </section>

      {/* Sectional champions */}
      <section className="w-full border-b border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="border border-border">
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
              <p className="mb-3 border-b border-border pb-2 text-sm font-semibold tracking-wide text-navy uppercase">
                Sectionals
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                First place at IHSA Sectionals
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We won the sectional at Glenbard West and took home the plaque. It was a long Saturday — eight boards
                per round, and the team score came down to the last few games to finish.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Winning the sectional is what sent us to the state tournament the following weekend.
              </p>
              <dl className="mt-8 divide-y divide-border border-y border-border">
                <div className="flex items-baseline justify-between py-3">
                  <dt className="text-muted-foreground">Sectional finish</dt>
                  <dd className="font-display text-2xl font-bold text-navy">1st</dd>
                </div>
                <div className="flex items-baseline justify-between py-3">
                  <dt className="text-muted-foreground">Boards per match</dt>
                  <dd className="font-display text-2xl font-bold text-navy">8</dd>
                </div>
                <div className="flex items-baseline justify-between py-3">
                  <dt className="text-muted-foreground">Years of the club</dt>
                  <dd className="font-display text-2xl font-bold text-navy">30</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 5th at state — text left, NCTV17 logo right */}
      <section className="w-full border-b border-border bg-muted/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="mb-3 border-b border-border pb-2 text-sm font-semibold tracking-wide text-navy uppercase">
                State
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Fifth at the IHSA state tournament
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Two days, seven rounds, and a fifth place finish — the best the program has ever done at state.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Freshman Alan Zhan went 6–1. Steven Bozue and Carter Hanninen each finished with five wins and a draw.
              </p>
            </div>
            <a
              href="https://www.nctv17.org/sports/waubonsie-valley-finishes-as-team-chess-state-runner-up-neuqua-takes-fifth/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the NCTV17 article about the state tournament"
              className="group flex flex-col items-center gap-5 border border-border bg-card p-10 transition-colors hover:bg-muted/60"
            >
              <img
                src={nctvAsset.url}
                alt="NCTV17 logo — read the article"
                width={62}
                height={65}
                loading="lazy"
                className="h-20 w-auto"
              />
              <p className="text-center text-sm leading-relaxed text-muted-foreground">
                NCTV17 covered it: “Waubonsie Valley finishes as team chess state runner up, Neuqua takes fifth.”
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline-offset-4 group-hover:underline">
                Read the article <ExternalLink className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* YMCA outreach video */}
      <section className="w-full bg-navy-deep py-20 text-cream md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="border border-cream/20">
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
            <div>
              <p className="mb-3 border-b border-cream/20 pb-2 text-sm font-semibold tracking-wide text-gold uppercase">
                YMCA
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Teaching chess at the YMCA</h2>
              <p className="mt-6 text-lg leading-relaxed text-cream/70">
                Members go over to the local YMCA and teach kids how to play. Mostly the rules and basic tactics, and a
                lot of games where the kids beat us.
              </p>
              <div className="mt-8">
                <a
                  href="https://www.youtube.com/watch?v=0V7UpuerAQw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold px-5 py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold/85"
                >
                  Watch on YouTube
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni night */}
      <section className="w-full border-t border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="mb-3 border-b border-border pb-2 text-sm font-semibold tracking-wide text-navy uppercase">
                Alumni night
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Alumni came back to play the team
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Former players showed up for a night of games against the current roster. Clocks running, handshakes
                first, and a lot of arguing about moves afterward.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Thirty years of the club means a lot of alumni, and nights like this are when they come through the door
                again.
              </p>
            </div>
            <div className="order-1 grid grid-cols-2 gap-3 lg:order-2">
              <div className="col-span-2 border border-border">
                <img
                  src={alumni1.url}
                  alt="A Neuqua Valley chess alumnus and a current player shaking hands before their game"
                  width={1920}
                  height={1080}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="border border-border">
                <img
                  src={alumni2.url}
                  alt="Players facing off across chess boards during alumni night"
                  width={1920}
                  height={1080}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="border border-border">
                <img
                  src={alumni3.url}
                  alt="A full classroom of alumni and current team members playing chess"
                  width={1920}
                  height={1080}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
