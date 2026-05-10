import { NextResponse } from "next/server";
import type { OfferUnits } from "@/lib/checkout";
import { digitsOnly, isValidCPFDigits } from "@/lib/cpf";
import { createPixTransaction } from "@/lib/pagou";
import { savePendingOrder } from "@/lib/order-store";
import { getOfferByUnits } from "@/lib/offers";
import { parseTrackingFromRequestBody } from "@/lib/tracking";

const VALID: OfferUnits[] = ["1", "2", "3", "5"];

function isOfferUnits(u: string): u is OfferUnits {
  return (VALID as string[]).includes(u);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const b = body as Record<string, unknown> & {
    units?: string;
    name?: string;
    email?: string;
    document?: string;
  };
  const tracking = parseTrackingFromRequestBody(b);

  if (!b.units || !isOfferUnits(b.units)) {
    return NextResponse.json({ error: "Oferta inválida" }, { status: 400 });
  }

  const name = String(b.name ?? "").trim();
  const email = String(b.email ?? "").trim();
  const cpfDigits = digitsOnly(String(b.document ?? ""));

  if (name.length < 3) {
    return NextResponse.json({ error: "Nome completo inválido" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }
  if (cpfDigits.length !== 11) {
    return NextResponse.json({ error: "CPF inválido (11 dígitos)" }, { status: 400 });
  }
  if (!isValidCPFDigits(cpfDigits)) {
    return NextResponse.json(
      {
        error: "CPF inválido",
        detail:
          "Confira os dígitos do CPF. A Pagou recusa documentos com dígitos verificadores incorretos.",
      },
      { status: 400 },
    );
  }

  const offer = getOfferByUnits(b.units);
  if (!offer) {
    return NextResponse.json({ error: "Oferta não encontrada" }, { status: 400 });
  }

  const result = await createPixTransaction({
    offer,
    buyer: { name, email, cpfDigits },
  });

  if (!result.ok) {
    const raw = result.body;
    const payload: Record<string, unknown> =
      raw !== null && typeof raw === "object" && !Array.isArray(raw)
        ? { ...(raw as Record<string, unknown>) }
        : { error: String(raw) };

    if (result.status === 401 && !payload.detail) {
      payload.detail =
        "Pagou recusou o token. Verifique PAGOU_API_KEY e se PAGOU_ENV (sandbox ou production) corresponde ao token no painel Pagou.";
    }
    if (result.status === 403 && !payload.detail) {
      payload.detail =
        "Acesso negado pela Pagou. Confira permissões da chave e se a conta está ativa.";
    }

    return NextResponse.json(payload, { status: result.status });
  }

  await savePendingOrder({
    transactionId: result.id,
    externalRef: result.externalRef,
    units: b.units,
    email,
    name,
    amountCents: offer.amountCents,
    createdAt: new Date().toISOString(),
    ...(tracking ? { tracking } : {}),
  });

  return NextResponse.json({
    id: result.id,
    status: result.status,
    pix: {
      qr_code: result.qrCode,
      expiration_date: result.expirationDate,
    },
    external_ref: result.externalRef,
  });
}
