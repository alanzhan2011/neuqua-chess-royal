import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Calendar, Info } from "lucide-react";
import photoLesson from "../assets/Copy_of_20260127_151044.jpg.asset.json";
import photoGames from "../assets/Copy_of_20260127_160101.jpg.asset.json";
import photoRoom from "../assets/Copy_of_20250909_151522.jpg.asset.json";

const photos = [
  { src: photoLesson.url, alt: "Club members analyzing an endgame study on the classroom smartboard" },
  { src: photoGames.url, alt: "Two members playing a rated game while others compete in the background" },
  { src: photoRoom.url, alt: "A full room of Neuqua Valley Chess members playing at a weekly meeting" },
];


export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meetings — Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "Neuqua Valley Chess Club meets Tuesdays and Thursdays, 3:15 PM to 4:30 PM in Room D200 at Neuqua Valley High School.",
      },
      { property: "og:title", content: "Meetings — Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "Tuesdays and Thursdays, 3:15 PM – 4:30 PM, Room D200. Drop in anytime — all skill levels welcome.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/meetings" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/meetings" }],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  return (
    <div className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">Meetings</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Come to the Next Meeting
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Drop in anytime. Bring a friend, bring your board, or just bring your curiosity.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Clock className="h-7 w-7" />
            </div>
            <h2 className="font-display text-xl font-semibold text-card-foreground">When</h2>
            <p className="mt-3 text-muted-foreground">Tuesdays &amp; Thursdays</p>
            <p className="font-medium text-foreground">3:15 PM – 4:30 PM</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-7 w-7" />
            </div>
            <h2 className="font-display text-xl font-semibold text-card-foreground">Where</h2>
            <p className="mt-3 text-muted-foreground">Neuqua Valley High School</p>
            <p className="font-medium text-foreground">Room D200</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Calendar className="h-7 w-7" />
            </div>
            <h2 className="font-display text-xl font-semibold text-card-foreground">Upcoming</h2>
            <p className="mt-3 text-muted-foreground">Club Championship</p>
            <p className="font-medium text-foreground">November 15, 2026</p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {photos.map((p) => (
            <div key={p.src} className="overflow-hidden rounded-xl border border-border shadow-sm">
              <img
                src={p.src}
                alt={p.alt}
                width={1920}
                height={1080}
                loading="lazy"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl bg-muted p-8">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Info className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-foreground">What a Meeting Looks Like</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>Casual and rated games, paired by skill level.</li>
            <li>Short tactics or opening lesson on most Thursdays.</li>
            <li>Post-game analysis with teammates and officers.</li>
            <li>Boards, clocks, and sets are provided — bring nothing but yourself.</li>
          </ul>
          <div className="mt-8">
            <Link
              to="/join"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Join the Club
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
