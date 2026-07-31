import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Users, Trophy, Target, Mail, MapPin, Clock } from "lucide-react";
import heroImage from "../assets/hero-chess.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neuqua Valley Chess | Strategy, Competition, Community" },
      { name: "description", content: "Join Neuqua Valley Chess Club. Weekly meetings, tournaments, lessons, and a community of players at every level." },
      { property: "og:title", content: "Neuqua Valley Chess | Strategy, Competition, Community" },
      { property: "og:description", content: "Join Neuqua Valley Chess Club. Weekly meetings, tournaments, lessons, and a community of players at every level." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Meetings", href: "#meetings" },
  { label: "Join", href: "#join" },
];

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="font-display text-xl font-bold tracking-tight text-foreground">
            Neuqua Valley <span className="text-accent">Chess</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#join"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Join Us
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Golden chess king on a board under dramatic blue lighting"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
            priority="true"
          />
          <div className="absolute inset-0 bg-navy-deep/80" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
          <p className="mb-6 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium tracking-wide text-gold uppercase">
            Neuqua Valley High School
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-cream sm:text-6xl md:text-7xl lg:text-8xl">
            Think Ahead.
            <br />
            <span className="text-gold">Play Bold.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl">
            Strategy, competition, and community for every player. Join the Neuqua Valley Chess Club and make your next move count.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#join"
              className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-base font-semibold text-navy-deep transition-transform hover:scale-105 hover:bg-gold/90"
            >
              Join the Club
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-md border border-cream/30 bg-cream/5 px-6 py-3 text-base font-medium text-cream transition-colors hover:bg-cream/10"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="w-full border-b border-border bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">About the Club</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Where Strategy Meets School Spirit
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Neuqua Valley Chess Club is a welcoming space for students who love the game — or want to learn it. We meet regularly to play casually, sharpen our skills, and compete against schools across the region.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Whether you are chasing a state rating or just looking for a fun lunch game, you will find your place here.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-muted p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">Open to All</h3>
                <p className="mt-2 text-sm text-muted-foreground">No experience required. We pair players by skill level.</p>
              </div>
              <div className="rounded-xl bg-muted p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">Compete & Win</h3>
                <p className="mt-2 text-sm text-muted-foreground">Club tournaments and inter-school matches throughout the year.</p>
              </div>
              <div className="rounded-xl bg-muted p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">Learn Tactics</h3>
                <p className="mt-2 text-sm text-muted-foreground">Lessons on openings, middlegame plans, and endgame technique.</p>
              </div>
              <div className="rounded-xl bg-muted p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">Weekly Events</h3>
                <p className="mt-2 text-sm text-muted-foreground">Consistent meeting times so you can always find a game.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / What We Offer */}
      <section className="w-full bg-navy-deep py-24 text-cream md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-wide text-gold uppercase">What We Do</p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              More Than Just Games
            </h2>
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

      {/* Meetings */}
      <section id="meetings" className="w-full border-b border-border bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">Meetings</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Come to the Next Meeting
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Drop in anytime. Bring a friend, bring your board, or just bring your curiosity.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground">When</h3>
              <p className="mt-3 text-muted-foreground">Tuesdays & Thursdays</p>
              <p className="font-medium text-foreground">3:15 PM – 4:30 PM</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground">Where</h3>
              <p className="mt-3 text-muted-foreground">Neuqua Valley High School</p>
              <p className="font-medium text-foreground">Room B-123</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Calendar className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground">Upcoming</h3>
              <p className="mt-3 text-muted-foreground">Club Championship</p>
              <p className="font-medium text-foreground">November 15, 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section id="join" className="w-full bg-accent py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-accent-foreground md:text-5xl">
            Ready to Make Your Move?
          </h2>
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
            <a
              href="#meetings"
              className="inline-flex items-center justify-center rounded-md border border-navy-deep/30 bg-cream/50 px-8 py-4 text-base font-semibold text-navy-deep transition-colors hover:bg-cream"
            >
              View Meeting Times
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-background py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <a href="/" className="font-display text-lg font-bold tracking-tight text-foreground">
            Neuqua Valley <span className="text-accent">Chess</span>
          </a>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Neuqua Valley Chess Club. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
