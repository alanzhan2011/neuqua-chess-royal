// The club is in Illinois, so "today" always means a Central-time day.
export const CLUB_TIME_ZONE = "America/Chicago";

export function clubTodayKey(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CLUB_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Noon local so date math never slips across a day boundary.
export function clubTodayDate(): Date {
  return new Date(`${clubTodayKey()}T12:00:00`);
}
