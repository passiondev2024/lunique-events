import * as z from "zod";

export const validatePhotoId = (photoId: string | null, length: number) => {
  if (!photoId) return null;

  const photoIdSchema = z
    .number()
    .min(0)
    .max(length - 1);
  const parse = photoIdSchema.safeParse(parseInt(photoId));

  return parse.success;
};
