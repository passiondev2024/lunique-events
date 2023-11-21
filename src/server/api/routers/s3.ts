import { z } from "zod";
import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Router = createTRPCRouter({
  getPresignedUrl: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { s3 } = ctx;
      const { key } = input;

      const putObjectCommand = new PutObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: key,
      });

      return await getSignedUrl(s3, putObjectCommand);
    }),
});
