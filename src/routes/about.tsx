import { createFileRoute, Link } from "@tanstack/react-router";

import photoFocus from "../assets/Turkey_Classic-18.jpg.asset.json";
import photoCoaching from "../assets/Turkey_Classic-6.jpg.asset.json";
import photoWildcat from "../assets/Turkey_Classic-41.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Club | Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "What the Neuqua Valley Chess Club actually does: two meetings a week in D221, casual and rated games, lessons, and tournaments on weekends.",
      },
      { property: "og:title", content: "About the Club | Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "Two meetings a week, games at every level, and a team that travels to tournaments on weekends.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const week = [
  {
    title: "Tuesday",
    text: "Open play. Officers pair people up so you are not stuck against someone 800 points above you.",
  },
  {
    title: "Thursday",
    text: "Usually a short lesson first — an opening, a tactic, an endgame — then games until 4:30.",
  },
  {
    title: "Some weekends",
    text: "Tournaments. IHSA team matches in the winter, plus open events like the Turkey Classic.",
  },
  {
    title: "Online, all week",
    text: "The Discord keeps going between meetings: pairings, links, and people losing blitz games at 11 PM.",
  },
];

function AboutPage() {
  return (
    <div>
      <section className="w-full bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-3 border-b border-border pb-2 text-sm font-semibold tracking-wide text-navy uppercase">
            About
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            More than just a club
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            It is a room in D221 with about thirty people in it, boards on every table, and a lot of noise until the
            clocks start. Some members are chasing a USCF rating. Some just like having somewhere to be after school.
            Both are fine. The club has run this way for 30 years.
          </p>
        </div>
      </section>

      {/* Photo left, text right */}
      <section className="w-full border-t border-border bg-muted/40 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="border border-border">
            <img
              src={photoFocus.url}
              alt="Neuqua Valley player deep in thought over a tournament board"
              width={1920}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Tournament rounds are quiet
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              A round can run two hours without anyone saying a word. You sit with a position you do not like and you
              have to pick something anyway. That part gets easier the more you do it.
            </p>
          </div>
        </div>
      </section>

      {/* Text left, photo right */}
      <section className="w-full border-t border-border bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Members teach members
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Most of what people learn here comes from the person they just lost to. Games get replayed on the board
              right after they end, blunders and all. The older players hand down the openings they trust, and next year
              somebody else does the same.
            </p>
          </div>
          <div className="order-1 border border-border lg:order-2">
            <img
              src={photoCoaching.url}
              alt="Two Neuqua Valley members reviewing a position together after a game"
              width={1920}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Photo left, text right */}
      <section className="w-full border-t border-border bg-muted/40 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="border border-border">
            <img
              src={photoWildcat.url}
              alt="Neuqua Valley chess member in an NV Chess hoodie making a move"
              width={1280}
              height={1920}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              We travel as a team
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Eight boards, one team score. Which means you can win your game and still be standing in the hallway
              waiting on board 6 to decide the match. Everyone wears the hoodies.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-border bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What a week looks like
          </h2>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
            {week.map((item) => (
              <div key={item.title} className="bg-background p-8">
                <h3 className="font-display text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/meetings"
              className="inline-flex items-center justify-center bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Meeting times
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
