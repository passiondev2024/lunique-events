import crypto from "node:crypto";

import {
  processWebhookEvent,
  storeWebhookEvent,
} from "@/server/billing/webhook";
import { webhookHasMeta } from "@/lib/typeguards";
import { db } from "@/server/db";
import { env } from "@/env.mjs";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = env.LEMONSQUEEZY_WEBHOOK_SECRET;

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(
    request.headers.get("X-Signature") ?? "",
    "utf8",
  );

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error("Invalid signature.");
  }

  const data = JSON.parse(rawBody) as unknown;

  // Type guard to check if the object has a 'meta' property.
  if (webhookHasMeta(data)) {
    const webhookEventId = await storeWebhookEvent(
      db,
      data.meta.event_name,
      data,
    );

    // Non-blocking call to process the webhook event.
    await processWebhookEvent(db, webhookEventId);

    return new Response("OK", { status: 200 });
  }

  return new Response("Data invalid", { status: 400 });
}
