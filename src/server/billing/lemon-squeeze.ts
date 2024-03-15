import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

import { env } from "@/env.mjs";

export const configureLemonSqueezy = () => {
  lemonSqueezySetup({
    apiKey: env.LEMONSQUEEZY_API_KEY,
    onError: (error) => {
      throw new Error(`Lemon Squeezy API error: ${error.message}`);
    },
  });
};
