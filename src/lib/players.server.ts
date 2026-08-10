// Server-only helpers: read the club roster sheet and live chess.com ratings.

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1wpQjFiQBnvtw0Kn-HRbfxezmCIhJonHTZdILNLiUzHs/export?format=csv&gid=0";

// The club is in Illinois, so "today" means a Central-time day, not a UTC one.
const CLUB_TIME_ZONE = "America/Chicago";

// Club members, in roster order. Only these names are shown on the site.
export const ROSTER = [
  "Adarsh Girish",
  "Carter Hanninen",
  "Alan Zhan",
  "Adwik Sharma",
  "Jonah Thomas",
  "Karl Nguyen",
  "Sagar Raut",
  "Rohit Fuldeore",
  "Waylen Xiong",
  "Aditya Raut",
  "Suhana Sharad",
  "Arnav P",
  "Jishnu Sriraman",
  "Rishaan Chowdury",
] as const;

export type CategoryKey = "rapid" | "blitz" | "bullet";

export type CategoryDay = {
  games: number;
  wins: number;
  losses: number;
  draws: number;
  start: number | null;
  end: number | null;
  delta: number | null;
};

export type PlayerRating = {
  name: string;
  username: string | null;
  platform: "chess.com" | "lichess" | null;
  rapid: number | null;
  blitz: number | null;
  bullet: number | null;
  uscf: number | null;
  gamesToday: number | null;
  day: Record<CategoryKey, CategoryDay> | null;
};

function emptyDay(): CategoryDay {
  return { games: 0, wins: 0, losses: 0, draws: 0, start: null, end: null, delta: null };
}

function emptyDayMap(): Record<CategoryKey, CategoryDay> {
  return { rapid: emptyDay(), blitz: emptyDay(), bullet: emptyDay() };
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") field += c;
  }
  row.push(field);
  rows.push(row);
  return rows;
}

function normalizeName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function parseUscf(value: string): number | null {
  // Sheet stores e.g. "1778 => 1829" or "1164 (P20) => 1219"; take the latest value.
  const latest = value.includes("=>") ? value.split("=>").pop()! : value;
  const match = latest.match(/\d{3,4}/);
  return match ? Number(match[0]) : null;
}

type SheetEntry = { username: string | null; platform: PlayerRating["platform"]; uscf: number | null };

async function fetchSheet(): Promise<Map<string, SheetEntry>> {
  const map = new Map<string, SheetEntry>();
  // Cache-bust so Google always serves the newest USCF Live values.
  const res = await fetch(`${SHEET_CSV_URL}&cb=${Date.now()}`, {
    redirect: "follow",
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  });
  if (!res.ok) return map;
  const rows = parseCsv(await res.text());
  for (const row of rows.slice(1)) {
    const name = (row[0] ?? "").trim();
    if (!name) continue;
    const rawUser = (row[1] ?? "").trim();
    const username = rawUser ? rawUser.replace(/\((cc|lc)\)/i, "").trim() : null;
    const platform: PlayerRating["platform"] = !username
      ? null
      : /\(lc\)/i.test(rawUser)
        ? "lichess"
        : "chess.com";
    map.set(normalizeName(name), {
      username: username || null,
      platform,
      uscf: parseUscf(row[5] ?? ""),
    });
  }
  return map;
}

type ChessComStats = Record<string, { last?: { rating?: number } } | undefined>;

const UA = { "User-Agent": "NeuquaValleyChessClubSite/1.0" };

async function fetchChessComRatings(username: string) {
  const res = await fetch(`https://api.chess.com/pub/player/${encodeURIComponent(username)}/stats`, {
    headers: UA,
    redirect: "follow",
  });
  if (!res.ok) return { rapid: null, blitz: null, bullet: null };
  const stats = (await res.json()) as ChessComStats;
  const pick = (key: string) => stats[key]?.last?.rating ?? null;
  return {
    rapid: pick("chess_rapid"),
    blitz: pick("chess_blitz"),
    bullet: pick("chess_bullet"),
  };
}

// ---- time zone helpers ----------------------------------------------------

function zoneOffsetMs(instant: number, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts: Record<string, number> = {};
  for (const p of dtf.formatToParts(new Date(instant))) {
    if (p.type !== "literal") parts[p.type] = Number(p.value);
  }
  const asUtc = Date.UTC(
    parts["year"]!,
    (parts["month"] ?? 1) - 1,
    parts["day"] ?? 1,
    (parts["hour"] ?? 0) % 24,
    parts["minute"] ?? 0,
    parts["second"] ?? 0,
  );
  return asUtc - instant;
}

// Epoch ms for local midnight of y-m-d in the club's time zone.
function zonedStartOfDay(y: number, m: number, d: number): number {
  const naive = Date.UTC(y, m - 1, d);
  let ts = naive - zoneOffsetMs(naive, CLUB_TIME_ZONE);
  // Re-resolve once in case the first guess landed on the other side of a DST shift.
  ts = naive - zoneOffsetMs(ts, CLUB_TIME_ZONE);
  return ts;
}

function todayKeyInZone(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CLUB_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function resolveDay(value?: string): { key: string; startSec: number; endSec: number } {
  const key = value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : todayKeyInZone();
  const [y, m, d] = key.split("-").map(Number) as [number, number, number];
  const start = zonedStartOfDay(y, m, d);
  const end = zonedStartOfDay(y, m, d + 1);
  return { key, startSec: Math.floor(start / 1000), endSec: Math.floor(end / 1000) };
}

// ---- chess.com game archives --------------------------------------------

type ArchiveGame = {
  end_time?: number;
  time_class?: string;
  rules?: string;
  white?: { username?: string; rating?: number; result?: string };
  black?: { username?: string; rating?: number; result?: string };
};

function monthsToFetch(startSec: number, endSec: number): Array<{ y: number; m: number }> {
  const seen = new Set<string>();
  const out: Array<{ y: number; m: number }> = [];
  // Cover both UTC months the local day can touch.
  for (const ts of [startSec, endSec - 1]) {
    const d = new Date(ts * 1000);
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + 1;
    const key = `${y}-${m}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push({ y, m });
    }
  }
  return out;
}

async function fetchArchiveMonth(username: string, y: number, m: number): Promise<ArchiveGame[]> {
  const res = await fetch(
    `https://api.chess.com/pub/player/${encodeURIComponent(username)}/games/${y}/${String(m).padStart(2, "0")}`,
    { headers: UA, redirect: "follow", cache: "no-store" },
  );
  if (!res.ok) return [];
  const data = (await res.json()) as { games?: ArchiveGame[] };
  return data.games ?? [];
}

const CATEGORY_BY_TIME_CLASS: Record<string, CategoryKey> = {
  rapid: "rapid",
  blitz: "blitz",
  bullet: "bullet",
};

async function fetchDayBreakdown(
  username: string,
  startSec: number,
  endSec: number,
): Promise<{ total: number; day: Record<CategoryKey, CategoryDay> }> {
  const months = monthsToFetch(startSec, endSec);
  const lists = await Promise.all(months.map((mm) => fetchArchiveMonth(username, mm.y, mm.m)));
  const games = lists
    .flat()
    .filter((g) => (g.rules ?? "chess") === "chess")
    .sort((a, b) => (a.end_time ?? 0) - (b.end_time ?? 0));

  const day = emptyDayMap();
  // Rating right before the day started, per category (used as the day's baseline).
  const priorRating: Partial<Record<CategoryKey, number>> = {};
  const lower = username.toLowerCase();

  for (const g of games) {
    const category = CATEGORY_BY_TIME_CLASS[g.time_class ?? ""];
    if (!category) continue;
    const isWhite = (g.white?.username ?? "").toLowerCase() === lower;
    const me = isWhite ? g.white : g.black;
    const rating = me?.rating ?? null;
    const end = g.end_time ?? 0;

    if (end < startSec) {
      if (rating != null) priorRating[category] = rating;
      continue;
    }
    if (end >= endSec) continue;

    const bucket = day[category];
    bucket.games += 1;
    const result = me?.result ?? "";
    if (result === "win") bucket.wins += 1;
    else if (result === "agreed" || result === "repetition" || result === "stalemate" ||
             result === "insufficient" || result === "50move" || result === "timevsinsufficient")
      bucket.draws += 1;
    else bucket.losses += 1;

    if (rating != null) {
      if (bucket.start == null) bucket.start = priorRating[category] ?? rating;
      bucket.end = rating;
    }
  }

  for (const key of ["rapid", "blitz", "bullet"] as CategoryKey[]) {
    const b = day[key];
    b.delta = b.start != null && b.end != null ? b.end - b.start : null;
  }

  const total = day.rapid.games + day.blitz.games + day.bullet.games;
  return { total, day };
}

export async function loadPlayerRatings(
  dateInput?: string,
): Promise<{ players: PlayerRating[]; updatedAt: string; date: string }> {
  const { key, startSec, endSec } = resolveDay(dateInput);
  let sheet = new Map<string, SheetEntry>();
  try {
    sheet = await fetchSheet();
  } catch (error) {
    console.error("Failed to read roster sheet", error);
  }

  const players = await Promise.all(
    ROSTER.map(async (name): Promise<PlayerRating> => {
      const entry = sheet.get(normalizeName(name));
      const base: PlayerRating = {
        name,
        username: entry?.username ?? null,
        platform: entry?.platform ?? null,
        rapid: null,
        blitz: null,
        bullet: null,
        uscf: entry?.uscf ?? null,
        gamesToday: null,
        day: null,
      };
      if (!entry?.username || entry.platform !== "chess.com") return base;
      try {
        const [live, breakdown] = await Promise.all([
          fetchChessComRatings(entry.username),
          fetchDayBreakdown(entry.username, startSec, endSec).catch(() => null),
        ]);
        return {
          ...base,
          ...live,
          gamesToday: breakdown?.total ?? null,
          day: breakdown?.day ?? null,
        };
      } catch (error) {
        console.error(`Failed to fetch chess.com ratings for ${entry.username}`, error);
        return base;
      }
    }),
  );

  return {
    players,
    updatedAt: new Date().toISOString(),
    date: key,
  };
}

// ---- multi-day range ------------------------------------------------------

function dayKeyInZone(ts: number): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CLUB_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(ts * 1000));
}

function monthsInRange(startSec: number, endSec: number): Array<{ y: number; m: number }> {
  const out: Array<{ y: number; m: number }> = [];
  const first = new Date(startSec * 1000);
  let y = first.getUTCFullYear();
  let m = first.getUTCMonth() + 1;
  const last = new Date((endSec - 1) * 1000);
  const ly = last.getUTCFullYear();
  const lm = last.getUTCMonth() + 1;
  while (y * 12 + m <= ly * 12 + lm && out.length < 36) {
    out.push({ y, m });
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out;
}

export type RangeCategoryTotals = {
  games: number;
  wins: number;
  losses: number;
  draws: number;
  delta: number;
};

export type RangeDay = {
  date: string;
  rapid: number;
  blitz: number;
  bullet: number;
  games: number;
};

export type RangePlayer = {
  name: string;
  username: string | null;
  totals: Record<CategoryKey, RangeCategoryTotals>;
  totalGames: number;
  netDelta: number;
  perDay: Record<string, { rapid: number; blitz: number; bullet: number; games: number }>;
};

function emptyTotals(): RangeCategoryTotals {
  return { games: 0, wins: 0, losses: 0, draws: 0, delta: 0 };
}

function dayKeyList(startKey: string, endKey: string): string[] {
  const keys: string[] = [];
  const [sy, sm, sd] = startKey.split("-").map(Number) as [number, number, number];
  let cursor = Date.UTC(sy, sm - 1, sd);
  for (let i = 0; i < 400; i++) {
    const d = new Date(cursor);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(
      d.getUTCDate(),
    ).padStart(2, "0")}`;
    keys.push(key);
    if (key >= endKey) break;
    cursor += 86400000;
  }
  return keys;
}

async function fetchRangeForPlayer(
  username: string,
  startSec: number,
  endSec: number,
): Promise<Pick<RangePlayer, "totals" | "totalGames" | "netDelta" | "perDay">> {
  const months = monthsInRange(startSec, endSec);
  const lists = await Promise.all(months.map((mm) => fetchArchiveMonth(username, mm.y, mm.m)));
  const games = lists
    .flat()
    .filter((g) => (g.rules ?? "chess") === "chess")
    .sort((a, b) => (a.end_time ?? 0) - (b.end_time ?? 0));

  const totals: Record<CategoryKey, RangeCategoryTotals> = {
    rapid: emptyTotals(),
    blitz: emptyTotals(),
    bullet: emptyTotals(),
  };
  const perDay: RangePlayer["perDay"] = {};
  // Rating going into the current day, per category.
  const runningBase: Partial<Record<CategoryKey, number>> = {};
  const lower = username.toLowerCase();

  for (const g of games) {
    const category = CATEGORY_BY_TIME_CLASS[g.time_class ?? ""];
    if (!category) continue;
    const isWhite = (g.white?.username ?? "").toLowerCase() === lower;
    const me = isWhite ? g.white : g.black;
    const rating = me?.rating ?? null;
    const end = g.end_time ?? 0;

    if (end < startSec) {
      if (rating != null) runningBase[category] = rating;
      continue;
    }
    if (end >= endSec) break;

    const key = dayKeyInZone(end);
    const bucket = (perDay[key] ??= { rapid: 0, blitz: 0, bullet: 0, games: 0 });
    const t = totals[category];
    t.games += 1;
    bucket.games += 1;
    const result = me?.result ?? "";
    if (result === "win") t.wins += 1;
    else if (
      result === "agreed" ||
      result === "repetition" ||
      result === "stalemate" ||
      result === "insufficient" ||
      result === "50move" ||
      result === "timevsinsufficient"
    )
      t.draws += 1;
    else t.losses += 1;

    if (rating != null) {
      const base = runningBase[category];
      if (base != null) {
        const gain = rating - base;
        t.delta += gain;
        bucket[category] += gain;
      }
      runningBase[category] = rating;
    }
  }

  const totalGames = totals.rapid.games + totals.blitz.games + totals.bullet.games;
  const netDelta = totals.rapid.delta + totals.blitz.delta + totals.bullet.delta;
  return { totals, totalGames, netDelta, perDay };
}

export async function loadRangeStats(
  startInput: string,
  endInput: string,
): Promise<{
  start: string;
  end: string;
  updatedAt: string;
  days: RangeDay[];
  players: RangePlayer[];
}> {
  const a = resolveDay(startInput);
  const b = resolveDay(endInput);
  const [startDay, endDay] = a.key <= b.key ? [a, b] : [b, a];
  const startSec = startDay.startSec;
  const endSec = endDay.endSec;

  let sheet = new Map<string, SheetEntry>();
  try {
    sheet = await fetchSheet();
  } catch (error) {
    console.error("Failed to read roster sheet", error);
  }

  const players = await Promise.all(
    ROSTER.map(async (name): Promise<RangePlayer> => {
      const entry = sheet.get(normalizeName(name));
      const base: RangePlayer = {
        name,
        username: entry?.username ?? null,
        totals: { rapid: emptyTotals(), blitz: emptyTotals(), bullet: emptyTotals() },
        totalGames: 0,
        netDelta: 0,
        perDay: {},
      };
      if (!entry?.username || entry.platform !== "chess.com") return base;
      try {
        const data = await fetchRangeForPlayer(entry.username, startSec, endSec);
        return { ...base, ...data };
      } catch (error) {
        console.error(`Failed to fetch range stats for ${entry.username}`, error);
        return base;
      }
    }),
  );

  const days: RangeDay[] = dayKeyList(startDay.key, endDay.key).map((date) => {
    let rapid = 0;
    let blitz = 0;
    let bullet = 0;
    let games = 0;
    for (const p of players) {
      const d = p.perDay[date];
      if (!d) continue;
      rapid += d.rapid;
      blitz += d.blitz;
      bullet += d.bullet;
      games += d.games;
    }
    return { date, rapid, blitz, bullet, games };
  });

  return {
    start: startDay.key,
    end: endDay.key,
    updatedAt: new Date().toISOString(),
    days,
    players,
  };
}
