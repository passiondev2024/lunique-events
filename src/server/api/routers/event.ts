import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createEventSchema } from "@/validation/create-event";
import { eventSettingsSchema } from "@/validation/event-settings";
import { ImageType } from "@prisma/client";
import { env } from "@/env.mjs";
import { deleteS3EventFolder } from "@/server/aws/s3-utils";
import {
  createCollection,
  deleteCollection,
  indexImage,
} from "@/server/aws/rekognition-utils";
import { TRPCError } from "@trpc/server";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";

export const eventRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      where: {
        ownerId: ctx.session?.user.id,
      },
    });
  }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.event.findFirst({
        where: { id: input.id },
        include: { images: { take: 1 } },
      });
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
      const event = await ctx.db.event.create({
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

      await createCollection(ctx.rekognition, event.id);

      return event;
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
  getImagesCount: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.image.count({
        where: {
          eventId: input.eventId,
        },
      });
    }),
  getImages: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
        limit: z.number().optional(),
        cursor: z.number().optional(),
        skip: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { eventId, cursor, limit } = input;

      const images = await ctx.db.image.findMany({
        where: {
          eventId: eventId,
        },
        take: limit ? limit + 1 : undefined,
        skip: cursor,
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (limit && images.length > limit) {
        images.pop();
        nextCursor = cursor && limit ? cursor + limit : limit;
      }

      return {
        images,
        nextCursor,
      };
    }),
  addImages: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        images: z.array(
          z.object({
            key: z.string(),
            name: z.string(),
            type: z.enum([ImageType.JPG, ImageType.PNG]),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { images, eventId } = input;

      const data = images.map((image) => ({
        key: image.key,
        eventId,
        name: image.name,
        url: `${env.AWS_CLOUDFRONT_DOMAIN}/${image.key}`,
        type: image.type,
      }));

      return await ctx.db.image.createMany({
        data,
      });
    }),
  deleteImages: protectedProcedure
    .input(
      z.object({
        images: z
          .object({
            id: z.string(),
            key: z.string(),
          })
          .array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { images } = input;

      if (images.length === 0)
        throw new TRPCError({ message: "No image IDs", code: "BAD_REQUEST" });

      return await ctx.db.$transaction(async (tx) => {
        const deleteObjectsCommand = new DeleteObjectsCommand({
          Bucket: env.BUCKET_NAME,
          Delete: { Objects: images.map((img) => ({ Key: img.key })) },
        });

        const res = await tx.image.deleteMany({
          where: {
            id: {
              in: images.map((img) => img.id),
            },
          },
        });

        const s3Res = await ctx.s3.send(deleteObjectsCommand);

        if (s3Res.$metadata.httpStatusCode !== 200) {
          throw new TRPCError({
            message: "Failed to delete S3 objects",
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        return res;
      });
    }),
  indexImage: protectedProcedure
    .input(z.object({ eventId: z.string(), imageKey: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { imageKey, eventId } = input;

      const data = await indexImage(ctx.rekognition, eventId, imageKey);

      return await ctx.db.face.createMany({
        data,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      await deleteCollection(ctx.rekognition, id);
      await deleteS3EventFolder(ctx.s3, ctx.session.user.id, id);

      return await ctx.db.event.delete({
        where: {
          ownerId: ctx.session.user.id,
          id: input.id,
        },
      });
    }),
});
