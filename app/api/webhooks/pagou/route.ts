import { NextResponse } from "next/server";

/**
 * Webhook Pagou — confirma recebimento e registra evento.
 * @see https://developer.pagou.ai/webhooks/payment-events
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const id = (body as { id?: string }).id;
  if (!id) {
    return NextResponse.json({ error: "missing_event_id" }, { status: 400 });
  }

  console.info("[pagou webhook]", id, JSON.stringify(body));

  return NextResponse.json({ received: true });
}
