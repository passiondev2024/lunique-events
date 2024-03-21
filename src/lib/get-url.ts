import { env } from "@/env.mjs";

export const getImageUrl = (key: string) =>
  `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/${key}`;
