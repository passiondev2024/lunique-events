import {
  DeleteObjectsCommand,
  type DeleteObjectsCommandInput,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const s3Router = createTRPCRouter({
  getPresignedUrl: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { s3 } = ctx;
      const { key } = input;

      const putObjectCommand = new PutObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: key,
        // TODO: delete after 1 day, solution below doesn't work
        // Expires: deleteAfter ? addDays(new Date(), deleteAfter) : undefined,
      });

      return await getSignedUrl(s3, putObjectCommand);
    }),
  deleteEventImages: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: if there is more than 1000 images we need to loop and delete
      // TODO: delete images from CloudFrond CDN
      // TODO: move to event.delete
      const { userId, eventId } = input;

      const prefix = `user-${userId}/event-${eventId}/`;

      const listObjectsCommand = new ListObjectsV2Command({
        Bucket: env.BUCKET_NAME,
        Prefix: prefix,
      });

      const listObjectsRes = await ctx.s3.send(listObjectsCommand);

      if (listObjectsRes.$metadata.httpStatusCode !== 200) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "S3 folder does not exist or AWS error",
        });
      }

      if (listObjectsRes.Contents?.length === 0) {
        return { count: 0, objects: [] };
      }

      const deleteOptions: DeleteObjectsCommandInput = {
        Bucket: env.BUCKET_NAME,
        Delete: { Objects: [] },
      };

      listObjectsRes.Contents?.forEach(({ Key }) =>
        deleteOptions.Delete?.Objects?.push({ Key }),
      );

      const deleteObjectsCommand = new DeleteObjectsCommand(deleteOptions);

      const deleteObjectsRes = await ctx.s3.send(deleteObjectsCommand);

      if (deleteObjectsRes.$metadata.httpStatusCode !== 200) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "S3 folder does not exist",
        });
      }

      return deleteObjectsRes.Deleted ?? [];
    }),
});
