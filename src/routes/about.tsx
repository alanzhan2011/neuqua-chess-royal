import { createFileRoute } from "@tanstack/react-router";
import { Users, Trophy, Target, Calendar } from "lucide-react";

import photoFocus from "../assets/Turkey_Classic-18.jpg.asset.json";
import photoCoaching from "../assets/Turkey_Classic-6.jpg.asset.json";
import photoWildcat from "../assets/Turkey_Classic-41.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — More Than Just a Club | Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "Neuqua Valley Chess is more than just a club — 30 years of teammates, mentors, and friendships built one game at a time.",
      },
      { property: "og:title", content: "About — More Than Just a Club | Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "Thirty years of Neuqua Valley Chess: a team, a classroom, and a community built around the board.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  { icon: Users, title: "Open to All", text: "No experience required. We pair players by skill level." },
  { icon: Trophy, title: "Compete & Win", text: "Club tournaments and inter-school matches throughout the year." },
  { icon: Target, title: "Learn Tactics", text: "Lessons on openings, middlegame plans, and endgame technique." },
  { icon: Calendar, title: "Weekly Events", text: "Consistent meeting times so you can always find a game." },
];

function AboutPage() {
  return (
    <div>
      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">About the Club</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            More Than Just a Club
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Neuqua Valley Chess is a team, a classroom, and a community. For 30 years we have shared the same boards —
            beginners learning their first opening beside rated players prepping for state. What keeps people coming
            back is not the trophies. It is the people across the table.
          </p>
        </div>
      </section>

      {/* Photo left, text right */}
      <section className="w-full border-t border-border bg-muted/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
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
              Focus You Can Feel
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Tournament rounds are quiet, tense, and completely absorbing. Members learn to sit with a hard position,
              trust their preparation, and play the move they can defend — a habit that follows them well beyond chess.
            </p>
          </div>
        </div>
      </section>

      {/* Text left, photo right */}
      <section className="w-full border-t border-border bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Players Teaching Players
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Nobody figures it out alone. Veterans review games with newer members, break down blunders without
              judgement, and hand down the openings they trust. Every year the club coaches the next one.
            </p>
          </div>
          <div className="order-1 overflow-hidden rounded-2xl border border-border shadow-sm lg:order-2">
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
      <section className="w-full border-t border-border bg-muted/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
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
              Wearing the Wildcat
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              When we travel, we travel as a team. Eight boards, one score — and a section of the room in NV Chess
              hoodies pulling for every last game to finish.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">What We Do</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-xl bg-muted p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
