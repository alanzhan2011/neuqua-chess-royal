import { createServerFn } from "@tanstack/react-start";

export const getPlayerRatings = createServerFn({ method: "GET" }).handler(async () => {
  const { loadPlayerRatings } = await import("./players.server");
  return loadPlayerRatings();
});
