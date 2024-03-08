import {
  createWebhook,
  getPrice,
  listWebhooks,
} from "@lemonsqueezy/lemonsqueezy.js";
import { configureLemonSqueezy } from "./lemon-squeeze";
import { env } from "@/env.mjs";
import {
  type BillingWebhookEvent,
  type PrismaClient,
  type Subscription,
} from "@prisma/client";
import { webhookHasData, webhookHasMeta } from "@/lib/typeguards";

/**
 * This function will check if a webhook exists on Lemon Squeezy. It will return
 * the webhook if it exists, otherwise it will return undefined.
 */
export async function hasWebhook() {
  configureLemonSqueezy();

  // Check if a webhook exists on Lemon Squeezy.
  const allWebhooks = await listWebhooks({
    filter: { storeId: env.LEMONSQUEEZY_STORE_ID },
  });

  // Check if WEBHOOK_URL ends with a slash. If not, add it.
  let webhookUrl = env.LEMONSQUEEZY_WEBHOOK_URL;
  if (!webhookUrl.endsWith("/")) {
    webhookUrl += "/";
  }
  webhookUrl += "api/billing/webhook";

  const webhook = allWebhooks.data?.data.find(
    (wh) => wh.attributes.url === webhookUrl && wh.attributes.test_mode,
  );

  return webhook;
}

/**
 * This function will set up a webhook on Lemon Squeezy to listen to
 * Subscription events. It will only set up the webhook if it does not exist.
 */
export async function setupWebhook() {
  configureLemonSqueezy();

  // Check if WEBHOOK_URL ends with a slash. If not, add it.
  let webhookUrl = env.LEMONSQUEEZY_WEBHOOK_URL;
  if (!webhookUrl.endsWith("/")) {
    webhookUrl += "/";
  }
  webhookUrl += "api/billing/webhook";

  console.log("Setting up a webhook on Lemon Squeezy (Test Mode)...");

  // Do not set a webhook on Lemon Squeezy if it already exists.
  let webhook = await hasWebhook();

  // If the webhook does not exist, create it.
  if (!webhook) {
    const newWebhook = await createWebhook(env.LEMONSQUEEZY_STORE_ID, {
      secret: env.LEMONSQUEEZY_WEBHOOK_SECRET,
      url: webhookUrl,
      testMode: true, // will create a webhook in Test mode only!
      events: [
        "subscription_created",
        "subscription_expired",
        "subscription_updated",
      ],
    });

    webhook = newWebhook.data?.data;
  }

  console.log(`Webhook ${webhook?.id} created on Lemon Squeezy.`);
}

/**
 * This action will process a webhook event in the database.
 * @param db - Prisma client.
 * @param webhookEvent - Webhook that we want to preocess.
 */
export async function processWebhookEvent(
  db: PrismaClient,
  webhookEvent: BillingWebhookEvent,
) {
  configureLemonSqueezy();

  const event = await db.billingWebhookEvent.findFirst({
    where: { id: webhookEvent.id },
  });

  if (!event) {
    throw new Error(
      `Webhook event #${webhookEvent.id} not found in the database.`,
    );
  }

  let processingError = "";
  const eventBody = JSON.parse(event.body) as unknown;

  console.log(typeof eventBody);

  if (!webhookHasMeta(eventBody)) {
    console.log("MISSING META DATA");

    processingError = "Event body is missing the 'meta' property.";
  } else if (webhookHasData(eventBody)) {
    console.log("WEBHOOK HAS BODY DATA");

    if (webhookEvent.name.startsWith("subscription_payment_")) {
      // TODO
      // Save subscription invoices; eventBody is a SubscriptionInvoice
      // Not implemented.
    } else if (webhookEvent.name.startsWith("subscription_")) {
      // Save subscription events; obj is a Subscription
      const attributes = eventBody.data.attributes;
      const variantId = attributes.variant_id as string;

      const plan = await db.plan.findFirst({
        where: { variantId: parseInt(variantId, 10) },
      });

      if (!plan) {
        processingError = `Plan with variantId ${variantId} not found.`;
      } else {
        // Update the subscription in the database.
        const priceId = attributes.first_subscription_item.price_id;

        // Get the price data from Lemon Squeezy.
        const priceData = await getPrice(priceId);
        if (priceData.error) {
          processingError = `Failed to get the price data for the subscription ${eventBody.data.id}.`;
        }

        const isUsageBased = attributes.first_subscription_item.is_usage_based;
        const price = isUsageBased
          ? priceData.data?.data.attributes.unit_price_decimal
          : priceData.data?.data.attributes.unit_price;

        const newSubscription: Omit<Subscription, "id"> = {
          lemonSqueezyId: eventBody.data.id,
          orderId: attributes.order_id as number,
          name: attributes.user_name as string,
          email: attributes.user_email as string,
          status: attributes.status as string,
          statusFormatted: attributes.status_formatted as string,
          renewsAt: attributes.renews_at as string,
          endsAt: attributes.ends_at as string,
          trialEndsAt: attributes.trial_ends_at as string,
          price: price?.toString() ?? "",
          isPaused: false,
          subscriptionItemId: attributes.first_subscription_item.id,
          isUsageBased: attributes.first_subscription_item.is_usage_based,
          userId: eventBody.meta.custom_data.user_id,
          planId: plan.id,
        };

        try {
          await db.subscription.upsert({
            where: { userId: newSubscription.userId },
            create: newSubscription,
            update: newSubscription,
          });
        } catch (err) {
          console.log(err);
          processingError = `Failed to upsert Subscription #${newSubscription.lemonSqueezyId} to the database.`;
        }
      }
    } else if (webhookEvent.name.startsWith("license_")) {
      // TODO
      // Save license keys; eventBody is a "License key"
      /* Not implemented */
    }

    await db.billingWebhookEvent.update({
      where: { id: webhookEvent.id },
      data: { processed: true, processingError },
    });
  }
}

/**
 * This function will store a webhook event in the database.
 * @param eventName - The name of the event.
 * @param body - The body of the event.
 */
export async function storeWebhookEvent(
  db: PrismaClient,
  name: string,
  body: string,
) {
  return await db.billingWebhookEvent.create({
    data: {
      name,
      processed: false,
      body: body,
    },
  });
}
