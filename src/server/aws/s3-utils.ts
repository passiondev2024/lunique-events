import { env } from "@/env.mjs";
import {
  type DeleteObjectsCommandInput,
  type S3,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { TRPCError } from "@trpc/server";

export const deleteS3EventFolder = async (
  s3: S3,
  userId: string,
  eventId: string,
) => {
  // TODO: if there is more than 1000 images we need to loop and delete
  // TODO: delete images from CloudFrond CDN

  const prefix = `user-${userId}/event-${eventId}/`;

  const listObjectsCommand = new ListObjectsV2Command({
    Bucket: env.BUCKET_NAME,
    Prefix: prefix,
  });

  const listObjectsRes = await s3.send(listObjectsCommand);

  if (listObjectsRes.$metadata.httpStatusCode !== 200) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to list S3 objects",
    });
  }

  const deleteOptions: DeleteObjectsCommandInput = {
    Bucket: env.BUCKET_NAME,
    Delete: { Objects: [] },
  };

  listObjectsRes.Contents?.forEach(
    ({ Key }) => deleteOptions.Delete?.Objects?.push({ Key }),
  );

  const deleteObjectsCommand = new DeleteObjectsCommand(deleteOptions);

  const deleteObjectsRes = await s3.send(deleteObjectsCommand);

  console.log("[DELETE_S3_OBJECTS]", deleteObjectsRes);

  if (deleteObjectsRes.$metadata.httpStatusCode !== 200) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to delete S3 bucket folder",
    });
  }

  return deleteObjectsRes.Deleted ?? [];
};
