import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const itemRouter = router({
	addItem: publicProcedure
		.input(z.object({
      name: z.string(),
      description: z.string(),
    }))
		.mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.listItem.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
      return item;
    }),
  getItems: publicProcedure
    .query(async ({ ctx }) => {
      const items = await ctx.prisma.listItem.findMany();
      return items;
    }
  ),
  deleteItem: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.listItem.delete({
        where: {
          id: input.id,
        },
      });
      return item;
    }),
}

);

