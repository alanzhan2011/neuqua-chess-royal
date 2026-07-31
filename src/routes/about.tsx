import { createFileRoute } from "@tanstack/react-router";
import { Users, Trophy, Target, Calendar } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "Thirty years of Neuqua Valley Chess: a welcoming club where beginners and rated competitors share the same boards.",
      },
      { property: "og:title", content: "About — Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "How the Neuqua Valley Chess Club grew over 30 years, and what members do every week.",
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
    <div className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">About the Club</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Where Strategy Meets School Spirit
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              For 30 years, Neuqua Valley Chess Club has been a welcoming space for students who love the game — or want
              to learn it. We meet regularly to play casually, sharpen our skills, and compete against schools across
              the region.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Whether you are chasing a state rating or just looking for a fun after-school game, you will find your
              place here.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-xl bg-muted p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
