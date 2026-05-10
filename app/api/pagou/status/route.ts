import { NextResponse } from "next/server";
import { getPagouApiBase, getPublicBaseUrl } from "@/lib/pagou";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Diagnóstico seguro (sem expor a chave). Útil na Vercel após configurar env. */
export async function GET() {
  const raw = process.env.PAGOU_API_KEY;
  const trimmed = raw?.trim();
  const hasKey = Boolean(trimmed && trimmed.length >= 12);

  return NextResponse.json({
    apiKeyLooksConfigured: hasKey,
    pagouEnv:
      process.env.PAGOU_ENV === "production" ? "production" : "sandbox",
    pagouApiBase: getPagouApiBase(),
    publicBaseUrl: getPublicBaseUrl() ?? null,
    notifyWebhookPath: "/api/webhooks/pagou",
  });
}
