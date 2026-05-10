import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getPagouApiBase,
  getPublicBaseUrl,
  getWebhookNotifyUrl,
  normalizePagouApiKey,
  probePagouTransactionsList,
} from "@/lib/pagou";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Diagnóstico seguro (sem expor a chave). ?probe=1 chama GET /v2/transactions na Pagou (testa auth). */
export async function GET(request: NextRequest) {
  const key = normalizePagouApiKey(process.env.PAGOU_API_KEY);
  const hasKey = Boolean(key && key.length >= 12);
  const probe =
    request.nextUrl.searchParams.get("probe") === "1" && Boolean(key);

  let probeListTransactions: Awaited<
    ReturnType<typeof probePagouTransactionsList>
  > | null = null;
  if (probe && key) {
    probeListTransactions = await probePagouTransactionsList(key);
  }

  return NextResponse.json({
    apiKeyLooksConfigured: hasKey,
    authMode:
      (process.env.PAGOU_AUTH_MODE ?? "bearer").toLowerCase().trim() || "bearer",
    pagouEnv:
      process.env.PAGOU_ENV === "production" ? "production" : "sandbox",
    pagouApiBase: getPagouApiBase(),
    publicBaseUrl: getPublicBaseUrl() ?? null,
    notifyUrlFromEnv: getWebhookNotifyUrl() ?? null,
    notifyWebhookPath: "/api/webhooks/pagou",
    probeListTransactions,
    hint:
      "Acrescente ?probe=1 para testar o token (lista transações). Se 401 com Bearer, tente na Vercel PAGOU_AUTH_MODE=apikey. Na Vercel, notify pode vir do Host do pedido se notifyUrlFromEnv for null.",
  });
}
