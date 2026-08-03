// Server-only helpers: read the club roster sheet and live chess.com ratings.

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1wpQjFiQBnvtw0Kn-HRbfxezmCIhJonHTZdILNLiUzHs/export?format=csv&gid=0";

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

export type PlayerRating = {
  name: string;
  username: string | null;
  platform: "chess.com" | "lichess" | null;
  rapid: number | null;
  blitz: number | null;
  bullet: number | null;
  uscf: number | null;
  gamesToday: number | null;
};

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

async function fetchChessComRatings(username: string) {
  const res = await fetch(`https://api.chess.com/pub/player/${encodeURIComponent(username)}/stats`, {
    headers: { "User-Agent": "NeuquaValleyChessClubSite/1.0" },
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

async function fetchGamesOnDate(username: string, date: Date): Promise<number | null> {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const res = await fetch(
    `https://api.chess.com/pub/player/${encodeURIComponent(username)}/games/${year}/${month}`,
    { headers: { "User-Agent": "NeuquaValleyChessClubSite/1.0" }, redirect: "follow" },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { games?: Array<{ end_time?: number }> };
  const startOfDay = Date.UTC(year, date.getUTCMonth(), date.getUTCDate()) / 1000;
  const endOfDay = startOfDay + 86400;
  return (data.games ?? []).filter((g) => {
    const t = g.end_time ?? 0;
    return t >= startOfDay && t < endOfDay;
  }).length;
}

function parseDate(value?: string): Date {
  if (value) {
    const [y, m, d] = value.split("-").map(Number);
    if (y && m && d) return new Date(Date.UTC(y, m - 1, d));
  }
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export async function loadPlayerRatings(
  dateInput?: string,
): Promise<{ players: PlayerRating[]; updatedAt: string; date: string }> {
  const date = parseDate(dateInput);
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
      };
      if (!entry?.username || entry.platform !== "chess.com") return base;
      try {
        const [live, gamesToday] = await Promise.all([
          fetchChessComRatings(entry.username),
          fetchGamesOnDate(entry.username, date).catch(() => null),
        ]);
        return { ...base, ...live, gamesToday };
      } catch (error) {
        console.error(`Failed to fetch chess.com ratings for ${entry.username}`, error);
        return base;
      }
    }),
  );

  return {
    players,
    updatedAt: new Date().toISOString(),
    date: date.toISOString().slice(0, 10),
  };
}

