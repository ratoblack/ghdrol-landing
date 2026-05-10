import { NextResponse } from "next/server";
import {
  getPagouApiBase,
  getPublicBaseUrl,
  getWebhookNotifyUrl,
  normalizePagouApiKey,
} from "@/lib/pagou";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Diagnóstico seguro (sem expor a chave). Útil na Vercel após configurar env. */
export async function GET() {
  const key = normalizePagouApiKey(process.env.PAGOU_API_KEY);
  const hasKey = Boolean(key && key.length >= 12);

  return NextResponse.json({
    apiKeyLooksConfigured: hasKey,
    pagouEnv:
      process.env.PAGOU_ENV === "production" ? "production" : "sandbox",
    pagouApiBase: getPagouApiBase(),
    publicBaseUrl: getPublicBaseUrl() ?? null,
    notifyUrlFromEnv: getWebhookNotifyUrl() ?? null,
    notifyWebhookPath: "/api/webhooks/pagou",
    hint:
      "Na Vercel, se notifyUrlFromEnv for null, create-pix usa Host/X-Forwarded-* do pedido. Em dev local use NEXT_PUBLIC_APP_URL ou túnel HTTPS se a Pagou recusar notify_url.",
  });
}
