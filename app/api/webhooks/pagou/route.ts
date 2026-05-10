import { NextResponse } from "next/server";
import {
  isWebhookEventProcessed,
  markOrderPaidFromWebhook,
} from "@/lib/order-store";

/**
 * Webhook Pagou — confirma recebimento, deduplica por `id` do evento e marca pedido pago em `transaction.paid`.
 * @see https://developer.pagou.ai/webhooks/payment-events
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const envelope = body as {
    id?: string;
    event?: string;
    data?: {
      id?: string;
      event_type?: string;
      correlation_id?: string | null;
    };
  };

  const webhookEventId = envelope.id;
  if (!webhookEventId) {
    return NextResponse.json({ error: "missing_event_id" }, { status: 400 });
  }

  if (await isWebhookEventProcessed(webhookEventId)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const data = envelope.data;
  const transactionId = data?.id;
  const eventType = data?.event_type;

  if (eventType === "transaction.paid" && transactionId) {
    await markOrderPaidFromWebhook({
      webhookEventId,
      transactionId,
      correlationId: data.correlation_id,
    });
  } else {
    console.info(
      "[pagou webhook]",
      webhookEventId,
      eventType ?? "(no event_type)",
      transactionId ?? "",
    );
  }

  return NextResponse.json({ received: true });
}
