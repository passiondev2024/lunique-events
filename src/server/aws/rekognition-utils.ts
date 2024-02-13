import { env } from "@/env.mjs";
import {
  CreateCollectionCommand,
  DeleteCollectionCommand,
  IndexFacesCommand,
  type RekognitionClient,
} from "@aws-sdk/client-rekognition";
import { TRPCError } from "@trpc/server";

export const createCollection = async (
  client: RekognitionClient,
  id: string,
) => {
  const createCollectionCommand = new CreateCollectionCommand({
    CollectionId: id,
  });

  const collection = await client.send(createCollectionCommand);

  if (collection.StatusCode !== 200) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to create AWS rekognition collection",
    });
  }

  return collection;
};

export const deleteCollection = async (
  client: RekognitionClient,
  id: string,
) => {
  const deleteCollectionCommand = new DeleteCollectionCommand({
    CollectionId: id,
  });
  const response = await client.send(deleteCollectionCommand);

  console.log("[REKOGNITION_DELETE_COLLECTION]", response);

  if (response.StatusCode !== 200) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to delete AWS rekognition collection",
    });
  }

  return response.$metadata;
};

export const indexImage = async (
  client: RekognitionClient,
  collectionId: string,
  key: string,
) => {
  const indexFacesCommand = new IndexFacesCommand({
    CollectionId: collectionId,
    Image: {
      S3Object: {
        Bucket: env.BUCKET_NAME,
        Name: key,
      },
    },
  });

  const response = await client.send(indexFacesCommand);

  console.log("[REKOGNITION_INDEX_RES]", response);

  // TODO: figure out what happen when there are no faces on image

  if (response.$metadata.httpStatusCode !== 200) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to index image",
    });
  }

  if (!response.FaceRecords) {
    return [];
  }

  const faces = response.FaceRecords.filter(
    (record) => !!record.Face && !!record.Face.FaceId && !!record.Face.ImageId,
  );

  const facesData = faces.map((record) => ({
    indexedFaceId: record.Face!.FaceId ?? "",
    indexedImageId: record.Face!.ImageId ?? "",
    imageKey: key,
    eventId: collectionId,
  }));

  return facesData;
};
