import {
  CreateCollectionCommand,
  DeleteCollectionCommand,
  IndexFacesCommand,
  ListFacesCommand,
  type RekognitionClient,
  SearchFacesByImageCommand,
} from "@aws-sdk/client-rekognition";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { env } from "@/env.mjs";

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

export const listFaces = async (
  client: RekognitionClient,
  collectionId: string,
) => {
  const listFacesCommand = new ListFacesCommand({
    CollectionId: collectionId,
  });

  const response = await client.send(listFacesCommand);

  if (response.$metadata.httpStatusCode !== 200) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to list faces",
    });
  }

  return response.Faces;
};

const searchFacesByImage = async (
  client: RekognitionClient,
  collectionId: string,
  imageKey: string,
) => {
  const searchFacesByImage = new SearchFacesByImageCommand({
    CollectionId: collectionId,
    FaceMatchThreshold: 90,
    Image: {
      S3Object: {
        Bucket: env.BUCKET_NAME,
        Name: imageKey,
      },
    },
  });

  const response = await client.send(searchFacesByImage);

  if (response.$metadata.httpStatusCode !== 200) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to search faces by image",
    });
  }

  console.log(response);

  response.FaceMatches?.forEach((faceMatch) => console.log(faceMatch.Face));

  return response.FaceMatches;
};

export const findImages = async (
  prisma: PrismaClient,
  rekognition: RekognitionClient,
  collectionId: string,
  imageKey: string,
) => {
  const faces = await searchFacesByImage(rekognition, collectionId, imageKey);

  if (!faces) return [];

  const faceIds = faces
    .map((face) => (face.Face?.FaceId ? face.Face.FaceId : ""))
    .filter((face) => !!face);

  const foundFaces = await prisma.face.findMany({
    where: {
      indexedFaceId: {
        in: faceIds,
      },
    },
  });

  const keys = foundFaces.map((face) => face.imageKey);

  const images = await prisma.image.findMany({
    where: {
      key: {
        in: keys,
      },
    },
  });

  return images;
};
