# Neuqua Valley Chess — Multi-page site update

## What changes

**1. White top banner (header)**
The fixed nav bar becomes white (light surface) with navy text and gold accent, instead of the current translucent dark bar. It stays fixed and gains a subtle bottom border and shadow so it reads cleanly over the dark hero.

**2. Separate pages instead of one scrolling page**

- `/` — Home: 30-years hero, about highlights, sectional championship section, brief meeting teaser
- `/meetings` — Meeting times, place, upcoming events
- `/about` — Club story, what we do
- `/join` — How to join + contact CTA

Header nav links to Home, Meetings, About, Join, with active-state styling. Footer mirrors the same links.

**3. Hero: celebrating 30 years**
The homepage hero headline changes to a 30th-anniversary message ("Celebrating 30 Years of Neuqua Valley Chess") with a gold "30 Years · Est. 1996" badge, supporting line about three decades of players and competition, and the same Join / Meetings buttons.

**4. Sectional champions section (with your photo)**
New section on the homepage using the uploaded team photo: a two-column layout with the photo on one side and a "1st Place — IHSA Sectional Champions" headline, short paragraph about the team's first-place finish, and a gold stat/plaque accent. The photo is also reused as the page's social preview image.

**5. Meetings page details**

- When: Tuesdays & Thursdays, 3:15 PM – 4:30 PM
- Where: Neuqua Valley High School, **Room D200**
- Upcoming events card retained
Room D200 replaces the old B-123 everywhere it appears.

## Technical notes

- New route files: `src/routes/meetings.tsx`, `src/routes/about.tsx`, `src/routes/join.tsx`; `src/routes/index.tsx` trimmed to home content.
- Shared `Header` and `Footer` components in `src/components/`, rendered in `src/routes/__root.tsx` around `<Outlet />`; navigation uses `<Link to="...">` with `activeProps`.
- Each route gets its own `head()` with unique title, description, og:title, og:description; the home route also gets og:image/twitter:image from the sectional photo's CDN URL.
- The uploaded photo is published via Lovable Assets (CDN pointer JSON in `src/assets/`), not committed as a binary.
- Header white surface added as a semantic token in `src/styles.css` (no hardcoded color classes).