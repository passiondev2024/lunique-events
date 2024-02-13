import { env } from "@/env.mjs";
import { RekognitionClient } from "@aws-sdk/client-rekognition";

export const rekognition = new RekognitionClient({
  region: env.REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
