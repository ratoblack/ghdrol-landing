import type { Offer } from "./offers";

/** URL pública do site (para notify_url dos webhooks Pagou). */
export function getPublicBaseUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;
  return undefined;
}

export function getWebhookNotifyUrl(): string | undefined {
  const base = getPublicBaseUrl();
  if (!base) return undefined;
  return `${base}/api/webhooks/pagou`;
}

export type CreatePixInput = {
  offer: Offer;
  buyer: { name: string; email: string; cpfDigits: string };
};

export type CreatePixResult =
  | {
      ok: true;
      id: string;
      status: string;
      qrCode: string;
      expirationDate: string | null;
      externalRef: string;
    }
  | { ok: false; status: number; body: unknown };

/** Extrai mensagem legível dos erros Pagou (vários formatos). */
export function extractPagouDetail(json: unknown): string | undefined {
  if (!json || typeof json !== "object" || Array.isArray(json)) return undefined;
  const j = json as Record<string, unknown>;
  const pick = (v: unknown) =>
    typeof v === "string" && v.trim() ? v.trim() : undefined;
  const fromMsg = pick(j.message) ?? pick(j.error) ?? pick(j.detail);
  if (fromMsg) return fromMsg;
  const errs = j.errors;
  if (Array.isArray(errs) && errs[0] && typeof errs[0] === "object") {
    const e = errs[0] as Record<string, unknown>;
    const m = pick(e.message);
    const field = typeof e.field === "string" ? e.field : "";
    if (m) return field ? `${field}: ${m}` : m;
  }
  return undefined;
}

export function getPagouApiBase(): string {
  return process.env.PAGOU_ENV === "production"
    ? "https://api.pagou.ai"
    : "https://api-sandbox.pagou.ai";
}

export async function createPixTransaction(
  input: CreatePixInput,
): Promise<CreatePixResult> {
  const key = process.env.PAGOU_API_KEY?.trim();
  if (!key) {
    return {
      ok: false,
      status: 500,
      body: {
        error: "missing_api_key",
        detail:
          "PAGOU_API_KEY não definida no servidor (ex.: Vercel → Environment Variables → Production).",
      },
    };
  }

  const notifyUrl = getWebhookNotifyUrl();
  const externalRef = `ghdrol_${input.offer.units}u_${crypto.randomUUID()}`;

  const payload: Record<string, unknown> = {
    external_ref: externalRef,
    amount: input.offer.amountCents,
    currency: "BRL",
    method: "pix",
    buyer: {
      name: input.buyer.name.trim(),
      email: input.buyer.email.trim(),
      document: { type: "CPF", number: input.buyer.cpfDigits },
    },
    products: [
      {
        name: `GHDROL — ${input.offer.label}`,
        price: input.offer.amountCents,
        quantity: 1,
      },
    ],
  };

  if (notifyUrl) payload.notify_url = notifyUrl;

  const res = await fetch(`${getPagouApiBase()}/v2/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json: unknown = await res.json().catch(() => null);

  const envelope = json as {
    success?: boolean;
    data?: {
      id?: string;
      status?: string;
      pix?: { qr_code?: string; expiration_date?: string | null };
    };
  };

  const failureBody = (): Record<string, unknown> => {
    const base: Record<string, unknown> =
      json !== null && typeof json === "object" && !Array.isArray(json)
        ? { ...(json as Record<string, unknown>) }
        : { raw: json };
    const detail = extractPagouDetail(json);
    if (detail && base.detail === undefined) base.detail = detail;
    return base;
  };

  if (!res.ok || envelope.success === false) {
    const status =
      !res.ok ? res.status : envelope.success === false ? 422 : res.status;
    return { ok: false, status, body: failureBody() };
  }

  const id = envelope.data?.id;
  const qr = envelope.data?.pix?.qr_code;
  if (!id || !qr) {
    return {
      ok: false,
      status: 502,
      body: {
        ...failureBody(),
        detail:
          extractPagouDetail(json) ??
          "Resposta Pagou sem QR Pix (confira método PIX na conta e valor da transação).",
      },
    };
  }

  return {
    ok: true,
    id,
    status: envelope.data?.status ?? "pending",
    qrCode: qr,
    expirationDate: envelope.data?.pix?.expiration_date ?? null,
    externalRef,
  };
}
