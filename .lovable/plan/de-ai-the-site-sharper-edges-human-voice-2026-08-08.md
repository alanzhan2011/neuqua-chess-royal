# De-AI the Site: Sharper Edges, Human Voice

Goal: make the site read and look like a real high school club made it — plain, specific writing and a flatter, harder-edged layout instead of the soft rounded-card look.

## Visual changes

- Set the global radius to 0 so nothing rounds: cards, images, buttons, the date picker, the nav CTA. Remove `rounded-*` classes from page sections and use square edges with thin borders instead.
- Drop the drop shadows (`shadow-sm`, hover `shadow-md`) and the hover scale/lift effects on the sectionals photo, NCTV17 card, and buttons. Keep only simple color/underline hover states.
- Replace the "pill" badges (the gold `30 Years · Est. 1996` capsule, uppercase gold eyebrow labels) with plain small-caps or a simple label above a rule line.
- Tighten spacing: the current `py-24 md:py-32` on every band is very uniform. Vary section padding and drop the perfectly symmetric 3-stat grid on the sectionals section into a plain inline list.
- Header: keep it white, but square the "Join Us" button and use a solid underline for the active nav item.
- Footer: single line, plain text, no centered three-column symmetry.

## Copy rewrite (the bigger change)

Rewrite the marketing-sounding lines across Home, About, Meetings, and Join in a plainer voice — shorter sentences, concrete details, no em-dash-heavy triplets, no "community built around the board" abstractions.

Examples of the direction:
- Hero: instead of "Three decades of players, rivalries, and championships. The board is still set — come make your next move part of our story." → something like "The club started in 1996. We still meet twice a week in D200, and anyone can walk in."
- Sectionals: drop "Every point came from preparation — countless hours of openings study, tactics drills, and post-game analysis." → state what actually happened (won sectionals at Glenbard West, went on to state).
- About: replace "More Than Just a Club" abstractions with what a member actually does in a week.
- Join: keep the 3 steps but write them like a person ("Just show up. Room D200, Tuesday or Thursday after school.").
- Remove filler stat cards that don't mean anything (e.g. "8 boards competing" framing) or label them accurately.

Facts stay exactly as they are: 30 years, 1st at IHSA sectionals, 5th at state, Alan Zhan 6–1, Steven Bozue and Carter Hanninen 5 wins + a draw, D200 3:15–4:30 Tue/Thu, coach emails, Discord link, YMCA video, NCTV17 article link.

## Not changing

- Colors and fonts stay (navy/gold, Space Grotesk + DM Sans).
- Players page data logic, chess.com fetching, USCF links, and the date picker keep working exactly as-is; only its visual chrome gets squared off.
- No layout restructuring of which content lives on which page.

## Technical notes

- `--radius` in `src/styles.css` set to `0rem`; `@theme inline` radius scale then resolves flat, so shadcn components (popover, calendar, button) square off automatically.
- Files touched: `src/styles.css`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`, `src/routes/index.tsx`, `src/routes/about.tsx`, `src/routes/meetings.tsx`, `src/routes/join.tsx`, and presentation-only edits in `src/routes/players.tsx`.
- Route `head()` descriptions get the same plainer wording, keeping titles under 60 chars and descriptions under 160.
