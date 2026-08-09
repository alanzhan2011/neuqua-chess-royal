import { createFileRoute, Link } from "@tanstack/react-router";
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
      { title: "Meeting Times | Neuqua Valley Chess" },
      {
        name: "description",
        content:
          "Neuqua Valley Chess meets Tuesdays and Thursdays from 3:15 to 4:30 PM in Room D221. Walk in any week, no sign-up needed.",
      },
      { property: "og:title", content: "Meeting Times | Neuqua Valley Chess" },
      {
        property: "og:description",
        content: "Tuesdays and Thursdays, 3:15 to 4:30 PM, Room D221. Boards and clocks are here, just show up.",
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
    <div className="w-full bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="mb-3 border-b border-border pb-2 text-sm font-semibold tracking-wide text-navy uppercase">
            Meetings
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Tuesdays and Thursdays, D221
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            No sign-up, no dues to pay at the door. Come down after 8th period and find an open board.
          </p>
        </div>

        <dl className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3">
          <div className="bg-card p-8">
            <dt className="text-sm font-semibold tracking-wide text-navy uppercase">Days</dt>
            <dd className="font-display mt-2 text-2xl font-bold text-card-foreground">Tuesday &amp; Thursday</dd>
          </div>
          <div className="bg-card p-8">
            <dt className="text-sm font-semibold tracking-wide text-navy uppercase">Time</dt>
            <dd className="font-display mt-2 text-2xl font-bold text-card-foreground">3:15 – 4:30 PM</dd>
          </div>
          <div className="bg-card p-8">
            <dt className="text-sm font-semibold tracking-wide text-navy uppercase">Room</dt>
            <dd className="font-display mt-2 text-2xl font-bold text-card-foreground">D221</dd>
          </div>
        </dl>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {photos.map((p) => (
            <div key={p.src} className="border border-border">
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

        <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              What actually happens
            </h2>
            <ul className="mt-5 space-y-3 text-lg text-muted-foreground">
              <li>Games start as soon as people sit down. Casual or with a clock, your call.</li>
              <li>Thursdays usually open with a short lesson on the smartboard.</li>
              <li>People replay their games afterward and argue about the critical move.</li>
              <li>Boards, pieces, and clocks are all here. Bring nothing.</li>
            </ul>
          </div>
          <div className="lg:pl-8">
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">First time coming?</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Tell whoever is at the front you have not been before and someone will get you paired with a player around
              your level. If you only half-remember how the knight moves, that is fine — it happens every September.
            </p>
            <div className="mt-8">
              <Link
                to="/join"
                className="inline-flex items-center justify-center bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                How to join
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
