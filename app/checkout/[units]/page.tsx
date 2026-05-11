import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckoutPageChrome } from "@/components/checkout/CheckoutPageChrome";
import { PixCheckoutForm } from "@/components/checkout/PixCheckoutForm";
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
      <Suspense
        fallback={
          <div
            className="h-56 animate-pulse rounded-xl bg-white/5"
            aria-busy="true"
          />
        }
      >
        <PixCheckoutForm
          offer={offer}
          hasApiKeyConfigured={hasApiKeyConfigured}
          hostedCheckoutUrl={getPagouCheckoutUrl(offer.units)}
          variant="embedded"
        />
      </Suspense>
      <p className="mt-6 border-t border-white/10 pt-4 text-center text-[11px] leading-relaxed text-gh-muted">
        Ao continuar, concorda com a compra e políticas do canal. Suporte na
        página inicial: perguntas frequentes e WhatsApp.
      </p>
    </CheckoutPageChrome>
  );
}
