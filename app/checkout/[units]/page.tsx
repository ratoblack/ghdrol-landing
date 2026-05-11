import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutPageChrome } from "@/components/checkout/CheckoutPageChrome";
import { CheckoutFunnel } from "@/components/checkout/CheckoutFunnel";
import type { OfferUnits } from "@/lib/checkout";
import { getPagouCheckoutUrl } from "@/lib/checkout";
import { normalizePagouApiKey } from "@/lib/pagou";
import { getOfferByUnits } from "@/lib/offers";

const VALID = new Set<OfferUnits>(["1", "2", "3", "5"]);

/** Obrigatório na Vercel: lê PAGOU_API_KEY em runtime, não na build (senão o Pix fica “desligado”). */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ units: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { units } = await params;
  if (!VALID.has(units as OfferUnits)) {
    return { title: "Checkout | GHDROL" };
  }
  const offer = getOfferByUnits(units as OfferUnits);
  if (!offer) return { title: "Checkout | GHDROL" };
  return {
    title: `Checkout — ${offer.label} | GHDROL`,
    description: `Finalize no Pix: ${offer.label}, ${offer.cashPrice} à vista. Frete grátis.`,
  };
}

export default async function CheckoutPage({ params }: Props) {
  const { units } = await params;
  if (!VALID.has(units as OfferUnits)) notFound();

  const offer = getOfferByUnits(units as OfferUnits);
  if (!offer) notFound();

  const hasApiKeyConfigured = Boolean(
    normalizePagouApiKey(process.env.PAGOU_API_KEY),
  );

  return (
    <CheckoutPageChrome offer={offer}>
      <CheckoutFunnel
        offer={offer}
        hasApiKeyConfigured={hasApiKeyConfigured}
        hostedCheckoutUrl={getPagouCheckoutUrl(offer.units)}
      />
    </CheckoutPageChrome>
  );
}
