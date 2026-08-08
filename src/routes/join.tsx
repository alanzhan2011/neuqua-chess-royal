import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "How to Join | Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "Joining Neuqua Valley Chess takes one step: show up to Room D200 on a Tuesday or Thursday at 3:15. Coach emails and the club Discord are here too.",
      },
      { property: "og:title", content: "How to Join | Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "Show up Tuesday or Thursday in Room D200 at 3:15, or email the coaches. The Discord link is here.",
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
  { n: "1", title: "Just show up", text: "Room D200, Tuesday or Thursday, 3:15. You do not need to tell anyone first." },
  { n: "2", title: "Play someone", text: "We will put you on a board against somebody around your level." },
  { n: "3", title: "Keep coming", text: "After that you can enter the club ladder, tournaments, and team matches." },
];

function JoinPage() {
  return (
    <div>
      <section className="w-full bg-accent py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="font-display text-4xl font-bold tracking-tight text-accent-foreground md:text-5xl">
            Joining is one step
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-accent-foreground/80">
            Walk into D200 after school on a Tuesday or Thursday. That is the whole process. If you would rather ask
            first, email one of the coaches.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="mailto:james_fox@ipsd.org,frank_gambino@ipsd.org?subject=Neuqua%20Valley%20Chess%20Club"
              className="inline-flex items-center justify-center gap-2 bg-navy-deep px-8 py-4 text-base font-semibold text-cream transition-colors hover:bg-navy-deep/90"
            >
              <Mail className="h-5 w-5" />
              Email the coaches
            </a>
            <Link
              to="/meetings"
              className="inline-flex items-center justify-center border border-navy-deep/40 px-8 py-4 text-base font-semibold text-navy-deep transition-colors hover:bg-cream/60"
            >
              Meeting times
            </Link>
          </div>
          <p className="mt-6 text-sm text-accent-foreground/80">
            <a href="mailto:james_fox@ipsd.org" className="font-medium underline underline-offset-4">
              james_fox@ipsd.org
            </a>{" "}
            ·{" "}
            <a href="mailto:frank_gambino@ipsd.org" className="font-medium underline underline-offset-4">
              frank_gambino@ipsd.org
            </a>
          </p>
        </div>
      </section>

      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-px border border-border bg-border md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="bg-card p-8">
                <p className="font-display text-4xl font-bold text-navy">{s.n}</p>
                <h2 className="mt-3 font-display text-xl font-semibold text-card-foreground">{s.title}</h2>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-background pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 border-t border-border pt-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">The club Discord</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                This is where everything happens between meetings — pairings, tournament details, game links, and people
                playing each other online at midnight.
              </p>
            </div>
            <div className="lg:text-right">
              <a
                href="https://discord.gg/Ng3ME6zBqm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageCircle className="h-5 w-5" />
                discord.gg/Ng3ME6zBqm
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
