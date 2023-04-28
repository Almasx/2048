import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";

export const scoreRouter = createTRPCRouter({
  new: protectedProcedure
    .input(z.object({ score: z.number() }))
    .mutation(async ({ ctx, input: { score } }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      if (score > user!.bestScore) {
        return ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: { bestScore: score },
        });
      }
    }),

  get: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.user.findUnique({ where: { id: ctx.session.user.id } })
  ),
});
