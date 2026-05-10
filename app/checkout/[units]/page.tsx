import Link from "next/link";
import { notFound } from "next/navigation";
import { PixCheckoutForm } from "@/components/checkout/PixCheckoutForm";
import type { OfferUnits } from "@/lib/checkout";
import { getPagouCheckoutUrl } from "@/lib/checkout";
import { getOfferByUnits } from "@/lib/offers";

const VALID = new Set<OfferUnits>(["1", "2", "3", "5"]);

type Props = { params: Promise<{ units: string }> };

export default async function CheckoutPage({ params }: Props) {
  const { units } = await params;
  if (!VALID.has(units as OfferUnits)) notFound();

  const offer = getOfferByUnits(units as OfferUnits);
  if (!offer) notFound();

  const hasApiKeyConfigured = Boolean(
    process.env.PAGOU_API_KEY?.trim()?.length,
  );

  return (
    <main className="min-h-screen bg-gh-bg py-12 text-gh-text">
      <div className="container-page max-w-lg">
        <p className="font-display text-xl uppercase text-gh-gold">
          Checkout GHDROL
        </p>
        <h1 className="mt-2 font-display text-3xl uppercase text-white">
          {offer.label}
        </h1>
        <p className="mt-1 text-gh-muted">
          Valor à vista: <strong className="text-white">{offer.cashPrice}</strong>
        </p>
        <div className="mt-8">
          <PixCheckoutForm
            offer={offer}
            hasApiKeyConfigured={hasApiKeyConfigured}
            hostedCheckoutUrl={getPagouCheckoutUrl(offer.units)}
          />
        </div>
        <Link
          href="/#oferta"
          className="mt-8 inline-block w-full text-center text-sm text-gh-gold underline"
        >
          ← Outra oferta
        </Link>
      </div>
    </main>
  );
}
