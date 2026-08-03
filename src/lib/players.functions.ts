import { createServerFn } from "@tanstack/react-start";

export const getPlayerRatings = createServerFn({ method: "GET" })
  .inputValidator((input: { date?: string } | undefined) => input ?? {})
  .handler(async ({ data }) => {
    const { loadPlayerRatings } = await import("./players.server");
    return loadPlayerRatings(data.date);
  });
