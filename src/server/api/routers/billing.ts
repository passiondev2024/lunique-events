import { env } from "@/env.mjs";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { configureLemonSqueezy } from "@/server/billing/lemon-squeeze";
import { syncPlans } from "@/server/billing/sync";
import {
  cancelSubscription,
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const PROFESSIONAL_PLAN_ID = 281950 as const;
const PERSONAL_PLAN_ID = 281951 as const;

export const billingRouter = createTRPCRouter({
  getPlan: publicProcedure
    .input(z.object({ type: z.enum(["personal", "professional"]) }))
    .query(async ({ ctx, input }) => {
      const variantId =
        input.type === "personal" ? PERSONAL_PLAN_ID : PROFESSIONAL_PLAN_ID;

      const plan = await ctx.db.plan.findFirst({
        where: { variantId },
        include: { features: true },
      });

      if (!plan) {
        await syncPlans(ctx.db);
        const syncedPlan = await ctx.db.plan.findFirst({
          where: { variantId },
          include: { features: true },
        });
        if (!syncedPlan) {
          throw new TRPCError({
            message: "Failed to sync LemonSqueezy plans with DB",
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        return syncedPlan;
      }

      return plan;
    }),
  getCurrentPlan: protectedProcedure.query(async ({ ctx }) => {
    const subscription = await ctx.db.subscription.findFirst({
      where: { userId: ctx.session.user.id },
      select: { plan: { include: { features: true } } },
    });

    if (!subscription) {
      throw new TRPCError({
        message: "Subscription not found",
        code: "NOT_FOUND",
      });
    }

    return subscription.plan;
  }),
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.subscription.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        plan: true,
      },
    });
  }),
  cancelSubscription: protectedProcedure
    .input(
      z.object({
        lemonSqueezyId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { lemonSqueezyId } = input;

      configureLemonSqueezy();

      const subscription = await getUserSubscription(
        ctx.db,
        ctx.session.user.id,
      );

      if (!subscription) {
        throw new TRPCError({
          message: "User do not have subscription",
          code: "NOT_FOUND",
        });
      }

      const cancelled = await cancelSubscription(lemonSqueezyId);

      if (cancelled.error) {
        throw new TRPCError({
          message: cancelled.error.message,
          code: "INTERNAL_SERVER_ERROR",
          cause: cancelled.error.cause,
        });
      }

      await ctx.db.subscription.update({
        where: { lemonSqueezyId },
        data: {
          status: cancelled.data?.data.attributes.status,
          statusFormatted: cancelled.data?.data.attributes.status_formatted,
          endsAt: cancelled.data?.data.attributes.ends_at,
        },
      });

      return cancelled.data?.data.attributes;
    }),
  pauseSubscription: protectedProcedure.query(({}) => {
    // TODO
    // - create pause subscriptio helper function
    // - handle webhook event on pause (update user in db)
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),
  getCheckoutUrl: protectedProcedure
    .input(z.object({ variantId: z.number(), embed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { variantId, embed } = input;

      configureLemonSqueezy();

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
            redirectUrl: `http://${env.NEXT_PUBLIC_VERCEL_URL}/account/billing`,
            receiptButtonText: "Go to Dashboard",
            receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
          },
        },
      );

      return checkout.data?.data.attributes.url;
    }),
});

async function getUserSubscription(db: PrismaClient, userId: string) {
  const subscription = await db.subscription.findFirst({
    where: {
      userId,
    },
  });

  if (!subscription) return null;

  return subscription;
}
