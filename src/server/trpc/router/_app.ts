import { router } from "../trpc";
import { itemRouter } from "./example";

export const appRouter = router({
  item: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
