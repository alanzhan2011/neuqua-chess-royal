import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join — Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "Join the Neuqua Valley Chess Club. New members are always welcome, your first meeting is free, and no experience is needed.",
      },
      { property: "og:title", content: "Join — Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "How to join Neuqua Valley Chess Club — show up Tuesday or Thursday in Room D200, or email the officers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/join" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/join" }],
  }),
  component: JoinPage,
});

const steps = [
  { n: "1", title: "Show up", text: "Come to Room D200 on a Tuesday or Thursday at 3:15 PM. That's it." },
  { n: "2", title: "Play a game", text: "We'll pair you with someone at your level and get you on a board." },
  { n: "3", title: "Stay for the season", text: "Sign up for the ladder, club tournaments, and inter-school matches." },
];

function JoinPage() {
  return (
    <div>
      <section className="w-full bg-accent py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-accent-foreground md:text-5xl">
            Ready to Make Your Move?
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-accent-foreground/80">
            Join the Neuqua Valley Chess Club today. New members are always welcome, and your first meeting is free.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:chess@neuquavalley.org"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-deep px-8 py-4 text-base font-semibold text-cream transition-colors hover:bg-navy-deep/90"
            >
              <Mail className="h-5 w-5" />
              Email the Officers
            </a>
            <Link
              to="/meetings"
              className="inline-flex items-center justify-center rounded-md border border-navy-deep/30 bg-cream/50 px-8 py-4 text-base font-semibold text-navy-deep transition-colors hover:bg-cream"
            >
              View Meeting Times
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <p className="font-display text-4xl font-bold text-accent">{s.n}</p>
              <h2 className="mt-3 font-display text-xl font-semibold text-card-foreground">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
