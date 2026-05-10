import { NextResponse } from "next/server";
import type { OfferUnits } from "@/lib/checkout";
import { createPixTransaction } from "@/lib/pagou";
import { getOfferByUnits } from "@/lib/offers";

const VALID: OfferUnits[] = ["1", "2", "3", "5"];

function isOfferUnits(u: string): u is OfferUnits {
  return (VALID as string[]).includes(u);
}

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const b = body as {
    units?: string;
    name?: string;
    email?: string;
    document?: string;
  };

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

  const offer = getOfferByUnits(b.units);
  if (!offer) {
    return NextResponse.json({ error: "Oferta não encontrada" }, { status: 400 });
  }

  const result = await createPixTransaction({
    offer,
    buyer: { name, email, cpfDigits },
  });

  if (!result.ok) {
    return NextResponse.json(result.body, { status: result.status });
  }

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
