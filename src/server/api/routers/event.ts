import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createEventSchema } from "@/validation/create-event";
import { eventSettingsSchema } from "@/validation/event-settings";

export const eventRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      where: {
        ownerId: ctx.session?.user.id,
      },
    });
  }),
  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.event.findFirst({ where: { id: input.id } });
    }),
  settings: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.eventSettings.findUnique({
        where: { eventId: input.id },
        include: { event: true },
      });
    }),
  updateSettings: protectedProcedure
    .input(
      eventSettingsSchema.partial().extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.update({
        where: {
          id: input.id,
          ownerId: ctx.session.user.id,
        },
        data: {
          eventSettings: {
            update: {
              isPublic: input.isPublic,
              isWatermarkHidden: input.isWatermarkHidden,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.create({
        data: {
          ...input,
          ownerId: ctx.session.user.id,
          eventSettings: {
            create: {
              isPublic: true,
              isWatermarkHidden: false,
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      createEventSchema.partial().extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.update({
        where: {
          id: input.id,
          ownerId: ctx.session.user.id,
        },
        data: {
          name: input.name,
          date: input.date,
          location: input.location,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.event.delete({
        where: {
          ownerId: ctx.session.user.id,
          id: input.id,
        },
      });
    }),
});
