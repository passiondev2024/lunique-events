import { env } from "@/env.mjs";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { syncPlans } from "@/server/billing/sync";
import {
  createCheckout,
  lemonSqueezySetup,
} from "@lemonsqueezy/lemonsqueezy.js";
import { z } from "zod";

export const billingRouter = createTRPCRouter({
  getAllPlans: publicProcedure.query(async ({ ctx }) => {
    let plans = await ctx.db.plan.findMany();

    if (!plans.length) {
      plans = await syncPlans(ctx.db);
    }

    return plans;
  }),
  getCheckoutUrl: protectedProcedure
    .input(z.object({ variantId: z.number(), embed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { variantId, embed } = input;

      lemonSqueezySetup({
        apiKey: env.LEMONSQUEEZY_API_KEY,
        onError: (error) => {
          throw new Error(`Lemon Squeezy API error: ${error.message}`);
        },
      });

      const checkout = await createCheckout(
        env.LEMONSQUEEZY_STORE_ID,
        variantId,
        {
          checkoutOptions: {
            embed,
            media: false,
            logo: !embed,
          },
          checkoutData: {
            email: ctx.session.user.email ?? undefined,
            custom: {
              user_id: ctx.session.user.id,
            },
          },
          productOptions: {
            enabledVariants: [variantId],
            redirectUrl: `http://${env.NEXT_PUBLIC_VERCEL_URL}/events`,
            receiptButtonText: "Go to Dashboard",
            receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
          },
        },
      );

      return checkout.data?.data.attributes.url;
    }),
});
