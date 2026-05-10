import { NextResponse } from "next/server";
import type { OfferUnits } from "@/lib/checkout";
import { getPagouCheckoutUrl } from "@/lib/checkout";

const VALID: OfferUnits[] = ["1", "2", "3", "5"];

function isOfferUnits(u: string): u is OfferUnits {
  return (VALID as string[]).includes(u);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ units: string }> },
) {
  const { units } = await context.params;

  if (!isOfferUnits(units)) {
    return NextResponse.json({ error: "Oferta inválida" }, { status: 400 });
  }

  const target = getPagouCheckoutUrl(units);
  if (!target) {
    return NextResponse.json(
      {
        error:
          "Checkout Pagou não configurado. Defina a variável PAGOU_CHECKOUT_* correspondente no ambiente (ver .env.example).",
      },
      { status: 503 },
    );
  }

  return NextResponse.redirect(target, 302);
}
